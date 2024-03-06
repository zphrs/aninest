use js_sys::{Function, Set};
use wasm_bindgen::JsValue;

pub fn broadcast(listeners: Set, value: &JsValue) {
    let values = listeners.values();
    for listener in values {
        let listener = listener.unwrap();
        let listener = Function::from(listener);
        listener.call1(&JsValue::NULL, value).unwrap();
    }
}
