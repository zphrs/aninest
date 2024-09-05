use js_sys::DataView;
use wasm_bindgen::memory;
use wasm_bindgen::prelude::*;

struct Animation {}

struct Animations {
    memory: DataView,
}
