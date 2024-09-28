use boomphf::Mphf;
use js_sys::WebAssembly::Memory;
use js_sys::{Array, Function, JsString, Number, Reflect};
use js_sys::{ArrayBuffer, DataView, Object};
use wasm_bindgen::convert::IntoWasmAbi;
use wasm_bindgen::memory;
use wasm_bindgen::prelude::*;
use wasm_bindgen_test::*;
use web_sys::console;
#[wasm_bindgen]
pub struct Animation {
    byte_size: usize,
    from: Vec<f64>,
    local_offsets: Vec<usize>,
    into: Vec<f64>, // either number or NaN to symbolize that you shouldn't interp
    hash_local: Mphf<String>,
    hash_children: Mphf<String>,
    time: f64,
    interp: Function, // either number or null to symbolize the end of the animation
    children: Vec<Animation>,
    dataview: DataView,
}

#[wasm_bindgen]
impl Animation {
    #[wasm_bindgen]
    pub fn new(animatable: Object, interp: Function, dataview: DataView, start: usize) -> Self {
        let keys = Object::keys(&animatable);
        let mut local_keys = Vec::new();
        let mut local_values = Vec::new();
        let mut children = Vec::new();
        let mut children_keys = Vec::new();
        let mut local_offsets = Vec::new();
        let mut size = 0;
        for key in keys {
            let value = Reflect::get(&animatable, &key).expect("Key should exist in animatable");
            let key_string: JsString = key.try_into().expect("Key should be a string");
            let key_string = key_string
                .as_string()
                .expect("Should be able to convert JsString to string");
            if Number::is_type_of(&value) {
                let value_num: Number = value.into();
                let value_float: f64 = value_num.into();
                local_values.push(value_float);
                local_keys.push(key_string);
                local_offsets.push(size);
                size += 8;
            } else if Object::is_type_of(&value) {
                children_keys.push(key_string);
                let child = Animation::new(
                    value.into(),
                    interp.clone(),
                    DataView::new(
                        &dataview.buffer(),
                        start + size,
                        (dataview.buffer().byte_length() - size as u32) as usize,
                    ),
                    start + size,
                );
                size += child.byte_size;
                children.push(child);
            } else {
                console::warn_1(
                    &"Shouldn't have a value in the init object that isn't a number or an object"
                        .into(),
                );
                continue;
            }
        }
        let local_hash = Mphf::new(1.7, &local_keys);
        let children_hash = Mphf::new(1.7, &children_keys);
        let local_ct = local_values.len();
        Self {
            byte_size: size,
            from: local_values,
            into: vec![f64::NAN; local_ct],
            hash_local: local_hash,
            hash_children: children_hash,
            local_offsets,
            time: 0.0,
            interp,
            children,
            dataview: DataView::new(&dataview.buffer(), start, size),
        }
    }
}

impl Animation {
    pub fn update_animation(&mut self, dt: f64) {
        self.time += dt;
        let progress: f64 = self
            .interp
            .call1(&JsValue::NULL, &self.time.into())
            .unwrap()
            .as_f64()
            .unwrap();
        for (ind, value) in self.into.iter().enumerate() {
            if (*value).is_nan() {
                continue;
            }
            let new_value = self.from[ind] * (1.0 - progress) + value * progress;
            self.dataview
                .set_float64(self.local_offsets[ind], new_value);
        }
    }
    pub fn get_local_value(&mut self, key: &String) -> f64 {
        let hash = self.hash_local.hash(key);
        let offset = self.local_offsets[hash as usize];
        self.dataview.get_float64(offset)
    }
    pub fn modify_to(&mut self, animatable: Object) {
        let keys = Object::keys(&animatable);
        for key in keys {
            let value = Reflect::get(&animatable, &key).unwrap();
            let key_string: String = key.as_string().unwrap();
            if Number::is_type_of(&value) {
                self.modify_value_to(&key_string, value.as_f64().unwrap())
            }
        }
    }
    fn modify_value_to(&mut self, key: &String, value: f64) {
        let hash = self.hash_local.hash(key) as usize;
        let curr_value = self.get_local_value(key);
        self.from[hash] = curr_value;
        self.into[hash] = value;
    }
}

#[wasm_bindgen]
pub struct Animations {
    memory: DataView,
    animations: Vec<Animation>,
    offset: usize,
}
#[wasm_bindgen]
impl Animations {
    #[wasm_bindgen]
    pub fn new(array_buf: ArrayBuffer) -> Self {
        Self {
            memory: DataView::new(&array_buf, 0, array_buf.byte_length() as usize),
            animations: Vec::new(),
            offset: 0,
        }
    }
    pub fn add_animation(&mut self, init: Object, interp: Function) -> usize {
        let new_anim = Animation::new(init, interp, self.memory.clone(), self.offset);
        self.offset += new_anim.byte_size;
        self.animations.push(new_anim);
        self.animations.len() - 1
    }
}

#[wasm_bindgen_test]
pub fn animation() {
    let js_object = Object::new();
    Reflect::set(&js_object, &"x".into(), &0.into()).unwrap();
    Reflect::set(&js_object, &"y".into(), &0.into()).unwrap();
    let interp = Function::new_with_args("time", "time > 1 ? null : time");
    let memory: Memory = memory().into();
    let mem: JsValue = memory.buffer();
    let anim = Animation::new(js_object, interp, memory.buffer().into(), 0);
    let animations = Animations::new(memory.buffer().into());
}
