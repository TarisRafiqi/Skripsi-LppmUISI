(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // <define:process>
  var define_process_default;
  var init_define_process = __esm({
    "<define:process>"() {
      define_process_default = { ENV: { production: false, sw: false } };
    }
  });

  // src/pages/auth/index.js
  var require_auth = __commonJS({
    "src/pages/auth/index.js"() {
      init_define_process();
    }
  });

  // src/main.js
  init_define_process();

  // src/App.svelte
  init_define_process();

  // node_modules/svelte/src/runtime/internal/index.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/animations.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/utils.js
  init_define_process();
  function noop() {
  }
  var identity = (x) => x;
  function assign(tar, src) {
    for (const k in src)
      tar[k] = src[k];
    return (
      /** @type {T & S} */
      tar
    );
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      for (const callback of callbacks) {
        callback(void 0);
      }
      return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length = $$scope.ctx.length / 32;
      for (let i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
      if (k[0] !== "$")
        result[k] = props[k];
    return result;
  }
  function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
  }
  function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
  }

  // node_modules/svelte/src/runtime/internal/environment.js
  init_define_process();
  var is_client = typeof window !== "undefined";
  var now = is_client ? () => window.performance.now() : () => Date.now();
  var raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;

  // node_modules/svelte/src/runtime/internal/loop.js
  init_define_process();
  var tasks = /* @__PURE__ */ new Set();
  function run_tasks(now2) {
    tasks.forEach((task) => {
      if (!task.c(now2)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0)
      raf(run_tasks);
  }
  function loop(callback) {
    let task;
    if (tasks.size === 0)
      raf(run_tasks);
    return {
      promise: new Promise((fulfill) => {
        tasks.add(task = { c: callback, f: fulfill });
      }),
      abort() {
        tasks.delete(task);
      }
    };
  }

  // node_modules/svelte/src/runtime/internal/style_manager.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/dom.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/globals.js
  init_define_process();
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
    // @ts-ignore Node typings have this
    global
  );

  // node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  var ResizeObserverSingleton = class _ResizeObserverSingleton {
    /**
     * @private
     * @readonly
     * @type {WeakMap<Element, import('./private.js').Listener>}
     */
    _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    /**
     * @private
     * @type {ResizeObserver}
     */
    _observer = void 0;
    /** @type {ResizeObserverOptions} */
    options;
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      this.options = options;
    }
    /**
     * @param {Element} element
     * @param {import('./private.js').Listener} listener
     * @returns {() => void}
     */
    observe(element2, listener) {
      this._listeners.set(element2, listener);
      this._getObserver().observe(element2, this.options);
      return () => {
        this._listeners.delete(element2);
        this._observer.unobserve(element2);
      };
    }
    /**
     * @private
     */
    _getObserver() {
      return this._observer ?? (this._observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          _ResizeObserverSingleton.entries.set(entry.target, entry);
          this._listeners.get(entry.target)?.(entry);
        }
      }));
    }
  };
  ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

  // node_modules/svelte/src/runtime/internal/dom.js
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && /** @type {ShadowRoot} */
    root.host) {
      return (
        /** @type {ShadowRoot} */
        root
      );
    }
    return node.ownerDocument;
  }
  function append_empty_stylesheet(node) {
    const style_element = element("style");
    style_element.textContent = "/* empty */";
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
  }
  function append_stylesheet(node, style) {
    append(
      /** @type {Document} */
      node.head || node,
      style
    );
    return style.sheet;
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function svg_element(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }
  function text(data2) {
    return document.createTextNode(data2);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data2) {
    data2 = "" + data2;
    if (text2.data === data2)
      return;
    text2.data = /** @type {string} */
    data2;
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function set_style(node, key, value, important) {
    if (value == null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? "important" : "");
    }
  }
  function select_option(select, value, mounting) {
    for (let i = 0; i < select.options.length; i += 1) {
      const option = select.options[i];
      if (option.__value === value) {
        option.selected = true;
        return;
      }
    }
    if (!mounting || value !== void 0) {
      select.selectedIndex = -1;
    }
  }
  function select_value(select) {
    const selected_option = select.querySelector(":checked");
    return selected_option && selected_option.__value;
  }
  function toggle_class(element2, name, toggle) {
    element2.classList.toggle(name, !!toggle);
  }
  function custom_event(type, detail2, { bubbles = false, cancelable = false } = {}) {
    return new CustomEvent(type, { detail: detail2, bubbles, cancelable });
  }
  var HtmlTag = class {
    /**
     * @private
     * @default false
     */
    is_svg = false;
    /** parent for creating node */
    e = void 0;
    /** html tag nodes */
    n = void 0;
    /** target */
    t = void 0;
    /** anchor */
    a = void 0;
    constructor(is_svg = false) {
      this.is_svg = is_svg;
      this.e = this.n = null;
    }
    /**
     * @param {string} html
     * @returns {void}
     */
    c(html) {
      this.h(html);
    }
    /**
     * @param {string} html
     * @param {HTMLElement | SVGElement} target
     * @param {HTMLElement | SVGElement} anchor
     * @returns {void}
     */
    m(html, target, anchor = null) {
      if (!this.e) {
        if (this.is_svg)
          this.e = svg_element(
            /** @type {keyof SVGElementTagNameMap} */
            target.nodeName
          );
        else
          this.e = element(
            /** @type {keyof HTMLElementTagNameMap} */
            target.nodeType === 11 ? "TEMPLATE" : target.nodeName
          );
        this.t = target.tagName !== "TEMPLATE" ? target : (
          /** @type {HTMLTemplateElement} */
          target.content
        );
        this.c(html);
      }
      this.i(anchor);
    }
    /**
     * @param {string} html
     * @returns {void}
     */
    h(html) {
      this.e.innerHTML = html;
      this.n = Array.from(
        this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes
      );
    }
    /**
     * @returns {void} */
    i(anchor) {
      for (let i = 0; i < this.n.length; i += 1) {
        insert(this.t, this.n[i], anchor);
      }
    }
    /**
     * @param {string} html
     * @returns {void}
     */
    p(html) {
      this.d();
      this.h(html);
      this.i(this.a);
    }
    /**
     * @returns {void} */
    d() {
      this.n.forEach(detach);
    }
  };
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach(
      /** @param {Element} node */
      (node) => {
        result[node.slot || "default"] = true;
      }
    );
    return result;
  }
  function construct_svelte_component(component, props) {
    return new component(props);
  }

  // node_modules/svelte/src/runtime/internal/style_manager.js
  var managed_styles = /* @__PURE__ */ new Map();
  var active = 0;
  function hash(str) {
    let hash2 = 5381;
    let i = str.length;
    while (i--)
      hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
    return hash2 >>> 0;
  }
  function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
  }
  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = "{\n";
    for (let p = 0; p <= 1; p += step) {
      const t = a + (b - a) * ease(p);
      keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
      rules[name] = true;
      stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || "";
    node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
  }
  function delete_rule(node, name) {
    const previous = (node.style.animation || "").split(", ");
    const next = previous.filter(
      name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
      // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
      node.style.animation = next.join(", ");
      active -= deleted;
      if (!active)
        clear_rules();
    }
  }
  function clear_rules() {
    raf(() => {
      if (active)
        return;
      managed_styles.forEach((info) => {
        const { ownerNode } = info.stylesheet;
        if (ownerNode)
          detach(ownerNode);
      });
      managed_styles.clear();
    });
  }

  // node_modules/svelte/src/runtime/internal/await_block.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/transitions.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/scheduler.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/lifecycle.js
  init_define_process();
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }

  // node_modules/svelte/src/runtime/internal/scheduler.js
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */ Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }

  // node_modules/svelte/src/runtime/internal/transitions.js
  var promise;
  function wait() {
    if (!promise) {
      promise = Promise.resolve();
      promise.then(() => {
        promise = null;
      });
    }
    return promise;
  }
  function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
  }
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  var null_transition = { duration: 0 };
  function create_in_transition(node, fn, params) {
    const options = { direction: "in" };
    let config = fn(node, params, options);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
      if (animation_name)
        delete_rule(node, animation_name);
    }
    function go() {
      const {
        delay = 0,
        duration = 300,
        easing = identity,
        tick: tick2 = noop,
        css
      } = config || null_transition;
      if (css)
        animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
      tick2(0, 1);
      const start_time = now() + delay;
      const end_time = start_time + duration;
      if (task)
        task.abort();
      running = true;
      add_render_callback(() => dispatch(node, true, "start"));
      task = loop((now2) => {
        if (running) {
          if (now2 >= end_time) {
            tick2(1, 0);
            dispatch(node, true, "end");
            cleanup();
            return running = false;
          }
          if (now2 >= start_time) {
            const t = easing((now2 - start_time) / duration);
            tick2(t, 1 - t);
          }
        }
        return running;
      });
    }
    let started = false;
    return {
      start() {
        if (started)
          return;
        started = true;
        delete_rule(node);
        if (is_function(config)) {
          config = config(options);
          wait().then(go);
        } else {
          go();
        }
      },
      invalidate() {
        started = false;
      },
      end() {
        if (running) {
          cleanup();
          running = false;
        }
      }
    };
  }

  // node_modules/svelte/src/runtime/internal/each.js
  init_define_process();
  function ensure_array_like(array_like_or_iterator) {
    return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }

  // node_modules/svelte/src/runtime/internal/spread.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/ssr.js
  init_define_process();

  // node_modules/svelte/src/shared/boolean_attributes.js
  init_define_process();
  var _boolean_attributes = (
    /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]
  );
  var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

  // node_modules/svelte/src/shared/utils/names.js
  init_define_process();

  // node_modules/svelte/src/runtime/internal/Component.js
  init_define_process();
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== void 0) {
      component.$$.bound[index] = callback;
      callback(component.$$.ctx[index]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance35, create_fragment43, not_equal, props, append_styles = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance35 ? instance35(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment43 ? create_fragment43($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, Function[]>} Event listeners */
      $$l = {};
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot2 = function(name) {
            return () => {
              let node;
              const obj = {
                c: function create() {
                  node = element("slot");
                  if (name !== "default") {
                    attr(node, "name", name);
                  }
                },
                /**
                 * @param {HTMLElement} target
                 * @param {HTMLElement} [anchor]
                 */
                m: function mount(target, anchor) {
                  insert(target, node, anchor);
                },
                d: function destroy(detaching) {
                  if (detaching) {
                    detach(node);
                  }
                }
              };
              return obj;
            };
          };
          await Promise.resolve();
          if (!this.$$cn) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              $$slots[name] = [create_slot2(name)];
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          for (const key in this.$$p_d) {
            if (!(key in this.$$d) && this[key] !== void 0) {
              this.$$d[key] = this[key];
              delete this[key];
            }
          }
          this.$$c = new this.$$ctor({
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$scope: {
                ctx: []
              }
            }
          });
          const reflect_attributes = () => {
            this.$$r = true;
            for (const key in this.$$p_d) {
              this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
              if (this.$$p_d[key].reflect) {
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key].attribute || key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
            }
            this.$$r = false;
          };
          this.$$c.$$.after_update.push(reflect_attributes);
          reflect_attributes();
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r)
          return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn) {
            this.$$c.$destroy();
            this.$$c = void 0;
          }
        });
      }
      $$g_p(attribute_name) {
        return Object.keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop, value, props_definition, transform) {
    const type = props_definition[prop]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  var SvelteComponent = class {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$ = void 0;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$set = void 0;
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  };

  // node_modules/svelte/src/runtime/internal/dev.js
  init_define_process();

  // node_modules/svelte/src/shared/version.js
  init_define_process();
  var PUBLIC_VERSION = "4";

  // node_modules/svelte/src/runtime/internal/disclose-version/index.js
  init_define_process();
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

  // node_modules/svelte/src/runtime/index.js
  init_define_process();

  // router.js
  init_define_process();
  function router() {
    let len = arguments.length - 1;
    let callback = arguments[len];
    let routes = arguments[0];
    let e404 = `404 - PAGE NOT FOUND`;
    if (len === 2)
      e404 = arguments[1];
    let curr;
    addEventListener("popstate", route2);
    addEventListener("pushstate", route2);
    document.body.addEventListener("click", (ev) => {
      let href = ev.target.getAttribute("href");
      if (!href)
        return;
      ev.preventDefault();
      route2(href);
    });
    route2();
    function route2(x, replace) {
      if (curr === x)
        return;
      if (typeof x !== "string")
        x = location.pathname;
      history.pushState(x, null, x);
      let params = {};
      let query = x.includes("?");
      if (query) {
        query = x.replace(/.*\?/, "").replace(/\=\=/g, "=").replace(/\&\&/g, "&").split("&");
        query.map((q) => {
          params[q.split("=")[0]] = q.split("=")[1];
        });
      }
      let match = routes.filter((route3) => {
        let path = route3.path;
        let keys = path.match(/\/:\w+/g);
        let re = new RegExp(path.replace(keys?.join(""), "(.*)"));
        let matched = location.pathname.match(re);
        let isMatch = matched && matched[0] === matched.input;
        if (isMatch) {
          let values = matched[1]?.split("/").slice(1);
          if (values && keys) {
            keys = keys?.join("").split("/:").slice(1);
            for (let i = 0; i < values.length; i++) {
              if (i < keys.length)
                params[keys[i]] = values[i];
              else
                params[i] = values[i];
            }
          }
        }
        return isMatch;
      });
      match = match[match.length - 1];
      if (match) {
        callback({ page: match.page, params });
      } else {
        if (typeof e404 === "string")
          console.log(e404);
        else
          callback({ page: e404, params });
      }
      window.scrollTo(0, 0);
      curr = location.pathname;
    }
    return {
      route: route2,
      listen() {
        route2(location.pathname + location.search);
      },
      unlisten() {
        removeEventListener("popstate", route2);
        removeEventListener("pushstate", route2);
        routes = [];
      }
    };
  }
  var router_default = router;

  // src/routes.js
  init_define_process();

  // src/pages/Abdimas.svelte
  init_define_process();
  function create_fragment(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>Pengabdian Masyarakat</h1> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos repellendus
      nulla soluta odio. Dolor sed viverra ipsum nunc aliquet bibendum. Suscipit
      adipiscing bibendum est ultricies integer. In mollis nunc sed id.
      Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet
      consectetur.</p>`;
        attr(article, "class", "container svelte-1hdo9mq");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  var Abdimas = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment, safe_not_equal, {});
    }
  };
  var Abdimas_default = Abdimas;

  // src/pages/About.svelte
  init_define_process();
  function create_fragment2(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>Profil</h1> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos repellendus
      nulla soluta odio. Vitae elementum curabitur vitae nunc. Sem nulla
      pharetra diam sit amet nisl suscipit. Odio ut enim blandit volutpat
      maecenas volutpat. Nec ultrices dui sapien eget mi proin sed libero enim.
      Ultrices gravida dictum fusce ut placerat orci nulla. Eget duis at tellus
      at urna. Est velit egestas dui id ornare arcu. Suscipit adipiscing
      bibendum est ultricies.</p>`;
        attr(article, "class", "container svelte-9f6d4p");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  var About = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment2, safe_not_equal, {});
    }
  };
  var About_default = About;

  // src/pages/AuthGoogle.svelte
  init_define_process();
  function create_fragment3(ctx) {
    let h2;
    return {
      c() {
        h2 = element("h2");
        h2.textContent = "Login With Google";
      },
      m(target, anchor) {
        insert(target, h2, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(h2);
        }
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let { params = {} } = $$props;
    console.log(params);
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    return [params];
  }
  var AuthGoogle = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment3, safe_not_equal, { params: 0 });
    }
  };
  var AuthGoogle_default = AuthGoogle;

  // src/pages/Index.svelte
  init_define_process();

  // src/libs/Hero.svelte
  init_define_process();
  function create_fragment4(ctx) {
    let section;
    let div;
    return {
      c() {
        section = element("section");
        div = element("div");
        div.innerHTML = `<p class="title svelte-ifdiuw">LPPM Universitas Internasional Semen Indonesia</p> <p class="subtitle svelte-ifdiuw">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
         veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
         commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
         velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
         occaecat cupidatat non proident, sunt in culpa qui officia deserunt
         mollit anim id est laborum.</p>`;
        attr(div, "class", "hero-body svelte-ifdiuw");
        set_style(
          div,
          "--url",
          /*urlImage*/
          ctx[0]
        );
        attr(section, "class", "hero is-medium");
      },
      m(target, anchor) {
        insert(target, section, anchor);
        append(section, div);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(section);
        }
      }
    };
  }
  function instance2($$self) {
    let dev = !define_process_default.ENV.production;
    let urlImage = dev ? "url(http://localhost:3000/img/vector-gradient.jpg" : "url(https://lppmuisi.dififa.com/img/vector-gradient.jpg";
    return [urlImage];
  }
  var Hero = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment4, safe_not_equal, {});
    }
  };
  var Hero_default = Hero;

  // src/modules/Pengumuman.svelte
  init_define_process();
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
  }
  function create_each_block(ctx) {
    let li;
    let label;
    let t0_value = (
      /*p*/
      ctx[2].title + ""
    );
    let t0;
    let label_for_value;
    let t1;
    let input;
    let input_id_value;
    let t2;
    let div;
    let p_1;
    let t4;
    return {
      c() {
        li = element("li");
        label = element("label");
        t0 = text(t0_value);
        t1 = space();
        input = element("input");
        t2 = space();
        div = element("div");
        p_1 = element("p");
        p_1.textContent = `${/*p*/
        ctx[2].content}`;
        t4 = space();
        attr(label, "for", label_for_value = /*p*/
        ctx[2].label);
        attr(label, "class", "svelte-1k7wu1i");
        input.hidden = true;
        attr(input, "type", "checkbox");
        attr(
          input,
          "name",
          /*accordionName*/
          ctx[0]
        );
        attr(input, "id", input_id_value = /*p*/
        ctx[2].idPengumuman);
        attr(input, "class", "svelte-1k7wu1i");
        attr(div, "class", "content svelte-1k7wu1i");
        attr(li, "class", "svelte-1k7wu1i");
      },
      m(target, anchor) {
        insert(target, li, anchor);
        append(li, label);
        append(label, t0);
        append(li, t1);
        append(li, input);
        append(li, t2);
        append(li, div);
        append(div, p_1);
        append(li, t4);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(li);
        }
      }
    };
  }
  function create_fragment5(ctx) {
    let section;
    let article;
    let div0;
    let t3;
    let br;
    let t4;
    let div1;
    let ul;
    let each_value = ensure_array_like(
      /*pengumuman*/
      ctx[1]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    return {
      c() {
        section = element("section");
        article = element("article");
        div0 = element("div");
        div0.innerHTML = `<h2>PENGUMUMAN</h2> <p>Daftar Pengumuman terkait kegiatan Penelitian &amp; Pengabdian
            Masyarakat LPPM UISI</p>`;
        t3 = space();
        br = element("br");
        t4 = space();
        div1 = element("div");
        ul = element("ul");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(div0, "class", "content svelte-1k7wu1i");
        attr(ul, "id", "accordion");
        attr(ul, "class", "svelte-1k7wu1i");
        attr(div1, "class", "list pengumuman");
        attr(article, "class", "container");
        attr(section, "class", "svelte-1k7wu1i");
      },
      m(target, anchor) {
        insert(target, section, anchor);
        append(section, article);
        append(article, div0);
        append(article, t3);
        append(article, br);
        append(article, t4);
        append(article, div1);
        append(div1, ul);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(ul, null);
          }
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*pengumuman, accordionName*/
        3) {
          each_value = ensure_array_like(
            /*pengumuman*/
            ctx2[1]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(ul, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(section);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function instance3($$self) {
    let accordionName;
    let pengumuman = [
      {
        label: "1",
        idPengumuman: "1",
        title: "Perpanjangan Batas Akhir Upload Proposal",
        content: " Pengumuman 1 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum."
      },
      {
        label: "2",
        idPengumuman: "2",
        title: "Daftar proposal lolos pendanaan",
        content: " Pengumuman 2 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum."
      },
      {
        label: "3",
        idPengumuman: "3",
        title: "Pembukaan Pendaftaran Proposal Penelitian & Pengabdian",
        content: " Pengumuman 3 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum."
      }
    ];
    return [accordionName, pengumuman];
  }
  var Pengumuman = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment5, safe_not_equal, {});
    }
  };
  var Pengumuman_default = Pengumuman;

  // src/modules/Footer.svelte
  init_define_process();
  function create_fragment6(ctx) {
    let footer;
    return {
      c() {
        footer = element("footer");
        footer.innerHTML = `<div class="content has-text-centered"><p>Copyright \xA9 2023
         <strong class="svelte-1h60z37">LPPM UISI</strong>. All Rights Reserved</p></div>`;
        attr(footer, "class", "footer svelte-1h60z37");
      },
      m(target, anchor) {
        insert(target, footer, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(footer);
        }
      }
    };
  }
  var Footer = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment6, safe_not_equal, {});
    }
  };
  var Footer_default = Footer;

  // src/pages/Index.svelte
  function create_fragment7(ctx) {
    let hero;
    let t0;
    let pengumuman;
    let t1;
    let footer;
    let current;
    hero = new Hero_default({});
    pengumuman = new Pengumuman_default({});
    footer = new Footer_default({});
    return {
      c() {
        create_component(hero.$$.fragment);
        t0 = space();
        create_component(pengumuman.$$.fragment);
        t1 = space();
        create_component(footer.$$.fragment);
      },
      m(target, anchor) {
        mount_component(hero, target, anchor);
        insert(target, t0, anchor);
        mount_component(pengumuman, target, anchor);
        insert(target, t1, anchor);
        mount_component(footer, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(hero.$$.fragment, local);
        transition_in(pengumuman.$$.fragment, local);
        transition_in(footer.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(hero.$$.fragment, local);
        transition_out(pengumuman.$$.fragment, local);
        transition_out(footer.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
        }
        destroy_component(hero, detaching);
        destroy_component(pengumuman, detaching);
        destroy_component(footer, detaching);
      }
    };
  }
  var Index = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment7, safe_not_equal, {});
    }
  };
  var Index_default = Index;

  // src/pages/Login.svelte
  init_define_process();

  // src/store/index.js
  init_define_process();

  // node_modules/svelte/src/runtime/store/index.js
  init_define_process();
  var subscriber_queue = [];
  function writable(value, start = noop) {
    let stop;
    const subscribers = /* @__PURE__ */ new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set, update2) || noop;
      }
      run2(value);
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && stop) {
          stop();
          stop = null;
        }
      };
    }
    return { set, update: update2, subscribe: subscribe2 };
  }

  // src/store/index.js
  var route = writable(0);
  var isLogin = writable(false);
  var apiURL = writable(define_process_default.ENV.production ? "https://lppmuisiapi.dififa.com" : "http://localhost:10443");

  // src/pages/Login.svelte
  function create_fragment8(ctx) {
    let article;
    let div9;
    let h2;
    let t1;
    let div1;
    let div0;
    let t3;
    let input0;
    let t4;
    let div3;
    let div2;
    let t6;
    let input1;
    let t7;
    let div4;
    let br;
    let t8;
    let button0;
    let t10;
    let div8;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        article = element("article");
        div9 = element("div");
        h2 = element("h2");
        h2.textContent = "LOGIN";
        t1 = space();
        div1 = element("div");
        div0 = element("div");
        div0.textContent = "Username";
        t3 = space();
        input0 = element("input");
        t4 = space();
        div3 = element("div");
        div2 = element("div");
        div2.textContent = "Password";
        t6 = space();
        input1 = element("input");
        t7 = space();
        div4 = element("div");
        br = element("br");
        t8 = space();
        button0 = element("button");
        button0.textContent = "Submit";
        t10 = space();
        div8 = element("div");
        button1 = element("button");
        button1.innerHTML = `<div class="gsi-material-button-state svelte-t9pr81"></div> <div class="gsi-material-button-content-wrapper svelte-t9pr81"><div class="gsi-material-button-icon svelte-t9pr81"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg></div> <span class="gsi-material-button-contents svelte-t9pr81">Sign in with Google</span> <span style="display: none;">Sign in with Google</span></div>`;
        attr(div0, "class", "svelte-t9pr81");
        attr(input0, "class", "input");
        attr(input0, "type", "text");
        attr(div1, "class", "svelte-t9pr81");
        attr(div2, "class", "svelte-t9pr81");
        attr(input1, "class", "input");
        attr(input1, "type", "password");
        attr(div3, "class", "svelte-t9pr81");
        attr(button0, "class", "button is-info svelte-t9pr81");
        attr(div4, "class", "svelte-t9pr81");
        attr(button1, "class", "gsi-material-button svelte-t9pr81");
        attr(div8, "class", "svelte-t9pr81");
        attr(div9, "class", "box svelte-t9pr81");
        attr(article, "class", "container svelte-t9pr81");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        append(article, div9);
        append(div9, h2);
        append(div9, t1);
        append(div9, div1);
        append(div1, div0);
        append(div1, t3);
        append(div1, input0);
        set_input_value(
          input0,
          /*username*/
          ctx[0]
        );
        append(div9, t4);
        append(div9, div3);
        append(div3, div2);
        append(div3, t6);
        append(div3, input1);
        set_input_value(
          input1,
          /*password*/
          ctx[1]
        );
        append(div9, t7);
        append(div9, div4);
        append(div4, br);
        append(div4, t8);
        append(div4, button0);
        append(div9, t10);
        append(div9, div8);
        append(div8, button1);
        if (!mounted) {
          dispose = [
            listen(
              input0,
              "input",
              /*input0_input_handler*/
              ctx[4]
            ),
            listen(
              input1,
              "input",
              /*input1_input_handler*/
              ctx[5]
            ),
            listen(
              button0,
              "click",
              /*handleSubmit*/
              ctx[2]
            ),
            listen(
              button1,
              "click",
              /*signGoogle*/
              ctx[3]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*username*/
        1 && input0.value !== /*username*/
        ctx2[0]) {
          set_input_value(
            input0,
            /*username*/
            ctx2[0]
          );
        }
        if (dirty & /*password*/
        2 && input1.value !== /*password*/
        ctx2[1]) {
          set_input_value(
            input1,
            /*password*/
            ctx2[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance4($$self, $$props, $$invalidate) {
    let $apiURL;
    let $route;
    let $isLogin;
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(6, $apiURL = $$value));
    component_subscribe($$self, route, ($$value) => $$invalidate(7, $route = $$value));
    component_subscribe($$self, isLogin, ($$value) => $$invalidate(8, $isLogin = $$value));
    let username = "";
    let password = "";
    async function handleSubmit(ev) {
      const payload = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      };
      const response = await fetch($apiURL + "/auth", payload);
      const result = await response.json();
      if (result.sukses) {
        set_store_value(isLogin, $isLogin = true, $isLogin);
        const { id, username: username2, role, token } = result;
        localStorage.setItem("id", id);
        localStorage.setItem("username", username2);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        if (role === "admin")
          $route("/admin");
        else
          $route("/dosen");
      }
    }
    async function signGoogle() {
      window.open($apiURL + "/auth/google", "_self");
      return;
    }
    function input0_input_handler() {
      username = this.value;
      $$invalidate(0, username);
    }
    function input1_input_handler() {
      password = this.value;
      $$invalidate(1, password);
    }
    return [
      username,
      password,
      handleSubmit,
      signGoogle,
      input0_input_handler,
      input1_input_handler
    ];
  }
  var Login = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance4, create_fragment8, safe_not_equal, {});
    }
  };
  var Login_default = Login;

  // src/pages/Logout.svelte
  init_define_process();
  function create_fragment9(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h3>TERIMA KASIH</h3> <p>Karena anda sudah menggunakan aplikasi ini.</p>`;
        attr(article, "class", "svelte-ppcz1w");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  function instance5($$self, $$props, $$invalidate) {
    let $isLogin;
    component_subscribe($$self, isLogin, ($$value) => $$invalidate(0, $isLogin = $$value));
    localStorage.clear();
    set_store_value(isLogin, $isLogin = false, $isLogin);
    setTimeout(
      () => {
        location.pathname = "/";
      },
      500
    );
    return [];
  }
  var Logout = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance5, create_fragment9, safe_not_equal, {});
    }
  };
  var Logout_default = Logout;

  // src/pages/Penelitian.svelte
  init_define_process();
  function create_fragment10(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>Penelitian</h1> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos repellendus
      nulla soluta odio. Aspernatur deleniti cumque, fugit tempore molestias
      iste eligendi quaerat fugiat esse voluptas! Rerum, sed! Obcaecati, magnam
      eligendi.</p>`;
        attr(article, "class", "container svelte-1hdo9mq");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  var Penelitian = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment10, safe_not_equal, {});
    }
  };
  var Penelitian_default = Penelitian;

  // src/pages/Register.svelte
  init_define_process();
  function create_fragment11(ctx) {
    let article;
    let div5;
    let h2;
    let t1;
    let div1;
    let div0;
    let t3;
    let input0;
    let t4;
    let div3;
    let div2;
    let t6;
    let input1;
    let t7;
    let div4;
    let br;
    let t8;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        article = element("article");
        div5 = element("div");
        h2 = element("h2");
        h2.textContent = "REGISTER";
        t1 = space();
        div1 = element("div");
        div0 = element("div");
        div0.textContent = "Username";
        t3 = space();
        input0 = element("input");
        t4 = space();
        div3 = element("div");
        div2 = element("div");
        div2.textContent = "Email";
        t6 = space();
        input1 = element("input");
        t7 = space();
        div4 = element("div");
        br = element("br");
        t8 = space();
        button = element("button");
        button.textContent = "Register";
        attr(div0, "class", "svelte-f1u2iy");
        attr(input0, "type", "text");
        attr(div1, "class", "svelte-f1u2iy");
        attr(div2, "class", "svelte-f1u2iy");
        attr(input1, "type", "email");
        attr(div3, "class", "svelte-f1u2iy");
        attr(button, "class", "svelte-f1u2iy");
        attr(div4, "class", "svelte-f1u2iy");
        attr(div5, "class", "box svelte-f1u2iy");
        attr(article, "class", "container svelte-f1u2iy");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        append(article, div5);
        append(div5, h2);
        append(div5, t1);
        append(div5, div1);
        append(div1, div0);
        append(div1, t3);
        append(div1, input0);
        set_input_value(
          input0,
          /*username*/
          ctx[0]
        );
        append(div5, t4);
        append(div5, div3);
        append(div3, div2);
        append(div3, t6);
        append(div3, input1);
        set_input_value(
          input1,
          /*email*/
          ctx[1]
        );
        append(div5, t7);
        append(div5, div4);
        append(div4, br);
        append(div4, t8);
        append(div4, button);
        if (!mounted) {
          dispose = [
            listen(
              input0,
              "input",
              /*input0_input_handler*/
              ctx[3]
            ),
            listen(
              input1,
              "input",
              /*input1_input_handler*/
              ctx[4]
            ),
            listen(
              button,
              "click",
              /*handleSubmit*/
              ctx[2]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*username*/
        1 && input0.value !== /*username*/
        ctx2[0]) {
          set_input_value(
            input0,
            /*username*/
            ctx2[0]
          );
        }
        if (dirty & /*email*/
        2 && input1.value !== /*email*/
        ctx2[1]) {
          set_input_value(
            input1,
            /*email*/
            ctx2[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance6($$self, $$props, $$invalidate) {
    let $route;
    let $apiURL;
    component_subscribe($$self, route, ($$value) => $$invalidate(5, $route = $$value));
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(6, $apiURL = $$value));
    let username = "dosen";
    let email = "";
    async function handleSubmit(ev) {
      const payload = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email })
      };
      const response = await fetch($apiURL + "//user", payload);
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        localStorage.setItem("code", result.code);
        $route("/verify");
      } else {
        console.log(result);
      }
    }
    function input0_input_handler() {
      username = this.value;
      $$invalidate(0, username);
    }
    function input1_input_handler() {
      email = this.value;
      $$invalidate(1, email), $$invalidate(0, username);
    }
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*username*/
      1) {
        $:
          username, $$invalidate(1, email = username + "@pt.ac.id");
      }
    };
    return [username, email, handleSubmit, input0_input_handler, input1_input_handler];
  }
  var Register = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance6, create_fragment11, safe_not_equal, {});
    }
  };
  var Register_default = Register;

  // src/pages/Verify.svelte
  init_define_process();
  function create_fragment12(ctx) {
    let article;
    let div7;
    let h2;
    let t1;
    let p;
    let t2;
    let b;
    let t3;
    let t4;
    let div1;
    let div0;
    let t6;
    let input0;
    let t7;
    let div3;
    let div2;
    let t9;
    let input1;
    let t10;
    let div5;
    let div4;
    let t12;
    let input2;
    let t13;
    let div6;
    let br;
    let t14;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        article = element("article");
        div7 = element("div");
        h2 = element("h2");
        h2.textContent = "VERIFY USER";
        t1 = space();
        p = element("p");
        t2 = text("Code: ");
        b = element("b");
        t3 = text(
          /*code*/
          ctx[1]
        );
        t4 = space();
        div1 = element("div");
        div0 = element("div");
        div0.textContent = "Username";
        t6 = space();
        input0 = element("input");
        t7 = space();
        div3 = element("div");
        div2 = element("div");
        div2.textContent = "Code";
        t9 = space();
        input1 = element("input");
        t10 = space();
        div5 = element("div");
        div4 = element("div");
        div4.textContent = "Password";
        t12 = space();
        input2 = element("input");
        t13 = space();
        div6 = element("div");
        br = element("br");
        t14 = space();
        button = element("button");
        button.textContent = "Verify";
        attr(div0, "class", "svelte-f1u2iy");
        attr(input0, "type", "text");
        attr(div1, "class", "svelte-f1u2iy");
        attr(div2, "class", "svelte-f1u2iy");
        attr(input1, "type", "text");
        attr(div3, "class", "svelte-f1u2iy");
        attr(div4, "class", "svelte-f1u2iy");
        attr(input2, "type", "password");
        attr(div5, "class", "svelte-f1u2iy");
        attr(button, "class", "svelte-f1u2iy");
        attr(div6, "class", "svelte-f1u2iy");
        attr(div7, "class", "box svelte-f1u2iy");
        attr(article, "class", "container svelte-f1u2iy");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        append(article, div7);
        append(div7, h2);
        append(div7, t1);
        append(div7, p);
        append(p, t2);
        append(p, b);
        append(b, t3);
        append(div7, t4);
        append(div7, div1);
        append(div1, div0);
        append(div1, t6);
        append(div1, input0);
        set_input_value(
          input0,
          /*username*/
          ctx[0]
        );
        append(div7, t7);
        append(div7, div3);
        append(div3, div2);
        append(div3, t9);
        append(div3, input1);
        set_input_value(
          input1,
          /*code*/
          ctx[1]
        );
        append(div7, t10);
        append(div7, div5);
        append(div5, div4);
        append(div5, t12);
        append(div5, input2);
        set_input_value(
          input2,
          /*password*/
          ctx[2]
        );
        append(div7, t13);
        append(div7, div6);
        append(div6, br);
        append(div6, t14);
        append(div6, button);
        if (!mounted) {
          dispose = [
            listen(
              input0,
              "input",
              /*input0_input_handler*/
              ctx[4]
            ),
            listen(
              input1,
              "input",
              /*input1_input_handler*/
              ctx[5]
            ),
            listen(
              input2,
              "input",
              /*input2_input_handler*/
              ctx[6]
            ),
            listen(
              button,
              "click",
              /*handleSubmit*/
              ctx[3]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*code*/
        2)
          set_data(
            t3,
            /*code*/
            ctx2[1]
          );
        if (dirty & /*username*/
        1 && input0.value !== /*username*/
        ctx2[0]) {
          set_input_value(
            input0,
            /*username*/
            ctx2[0]
          );
        }
        if (dirty & /*code*/
        2 && input1.value !== /*code*/
        ctx2[1]) {
          set_input_value(
            input1,
            /*code*/
            ctx2[1]
          );
        }
        if (dirty & /*password*/
        4 && input2.value !== /*password*/
        ctx2[2]) {
          set_input_value(
            input2,
            /*password*/
            ctx2[2]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance7($$self, $$props, $$invalidate) {
    let $route;
    let $apiURL;
    component_subscribe($$self, route, ($$value) => $$invalidate(7, $route = $$value));
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(8, $apiURL = $$value));
    let username = "dosen";
    let code = localStorage.getItem("code");
    let password = "1234";
    async function handleSubmit(ev) {
      const payload = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, code, password })
      };
      const response = await fetch($apiURL + "/verify", payload);
      if (response.status === 204) {
        console.log("Gagal");
      } else if (response.status === 200) {
        console.log("sukses");
        $route("/login");
      }
    }
    function input0_input_handler() {
      username = this.value;
      $$invalidate(0, username);
    }
    function input1_input_handler() {
      code = this.value;
      $$invalidate(1, code);
    }
    function input2_input_handler() {
      password = this.value;
      $$invalidate(2, password);
    }
    return [
      username,
      code,
      password,
      handleSubmit,
      input0_input_handler,
      input1_input_handler,
      input2_input_handler
    ];
  }
  var Verify = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance7, create_fragment12, safe_not_equal, {});
    }
  };
  var Verify_default = Verify;

  // src/pages/admin/Index.svelte
  init_define_process();

  // src/pages/admin/index.js
  var admin_exports = {};
  __export(admin_exports, {
    aboutuisi: () => aboutuisi_default,
    buatpengumuman: () => buatpengumuman_default,
    createuser: () => createuser_default,
    home: () => home_default,
    pengumuman: () => pengumuman_default,
    profile: () => profile_default,
    proposal: () => proposal_default,
    proposals: () => proposals_default,
    users: () => users_default
  });
  init_define_process();

  // src/pages/admin/aboutuisi.svelte
  init_define_process();

  // src/libs/Article.svelte
  init_define_process();

  // node_modules/svelte/src/runtime/transition/index.js
  init_define_process();

  // node_modules/svelte/src/runtime/easing/index.js
  init_define_process();

  // node_modules/svelte/src/runtime/transition/index.js
  function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
      delay,
      duration,
      easing,
      css: (t) => `opacity: ${t * o}`
    };
  }

  // src/libs/Article.svelte
  function create_fragment13(ctx) {
    let article;
    let article_intro;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[1].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[0],
      null
    );
    return {
      c() {
        article = element("article");
        if (default_slot)
          default_slot.c();
        attr(article, "class", "svelte-h8uanz");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        if (default_slot) {
          default_slot.m(article, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          1)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[0],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[0]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[0],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        if (local) {
          if (!article_intro) {
            add_render_callback(() => {
              article_intro = create_in_transition(article, fade, {});
              article_intro.start();
            });
          }
        }
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(article);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance8($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    $$self.$$set = ($$props2) => {
      if ("$$scope" in $$props2)
        $$invalidate(0, $$scope = $$props2.$$scope);
    };
    return [$$scope, slots];
  }
  var Article = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance8, create_fragment13, safe_not_equal, {});
    }
  };
  var Article_default = Article;

  // src/libs/Field.svelte
  init_define_process();
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[21] = list[i];
    return child_ctx;
  }
  function create_else_block(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "type", "text");
        attr(input, "class", "svelte-a4hyjq");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*value*/
          ctx[1]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler_1*/
              ctx[18]
            ),
            listen(input, "click", function() {
              if (is_function(
                /*onclick*/
                ctx[8]
              ))
                ctx[8].apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & /*value*/
        2 && input.value !== /*value*/
        ctx[1]) {
          set_input_value(
            input,
            /*value*/
            ctx[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_4(ctx) {
    let a;
    let t;
    return {
      c() {
        a = element("a");
        t = text(
          /*value*/
          ctx[1]
        );
        attr(
          a,
          "href",
          /*href*/
          ctx[7]
        );
        attr(a, "class", "svelte-a4hyjq");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        append(a, t);
      },
      p(ctx2, dirty) {
        if (dirty & /*value*/
        2)
          set_data(
            t,
            /*value*/
            ctx2[1]
          );
        if (dirty & /*href*/
        128) {
          attr(
            a,
            "href",
            /*href*/
            ctx2[7]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(a);
        }
      }
    };
  }
  function create_if_block_3(ctx) {
    let p;
    let select_1;
    let mounted;
    let dispose;
    let each_value = ensure_array_like(
      /*value*/
      ctx[1]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
    }
    return {
      c() {
        p = element("p");
        select_1 = element("select");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(select_1, "class", "svelte-a4hyjq");
        attr(p, "class", "select svelte-a4hyjq");
      },
      m(target, anchor) {
        insert(target, p, anchor);
        append(p, select_1);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(select_1, null);
          }
        }
        if (!mounted) {
          dispose = listen(
            select_1,
            "change",
            /*fillSelect*/
            ctx[10]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*value*/
        2) {
          each_value = ensure_array_like(
            /*value*/
            ctx2[1]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context2(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block2(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(select_1, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(p);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_2(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input svelte-a4hyjq");
        attr(input, "type", "month");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*value*/
          ctx[1]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler*/
              ctx[17]
            ),
            listen(input, "click", function() {
              if (is_function(
                /*onclick*/
                ctx[8]
              ))
                ctx[8].apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & /*value*/
        2) {
          set_input_value(
            input,
            /*value*/
            ctx[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_1(ctx) {
    let textarea_1;
    let mounted;
    let dispose;
    return {
      c() {
        textarea_1 = element("textarea");
        attr(
          textarea_1,
          "id",
          /*id*/
          ctx[2]
        );
        attr(textarea_1, "class", "svelte-a4hyjq");
      },
      m(target, anchor) {
        insert(target, textarea_1, anchor);
        set_input_value(
          textarea_1,
          /*value*/
          ctx[1]
        );
        if (!mounted) {
          dispose = [
            listen(
              textarea_1,
              "input",
              /*textarea_1_input_handler*/
              ctx[16]
            ),
            listen(textarea_1, "click", function() {
              if (is_function(
                /*onclick*/
                ctx[8]
              ))
                ctx[8].apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & /*id*/
        4) {
          attr(
            textarea_1,
            "id",
            /*id*/
            ctx[2]
          );
        }
        if (dirty & /*value*/
        2) {
          set_input_value(
            textarea_1,
            /*value*/
            ctx[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(textarea_1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block(ctx) {
    let a;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[15].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[14],
      null
    );
    return {
      c() {
        a = element("a");
        if (default_slot)
          default_slot.c();
        attr(a, "class", "svelte-a4hyjq");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        if (default_slot) {
          default_slot.m(a, null);
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          16384)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[14],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[14]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[14],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function create_each_block2(ctx) {
    let option;
    let t_value = (
      /*it*/
      ctx[21].username + ""
    );
    let t;
    let option_value_value;
    let goSelect_action;
    let mounted;
    let dispose;
    return {
      c() {
        option = element("option");
        t = text(t_value);
        option.__value = option_value_value = /*it*/
        ctx[21].id;
        set_input_value(option, option.__value);
        attr(option, "class", "svelte-a4hyjq");
      },
      m(target, anchor) {
        insert(target, option, anchor);
        append(option, t);
        if (!mounted) {
          dispose = action_destroyer(goSelect_action = /*goSelect*/
          ctx[11].call(null, option));
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*value*/
        2 && t_value !== (t_value = /*it*/
        ctx2[21].username + ""))
          set_data(t, t_value);
        if (dirty & /*value*/
        2 && option_value_value !== (option_value_value = /*it*/
        ctx2[21].id)) {
          option.__value = option_value_value;
          set_input_value(option, option.__value);
        }
      },
      d(detaching) {
        if (detaching) {
          detach(option);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment14(ctx) {
    let div;
    let b;
    let t0;
    let t1;
    let current_block_type_index;
    let if_block;
    let current;
    const if_block_creators = [
      create_if_block,
      create_if_block_1,
      create_if_block_2,
      create_if_block_3,
      create_if_block_4,
      create_else_block
    ];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*hasSlot*/
        ctx2[9]
      )
        return 0;
      if (
        /*textarea*/
        ctx2[3] && !/*view*/
        ctx2[6]
      )
        return 1;
      if (
        /*datepicker*/
        ctx2[4] && !/*view*/
        ctx2[6]
      )
        return 2;
      if (
        /*select*/
        ctx2[5] && /*view*/
        ctx2[6]
      )
        return 3;
      if (
        /*view*/
        ctx2[6]
      )
        return 4;
      return 5;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        div = element("div");
        b = element("b");
        t0 = text(
          /*name*/
          ctx[0]
        );
        t1 = space();
        if_block.c();
        attr(b, "class", "svelte-a4hyjq");
        attr(div, "class", "svelte-a4hyjq");
        toggle_class(
          div,
          "view",
          /*view*/
          ctx[6]
        );
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, b);
        append(b, t0);
        append(div, t1);
        if_blocks[current_block_type_index].m(div, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (!current || dirty & /*name*/
        1)
          set_data(
            t0,
            /*name*/
            ctx2[0]
          );
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
        if (!current || dirty & /*view*/
        64) {
          toggle_class(
            div,
            "view",
            /*view*/
            ctx2[6]
          );
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if_blocks[current_block_type_index].d();
      }
    };
  }
  function instance9($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { id } = $$props;
    let { name = "" } = $$props;
    let { value = "" } = $$props;
    let { selected } = $$props;
    let { textarea = false } = $$props;
    let { datepicker = false } = $$props;
    let { select = false } = $$props;
    let { view } = $$props;
    let { href } = $$props;
    let { onclick } = $$props;
    let { userId } = $$props;
    const slot = $$props.$$slots || {};
    const hasSlot = slot.hasOwnProperty("default");
    if (name) {
      name = name[0].toUpperCase() + name.slice(1);
      name = name.replaceAll("__", "/").replaceAll("_", " ");
    }
    function fillSelect(event) {
      let select2 = event.target;
      $$invalidate(12, selected = Number(select2.value));
    }
    function goSelect(el) {
      let valueId = el.value;
      if (Number(valueId) === userId) {
        el.setAttribute("selected", "");
      }
    }
    function textarea_1_input_handler() {
      value = this.value;
      $$invalidate(1, value);
    }
    function input_input_handler() {
      value = this.value;
      $$invalidate(1, value);
    }
    function input_input_handler_1() {
      value = this.value;
      $$invalidate(1, value);
    }
    $$self.$$set = ($$new_props) => {
      $$invalidate(20, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      if ("id" in $$new_props)
        $$invalidate(2, id = $$new_props.id);
      if ("name" in $$new_props)
        $$invalidate(0, name = $$new_props.name);
      if ("value" in $$new_props)
        $$invalidate(1, value = $$new_props.value);
      if ("selected" in $$new_props)
        $$invalidate(12, selected = $$new_props.selected);
      if ("textarea" in $$new_props)
        $$invalidate(3, textarea = $$new_props.textarea);
      if ("datepicker" in $$new_props)
        $$invalidate(4, datepicker = $$new_props.datepicker);
      if ("select" in $$new_props)
        $$invalidate(5, select = $$new_props.select);
      if ("view" in $$new_props)
        $$invalidate(6, view = $$new_props.view);
      if ("href" in $$new_props)
        $$invalidate(7, href = $$new_props.href);
      if ("onclick" in $$new_props)
        $$invalidate(8, onclick = $$new_props.onclick);
      if ("userId" in $$new_props)
        $$invalidate(13, userId = $$new_props.userId);
      if ("$$scope" in $$new_props)
        $$invalidate(14, $$scope = $$new_props.$$scope);
    };
    $$props = exclude_internal_props($$props);
    return [
      name,
      value,
      id,
      textarea,
      datepicker,
      select,
      view,
      href,
      onclick,
      hasSlot,
      fillSelect,
      goSelect,
      selected,
      userId,
      $$scope,
      slots,
      textarea_1_input_handler,
      input_input_handler,
      input_input_handler_1
    ];
  }
  var Field = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance9, create_fragment14, safe_not_equal, {
        id: 2,
        name: 0,
        value: 1,
        selected: 12,
        textarea: 3,
        datepicker: 4,
        select: 5,
        view: 6,
        href: 7,
        onclick: 8,
        userId: 13
      });
    }
  };
  var Field_default = Field;

  // src/libs/Wysiwyg.svelte
  init_define_process();
  function create_fragment15(ctx) {
    let div;
    let textarea;
    let textarea_value_value;
    return {
      c() {
        div = element("div");
        textarea = element("textarea");
        attr(
          textarea,
          "name",
          /*name*/
          ctx[2]
        );
        attr(
          textarea,
          "id",
          /*id*/
          ctx[0]
        );
        textarea.value = textarea_value_value = "      " + /*content*/
        ctx[1] + "\r\n   ";
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, textarea);
        ctx[4](textarea);
      },
      p(ctx2, [dirty]) {
        if (dirty & /*name*/
        4) {
          attr(
            textarea,
            "name",
            /*name*/
            ctx2[2]
          );
        }
        if (dirty & /*id*/
        1) {
          attr(
            textarea,
            "id",
            /*id*/
            ctx2[0]
          );
        }
        if (dirty & /*content*/
        2 && textarea_value_value !== (textarea_value_value = "      " + /*content*/
        ctx2[1] + "\r\n   ")) {
          textarea.value = textarea_value_value;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        ctx[4](null);
      }
    };
  }
  function instance10($$self, $$props, $$invalidate) {
    let { id } = $$props;
    let { content = "" } = $$props;
    let { name } = $$props;
    let me;
    let selector = "#" + id;
    onMount(() => {
      try {
        tinymce.remove(selector);
      } catch (error) {
      }
      tinymce.init({
        selector,
        plugins: "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount ",
        toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" }
        ]
      });
    });
    function textarea_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        me = $$value;
        $$invalidate(3, me);
      });
    }
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(0, id = $$props2.id);
      if ("content" in $$props2)
        $$invalidate(1, content = $$props2.content);
      if ("name" in $$props2)
        $$invalidate(2, name = $$props2.name);
    };
    return [id, content, name, me, textarea_binding];
  }
  var Wysiwyg = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance10, create_fragment15, safe_not_equal, { id: 0, content: 1, name: 2 });
    }
  };
  var Wysiwyg_default = Wysiwyg;

  // src/pages/admin/aboutuisi.svelte
  function create_default_slot_3(ctx) {
    let wysiwyg;
    let current;
    wysiwyg = new Wysiwyg_default({
      props: { id: "isi", content: (
        /*lppmUisi*/
        ctx[0]
      ) }
    });
    return {
      c() {
        create_component(wysiwyg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(wysiwyg, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(wysiwyg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(wysiwyg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(wysiwyg, detaching);
      }
    };
  }
  function create_default_slot_2(ctx) {
    let wysiwyg;
    let current;
    wysiwyg = new Wysiwyg_default({
      props: {
        id: "isi",
        content: (
          /*fungsiTujuan*/
          ctx[1]
        )
      }
    });
    return {
      c() {
        create_component(wysiwyg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(wysiwyg, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(wysiwyg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(wysiwyg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(wysiwyg, detaching);
      }
    };
  }
  function create_default_slot_1(ctx) {
    let wysiwyg;
    let current;
    wysiwyg = new Wysiwyg_default({
      props: { id: "isi", content: (
        /*visiMisi*/
        ctx[2]
      ) }
    });
    return {
      c() {
        create_component(wysiwyg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(wysiwyg, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(wysiwyg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(wysiwyg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(wysiwyg, detaching);
      }
    };
  }
  function create_default_slot(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let field0;
    let t3;
    let field1;
    let t4;
    let field2;
    let current;
    field0 = new Field_default({
      props: {
        name: "LPPM UISI",
        $$slots: { default: [create_default_slot_3] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Fungsi & Tujuan",
        $$slots: { default: [create_default_slot_2] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Visi & Misi",
        $$slots: { default: [create_default_slot_1] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "About UISI";
        t1 = space();
        hr = element("hr");
        t2 = space();
        create_component(field0.$$.fragment);
        t3 = space();
        create_component(field1.$$.fragment);
        t4 = space();
        create_component(field2.$$.fragment);
        attr(h1, "class", "title is-1");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        mount_component(field0, target, anchor);
        insert(target, t3, anchor);
        mount_component(field1, target, anchor);
        insert(target, t4, anchor);
        mount_component(field2, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty & /*$$scope*/
        8) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty & /*$$scope*/
        8) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty & /*$$scope*/
        8) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(t3);
          detach(t4);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
      }
    };
  }
  function create_fragment16(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope*/
        8) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function instance11($$self) {
    let lppmUisi, fungsiTujuan, visiMisi;
    return [lppmUisi, fungsiTujuan, visiMisi];
  }
  var Aboutuisi = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance11, create_fragment16, safe_not_equal, {});
    }
  };
  var aboutuisi_default = Aboutuisi;

  // src/pages/admin/buatpengumuman.svelte
  init_define_process();
  function create_default_slot_22(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Judul Pengumuman");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*judulPengumuman*/
          ctx[0]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[2]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*judulPengumuman*/
        1 && input.value !== /*judulPengumuman*/
        ctx2[0]) {
          set_input_value(
            input,
            /*judulPengumuman*/
            ctx2[0]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_12(ctx) {
    let wysiwyg;
    let current;
    wysiwyg = new Wysiwyg_default({
      props: {
        id: "isi",
        content: (
          /*isiPengumuman*/
          ctx[1]
        )
      }
    });
    return {
      c() {
        create_component(wysiwyg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(wysiwyg, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(wysiwyg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(wysiwyg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(wysiwyg, detaching);
      }
    };
  }
  function create_default_slot2(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let field0;
    let t3;
    let field1;
    let current;
    field0 = new Field_default({
      props: {
        name: "Judul Pengumuman",
        $$slots: { default: [create_default_slot_22] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Isi Pengumuman",
        $$slots: { default: [create_default_slot_12] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Buat Pengumuman";
        t1 = space();
        hr = element("hr");
        t2 = space();
        create_component(field0.$$.fragment);
        t3 = space();
        create_component(field1.$$.fragment);
        attr(h1, "class", "title is-1");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        mount_component(field0, target, anchor);
        insert(target, t3, anchor);
        mount_component(field1, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty & /*$$scope, judulPengumuman*/
        9) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty & /*$$scope*/
        8) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(t3);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
      }
    };
  }
  function create_fragment17(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot2] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope, judulPengumuman*/
        9) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function instance12($$self, $$props, $$invalidate) {
    let judulPengumuman, isiPengumuman;
    function input_input_handler() {
      judulPengumuman = this.value;
      $$invalidate(0, judulPengumuman);
    }
    return [judulPengumuman, isiPengumuman, input_input_handler];
  }
  var Buatpengumuman = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance12, create_fragment17, safe_not_equal, {});
    }
  };
  var buatpengumuman_default = Buatpengumuman;

  // src/pages/admin/createuser.svelte
  init_define_process();
  function create_default_slot3(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let div1;
    let t5;
    let div3;
    let t8;
    let div6;
    let label2;
    let t10;
    let div5;
    let div4;
    let select;
    let option0;
    let option1;
    let option2;
    let option3;
    let option4;
    let t16;
    let br;
    let t17;
    let div9;
    let div7;
    let button0;
    let t19;
    let div8;
    let mounted;
    let dispose;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Create User";
        t1 = space();
        hr = element("hr");
        t2 = space();
        div1 = element("div");
        div1.innerHTML = `<label class="label">Username</label> <div class="control"><input class="input" type="text" placeholder="Username..."/></div>`;
        t5 = space();
        div3 = element("div");
        div3.innerHTML = `<label class="label">Password</label> <div class="control"><input class="input" type="text" placeholder="Password..."/></div>`;
        t8 = space();
        div6 = element("div");
        label2 = element("label");
        label2.textContent = "Role";
        t10 = space();
        div5 = element("div");
        div4 = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Ka.Departemen";
        option1 = element("option");
        option1.textContent = "Ka.LPPM";
        option2 = element("option");
        option2.textContent = "Ka.PusatKajian";
        option3 = element("option");
        option3.textContent = "Reviewer";
        option4 = element("option");
        option4.textContent = "Dosen";
        t16 = space();
        br = element("br");
        t17 = space();
        div9 = element("div");
        div7 = element("div");
        button0 = element("button");
        button0.textContent = "Kembali";
        t19 = space();
        div8 = element("div");
        div8.innerHTML = `<button class="button is-info">Create</button>`;
        attr(h1, "class", "title is-1");
        attr(div1, "class", "field");
        attr(div3, "class", "field");
        attr(label2, "class", "label");
        option0.__value = "Ka.Departemen";
        set_input_value(option0, option0.__value);
        option1.__value = "Ka.LPPM";
        set_input_value(option1, option1.__value);
        option2.__value = "Ka.PusatKajian";
        set_input_value(option2, option2.__value);
        option3.__value = "Reviewer";
        set_input_value(option3, option3.__value);
        option4.__value = "Dosen";
        set_input_value(option4, option4.__value);
        attr(div4, "class", "select");
        attr(div5, "class", "control");
        attr(div6, "class", "field");
        attr(button0, "class", "button is-info is-light");
        attr(div7, "class", "control");
        attr(div8, "class", "control");
        attr(div9, "class", "field is-grouped");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, div1, anchor);
        insert(target, t5, anchor);
        insert(target, div3, anchor);
        insert(target, t8, anchor);
        insert(target, div6, anchor);
        append(div6, label2);
        append(div6, t10);
        append(div6, div5);
        append(div5, div4);
        append(div4, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        append(select, option3);
        append(select, option4);
        insert(target, t16, anchor);
        insert(target, br, anchor);
        insert(target, t17, anchor);
        insert(target, div9, anchor);
        append(div9, div7);
        append(div7, button0);
        append(div9, t19);
        append(div9, div8);
        if (!mounted) {
          dispose = listen(
            button0,
            "click",
            /*kembali*/
            ctx[0]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(div1);
          detach(t5);
          detach(div3);
          detach(t8);
          detach(div6);
          detach(t16);
          detach(br);
          detach(t17);
          detach(div9);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment18(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot3] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope*/
        4) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function instance13($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(1, $route = $$value));
    function kembali() {
      $route("/admin/users");
    }
    return [kembali];
  }
  var Createuser = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance13, create_fragment18, safe_not_equal, {});
    }
  };
  var createuser_default = Createuser;

  // src/pages/admin/home.svelte
  init_define_process();

  // src/store/icons.js
  init_define_process();
  var accountAdd = "M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7H4m11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1Z";
  var infoOutline = "M11 17h2v-6h-2v6Zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z";
  var addProposal = "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.7q-.475-.225-.975-.387T19 11.075V5H5v14h6.05q.075.55.238 1.05t.387.95H5Zm0-3v1V5v6.075V11v7Zm2-1h4.075q.075-.525.238-1.025t.362-.975H7v2Zm0-4h6.1q.8-.75 1.788-1.25T17 11.075V11H7v2Zm0-4h10V7H7v2Zm11 14q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23Zm-.5-2h1v-2.5H21v-1h-2.5V15h-1v2.5H15v1h2.5V21Z";
  var add = "M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z";
  var deleteIcon = "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z";

  // src/pages/admin/home.svelte
  function create_default_slot4(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let div;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Dashboard";
        t1 = space();
        hr = element("hr");
        t2 = space();
        div = element("div");
        div.innerHTML = `<p>Coming Soon</p>`;
        attr(h1, "class", "title is-1");
        attr(div, "class", "columns notification is-info is-light");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, div, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(div);
        }
      }
    };
  }
  function create_fragment19(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot4] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope*/
        1) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  var Home = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment19, safe_not_equal, {});
    }
  };
  var home_default = Home;

  // src/pages/admin/pengumuman.svelte
  init_define_process();

  // src/libs/Icon.svelte
  init_define_process();
  function create_fragment20(ctx) {
    let svg;
    let path;
    return {
      c() {
        svg = svg_element("svg");
        path = svg_element("path");
        attr(path, "fill", "currentColor");
        attr(
          path,
          "d",
          /*src*/
          ctx[1]
        );
        attr(
          svg,
          "id",
          /*id*/
          ctx[0]
        );
        attr(svg, "xmlns", "http://www.w3.org/2000/svg");
        attr(
          svg,
          "width",
          /*width*/
          ctx[2]
        );
        attr(
          svg,
          "height",
          /*tinggi*/
          ctx[3]
        );
        attr(svg, "viewBox", "0 0 24 24");
      },
      m(target, anchor) {
        insert(target, svg, anchor);
        append(svg, path);
      },
      p(ctx2, [dirty]) {
        if (dirty & /*src*/
        2) {
          attr(
            path,
            "d",
            /*src*/
            ctx2[1]
          );
        }
        if (dirty & /*id*/
        1) {
          attr(
            svg,
            "id",
            /*id*/
            ctx2[0]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(svg);
        }
      }
    };
  }
  function instance14($$self, $$props, $$invalidate) {
    let { id } = $$props;
    let { src } = $$props;
    let { size = 1 } = $$props;
    let width = 24 * Number(size);
    let tinggi = 24 * Number(size);
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(0, id = $$props2.id);
      if ("src" in $$props2)
        $$invalidate(1, src = $$props2.src);
      if ("size" in $$props2)
        $$invalidate(4, size = $$props2.size);
    };
    return [id, src, width, tinggi, size];
  }
  var Icon = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance14, create_fragment20, safe_not_equal, { id: 0, src: 1, size: 4 });
    }
  };
  var Icon_default = Icon;

  // src/pages/admin/pengumuman.svelte
  function create_default_slot5(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let button0;
    let span0;
    let icon0;
    let t3;
    let span1;
    let t5;
    let table;
    let thead;
    let t9;
    let tbody;
    let tr1;
    let td0;
    let button1;
    let span2;
    let icon1;
    let t10;
    let td1;
    let t12;
    let td2;
    let button2;
    let span3;
    let icon2;
    let current;
    let mounted;
    let dispose;
    icon0 = new Icon_default({ props: { id: "add", src: add } });
    icon1 = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    icon2 = new Icon_default({ props: { id: "orang", src: infoOutline } });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Pengumuman";
        t1 = space();
        hr = element("hr");
        t2 = space();
        button0 = element("button");
        span0 = element("span");
        create_component(icon0.$$.fragment);
        t3 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Buat Pengumuman</a>`;
        t5 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow"></th> <th>Judul</th> <th class="is-narrow"></th></tr>`;
        t9 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        td0 = element("td");
        button1 = element("button");
        span2 = element("span");
        create_component(icon1.$$.fragment);
        t10 = space();
        td1 = element("td");
        td1.textContent = "...";
        t12 = space();
        td2 = element("td");
        button2 = element("button");
        span3 = element("span");
        create_component(icon2.$$.fragment);
        attr(h1, "class", "title is-1");
        attr(span0, "class", "icon");
        attr(button0, "class", "button is-info");
        attr(span2, "class", "icon");
        attr(button1, "class", "button is-danger is-rounded is-small");
        attr(span3, "class", "icon");
        attr(button2, "class", "button is-info is-rounded is-small");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, button0, anchor);
        append(button0, span0);
        mount_component(icon0, span0, null);
        append(button0, t3);
        append(button0, span1);
        insert(target, t5, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t9);
        append(table, tbody);
        append(tbody, tr1);
        append(tr1, td0);
        append(td0, button1);
        append(button1, span2);
        mount_component(icon1, span2, null);
        append(tr1, t10);
        append(tr1, td1);
        append(tr1, t12);
        append(tr1, td2);
        append(td2, button2);
        append(button2, span3);
        mount_component(icon2, span3, null);
        current = true;
        if (!mounted) {
          dispose = listen(button0, "click", addPengumuman);
          mounted = true;
        }
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(icon0.$$.fragment, local);
        transition_in(icon1.$$.fragment, local);
        transition_in(icon2.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon0.$$.fragment, local);
        transition_out(icon1.$$.fragment, local);
        transition_out(icon2.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(button0);
          detach(t5);
          detach(table);
        }
        destroy_component(icon0);
        destroy_component(icon1);
        destroy_component(icon2);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment21(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot5] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope*/
        1) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function addPengumuman() {
    location.href = "/admin/buatpengumuman";
  }
  var Pengumuman2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment21, safe_not_equal, {});
    }
  };
  var pengumuman_default = Pengumuman2;

  // src/pages/admin/profile.svelte
  init_define_process();
  function get_each_context3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[8] = list[i];
    child_ctx[9] = list;
    child_ctx[10] = i;
    return child_ctx;
  }
  function create_if_block2(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot6] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, msgNip, items*/
        2051) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_default_slot_23(ctx) {
    let input;
    let mounted;
    let dispose;
    function input_input_handler() {
      ctx[4].call(
        input,
        /*each_value*/
        ctx[9],
        /*item_index*/
        ctx[10]
      );
    }
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*item*/
          ctx[8].value
        );
        if (!mounted) {
          dispose = listen(input, "input", input_input_handler);
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & /*items*/
        1 && input.value !== /*item*/
        ctx[8].value) {
          set_input_value(
            input,
            /*item*/
            ctx[8].value
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block3(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        name: (
          /*item*/
          ctx[8].field
        ),
        $$slots: { default: [create_default_slot_23] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*items*/
        1)
          field_changes.name = /*item*/
          ctx2[8].field;
        if (dirty & /*$$scope, items*/
        2049) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_if_block_12(ctx) {
    let p;
    let small;
    let t;
    return {
      c() {
        p = element("p");
        small = element("small");
        t = text(
          /*msgNip*/
          ctx[1]
        );
      },
      m(target, anchor) {
        insert(target, p, anchor);
        append(p, small);
        append(small, t);
      },
      p(ctx2, dirty) {
        if (dirty & /*msgNip*/
        2)
          set_data(
            t,
            /*msgNip*/
            ctx2[1]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_default_slot_13(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Kembali";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Simpan";
        attr(button0, "class", "button is-info is-light");
        attr(button1, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = listen(
            button1,
            "click",
            /*simpan*/
            ctx[2]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot6(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let br0;
    let t3;
    let t4;
    let t5;
    let br1;
    let t6;
    let field;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    let if_block = (
      /*msgNip*/
      ctx[1] && create_if_block_12(ctx)
    );
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_13] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Profile";
        t1 = space();
        hr = element("hr");
        t2 = space();
        br0 = element("br");
        t3 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t4 = space();
        if (if_block)
          if_block.c();
        t5 = space();
        br1 = element("br");
        t6 = space();
        create_component(field.$$.fragment);
        attr(h1, "class", "title is-1");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, br0, anchor);
        insert(target, t3, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, t4, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, t5, anchor);
        insert(target, br1, anchor);
        insert(target, t6, anchor);
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items*/
        1) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context3(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block3(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(t4.parentNode, t4);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (
          /*msgNip*/
          ctx2[1]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_12(ctx2);
            if_block.c();
            if_block.m(t5.parentNode, t5);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        const field_changes = {};
        if (dirty & /*$$scope*/
        2048) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(br0);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(br1);
          detach(t6);
        }
        destroy_each(each_blocks, detaching);
        if (if_block)
          if_block.d(detaching);
        destroy_component(field, detaching);
      }
    };
  }
  function create_fragment22(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block2(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block2(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function instance15($$self, $$props, $$invalidate) {
    let $route;
    let $apiURL;
    component_subscribe($$self, route, ($$value) => $$invalidate(5, $route = $$value));
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(6, $apiURL = $$value));
    let { params } = $$props;
    let items;
    const id = params["1"];
    let msgNip;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch($apiURL + "/user/" + id, { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = []);
        for (const [field, value] of Object.entries(result[0])) {
          items.push({ field, value });
        }
      }
    });
    async function simpan() {
      let payload = {};
      $$invalidate(1, msgNip = "");
      items.map((item) => {
        if (item.field === "id") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.id = Number(item.value);
          }
        }
        if (item.field === "uid") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.uid = Number(item.value);
          }
        }
        if (item.field === "nama_lengkap") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.nama_lengkap = item.value;
          }
        }
        if (item.field === "nip") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
            $$invalidate(1, msgNip = "Entri berisikan huruf");
          } else {
            payload.nip = Number(item.value);
          }
        }
        if (item.field === "nidn") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nidn = Number(item.value);
          }
        }
        if (item.field === "tempat_lahir") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.tempat_lahir = item.value;
          }
        }
        if (item.field === "tanggal_lahir") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.tanggal_lahir = Number(item.value);
          }
        }
        if (item.field === "alamat_rumah") {
          payload.alamat_rumah = item.value;
        }
        if (item.field === "alamat_kantor") {
          payload.alamat_kantor = item.value;
        }
        if (item.field === "nomor_handphone") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nomor_handphone = Number(item.value);
          }
        }
        if (item.field === "nomor_whatsapp") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nomor_whatsapp = Number(item.value);
          }
        }
        if (item.field === "perguruan_tinggi_asal") {
          payload.perguruan_tinggi_asal = item.value;
        }
        if (item.field === "program_studi") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.program_studi = item.value;
          }
        }
        if (item.field === "jabatan_fungsional") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.jabatan_fungsional = item.value;
          }
        }
        if (item.field === "pangkat_golongan") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.pangkat_golongan = item.value;
          }
        }
      });
      const response = await fetch($apiURL + "/userprofile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/admin/users");
      } else {
        console.log(response);
      }
    }
    function input_input_handler(each_value, item_index) {
      each_value[item_index].value = this.value;
      $$invalidate(0, items);
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(3, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      8) {
        $:
          params;
      }
    };
    return [items, msgNip, simpan, params, input_input_handler];
  }
  var Profile = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance15, create_fragment22, safe_not_equal, { params: 3 });
    }
  };
  var profile_default = Profile;

  // src/pages/admin/proposal.svelte
  init_define_process();

  // src/libs/Modal.svelte
  init_define_process();
  var get_header_slot_changes = (dirty) => ({});
  var get_header_slot_context = (ctx) => ({});
  function create_fragment23(ctx) {
    let b;
    let div;
    let span1;
    let span0;
    let t1;
    let t2;
    let hr;
    let t3;
    let current;
    let mounted;
    let dispose;
    const header_slot_template = (
      /*#slots*/
      ctx[4].header
    );
    const header_slot = create_slot(
      header_slot_template,
      ctx,
      /*$$scope*/
      ctx[3],
      get_header_slot_context
    );
    const default_slot_template = (
      /*#slots*/
      ctx[4].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[3],
      null
    );
    return {
      c() {
        b = element("b");
        div = element("div");
        span1 = element("span");
        span0 = element("span");
        span0.textContent = "\xD7";
        t1 = space();
        if (header_slot)
          header_slot.c();
        t2 = space();
        hr = element("hr");
        t3 = space();
        if (default_slot)
          default_slot.c();
        attr(span0, "class", "close svelte-1tzudmn");
        attr(div, "class", "svelte-1tzudmn");
        attr(b, "class", "svelte-1tzudmn");
        toggle_class(
          b,
          "show",
          /*show*/
          ctx[0]
        );
      },
      m(target, anchor) {
        insert(target, b, anchor);
        append(b, div);
        append(div, span1);
        append(span1, span0);
        append(span1, t1);
        if (header_slot) {
          header_slot.m(span1, null);
        }
        append(div, t2);
        append(div, hr);
        append(div, t3);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              span0,
              "click",
              /*clickX*/
              ctx[2]
            ),
            listen(
              b,
              "click",
              /*handleClick*/
              ctx[1]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (header_slot) {
          if (header_slot.p && (!current || dirty & /*$$scope*/
          8)) {
            update_slot_base(
              header_slot,
              header_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[3],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[3]
              ) : get_slot_changes(
                header_slot_template,
                /*$$scope*/
                ctx2[3],
                dirty,
                get_header_slot_changes
              ),
              get_header_slot_context
            );
          }
        }
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          8)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[3],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[3]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[3],
                dirty,
                null
              ),
              null
            );
          }
        }
        if (!current || dirty & /*show*/
        1) {
          toggle_class(
            b,
            "show",
            /*show*/
            ctx2[0]
          );
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(header_slot, local);
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(header_slot, local);
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(b);
        }
        if (header_slot)
          header_slot.d(detaching);
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance16($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { show = false } = $$props;
    function handleClick(e) {
      if (e.target === e.currentTarget) {
        $$invalidate(0, show = false);
      }
    }
    function clickX() {
      $$invalidate(0, show = false);
    }
    $$self.$$set = ($$props2) => {
      if ("show" in $$props2)
        $$invalidate(0, show = $$props2.show);
      if ("$$scope" in $$props2)
        $$invalidate(3, $$scope = $$props2.$$scope);
    };
    return [show, handleClick, clickX, $$scope, slots];
  }
  var Modal = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance16, create_fragment23, safe_not_equal, { show: 0 });
    }
  };
  var Modal_default = Modal;

  // src/modules/Status.svelte
  init_define_process();
  function create_if_block_13(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "PPM Selesai";
        attr(span, "class", "tag is-success is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_122(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "PPM Berjalan";
        attr(span, "class", "tag is-link is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_11(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Proposal Ditolak";
        attr(span, "class", "tag is-danger is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_10(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Ka. Pusat Kajian";
        attr(span, "class", "tag is-warning is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_9(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Ka. Pusat Kajian";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_8(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Reviewer";
        attr(span, "class", "tag is-warning is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_7(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Reviewer";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_6(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Ka. LPPM";
        attr(span, "class", "tag is-warning is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_5(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Ka. LPPM";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_42(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Ka. Departemen";
        attr(span, "class", "tag is-warning is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_32(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Ka.Departemen";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_22(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Administrasi";
        attr(span, "class", "tag is-warning is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_14(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Proposal";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block3(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Draft Proposal";
        attr(span, "class", "tag is-warning is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_fragment24(ctx) {
    let if_block_anchor;
    function select_block_type(ctx2, dirty) {
      if (
        /*code*/
        ctx2[0] === 0
      )
        return create_if_block3;
      if (
        /*code*/
        ctx2[0] === 1
      )
        return create_if_block_14;
      if (
        /*code*/
        ctx2[0] === 2
      )
        return create_if_block_22;
      if (
        /*code*/
        ctx2[0] === 3
      )
        return create_if_block_32;
      if (
        /*code*/
        ctx2[0] === 4
      )
        return create_if_block_42;
      if (
        /*code*/
        ctx2[0] === 5
      )
        return create_if_block_5;
      if (
        /*code*/
        ctx2[0] === 6
      )
        return create_if_block_6;
      if (
        /*code*/
        ctx2[0] === 7
      )
        return create_if_block_7;
      if (
        /*code*/
        ctx2[0] === 8
      )
        return create_if_block_8;
      if (
        /*code*/
        ctx2[0] === 9
      )
        return create_if_block_9;
      if (
        /*code*/
        ctx2[0] === 10
      )
        return create_if_block_10;
      if (
        /*code*/
        ctx2[0] === 11
      )
        return create_if_block_11;
      if (
        /*code*/
        ctx2[0] === 12
      )
        return create_if_block_122;
      if (
        /*code*/
        ctx2[0] === 13
      )
        return create_if_block_13;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type && current_block_type(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (current_block_type !== (current_block_type = select_block_type(ctx2, dirty))) {
          if (if_block)
            if_block.d(1);
          if_block = current_block_type && current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block) {
          if_block.d(detaching);
        }
      }
    };
  }
  function instance17($$self, $$props, $$invalidate) {
    let { code } = $$props;
    $$self.$$set = ($$props2) => {
      if ("code" in $$props2)
        $$invalidate(0, code = $$props2.code);
    };
    return [code];
  }
  var Status = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance17, create_fragment24, safe_not_equal, { code: 0 });
    }
  };
  var Status_default = Status;

  // src/libs/Select.svelte
  init_define_process();
  function get_each_context4(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[11] = list[i];
    return child_ctx;
  }
  function create_if_block4(ctx) {
    let span;
    let each_value = ensure_array_like(
      /*filteredItems*/
      ctx[2]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block4(get_each_context4(ctx, each_value, i));
    }
    return {
      c() {
        span = element("span");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(span, "class", "svelte-z10axy");
      },
      m(target, anchor) {
        insert(target, span, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(span, null);
          }
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*filteredItems, setSelected*/
        12) {
          each_value = ensure_array_like(
            /*filteredItems*/
            ctx2[2]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context4(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block4(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(span, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block4(ctx) {
    let a;
    let t_value = (
      /*item*/
      ctx[11].label + ""
    );
    let t;
    let a_data_value_value;
    let mounted;
    let dispose;
    return {
      c() {
        a = element("a");
        t = text(t_value);
        attr(a, "data-value", a_data_value_value = /*item*/
        ctx[11].value);
        attr(a, "class", "svelte-z10axy");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        append(a, t);
        if (!mounted) {
          dispose = listen(
            a,
            "click",
            /*setSelected*/
            ctx[3]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*filteredItems*/
        4 && t_value !== (t_value = /*item*/
        ctx2[11].label + ""))
          set_data(t, t_value);
        if (dirty & /*filteredItems*/
        4 && a_data_value_value !== (a_data_value_value = /*item*/
        ctx2[11].value)) {
          attr(a, "data-value", a_data_value_value);
        }
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment25(ctx) {
    let div;
    let input;
    let t;
    let mounted;
    let dispose;
    let if_block = (
      /*filteredItems*/
      ctx[2] && create_if_block4(ctx)
    );
    return {
      c() {
        div = element("div");
        input = element("input");
        t = space();
        if (if_block)
          if_block.c();
        attr(input, "class", "input svelte-z10axy");
        attr(input, "placeholder", "Cari user (min 2 huruf)");
        toggle_class(
          input,
          "focused",
          /*focused*/
          ctx[1]
        );
        attr(div, "class", "select svelte-z10axy");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, input);
        set_input_value(
          input,
          /*value*/
          ctx[0]
        );
        append(div, t);
        if (if_block)
          if_block.m(div, null);
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[7]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*value*/
        1 && input.value !== /*value*/
        ctx2[0]) {
          set_input_value(
            input,
            /*value*/
            ctx2[0]
          );
        }
        if (dirty & /*focused*/
        2) {
          toggle_class(
            input,
            "focused",
            /*focused*/
            ctx2[1]
          );
        }
        if (
          /*filteredItems*/
          ctx2[2]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block4(ctx2);
            if_block.c();
            if_block.m(div, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (if_block)
          if_block.d();
        mounted = false;
        dispose();
      }
    };
  }
  function instance18($$self, $$props, $$invalidate) {
    let { items } = $$props;
    let { start = 1 } = $$props;
    let { result = [] } = $$props;
    let focused = 0;
    let value = "";
    let filteredItems = items;
    function changeFocus() {
      $$invalidate(1, focused = !focused);
    }
    function setSelected(e) {
      e.preventDefault();
      let el = e.target;
      if (el.classList.contains("selected")) {
        el.classList.remove("selected");
        $$invalidate(4, result = result.filter((it) => {
          return it.value !== el.getAttribute("data-value");
        }));
      } else {
        el.classList.add("selected");
        $$invalidate(4, result = [
          ...result,
          {
            value: el.getAttribute("data-value").trim(),
            label: el.innerText.trim()
          }
        ]);
      }
      console.log(result);
    }
    function doFilter() {
      if (value.length >= start) {
        $$invalidate(2, filteredItems = items.filter((item) => {
          let it;
          if (item.label) {
            it = item.label.toLowerCase().includes(value.toLowerCase());
          }
          return it;
        }));
      } else {
        $$invalidate(2, filteredItems = items);
      }
    }
    function clickOutside(e) {
      let el = e.target;
      if (el.tagName !== "A" && el.tagName !== "INPUT") {
        $$invalidate(0, value = "");
        $$invalidate(1, focused = 0);
      }
    }
    document.querySelector("body").addEventListener("click", clickOutside);
    function input_input_handler() {
      value = this.value;
      $$invalidate(0, value);
    }
    $$self.$$set = ($$props2) => {
      if ("items" in $$props2)
        $$invalidate(5, items = $$props2.items);
      if ("start" in $$props2)
        $$invalidate(6, start = $$props2.start);
      if ("result" in $$props2)
        $$invalidate(4, result = $$props2.result);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*value, start*/
      65) {
        $:
          value, $$invalidate(1, focused = value.length >= start ? 1 : 0), doFilter();
      }
    };
    return [
      value,
      focused,
      filteredItems,
      setSelected,
      result,
      items,
      start,
      input_input_handler
    ];
  }
  var Select = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance18, create_fragment25, safe_not_equal, { items: 5, start: 6, result: 4 });
    }
  };
  var Select_default = Select;

  // src/pages/admin/proposal.svelte
  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[70] = list[i];
    return child_ctx;
  }
  function get_each_context5(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[70] = list[i];
    return child_ctx;
  }
  function create_if_block5(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot_110] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty[0] & /*tab5, tab4, kpkSelected, ka_pusat_kajian, reviewerSelected, reviewer, klppmSelected, ka_lppm, kdeptSelected, ka_departemen, tab3, data, tab2, view, comment, isi, abstrak, judul, anggotaTim, items, file, biayaPenelitian, tahunPelaksanaan, topik, kelompokKeahlian, jenisSkema, jenisKegiatan, jenisProposal, tab1*/
        1073610751 | dirty[2] & /*$$scope*/
        8192) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_if_block_52(ctx) {
    let current_block_type_index;
    let if_block0;
    let t0;
    let hr;
    let t1;
    let div;
    let current;
    const if_block_creators = [create_if_block_72, create_else_block_2];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (!/*view*/
      ctx2[24])
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, [-1, -1, -1]);
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    function select_block_type_2(ctx2, dirty) {
      if (
        /*view*/
        ctx2[24]
      )
        return create_if_block_62;
      return create_else_block2;
    }
    let current_block_type = select_block_type_2(ctx, [-1, -1, -1]);
    let if_block1 = current_block_type(ctx);
    return {
      c() {
        if_block0.c();
        t0 = space();
        hr = element("hr");
        t1 = space();
        div = element("div");
        if_block1.c();
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, t0, anchor);
        insert(target, hr, anchor);
        insert(target, t1, anchor);
        insert(target, div, anchor);
        if_block1.m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
        if (current_block_type === (current_block_type = select_block_type_2(ctx2, dirty)) && if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1.d(1);
          if_block1 = current_block_type(ctx2);
          if (if_block1) {
            if_block1.c();
            if_block1.m(div, null);
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block0);
        current = true;
      },
      o(local) {
        transition_out(if_block0);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(hr);
          detach(t1);
          detach(div);
        }
        if_blocks[current_block_type_index].d(detaching);
        if_block1.d();
      }
    };
  }
  function create_else_block_2(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let field5;
    let t5;
    let field6;
    let t6;
    let field7;
    let t7;
    let field8;
    let t8;
    let br;
    let t9;
    let table;
    let thead;
    let t13;
    let tbody;
    let tr1;
    let t17;
    let t18;
    let hr0;
    let t19;
    let field9;
    let t20;
    let field10;
    let t21;
    let field11;
    let t22;
    let hr1;
    let t23;
    let field12;
    let current;
    field0 = new Field_default({
      props: {
        name: "Jenis Proposal",
        $$slots: { default: [create_default_slot_26] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Jenis Kegiatan",
        $$slots: { default: [create_default_slot_25] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Jenis Skema",
        $$slots: { default: [create_default_slot_24] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Kelompok Keahlian",
        $$slots: { default: [create_default_slot_232] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Topik",
        $$slots: { default: [create_default_slot_222] },
        $$scope: { ctx }
      }
    });
    field5 = new Field_default({
      props: {
        name: "Tahun Pelaksanaan",
        $$slots: { default: [create_default_slot_21] },
        $$scope: { ctx }
      }
    });
    field6 = new Field_default({
      props: {
        name: "Biaya Penelitian",
        $$slots: { default: [create_default_slot_20] },
        $$scope: { ctx }
      }
    });
    field7 = new Field_default({
      props: {
        name: "Rencana Anggaran Biaya",
        $$slots: { default: [create_default_slot_19] },
        $$scope: { ctx }
      }
    });
    field8 = new Field_default({
      props: {
        name: "Anggota Tim",
        $$slots: { default: [create_default_slot_18] },
        $$scope: { ctx }
      }
    });
    let if_block = (
      /*anggotaTim*/
      ctx[8].length > 0 && create_if_block_102(ctx)
    );
    field9 = new Field_default({
      props: {
        name: "Judul",
        $$slots: { default: [create_default_slot_17] },
        $$scope: { ctx }
      }
    });
    field10 = new Field_default({
      props: {
        name: "abstrak",
        $$slots: { default: [create_default_slot_16] },
        $$scope: { ctx }
      }
    });
    field11 = new Field_default({
      props: {
        name: "isi",
        $$slots: { default: [create_default_slot_15] },
        $$scope: { ctx }
      }
    });
    field12 = new Field_default({
      props: {
        name: "Catatan Revisi",
        $$slots: { default: [create_default_slot_14] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        create_component(field5.$$.fragment);
        t5 = space();
        create_component(field6.$$.fragment);
        t6 = space();
        create_component(field7.$$.fragment);
        t7 = space();
        create_component(field8.$$.fragment);
        t8 = space();
        br = element("br");
        t9 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow">Status</th> <th>Nama</th></tr>`;
        t13 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        tr1.innerHTML = `<td>Ketua</td> <td>...</td>`;
        t17 = space();
        if (if_block)
          if_block.c();
        t18 = space();
        hr0 = element("hr");
        t19 = space();
        create_component(field9.$$.fragment);
        t20 = space();
        create_component(field10.$$.fragment);
        t21 = space();
        create_component(field11.$$.fragment);
        t22 = space();
        hr1 = element("hr");
        t23 = space();
        create_component(field12.$$.fragment);
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        mount_component(field5, target, anchor);
        insert(target, t5, anchor);
        mount_component(field6, target, anchor);
        insert(target, t6, anchor);
        mount_component(field7, target, anchor);
        insert(target, t7, anchor);
        mount_component(field8, target, anchor);
        insert(target, t8, anchor);
        insert(target, br, anchor);
        insert(target, t9, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t13);
        append(table, tbody);
        append(tbody, tr1);
        append(tbody, t17);
        if (if_block)
          if_block.m(tbody, null);
        insert(target, t18, anchor);
        insert(target, hr0, anchor);
        insert(target, t19, anchor);
        mount_component(field9, target, anchor);
        insert(target, t20, anchor);
        mount_component(field10, target, anchor);
        insert(target, t21, anchor);
        mount_component(field11, target, anchor);
        insert(target, t22, anchor);
        insert(target, hr1, anchor);
        insert(target, t23, anchor);
        mount_component(field12, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*jenisProposal*/
        2 | dirty[2] & /*$$scope*/
        8192) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*jenisKegiatan*/
        4 | dirty[2] & /*$$scope*/
        8192) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*jenisSkema*/
        8 | dirty[2] & /*$$scope*/
        8192) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*kelompokKeahlian*/
        16 | dirty[2] & /*$$scope*/
        8192) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*topik*/
        32 | dirty[2] & /*$$scope*/
        8192) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (dirty[0] & /*tahunPelaksanaan*/
        64 | dirty[2] & /*$$scope*/
        8192) {
          field5_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field5.$set(field5_changes);
        const field6_changes = {};
        if (dirty[0] & /*biayaPenelitian*/
        128 | dirty[2] & /*$$scope*/
        8192) {
          field6_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field6.$set(field6_changes);
        const field7_changes = {};
        if (dirty[2] & /*$$scope*/
        8192) {
          field7_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field7.$set(field7_changes);
        const field8_changes = {};
        if (dirty[2] & /*$$scope*/
        8192) {
          field8_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field8.$set(field8_changes);
        if (
          /*anggotaTim*/
          ctx2[8].length > 0
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_102(ctx2);
            if_block.c();
            if_block.m(tbody, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        const field9_changes = {};
        if (dirty[0] & /*data*/
        1 | dirty[2] & /*$$scope*/
        8192) {
          field9_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field9.$set(field9_changes);
        const field10_changes = {};
        if (dirty[0] & /*data*/
        1 | dirty[2] & /*$$scope*/
        8192) {
          field10_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field10.$set(field10_changes);
        const field11_changes = {};
        if (dirty[0] & /*data*/
        1 | dirty[2] & /*$$scope*/
        8192) {
          field11_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field11.$set(field11_changes);
        const field12_changes = {};
        if (dirty[0] & /*comment*/
        4096 | dirty[2] & /*$$scope*/
        8192) {
          field12_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field12.$set(field12_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        transition_in(field6.$$.fragment, local);
        transition_in(field7.$$.fragment, local);
        transition_in(field8.$$.fragment, local);
        transition_in(field9.$$.fragment, local);
        transition_in(field10.$$.fragment, local);
        transition_in(field11.$$.fragment, local);
        transition_in(field12.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        transition_out(field6.$$.fragment, local);
        transition_out(field7.$$.fragment, local);
        transition_out(field8.$$.fragment, local);
        transition_out(field9.$$.fragment, local);
        transition_out(field10.$$.fragment, local);
        transition_out(field11.$$.fragment, local);
        transition_out(field12.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(br);
          detach(t9);
          detach(table);
          detach(t18);
          detach(hr0);
          detach(t19);
          detach(t20);
          detach(t21);
          detach(t22);
          detach(hr1);
          detach(t23);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
        destroy_component(field6, detaching);
        destroy_component(field7, detaching);
        destroy_component(field8, detaching);
        if (if_block)
          if_block.d();
        destroy_component(field9, detaching);
        destroy_component(field10, detaching);
        destroy_component(field11, detaching);
        destroy_component(field12, detaching);
      }
    };
  }
  function create_if_block_72(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let field5;
    let updating_value;
    let t5;
    let field6;
    let t6;
    let field7;
    let t7;
    let field8;
    let t8;
    let br;
    let t9;
    let table;
    let thead;
    let t15;
    let tbody;
    let tr1;
    let t20;
    let t21;
    let hr0;
    let t22;
    let field9;
    let t23;
    let field10;
    let t24;
    let field11;
    let t25;
    let hr1;
    let t26;
    let field12;
    let current;
    field0 = new Field_default({
      props: {
        name: "Jenis Proposal",
        $$slots: { default: [create_default_slot_132] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Jenis Kegiatan",
        $$slots: { default: [create_default_slot_122] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Jenis Skema",
        $$slots: { default: [create_default_slot_11] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Kelompok Keahlian",
        $$slots: { default: [create_default_slot_10] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Topik",
        $$slots: { default: [create_default_slot_9] },
        $$scope: { ctx }
      }
    });
    function field5_value_binding(value) {
      ctx[47](value);
    }
    let field5_props = {
      datepicker: true,
      name: "Tahun Pelaksanaan"
    };
    if (
      /*tahunPelaksanaan*/
      ctx[6] !== void 0
    ) {
      field5_props.value = /*tahunPelaksanaan*/
      ctx[6];
    }
    field5 = new Field_default({ props: field5_props });
    binding_callbacks.push(() => bind(field5, "value", field5_value_binding));
    field6 = new Field_default({
      props: {
        name: "Biaya Penelitian",
        $$slots: { default: [create_default_slot_8] },
        $$scope: { ctx }
      }
    });
    field7 = new Field_default({
      props: {
        name: "Rencana Anggaran Biaya",
        $$slots: { default: [create_default_slot_7] },
        $$scope: { ctx }
      }
    });
    field8 = new Field_default({
      props: {
        name: "Anggota Tim",
        $$slots: { default: [create_default_slot_6] },
        $$scope: { ctx }
      }
    });
    let if_block = (
      /*anggotaTim*/
      ctx[8].length > 0 && create_if_block_82(ctx)
    );
    field9 = new Field_default({
      props: {
        name: "Judul",
        $$slots: { default: [create_default_slot_5] },
        $$scope: { ctx }
      }
    });
    field10 = new Field_default({
      props: {
        name: "Abstrak",
        $$slots: { default: [create_default_slot_4] },
        $$scope: { ctx }
      }
    });
    field11 = new Field_default({
      props: {
        name: "Isi Proposal",
        $$slots: { default: [create_default_slot_32] },
        $$scope: { ctx }
      }
    });
    field12 = new Field_default({
      props: {
        name: "Catatan Revisi",
        $$slots: { default: [create_default_slot_27] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        create_component(field5.$$.fragment);
        t5 = space();
        create_component(field6.$$.fragment);
        t6 = space();
        create_component(field7.$$.fragment);
        t7 = space();
        create_component(field8.$$.fragment);
        t8 = space();
        br = element("br");
        t9 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow">Action</th> <th class="is-narrow">Status</th> <th>Nama</th></tr>`;
        t15 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        tr1.innerHTML = `<td></td> <td>Ketua</td> <td>...</td>`;
        t20 = space();
        if (if_block)
          if_block.c();
        t21 = space();
        hr0 = element("hr");
        t22 = space();
        create_component(field9.$$.fragment);
        t23 = space();
        create_component(field10.$$.fragment);
        t24 = space();
        create_component(field11.$$.fragment);
        t25 = space();
        hr1 = element("hr");
        t26 = space();
        create_component(field12.$$.fragment);
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        mount_component(field5, target, anchor);
        insert(target, t5, anchor);
        mount_component(field6, target, anchor);
        insert(target, t6, anchor);
        mount_component(field7, target, anchor);
        insert(target, t7, anchor);
        mount_component(field8, target, anchor);
        insert(target, t8, anchor);
        insert(target, br, anchor);
        insert(target, t9, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t15);
        append(table, tbody);
        append(tbody, tr1);
        append(tbody, t20);
        if (if_block)
          if_block.m(tbody, null);
        insert(target, t21, anchor);
        insert(target, hr0, anchor);
        insert(target, t22, anchor);
        mount_component(field9, target, anchor);
        insert(target, t23, anchor);
        mount_component(field10, target, anchor);
        insert(target, t24, anchor);
        mount_component(field11, target, anchor);
        insert(target, t25, anchor);
        insert(target, hr1, anchor);
        insert(target, t26, anchor);
        mount_component(field12, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*jenisProposal*/
        2 | dirty[2] & /*$$scope*/
        8192) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*jenisKegiatan*/
        4 | dirty[2] & /*$$scope*/
        8192) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*jenisSkema, jenisKegiatan*/
        12 | dirty[2] & /*$$scope*/
        8192) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*kelompokKeahlian*/
        16 | dirty[2] & /*$$scope*/
        8192) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*topik*/
        32 | dirty[2] & /*$$scope*/
        8192) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (!updating_value && dirty[0] & /*tahunPelaksanaan*/
        64) {
          updating_value = true;
          field5_changes.value = /*tahunPelaksanaan*/
          ctx2[6];
          add_flush_callback(() => updating_value = false);
        }
        field5.$set(field5_changes);
        const field6_changes = {};
        if (dirty[0] & /*biayaPenelitian*/
        128 | dirty[2] & /*$$scope*/
        8192) {
          field6_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field6.$set(field6_changes);
        const field7_changes = {};
        if (dirty[0] & /*file*/
        8388608 | dirty[2] & /*$$scope*/
        8192) {
          field7_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field7.$set(field7_changes);
        const field8_changes = {};
        if (dirty[0] & /*items, anggotaTim*/
        4194560 | dirty[2] & /*$$scope*/
        8192) {
          field8_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field8.$set(field8_changes);
        if (
          /*anggotaTim*/
          ctx2[8].length > 0
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*anggotaTim*/
            256) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_82(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(tbody, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
        const field9_changes = {};
        if (dirty[0] & /*judul*/
        512 | dirty[2] & /*$$scope*/
        8192) {
          field9_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field9.$set(field9_changes);
        const field10_changes = {};
        if (dirty[0] & /*abstrak*/
        1024 | dirty[2] & /*$$scope*/
        8192) {
          field10_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field10.$set(field10_changes);
        const field11_changes = {};
        if (dirty[0] & /*isi*/
        2048 | dirty[2] & /*$$scope*/
        8192) {
          field11_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field11.$set(field11_changes);
        const field12_changes = {};
        if (dirty[0] & /*comment*/
        4096 | dirty[2] & /*$$scope*/
        8192) {
          field12_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field12.$set(field12_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        transition_in(field6.$$.fragment, local);
        transition_in(field7.$$.fragment, local);
        transition_in(field8.$$.fragment, local);
        transition_in(if_block);
        transition_in(field9.$$.fragment, local);
        transition_in(field10.$$.fragment, local);
        transition_in(field11.$$.fragment, local);
        transition_in(field12.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        transition_out(field6.$$.fragment, local);
        transition_out(field7.$$.fragment, local);
        transition_out(field8.$$.fragment, local);
        transition_out(if_block);
        transition_out(field9.$$.fragment, local);
        transition_out(field10.$$.fragment, local);
        transition_out(field11.$$.fragment, local);
        transition_out(field12.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(br);
          detach(t9);
          detach(table);
          detach(t21);
          detach(hr0);
          detach(t22);
          detach(t23);
          detach(t24);
          detach(t25);
          detach(hr1);
          detach(t26);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
        destroy_component(field6, detaching);
        destroy_component(field7, detaching);
        destroy_component(field8, detaching);
        if (if_block)
          if_block.d();
        destroy_component(field9, detaching);
        destroy_component(field10, detaching);
        destroy_component(field11, detaching);
        destroy_component(field12, detaching);
      }
    };
  }
  function create_default_slot_26(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisProposal*/
          ctx[1]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisProposal*/
        2)
          set_data(
            t,
            /*jenisProposal*/
            ctx2[1]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_25(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisKegiatan*/
          ctx[2]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisKegiatan*/
        4)
          set_data(
            t,
            /*jenisKegiatan*/
            ctx2[2]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_24(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisSkema*/
          ctx[3]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisSkema*/
        8)
          set_data(
            t,
            /*jenisSkema*/
            ctx2[3]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_232(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*kelompokKeahlian*/
          ctx[4]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*kelompokKeahlian*/
        16)
          set_data(
            t,
            /*kelompokKeahlian*/
            ctx2[4]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_222(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*topik*/
          ctx[5]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*topik*/
        32)
          set_data(
            t,
            /*topik*/
            ctx2[5]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_21(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*tahunPelaksanaan*/
          ctx[6]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunPelaksanaan*/
        64)
          set_data(
            t,
            /*tahunPelaksanaan*/
            ctx2[6]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_20(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*biayaPenelitian*/
          ctx[7]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*biayaPenelitian*/
        128)
          set_data(
            t,
            /*biayaPenelitian*/
            ctx2[7]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_19(ctx) {
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        button.textContent = "Download RAB";
        attr(button, "class", "button is-link is-rounded button is-small");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*handleDownload*/
            ctx[35]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_18(ctx) {
    let span;
    return {
      c() {
        span = element("span");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_102(ctx) {
    let each_1_anchor;
    let each_value_1 = ensure_array_like(
      /*anggotaTim*/
      ctx[8]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    }
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim*/
        256) {
          each_value_1 = ensure_array_like(
            /*anggotaTim*/
            ctx2[8]
          );
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_1(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_1(ctx) {
    let tr;
    let td0;
    let t1;
    let td1;
    let t2_value = (
      /*member*/
      ctx[70].label + ""
    );
    let t2;
    let t3;
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        td0.textContent = "Anggota";
        t1 = space();
        td1 = element("td");
        t2 = text(t2_value);
        t3 = space();
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(tr, t1);
        append(tr, td1);
        append(td1, t2);
        append(tr, t3);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim*/
        256 && t2_value !== (t2_value = /*member*/
        ctx2[70].label + ""))
          set_data(t2, t2_value);
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
      }
    };
  }
  function create_default_slot_17(ctx) {
    let t_value = (
      /*data*/
      ctx[0].judul + ""
    );
    let t;
    return {
      c() {
        t = text(t_value);
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        1 && t_value !== (t_value = /*data*/
        ctx2[0].judul + ""))
          set_data(t, t_value);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_16(ctx) {
    let html_tag;
    let raw_value = (
      /*data*/
      ctx[0].abstrak + ""
    );
    let html_anchor;
    return {
      c() {
        html_tag = new HtmlTag(false);
        html_anchor = empty();
        html_tag.a = html_anchor;
      },
      m(target, anchor) {
        html_tag.m(raw_value, target, anchor);
        insert(target, html_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        1 && raw_value !== (raw_value = /*data*/
        ctx2[0].abstrak + ""))
          html_tag.p(raw_value);
      },
      d(detaching) {
        if (detaching) {
          detach(html_anchor);
          html_tag.d();
        }
      }
    };
  }
  function create_default_slot_15(ctx) {
    let div;
    let raw_value = (
      /*data*/
      ctx[0].isi + ""
    );
    return {
      c() {
        div = element("div");
        attr(div, "class", "box box-padding svelte-16qu3hd");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        div.innerHTML = raw_value;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        1 && raw_value !== (raw_value = /*data*/
        ctx2[0].isi + ""))
          div.innerHTML = raw_value;
        ;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_default_slot_14(ctx) {
    let textarea;
    let mounted;
    let dispose;
    return {
      c() {
        textarea = element("textarea");
        attr(textarea, "class", "textarea");
      },
      m(target, anchor) {
        insert(target, textarea, anchor);
        set_input_value(
          textarea,
          /*comment*/
          ctx[12]
        );
        if (!mounted) {
          dispose = listen(
            textarea,
            "input",
            /*textarea_input_handler*/
            ctx[53]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*comment*/
        4096) {
          set_input_value(
            textarea,
            /*comment*/
            ctx2[12]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(textarea);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_132(ctx) {
    let div;
    let select;
    let option0;
    let option1;
    let option2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Pilih Jenis Proposal";
        option1 = element("option");
        option1.textContent = "Proposal Awal";
        option2 = element("option");
        option2.textContent = "Proposal Lanjutan";
        option0.__value = "";
        set_input_value(option0, option0.__value);
        option0.selected = true;
        option0.disabled = true;
        option0.hidden = true;
        option1.selected = true;
        option1.__value = "Proposal Awal";
        set_input_value(option1, option1.__value);
        option2.__value = "Proposal Lanjutan";
        set_input_value(option2, option2.__value);
        if (
          /*jenisProposal*/
          ctx[1] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler*/
            ctx[42].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        select_option(
          select,
          /*jenisProposal*/
          ctx[1],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler*/
            ctx[42]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisProposal*/
        2) {
          select_option(
            select,
            /*jenisProposal*/
            ctx2[1]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_122(ctx) {
    let div;
    let select;
    let option0;
    let option1;
    let option2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Pilih Jenis Kegiatan";
        option1 = element("option");
        option1.textContent = "Penelitian";
        option2 = element("option");
        option2.textContent = "Pengabdian Masyarakat";
        option0.__value = "";
        set_input_value(option0, option0.__value);
        option0.selected = true;
        option0.disabled = true;
        option0.hidden = true;
        option1.__value = "Penelitian";
        set_input_value(option1, option1.__value);
        option2.__value = "Pengabdian Masyarakat";
        set_input_value(option2, option2.__value);
        if (
          /*jenisKegiatan*/
          ctx[2] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler_1*/
            ctx[43].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        select_option(
          select,
          /*jenisKegiatan*/
          ctx[2],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler_1*/
            ctx[43]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisKegiatan*/
        4) {
          select_option(
            select,
            /*jenisKegiatan*/
            ctx2[2]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_else_block_1(ctx) {
    let option0;
    let option1;
    let option2;
    let option3;
    return {
      c() {
        option0 = element("option");
        option0.textContent = "Pengabdian Masyarakat Desa Binaan";
        option1 = element("option");
        option1.textContent = "Pengabdian Masyarakat UMKM Binaan";
        option2 = element("option");
        option2.textContent = "Pengabdian Masyarakat Mandiri";
        option3 = element("option");
        option3.textContent = "Pengabdian Masyarakat Hibah Eksternal";
        option0.__value = "Pengabdian Masyarakat Desa Binaan";
        set_input_value(option0, option0.__value);
        option1.__value = "Pengabdian Masyarakat UMKM Binaan";
        set_input_value(option1, option1.__value);
        option2.__value = "Pengabdian Masyarakat Mandiri";
        set_input_value(option2, option2.__value);
        option3.__value = "Pengabdian Masyarakat Hibah Eksternal";
        set_input_value(option3, option3.__value);
      },
      m(target, anchor) {
        insert(target, option0, anchor);
        insert(target, option1, anchor);
        insert(target, option2, anchor);
        insert(target, option3, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(option0);
          detach(option1);
          detach(option2);
          detach(option3);
        }
      }
    };
  }
  function create_if_block_92(ctx) {
    let option0;
    let option1;
    let option2;
    let option3;
    let option4;
    return {
      c() {
        option0 = element("option");
        option0.textContent = "Riset Kelompok Keahlian";
        option1 = element("option");
        option1.textContent = "Riset Terapan";
        option2 = element("option");
        option2.textContent = "Riset Kerjasama";
        option3 = element("option");
        option3.textContent = "Riset Mandiri";
        option4 = element("option");
        option4.textContent = "Riset Eksternal";
        option0.__value = "Riset Kelompok Keahlian";
        set_input_value(option0, option0.__value);
        option1.__value = "Riset Terapan";
        set_input_value(option1, option1.__value);
        option2.__value = "Riset Kerjasama";
        set_input_value(option2, option2.__value);
        option3.__value = "Riset Mandiri";
        set_input_value(option3, option3.__value);
        option4.__value = "Riset Eksternal";
        set_input_value(option4, option4.__value);
      },
      m(target, anchor) {
        insert(target, option0, anchor);
        insert(target, option1, anchor);
        insert(target, option2, anchor);
        insert(target, option3, anchor);
        insert(target, option4, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(option0);
          detach(option1);
          detach(option2);
          detach(option3);
          detach(option4);
        }
      }
    };
  }
  function create_default_slot_11(ctx) {
    let div;
    let select;
    let option;
    let mounted;
    let dispose;
    function select_block_type_1(ctx2, dirty) {
      if (
        /*jenisKegiatan*/
        ctx2[2] === "Penelitian"
      )
        return create_if_block_92;
      return create_else_block_1;
    }
    let current_block_type = select_block_type_1(ctx, [-1, -1, -1]);
    let if_block = current_block_type(ctx);
    return {
      c() {
        div = element("div");
        select = element("select");
        option = element("option");
        option.textContent = "Pilih Jenis Skema\r\n                     ";
        if_block.c();
        option.__value = "";
        set_input_value(option, option.__value);
        option.selected = true;
        option.disabled = true;
        option.hidden = true;
        if (
          /*jenisSkema*/
          ctx[3] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler_2*/
            ctx[44].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option);
        if_block.m(select, null);
        select_option(
          select,
          /*jenisSkema*/
          ctx[3],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler_2*/
            ctx[44]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (current_block_type !== (current_block_type = select_block_type_1(ctx2, dirty))) {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(select, null);
          }
        }
        if (dirty[0] & /*jenisSkema*/
        8) {
          select_option(
            select,
            /*jenisSkema*/
            ctx2[3]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if_block.d();
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_10(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Kelompok Keahlian");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*kelompokKeahlian*/
          ctx[4]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[45]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*kelompokKeahlian*/
        16 && input.value !== /*kelompokKeahlian*/
        ctx2[4]) {
          set_input_value(
            input,
            /*kelompokKeahlian*/
            ctx2[4]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_9(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Topik");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*topik*/
          ctx[5]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_1*/
            ctx[46]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*topik*/
        32 && input.value !== /*topik*/
        ctx2[5]) {
          set_input_value(
            input,
            /*topik*/
            ctx2[5]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_8(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Biaya Penelitian");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*biayaPenelitian*/
          ctx[7]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler_2*/
              ctx[48]
            ),
            listen(
              input,
              "keyup",
              /*keyup_handler*/
              ctx[49]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*biayaPenelitian*/
        128 && input.value !== /*biayaPenelitian*/
        ctx2[7]) {
          set_input_value(
            input,
            /*biayaPenelitian*/
            ctx2[7]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_7(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "accept", ".xlsx");
        attr(input, "type", "file");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        if (!mounted) {
          dispose = listen(
            input,
            "change",
            /*change_handler*/
            ctx[50]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_6(ctx) {
    let select;
    let updating_result;
    let current;
    function select_result_binding(value) {
      ctx[51](value);
    }
    let select_props = { start: "2", items: (
      /*items*/
      ctx[22]
    ) };
    if (
      /*anggotaTim*/
      ctx[8] !== void 0
    ) {
      select_props.result = /*anggotaTim*/
      ctx[8];
    }
    select = new Select_default({ props: select_props });
    binding_callbacks.push(() => bind(select, "result", select_result_binding));
    return {
      c() {
        create_component(select.$$.fragment);
      },
      m(target, anchor) {
        mount_component(select, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const select_changes = {};
        if (dirty[0] & /*items*/
        4194304)
          select_changes.items = /*items*/
          ctx2[22];
        if (!updating_result && dirty[0] & /*anggotaTim*/
        256) {
          updating_result = true;
          select_changes.result = /*anggotaTim*/
          ctx2[8];
          add_flush_callback(() => updating_result = false);
        }
        select.$set(select_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(select.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(select.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(select, detaching);
      }
    };
  }
  function create_if_block_82(ctx) {
    let each_1_anchor;
    let current;
    let each_value = ensure_array_like(
      /*anggotaTim*/
      ctx[8]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block5(get_each_context5(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim*/
        256 | dirty[1] & /*deleteMember*/
        8) {
          each_value = ensure_array_like(
            /*anggotaTim*/
            ctx2[8]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context5(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block5(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block5(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_data_value_value;
    let t0;
    let td1;
    let t2;
    let td2;
    let t3_value = (
      /*member*/
      ctx[70].label + ""
    );
    let t3;
    let t4;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        td1.textContent = "Anggota";
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "data-value", button_data_value_value = /*member*/
        ctx[70].value);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*deleteMember*/
            ctx[34]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*anggotaTim*/
        256 && button_data_value_value !== (button_data_value_value = /*member*/
        ctx2[70].value)) {
          attr(button, "data-value", button_data_value_value);
        }
        if ((!current || dirty[0] & /*anggotaTim*/
        256) && t3_value !== (t3_value = /*member*/
        ctx2[70].label + ""))
          set_data(t3, t3_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_5(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Judul");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*judul*/
          ctx[9]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_3*/
            ctx[52]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*judul*/
        512 && input.value !== /*judul*/
        ctx2[9]) {
          set_input_value(
            input,
            /*judul*/
            ctx2[9]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_4(ctx) {
    let wysiwyg;
    let current;
    wysiwyg = new Wysiwyg_default({
      props: {
        id: "abstract",
        content: (
          /*abstrak*/
          ctx[10]
        )
      }
    });
    return {
      c() {
        create_component(wysiwyg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(wysiwyg, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const wysiwyg_changes = {};
        if (dirty[0] & /*abstrak*/
        1024)
          wysiwyg_changes.content = /*abstrak*/
          ctx2[10];
        wysiwyg.$set(wysiwyg_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(wysiwyg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(wysiwyg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(wysiwyg, detaching);
      }
    };
  }
  function create_default_slot_32(ctx) {
    let wysiwyg;
    let current;
    wysiwyg = new Wysiwyg_default({
      props: { id: "isi", content: (
        /*isi*/
        ctx[11]
      ) }
    });
    return {
      c() {
        create_component(wysiwyg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(wysiwyg, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const wysiwyg_changes = {};
        if (dirty[0] & /*isi*/
        2048)
          wysiwyg_changes.content = /*isi*/
          ctx2[11];
        wysiwyg.$set(wysiwyg_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(wysiwyg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(wysiwyg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(wysiwyg, detaching);
      }
    };
  }
  function create_default_slot_27(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*comment*/
          ctx[12]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*comment*/
        4096)
          set_data(
            t,
            /*comment*/
            ctx2[12]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_else_block2(ctx) {
    let p;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        p = element("p");
        button = element("button");
        button.textContent = "Remediasi";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
      },
      m(target, anchor) {
        insert(target, p, anchor);
        append(p, button);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*remediasi*/
            ctx[30]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_62(ctx) {
    let p0;
    let button0;
    let t1;
    let p1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        p0 = element("p");
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        p1 = element("p");
        button1 = element("button");
        button1.textContent = "Proses";
        attr(button0, "class", "button is-info is-light is-outlined");
        attr(p0, "class", "control");
        attr(button1, "class", "button is-info");
        attr(p1, "class", "control");
      },
      m(target, anchor) {
        insert(target, p0, anchor);
        append(p0, button0);
        insert(target, t1, anchor);
        insert(target, p1, anchor);
        append(p1, button1);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[31]
            ),
            listen(
              button1,
              "click",
              /*handlePass*/
              ctx[32]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p0);
          detach(t1);
          detach(p1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_43(ctx) {
    let table;
    let thead;
    let t3;
    let tbody;
    let tr1;
    let td0;
    let status_1;
    let t4;
    let td1;
    let div0;
    let select;
    let option0;
    let option1;
    let option2;
    let t8;
    let div1;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    status_1 = new Status_default({ props: { code: (
      /*data*/
      ctx[0].status
    ) } });
    return {
      c() {
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Status PPM</th> <th>Status Pendanaan</th></tr>`;
        t3 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        td0 = element("td");
        create_component(status_1.$$.fragment);
        t4 = space();
        td1 = element("td");
        div0 = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Dana belum dicairkan";
        option1 = element("option");
        option1.textContent = "50% dana sudah dicairkan";
        option2 = element("option");
        option2.textContent = "100% dana sudah dicairkan";
        t8 = space();
        div1 = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        option0.__value = "Dana belum dicairkan";
        set_input_value(option0, option0.__value);
        option1.__value = "50% dana sudah dicairkan";
        set_input_value(option1, option1.__value);
        option2.__value = "100% dana sudah dicairkan";
        set_input_value(option2, option2.__value);
        attr(div0, "class", "select is-normal");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div1, "class", "field is-grouped is-grouped-left");
      },
      m(target, anchor) {
        insert(target, table, anchor);
        append(table, thead);
        append(table, t3);
        append(table, tbody);
        append(tbody, tr1);
        append(tr1, td0);
        mount_component(status_1, td0, null);
        append(tr1, t4);
        append(tr1, td1);
        append(td1, div0);
        append(div0, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        insert(target, t8, anchor);
        insert(target, div1, anchor);
        append(div1, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", handleSubmitDana);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const status_1_changes = {};
        if (dirty[0] & /*data*/
        1)
          status_1_changes.code = /*data*/
          ctx2[0].status;
        status_1.$set(status_1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(status_1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status_1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(table);
          detach(t8);
          detach(div1);
        }
        destroy_component(status_1);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_33(ctx) {
    let field0;
    let updating_value;
    let updating_selected;
    let t0;
    let br0;
    let t1;
    let field1;
    let updating_value_1;
    let updating_selected_1;
    let t2;
    let br1;
    let t3;
    let field2;
    let updating_value_2;
    let updating_selected_2;
    let t4;
    let br2;
    let t5;
    let field3;
    let updating_value_3;
    let updating_selected_3;
    let t6;
    let br3;
    let t7;
    let div;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    function field0_value_binding(value) {
      ctx[54](value);
    }
    function field0_selected_binding(value) {
      ctx[55](value);
    }
    let field0_props = {
      name: "Ka. Departemen",
      select: true,
      view: true,
      userId: (
        /*kdeptSelected*/
        ctx[18]
      )
    };
    if (
      /*ka_departemen*/
      ctx[13] !== void 0
    ) {
      field0_props.value = /*ka_departemen*/
      ctx[13];
    }
    if (
      /*kdeptSelected*/
      ctx[18] !== void 0
    ) {
      field0_props.selected = /*kdeptSelected*/
      ctx[18];
    }
    field0 = new Field_default({ props: field0_props });
    binding_callbacks.push(() => bind(field0, "value", field0_value_binding));
    binding_callbacks.push(() => bind(field0, "selected", field0_selected_binding));
    function field1_value_binding(value) {
      ctx[56](value);
    }
    function field1_selected_binding(value) {
      ctx[57](value);
    }
    let field1_props = {
      name: "Ka. LPPM",
      select: true,
      view: true,
      userId: (
        /*klppmSelected*/
        ctx[19]
      )
    };
    if (
      /*ka_lppm*/
      ctx[14] !== void 0
    ) {
      field1_props.value = /*ka_lppm*/
      ctx[14];
    }
    if (
      /*klppmSelected*/
      ctx[19] !== void 0
    ) {
      field1_props.selected = /*klppmSelected*/
      ctx[19];
    }
    field1 = new Field_default({ props: field1_props });
    binding_callbacks.push(() => bind(field1, "value", field1_value_binding));
    binding_callbacks.push(() => bind(field1, "selected", field1_selected_binding));
    function field2_value_binding(value) {
      ctx[58](value);
    }
    function field2_selected_binding(value) {
      ctx[59](value);
    }
    let field2_props = {
      name: "Reviewer",
      select: true,
      view: true,
      userId: (
        /*reviewerSelected*/
        ctx[21]
      )
    };
    if (
      /*reviewer*/
      ctx[15] !== void 0
    ) {
      field2_props.value = /*reviewer*/
      ctx[15];
    }
    if (
      /*reviewerSelected*/
      ctx[21] !== void 0
    ) {
      field2_props.selected = /*reviewerSelected*/
      ctx[21];
    }
    field2 = new Field_default({ props: field2_props });
    binding_callbacks.push(() => bind(field2, "value", field2_value_binding));
    binding_callbacks.push(() => bind(field2, "selected", field2_selected_binding));
    function field3_value_binding(value) {
      ctx[60](value);
    }
    function field3_selected_binding(value) {
      ctx[61](value);
    }
    let field3_props = {
      name: "Ka. Pusat Kajian",
      select: true,
      view: true,
      userId: (
        /*kpkSelected*/
        ctx[20]
      )
    };
    if (
      /*ka_pusat_kajian*/
      ctx[16] !== void 0
    ) {
      field3_props.value = /*ka_pusat_kajian*/
      ctx[16];
    }
    if (
      /*kpkSelected*/
      ctx[20] !== void 0
    ) {
      field3_props.selected = /*kpkSelected*/
      ctx[20];
    }
    field3 = new Field_default({ props: field3_props });
    binding_callbacks.push(() => bind(field3, "value", field3_value_binding));
    binding_callbacks.push(() => bind(field3, "selected", field3_selected_binding));
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        br0 = element("br");
        t1 = space();
        create_component(field1.$$.fragment);
        t2 = space();
        br1 = element("br");
        t3 = space();
        create_component(field2.$$.fragment);
        t4 = space();
        br2 = element("br");
        t5 = space();
        create_component(field3.$$.fragment);
        t6 = space();
        br3 = element("br");
        t7 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Submit";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-left");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        insert(target, br0, anchor);
        insert(target, t1, anchor);
        mount_component(field1, target, anchor);
        insert(target, t2, anchor);
        insert(target, br1, anchor);
        insert(target, t3, anchor);
        mount_component(field2, target, anchor);
        insert(target, t4, anchor);
        insert(target, br2, anchor);
        insert(target, t5, anchor);
        mount_component(field3, target, anchor);
        insert(target, t6, anchor);
        insert(target, br3, anchor);
        insert(target, t7, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*handleSubmitReviewer*/
            ctx[33]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*kdeptSelected*/
        262144)
          field0_changes.userId = /*kdeptSelected*/
          ctx2[18];
        if (!updating_value && dirty[0] & /*ka_departemen*/
        8192) {
          updating_value = true;
          field0_changes.value = /*ka_departemen*/
          ctx2[13];
          add_flush_callback(() => updating_value = false);
        }
        if (!updating_selected && dirty[0] & /*kdeptSelected*/
        262144) {
          updating_selected = true;
          field0_changes.selected = /*kdeptSelected*/
          ctx2[18];
          add_flush_callback(() => updating_selected = false);
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*klppmSelected*/
        524288)
          field1_changes.userId = /*klppmSelected*/
          ctx2[19];
        if (!updating_value_1 && dirty[0] & /*ka_lppm*/
        16384) {
          updating_value_1 = true;
          field1_changes.value = /*ka_lppm*/
          ctx2[14];
          add_flush_callback(() => updating_value_1 = false);
        }
        if (!updating_selected_1 && dirty[0] & /*klppmSelected*/
        524288) {
          updating_selected_1 = true;
          field1_changes.selected = /*klppmSelected*/
          ctx2[19];
          add_flush_callback(() => updating_selected_1 = false);
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*reviewerSelected*/
        2097152)
          field2_changes.userId = /*reviewerSelected*/
          ctx2[21];
        if (!updating_value_2 && dirty[0] & /*reviewer*/
        32768) {
          updating_value_2 = true;
          field2_changes.value = /*reviewer*/
          ctx2[15];
          add_flush_callback(() => updating_value_2 = false);
        }
        if (!updating_selected_2 && dirty[0] & /*reviewerSelected*/
        2097152) {
          updating_selected_2 = true;
          field2_changes.selected = /*reviewerSelected*/
          ctx2[21];
          add_flush_callback(() => updating_selected_2 = false);
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*kpkSelected*/
        1048576)
          field3_changes.userId = /*kpkSelected*/
          ctx2[20];
        if (!updating_value_3 && dirty[0] & /*ka_pusat_kajian*/
        65536) {
          updating_value_3 = true;
          field3_changes.value = /*ka_pusat_kajian*/
          ctx2[16];
          add_flush_callback(() => updating_value_3 = false);
        }
        if (!updating_selected_3 && dirty[0] & /*kpkSelected*/
        1048576) {
          updating_selected_3 = true;
          field3_changes.selected = /*kpkSelected*/
          ctx2[20];
          add_flush_callback(() => updating_selected_3 = false);
        }
        field3.$set(field3_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(br0);
          detach(t1);
          detach(t2);
          detach(br1);
          detach(t3);
          detach(t4);
          detach(br2);
          detach(t5);
          detach(t6);
          detach(br3);
          detach(t7);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_23(ctx) {
    let div1;
    let t3;
    let br;
    let t4;
    let div3;
    return {
      c() {
        div1 = element("div");
        div1.innerHTML = `<div class="column"><p>Lorem ipsum <strong>LogBook</strong> sit amet consectetur adipisicing
                  elit. Totam suscipit placeat amet.</p></div>`;
        t3 = space();
        br = element("br");
        t4 = space();
        div3 = element("div");
        div3.innerHTML = `<div class="column"><p>Lorem ipsum <strong>Monev</strong> sit amet consectetur adipisicing
                  elit. Totam suscipit placeat amet.</p></div>`;
        attr(div1, "class", "columns notification is-info is-light");
        attr(div3, "class", "columns notification is-success is-light");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        insert(target, t3, anchor);
        insert(target, br, anchor);
        insert(target, t4, anchor);
        insert(target, div3, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
          detach(t3);
          detach(br);
          detach(t4);
          detach(div3);
        }
      }
    };
  }
  function create_if_block_15(ctx) {
    let div1;
    return {
      c() {
        div1 = element("div");
        div1.innerHTML = `<div class="column"><p>Lorem ipsum <strong>Laporan</strong> sit amet consectetur adipisicing
                  elit. Totam suscipit placeat amet.</p></div>`;
        attr(div1, "class", "columns notification is-info is-light");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
      }
    };
  }
  function create_default_slot_110(ctx) {
    let h1;
    let t1;
    let div;
    let ul;
    let li0;
    let t3;
    let li1;
    let t5;
    let li2;
    let t7;
    let li3;
    let t9;
    let li4;
    let t11;
    let t12;
    let t13;
    let t14;
    let t15;
    let if_block4_anchor;
    let current;
    let mounted;
    let dispose;
    let if_block0 = (
      /*tab1*/
      ctx[25] === true && create_if_block_52(ctx)
    );
    let if_block1 = (
      /*tab2*/
      ctx[26] === true && create_if_block_43(ctx)
    );
    let if_block2 = (
      /*tab3*/
      ctx[27] === true && create_if_block_33(ctx)
    );
    let if_block3 = (
      /*tab4*/
      ctx[28] === true && create_if_block_23(ctx)
    );
    let if_block4 = (
      /*tab5*/
      ctx[29] === true && create_if_block_15(ctx)
    );
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Detail PPM";
        t1 = space();
        div = element("div");
        ul = element("ul");
        li0 = element("li");
        li0.innerHTML = `<a><span>Identitas PPM</span></a>`;
        t3 = space();
        li1 = element("li");
        li1.innerHTML = `<a><span>Status</span></a>`;
        t5 = space();
        li2 = element("li");
        li2.innerHTML = `<a><span>Reviewer</span></a>`;
        t7 = space();
        li3 = element("li");
        li3.innerHTML = `<a><span>Logbook / Monev</span></a>`;
        t9 = space();
        li4 = element("li");
        li4.innerHTML = `<a><span>Laporan</span></a>`;
        t11 = space();
        if (if_block0)
          if_block0.c();
        t12 = space();
        if (if_block1)
          if_block1.c();
        t13 = space();
        if (if_block2)
          if_block2.c();
        t14 = space();
        if (if_block3)
          if_block3.c();
        t15 = space();
        if (if_block4)
          if_block4.c();
        if_block4_anchor = empty();
        attr(h1, "class", "title is-1");
        toggle_class(
          li0,
          "is-active",
          /*tab1*/
          ctx[25]
        );
        toggle_class(
          li1,
          "is-active",
          /*tab2*/
          ctx[26]
        );
        toggle_class(
          li2,
          "is-active",
          /*tab3*/
          ctx[27]
        );
        toggle_class(
          li3,
          "is-active",
          /*tab4*/
          ctx[28]
        );
        toggle_class(
          li4,
          "is-active",
          /*tab5*/
          ctx[29]
        );
        attr(div, "class", "tabs is-boxed");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, div, anchor);
        append(div, ul);
        append(ul, li0);
        append(ul, t3);
        append(ul, li1);
        append(ul, t5);
        append(ul, li2);
        append(ul, t7);
        append(ul, li3);
        append(ul, t9);
        append(ul, li4);
        insert(target, t11, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t12, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t13, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, t14, anchor);
        if (if_block3)
          if_block3.m(target, anchor);
        insert(target, t15, anchor);
        if (if_block4)
          if_block4.m(target, anchor);
        insert(target, if_block4_anchor, anchor);
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              li0,
              "click",
              /*clicktab1*/
              ctx[36]
            ),
            listen(
              li1,
              "click",
              /*clicktab2*/
              ctx[37]
            ),
            listen(
              li2,
              "click",
              /*clicktab3*/
              ctx[38]
            ),
            listen(
              li3,
              "click",
              /*clicktab4*/
              ctx[39]
            ),
            listen(
              li4,
              "click",
              /*clicktab5*/
              ctx[40]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*tab1*/
        33554432) {
          toggle_class(
            li0,
            "is-active",
            /*tab1*/
            ctx2[25]
          );
        }
        if (!current || dirty[0] & /*tab2*/
        67108864) {
          toggle_class(
            li1,
            "is-active",
            /*tab2*/
            ctx2[26]
          );
        }
        if (!current || dirty[0] & /*tab3*/
        134217728) {
          toggle_class(
            li2,
            "is-active",
            /*tab3*/
            ctx2[27]
          );
        }
        if (!current || dirty[0] & /*tab4*/
        268435456) {
          toggle_class(
            li3,
            "is-active",
            /*tab4*/
            ctx2[28]
          );
        }
        if (!current || dirty[0] & /*tab5*/
        536870912) {
          toggle_class(
            li4,
            "is-active",
            /*tab5*/
            ctx2[29]
          );
        }
        if (
          /*tab1*/
          ctx2[25] === true
        ) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
            if (dirty[0] & /*tab1*/
            33554432) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_52(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(t12.parentNode, t12);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        if (
          /*tab2*/
          ctx2[26] === true
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
            if (dirty[0] & /*tab2*/
            67108864) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block_43(ctx2);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(t13.parentNode, t13);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });
          check_outros();
        }
        if (
          /*tab3*/
          ctx2[27] === true
        ) {
          if (if_block2) {
            if_block2.p(ctx2, dirty);
            if (dirty[0] & /*tab3*/
            134217728) {
              transition_in(if_block2, 1);
            }
          } else {
            if_block2 = create_if_block_33(ctx2);
            if_block2.c();
            transition_in(if_block2, 1);
            if_block2.m(t14.parentNode, t14);
          }
        } else if (if_block2) {
          group_outros();
          transition_out(if_block2, 1, 1, () => {
            if_block2 = null;
          });
          check_outros();
        }
        if (
          /*tab4*/
          ctx2[28] === true
        ) {
          if (if_block3) {
          } else {
            if_block3 = create_if_block_23(ctx2);
            if_block3.c();
            if_block3.m(t15.parentNode, t15);
          }
        } else if (if_block3) {
          if_block3.d(1);
          if_block3 = null;
        }
        if (
          /*tab5*/
          ctx2[29] === true
        ) {
          if (if_block4) {
          } else {
            if_block4 = create_if_block_15(ctx2);
            if_block4.c();
            if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
          }
        } else if (if_block4) {
          if_block4.d(1);
          if_block4 = null;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block0);
        transition_in(if_block1);
        transition_in(if_block2);
        current = true;
      },
      o(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        transition_out(if_block2);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(div);
          detach(t11);
          detach(t12);
          detach(t13);
          detach(t14);
          detach(t15);
          detach(if_block4_anchor);
        }
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
        if (if_block2)
          if_block2.d(detaching);
        if (if_block3)
          if_block3.d(detaching);
        if (if_block4)
          if_block4.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot7(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores fuga\r\n      odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est\r\n      delectus soluta iusto odio architecto impedit maxime non asperiores\r\n      eligendi?";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_header_slot(ctx) {
    let h2;
    return {
      c() {
        h2 = element("h2");
        h2.textContent = "Find Approval";
        attr(h2, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h2, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h2);
        }
      }
    };
  }
  function create_fragment26(ctx) {
    let t;
    let modal;
    let updating_show;
    let current;
    let if_block = (
      /*data*/
      ctx[0] && create_if_block5(ctx)
    );
    function modal_show_binding(value) {
      ctx[62](value);
    }
    let modal_props = {
      $$slots: {
        header: [create_header_slot],
        default: [create_default_slot7]
      },
      $$scope: { ctx }
    };
    if (
      /*showModal*/
      ctx[17] !== void 0
    ) {
      modal_props.show = /*showModal*/
      ctx[17];
    }
    modal = new Modal_default({ props: modal_props });
    binding_callbacks.push(() => bind(modal, "show", modal_show_binding));
    return {
      c() {
        if (if_block)
          if_block.c();
        t = space();
        create_component(modal.$$.fragment);
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, t, anchor);
        mount_component(modal, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*data*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*data*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block5(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(t.parentNode, t);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
        const modal_changes = {};
        if (dirty[2] & /*$$scope*/
        8192) {
          modal_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show && dirty[0] & /*showModal*/
        131072) {
          updating_show = true;
          modal_changes.show = /*showModal*/
          ctx2[17];
          add_flush_callback(() => updating_show = false);
        }
        modal.$set(modal_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        transition_in(modal.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        transition_out(modal.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
        if (if_block)
          if_block.d(detaching);
        destroy_component(modal, detaching);
      }
    };
  }
  function isEdit(code) {
    const edit = [0, 1, 3, 5, 7, 9];
    return edit.some((x) => x === code);
  }
  async function handleSubmitDana() {
  }
  function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(), split = number_string.split(","), sisa = split[0].length % 3, rupiah = split[0].substr(0, sisa), ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== void 0 ? rupiah + "," + split[1] : rupiah;
    return prefix === void 0 ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }
  function instance19($$self, $$props, $$invalidate) {
    let $apiURL;
    let $route;
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(65, $apiURL = $$value));
    component_subscribe($$self, route, ($$value) => $$invalidate(66, $route = $$value));
    let { params } = $$props;
    const id = params["1"];
    let data2;
    let jenisProposal;
    let jenisKegiatan;
    let jenisSkema;
    let kelompokKeahlian;
    let topik;
    let tahunPelaksanaan;
    let biayaPenelitian;
    let anggotaTim = [];
    let judul;
    let abstrak;
    let isi;
    let comment;
    let status;
    let ka_departemen;
    let ka_lppm;
    let reviewer;
    let ka_pusat_kajian;
    let showModal = false;
    let kdeptSelected2;
    let klppmSelected2;
    let kpkSelected2;
    let reviewerSelected2;
    let items = [];
    let file;
    let view;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      $$invalidate(13, ka_departemen = await findRole(11));
      $$invalidate(14, ka_lppm = await findRole(12));
      $$invalidate(16, ka_pusat_kajian = await findRole(13));
      $$invalidate(15, reviewer = await findRole(10));
      const response = await fetch($apiURL + "/ppm/" + id, { method: "GET", headers });
      const result = await response.json();
      $$invalidate(24, view = !isEdit(result.status));
      if (response.ok) {
        $$invalidate(0, data2 = result);
        $$invalidate(1, jenisProposal = data2.jenis_proposal);
        $$invalidate(2, jenisKegiatan = data2.jenis_kegiatan);
        $$invalidate(3, jenisSkema = data2.jenis_skema);
        $$invalidate(4, kelompokKeahlian = data2.kelompok_keahlian);
        $$invalidate(5, topik = data2.topik);
        $$invalidate(6, tahunPelaksanaan = data2.tahun_pelaksanaan);
        $$invalidate(7, biayaPenelitian = data2.biaya_penelitian);
        $$invalidate(8, anggotaTim = typeof data2.anggota_tim === "string" ? JSON.parse(data2.anggota_tim) : data2.anggota_tim);
        rab = data2.rab;
        $$invalidate(9, judul = data2.judul);
        $$invalidate(10, abstrak = data2.abstrak);
        $$invalidate(11, isi = data2.isi);
        $$invalidate(12, comment = data2.comment);
        status = data2.status;
        $$invalidate(18, kdeptSelected2 = data2.uid_kdept);
        $$invalidate(19, klppmSelected2 = data2.uid_klppm);
        $$invalidate(20, kpkSelected2 = data2.uid_kpk);
        $$invalidate(21, reviewerSelected2 = data2.uid_reviewer);
        randomFileName = data2.random_file_name;
      }
      const responsee = await fetch($apiURL + "/pilihUser", { method: "GET", headers });
      const results = await responsee.json();
      if (responsee.ok) {
        listUser = results;
        for (const [key, value] of Object.entries(listUser)) {
          $$invalidate(22, items = [
            ...items,
            {
              value: value.uid,
              label: value.nama_lengkap
            }
          ]);
        }
      } else {
        console.log(responsee);
      }
    });
    async function remediasi() {
      const accessToken = localStorage.getItem("token");
      $$invalidate(10, abstrak = tinymce.get("abstract").getContent());
      $$invalidate(11, isi = tinymce.get("isi").getContent());
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const payloadfile = {
          file: {
            name: file.name,
            type: file.type,
            data: base64Data
          },
          randomFileName
        };
        try {
          const response2 = await fetch($apiURL + "/upload", {
            method: "POST",
            headers: {
              Authorization: `${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payloadfile)
          });
          const result2 = await response2.json();
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
      if (file)
        reader.readAsDataURL(file);
      const payload = {
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        id,
        judul,
        abstrak,
        isi,
        comment: "",
        status: Number(data2.status) + 1,
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2,
        randomFileName
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/admin/proposals");
      } else {
        console.log(response);
      }
    }
    async function handleRevisi() {
      const payload = {
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        id,
        judul,
        abstrak,
        isi,
        comment,
        status: Number(data2.status) - 1,
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2,
        randomFileName
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/admin/proposals");
      } else {
        console.log(response);
      }
    }
    async function handlePass() {
      const payload = {
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        id,
        judul,
        abstrak,
        isi,
        comment: "",
        status: Number(data2.status) + 2,
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2,
        randomFileName
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/admin/proposals");
      } else {
        console.log(response);
      }
    }
    async function handleSubmitReviewer() {
      const payload = {
        id,
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2
      };
      const response = await fetch($apiURL + "/submitreviewer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
      } else {
        console.log(
          response
        );
      }
    }
    function deleteMember(e) {
      let uid = e.target.getAttribute("data-value");
      $$invalidate(8, anggotaTim = anggotaTim.filter((member) => {
        return member.value !== uid;
      }));
    }
    async function handleDownload3(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      let filename = "rab.xlsx";
      try {
        const response = await fetch(`${$apiURL}+"/upload/${randomFileName}`, { method: "GET", headers });
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
    async function searchUser(ev) {
      const response = await fetch($apiURL + "/user");
      const result = await response.json();
      if (response.ok) {
        $$invalidate(17, showModal = true);
      }
    }
    let options;
    async function findRole(role) {
      const response = await fetch($apiURL + "/role/" + role);
      const result = await response.json();
      if (response.ok) {
        options = result;
        return options;
      } else {
        console.log(response);
      }
    }
    let tab1 = true;
    let tab2;
    let tab3;
    let tab4;
    let tab5;
    function clicktab1() {
      $$invalidate(25, tab1 = true);
      $$invalidate(26, tab2 = false);
      $$invalidate(27, tab3 = false);
      $$invalidate(28, tab4 = false);
      $$invalidate(29, tab5 = false);
    }
    function clicktab2() {
      $$invalidate(25, tab1 = false);
      $$invalidate(26, tab2 = true);
      $$invalidate(27, tab3 = false);
      $$invalidate(28, tab4 = false);
      $$invalidate(29, tab5 = false);
    }
    function clicktab3() {
      $$invalidate(25, tab1 = false);
      $$invalidate(26, tab2 = false);
      $$invalidate(27, tab3 = true);
      $$invalidate(28, tab4 = false);
      $$invalidate(29, tab5 = false);
    }
    function clicktab4() {
      $$invalidate(25, tab1 = false);
      $$invalidate(26, tab2 = false);
      $$invalidate(27, tab3 = false);
      $$invalidate(28, tab4 = true);
      $$invalidate(29, tab5 = false);
    }
    function clicktab5() {
      $$invalidate(25, tab1 = false);
      $$invalidate(26, tab2 = false);
      $$invalidate(27, tab3 = false);
      $$invalidate(28, tab4 = false);
      $$invalidate(29, tab5 = true);
    }
    function select_change_handler() {
      jenisProposal = select_value(this);
      $$invalidate(1, jenisProposal);
    }
    function select_change_handler_1() {
      jenisKegiatan = select_value(this);
      $$invalidate(2, jenisKegiatan);
    }
    function select_change_handler_2() {
      jenisSkema = select_value(this);
      $$invalidate(3, jenisSkema);
    }
    function input_input_handler() {
      kelompokKeahlian = this.value;
      $$invalidate(4, kelompokKeahlian);
    }
    function input_input_handler_1() {
      topik = this.value;
      $$invalidate(5, topik);
    }
    function field5_value_binding(value) {
      tahunPelaksanaan = value;
      $$invalidate(6, tahunPelaksanaan);
    }
    function input_input_handler_2() {
      biayaPenelitian = this.value;
      $$invalidate(7, biayaPenelitian);
    }
    const keyup_handler = () => $$invalidate(7, biayaPenelitian = formatRupiah(biayaPenelitian, "Rp. "));
    const change_handler = (e) => $$invalidate(23, file = e.target.files[0]);
    function select_result_binding(value) {
      anggotaTim = value;
      $$invalidate(8, anggotaTim);
    }
    function input_input_handler_3() {
      judul = this.value;
      $$invalidate(9, judul);
    }
    function textarea_input_handler() {
      comment = this.value;
      $$invalidate(12, comment);
    }
    function field0_value_binding(value) {
      ka_departemen = value;
      $$invalidate(13, ka_departemen);
    }
    function field0_selected_binding(value) {
      kdeptSelected2 = value;
      $$invalidate(18, kdeptSelected2);
    }
    function field1_value_binding(value) {
      ka_lppm = value;
      $$invalidate(14, ka_lppm);
    }
    function field1_selected_binding(value) {
      klppmSelected2 = value;
      $$invalidate(19, klppmSelected2);
    }
    function field2_value_binding(value) {
      reviewer = value;
      $$invalidate(15, reviewer);
    }
    function field2_selected_binding(value) {
      reviewerSelected2 = value;
      $$invalidate(21, reviewerSelected2);
    }
    function field3_value_binding(value) {
      ka_pusat_kajian = value;
      $$invalidate(16, ka_pusat_kajian);
    }
    function field3_selected_binding(value) {
      kpkSelected2 = value;
      $$invalidate(20, kpkSelected2);
    }
    function modal_show_binding(value) {
      showModal = value;
      $$invalidate(17, showModal);
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(41, params = $$props2.params);
    };
    return [
      data2,
      jenisProposal,
      jenisKegiatan,
      jenisSkema,
      kelompokKeahlian,
      topik,
      tahunPelaksanaan,
      biayaPenelitian,
      anggotaTim,
      judul,
      abstrak,
      isi,
      comment,
      ka_departemen,
      ka_lppm,
      reviewer,
      ka_pusat_kajian,
      showModal,
      kdeptSelected2,
      klppmSelected2,
      kpkSelected2,
      reviewerSelected2,
      items,
      file,
      view,
      tab1,
      tab2,
      tab3,
      tab4,
      tab5,
      remediasi,
      handleRevisi,
      handlePass,
      handleSubmitReviewer,
      deleteMember,
      handleDownload3,
      clicktab1,
      clicktab2,
      clicktab3,
      clicktab4,
      clicktab5,
      params,
      select_change_handler,
      select_change_handler_1,
      select_change_handler_2,
      input_input_handler,
      input_input_handler_1,
      field5_value_binding,
      input_input_handler_2,
      keyup_handler,
      change_handler,
      select_result_binding,
      input_input_handler_3,
      textarea_input_handler,
      field0_value_binding,
      field0_selected_binding,
      field1_value_binding,
      field1_selected_binding,
      field2_value_binding,
      field2_selected_binding,
      field3_value_binding,
      field3_selected_binding,
      modal_show_binding
    ];
  }
  var Proposal = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance19, create_fragment26, safe_not_equal, { params: 41 }, null, [-1, -1, -1]);
    }
  };
  var proposal_default = Proposal;

  // src/pages/admin/proposals.svelte
  init_define_process();
  function get_each_context6(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[4] = list[i];
    return child_ctx;
  }
  function create_if_block6(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot8] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        129) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_each_block6(ctx) {
    let tr;
    let td0;
    let p0;
    let t0_value = (
      /*item*/
      ctx[4].judul + ""
    );
    let t0;
    let t1;
    let td1;
    let p1;
    let t2_value = (
      /*item*/
      ctx[4].jenis_kegiatan + ""
    );
    let t2;
    let t3;
    let td2;
    let p2;
    let t4_value = (
      /*item*/
      ctx[4].jenis_skema + ""
    );
    let t4;
    let t5;
    let td3;
    let status;
    let t6;
    let td4;
    let button;
    let span;
    let icon;
    let button_uid_value;
    let t7;
    let current;
    let mounted;
    let dispose;
    status = new Status_default({ props: { code: (
      /*item*/
      ctx[4].status
    ) } });
    icon = new Icon_default({ props: { id: "orang", src: infoOutline } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        p0 = element("p");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        p1 = element("p");
        t2 = text(t2_value);
        t3 = space();
        td2 = element("td");
        p2 = element("p");
        t4 = text(t4_value);
        t5 = space();
        td3 = element("td");
        create_component(status.$$.fragment);
        t6 = space();
        td4 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t7 = space();
        attr(p0, "class", "svelte-1fo15t");
        attr(p1, "class", "svelte-1fo15t");
        attr(p2, "class", "svelte-1fo15t");
        attr(td3, "class", "status svelte-1fo15t");
        attr(span, "class", "icon");
        attr(button, "class", "button is-info is-rounded is-small");
        attr(button, "uid", button_uid_value = /*item*/
        ctx[4].id);
        attr(td4, "class", "review svelte-1fo15t");
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, p0);
        append(p0, t0);
        append(tr, t1);
        append(tr, td1);
        append(td1, p1);
        append(p1, t2);
        append(tr, t3);
        append(tr, td2);
        append(td2, p2);
        append(p2, t4);
        append(tr, t5);
        append(tr, td3);
        mount_component(status, td3, null);
        append(tr, t6);
        append(tr, td4);
        append(td4, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t7);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*handleReview*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if ((!current || dirty & /*items*/
        1) && t0_value !== (t0_value = /*item*/
        ctx2[4].judul + ""))
          set_data(t0, t0_value);
        if ((!current || dirty & /*items*/
        1) && t2_value !== (t2_value = /*item*/
        ctx2[4].jenis_kegiatan + ""))
          set_data(t2, t2_value);
        if ((!current || dirty & /*items*/
        1) && t4_value !== (t4_value = /*item*/
        ctx2[4].jenis_skema + ""))
          set_data(t4, t4_value);
        const status_changes = {};
        if (dirty & /*items*/
        1)
          status_changes.code = /*item*/
          ctx2[4].status;
        status.$set(status_changes);
        if (!current || dirty & /*items*/
        1 && button_uid_value !== (button_uid_value = /*item*/
        ctx2[4].id)) {
          attr(button, "uid", button_uid_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(status.$$.fragment, local);
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status.$$.fragment, local);
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(status);
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot8(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let table;
    let thead;
    let t12;
    let tbody;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block6(get_each_context6(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "PPM Management";
        t1 = space();
        hr = element("hr");
        t2 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="svelte-1fo15t">Judul</th> <th class="is-narrow svelte-1fo15t">Jenis Kegiatan</th> <th class="is-narrow svelte-1fo15t">Jenis Skema</th> <th class="svelte-1fo15t">Status</th> <th class="svelte-1fo15t">Action</th></tr>`;
        t12 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(h1, "class", "title is-1");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t12);
        append(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items, handleReview*/
        3) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context6(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block6(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(table);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment27(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block6(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block6(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function instance20($$self, $$props, $$invalidate) {
    let $route;
    let $apiURL;
    component_subscribe($$self, route, ($$value) => $$invalidate(2, $route = $$value));
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(3, $apiURL = $$value));
    let items;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch($apiURL + "/ppm", { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = result.dbData);
      }
    });
    async function handleReview(ev) {
      const id = ev.target.getAttribute("uid");
      $route("/admin/proposal/" + id);
    }
    return [items, handleReview];
  }
  var Proposals = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance20, create_fragment27, safe_not_equal, {});
    }
  };
  var proposals_default = Proposals;

  // src/pages/admin/users.svelte
  init_define_process();
  function get_each_context7(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[10] = list[i];
    child_ctx[12] = i;
    return child_ctx;
  }
  function create_if_block7(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let div2;
    let div0;
    let t7;
    let div1;
    let button;
    let span0;
    let icon;
    let t8;
    let span1;
    let t10;
    let table;
    let thead;
    let t18;
    let tbody;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "orang", src: accountAdd } });
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block7(get_each_context7(ctx, each_value, i));
    }
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "User Management";
        t1 = space();
        hr = element("hr");
        t2 = space();
        div2 = element("div");
        div0 = element("div");
        div0.innerHTML = `<p>Untuk <strong>Dosen / Reviewer</strong> dari luar UISI<br/>buat
               akun disini</p>`;
        t7 = space();
        div1 = element("div");
        button = element("button");
        span0 = element("span");
        create_component(icon.$$.fragment);
        t8 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Create User</a>`;
        t10 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Username</th> <th>Email</th> <th class="is-narrow">Role</th> <th>Active</th></tr>`;
        t18 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(h1, "class", "title is-1");
        attr(div0, "class", "column is-4");
        attr(span0, "class", "icon");
        attr(button, "class", "button is-info");
        attr(div1, "class", "column");
        attr(div2, "class", "columns notification is-info is-light");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, div2, anchor);
        append(div2, div0);
        append(div2, t7);
        append(div2, div1);
        append(div1, button);
        append(button, span0);
        mount_component(icon, span0, null);
        append(button, t8);
        append(button, span1);
        insert(target, t10, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t18);
        append(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*addUser*/
            ctx[3]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*items, handleActive, handleGroup*/
        7) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context7(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block7(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(tbody, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(div2);
          detach(t10);
          detach(table);
        }
        destroy_component(icon);
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block7(ctx) {
    let tr;
    let td0;
    let a;
    let t0_value = (
      /*item*/
      ctx[10].username + ""
    );
    let t0;
    let a_href_value;
    let t1;
    let td1;
    let t2_value = (
      /*item*/
      ctx[10].email + ""
    );
    let t2;
    let t3;
    let td2;
    let div;
    let select;
    let option0;
    let t4;
    let option0_selected_value;
    let option1;
    let t5;
    let option1_selected_value;
    let option2;
    let t6;
    let option2_selected_value;
    let option3;
    let t7;
    let option3_selected_value;
    let option4;
    let t8;
    let option4_selected_value;
    let option5;
    let t9;
    let option5_selected_value;
    let select_uid_value;
    let t10;
    let td3;
    let t11_value = (
      /*item*/
      ctx[10].active ? "\u2714" : "\u2718"
    );
    let t11;
    let td3_uid_value;
    let td3_role_value;
    let t12;
    let mounted;
    let dispose;
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        a = element("a");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        t2 = text(t2_value);
        t3 = space();
        td2 = element("td");
        div = element("div");
        select = element("select");
        option0 = element("option");
        t4 = text("Admin");
        option1 = element("option");
        t5 = text("Dosen");
        option2 = element("option");
        t6 = text("Reviewer");
        option3 = element("option");
        t7 = text("Ka. Departemen");
        option4 = element("option");
        t8 = text("Ka. LPPM");
        option5 = element("option");
        t9 = text("Ka. Pusat Kajian");
        t10 = space();
        td3 = element("td");
        t11 = text(t11_value);
        t12 = space();
        attr(a, "href", a_href_value = "/admin/profile/" + /*item*/
        ctx[10].id);
        option0.__value = "9";
        set_input_value(option0, option0.__value);
        option0.selected = option0_selected_value = /*item*/
        ctx[10].role === 9;
        option1.__value = "0";
        set_input_value(option1, option1.__value);
        option1.selected = option1_selected_value = /*item*/
        ctx[10].role === 0;
        option2.__value = "10";
        set_input_value(option2, option2.__value);
        option2.selected = option2_selected_value = /*item*/
        ctx[10].role === 10;
        option3.__value = "11";
        set_input_value(option3, option3.__value);
        option3.selected = option3_selected_value = /*item*/
        ctx[10].role === 11;
        option4.__value = "12";
        set_input_value(option4, option4.__value);
        option4.selected = option4_selected_value = /*item*/
        ctx[10].role === 12;
        option5.__value = "13";
        set_input_value(option5, option5.__value);
        option5.selected = option5_selected_value = /*item*/
        ctx[10].role === 13;
        attr(select, "uid", select_uid_value = /*idx*/
        ctx[12]);
        attr(select, "class", "svelte-1t9fqxv");
        attr(div, "class", "select");
        attr(td2, "fixed", "");
        attr(td2, "class", "group svelte-1t9fqxv");
        attr(td3, "fixed", "");
        attr(td3, "uid", td3_uid_value = /*idx*/
        ctx[12]);
        attr(td3, "role", td3_role_value = /*item*/
        ctx[10].role);
        attr(td3, "class", "active svelte-1t9fqxv");
        toggle_class(td3, "red", !/*item*/
        ctx[10].active);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, a);
        append(a, t0);
        append(tr, t1);
        append(tr, td1);
        append(td1, t2);
        append(tr, t3);
        append(tr, td2);
        append(td2, div);
        append(div, select);
        append(select, option0);
        append(option0, t4);
        append(select, option1);
        append(option1, t5);
        append(select, option2);
        append(option2, t6);
        append(select, option3);
        append(option3, t7);
        append(select, option4);
        append(option4, t8);
        append(select, option5);
        append(option5, t9);
        append(tr, t10);
        append(tr, td3);
        append(td3, t11);
        append(tr, t12);
        if (!mounted) {
          dispose = [
            listen(
              select,
              "change",
              /*handleGroup*/
              ctx[2]
            ),
            listen(
              td3,
              "click",
              /*handleActive*/
              ctx[1]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*items*/
        1 && t0_value !== (t0_value = /*item*/
        ctx2[10].username + ""))
          set_data(t0, t0_value);
        if (dirty & /*items*/
        1 && a_href_value !== (a_href_value = "/admin/profile/" + /*item*/
        ctx2[10].id)) {
          attr(a, "href", a_href_value);
        }
        if (dirty & /*items*/
        1 && t2_value !== (t2_value = /*item*/
        ctx2[10].email + ""))
          set_data(t2, t2_value);
        if (dirty & /*items*/
        1 && option0_selected_value !== (option0_selected_value = /*item*/
        ctx2[10].role === 9)) {
          option0.selected = option0_selected_value;
        }
        if (dirty & /*items*/
        1 && option1_selected_value !== (option1_selected_value = /*item*/
        ctx2[10].role === 0)) {
          option1.selected = option1_selected_value;
        }
        if (dirty & /*items*/
        1 && option2_selected_value !== (option2_selected_value = /*item*/
        ctx2[10].role === 10)) {
          option2.selected = option2_selected_value;
        }
        if (dirty & /*items*/
        1 && option3_selected_value !== (option3_selected_value = /*item*/
        ctx2[10].role === 11)) {
          option3.selected = option3_selected_value;
        }
        if (dirty & /*items*/
        1 && option4_selected_value !== (option4_selected_value = /*item*/
        ctx2[10].role === 12)) {
          option4.selected = option4_selected_value;
        }
        if (dirty & /*items*/
        1 && option5_selected_value !== (option5_selected_value = /*item*/
        ctx2[10].role === 13)) {
          option5.selected = option5_selected_value;
        }
        if (dirty & /*items*/
        1 && t11_value !== (t11_value = /*item*/
        ctx2[10].active ? "\u2714" : "\u2718"))
          set_data(t11, t11_value);
        if (dirty & /*items*/
        1 && td3_role_value !== (td3_role_value = /*item*/
        ctx2[10].role)) {
          attr(td3, "role", td3_role_value);
        }
        if (dirty & /*items*/
        1) {
          toggle_class(td3, "red", !/*item*/
          ctx2[10].active);
        }
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot9(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block7(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block7(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_fragment28(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot9] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        8193) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function instance21($$self, $$props, $$invalidate) {
    let $route;
    let $apiURL;
    component_subscribe($$self, route, ($$value) => $$invalidate(6, $route = $$value));
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(7, $apiURL = $$value));
    let { params } = $$props;
    let profile;
    let items;
    async function populateTable() {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch($apiURL + "/user", { method: "GET", headers });
      const result = await response.json();
      if (response.status === 200) {
        $$invalidate(0, items = result.dbData);
      }
    }
    async function handleActive(ev) {
      const value = ev.target.getAttribute("role");
      const id = ev.target.getAttribute("uid");
      const payload = {
        id: items[id].id,
        active: !items[id].active,
        role: Number(value)
      };
      const response = await fetch($apiURL + "/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        populateTable();
      } else {
        console.log(response);
      }
    }
    async function handleGroup(ev) {
      const value = ev.target.value;
      const id = ev.target.getAttribute("uid");
      const payload = {
        id: items[id].id,
        role: Number(value),
        active: items[id].active
      };
      const response = await fetch($apiURL + "/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        populateTable();
      } else {
        console.log(response);
      }
    }
    async function getPage() {
      if (params["1"] === "profile") {
        let id = params["2"];
        const response = await fetch($apiURL + "/user/" + id);
        const result = await response.json();
        if (response.ok) {
          if (!result.length)
            return;
          $$invalidate(5, profile = []);
          for (const [field, value] of Object.entries(result[0])) {
            profile.push({ field, value });
          }
        } else {
          data = null;
        }
      }
    }
    function addUser() {
      $route("/admin/createuser");
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(4, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      16) {
        $:
          params, getPage();
      }
      if ($$self.$$.dirty & /*profile*/
      32) {
        $:
          profile, profile ? $$invalidate(0, items = null) : populateTable();
      }
    };
    return [items, handleActive, handleGroup, addUser, params, profile];
  }
  var Users = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance21, create_fragment28, safe_not_equal, { params: 4 });
    }
  };
  var users_default = Users;

  // src/modules/E404.svelte
  init_define_process();
  function create_fragment29(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>404</h1> <h6>PAGE NOT FOUND</h6>`;
        attr(article, "class", "svelte-12yf9li");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  var E404 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment29, safe_not_equal, {});
    }
  };
  var E404_default = E404;

  // src/pages/admin/Index.svelte
  function create_else_block3(ctx) {
    let e404;
    let current;
    e404 = new E404_default({});
    return {
      c() {
        create_component(e404.$$.fragment);
      },
      m(target, anchor) {
        mount_component(e404, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(e404.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(e404.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(e404, detaching);
      }
    };
  }
  function create_if_block_16(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = (
      /*cmp*/
      ctx[1]
    );
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[0]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*cmp*/
        2 && switch_value !== (switch_value = /*cmp*/
        ctx2[1])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          1)
            switch_instance_changes.params = /*params*/
            ctx2[0];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_if_block8(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = home_default;
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[0]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (switch_value !== (switch_value = home_default)) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          1)
            switch_instance_changes.params = /*params*/
            ctx2[0];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_fragment30(ctx) {
    let show_if;
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block8, create_if_block_16, create_else_block3];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (dirty & /*params*/
      1)
        show_if = null;
      if (show_if == null)
        show_if = !!(Object.keys(
          /*params*/
          ctx2[0]
        ).length === 0);
      if (show_if)
        return 0;
      if (
        /*cmp*/
        ctx2[1]
      )
        return 1;
      return 2;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function instance22($$self, $$props, $$invalidate) {
    let { params = {} } = $$props;
    let cmp;
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      1) {
        $:
          params, $$invalidate(1, cmp = admin_exports[params["0"]] || null);
      }
    };
    return [params, cmp];
  }
  var Index2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance22, create_fragment30, safe_not_equal, { params: 0 });
    }
  };
  var Index_default2 = Index2;

  // src/pages/auth/Index.svelte
  init_define_process();
  var pages = __toESM(require_auth());
  function create_else_block4(ctx) {
    let e404;
    let current;
    e404 = new E404_default({});
    return {
      c() {
        create_component(e404.$$.fragment);
      },
      m(target, anchor) {
        mount_component(e404, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(e404.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(e404.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(e404, detaching);
      }
    };
  }
  function create_if_block_17(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = (
      /*cmp*/
      ctx[1]
    );
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[0]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*cmp*/
        2 && switch_value !== (switch_value = /*cmp*/
        ctx2[1])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          1)
            switch_instance_changes.params = /*params*/
            ctx2[0];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_if_block9(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>Auth Google</h1>`;
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  function create_fragment31(ctx) {
    let show_if;
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block9, create_if_block_17, create_else_block4];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (dirty & /*params*/
      1)
        show_if = null;
      if (show_if == null)
        show_if = !!(Object.keys(
          /*params*/
          ctx2[0]
        ).length === 0);
      if (show_if)
        return 0;
      if (
        /*cmp*/
        ctx2[1]
      )
        return 1;
      return 2;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function instance23($$self, $$props, $$invalidate) {
    let $route;
    let $isLogin;
    component_subscribe($$self, route, ($$value) => $$invalidate(2, $route = $$value));
    component_subscribe($$self, isLogin, ($$value) => $$invalidate(3, $isLogin = $$value));
    let { params = {} } = $$props;
    const token = params.token || null;
    if (token) {
      set_store_value(isLogin, $isLogin = true, $isLogin);
      localStorage.setItem("id", params.id);
      localStorage.setItem("username", params.username);
      localStorage.setItem("role", params.role);
      localStorage.setItem("token", params.token);
      let role = params.role;
      if (role === "admin")
        $route("/admin");
      else
        $route("/dosen");
    } else {
      $route("/login");
    }
    let cmp;
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      1) {
        $:
          params, $$invalidate(1, cmp = pages[params["0"]] || null);
      }
    };
    return [params, cmp];
  }
  var Index3 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance23, create_fragment31, safe_not_equal, { params: 0 });
    }
  };
  var Index_default3 = Index3;

  // src/pages/dosen/Index.svelte
  init_define_process();

  // src/pages/dosen/index.js
  var dosen_exports = {};
  __export(dosen_exports, {
    approval: () => approval_default,
    detailproposal: () => detailproposal_default,
    home: () => home_default2,
    profile: () => profile_default2,
    proposal: () => proposal_default2,
    proposals: () => proposals_default2,
    select: () => select_default
  });
  init_define_process();

  // src/pages/dosen/approval.svelte
  init_define_process();
  function get_each_context8(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[5] = list[i];
    return child_ctx;
  }
  function create_if_block10(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot10] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        257) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_each_block8(ctx) {
    let tr;
    let td0;
    let t0_value = (
      /*item*/
      ctx[5].judul + ""
    );
    let t0;
    let t1;
    let td1;
    let p0;
    let t2_value = (
      /*item*/
      ctx[5].jenis_kegiatan + ""
    );
    let t2;
    let t3;
    let td2;
    let p1;
    let t4_value = (
      /*item*/
      ctx[5].jenis_skema + ""
    );
    let t4;
    let t5;
    let td3;
    let status;
    let td3_pid_value;
    let t6;
    let td4;
    let button;
    let span;
    let icon;
    let button_pid_value;
    let t7;
    let current;
    let mounted;
    let dispose;
    status = new Status_default({ props: { code: (
      /*item*/
      ctx[5].status
    ) } });
    icon = new Icon_default({ props: { id: "orang", src: infoOutline } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        p0 = element("p");
        t2 = text(t2_value);
        t3 = space();
        td2 = element("td");
        p1 = element("p");
        t4 = text(t4_value);
        t5 = space();
        td3 = element("td");
        create_component(status.$$.fragment);
        t6 = space();
        td4 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t7 = space();
        attr(td3, "class", "status svelte-1eb6cem");
        attr(td3, "pid", td3_pid_value = /*item*/
        ctx[5].id);
        attr(span, "class", "icon");
        attr(button, "class", "button is-info is-rounded is-small");
        attr(button, "pid", button_pid_value = /*item*/
        ctx[5].id);
        attr(td4, "class", "review svelte-1eb6cem");
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, t0);
        append(tr, t1);
        append(tr, td1);
        append(td1, p0);
        append(p0, t2);
        append(tr, t3);
        append(tr, td2);
        append(td2, p1);
        append(p1, t4);
        append(tr, t5);
        append(tr, td3);
        mount_component(status, td3, null);
        append(tr, t6);
        append(tr, td4);
        append(td4, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t7);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*detail*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if ((!current || dirty & /*items*/
        1) && t0_value !== (t0_value = /*item*/
        ctx2[5].judul + ""))
          set_data(t0, t0_value);
        if ((!current || dirty & /*items*/
        1) && t2_value !== (t2_value = /*item*/
        ctx2[5].jenis_kegiatan + ""))
          set_data(t2, t2_value);
        if ((!current || dirty & /*items*/
        1) && t4_value !== (t4_value = /*item*/
        ctx2[5].jenis_skema + ""))
          set_data(t4, t4_value);
        const status_changes = {};
        if (dirty & /*items*/
        1)
          status_changes.code = /*item*/
          ctx2[5].status;
        status.$set(status_changes);
        if (!current || dirty & /*items*/
        1 && td3_pid_value !== (td3_pid_value = /*item*/
        ctx2[5].id)) {
          attr(td3, "pid", td3_pid_value);
        }
        if (!current || dirty & /*items*/
        1 && button_pid_value !== (button_pid_value = /*item*/
        ctx2[5].id)) {
          attr(button, "pid", button_pid_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(status.$$.fragment, local);
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status.$$.fragment, local);
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(status);
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot10(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let div;
    let t6;
    let table;
    let thead;
    let t16;
    let tbody;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block8(get_each_context8(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Approval Management";
        t1 = space();
        hr = element("hr");
        t2 = space();
        div = element("div");
        div.innerHTML = `<p>Berikut adalah list <strong>Penelitian / Pengabdian Masyarakat</strong>
            yang diberikan kepada anda untuk mendapatkan persetujuan. Cek PPM dengan
            teliti sebelum memberikan persetujuan!</p>`;
        t6 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Judul</th> <th class="is-narrow">Jenis Kegiatan</th> <th class="is-narrow">Jenis Skema</th> <th>Status</th> <th colspan="2">Action</th></tr>`;
        t16 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(h1, "class", "title is-1");
        attr(div, "class", "notification is-info is-light");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, div, anchor);
        insert(target, t6, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t16);
        append(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items, detail*/
        3) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context8(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block8(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(div);
          detach(t6);
          detach(table);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment32(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block10(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block10(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function instance24($$self, $$props, $$invalidate) {
    let $route;
    let $apiURL;
    component_subscribe($$self, route, ($$value) => $$invalidate(2, $route = $$value));
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(3, $apiURL = $$value));
    const id = localStorage.id;
    let items;
    onMount(async () => {
      const response = await fetch($apiURL + "/approval/" + id);
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = result.dbData);
      } else {
        console.log(response);
      }
    });
    function detail2(ev) {
      let propId = ev.target.getAttribute("pid");
      $route("/dosen/detailproposal/" + propId);
    }
    return [items, detail2];
  }
  var Approval = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance24, create_fragment32, safe_not_equal, {});
    }
  };
  var approval_default = Approval;

  // src/pages/dosen/detailproposal.svelte
  init_define_process();
  function get_each_context9(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[44] = list[i];
    return child_ctx;
  }
  function create_if_block11(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot11] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty[0] & /*tab4, tab3, data, tab2, status, comment, anggotaTim, biayaPenelitian, tahunPelaksanaan, topik, kelompokKeahlian, jenisSkema, jenisKegiatan, jenisProposal, tab1*/
        32767 | dirty[1] & /*$$scope*/
        65536) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_if_block_44(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let field5;
    let t5;
    let field6;
    let t6;
    let field7;
    let t7;
    let field8;
    let t8;
    let br;
    let t9;
    let table;
    let thead;
    let t13;
    let tbody;
    let tr1;
    let t17;
    let t18;
    let hr0;
    let t19;
    let field9;
    let t20;
    let field10;
    let t21;
    let field11;
    let t22;
    let hr1;
    let t23;
    let field12;
    let t24;
    let hr2;
    let t25;
    let t26;
    let t27;
    let t28;
    let if_block4_anchor;
    let current;
    field0 = new Field_default({
      props: {
        name: "Jenis Proposal",
        $$slots: { default: [create_default_slot_133] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Jenis Kegiatan",
        $$slots: { default: [create_default_slot_123] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Jenis Skema",
        $$slots: { default: [create_default_slot_112] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Kelompok Keahlian",
        $$slots: { default: [create_default_slot_102] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Topik",
        $$slots: { default: [create_default_slot_92] },
        $$scope: { ctx }
      }
    });
    field5 = new Field_default({
      props: {
        name: "Tahun Pelaksanaan",
        $$slots: { default: [create_default_slot_82] },
        $$scope: { ctx }
      }
    });
    field6 = new Field_default({
      props: {
        name: "Biaya Penelitian",
        $$slots: { default: [create_default_slot_72] },
        $$scope: { ctx }
      }
    });
    field7 = new Field_default({
      props: {
        name: "Rencana Anggaran Biaya",
        $$slots: { default: [create_default_slot_62] },
        $$scope: { ctx }
      }
    });
    field8 = new Field_default({
      props: {
        name: "Anggota Tim",
        $$slots: { default: [create_default_slot_52] },
        $$scope: { ctx }
      }
    });
    let if_block0 = (
      /*anggotaTim*/
      ctx[8].length > 0 && create_if_block_132(ctx)
    );
    field9 = new Field_default({
      props: {
        name: "Judul",
        $$slots: { default: [create_default_slot_42] },
        $$scope: { ctx }
      }
    });
    field10 = new Field_default({
      props: {
        name: "abstrak",
        $$slots: { default: [create_default_slot_33] },
        $$scope: { ctx }
      }
    });
    field11 = new Field_default({
      props: {
        name: "isi",
        $$slots: { default: [create_default_slot_28] },
        $$scope: { ctx }
      }
    });
    field12 = new Field_default({
      props: {
        name: "Catatan Revisi",
        $$slots: { default: [create_default_slot_111] },
        $$scope: { ctx }
      }
    });
    let if_block1 = (
      /*role*/
      ctx[15] === "Ka.Departemen" && create_if_block_112(ctx)
    );
    let if_block2 = (
      /*role*/
      ctx[15] === "Ka.LPPM" && create_if_block_93(ctx)
    );
    let if_block3 = (
      /*role*/
      ctx[15] === "reviewer" && create_if_block_73(ctx)
    );
    let if_block4 = (
      /*role*/
      ctx[15] === "Ka.PusatKajian" && create_if_block_53(ctx)
    );
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        create_component(field5.$$.fragment);
        t5 = space();
        create_component(field6.$$.fragment);
        t6 = space();
        create_component(field7.$$.fragment);
        t7 = space();
        create_component(field8.$$.fragment);
        t8 = space();
        br = element("br");
        t9 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow">Status</th> <th>Nama</th></tr>`;
        t13 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        tr1.innerHTML = `<td>Ketua</td> <td>...</td>`;
        t17 = space();
        if (if_block0)
          if_block0.c();
        t18 = space();
        hr0 = element("hr");
        t19 = space();
        create_component(field9.$$.fragment);
        t20 = space();
        create_component(field10.$$.fragment);
        t21 = space();
        create_component(field11.$$.fragment);
        t22 = space();
        hr1 = element("hr");
        t23 = space();
        create_component(field12.$$.fragment);
        t24 = space();
        hr2 = element("hr");
        t25 = space();
        if (if_block1)
          if_block1.c();
        t26 = space();
        if (if_block2)
          if_block2.c();
        t27 = space();
        if (if_block3)
          if_block3.c();
        t28 = space();
        if (if_block4)
          if_block4.c();
        if_block4_anchor = empty();
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        mount_component(field5, target, anchor);
        insert(target, t5, anchor);
        mount_component(field6, target, anchor);
        insert(target, t6, anchor);
        mount_component(field7, target, anchor);
        insert(target, t7, anchor);
        mount_component(field8, target, anchor);
        insert(target, t8, anchor);
        insert(target, br, anchor);
        insert(target, t9, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t13);
        append(table, tbody);
        append(tbody, tr1);
        append(tbody, t17);
        if (if_block0)
          if_block0.m(tbody, null);
        insert(target, t18, anchor);
        insert(target, hr0, anchor);
        insert(target, t19, anchor);
        mount_component(field9, target, anchor);
        insert(target, t20, anchor);
        mount_component(field10, target, anchor);
        insert(target, t21, anchor);
        mount_component(field11, target, anchor);
        insert(target, t22, anchor);
        insert(target, hr1, anchor);
        insert(target, t23, anchor);
        mount_component(field12, target, anchor);
        insert(target, t24, anchor);
        insert(target, hr2, anchor);
        insert(target, t25, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t26, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, t27, anchor);
        if (if_block3)
          if_block3.m(target, anchor);
        insert(target, t28, anchor);
        if (if_block4)
          if_block4.m(target, anchor);
        insert(target, if_block4_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*jenisProposal*/
        2 | dirty[1] & /*$$scope*/
        65536) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*jenisKegiatan*/
        4 | dirty[1] & /*$$scope*/
        65536) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*jenisSkema*/
        8 | dirty[1] & /*$$scope*/
        65536) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*kelompokKeahlian*/
        16 | dirty[1] & /*$$scope*/
        65536) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*topik*/
        32 | dirty[1] & /*$$scope*/
        65536) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (dirty[0] & /*tahunPelaksanaan*/
        64 | dirty[1] & /*$$scope*/
        65536) {
          field5_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field5.$set(field5_changes);
        const field6_changes = {};
        if (dirty[0] & /*biayaPenelitian*/
        128 | dirty[1] & /*$$scope*/
        65536) {
          field6_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field6.$set(field6_changes);
        const field7_changes = {};
        if (dirty[1] & /*$$scope*/
        65536) {
          field7_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field7.$set(field7_changes);
        const field8_changes = {};
        if (dirty[1] & /*$$scope*/
        65536) {
          field8_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field8.$set(field8_changes);
        if (
          /*anggotaTim*/
          ctx2[8].length > 0
        ) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0 = create_if_block_132(ctx2);
            if_block0.c();
            if_block0.m(tbody, null);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        const field9_changes = {};
        if (dirty[0] & /*data*/
        1 | dirty[1] & /*$$scope*/
        65536) {
          field9_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field9.$set(field9_changes);
        const field10_changes = {};
        if (dirty[0] & /*data*/
        1 | dirty[1] & /*$$scope*/
        65536) {
          field10_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field10.$set(field10_changes);
        const field11_changes = {};
        if (dirty[0] & /*data*/
        1 | dirty[1] & /*$$scope*/
        65536) {
          field11_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field11.$set(field11_changes);
        const field12_changes = {};
        if (dirty[0] & /*comment*/
        512 | dirty[1] & /*$$scope*/
        65536) {
          field12_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field12.$set(field12_changes);
        if (
          /*role*/
          ctx2[15] === "Ka.Departemen"
        )
          if_block1.p(ctx2, dirty);
        if (
          /*role*/
          ctx2[15] === "Ka.LPPM"
        )
          if_block2.p(ctx2, dirty);
        if (
          /*role*/
          ctx2[15] === "reviewer"
        )
          if_block3.p(ctx2, dirty);
        if (
          /*role*/
          ctx2[15] === "Ka.PusatKajian"
        )
          if_block4.p(ctx2, dirty);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        transition_in(field6.$$.fragment, local);
        transition_in(field7.$$.fragment, local);
        transition_in(field8.$$.fragment, local);
        transition_in(field9.$$.fragment, local);
        transition_in(field10.$$.fragment, local);
        transition_in(field11.$$.fragment, local);
        transition_in(field12.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        transition_out(field6.$$.fragment, local);
        transition_out(field7.$$.fragment, local);
        transition_out(field8.$$.fragment, local);
        transition_out(field9.$$.fragment, local);
        transition_out(field10.$$.fragment, local);
        transition_out(field11.$$.fragment, local);
        transition_out(field12.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(br);
          detach(t9);
          detach(table);
          detach(t18);
          detach(hr0);
          detach(t19);
          detach(t20);
          detach(t21);
          detach(t22);
          detach(hr1);
          detach(t23);
          detach(t24);
          detach(hr2);
          detach(t25);
          detach(t26);
          detach(t27);
          detach(t28);
          detach(if_block4_anchor);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
        destroy_component(field6, detaching);
        destroy_component(field7, detaching);
        destroy_component(field8, detaching);
        if (if_block0)
          if_block0.d();
        destroy_component(field9, detaching);
        destroy_component(field10, detaching);
        destroy_component(field11, detaching);
        destroy_component(field12, detaching);
        if (if_block1)
          if_block1.d(detaching);
        if (if_block2)
          if_block2.d(detaching);
        if (if_block3)
          if_block3.d(detaching);
        if (if_block4)
          if_block4.d(detaching);
      }
    };
  }
  function create_default_slot_133(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisProposal*/
          ctx[1]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisProposal*/
        2)
          set_data(
            t,
            /*jenisProposal*/
            ctx2[1]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_123(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisKegiatan*/
          ctx[2]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisKegiatan*/
        4)
          set_data(
            t,
            /*jenisKegiatan*/
            ctx2[2]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_112(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisSkema*/
          ctx[3]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisSkema*/
        8)
          set_data(
            t,
            /*jenisSkema*/
            ctx2[3]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_102(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*kelompokKeahlian*/
          ctx[4]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*kelompokKeahlian*/
        16)
          set_data(
            t,
            /*kelompokKeahlian*/
            ctx2[4]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_92(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*topik*/
          ctx[5]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*topik*/
        32)
          set_data(
            t,
            /*topik*/
            ctx2[5]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_82(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*tahunPelaksanaan*/
          ctx[6]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunPelaksanaan*/
        64)
          set_data(
            t,
            /*tahunPelaksanaan*/
            ctx2[6]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_72(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*biayaPenelitian*/
          ctx[7]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*biayaPenelitian*/
        128)
          set_data(
            t,
            /*biayaPenelitian*/
            ctx2[7]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_62(ctx) {
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        button.textContent = "Download RAB";
        attr(button, "class", "button is-link is-rounded button is-small");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*handleDownload*/
            ctx[18]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_52(ctx) {
    let span;
    return {
      c() {
        span = element("span");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_132(ctx) {
    let each_1_anchor;
    let each_value = ensure_array_like(
      /*anggotaTim*/
      ctx[8]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block9(get_each_context9(ctx, each_value, i));
    }
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim*/
        256) {
          each_value = ensure_array_like(
            /*anggotaTim*/
            ctx2[8]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context9(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block9(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block9(ctx) {
    let tr;
    let td0;
    let t1;
    let td1;
    let t2_value = (
      /*member*/
      ctx[44].label + ""
    );
    let t2;
    let t3;
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        td0.textContent = "Anggota";
        t1 = space();
        td1 = element("td");
        t2 = text(t2_value);
        t3 = space();
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(tr, t1);
        append(tr, td1);
        append(td1, t2);
        append(tr, t3);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim*/
        256 && t2_value !== (t2_value = /*member*/
        ctx2[44].label + ""))
          set_data(t2, t2_value);
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
      }
    };
  }
  function create_default_slot_42(ctx) {
    let t_value = (
      /*data*/
      ctx[0].judul + ""
    );
    let t;
    return {
      c() {
        t = text(t_value);
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        1 && t_value !== (t_value = /*data*/
        ctx2[0].judul + ""))
          set_data(t, t_value);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_33(ctx) {
    let html_tag;
    let raw_value = (
      /*data*/
      ctx[0].abstrak + ""
    );
    let html_anchor;
    return {
      c() {
        html_tag = new HtmlTag(false);
        html_anchor = empty();
        html_tag.a = html_anchor;
      },
      m(target, anchor) {
        html_tag.m(raw_value, target, anchor);
        insert(target, html_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        1 && raw_value !== (raw_value = /*data*/
        ctx2[0].abstrak + ""))
          html_tag.p(raw_value);
      },
      d(detaching) {
        if (detaching) {
          detach(html_anchor);
          html_tag.d();
        }
      }
    };
  }
  function create_default_slot_28(ctx) {
    let div;
    let raw_value = (
      /*data*/
      ctx[0].isi + ""
    );
    return {
      c() {
        div = element("div");
        attr(div, "class", "box box-padding svelte-16qu3hd");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        div.innerHTML = raw_value;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        1 && raw_value !== (raw_value = /*data*/
        ctx2[0].isi + ""))
          div.innerHTML = raw_value;
        ;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_default_slot_111(ctx) {
    let textarea;
    let mounted;
    let dispose;
    return {
      c() {
        textarea = element("textarea");
        attr(textarea, "class", "textarea");
      },
      m(target, anchor) {
        insert(target, textarea, anchor);
        set_input_value(
          textarea,
          /*comment*/
          ctx[9]
        );
        if (!mounted) {
          dispose = listen(
            textarea,
            "input",
            /*textarea_input_handler*/
            ctx[24]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*comment*/
        512) {
          set_input_value(
            textarea,
            /*comment*/
            ctx2[9]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(textarea);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_112(ctx) {
    let if_block_anchor;
    let if_block = (
      /*status*/
      ctx[10] === 4 && create_if_block_123(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (
          /*status*/
          ctx2[10] === 4
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_123(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_123(ctx) {
    let div;
    let p0;
    let button0;
    let t1;
    let p1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        p0 = element("p");
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        p1 = element("p");
        button1 = element("button");
        button1.textContent = "Proses";
        attr(button0, "class", "button is-info is-light is-outlined");
        attr(p0, "class", "control");
        attr(button1, "class", "button is-info");
        attr(p1, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, p0);
        append(p0, button0);
        append(div, t1);
        append(div, p1);
        append(p1, button1);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[16]
            ),
            listen(
              button1,
              "click",
              /*handlePass*/
              ctx[17]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_93(ctx) {
    let if_block_anchor;
    let if_block = (
      /*status*/
      ctx[10] === 6 && create_if_block_103(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (
          /*status*/
          ctx2[10] === 6
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_103(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_103(ctx) {
    let div;
    let p0;
    let button0;
    let t1;
    let p1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        p0 = element("p");
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        p1 = element("p");
        button1 = element("button");
        button1.textContent = "Proses";
        attr(button0, "class", "button is-info is-light is-outlined");
        attr(p0, "class", "control");
        attr(button1, "class", "button is-info");
        attr(p1, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, p0);
        append(p0, button0);
        append(div, t1);
        append(div, p1);
        append(p1, button1);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[16]
            ),
            listen(
              button1,
              "click",
              /*handlePass*/
              ctx[17]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_73(ctx) {
    let if_block_anchor;
    let if_block = (
      /*status*/
      ctx[10] === 8 && create_if_block_83(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (
          /*status*/
          ctx2[10] === 8
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_83(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_83(ctx) {
    let div;
    let p;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Proses";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*handlePass*/
            ctx[17]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_53(ctx) {
    let if_block_anchor;
    let if_block = (
      /*status*/
      ctx[10] === 10 && create_if_block_63(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (
          /*status*/
          ctx2[10] === 10
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_63(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_63(ctx) {
    let div;
    let p0;
    let button0;
    let t1;
    let p1;
    let t3;
    let p2;
    let button2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        p0 = element("p");
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        p1 = element("p");
        p1.innerHTML = `<button class="button is-danger is-light is-outlined">Ditolak</button>`;
        t3 = space();
        p2 = element("p");
        button2 = element("button");
        button2.textContent = "Proses";
        attr(button0, "class", "button is-info is-light is-outlined");
        attr(p0, "class", "control");
        attr(p1, "class", "control");
        attr(button2, "class", "button is-info");
        attr(p2, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, p0);
        append(p0, button0);
        append(div, t1);
        append(div, p1);
        append(div, t3);
        append(div, p2);
        append(p2, button2);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[16]
            ),
            listen(
              button2,
              "click",
              /*handlePass*/
              ctx[17]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_34(ctx) {
    let table;
    let thead;
    let t3;
    let tbody;
    let tr1;
    let td0;
    let status_1;
    let t4;
    let td1;
    let current;
    status_1 = new Status_default({ props: { code: (
      /*data*/
      ctx[0].status
    ) } });
    return {
      c() {
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Status PPM</th> <th>Status Pendanaan</th></tr>`;
        t3 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        td0 = element("td");
        create_component(status_1.$$.fragment);
        t4 = space();
        td1 = element("td");
        td1.textContent = "Coming Soon";
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
      },
      m(target, anchor) {
        insert(target, table, anchor);
        append(table, thead);
        append(table, t3);
        append(table, tbody);
        append(tbody, tr1);
        append(tr1, td0);
        mount_component(status_1, td0, null);
        append(tr1, t4);
        append(tr1, td1);
        current = true;
      },
      p(ctx2, dirty) {
        const status_1_changes = {};
        if (dirty[0] & /*data*/
        1)
          status_1_changes.code = /*data*/
          ctx2[0].status;
        status_1.$set(status_1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(status_1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status_1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(table);
        }
        destroy_component(status_1);
      }
    };
  }
  function create_if_block_24(ctx) {
    let h3;
    return {
      c() {
        h3 = element("h3");
        h3.textContent = "Coming Soon";
        attr(h3, "class", "title is-3");
      },
      m(target, anchor) {
        insert(target, h3, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(h3);
        }
      }
    };
  }
  function create_if_block_18(ctx) {
    let h3;
    return {
      c() {
        h3 = element("h3");
        h3.textContent = "Coming Soon";
        attr(h3, "class", "title is-3");
      },
      m(target, anchor) {
        insert(target, h3, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(h3);
        }
      }
    };
  }
  function create_default_slot11(ctx) {
    let h1;
    let t1;
    let div;
    let ul;
    let li0;
    let t3;
    let li1;
    let t5;
    let li2;
    let t7;
    let li3;
    let t9;
    let t10;
    let t11;
    let t12;
    let if_block3_anchor;
    let current;
    let mounted;
    let dispose;
    let if_block0 = (
      /*tab1*/
      ctx[11] === true && create_if_block_44(ctx)
    );
    let if_block1 = (
      /*tab2*/
      ctx[12] === true && create_if_block_34(ctx)
    );
    let if_block2 = (
      /*tab3*/
      ctx[13] === true && create_if_block_24(ctx)
    );
    let if_block3 = (
      /*tab4*/
      ctx[14] === true && create_if_block_18(ctx)
    );
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Detail PPM";
        t1 = space();
        div = element("div");
        ul = element("ul");
        li0 = element("li");
        li0.innerHTML = `<a><span>Identitas PPM</span></a>`;
        t3 = space();
        li1 = element("li");
        li1.innerHTML = `<a><span>Status</span></a>`;
        t5 = space();
        li2 = element("li");
        li2.innerHTML = `<a><span>Logbook / Monev</span></a>`;
        t7 = space();
        li3 = element("li");
        li3.innerHTML = `<a><span>Laporan</span></a>`;
        t9 = space();
        if (if_block0)
          if_block0.c();
        t10 = space();
        if (if_block1)
          if_block1.c();
        t11 = space();
        if (if_block2)
          if_block2.c();
        t12 = space();
        if (if_block3)
          if_block3.c();
        if_block3_anchor = empty();
        attr(h1, "class", "title is-1");
        toggle_class(
          li0,
          "is-active",
          /*tab1*/
          ctx[11]
        );
        toggle_class(
          li1,
          "is-active",
          /*tab2*/
          ctx[12]
        );
        toggle_class(
          li2,
          "is-active",
          /*tab3*/
          ctx[13]
        );
        toggle_class(
          li3,
          "is-active",
          /*tab4*/
          ctx[14]
        );
        attr(div, "class", "tabs is-boxed");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, div, anchor);
        append(div, ul);
        append(ul, li0);
        append(ul, t3);
        append(ul, li1);
        append(ul, t5);
        append(ul, li2);
        append(ul, t7);
        append(ul, li3);
        insert(target, t9, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t10, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t11, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, t12, anchor);
        if (if_block3)
          if_block3.m(target, anchor);
        insert(target, if_block3_anchor, anchor);
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              li0,
              "click",
              /*clicktab1*/
              ctx[19]
            ),
            listen(
              li1,
              "click",
              /*clicktab2*/
              ctx[20]
            ),
            listen(
              li2,
              "click",
              /*clicktab3*/
              ctx[21]
            ),
            listen(
              li3,
              "click",
              /*clicktab4*/
              ctx[22]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*tab1*/
        2048) {
          toggle_class(
            li0,
            "is-active",
            /*tab1*/
            ctx2[11]
          );
        }
        if (!current || dirty[0] & /*tab2*/
        4096) {
          toggle_class(
            li1,
            "is-active",
            /*tab2*/
            ctx2[12]
          );
        }
        if (!current || dirty[0] & /*tab3*/
        8192) {
          toggle_class(
            li2,
            "is-active",
            /*tab3*/
            ctx2[13]
          );
        }
        if (!current || dirty[0] & /*tab4*/
        16384) {
          toggle_class(
            li3,
            "is-active",
            /*tab4*/
            ctx2[14]
          );
        }
        if (
          /*tab1*/
          ctx2[11] === true
        ) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
            if (dirty[0] & /*tab1*/
            2048) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_44(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(t10.parentNode, t10);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        if (
          /*tab2*/
          ctx2[12] === true
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
            if (dirty[0] & /*tab2*/
            4096) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block_34(ctx2);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(t11.parentNode, t11);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });
          check_outros();
        }
        if (
          /*tab3*/
          ctx2[13] === true
        ) {
          if (if_block2) {
          } else {
            if_block2 = create_if_block_24(ctx2);
            if_block2.c();
            if_block2.m(t12.parentNode, t12);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }
        if (
          /*tab4*/
          ctx2[14] === true
        ) {
          if (if_block3) {
          } else {
            if_block3 = create_if_block_18(ctx2);
            if_block3.c();
            if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
          }
        } else if (if_block3) {
          if_block3.d(1);
          if_block3 = null;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block0);
        transition_in(if_block1);
        current = true;
      },
      o(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(div);
          detach(t9);
          detach(t10);
          detach(t11);
          detach(t12);
          detach(if_block3_anchor);
        }
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
        if (if_block2)
          if_block2.d(detaching);
        if (if_block3)
          if_block3.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_fragment33(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*data*/
      ctx[0] && create_if_block11(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*data*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*data*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block11(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function instance25($$self, $$props, $$invalidate) {
    let $apiURL;
    let $route;
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(39, $apiURL = $$value));
    component_subscribe($$self, route, ($$value) => $$invalidate(40, $route = $$value));
    let { params } = $$props;
    const id = params["1"];
    const role = localStorage.getItem("role");
    let data2;
    let ka_departemen;
    let ka_lppm;
    let reviewer;
    let ka_pusat_kajian;
    let showModal = false;
    let jenisProposal, jenisKegiatan, jenisSkema, kelompokKeahlian, topik, tahunPelaksanaan, biayaPenelitian, anggotaTim, rab2, judul, abstrak, isi, comment, status, kdeptSelected2, klppmSelected2, kpkSelected2, reviewerSelected2;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      ka_departemen = await findRole(11);
      ka_lppm = await findRole(12);
      ka_pusat_kajian = await findRole(13);
      reviewer = await findRole(10);
      const response = await fetch($apiURL + "/ppm/" + id, { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, data2 = result);
        $$invalidate(1, jenisProposal = data2.jenis_proposal);
        $$invalidate(2, jenisKegiatan = data2.jenis_kegiatan);
        $$invalidate(3, jenisSkema = data2.jenis_skema);
        $$invalidate(4, kelompokKeahlian = data2.kelompok_keahlian);
        $$invalidate(5, topik = data2.topik);
        $$invalidate(6, tahunPelaksanaan = data2.tahun_pelaksanaan);
        $$invalidate(7, biayaPenelitian = data2.biaya_penelitian);
        $$invalidate(8, anggotaTim = typeof data2.anggota_tim === "string" ? JSON.parse(data2.anggota_tim) : data2.anggota_tim);
        rab2 = data2.rab;
        judul = data2.judul;
        abstrak = data2.abstrak;
        isi = data2.isi;
        $$invalidate(9, comment = data2.comment);
        $$invalidate(10, status = data2.status);
        kdeptSelected2 = data2.uid_kdept;
        klppmSelected2 = data2.uid_klppm;
        kpkSelected2 = data2.uid_kpk;
        reviewerSelected2 = data2.uid_reviewer;
        randomFileName = data2.random_file_name;
      }
    });
    async function handleRevisi() {
      const payload = {
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        id,
        judul,
        abstrak,
        isi,
        comment,
        status: Number(data2.status) - 1,
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2,
        randomFileName
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen/approval");
      } else {
        console.log(response);
      }
    }
    async function handlePass() {
      const payload = {
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        id,
        judul,
        abstrak,
        isi,
        comment: "",
        status: Number(data2.status) + 2,
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2,
        randomFileName
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen/approval");
      } else {
        console.log(response);
      }
    }
    async function searchUser(ev) {
      const response = await fetch($apiURL + "/user");
      const result = await response.json();
      if (response.ok) {
        showModal = true;
      }
    }
    let options;
    async function findRole(role2) {
      const response = await fetch($apiURL + "/role/" + role2);
      const result = await response.json();
      if (response.ok) {
        options = result;
        return options;
      } else {
        console.log(response);
      }
    }
    async function handleDownload3(e) {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      let filename = "rab.xlsx";
      try {
        const response = await fetch(`${$apiURL}/upload/${randomFileName}`, { method: "GET", headers });
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
    let tab1 = true;
    let tab2;
    let tab3;
    let tab4;
    function clicktab1() {
      $$invalidate(11, tab1 = true);
      $$invalidate(12, tab2 = false);
      $$invalidate(13, tab3 = false);
      $$invalidate(14, tab4 = false);
    }
    function clicktab2() {
      $$invalidate(11, tab1 = false);
      $$invalidate(12, tab2 = true);
      $$invalidate(13, tab3 = false);
      $$invalidate(14, tab4 = false);
    }
    function clicktab3() {
      $$invalidate(11, tab1 = false);
      $$invalidate(12, tab2 = false);
      $$invalidate(13, tab3 = true);
      $$invalidate(14, tab4 = false);
    }
    function clicktab4() {
      $$invalidate(11, tab1 = false);
      $$invalidate(12, tab2 = false);
      $$invalidate(13, tab3 = false);
      $$invalidate(14, tab4 = true);
    }
    function textarea_input_handler() {
      comment = this.value;
      $$invalidate(9, comment);
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(23, params = $$props2.params);
    };
    return [
      data2,
      jenisProposal,
      jenisKegiatan,
      jenisSkema,
      kelompokKeahlian,
      topik,
      tahunPelaksanaan,
      biayaPenelitian,
      anggotaTim,
      comment,
      status,
      tab1,
      tab2,
      tab3,
      tab4,
      role,
      handleRevisi,
      handlePass,
      handleDownload3,
      clicktab1,
      clicktab2,
      clicktab3,
      clicktab4,
      params,
      textarea_input_handler
    ];
  }
  var Detailproposal = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance25, create_fragment33, safe_not_equal, { params: 23 }, null, [-1, -1]);
    }
  };
  var detailproposal_default = Detailproposal;

  // src/pages/dosen/home.svelte
  init_define_process();
  function get_each_context10(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[3] = list[i];
    return child_ctx;
  }
  function create_if_block12(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot12] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        65) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_each_block10(ctx) {
    let tr;
    let td0;
    let p0;
    let t0_value = (
      /*item*/
      ctx[3].judul + ""
    );
    let t0;
    let t1;
    let td1;
    let p1;
    let t2_value = (
      /*item*/
      ctx[3].jenis_kegiatan + ""
    );
    let t2;
    let t3;
    let td2;
    let p2;
    let t4_value = (
      /*item*/
      ctx[3].jenis_skema + ""
    );
    let t4;
    let t5;
    let td3;
    let status;
    let td3_pid_value;
    let t6;
    let td4;
    let button;
    let span;
    let icon;
    let button_pid_value;
    let t7;
    let current;
    let mounted;
    let dispose;
    status = new Status_default({ props: { code: (
      /*item*/
      ctx[3].status
    ) } });
    icon = new Icon_default({ props: { id: "info", src: infoOutline } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        p0 = element("p");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        p1 = element("p");
        t2 = text(t2_value);
        t3 = space();
        td2 = element("td");
        p2 = element("p");
        t4 = text(t4_value);
        t5 = space();
        td3 = element("td");
        create_component(status.$$.fragment);
        t6 = space();
        td4 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t7 = space();
        attr(p0, "class", "svelte-4z2166");
        attr(p1, "class", "svelte-4z2166");
        attr(p2, "class", "svelte-4z2166");
        attr(td3, "class", "status svelte-4z2166");
        attr(td3, "pid", td3_pid_value = /*item*/
        ctx[3].id);
        attr(span, "class", "icon");
        attr(button, "class", "button is-info is-rounded is-small");
        attr(button, "pid", button_pid_value = /*item*/
        ctx[3].id);
        attr(td4, "class", "review svelte-4z2166");
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, p0);
        append(p0, t0);
        append(tr, t1);
        append(tr, td1);
        append(td1, p1);
        append(p1, t2);
        append(tr, t3);
        append(tr, td2);
        append(td2, p2);
        append(p2, t4);
        append(tr, t5);
        append(tr, td3);
        mount_component(status, td3, null);
        append(tr, t6);
        append(tr, td4);
        append(td4, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t7);
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", detail);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if ((!current || dirty & /*items*/
        1) && t0_value !== (t0_value = /*item*/
        ctx2[3].judul + ""))
          set_data(t0, t0_value);
        if ((!current || dirty & /*items*/
        1) && t2_value !== (t2_value = /*item*/
        ctx2[3].jenis_kegiatan + ""))
          set_data(t2, t2_value);
        if ((!current || dirty & /*items*/
        1) && t4_value !== (t4_value = /*item*/
        ctx2[3].jenis_skema + ""))
          set_data(t4, t4_value);
        const status_changes = {};
        if (dirty & /*items*/
        1)
          status_changes.code = /*item*/
          ctx2[3].status;
        status.$set(status_changes);
        if (!current || dirty & /*items*/
        1 && td3_pid_value !== (td3_pid_value = /*item*/
        ctx2[3].id)) {
          attr(td3, "pid", td3_pid_value);
        }
        if (!current || dirty & /*items*/
        1 && button_pid_value !== (button_pid_value = /*item*/
        ctx2[3].id)) {
          attr(button, "pid", button_pid_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(status.$$.fragment, local);
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status.$$.fragment, local);
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(status);
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot12(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let button;
    let span0;
    let icon;
    let t3;
    let span1;
    let t5;
    let table;
    let thead;
    let t15;
    let tbody;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "orang", src: accountAdd } });
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block10(get_each_context10(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "PPM Management";
        t1 = space();
        hr = element("hr");
        t2 = space();
        button = element("button");
        span0 = element("span");
        create_component(icon.$$.fragment);
        t3 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Buat Proposal</a>`;
        t5 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Judul</th> <th class="is-narrow">Jenis Kegiatan</th> <th class="is-narrow">Jenis Skema</th> <th>Status</th> <th colspan="2">Action</th></tr>`;
        t15 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(h1, "class", "title is-1");
        attr(span0, "class", "icon");
        attr(button, "class", "button is-info");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, button, anchor);
        append(button, span0);
        mount_component(icon, span0, null);
        append(button, t3);
        append(button, span1);
        insert(target, t5, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t15);
        append(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", addProposal2);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*items, detail*/
        1) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context10(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block10(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(button);
          detach(t5);
          detach(table);
        }
        destroy_component(icon);
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment34(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block12(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block12(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function detail(ev) {
    let propId = ev.target.getAttribute("pid");
    location.href = "/dosen/proposals/" + propId;
  }
  function addProposal2() {
    location.href = "/dosen/proposal";
  }
  function instance26($$self, $$props, $$invalidate) {
    let $apiURL;
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(1, $apiURL = $$value));
    const id = localStorage.id;
    let items;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch($apiURL + "/ppm/all/" + id, { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = result.dbData);
      } else {
        console.log(response);
      }
    });
    return [items];
  }
  var Home2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance26, create_fragment34, safe_not_equal, {});
    }
  };
  var home_default2 = Home2;

  // src/pages/dosen/profile.svelte
  init_define_process();
  function get_each_context11(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[175] = list[i];
    return child_ctx;
  }
  function get_each_context_12(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[178] = list[i];
    return child_ctx;
  }
  function get_each_context_2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[181] = list[i];
    return child_ctx;
  }
  function get_each_context_3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[184] = list[i];
    return child_ctx;
  }
  function get_each_context_4(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[187] = list[i];
    return child_ctx;
  }
  function get_each_context_5(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[190] = list[i];
    return child_ctx;
  }
  function get_each_context_6(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[193] = list[i];
    return child_ctx;
  }
  function create_if_block_84(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let field5;
    let t5;
    let field6;
    let t6;
    let field7;
    let t7;
    let field8;
    let t8;
    let field9;
    let t9;
    let field10;
    let t10;
    let field11;
    let t11;
    let br;
    let t12;
    let table;
    let thead;
    let t15;
    let tbody;
    let t16;
    let hr;
    let t17;
    let div;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    field0 = new Field_default({
      props: {
        name: "Nama Lengkap",
        $$slots: { default: [create_default_slot_46] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Jabatan Fungsional",
        $$slots: { default: [create_default_slot_45] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "NIP",
        $$slots: { default: [create_default_slot_44] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "NIDN",
        $$slots: { default: [create_default_slot_43] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Tempat Lahir",
        $$slots: { default: [create_default_slot_422] },
        $$scope: { ctx }
      }
    });
    field5 = new Field_default({
      props: {
        name: "Alamat Rumah",
        $$slots: { default: [create_default_slot_41] },
        $$scope: { ctx }
      }
    });
    field6 = new Field_default({
      props: {
        name: "Telp/Fax Rumah",
        $$slots: { default: [create_default_slot_40] },
        $$scope: { ctx }
      }
    });
    field7 = new Field_default({
      props: {
        name: "Nomor Handphone",
        $$slots: { default: [create_default_slot_39] },
        $$scope: { ctx }
      }
    });
    field8 = new Field_default({
      props: {
        name: "Alamat Kantor",
        $$slots: { default: [create_default_slot_38] },
        $$scope: { ctx }
      }
    });
    field9 = new Field_default({
      props: {
        name: "Telp/Fax Kantor",
        $$slots: { default: [create_default_slot_37] },
        $$scope: { ctx }
      }
    });
    field10 = new Field_default({
      props: {
        class: "input",
        name: "Email",
        $$slots: { default: [create_default_slot_36] },
        $$scope: { ctx }
      }
    });
    field11 = new Field_default({
      props: {
        name: "Mata Kuliah",
        $$slots: { default: [create_default_slot_35] },
        $$scope: { ctx }
      }
    });
    let if_block = (
      /*mataKuliah*/
      ctx[46].length > 0 && create_if_block_94(ctx)
    );
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        create_component(field5.$$.fragment);
        t5 = space();
        create_component(field6.$$.fragment);
        t6 = space();
        create_component(field7.$$.fragment);
        t7 = space();
        create_component(field8.$$.fragment);
        t8 = space();
        create_component(field9.$$.fragment);
        t9 = space();
        create_component(field10.$$.fragment);
        t10 = space();
        create_component(field11.$$.fragment);
        t11 = space();
        br = element("br");
        t12 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow"></th> <th>Mata Kuliah</th></tr>`;
        t15 = space();
        tbody = element("tbody");
        if (if_block)
          if_block.c();
        t16 = space();
        hr = element("hr");
        t17 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        mount_component(field5, target, anchor);
        insert(target, t5, anchor);
        mount_component(field6, target, anchor);
        insert(target, t6, anchor);
        mount_component(field7, target, anchor);
        insert(target, t7, anchor);
        mount_component(field8, target, anchor);
        insert(target, t8, anchor);
        mount_component(field9, target, anchor);
        insert(target, t9, anchor);
        mount_component(field10, target, anchor);
        insert(target, t10, anchor);
        mount_component(field11, target, anchor);
        insert(target, t11, anchor);
        insert(target, br, anchor);
        insert(target, t12, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t15);
        append(table, tbody);
        if (if_block)
          if_block.m(tbody, null);
        insert(target, t16, anchor);
        insert(target, hr, anchor);
        insert(target, t17, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*simpanIdentitas*/
            ctx[84]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[1] & /*namaLengkap*/
        16 | dirty[6] & /*$$scope*/
        1024) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[1] & /*jabatanFungsional*/
        32 | dirty[6] & /*$$scope*/
        1024) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[1] & /*nip*/
        64 | dirty[6] & /*$$scope*/
        1024) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[1] & /*nidn*/
        128 | dirty[6] & /*$$scope*/
        1024) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[1] & /*tempatLahir*/
        256 | dirty[6] & /*$$scope*/
        1024) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (dirty[1] & /*alamatRumah*/
        512 | dirty[6] & /*$$scope*/
        1024) {
          field5_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field5.$set(field5_changes);
        const field6_changes = {};
        if (dirty[1] & /*telpFaxRumah*/
        1024 | dirty[6] & /*$$scope*/
        1024) {
          field6_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field6.$set(field6_changes);
        const field7_changes = {};
        if (dirty[1] & /*nomorHandphone*/
        2048 | dirty[6] & /*$$scope*/
        1024) {
          field7_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field7.$set(field7_changes);
        const field8_changes = {};
        if (dirty[1] & /*alamatKantor*/
        4096 | dirty[6] & /*$$scope*/
        1024) {
          field8_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field8.$set(field8_changes);
        const field9_changes = {};
        if (dirty[1] & /*telpFaxKantor*/
        8192 | dirty[6] & /*$$scope*/
        1024) {
          field9_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field9.$set(field9_changes);
        const field10_changes = {};
        if (dirty[1] & /*email*/
        16384 | dirty[6] & /*$$scope*/
        1024) {
          field10_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field10.$set(field10_changes);
        const field11_changes = {};
        if (dirty[0] & /*vmataKuliah*/
        64 | dirty[6] & /*$$scope*/
        1024) {
          field11_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field11.$set(field11_changes);
        if (
          /*mataKuliah*/
          ctx2[46].length > 0
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[1] & /*mataKuliah*/
            32768) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_94(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(tbody, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        transition_in(field6.$$.fragment, local);
        transition_in(field7.$$.fragment, local);
        transition_in(field8.$$.fragment, local);
        transition_in(field9.$$.fragment, local);
        transition_in(field10.$$.fragment, local);
        transition_in(field11.$$.fragment, local);
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        transition_out(field6.$$.fragment, local);
        transition_out(field7.$$.fragment, local);
        transition_out(field8.$$.fragment, local);
        transition_out(field9.$$.fragment, local);
        transition_out(field10.$$.fragment, local);
        transition_out(field11.$$.fragment, local);
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(t9);
          detach(t10);
          detach(t11);
          detach(br);
          detach(t12);
          detach(table);
          detach(t16);
          detach(hr);
          detach(t17);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
        destroy_component(field6, detaching);
        destroy_component(field7, detaching);
        destroy_component(field8, detaching);
        destroy_component(field9, detaching);
        destroy_component(field10, detaching);
        destroy_component(field11, detaching);
        if (if_block)
          if_block.d();
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_46(ctx) {
    let input;
    let t0;
    let p;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        t0 = space();
        p = element("p");
        p.textContent = "Masukkan nama lengkap dengan gelar";
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(p, "class", "help is-info");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*namaLengkap*/
          ctx[35]
        );
        insert(target, t0, anchor);
        insert(target, p, anchor);
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[96]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*namaLengkap*/
        16 && input.value !== /*namaLengkap*/
        ctx2[35]) {
          set_input_value(
            input,
            /*namaLengkap*/
            ctx2[35]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
          detach(t0);
          detach(p);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_45(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*jabatanFungsional*/
          ctx[36]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_1*/
            ctx[97]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*jabatanFungsional*/
        32 && input.value !== /*jabatanFungsional*/
        ctx2[36]) {
          set_input_value(
            input,
            /*jabatanFungsional*/
            ctx2[36]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_44(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*nip*/
          ctx[37]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_2*/
            ctx[98]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*nip*/
        64 && to_number(input.value) !== /*nip*/
        ctx2[37]) {
          set_input_value(
            input,
            /*nip*/
            ctx2[37]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_43(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*nidn*/
          ctx[38]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_3*/
            ctx[99]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*nidn*/
        128 && to_number(input.value) !== /*nidn*/
        ctx2[38]) {
          set_input_value(
            input,
            /*nidn*/
            ctx2[38]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_422(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*tempatLahir*/
          ctx[39]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_4*/
            ctx[100]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*tempatLahir*/
        256 && input.value !== /*tempatLahir*/
        ctx2[39]) {
          set_input_value(
            input,
            /*tempatLahir*/
            ctx2[39]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_41(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*alamatRumah*/
          ctx[40]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_5*/
            ctx[101]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*alamatRumah*/
        512 && input.value !== /*alamatRumah*/
        ctx2[40]) {
          set_input_value(
            input,
            /*alamatRumah*/
            ctx2[40]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_40(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*telpFaxRumah*/
          ctx[41]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_6*/
            ctx[102]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*telpFaxRumah*/
        1024 && to_number(input.value) !== /*telpFaxRumah*/
        ctx2[41]) {
          set_input_value(
            input,
            /*telpFaxRumah*/
            ctx2[41]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_39(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*nomorHandphone*/
          ctx[42]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_7*/
            ctx[103]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*nomorHandphone*/
        2048 && to_number(input.value) !== /*nomorHandphone*/
        ctx2[42]) {
          set_input_value(
            input,
            /*nomorHandphone*/
            ctx2[42]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_38(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*alamatKantor*/
          ctx[43]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_8*/
            ctx[104]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*alamatKantor*/
        4096 && input.value !== /*alamatKantor*/
        ctx2[43]) {
          set_input_value(
            input,
            /*alamatKantor*/
            ctx2[43]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_37(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*telpFaxKantor*/
          ctx[44]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_9*/
            ctx[105]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*telpFaxKantor*/
        8192 && to_number(input.value) !== /*telpFaxKantor*/
        ctx2[44]) {
          set_input_value(
            input,
            /*telpFaxKantor*/
            ctx2[44]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_36(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*email*/
          ctx[45]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_10*/
            ctx[106]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*email*/
        16384 && input.value !== /*email*/
        ctx2[45]) {
          set_input_value(
            input,
            /*email*/
            ctx2[45]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_35(ctx) {
    let div;
    let p0;
    let input;
    let t0;
    let p1;
    let button;
    let span0;
    let icon;
    let t1;
    let span1;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "orang", src: add } });
    return {
      c() {
        div = element("div");
        p0 = element("p");
        input = element("input");
        t0 = space();
        p1 = element("p");
        button = element("button");
        span0 = element("span");
        create_component(icon.$$.fragment);
        t1 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Tambah</a>`;
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Tambahkan mata kuliah yang diampu");
        attr(p0, "class", "control is-expanded");
        attr(span0, "class", "icon");
        attr(button, "class", "button is-info");
        attr(p1, "class", "control");
        attr(div, "class", "field is-grouped");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, p0);
        append(p0, input);
        set_input_value(
          input,
          /*vmataKuliah*/
          ctx[6]
        );
        append(div, t0);
        append(div, p1);
        append(p1, button);
        append(button, span0);
        mount_component(icon, span0, null);
        append(button, t1);
        append(button, span1);
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler_11*/
              ctx[107]
            ),
            listen(
              button,
              "click",
              /*addMatkul*/
              ctx[88]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*vmataKuliah*/
        64 && input.value !== /*vmataKuliah*/
        ctx2[6]) {
          set_input_value(
            input,
            /*vmataKuliah*/
            ctx2[6]
          );
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(icon);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_94(ctx) {
    let each_1_anchor;
    let current;
    let each_value_6 = ensure_array_like(
      /*mataKuliah*/
      ctx[46]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_6.length; i += 1) {
      each_blocks[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*mataKuliah*/
        32768 | dirty[3] & /*deleteMatkul*/
        4) {
          each_value_6 = ensure_array_like(
            /*mataKuliah*/
            ctx2[46]
          );
          let i;
          for (i = 0; i < each_value_6.length; i += 1) {
            const child_ctx = get_each_context_6(ctx2, each_value_6, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_6(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value_6.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_6.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_6(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_data_value_value;
    let t0;
    let td1;
    let t1_value = (
      /*matkul*/
      ctx[193].label + ""
    );
    let t1;
    let t2;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        t1 = text(t1_value);
        t2 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "data-value", button_data_value_value = /*matkul*/
        ctx[193].label);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(td1, t1);
        append(tr, t2);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*deleteMatkul*/
            ctx[95]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[1] & /*mataKuliah*/
        32768 && button_data_value_value !== (button_data_value_value = /*matkul*/
        ctx2[193].label)) {
          attr(button, "data-value", button_data_value_value);
        }
        if ((!current || dirty[1] & /*mataKuliah*/
        32768) && t1_value !== (t1_value = /*matkul*/
        ctx2[193].label + ""))
          set_data(t1, t1_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_74(ctx) {
    let table;
    let thead;
    let t7;
    let tbody;
    let tr1;
    let th4;
    let t9;
    let td0;
    let input0;
    let t10;
    let td1;
    let input1;
    let t11;
    let td2;
    let input2;
    let t12;
    let tr2;
    let th5;
    let t14;
    let td3;
    let input3;
    let t15;
    let td4;
    let input4;
    let t16;
    let td5;
    let input5;
    let t17;
    let tr3;
    let th6;
    let t19;
    let td6;
    let input6;
    let t20;
    let td7;
    let input7;
    let t21;
    let td8;
    let input8;
    let t22;
    let tr4;
    let th7;
    let t24;
    let td9;
    let input9;
    let t25;
    let td10;
    let input10;
    let t26;
    let td11;
    let input11;
    let t27;
    let tr5;
    let th8;
    let t29;
    let td12;
    let textarea0;
    let t30;
    let td13;
    let textarea1;
    let t31;
    let td14;
    let textarea2;
    let t32;
    let div;
    let p;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow">Program</th> <th>S1</th> <th>S2</th> <th>S3</th></tr>`;
        t7 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        th4 = element("th");
        th4.textContent = "Nama Perguruan Tinggi";
        t9 = space();
        td0 = element("td");
        input0 = element("input");
        t10 = space();
        td1 = element("td");
        input1 = element("input");
        t11 = space();
        td2 = element("td");
        input2 = element("input");
        t12 = space();
        tr2 = element("tr");
        th5 = element("th");
        th5.textContent = "Bidang Ilmu";
        t14 = space();
        td3 = element("td");
        input3 = element("input");
        t15 = space();
        td4 = element("td");
        input4 = element("input");
        t16 = space();
        td5 = element("td");
        input5 = element("input");
        t17 = space();
        tr3 = element("tr");
        th6 = element("th");
        th6.textContent = "Tahun Masuk";
        t19 = space();
        td6 = element("td");
        input6 = element("input");
        t20 = space();
        td7 = element("td");
        input7 = element("input");
        t21 = space();
        td8 = element("td");
        input8 = element("input");
        t22 = space();
        tr4 = element("tr");
        th7 = element("th");
        th7.textContent = "Tahun Lulus";
        t24 = space();
        td9 = element("td");
        input9 = element("input");
        t25 = space();
        td10 = element("td");
        input10 = element("input");
        t26 = space();
        td11 = element("td");
        input11 = element("input");
        t27 = space();
        tr5 = element("tr");
        th8 = element("th");
        th8.textContent = "Judul Skripsi/Tesis/Disertasi";
        t29 = space();
        td12 = element("td");
        textarea0 = element("textarea");
        t30 = space();
        td13 = element("td");
        textarea1 = element("textarea");
        t31 = space();
        td14 = element("td");
        textarea2 = element("textarea");
        t32 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        attr(input0, "class", "input");
        attr(input0, "type", "text");
        attr(input1, "class", "input");
        attr(input1, "type", "text");
        attr(input2, "class", "input");
        attr(input2, "type", "text");
        attr(input3, "class", "input");
        attr(input3, "type", "text");
        attr(input4, "class", "input");
        attr(input4, "type", "text");
        attr(input5, "class", "input");
        attr(input5, "type", "text");
        attr(input6, "class", "input");
        attr(input6, "type", "number");
        attr(input7, "class", "input");
        attr(input7, "type", "number");
        attr(input8, "class", "input");
        attr(input8, "type", "number");
        attr(input9, "class", "input");
        attr(input9, "type", "number");
        attr(input10, "class", "input");
        attr(input10, "type", "number");
        attr(input11, "class", "input");
        attr(input11, "type", "number");
        attr(textarea0, "class", "textarea");
        attr(textarea1, "class", "textarea");
        attr(textarea2, "class", "textarea");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        insert(target, table, anchor);
        append(table, thead);
        append(table, t7);
        append(table, tbody);
        append(tbody, tr1);
        append(tr1, th4);
        append(tr1, t9);
        append(tr1, td0);
        append(td0, input0);
        set_input_value(
          input0,
          /*pertiS1*/
          ctx[47]
        );
        append(tr1, t10);
        append(tr1, td1);
        append(td1, input1);
        set_input_value(
          input1,
          /*pertiS2*/
          ctx[48]
        );
        append(tr1, t11);
        append(tr1, td2);
        append(td2, input2);
        set_input_value(
          input2,
          /*pertiS3*/
          ctx[49]
        );
        append(tbody, t12);
        append(tbody, tr2);
        append(tr2, th5);
        append(tr2, t14);
        append(tr2, td3);
        append(td3, input3);
        set_input_value(
          input3,
          /*bidangIlmuS1*/
          ctx[50]
        );
        append(tr2, t15);
        append(tr2, td4);
        append(td4, input4);
        set_input_value(
          input4,
          /*bidangIlmuS2*/
          ctx[51]
        );
        append(tr2, t16);
        append(tr2, td5);
        append(td5, input5);
        set_input_value(
          input5,
          /*bidangIlmuS3*/
          ctx[52]
        );
        append(tbody, t17);
        append(tbody, tr3);
        append(tr3, th6);
        append(tr3, t19);
        append(tr3, td6);
        append(td6, input6);
        set_input_value(
          input6,
          /*tahunMasukS1*/
          ctx[53]
        );
        append(tr3, t20);
        append(tr3, td7);
        append(td7, input7);
        set_input_value(
          input7,
          /*tahunMasukS2*/
          ctx[54]
        );
        append(tr3, t21);
        append(tr3, td8);
        append(td8, input8);
        set_input_value(
          input8,
          /*tahunMasukS3*/
          ctx[55]
        );
        append(tbody, t22);
        append(tbody, tr4);
        append(tr4, th7);
        append(tr4, t24);
        append(tr4, td9);
        append(td9, input9);
        set_input_value(
          input9,
          /*tahunLulusS1*/
          ctx[56]
        );
        append(tr4, t25);
        append(tr4, td10);
        append(td10, input10);
        set_input_value(
          input10,
          /*tahunLulusS2*/
          ctx[57]
        );
        append(tr4, t26);
        append(tr4, td11);
        append(td11, input11);
        set_input_value(
          input11,
          /*tahunLulusS3*/
          ctx[58]
        );
        append(tbody, t27);
        append(tbody, tr5);
        append(tr5, th8);
        append(tr5, t29);
        append(tr5, td12);
        append(td12, textarea0);
        set_input_value(
          textarea0,
          /*judulTugasAkhirS1*/
          ctx[59]
        );
        append(tr5, t30);
        append(tr5, td13);
        append(td13, textarea1);
        set_input_value(
          textarea1,
          /*judulTugasAkhirS2*/
          ctx[60]
        );
        append(tr5, t31);
        append(tr5, td14);
        append(td14, textarea2);
        set_input_value(
          textarea2,
          /*judulTugasAkhirS3*/
          ctx[61]
        );
        insert(target, t32, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        if (!mounted) {
          dispose = [
            listen(
              input0,
              "input",
              /*input0_input_handler*/
              ctx[108]
            ),
            listen(
              input1,
              "input",
              /*input1_input_handler*/
              ctx[109]
            ),
            listen(
              input2,
              "input",
              /*input2_input_handler*/
              ctx[110]
            ),
            listen(
              input3,
              "input",
              /*input3_input_handler*/
              ctx[111]
            ),
            listen(
              input4,
              "input",
              /*input4_input_handler*/
              ctx[112]
            ),
            listen(
              input5,
              "input",
              /*input5_input_handler*/
              ctx[113]
            ),
            listen(
              input6,
              "input",
              /*input6_input_handler*/
              ctx[114]
            ),
            listen(
              input7,
              "input",
              /*input7_input_handler*/
              ctx[115]
            ),
            listen(
              input8,
              "input",
              /*input8_input_handler*/
              ctx[116]
            ),
            listen(
              input9,
              "input",
              /*input9_input_handler*/
              ctx[117]
            ),
            listen(
              input10,
              "input",
              /*input10_input_handler*/
              ctx[118]
            ),
            listen(
              input11,
              "input",
              /*input11_input_handler*/
              ctx[119]
            ),
            listen(
              textarea0,
              "input",
              /*textarea0_input_handler*/
              ctx[120]
            ),
            listen(
              textarea1,
              "input",
              /*textarea1_input_handler*/
              ctx[121]
            ),
            listen(
              textarea2,
              "input",
              /*textarea2_input_handler*/
              ctx[122]
            ),
            listen(
              button,
              "click",
              /*simpanRiwayatPendidikan*/
              ctx[83]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*pertiS1*/
        65536 && input0.value !== /*pertiS1*/
        ctx2[47]) {
          set_input_value(
            input0,
            /*pertiS1*/
            ctx2[47]
          );
        }
        if (dirty[1] & /*pertiS2*/
        131072 && input1.value !== /*pertiS2*/
        ctx2[48]) {
          set_input_value(
            input1,
            /*pertiS2*/
            ctx2[48]
          );
        }
        if (dirty[1] & /*pertiS3*/
        262144 && input2.value !== /*pertiS3*/
        ctx2[49]) {
          set_input_value(
            input2,
            /*pertiS3*/
            ctx2[49]
          );
        }
        if (dirty[1] & /*bidangIlmuS1*/
        524288 && input3.value !== /*bidangIlmuS1*/
        ctx2[50]) {
          set_input_value(
            input3,
            /*bidangIlmuS1*/
            ctx2[50]
          );
        }
        if (dirty[1] & /*bidangIlmuS2*/
        1048576 && input4.value !== /*bidangIlmuS2*/
        ctx2[51]) {
          set_input_value(
            input4,
            /*bidangIlmuS2*/
            ctx2[51]
          );
        }
        if (dirty[1] & /*bidangIlmuS3*/
        2097152 && input5.value !== /*bidangIlmuS3*/
        ctx2[52]) {
          set_input_value(
            input5,
            /*bidangIlmuS3*/
            ctx2[52]
          );
        }
        if (dirty[1] & /*tahunMasukS1*/
        4194304 && to_number(input6.value) !== /*tahunMasukS1*/
        ctx2[53]) {
          set_input_value(
            input6,
            /*tahunMasukS1*/
            ctx2[53]
          );
        }
        if (dirty[1] & /*tahunMasukS2*/
        8388608 && to_number(input7.value) !== /*tahunMasukS2*/
        ctx2[54]) {
          set_input_value(
            input7,
            /*tahunMasukS2*/
            ctx2[54]
          );
        }
        if (dirty[1] & /*tahunMasukS3*/
        16777216 && to_number(input8.value) !== /*tahunMasukS3*/
        ctx2[55]) {
          set_input_value(
            input8,
            /*tahunMasukS3*/
            ctx2[55]
          );
        }
        if (dirty[1] & /*tahunLulusS1*/
        33554432 && to_number(input9.value) !== /*tahunLulusS1*/
        ctx2[56]) {
          set_input_value(
            input9,
            /*tahunLulusS1*/
            ctx2[56]
          );
        }
        if (dirty[1] & /*tahunLulusS2*/
        67108864 && to_number(input10.value) !== /*tahunLulusS2*/
        ctx2[57]) {
          set_input_value(
            input10,
            /*tahunLulusS2*/
            ctx2[57]
          );
        }
        if (dirty[1] & /*tahunLulusS3*/
        134217728 && to_number(input11.value) !== /*tahunLulusS3*/
        ctx2[58]) {
          set_input_value(
            input11,
            /*tahunLulusS3*/
            ctx2[58]
          );
        }
        if (dirty[1] & /*judulTugasAkhirS1*/
        268435456) {
          set_input_value(
            textarea0,
            /*judulTugasAkhirS1*/
            ctx2[59]
          );
        }
        if (dirty[1] & /*judulTugasAkhirS2*/
        536870912) {
          set_input_value(
            textarea1,
            /*judulTugasAkhirS2*/
            ctx2[60]
          );
        }
        if (dirty[1] & /*judulTugasAkhirS3*/
        1073741824) {
          set_input_value(
            textarea2,
            /*judulTugasAkhirS3*/
            ctx2[61]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(table);
          detach(t32);
          detach(div);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block13(ctx) {
    let nav0;
    let div1;
    let t1;
    let div3;
    let div2;
    let button0;
    let span0;
    let icon0;
    let t2;
    let span1;
    let t4;
    let modal0;
    let updating_show;
    let t5;
    let table0;
    let thead0;
    let t16;
    let tbody0;
    let t17;
    let br0;
    let t18;
    let br1;
    let t19;
    let nav1;
    let div5;
    let t21;
    let div7;
    let div6;
    let button1;
    let span2;
    let icon1;
    let t22;
    let span3;
    let t24;
    let modal1;
    let updating_show_1;
    let t25;
    let table1;
    let thead1;
    let t36;
    let tbody1;
    let t37;
    let br2;
    let t38;
    let br3;
    let t39;
    let nav2;
    let div9;
    let t41;
    let div11;
    let div10;
    let button2;
    let span4;
    let icon2;
    let t42;
    let span5;
    let t44;
    let modal2;
    let updating_show_2;
    let t45;
    let table2;
    let thead2;
    let t54;
    let tbody2;
    let t55;
    let br4;
    let t56;
    let nav3;
    let div13;
    let t58;
    let div15;
    let div14;
    let button3;
    let span6;
    let icon3;
    let t59;
    let span7;
    let t61;
    let modal3;
    let updating_show_3;
    let t62;
    let table3;
    let thead3;
    let t71;
    let tbody3;
    let t72;
    let br5;
    let t73;
    let nav4;
    let div17;
    let t75;
    let div19;
    let div18;
    let button4;
    let span8;
    let icon4;
    let t76;
    let span9;
    let t78;
    let modal4;
    let updating_show_4;
    let t79;
    let table4;
    let thead4;
    let t90;
    let tbody4;
    let t91;
    let br6;
    let t92;
    let nav5;
    let div21;
    let t94;
    let div23;
    let div22;
    let button5;
    let span10;
    let icon5;
    let t95;
    let span11;
    let t97;
    let modal5;
    let updating_show_5;
    let t98;
    let table5;
    let thead5;
    let t109;
    let tbody5;
    let t110;
    let br7;
    let current;
    let mounted;
    let dispose;
    icon0 = new Icon_default({ props: { id: "orang", src: add } });
    function modal0_show_binding(value) {
      ctx[129](value);
    }
    let modal0_props = {
      $$slots: {
        header: [create_header_slot_5],
        default: [create_default_slot_29]
      },
      $$scope: { ctx }
    };
    if (
      /*showModalPenelitian*/
      ctx[62] !== void 0
    ) {
      modal0_props.show = /*showModalPenelitian*/
      ctx[62];
    }
    modal0 = new Modal_default({ props: modal0_props });
    binding_callbacks.push(() => bind(modal0, "show", modal0_show_binding));
    let if_block0 = (
      /*dataPP*/
      ctx[0] && create_if_block_64(ctx)
    );
    icon1 = new Icon_default({ props: { id: "orang", src: add } });
    function modal1_show_binding(value) {
      ctx[136](value);
    }
    let modal1_props = {
      $$slots: {
        header: [create_header_slot_4],
        default: [create_default_slot_233]
      },
      $$scope: { ctx }
    };
    if (
      /*showModalPengmas*/
      ctx[63] !== void 0
    ) {
      modal1_props.show = /*showModalPengmas*/
      ctx[63];
    }
    modal1 = new Modal_default({ props: modal1_props });
    binding_callbacks.push(() => bind(modal1, "show", modal1_show_binding));
    let if_block1 = (
      /*dataPM*/
      ctx[1] && create_if_block_54(ctx)
    );
    icon2 = new Icon_default({ props: { id: "orang", src: add } });
    function modal2_show_binding(value) {
      ctx[141](value);
    }
    let modal2_props = {
      $$slots: {
        header: [create_header_slot_3],
        default: [create_default_slot_182]
      },
      $$scope: { ctx }
    };
    if (
      /*showModalDiseminasi*/
      ctx[64] !== void 0
    ) {
      modal2_props.show = /*showModalDiseminasi*/
      ctx[64];
    }
    modal2 = new Modal_default({ props: modal2_props });
    binding_callbacks.push(() => bind(modal2, "show", modal2_show_binding));
    let if_block2 = (
      /*dataPD*/
      ctx[2] && create_if_block_45(ctx)
    );
    icon3 = new Icon_default({ props: { id: "orang", src: add } });
    function modal3_show_binding(value) {
      ctx[146](value);
    }
    let modal3_props = {
      $$slots: {
        header: [create_header_slot_2],
        default: [create_default_slot_134]
      },
      $$scope: { ctx }
    };
    if (
      /*showModalPublikasi*/
      ctx[65] !== void 0
    ) {
      modal3_props.show = /*showModalPublikasi*/
      ctx[65];
    }
    modal3 = new Modal_default({ props: modal3_props });
    binding_callbacks.push(() => bind(modal3, "show", modal3_show_binding));
    let if_block3 = (
      /*dataPPub*/
      ctx[3] && create_if_block_35(ctx)
    );
    icon4 = new Icon_default({ props: { id: "orang", src: add } });
    function modal4_show_binding(value) {
      ctx[152](value);
    }
    let modal4_props = {
      $$slots: {
        header: [create_header_slot_1],
        default: [create_default_slot_73]
      },
      $$scope: { ctx }
    };
    if (
      /*showModalPenulisanBuku*/
      ctx[66] !== void 0
    ) {
      modal4_props.show = /*showModalPenulisanBuku*/
      ctx[66];
    }
    modal4 = new Modal_default({ props: modal4_props });
    binding_callbacks.push(() => bind(modal4, "show", modal4_show_binding));
    let if_block4 = (
      /*dataPPB*/
      ctx[4] && create_if_block_25(ctx)
    );
    icon5 = new Icon_default({ props: { id: "orang", src: add } });
    function modal5_show_binding(value) {
      ctx[158](value);
    }
    let modal5_props = {
      $$slots: {
        header: [create_header_slot2],
        default: [create_default_slot_114]
      },
      $$scope: { ctx }
    };
    if (
      /*showModalHKI*/
      ctx[67] !== void 0
    ) {
      modal5_props.show = /*showModalHKI*/
      ctx[67];
    }
    modal5 = new Modal_default({ props: modal5_props });
    binding_callbacks.push(() => bind(modal5, "show", modal5_show_binding));
    let if_block5 = (
      /*dataPHKI*/
      ctx[5] && create_if_block_19(ctx)
    );
    return {
      c() {
        nav0 = element("nav");
        div1 = element("div");
        div1.innerHTML = `<div class="level-item"><h6 class="title is-6">Pengalaman Penelitian</h6></div>`;
        t1 = space();
        div3 = element("div");
        div2 = element("div");
        button0 = element("button");
        span0 = element("span");
        create_component(icon0.$$.fragment);
        t2 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Tambah</a>`;
        t4 = space();
        create_component(modal0.$$.fragment);
        t5 = space();
        table0 = element("table");
        thead0 = element("thead");
        thead0.innerHTML = `<tr><th class="is-narrow"></th> <th class="is-narrow">Tahun</th> <th>Judul Penelitian</th> <th class="is-narrow">Ketua / Anggota</th> <th class="is-narrow">Sumber Dana</th> <th>Jumlah Rp.</th></tr>`;
        t16 = space();
        tbody0 = element("tbody");
        if (if_block0)
          if_block0.c();
        t17 = space();
        br0 = element("br");
        t18 = space();
        br1 = element("br");
        t19 = space();
        nav1 = element("nav");
        div5 = element("div");
        div5.innerHTML = `<div class="level-item"><h6 class="title is-6">Pengalaman Pengabdian Masyarakat</h6></div>`;
        t21 = space();
        div7 = element("div");
        div6 = element("div");
        button1 = element("button");
        span2 = element("span");
        create_component(icon1.$$.fragment);
        t22 = space();
        span3 = element("span");
        span3.innerHTML = `<a>Tambah</a>`;
        t24 = space();
        create_component(modal1.$$.fragment);
        t25 = space();
        table1 = element("table");
        thead1 = element("thead");
        thead1.innerHTML = `<tr><th class="is-narrow"></th> <th class="is-narrow">Tahun</th> <th>Judul Pengabdian Masyarakat</th> <th class="is-narrow">Ketua / Anggota</th> <th class="is-narrow">Sumber Dana</th> <th>Jumlah Rp.</th></tr>`;
        t36 = space();
        tbody1 = element("tbody");
        if (if_block1)
          if_block1.c();
        t37 = space();
        br2 = element("br");
        t38 = space();
        br3 = element("br");
        t39 = space();
        nav2 = element("nav");
        div9 = element("div");
        div9.innerHTML = `<div class="level-item"><h6 class="title is-6">Pengalaman Diseminasi Ilmiah dalam Pertemuan / Pameran</h6></div>`;
        t41 = space();
        div11 = element("div");
        div10 = element("div");
        button2 = element("button");
        span4 = element("span");
        create_component(icon2.$$.fragment);
        t42 = space();
        span5 = element("span");
        span5.innerHTML = `<a>Tambah</a>`;
        t44 = space();
        create_component(modal2.$$.fragment);
        t45 = space();
        table2 = element("table");
        thead2 = element("thead");
        thead2.innerHTML = `<tr><th class="is-narrow"></th> <th class="is-narrow">Tahun</th> <th>Judul Artikel</th> <th>Nama Pemakalah</th> <th class="is-narrow">Nama Pertemuan Ilmiah / Pameran</th></tr>`;
        t54 = space();
        tbody2 = element("tbody");
        if (if_block2)
          if_block2.c();
        t55 = space();
        br4 = element("br");
        t56 = space();
        nav3 = element("nav");
        div13 = element("div");
        div13.innerHTML = `<div class="level-item"><h6 class="title is-6">Pengalaman Publikasi Ilmiah dalam Jurnal (bukan Proceeding)</h6></div>`;
        t58 = space();
        div15 = element("div");
        div14 = element("div");
        button3 = element("button");
        span6 = element("span");
        create_component(icon3.$$.fragment);
        t59 = space();
        span7 = element("span");
        span7.innerHTML = `<a>Tambah</a>`;
        t61 = space();
        create_component(modal3.$$.fragment);
        t62 = space();
        table3 = element("table");
        thead3 = element("thead");
        thead3.innerHTML = `<tr><th class="is-narrow"></th> <th class="is-narrow">Tahun</th> <th>Judul Artikel</th> <th>Nama Jurnal, Vol., No Issue/No Artikel, Halaman</th> <th>Impact Factor/Scopus Quarter/Akreditasi</th></tr>`;
        t71 = space();
        tbody3 = element("tbody");
        if (if_block3)
          if_block3.c();
        t72 = space();
        br5 = element("br");
        t73 = space();
        nav4 = element("nav");
        div17 = element("div");
        div17.innerHTML = `<div class="level-item"><h6 class="title is-6">Pengalaman Penulisan Buku</h6></div>`;
        t75 = space();
        div19 = element("div");
        div18 = element("div");
        button4 = element("button");
        span8 = element("span");
        create_component(icon4.$$.fragment);
        t76 = space();
        span9 = element("span");
        span9.innerHTML = `<a>Tambah</a>`;
        t78 = space();
        create_component(modal4.$$.fragment);
        t79 = space();
        table4 = element("table");
        thead4 = element("thead");
        thead4.innerHTML = `<tr><th class="is-narrow"></th> <th class="is-narrow">Tahun</th> <th>Judul Buku</th> <th>Nama Penulis</th> <th>Penerbit</th> <th>ISBN</th></tr>`;
        t90 = space();
        tbody4 = element("tbody");
        if (if_block4)
          if_block4.c();
        t91 = space();
        br6 = element("br");
        t92 = space();
        nav5 = element("nav");
        div21 = element("div");
        div21.innerHTML = `<div class="level-item"><h6 class="title is-6">Pengalaman Hak Kekayaan Intelektual&quot;</h6></div>`;
        t94 = space();
        div23 = element("div");
        div22 = element("div");
        button5 = element("button");
        span10 = element("span");
        create_component(icon5.$$.fragment);
        t95 = space();
        span11 = element("span");
        span11.innerHTML = `<a>Tambah</a>`;
        t97 = space();
        create_component(modal5.$$.fragment);
        t98 = space();
        table5 = element("table");
        thead5 = element("thead");
        thead5.innerHTML = `<tr><th class="is-narrow"></th> <th class="is-narrow">Tahun</th> <th>Judul HKI</th> <th>Nama Penulis</th> <th>Jenis HKI</th> <th>No HKI</th></tr>`;
        t109 = space();
        tbody5 = element("tbody");
        if (if_block5)
          if_block5.c();
        t110 = space();
        br7 = element("br");
        attr(div1, "class", "level-left");
        attr(span0, "class", "icon");
        attr(button0, "class", "button is-info");
        attr(div2, "class", "level-item");
        attr(div3, "class", "level-right");
        attr(nav0, "class", "level");
        attr(table0, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(div5, "class", "level-left");
        attr(span2, "class", "icon");
        attr(button1, "class", "button is-info");
        attr(div6, "class", "level-item");
        attr(div7, "class", "level-right");
        attr(nav1, "class", "level");
        attr(table1, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(div9, "class", "level-left");
        attr(span4, "class", "icon");
        attr(button2, "class", "button is-info");
        attr(div10, "class", "level-item");
        attr(div11, "class", "level-right");
        attr(nav2, "class", "level");
        attr(table2, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(div13, "class", "level-left");
        attr(span6, "class", "icon");
        attr(button3, "class", "button is-info");
        attr(div14, "class", "level-item");
        attr(div15, "class", "level-right");
        attr(nav3, "class", "level");
        attr(table3, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(div17, "class", "level-left");
        attr(span8, "class", "icon");
        attr(button4, "class", "button is-info");
        attr(div18, "class", "level-item");
        attr(div19, "class", "level-right");
        attr(nav4, "class", "level");
        attr(table4, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(div21, "class", "level-left");
        attr(span10, "class", "icon");
        attr(button5, "class", "button is-info");
        attr(div22, "class", "level-item");
        attr(div23, "class", "level-right");
        attr(nav5, "class", "level");
        attr(table5, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
      },
      m(target, anchor) {
        insert(target, nav0, anchor);
        append(nav0, div1);
        append(nav0, t1);
        append(nav0, div3);
        append(div3, div2);
        append(div2, button0);
        append(button0, span0);
        mount_component(icon0, span0, null);
        append(button0, t2);
        append(button0, span1);
        insert(target, t4, anchor);
        mount_component(modal0, target, anchor);
        insert(target, t5, anchor);
        insert(target, table0, anchor);
        append(table0, thead0);
        append(table0, t16);
        append(table0, tbody0);
        if (if_block0)
          if_block0.m(tbody0, null);
        append(table0, t17);
        append(table0, br0);
        insert(target, t18, anchor);
        insert(target, br1, anchor);
        insert(target, t19, anchor);
        insert(target, nav1, anchor);
        append(nav1, div5);
        append(nav1, t21);
        append(nav1, div7);
        append(div7, div6);
        append(div6, button1);
        append(button1, span2);
        mount_component(icon1, span2, null);
        append(button1, t22);
        append(button1, span3);
        insert(target, t24, anchor);
        mount_component(modal1, target, anchor);
        insert(target, t25, anchor);
        insert(target, table1, anchor);
        append(table1, thead1);
        append(table1, t36);
        append(table1, tbody1);
        if (if_block1)
          if_block1.m(tbody1, null);
        append(table1, t37);
        append(table1, br2);
        insert(target, t38, anchor);
        insert(target, br3, anchor);
        insert(target, t39, anchor);
        insert(target, nav2, anchor);
        append(nav2, div9);
        append(nav2, t41);
        append(nav2, div11);
        append(div11, div10);
        append(div10, button2);
        append(button2, span4);
        mount_component(icon2, span4, null);
        append(button2, t42);
        append(button2, span5);
        insert(target, t44, anchor);
        mount_component(modal2, target, anchor);
        insert(target, t45, anchor);
        insert(target, table2, anchor);
        append(table2, thead2);
        append(table2, t54);
        append(table2, tbody2);
        if (if_block2)
          if_block2.m(tbody2, null);
        insert(target, t55, anchor);
        insert(target, br4, anchor);
        insert(target, t56, anchor);
        insert(target, nav3, anchor);
        append(nav3, div13);
        append(nav3, t58);
        append(nav3, div15);
        append(div15, div14);
        append(div14, button3);
        append(button3, span6);
        mount_component(icon3, span6, null);
        append(button3, t59);
        append(button3, span7);
        insert(target, t61, anchor);
        mount_component(modal3, target, anchor);
        insert(target, t62, anchor);
        insert(target, table3, anchor);
        append(table3, thead3);
        append(table3, t71);
        append(table3, tbody3);
        if (if_block3)
          if_block3.m(tbody3, null);
        insert(target, t72, anchor);
        insert(target, br5, anchor);
        insert(target, t73, anchor);
        insert(target, nav4, anchor);
        append(nav4, div17);
        append(nav4, t75);
        append(nav4, div19);
        append(div19, div18);
        append(div18, button4);
        append(button4, span8);
        mount_component(icon4, span8, null);
        append(button4, t76);
        append(button4, span9);
        insert(target, t78, anchor);
        mount_component(modal4, target, anchor);
        insert(target, t79, anchor);
        insert(target, table4, anchor);
        append(table4, thead4);
        append(table4, t90);
        append(table4, tbody4);
        if (if_block4)
          if_block4.m(tbody4, null);
        insert(target, t91, anchor);
        insert(target, br6, anchor);
        insert(target, t92, anchor);
        insert(target, nav5, anchor);
        append(nav5, div21);
        append(nav5, t94);
        append(nav5, div23);
        append(div23, div22);
        append(div22, button5);
        append(button5, span10);
        mount_component(icon5, span10, null);
        append(button5, t95);
        append(button5, span11);
        insert(target, t97, anchor);
        mount_component(modal5, target, anchor);
        insert(target, t98, anchor);
        insert(target, table5, anchor);
        append(table5, thead5);
        append(table5, t109);
        append(table5, tbody5);
        if (if_block5)
          if_block5.m(tbody5, null);
        insert(target, t110, anchor);
        insert(target, br7, anchor);
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*clickModalPenelitian*/
              ctx[71]
            ),
            listen(
              button1,
              "click",
              /*clickModalPengmas*/
              ctx[72]
            ),
            listen(
              button2,
              "click",
              /*clickModalDiseminasi*/
              ctx[73]
            ),
            listen(
              button3,
              "click",
              /*clickModalPublikasi*/
              ctx[74]
            ),
            listen(
              button4,
              "click",
              /*clickModalPenulisanBuku*/
              ctx[75]
            ),
            listen(
              button5,
              "click",
              /*clickModalHKI*/
              ctx[76]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const modal0_changes = {};
        if (dirty[0] & /*biayaPenelitian, sumberDanaPenelitian, rolePenelitian, judulPenelitian, tahunPenelitian*/
        3968 | dirty[6] & /*$$scope*/
        1024) {
          modal0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show && dirty[2] & /*showModalPenelitian*/
        1) {
          updating_show = true;
          modal0_changes.show = /*showModalPenelitian*/
          ctx2[62];
          add_flush_callback(() => updating_show = false);
        }
        modal0.$set(modal0_changes);
        if (
          /*dataPP*/
          ctx2[0]
        ) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
            if (dirty[0] & /*dataPP*/
            1) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_64(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(tbody0, null);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        const modal1_changes = {};
        if (dirty[0] & /*biayaPengmas, sumberDanaPengmas, rolePengmas, judulPengmas, tahunPengmas*/
        126976 | dirty[6] & /*$$scope*/
        1024) {
          modal1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show_1 && dirty[2] & /*showModalPengmas*/
        2) {
          updating_show_1 = true;
          modal1_changes.show = /*showModalPengmas*/
          ctx2[63];
          add_flush_callback(() => updating_show_1 = false);
        }
        modal1.$set(modal1_changes);
        if (
          /*dataPM*/
          ctx2[1]
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
            if (dirty[0] & /*dataPM*/
            2) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block_54(ctx2);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(tbody1, null);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });
          check_outros();
        }
        const modal2_changes = {};
        if (dirty[0] & /*namaPertemuanDiseminasi, namaPemakalahDiseminasi, judulDiseminasi, tahunDiseminasi*/
        1966080 | dirty[6] & /*$$scope*/
        1024) {
          modal2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show_2 && dirty[2] & /*showModalDiseminasi*/
        4) {
          updating_show_2 = true;
          modal2_changes.show = /*showModalDiseminasi*/
          ctx2[64];
          add_flush_callback(() => updating_show_2 = false);
        }
        modal2.$set(modal2_changes);
        if (
          /*dataPD*/
          ctx2[2]
        ) {
          if (if_block2) {
            if_block2.p(ctx2, dirty);
            if (dirty[0] & /*dataPD*/
            4) {
              transition_in(if_block2, 1);
            }
          } else {
            if_block2 = create_if_block_45(ctx2);
            if_block2.c();
            transition_in(if_block2, 1);
            if_block2.m(tbody2, null);
          }
        } else if (if_block2) {
          group_outros();
          transition_out(if_block2, 1, 1, () => {
            if_block2 = null;
          });
          check_outros();
        }
        const modal3_changes = {};
        if (dirty[0] & /*impactFactor, namaJurnal, judulPublikasi, tahunPublikasi*/
        31457280 | dirty[6] & /*$$scope*/
        1024) {
          modal3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show_3 && dirty[2] & /*showModalPublikasi*/
        8) {
          updating_show_3 = true;
          modal3_changes.show = /*showModalPublikasi*/
          ctx2[65];
          add_flush_callback(() => updating_show_3 = false);
        }
        modal3.$set(modal3_changes);
        if (
          /*dataPPub*/
          ctx2[3]
        ) {
          if (if_block3) {
            if_block3.p(ctx2, dirty);
            if (dirty[0] & /*dataPPub*/
            8) {
              transition_in(if_block3, 1);
            }
          } else {
            if_block3 = create_if_block_35(ctx2);
            if_block3.c();
            transition_in(if_block3, 1);
            if_block3.m(tbody3, null);
          }
        } else if (if_block3) {
          group_outros();
          transition_out(if_block3, 1, 1, () => {
            if_block3 = null;
          });
          check_outros();
        }
        const modal4_changes = {};
        if (dirty[0] & /*Isbn, PenerbitBuku, namaPenulisBuku, JudulBuku, tahunBuku*/
        1040187392 | dirty[6] & /*$$scope*/
        1024) {
          modal4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show_4 && dirty[2] & /*showModalPenulisanBuku*/
        16) {
          updating_show_4 = true;
          modal4_changes.show = /*showModalPenulisanBuku*/
          ctx2[66];
          add_flush_callback(() => updating_show_4 = false);
        }
        modal4.$set(modal4_changes);
        if (
          /*dataPPB*/
          ctx2[4]
        ) {
          if (if_block4) {
            if_block4.p(ctx2, dirty);
            if (dirty[0] & /*dataPPB*/
            16) {
              transition_in(if_block4, 1);
            }
          } else {
            if_block4 = create_if_block_25(ctx2);
            if_block4.c();
            transition_in(if_block4, 1);
            if_block4.m(tbody4, null);
          }
        } else if (if_block4) {
          group_outros();
          transition_out(if_block4, 1, 1, () => {
            if_block4 = null;
          });
          check_outros();
        }
        const modal5_changes = {};
        if (dirty[0] & /*tahunHKI*/
        1073741824 | dirty[1] & /*noHKI, jenisHKI, namaPenulisHKI, JudulHKI*/
        15 | dirty[6] & /*$$scope*/
        1024) {
          modal5_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show_5 && dirty[2] & /*showModalHKI*/
        32) {
          updating_show_5 = true;
          modal5_changes.show = /*showModalHKI*/
          ctx2[67];
          add_flush_callback(() => updating_show_5 = false);
        }
        modal5.$set(modal5_changes);
        if (
          /*dataPHKI*/
          ctx2[5]
        ) {
          if (if_block5) {
            if_block5.p(ctx2, dirty);
            if (dirty[0] & /*dataPHKI*/
            32) {
              transition_in(if_block5, 1);
            }
          } else {
            if_block5 = create_if_block_19(ctx2);
            if_block5.c();
            transition_in(if_block5, 1);
            if_block5.m(tbody5, null);
          }
        } else if (if_block5) {
          group_outros();
          transition_out(if_block5, 1, 1, () => {
            if_block5 = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(icon0.$$.fragment, local);
        transition_in(modal0.$$.fragment, local);
        transition_in(if_block0);
        transition_in(icon1.$$.fragment, local);
        transition_in(modal1.$$.fragment, local);
        transition_in(if_block1);
        transition_in(icon2.$$.fragment, local);
        transition_in(modal2.$$.fragment, local);
        transition_in(if_block2);
        transition_in(icon3.$$.fragment, local);
        transition_in(modal3.$$.fragment, local);
        transition_in(if_block3);
        transition_in(icon4.$$.fragment, local);
        transition_in(modal4.$$.fragment, local);
        transition_in(if_block4);
        transition_in(icon5.$$.fragment, local);
        transition_in(modal5.$$.fragment, local);
        transition_in(if_block5);
        current = true;
      },
      o(local) {
        transition_out(icon0.$$.fragment, local);
        transition_out(modal0.$$.fragment, local);
        transition_out(if_block0);
        transition_out(icon1.$$.fragment, local);
        transition_out(modal1.$$.fragment, local);
        transition_out(if_block1);
        transition_out(icon2.$$.fragment, local);
        transition_out(modal2.$$.fragment, local);
        transition_out(if_block2);
        transition_out(icon3.$$.fragment, local);
        transition_out(modal3.$$.fragment, local);
        transition_out(if_block3);
        transition_out(icon4.$$.fragment, local);
        transition_out(modal4.$$.fragment, local);
        transition_out(if_block4);
        transition_out(icon5.$$.fragment, local);
        transition_out(modal5.$$.fragment, local);
        transition_out(if_block5);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(nav0);
          detach(t4);
          detach(t5);
          detach(table0);
          detach(t18);
          detach(br1);
          detach(t19);
          detach(nav1);
          detach(t24);
          detach(t25);
          detach(table1);
          detach(t38);
          detach(br3);
          detach(t39);
          detach(nav2);
          detach(t44);
          detach(t45);
          detach(table2);
          detach(t55);
          detach(br4);
          detach(t56);
          detach(nav3);
          detach(t61);
          detach(t62);
          detach(table3);
          detach(t72);
          detach(br5);
          detach(t73);
          detach(nav4);
          detach(t78);
          detach(t79);
          detach(table4);
          detach(t91);
          detach(br6);
          detach(t92);
          detach(nav5);
          detach(t97);
          detach(t98);
          detach(table5);
          detach(t110);
          detach(br7);
        }
        destroy_component(icon0);
        destroy_component(modal0, detaching);
        if (if_block0)
          if_block0.d();
        destroy_component(icon1);
        destroy_component(modal1, detaching);
        if (if_block1)
          if_block1.d();
        destroy_component(icon2);
        destroy_component(modal2, detaching);
        if (if_block2)
          if_block2.d();
        destroy_component(icon3);
        destroy_component(modal3, detaching);
        if (if_block3)
          if_block3.d();
        destroy_component(icon4);
        destroy_component(modal4, detaching);
        if (if_block4)
          if_block4.d();
        destroy_component(icon5);
        destroy_component(modal5, detaching);
        if (if_block5)
          if_block5.d();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_34(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*tahunPenelitian*/
          ctx[8]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_12*/
            ctx[123]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunPenelitian*/
        256 && to_number(input.value) !== /*tahunPenelitian*/
        ctx2[8]) {
          set_input_value(
            input,
            /*tahunPenelitian*/
            ctx2[8]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_332(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*judulPenelitian*/
          ctx[9]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_13*/
            ctx[124]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*judulPenelitian*/
        512 && input.value !== /*judulPenelitian*/
        ctx2[9]) {
          set_input_value(
            input,
            /*judulPenelitian*/
            ctx2[9]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_322(ctx) {
    let div;
    let select;
    let option0;
    let option1;
    let option2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Pilih peran dalam kegiatan";
        option1 = element("option");
        option1.textContent = "Ketua";
        option2 = element("option");
        option2.textContent = "Anggota";
        option0.__value = "";
        set_input_value(option0, option0.__value);
        option0.disabled = true;
        option0.selected = true;
        option0.hidden = true;
        option1.__value = "Ketua";
        set_input_value(option1, option1.__value);
        option2.__value = "Anggota";
        set_input_value(option2, option2.__value);
        if (
          /*rolePenelitian*/
          ctx[10] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler*/
            ctx[125].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        select_option(
          select,
          /*rolePenelitian*/
          ctx[10],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler*/
            ctx[125]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*rolePenelitian*/
        1024) {
          select_option(
            select,
            /*rolePenelitian*/
            ctx2[10]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_31(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*sumberDanaPenelitian*/
          ctx[11]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_14*/
            ctx[126]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*sumberDanaPenelitian*/
        2048 && input.value !== /*sumberDanaPenelitian*/
        ctx2[11]) {
          set_input_value(
            input,
            /*sumberDanaPenelitian*/
            ctx2[11]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_30(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Biaya Penelitian");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*biayaPenelitian*/
          ctx[7]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler_15*/
              ctx[127]
            ),
            listen(
              input,
              "keyup",
              /*keyup_handler*/
              ctx[128]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*biayaPenelitian*/
        128 && input.value !== /*biayaPenelitian*/
        ctx2[7]) {
          set_input_value(
            input,
            /*biayaPenelitian*/
            ctx2[7]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_29(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let hr;
    let t5;
    let div;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    field0 = new Field_default({
      props: {
        name: "Tahun",
        $$slots: { default: [create_default_slot_34] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Judul Penelitian",
        $$slots: { default: [create_default_slot_332] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Ketua/Anggota",
        $$slots: { default: [create_default_slot_322] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Sumber Dana",
        $$slots: { default: [create_default_slot_31] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Jumlah Rp.",
        $$slots: { default: [create_default_slot_30] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        hr = element("hr");
        t5 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        insert(target, hr, anchor);
        insert(target, t5, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*simpanPP*/
            ctx[80]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*tahunPenelitian*/
        256 | dirty[6] & /*$$scope*/
        1024) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*judulPenelitian*/
        512 | dirty[6] & /*$$scope*/
        1024) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*rolePenelitian*/
        1024 | dirty[6] & /*$$scope*/
        1024) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*sumberDanaPenelitian*/
        2048 | dirty[6] & /*$$scope*/
        1024) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*biayaPenelitian*/
        128 | dirty[6] & /*$$scope*/
        1024) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(hr);
          detach(t5);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_header_slot_5(ctx) {
    let h4;
    return {
      c() {
        h4 = element("h4");
        h4.textContent = "Pengalaman Penelitian";
        attr(h4, "class", "title is-4");
        attr(h4, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h4, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h4);
        }
      }
    };
  }
  function create_if_block_64(ctx) {
    let each_1_anchor;
    let current;
    let each_value_5 = ensure_array_like(
      /*dataPP*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_5.length; i += 1) {
      each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*dataPP*/
        1 | dirty[2] & /*delrowPP*/
        134217728) {
          each_value_5 = ensure_array_like(
            /*dataPP*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value_5.length; i += 1) {
            const child_ctx = get_each_context_5(ctx2, each_value_5, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_5(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value_5.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_5.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_5(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_pid_value;
    let t0;
    let td1;
    let t1_value = (
      /*PP*/
      ctx[190].tahun_penelitian + ""
    );
    let t1;
    let t2;
    let td2;
    let t3_value = (
      /*PP*/
      ctx[190].judul_penelitian + ""
    );
    let t3;
    let t4;
    let td3;
    let t5_value = (
      /*PP*/
      ctx[190].role_penelitian + ""
    );
    let t5;
    let t6;
    let td4;
    let t7_value = (
      /*PP*/
      ctx[190].sumber_dana + ""
    );
    let t7;
    let t8;
    let td5;
    let t9_value = (
      /*PP*/
      ctx[190].jumlah + ""
    );
    let t9;
    let t10;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        t1 = text(t1_value);
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        td3 = element("td");
        t5 = text(t5_value);
        t6 = space();
        td4 = element("td");
        t7 = text(t7_value);
        t8 = space();
        td5 = element("td");
        t9 = text(t9_value);
        t10 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "pid", button_pid_value = /*PP*/
        ctx[190].id);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(td1, t1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        append(tr, td3);
        append(td3, t5);
        append(tr, t6);
        append(tr, td4);
        append(td4, t7);
        append(tr, t8);
        append(tr, td5);
        append(td5, t9);
        append(tr, t10);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*delrowPP*/
            ctx[89]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*dataPP*/
        1 && button_pid_value !== (button_pid_value = /*PP*/
        ctx2[190].id)) {
          attr(button, "pid", button_pid_value);
        }
        if ((!current || dirty[0] & /*dataPP*/
        1) && t1_value !== (t1_value = /*PP*/
        ctx2[190].tahun_penelitian + ""))
          set_data(t1, t1_value);
        if ((!current || dirty[0] & /*dataPP*/
        1) && t3_value !== (t3_value = /*PP*/
        ctx2[190].judul_penelitian + ""))
          set_data(t3, t3_value);
        if ((!current || dirty[0] & /*dataPP*/
        1) && t5_value !== (t5_value = /*PP*/
        ctx2[190].role_penelitian + ""))
          set_data(t5, t5_value);
        if ((!current || dirty[0] & /*dataPP*/
        1) && t7_value !== (t7_value = /*PP*/
        ctx2[190].sumber_dana + ""))
          set_data(t7, t7_value);
        if ((!current || dirty[0] & /*dataPP*/
        1) && t9_value !== (t9_value = /*PP*/
        ctx2[190].jumlah + ""))
          set_data(t9, t9_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_282(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*tahunPengmas*/
          ctx[13]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_16*/
            ctx[130]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunPengmas*/
        8192 && to_number(input.value) !== /*tahunPengmas*/
        ctx2[13]) {
          set_input_value(
            input,
            /*tahunPengmas*/
            ctx2[13]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_272(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*judulPengmas*/
          ctx[14]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_17*/
            ctx[131]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*judulPengmas*/
        16384 && input.value !== /*judulPengmas*/
        ctx2[14]) {
          set_input_value(
            input,
            /*judulPengmas*/
            ctx2[14]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_262(ctx) {
    let div;
    let select;
    let option0;
    let option1;
    let option2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Pilih peran dalam kegiatan";
        option1 = element("option");
        option1.textContent = "Ketua";
        option2 = element("option");
        option2.textContent = "Anggota";
        option0.__value = "";
        set_input_value(option0, option0.__value);
        option0.disabled = true;
        option0.selected = true;
        option0.hidden = true;
        option1.__value = "Ketua";
        set_input_value(option1, option1.__value);
        option2.__value = "Anggota";
        set_input_value(option2, option2.__value);
        if (
          /*rolePengmas*/
          ctx[15] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler_1*/
            ctx[132].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        select_option(
          select,
          /*rolePengmas*/
          ctx[15],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler_1*/
            ctx[132]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*rolePengmas*/
        32768) {
          select_option(
            select,
            /*rolePengmas*/
            ctx2[15]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_252(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*sumberDanaPengmas*/
          ctx[16]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_18*/
            ctx[133]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*sumberDanaPengmas*/
        65536 && input.value !== /*sumberDanaPengmas*/
        ctx2[16]) {
          set_input_value(
            input,
            /*sumberDanaPengmas*/
            ctx2[16]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_242(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Biaya Pengmas");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*biayaPengmas*/
          ctx[12]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler_19*/
              ctx[134]
            ),
            listen(
              input,
              "keyup",
              /*keyup_handler_1*/
              ctx[135]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*biayaPengmas*/
        4096 && input.value !== /*biayaPengmas*/
        ctx2[12]) {
          set_input_value(
            input,
            /*biayaPengmas*/
            ctx2[12]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_233(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let hr;
    let t5;
    let div;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    field0 = new Field_default({
      props: {
        name: "Tahun",
        $$slots: { default: [create_default_slot_282] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Judul Pengmas",
        $$slots: { default: [create_default_slot_272] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Ketua/Anggota",
        $$slots: { default: [create_default_slot_262] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Sumber Dana",
        $$slots: { default: [create_default_slot_252] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Jumlah Rp.",
        $$slots: { default: [create_default_slot_242] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        hr = element("hr");
        t5 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        insert(target, hr, anchor);
        insert(target, t5, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*simpanPM*/
            ctx[81]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*tahunPengmas*/
        8192 | dirty[6] & /*$$scope*/
        1024) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*judulPengmas*/
        16384 | dirty[6] & /*$$scope*/
        1024) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*rolePengmas*/
        32768 | dirty[6] & /*$$scope*/
        1024) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*sumberDanaPengmas*/
        65536 | dirty[6] & /*$$scope*/
        1024) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*biayaPengmas*/
        4096 | dirty[6] & /*$$scope*/
        1024) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(hr);
          detach(t5);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_header_slot_4(ctx) {
    let h4;
    return {
      c() {
        h4 = element("h4");
        h4.textContent = "Pengalaman Pengabdian Masyarakat";
        attr(h4, "class", "title is-4");
        attr(h4, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h4, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h4);
        }
      }
    };
  }
  function create_if_block_54(ctx) {
    let each_1_anchor;
    let current;
    let each_value_4 = ensure_array_like(
      /*dataPM*/
      ctx[1]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_4.length; i += 1) {
      each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*dataPM*/
        2 | dirty[2] & /*delrowPM*/
        268435456) {
          each_value_4 = ensure_array_like(
            /*dataPM*/
            ctx2[1]
          );
          let i;
          for (i = 0; i < each_value_4.length; i += 1) {
            const child_ctx = get_each_context_4(ctx2, each_value_4, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_4(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value_4.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_4.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_4(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_pid_value;
    let t0;
    let td1;
    let t1_value = (
      /*PM*/
      ctx[187].tahun_pengmas + ""
    );
    let t1;
    let t2;
    let td2;
    let t3_value = (
      /*PM*/
      ctx[187].judul_pengmas + ""
    );
    let t3;
    let t4;
    let td3;
    let t5_value = (
      /*PM*/
      ctx[187].role_pengmas + ""
    );
    let t5;
    let t6;
    let td4;
    let t7_value = (
      /*PM*/
      ctx[187].sumber_dana + ""
    );
    let t7;
    let t8;
    let td5;
    let t9_value = (
      /*PM*/
      ctx[187].jumlah + ""
    );
    let t9;
    let t10;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        t1 = text(t1_value);
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        td3 = element("td");
        t5 = text(t5_value);
        t6 = space();
        td4 = element("td");
        t7 = text(t7_value);
        t8 = space();
        td5 = element("td");
        t9 = text(t9_value);
        t10 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "pid", button_pid_value = /*PM*/
        ctx[187].id);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(td1, t1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        append(tr, td3);
        append(td3, t5);
        append(tr, t6);
        append(tr, td4);
        append(td4, t7);
        append(tr, t8);
        append(tr, td5);
        append(td5, t9);
        append(tr, t10);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*delrowPM*/
            ctx[90]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*dataPM*/
        2 && button_pid_value !== (button_pid_value = /*PM*/
        ctx2[187].id)) {
          attr(button, "pid", button_pid_value);
        }
        if ((!current || dirty[0] & /*dataPM*/
        2) && t1_value !== (t1_value = /*PM*/
        ctx2[187].tahun_pengmas + ""))
          set_data(t1, t1_value);
        if ((!current || dirty[0] & /*dataPM*/
        2) && t3_value !== (t3_value = /*PM*/
        ctx2[187].judul_pengmas + ""))
          set_data(t3, t3_value);
        if ((!current || dirty[0] & /*dataPM*/
        2) && t5_value !== (t5_value = /*PM*/
        ctx2[187].role_pengmas + ""))
          set_data(t5, t5_value);
        if ((!current || dirty[0] & /*dataPM*/
        2) && t7_value !== (t7_value = /*PM*/
        ctx2[187].sumber_dana + ""))
          set_data(t7, t7_value);
        if ((!current || dirty[0] & /*dataPM*/
        2) && t9_value !== (t9_value = /*PM*/
        ctx2[187].jumlah + ""))
          set_data(t9, t9_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_223(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*tahunDiseminasi*/
          ctx[17]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_20*/
            ctx[137]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunDiseminasi*/
        131072 && to_number(input.value) !== /*tahunDiseminasi*/
        ctx2[17]) {
          set_input_value(
            input,
            /*tahunDiseminasi*/
            ctx2[17]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_212(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*judulDiseminasi*/
          ctx[18]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_21*/
            ctx[138]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*judulDiseminasi*/
        262144 && input.value !== /*judulDiseminasi*/
        ctx2[18]) {
          set_input_value(
            input,
            /*judulDiseminasi*/
            ctx2[18]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_202(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*namaPemakalahDiseminasi*/
          ctx[19]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_22*/
            ctx[139]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*namaPemakalahDiseminasi*/
        524288 && input.value !== /*namaPemakalahDiseminasi*/
        ctx2[19]) {
          set_input_value(
            input,
            /*namaPemakalahDiseminasi*/
            ctx2[19]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_192(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*namaPertemuanDiseminasi*/
          ctx[20]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_23*/
            ctx[140]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*namaPertemuanDiseminasi*/
        1048576 && input.value !== /*namaPertemuanDiseminasi*/
        ctx2[20]) {
          set_input_value(
            input,
            /*namaPertemuanDiseminasi*/
            ctx2[20]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_182(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let hr;
    let t4;
    let div;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    field0 = new Field_default({
      props: {
        name: "Tahun",
        $$slots: { default: [create_default_slot_223] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Judul Artikel",
        $$slots: { default: [create_default_slot_212] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Nama Pemakalah",
        $$slots: { default: [create_default_slot_202] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Nama Pertemuan Ilmiah/Pameran",
        $$slots: { default: [create_default_slot_192] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        hr = element("hr");
        t4 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        insert(target, hr, anchor);
        insert(target, t4, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*simpanPD*/
            ctx[82]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*tahunDiseminasi*/
        131072 | dirty[6] & /*$$scope*/
        1024) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*judulDiseminasi*/
        262144 | dirty[6] & /*$$scope*/
        1024) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*namaPemakalahDiseminasi*/
        524288 | dirty[6] & /*$$scope*/
        1024) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*namaPertemuanDiseminasi*/
        1048576 | dirty[6] & /*$$scope*/
        1024) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(hr);
          detach(t4);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_header_slot_3(ctx) {
    let h4;
    return {
      c() {
        h4 = element("h4");
        h4.innerHTML = `Pengalaman Diseminasi Ilmiah dalam<br/>Pertemuan / Pameran`;
        attr(h4, "class", "title is-4");
        attr(h4, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h4, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h4);
        }
      }
    };
  }
  function create_if_block_45(ctx) {
    let each_1_anchor;
    let current;
    let each_value_3 = ensure_array_like(
      /*dataPD*/
      ctx[2]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_3.length; i += 1) {
      each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*dataPD*/
        4 | dirty[2] & /*delrowPD*/
        536870912) {
          each_value_3 = ensure_array_like(
            /*dataPD*/
            ctx2[2]
          );
          let i;
          for (i = 0; i < each_value_3.length; i += 1) {
            const child_ctx = get_each_context_3(ctx2, each_value_3, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_3(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value_3.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_3.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_3(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_pid_value;
    let t0;
    let td1;
    let t1_value = (
      /*PD*/
      ctx[184].tahun_diseminasi + ""
    );
    let t1;
    let t2;
    let td2;
    let t3_value = (
      /*PD*/
      ctx[184].judul_artikel + ""
    );
    let t3;
    let t4;
    let td3;
    let t5_value = (
      /*PD*/
      ctx[184].nama_pemakalah + ""
    );
    let t5;
    let t6;
    let td4;
    let t7_value = (
      /*PD*/
      ctx[184].nama_pertemuan + ""
    );
    let t7;
    let t8;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        t1 = text(t1_value);
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        td3 = element("td");
        t5 = text(t5_value);
        t6 = space();
        td4 = element("td");
        t7 = text(t7_value);
        t8 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "pid", button_pid_value = /*PD*/
        ctx[184].id);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(td1, t1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        append(tr, td3);
        append(td3, t5);
        append(tr, t6);
        append(tr, td4);
        append(td4, t7);
        append(tr, t8);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*delrowPD*/
            ctx[91]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*dataPD*/
        4 && button_pid_value !== (button_pid_value = /*PD*/
        ctx2[184].id)) {
          attr(button, "pid", button_pid_value);
        }
        if ((!current || dirty[0] & /*dataPD*/
        4) && t1_value !== (t1_value = /*PD*/
        ctx2[184].tahun_diseminasi + ""))
          set_data(t1, t1_value);
        if ((!current || dirty[0] & /*dataPD*/
        4) && t3_value !== (t3_value = /*PD*/
        ctx2[184].judul_artikel + ""))
          set_data(t3, t3_value);
        if ((!current || dirty[0] & /*dataPD*/
        4) && t5_value !== (t5_value = /*PD*/
        ctx2[184].nama_pemakalah + ""))
          set_data(t5, t5_value);
        if ((!current || dirty[0] & /*dataPD*/
        4) && t7_value !== (t7_value = /*PD*/
        ctx2[184].nama_pertemuan + ""))
          set_data(t7, t7_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_172(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*tahunPublikasi*/
          ctx[21]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_24*/
            ctx[142]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunPublikasi*/
        2097152 && to_number(input.value) !== /*tahunPublikasi*/
        ctx2[21]) {
          set_input_value(
            input,
            /*tahunPublikasi*/
            ctx2[21]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_162(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*judulPublikasi*/
          ctx[22]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_25*/
            ctx[143]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*judulPublikasi*/
        4194304 && input.value !== /*judulPublikasi*/
        ctx2[22]) {
          set_input_value(
            input,
            /*judulPublikasi*/
            ctx2[22]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_152(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*namaJurnal*/
          ctx[23]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_26*/
            ctx[144]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*namaJurnal*/
        8388608 && input.value !== /*namaJurnal*/
        ctx2[23]) {
          set_input_value(
            input,
            /*namaJurnal*/
            ctx2[23]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_142(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*impactFactor*/
          ctx[24]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_27*/
            ctx[145]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*impactFactor*/
        16777216 && input.value !== /*impactFactor*/
        ctx2[24]) {
          set_input_value(
            input,
            /*impactFactor*/
            ctx2[24]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_134(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let hr;
    let t4;
    let div;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    field0 = new Field_default({
      props: {
        name: "Tahun",
        $$slots: { default: [create_default_slot_172] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Judul Artikel",
        $$slots: { default: [create_default_slot_162] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Nama Jurnal, Vol., No Issue/No Artikel, Halaman",
        $$slots: { default: [create_default_slot_152] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Nama Pertemuan Ilmiah/Pameran",
        $$slots: { default: [create_default_slot_142] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        hr = element("hr");
        t4 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        insert(target, hr, anchor);
        insert(target, t4, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*simpanPPublikasi*/
            ctx[79]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*tahunPublikasi*/
        2097152 | dirty[6] & /*$$scope*/
        1024) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*judulPublikasi*/
        4194304 | dirty[6] & /*$$scope*/
        1024) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*namaJurnal*/
        8388608 | dirty[6] & /*$$scope*/
        1024) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*impactFactor*/
        16777216 | dirty[6] & /*$$scope*/
        1024) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(hr);
          detach(t4);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_header_slot_2(ctx) {
    let h4;
    return {
      c() {
        h4 = element("h4");
        h4.innerHTML = `Pengalaman Publikasi Ilmiah <br/> dalam Jurnal (bukan Proceeding)`;
        attr(h4, "class", "title is-4");
        attr(h4, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h4, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h4);
        }
      }
    };
  }
  function create_if_block_35(ctx) {
    let each_1_anchor;
    let current;
    let each_value_2 = ensure_array_like(
      /*dataPPub*/
      ctx[3]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_2.length; i += 1) {
      each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*dataPPub*/
        8 | dirty[2] & /*delrowPPub*/
        1073741824) {
          each_value_2 = ensure_array_like(
            /*dataPPub*/
            ctx2[3]
          );
          let i;
          for (i = 0; i < each_value_2.length; i += 1) {
            const child_ctx = get_each_context_2(ctx2, each_value_2, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_2(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value_2.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_2.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_2(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_pid_value;
    let t0;
    let td1;
    let t1_value = (
      /*PPub*/
      ctx[181].tahun_publikasi + ""
    );
    let t1;
    let t2;
    let td2;
    let t3_value = (
      /*PPub*/
      ctx[181].judul_artikel + ""
    );
    let t3;
    let t4;
    let td3;
    let t5_value = (
      /*PPub*/
      ctx[181].nama_jurnal + ""
    );
    let t5;
    let t6;
    let td4;
    let t7_value = (
      /*PPub*/
      ctx[181].impact + ""
    );
    let t7;
    let t8;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        t1 = text(t1_value);
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        td3 = element("td");
        t5 = text(t5_value);
        t6 = space();
        td4 = element("td");
        t7 = text(t7_value);
        t8 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "pid", button_pid_value = /*PPub*/
        ctx[181].id);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(td1, t1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        append(tr, td3);
        append(td3, t5);
        append(tr, t6);
        append(tr, td4);
        append(td4, t7);
        append(tr, t8);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*delrowPPub*/
            ctx[92]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*dataPPub*/
        8 && button_pid_value !== (button_pid_value = /*PPub*/
        ctx2[181].id)) {
          attr(button, "pid", button_pid_value);
        }
        if ((!current || dirty[0] & /*dataPPub*/
        8) && t1_value !== (t1_value = /*PPub*/
        ctx2[181].tahun_publikasi + ""))
          set_data(t1, t1_value);
        if ((!current || dirty[0] & /*dataPPub*/
        8) && t3_value !== (t3_value = /*PPub*/
        ctx2[181].judul_artikel + ""))
          set_data(t3, t3_value);
        if ((!current || dirty[0] & /*dataPPub*/
        8) && t5_value !== (t5_value = /*PPub*/
        ctx2[181].nama_jurnal + ""))
          set_data(t5, t5_value);
        if ((!current || dirty[0] & /*dataPPub*/
        8) && t7_value !== (t7_value = /*PPub*/
        ctx2[181].impact + ""))
          set_data(t7, t7_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_124(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*tahunBuku*/
          ctx[25]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_28*/
            ctx[147]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunBuku*/
        33554432 && to_number(input.value) !== /*tahunBuku*/
        ctx2[25]) {
          set_input_value(
            input,
            /*tahunBuku*/
            ctx2[25]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_113(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*JudulBuku*/
          ctx[26]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_29*/
            ctx[148]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*JudulBuku*/
        67108864 && input.value !== /*JudulBuku*/
        ctx2[26]) {
          set_input_value(
            input,
            /*JudulBuku*/
            ctx2[26]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_103(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*namaPenulisBuku*/
          ctx[27]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_30*/
            ctx[149]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*namaPenulisBuku*/
        134217728 && input.value !== /*namaPenulisBuku*/
        ctx2[27]) {
          set_input_value(
            input,
            /*namaPenulisBuku*/
            ctx2[27]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_93(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*PenerbitBuku*/
          ctx[28]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_31*/
            ctx[150]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*PenerbitBuku*/
        268435456 && input.value !== /*PenerbitBuku*/
        ctx2[28]) {
          set_input_value(
            input,
            /*PenerbitBuku*/
            ctx2[28]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_83(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*Isbn*/
          ctx[29]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_32*/
            ctx[151]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*Isbn*/
        536870912 && input.value !== /*Isbn*/
        ctx2[29]) {
          set_input_value(
            input,
            /*Isbn*/
            ctx2[29]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_73(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let hr;
    let t5;
    let div;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    field0 = new Field_default({
      props: {
        name: "Tahun",
        $$slots: { default: [create_default_slot_124] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Judul Buku",
        $$slots: { default: [create_default_slot_113] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Nama Penulis",
        $$slots: { default: [create_default_slot_103] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Penerbit",
        $$slots: { default: [create_default_slot_93] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "ISBN",
        $$slots: { default: [create_default_slot_83] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        hr = element("hr");
        t5 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        insert(target, hr, anchor);
        insert(target, t5, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*simpanPPB*/
            ctx[78]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*tahunBuku*/
        33554432 | dirty[6] & /*$$scope*/
        1024) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*JudulBuku*/
        67108864 | dirty[6] & /*$$scope*/
        1024) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*namaPenulisBuku*/
        134217728 | dirty[6] & /*$$scope*/
        1024) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*PenerbitBuku*/
        268435456 | dirty[6] & /*$$scope*/
        1024) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*Isbn*/
        536870912 | dirty[6] & /*$$scope*/
        1024) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(hr);
          detach(t5);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_header_slot_1(ctx) {
    let h4;
    return {
      c() {
        h4 = element("h4");
        h4.textContent = "Pengalaman Penulisan Buku";
        attr(h4, "class", "title is-4");
        attr(h4, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h4, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h4);
        }
      }
    };
  }
  function create_if_block_25(ctx) {
    let each_1_anchor;
    let current;
    let each_value_1 = ensure_array_like(
      /*dataPPB*/
      ctx[4]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*dataPPB*/
        16 | dirty[3] & /*delrowPPB*/
        1) {
          each_value_1 = ensure_array_like(
            /*dataPPB*/
            ctx2[4]
          );
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_12(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_12(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value_1.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_1.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_12(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_pid_value;
    let t0;
    let td1;
    let t1_value = (
      /*PPB*/
      ctx[178].tahun_buku + ""
    );
    let t1;
    let t2;
    let td2;
    let t3_value = (
      /*PPB*/
      ctx[178].judul_buku + ""
    );
    let t3;
    let t4;
    let td3;
    let t5_value = (
      /*PPB*/
      ctx[178].nama_penulis + ""
    );
    let t5;
    let t6;
    let td4;
    let t7_value = (
      /*PPB*/
      ctx[178].penerbit + ""
    );
    let t7;
    let t8;
    let td5;
    let t9_value = (
      /*PPB*/
      ctx[178].isbn + ""
    );
    let t9;
    let t10;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        t1 = text(t1_value);
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        td3 = element("td");
        t5 = text(t5_value);
        t6 = space();
        td4 = element("td");
        t7 = text(t7_value);
        t8 = space();
        td5 = element("td");
        t9 = text(t9_value);
        t10 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "pid", button_pid_value = /*PPB*/
        ctx[178].id);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(td1, t1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        append(tr, td3);
        append(td3, t5);
        append(tr, t6);
        append(tr, td4);
        append(td4, t7);
        append(tr, t8);
        append(tr, td5);
        append(td5, t9);
        append(tr, t10);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*delrowPPB*/
            ctx[93]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*dataPPB*/
        16 && button_pid_value !== (button_pid_value = /*PPB*/
        ctx2[178].id)) {
          attr(button, "pid", button_pid_value);
        }
        if ((!current || dirty[0] & /*dataPPB*/
        16) && t1_value !== (t1_value = /*PPB*/
        ctx2[178].tahun_buku + ""))
          set_data(t1, t1_value);
        if ((!current || dirty[0] & /*dataPPB*/
        16) && t3_value !== (t3_value = /*PPB*/
        ctx2[178].judul_buku + ""))
          set_data(t3, t3_value);
        if ((!current || dirty[0] & /*dataPPB*/
        16) && t5_value !== (t5_value = /*PPB*/
        ctx2[178].nama_penulis + ""))
          set_data(t5, t5_value);
        if ((!current || dirty[0] & /*dataPPB*/
        16) && t7_value !== (t7_value = /*PPB*/
        ctx2[178].penerbit + ""))
          set_data(t7, t7_value);
        if ((!current || dirty[0] & /*dataPPB*/
        16) && t9_value !== (t9_value = /*PPB*/
        ctx2[178].isbn + ""))
          set_data(t9, t9_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_63(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "number");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*tahunHKI*/
          ctx[30]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_33*/
            ctx[153]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunHKI*/
        1073741824 && to_number(input.value) !== /*tahunHKI*/
        ctx2[30]) {
          set_input_value(
            input,
            /*tahunHKI*/
            ctx2[30]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_53(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*JudulHKI*/
          ctx[31]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_34*/
            ctx[154]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*JudulHKI*/
        1 && input.value !== /*JudulHKI*/
        ctx2[31]) {
          set_input_value(
            input,
            /*JudulHKI*/
            ctx2[31]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_47(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*namaPenulisHKI*/
          ctx[32]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_35*/
            ctx[155]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*namaPenulisHKI*/
        2 && input.value !== /*namaPenulisHKI*/
        ctx2[32]) {
          set_input_value(
            input,
            /*namaPenulisHKI*/
            ctx2[32]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_310(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*jenisHKI*/
          ctx[33]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_36*/
            ctx[156]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*jenisHKI*/
        4 && input.value !== /*jenisHKI*/
        ctx2[33]) {
          set_input_value(
            input,
            /*jenisHKI*/
            ctx2[33]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_210(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*noHKI*/
          ctx[34]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_37*/
            ctx[157]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[1] & /*noHKI*/
        8 && input.value !== /*noHKI*/
        ctx2[34]) {
          set_input_value(
            input,
            /*noHKI*/
            ctx2[34]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_114(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let hr;
    let t5;
    let div;
    let p;
    let button;
    let current;
    let mounted;
    let dispose;
    field0 = new Field_default({
      props: {
        name: "Tahun",
        $$slots: { default: [create_default_slot_63] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Judul HKI",
        $$slots: { default: [create_default_slot_53] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Nama Penulis",
        $$slots: { default: [create_default_slot_47] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Penerbit",
        $$slots: { default: [create_default_slot_310] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "ISBN",
        $$slots: { default: [create_default_slot_210] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        hr = element("hr");
        t5 = space();
        div = element("div");
        p = element("p");
        button = element("button");
        button.textContent = "Simpan";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        insert(target, hr, anchor);
        insert(target, t5, anchor);
        insert(target, div, anchor);
        append(div, p);
        append(p, button);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*simpanPHKI*/
            ctx[77]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*tahunHKI*/
        1073741824 | dirty[6] & /*$$scope*/
        1024) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[1] & /*JudulHKI*/
        1 | dirty[6] & /*$$scope*/
        1024) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[1] & /*namaPenulisHKI*/
        2 | dirty[6] & /*$$scope*/
        1024) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[1] & /*jenisHKI*/
        4 | dirty[6] & /*$$scope*/
        1024) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[1] & /*noHKI*/
        8 | dirty[6] & /*$$scope*/
        1024) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(hr);
          detach(t5);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_header_slot2(ctx) {
    let h4;
    return {
      c() {
        h4 = element("h4");
        h4.textContent = "Pengalaman Hak Kekayaan Intelektual";
        attr(h4, "class", "title is-4");
        attr(h4, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h4, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h4);
        }
      }
    };
  }
  function create_if_block_19(ctx) {
    let each_1_anchor;
    let current;
    let each_value = ensure_array_like(
      /*dataPHKI*/
      ctx[5]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block11(get_each_context11(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*dataPHKI*/
        32 | dirty[3] & /*delrowPHKI*/
        2) {
          each_value = ensure_array_like(
            /*dataPHKI*/
            ctx2[5]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context11(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block11(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block11(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_pid_value;
    let t0;
    let td1;
    let t1_value = (
      /*PHKI*/
      ctx[175].tahun_hki + ""
    );
    let t1;
    let t2;
    let td2;
    let t3_value = (
      /*PHKI*/
      ctx[175].judul_hki + ""
    );
    let t3;
    let t4;
    let td3;
    let t5_value = (
      /*PHKI*/
      ctx[175].nama_penulis + ""
    );
    let t5;
    let t6;
    let td4;
    let t7_value = (
      /*PHKI*/
      ctx[175].jenis_hki + ""
    );
    let t7;
    let t8;
    let td5;
    let t9_value = (
      /*PHKI*/
      ctx[175].no_hki + ""
    );
    let t9;
    let t10;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        t1 = text(t1_value);
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        td3 = element("td");
        t5 = text(t5_value);
        t6 = space();
        td4 = element("td");
        t7 = text(t7_value);
        t8 = space();
        td5 = element("td");
        t9 = text(t9_value);
        t10 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "pid", button_pid_value = /*PHKI*/
        ctx[175].id);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(td1, t1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        append(tr, td3);
        append(td3, t5);
        append(tr, t6);
        append(tr, td4);
        append(td4, t7);
        append(tr, t8);
        append(tr, td5);
        append(td5, t9);
        append(tr, t10);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*delrowPHKI*/
            ctx[94]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*dataPHKI*/
        32 && button_pid_value !== (button_pid_value = /*PHKI*/
        ctx2[175].id)) {
          attr(button, "pid", button_pid_value);
        }
        if ((!current || dirty[0] & /*dataPHKI*/
        32) && t1_value !== (t1_value = /*PHKI*/
        ctx2[175].tahun_hki + ""))
          set_data(t1, t1_value);
        if ((!current || dirty[0] & /*dataPHKI*/
        32) && t3_value !== (t3_value = /*PHKI*/
        ctx2[175].judul_hki + ""))
          set_data(t3, t3_value);
        if ((!current || dirty[0] & /*dataPHKI*/
        32) && t5_value !== (t5_value = /*PHKI*/
        ctx2[175].nama_penulis + ""))
          set_data(t5, t5_value);
        if ((!current || dirty[0] & /*dataPHKI*/
        32) && t7_value !== (t7_value = /*PHKI*/
        ctx2[175].jenis_hki + ""))
          set_data(t7, t7_value);
        if ((!current || dirty[0] & /*dataPHKI*/
        32) && t9_value !== (t9_value = /*PHKI*/
        ctx2[175].no_hki + ""))
          set_data(t9, t9_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot13(ctx) {
    let h1;
    let t1;
    let div;
    let ul;
    let li0;
    let t3;
    let li1;
    let t5;
    let li2;
    let t7;
    let t8;
    let t9;
    let if_block2_anchor;
    let current;
    let mounted;
    let dispose;
    let if_block0 = (
      /*tab1*/
      ctx[68] === true && create_if_block_84(ctx)
    );
    let if_block1 = (
      /*tab2*/
      ctx[69] === true && create_if_block_74(ctx)
    );
    let if_block2 = (
      /*tab3*/
      ctx[70] === true && create_if_block13(ctx)
    );
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Profile";
        t1 = space();
        div = element("div");
        ul = element("ul");
        li0 = element("li");
        li0.innerHTML = `<a><span>Identitas</span></a>`;
        t3 = space();
        li1 = element("li");
        li1.innerHTML = `<a><span>Riwayat Pendidikan</span></a>`;
        t5 = space();
        li2 = element("li");
        li2.innerHTML = `<a><span>Pengalaman</span></a>`;
        t7 = space();
        if (if_block0)
          if_block0.c();
        t8 = space();
        if (if_block1)
          if_block1.c();
        t9 = space();
        if (if_block2)
          if_block2.c();
        if_block2_anchor = empty();
        attr(h1, "class", "title is-1");
        toggle_class(
          li0,
          "is-active",
          /*tab1*/
          ctx[68]
        );
        toggle_class(
          li1,
          "is-active",
          /*tab2*/
          ctx[69]
        );
        toggle_class(
          li2,
          "is-active",
          /*tab3*/
          ctx[70]
        );
        attr(div, "class", "tabs is-boxed");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, div, anchor);
        append(div, ul);
        append(ul, li0);
        append(ul, t3);
        append(ul, li1);
        append(ul, t5);
        append(ul, li2);
        insert(target, t7, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t8, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t9, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, if_block2_anchor, anchor);
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              li0,
              "click",
              /*clicktab1*/
              ctx[85]
            ),
            listen(
              li1,
              "click",
              /*clicktab2*/
              ctx[86]
            ),
            listen(
              li2,
              "click",
              /*clicktab3*/
              ctx[87]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[2] & /*tab1*/
        64) {
          toggle_class(
            li0,
            "is-active",
            /*tab1*/
            ctx2[68]
          );
        }
        if (!current || dirty[2] & /*tab2*/
        128) {
          toggle_class(
            li1,
            "is-active",
            /*tab2*/
            ctx2[69]
          );
        }
        if (!current || dirty[2] & /*tab3*/
        256) {
          toggle_class(
            li2,
            "is-active",
            /*tab3*/
            ctx2[70]
          );
        }
        if (
          /*tab1*/
          ctx2[68] === true
        ) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
            if (dirty[2] & /*tab1*/
            64) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_84(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(t8.parentNode, t8);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        if (
          /*tab2*/
          ctx2[69] === true
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_74(ctx2);
            if_block1.c();
            if_block1.m(t9.parentNode, t9);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (
          /*tab3*/
          ctx2[70] === true
        ) {
          if (if_block2) {
            if_block2.p(ctx2, dirty);
            if (dirty[2] & /*tab3*/
            256) {
              transition_in(if_block2, 1);
            }
          } else {
            if_block2 = create_if_block13(ctx2);
            if_block2.c();
            transition_in(if_block2, 1);
            if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
          }
        } else if (if_block2) {
          group_outros();
          transition_out(if_block2, 1, 1, () => {
            if_block2 = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block0);
        transition_in(if_block2);
        current = true;
      },
      o(local) {
        transition_out(if_block0);
        transition_out(if_block2);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(div);
          detach(t7);
          detach(t8);
          detach(t9);
          detach(if_block2_anchor);
        }
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
        if (if_block2)
          if_block2.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_fragment35(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot13] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty[0] & /*dataPHKI, tahunHKI, dataPPB, Isbn, PenerbitBuku, namaPenulisBuku, JudulBuku, tahunBuku, dataPPub, impactFactor, namaJurnal, judulPublikasi, tahunPublikasi, dataPD, namaPertemuanDiseminasi, namaPemakalahDiseminasi, judulDiseminasi, tahunDiseminasi, dataPM, biayaPengmas, sumberDanaPengmas, rolePengmas, judulPengmas, tahunPengmas, dataPP, biayaPenelitian, sumberDanaPenelitian, rolePenelitian, judulPenelitian, tahunPenelitian, vmataKuliah*/
        2147483647 | dirty[1] & /*noHKI, jenisHKI, namaPenulisHKI, JudulHKI, judulTugasAkhirS3, judulTugasAkhirS2, judulTugasAkhirS1, tahunLulusS3, tahunLulusS2, tahunLulusS1, tahunMasukS3, tahunMasukS2, tahunMasukS1, bidangIlmuS3, bidangIlmuS2, bidangIlmuS1, pertiS3, pertiS2, pertiS1, mataKuliah, email, telpFaxKantor, alamatKantor, nomorHandphone, telpFaxRumah, alamatRumah, tempatLahir, nidn, nip, jabatanFungsional, namaLengkap*/
        2147483647 | dirty[2] & /*showModalHKI, showModalPenulisanBuku, showModalPublikasi, showModalDiseminasi, showModalPengmas, showModalPenelitian, tab3, tab2, tab1*/
        511 | dirty[6] & /*$$scope*/
        1024) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function formatRupiah2(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(), split = number_string.split(","), sisa = split[0].length % 3, rupiah = split[0].substr(0, sisa), ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== void 0 ? rupiah + "," + split[1] : rupiah;
    return prefix === void 0 ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }
  function instance27($$self, $$props, $$invalidate) {
    let $apiURL;
    let $route;
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(163, $apiURL = $$value));
    component_subscribe($$self, route, ($$value) => $$invalidate(164, $route = $$value));
    const id = localStorage.getItem("id");
    let items;
    let data2, dataPP, dataPM, dataPD, dataPPub, dataPPB, dataPHKI;
    let vmataKuliah;
    let biayaPenelitian, tahunPenelitian, judulPenelitian, rolePenelitian, sumberDanaPenelitian;
    let biayaPengmas, tahunPengmas, judulPengmas, rolePengmas, sumberDanaPengmas;
    let tahunDiseminasi, judulDiseminasi, namaPemakalahDiseminasi, namaPertemuanDiseminasi;
    let tahunPublikasi, judulPublikasi, namaJurnal, impactFactor;
    let tahunBuku, JudulBuku, namaPenulisBuku, PenerbitBuku, Isbn;
    let tahunHKI, JudulHKI, namaPenulisHKI, jenisHKI, noHKI;
    let idProfile, idUser, namaLengkap, jabatanFungsional, nip, nidn, tempatLahir, tanggalLahir, alamatRumah, telpFaxRumah, nomorHandphone, alamatKantor, telpFaxKantor, email, mataKuliah = [];
    let pertiS1, pertiS2, pertiS3, bidangIlmuS1, bidangIlmuS2, bidangIlmuS3, tahunMasukS1, tahunMasukS2, tahunMasukS3, tahunLulusS1, tahunLulusS2, tahunLulusS3, judulTugasAkhirS1, judulTugasAkhirS2, judulTugasAkhirS3;
    let showModalPenelitian = false;
    let showModalPengmas = false;
    let showModalDiseminasi = false;
    let showModalPublikasi = false;
    let showModalPenulisanBuku = false;
    let showModalHKI = false;
    async function clickModalPenelitian() {
      $$invalidate(62, showModalPenelitian = true);
    }
    async function clickModalPengmas() {
      $$invalidate(63, showModalPengmas = true);
    }
    async function clickModalDiseminasi() {
      $$invalidate(64, showModalDiseminasi = true);
    }
    async function clickModalPublikasi() {
      $$invalidate(65, showModalPublikasi = true);
    }
    async function clickModalPenulisanBuku() {
      $$invalidate(66, showModalPenulisanBuku = true);
    }
    async function clickModalHKI() {
      $$invalidate(67, showModalHKI = true);
    }
    const accessToken = localStorage.getItem("token");
    const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json"
    };
    onMount(async () => {
      const response = await fetch($apiURL + "/user/" + id, { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        data2 = result;
        idProfile = data2.id;
        idUser = data2.uid;
        $$invalidate(35, namaLengkap = data2.nama_lengkap);
        $$invalidate(36, jabatanFungsional = data2.jabatan_fungsional);
        $$invalidate(37, nip = data2.nip);
        $$invalidate(38, nidn = data2.nidn);
        $$invalidate(39, tempatLahir = data2.tempat_lahir);
        tanggalLahir = data2.tanggal_lahir;
        $$invalidate(40, alamatRumah = data2.alamat_rumah);
        $$invalidate(41, telpFaxRumah = data2.telp_fax_rumah);
        $$invalidate(42, nomorHandphone = data2.nomor_handphone);
        $$invalidate(43, alamatKantor = data2.alamat_kantor);
        $$invalidate(44, telpFaxKantor = data2.telp_fax_kantor);
        $$invalidate(45, email = data2.email);
        $$invalidate(46, mataKuliah = data2.mata_kuliah);
      }
      const responseRP = await fetch($apiURL + "/riwayatpendidikan/" + id, { method: "GET", headers });
      const dataRP = await responseRP.json();
      if (responseRP.ok) {
        $$invalidate(47, pertiS1 = dataRP.nama_perti_s1);
        $$invalidate(48, pertiS2 = dataRP.nama_perti_s2);
        $$invalidate(49, pertiS3 = dataRP.nama_perti_s3);
        $$invalidate(50, bidangIlmuS1 = dataRP.bidang_ilmu_s1);
        $$invalidate(51, bidangIlmuS2 = dataRP.bidang_ilmu_s2);
        $$invalidate(52, bidangIlmuS3 = dataRP.bidang_ilmu_s3);
        $$invalidate(53, tahunMasukS1 = dataRP.tahun_masuk_s1);
        $$invalidate(54, tahunMasukS2 = dataRP.tahun_masuk_s2);
        $$invalidate(55, tahunMasukS3 = dataRP.tahun_masuk_s3);
        $$invalidate(56, tahunLulusS1 = dataRP.tahun_lulus_s1);
        $$invalidate(57, tahunLulusS2 = dataRP.tahun_lulus_s2);
        $$invalidate(58, tahunLulusS3 = dataRP.tahun_lulus_s3);
        $$invalidate(59, judulTugasAkhirS1 = dataRP.judul_tugasakhir_s1);
        $$invalidate(60, judulTugasAkhirS2 = dataRP.judul_tugasakhir_s2);
        $$invalidate(61, judulTugasAkhirS3 = dataRP.judul_tugasakhir_s3);
      }
      getPengalamanPenelitian();
      getPengalamanPengmas();
      getPengalamanDiseminasi();
      getPengalamanPublikasi();
      getPengalamanPenulisanBuku();
      getPengalamanHKI();
    });
    async function getPengalamanPenelitian() {
      const responsePP = await fetch($apiURL + "/pengalamanPenelitian/" + id, { method: "GET", headers });
      const resultPP = await responsePP.json();
      if (responsePP.ok) {
        $$invalidate(0, dataPP = resultPP.dbData);
      } else {
        console.log(responsePP);
      }
    }
    async function getPengalamanPengmas() {
      const responsePM = await fetch($apiURL + "/pengalamanPengmas/" + id, { method: "GET", headers });
      const resultPM = await responsePM.json();
      if (responsePM.ok) {
        $$invalidate(1, dataPM = resultPM.dbData);
      } else {
        console.log(responsePM);
      }
    }
    async function getPengalamanDiseminasi() {
      const responsePD = await fetch($apiURL + "/pengalamanDiseminasi/" + id, { method: "GET", headers });
      const resultPD = await responsePD.json();
      if (responsePD.ok) {
        $$invalidate(2, dataPD = resultPD.dbData);
      } else {
        console.log(responsePD);
      }
    }
    async function getPengalamanPublikasi() {
      const responsePPub = await fetch($apiURL + "/pengalamanPublikasi/" + id, { method: "GET", headers });
      const resultPPub = await responsePPub.json();
      if (responsePPub.ok) {
        $$invalidate(3, dataPPub = resultPPub.dbData);
      } else {
        console.log(responsePPub);
      }
    }
    async function getPengalamanPenulisanBuku() {
      const responsePPB = await fetch($apiURL + "/pengalamanPenulisanBuku/" + id, { method: "GET", headers });
      const resultPPB = await responsePPB.json();
      if (responsePPB.ok) {
        $$invalidate(4, dataPPB = resultPPB.dbData);
      } else {
        console.log(responsePPB);
      }
    }
    async function getPengalamanHKI() {
      const responsePHKI = await fetch($apiURL + "/pengalamanHKI/" + id, { method: "GET", headers });
      const resultPHKI = await responsePHKI.json();
      if (responsePHKI.ok) {
        $$invalidate(5, dataPHKI = resultPHKI.dbData);
      } else {
        console.log(responsePHKI);
      }
    }
    async function simpanPHKI() {
      const payload = {
        tahunHKI,
        JudulHKI,
        namaPenulisHKI,
        jenisHKI,
        noHKI,
        id
      };
      const response = await fetch($apiURL + "/pengalamanHKI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(67, showModalHKI = false);
        $$invalidate(30, tahunHKI = "");
        $$invalidate(31, JudulHKI = "");
        $$invalidate(32, namaPenulisHKI = "");
        $$invalidate(33, jenisHKI = "");
        $$invalidate(34, noHKI = "");
        getPengalamanHKI();
      } else {
        console.log(response);
      }
    }
    async function simpanPPB() {
      const payload = {
        tahunBuku,
        JudulBuku,
        namaPenulisBuku,
        PenerbitBuku,
        Isbn,
        id
      };
      const response = await fetch($apiURL + "/pengalamanPenulisanBuku", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(66, showModalPenulisanBuku = false);
        $$invalidate(25, tahunBuku = "");
        $$invalidate(26, JudulBuku = "");
        $$invalidate(27, namaPenulisBuku = "");
        $$invalidate(28, PenerbitBuku = "");
        $$invalidate(29, Isbn = "");
        getPengalamanPenulisanBuku();
      } else {
        console.log(response);
      }
    }
    async function simpanPPublikasi() {
      const payload = {
        tahunPublikasi,
        judulPublikasi,
        namaJurnal,
        impactFactor,
        id
      };
      const response = await fetch($apiURL + "/pengalamanPublikasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(65, showModalPublikasi = false);
        $$invalidate(21, tahunPublikasi = "");
        $$invalidate(22, judulPublikasi = "");
        $$invalidate(23, namaJurnal = "");
        $$invalidate(24, impactFactor = "");
        getPengalamanPublikasi();
      } else {
        console.log(response);
      }
    }
    async function simpanPP() {
      const payload = {
        tahunPenelitian,
        judulPenelitian,
        rolePenelitian,
        sumberDanaPenelitian,
        biayaPenelitian,
        id
      };
      const response = await fetch($apiURL + "/pengalamanPenelitian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(62, showModalPenelitian = false);
        $$invalidate(8, tahunPenelitian = "");
        $$invalidate(9, judulPenelitian = "");
        $$invalidate(10, rolePenelitian = "");
        $$invalidate(11, sumberDanaPenelitian = "");
        $$invalidate(7, biayaPenelitian = "");
        getPengalamanPenelitian();
      } else {
        console.log(response);
      }
    }
    async function simpanPM() {
      const payload = {
        tahunPengmas,
        judulPengmas,
        rolePengmas,
        sumberDanaPengmas,
        biayaPengmas,
        id
      };
      const response = await fetch($apiURL + "/pengalamanPengmas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(63, showModalPengmas = false);
        $$invalidate(13, tahunPengmas = "");
        $$invalidate(14, judulPengmas = "");
        $$invalidate(15, rolePengmas = "");
        $$invalidate(16, sumberDanaPengmas = "");
        $$invalidate(12, biayaPengmas = "");
        getPengalamanPengmas();
      } else {
        console.log(response);
      }
    }
    async function simpanPD() {
      const payload = {
        tahunDiseminasi,
        judulDiseminasi,
        namaPemakalahDiseminasi,
        namaPertemuanDiseminasi,
        id
      };
      const response = await fetch($apiURL + "/pengalamanDiseminasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(64, showModalDiseminasi = false);
        $$invalidate(17, tahunDiseminasi = "");
        $$invalidate(18, judulDiseminasi = "");
        $$invalidate(19, namaPemakalahDiseminasi = "");
        $$invalidate(20, namaPertemuanDiseminasi = "");
        getPengalamanDiseminasi();
      } else {
        console.log(response);
      }
    }
    async function simpanRiwayatPendidikan() {
      const payload = {
        pertiS1,
        pertiS2,
        pertiS3,
        bidangIlmuS1,
        bidangIlmuS2,
        bidangIlmuS3,
        tahunMasukS1,
        tahunMasukS2,
        tahunMasukS3,
        tahunLulusS1,
        tahunLulusS2,
        tahunLulusS3,
        judulTugasAkhirS1,
        judulTugasAkhirS2,
        judulTugasAkhirS3,
        id
      };
      const response = await fetch($apiURL + "/riwayatpendidikan", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    async function simpanIdentitas() {
      const payload = {
        idProfile,
        namaLengkap,
        jabatanFungsional,
        nip,
        nidn,
        tempatLahir,
        tanggalLahir,
        alamatRumah,
        telpFaxRumah,
        nomorHandphone,
        alamatKantor,
        telpFaxKantor,
        email,
        mataKuliah
      };
      const response = await fetch($apiURL + "/userprofile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    let tab1 = true;
    let tab2;
    let tab3;
    function clicktab1() {
      $$invalidate(68, tab1 = true);
      $$invalidate(69, tab2 = false);
      $$invalidate(70, tab3 = false);
    }
    function clicktab2() {
      $$invalidate(68, tab1 = false);
      $$invalidate(69, tab2 = true);
      $$invalidate(70, tab3 = false);
    }
    function clicktab3() {
      $$invalidate(68, tab1 = false);
      $$invalidate(69, tab2 = false);
      $$invalidate(70, tab3 = true);
    }
    function addMatkul() {
      let addVmatkul = { label: vmataKuliah };
      $$invalidate(46, mataKuliah = [...mataKuliah, addVmatkul]);
      $$invalidate(6, vmataKuliah = "");
    }
    async function delrowPP(ev) {
      let idPP = ev.target.getAttribute("pid");
      const response = await fetch($apiURL + "/pengalamanPenelitian/" + idPP, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        getPengalamanPenelitian();
      } else {
        console.log(response);
      }
    }
    async function delrowPM(ev) {
      let idPM = ev.target.getAttribute("pid");
      const response = await fetch($apiURL + "/pengalamanPengmas/" + idPM, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        getPengalamanPengmas();
      } else {
        console.log(response);
      }
    }
    async function delrowPD(ev) {
      let idPD = ev.target.getAttribute("pid");
      const response = await fetch($apiURL + "/pengalamanDiseminasi/" + idPD, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        getPengalamanDiseminasi();
      } else {
        console.log(response);
      }
    }
    async function delrowPPub(ev) {
      let idPPub = ev.target.getAttribute("pid");
      const response = await fetch($apiURL + "/pengalamanPublikasi/" + idPPub, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        getPengalamanPublikasi();
      } else {
        console.log(response);
      }
    }
    async function delrowPPB(ev) {
      let idPPB = ev.target.getAttribute("pid");
      const response = await fetch($apiURL + "/pengalamanPenulisanBuku/" + idPPB, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        getPengalamanPenulisanBuku();
      } else {
        console.log(response);
      }
    }
    async function delrowPHKI(ev) {
      let idPHKI = ev.target.getAttribute("pid");
      const response = await fetch($apiURL + "/pengalamanHKI/" + idPHKI, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        getPengalamanHKI();
      } else {
        console.log(response);
      }
    }
    function deleteMatkul(e) {
      let delMatkul = e.target.getAttribute("data-value");
      $$invalidate(46, mataKuliah = mataKuliah.filter((matkul) => {
        return matkul.label !== delMatkul;
      }));
    }
    function input_input_handler() {
      namaLengkap = this.value;
      $$invalidate(35, namaLengkap);
    }
    function input_input_handler_1() {
      jabatanFungsional = this.value;
      $$invalidate(36, jabatanFungsional);
    }
    function input_input_handler_2() {
      nip = to_number(this.value);
      $$invalidate(37, nip);
    }
    function input_input_handler_3() {
      nidn = to_number(this.value);
      $$invalidate(38, nidn);
    }
    function input_input_handler_4() {
      tempatLahir = this.value;
      $$invalidate(39, tempatLahir);
    }
    function input_input_handler_5() {
      alamatRumah = this.value;
      $$invalidate(40, alamatRumah);
    }
    function input_input_handler_6() {
      telpFaxRumah = to_number(this.value);
      $$invalidate(41, telpFaxRumah);
    }
    function input_input_handler_7() {
      nomorHandphone = to_number(this.value);
      $$invalidate(42, nomorHandphone);
    }
    function input_input_handler_8() {
      alamatKantor = this.value;
      $$invalidate(43, alamatKantor);
    }
    function input_input_handler_9() {
      telpFaxKantor = to_number(this.value);
      $$invalidate(44, telpFaxKantor);
    }
    function input_input_handler_10() {
      email = this.value;
      $$invalidate(45, email);
    }
    function input_input_handler_11() {
      vmataKuliah = this.value;
      $$invalidate(6, vmataKuliah);
    }
    function input0_input_handler() {
      pertiS1 = this.value;
      $$invalidate(47, pertiS1);
    }
    function input1_input_handler() {
      pertiS2 = this.value;
      $$invalidate(48, pertiS2);
    }
    function input2_input_handler() {
      pertiS3 = this.value;
      $$invalidate(49, pertiS3);
    }
    function input3_input_handler() {
      bidangIlmuS1 = this.value;
      $$invalidate(50, bidangIlmuS1);
    }
    function input4_input_handler() {
      bidangIlmuS2 = this.value;
      $$invalidate(51, bidangIlmuS2);
    }
    function input5_input_handler() {
      bidangIlmuS3 = this.value;
      $$invalidate(52, bidangIlmuS3);
    }
    function input6_input_handler() {
      tahunMasukS1 = to_number(this.value);
      $$invalidate(53, tahunMasukS1);
    }
    function input7_input_handler() {
      tahunMasukS2 = to_number(this.value);
      $$invalidate(54, tahunMasukS2);
    }
    function input8_input_handler() {
      tahunMasukS3 = to_number(this.value);
      $$invalidate(55, tahunMasukS3);
    }
    function input9_input_handler() {
      tahunLulusS1 = to_number(this.value);
      $$invalidate(56, tahunLulusS1);
    }
    function input10_input_handler() {
      tahunLulusS2 = to_number(this.value);
      $$invalidate(57, tahunLulusS2);
    }
    function input11_input_handler() {
      tahunLulusS3 = to_number(this.value);
      $$invalidate(58, tahunLulusS3);
    }
    function textarea0_input_handler() {
      judulTugasAkhirS1 = this.value;
      $$invalidate(59, judulTugasAkhirS1);
    }
    function textarea1_input_handler() {
      judulTugasAkhirS2 = this.value;
      $$invalidate(60, judulTugasAkhirS2);
    }
    function textarea2_input_handler() {
      judulTugasAkhirS3 = this.value;
      $$invalidate(61, judulTugasAkhirS3);
    }
    function input_input_handler_12() {
      tahunPenelitian = to_number(this.value);
      $$invalidate(8, tahunPenelitian);
    }
    function input_input_handler_13() {
      judulPenelitian = this.value;
      $$invalidate(9, judulPenelitian);
    }
    function select_change_handler() {
      rolePenelitian = select_value(this);
      $$invalidate(10, rolePenelitian);
    }
    function input_input_handler_14() {
      sumberDanaPenelitian = this.value;
      $$invalidate(11, sumberDanaPenelitian);
    }
    function input_input_handler_15() {
      biayaPenelitian = this.value;
      $$invalidate(7, biayaPenelitian);
    }
    const keyup_handler = () => $$invalidate(7, biayaPenelitian = formatRupiah2(biayaPenelitian, "Rp. "));
    function modal0_show_binding(value) {
      showModalPenelitian = value;
      $$invalidate(62, showModalPenelitian);
    }
    function input_input_handler_16() {
      tahunPengmas = to_number(this.value);
      $$invalidate(13, tahunPengmas);
    }
    function input_input_handler_17() {
      judulPengmas = this.value;
      $$invalidate(14, judulPengmas);
    }
    function select_change_handler_1() {
      rolePengmas = select_value(this);
      $$invalidate(15, rolePengmas);
    }
    function input_input_handler_18() {
      sumberDanaPengmas = this.value;
      $$invalidate(16, sumberDanaPengmas);
    }
    function input_input_handler_19() {
      biayaPengmas = this.value;
      $$invalidate(12, biayaPengmas);
    }
    const keyup_handler_1 = () => $$invalidate(12, biayaPengmas = formatRupiah2(biayaPengmas, "Rp. "));
    function modal1_show_binding(value) {
      showModalPengmas = value;
      $$invalidate(63, showModalPengmas);
    }
    function input_input_handler_20() {
      tahunDiseminasi = to_number(this.value);
      $$invalidate(17, tahunDiseminasi);
    }
    function input_input_handler_21() {
      judulDiseminasi = this.value;
      $$invalidate(18, judulDiseminasi);
    }
    function input_input_handler_22() {
      namaPemakalahDiseminasi = this.value;
      $$invalidate(19, namaPemakalahDiseminasi);
    }
    function input_input_handler_23() {
      namaPertemuanDiseminasi = this.value;
      $$invalidate(20, namaPertemuanDiseminasi);
    }
    function modal2_show_binding(value) {
      showModalDiseminasi = value;
      $$invalidate(64, showModalDiseminasi);
    }
    function input_input_handler_24() {
      tahunPublikasi = to_number(this.value);
      $$invalidate(21, tahunPublikasi);
    }
    function input_input_handler_25() {
      judulPublikasi = this.value;
      $$invalidate(22, judulPublikasi);
    }
    function input_input_handler_26() {
      namaJurnal = this.value;
      $$invalidate(23, namaJurnal);
    }
    function input_input_handler_27() {
      impactFactor = this.value;
      $$invalidate(24, impactFactor);
    }
    function modal3_show_binding(value) {
      showModalPublikasi = value;
      $$invalidate(65, showModalPublikasi);
    }
    function input_input_handler_28() {
      tahunBuku = to_number(this.value);
      $$invalidate(25, tahunBuku);
    }
    function input_input_handler_29() {
      JudulBuku = this.value;
      $$invalidate(26, JudulBuku);
    }
    function input_input_handler_30() {
      namaPenulisBuku = this.value;
      $$invalidate(27, namaPenulisBuku);
    }
    function input_input_handler_31() {
      PenerbitBuku = this.value;
      $$invalidate(28, PenerbitBuku);
    }
    function input_input_handler_32() {
      Isbn = this.value;
      $$invalidate(29, Isbn);
    }
    function modal4_show_binding(value) {
      showModalPenulisanBuku = value;
      $$invalidate(66, showModalPenulisanBuku);
    }
    function input_input_handler_33() {
      tahunHKI = to_number(this.value);
      $$invalidate(30, tahunHKI);
    }
    function input_input_handler_34() {
      JudulHKI = this.value;
      $$invalidate(31, JudulHKI);
    }
    function input_input_handler_35() {
      namaPenulisHKI = this.value;
      $$invalidate(32, namaPenulisHKI);
    }
    function input_input_handler_36() {
      jenisHKI = this.value;
      $$invalidate(33, jenisHKI);
    }
    function input_input_handler_37() {
      noHKI = this.value;
      $$invalidate(34, noHKI);
    }
    function modal5_show_binding(value) {
      showModalHKI = value;
      $$invalidate(67, showModalHKI);
    }
    return [
      dataPP,
      dataPM,
      dataPD,
      dataPPub,
      dataPPB,
      dataPHKI,
      vmataKuliah,
      biayaPenelitian,
      tahunPenelitian,
      judulPenelitian,
      rolePenelitian,
      sumberDanaPenelitian,
      biayaPengmas,
      tahunPengmas,
      judulPengmas,
      rolePengmas,
      sumberDanaPengmas,
      tahunDiseminasi,
      judulDiseminasi,
      namaPemakalahDiseminasi,
      namaPertemuanDiseminasi,
      tahunPublikasi,
      judulPublikasi,
      namaJurnal,
      impactFactor,
      tahunBuku,
      JudulBuku,
      namaPenulisBuku,
      PenerbitBuku,
      Isbn,
      tahunHKI,
      JudulHKI,
      namaPenulisHKI,
      jenisHKI,
      noHKI,
      namaLengkap,
      jabatanFungsional,
      nip,
      nidn,
      tempatLahir,
      alamatRumah,
      telpFaxRumah,
      nomorHandphone,
      alamatKantor,
      telpFaxKantor,
      email,
      mataKuliah,
      pertiS1,
      pertiS2,
      pertiS3,
      bidangIlmuS1,
      bidangIlmuS2,
      bidangIlmuS3,
      tahunMasukS1,
      tahunMasukS2,
      tahunMasukS3,
      tahunLulusS1,
      tahunLulusS2,
      tahunLulusS3,
      judulTugasAkhirS1,
      judulTugasAkhirS2,
      judulTugasAkhirS3,
      showModalPenelitian,
      showModalPengmas,
      showModalDiseminasi,
      showModalPublikasi,
      showModalPenulisanBuku,
      showModalHKI,
      tab1,
      tab2,
      tab3,
      clickModalPenelitian,
      clickModalPengmas,
      clickModalDiseminasi,
      clickModalPublikasi,
      clickModalPenulisanBuku,
      clickModalHKI,
      simpanPHKI,
      simpanPPB,
      simpanPPublikasi,
      simpanPP,
      simpanPM,
      simpanPD,
      simpanRiwayatPendidikan,
      simpanIdentitas,
      clicktab1,
      clicktab2,
      clicktab3,
      addMatkul,
      delrowPP,
      delrowPM,
      delrowPD,
      delrowPPub,
      delrowPPB,
      delrowPHKI,
      deleteMatkul,
      input_input_handler,
      input_input_handler_1,
      input_input_handler_2,
      input_input_handler_3,
      input_input_handler_4,
      input_input_handler_5,
      input_input_handler_6,
      input_input_handler_7,
      input_input_handler_8,
      input_input_handler_9,
      input_input_handler_10,
      input_input_handler_11,
      input0_input_handler,
      input1_input_handler,
      input2_input_handler,
      input3_input_handler,
      input4_input_handler,
      input5_input_handler,
      input6_input_handler,
      input7_input_handler,
      input8_input_handler,
      input9_input_handler,
      input10_input_handler,
      input11_input_handler,
      textarea0_input_handler,
      textarea1_input_handler,
      textarea2_input_handler,
      input_input_handler_12,
      input_input_handler_13,
      select_change_handler,
      input_input_handler_14,
      input_input_handler_15,
      keyup_handler,
      modal0_show_binding,
      input_input_handler_16,
      input_input_handler_17,
      select_change_handler_1,
      input_input_handler_18,
      input_input_handler_19,
      keyup_handler_1,
      modal1_show_binding,
      input_input_handler_20,
      input_input_handler_21,
      input_input_handler_22,
      input_input_handler_23,
      modal2_show_binding,
      input_input_handler_24,
      input_input_handler_25,
      input_input_handler_26,
      input_input_handler_27,
      modal3_show_binding,
      input_input_handler_28,
      input_input_handler_29,
      input_input_handler_30,
      input_input_handler_31,
      input_input_handler_32,
      modal4_show_binding,
      input_input_handler_33,
      input_input_handler_34,
      input_input_handler_35,
      input_input_handler_36,
      input_input_handler_37,
      modal5_show_binding
    ];
  }
  var Profile2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance27, create_fragment35, safe_not_equal, {}, null, [-1, -1, -1, -1, -1, -1, -1]);
    }
  };
  var profile_default2 = Profile2;

  // src/pages/dosen/proposal.svelte
  init_define_process();
  function get_each_context12(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[34] = list[i];
    return child_ctx;
  }
  function create_default_slot_115(ctx) {
    let div;
    let select;
    let option0;
    let option1;
    let option2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Pilih Jenis Proposal";
        option1 = element("option");
        option1.textContent = "Proposal Awal";
        option2 = element("option");
        option2.textContent = "Proposal Lanjutan";
        option0.__value = "";
        set_input_value(option0, option0.__value);
        option0.selected = true;
        option0.disabled = true;
        option0.hidden = true;
        option1.__value = "Proposal Awal";
        set_input_value(option1, option1.__value);
        option2.__value = "Proposal Lanjutan";
        set_input_value(option2, option2.__value);
        if (
          /*jenisProposal*/
          ctx[1] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler*/
            ctx[16].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        select_option(
          select,
          /*jenisProposal*/
          ctx[1],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler*/
            ctx[16]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisProposal*/
        2) {
          select_option(
            select,
            /*jenisProposal*/
            ctx2[1]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_104(ctx) {
    let div;
    let select;
    let option0;
    let option1;
    let option2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Pilih Jenis Kegiatan";
        option1 = element("option");
        option1.textContent = "Penelitian";
        option2 = element("option");
        option2.textContent = "Pengabdian Masyarakat";
        option0.__value = "";
        set_input_value(option0, option0.__value);
        option0.selected = true;
        option0.disabled = true;
        option0.hidden = true;
        option1.__value = "Penelitian";
        set_input_value(option1, option1.__value);
        option2.__value = "Pengabdian Masyarakat";
        set_input_value(option2, option2.__value);
        if (
          /*jenisKegiatan*/
          ctx[0] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler_1*/
            ctx[17].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        select_option(
          select,
          /*jenisKegiatan*/
          ctx[0],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler_1*/
            ctx[17]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisKegiatan*/
        1) {
          select_option(
            select,
            /*jenisKegiatan*/
            ctx2[0]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_else_block5(ctx) {
    let option0;
    let option1;
    let option2;
    let option3;
    return {
      c() {
        option0 = element("option");
        option0.textContent = "Pengabdian Masyarakat Desa Binaan";
        option1 = element("option");
        option1.textContent = "Pengabdian Masyarakat UMKM Binaan";
        option2 = element("option");
        option2.textContent = "Pengabdian Masyarakat Mandiri";
        option3 = element("option");
        option3.textContent = "Pengabdian Masyarakat Hibah Eksternal";
        option0.__value = "Pengabdian Masyarakat Desa Binaan";
        set_input_value(option0, option0.__value);
        option1.__value = "Pengabdian Masyarakat UMKM Binaan";
        set_input_value(option1, option1.__value);
        option2.__value = "Pengabdian Masyarakat Mandiri";
        set_input_value(option2, option2.__value);
        option3.__value = "Pengabdian Masyarakat Hibah Eksternal";
        set_input_value(option3, option3.__value);
      },
      m(target, anchor) {
        insert(target, option0, anchor);
        insert(target, option1, anchor);
        insert(target, option2, anchor);
        insert(target, option3, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(option0);
          detach(option1);
          detach(option2);
          detach(option3);
        }
      }
    };
  }
  function create_if_block_110(ctx) {
    let option0;
    let option1;
    let option2;
    let option3;
    let option4;
    return {
      c() {
        option0 = element("option");
        option0.textContent = "Riset Kelompok Keahlian";
        option1 = element("option");
        option1.textContent = "Riset Terapan";
        option2 = element("option");
        option2.textContent = "Riset Kerjasama";
        option3 = element("option");
        option3.textContent = "Riset Mandiri";
        option4 = element("option");
        option4.textContent = "Riset Eksternal";
        option0.__value = "Riset Kelompok Keahlian";
        set_input_value(option0, option0.__value);
        option1.__value = "Riset Terapan";
        set_input_value(option1, option1.__value);
        option2.__value = "Riset Kerjasama";
        set_input_value(option2, option2.__value);
        option3.__value = "Riset Mandiri";
        set_input_value(option3, option3.__value);
        option4.__value = "Riset Eksternal";
        set_input_value(option4, option4.__value);
      },
      m(target, anchor) {
        insert(target, option0, anchor);
        insert(target, option1, anchor);
        insert(target, option2, anchor);
        insert(target, option3, anchor);
        insert(target, option4, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(option0);
          detach(option1);
          detach(option2);
          detach(option3);
          detach(option4);
        }
      }
    };
  }
  function create_default_slot_94(ctx) {
    let div;
    let select;
    let option;
    let mounted;
    let dispose;
    function select_block_type(ctx2, dirty) {
      if (
        /*jenisKegiatan*/
        ctx2[0] === "Penelitian"
      )
        return create_if_block_110;
      return create_else_block5;
    }
    let current_block_type = select_block_type(ctx, [-1, -1]);
    let if_block = current_block_type(ctx);
    return {
      c() {
        div = element("div");
        select = element("select");
        option = element("option");
        option.textContent = "Pilih Jenis Skema\r\n            ";
        if_block.c();
        option.__value = "";
        set_input_value(option, option.__value);
        option.selected = true;
        option.disabled = true;
        option.hidden = true;
        if (
          /*jenisSkema*/
          ctx[2] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler_2*/
            ctx[18].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option);
        if_block.m(select, null);
        select_option(
          select,
          /*jenisSkema*/
          ctx[2],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler_2*/
            ctx[18]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (current_block_type !== (current_block_type = select_block_type(ctx2, dirty))) {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(select, null);
          }
        }
        if (dirty[0] & /*jenisSkema*/
        4) {
          select_option(
            select,
            /*jenisSkema*/
            ctx2[2]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if_block.d();
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_84(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Kelompok Keahlian");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*kelompokKeahlian*/
          ctx[3]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[19]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*kelompokKeahlian*/
        8 && input.value !== /*kelompokKeahlian*/
        ctx2[3]) {
          set_input_value(
            input,
            /*kelompokKeahlian*/
            ctx2[3]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_74(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Topik");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*topik*/
          ctx[6]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_1*/
            ctx[20]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*topik*/
        64 && input.value !== /*topik*/
        ctx2[6]) {
          set_input_value(
            input,
            /*topik*/
            ctx2[6]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_64(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Biaya Penelitian");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*biayaPenelitian*/
          ctx[7]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler_2*/
              ctx[22]
            ),
            listen(
              input,
              "keyup",
              /*keyup_handler*/
              ctx[23]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*biayaPenelitian*/
        128 && input.value !== /*biayaPenelitian*/
        ctx2[7]) {
          set_input_value(
            input,
            /*biayaPenelitian*/
            ctx2[7]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_54(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "accept", ".xlsx");
        attr(input, "type", "file");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        if (!mounted) {
          dispose = listen(
            input,
            "change",
            /*change_handler*/
            ctx[24]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_48(ctx) {
    let select;
    let updating_result;
    let current;
    function select_result_binding(value) {
      ctx[25](value);
    }
    let select_props = { start: "2", items: (
      /*items*/
      ctx[11]
    ) };
    if (
      /*anggotaTim*/
      ctx[8] !== void 0
    ) {
      select_props.result = /*anggotaTim*/
      ctx[8];
    }
    select = new Select_default({ props: select_props });
    binding_callbacks.push(() => bind(select, "result", select_result_binding));
    return {
      c() {
        create_component(select.$$.fragment);
      },
      m(target, anchor) {
        mount_component(select, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const select_changes = {};
        if (dirty[0] & /*items*/
        2048)
          select_changes.items = /*items*/
          ctx2[11];
        if (!updating_result && dirty[0] & /*anggotaTim*/
        256) {
          updating_result = true;
          select_changes.result = /*anggotaTim*/
          ctx2[8];
          add_flush_callback(() => updating_result = false);
        }
        select.$set(select_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(select.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(select.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(select, detaching);
      }
    };
  }
  function create_if_block14(ctx) {
    let each_1_anchor;
    let current;
    let each_value = ensure_array_like(
      /*anggotaTim*/
      ctx[8]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block12(get_each_context12(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim, deleteMember*/
        33024) {
          each_value = ensure_array_like(
            /*anggotaTim*/
            ctx2[8]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context12(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block12(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block12(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_data_value_value;
    let t0;
    let td1;
    let t2;
    let td2;
    let t3_value = (
      /*member*/
      ctx[34].label + ""
    );
    let t3;
    let t4;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        td1.textContent = "Anggota";
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "data-value", button_data_value_value = /*member*/
        ctx[34].value);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*deleteMember*/
            ctx[15]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*anggotaTim*/
        256 && button_data_value_value !== (button_data_value_value = /*member*/
        ctx2[34].value)) {
          attr(button, "data-value", button_data_value_value);
        }
        if ((!current || dirty[0] & /*anggotaTim*/
        256) && t3_value !== (t3_value = /*member*/
        ctx2[34].label + ""))
          set_data(t3, t3_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_311(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Judul");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*judul*/
          ctx[4]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_3*/
            ctx[26]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*judul*/
        16 && input.value !== /*judul*/
        ctx2[4]) {
          set_input_value(
            input,
            /*judul*/
            ctx2[4]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_211(ctx) {
    let textarea;
    let mounted;
    let dispose;
    return {
      c() {
        textarea = element("textarea");
        attr(textarea, "class", "textarea");
      },
      m(target, anchor) {
        insert(target, textarea, anchor);
        set_input_value(
          textarea,
          /*myAbstract*/
          ctx[9]
        );
        if (!mounted) {
          dispose = listen(
            textarea,
            "input",
            /*textarea_input_handler*/
            ctx[27]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*myAbstract*/
        512) {
          set_input_value(
            textarea,
            /*myAbstract*/
            ctx2[9]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(textarea);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_116(ctx) {
    let wysiwyg;
    let current;
    wysiwyg = new Wysiwyg_default({
      props: { id: "isi", content: (
        /*myIsi*/
        ctx[10]
      ) }
    });
    return {
      c() {
        create_component(wysiwyg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(wysiwyg, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const wysiwyg_changes = {};
        if (dirty[0] & /*myIsi*/
        1024)
          wysiwyg_changes.content = /*myIsi*/
          ctx2[10];
        wysiwyg.$set(wysiwyg_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(wysiwyg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(wysiwyg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(wysiwyg, detaching);
      }
    };
  }
  function create_default_slot14(ctx) {
    let h1;
    let t1;
    let hr0;
    let t2;
    let field0;
    let t3;
    let field1;
    let t4;
    let field2;
    let t5;
    let field3;
    let t6;
    let field4;
    let t7;
    let field5;
    let updating_value;
    let t8;
    let field6;
    let t9;
    let field7;
    let t10;
    let field8;
    let t11;
    let br;
    let t12;
    let table;
    let thead;
    let t18;
    let tbody;
    let tr1;
    let t23;
    let t24;
    let hr1;
    let t25;
    let field9;
    let t26;
    let field10;
    let t27;
    let field11;
    let t28;
    let hr2;
    let t29;
    let div;
    let p0;
    let button0;
    let t31;
    let p1;
    let button1;
    let current;
    let mounted;
    let dispose;
    field0 = new Field_default({
      props: {
        name: "Jenis Proposal",
        $$slots: { default: [create_default_slot_115] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Jenis Kegiatan",
        $$slots: { default: [create_default_slot_104] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Jenis Skema",
        $$slots: { default: [create_default_slot_94] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Kelompok Keahlian",
        $$slots: { default: [create_default_slot_84] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Topik",
        $$slots: { default: [create_default_slot_74] },
        $$scope: { ctx }
      }
    });
    function field5_value_binding(value) {
      ctx[21](value);
    }
    let field5_props = {
      datepicker: true,
      name: "Tahun Pelaksanaan"
    };
    if (
      /*tahunPelaksanaan*/
      ctx[5] !== void 0
    ) {
      field5_props.value = /*tahunPelaksanaan*/
      ctx[5];
    }
    field5 = new Field_default({ props: field5_props });
    binding_callbacks.push(() => bind(field5, "value", field5_value_binding));
    field6 = new Field_default({
      props: {
        name: "Biaya Penelitian",
        $$slots: { default: [create_default_slot_64] },
        $$scope: { ctx }
      }
    });
    field7 = new Field_default({
      props: {
        name: "Rencana Anggaran Biaya",
        $$slots: { default: [create_default_slot_54] },
        $$scope: { ctx }
      }
    });
    field8 = new Field_default({
      props: {
        name: "Anggota Tim",
        $$slots: { default: [create_default_slot_48] },
        $$scope: { ctx }
      }
    });
    let if_block = (
      /*anggotaTim*/
      ctx[8].length > 0 && create_if_block14(ctx)
    );
    field9 = new Field_default({
      props: {
        name: "Judul",
        $$slots: { default: [create_default_slot_311] },
        $$scope: { ctx }
      }
    });
    field10 = new Field_default({
      props: {
        name: "Abstrak",
        $$slots: { default: [create_default_slot_211] },
        $$scope: { ctx }
      }
    });
    field11 = new Field_default({
      props: {
        name: "Isi Proposal",
        $$slots: { default: [create_default_slot_116] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Buat Proposal";
        t1 = space();
        hr0 = element("hr");
        t2 = space();
        create_component(field0.$$.fragment);
        t3 = space();
        create_component(field1.$$.fragment);
        t4 = space();
        create_component(field2.$$.fragment);
        t5 = space();
        create_component(field3.$$.fragment);
        t6 = space();
        create_component(field4.$$.fragment);
        t7 = space();
        create_component(field5.$$.fragment);
        t8 = space();
        create_component(field6.$$.fragment);
        t9 = space();
        create_component(field7.$$.fragment);
        t10 = space();
        create_component(field8.$$.fragment);
        t11 = space();
        br = element("br");
        t12 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow">Action</th> <th class="is-narrow">Status</th> <th>Nama</th></tr>`;
        t18 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        tr1.innerHTML = `<td></td> <td>Ketua</td> <td>...</td>`;
        t23 = space();
        if (if_block)
          if_block.c();
        t24 = space();
        hr1 = element("hr");
        t25 = space();
        create_component(field9.$$.fragment);
        t26 = space();
        create_component(field10.$$.fragment);
        t27 = space();
        create_component(field11.$$.fragment);
        t28 = space();
        hr2 = element("hr");
        t29 = space();
        div = element("div");
        p0 = element("p");
        button0 = element("button");
        button0.textContent = "Simpan";
        t31 = space();
        p1 = element("p");
        button1 = element("button");
        button1.textContent = "Submit";
        attr(h1, "class", "title is-1");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(button0, "class", "button is-info is-light");
        attr(p0, "class", "control");
        attr(button1, "class", "button is-info");
        attr(p1, "class", "control");
        attr(div, "class", "field is-grouped is-grouped-right");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr0, anchor);
        insert(target, t2, anchor);
        mount_component(field0, target, anchor);
        insert(target, t3, anchor);
        mount_component(field1, target, anchor);
        insert(target, t4, anchor);
        mount_component(field2, target, anchor);
        insert(target, t5, anchor);
        mount_component(field3, target, anchor);
        insert(target, t6, anchor);
        mount_component(field4, target, anchor);
        insert(target, t7, anchor);
        mount_component(field5, target, anchor);
        insert(target, t8, anchor);
        mount_component(field6, target, anchor);
        insert(target, t9, anchor);
        mount_component(field7, target, anchor);
        insert(target, t10, anchor);
        mount_component(field8, target, anchor);
        insert(target, t11, anchor);
        insert(target, br, anchor);
        insert(target, t12, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t18);
        append(table, tbody);
        append(tbody, tr1);
        append(tbody, t23);
        if (if_block)
          if_block.m(tbody, null);
        insert(target, t24, anchor);
        insert(target, hr1, anchor);
        insert(target, t25, anchor);
        mount_component(field9, target, anchor);
        insert(target, t26, anchor);
        mount_component(field10, target, anchor);
        insert(target, t27, anchor);
        mount_component(field11, target, anchor);
        insert(target, t28, anchor);
        insert(target, hr2, anchor);
        insert(target, t29, anchor);
        insert(target, div, anchor);
        append(div, p0);
        append(p0, button0);
        append(div, t31);
        append(div, p1);
        append(p1, button1);
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*simpanProposal*/
              ctx[13]
            ),
            listen(
              button1,
              "click",
              /*submitProposal*/
              ctx[14]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*jenisProposal*/
        2 | dirty[1] & /*$$scope*/
        64) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*jenisKegiatan*/
        1 | dirty[1] & /*$$scope*/
        64) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*jenisSkema, jenisKegiatan*/
        5 | dirty[1] & /*$$scope*/
        64) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*kelompokKeahlian*/
        8 | dirty[1] & /*$$scope*/
        64) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*topik*/
        64 | dirty[1] & /*$$scope*/
        64) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (!updating_value && dirty[0] & /*tahunPelaksanaan*/
        32) {
          updating_value = true;
          field5_changes.value = /*tahunPelaksanaan*/
          ctx2[5];
          add_flush_callback(() => updating_value = false);
        }
        field5.$set(field5_changes);
        const field6_changes = {};
        if (dirty[0] & /*biayaPenelitian*/
        128 | dirty[1] & /*$$scope*/
        64) {
          field6_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field6.$set(field6_changes);
        const field7_changes = {};
        if (dirty[0] & /*file*/
        4096 | dirty[1] & /*$$scope*/
        64) {
          field7_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field7.$set(field7_changes);
        const field8_changes = {};
        if (dirty[0] & /*items, anggotaTim*/
        2304 | dirty[1] & /*$$scope*/
        64) {
          field8_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field8.$set(field8_changes);
        if (
          /*anggotaTim*/
          ctx2[8].length > 0
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*anggotaTim*/
            256) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block14(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(tbody, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
        const field9_changes = {};
        if (dirty[0] & /*judul*/
        16 | dirty[1] & /*$$scope*/
        64) {
          field9_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field9.$set(field9_changes);
        const field10_changes = {};
        if (dirty[0] & /*myAbstract*/
        512 | dirty[1] & /*$$scope*/
        64) {
          field10_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field10.$set(field10_changes);
        const field11_changes = {};
        if (dirty[0] & /*myIsi*/
        1024 | dirty[1] & /*$$scope*/
        64) {
          field11_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field11.$set(field11_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        transition_in(field6.$$.fragment, local);
        transition_in(field7.$$.fragment, local);
        transition_in(field8.$$.fragment, local);
        transition_in(if_block);
        transition_in(field9.$$.fragment, local);
        transition_in(field10.$$.fragment, local);
        transition_in(field11.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        transition_out(field6.$$.fragment, local);
        transition_out(field7.$$.fragment, local);
        transition_out(field8.$$.fragment, local);
        transition_out(if_block);
        transition_out(field9.$$.fragment, local);
        transition_out(field10.$$.fragment, local);
        transition_out(field11.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr0);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(t9);
          detach(t10);
          detach(t11);
          detach(br);
          detach(t12);
          detach(table);
          detach(t24);
          detach(hr1);
          detach(t25);
          detach(t26);
          detach(t27);
          detach(t28);
          detach(hr2);
          detach(t29);
          detach(div);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
        destroy_component(field6, detaching);
        destroy_component(field7, detaching);
        destroy_component(field8, detaching);
        if (if_block)
          if_block.d();
        destroy_component(field9, detaching);
        destroy_component(field10, detaching);
        destroy_component(field11, detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_fragment36(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot14] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty[0] & /*myIsi, myAbstract, judul, anggotaTim, items, file, biayaPenelitian, tahunPelaksanaan, topik, kelompokKeahlian, jenisSkema, jenisKegiatan, jenisProposal*/
        8191 | dirty[1] & /*$$scope*/
        64) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function formatRupiah3(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(), split = number_string.split(","), sisa = split[0].length % 3, rupiah = split[0].substr(0, sisa), ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== void 0 ? rupiah + "," + split[1] : rupiah;
    return prefix === void 0 ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }
  function instance28($$self, $$props, $$invalidate) {
    let $route;
    let $apiURL;
    component_subscribe($$self, route, ($$value) => $$invalidate(29, $route = $$value));
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(30, $apiURL = $$value));
    let value;
    let label;
    let jenisKegiatan = "";
    let jenisProposal = "";
    let jenisSkema = "";
    let kelompokKeahlian = "";
    let judul = "";
    let tahunPelaksanaan = "";
    let topik = "";
    let biayaPenelitian = "";
    let anggotaTim = [];
    let randomFileName2 = "";
    let myAbstract;
    let myIsi;
    const id = Number(localStorage.getItem("id"));
    let items = [];
    let file;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch($apiURL + "/pilihUser", { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        listUser = result;
        $$invalidate(11, items = []);
        for (const [key, value2] of Object.entries(listUser)) {
          items.push({
            value: value2.uid,
            label: value2.nama_lengkap
          });
        }
      } else {
        console.log(response);
      }
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let resultxx = "";
      for (let i = 0; i < 30; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        resultxx += characters.charAt(randomIndex);
      }
      randomFileName2 = resultxx;
    });
    async function simpanProposal() {
      const accessToken = localStorage.getItem("token");
      $$invalidate(10, myIsi = tinymce.get("isi").getContent());
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const payloadfile = {
          file: {
            name: file.name,
            type: file.type,
            data: base64Data
          },
          randomFileName: randomFileName2
        };
        try {
          const response2 = await fetch($apiURL + "/upload", {
            method: "POST",
            headers: {
              Authorization: `${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payloadfile)
          });
          const result2 = await response2.json();
        } catch (error) {
          console.error(
            "Error uploading file:",
            error
          );
        }
      };
      reader.readAsDataURL(file);
      let payload = {
        id,
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        judul,
        myAbstract,
        myIsi,
        status: 0,
        randomFileName: randomFileName2
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(result.msg);
      }
    }
    async function submitProposal() {
      const accessToken = localStorage.getItem("token");
      $$invalidate(10, myIsi = tinymce.get("isi").getContent());
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const payloadfile = {
          file: {
            name: file.name,
            type: file.type,
            data: base64Data
          },
          randomFileName: randomFileName2
        };
        try {
          const response2 = await fetch($apiURL + "/upload", {
            method: "POST",
            headers: {
              Authorization: `${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payloadfile)
          });
          const result2 = await response2.json();
          console.log(result2);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
      reader.readAsDataURL(file);
      let payload = {
        id,
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        judul,
        myAbstract,
        myIsi,
        status: 2,
        randomFileName: randomFileName2
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(result.msg);
      }
    }
    function deleteMember(e) {
      let uid = e.target.getAttribute("data-value");
      $$invalidate(8, anggotaTim = anggotaTim.filter((member) => {
        console.log(member.value, uid);
        return member.value !== uid;
      }));
    }
    function select_change_handler() {
      jenisProposal = select_value(this);
      $$invalidate(1, jenisProposal);
    }
    function select_change_handler_1() {
      jenisKegiatan = select_value(this);
      $$invalidate(0, jenisKegiatan);
    }
    function select_change_handler_2() {
      jenisSkema = select_value(this);
      $$invalidate(2, jenisSkema);
    }
    function input_input_handler() {
      kelompokKeahlian = this.value;
      $$invalidate(3, kelompokKeahlian);
    }
    function input_input_handler_1() {
      topik = this.value;
      $$invalidate(6, topik);
    }
    function field5_value_binding(value2) {
      tahunPelaksanaan = value2;
      $$invalidate(5, tahunPelaksanaan);
    }
    function input_input_handler_2() {
      biayaPenelitian = this.value;
      $$invalidate(7, biayaPenelitian);
    }
    const keyup_handler = () => $$invalidate(7, biayaPenelitian = formatRupiah3(biayaPenelitian, "Rp. "));
    const change_handler = (e) => $$invalidate(12, file = e.target.files[0]);
    function select_result_binding(value2) {
      anggotaTim = value2;
      $$invalidate(8, anggotaTim);
    }
    function input_input_handler_3() {
      judul = this.value;
      $$invalidate(4, judul);
    }
    function textarea_input_handler() {
      myAbstract = this.value;
      $$invalidate(9, myAbstract);
    }
    return [
      jenisKegiatan,
      jenisProposal,
      jenisSkema,
      kelompokKeahlian,
      judul,
      tahunPelaksanaan,
      topik,
      biayaPenelitian,
      anggotaTim,
      myAbstract,
      myIsi,
      items,
      file,
      simpanProposal,
      submitProposal,
      deleteMember,
      select_change_handler,
      select_change_handler_1,
      select_change_handler_2,
      input_input_handler,
      input_input_handler_1,
      field5_value_binding,
      input_input_handler_2,
      keyup_handler,
      change_handler,
      select_result_binding,
      input_input_handler_3,
      textarea_input_handler
    ];
  }
  var Proposal2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance28, create_fragment36, safe_not_equal, {}, null, [-1, -1]);
    }
  };
  var proposal_default2 = Proposal2;

  // src/pages/dosen/proposals.svelte
  init_define_process();
  function get_each_context_13(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[47] = list[i];
    return child_ctx;
  }
  function get_each_context13(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[47] = list[i];
    return child_ctx;
  }
  function create_if_block15(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot15] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty[0] & /*tab4, tab3, data, tab2, status, view, comment, isi, abstrak, judul, anggotaTim, items, file, biayaPenelitian, tahunPelaksanaan, topik, kelompokKeahlian, jenisSkema, jenisKegiatan, jenisProposal, tab1*/
        2097151 | dirty[1] & /*$$scope*/
        2097152) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_if_block_46(ctx) {
    let div1;
    let current_block_type_index;
    let if_block0;
    let t0;
    let hr;
    let t1;
    let div0;
    let current;
    const if_block_creators = [create_if_block_75, create_else_block_22];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (!/*view*/
      ctx2[1])
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, [-1, -1]);
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    let if_block1 = !/*view*/
    ctx[1] && create_if_block_55(ctx);
    return {
      c() {
        div1 = element("div");
        if_block0.c();
        t0 = space();
        hr = element("hr");
        t1 = space();
        div0 = element("div");
        if (if_block1)
          if_block1.c();
        attr(div0, "class", "field is-grouped is-grouped-right");
        attr(div1, "id", "tab1");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        if_blocks[current_block_type_index].m(div1, null);
        append(div1, t0);
        append(div1, hr);
        append(div1, t1);
        append(div1, div0);
        if (if_block1)
          if_block1.m(div0, null);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(div1, t0);
        }
        if (!/*view*/
        ctx2[1]) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_55(ctx2);
            if_block1.c();
            if_block1.m(div0, null);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block0);
        current = true;
      },
      o(local) {
        transition_out(if_block0);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
        if_blocks[current_block_type_index].d();
        if (if_block1)
          if_block1.d();
      }
    };
  }
  function create_else_block_22(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let field5;
    let t5;
    let field6;
    let t6;
    let field7;
    let t7;
    let field8;
    let t8;
    let br;
    let t9;
    let table;
    let thead;
    let t13;
    let tbody;
    let tr1;
    let t17;
    let t18;
    let hr;
    let t19;
    let field9;
    let t20;
    let field10;
    let t21;
    let field11;
    let current;
    field0 = new Field_default({
      props: {
        name: "Jenis Proposal",
        $$slots: { default: [create_default_slot_243] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Jenis Kegiatan",
        $$slots: { default: [create_default_slot_234] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Jenis Skema",
        $$slots: { default: [create_default_slot_224] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Kelompok Keahlian",
        $$slots: { default: [create_default_slot_213] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Topik",
        $$slots: { default: [create_default_slot_203] },
        $$scope: { ctx }
      }
    });
    field5 = new Field_default({
      props: {
        name: "Tahun Pelaksanaan",
        $$slots: { default: [create_default_slot_193] },
        $$scope: { ctx }
      }
    });
    field6 = new Field_default({
      props: {
        name: "Biaya Penelitian",
        $$slots: { default: [create_default_slot_183] },
        $$scope: { ctx }
      }
    });
    field7 = new Field_default({
      props: {
        name: "Rencana Anggaran Biaya",
        $$slots: { default: [create_default_slot_173] },
        $$scope: { ctx }
      }
    });
    field8 = new Field_default({
      props: {
        name: "Anggota Tim",
        $$slots: { default: [create_default_slot_163] },
        $$scope: { ctx }
      }
    });
    let if_block = (
      /*anggotaTim*/
      ctx[10].length > 0 && create_if_block_104(ctx)
    );
    field9 = new Field_default({
      props: {
        name: "Judul",
        $$slots: { default: [create_default_slot_153] },
        $$scope: { ctx }
      }
    });
    field10 = new Field_default({
      props: {
        name: "abstrak",
        $$slots: { default: [create_default_slot_143] },
        $$scope: { ctx }
      }
    });
    field11 = new Field_default({
      props: {
        name: "isi",
        $$slots: { default: [create_default_slot_135] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        create_component(field5.$$.fragment);
        t5 = space();
        create_component(field6.$$.fragment);
        t6 = space();
        create_component(field7.$$.fragment);
        t7 = space();
        create_component(field8.$$.fragment);
        t8 = space();
        br = element("br");
        t9 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow">Status</th> <th>Nama</th></tr>`;
        t13 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        tr1.innerHTML = `<td>Ketua</td> <td>...</td>`;
        t17 = space();
        if (if_block)
          if_block.c();
        t18 = space();
        hr = element("hr");
        t19 = space();
        create_component(field9.$$.fragment);
        t20 = space();
        create_component(field10.$$.fragment);
        t21 = space();
        create_component(field11.$$.fragment);
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        mount_component(field5, target, anchor);
        insert(target, t5, anchor);
        mount_component(field6, target, anchor);
        insert(target, t6, anchor);
        mount_component(field7, target, anchor);
        insert(target, t7, anchor);
        mount_component(field8, target, anchor);
        insert(target, t8, anchor);
        insert(target, br, anchor);
        insert(target, t9, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t13);
        append(table, tbody);
        append(tbody, tr1);
        append(tbody, t17);
        if (if_block)
          if_block.m(tbody, null);
        insert(target, t18, anchor);
        insert(target, hr, anchor);
        insert(target, t19, anchor);
        mount_component(field9, target, anchor);
        insert(target, t20, anchor);
        mount_component(field10, target, anchor);
        insert(target, t21, anchor);
        mount_component(field11, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*jenisProposal*/
        8 | dirty[1] & /*$$scope*/
        2097152) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*jenisKegiatan*/
        16 | dirty[1] & /*$$scope*/
        2097152) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*jenisSkema*/
        32 | dirty[1] & /*$$scope*/
        2097152) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*kelompokKeahlian*/
        64 | dirty[1] & /*$$scope*/
        2097152) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*topik*/
        128 | dirty[1] & /*$$scope*/
        2097152) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (dirty[0] & /*tahunPelaksanaan*/
        256 | dirty[1] & /*$$scope*/
        2097152) {
          field5_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field5.$set(field5_changes);
        const field6_changes = {};
        if (dirty[0] & /*biayaPenelitian*/
        512 | dirty[1] & /*$$scope*/
        2097152) {
          field6_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field6.$set(field6_changes);
        const field7_changes = {};
        if (dirty[1] & /*$$scope*/
        2097152) {
          field7_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field7.$set(field7_changes);
        const field8_changes = {};
        if (dirty[1] & /*$$scope*/
        2097152) {
          field8_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field8.$set(field8_changes);
        if (
          /*anggotaTim*/
          ctx2[10].length > 0
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_104(ctx2);
            if_block.c();
            if_block.m(tbody, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        const field9_changes = {};
        if (dirty[0] & /*data*/
        4 | dirty[1] & /*$$scope*/
        2097152) {
          field9_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field9.$set(field9_changes);
        const field10_changes = {};
        if (dirty[0] & /*data*/
        4 | dirty[1] & /*$$scope*/
        2097152) {
          field10_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field10.$set(field10_changes);
        const field11_changes = {};
        if (dirty[0] & /*data*/
        4 | dirty[1] & /*$$scope*/
        2097152) {
          field11_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field11.$set(field11_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        transition_in(field6.$$.fragment, local);
        transition_in(field7.$$.fragment, local);
        transition_in(field8.$$.fragment, local);
        transition_in(field9.$$.fragment, local);
        transition_in(field10.$$.fragment, local);
        transition_in(field11.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        transition_out(field6.$$.fragment, local);
        transition_out(field7.$$.fragment, local);
        transition_out(field8.$$.fragment, local);
        transition_out(field9.$$.fragment, local);
        transition_out(field10.$$.fragment, local);
        transition_out(field11.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(br);
          detach(t9);
          detach(table);
          detach(t18);
          detach(hr);
          detach(t19);
          detach(t20);
          detach(t21);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
        destroy_component(field6, detaching);
        destroy_component(field7, detaching);
        destroy_component(field8, detaching);
        if (if_block)
          if_block.d();
        destroy_component(field9, detaching);
        destroy_component(field10, detaching);
        destroy_component(field11, detaching);
      }
    };
  }
  function create_if_block_75(ctx) {
    let field0;
    let t0;
    let field1;
    let t1;
    let field2;
    let t2;
    let field3;
    let t3;
    let field4;
    let t4;
    let field5;
    let updating_value;
    let t5;
    let field6;
    let t6;
    let field7;
    let t7;
    let field8;
    let t8;
    let br0;
    let t9;
    let table;
    let thead;
    let t15;
    let tbody;
    let tr1;
    let t20;
    let t21;
    let hr0;
    let t22;
    let field9;
    let t23;
    let field10;
    let t24;
    let field11;
    let t25;
    let br1;
    let br2;
    let t26;
    let hr1;
    let t27;
    let field12;
    let current;
    field0 = new Field_default({
      props: {
        name: "Jenis Proposal",
        $$slots: { default: [create_default_slot_125] },
        $$scope: { ctx }
      }
    });
    field1 = new Field_default({
      props: {
        name: "Jenis Kegiatan",
        $$slots: { default: [create_default_slot_117] },
        $$scope: { ctx }
      }
    });
    field2 = new Field_default({
      props: {
        name: "Jenis Skema",
        $$slots: { default: [create_default_slot_105] },
        $$scope: { ctx }
      }
    });
    field3 = new Field_default({
      props: {
        name: "Kelompok Keahlian",
        $$slots: { default: [create_default_slot_95] },
        $$scope: { ctx }
      }
    });
    field4 = new Field_default({
      props: {
        name: "Topik",
        $$slots: { default: [create_default_slot_85] },
        $$scope: { ctx }
      }
    });
    function field5_value_binding(value) {
      ctx[35](value);
    }
    let field5_props = {
      datepicker: true,
      name: "Tahun Pelaksanaan"
    };
    if (
      /*tahunPelaksanaan*/
      ctx[8] !== void 0
    ) {
      field5_props.value = /*tahunPelaksanaan*/
      ctx[8];
    }
    field5 = new Field_default({ props: field5_props });
    binding_callbacks.push(() => bind(field5, "value", field5_value_binding));
    field6 = new Field_default({
      props: {
        name: "Biaya Penelitian",
        $$slots: { default: [create_default_slot_75] },
        $$scope: { ctx }
      }
    });
    field7 = new Field_default({
      props: {
        name: "Rencana Anggaran Biaya",
        $$slots: { default: [create_default_slot_65] },
        $$scope: { ctx }
      }
    });
    field8 = new Field_default({
      props: {
        name: "Anggota Tim",
        $$slots: { default: [create_default_slot_55] },
        $$scope: { ctx }
      }
    });
    let if_block = (
      /*anggotaTim*/
      ctx[10].length > 0 && create_if_block_85(ctx)
    );
    field9 = new Field_default({
      props: {
        name: "Judul",
        $$slots: { default: [create_default_slot_49] },
        $$scope: { ctx }
      }
    });
    field10 = new Field_default({
      props: {
        name: "Abstrak",
        $$slots: { default: [create_default_slot_312] },
        $$scope: { ctx }
      }
    });
    field11 = new Field_default({
      props: {
        name: "Isi Proposal",
        $$slots: { default: [create_default_slot_214] },
        $$scope: { ctx }
      }
    });
    field12 = new Field_default({
      props: {
        name: "Catatan Revisi",
        $$slots: { default: [create_default_slot_118] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field0.$$.fragment);
        t0 = space();
        create_component(field1.$$.fragment);
        t1 = space();
        create_component(field2.$$.fragment);
        t2 = space();
        create_component(field3.$$.fragment);
        t3 = space();
        create_component(field4.$$.fragment);
        t4 = space();
        create_component(field5.$$.fragment);
        t5 = space();
        create_component(field6.$$.fragment);
        t6 = space();
        create_component(field7.$$.fragment);
        t7 = space();
        create_component(field8.$$.fragment);
        t8 = space();
        br0 = element("br");
        t9 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th class="is-narrow">Action</th> <th class="is-narrow">Status</th> <th>Nama</th></tr>`;
        t15 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        tr1.innerHTML = `<td></td> <td>Ketua</td> <td>...</td>`;
        t20 = space();
        if (if_block)
          if_block.c();
        t21 = space();
        hr0 = element("hr");
        t22 = space();
        create_component(field9.$$.fragment);
        t23 = space();
        create_component(field10.$$.fragment);
        t24 = space();
        create_component(field11.$$.fragment);
        t25 = space();
        br1 = element("br");
        br2 = element("br");
        t26 = space();
        hr1 = element("hr");
        t27 = space();
        create_component(field12.$$.fragment);
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
      },
      m(target, anchor) {
        mount_component(field0, target, anchor);
        insert(target, t0, anchor);
        mount_component(field1, target, anchor);
        insert(target, t1, anchor);
        mount_component(field2, target, anchor);
        insert(target, t2, anchor);
        mount_component(field3, target, anchor);
        insert(target, t3, anchor);
        mount_component(field4, target, anchor);
        insert(target, t4, anchor);
        mount_component(field5, target, anchor);
        insert(target, t5, anchor);
        mount_component(field6, target, anchor);
        insert(target, t6, anchor);
        mount_component(field7, target, anchor);
        insert(target, t7, anchor);
        mount_component(field8, target, anchor);
        insert(target, t8, anchor);
        insert(target, br0, anchor);
        insert(target, t9, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t15);
        append(table, tbody);
        append(tbody, tr1);
        append(tbody, t20);
        if (if_block)
          if_block.m(tbody, null);
        insert(target, t21, anchor);
        insert(target, hr0, anchor);
        insert(target, t22, anchor);
        mount_component(field9, target, anchor);
        insert(target, t23, anchor);
        mount_component(field10, target, anchor);
        insert(target, t24, anchor);
        mount_component(field11, target, anchor);
        insert(target, t25, anchor);
        insert(target, br1, anchor);
        insert(target, br2, anchor);
        insert(target, t26, anchor);
        insert(target, hr1, anchor);
        insert(target, t27, anchor);
        mount_component(field12, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (dirty[0] & /*jenisProposal*/
        8 | dirty[1] & /*$$scope*/
        2097152) {
          field0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*jenisKegiatan*/
        16 | dirty[1] & /*$$scope*/
        2097152) {
          field1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*jenisSkema, jenisKegiatan*/
        48 | dirty[1] & /*$$scope*/
        2097152) {
          field2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*kelompokKeahlian*/
        64 | dirty[1] & /*$$scope*/
        2097152) {
          field3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*topik*/
        128 | dirty[1] & /*$$scope*/
        2097152) {
          field4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (!updating_value && dirty[0] & /*tahunPelaksanaan*/
        256) {
          updating_value = true;
          field5_changes.value = /*tahunPelaksanaan*/
          ctx2[8];
          add_flush_callback(() => updating_value = false);
        }
        field5.$set(field5_changes);
        const field6_changes = {};
        if (dirty[0] & /*biayaPenelitian*/
        512 | dirty[1] & /*$$scope*/
        2097152) {
          field6_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field6.$set(field6_changes);
        const field7_changes = {};
        if (dirty[0] & /*file*/
        65536 | dirty[1] & /*$$scope*/
        2097152) {
          field7_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field7.$set(field7_changes);
        const field8_changes = {};
        if (dirty[0] & /*items, anggotaTim*/
        1025 | dirty[1] & /*$$scope*/
        2097152) {
          field8_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field8.$set(field8_changes);
        if (
          /*anggotaTim*/
          ctx2[10].length > 0
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*anggotaTim*/
            1024) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_85(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(tbody, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
        const field9_changes = {};
        if (dirty[0] & /*judul*/
        2048 | dirty[1] & /*$$scope*/
        2097152) {
          field9_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field9.$set(field9_changes);
        const field10_changes = {};
        if (dirty[0] & /*abstrak*/
        4096 | dirty[1] & /*$$scope*/
        2097152) {
          field10_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field10.$set(field10_changes);
        const field11_changes = {};
        if (dirty[0] & /*isi*/
        8192 | dirty[1] & /*$$scope*/
        2097152) {
          field11_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field11.$set(field11_changes);
        const field12_changes = {};
        if (dirty[0] & /*comment*/
        16384 | dirty[1] & /*$$scope*/
        2097152) {
          field12_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field12.$set(field12_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        transition_in(field6.$$.fragment, local);
        transition_in(field7.$$.fragment, local);
        transition_in(field8.$$.fragment, local);
        transition_in(if_block);
        transition_in(field9.$$.fragment, local);
        transition_in(field10.$$.fragment, local);
        transition_in(field11.$$.fragment, local);
        transition_in(field12.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        transition_out(field6.$$.fragment, local);
        transition_out(field7.$$.fragment, local);
        transition_out(field8.$$.fragment, local);
        transition_out(if_block);
        transition_out(field9.$$.fragment, local);
        transition_out(field10.$$.fragment, local);
        transition_out(field11.$$.fragment, local);
        transition_out(field12.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(br0);
          detach(t9);
          detach(table);
          detach(t21);
          detach(hr0);
          detach(t22);
          detach(t23);
          detach(t24);
          detach(t25);
          detach(br1);
          detach(br2);
          detach(t26);
          detach(hr1);
          detach(t27);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
        destroy_component(field6, detaching);
        destroy_component(field7, detaching);
        destroy_component(field8, detaching);
        if (if_block)
          if_block.d();
        destroy_component(field9, detaching);
        destroy_component(field10, detaching);
        destroy_component(field11, detaching);
        destroy_component(field12, detaching);
      }
    };
  }
  function create_default_slot_243(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisProposal*/
          ctx[3]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisProposal*/
        8)
          set_data(
            t,
            /*jenisProposal*/
            ctx2[3]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_234(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisKegiatan*/
          ctx[4]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisKegiatan*/
        16)
          set_data(
            t,
            /*jenisKegiatan*/
            ctx2[4]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_224(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*jenisSkema*/
          ctx[5]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisSkema*/
        32)
          set_data(
            t,
            /*jenisSkema*/
            ctx2[5]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_213(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*kelompokKeahlian*/
          ctx[6]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*kelompokKeahlian*/
        64)
          set_data(
            t,
            /*kelompokKeahlian*/
            ctx2[6]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_203(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*topik*/
          ctx[7]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*topik*/
        128)
          set_data(
            t,
            /*topik*/
            ctx2[7]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_193(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*tahunPelaksanaan*/
          ctx[8]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*tahunPelaksanaan*/
        256)
          set_data(
            t,
            /*tahunPelaksanaan*/
            ctx2[8]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_183(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*biayaPenelitian*/
          ctx[9]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*biayaPenelitian*/
        512)
          set_data(
            t,
            /*biayaPenelitian*/
            ctx2[9]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_173(ctx) {
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        button.textContent = "Download RAB";
        attr(button, "class", "button is-link is-rounded button is-small");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(button, "click", handleDownload);
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_163(ctx) {
    let span;
    return {
      c() {
        span = element("span");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_104(ctx) {
    let each_1_anchor;
    let each_value_1 = ensure_array_like(
      /*anggotaTim*/
      ctx[10]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_13(get_each_context_13(ctx, each_value_1, i));
    }
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim*/
        1024) {
          each_value_1 = ensure_array_like(
            /*anggotaTim*/
            ctx2[10]
          );
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_13(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_13(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block_13(ctx) {
    let tr;
    let td0;
    let t1;
    let td1;
    let t2_value = (
      /*member*/
      ctx[47].label + ""
    );
    let t2;
    let t3;
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        td0.textContent = "Anggota";
        t1 = space();
        td1 = element("td");
        t2 = text(t2_value);
        t3 = space();
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(tr, t1);
        append(tr, td1);
        append(td1, t2);
        append(tr, t3);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim*/
        1024 && t2_value !== (t2_value = /*member*/
        ctx2[47].label + ""))
          set_data(t2, t2_value);
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
      }
    };
  }
  function create_default_slot_153(ctx) {
    let t_value = (
      /*data*/
      ctx[2].judul + ""
    );
    let t;
    return {
      c() {
        t = text(t_value);
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        4 && t_value !== (t_value = /*data*/
        ctx2[2].judul + ""))
          set_data(t, t_value);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_143(ctx) {
    let html_tag;
    let raw_value = (
      /*data*/
      ctx[2].abstrak + ""
    );
    let html_anchor;
    return {
      c() {
        html_tag = new HtmlTag(false);
        html_anchor = empty();
        html_tag.a = html_anchor;
      },
      m(target, anchor) {
        html_tag.m(raw_value, target, anchor);
        insert(target, html_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        4 && raw_value !== (raw_value = /*data*/
        ctx2[2].abstrak + ""))
          html_tag.p(raw_value);
      },
      d(detaching) {
        if (detaching) {
          detach(html_anchor);
          html_tag.d();
        }
      }
    };
  }
  function create_default_slot_135(ctx) {
    let div;
    let raw_value = (
      /*data*/
      ctx[2].isi + ""
    );
    return {
      c() {
        div = element("div");
        attr(div, "class", "box box-padding svelte-16qu3hd");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        div.innerHTML = raw_value;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*data*/
        4 && raw_value !== (raw_value = /*data*/
        ctx2[2].isi + ""))
          div.innerHTML = raw_value;
        ;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_default_slot_125(ctx) {
    let div;
    let select;
    let option0;
    let option1;
    let option2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Pilih Jenis Proposal";
        option1 = element("option");
        option1.textContent = "Proposal Awal";
        option2 = element("option");
        option2.textContent = "Proposal Lanjutan";
        option0.__value = "";
        set_input_value(option0, option0.__value);
        option0.selected = true;
        option0.disabled = true;
        option0.hidden = true;
        option1.selected = true;
        option1.__value = "Proposal Awal";
        set_input_value(option1, option1.__value);
        option2.__value = "Proposal Lanjutan";
        set_input_value(option2, option2.__value);
        if (
          /*jenisProposal*/
          ctx[3] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler*/
            ctx[30].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        select_option(
          select,
          /*jenisProposal*/
          ctx[3],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler*/
            ctx[30]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisProposal*/
        8) {
          select_option(
            select,
            /*jenisProposal*/
            ctx2[3]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_117(ctx) {
    let div;
    let select;
    let option0;
    let option1;
    let option2;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Pilih Jenis Kegiatan";
        option1 = element("option");
        option1.textContent = "Penelitian";
        option2 = element("option");
        option2.textContent = "Pengabdian Masyarakat";
        option0.__value = "";
        set_input_value(option0, option0.__value);
        option0.selected = true;
        option0.disabled = true;
        option0.hidden = true;
        option1.__value = "Penelitian";
        set_input_value(option1, option1.__value);
        option2.__value = "Pengabdian Masyarakat";
        set_input_value(option2, option2.__value);
        if (
          /*jenisKegiatan*/
          ctx[4] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler_1*/
            ctx[31].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        select_option(
          select,
          /*jenisKegiatan*/
          ctx[4],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler_1*/
            ctx[31]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*jenisKegiatan*/
        16) {
          select_option(
            select,
            /*jenisKegiatan*/
            ctx2[4]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_else_block_12(ctx) {
    let option0;
    let option1;
    let option2;
    let option3;
    return {
      c() {
        option0 = element("option");
        option0.textContent = "Pengabdian Masyarakat Desa Binaan";
        option1 = element("option");
        option1.textContent = "Pengabdian Masyarakat UMKM Binaan";
        option2 = element("option");
        option2.textContent = "Pengabdian Masyarakat Mandiri";
        option3 = element("option");
        option3.textContent = "Pengabdian Masyarakat Hibah Eksternal";
        option0.__value = "Pengabdian Masyarakat Desa Binaan";
        set_input_value(option0, option0.__value);
        option1.__value = "Pengabdian Masyarakat UMKM Binaan";
        set_input_value(option1, option1.__value);
        option2.__value = "Pengabdian Masyarakat Mandiri";
        set_input_value(option2, option2.__value);
        option3.__value = "Pengabdian Masyarakat Hibah Eksternal";
        set_input_value(option3, option3.__value);
      },
      m(target, anchor) {
        insert(target, option0, anchor);
        insert(target, option1, anchor);
        insert(target, option2, anchor);
        insert(target, option3, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(option0);
          detach(option1);
          detach(option2);
          detach(option3);
        }
      }
    };
  }
  function create_if_block_95(ctx) {
    let option0;
    let option1;
    let option2;
    let option3;
    let option4;
    return {
      c() {
        option0 = element("option");
        option0.textContent = "Riset Kelompok Keahlian";
        option1 = element("option");
        option1.textContent = "Riset Terapan";
        option2 = element("option");
        option2.textContent = "Riset Kerjasama";
        option3 = element("option");
        option3.textContent = "Riset Mandiri";
        option4 = element("option");
        option4.textContent = "Riset Eksternal";
        option0.__value = "Riset Kelompok Keahlian";
        set_input_value(option0, option0.__value);
        option1.__value = "Riset Terapan";
        set_input_value(option1, option1.__value);
        option2.__value = "Riset Kerjasama";
        set_input_value(option2, option2.__value);
        option3.__value = "Riset Mandiri";
        set_input_value(option3, option3.__value);
        option4.__value = "Riset Eksternal";
        set_input_value(option4, option4.__value);
      },
      m(target, anchor) {
        insert(target, option0, anchor);
        insert(target, option1, anchor);
        insert(target, option2, anchor);
        insert(target, option3, anchor);
        insert(target, option4, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(option0);
          detach(option1);
          detach(option2);
          detach(option3);
          detach(option4);
        }
      }
    };
  }
  function create_default_slot_105(ctx) {
    let div;
    let select;
    let option;
    let mounted;
    let dispose;
    function select_block_type_1(ctx2, dirty) {
      if (
        /*jenisKegiatan*/
        ctx2[4] === "Penelitian"
      )
        return create_if_block_95;
      return create_else_block_12;
    }
    let current_block_type = select_block_type_1(ctx, [-1, -1]);
    let if_block = current_block_type(ctx);
    return {
      c() {
        div = element("div");
        select = element("select");
        option = element("option");
        option.textContent = "Pilih Jenis Skema\r\n                        ";
        if_block.c();
        option.__value = "";
        set_input_value(option, option.__value);
        option.selected = true;
        option.disabled = true;
        option.hidden = true;
        if (
          /*jenisSkema*/
          ctx[5] === void 0
        )
          add_render_callback(() => (
            /*select_change_handler_2*/
            ctx[32].call(select)
          ));
        attr(div, "class", "select is-fullwidth");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, select);
        append(select, option);
        if_block.m(select, null);
        select_option(
          select,
          /*jenisSkema*/
          ctx[5],
          true
        );
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*select_change_handler_2*/
            ctx[32]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (current_block_type !== (current_block_type = select_block_type_1(ctx2, dirty))) {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(select, null);
          }
        }
        if (dirty[0] & /*jenisSkema*/
        32) {
          select_option(
            select,
            /*jenisSkema*/
            ctx2[5]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if_block.d();
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_95(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Kelompok Keahlian");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*kelompokKeahlian*/
          ctx[6]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[33]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*kelompokKeahlian*/
        64 && input.value !== /*kelompokKeahlian*/
        ctx2[6]) {
          set_input_value(
            input,
            /*kelompokKeahlian*/
            ctx2[6]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_85(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Topik");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*topik*/
          ctx[7]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_1*/
            ctx[34]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*topik*/
        128 && input.value !== /*topik*/
        ctx2[7]) {
          set_input_value(
            input,
            /*topik*/
            ctx2[7]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_75(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Biaya Penelitian");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*biayaPenelitian*/
          ctx[9]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler_2*/
              ctx[36]
            ),
            listen(
              input,
              "keyup",
              /*keyup_handler*/
              ctx[37]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*biayaPenelitian*/
        512 && input.value !== /*biayaPenelitian*/
        ctx2[9]) {
          set_input_value(
            input,
            /*biayaPenelitian*/
            ctx2[9]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_65(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "accept", ".xlsx");
        attr(input, "type", "file");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        if (!mounted) {
          dispose = listen(
            input,
            "change",
            /*change_handler*/
            ctx[38]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_55(ctx) {
    let select;
    let updating_result;
    let current;
    function select_result_binding(value) {
      ctx[39](value);
    }
    let select_props = { start: "2", items: (
      /*items*/
      ctx[0]
    ) };
    if (
      /*anggotaTim*/
      ctx[10] !== void 0
    ) {
      select_props.result = /*anggotaTim*/
      ctx[10];
    }
    select = new Select_default({ props: select_props });
    binding_callbacks.push(() => bind(select, "result", select_result_binding));
    return {
      c() {
        create_component(select.$$.fragment);
      },
      m(target, anchor) {
        mount_component(select, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const select_changes = {};
        if (dirty[0] & /*items*/
        1)
          select_changes.items = /*items*/
          ctx2[0];
        if (!updating_result && dirty[0] & /*anggotaTim*/
        1024) {
          updating_result = true;
          select_changes.result = /*anggotaTim*/
          ctx2[10];
          add_flush_callback(() => updating_result = false);
        }
        select.$set(select_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(select.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(select.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(select, detaching);
      }
    };
  }
  function create_if_block_85(ctx) {
    let each_1_anchor;
    let current;
    let each_value = ensure_array_like(
      /*anggotaTim*/
      ctx[10]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block13(get_each_context13(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        each_1_anchor = empty();
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*anggotaTim, deleteMember*/
        268436480) {
          each_value = ensure_array_like(
            /*anggotaTim*/
            ctx2[10]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context13(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block13(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(each_1_anchor);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_each_block13(ctx) {
    let tr;
    let td0;
    let button;
    let span;
    let icon;
    let button_data_value_value;
    let t0;
    let td1;
    let t2;
    let td2;
    let t3_value = (
      /*member*/
      ctx[47].label + ""
    );
    let t3;
    let t4;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "delete", src: deleteIcon } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        button = element("button");
        span = element("span");
        create_component(icon.$$.fragment);
        t0 = space();
        td1 = element("td");
        td1.textContent = "Anggota";
        t2 = space();
        td2 = element("td");
        t3 = text(t3_value);
        t4 = space();
        attr(span, "class", "icon");
        attr(button, "class", "button is-danger is-rounded is-small");
        attr(button, "data-value", button_data_value_value = /*member*/
        ctx[47].value);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, button);
        append(button, span);
        mount_component(icon, span, null);
        append(tr, t0);
        append(tr, td1);
        append(tr, t2);
        append(tr, td2);
        append(td2, t3);
        append(tr, t4);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*deleteMember*/
            ctx[28]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*anggotaTim*/
        1024 && button_data_value_value !== (button_data_value_value = /*member*/
        ctx2[47].value)) {
          attr(button, "data-value", button_data_value_value);
        }
        if ((!current || dirty[0] & /*anggotaTim*/
        1024) && t3_value !== (t3_value = /*member*/
        ctx2[47].label + ""))
          set_data(t3, t3_value);
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_49(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "class", "input");
        attr(input, "type", "text");
        attr(input, "placeholder", "Masukkan Judul");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*judul*/
          ctx[11]
        );
        if (!mounted) {
          dispose = listen(
            input,
            "input",
            /*input_input_handler_3*/
            ctx[40]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*judul*/
        2048 && input.value !== /*judul*/
        ctx2[11]) {
          set_input_value(
            input,
            /*judul*/
            ctx2[11]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_312(ctx) {
    let textarea;
    let mounted;
    let dispose;
    return {
      c() {
        textarea = element("textarea");
        attr(textarea, "class", "textarea");
      },
      m(target, anchor) {
        insert(target, textarea, anchor);
        set_input_value(
          textarea,
          /*abstrak*/
          ctx[12]
        );
        if (!mounted) {
          dispose = listen(
            textarea,
            "input",
            /*textarea_input_handler*/
            ctx[41]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*abstrak*/
        4096) {
          set_input_value(
            textarea,
            /*abstrak*/
            ctx2[12]
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(textarea);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_214(ctx) {
    let wysiwyg;
    let current;
    wysiwyg = new Wysiwyg_default({
      props: { id: "isi", content: (
        /*isi*/
        ctx[13]
      ) }
    });
    return {
      c() {
        create_component(wysiwyg.$$.fragment);
      },
      m(target, anchor) {
        mount_component(wysiwyg, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const wysiwyg_changes = {};
        if (dirty[0] & /*isi*/
        8192)
          wysiwyg_changes.content = /*isi*/
          ctx2[13];
        wysiwyg.$set(wysiwyg_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(wysiwyg.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(wysiwyg.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(wysiwyg, detaching);
      }
    };
  }
  function create_default_slot_118(ctx) {
    let t;
    return {
      c() {
        t = text(
          /*comment*/
          ctx[14]
        );
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*comment*/
        16384)
          set_data(
            t,
            /*comment*/
            ctx2[14]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_if_block_55(ctx) {
    let if_block_anchor;
    function select_block_type_2(ctx2, dirty) {
      if (
        /*status*/
        ctx2[15] === 0
      )
        return create_if_block_65;
      return create_else_block6;
    }
    let current_block_type = select_block_type_2(ctx, [-1, -1]);
    let if_block = current_block_type(ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (current_block_type === (current_block_type = select_block_type_2(ctx2, dirty)) && if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_block.d(detaching);
      }
    };
  }
  function create_else_block6(ctx) {
    let p;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        p = element("p");
        button = element("button");
        button.textContent = "Remediasi";
        attr(button, "class", "button is-info");
        attr(p, "class", "control");
      },
      m(target, anchor) {
        insert(target, p, anchor);
        append(p, button);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*remediasi*/
            ctx[21]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_65(ctx) {
    let p0;
    let button0;
    let t1;
    let p1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        p0 = element("p");
        button0 = element("button");
        button0.textContent = "Simpan";
        t1 = space();
        p1 = element("p");
        button1 = element("button");
        button1.textContent = "Submit";
        attr(button0, "class", "button is-info is-light");
        attr(p0, "class", "control");
        attr(button1, "class", "button is-info");
        attr(p1, "class", "control");
      },
      m(target, anchor) {
        insert(target, p0, anchor);
        append(p0, button0);
        insert(target, t1, anchor);
        insert(target, p1, anchor);
        append(p1, button1);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*simpanProposal*/
              ctx[23]
            ),
            listen(
              button1,
              "click",
              /*submitProposal*/
              ctx[22]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p0);
          detach(t1);
          detach(p1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_36(ctx) {
    let div;
    let table;
    let thead;
    let t3;
    let tbody;
    let tr1;
    let td0;
    let status_1;
    let t4;
    let td1;
    let current;
    status_1 = new Status_default({ props: { code: (
      /*data*/
      ctx[2].status
    ) } });
    return {
      c() {
        div = element("div");
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Status PPM</th> <th>Status Pendanaan</th></tr>`;
        t3 = space();
        tbody = element("tbody");
        tr1 = element("tr");
        td0 = element("td");
        create_component(status_1.$$.fragment);
        t4 = space();
        td1 = element("td");
        td1.textContent = "Coming Soon";
        attr(table, "class", "table is-fullwidth is-striped is-hoverable is-bordered");
        attr(div, "id", "tab2");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, table);
        append(table, thead);
        append(table, t3);
        append(table, tbody);
        append(tbody, tr1);
        append(tr1, td0);
        mount_component(status_1, td0, null);
        append(tr1, t4);
        append(tr1, td1);
        current = true;
      },
      p(ctx2, dirty) {
        const status_1_changes = {};
        if (dirty[0] & /*data*/
        4)
          status_1_changes.code = /*data*/
          ctx2[2].status;
        status_1.$set(status_1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(status_1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status_1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(status_1);
      }
    };
  }
  function create_if_block_26(ctx) {
    let div6;
    let div2;
    let div0;
    let t1;
    let div1;
    let button0;
    let span0;
    let icon0;
    let t2;
    let span1;
    let t4;
    let hr;
    let t5;
    let div5;
    let div3;
    let t7;
    let div4;
    let button1;
    let span2;
    let icon1;
    let t8;
    let span3;
    let current;
    let mounted;
    let dispose;
    icon0 = new Icon_default({
      props: { id: "logbook", src: addProposal }
    });
    icon1 = new Icon_default({ props: { id: "monev", src: addProposal } });
    return {
      c() {
        div6 = element("div");
        div2 = element("div");
        div0 = element("div");
        div0.innerHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Totam suscipit placeat amet.</p>`;
        t1 = space();
        div1 = element("div");
        button0 = element("button");
        span0 = element("span");
        create_component(icon0.$$.fragment);
        t2 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Create Logbook</a>`;
        t4 = space();
        hr = element("hr");
        t5 = space();
        div5 = element("div");
        div3 = element("div");
        div3.innerHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Totam suscipit placeat amet.</p>`;
        t7 = space();
        div4 = element("div");
        button1 = element("button");
        span2 = element("span");
        create_component(icon1.$$.fragment);
        t8 = space();
        span3 = element("span");
        span3.innerHTML = `<a>Create Monev</a>`;
        attr(div0, "class", "column is-4");
        attr(span0, "class", "icon");
        attr(button0, "class", "button is-info");
        attr(div1, "class", "column");
        attr(div2, "class", "columns notification is-info is-light");
        attr(div3, "class", "column is-4");
        attr(span2, "class", "icon");
        attr(button1, "class", "button is-success");
        attr(div4, "class", "column");
        attr(div5, "class", "columns notification is-success is-light");
        attr(div6, "id", "tab3");
      },
      m(target, anchor) {
        insert(target, div6, anchor);
        append(div6, div2);
        append(div2, div0);
        append(div2, t1);
        append(div2, div1);
        append(div1, button0);
        append(button0, span0);
        mount_component(icon0, span0, null);
        append(button0, t2);
        append(button0, span1);
        append(div6, t4);
        append(div6, hr);
        append(div6, t5);
        append(div6, div5);
        append(div5, div3);
        append(div5, t7);
        append(div5, div4);
        append(div4, button1);
        append(button1, span2);
        mount_component(icon1, span2, null);
        append(button1, t8);
        append(button1, span3);
        current = true;
        if (!mounted) {
          dispose = [
            listen(button0, "click", addLogbook),
            listen(button1, "click", addLogbook)
          ];
          mounted = true;
        }
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(icon0.$$.fragment, local);
        transition_in(icon1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon0.$$.fragment, local);
        transition_out(icon1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div6);
        }
        destroy_component(icon0);
        destroy_component(icon1);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_111(ctx) {
    let div3;
    let div2;
    let div0;
    let t1;
    let div1;
    let button;
    let span0;
    let icon;
    let t2;
    let span1;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({
      props: { id: "laporan", src: addProposal }
    });
    return {
      c() {
        div3 = element("div");
        div2 = element("div");
        div0 = element("div");
        div0.innerHTML = `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Totam suscipit placeat amet.</p>`;
        t1 = space();
        div1 = element("div");
        button = element("button");
        span0 = element("span");
        create_component(icon.$$.fragment);
        t2 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Create Laporan</a>`;
        attr(div0, "class", "column is-4");
        attr(span0, "class", "icon");
        attr(button, "class", "button is-info");
        attr(div1, "class", "column");
        attr(div2, "class", "columns notification is-info is-light");
        attr(div3, "id", "tab4");
      },
      m(target, anchor) {
        insert(target, div3, anchor);
        append(div3, div2);
        append(div2, div0);
        append(div2, t1);
        append(div2, div1);
        append(div1, button);
        append(button, span0);
        mount_component(icon, span0, null);
        append(button, t2);
        append(button, span1);
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", addLogbook);
          mounted = true;
        }
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div3);
        }
        destroy_component(icon);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot15(ctx) {
    let h1;
    let t1;
    let div;
    let ul;
    let li0;
    let t3;
    let li1;
    let t5;
    let li2;
    let t7;
    let li3;
    let t9;
    let t10;
    let t11;
    let t12;
    let if_block3_anchor;
    let current;
    let mounted;
    let dispose;
    let if_block0 = (
      /*tab1*/
      ctx[17] === true && create_if_block_46(ctx)
    );
    let if_block1 = (
      /*tab2*/
      ctx[18] === true && create_if_block_36(ctx)
    );
    let if_block2 = (
      /*tab3*/
      ctx[19] === true && create_if_block_26(ctx)
    );
    let if_block3 = (
      /*tab4*/
      ctx[20] === true && create_if_block_111(ctx)
    );
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Detail PPM";
        t1 = space();
        div = element("div");
        ul = element("ul");
        li0 = element("li");
        li0.innerHTML = `<a><span>Identitas PPM</span></a>`;
        t3 = space();
        li1 = element("li");
        li1.innerHTML = `<a><span>Status</span></a>`;
        t5 = space();
        li2 = element("li");
        li2.innerHTML = `<a><span>Logbook / Monev</span></a>`;
        t7 = space();
        li3 = element("li");
        li3.innerHTML = `<a><span>Laporan</span></a>`;
        t9 = space();
        if (if_block0)
          if_block0.c();
        t10 = space();
        if (if_block1)
          if_block1.c();
        t11 = space();
        if (if_block2)
          if_block2.c();
        t12 = space();
        if (if_block3)
          if_block3.c();
        if_block3_anchor = empty();
        attr(h1, "class", "title is-1");
        toggle_class(
          li0,
          "is-active",
          /*tab1*/
          ctx[17]
        );
        toggle_class(
          li1,
          "is-active",
          /*tab2*/
          ctx[18]
        );
        toggle_class(
          li2,
          "is-active",
          /*tab3*/
          ctx[19]
        );
        toggle_class(
          li3,
          "is-active",
          /*tab4*/
          ctx[20]
        );
        attr(div, "class", "tabs is-boxed");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, div, anchor);
        append(div, ul);
        append(ul, li0);
        append(ul, t3);
        append(ul, li1);
        append(ul, t5);
        append(ul, li2);
        append(ul, t7);
        append(ul, li3);
        insert(target, t9, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t10, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t11, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, t12, anchor);
        if (if_block3)
          if_block3.m(target, anchor);
        insert(target, if_block3_anchor, anchor);
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              li0,
              "click",
              /*clicktab1*/
              ctx[24]
            ),
            listen(
              li1,
              "click",
              /*clicktab2*/
              ctx[25]
            ),
            listen(
              li2,
              "click",
              /*clicktab3*/
              ctx[26]
            ),
            listen(
              li3,
              "click",
              /*clicktab4*/
              ctx[27]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (!current || dirty[0] & /*tab1*/
        131072) {
          toggle_class(
            li0,
            "is-active",
            /*tab1*/
            ctx2[17]
          );
        }
        if (!current || dirty[0] & /*tab2*/
        262144) {
          toggle_class(
            li1,
            "is-active",
            /*tab2*/
            ctx2[18]
          );
        }
        if (!current || dirty[0] & /*tab3*/
        524288) {
          toggle_class(
            li2,
            "is-active",
            /*tab3*/
            ctx2[19]
          );
        }
        if (!current || dirty[0] & /*tab4*/
        1048576) {
          toggle_class(
            li3,
            "is-active",
            /*tab4*/
            ctx2[20]
          );
        }
        if (
          /*tab1*/
          ctx2[17] === true
        ) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
            if (dirty[0] & /*tab1*/
            131072) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_46(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(t10.parentNode, t10);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        if (
          /*tab2*/
          ctx2[18] === true
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
            if (dirty[0] & /*tab2*/
            262144) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block_36(ctx2);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(t11.parentNode, t11);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });
          check_outros();
        }
        if (
          /*tab3*/
          ctx2[19] === true
        ) {
          if (if_block2) {
            if_block2.p(ctx2, dirty);
            if (dirty[0] & /*tab3*/
            524288) {
              transition_in(if_block2, 1);
            }
          } else {
            if_block2 = create_if_block_26(ctx2);
            if_block2.c();
            transition_in(if_block2, 1);
            if_block2.m(t12.parentNode, t12);
          }
        } else if (if_block2) {
          group_outros();
          transition_out(if_block2, 1, 1, () => {
            if_block2 = null;
          });
          check_outros();
        }
        if (
          /*tab4*/
          ctx2[20] === true
        ) {
          if (if_block3) {
            if_block3.p(ctx2, dirty);
            if (dirty[0] & /*tab4*/
            1048576) {
              transition_in(if_block3, 1);
            }
          } else {
            if_block3 = create_if_block_111(ctx2);
            if_block3.c();
            transition_in(if_block3, 1);
            if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
          }
        } else if (if_block3) {
          group_outros();
          transition_out(if_block3, 1, 1, () => {
            if_block3 = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block0);
        transition_in(if_block1);
        transition_in(if_block2);
        transition_in(if_block3);
        current = true;
      },
      o(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        transition_out(if_block2);
        transition_out(if_block3);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(div);
          detach(t9);
          detach(t10);
          detach(t11);
          detach(t12);
          detach(if_block3_anchor);
        }
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
        if (if_block2)
          if_block2.d(detaching);
        if (if_block3)
          if_block3.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_fragment37(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*data*/
      ctx[2] && /*items*/
      ctx[0].length > 0 && create_if_block15(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*data*/
          ctx2[2] && /*items*/
          ctx2[0].length > 0
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*data, items*/
            5) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block15(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function isEdit2(code) {
    const edit = [0, 1, 3, 5, 7, 9];
    return edit.some((x) => x === code);
  }
  function formatRupiah4(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(), split = number_string.split(","), sisa = split[0].length % 3, rupiah = split[0].substr(0, sisa), ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== void 0 ? rupiah + "," + split[1] : rupiah;
    return prefix === void 0 ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }
  async function handleDownload(e) {
    const accessToken = localStorage.getItem("token");
    const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json"
    };
    let filename = "rab.xlsx";
    try {
      const response = await fetch(`/api/upload/${randomFileName}`, { method: "GET", headers });
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
  function addLogbook() {
  }
  function instance29($$self, $$props, $$invalidate) {
    let $route;
    let $apiURL;
    component_subscribe($$self, route, ($$value) => $$invalidate(43, $route = $$value));
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(44, $apiURL = $$value));
    let { params } = $$props;
    let items = [];
    let view;
    let data2;
    let statusProposal;
    let jenisProposal;
    let jenisKegiatan;
    let jenisSkema;
    let kelompokKeahlian;
    let topik;
    let tahunPelaksanaan;
    let biayaPenelitian;
    let anggotaTim = [];
    let rab2;
    let judul;
    let abstrak;
    let isi;
    let comment;
    let status;
    const id = params["1"];
    let file;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch($apiURL + "/ppm/" + id, { method: "GET", headers });
      const result = await response.json();
      $$invalidate(1, view = !isEdit2(result.status));
      if (response.ok) {
        $$invalidate(2, data2 = result);
        $$invalidate(3, jenisProposal = data2.jenis_proposal);
        $$invalidate(4, jenisKegiatan = data2.jenis_kegiatan);
        $$invalidate(5, jenisSkema = data2.jenis_skema);
        $$invalidate(6, kelompokKeahlian = data2.kelompok_keahlian);
        $$invalidate(7, topik = data2.topik);
        $$invalidate(8, tahunPelaksanaan = data2.tahun_pelaksanaan);
        $$invalidate(9, biayaPenelitian = data2.biaya_penelitian);
        $$invalidate(10, anggotaTim = typeof data2.anggota_tim === "string" ? JSON.parse(data2.anggota_tim) : data2.anggota_tim);
        rab2 = data2.rab;
        $$invalidate(11, judul = data2.judul);
        $$invalidate(12, abstrak = data2.abstrak);
        $$invalidate(13, isi = data2.isi);
        $$invalidate(14, comment = data2.comment);
        $$invalidate(15, status = data2.status);
        kdeptSelected = data2.uid_kdept;
        klppmSelected = data2.uid_klppm;
        kpkSelected = data2.uid_kpk;
        reviewerSelected = data2.uid_reviewer;
        randomFileName = data2.random_file_name;
      } else {
        console.log(response);
      }
      const responsee = await fetch($apiURL + "/pilihUser", { method: "GET", headers });
      const results = await responsee.json();
      if (responsee.ok) {
        listUser = results;
        for (const [key, value] of Object.entries(listUser)) {
          $$invalidate(0, items = [
            ...items,
            {
              value: value.uid,
              label: value.nama_lengkap
            }
          ]);
        }
      } else {
        console.log(responsee);
      }
    });
    async function remediasi() {
      const accessToken = localStorage.getItem("token");
      $$invalidate(13, isi = tinymce.get("isi").getContent());
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const payloadfile = {
          file: {
            name: file.name,
            type: file.type,
            data: base64Data
          },
          randomFileName
        };
        try {
          const response2 = await fetch($apiURL + "/upload", {
            method: "POST",
            headers: {
              Authorization: `${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payloadfile)
          });
          const result2 = await response2.json();
        } catch (error) {
          console.error(
            "Error uploading file:",
            error
          );
        }
      };
      if (file)
        reader.readAsDataURL(file);
      const payload = {
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        id,
        judul,
        abstrak,
        isi,
        comment: "",
        status: Number(data2.status) + 1,
        kdeptSelected,
        klppmSelected,
        kpkSelected,
        reviewerSelected,
        randomFileName
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    async function submitProposal() {
      const accessToken = localStorage.getItem("token");
      $$invalidate(13, isi = tinymce.get("isi").getContent());
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const payloadfile = {
          file: {
            name: file.name,
            type: file.type,
            data: base64Data
          },
          randomFileName
        };
        try {
          const response2 = await fetch($apiURL + "/upload", {
            method: "POST",
            headers: {
              Authorization: `${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payloadfile)
          });
          const result2 = await response2.json();
        } catch (error) {
          console.error(
            "Error uploading file:",
            error
          );
        }
      };
      reader.readAsDataURL(file);
      const payload = {
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        id,
        judul,
        abstrak,
        isi,
        comment: "",
        status: Number(data2.status) + 2,
        kdeptSelected,
        klppmSelected,
        kpkSelected,
        reviewerSelected,
        randomFileName
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    async function simpanProposal() {
      const accessToken = localStorage.getItem("token");
      $$invalidate(13, isi = tinymce.get("isi").getContent());
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const payloadfile = {
          file: {
            name: file.name,
            type: file.type,
            data: base64Data
          },
          randomFileName
        };
        try {
          const response2 = await fetch($apiURL + "/upload", {
            method: "POST",
            headers: {
              Authorization: `${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payloadfile)
          });
          const result2 = await response2.json();
        } catch (error) {
          console.error(
            "Error uploading file:",
            error
          );
        }
      };
      reader.readAsDataURL(file);
      const payload = {
        jenisProposal,
        jenisKegiatan,
        jenisSkema,
        kelompokKeahlian,
        topik,
        tahunPelaksanaan,
        biayaPenelitian,
        anggotaTim,
        id,
        judul,
        abstrak,
        isi,
        comment: "",
        status: Number(data2.status),
        kdeptSelected,
        klppmSelected,
        kpkSelected,
        reviewerSelected,
        randomFileName
      };
      const response = await fetch($apiURL + "/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    let tab1 = true;
    let tab2;
    let tab3;
    let tab4;
    function clicktab1() {
      $$invalidate(17, tab1 = true);
      $$invalidate(18, tab2 = false);
      $$invalidate(19, tab3 = false);
      $$invalidate(20, tab4 = false);
    }
    function clicktab2() {
      $$invalidate(17, tab1 = false);
      $$invalidate(18, tab2 = true);
      $$invalidate(19, tab3 = false);
      $$invalidate(20, tab4 = false);
    }
    function clicktab3() {
      $$invalidate(17, tab1 = false);
      $$invalidate(18, tab2 = false);
      $$invalidate(19, tab3 = true);
      $$invalidate(20, tab4 = false);
    }
    function clicktab4() {
      $$invalidate(17, tab1 = false);
      $$invalidate(18, tab2 = false);
      $$invalidate(19, tab3 = false);
      $$invalidate(20, tab4 = true);
    }
    function deleteMember(e) {
      let uid = e.target.getAttribute("data-value");
      $$invalidate(10, anggotaTim = anggotaTim.filter((member) => {
        return member.value !== uid;
      }));
    }
    function select_change_handler() {
      jenisProposal = select_value(this);
      $$invalidate(3, jenisProposal);
    }
    function select_change_handler_1() {
      jenisKegiatan = select_value(this);
      $$invalidate(4, jenisKegiatan);
    }
    function select_change_handler_2() {
      jenisSkema = select_value(this);
      $$invalidate(5, jenisSkema);
    }
    function input_input_handler() {
      kelompokKeahlian = this.value;
      $$invalidate(6, kelompokKeahlian);
    }
    function input_input_handler_1() {
      topik = this.value;
      $$invalidate(7, topik);
    }
    function field5_value_binding(value) {
      tahunPelaksanaan = value;
      $$invalidate(8, tahunPelaksanaan);
    }
    function input_input_handler_2() {
      biayaPenelitian = this.value;
      $$invalidate(9, biayaPenelitian);
    }
    const keyup_handler = () => $$invalidate(9, biayaPenelitian = formatRupiah4(biayaPenelitian, "Rp. "));
    const change_handler = (e) => $$invalidate(16, file = e.target.files[0]);
    function select_result_binding(value) {
      anggotaTim = value;
      $$invalidate(10, anggotaTim);
    }
    function input_input_handler_3() {
      judul = this.value;
      $$invalidate(11, judul);
    }
    function textarea_input_handler() {
      abstrak = this.value;
      $$invalidate(12, abstrak);
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(29, params = $$props2.params);
    };
    return [
      items,
      view,
      data2,
      jenisProposal,
      jenisKegiatan,
      jenisSkema,
      kelompokKeahlian,
      topik,
      tahunPelaksanaan,
      biayaPenelitian,
      anggotaTim,
      judul,
      abstrak,
      isi,
      comment,
      status,
      file,
      tab1,
      tab2,
      tab3,
      tab4,
      remediasi,
      submitProposal,
      simpanProposal,
      clicktab1,
      clicktab2,
      clicktab3,
      clicktab4,
      deleteMember,
      params,
      select_change_handler,
      select_change_handler_1,
      select_change_handler_2,
      input_input_handler,
      input_input_handler_1,
      field5_value_binding,
      input_input_handler_2,
      keyup_handler,
      change_handler,
      select_result_binding,
      input_input_handler_3,
      textarea_input_handler
    ];
  }
  var Proposals2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance29, create_fragment37, safe_not_equal, { params: 29 }, null, [-1, -1]);
    }
  };
  var proposals_default2 = Proposals2;

  // src/pages/dosen/select.svelte
  init_define_process();
  function create_default_slot_215(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores\r\n         fuga odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est\r\n         delectus soluta iusto odio architecto impedit maxime non asperiores\r\n         eligendi?";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_header_slot_12(ctx) {
    let h2;
    return {
      c() {
        h2 = element("h2");
        h2.textContent = "Find Approval";
        attr(h2, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h2, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h2);
        }
      }
    };
  }
  function create_default_slot_119(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores\r\n         fuga odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est\r\n         delectus soluta iusto odio architecto impedit maxime non asperiores\r\n         eligendi?";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_header_slot3(ctx) {
    let h2;
    return {
      c() {
        h2 = element("h2");
        h2.textContent = "Test Modal 2";
        attr(h2, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h2, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h2);
        }
      }
    };
  }
  function create_default_slot16(ctx) {
    let br0;
    let t0;
    let input;
    let t1;
    let br1;
    let t2;
    let br2;
    let t3;
    let button0;
    let t5;
    let br3;
    let t6;
    let br4;
    let t7;
    let button1;
    let t9;
    let br5;
    let t10;
    let br6;
    let t11;
    let button2;
    let t13;
    let br7;
    let t14;
    let button3;
    let t16;
    let br8;
    let t17;
    let br9;
    let t18;
    let modal0;
    let updating_show;
    let t19;
    let br10;
    let t20;
    let modal1;
    let updating_show_1;
    let current;
    let mounted;
    let dispose;
    function modal0_show_binding(value) {
      ctx[7](value);
    }
    let modal0_props = {
      $$slots: {
        header: [create_header_slot_12],
        default: [create_default_slot_215]
      },
      $$scope: { ctx }
    };
    if (
      /*showModal*/
      ctx[1] !== void 0
    ) {
      modal0_props.show = /*showModal*/
      ctx[1];
    }
    modal0 = new Modal_default({ props: modal0_props });
    binding_callbacks.push(() => bind(modal0, "show", modal0_show_binding));
    function modal1_show_binding(value) {
      ctx[8](value);
    }
    let modal1_props = {
      $$slots: {
        header: [create_header_slot3],
        default: [create_default_slot_119]
      },
      $$scope: { ctx }
    };
    if (
      /*showModal2*/
      ctx[2] !== void 0
    ) {
      modal1_props.show = /*showModal2*/
      ctx[2];
    }
    modal1 = new Modal_default({ props: modal1_props });
    binding_callbacks.push(() => bind(modal1, "show", modal1_show_binding));
    return {
      c() {
        br0 = element("br");
        t0 = space();
        input = element("input");
        t1 = space();
        br1 = element("br");
        t2 = space();
        br2 = element("br");
        t3 = space();
        button0 = element("button");
        button0.textContent = "Upload File";
        t5 = space();
        br3 = element("br");
        t6 = space();
        br4 = element("br");
        t7 = space();
        button1 = element("button");
        button1.textContent = "Download";
        t9 = space();
        br5 = element("br");
        t10 = space();
        br6 = element("br");
        t11 = space();
        button2 = element("button");
        button2.textContent = "Cek Modal";
        t13 = space();
        br7 = element("br");
        t14 = space();
        button3 = element("button");
        button3.textContent = "Cek Modal2";
        t16 = space();
        br8 = element("br");
        t17 = space();
        br9 = element("br");
        t18 = space();
        create_component(modal0.$$.fragment);
        t19 = space();
        br10 = element("br");
        t20 = space();
        create_component(modal1.$$.fragment);
        attr(input, "class", "input");
        attr(input, "accept", ".xlsx");
        attr(input, "type", "file");
      },
      m(target, anchor) {
        insert(target, br0, anchor);
        insert(target, t0, anchor);
        insert(target, input, anchor);
        insert(target, t1, anchor);
        insert(target, br1, anchor);
        insert(target, t2, anchor);
        insert(target, br2, anchor);
        insert(target, t3, anchor);
        insert(target, button0, anchor);
        insert(target, t5, anchor);
        insert(target, br3, anchor);
        insert(target, t6, anchor);
        insert(target, br4, anchor);
        insert(target, t7, anchor);
        insert(target, button1, anchor);
        insert(target, t9, anchor);
        insert(target, br5, anchor);
        insert(target, t10, anchor);
        insert(target, br6, anchor);
        insert(target, t11, anchor);
        insert(target, button2, anchor);
        insert(target, t13, anchor);
        insert(target, br7, anchor);
        insert(target, t14, anchor);
        insert(target, button3, anchor);
        insert(target, t16, anchor);
        insert(target, br8, anchor);
        insert(target, t17, anchor);
        insert(target, br9, anchor);
        insert(target, t18, anchor);
        mount_component(modal0, target, anchor);
        insert(target, t19, anchor);
        insert(target, br10, anchor);
        insert(target, t20, anchor);
        mount_component(modal1, target, anchor);
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              input,
              "change",
              /*change_handler*/
              ctx[6]
            ),
            listen(
              button0,
              "click",
              /*handleFileUpload*/
              ctx[5]
            ),
            listen(button1, "click", handleDownload2),
            listen(
              button2,
              "click",
              /*cekmodal*/
              ctx[3]
            ),
            listen(
              button3,
              "click",
              /*cekmodal2*/
              ctx[4]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const modal0_changes = {};
        if (dirty & /*$$scope*/
        1024) {
          modal0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show && dirty & /*showModal*/
        2) {
          updating_show = true;
          modal0_changes.show = /*showModal*/
          ctx2[1];
          add_flush_callback(() => updating_show = false);
        }
        modal0.$set(modal0_changes);
        const modal1_changes = {};
        if (dirty & /*$$scope*/
        1024) {
          modal1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show_1 && dirty & /*showModal2*/
        4) {
          updating_show_1 = true;
          modal1_changes.show = /*showModal2*/
          ctx2[2];
          add_flush_callback(() => updating_show_1 = false);
        }
        modal1.$set(modal1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(modal0.$$.fragment, local);
        transition_in(modal1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(modal0.$$.fragment, local);
        transition_out(modal1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(br0);
          detach(t0);
          detach(input);
          detach(t1);
          detach(br1);
          detach(t2);
          detach(br2);
          detach(t3);
          detach(button0);
          detach(t5);
          detach(br3);
          detach(t6);
          detach(br4);
          detach(t7);
          detach(button1);
          detach(t9);
          detach(br5);
          detach(t10);
          detach(br6);
          detach(t11);
          detach(button2);
          detach(t13);
          detach(br7);
          detach(t14);
          detach(button3);
          detach(t16);
          detach(br8);
          detach(t17);
          detach(br9);
          detach(t18);
          detach(t19);
          detach(br10);
          detach(t20);
        }
        destroy_component(modal0, detaching);
        destroy_component(modal1, detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_fragment38(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot16] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope, showModal2, showModal, file*/
        1031) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  async function handleDownload2(e) {
    const accessToken = localStorage.getItem("token");
    const headers = {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json"
    };
    let filename = "rab.xlsx";
    try {
      const response = await fetch(`/api/upload/${randomFileName}`, { method: "GET", headers });
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
  function instance30($$self, $$props, $$invalidate) {
    let $apiURL;
    component_subscribe($$self, apiURL, ($$value) => $$invalidate(9, $apiURL = $$value));
    let file;
    let showModal = false;
    let showModal2 = false;
    async function cekmodal() {
      $$invalidate(1, showModal = true);
    }
    async function cekmodal2() {
      $$invalidate(2, showModal2 = true);
    }
    async function handleFileUpload() {
      const accessToken = localStorage.getItem("token");
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(",")[1];
        const payloadfile = {
          file: {
            name: file.name,
            type: file.type,
            data: base64Data
          },
          randomFileName
        };
        try {
          const response = await fetch($apiURL + "/upload", {
            method: "POST",
            headers: {
              Authorization: `${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payloadfile)
          });
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
      reader.readAsDataURL(file);
    }
    const change_handler = (e) => $$invalidate(0, file = e.target.files[0]);
    function modal0_show_binding(value) {
      showModal = value;
      $$invalidate(1, showModal);
    }
    function modal1_show_binding(value) {
      showModal2 = value;
      $$invalidate(2, showModal2);
    }
    return [
      file,
      showModal,
      showModal2,
      cekmodal,
      cekmodal2,
      handleFileUpload,
      change_handler,
      modal0_show_binding,
      modal1_show_binding
    ];
  }
  var Select_1 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance30, create_fragment38, safe_not_equal, {});
    }
  };
  var select_default = Select_1;

  // src/pages/dosen/Index.svelte
  function create_else_block7(ctx) {
    let e404;
    let current;
    e404 = new E404_default({});
    return {
      c() {
        create_component(e404.$$.fragment);
      },
      m(target, anchor) {
        mount_component(e404, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(e404.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(e404.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(e404, detaching);
      }
    };
  }
  function create_if_block_113(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = (
      /*cmp*/
      ctx[1]
    );
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[0]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*cmp*/
        2 && switch_value !== (switch_value = /*cmp*/
        ctx2[1])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          1)
            switch_instance_changes.params = /*params*/
            ctx2[0];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_if_block16(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = home_default2;
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[0]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (switch_value !== (switch_value = home_default2)) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          1)
            switch_instance_changes.params = /*params*/
            ctx2[0];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_fragment39(ctx) {
    let show_if;
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block16, create_if_block_113, create_else_block7];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (dirty & /*params*/
      1)
        show_if = null;
      if (show_if == null)
        show_if = !!(Object.keys(
          /*params*/
          ctx2[0]
        ).length === 0);
      if (show_if)
        return 0;
      if (
        /*cmp*/
        ctx2[1]
      )
        return 1;
      return 2;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function instance31($$self, $$props, $$invalidate) {
    let { params = {} } = $$props;
    let cmp;
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      1) {
        $:
          params, $$invalidate(1, cmp = dosen_exports[params["0"]] || null);
      }
    };
    return [params, cmp];
  }
  var Index4 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance31, create_fragment39, safe_not_equal, { params: 0 });
    }
  };
  var Index_default4 = Index4;

  // src/routes.js
  var routes_default = [
    { path: "/abdimas", page: Abdimas_default },
    { path: "/about", page: About_default },
    { path: "/authgoogle", page: AuthGoogle_default },
    { path: "/", page: Index_default },
    { path: "/login", page: Login_default },
    { path: "/logout", page: Logout_default },
    { path: "/penelitian", page: Penelitian_default },
    { path: "/register", page: Register_default },
    { path: "/verify", page: Verify_default },
    { path: "/admin/:0", page: Index_default2 },
    { path: "/auth/:0", page: Index_default3 },
    { path: "/dosen/:0", page: Index_default4 }
  ];

  // src/modules/Navbar.svelte
  init_define_process();

  // src/modules/Sidebar.svelte
  init_define_process();

  // src/store/menu.js
  init_define_process();
  var admin = [
    {
      title: "Dashboard",
      href: "/admin"
    },
    {
      title: "User Management",
      href: "/admin/users"
    },
    {
      title: "PPM Management",
      href: "/admin/proposals"
    },
    {
      title: "Logout",
      href: "/logout"
    }
  ];
  var dosen = [
    {
      title: "PPM Management",
      href: "/dosen"
    },
    {
      title: "Approval Management",
      href: "/dosen/approval"
    },
    {
      title: "Profile",
      href: "/dosen/profile"
    },
    {
      title: "Logout",
      href: "/logout"
    }
  ];
  var menu_default = {
    admin,
    dosen
  };

  // src/modules/Sidebar.svelte
  function get_each_context14(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
  }
  function create_each_block14(ctx) {
    let ul;
    let li;
    let a;
    let t_value = (
      /*item*/
      ctx[2].title + ""
    );
    let t;
    let a_href_value;
    return {
      c() {
        ul = element("ul");
        li = element("li");
        a = element("a");
        t = text(t_value);
        attr(a, "href", a_href_value = /*item*/
        ctx[2].href);
        attr(a, "class", "svelte-1lfjw54");
        attr(ul, "class", "menu-list svelte-1lfjw54");
      },
      m(target, anchor) {
        insert(target, ul, anchor);
        append(ul, li);
        append(li, a);
        append(a, t);
      },
      p(ctx2, dirty) {
        if (dirty & /*items*/
        1 && t_value !== (t_value = /*item*/
        ctx2[2].title + ""))
          set_data(t, t_value);
        if (dirty & /*items*/
        1 && a_href_value !== (a_href_value = /*item*/
        ctx2[2].href)) {
          attr(a, "href", a_href_value);
        }
      },
      d(detaching) {
        if (detaching) {
          detach(ul);
        }
      }
    };
  }
  function create_if_block17(ctx) {
    let p;
    let t1;
    let ul;
    return {
      c() {
        p = element("p");
        p.textContent = "Website Settings";
        t1 = space();
        ul = element("ul");
        ul.innerHTML = `<li><a href="/admin/pengumuman" class="svelte-1lfjw54">Pengumuman</a></li> <li><a href="/admin/aboutuisi" class="svelte-1lfjw54">About UISI</a></li>`;
        attr(p, "class", "menu-label svelte-1lfjw54");
        attr(ul, "class", "menu-list svelte-1lfjw54");
      },
      m(target, anchor) {
        insert(target, p, anchor);
        insert(target, t1, anchor);
        insert(target, ul, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(p);
          detach(t1);
          detach(ul);
        }
      }
    };
  }
  function create_fragment40(ctx) {
    let aside;
    let p;
    let t1;
    let t2;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block14(get_each_context14(ctx, each_value, i));
    }
    let if_block = (
      /*role*/
      ctx[1] === "admin" && create_if_block17(ctx)
    );
    return {
      c() {
        aside = element("aside");
        p = element("p");
        p.textContent = "General";
        t1 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t2 = space();
        if (if_block)
          if_block.c();
        attr(p, "class", "menu-label svelte-1lfjw54");
        attr(aside, "class", "menu svelte-1lfjw54");
      },
      m(target, anchor) {
        insert(target, aside, anchor);
        append(aside, p);
        append(aside, t1);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(aside, null);
          }
        }
        append(aside, t2);
        if (if_block)
          if_block.m(aside, null);
      },
      p(ctx2, [dirty]) {
        if (dirty & /*items*/
        1) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context14(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block14(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(aside, t2);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(aside);
        }
        destroy_each(each_blocks, detaching);
        if (if_block)
          if_block.d();
      }
    };
  }
  function instance32($$self, $$props, $$invalidate) {
    const role = localStorage.getItem("role");
    let items;
    if (role === "admin")
      items = menu_default["admin"];
    else
      items = menu_default["dosen"];
    return [items, role];
  }
  var Sidebar = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance32, create_fragment40, safe_not_equal, {});
    }
  };
  var Sidebar_default = Sidebar;

  // src/modules/Navbarmenu.svelte
  init_define_process();
  function create_else_block8(ctx) {
    let a;
    return {
      c() {
        a = element("a");
        a.textContent = "Login";
        attr(a, "class", "button is-info is-fullwidth");
        attr(a, "href", "/login");
      },
      m(target, anchor) {
        insert(target, a, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
      }
    };
  }
  function create_if_block18(ctx) {
    let a;
    return {
      c() {
        a = element("a");
        a.textContent = "Logout";
        attr(a, "class", "button is-info is-fullwidth");
        attr(a, "href", "/logout");
      },
      m(target, anchor) {
        insert(target, a, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
      }
    };
  }
  function create_fragment41(ctx) {
    let header;
    let nav;
    let div0;
    let a0;
    let t0;
    let a1;
    let t3;
    let div8;
    let div7;
    let a2;
    let t5;
    let a3;
    let t7;
    let div2;
    let t15;
    let div4;
    let t23;
    let div6;
    let div5;
    let mounted;
    let dispose;
    function select_block_type(ctx2, dirty) {
      if (
        /*$isLogin*/
        ctx2[1] || /*token*/
        ctx2[2]
      )
        return create_if_block18;
      return create_else_block8;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    return {
      c() {
        header = element("header");
        nav = element("nav");
        div0 = element("div");
        a0 = element("a");
        a0.innerHTML = `<img src="/img/logo-uisi-negatif.png" width="112" height="28" alt="Logo UISI"/>`;
        t0 = space();
        a1 = element("a");
        a1.innerHTML = `<span></span> <span></span> <span></span>`;
        t3 = space();
        div8 = element("div");
        div7 = element("div");
        a2 = element("a");
        a2.textContent = "Beranda";
        t5 = space();
        a3 = element("a");
        a3.textContent = "About UISI";
        t7 = space();
        div2 = element("div");
        div2.innerHTML = `<a class="navbar-link">Penelitian</a> <div class="navbar-dropdown"><a class="navbar-item" href="/penelitian">Penelitian Internal</a> <a class="navbar-item" href="/penelitian">Penelitian Eksternal</a> <a class="navbar-item" href="/penelitian">Penelitian Mandiri</a></div>`;
        t15 = space();
        div4 = element("div");
        div4.innerHTML = `<a class="navbar-link">Pengabdian Masyarakat</a> <div class="navbar-dropdown"><a class="navbar-item" href="/abdimas">Pengabdian Masyarakat Internal</a> <a class="navbar-item" href="/abdimas">Pengabdian Masyarakat Eksternal</a> <a class="navbar-item" href="/abdimas">Pengabdian Masyarakat Mandiri</a></div>`;
        t23 = space();
        div6 = element("div");
        div5 = element("div");
        if_block.c();
        attr(a0, "class", "navbar-item");
        attr(a0, "href", "/");
        attr(a1, "class", "navbar-burger");
        attr(a1, "id", "burger");
        attr(div0, "class", "navbar-brand");
        attr(a2, "class", "navbar-item");
        attr(a2, "href", "/");
        attr(a3, "class", "navbar-item");
        attr(a3, "href", "/about");
        attr(div2, "class", "navbar-item has-dropdown is-hoverable");
        attr(div4, "class", "navbar-item has-dropdown is-hoverable");
        attr(div5, "class", "buttons");
        attr(div6, "class", "navbar-item");
        attr(div7, "class", "navbar-end");
        attr(div8, "class", "navbar-menu");
        attr(div8, "id", "nav-links");
        attr(nav, "class", "navbar is-dark svelte-gab4e");
        attr(header, "class", "svelte-gab4e");
      },
      m(target, anchor) {
        insert(target, header, anchor);
        append(header, nav);
        append(nav, div0);
        append(div0, a0);
        append(div0, t0);
        append(div0, a1);
        append(nav, t3);
        append(nav, div8);
        append(div8, div7);
        append(div7, a2);
        append(div7, t5);
        append(div7, a3);
        append(div7, t7);
        append(div7, div2);
        append(div7, t15);
        append(div7, div4);
        append(div7, t23);
        append(div7, div6);
        append(div6, div5);
        if_block.m(div5, null);
        ctx[4](div8);
        if (!mounted) {
          dispose = listen(
            a1,
            "click",
            /*test*/
            ctx[3]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (current_block_type !== (current_block_type = select_block_type(ctx2, dirty))) {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(div5, null);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(header);
        }
        if_block.d();
        ctx[4](null);
        mounted = false;
        dispose();
      }
    };
  }
  function instance33($$self, $$props, $$invalidate) {
    let $isLogin;
    component_subscribe($$self, isLogin, ($$value) => $$invalidate(1, $isLogin = $$value));
    let token = localStorage.getItem("token");
    let navbarMenu;
    function test() {
      navbarMenu.classList.toggle("is-active");
    }
    function div8_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        navbarMenu = $$value;
        $$invalidate(0, navbarMenu);
      });
    }
    return [navbarMenu, $isLogin, token, test, div8_binding];
  }
  var Navbarmenu = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance33, create_fragment41, safe_not_equal, {});
    }
  };
  var Navbarmenu_default = Navbarmenu;

  // src/App.svelte
  function create_if_block_114(ctx) {
    let sidebar;
    let current;
    sidebar = new Sidebar_default({});
    return {
      c() {
        create_component(sidebar.$$.fragment);
      },
      m(target, anchor) {
        mount_component(sidebar, target, anchor);
        current = true;
      },
      i(local) {
        if (current)
          return;
        transition_in(sidebar.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(sidebar.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(sidebar, detaching);
      }
    };
  }
  function create_if_block19(ctx) {
    let main;
    let switch_instance;
    let current;
    var switch_value = (
      /*cmp*/
      ctx[0]
    );
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[1]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        main = element("main");
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
      },
      m(target, anchor) {
        insert(target, main, anchor);
        if (switch_instance)
          mount_component(switch_instance, main, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*cmp*/
        1 && switch_value !== (switch_value = /*cmp*/
        ctx2[0])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, main, null);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          2)
            switch_instance_changes.params = /*params*/
            ctx2[1];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(main);
        }
        if (switch_instance)
          destroy_component(switch_instance);
      }
    };
  }
  function create_fragment42(ctx) {
    let navbarmenu;
    let t0;
    let t1;
    let if_block1_anchor;
    let current;
    navbarmenu = new Navbarmenu_default({});
    let if_block0 = (
      /*token*/
      ctx[2] && create_if_block_114(ctx)
    );
    let if_block1 = (
      /*cmp*/
      ctx[0] && create_if_block19(ctx)
    );
    return {
      c() {
        create_component(navbarmenu.$$.fragment);
        t0 = space();
        if (if_block0)
          if_block0.c();
        t1 = space();
        if (if_block1)
          if_block1.c();
        if_block1_anchor = empty();
      },
      m(target, anchor) {
        mount_component(navbarmenu, target, anchor);
        insert(target, t0, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t1, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, if_block1_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*token*/
          ctx2[2]
        ) {
          if (if_block0) {
            if (dirty & /*token*/
            4) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_114(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(t1.parentNode, t1);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        if (
          /*cmp*/
          ctx2[0]
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
            if (dirty & /*cmp*/
            1) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block19(ctx2);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(navbarmenu.$$.fragment, local);
        transition_in(if_block0);
        transition_in(if_block1);
        current = true;
      },
      o(local) {
        transition_out(navbarmenu.$$.fragment, local);
        transition_out(if_block0);
        transition_out(if_block1);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(if_block1_anchor);
        }
        destroy_component(navbarmenu, detaching);
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
      }
    };
  }
  function instance34($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(4, $route = $$value));
    let cmp, params;
    let token, role;
    const router2 = router_default(routes_default, E404_default, (route2) => {
      $$invalidate(0, cmp = route2.page);
      $$invalidate(1, params = route2.params);
      auth = localStorage.getItem("auth");
      $$invalidate(2, token = localStorage.getItem("token"));
      role = localStorage.getItem("role");
    });
    set_store_value(route, $route = router2.route, $route);
    $route(location.pathname + location.search);
    router2.listen();
    onDestroy(router2.unlisten);
    if (location.pathname === "/") {
      if (!token)
        $route("/");
      else {
        if (role === "admin")
          $route("/admin");
        else
          $route("/dosen");
      }
    }
    $:
      location.pathname, () => {
        if (location.pathname === "/") {
        }
      };
    return [cmp, params, token];
  }
  var App = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance34, create_fragment42, safe_not_equal, {});
    }
  };
  var App_default = App;

  // src/main.js
  var app = new App_default({
    target: document.body
  });
  var main_default = app;
})();
