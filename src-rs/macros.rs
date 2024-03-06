// define macro for getting the value of a key from an object
macro_rules! get {
    (@as_literal $l:literal) => {
        $l
    };
    (@as_expr $e:expr) => {
        $e
    };
    (@as_jsstring $e:literal) => {
        // check if expr is a &str or JsString
        JsString::from(get!(@as_literal $e))
    };
    (@as_jsstring $e:expr) => {
        // check if expr is a &str or JsString
        // if it's a &str, convert it to JsString
        $e
    };
    (&$obj:tt[$key:tt]) => {
        // check if expr is a &str or JsString
        unwrap_abort_result(js_sys::Reflect::get(
            &get!(@as_expr $obj),
            &get!(@as_jsstring $key)
        ))
    };
    ($obj:tt[$key:tt]) => {
        // check if expr is a &str or JsString
        unwrap_abort_result(js_sys::Reflect::get(
            get!(@as_expr $obj),
            &get!(@as_jsstring $key)
        ))
    };
}

// define macro for setting the value of a key from an object

macro_rules! set {
    (@as_literal $l:literal) => {
        $l
    };
    (@as_expr $e:expr) => {
        $e
    };
    (@as_jsstring $e:literal) => {
        // check if expr is a &str or JsString
        JsString::from(get!(@as_literal $e))
    };
    (@as_jsstring $e:expr) => {
        // check if expr is a &str or JsString
        // if it's a &str, convert it to JsString
        $e
    };
    (&$obj:tt[$key:tt] = $value:expr) => {
        unwrap_abort_result(js_sys::Reflect::set(
            &set!(@as_expr $obj),
            &set!(@as_jsstring $key),
            &$value
        ))
    };
    ($obj:tt[$key:tt] = $value:expr) => {
        unwrap_abort_result(js_sys::Reflect::set(
            set!(@as_expr $obj),
            &set!(@as_jsstring $key),
            &$value
        ))
    };
}

// figures out whether to use the get! or set! macro
macro_rules! js {
    ($obj:tt[$key:tt]) => {
        get!($obj[$key])
    };
    (&$obj:tt[$key:tt]) => {
        get!(&$obj[$key])
    };
    (&$obj:tt[$key:tt] = $value:expr) => {
        set!(&$obj[$key] = $value)
    };
    ($obj:tt[$key:tt] = $value:expr) => {
        set!($obj[$key] = $value)
    };
}
