#[macro_use]
mod macros;
mod listeners;
mod types;

use js_sys::{Boolean, Function, Number, Object};
use js_sys::{JsString, Set};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

#[inline]
pub fn unwrap_abort_option<T>(o: Option<T>) -> T {
    use std::process;
    match o {
        Some(t) => t,
        None => process::abort(),
    }
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// macro_rules! console_log {
//     // Note that this is using the `log` function imported above during
//     // `bare_bones`
//     ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
// }

#[inline]
pub fn unwrap_abort_result<T, E>(o: Result<T, E>) -> T {
    use std::process;
    match o {
        Ok(t) => t,
        _ => process::abort(),
    }
}

use crate::listeners::broadcast;

/// @type {<Animating extends Animatable>(info: AnimationInfo<Animating>): number}
/// @return {number}
#[wasm_bindgen(typescript_custom_section)]
const GET_PROGRESS: &'static str = r#"
export function getProgress<Animating extends Animatable>(info: AnimationInfo<Animating>): number;
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn getProgress(info: &Object) -> Number {
    let timing_function: Function = js!(info["timingFunction"]).into();
    let time: Number = js!(info["time"]).into();
    let res = unwrap_abort_result(timing_function.call1(&JsValue::NULL, &time));
    let res: Number = res.into();
    clamp(&0.into(), &res, &1.into()).to_owned()
}

#[wasm_bindgen(typescript_custom_section)]
const ANIMATION_NEEDS_UPDATE: &'static str = r#"
export function animationNeedsUpdate<Animating extends Animatable>(
    info: AnimationInfo<Animating>
  ): boolean;
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn animationNeedsUpdate(info: &Object) -> Boolean {
    let to: Object = js!(info["to"]).into();
    // check that to is not null
    if to.is_null() {
        return false.into();
    }
    let progress = getProgress(info);
    (progress < Number::from(1.0 - Number::EPSILON)).into()
}

fn lerp(a: &Number, b: &Number, t: &Number) -> Number {
    a + (b - a) * t
}

fn lerp_animatable(from: &Object, to: &Object, progress: &Number) -> Object {
    let keys = js_sys::Object::keys(from);
    let out = Object::new();
    for key in keys.iter() {
        let from_value: Number = js!(from[key]).into();
        // check if to has the same key
        let to_value: Number = js!(to[key]).into();
        let final_value = if to_value.is_undefined() {
            from_value
        } else {
            lerp(&from_value, &to_value, &progress)
        };
        js!(&out[key] = final_value);
    }
    out
}

fn copy_object(obj: &Object) -> Object {
    let new_obj = Object::new();
    let keys = js_sys::Object::keys(obj);
    for key in keys.iter() {
        let value = js!(obj[key]);
        js!(&new_obj[key] = value);
    }
    new_obj
}

fn create_local_animation_info(init: &Object, timing: &Function, bounds: &Object) -> Object {
    let out = Object::new();
    let from = copy_object(init);
    let to = wasm_bindgen::JsValue::NULL;
    let bounds = if bounds.is_undefined() {
        wasm_bindgen::JsValue::UNDEFINED
    } else {
        copy_object(bounds).into()
    };
    let create_empty_set = || Set::new(&wasm_bindgen::JsValue::UNDEFINED);
    let start_listeners = create_empty_set();
    let end_listeners = create_empty_set();
    let bounce_listeners = create_empty_set();
    let interrupt_listeners = create_empty_set();
    let recursive_start_listeners = create_empty_set();
    js!(&out["time"] = &Number::from(0));
    js!(&out["from"] = &from);
    js!(&out["to"] = &to);
    js!(&out["timingFunction"] = &timing);
    js!(&out["bounds"] = &bounds);
    js!(&out["startListeners"] = &start_listeners);
    js!(&out["endListeners"] = &end_listeners);
    js!(&out["bounceListeners"] = &bounce_listeners);
    js!(&out["interruptListeners"] = &interrupt_listeners);
    js!(&out["recursiveStartListeners"] = &recursive_start_listeners);
    out
}

fn separate_children(obj: &Object) -> (Object, Object) {
    let anim = Object::new();
    let children = Object::new();

    for key in js_sys::Object::keys(obj).iter() {
        let value: JsValue = js!(obj[key]);
        if value.has_type::<Number>() {
            js!(&anim[key] = &value);
        } else {
            js!(&children[key] = &value);
        }
    }
    (anim, children)
}

fn guarantee_object(obj: &Object) -> Object {
    if obj.is_undefined() {
        Object::new()
    } else {
        obj.clone()
    }
}

#[wasm_bindgen(typescript_custom_section)]
const CREATE_ANIMATION_INFO: &'static str = r#"
export function createAnimation<Init extends RecursiveAnimatable<unknown>>(
    init: Init,
    timing: Interp,
    bounds?: Bounds<Init>
  ): AnimationInfo<Init>
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn createAnimation(init: &Object, timing: &Function, bounds: &Object) -> Object {
    let (anim, children) = separate_children(init);
    let bounds: Object = guarantee_object(bounds);

    let (upper_bounds_anim, upper_bounds_children) =
        separate_children(&guarantee_object(&js!(&bounds["upper"]).into()));
    let (lower_bounds_anim, lower_bounds_children) =
        separate_children(&guarantee_object(&js!(&bounds["lower"]).into()));

    let bounds_anim = Object::new();
    js!(&bounds_anim["upper"] = &upper_bounds_anim);
    js!(&bounds_anim["lower"] = &lower_bounds_anim);
    let info = create_local_animation_info(&anim, timing, &bounds_anim);
    js!(&info["children"] = &Object::new());
    // recursively create animation info for children
    let info_children: Object = js!(&info["children"]).into();
    let keys = js_sys::Object::keys(&children);
    for key in keys.iter() {
        let child: Object = js!(&children[key]).into();
        let child_bounds: Object = Object::new();
        let upper_bounds_children_key: Object = js!(&upper_bounds_children[key]).into();
        let lower_bounds_children_key: Object = js!(&lower_bounds_children[key]).into();
        js!(&child_bounds["upper"] = &upper_bounds_children_key);
        js!(&child_bounds["lower"] = &lower_bounds_children_key);
        let child_info = createAnimation(&child, timing, &child_bounds);
        js!(&info_children[key] = &child_info);
    }
    info
}

fn merge_dicts(a: &Object, b: &Object) -> Object {
    let out = Object::new();
    let keys = js_sys::Object::keys(a);
    for key in keys.iter() {
        let value: JsValue = js!(&a[key]);
        js!(&out[key] = &value);
    }
    let keys = js_sys::Object::keys(b);
    for key in keys.iter() {
        let value: JsValue = js!(&b[key]);
        js!(&out[key] = &value);
    }
    out
}

#[wasm_bindgen(typescript_custom_section)]
const MODIFY_TO: &'static str = r#"
export function modifyTo<Animating extends RecursiveAnimatable<unknown>>(
    info: AnimationInfo<Animating>,
    to: PartialRecursiveAnimatable<Animating>
  )
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn modifyTo(info: &Object, to: &Object) {
    let (local_to, children) = separate_children(to);
    let info_children: Object = js!(info["children"]).into();
    // modify children recursively
    for key in js_sys::Object::keys(&children) {
        let child: Object = js!(&children[key]).into();
        let child_info: JsValue = js!(&info_children[key]);
        if child_info.is_falsy() {
            continue;
        }
        modifyTo(child_info.unchecked_ref(), &child);
    }
    if js_sys::Object::keys(&local_to).length() == 0 {
        return;
    }
    let info_to: Object = js!(info["to"]).into();
    let complete_to = if info_to.is_truthy() {
        let merged = merge_dicts(&info_to, &local_to);
        save_state(info, &getLocalState(info));
        broadcast(js!(info["interruptListeners"]).into(), &merged);
        merged
    } else {
        local_to
    };
    js!(&info["to"] = &complete_to);
    js!(&info["time"] = &Number::from(0));
    updateAnimationInfo(info, &Number::from(0));
    broadcast(js!(info["startListeners"]).into(), &complete_to);
    broadcast(
        js!(info["recursiveStartListeners"]).into(),
        &JsValue::UNDEFINED,
    );
}

#[wasm_bindgen(typescript_custom_section)]
const ADD_LISTENER: &'static str = r#"
export function addListener<Animating extends RecursiveAnimatable<unknown>>(
    info: AnimationInfo<Animating>,
    type: AnimatableEvents,
    listener: Listener<Partial<LocalRecursiveAnimatable<Animating>>>
  )
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn addListener(info: &Object, event_type: &JsString, listener: &Function) {
    let key: JsString = event_type.concat(&"Listeners".into());
    let listeners: Set = js!(info[key]).into();
    listeners.add(listener);
}

#[wasm_bindgen(typescript_custom_section)]
const REMOVE_LISTENER: &'static str = r#"
export function removeListener<Animating extends RecursiveAnimatable<unknown>>(
    info: AnimationInfo<Animating>,
    type: AnimatableEvents,
    listener: Listener<Partial<LocalRecursiveAnimatable<Animating>>>
  )
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn removeListener(info: &Object, event_type: &JsString, listener: &Function) {
    let key: JsString = format!("{event_type}Listeners").into();
    let listeners: Set = js!(info[key]).into();
    listeners.delete(listener);
}

#[wasm_bindgen(typescript_custom_section)]
const ADD_RECURSIVE_START_LISTENER: &'static str = r#"
export function addRecursiveStartListener<
  Animating extends RecursiveAnimatable<unknown>
>(info: AnimationInfo<Animating>, listener: Listener<undefined>)
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn addRecursiveStartListener(info: &Object, listener: &Function) {
    let children = js!(info["children"]).into();
    for child in js_sys::Object::values(&children).iter() {
        addRecursiveStartListener(&child.into(), listener);
    }
    let listeners: Set = js!(info["recursiveStartListeners"]).into();
    listeners.add(listener);
}

#[wasm_bindgen(typescript_custom_section)]
const REMOVE_RECURSIVE_START_LISTENER: &'static str = r#"
export function removeRecursiveStartListener<
  Animating extends RecursiveAnimatable<unknown>
>(info: AnimationInfo<Animating>, listener: Listener<undefined>)
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn removeRecursiveStartListener(info: &Object, listener: &Function) {
    let children = js!(info["children"]).into();
    for child in js_sys::Object::values(&children).iter() {
        removeRecursiveStartListener(&child.into(), listener);
    }
    let listeners: Set = js!(info["recursiveStartListeners"]).into();
    listeners.delete(listener);
}

#[wasm_bindgen(typescript_custom_section)]
const MODIFY_ANIMATION_BOUNDS: &'static str = r#"
export function modifyAnimationBounds<
  Animating extends RecursiveAnimatable<unknown>
>(
  info: AnimationInfo<Animating>,
  bounds: PartialBounds<PartialRecursiveAnimatable<Animating>> | undefined
)
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn modifyAnimationBounds(info: &Object, bounds: &Object) {
    let bounds_upper: Object = guarantee_object(&js!(bounds["upper"]).into());
    let (bounds_upper_anim, bounds_upper_children) = separate_children(&bounds_upper);
    let bounds_lower: Object = guarantee_object(&js!(bounds["lower"]).into());
    let (bounds_lower_anim, bounds_lower_children) = separate_children(&bounds_lower);

    let info_bounds: Object = js!(info["bounds"]).into();
    let info_bounds_upper: Object = js!(&info_bounds["upper"]).into();
    let info_bounds_lower: Object = js!(&info_bounds["lower"]).into();

    let local_bounds: Object = Object::new();
    let upper = merge_dicts(&info_bounds_upper, &bounds_upper_anim);
    let lower = merge_dicts(&info_bounds_lower, &bounds_lower_anim);
    js!(&local_bounds["upper"] = upper);
    js!(&local_bounds["lower"] = lower);
    js!(&info["bounds"] = &local_bounds);
    let info_children: Object = js!(info["children"]).into();
    let keys = js_sys::Object::keys(&bounds_upper_children);
    for key in keys.iter() {
        let child: Object = js!(&info_children[key]).into();
        let child_bounds_upper: Object = js!(&bounds_upper_children[key]).into();
        let child_bounds_lower: Object = js!(&bounds_lower_children[key]).into();
        let child_bounds: Object = Object::new();
        js!(&child_bounds["upper"] = &child_bounds_upper);
        js!(&child_bounds["lower"] = &child_bounds_lower);
        modifyAnimationBounds(&child, &child_bounds);
    }
    bound_animation(info);
}

fn clamp<'a>(lower: &'a Number, value: &'a Number, upper: &'a Number) -> &'a Number {
    if value < lower {
        return lower;
    }
    if value > upper {
        return upper;
    }
    value
}

fn bound_animation(info: &Object) {
    let info_bounds: Object = js!(info["bounds"]).into();
    let upper: Object = js!(&info_bounds["upper"]).into();
    let lower: Object = js!(&info_bounds["lower"]).into();
    let from: Object = js!(info["from"]).into();
    let keys = js_sys::Object::keys(&from);
    for key in keys.iter() {
        let curr_val = js!(&from[key]).into();
        let lower_bound = js!(&lower[key]).into();
        let upper_bound = js!(&upper[key]).into();
        let new_val = clamp(&lower_bound, &curr_val, &upper_bound);
        if *new_val != curr_val {
            let to = Object::new();
            js!(&to[key] = new_val);
            modifyTo(info, &to);
            let bounce_listeners: Set = js!(info["bounceListeners"]).into();
            let info_to: Object = js!(info["to"]).into();
            broadcast(bounce_listeners, &info_to.into());
        }
    }
}

fn save_state(info: &Object, state: &Object) {
    js!(info["from"] = copy_object(state));
    js!(info["to"] = wasm_bindgen::JsValue::NULL);
    js!(info["time"] = &Number::from(0));
}

#[wasm_bindgen(typescript_custom_section)]
const GET_LOCAL_STATE: &'static str = r#"
export function getLocalState<Animating extends RecursiveAnimatable<unknown>>(
    info: AnimationInfo<Animating>
  )
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn getLocalState(info: &Object) -> Object {
    let info_to: Object = js!(info["to"]).into();
    if info_to.is_null() {
        return js!(info["from"]).into();
    }
    let progress = getProgress(info);
    let info_from: Object = js!(info["from"]).into();
    lerp_animatable(&info_from, &info_to, &progress)
}

#[wasm_bindgen(typescript_custom_section)]
const GET_STATE_TREE: &'static str = r#"
export function getStateTree<Animating extends RecursiveAnimatable<unknown>>(
    info: AnimationInfo<Animating>
  ): Animating
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn getStateTree(info: &Object) -> Object {
    let out = getLocalState(info);
    let children: Object = js!(info["children"]).into();
    let keys = js_sys::Object::keys(&children);
    for key in keys.iter() {
        let child: Object = js!(&children[key]).into();
        let child_state = getStateTree(&child);
        js!(&out[key] = &child_state);
    }
    out
}

#[wasm_bindgen(typescript_custom_section)]
const UPDATE_ANIMATION_INFO: &'static str = r#"
/**
 * @returns {boolean} whether the animation needs to be updated again
 */
export function updateAnimationInfo<
  Animating extends RecursiveAnimatable<unknown>
>(info: AnimationInfo<Animating>, dt: number): boolean
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn updateAnimationInfo(info: &Object, dt: &Number) -> Boolean {
    let new_time: Number = Number::from(js!(info["time"])) + dt;
    js!(&info["time"] = &new_time);
    let mut out: bool = animationNeedsUpdate(info).into();

    let info_children: Object = js!(info["children"]).into();
    let values = js_sys::Object::values(&info_children);
    for child_info in values.iter() {
        if updateAnimationInfo(&child_info.into(), dt).into() {
            out = true;
        }
    }
    let info_to: Object = js!(info["to"]).into();
    let info_from: Object = js!(info["from"]).into();
    if !out && info_to.is_truthy() {
        let new_state = merge_dicts(&info_from, &info_to);
        save_state(info, &new_state);
        let info_from: JsValue = js!(info["from"]).into();
        let info_from_borrowed = &info_from;
        bound_animation(info);
        out = animationNeedsUpdate(info).into();
        if !out {
            broadcast(js!(info["endListeners"]).into(), info_from_borrowed);
        }
    }
    out.into()
}

#[wasm_bindgen(typescript_custom_section)]
const CHANGE_INTERP_FUNCTION: &'static str = r#"
export function changeInterpFunction<
  Animating extends RecursiveAnimatable<unknown>
>(
  info: AnimationInfo<Animating>,
  interp: Interp,
  mask: Partial<Mask<Animating>> = {} // assumes default of true for all keys
)
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn changeInterpFunction(info: &Object, interp: &Function, mask: &Object) {
    if mask.is_undefined() {
        return changeInterpFunction(info, interp, &Object::new());
    }

    js!(info["timingFunction"] = interp);
    js!(info["time"] = 0.into());
    let to = getLocalInterpingTo(info);
    save_state(info, &getLocalState(info));
    js!(info["to"] = to);
    broadcast(
        js!(info["recursiveStartListeners"]).into(),
        &wasm_bindgen::JsValue::UNDEFINED,
    );
    updateAnimationInfo(info, &0.into());
    let info_children: Object = js!(info["children"]).into();
    let keys = js_sys::Object::keys(&info_children);
    for key in keys.iter() {
        let child_info: Object = js!(&info_children[key]).into();
        let mask_key: JsValue = js!(mask[key]);
        if mask_key.is_falsy() && !mask_key.is_undefined() {
            continue;
        }
        changeInterpFunction(&child_info, interp, &mask_key.into());
    }
}

#[wasm_bindgen(typescript_custom_section)]
const GET_LOCAL_INTERPING_TO: &'static str = r#"
export function getLocalInterpingTo<
  Animating extends RecursiveAnimatable<unknown>
>(info: AnimationInfo<Animating>)
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn getLocalInterpingTo(info: &Object) -> Object {
    let info_to: Object = js!(info["to"]).into();
    if info_to.is_null() {
        return js!(info["from"]).into();
    }
    let info_from: Object = js!(info["from"]).into();
    merge_dicts(&info_from, &info_to)
}

#[wasm_bindgen(typescript_custom_section)]
const GET_INTERPING_TO_TREE: &'static str = r#"
export function getInterpingToTree<
  Animating extends RecursiveAnimatable<unknown>
>(info: AnimationInfo<Animating>): Animating
"#;
#[wasm_bindgen(skip_typescript, skip_jsdoc)]
#[allow(non_snake_case)]
pub fn getInterpingToTree(info: &Object) -> Object {
    let out = getLocalInterpingTo(info);
    let children = js!(info["children"]).into();
    let keys = js_sys::Object::keys(&children);
    for key in keys.iter() {
        let child_info: Object = js!(&children[key]).into();
        let child_state = getInterpingToTree(&child_info);
        js!(&out[key] = &child_state);
    }
    out
}
