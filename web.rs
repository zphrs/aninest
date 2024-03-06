//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use aninest_rs::copy_object;
use js_sys::{JsString, Number, Object};
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_copy_object() {
    let obj = Object::new();
    js_sys::Reflect::set(&obj, &JsString::from("a"), &Number::from(1)).unwrap();
    let new_obj = copy_object(&obj);
    // change the original object
    js_sys::Reflect::set(&obj, &JsString::from("a"), &Number::from(2)).unwrap();
    let value: Number = js_sys::Reflect::get(&new_obj, &JsString::from("a"))
        .unwrap()
        .into();
    // make sure the value is still 1
    assert_eq!(value, Number::from(1));
}

#[wasm_bindgen_test]
fn test_undefined_object() {
    let und_obj = wasm_bindgen::JsValue::UNDEFINED;
    let und_obj: Object = und_obj.into();
    // make sure the object is undefined
    assert_eq!(und_obj.is_undefined(), true);
}
