var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var react = { exports: {} };
var react_production = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE$3 = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE$3 = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE$3 = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE$2 = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE$2 = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE$2 = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE$2 = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE$2 = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE$2 = Symbol.for("react.suspense"), REACT_MEMO_TYPE$2 = Symbol.for("react.memo"), REACT_LAZY_TYPE$2 = Symbol.for("react.lazy"), MAYBE_ITERATOR_SYMBOL$2 = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL$2 && maybeIterable[MAYBE_ITERATOR_SYMBOL$2] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var ReactNoopUpdateQueue = {
  isMounted: function() {
    return false;
  },
  enqueueForceUpdate: function() {
  },
  enqueueReplaceState: function() {
  },
  enqueueSetState: function() {
  }
}, assign$2 = Object.assign, emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function(partialState, callback) {
  if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {
}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
assign$2(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
var isArrayImpl$2 = Array.isArray, ReactSharedInternals$3 = { H: null, A: null, T: null, S: null }, hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function ReactElement(type, key, self, source, owner, props) {
  self = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE$3,
    type,
    key,
    ref: void 0 !== self ? self : null,
    props
  };
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(
    oldElement.type,
    newKey,
    void 0,
    void 0,
    void 0,
    oldElement.props
  );
}
function isValidElement(object) {
  return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE$3;
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return "$" + key.replace(/[=:]/g, function(match) {
    return escaperLookup[match];
  });
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index) {
  return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
}
function noop$1$2() {
}
function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      switch ("string" === typeof thenable.status ? thenable.then(noop$1$2, noop$1$2) : (thenable.status = "pending", thenable.then(
        function(fulfilledValue) {
          "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
        },
        function(error) {
          "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
        }
      )), thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
  }
  throw thenable;
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = false;
  if (null === children) invokeCallback = true;
  else
    switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = true;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE$3:
          case REACT_PORTAL_TYPE$3:
            invokeCallback = true;
            break;
          case REACT_LAZY_TYPE$2:
            return invokeCallback = children._init, mapIntoArray(
              invokeCallback(children._payload),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
        }
    }
  if (invokeCallback)
    return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl$2(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
      return c;
    })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
      callback,
      escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
        userProvidedKeyEscapeRegex,
        "$&/"
      ) + "/") + invokeCallback
    )), array.push(callback)), 1;
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl$2(children))
    for (var i = 0; i < children.length; i++)
      nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
        nameSoFar,
        array,
        escapedPrefix,
        type,
        callback
      );
  else if (i = getIteratorFn(children), "function" === typeof i)
    for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
      nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
        nameSoFar,
        array,
        escapedPrefix,
        type,
        callback
      );
  else if ("object" === type) {
    if ("function" === typeof children.then)
      return mapIntoArray(
        resolveThenable(children),
        array,
        escapedPrefix,
        nameSoFar,
        callback
      );
    array = String(children);
    throw Error(
      "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
    );
  }
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [], count = 0;
  mapIntoArray(children, result, "", "", function(child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    ctor.then(
      function(moduleObject) {
        if (0 === payload._status || -1 === payload._status)
          payload._status = 1, payload._result = moduleObject;
      },
      function(error) {
        if (0 === payload._status || -1 === payload._status)
          payload._status = 2, payload._result = error;
      }
    );
    -1 === payload._status && (payload._status = 0, payload._result = ctor);
  }
  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}
var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
  if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
    var event = new window.ErrorEvent("error", {
      bubbles: true,
      cancelable: true,
      message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
      error
    });
    if (!window.dispatchEvent(event)) return;
  } else if ("object" === typeof process && "function" === typeof process.emit) {
    process.emit("uncaughtException", error);
    return;
  }
  console.error(error);
};
function noop$5() {
}
react_production.Children = {
  map: mapChildren,
  forEach: function(children, forEachFunc, forEachContext) {
    mapChildren(
      children,
      function() {
        forEachFunc.apply(this, arguments);
      },
      forEachContext
    );
  },
  count: function(children) {
    var n = 0;
    mapChildren(children, function() {
      n++;
    });
    return n;
  },
  toArray: function(children) {
    return mapChildren(children, function(child) {
      return child;
    }) || [];
  },
  only: function(children) {
    if (!isValidElement(children))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return children;
  }
};
react_production.Component = Component;
react_production.Fragment = REACT_FRAGMENT_TYPE$3;
react_production.Profiler = REACT_PROFILER_TYPE$2;
react_production.PureComponent = PureComponent;
react_production.StrictMode = REACT_STRICT_MODE_TYPE$2;
react_production.Suspense = REACT_SUSPENSE_TYPE$2;
react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals$3;
react_production.act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production.cache = function(fn) {
  return function() {
    return fn.apply(null, arguments);
  };
};
react_production.cloneElement = function(element, config, children) {
  if (null === element || void 0 === element)
    throw Error(
      "The argument must be a React element, but you passed " + element + "."
    );
  var props = assign$2({}, element.props), key = element.key, owner = void 0;
  if (null != config)
    for (propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config)
      !hasOwnProperty$2.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;
  else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  return ReactElement(element.type, key, void 0, void 0, owner, props);
};
react_production.createContext = function(defaultValue) {
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE$2,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = defaultValue;
  defaultValue.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE$2,
    _context: defaultValue
  };
  return defaultValue;
};
react_production.createElement = function(type, config, children) {
  var propName, props = {}, key = null;
  if (null != config)
    for (propName in void 0 !== config.key && (key = "" + config.key), config)
      hasOwnProperty$2.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in childrenLength = type.defaultProps, childrenLength)
      void 0 === props[propName] && (props[propName] = childrenLength[propName]);
  return ReactElement(type, key, void 0, void 0, null, props);
};
react_production.createRef = function() {
  return { current: null };
};
react_production.forwardRef = function(render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE$2, render };
};
react_production.isValidElement = isValidElement;
react_production.lazy = function(ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE$2,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
react_production.memo = function(type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE$2,
    type,
    compare: void 0 === compare ? null : compare
  };
};
react_production.startTransition = function(scope) {
  var prevTransition = ReactSharedInternals$3.T, currentTransition = {};
  ReactSharedInternals$3.T = currentTransition;
  try {
    var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals$3.S;
    null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
    "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop$5, reportGlobalError);
  } catch (error) {
    reportGlobalError(error);
  } finally {
    ReactSharedInternals$3.T = prevTransition;
  }
};
react_production.unstable_useCacheRefresh = function() {
  return ReactSharedInternals$3.H.useCacheRefresh();
};
react_production.use = function(usable) {
  return ReactSharedInternals$3.H.use(usable);
};
react_production.useActionState = function(action, initialState, permalink) {
  return ReactSharedInternals$3.H.useActionState(action, initialState, permalink);
};
react_production.useCallback = function(callback, deps) {
  return ReactSharedInternals$3.H.useCallback(callback, deps);
};
react_production.useContext = function(Context) {
  return ReactSharedInternals$3.H.useContext(Context);
};
react_production.useDebugValue = function() {
};
react_production.useDeferredValue = function(value, initialValue) {
  return ReactSharedInternals$3.H.useDeferredValue(value, initialValue);
};
react_production.useEffect = function(create, deps) {
  return ReactSharedInternals$3.H.useEffect(create, deps);
};
react_production.useId = function() {
  return ReactSharedInternals$3.H.useId();
};
react_production.useImperativeHandle = function(ref, create, deps) {
  return ReactSharedInternals$3.H.useImperativeHandle(ref, create, deps);
};
react_production.useInsertionEffect = function(create, deps) {
  return ReactSharedInternals$3.H.useInsertionEffect(create, deps);
};
react_production.useLayoutEffect = function(create, deps) {
  return ReactSharedInternals$3.H.useLayoutEffect(create, deps);
};
react_production.useMemo = function(create, deps) {
  return ReactSharedInternals$3.H.useMemo(create, deps);
};
react_production.useOptimistic = function(passthrough, reducer) {
  return ReactSharedInternals$3.H.useOptimistic(passthrough, reducer);
};
react_production.useReducer = function(reducer, initialArg, init) {
  return ReactSharedInternals$3.H.useReducer(reducer, initialArg, init);
};
react_production.useRef = function(initialValue) {
  return ReactSharedInternals$3.H.useRef(initialValue);
};
react_production.useState = function(initialState) {
  return ReactSharedInternals$3.H.useState(initialState);
};
react_production.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
  return ReactSharedInternals$3.H.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
};
react_production.useTransition = function() {
  return ReactSharedInternals$3.H.useTransition();
};
react_production.version = "19.0.0";
{
  react.exports = react_production;
}
var reactExports = react.exports;
var HOLE = -1;
var NAN = -2;
var NEGATIVE_INFINITY = -3;
var NEGATIVE_ZERO = -4;
var NULL = -5;
var POSITIVE_INFINITY = -6;
var UNDEFINED = -7;
var TYPE_BIGINT = "B";
var TYPE_DATE = "D";
var TYPE_ERROR = "E";
var TYPE_MAP = "M";
var TYPE_NULL_OBJECT = "N";
var TYPE_PROMISE = "P";
var TYPE_REGEXP = "R";
var TYPE_SET = "S";
var TYPE_SYMBOL = "Y";
var TYPE_URL = "U";
var TYPE_PREVIOUS_RESOLVED = "Z";
var Deferred = class {
  constructor() {
    __publicField(this, "promise");
    __publicField(this, "resolve");
    __publicField(this, "reject");
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
function createLineSplittingTransform() {
  const decoder = new TextDecoder();
  let leftover = "";
  return new TransformStream({
    transform(chunk, controller) {
      const str = decoder.decode(chunk, { stream: true });
      const parts = (leftover + str).split("\n");
      leftover = parts.pop() || "";
      for (const part of parts) {
        controller.enqueue(part);
      }
    },
    flush(controller) {
      if (leftover) {
        controller.enqueue(leftover);
      }
    }
  });
}
function flatten(input) {
  const { indices } = this;
  const existing = indices.get(input);
  if (existing)
    return [existing];
  if (input === void 0)
    return UNDEFINED;
  if (input === null)
    return NULL;
  if (Number.isNaN(input))
    return NAN;
  if (input === Number.POSITIVE_INFINITY)
    return POSITIVE_INFINITY;
  if (input === Number.NEGATIVE_INFINITY)
    return NEGATIVE_INFINITY;
  if (input === 0 && 1 / input < 0)
    return NEGATIVE_ZERO;
  const index = this.index++;
  indices.set(input, index);
  stringify.call(this, input, index);
  return index;
}
function stringify(input, index) {
  const { deferred, plugins, postPlugins } = this;
  const str = this.stringified;
  const stack = [[input, index]];
  while (stack.length > 0) {
    const [input2, index2] = stack.pop();
    const partsForObj = (obj) => Object.keys(obj).map((k) => `"_${flatten.call(this, k)}":${flatten.call(this, obj[k])}`).join(",");
    let error = null;
    switch (typeof input2) {
      case "boolean":
      case "number":
      case "string":
        str[index2] = JSON.stringify(input2);
        break;
      case "bigint":
        str[index2] = `["${TYPE_BIGINT}","${input2}"]`;
        break;
      case "symbol": {
        const keyFor = Symbol.keyFor(input2);
        if (!keyFor) {
          error = new Error(
            "Cannot encode symbol unless created with Symbol.for()"
          );
        } else {
          str[index2] = `["${TYPE_SYMBOL}",${JSON.stringify(keyFor)}]`;
        }
        break;
      }
      case "object": {
        if (!input2) {
          str[index2] = `${NULL}`;
          break;
        }
        const isArray = Array.isArray(input2);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input2);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
              }
              str[index2] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          let result = isArray ? "[" : "{";
          if (isArray) {
            for (let i = 0; i < input2.length; i++)
              result += (i ? "," : "") + (i in input2 ? flatten.call(this, input2[i]) : HOLE);
            str[index2] = `${result}]`;
          } else if (input2 instanceof Date) {
            str[index2] = `["${TYPE_DATE}",${input2.getTime()}]`;
          } else if (input2 instanceof URL) {
            str[index2] = `["${TYPE_URL}",${JSON.stringify(input2.href)}]`;
          } else if (input2 instanceof RegExp) {
            str[index2] = `["${TYPE_REGEXP}",${JSON.stringify(
              input2.source
            )},${JSON.stringify(input2.flags)}]`;
          } else if (input2 instanceof Set) {
            if (input2.size > 0) {
              str[index2] = `["${TYPE_SET}",${[...input2].map((val) => flatten.call(this, val)).join(",")}]`;
            } else {
              str[index2] = `["${TYPE_SET}"]`;
            }
          } else if (input2 instanceof Map) {
            if (input2.size > 0) {
              str[index2] = `["${TYPE_MAP}",${[...input2].flatMap(([k, v]) => [
                flatten.call(this, k),
                flatten.call(this, v)
              ]).join(",")}]`;
            } else {
              str[index2] = `["${TYPE_MAP}"]`;
            }
          } else if (input2 instanceof Promise) {
            str[index2] = `["${TYPE_PROMISE}",${index2}]`;
            deferred[index2] = input2;
          } else if (input2 instanceof Error) {
            str[index2] = `["${TYPE_ERROR}",${JSON.stringify(input2.message)}`;
            if (input2.name !== "Error") {
              str[index2] += `,${JSON.stringify(input2.name)}`;
            }
            str[index2] += "]";
          } else if (Object.getPrototypeOf(input2) === null) {
            str[index2] = `["${TYPE_NULL_OBJECT}",{${partsForObj(input2)}}]`;
          } else if (isPlainObject(input2)) {
            str[index2] = `{${partsForObj(input2)}}`;
          } else {
            error = new Error("Cannot encode object with prototype");
          }
        }
        break;
      }
      default: {
        const isArray = Array.isArray(input2);
        let pluginHandled = false;
        if (!isArray && plugins) {
          for (const plugin of plugins) {
            const pluginResult = plugin(input2);
            if (Array.isArray(pluginResult)) {
              pluginHandled = true;
              const [pluginIdentifier, ...rest] = pluginResult;
              str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
              if (rest.length > 0) {
                str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
              }
              str[index2] += "]";
              break;
            }
          }
        }
        if (!pluginHandled) {
          error = new Error("Cannot encode function or unexpected type");
        }
      }
    }
    if (error) {
      let pluginHandled = false;
      if (postPlugins) {
        for (const plugin of postPlugins) {
          const pluginResult = plugin(input2);
          if (Array.isArray(pluginResult)) {
            pluginHandled = true;
            const [pluginIdentifier, ...rest] = pluginResult;
            str[index2] = `[${JSON.stringify(pluginIdentifier)}`;
            if (rest.length > 0) {
              str[index2] += `,${rest.map((v) => flatten.call(this, v)).join(",")}`;
            }
            str[index2] += "]";
            break;
          }
        }
      }
      if (!pluginHandled) {
        throw error;
      }
    }
  }
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}
var globalObj = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : void 0;
function unflatten(parsed) {
  const { hydrated, values } = this;
  if (typeof parsed === "number")
    return hydrate.call(this, parsed);
  if (!Array.isArray(parsed) || !parsed.length)
    throw new SyntaxError();
  const startIndex2 = values.length;
  for (const value of parsed) {
    values.push(value);
  }
  hydrated.length = values.length;
  return hydrate.call(this, startIndex2);
}
function hydrate(index) {
  const { hydrated, values, deferred, plugins } = this;
  let result;
  const stack = [
    [
      index,
      (v) => {
        result = v;
      }
    ]
  ];
  let postRun = [];
  while (stack.length > 0) {
    const [index2, set] = stack.pop();
    switch (index2) {
      case UNDEFINED:
        set(void 0);
        continue;
      case NULL:
        set(null);
        continue;
      case NAN:
        set(NaN);
        continue;
      case POSITIVE_INFINITY:
        set(Infinity);
        continue;
      case NEGATIVE_INFINITY:
        set(-Infinity);
        continue;
      case NEGATIVE_ZERO:
        set(-0);
        continue;
    }
    if (hydrated[index2]) {
      set(hydrated[index2]);
      continue;
    }
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated[index2] = value;
      set(value);
      continue;
    }
    if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const [type, b2, c] = value;
        switch (type) {
          case TYPE_DATE:
            set(hydrated[index2] = new Date(b2));
            continue;
          case TYPE_URL:
            set(hydrated[index2] = new URL(b2));
            continue;
          case TYPE_BIGINT:
            set(hydrated[index2] = BigInt(b2));
            continue;
          case TYPE_REGEXP:
            set(hydrated[index2] = new RegExp(b2, c));
            continue;
          case TYPE_SYMBOL:
            set(hydrated[index2] = Symbol.for(b2));
            continue;
          case TYPE_SET:
            const newSet = /* @__PURE__ */ new Set();
            hydrated[index2] = newSet;
            for (let i = 1; i < value.length; i++)
              stack.push([
                value[i],
                (v) => {
                  newSet.add(v);
                }
              ]);
            set(newSet);
            continue;
          case TYPE_MAP:
            const map = /* @__PURE__ */ new Map();
            hydrated[index2] = map;
            for (let i = 1; i < value.length; i += 2) {
              const r = [];
              stack.push([
                value[i + 1],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                value[i],
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                map.set(r[0], r[1]);
              });
            }
            set(map);
            continue;
          case TYPE_NULL_OBJECT:
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index2] = obj;
            for (const key of Object.keys(b2).reverse()) {
              const r = [];
              stack.push([
                b2[key],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                Number(key.slice(1)),
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                obj[r[0]] = r[1];
              });
            }
            set(obj);
            continue;
          case TYPE_PROMISE:
            if (hydrated[b2]) {
              set(hydrated[index2] = hydrated[b2]);
            } else {
              const d = new Deferred();
              deferred[b2] = d;
              set(hydrated[index2] = d.promise);
            }
            continue;
          case TYPE_ERROR:
            const [, message, errorType] = value;
            let error = errorType && globalObj && globalObj[errorType] ? new globalObj[errorType](message) : new Error(message);
            hydrated[index2] = error;
            set(error);
            continue;
          case TYPE_PREVIOUS_RESOLVED:
            set(hydrated[index2] = hydrated[b2]);
            continue;
          default:
            if (Array.isArray(plugins)) {
              const r = [];
              const vals = value.slice(1);
              for (let i = 0; i < vals.length; i++) {
                const v = vals[i];
                stack.push([
                  v,
                  (v2) => {
                    r[i] = v2;
                  }
                ]);
              }
              postRun.push(() => {
                for (const plugin of plugins) {
                  const result2 = plugin(value[0], ...r);
                  if (result2) {
                    set(hydrated[index2] = result2.value);
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const array = [];
        hydrated[index2] = array;
        for (let i = 0; i < value.length; i++) {
          const n = value[i];
          if (n !== HOLE) {
            stack.push([
              n,
              (v) => {
                array[i] = v;
              }
            ]);
          }
        }
        set(array);
        continue;
      }
    } else {
      const object = {};
      hydrated[index2] = object;
      for (const key of Object.keys(value).reverse()) {
        const r = [];
        stack.push([
          value[key],
          (v) => {
            r[1] = v;
          }
        ]);
        stack.push([
          Number(key.slice(1)),
          (k) => {
            r[0] = k;
          }
        ]);
        postRun.push(() => {
          object[r[0]] = r[1];
        });
      }
      set(object);
      continue;
    }
  }
  while (postRun.length > 0) {
    postRun.pop()();
  }
  return result;
}
async function decode$1(readable, options) {
  const { plugins } = options ?? {};
  const done = new Deferred();
  const reader = readable.pipeThrough(createLineSplittingTransform()).getReader();
  const decoder = {
    values: [],
    hydrated: [],
    deferred: {},
    plugins
  };
  const decoded = await decodeInitial.call(decoder, reader);
  let donePromise = done.promise;
  if (decoded.done) {
    done.resolve();
  } else {
    donePromise = decodeDeferred.call(decoder, reader).then(done.resolve).catch((reason) => {
      for (const deferred of Object.values(decoder.deferred)) {
        deferred.reject(reason);
      }
      done.reject(reason);
    });
  }
  return {
    done: donePromise.then(() => reader.closed),
    value: decoded.value
  };
}
async function decodeInitial(reader) {
  const read = await reader.read();
  if (!read.value) {
    throw new SyntaxError();
  }
  let line;
  try {
    line = JSON.parse(read.value);
  } catch (reason) {
    throw new SyntaxError();
  }
  return {
    done: read.done,
    value: unflatten.call(this, line)
  };
}
async function decodeDeferred(reader) {
  let read = await reader.read();
  while (!read.done) {
    if (!read.value)
      continue;
    const line = read.value;
    switch (line[0]) {
      case TYPE_PROMISE: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.resolve(value);
        break;
      }
      case TYPE_ERROR: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.reject(value);
        break;
      }
      default:
        throw new SyntaxError();
    }
    read = await reader.read();
  }
}
function encode(input, options) {
  const { plugins, postPlugins, signal } = options ?? {};
  const encoder = {
    deferred: {},
    index: 0,
    indices: /* @__PURE__ */ new Map(),
    stringified: [],
    plugins,
    postPlugins,
    signal
  };
  const textEncoder2 = new TextEncoder();
  let lastSentIndex = 0;
  const readable = new ReadableStream({
    async start(controller) {
      const id = flatten.call(encoder, input);
      if (Array.isArray(id)) {
        throw new Error("This should never happen");
      }
      if (id < 0) {
        controller.enqueue(textEncoder2.encode(`${id}
`));
      } else {
        controller.enqueue(
          textEncoder2.encode(`[${encoder.stringified.join(",")}]
`)
        );
        lastSentIndex = encoder.stringified.length - 1;
      }
      const seenPromises = /* @__PURE__ */ new WeakSet();
      while (Object.keys(encoder.deferred).length > 0) {
        for (const [deferredId, deferred] of Object.entries(encoder.deferred)) {
          if (seenPromises.has(deferred))
            continue;
          seenPromises.add(
            encoder.deferred[Number(deferredId)] = raceSignal(
              deferred,
              encoder.signal
            ).then(
              (resolved) => {
                const id2 = flatten.call(encoder, resolved);
                if (Array.isArray(id2)) {
                  controller.enqueue(
                    textEncoder2.encode(
                      `${TYPE_PROMISE}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                    )
                  );
                  encoder.index++;
                  lastSentIndex++;
                } else if (id2 < 0) {
                  controller.enqueue(
                    textEncoder2.encode(`${TYPE_PROMISE}${deferredId}:${id2}
`)
                  );
                } else {
                  const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                  controller.enqueue(
                    textEncoder2.encode(
                      `${TYPE_PROMISE}${deferredId}:[${values}]
`
                    )
                  );
                  lastSentIndex = encoder.stringified.length - 1;
                }
              },
              (reason) => {
                if (!reason || typeof reason !== "object" || !(reason instanceof Error)) {
                  reason = new Error("An unknown error occurred");
                }
                const id2 = flatten.call(encoder, reason);
                if (Array.isArray(id2)) {
                  controller.enqueue(
                    textEncoder2.encode(
                      `${TYPE_ERROR}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`
                    )
                  );
                  encoder.index++;
                  lastSentIndex++;
                } else if (id2 < 0) {
                  controller.enqueue(
                    textEncoder2.encode(`${TYPE_ERROR}${deferredId}:${id2}
`)
                  );
                } else {
                  const values = encoder.stringified.slice(lastSentIndex + 1).join(",");
                  controller.enqueue(
                    textEncoder2.encode(
                      `${TYPE_ERROR}${deferredId}:[${values}]
`
                    )
                  );
                  lastSentIndex = encoder.stringified.length - 1;
                }
              }
            ).finally(() => {
              delete encoder.deferred[Number(deferredId)];
            })
          );
        }
        await Promise.race(Object.values(encoder.deferred));
      }
      await Promise.all(Object.values(encoder.deferred));
      controller.close();
    }
  });
  return readable;
}
function raceSignal(promise, signal) {
  if (!signal)
    return promise;
  if (signal.aborted)
    return Promise.reject(signal.reason || new Error("Signal was aborted."));
  const abort2 = new Promise((resolve, reject) => {
    signal.addEventListener("abort", (event) => {
      reject(signal.reason || new Error("Signal was aborted."));
    });
    promise.then(resolve).catch(reject);
  });
  abort2.catch(() => {
  });
  return Promise.race([abort2, promise]);
}
var dist = {};
Object.defineProperty(dist, "__esModule", { value: true });
dist.parse = parse$1;
dist.serialize = serialize;
const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parse$1(str, options) {
  const obj = new NullObject();
  const len = str.length;
  if (len < 2)
    return obj;
  const dec = (options == null ? void 0 : options.decode) || decode;
  let index = 0;
  do {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1)
      break;
    const colonIdx = str.indexOf(";", index);
    const endIdx = colonIdx === -1 ? len : colonIdx;
    if (eqIdx > endIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const keyStartIdx = startIndex(str, index, eqIdx);
    const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
    const key = str.slice(keyStartIdx, keyEndIdx);
    if (obj[key] === void 0) {
      let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
      let valEndIdx = endIndex(str, endIdx, valStartIdx);
      const value = dec(str.slice(valStartIdx, valEndIdx));
      obj[key] = value;
    }
    index = endIdx + 1;
  } while (index < len);
  return obj;
}
function startIndex(str, index, max) {
  do {
    const code = str.charCodeAt(index);
    if (code !== 32 && code !== 9)
      return index;
  } while (++index < max);
  return max;
}
function endIndex(str, index, min) {
  while (index > min) {
    const code = str.charCodeAt(--index);
    if (code !== 32 && code !== 9)
      return index + 1;
  }
  return min;
}
function serialize(name, val, options) {
  const enc = (options == null ? void 0 : options.encode) || encodeURIComponent;
  if (!cookieNameRegExp.test(name)) {
    throw new TypeError(`argument name is invalid: ${name}`);
  }
  const value = enc(val);
  if (!cookieValueRegExp.test(value)) {
    throw new TypeError(`argument val is invalid: ${val}`);
  }
  let str = name + "=" + value;
  if (!options)
    return str;
  if (options.maxAge !== void 0) {
    if (!Number.isInteger(options.maxAge)) {
      throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
    }
    str += "; Max-Age=" + options.maxAge;
  }
  if (options.domain) {
    if (!domainValueRegExp.test(options.domain)) {
      throw new TypeError(`option domain is invalid: ${options.domain}`);
    }
    str += "; Domain=" + options.domain;
  }
  if (options.path) {
    if (!pathValueRegExp.test(options.path)) {
      throw new TypeError(`option path is invalid: ${options.path}`);
    }
    str += "; Path=" + options.path;
  }
  if (options.expires) {
    if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
      throw new TypeError(`option expires is invalid: ${options.expires}`);
    }
    str += "; Expires=" + options.expires.toUTCString();
  }
  if (options.httpOnly) {
    str += "; HttpOnly";
  }
  if (options.secure) {
    str += "; Secure";
  }
  if (options.partitioned) {
    str += "; Partitioned";
  }
  if (options.priority) {
    const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${options.priority}`);
    }
  }
  if (options.sameSite) {
    const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
    switch (sameSite) {
      case true:
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
    }
  }
  return str;
}
function decode(str) {
  if (str.indexOf("%") === -1)
    return str;
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}
function isDate(val) {
  return __toString.call(val) === "[object Date]";
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key === "expires") {
      cookie.expires = new Date(value2);
    } else if (key === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value2;
    } else if (key === "partitioned") {
      cookie.partitioned = true;
    } else {
      cookie[key] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key) {
        return key.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
/**
 * react-router v7.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
function createLocation(current, to, state = null, key) {
  let location = {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...typeof to === "string" ? parsePath(to) : to,
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  };
  return location;
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
var immutableRouteKeys = /* @__PURE__ */ new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes2, mapRouteProperties2, parentPath = [], manifest = {}) {
  return routes2.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(
      route.index !== true || !route.children,
      `Cannot specify children on an index route`
    );
    invariant(
      !manifest[id],
      `Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`
    );
    if (isIndexRoute(route)) {
      let indexRoute = {
        ...route,
        ...mapRouteProperties2(route),
        id
      };
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = {
        ...route,
        ...mapRouteProperties2(route),
        id,
        children: void 0
      };
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(
          route.children,
          mapRouteProperties2,
          treePath,
          manifest
        );
      }
      return pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes2, locationArg, basename2 = "/") {
  return matchRoutesImpl(routes2, locationArg, basename2, false);
}
function matchRoutesImpl(routes2, locationArg, basename2, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename2);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let { route, pathname, params } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes2, branches = [], parentsMeta = [], parentPath = "") {
  let flattenRoute = (route, index, relativePath) => {
    let meta2 = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta2.relativePath.startsWith("/")) {
      invariant(
        meta2.relativePath.startsWith(parentPath),
        `Absolute route path "${meta2.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta2.relativePath = meta2.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta2.relativePath]);
    let routesMeta = parentsMeta.concat(meta2);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes2.forEach((route, index) => {
    var _a;
    if (route.path === "" || !((_a = route.path) == null ? void 0 : _a.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b2) => a.score !== b2.score ? b2.score - a.score : compareIndexes(
      a.routesMeta.map((meta2) => meta2.childrenIndex),
      b2.routesMeta.map((meta2) => meta2.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b2) {
  let siblings = a.length === b2.length && a.slice(0, -1).every((n, i) => n === b2[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b2[b2.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta2 = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta2.relativePath, caseSensitive: meta2.caseSensitive, end },
      remainingPathname
    );
    let route = meta2.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta2.relativePath,
          caseSensitive: meta2.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern2, pathname) {
  if (typeof pattern2 === "string") {
    pattern2 = { path: pattern2, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern2.path,
    pattern2.caseSensitive,
    pattern2.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern: pattern2
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (_, paramName, isOptional) => {
      params.push({ paramName, isOptional: isOptional != null });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    }
  );
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename2) {
  if (basename2 === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename2.toLowerCase())) {
    return null;
  }
  let startIndex2 = basename2.endsWith("/") ? basename2.length - 1 : basename2.length;
  let nextChar = pathname.charAt(startIndex2);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex2) || "/";
}
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
var validMutationMethods = new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
var IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var defaultMapRouteProperties = (route) => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
function createStaticHandler(routes2, opts) {
  invariant(
    routes2.length > 0,
    "You must provide a non-empty routes array to createStaticHandler"
  );
  let manifest = {};
  let basename2 = (opts ? opts.basename : null) || "/";
  let mapRouteProperties2 = (opts == null ? void 0 : opts.mapRouteProperties) || defaultMapRouteProperties;
  let dataRoutes = convertRoutesToDataRoutes(
    routes2,
    mapRouteProperties2,
    void 0,
    manifest
  );
  async function query(request, {
    requestContext,
    skipLoaderErrorBubbling,
    dataStrategy
  } = {}) {
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename2);
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, { method });
      let { matches: methodNotAllowedMatches, route } = getShortCircuitMatches(dataRoutes);
      return {
        basename: basename2,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, { pathname: location.pathname });
      let { matches: notFoundMatches, route } = getShortCircuitMatches(dataRoutes);
      return {
        basename: basename2,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      skipLoaderErrorBubbling === true,
      null
    );
    if (isResponse(result)) {
      return result;
    }
    return { location, basename: basename2, ...result };
  }
  async function queryRoute(request, {
    routeId,
    requestContext,
    dataStrategy
  } = {}) {
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename2);
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, { method });
    } else if (!matches) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      throw getInternalRouterError(404, { pathname: location.pathname });
    }
    let result = await queryImpl(
      request,
      location,
      matches,
      requestContext,
      dataStrategy || null,
      false,
      match
    );
    if (isResponse(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0) {
      throw error;
    }
    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      return Object.values(result.loaderData)[0];
    }
    return void 0;
  }
  async function queryImpl(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch) {
    invariant(
      request.signal,
      "query()/queryRoute() requests must contain an AbortController signal"
    );
    try {
      if (isMutationMethod(request.method)) {
        let result2 = await submit(
          request,
          matches,
          routeMatch || getTargetMatch(matches, location),
          requestContext,
          dataStrategy,
          skipLoaderErrorBubbling,
          routeMatch != null
        );
        return result2;
      }
      let result = await loadRouteData(
        request,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        routeMatch
      );
      return isResponse(result) ? result : {
        ...result,
        actionData: null,
        actionHeaders: {}
      };
    } catch (e) {
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === "error") {
          throw e.result;
        }
        return e.result;
      }
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: "error",
        error
      };
    } else {
      let results = await callDataStrategy(
        "action",
        request,
        [actionMatch],
        matches,
        isRouteRequest,
        requestContext,
        dataStrategy
      );
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest);
      }
    }
    if (isRedirectResult(result)) {
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isRouteRequest) {
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: { [actionMatch.route.id]: result.data },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let context2 = await loadRouteData(
        loaderRequest,
        matches,
        requestContext,
        dataStrategy,
        skipLoaderErrorBubbling,
        null,
        [boundaryMatch.route.id, result]
      );
      return {
        ...context2,
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: {
          ...result.headers ? { [actionMatch.route.id]: result.headers } : {}
        }
      };
    }
    let context = await loadRouteData(
      loaderRequest,
      matches,
      requestContext,
      dataStrategy,
      skipLoaderErrorBubbling,
      null
    );
    return {
      ...context,
      actionData: {
        [actionMatch.route.id]: result.data
      },
      // action status codes take precedence over loader status codes
      ...result.statusCode ? { statusCode: result.statusCode } : {},
      actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {}
    };
  }
  async function loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch == null ? void 0 : routeMatch.route.loader) && !(routeMatch == null ? void 0 : routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
    let matchesToLoad = requestMatches.filter(
      (m) => m.route.loader || m.route.lazy
    );
    if (matchesToLoad.length === 0) {
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce(
          (acc, m) => Object.assign(acc, { [m.route.id]: null }),
          {}
        ),
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {}
      };
    }
    let results = await callDataStrategy(
      "loader",
      request,
      matchesToLoad,
      matches,
      isRouteRequest,
      requestContext,
      dataStrategy
    );
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest);
    }
    let context = processRouteLoaderData(
      matches,
      results,
      pendingActionResult,
      true,
      skipLoaderErrorBubbling
    );
    let executedLoaders = new Set(
      matchesToLoad.map((match) => match.route.id)
    );
    matches.forEach((match) => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return {
      ...context,
      matches
    };
  }
  async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, dataStrategy) {
    let results = await callDataStrategyImpl(
      dataStrategy || defaultDataStrategy,
      type,
      null,
      request,
      matchesToLoad,
      matches,
      null,
      manifest,
      mapRouteProperties2,
      requestContext
    );
    let dataResults = {};
    await Promise.all(
      matches.map(async (match) => {
        if (!(match.route.id in results)) {
          return;
        }
        let result = results[match.route.id];
        if (isRedirectDataStrategyResult(result)) {
          let response = result.result;
          throw normalizeRelativeRoutingRedirectResponse(
            response,
            request,
            match.route.id,
            matches,
            basename2
          );
        }
        if (isResponse(result.result) && isRouteRequest) {
          throw result;
        }
        dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
      })
    );
    return dataResults;
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes2, context, error) {
  let newContext = {
    ...context,
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes2[0].id]: error
    }
  };
  return newContext;
}
function throwStaticHandlerAbortedError(request, isRouteRequest) {
  if (request.signal.reason !== void 0) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(
    `${method}() call aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`
  );
}
function normalizeTo(location, matches, basename2, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  let path = resolveTo(
    to ? to : ".",
    getResolveToMatches(contextualMatches),
    stripBasename(location.pathname, basename2) || location.pathname,
    relative === "path"
  );
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if (basename2 !== "/") {
    path.pathname = path.pathname === "/" ? basename2 : joinPaths([basename2, path.pathname]);
  }
  return createPath(path);
}
function getLoaderMatchesUntilBoundary(matches, boundaryId, includeBoundary = false) {
  let index = matches.findIndex((m) => m.route.id === boundaryId);
  if (index >= 0) {
    return matches.slice(0, includeBoundary ? index + 1 : index);
  }
  return matches;
}
async function loadLazyRouteModule(route, mapRouteProperties2, manifest) {
  if (!route.lazy) {
    return;
  }
  let lazyRoute = await route.lazy();
  if (!route.lazy) {
    return;
  }
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(
      !isPropertyStaticallyDefined,
      `Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`
    );
    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  }
  Object.assign(routeToUpdate, routeUpdates);
  Object.assign(routeToUpdate, {
    // To keep things framework agnostic, we use the provided `mapRouteProperties`
    // function to set the framework-aware properties (`element`/`hasErrorBoundary`)
    // since the logic will differ between frameworks.
    ...mapRouteProperties2(routeToUpdate),
    lazy: void 0
  });
}
async function defaultDataStrategy({
  matches
}) {
  let matchesToLoad = matches.filter((m) => m.shouldLoad);
  let results = await Promise.all(matchesToLoad.map((m) => m.resolve()));
  return results.reduce(
    (acc, result, i) => Object.assign(acc, { [matchesToLoad[i].route.id]: result }),
    {}
  );
}
async function callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties2, requestContext) {
  let loadRouteDefinitionsPromises = matches.map(
    (m) => m.route.lazy ? loadLazyRouteModule(m.route, mapRouteProperties2, manifest) : void 0
  );
  let dsMatches = matches.map((match, i) => {
    let loadRoutePromise = loadRouteDefinitionsPromises[i];
    let shouldLoad = matchesToLoad.some((m) => m.route.id === match.route.id);
    let resolve = async (handlerOverride) => {
      if (handlerOverride && request.method === "GET" && (match.route.lazy || match.route.loader)) {
        shouldLoad = true;
      }
      return shouldLoad ? callLoaderOrAction(
        type,
        request,
        match,
        loadRoutePromise,
        handlerOverride,
        requestContext
      ) : Promise.resolve({ type: "data", result: void 0 });
    };
    return {
      ...match,
      shouldLoad,
      resolve
    };
  });
  let results = await dataStrategyImpl({
    matches: dsMatches,
    request,
    params: matches[0].params,
    fetcherKey,
    context: requestContext
  });
  try {
    await Promise.all(loadRouteDefinitionsPromises);
  } catch (e) {
  }
  return results;
}
async function callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, staticContext) {
  let result;
  let onReject;
  let runHandler = (handler) => {
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = (ctx) => {
      if (typeof handler !== "function") {
        return Promise.reject(
          new Error(
            `You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`
          )
        );
      }
      return handler(
        {
          request,
          params: match.params,
          context: staticContext
        },
        ...ctx !== void 0 ? [ctx] : []
      );
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler());
        return { type: "data", result: val };
      } catch (e) {
        return { type: "error", result: e };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (loadRoutePromise) {
      if (handler) {
        let handlerError;
        let [value] = await Promise.all([
          // If the handler throws, don't let it immediately bubble out,
          // since we need to let the lazy() execution finish so we know if this
          // route has a boundary that can handle the error
          runHandler(handler).catch((e) => {
            handlerError = e;
          }),
          loadRoutePromise
        ]);
        if (handlerError !== void 0) {
          throw handlerError;
        }
        result = value;
      } else {
        await loadRoutePromise;
        handler = match.route[type];
        if (handler) {
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          return { type: "data", result: void 0 };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
  } catch (e) {
    return { type: "error", result: e };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  var _a, _b, _c, _d;
  let { result, type } = dataStrategyResult;
  if (isResponse(result)) {
    let data2;
    try {
      let contentType = result.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data2 = null;
        } else {
          data2 = await result.json();
        }
      } else {
        data2 = await result.text();
      }
    } catch (e) {
      return { type: "error", error: e };
    }
    if (type === "error") {
      return {
        type: "error",
        error: new ErrorResponseImpl(result.status, result.statusText, data2),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: "data",
      data: data2,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === "error") {
    if (isDataWithResponseInit(result)) {
      if (result.data instanceof Error) {
        return {
          type: "error",
          error: result.data,
          statusCode: (_a = result.init) == null ? void 0 : _a.status
        };
      }
      result = new ErrorResponseImpl(
        ((_b = result.init) == null ? void 0 : _b.status) || 500,
        void 0,
        result.data
      );
    }
    return {
      type: "error",
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : void 0
    };
  }
  if (isDataWithResponseInit(result)) {
    return {
      type: "data",
      data: result.data,
      statusCode: (_c = result.init) == null ? void 0 : _c.status,
      headers: ((_d = result.init) == null ? void 0 : _d.headers) ? new Headers(result.init.headers) : void 0
    };
  }
  return { type: "data", data: result };
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename2) {
  let location = response.headers.get("Location");
  invariant(
    location,
    "Redirects returned/thrown from loaders/actions must have a Location header"
  );
  if (!ABSOLUTE_URL_REGEX.test(location)) {
    let trimmedMatches = matches.slice(
      0,
      matches.findIndex((m) => m.route.id === routeId) + 1
    );
    location = normalizeTo(
      new URL(request.url),
      trimmedMatches,
      basename2,
      location
    );
    response.headers.set("Location", location);
  }
  return response;
}
function processRouteLoaderData(matches, results, pendingActionResult, isStaticHandler = false, skipLoaderErrorBubbling = false) {
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
  matches.forEach((match) => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant(
      !isRedirectResult(result),
      "Cannot handle redirect results in processLoaderData"
    );
    if (isErrorResult(result)) {
      let error = result.error;
      if (pendingError !== void 0) {
        error = pendingError;
        pendingError = void 0;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      if (!isStaticHandler) {
        loaderData[id] = ResetLoaderDataSymbol;
      }
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      loaderData[id] = result.data;
      if (result.statusCode && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  });
  if (pendingError !== void 0 && pendingActionResult) {
    errors = { [pendingActionResult[0]]: pendingError };
    loaderData[pendingActionResult[0]] = void 0;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes2) {
  let route = routes2.length === 1 ? routes2[0] : routes2.find((r) => r.index || !r.path || r.path === "/") || {
    id: `__shim-error-route__`
  };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route
      }
    ],
    route
  };
}
function getInternalRouterError(status, {
  pathname,
  routeId,
  method,
  type,
  message
} = {}) {
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = `Route "${routeId}" does not match URL "${pathname}"`;
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = `No route matches URL "${pathname}"`;
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`;
    } else if (method) {
      errorMessage = `Invalid request method "${method.toUpperCase()}"`;
    }
  }
  return new ErrorResponseImpl(
    status || 500,
    statusText,
    new Error(errorMessage),
    true
  );
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === "data" || result.type === "error");
}
function isRedirectDataStrategyResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isErrorResult(result) {
  return result.type === "error";
}
function isRedirectResult(result) {
  return (result && result.type) === "redirect";
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(result) {
  return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location");
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toUpperCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toUpperCase());
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    return matches[matches.length - 1];
  }
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
var DataRouterContext = reactExports.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = reactExports.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var ViewTransitionContext = reactExports.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = reactExports.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = reactExports.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = reactExports.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = reactExports.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = reactExports.createContext(null);
RouteErrorContext.displayName = "RouteError";
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename: basename2, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename2 !== "/") {
    joinedPathname = pathname === "/" ? basename2 : joinPaths([basename2, pathname]);
  }
  return navigator2.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return reactExports.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let { basename: basename2, navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator2.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename2 !== "/") {
        path.pathname = path.pathname === "/" ? basename2 : joinPaths([basename2, path.pathname]);
      }
      (!!options.replace ? navigator2.replace : navigator2.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename2,
      navigator2,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
var OutletContext = reactExports.createContext(null);
function useOutlet(context) {
  let outlet = reactExports.useContext(RouteContext).outlet;
  if (outlet) {
    return /* @__PURE__ */ reactExports.createElement(OutletContext.Provider, { value: context }, outlet);
  }
  return outlet;
}
function useParams() {
  let { matches } = reactExports.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = reactExports.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return reactExports.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutesImpl(routes2, locationArg, dataRouterState, future2) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator: navigator2 } = reactExports.useContext(NavigationContext);
  let { matches: parentMatches } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes2, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterState,
    future2
  );
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ reactExports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ reactExports.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error(
      "React Router caught the following error during render",
      error,
      errorInfo
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ reactExports.createElement(
      RouteErrorContext.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterState = null, future2 = null) {
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce(
            "route-fallback",
            false,
            "No `HydrateFallback` element provided to render during initial hydration"
          );
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(
        RenderedRoute,
        {
          match,
          routeContext: {
            outlet,
            matches: matches2,
            isDataRoute: dataRouterState != null
          },
          children
        }
      );
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(
      RenderErrorBoundary,
      {
        location: dataRouterState.location,
        revalidation: dataRouterState.revalidation,
        component: errorElement,
        error,
        children: getChildren(),
        routeContext: { outlet: null, matches: matches2, isDataRoute: true }
      }
    ) : getChildren();
  }, null);
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useNavigation() {
  let state = useDataRouterState(
    "useNavigation"
    /* UseNavigation */
  );
  return state.navigation;
}
function useMatches() {
  let { matches, loaderData } = useDataRouterState(
    "useMatches"
    /* UseMatches */
  );
  return reactExports.useMemo(
    () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
    [matches, loaderData]
  );
}
function useLoaderData() {
  let state = useDataRouterState(
    "useLoaderData"
    /* UseLoaderData */
  );
  let routeId = useCurrentRouteId(
    "useLoaderData"
    /* UseLoaderData */
  );
  return state.loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState(
    "useActionData"
    /* UseActionData */
  );
  let routeId = useCurrentRouteId(
    "useLoaderData"
    /* UseLoaderData */
  );
  return state.actionData ? state.actionData[routeId] : void 0;
}
function useRouteError() {
  var _a;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  );
  let routeId = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  if (error !== void 0) {
    return error;
  }
  return (_a = state.errors) == null ? void 0 : _a[routeId];
}
function useNavigateStable() {
  let { router } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  );
  let id = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  );
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    {
      if (route.element) {
        warning(
          false,
          "You should not include both `Component` and `element` on your route - `Component` will be used."
        );
      }
    }
    Object.assign(updates, {
      element: reactExports.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    {
      if (route.hydrateFallbackElement) {
        warning(
          false,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."
        );
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: reactExports.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    {
      if (route.errorElement) {
        warning(
          false,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."
        );
      }
    }
    Object.assign(updates, {
      errorElement: reactExports.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
reactExports.memo(DataRoutes);
function DataRoutes({
  routes: routes2,
  future: future2,
  state
}) {
  return useRoutesImpl(routes2, void 0, state, future2);
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP",
  navigator: navigator2,
  static: staticProp = false
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename2 = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(
    () => ({
      basename: basename2,
      navigator: navigator2,
      static: staticProp,
      future: {}
    }),
    [basename2, navigator2, staticProp]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename2);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename2, pathname, search, hash, state, key, navigationType]);
  warning(
    locationContext != null,
    `<Router basename="${basename2}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, { children, value: locationContext }));
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename2) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename2) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename2) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix2 = name ? `${name}.` : "";
        formData.append(`${prefix2}x`, "0");
        formData.append(`${prefix2}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) {
      throw error;
    }
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _a;
    let module = routeModules[match.route.id];
    let route = manifest.routes[match.route.id];
    return [
      route && route.css ? route.css.map((href) => ({ rel: "stylesheet", href })) : [],
      ((_a = module == null ? void 0 : module.links) == null ? void 0 : _a.call(module)) || []
    ];
  }).flat(2);
  let preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links2 = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links2.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    var _a;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_a = currentMatches[index].route.path) == null ? void 0 : _a.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      var _a;
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: ((_a = currentMatches[0]) == null ? void 0 : _a.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifestPatch.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function createHtml(html) {
  return { __html: html };
}
var SingleFetchRedirectSymbol = Symbol("SingleFetchRedirect");
function StreamTransfer({
  context,
  identifier,
  reader,
  textDecoder,
  nonce
}) {
  if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
    return null;
  }
  if (!context.renderMeta.streamCache) {
    context.renderMeta.streamCache = {};
  }
  let { streamCache } = context.renderMeta;
  let promise = streamCache[identifier];
  if (!promise) {
    promise = streamCache[identifier] = reader.read().then((result) => {
      streamCache[identifier].result = {
        done: result.done,
        value: textDecoder.decode(result.value, { stream: true })
      };
    }).catch((e) => {
      streamCache[identifier].error = e;
    });
  }
  if (promise.error) {
    throw promise.error;
  }
  if (promise.result === void 0) {
    throw promise;
  }
  let { done, value } = promise.result;
  let scriptTag = value ? /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `window.__reactRouterContext.streamController.enqueue(${escapeHtml(
          JSON.stringify(value)
        )});`
      }
    }
  ) : null;
  if (done) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, scriptTag, /* @__PURE__ */ reactExports.createElement(
      "script",
      {
        nonce,
        dangerouslySetInnerHTML: {
          __html: `window.__reactRouterContext.streamController.close();`
        }
      }
    ));
  } else {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, scriptTag, /* @__PURE__ */ reactExports.createElement(reactExports.Suspense, null, /* @__PURE__ */ reactExports.createElement(
      StreamTransfer,
      {
        context,
        identifier: identifier + 1,
        reader,
        textDecoder,
        nonce
      }
    )));
  }
}
function singleFetchUrl(reqUrl) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = "_root.data";
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.data`;
  }
  return url;
}
function decodeViaTurboStream(body, global2) {
  return decode$1(body, {
    plugins: [
      (type, ...rest) => {
        if (type === "SanitizedError") {
          let [name, message, stack] = rest;
          let Constructor = Error;
          if (name && name in global2 && typeof global2[name] === "function") {
            Constructor = global2[name];
          }
          let error = new Constructor(message);
          error.stack = stack;
          return { value: error };
        }
        if (type === "ErrorResponse") {
          let [data2, status, statusText] = rest;
          return {
            value: new ErrorResponseImpl(status, statusText, data2)
          };
        }
        if (type === "SingleFetchRedirect") {
          return { value: { [SingleFetchRedirectSymbol]: rest[0] } };
        }
        if (type === "SingleFetchClassInstance") {
          return { value: rest[0] };
        }
        if (type === "SingleFetchFallback") {
          return { value: void 0 };
        }
      }
    ]
  });
}
var RemixErrorBoundary = class extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = { error: props.error || null, location: props.location };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return { error: props.error || null, location: props.location };
    }
    return { error: props.error || state.error, location: state.location };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ reactExports.createElement(
        RemixRootDefaultErrorBoundary,
        {
          error: this.state.error,
          isOutsideRemixApp: true
        }
      );
    } else {
      return this.props.children;
    }
  }
};
function RemixRootDefaultErrorBoundary({
  error,
  isOutsideRemixApp
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `
      }
    }
  );
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ reactExports.createElement(BoundaryShell, { title: "Unhandled Thrown Response!" }, /* @__PURE__ */ reactExports.createElement("h1", { style: { fontSize: "24px" } }, error.status, " ", error.statusText), heyDeveloper);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ reactExports.createElement(
    BoundaryShell,
    {
      title: "Application Error!",
      isOutsideRemixApp
    },
    /* @__PURE__ */ reactExports.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
    /* @__PURE__ */ reactExports.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto"
        }
      },
      errorInstance.stack
    ),
    heyDeveloper
  );
}
function BoundaryShell({
  title,
  renderScripts,
  isOutsideRemixApp,
  children
}) {
  var _a;
  let { routeModules } = useFrameworkContext();
  if (((_a = routeModules.root) == null ? void 0 : _a.Layout) && !isOutsideRemixApp) {
    return children;
  }
  return /* @__PURE__ */ reactExports.createElement("html", { lang: "en" }, /* @__PURE__ */ reactExports.createElement("head", null, /* @__PURE__ */ reactExports.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ reactExports.createElement(
    "meta",
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover"
    }
  ), /* @__PURE__ */ reactExports.createElement("title", null, title)), /* @__PURE__ */ reactExports.createElement("body", null, /* @__PURE__ */ reactExports.createElement("main", { style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } }, children, renderScripts ? /* @__PURE__ */ reactExports.createElement(Scripts, null) : null)));
}
function RemixRootDefaultHydrateFallback() {
  return /* @__PURE__ */ reactExports.createElement(BoundaryShell, { title: "Loading...", renderScripts: true }, /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://remix.run/route/hydrate-fallback " +
                "for more information."
              );
            `
      }
    }
  ));
}
function groupRoutesByParentId(manifest) {
  let routes2 = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes2[parentId]) {
        routes2[parentId] = [];
      }
      routes2[parentId].push(route);
    }
  });
  return routes2;
}
function getRouteComponents(route, routeModule, isSpaMode2) {
  let Component4 = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode2 || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary3 = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ reactExports.createElement(RemixRootDefaultErrorBoundary, { error: useRouteError() }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component4 ? {
        element: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(Component4, null))
      } : { Component: Component4 },
      ...ErrorBoundary3 ? {
        errorElement: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(ErrorBoundary3, null))
      } : { ErrorBoundary: ErrorBoundary3 },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(HydrateFallback, null))
      } : { HydrateFallback }
    };
  }
  return { Component: Component4, ErrorBoundary: ErrorBoundary3, HydrateFallback };
}
function createServerRoutes(manifest, routeModules, future2, isSpaMode2, parentId = "", routesByParentId = groupRoutesByParentId(manifest), spaModeLazyPromise = Promise.resolve({ Component: () => null })) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant2(
      routeModule,
      "No `routeModule` available to create server routes"
    );
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode2),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode2 ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need action/shouldRevalidate on these routes since they're
      // for a static render
    };
    let children = createServerRoutes(
      manifest,
      routeModules,
      future2,
      isSpaMode2,
      route.id,
      routesByParentId,
      spaModeLazyPromise
    );
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null) return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(route, routeModule, isSpaMode2) {
  return isSpaMode2 && route.id !== "root" || routeModule.clientLoader != null && (routeModule.clientLoader.hydrate === true || route.hasLoader !== true);
}
function isFogOfWarEnabled(isSpaMode2) {
  return !isSpaMode2;
}
function getPartialManifest(manifest, router) {
  let routeIds = new Set(router.state.matches.map((m) => m.route.id));
  let segments = router.state.location.pathname.split("/").filter(Boolean);
  let paths = ["/"];
  segments.pop();
  while (segments.length > 0) {
    paths.push(`/${segments.join("/")}`);
    segments.pop();
  }
  paths.forEach((path) => {
    let matches = matchRoutes(router.routes, path, router.basename);
    if (matches) {
      matches.forEach((m) => routeIds.add(m.route.id));
    }
  });
  let initialRoutes = [...routeIds].reduce(
    (acc, id) => Object.assign(acc, { [id]: manifest.routes[id] }),
    {}
  );
  return {
    ...manifest,
    routes: initialRoutes
  };
}
function useDataRouterContext2() {
  let context = reactExports.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = reactExports.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = reactExports.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = reactExports.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = reactExports.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = reactExports.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = reactExports.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry2) => {
          setShouldPrefetch(entry2.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  reactExports.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode2) {
  if (isSpaMode2 && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m) => errors[m.route.id] !== void 0);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
function Links() {
  let { isSpaMode: isSpaMode2, manifest, routeModules, criticalCss } = useFrameworkContext();
  let { errors, matches: routerMatches } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode2);
  let keyedLinks = reactExports.useMemo(
    () => getKeyedLinksForMatches(matches, routeModules, manifest),
    [matches, routeModules, manifest]
  );
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, criticalCss ? /* @__PURE__ */ reactExports.createElement("style", { dangerouslySetInnerHTML: { __html: criticalCss } }) : null, keyedLinks.map(
    ({ key, link }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, { key, ...link }) : /* @__PURE__ */ reactExports.createElement("link", { key, ...link })
  ));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let { router } = useDataRouterContext2();
  let matches = reactExports.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    console.warn(`Tried to prefetch ${page} but no routes matched.`);
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(PrefetchPageLinksImpl, { page, matches, ...dataLinkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links2) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links2);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { manifest, routeModules } = useFrameworkContext();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = reactExports.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = reactExports.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      var _a;
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && ((_a = routeModules[m.route.id]) == null ? void 0 : _a.shouldRevalidate)) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page);
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = reactExports.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ reactExports.createElement("link", { key, ...link })
  )));
}
function Meta() {
  let { isSpaMode: isSpaMode2, routeModules } = useFrameworkContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location = useLocation();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode2);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta2 = [];
  let leafMeta = null;
  let matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i];
    let routeId = _match.route.id;
    let data2 = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match = {
      id: routeId,
      data: data2,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i] = match;
    if (routeModule == null ? void 0 : routeModule.meta) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data: data2,
        params,
        location,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error(
        "The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://remix.run/route/meta"
      );
    }
    match.meta = routeMeta;
    matches[i] = match;
    meta2 = [...routeMeta];
    leafMeta = meta2;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, meta2.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let { tagName, ...rest } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(
          `A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`
        );
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ reactExports.createElement(Comp, { key: JSON.stringify(rest), ...rest });
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ reactExports.createElement("title", { key: "title" }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      metaProps.charSet ?? (metaProps.charSet = metaProps.charset);
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ reactExports.createElement("meta", { key: "charSet", charSet: metaProps.charSet }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ reactExports.createElement(
          "script",
          {
            key: `script:ld+json:${json}`,
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: json }
          }
        );
      } catch (err) {
        return null;
      }
    }
    return /* @__PURE__ */ reactExports.createElement("meta", { key: JSON.stringify(metaProps), ...metaProps });
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
var isHydrated = false;
function Scripts(props) {
  let { manifest, serverHandoffString, isSpaMode: isSpaMode2, renderMeta } = useFrameworkContext();
  let { router, static: isStatic, staticContext } = useDataRouterContext2();
  let { matches: routerMatches } = useDataRouterStateContext();
  let enableFogOfWar = isFogOfWarEnabled(isSpaMode2);
  if (renderMeta) {
    renderMeta.didRenderScripts = true;
  }
  let matches = getActiveMatches(routerMatches, null, isSpaMode2);
  reactExports.useEffect(() => {
    isHydrated = true;
  }, []);
  let initialScripts = reactExports.useMemo(() => {
    var _a;
    let streamScript = "window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());";
    let contextScript = staticContext ? `window.__reactRouterContext = ${serverHandoffString};${streamScript}` : " ";
    let routeModulesScript = !isStatic ? " " : `${((_a = manifest.hmr) == null ? void 0 : _a.runtime) ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}${!enableFogOfWar ? `import ${JSON.stringify(manifest.url)}` : ""};
${matches.map(
      (match, index) => `import * as route${index} from ${JSON.stringify(
        manifest.routes[match.route.id].module
      )};`
    ).join("\n")}
  ${enableFogOfWar ? (
      // Inline a minimal manifest with the SSR matches
      `window.__reactRouterManifest = ${JSON.stringify(
        getPartialManifest(manifest, router),
        null,
        2
      )};`
    ) : ""}
  window.__reactRouterRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(
      "script",
      {
        ...props,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: createHtml(contextScript),
        type: void 0
      }
    ), /* @__PURE__ */ reactExports.createElement(
      "script",
      {
        ...props,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: createHtml(routeModulesScript),
        type: "module",
        async: true
      }
    ));
  }, []);
  let routePreloads = matches.map((match) => {
    let route = manifest.routes[match.route.id];
    return route ? (route.imports || []).concat([route.module]) : [];
  }).flat(1);
  let preloads = isHydrated ? [] : manifest.entry.imports.concat(routePreloads);
  return isHydrated ? null : /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, !enableFogOfWar ? /* @__PURE__ */ reactExports.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.url,
      crossOrigin: props.crossOrigin
    }
  ) : null, /* @__PURE__ */ reactExports.createElement(
    "link",
    {
      rel: "modulepreload",
      href: manifest.entry.module,
      crossOrigin: props.crossOrigin
    }
  ), dedupe(preloads).map((path) => /* @__PURE__ */ reactExports.createElement(
    "link",
    {
      key: path,
      rel: "modulepreload",
      href: path,
      crossOrigin: props.crossOrigin
    }
  )), initialScripts);
}
function dedupe(array) {
  return [...new Set(array)];
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser) {
    window.__reactRouterVersion = "7.0.2";
  }
} catch (e) {
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = reactExports.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    ...rest
  }, forwardedRef) {
    let { basename: basename2 } = reactExports.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let absoluteHref;
    let isExternal = false;
    if (typeof to === "string" && isAbsolute) {
      absoluteHref = to;
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
          let path = stripBasename(targetUrl.pathname, basename2);
          if (targetUrl.origin === currentUrl.origin && path != null) {
            to = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          warning(
            false,
            `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
          );
        }
      }
    }
    let href = useHref(to, { relative });
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ reactExports.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: absoluteHref || href,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, link, /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = reactExports.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = reactExports.useContext(DataRouterStateContext);
    let { navigator: navigator2, basename: basename2 } = reactExports.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename2) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename2) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ reactExports.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = reactExports.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    ...props
  }, forwardedRef) => {
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
      submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition
      });
    };
    return /* @__PURE__ */ reactExports.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function ScrollRestoration({
  getKey,
  storageKey,
  ...props
}) {
  let remixContext = reactExports.useContext(FrameworkContext);
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  useScrollRestoration({ getKey, storageKey });
  let ssrKey = reactExports.useMemo(
    () => {
      if (!remixContext || !getKey) return null;
      let userKey = getScrollRestorationKey(
        location,
        matches,
        basename2,
        getKey
      );
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (!remixContext || remixContext.isSpaMode) {
    return null;
  }
  let restoreScroll = ((storageKey2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2);
      window.history.replaceState({ key }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(storageKey2);
    }
  }).toString();
  return /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      ...props,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: `(${restoreScroll})(${JSON.stringify(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        )}, ${JSON.stringify(ssrKey)})`
      }
    }
  );
}
ScrollRestoration.displayName = "ScrollRestoration";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useDataRouterState2(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError2(hookName));
  return state;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  state,
  preventScrollReset,
  relative,
  viewTransition
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return reactExports.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        navigate(to, {
          replace: replace2,
          state,
          preventScrollReset,
          relative,
          viewTransition
        });
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition
    ]
  );
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  );
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return reactExports.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename2
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await router.fetch(key, currentRouteId, options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await router.navigate(options.action || action, {
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [router, basename2, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  let routeContext = reactExports.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename2 !== "/") {
    path.pathname = path.pathname === "/" ? basename2 : joinPaths([basename2, path.pathname]);
  }
  return createPath(path);
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function getScrollRestorationKey(location, matches, basename2, getKey) {
  let key = null;
  if (getKey) {
    if (basename2 !== "/") {
      key = getKey(
        {
          ...location,
          pathname: stripBasename(location.pathname, basename2) || location.pathname
        },
        matches
      );
    } else {
      key = getKey(location, matches);
    }
  }
  if (key == null) {
    key = location.key;
  }
  return key;
}
function useScrollRestoration({
  getKey,
  storageKey
} = {}) {
  let { router } = useDataRouterContext3(
    "useScrollRestoration"
    /* UseScrollRestoration */
  );
  let { restoreScrollPosition, preventScrollReset } = useDataRouterState2(
    "useScrollRestoration"
    /* UseScrollRestoration */
  );
  let { basename: basename2 } = reactExports.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  let navigation = useNavigation();
  reactExports.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(
    reactExports.useCallback(() => {
      if (navigation.state === "idle") {
        let key = getScrollRestorationKey(location, matches, basename2, getKey);
        savedScrollPositions[key] = window.scrollY;
      }
      try {
        sessionStorage.setItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY,
          JSON.stringify(savedScrollPositions)
        );
      } catch (error) {
        warning(
          false,
          `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`
        );
      }
      window.history.scrollRestoration = "auto";
    }, [navigation.state, getKey, basename2, location, matches, storageKey])
  );
  if (typeof document !== "undefined") {
    reactExports.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(
          storageKey || SCROLL_RESTORATION_STORAGE_KEY
        );
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
      }
    }, [storageKey]);
    reactExports.useLayoutEffect(() => {
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(
        savedScrollPositions,
        () => window.scrollY,
        getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename2, getKey) : void 0
      );
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename2, getKey]);
    reactExports.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location.hash) {
        let el = document.getElementById(
          decodeURIComponent(location.hash.slice(1))
        );
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
function usePageHide(callback, options) {
  let { capture } = {};
  reactExports.useEffect(() => {
    let opts = capture != null ? { capture } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function useViewTransitionState(to, opts = {}) {
  let vtContext = reactExports.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: basename2 } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative: opts.relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename2) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename2) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
function StaticRouterProvider({
  context,
  router,
  hydrate: hydrate2 = true,
  nonce
}) {
  invariant(
    router && context,
    "You must provide `router` and `context` to <StaticRouterProvider>"
  );
  let dataRouterContext = {
    router,
    navigator: getStatelessNavigator(),
    static: true,
    staticContext: context,
    basename: context.basename || "/"
  };
  let fetchersContext = /* @__PURE__ */ new Map();
  let hydrateScript = "";
  if (hydrate2 !== false) {
    let data2 = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors)
    };
    let json = htmlEscape(JSON.stringify(JSON.stringify(data2)));
    hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json});`;
  }
  let { state } = dataRouterContext.router;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ reactExports.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ reactExports.createElement(FetchersContext.Provider, { value: fetchersContext }, /* @__PURE__ */ reactExports.createElement(ViewTransitionContext.Provider, { value: { isTransitioning: false } }, /* @__PURE__ */ reactExports.createElement(
    Router,
    {
      basename: dataRouterContext.basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator: dataRouterContext.navigator,
      static: dataRouterContext.static
    },
    /* @__PURE__ */ reactExports.createElement(
      DataRoutes2,
      {
        routes: router.routes,
        future: router.future,
        state
      }
    )
  ))))), hydrateScript ? /* @__PURE__ */ reactExports.createElement(
    "script",
    {
      suppressHydrationWarning: true,
      nonce,
      dangerouslySetInnerHTML: { __html: hydrateScript }
    }
  ) : null);
}
function DataRoutes2({
  routes: routes2,
  future: future2,
  state
}) {
  return useRoutesImpl(routes2, void 0, state, future2);
}
function serializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.
        ...val.name !== "Error" ? {
          __subType: val.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(
        `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`
      );
    },
    replace(to) {
      throw new Error(
        `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`
      );
    },
    go(delta) {
      throw new Error(
        `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`
      );
    },
    back() {
      throw new Error(
        `You cannot use navigator.back() on the server because it is a stateless environment.`
      );
    },
    forward() {
      throw new Error(
        `You cannot use navigator.forward() on the server because it is a stateless environment.`
      );
    }
  };
}
function createStaticRouter(routes2, context, opts = {}) {
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(
    routes2,
    mapRouteProperties,
    void 0,
    manifest
  );
  let matches = context.matches.map((match) => {
    let route = manifest[match.route.id] || match.route;
    return {
      ...match,
      route
    };
  });
  let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
  return {
    get basename() {
      return context.basename;
    },
    get future() {
      return {
        ...opts == null ? void 0 : opts.future
      };
    },
    get state() {
      return {
        historyAction: "POP",
        location: context.location,
        matches,
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: context.errors,
        initialized: true,
        navigation: IDLE_NAVIGATION,
        restoreScrollPosition: null,
        preventScrollReset: false,
        revalidation: "idle",
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return void 0;
    },
    initialize() {
      throw msg("initialize");
    },
    subscribe() {
      throw msg("subscribe");
    },
    enableScrollRestoration() {
      throw msg("enableScrollRestoration");
    },
    navigate() {
      throw msg("navigate");
    },
    fetch() {
      throw msg("fetch");
    },
    revalidate() {
      throw msg("revalidate");
    },
    createHref,
    encodeLocation,
    getFetcher() {
      return IDLE_FETCHER;
    },
    deleteFetcher() {
      throw msg("deleteFetcher");
    },
    dispose() {
      throw msg("dispose");
    },
    getBlocker() {
      return IDLE_BLOCKER;
    },
    deleteBlocker() {
      throw msg("deleteBlocker");
    },
    patchRoutes() {
      throw msg("patchRoutes");
    },
    _internalFetchControllers: /* @__PURE__ */ new Map(),
    _internalSetRoutes() {
      throw msg("_internalSetRoutes");
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX3.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
var ABSOLUTE_URL_REGEX3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var ESCAPE_LOOKUP2 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
function htmlEscape(str) {
  return str.replace(ESCAPE_REGEX2, (match) => ESCAPE_LOOKUP2[match]);
}
function ServerRouter({
  context,
  url,
  abortDelay,
  nonce
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let { manifest, routeModules, criticalCss, serverHandoffString } = context;
  let routes2 = createServerRoutes(
    manifest.routes,
    routeModules,
    context.future,
    context.isSpaMode
  );
  context.staticHandlerContext.loaderData = {
    ...context.staticHandlerContext.loaderData
  };
  for (let match of context.staticHandlerContext.matches) {
    let routeId = match.route.id;
    let route = routeModules[routeId];
    let manifestRoute = context.manifest.routes[routeId];
    if (route && manifestRoute && shouldHydrateRouteLoader(manifestRoute, route, context.isSpaMode) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
      delete context.staticHandlerContext.loaderData[routeId];
    }
  }
  let router = createStaticRouter(routes2, context.staticHandlerContext);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(
    FrameworkContext.Provider,
    {
      value: {
        manifest,
        routeModules,
        criticalCss,
        serverHandoffString,
        future: context.future,
        isSpaMode: context.isSpaMode,
        serializeError: context.serializeError,
        abortDelay,
        renderMeta: context.renderMeta
      }
    },
    /* @__PURE__ */ reactExports.createElement(RemixErrorBoundary, { location: router.state.location }, /* @__PURE__ */ reactExports.createElement(
      StaticRouterProvider,
      {
        router,
        context: context.staticHandlerContext,
        hydrate: false
      }
    ))
  ), context.serverHandoffStream ? /* @__PURE__ */ reactExports.createElement(reactExports.Suspense, null, /* @__PURE__ */ reactExports.createElement(
    StreamTransfer,
    {
      context,
      identifier: 0,
      reader: context.serverHandoffStream.getReader(),
      textDecoder: new TextDecoder(),
      nonce
    }
  )) : null);
}
new TextEncoder();
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo2, routeId) => {
    let route = manifest[routeId];
    if (route) {
      memo2[routeId] = route.module;
    }
    return memo2;
  }, {});
}
function isServerMode(value) {
  return value === "development" || value === "production" || value === "test";
}
function sanitizeError(error, serverMode) {
  if (error instanceof Error && serverMode !== "development") {
    let sanitized = new Error("Unexpected Server Error");
    sanitized.stack = void 0;
    return sanitized;
  }
  return error;
}
function sanitizeErrors(errors, serverMode) {
  return Object.entries(errors).reduce((acc, [routeId, error]) => {
    return Object.assign(acc, { [routeId]: sanitizeError(error, serverMode) });
  }, {});
}
function serializeError(error, serverMode) {
  let sanitized = sanitizeError(error, serverMode);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors2(errors, serverMode) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = { ...val, __type: "RouteErrorResponse" };
    } else if (val instanceof Error) {
      let sanitized = sanitizeError(val, serverMode);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function matchServerRoutes(routes2, pathname, basename2) {
  let matches = matchRoutes(
    routes2,
    pathname,
    basename2
  );
  if (!matches) return null;
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  }));
}
async function callRouteHandler(handler, args) {
  let result = await handler({
    request: stripRoutesParam(stripIndexParam2(args.request)),
    params: args.params,
    context: args.context
  });
  if (isDataWithResponseInit(result) && result.init && result.init.status && isRedirectStatusCode(result.init.status)) {
    throw new Response(null, result.init);
  }
  return result;
}
function stripIndexParam2(request) {
  let url = new URL(request.url);
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  if (init.body) {
    init.duplex = "half";
  }
  return new Request(url.href, init);
}
function stripRoutesParam(request) {
  let url = new URL(request.url);
  url.searchParams.delete("_routes");
  let init = {
    method: request.method,
    body: request.body,
    headers: request.headers,
    signal: request.signal
  };
  if (init.body) {
    init.duplex = "half";
  }
  return new Request(url.href, init);
}
function invariant3(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    console.error(
      "The following error is a bug in React Router; please open an issue! https://github.com/remix-run/react-router/issues/new/choose"
    );
    throw new Error(message);
  }
}
function groupRoutesByParentId2(manifest) {
  let routes2 = {};
  Object.values(manifest).forEach((route) => {
    if (route) {
      let parentId = route.parentId || "";
      if (!routes2[parentId]) {
        routes2[parentId] = [];
      }
      routes2[parentId].push(route);
    }
  });
  return routes2;
}
function createRoutes(manifest, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => ({
    ...route,
    children: createRoutes(manifest, route.id, routesByParentId)
  }));
}
function createStaticHandlerDataRoutes(manifest, future2, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let commonRoute = {
      // Always include root due to default boundaries
      hasErrorBoundary: route.id === "root" || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      // Need to use RR's version in the param typed here to permit the optional
      // context even though we know it'll always be provided in remix
      loader: route.module.loader ? async (args) => {
        if (args.request.headers.has("X-React-Router-Prerender-Data")) {
          const preRenderedData = args.request.headers.get(
            "X-React-Router-Prerender-Data"
          );
          let encoded = preRenderedData ? decodeURI(preRenderedData) : preRenderedData;
          invariant3(encoded, "Missing prerendered data for route");
          let uint8array = new TextEncoder().encode(encoded);
          let stream = new ReadableStream({
            start(controller) {
              controller.enqueue(uint8array);
              controller.close();
            }
          });
          let decoded = await decodeViaTurboStream(stream, global);
          let data2 = decoded.value;
          invariant3(
            data2 && route.id in data2,
            "Unable to decode prerendered data"
          );
          let result = data2[route.id];
          invariant3("data" in result, "Unable to process prerendered data");
          return result.data;
        }
        let val = await callRouteHandler(route.module.loader, args);
        return val;
      } : void 0,
      action: route.module.action ? (args) => callRouteHandler(route.module.action, args) : void 0,
      handle: route.module.handle
    };
    return route.index ? {
      index: true,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(
        manifest,
        future2,
        route.id,
        routesByParentId
      ),
      ...commonRoute
    };
  });
}
var ESCAPE_LOOKUP3 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX3 = /[&><\u2028\u2029]/g;
function escapeHtml2(html) {
  return html.replace(ESCAPE_REGEX3, (match) => ESCAPE_LOOKUP3[match]);
}
function createServerHandoffString(serverHandoff) {
  return escapeHtml2(JSON.stringify(serverHandoff));
}
function getDocumentHeaders(build, context) {
  let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1;
  let matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches;
  let errorHeaders;
  if (boundaryIdx >= 0) {
    let { actionHeaders, actionData, loaderHeaders, loaderData } = context;
    context.matches.slice(boundaryIdx).some((match) => {
      let id = match.route.id;
      if (actionHeaders[id] && (!actionData || !actionData.hasOwnProperty(id))) {
        errorHeaders = actionHeaders[id];
      } else if (loaderHeaders[id] && !loaderData.hasOwnProperty(id)) {
        errorHeaders = loaderHeaders[id];
      }
      return errorHeaders != null;
    });
  }
  return matches.reduce((parentHeaders, match, idx) => {
    let { id } = match.route;
    let route = build.routes[id];
    invariant3(route, `Route with id "${id}" not found in build`);
    let routeModule = route.module;
    let loaderHeaders = context.loaderHeaders[id] || new Headers();
    let actionHeaders = context.actionHeaders[id] || new Headers();
    let includeErrorHeaders = errorHeaders != null && idx === matches.length - 1;
    let includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
    if (routeModule.headers == null) {
      let headers2 = new Headers(parentHeaders);
      if (includeErrorCookies) {
        prependCookies(errorHeaders, headers2);
      }
      prependCookies(actionHeaders, headers2);
      prependCookies(loaderHeaders, headers2);
      return headers2;
    }
    let headers = new Headers(
      routeModule.headers ? typeof routeModule.headers === "function" ? routeModule.headers({
        loaderHeaders,
        parentHeaders,
        actionHeaders,
        errorHeaders: includeErrorHeaders ? errorHeaders : void 0
      }) : routeModule.headers : void 0
    );
    if (includeErrorCookies) {
      prependCookies(errorHeaders, headers);
    }
    prependCookies(actionHeaders, headers);
    prependCookies(loaderHeaders, headers);
    prependCookies(parentHeaders, headers);
    return headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  if (parentSetCookieString) {
    let cookies = splitCookiesString_1(parentSetCookieString);
    cookies.forEach((cookie) => {
      childHeaders.append("Set-Cookie", cookie);
    });
  }
}
var SINGLE_FETCH_REDIRECT_STATUS = 202;
function getSingleFetchDataStrategy2({
  isActionDataRequest,
  loadRouteIds
} = {}) {
  return async ({ request, matches }) => {
    if (isActionDataRequest && request.method === "GET") {
      return {};
    }
    let matchesToLoad = loadRouteIds ? matches.filter((m) => loadRouteIds.includes(m.route.id)) : matches;
    let results = await Promise.all(
      matchesToLoad.map((match) => match.resolve())
    );
    return results.reduce(
      (acc, result, i) => Object.assign(acc, { [matchesToLoad[i].route.id]: result }),
      {}
    );
  };
}
async function singleFetchAction(build, serverMode, staticHandler, request, handlerUrl, loadContext, handleError) {
  try {
    let handlerRequest = new Request(handlerUrl, {
      method: request.method,
      body: request.body,
      headers: request.headers,
      signal: request.signal,
      ...request.body ? { duplex: "half" } : void 0
    });
    let result = await staticHandler.query(handlerRequest, {
      requestContext: loadContext,
      skipLoaderErrorBubbling: true,
      dataStrategy: getSingleFetchDataStrategy2({
        isActionDataRequest: true
      })
    });
    if (isResponse(result)) {
      return {
        result: getSingleFetchRedirect(
          result.status,
          result.headers,
          build.basename
        ),
        headers: result.headers,
        status: SINGLE_FETCH_REDIRECT_STATUS
      };
    }
    let context = result;
    let headers = getDocumentHeaders(build, context);
    if (isRedirectStatusCode(context.statusCode) && headers.has("Location")) {
      return {
        result: getSingleFetchRedirect(
          context.statusCode,
          headers,
          build.basename
        ),
        headers,
        status: SINGLE_FETCH_REDIRECT_STATUS
      };
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!isRouteErrorResponse(err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let singleFetchResult;
    if (context.errors) {
      singleFetchResult = { error: Object.values(context.errors)[0] };
    } else {
      singleFetchResult = { data: Object.values(context.actionData || {})[0] };
    }
    return {
      result: singleFetchResult,
      headers,
      status: context.statusCode
    };
  } catch (error) {
    handleError(error);
    return {
      result: { error },
      headers: new Headers(),
      status: 500
    };
  }
}
async function singleFetchLoaders(build, serverMode, staticHandler, request, handlerUrl, loadContext, handleError) {
  var _a;
  try {
    let handlerRequest = new Request(handlerUrl, {
      headers: request.headers,
      signal: request.signal
    });
    let loadRouteIds = ((_a = new URL(request.url).searchParams.get("_routes")) == null ? void 0 : _a.split(",")) || void 0;
    let result = await staticHandler.query(handlerRequest, {
      requestContext: loadContext,
      skipLoaderErrorBubbling: true,
      dataStrategy: getSingleFetchDataStrategy2({
        loadRouteIds
      })
    });
    if (isResponse(result)) {
      return {
        result: {
          [SingleFetchRedirectSymbol]: getSingleFetchRedirect(
            result.status,
            result.headers,
            build.basename
          )
        },
        headers: result.headers,
        status: SINGLE_FETCH_REDIRECT_STATUS
      };
    }
    let context = result;
    let headers = getDocumentHeaders(build, context);
    if (isRedirectStatusCode(context.statusCode) && headers.has("Location")) {
      return {
        result: {
          [SingleFetchRedirectSymbol]: getSingleFetchRedirect(
            context.statusCode,
            headers,
            build.basename
          )
        },
        headers,
        status: SINGLE_FETCH_REDIRECT_STATUS
      };
    }
    if (context.errors) {
      Object.values(context.errors).forEach((err) => {
        if (!isRouteErrorResponse(err) || err.error) {
          handleError(err);
        }
      });
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let results = {};
    let loadedMatches = loadRouteIds ? context.matches.filter(
      (m) => m.route.loader && loadRouteIds.includes(m.route.id)
    ) : context.matches;
    loadedMatches.forEach((m) => {
      let { id } = m.route;
      if (context.errors && context.errors.hasOwnProperty(id)) {
        results[id] = { error: context.errors[id] };
      } else if (context.loaderData.hasOwnProperty(id)) {
        results[id] = { data: context.loaderData[id] };
      }
    });
    return {
      result: results,
      headers,
      status: context.statusCode
    };
  } catch (error) {
    handleError(error);
    return {
      result: { root: { error } },
      headers: new Headers(),
      status: 500
    };
  }
}
function getSingleFetchRedirect(status, headers, basename2) {
  let redirect2 = headers.get("Location");
  if (basename2) {
    redirect2 = stripBasename(redirect2, basename2) || redirect2;
  }
  return {
    redirect: redirect2,
    status,
    revalidate: (
      // Technically X-Remix-Revalidate isn't needed here - that was an implementation
      // detail of ?_data requests as our way to tell the front end to revalidate when
      // we didn't have a response body to include that information in.
      // With single fetch, we tell the front end via this revalidate boolean field.
      // However, we're respecting it for now because it may be something folks have
      // used in their own responses
      // TODO(v3): Consider removing or making this official public API
      headers.has("X-Remix-Revalidate") || headers.has("Set-Cookie")
    ),
    reload: headers.has("X-Remix-Reload-Document"),
    replace: headers.has("X-Remix-Replace")
  };
}
function encodeViaTurboStream(data2, requestSignal, streamTimeout, serverMode) {
  let controller = new AbortController();
  let timeoutId = setTimeout(
    () => controller.abort(new Error("Server Timeout")),
    typeof streamTimeout === "number" ? streamTimeout : 4950
  );
  requestSignal.addEventListener("abort", () => clearTimeout(timeoutId));
  return encode(data2, {
    signal: controller.signal,
    plugins: [
      (value) => {
        if (value instanceof Error) {
          let { name, message, stack } = serverMode === "production" ? sanitizeError(value, serverMode) : value;
          return ["SanitizedError", name, message, stack];
        }
        if (value instanceof ErrorResponseImpl) {
          let { data: data3, status, statusText } = value;
          return ["ErrorResponse", data3, status, statusText];
        }
        if (value && typeof value === "object" && SingleFetchRedirectSymbol in value) {
          return ["SingleFetchRedirect", value[SingleFetchRedirectSymbol]];
        }
      }
    ],
    postPlugins: [
      (value) => {
        if (!value) return;
        if (typeof value !== "object") return;
        return [
          "SingleFetchClassInstance",
          Object.fromEntries(Object.entries(value))
        ];
      },
      () => ["SingleFetchFallback"]
    ]
  });
}
function derive(build, mode) {
  let routes2 = createRoutes(build.routes);
  let dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future);
  let serverMode = isServerMode(mode) ? mode : "production";
  let staticHandler = createStaticHandler(dataRoutes, {
    basename: build.basename
  });
  let errorHandler = build.entry.module.handleError || ((error, { request }) => {
    if (serverMode !== "test" && !request.signal.aborted) {
      console.error(
        // @ts-expect-error This is "private" from users but intended for internal use
        isRouteErrorResponse(error) && error.error ? error.error : error
      );
    }
  });
  return {
    routes: routes2,
    dataRoutes,
    serverMode,
    staticHandler,
    errorHandler
  };
}
var createRequestHandler = (build, mode) => {
  let _build;
  let routes2;
  let serverMode;
  let staticHandler;
  let errorHandler;
  return async function requestHandler2(request, loadContext = {}) {
    _build = typeof build === "function" ? await build() : build;
    if (typeof build === "function") {
      let derived = derive(_build, mode);
      routes2 = derived.routes;
      serverMode = derived.serverMode;
      staticHandler = derived.staticHandler;
      errorHandler = derived.errorHandler;
    } else if (!routes2 || !serverMode || !staticHandler || !errorHandler) {
      let derived = derive(_build, mode);
      routes2 = derived.routes;
      serverMode = derived.serverMode;
      staticHandler = derived.staticHandler;
      errorHandler = derived.errorHandler;
    }
    let url = new URL(request.url);
    let params = {};
    let handleError = (error) => {
      errorHandler(error, {
        context: loadContext,
        params,
        request
      });
    };
    let manifestUrl = `${_build.basename ?? "/"}/__manifest`.replace(
      /\/+/g,
      "/"
    );
    if (url.pathname === manifestUrl) {
      try {
        let res = await handleManifestRequest(_build, routes2, url);
        return res;
      } catch (e) {
        handleError(e);
        return new Response("Unknown Server Error", { status: 500 });
      }
    }
    let matches = matchServerRoutes(routes2, url.pathname, _build.basename);
    if (matches && matches.length > 0) {
      Object.assign(params, matches[0].params);
    }
    let response;
    if (url.pathname.endsWith(".data")) {
      let handlerUrl = new URL(request.url);
      handlerUrl.pathname = handlerUrl.pathname.replace(/\.data$/, "").replace(/^\/_root$/, "/");
      let singleFetchMatches = matchServerRoutes(
        routes2,
        handlerUrl.pathname,
        _build.basename
      );
      response = await handleSingleFetchRequest(
        serverMode,
        _build,
        staticHandler,
        request,
        handlerUrl,
        loadContext,
        handleError
      );
      if (_build.entry.module.handleDataRequest) {
        response = await _build.entry.module.handleDataRequest(response, {
          context: loadContext,
          params: singleFetchMatches ? singleFetchMatches[0].params : {},
          request
        });
        if (isRedirectResponse(response)) {
          let result = getSingleFetchRedirect(
            response.status,
            response.headers,
            _build.basename
          );
          if (request.method === "GET") {
            result = {
              [SingleFetchRedirectSymbol]: result
            };
          }
          let headers = new Headers(response.headers);
          headers.set("Content-Type", "text/x-script");
          return new Response(
            encodeViaTurboStream(
              result,
              request.signal,
              _build.entry.module.streamTimeout,
              serverMode
            ),
            {
              status: SINGLE_FETCH_REDIRECT_STATUS,
              headers
            }
          );
        }
      }
    } else if (matches && matches[matches.length - 1].route.module.default == null && matches[matches.length - 1].route.module.ErrorBoundary == null) {
      response = await handleResourceRequest(
        serverMode,
        staticHandler,
        matches.slice(-1)[0].route.id,
        request,
        loadContext,
        handleError
      );
    } else {
      let criticalCss = void 0;
      response = await handleDocumentRequest(
        serverMode,
        _build,
        staticHandler,
        request,
        loadContext,
        handleError,
        criticalCss
      );
    }
    if (request.method === "HEAD") {
      return new Response(null, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      });
    }
    return response;
  };
};
async function handleManifestRequest(build, routes2, url) {
  let patches = {};
  if (url.searchParams.has("p")) {
    for (let path of url.searchParams.getAll("p")) {
      let matches = matchServerRoutes(routes2, path, build.basename);
      if (matches) {
        for (let match of matches) {
          let routeId = match.route.id;
          let route = build.assets.routes[routeId];
          if (route) {
            patches[routeId] = route;
          }
        }
      }
    }
    return Response.json(patches, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  }
  return new Response("Invalid Request", { status: 400 });
}
async function handleSingleFetchRequest(serverMode, build, staticHandler, request, handlerUrl, loadContext, handleError) {
  let { result, headers, status } = request.method !== "GET" ? await singleFetchAction(
    build,
    serverMode,
    staticHandler,
    request,
    handlerUrl,
    loadContext,
    handleError
  ) : await singleFetchLoaders(
    build,
    serverMode,
    staticHandler,
    request,
    handlerUrl,
    loadContext,
    handleError
  );
  let resultHeaders = new Headers(headers);
  resultHeaders.set("X-Remix-Response", "yes");
  if (status === 304) {
    return new Response(null, { status: 304, headers: resultHeaders });
  }
  resultHeaders.set("Content-Type", "text/x-script");
  return new Response(
    encodeViaTurboStream(
      result,
      request.signal,
      build.entry.module.streamTimeout,
      serverMode
    ),
    {
      status: status || 200,
      headers: resultHeaders
    }
  );
}
async function handleDocumentRequest(serverMode, build, staticHandler, request, loadContext, handleError, criticalCss) {
  let context;
  try {
    context = await staticHandler.query(request, {
      requestContext: loadContext
    });
  } catch (error) {
    handleError(error);
    return new Response(null, { status: 500 });
  }
  if (isResponse(context)) {
    return context;
  }
  let headers = getDocumentHeaders(build, context);
  if (context.statusCode === 304) {
    return new Response(null, { status: 304, headers });
  }
  if (context.errors) {
    Object.values(context.errors).forEach((err) => {
      if (!isRouteErrorResponse(err) || err.error) {
        handleError(err);
      }
    });
    context.errors = sanitizeErrors(context.errors, serverMode);
  }
  let state = {
    loaderData: context.loaderData,
    actionData: context.actionData,
    errors: serializeErrors2(context.errors, serverMode)
  };
  let entryContext = {
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    staticHandlerContext: context,
    criticalCss,
    serverHandoffString: createServerHandoffString({
      basename: build.basename,
      criticalCss,
      future: build.future,
      isSpaMode: build.isSpaMode
    }),
    serverHandoffStream: encodeViaTurboStream(
      state,
      request.signal,
      build.entry.module.streamTimeout,
      serverMode
    ),
    renderMeta: {},
    future: build.future,
    isSpaMode: build.isSpaMode,
    serializeError: (err) => serializeError(err, serverMode)
  };
  let handleDocumentRequestFunction = build.entry.module.default;
  try {
    return await handleDocumentRequestFunction(
      request,
      context.statusCode,
      headers,
      entryContext,
      loadContext
    );
  } catch (error) {
    handleError(error);
    let errorForSecondRender = error;
    if (isResponse(error)) {
      try {
        let data2 = await unwrapResponse(error);
        errorForSecondRender = new ErrorResponseImpl(
          error.status,
          error.statusText,
          data2
        );
      } catch (e) {
      }
    }
    context = getStaticContextFromError(
      staticHandler.dataRoutes,
      context,
      errorForSecondRender
    );
    if (context.errors) {
      context.errors = sanitizeErrors(context.errors, serverMode);
    }
    let state2 = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors2(context.errors, serverMode)
    };
    entryContext = {
      ...entryContext,
      staticHandlerContext: context,
      serverHandoffString: createServerHandoffString({
        basename: build.basename,
        future: build.future,
        isSpaMode: build.isSpaMode
      }),
      serverHandoffStream: encodeViaTurboStream(
        state2,
        request.signal,
        build.entry.module.streamTimeout,
        serverMode
      ),
      renderMeta: {}
    };
    try {
      return await handleDocumentRequestFunction(
        request,
        context.statusCode,
        headers,
        entryContext,
        loadContext
      );
    } catch (error2) {
      handleError(error2);
      return returnLastResortErrorResponse(error2, serverMode);
    }
  }
}
async function handleResourceRequest(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    invariant3(
      isResponse(response),
      "Expected a Response to be returned from resource route handler"
    );
    return response;
  } catch (error) {
    if (isResponse(error)) {
      error.headers.set("X-Remix-Catch", "yes");
      return error;
    }
    if (isRouteErrorResponse(error)) {
      if (error) {
        handleError(error);
      }
      return errorResponseToJson(error, serverMode);
    }
    handleError(error);
    return returnLastResortErrorResponse(error, serverMode);
  }
}
function errorResponseToJson(errorResponse, serverMode) {
  return Response.json(
    serializeError(
      // @ts-expect-error This is "private" from users but intended for internal use
      errorResponse.error || new Error("Unexpected Server Error"),
      serverMode
    ),
    {
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      headers: {
        "X-Remix-Error": "yes"
      }
    }
  );
}
function returnLastResortErrorResponse(error, serverMode) {
  let message = "Unexpected Server Error";
  if (serverMode !== "production") {
    message += `

${String(error)}`;
  }
  return new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
function unwrapResponse(response) {
  let contentType = response.headers.get("Content-Type");
  return contentType && /\bapplication\/json\b/.test(contentType) ? response.body == null ? null : response.json() : response.text();
}
const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => Promise.resolve().then(() => serverBuild),
  "production"
);
const app = {
  fetch(request, env) {
    return requestHandler(request, {
      VALUE_FROM_CLOUDFLARE: "Hello from Cloudflare"
    });
  }
};
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE$2 = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE$2 = Symbol.for("react.fragment");
function jsxProd(type, config, maybeKey) {
  var key = null;
  void 0 !== maybeKey && (key = "" + maybeKey);
  void 0 !== config.key && (key = "" + config.key);
  if ("key" in config) {
    maybeKey = {};
    for (var propName in config)
      "key" !== propName && (maybeKey[propName] = config[propName]);
  } else maybeKey = config;
  config = maybeKey.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE$2,
    type,
    key,
    ref: void 0 !== config ? config : null,
    props: maybeKey
  };
}
reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE$2;
reactJsxRuntime_production.jsx = jsxProd;
reactJsxRuntime_production.jsxs = jsxProd;
{
  jsxRuntime.exports = reactJsxRuntime_production;
}
var jsxRuntimeExports = jsxRuntime.exports;
var fullPattern = " daum[ /]| deusu/| yadirectfetcher|(?:^|[^g])news(?!sapphire)|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!(?:lib))http|(?<![hg]m)score|@[a-z][\\w-]+\\.|\\(\\)|\\.com\\b|\\btime/|^<|^[\\w \\.\\-\\(?:\\):]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[^ ]{50,}$|^\\d+\\b|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^active|^ad muncher|^amaya|^avsdevicesdk/|^biglotron|^bot|^bw/|^clamav[ /]|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/5\\.0\\s[a-z\\.-]+$|^mozilla/\\d\\.\\d \\(compatible;?\\)$|^mozilla/\\d\\.\\d \\w*$|^navermailapp|^netsurf|^offline|^owler|^php|^postman|^python|^rank|^read|^reed|^rest|^rss|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^track|^valid|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|^{{.*}}$|adscanner/|analyzer|archive|ask jeeves/teoma|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|convertify|cookiehubscan|crawl|cypress/|dareboost|datanyze|dejaclick|detect|dmbrowser|download|evc-batch/|exaleadcloudview|feed|firephp|functionize|gomezagent|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|images|infrawatch|insight|inspect|iplabel|ips-agent|java(?!;)|jsjcw_scanner|library|linkcheck|mail\\.ru/|manager|measure|neustar wpm|node|nutch|offbyone|optimize|pageburst|pagespeed|parser|perl|phantomjs|pingdom|powermarks|preview|proxy|ptst[ /]\\d|reputation|resolver|retriever|rexx;|rigor|rss\\b|scanner\\.|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|tools|torrent|trace|transcoder|url|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|zgrab";
var naivePattern = /bot|crawl|http|lighthouse|scan|search|spider/i;
var pattern;
function getPattern() {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  try {
    pattern = new RegExp(fullPattern, "i");
  } catch (error) {
    pattern = naivePattern;
  }
  return pattern;
}
function isbot(userAgent) {
  return Boolean(userAgent) && getPattern().test(userAgent);
}
var reactDomServer_edge_production = {};
var reactDom = { exports: {} };
var reactDom_production = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$2 = reactExports;
function formatProdErrorMessage$1(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function noop$4() {
}
var Internals = {
  d: {
    f: noop$4,
    r: function() {
      throw Error(formatProdErrorMessage$1(522));
    },
    D: noop$4,
    C: noop$4,
    L: noop$4,
    m: noop$4,
    X: noop$4,
    S: noop$4,
    M: noop$4
  },
  p: 0,
  findDOMNode: null
}, REACT_PORTAL_TYPE$2 = Symbol.for("react.portal");
function createPortal$1(children, containerInfo, implementation) {
  var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE$2,
    key: null == key ? null : "" + key,
    children,
    containerInfo,
    implementation
  };
}
var ReactSharedInternals$2 = React$2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function getCrossOriginStringAs(as, input) {
  if ("font" === as) return "";
  if ("string" === typeof input)
    return "use-credentials" === input ? input : "";
}
reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
reactDom_production.createPortal = function(children, container) {
  var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
    throw Error(formatProdErrorMessage$1(299));
  return createPortal$1(children, container, null, key);
};
reactDom_production.flushSync = function(fn) {
  var previousTransition = ReactSharedInternals$2.T, previousUpdatePriority = Internals.p;
  try {
    if (ReactSharedInternals$2.T = null, Internals.p = 2, fn) return fn();
  } finally {
    ReactSharedInternals$2.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
  }
};
reactDom_production.preconnect = function(href, options) {
  "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
};
reactDom_production.prefetchDNS = function(href) {
  "string" === typeof href && Internals.d.D(href);
};
reactDom_production.preinit = function(href, options) {
  if ("string" === typeof href && options && "string" === typeof options.as) {
    var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
    "style" === as ? Internals.d.S(
      href,
      "string" === typeof options.precedence ? options.precedence : void 0,
      {
        crossOrigin,
        integrity,
        fetchPriority
      }
    ) : "script" === as && Internals.d.X(href, {
      crossOrigin,
      integrity,
      fetchPriority,
      nonce: "string" === typeof options.nonce ? options.nonce : void 0
    });
  }
};
reactDom_production.preinitModule = function(href, options) {
  if ("string" === typeof href)
    if ("object" === typeof options && null !== options) {
      if (null == options.as || "script" === options.as) {
        var crossOrigin = getCrossOriginStringAs(
          options.as,
          options.crossOrigin
        );
        Internals.d.M(href, {
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    } else null == options && Internals.d.M(href);
};
reactDom_production.preload = function(href, options) {
  if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
    var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
    Internals.d.L(href, as, {
      crossOrigin,
      integrity: "string" === typeof options.integrity ? options.integrity : void 0,
      nonce: "string" === typeof options.nonce ? options.nonce : void 0,
      type: "string" === typeof options.type ? options.type : void 0,
      fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
      referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
      imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
      imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
      media: "string" === typeof options.media ? options.media : void 0
    });
  }
};
reactDom_production.preloadModule = function(href, options) {
  if ("string" === typeof href)
    if (options) {
      var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
      Internals.d.m(href, {
        as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
        crossOrigin,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0
      });
    } else Internals.d.m(href);
};
reactDom_production.requestFormReset = function(form) {
  Internals.d.r(form);
};
reactDom_production.unstable_batchedUpdates = function(fn, a) {
  return fn(a);
};
reactDom_production.useFormState = function(action, initialState, permalink) {
  return ReactSharedInternals$2.H.useFormState(action, initialState, permalink);
};
reactDom_production.useFormStatus = function() {
  return ReactSharedInternals$2.H.useHostTransitionStatus();
};
reactDom_production.version = "19.0.0";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production;
}
var reactDomExports = reactDom.exports;
/**
 * @license React
 * react-dom-server.edge.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = reactExports, ReactDOM$1 = reactDomExports, REACT_ELEMENT_TYPE$1 = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE$1 = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE$1 = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE$1 = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE$1 = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE$1 = Symbol.for("react.provider"), REACT_CONSUMER_TYPE$1 = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE$1 = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE$1 = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE$1 = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE$1 = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE$1 = Symbol.for("react.memo"), REACT_LAZY_TYPE$1 = Symbol.for("react.lazy"), REACT_SCOPE_TYPE$1 = Symbol.for("react.scope"), REACT_DEBUG_TRACING_MODE_TYPE$1 = Symbol.for("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE$1 = Symbol.for("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE$1 = Symbol.for("react.legacy_hidden"), REACT_MEMO_CACHE_SENTINEL$1 = Symbol.for("react.memo_cache_sentinel"), MAYBE_ITERATOR_SYMBOL$1 = Symbol.iterator, isArrayImpl$1 = Array.isArray;
function murmurhash3_32_gc$1(key, seed) {
  var remainder = key.length & 3;
  var bytes = key.length - remainder;
  var h1 = seed;
  for (seed = 0; seed < bytes; ) {
    var k1 = key.charCodeAt(seed) & 255 | (key.charCodeAt(++seed) & 255) << 8 | (key.charCodeAt(++seed) & 255) << 16 | (key.charCodeAt(++seed) & 255) << 24;
    ++seed;
    k1 = 3432918353 * (k1 & 65535) + ((3432918353 * (k1 >>> 16) & 65535) << 16) & 4294967295;
    k1 = k1 << 15 | k1 >>> 17;
    k1 = 461845907 * (k1 & 65535) + ((461845907 * (k1 >>> 16) & 65535) << 16) & 4294967295;
    h1 ^= k1;
    h1 = h1 << 13 | h1 >>> 19;
    h1 = 5 * (h1 & 65535) + ((5 * (h1 >>> 16) & 65535) << 16) & 4294967295;
    h1 = (h1 & 65535) + 27492 + (((h1 >>> 16) + 58964 & 65535) << 16);
  }
  k1 = 0;
  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(seed + 2) & 255) << 16;
    case 2:
      k1 ^= (key.charCodeAt(seed + 1) & 255) << 8;
    case 1:
      k1 ^= key.charCodeAt(seed) & 255, k1 = 3432918353 * (k1 & 65535) + ((3432918353 * (k1 >>> 16) & 65535) << 16) & 4294967295, k1 = k1 << 15 | k1 >>> 17, h1 ^= 461845907 * (k1 & 65535) + ((461845907 * (k1 >>> 16) & 65535) << 16) & 4294967295;
  }
  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = 2246822507 * (h1 & 65535) + ((2246822507 * (h1 >>> 16) & 65535) << 16) & 4294967295;
  h1 ^= h1 >>> 13;
  h1 = 3266489909 * (h1 & 65535) + ((3266489909 * (h1 >>> 16) & 65535) << 16) & 4294967295;
  return (h1 ^ h1 >>> 16) >>> 0;
}
function handleErrorInNextTick(error) {
  setTimeout(function() {
    throw error;
  });
}
var LocalPromise = Promise, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : function(callback) {
  LocalPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
}, currentView = null, writtenBytes = 0;
function writeChunk(destination, chunk) {
  if (0 !== chunk.byteLength)
    if (2048 < chunk.byteLength)
      0 < writtenBytes && (destination.enqueue(
        new Uint8Array(currentView.buffer, 0, writtenBytes)
      ), currentView = new Uint8Array(2048), writtenBytes = 0), destination.enqueue(chunk);
    else {
      var allowableBytes = currentView.length - writtenBytes;
      allowableBytes < chunk.byteLength && (0 === allowableBytes ? destination.enqueue(currentView) : (currentView.set(chunk.subarray(0, allowableBytes), writtenBytes), destination.enqueue(currentView), chunk = chunk.subarray(allowableBytes)), currentView = new Uint8Array(2048), writtenBytes = 0);
      currentView.set(chunk, writtenBytes);
      writtenBytes += chunk.byteLength;
    }
}
function writeChunkAndReturn(destination, chunk) {
  writeChunk(destination, chunk);
  return true;
}
function completeWriting(destination) {
  currentView && 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = null, writtenBytes = 0);
}
var textEncoder = new TextEncoder();
function stringToChunk(content) {
  return textEncoder.encode(content);
}
function stringToPrecomputedChunk(content) {
  return textEncoder.encode(content);
}
function closeWithError(destination, error) {
  "function" === typeof destination.error ? destination.error(error) : destination.close();
}
var assign$1 = Object.assign, hasOwnProperty$1 = Object.prototype.hasOwnProperty, VALID_ATTRIBUTE_NAME_REGEX$1 = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), illegalAttributeNameCache$1 = {}, validatedAttributeNameCache$1 = {};
function isAttributeNameSafe$1(attributeName) {
  if (hasOwnProperty$1.call(validatedAttributeNameCache$1, attributeName))
    return true;
  if (hasOwnProperty$1.call(illegalAttributeNameCache$1, attributeName)) return false;
  if (VALID_ATTRIBUTE_NAME_REGEX$1.test(attributeName))
    return validatedAttributeNameCache$1[attributeName] = true;
  illegalAttributeNameCache$1[attributeName] = true;
  return false;
}
var unitlessNumbers$1 = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
), aliases$1 = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), matchHtmlRegExp$1 = /["'&<>]/;
function escapeTextForBrowser$1(text) {
  if ("boolean" === typeof text || "number" === typeof text || "bigint" === typeof text)
    return "" + text;
  text = "" + text;
  var match = matchHtmlRegExp$1.exec(text);
  if (match) {
    var html = "", index, lastIndex = 0;
    for (index = match.index; index < text.length; index++) {
      switch (text.charCodeAt(index)) {
        case 34:
          match = "&quot;";
          break;
        case 38:
          match = "&amp;";
          break;
        case 39:
          match = "&#x27;";
          break;
        case 60:
          match = "&lt;";
          break;
        case 62:
          match = "&gt;";
          break;
        default:
          continue;
      }
      lastIndex !== index && (html += text.slice(lastIndex, index));
      lastIndex = index + 1;
      html += match;
    }
    text = lastIndex !== index ? html + text.slice(lastIndex, index) : html;
  }
  return text;
}
var uppercasePattern$1 = /([A-Z])/g, msPattern$1 = /^ms-/, isJavaScriptProtocol$1 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function sanitizeURL$1(url) {
  return isJavaScriptProtocol$1.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
}
var ReactSharedInternals$1 = React$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals$1 = ReactDOM$1.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject$1 = {
  pending: false,
  data: null,
  method: null,
  action: null
}, previousDispatcher$1 = ReactDOMSharedInternals$1.d;
ReactDOMSharedInternals$1.d = {
  f: previousDispatcher$1.f,
  r: previousDispatcher$1.r,
  D: prefetchDNS$1,
  C: preconnect$1,
  L: preload$1,
  m: preloadModule$1,
  X: preinitScript$1,
  S: preinitStyle$1,
  M: preinitModuleScript$1
};
var PRELOAD_NO_CREDS$1 = [];
stringToPrecomputedChunk('"></template>');
var startInlineScript = stringToPrecomputedChunk("<script>"), endInlineScript = stringToPrecomputedChunk("<\/script>"), startScriptSrc = stringToPrecomputedChunk('<script src="'), startModuleSrc = stringToPrecomputedChunk('<script type="module" src="'), scriptNonce = stringToPrecomputedChunk('" nonce="'), scriptIntegirty = stringToPrecomputedChunk('" integrity="'), scriptCrossOrigin = stringToPrecomputedChunk('" crossorigin="'), endAsyncScript = stringToPrecomputedChunk('" async=""><\/script>'), scriptRegex$1 = /(<\/|<)(s)(cript)/gi;
function scriptReplacer$1(match, prefix2, s, suffix2) {
  return "" + prefix2 + ("s" === s ? "\\u0073" : "\\u0053") + suffix2;
}
var importMapScriptStart = stringToPrecomputedChunk(
  '<script type="importmap">'
), importMapScriptEnd = stringToPrecomputedChunk("<\/script>");
function createRenderState$1(resumableState, nonce, externalRuntimeConfig, importMap, onHeaders, maxHeadersLength) {
  var inlineScriptWithNonce = void 0 === nonce ? startInlineScript : stringToPrecomputedChunk(
    '<script nonce="' + escapeTextForBrowser$1(nonce) + '">'
  ), idPrefix = resumableState.idPrefix;
  externalRuntimeConfig = [];
  var bootstrapScriptContent = resumableState.bootstrapScriptContent, bootstrapScripts = resumableState.bootstrapScripts, bootstrapModules = resumableState.bootstrapModules;
  void 0 !== bootstrapScriptContent && externalRuntimeConfig.push(
    inlineScriptWithNonce,
    stringToChunk(
      ("" + bootstrapScriptContent).replace(scriptRegex$1, scriptReplacer$1)
    ),
    endInlineScript
  );
  bootstrapScriptContent = [];
  void 0 !== importMap && (bootstrapScriptContent.push(importMapScriptStart), bootstrapScriptContent.push(
    stringToChunk(
      ("" + JSON.stringify(importMap)).replace(scriptRegex$1, scriptReplacer$1)
    )
  ), bootstrapScriptContent.push(importMapScriptEnd));
  importMap = onHeaders ? {
    preconnects: "",
    fontPreloads: "",
    highImagePreloads: "",
    remainingCapacity: 2 + ("number" === typeof maxHeadersLength ? maxHeadersLength : 2e3)
  } : null;
  onHeaders = {
    placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
    segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
    boundaryPrefix: stringToPrecomputedChunk(idPrefix + "B:"),
    startInlineScript: inlineScriptWithNonce,
    htmlChunks: null,
    headChunks: null,
    externalRuntimeScript: null,
    bootstrapChunks: externalRuntimeConfig,
    importMapChunks: bootstrapScriptContent,
    onHeaders,
    headers: importMap,
    resets: {
      font: {},
      dns: {},
      connect: { default: {}, anonymous: {}, credentials: {} },
      image: {},
      style: {}
    },
    charsetChunks: [],
    viewportChunks: [],
    hoistableChunks: [],
    preconnects: /* @__PURE__ */ new Set(),
    fontPreloads: /* @__PURE__ */ new Set(),
    highImagePreloads: /* @__PURE__ */ new Set(),
    styles: /* @__PURE__ */ new Map(),
    bootstrapScripts: /* @__PURE__ */ new Set(),
    scripts: /* @__PURE__ */ new Set(),
    bulkPreloads: /* @__PURE__ */ new Set(),
    preloads: {
      images: /* @__PURE__ */ new Map(),
      stylesheets: /* @__PURE__ */ new Map(),
      scripts: /* @__PURE__ */ new Map(),
      moduleScripts: /* @__PURE__ */ new Map()
    },
    nonce,
    hoistableState: null,
    stylesToHoist: false
  };
  if (void 0 !== bootstrapScripts)
    for (importMap = 0; importMap < bootstrapScripts.length; importMap++) {
      var scriptConfig = bootstrapScripts[importMap];
      idPrefix = inlineScriptWithNonce = void 0;
      bootstrapScriptContent = {
        rel: "preload",
        as: "script",
        fetchPriority: "low",
        nonce
      };
      "string" === typeof scriptConfig ? bootstrapScriptContent.href = maxHeadersLength = scriptConfig : (bootstrapScriptContent.href = maxHeadersLength = scriptConfig.src, bootstrapScriptContent.integrity = idPrefix = "string" === typeof scriptConfig.integrity ? scriptConfig.integrity : void 0, bootstrapScriptContent.crossOrigin = inlineScriptWithNonce = "string" === typeof scriptConfig || null == scriptConfig.crossOrigin ? void 0 : "use-credentials" === scriptConfig.crossOrigin ? "use-credentials" : "");
      scriptConfig = resumableState;
      var href = maxHeadersLength;
      scriptConfig.scriptResources[href] = null;
      scriptConfig.moduleScriptResources[href] = null;
      scriptConfig = [];
      pushLinkImpl$1(scriptConfig, bootstrapScriptContent);
      onHeaders.bootstrapScripts.add(scriptConfig);
      externalRuntimeConfig.push(
        startScriptSrc,
        stringToChunk(escapeTextForBrowser$1(maxHeadersLength))
      );
      nonce && externalRuntimeConfig.push(
        scriptNonce,
        stringToChunk(escapeTextForBrowser$1(nonce))
      );
      "string" === typeof idPrefix && externalRuntimeConfig.push(
        scriptIntegirty,
        stringToChunk(escapeTextForBrowser$1(idPrefix))
      );
      "string" === typeof inlineScriptWithNonce && externalRuntimeConfig.push(
        scriptCrossOrigin,
        stringToChunk(escapeTextForBrowser$1(inlineScriptWithNonce))
      );
      externalRuntimeConfig.push(endAsyncScript);
    }
  if (void 0 !== bootstrapModules)
    for (bootstrapScripts = 0; bootstrapScripts < bootstrapModules.length; bootstrapScripts++)
      bootstrapScriptContent = bootstrapModules[bootstrapScripts], inlineScriptWithNonce = maxHeadersLength = void 0, idPrefix = {
        rel: "modulepreload",
        fetchPriority: "low",
        nonce
      }, "string" === typeof bootstrapScriptContent ? idPrefix.href = importMap = bootstrapScriptContent : (idPrefix.href = importMap = bootstrapScriptContent.src, idPrefix.integrity = inlineScriptWithNonce = "string" === typeof bootstrapScriptContent.integrity ? bootstrapScriptContent.integrity : void 0, idPrefix.crossOrigin = maxHeadersLength = "string" === typeof bootstrapScriptContent || null == bootstrapScriptContent.crossOrigin ? void 0 : "use-credentials" === bootstrapScriptContent.crossOrigin ? "use-credentials" : ""), bootstrapScriptContent = resumableState, scriptConfig = importMap, bootstrapScriptContent.scriptResources[scriptConfig] = null, bootstrapScriptContent.moduleScriptResources[scriptConfig] = null, bootstrapScriptContent = [], pushLinkImpl$1(bootstrapScriptContent, idPrefix), onHeaders.bootstrapScripts.add(bootstrapScriptContent), externalRuntimeConfig.push(
        startModuleSrc,
        stringToChunk(escapeTextForBrowser$1(importMap))
      ), nonce && externalRuntimeConfig.push(
        scriptNonce,
        stringToChunk(escapeTextForBrowser$1(nonce))
      ), "string" === typeof inlineScriptWithNonce && externalRuntimeConfig.push(
        scriptIntegirty,
        stringToChunk(escapeTextForBrowser$1(inlineScriptWithNonce))
      ), "string" === typeof maxHeadersLength && externalRuntimeConfig.push(
        scriptCrossOrigin,
        stringToChunk(escapeTextForBrowser$1(maxHeadersLength))
      ), externalRuntimeConfig.push(endAsyncScript);
  return onHeaders;
}
function createResumableState$1(identifierPrefix, externalRuntimeConfig, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
  return {
    idPrefix: void 0 === identifierPrefix ? "" : identifierPrefix,
    nextFormID: 0,
    streamingFormat: 0,
    bootstrapScriptContent,
    bootstrapScripts,
    bootstrapModules,
    instructions: 0,
    hasBody: false,
    hasHtml: false,
    unknownResources: {},
    dnsResources: {},
    connectResources: { default: {}, anonymous: {}, credentials: {} },
    imageResources: {},
    styleResources: {},
    scriptResources: {},
    moduleUnknownResources: {},
    moduleScriptResources: {}
  };
}
function createFormatContext$1(insertionMode, selectedValue, tagScope) {
  return {
    insertionMode,
    selectedValue,
    tagScope
  };
}
function createRootFormatContext(namespaceURI) {
  return createFormatContext$1(
    "http://www.w3.org/2000/svg" === namespaceURI ? 3 : "http://www.w3.org/1998/Math/MathML" === namespaceURI ? 4 : 0,
    null,
    0
  );
}
function getChildFormatContext$1(parentContext, type, props) {
  switch (type) {
    case "noscript":
      return createFormatContext$1(2, null, parentContext.tagScope | 1);
    case "select":
      return createFormatContext$1(
        2,
        null != props.value ? props.value : props.defaultValue,
        parentContext.tagScope
      );
    case "svg":
      return createFormatContext$1(3, null, parentContext.tagScope);
    case "picture":
      return createFormatContext$1(2, null, parentContext.tagScope | 2);
    case "math":
      return createFormatContext$1(4, null, parentContext.tagScope);
    case "foreignObject":
      return createFormatContext$1(2, null, parentContext.tagScope);
    case "table":
      return createFormatContext$1(5, null, parentContext.tagScope);
    case "thead":
    case "tbody":
    case "tfoot":
      return createFormatContext$1(6, null, parentContext.tagScope);
    case "colgroup":
      return createFormatContext$1(8, null, parentContext.tagScope);
    case "tr":
      return createFormatContext$1(7, null, parentContext.tagScope);
  }
  return 5 <= parentContext.insertionMode ? createFormatContext$1(2, null, parentContext.tagScope) : 0 === parentContext.insertionMode ? "html" === type ? createFormatContext$1(1, null, parentContext.tagScope) : createFormatContext$1(2, null, parentContext.tagScope) : 1 === parentContext.insertionMode ? createFormatContext$1(2, null, parentContext.tagScope) : parentContext;
}
var textSeparator = stringToPrecomputedChunk("<!-- -->");
function pushTextInstance$1(target, text, renderState, textEmbedded) {
  if ("" === text) return textEmbedded;
  textEmbedded && target.push(textSeparator);
  target.push(stringToChunk(escapeTextForBrowser$1(text)));
  return true;
}
var styleNameCache$1 = /* @__PURE__ */ new Map(), styleAttributeStart = stringToPrecomputedChunk(' style="'), styleAssign = stringToPrecomputedChunk(":"), styleSeparator = stringToPrecomputedChunk(";");
function pushStyleAttribute$1(target, style) {
  if ("object" !== typeof style)
    throw Error(
      "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
    );
  var isFirst = true, styleName;
  for (styleName in style)
    if (hasOwnProperty$1.call(style, styleName)) {
      var styleValue = style[styleName];
      if (null != styleValue && "boolean" !== typeof styleValue && "" !== styleValue) {
        if (0 === styleName.indexOf("--")) {
          var nameChunk = stringToChunk(escapeTextForBrowser$1(styleName));
          styleValue = stringToChunk(
            escapeTextForBrowser$1(("" + styleValue).trim())
          );
        } else
          nameChunk = styleNameCache$1.get(styleName), void 0 === nameChunk && (nameChunk = stringToPrecomputedChunk(
            escapeTextForBrowser$1(
              styleName.replace(uppercasePattern$1, "-$1").toLowerCase().replace(msPattern$1, "-ms-")
            )
          ), styleNameCache$1.set(styleName, nameChunk)), styleValue = "number" === typeof styleValue ? 0 === styleValue || unitlessNumbers$1.has(styleName) ? stringToChunk("" + styleValue) : stringToChunk(styleValue + "px") : stringToChunk(
            escapeTextForBrowser$1(("" + styleValue).trim())
          );
        isFirst ? (isFirst = false, target.push(
          styleAttributeStart,
          nameChunk,
          styleAssign,
          styleValue
        )) : target.push(styleSeparator, nameChunk, styleAssign, styleValue);
      }
    }
  isFirst || target.push(attributeEnd);
}
var attributeSeparator = stringToPrecomputedChunk(" "), attributeAssign = stringToPrecomputedChunk('="'), attributeEnd = stringToPrecomputedChunk('"'), attributeEmptyString = stringToPrecomputedChunk('=""');
function pushBooleanAttribute$1(target, name, value) {
  value && "function" !== typeof value && "symbol" !== typeof value && target.push(attributeSeparator, stringToChunk(name), attributeEmptyString);
}
function pushStringAttribute$1(target, name, value) {
  "function" !== typeof value && "symbol" !== typeof value && "boolean" !== typeof value && target.push(
    attributeSeparator,
    stringToChunk(name),
    attributeAssign,
    stringToChunk(escapeTextForBrowser$1(value)),
    attributeEnd
  );
}
var actionJavaScriptURL$1 = stringToPrecomputedChunk(
  escapeTextForBrowser$1(
    "javascript:throw new Error('React form unexpectedly submitted.')"
  )
), startHiddenInputChunk = stringToPrecomputedChunk('<input type="hidden"');
function pushAdditionalFormField$1(value, key) {
  this.push(startHiddenInputChunk);
  validateAdditionalFormField$1(value);
  pushStringAttribute$1(this, "name", key);
  pushStringAttribute$1(this, "value", value);
  this.push(endOfStartTagSelfClosing);
}
function validateAdditionalFormField$1(value) {
  if ("string" !== typeof value)
    throw Error(
      "File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration."
    );
}
function getCustomFormFields$1(resumableState, formAction) {
  if ("function" === typeof formAction.$$FORM_ACTION) {
    var id = resumableState.nextFormID++;
    resumableState = resumableState.idPrefix + id;
    try {
      var customFields = formAction.$$FORM_ACTION(resumableState);
      if (customFields) {
        var formData = customFields.data;
        null != formData && formData.forEach(validateAdditionalFormField$1);
      }
      return customFields;
    } catch (x) {
      if ("object" === typeof x && null !== x && "function" === typeof x.then)
        throw x;
    }
  }
  return null;
}
function pushFormActionAttribute$1(target, resumableState, renderState, formAction, formEncType, formMethod, formTarget, name) {
  var formData = null;
  if ("function" === typeof formAction) {
    var customFields = getCustomFormFields$1(resumableState, formAction);
    null !== customFields ? (name = customFields.name, formAction = customFields.action || "", formEncType = customFields.encType, formMethod = customFields.method, formTarget = customFields.target, formData = customFields.data) : (target.push(
      attributeSeparator,
      stringToChunk("formAction"),
      attributeAssign,
      actionJavaScriptURL$1,
      attributeEnd
    ), formTarget = formMethod = formEncType = formAction = name = null, injectFormReplayingRuntime$1(resumableState, renderState));
  }
  null != name && pushAttribute$1(target, "name", name);
  null != formAction && pushAttribute$1(target, "formAction", formAction);
  null != formEncType && pushAttribute$1(target, "formEncType", formEncType);
  null != formMethod && pushAttribute$1(target, "formMethod", formMethod);
  null != formTarget && pushAttribute$1(target, "formTarget", formTarget);
  return formData;
}
function pushAttribute$1(target, name, value) {
  switch (name) {
    case "className":
      pushStringAttribute$1(target, "class", value);
      break;
    case "tabIndex":
      pushStringAttribute$1(target, "tabindex", value);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      pushStringAttribute$1(target, name, value);
      break;
    case "style":
      pushStyleAttribute$1(target, value);
      break;
    case "src":
    case "href":
      if ("" === value) break;
    case "action":
    case "formAction":
      if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
        break;
      value = sanitizeURL$1("" + value);
      target.push(
        attributeSeparator,
        stringToChunk(name),
        attributeAssign,
        stringToChunk(escapeTextForBrowser$1(value)),
        attributeEnd
      );
      break;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "ref":
      break;
    case "autoFocus":
    case "multiple":
    case "muted":
      pushBooleanAttribute$1(target, name.toLowerCase(), value);
      break;
    case "xlinkHref":
      if ("function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
        break;
      value = sanitizeURL$1("" + value);
      target.push(
        attributeSeparator,
        stringToChunk("xlink:href"),
        attributeAssign,
        stringToChunk(escapeTextForBrowser$1(value)),
        attributeEnd
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      "function" !== typeof value && "symbol" !== typeof value && target.push(
        attributeSeparator,
        stringToChunk(name),
        attributeAssign,
        stringToChunk(escapeTextForBrowser$1(value)),
        attributeEnd
      );
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      value && "function" !== typeof value && "symbol" !== typeof value && target.push(
        attributeSeparator,
        stringToChunk(name),
        attributeEmptyString
      );
      break;
    case "capture":
    case "download":
      true === value ? target.push(
        attributeSeparator,
        stringToChunk(name),
        attributeEmptyString
      ) : false !== value && "function" !== typeof value && "symbol" !== typeof value && target.push(
        attributeSeparator,
        stringToChunk(name),
        attributeAssign,
        stringToChunk(escapeTextForBrowser$1(value)),
        attributeEnd
      );
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value && target.push(
        attributeSeparator,
        stringToChunk(name),
        attributeAssign,
        stringToChunk(escapeTextForBrowser$1(value)),
        attributeEnd
      );
      break;
    case "rowSpan":
    case "start":
      "function" === typeof value || "symbol" === typeof value || isNaN(value) || target.push(
        attributeSeparator,
        stringToChunk(name),
        attributeAssign,
        stringToChunk(escapeTextForBrowser$1(value)),
        attributeEnd
      );
      break;
    case "xlinkActuate":
      pushStringAttribute$1(target, "xlink:actuate", value);
      break;
    case "xlinkArcrole":
      pushStringAttribute$1(target, "xlink:arcrole", value);
      break;
    case "xlinkRole":
      pushStringAttribute$1(target, "xlink:role", value);
      break;
    case "xlinkShow":
      pushStringAttribute$1(target, "xlink:show", value);
      break;
    case "xlinkTitle":
      pushStringAttribute$1(target, "xlink:title", value);
      break;
    case "xlinkType":
      pushStringAttribute$1(target, "xlink:type", value);
      break;
    case "xmlBase":
      pushStringAttribute$1(target, "xml:base", value);
      break;
    case "xmlLang":
      pushStringAttribute$1(target, "xml:lang", value);
      break;
    case "xmlSpace":
      pushStringAttribute$1(target, "xml:space", value);
      break;
    default:
      if (!(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1]) {
        if (name = aliases$1.get(name) || name, isAttributeNameSafe$1(name)) {
          switch (typeof value) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var prefix$8 = name.toLowerCase().slice(0, 5);
              if ("data-" !== prefix$8 && "aria-" !== prefix$8) return;
          }
          target.push(
            attributeSeparator,
            stringToChunk(name),
            attributeAssign,
            stringToChunk(escapeTextForBrowser$1(value)),
            attributeEnd
          );
        }
      }
  }
}
var endOfStartTag = stringToPrecomputedChunk(">"), endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
function pushInnerHTML$1(target, innerHTML, children) {
  if (null != innerHTML) {
    if (null != children)
      throw Error(
        "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
      );
    if ("object" !== typeof innerHTML || !("__html" in innerHTML))
      throw Error(
        "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
      );
    innerHTML = innerHTML.__html;
    null !== innerHTML && void 0 !== innerHTML && target.push(stringToChunk("" + innerHTML));
  }
}
function flattenOptionChildren$1(children) {
  var content = "";
  React$1.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""'), formReplayingRuntimeScript = stringToPrecomputedChunk(
  `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`
);
function injectFormReplayingRuntime$1(resumableState, renderState) {
  0 === (resumableState.instructions & 16) && (resumableState.instructions |= 16, renderState.bootstrapChunks.unshift(
    renderState.startInlineScript,
    formReplayingRuntimeScript,
    endInlineScript
  ));
}
var formStateMarkerIsMatching = stringToPrecomputedChunk("<!--F!-->"), formStateMarkerIsNotMatching = stringToPrecomputedChunk("<!--F-->");
function pushLinkImpl$1(target, props) {
  target.push(startChunkForTag$1("link"));
  for (var propKey in props)
    if (hasOwnProperty$1.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(
              "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
            );
          default:
            pushAttribute$1(target, propKey, propValue);
        }
    }
  target.push(endOfStartTagSelfClosing);
  return null;
}
var styleRegex$1 = /(<\/|<)(s)(tyle)/gi;
function styleReplacer$1(match, prefix2, s, suffix2) {
  return "" + prefix2 + ("s" === s ? "\\73 " : "\\53 ") + suffix2;
}
function pushSelfClosing$1(target, props, tag) {
  target.push(startChunkForTag$1(tag));
  for (var propKey in props)
    if (hasOwnProperty$1.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(
              tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
            );
          default:
            pushAttribute$1(target, propKey, propValue);
        }
    }
  target.push(endOfStartTagSelfClosing);
  return null;
}
function pushTitleImpl$1(target, props) {
  target.push(startChunkForTag$1("title"));
  var children = null, innerHTML = null, propKey;
  for (propKey in props)
    if (hasOwnProperty$1.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            children = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute$1(target, propKey, propValue);
        }
    }
  target.push(endOfStartTag);
  props = Array.isArray(children) ? 2 > children.length ? children[0] : null : children;
  "function" !== typeof props && "symbol" !== typeof props && null !== props && void 0 !== props && target.push(stringToChunk(escapeTextForBrowser$1("" + props)));
  pushInnerHTML$1(target, innerHTML, children);
  target.push(endChunkForTag$1("title"));
  return null;
}
function pushScriptImpl$1(target, props) {
  target.push(startChunkForTag$1("script"));
  var children = null, innerHTML = null, propKey;
  for (propKey in props)
    if (hasOwnProperty$1.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            children = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute$1(target, propKey, propValue);
        }
    }
  target.push(endOfStartTag);
  pushInnerHTML$1(target, innerHTML, children);
  "string" === typeof children && target.push(
    stringToChunk(("" + children).replace(scriptRegex$1, scriptReplacer$1))
  );
  target.push(endChunkForTag$1("script"));
  return null;
}
function pushStartGenericElement$1(target, props, tag) {
  target.push(startChunkForTag$1(tag));
  var innerHTML = tag = null, propKey;
  for (propKey in props)
    if (hasOwnProperty$1.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            tag = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute$1(target, propKey, propValue);
        }
    }
  target.push(endOfStartTag);
  pushInnerHTML$1(target, innerHTML, tag);
  return "string" === typeof tag ? (target.push(stringToChunk(escapeTextForBrowser$1(tag))), null) : tag;
}
var leadingNewline = stringToPrecomputedChunk("\n"), VALID_TAG_REGEX$1 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, validatedTagCache$1 = /* @__PURE__ */ new Map();
function startChunkForTag$1(tag) {
  var tagStartChunk = validatedTagCache$1.get(tag);
  if (void 0 === tagStartChunk) {
    if (!VALID_TAG_REGEX$1.test(tag)) throw Error("Invalid tag: " + tag);
    tagStartChunk = stringToPrecomputedChunk("<" + tag);
    validatedTagCache$1.set(tag, tagStartChunk);
  }
  return tagStartChunk;
}
var doctypeChunk = stringToPrecomputedChunk("<!DOCTYPE html>");
function pushStartInstance$1(target$jscomp$0, type, props, resumableState, renderState, hoistableState, formatContext, textEmbedded, isFallback) {
  switch (type) {
    case "div":
    case "span":
    case "svg":
    case "path":
      break;
    case "a":
      target$jscomp$0.push(startChunkForTag$1("a"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty$1.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "href":
                "" === propValue ? pushStringAttribute$1(target$jscomp$0, "href", "") : pushAttribute$1(target$jscomp$0, propKey, propValue);
                break;
              default:
                pushAttribute$1(target$jscomp$0, propKey, propValue);
            }
        }
      target$jscomp$0.push(endOfStartTag);
      pushInnerHTML$1(target$jscomp$0, innerHTML, children);
      if ("string" === typeof children) {
        target$jscomp$0.push(stringToChunk(escapeTextForBrowser$1(children)));
        var JSCompiler_inline_result = null;
      } else JSCompiler_inline_result = children;
      return JSCompiler_inline_result;
    case "g":
    case "p":
    case "li":
      break;
    case "select":
      target$jscomp$0.push(startChunkForTag$1("select"));
      var children$jscomp$0 = null, innerHTML$jscomp$0 = null, propKey$jscomp$0;
      for (propKey$jscomp$0 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$0)) {
          var propValue$jscomp$0 = props[propKey$jscomp$0];
          if (null != propValue$jscomp$0)
            switch (propKey$jscomp$0) {
              case "children":
                children$jscomp$0 = propValue$jscomp$0;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$0 = propValue$jscomp$0;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$0,
                  propValue$jscomp$0
                );
            }
        }
      target$jscomp$0.push(endOfStartTag);
      pushInnerHTML$1(target$jscomp$0, innerHTML$jscomp$0, children$jscomp$0);
      return children$jscomp$0;
    case "option":
      var selectedValue = formatContext.selectedValue;
      target$jscomp$0.push(startChunkForTag$1("option"));
      var children$jscomp$1 = null, value = null, selected = null, innerHTML$jscomp$1 = null, propKey$jscomp$1;
      for (propKey$jscomp$1 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$1)) {
          var propValue$jscomp$1 = props[propKey$jscomp$1];
          if (null != propValue$jscomp$1)
            switch (propKey$jscomp$1) {
              case "children":
                children$jscomp$1 = propValue$jscomp$1;
                break;
              case "selected":
                selected = propValue$jscomp$1;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$1 = propValue$jscomp$1;
                break;
              case "value":
                value = propValue$jscomp$1;
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$1,
                  propValue$jscomp$1
                );
            }
        }
      if (null != selectedValue) {
        var stringValue = null !== value ? "" + value : flattenOptionChildren$1(children$jscomp$1);
        if (isArrayImpl$1(selectedValue))
          for (var i = 0; i < selectedValue.length; i++) {
            if ("" + selectedValue[i] === stringValue) {
              target$jscomp$0.push(selectedMarkerAttribute);
              break;
            }
          }
        else
          "" + selectedValue === stringValue && target$jscomp$0.push(selectedMarkerAttribute);
      } else selected && target$jscomp$0.push(selectedMarkerAttribute);
      target$jscomp$0.push(endOfStartTag);
      pushInnerHTML$1(target$jscomp$0, innerHTML$jscomp$1, children$jscomp$1);
      return children$jscomp$1;
    case "textarea":
      target$jscomp$0.push(startChunkForTag$1("textarea"));
      var value$jscomp$0 = null, defaultValue = null, children$jscomp$2 = null, propKey$jscomp$2;
      for (propKey$jscomp$2 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$2)) {
          var propValue$jscomp$2 = props[propKey$jscomp$2];
          if (null != propValue$jscomp$2)
            switch (propKey$jscomp$2) {
              case "children":
                children$jscomp$2 = propValue$jscomp$2;
                break;
              case "value":
                value$jscomp$0 = propValue$jscomp$2;
                break;
              case "defaultValue":
                defaultValue = propValue$jscomp$2;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(
                  "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                );
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$2,
                  propValue$jscomp$2
                );
            }
        }
      null === value$jscomp$0 && null !== defaultValue && (value$jscomp$0 = defaultValue);
      target$jscomp$0.push(endOfStartTag);
      if (null != children$jscomp$2) {
        if (null != value$jscomp$0)
          throw Error(
            "If you supply `defaultValue` on a <textarea>, do not pass children."
          );
        if (isArrayImpl$1(children$jscomp$2)) {
          if (1 < children$jscomp$2.length)
            throw Error("<textarea> can only have at most one child.");
          value$jscomp$0 = "" + children$jscomp$2[0];
        }
        value$jscomp$0 = "" + children$jscomp$2;
      }
      "string" === typeof value$jscomp$0 && "\n" === value$jscomp$0[0] && target$jscomp$0.push(leadingNewline);
      null !== value$jscomp$0 && target$jscomp$0.push(
        stringToChunk(escapeTextForBrowser$1("" + value$jscomp$0))
      );
      return null;
    case "input":
      target$jscomp$0.push(startChunkForTag$1("input"));
      var name = null, formAction = null, formEncType = null, formMethod = null, formTarget = null, value$jscomp$1 = null, defaultValue$jscomp$0 = null, checked = null, defaultChecked = null, propKey$jscomp$3;
      for (propKey$jscomp$3 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$3)) {
          var propValue$jscomp$3 = props[propKey$jscomp$3];
          if (null != propValue$jscomp$3)
            switch (propKey$jscomp$3) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              case "name":
                name = propValue$jscomp$3;
                break;
              case "formAction":
                formAction = propValue$jscomp$3;
                break;
              case "formEncType":
                formEncType = propValue$jscomp$3;
                break;
              case "formMethod":
                formMethod = propValue$jscomp$3;
                break;
              case "formTarget":
                formTarget = propValue$jscomp$3;
                break;
              case "defaultChecked":
                defaultChecked = propValue$jscomp$3;
                break;
              case "defaultValue":
                defaultValue$jscomp$0 = propValue$jscomp$3;
                break;
              case "checked":
                checked = propValue$jscomp$3;
                break;
              case "value":
                value$jscomp$1 = propValue$jscomp$3;
                break;
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$3,
                  propValue$jscomp$3
                );
            }
        }
      var formData = pushFormActionAttribute$1(
        target$jscomp$0,
        resumableState,
        renderState,
        formAction,
        formEncType,
        formMethod,
        formTarget,
        name
      );
      null !== checked ? pushBooleanAttribute$1(target$jscomp$0, "checked", checked) : null !== defaultChecked && pushBooleanAttribute$1(target$jscomp$0, "checked", defaultChecked);
      null !== value$jscomp$1 ? pushAttribute$1(target$jscomp$0, "value", value$jscomp$1) : null !== defaultValue$jscomp$0 && pushAttribute$1(target$jscomp$0, "value", defaultValue$jscomp$0);
      target$jscomp$0.push(endOfStartTagSelfClosing);
      null != formData && formData.forEach(pushAdditionalFormField$1, target$jscomp$0);
      return null;
    case "button":
      target$jscomp$0.push(startChunkForTag$1("button"));
      var children$jscomp$3 = null, innerHTML$jscomp$2 = null, name$jscomp$0 = null, formAction$jscomp$0 = null, formEncType$jscomp$0 = null, formMethod$jscomp$0 = null, formTarget$jscomp$0 = null, propKey$jscomp$4;
      for (propKey$jscomp$4 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$4)) {
          var propValue$jscomp$4 = props[propKey$jscomp$4];
          if (null != propValue$jscomp$4)
            switch (propKey$jscomp$4) {
              case "children":
                children$jscomp$3 = propValue$jscomp$4;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$2 = propValue$jscomp$4;
                break;
              case "name":
                name$jscomp$0 = propValue$jscomp$4;
                break;
              case "formAction":
                formAction$jscomp$0 = propValue$jscomp$4;
                break;
              case "formEncType":
                formEncType$jscomp$0 = propValue$jscomp$4;
                break;
              case "formMethod":
                formMethod$jscomp$0 = propValue$jscomp$4;
                break;
              case "formTarget":
                formTarget$jscomp$0 = propValue$jscomp$4;
                break;
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$4,
                  propValue$jscomp$4
                );
            }
        }
      var formData$jscomp$0 = pushFormActionAttribute$1(
        target$jscomp$0,
        resumableState,
        renderState,
        formAction$jscomp$0,
        formEncType$jscomp$0,
        formMethod$jscomp$0,
        formTarget$jscomp$0,
        name$jscomp$0
      );
      target$jscomp$0.push(endOfStartTag);
      null != formData$jscomp$0 && formData$jscomp$0.forEach(pushAdditionalFormField$1, target$jscomp$0);
      pushInnerHTML$1(target$jscomp$0, innerHTML$jscomp$2, children$jscomp$3);
      if ("string" === typeof children$jscomp$3) {
        target$jscomp$0.push(
          stringToChunk(escapeTextForBrowser$1(children$jscomp$3))
        );
        var JSCompiler_inline_result$jscomp$0 = null;
      } else JSCompiler_inline_result$jscomp$0 = children$jscomp$3;
      return JSCompiler_inline_result$jscomp$0;
    case "form":
      target$jscomp$0.push(startChunkForTag$1("form"));
      var children$jscomp$4 = null, innerHTML$jscomp$3 = null, formAction$jscomp$1 = null, formEncType$jscomp$1 = null, formMethod$jscomp$1 = null, formTarget$jscomp$1 = null, propKey$jscomp$5;
      for (propKey$jscomp$5 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$5)) {
          var propValue$jscomp$5 = props[propKey$jscomp$5];
          if (null != propValue$jscomp$5)
            switch (propKey$jscomp$5) {
              case "children":
                children$jscomp$4 = propValue$jscomp$5;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$3 = propValue$jscomp$5;
                break;
              case "action":
                formAction$jscomp$1 = propValue$jscomp$5;
                break;
              case "encType":
                formEncType$jscomp$1 = propValue$jscomp$5;
                break;
              case "method":
                formMethod$jscomp$1 = propValue$jscomp$5;
                break;
              case "target":
                formTarget$jscomp$1 = propValue$jscomp$5;
                break;
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$5,
                  propValue$jscomp$5
                );
            }
        }
      var formData$jscomp$1 = null, formActionName = null;
      if ("function" === typeof formAction$jscomp$1) {
        var customFields = getCustomFormFields$1(
          resumableState,
          formAction$jscomp$1
        );
        null !== customFields ? (formAction$jscomp$1 = customFields.action || "", formEncType$jscomp$1 = customFields.encType, formMethod$jscomp$1 = customFields.method, formTarget$jscomp$1 = customFields.target, formData$jscomp$1 = customFields.data, formActionName = customFields.name) : (target$jscomp$0.push(
          attributeSeparator,
          stringToChunk("action"),
          attributeAssign,
          actionJavaScriptURL$1,
          attributeEnd
        ), formTarget$jscomp$1 = formMethod$jscomp$1 = formEncType$jscomp$1 = formAction$jscomp$1 = null, injectFormReplayingRuntime$1(resumableState, renderState));
      }
      null != formAction$jscomp$1 && pushAttribute$1(target$jscomp$0, "action", formAction$jscomp$1);
      null != formEncType$jscomp$1 && pushAttribute$1(target$jscomp$0, "encType", formEncType$jscomp$1);
      null != formMethod$jscomp$1 && pushAttribute$1(target$jscomp$0, "method", formMethod$jscomp$1);
      null != formTarget$jscomp$1 && pushAttribute$1(target$jscomp$0, "target", formTarget$jscomp$1);
      target$jscomp$0.push(endOfStartTag);
      null !== formActionName && (target$jscomp$0.push(startHiddenInputChunk), pushStringAttribute$1(target$jscomp$0, "name", formActionName), target$jscomp$0.push(endOfStartTagSelfClosing), null != formData$jscomp$1 && formData$jscomp$1.forEach(pushAdditionalFormField$1, target$jscomp$0));
      pushInnerHTML$1(target$jscomp$0, innerHTML$jscomp$3, children$jscomp$4);
      if ("string" === typeof children$jscomp$4) {
        target$jscomp$0.push(
          stringToChunk(escapeTextForBrowser$1(children$jscomp$4))
        );
        var JSCompiler_inline_result$jscomp$1 = null;
      } else JSCompiler_inline_result$jscomp$1 = children$jscomp$4;
      return JSCompiler_inline_result$jscomp$1;
    case "menuitem":
      target$jscomp$0.push(startChunkForTag$1("menuitem"));
      for (var propKey$jscomp$6 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$6)) {
          var propValue$jscomp$6 = props[propKey$jscomp$6];
          if (null != propValue$jscomp$6)
            switch (propKey$jscomp$6) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "menuitems cannot have `children` nor `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$6,
                  propValue$jscomp$6
                );
            }
        }
      target$jscomp$0.push(endOfStartTag);
      return null;
    case "object":
      target$jscomp$0.push(startChunkForTag$1("object"));
      var children$jscomp$5 = null, innerHTML$jscomp$4 = null, propKey$jscomp$7;
      for (propKey$jscomp$7 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$7)) {
          var propValue$jscomp$7 = props[propKey$jscomp$7];
          if (null != propValue$jscomp$7)
            switch (propKey$jscomp$7) {
              case "children":
                children$jscomp$5 = propValue$jscomp$7;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$4 = propValue$jscomp$7;
                break;
              case "data":
                var sanitizedValue = sanitizeURL$1("" + propValue$jscomp$7);
                if ("" === sanitizedValue) break;
                target$jscomp$0.push(
                  attributeSeparator,
                  stringToChunk("data"),
                  attributeAssign,
                  stringToChunk(escapeTextForBrowser$1(sanitizedValue)),
                  attributeEnd
                );
                break;
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$7,
                  propValue$jscomp$7
                );
            }
        }
      target$jscomp$0.push(endOfStartTag);
      pushInnerHTML$1(target$jscomp$0, innerHTML$jscomp$4, children$jscomp$5);
      if ("string" === typeof children$jscomp$5) {
        target$jscomp$0.push(
          stringToChunk(escapeTextForBrowser$1(children$jscomp$5))
        );
        var JSCompiler_inline_result$jscomp$2 = null;
      } else JSCompiler_inline_result$jscomp$2 = children$jscomp$5;
      return JSCompiler_inline_result$jscomp$2;
    case "title":
      if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
        var JSCompiler_inline_result$jscomp$3 = pushTitleImpl$1(
          target$jscomp$0,
          props
        );
      else
        isFallback ? JSCompiler_inline_result$jscomp$3 = null : (pushTitleImpl$1(renderState.hoistableChunks, props), JSCompiler_inline_result$jscomp$3 = void 0);
      return JSCompiler_inline_result$jscomp$3;
    case "link":
      var rel = props.rel, href = props.href, precedence = props.precedence;
      if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp || "string" !== typeof rel || "string" !== typeof href || "" === href) {
        pushLinkImpl$1(target$jscomp$0, props);
        var JSCompiler_inline_result$jscomp$4 = null;
      } else if ("stylesheet" === props.rel)
        if ("string" !== typeof precedence || null != props.disabled || props.onLoad || props.onError)
          JSCompiler_inline_result$jscomp$4 = pushLinkImpl$1(
            target$jscomp$0,
            props
          );
        else {
          var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
          if (null !== resourceState) {
            resumableState.styleResources[href] = null;
            styleQueue || (styleQueue = {
              precedence: stringToChunk(escapeTextForBrowser$1(precedence)),
              rules: [],
              hrefs: [],
              sheets: /* @__PURE__ */ new Map()
            }, renderState.styles.set(precedence, styleQueue));
            var resource = {
              state: 0,
              props: assign$1({}, props, {
                "data-precedence": props.precedence,
                precedence: null
              })
            };
            if (resourceState) {
              2 === resourceState.length && adoptPreloadCredentials$1(resource.props, resourceState);
              var preloadResource = renderState.preloads.stylesheets.get(href);
              preloadResource && 0 < preloadResource.length ? preloadResource.length = 0 : resource.state = 1;
            }
            styleQueue.sheets.set(href, resource);
            hoistableState && hoistableState.stylesheets.add(resource);
          } else if (styleQueue) {
            var resource$9 = styleQueue.sheets.get(href);
            resource$9 && hoistableState && hoistableState.stylesheets.add(resource$9);
          }
          textEmbedded && target$jscomp$0.push(textSeparator);
          JSCompiler_inline_result$jscomp$4 = null;
        }
      else
        props.onLoad || props.onError ? JSCompiler_inline_result$jscomp$4 = pushLinkImpl$1(
          target$jscomp$0,
          props
        ) : (textEmbedded && target$jscomp$0.push(textSeparator), JSCompiler_inline_result$jscomp$4 = isFallback ? null : pushLinkImpl$1(renderState.hoistableChunks, props));
      return JSCompiler_inline_result$jscomp$4;
    case "script":
      var asyncProp = props.async;
      if ("string" !== typeof props.src || !props.src || !asyncProp || "function" === typeof asyncProp || "symbol" === typeof asyncProp || props.onLoad || props.onError || 3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
        var JSCompiler_inline_result$jscomp$5 = pushScriptImpl$1(
          target$jscomp$0,
          props
        );
      else {
        var key = props.src;
        if ("module" === props.type) {
          var resources = resumableState.moduleScriptResources;
          var preloads = renderState.preloads.moduleScripts;
        } else
          resources = resumableState.scriptResources, preloads = renderState.preloads.scripts;
        var resourceState$jscomp$0 = resources.hasOwnProperty(key) ? resources[key] : void 0;
        if (null !== resourceState$jscomp$0) {
          resources[key] = null;
          var scriptProps = props;
          if (resourceState$jscomp$0) {
            2 === resourceState$jscomp$0.length && (scriptProps = assign$1({}, props), adoptPreloadCredentials$1(scriptProps, resourceState$jscomp$0));
            var preloadResource$jscomp$0 = preloads.get(key);
            preloadResource$jscomp$0 && (preloadResource$jscomp$0.length = 0);
          }
          var resource$jscomp$0 = [];
          renderState.scripts.add(resource$jscomp$0);
          pushScriptImpl$1(resource$jscomp$0, scriptProps);
        }
        textEmbedded && target$jscomp$0.push(textSeparator);
        JSCompiler_inline_result$jscomp$5 = null;
      }
      return JSCompiler_inline_result$jscomp$5;
    case "style":
      var precedence$jscomp$0 = props.precedence, href$jscomp$0 = props.href;
      if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp || "string" !== typeof precedence$jscomp$0 || "string" !== typeof href$jscomp$0 || "" === href$jscomp$0) {
        target$jscomp$0.push(startChunkForTag$1("style"));
        var children$jscomp$6 = null, innerHTML$jscomp$5 = null, propKey$jscomp$8;
        for (propKey$jscomp$8 in props)
          if (hasOwnProperty$1.call(props, propKey$jscomp$8)) {
            var propValue$jscomp$8 = props[propKey$jscomp$8];
            if (null != propValue$jscomp$8)
              switch (propKey$jscomp$8) {
                case "children":
                  children$jscomp$6 = propValue$jscomp$8;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML$jscomp$5 = propValue$jscomp$8;
                  break;
                default:
                  pushAttribute$1(
                    target$jscomp$0,
                    propKey$jscomp$8,
                    propValue$jscomp$8
                  );
              }
          }
        target$jscomp$0.push(endOfStartTag);
        var child = Array.isArray(children$jscomp$6) ? 2 > children$jscomp$6.length ? children$jscomp$6[0] : null : children$jscomp$6;
        "function" !== typeof child && "symbol" !== typeof child && null !== child && void 0 !== child && target$jscomp$0.push(
          stringToChunk(("" + child).replace(styleRegex$1, styleReplacer$1))
        );
        pushInnerHTML$1(target$jscomp$0, innerHTML$jscomp$5, children$jscomp$6);
        target$jscomp$0.push(endChunkForTag$1("style"));
        var JSCompiler_inline_result$jscomp$6 = null;
      } else {
        var styleQueue$jscomp$0 = renderState.styles.get(precedence$jscomp$0);
        if (null !== (resumableState.styleResources.hasOwnProperty(href$jscomp$0) ? resumableState.styleResources[href$jscomp$0] : void 0)) {
          resumableState.styleResources[href$jscomp$0] = null;
          styleQueue$jscomp$0 ? styleQueue$jscomp$0.hrefs.push(
            stringToChunk(escapeTextForBrowser$1(href$jscomp$0))
          ) : (styleQueue$jscomp$0 = {
            precedence: stringToChunk(
              escapeTextForBrowser$1(precedence$jscomp$0)
            ),
            rules: [],
            hrefs: [stringToChunk(escapeTextForBrowser$1(href$jscomp$0))],
            sheets: /* @__PURE__ */ new Map()
          }, renderState.styles.set(precedence$jscomp$0, styleQueue$jscomp$0));
          var target = styleQueue$jscomp$0.rules, children$jscomp$7 = null, innerHTML$jscomp$6 = null, propKey$jscomp$9;
          for (propKey$jscomp$9 in props)
            if (hasOwnProperty$1.call(props, propKey$jscomp$9)) {
              var propValue$jscomp$9 = props[propKey$jscomp$9];
              if (null != propValue$jscomp$9)
                switch (propKey$jscomp$9) {
                  case "children":
                    children$jscomp$7 = propValue$jscomp$9;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$6 = propValue$jscomp$9;
                }
            }
          var child$jscomp$0 = Array.isArray(children$jscomp$7) ? 2 > children$jscomp$7.length ? children$jscomp$7[0] : null : children$jscomp$7;
          "function" !== typeof child$jscomp$0 && "symbol" !== typeof child$jscomp$0 && null !== child$jscomp$0 && void 0 !== child$jscomp$0 && target.push(
            stringToChunk(
              ("" + child$jscomp$0).replace(styleRegex$1, styleReplacer$1)
            )
          );
          pushInnerHTML$1(target, innerHTML$jscomp$6, children$jscomp$7);
        }
        styleQueue$jscomp$0 && hoistableState && hoistableState.styles.add(styleQueue$jscomp$0);
        textEmbedded && target$jscomp$0.push(textSeparator);
        JSCompiler_inline_result$jscomp$6 = void 0;
      }
      return JSCompiler_inline_result$jscomp$6;
    case "meta":
      if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
        var JSCompiler_inline_result$jscomp$7 = pushSelfClosing$1(
          target$jscomp$0,
          props,
          "meta"
        );
      else
        textEmbedded && target$jscomp$0.push(textSeparator), JSCompiler_inline_result$jscomp$7 = isFallback ? null : "string" === typeof props.charSet ? pushSelfClosing$1(renderState.charsetChunks, props, "meta") : "viewport" === props.name ? pushSelfClosing$1(renderState.viewportChunks, props, "meta") : pushSelfClosing$1(renderState.hoistableChunks, props, "meta");
      return JSCompiler_inline_result$jscomp$7;
    case "listing":
    case "pre":
      target$jscomp$0.push(startChunkForTag$1(type));
      var children$jscomp$8 = null, innerHTML$jscomp$7 = null, propKey$jscomp$10;
      for (propKey$jscomp$10 in props)
        if (hasOwnProperty$1.call(props, propKey$jscomp$10)) {
          var propValue$jscomp$10 = props[propKey$jscomp$10];
          if (null != propValue$jscomp$10)
            switch (propKey$jscomp$10) {
              case "children":
                children$jscomp$8 = propValue$jscomp$10;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$7 = propValue$jscomp$10;
                break;
              default:
                pushAttribute$1(
                  target$jscomp$0,
                  propKey$jscomp$10,
                  propValue$jscomp$10
                );
            }
        }
      target$jscomp$0.push(endOfStartTag);
      if (null != innerHTML$jscomp$7) {
        if (null != children$jscomp$8)
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        if ("object" !== typeof innerHTML$jscomp$7 || !("__html" in innerHTML$jscomp$7))
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
          );
        var html = innerHTML$jscomp$7.__html;
        null !== html && void 0 !== html && ("string" === typeof html && 0 < html.length && "\n" === html[0] ? target$jscomp$0.push(leadingNewline, stringToChunk(html)) : target$jscomp$0.push(stringToChunk("" + html)));
      }
      "string" === typeof children$jscomp$8 && "\n" === children$jscomp$8[0] && target$jscomp$0.push(leadingNewline);
      return children$jscomp$8;
    case "img":
      var src = props.src, srcSet = props.srcSet;
      if (!("lazy" === props.loading || !src && !srcSet || "string" !== typeof src && null != src || "string" !== typeof srcSet && null != srcSet) && "low" !== props.fetchPriority && false === !!(formatContext.tagScope & 3) && ("string" !== typeof src || ":" !== src[4] || "d" !== src[0] && "D" !== src[0] || "a" !== src[1] && "A" !== src[1] || "t" !== src[2] && "T" !== src[2] || "a" !== src[3] && "A" !== src[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
        var sizes = "string" === typeof props.sizes ? props.sizes : void 0, key$jscomp$0 = srcSet ? srcSet + "\n" + (sizes || "") : src, promotablePreloads = renderState.preloads.images, resource$jscomp$1 = promotablePreloads.get(key$jscomp$0);
        if (resource$jscomp$1) {
          if ("high" === props.fetchPriority || 10 > renderState.highImagePreloads.size)
            promotablePreloads.delete(key$jscomp$0), renderState.highImagePreloads.add(resource$jscomp$1);
        } else if (!resumableState.imageResources.hasOwnProperty(key$jscomp$0)) {
          resumableState.imageResources[key$jscomp$0] = PRELOAD_NO_CREDS$1;
          var input = props.crossOrigin;
          var JSCompiler_inline_result$jscomp$8 = "string" === typeof input ? "use-credentials" === input ? input : "" : void 0;
          var headers = renderState.headers, header;
          headers && 0 < headers.remainingCapacity && ("high" === props.fetchPriority || 500 > headers.highImagePreloads.length) && (header = getPreloadAsHeader$1(src, "image", {
            imageSrcSet: props.srcSet,
            imageSizes: props.sizes,
            crossOrigin: JSCompiler_inline_result$jscomp$8,
            integrity: props.integrity,
            nonce: props.nonce,
            type: props.type,
            fetchPriority: props.fetchPriority,
            referrerPolicy: props.refererPolicy
          }), 0 <= (headers.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key$jscomp$0] = PRELOAD_NO_CREDS$1, headers.highImagePreloads && (headers.highImagePreloads += ", "), headers.highImagePreloads += header) : (resource$jscomp$1 = [], pushLinkImpl$1(resource$jscomp$1, {
            rel: "preload",
            as: "image",
            href: srcSet ? void 0 : src,
            imageSrcSet: srcSet,
            imageSizes: sizes,
            crossOrigin: JSCompiler_inline_result$jscomp$8,
            integrity: props.integrity,
            type: props.type,
            fetchPriority: props.fetchPriority,
            referrerPolicy: props.referrerPolicy
          }), "high" === props.fetchPriority || 10 > renderState.highImagePreloads.size ? renderState.highImagePreloads.add(resource$jscomp$1) : (renderState.bulkPreloads.add(resource$jscomp$1), promotablePreloads.set(key$jscomp$0, resource$jscomp$1)));
        }
      }
      return pushSelfClosing$1(target$jscomp$0, props, "img");
    case "base":
    case "area":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return pushSelfClosing$1(target$jscomp$0, props, type);
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      break;
    case "head":
      if (2 > formatContext.insertionMode && null === renderState.headChunks) {
        renderState.headChunks = [];
        var JSCompiler_inline_result$jscomp$9 = pushStartGenericElement$1(
          renderState.headChunks,
          props,
          "head"
        );
      } else
        JSCompiler_inline_result$jscomp$9 = pushStartGenericElement$1(
          target$jscomp$0,
          props,
          "head"
        );
      return JSCompiler_inline_result$jscomp$9;
    case "html":
      if (0 === formatContext.insertionMode && null === renderState.htmlChunks) {
        renderState.htmlChunks = [doctypeChunk];
        var JSCompiler_inline_result$jscomp$10 = pushStartGenericElement$1(
          renderState.htmlChunks,
          props,
          "html"
        );
      } else
        JSCompiler_inline_result$jscomp$10 = pushStartGenericElement$1(
          target$jscomp$0,
          props,
          "html"
        );
      return JSCompiler_inline_result$jscomp$10;
    default:
      if (-1 !== type.indexOf("-")) {
        target$jscomp$0.push(startChunkForTag$1(type));
        var children$jscomp$9 = null, innerHTML$jscomp$8 = null, propKey$jscomp$11;
        for (propKey$jscomp$11 in props)
          if (hasOwnProperty$1.call(props, propKey$jscomp$11)) {
            var propValue$jscomp$11 = props[propKey$jscomp$11];
            if (null != propValue$jscomp$11) {
              var attributeName = propKey$jscomp$11;
              switch (propKey$jscomp$11) {
                case "children":
                  children$jscomp$9 = propValue$jscomp$11;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML$jscomp$8 = propValue$jscomp$11;
                  break;
                case "style":
                  pushStyleAttribute$1(target$jscomp$0, propValue$jscomp$11);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "ref":
                  break;
                case "className":
                  attributeName = "class";
                default:
                  if (isAttributeNameSafe$1(propKey$jscomp$11) && "function" !== typeof propValue$jscomp$11 && "symbol" !== typeof propValue$jscomp$11 && false !== propValue$jscomp$11) {
                    if (true === propValue$jscomp$11) propValue$jscomp$11 = "";
                    else if ("object" === typeof propValue$jscomp$11) continue;
                    target$jscomp$0.push(
                      attributeSeparator,
                      stringToChunk(attributeName),
                      attributeAssign,
                      stringToChunk(escapeTextForBrowser$1(propValue$jscomp$11)),
                      attributeEnd
                    );
                  }
              }
            }
          }
        target$jscomp$0.push(endOfStartTag);
        pushInnerHTML$1(target$jscomp$0, innerHTML$jscomp$8, children$jscomp$9);
        return children$jscomp$9;
      }
  }
  return pushStartGenericElement$1(target$jscomp$0, props, type);
}
var endTagCache$1 = /* @__PURE__ */ new Map();
function endChunkForTag$1(tag) {
  var chunk = endTagCache$1.get(tag);
  void 0 === chunk && (chunk = stringToPrecomputedChunk("</" + tag + ">"), endTagCache$1.set(tag, chunk));
  return chunk;
}
function writeBootstrap$1(destination, renderState) {
  renderState = renderState.bootstrapChunks;
  for (var i = 0; i < renderState.length - 1; i++)
    writeChunk(destination, renderState[i]);
  return i < renderState.length ? (i = renderState[i], renderState.length = 0, writeChunkAndReturn(destination, i)) : true;
}
var placeholder1 = stringToPrecomputedChunk('<template id="'), placeholder2 = stringToPrecomputedChunk('"></template>'), startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->"), startPendingSuspenseBoundary1 = stringToPrecomputedChunk(
  '<!--$?--><template id="'
), startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>'), startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->"), endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->"), clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template"), clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"'), clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="');
stringToPrecomputedChunk(' data-msg="');
stringToPrecomputedChunk(' data-stck="');
stringToPrecomputedChunk(' data-cstck="');
var clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
function writeStartPendingSuspenseBoundary$1(destination, renderState, id) {
  writeChunk(destination, startPendingSuspenseBoundary1);
  if (null === id)
    throw Error(
      "An ID must have been assigned before we can complete the boundary."
    );
  writeChunk(destination, renderState.boundaryPrefix);
  writeChunk(destination, stringToChunk(id.toString(16)));
  return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
}
var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="'), startSegmentHTML2 = stringToPrecomputedChunk('">'), endSegmentHTML = stringToPrecomputedChunk("</div>"), startSegmentSVG = stringToPrecomputedChunk(
  '<svg aria-hidden="true" style="display:none" id="'
), startSegmentSVG2 = stringToPrecomputedChunk('">'), endSegmentSVG = stringToPrecomputedChunk("</svg>"), startSegmentMathML = stringToPrecomputedChunk(
  '<math aria-hidden="true" style="display:none" id="'
), startSegmentMathML2 = stringToPrecomputedChunk('">'), endSegmentMathML = stringToPrecomputedChunk("</math>"), startSegmentTable = stringToPrecomputedChunk('<table hidden id="'), startSegmentTable2 = stringToPrecomputedChunk('">'), endSegmentTable = stringToPrecomputedChunk("</table>"), startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="'), startSegmentTableBody2 = stringToPrecomputedChunk('">'), endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>"), startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="'), startSegmentTableRow2 = stringToPrecomputedChunk('">'), endSegmentTableRow = stringToPrecomputedChunk("</tr></table>"), startSegmentColGroup = stringToPrecomputedChunk(
  '<table hidden><colgroup id="'
), startSegmentColGroup2 = stringToPrecomputedChunk('">'), endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
function writeStartSegment$1(destination, renderState, formatContext, id) {
  switch (formatContext.insertionMode) {
    case 0:
    case 1:
    case 2:
      return writeChunk(destination, startSegmentHTML), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentHTML2);
    case 3:
      return writeChunk(destination, startSegmentSVG), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentSVG2);
    case 4:
      return writeChunk(destination, startSegmentMathML), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentMathML2);
    case 5:
      return writeChunk(destination, startSegmentTable), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTable2);
    case 6:
      return writeChunk(destination, startSegmentTableBody), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTableBody2);
    case 7:
      return writeChunk(destination, startSegmentTableRow), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentTableRow2);
    case 8:
      return writeChunk(destination, startSegmentColGroup), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, stringToChunk(id.toString(16))), writeChunkAndReturn(destination, startSegmentColGroup2);
    default:
      throw Error("Unknown insertion mode. This is a bug in React.");
  }
}
function writeEndSegment$1(destination, formatContext) {
  switch (formatContext.insertionMode) {
    case 0:
    case 1:
    case 2:
      return writeChunkAndReturn(destination, endSegmentHTML);
    case 3:
      return writeChunkAndReturn(destination, endSegmentSVG);
    case 4:
      return writeChunkAndReturn(destination, endSegmentMathML);
    case 5:
      return writeChunkAndReturn(destination, endSegmentTable);
    case 6:
      return writeChunkAndReturn(destination, endSegmentTableBody);
    case 7:
      return writeChunkAndReturn(destination, endSegmentTableRow);
    case 8:
      return writeChunkAndReturn(destination, endSegmentColGroup);
    default:
      throw Error("Unknown insertion mode. This is a bug in React.");
  }
}
var completeSegmentScript1Full = stringToPrecomputedChunk(
  '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
), completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("'), completeSegmentScript2 = stringToPrecomputedChunk('","'), completeSegmentScriptEnd = stringToPrecomputedChunk('")<\/script>');
stringToPrecomputedChunk('<template data-rsi="" data-sid="');
stringToPrecomputedChunk('" data-pid="');
var completeBoundaryScript1Full = stringToPrecomputedChunk(
  '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("'
), completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("'), completeBoundaryWithStylesScript1FullBoth = stringToPrecomputedChunk(
  '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
), completeBoundaryWithStylesScript1FullPartial = stringToPrecomputedChunk(
  '$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
), completeBoundaryWithStylesScript1Partial = stringToPrecomputedChunk('$RR("'), completeBoundaryScript2 = stringToPrecomputedChunk('","'), completeBoundaryScript3a = stringToPrecomputedChunk('",'), completeBoundaryScript3b = stringToPrecomputedChunk('"'), completeBoundaryScriptEnd = stringToPrecomputedChunk(")<\/script>");
stringToPrecomputedChunk('<template data-rci="" data-bid="');
stringToPrecomputedChunk('<template data-rri="" data-bid="');
stringToPrecomputedChunk('" data-sid="');
stringToPrecomputedChunk('" data-sty="');
var clientRenderScript1Full = stringToPrecomputedChunk(
  '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
), clientRenderScript1Partial = stringToPrecomputedChunk('$RX("'), clientRenderScript1A = stringToPrecomputedChunk('"'), clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(","), clientRenderScriptEnd = stringToPrecomputedChunk(")<\/script>");
stringToPrecomputedChunk('<template data-rxi="" data-bid="');
stringToPrecomputedChunk('" data-dgst="');
stringToPrecomputedChunk('" data-msg="');
stringToPrecomputedChunk('" data-stck="');
stringToPrecomputedChunk('" data-cstck="');
var regexForJSStringsInInstructionScripts$1 = /[<\u2028\u2029]/g;
function escapeJSStringsForInstructionScripts$1(input) {
  return JSON.stringify(input).replace(
    regexForJSStringsInInstructionScripts$1,
    function(match) {
      switch (match) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
  );
}
var regexForJSStringsInScripts$1 = /[&><\u2028\u2029]/g;
function escapeJSObjectForInstructionScripts$1(input) {
  return JSON.stringify(input).replace(
    regexForJSStringsInScripts$1,
    function(match) {
      switch (match) {
        case "&":
          return "\\u0026";
        case ">":
          return "\\u003e";
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
  );
}
var lateStyleTagResourceOpen1 = stringToPrecomputedChunk(
  '<style media="not all" data-precedence="'
), lateStyleTagResourceOpen2 = stringToPrecomputedChunk('" data-href="'), lateStyleTagResourceOpen3 = stringToPrecomputedChunk('">'), lateStyleTagTemplateClose = stringToPrecomputedChunk("</style>"), currentlyRenderingBoundaryHasStylesToHoist$1 = false, destinationHasCapacity$1 = true;
function flushStyleTagsLateForBoundary$1(styleQueue) {
  var rules = styleQueue.rules, hrefs = styleQueue.hrefs, i = 0;
  if (hrefs.length) {
    writeChunk(this, lateStyleTagResourceOpen1);
    writeChunk(this, styleQueue.precedence);
    for (writeChunk(this, lateStyleTagResourceOpen2); i < hrefs.length - 1; i++)
      writeChunk(this, hrefs[i]), writeChunk(this, spaceSeparator);
    writeChunk(this, hrefs[i]);
    writeChunk(this, lateStyleTagResourceOpen3);
    for (i = 0; i < rules.length; i++) writeChunk(this, rules[i]);
    destinationHasCapacity$1 = writeChunkAndReturn(
      this,
      lateStyleTagTemplateClose
    );
    currentlyRenderingBoundaryHasStylesToHoist$1 = true;
    rules.length = 0;
    hrefs.length = 0;
  }
}
function hasStylesToHoist$1(stylesheet2) {
  return 2 !== stylesheet2.state ? currentlyRenderingBoundaryHasStylesToHoist$1 = true : false;
}
function writeHoistablesForBoundary$1(destination, hoistableState, renderState) {
  currentlyRenderingBoundaryHasStylesToHoist$1 = false;
  destinationHasCapacity$1 = true;
  hoistableState.styles.forEach(flushStyleTagsLateForBoundary$1, destination);
  hoistableState.stylesheets.forEach(hasStylesToHoist$1);
  currentlyRenderingBoundaryHasStylesToHoist$1 && (renderState.stylesToHoist = true);
  return destinationHasCapacity$1;
}
function flushResource$1(resource) {
  for (var i = 0; i < resource.length; i++) writeChunk(this, resource[i]);
  resource.length = 0;
}
var stylesheetFlushingQueue$1 = [];
function flushStyleInPreamble$1(stylesheet2) {
  pushLinkImpl$1(stylesheetFlushingQueue$1, stylesheet2.props);
  for (var i = 0; i < stylesheetFlushingQueue$1.length; i++)
    writeChunk(this, stylesheetFlushingQueue$1[i]);
  stylesheetFlushingQueue$1.length = 0;
  stylesheet2.state = 2;
}
var styleTagResourceOpen1 = stringToPrecomputedChunk(
  '<style data-precedence="'
), styleTagResourceOpen2 = stringToPrecomputedChunk('" data-href="'), spaceSeparator = stringToPrecomputedChunk(" "), styleTagResourceOpen3 = stringToPrecomputedChunk('">'), styleTagResourceClose = stringToPrecomputedChunk("</style>");
function flushStylesInPreamble$1(styleQueue) {
  var hasStylesheets = 0 < styleQueue.sheets.size;
  styleQueue.sheets.forEach(flushStyleInPreamble$1, this);
  styleQueue.sheets.clear();
  var rules = styleQueue.rules, hrefs = styleQueue.hrefs;
  if (!hasStylesheets || hrefs.length) {
    writeChunk(this, styleTagResourceOpen1);
    writeChunk(this, styleQueue.precedence);
    styleQueue = 0;
    if (hrefs.length) {
      for (writeChunk(this, styleTagResourceOpen2); styleQueue < hrefs.length - 1; styleQueue++)
        writeChunk(this, hrefs[styleQueue]), writeChunk(this, spaceSeparator);
      writeChunk(this, hrefs[styleQueue]);
    }
    writeChunk(this, styleTagResourceOpen3);
    for (styleQueue = 0; styleQueue < rules.length; styleQueue++)
      writeChunk(this, rules[styleQueue]);
    writeChunk(this, styleTagResourceClose);
    rules.length = 0;
    hrefs.length = 0;
  }
}
function preloadLateStyle$1(stylesheet2) {
  if (0 === stylesheet2.state) {
    stylesheet2.state = 1;
    var props = stylesheet2.props;
    pushLinkImpl$1(stylesheetFlushingQueue$1, {
      rel: "preload",
      as: "style",
      href: stylesheet2.props.href,
      crossOrigin: props.crossOrigin,
      fetchPriority: props.fetchPriority,
      integrity: props.integrity,
      media: props.media,
      hrefLang: props.hrefLang,
      referrerPolicy: props.referrerPolicy
    });
    for (stylesheet2 = 0; stylesheet2 < stylesheetFlushingQueue$1.length; stylesheet2++)
      writeChunk(this, stylesheetFlushingQueue$1[stylesheet2]);
    stylesheetFlushingQueue$1.length = 0;
  }
}
function preloadLateStyles$1(styleQueue) {
  styleQueue.sheets.forEach(preloadLateStyle$1, this);
  styleQueue.sheets.clear();
}
var arrayFirstOpenBracket = stringToPrecomputedChunk("["), arraySubsequentOpenBracket = stringToPrecomputedChunk(",["), arrayInterstitial = stringToPrecomputedChunk(","), arrayCloseBracket = stringToPrecomputedChunk("]");
function writeStyleResourceDependenciesInJS$1(destination, hoistableState) {
  writeChunk(destination, arrayFirstOpenBracket);
  var nextArrayOpenBrackChunk = arrayFirstOpenBracket;
  hoistableState.stylesheets.forEach(function(resource) {
    if (2 !== resource.state)
      if (3 === resource.state)
        writeChunk(destination, nextArrayOpenBrackChunk), writeChunk(
          destination,
          stringToChunk(
            escapeJSObjectForInstructionScripts$1("" + resource.props.href)
          )
        ), writeChunk(destination, arrayCloseBracket), nextArrayOpenBrackChunk = arraySubsequentOpenBracket;
      else {
        writeChunk(destination, nextArrayOpenBrackChunk);
        var precedence = resource.props["data-precedence"], props = resource.props, coercedHref = sanitizeURL$1("" + resource.props.href);
        writeChunk(
          destination,
          stringToChunk(escapeJSObjectForInstructionScripts$1(coercedHref))
        );
        precedence = "" + precedence;
        writeChunk(destination, arrayInterstitial);
        writeChunk(
          destination,
          stringToChunk(escapeJSObjectForInstructionScripts$1(precedence))
        );
        for (var propKey in props)
          if (hasOwnProperty$1.call(props, propKey) && (precedence = props[propKey], null != precedence))
            switch (propKey) {
              case "href":
              case "rel":
              case "precedence":
              case "data-precedence":
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                writeStyleResourceAttributeInJS$1(
                  destination,
                  propKey,
                  precedence
                );
            }
        writeChunk(destination, arrayCloseBracket);
        nextArrayOpenBrackChunk = arraySubsequentOpenBracket;
        resource.state = 3;
      }
  });
  writeChunk(destination, arrayCloseBracket);
}
function writeStyleResourceAttributeInJS$1(destination, name, value) {
  var attributeName = name.toLowerCase();
  switch (typeof value) {
    case "function":
    case "symbol":
      return;
  }
  switch (name) {
    case "innerHTML":
    case "dangerouslySetInnerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "style":
    case "ref":
      return;
    case "className":
      attributeName = "class";
      name = "" + value;
      break;
    case "hidden":
      if (false === value) return;
      name = "";
      break;
    case "src":
    case "href":
      value = sanitizeURL$1(value);
      name = "" + value;
      break;
    default:
      if (2 < name.length && ("o" === name[0] || "O" === name[0]) && ("n" === name[1] || "N" === name[1]) || !isAttributeNameSafe$1(name))
        return;
      name = "" + value;
  }
  writeChunk(destination, arrayInterstitial);
  writeChunk(
    destination,
    stringToChunk(escapeJSObjectForInstructionScripts$1(attributeName))
  );
  writeChunk(destination, arrayInterstitial);
  writeChunk(
    destination,
    stringToChunk(escapeJSObjectForInstructionScripts$1(name))
  );
}
function createHoistableState$1() {
  return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set() };
}
function prefetchDNS$1(href) {
  var request = resolveRequest();
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if ("string" === typeof href && href) {
      if (!resumableState.dnsResources.hasOwnProperty(href)) {
        resumableState.dnsResources[href] = null;
        resumableState = renderState.headers;
        var header, JSCompiler_temp;
        if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity)
          JSCompiler_temp = (header = "<" + ("" + href).replace(
            regexForHrefInLinkHeaderURLContext$1,
            escapeHrefForLinkHeaderURLContextReplacer$1
          ) + ">; rel=dns-prefetch", 0 <= (resumableState.remainingCapacity -= header.length + 2));
        JSCompiler_temp ? (renderState.resets.dns[href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (header = [], pushLinkImpl$1(header, { href, rel: "dns-prefetch" }), renderState.preconnects.add(header));
      }
      enqueueFlush$1(request);
    }
  } else previousDispatcher$1.D(href);
}
function preconnect$1(href, crossOrigin) {
  var request = resolveRequest();
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if ("string" === typeof href && href) {
      var bucket = "use-credentials" === crossOrigin ? "credentials" : "string" === typeof crossOrigin ? "anonymous" : "default";
      if (!resumableState.connectResources[bucket].hasOwnProperty(href)) {
        resumableState.connectResources[bucket][href] = null;
        resumableState = renderState.headers;
        var header, JSCompiler_temp;
        if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity) {
          JSCompiler_temp = "<" + ("" + href).replace(
            regexForHrefInLinkHeaderURLContext$1,
            escapeHrefForLinkHeaderURLContextReplacer$1
          ) + ">; rel=preconnect";
          if ("string" === typeof crossOrigin) {
            var escapedCrossOrigin = ("" + crossOrigin).replace(
              regexForLinkHeaderQuotedParamValueContext$1,
              escapeStringForLinkHeaderQuotedParamValueContextReplacer$1
            );
            JSCompiler_temp += '; crossorigin="' + escapedCrossOrigin + '"';
          }
          JSCompiler_temp = (header = JSCompiler_temp, 0 <= (resumableState.remainingCapacity -= header.length + 2));
        }
        JSCompiler_temp ? (renderState.resets.connect[bucket][href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (bucket = [], pushLinkImpl$1(bucket, {
          rel: "preconnect",
          href,
          crossOrigin
        }), renderState.preconnects.add(bucket));
      }
      enqueueFlush$1(request);
    }
  } else previousDispatcher$1.C(href, crossOrigin);
}
function preload$1(href, as, options) {
  var request = resolveRequest();
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (as && href) {
      switch (as) {
        case "image":
          if (options) {
            var imageSrcSet = options.imageSrcSet;
            var imageSizes = options.imageSizes;
            var fetchPriority = options.fetchPriority;
          }
          var key = imageSrcSet ? imageSrcSet + "\n" + (imageSizes || "") : href;
          if (resumableState.imageResources.hasOwnProperty(key)) return;
          resumableState.imageResources[key] = PRELOAD_NO_CREDS$1;
          resumableState = renderState.headers;
          var header;
          resumableState && 0 < resumableState.remainingCapacity && "high" === fetchPriority && (header = getPreloadAsHeader$1(href, as, options), 0 <= (resumableState.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key] = PRELOAD_NO_CREDS$1, resumableState.highImagePreloads && (resumableState.highImagePreloads += ", "), resumableState.highImagePreloads += header) : (resumableState = [], pushLinkImpl$1(
            resumableState,
            assign$1(
              { rel: "preload", href: imageSrcSet ? void 0 : href, as },
              options
            )
          ), "high" === fetchPriority ? renderState.highImagePreloads.add(resumableState) : (renderState.bulkPreloads.add(resumableState), renderState.preloads.images.set(key, resumableState)));
          break;
        case "style":
          if (resumableState.styleResources.hasOwnProperty(href)) return;
          imageSrcSet = [];
          pushLinkImpl$1(
            imageSrcSet,
            assign$1({ rel: "preload", href, as }, options)
          );
          resumableState.styleResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS$1 : [options.crossOrigin, options.integrity];
          renderState.preloads.stylesheets.set(href, imageSrcSet);
          renderState.bulkPreloads.add(imageSrcSet);
          break;
        case "script":
          if (resumableState.scriptResources.hasOwnProperty(href)) return;
          imageSrcSet = [];
          renderState.preloads.scripts.set(href, imageSrcSet);
          renderState.bulkPreloads.add(imageSrcSet);
          pushLinkImpl$1(
            imageSrcSet,
            assign$1({ rel: "preload", href, as }, options)
          );
          resumableState.scriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS$1 : [options.crossOrigin, options.integrity];
          break;
        default:
          if (resumableState.unknownResources.hasOwnProperty(as)) {
            if (imageSrcSet = resumableState.unknownResources[as], imageSrcSet.hasOwnProperty(href))
              return;
          } else
            imageSrcSet = {}, resumableState.unknownResources[as] = imageSrcSet;
          imageSrcSet[href] = PRELOAD_NO_CREDS$1;
          if ((resumableState = renderState.headers) && 0 < resumableState.remainingCapacity && "font" === as && (key = getPreloadAsHeader$1(href, as, options), 0 <= (resumableState.remainingCapacity -= key.length + 2)))
            renderState.resets.font[href] = PRELOAD_NO_CREDS$1, resumableState.fontPreloads && (resumableState.fontPreloads += ", "), resumableState.fontPreloads += key;
          else
            switch (resumableState = [], href = assign$1({ rel: "preload", href, as }, options), pushLinkImpl$1(resumableState, href), as) {
              case "font":
                renderState.fontPreloads.add(resumableState);
                break;
              default:
                renderState.bulkPreloads.add(resumableState);
            }
      }
      enqueueFlush$1(request);
    }
  } else previousDispatcher$1.L(href, as, options);
}
function preloadModule$1(href, options) {
  var request = resolveRequest();
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (href) {
      var as = options && "string" === typeof options.as ? options.as : "script";
      switch (as) {
        case "script":
          if (resumableState.moduleScriptResources.hasOwnProperty(href)) return;
          as = [];
          resumableState.moduleScriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS$1 : [options.crossOrigin, options.integrity];
          renderState.preloads.moduleScripts.set(href, as);
          break;
        default:
          if (resumableState.moduleUnknownResources.hasOwnProperty(as)) {
            var resources = resumableState.unknownResources[as];
            if (resources.hasOwnProperty(href)) return;
          } else
            resources = {}, resumableState.moduleUnknownResources[as] = resources;
          as = [];
          resources[href] = PRELOAD_NO_CREDS$1;
      }
      pushLinkImpl$1(as, assign$1({ rel: "modulepreload", href }, options));
      renderState.bulkPreloads.add(as);
      enqueueFlush$1(request);
    }
  } else previousDispatcher$1.m(href, options);
}
function preinitStyle$1(href, precedence, options) {
  var request = resolveRequest();
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (href) {
      precedence = precedence || "default";
      var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
      null !== resourceState && (resumableState.styleResources[href] = null, styleQueue || (styleQueue = {
        precedence: stringToChunk(escapeTextForBrowser$1(precedence)),
        rules: [],
        hrefs: [],
        sheets: /* @__PURE__ */ new Map()
      }, renderState.styles.set(precedence, styleQueue)), precedence = {
        state: 0,
        props: assign$1(
          { rel: "stylesheet", href, "data-precedence": precedence },
          options
        )
      }, resourceState && (2 === resourceState.length && adoptPreloadCredentials$1(precedence.props, resourceState), (renderState = renderState.preloads.stylesheets.get(href)) && 0 < renderState.length ? renderState.length = 0 : precedence.state = 1), styleQueue.sheets.set(href, precedence), enqueueFlush$1(request));
    }
  } else previousDispatcher$1.S(href, precedence, options);
}
function preinitScript$1(src, options) {
  var request = resolveRequest();
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (src) {
      var resourceState = resumableState.scriptResources.hasOwnProperty(src) ? resumableState.scriptResources[src] : void 0;
      null !== resourceState && (resumableState.scriptResources[src] = null, options = assign$1({ src, async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials$1(options, resourceState), src = renderState.preloads.scripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl$1(src, options), enqueueFlush$1(request));
    }
  } else previousDispatcher$1.X(src, options);
}
function preinitModuleScript$1(src, options) {
  var request = resolveRequest();
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (src) {
      var resourceState = resumableState.moduleScriptResources.hasOwnProperty(
        src
      ) ? resumableState.moduleScriptResources[src] : void 0;
      null !== resourceState && (resumableState.moduleScriptResources[src] = null, options = assign$1({ src, type: "module", async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials$1(options, resourceState), src = renderState.preloads.moduleScripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl$1(src, options), enqueueFlush$1(request));
    }
  } else previousDispatcher$1.M(src, options);
}
function adoptPreloadCredentials$1(target, preloadState) {
  null == target.crossOrigin && (target.crossOrigin = preloadState[0]);
  null == target.integrity && (target.integrity = preloadState[1]);
}
function getPreloadAsHeader$1(href, as, params) {
  href = ("" + href).replace(
    regexForHrefInLinkHeaderURLContext$1,
    escapeHrefForLinkHeaderURLContextReplacer$1
  );
  as = ("" + as).replace(
    regexForLinkHeaderQuotedParamValueContext$1,
    escapeStringForLinkHeaderQuotedParamValueContextReplacer$1
  );
  as = "<" + href + '>; rel=preload; as="' + as + '"';
  for (var paramName in params)
    hasOwnProperty$1.call(params, paramName) && (href = params[paramName], "string" === typeof href && (as += "; " + paramName.toLowerCase() + '="' + ("" + href).replace(
      regexForLinkHeaderQuotedParamValueContext$1,
      escapeStringForLinkHeaderQuotedParamValueContextReplacer$1
    ) + '"'));
  return as;
}
var regexForHrefInLinkHeaderURLContext$1 = /[<>\r\n]/g;
function escapeHrefForLinkHeaderURLContextReplacer$1(match) {
  switch (match) {
    case "<":
      return "%3C";
    case ">":
      return "%3E";
    case "\n":
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error(
        "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
      );
  }
}
var regexForLinkHeaderQuotedParamValueContext$1 = /["';,\r\n]/g;
function escapeStringForLinkHeaderQuotedParamValueContextReplacer$1(match) {
  switch (match) {
    case '"':
      return "%22";
    case "'":
      return "%27";
    case ";":
      return "%3B";
    case ",":
      return "%2C";
    case "\n":
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error(
        "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
      );
  }
}
function hoistStyleQueueDependency$1(styleQueue) {
  this.styles.add(styleQueue);
}
function hoistStylesheetDependency$1(stylesheet2) {
  this.stylesheets.add(stylesheet2);
}
var bind$1 = Function.prototype.bind, supportsRequestStorage = "function" === typeof AsyncLocalStorage, requestStorage = supportsRequestStorage ? new AsyncLocalStorage() : null, REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference");
function getComponentNameFromType$1(type) {
  if (null == type) return null;
  if ("function" === typeof type)
    return type.$$typeof === REACT_CLIENT_REFERENCE$1 ? null : type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE$1:
      return "Fragment";
    case REACT_PORTAL_TYPE$1:
      return "Portal";
    case REACT_PROFILER_TYPE$1:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE$1:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE$1:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE$1:
      return "SuspenseList";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE$1:
        return (type.displayName || "Context") + ".Provider";
      case REACT_CONSUMER_TYPE$1:
        return (type._context.displayName || "Context") + ".Consumer";
      case REACT_FORWARD_REF_TYPE$1:
        var innerType = type.render;
        type = type.displayName;
        type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
        return type;
      case REACT_MEMO_TYPE$1:
        return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType$1(type.type) || "Memo";
      case REACT_LAZY_TYPE$1:
        innerType = type._payload;
        type = type._init;
        try {
          return getComponentNameFromType$1(type(innerType));
        } catch (x) {
        }
    }
  return null;
}
var emptyContextObject$1 = {}, currentActiveSnapshot$1 = null;
function popToNearestCommonAncestor$1(prev, next) {
  if (prev !== next) {
    prev.context._currentValue = prev.parentValue;
    prev = prev.parent;
    var parentNext = next.parent;
    if (null === prev) {
      if (null !== parentNext)
        throw Error(
          "The stacks must reach the root at the same time. This is a bug in React."
        );
    } else {
      if (null === parentNext)
        throw Error(
          "The stacks must reach the root at the same time. This is a bug in React."
        );
      popToNearestCommonAncestor$1(prev, parentNext);
    }
    next.context._currentValue = next.value;
  }
}
function popAllPrevious$1(prev) {
  prev.context._currentValue = prev.parentValue;
  prev = prev.parent;
  null !== prev && popAllPrevious$1(prev);
}
function pushAllNext$1(next) {
  var parentNext = next.parent;
  null !== parentNext && pushAllNext$1(parentNext);
  next.context._currentValue = next.value;
}
function popPreviousToCommonLevel$1(prev, next) {
  prev.context._currentValue = prev.parentValue;
  prev = prev.parent;
  if (null === prev)
    throw Error(
      "The depth must equal at least at zero before reaching the root. This is a bug in React."
    );
  prev.depth === next.depth ? popToNearestCommonAncestor$1(prev, next) : popPreviousToCommonLevel$1(prev, next);
}
function popNextToCommonLevel$1(prev, next) {
  var parentNext = next.parent;
  if (null === parentNext)
    throw Error(
      "The depth must equal at least at zero before reaching the root. This is a bug in React."
    );
  prev.depth === parentNext.depth ? popToNearestCommonAncestor$1(prev, parentNext) : popNextToCommonLevel$1(prev, parentNext);
  next.context._currentValue = next.value;
}
function switchContext$1(newSnapshot) {
  var prev = currentActiveSnapshot$1;
  prev !== newSnapshot && (null === prev ? pushAllNext$1(newSnapshot) : null === newSnapshot ? popAllPrevious$1(prev) : prev.depth === newSnapshot.depth ? popToNearestCommonAncestor$1(prev, newSnapshot) : prev.depth > newSnapshot.depth ? popPreviousToCommonLevel$1(prev, newSnapshot) : popNextToCommonLevel$1(prev, newSnapshot), currentActiveSnapshot$1 = newSnapshot);
}
var classComponentUpdater$1 = {
  isMounted: function() {
    return false;
  },
  enqueueSetState: function(inst, payload) {
    inst = inst._reactInternals;
    null !== inst.queue && inst.queue.push(payload);
  },
  enqueueReplaceState: function(inst, payload) {
    inst = inst._reactInternals;
    inst.replace = true;
    inst.queue = [payload];
  },
  enqueueForceUpdate: function() {
  }
}, emptyTreeContext$1 = { id: 1, overflow: "" };
function pushTreeContext$1(baseContext, totalChildren, index) {
  var baseIdWithLeadingBit = baseContext.id;
  baseContext = baseContext.overflow;
  var baseLength = 32 - clz32$1(baseIdWithLeadingBit) - 1;
  baseIdWithLeadingBit &= ~(1 << baseLength);
  index += 1;
  var length = 32 - clz32$1(totalChildren) + baseLength;
  if (30 < length) {
    var numberOfOverflowBits = baseLength - baseLength % 5;
    length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
    baseIdWithLeadingBit >>= numberOfOverflowBits;
    baseLength -= numberOfOverflowBits;
    return {
      id: 1 << 32 - clz32$1(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit,
      overflow: length + baseContext
    };
  }
  return {
    id: 1 << length | index << baseLength | baseIdWithLeadingBit,
    overflow: baseContext
  };
}
var clz32$1 = Math.clz32 ? Math.clz32 : clz32Fallback$1, log$1 = Math.log, LN2$1 = Math.LN2;
function clz32Fallback$1(x) {
  x >>>= 0;
  return 0 === x ? 32 : 31 - (log$1(x) / LN2$1 | 0) | 0;
}
var SuspenseException$1 = Error(
  "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"
);
function noop$2$1() {
}
function trackUsedThenable$1(thenableState2, thenable, index) {
  index = thenableState2[index];
  void 0 === index ? thenableState2.push(thenable) : index !== thenable && (thenable.then(noop$2$1, noop$2$1), thenable = index);
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      "string" === typeof thenable.status ? thenable.then(noop$2$1, noop$2$1) : (thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
        function(fulfilledValue) {
          if ("pending" === thenable.status) {
            var fulfilledThenable = thenable;
            fulfilledThenable.status = "fulfilled";
            fulfilledThenable.value = fulfilledValue;
          }
        },
        function(error) {
          if ("pending" === thenable.status) {
            var rejectedThenable = thenable;
            rejectedThenable.status = "rejected";
            rejectedThenable.reason = error;
          }
        }
      ));
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
      suspendedThenable$1 = thenable;
      throw SuspenseException$1;
  }
}
var suspendedThenable$1 = null;
function getSuspendedThenable$1() {
  if (null === suspendedThenable$1)
    throw Error(
      "Expected a suspended thenable. This is a bug in React. Please file an issue."
    );
  var thenable = suspendedThenable$1;
  suspendedThenable$1 = null;
  return thenable;
}
function is$1(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs$1 = "function" === typeof Object.is ? Object.is : is$1, currentlyRenderingComponent$1 = null, currentlyRenderingTask$1 = null, currentlyRenderingRequest$1 = null, currentlyRenderingKeyPath$1 = null, firstWorkInProgressHook$1 = null, workInProgressHook$1 = null, isReRender$1 = false, didScheduleRenderPhaseUpdate$1 = false, localIdCounter$1 = 0, actionStateCounter$1 = 0, actionStateMatchingIndex$1 = -1, thenableIndexCounter$1 = 0, thenableState$1 = null, renderPhaseUpdates$1 = null, numberOfReRenders$1 = 0;
function resolveCurrentlyRenderingComponent$1() {
  if (null === currentlyRenderingComponent$1)
    throw Error(
      "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
    );
  return currentlyRenderingComponent$1;
}
function createHook$1() {
  if (0 < numberOfReRenders$1)
    throw Error("Rendered more hooks than during the previous render");
  return { memoizedState: null, queue: null, next: null };
}
function createWorkInProgressHook$1() {
  null === workInProgressHook$1 ? null === firstWorkInProgressHook$1 ? (isReRender$1 = false, firstWorkInProgressHook$1 = workInProgressHook$1 = createHook$1()) : (isReRender$1 = true, workInProgressHook$1 = firstWorkInProgressHook$1) : null === workInProgressHook$1.next ? (isReRender$1 = false, workInProgressHook$1 = workInProgressHook$1.next = createHook$1()) : (isReRender$1 = true, workInProgressHook$1 = workInProgressHook$1.next);
  return workInProgressHook$1;
}
function getThenableStateAfterSuspending$1() {
  var state = thenableState$1;
  thenableState$1 = null;
  return state;
}
function resetHooksState$1() {
  currentlyRenderingKeyPath$1 = currentlyRenderingRequest$1 = currentlyRenderingTask$1 = currentlyRenderingComponent$1 = null;
  didScheduleRenderPhaseUpdate$1 = false;
  firstWorkInProgressHook$1 = null;
  numberOfReRenders$1 = 0;
  workInProgressHook$1 = renderPhaseUpdates$1 = null;
}
function basicStateReducer$1(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function useReducer$1(reducer, initialArg, init) {
  currentlyRenderingComponent$1 = resolveCurrentlyRenderingComponent$1();
  workInProgressHook$1 = createWorkInProgressHook$1();
  if (isReRender$1) {
    var queue = workInProgressHook$1.queue;
    initialArg = queue.dispatch;
    if (null !== renderPhaseUpdates$1 && (init = renderPhaseUpdates$1.get(queue), void 0 !== init)) {
      renderPhaseUpdates$1.delete(queue);
      queue = workInProgressHook$1.memoizedState;
      do
        queue = reducer(queue, init.action), init = init.next;
      while (null !== init);
      workInProgressHook$1.memoizedState = queue;
      return [queue, initialArg];
    }
    return [workInProgressHook$1.memoizedState, initialArg];
  }
  reducer = reducer === basicStateReducer$1 ? "function" === typeof initialArg ? initialArg() : initialArg : void 0 !== init ? init(initialArg) : initialArg;
  workInProgressHook$1.memoizedState = reducer;
  reducer = workInProgressHook$1.queue = { last: null, dispatch: null };
  reducer = reducer.dispatch = dispatchAction$1.bind(
    null,
    currentlyRenderingComponent$1,
    reducer
  );
  return [workInProgressHook$1.memoizedState, reducer];
}
function useMemo$1(nextCreate, deps) {
  currentlyRenderingComponent$1 = resolveCurrentlyRenderingComponent$1();
  workInProgressHook$1 = createWorkInProgressHook$1();
  deps = void 0 === deps ? null : deps;
  if (null !== workInProgressHook$1) {
    var prevState = workInProgressHook$1.memoizedState;
    if (null !== prevState && null !== deps) {
      var prevDeps = prevState[1];
      a: if (null === prevDeps) prevDeps = false;
      else {
        for (var i = 0; i < prevDeps.length && i < deps.length; i++)
          if (!objectIs$1(deps[i], prevDeps[i])) {
            prevDeps = false;
            break a;
          }
        prevDeps = true;
      }
      if (prevDeps) return prevState[0];
    }
  }
  nextCreate = nextCreate();
  workInProgressHook$1.memoizedState = [nextCreate, deps];
  return nextCreate;
}
function dispatchAction$1(componentIdentity, queue, action) {
  if (25 <= numberOfReRenders$1)
    throw Error(
      "Too many re-renders. React limits the number of renders to prevent an infinite loop."
    );
  if (componentIdentity === currentlyRenderingComponent$1)
    if (didScheduleRenderPhaseUpdate$1 = true, componentIdentity = { action, next: null }, null === renderPhaseUpdates$1 && (renderPhaseUpdates$1 = /* @__PURE__ */ new Map()), action = renderPhaseUpdates$1.get(queue), void 0 === action)
      renderPhaseUpdates$1.set(queue, componentIdentity);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = componentIdentity;
    }
}
function unsupportedStartTransition$1() {
  throw Error("startTransition cannot be called during server rendering.");
}
function unsupportedSetOptimisticState$1() {
  throw Error("Cannot update optimistic state while rendering.");
}
function useActionState$1(action, initialState, permalink) {
  resolveCurrentlyRenderingComponent$1();
  var actionStateHookIndex = actionStateCounter$1++, request = currentlyRenderingRequest$1;
  if ("function" === typeof action.$$FORM_ACTION) {
    var nextPostbackStateKey = null, componentKeyPath = currentlyRenderingKeyPath$1;
    request = request.formState;
    var isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;
    if (null !== request && "function" === typeof isSignatureEqual) {
      var postbackKey = request[1];
      isSignatureEqual.call(action, request[2], request[3]) && (nextPostbackStateKey = void 0 !== permalink ? "p" + permalink : "k" + murmurhash3_32_gc$1(
        JSON.stringify([componentKeyPath, null, actionStateHookIndex]),
        0
      ), postbackKey === nextPostbackStateKey && (actionStateMatchingIndex$1 = actionStateHookIndex, initialState = request[0]));
    }
    var boundAction = action.bind(null, initialState);
    action = function(payload) {
      boundAction(payload);
    };
    "function" === typeof boundAction.$$FORM_ACTION && (action.$$FORM_ACTION = function(prefix2) {
      prefix2 = boundAction.$$FORM_ACTION(prefix2);
      void 0 !== permalink && (permalink += "", prefix2.action = permalink);
      var formData = prefix2.data;
      formData && (null === nextPostbackStateKey && (nextPostbackStateKey = void 0 !== permalink ? "p" + permalink : "k" + murmurhash3_32_gc$1(
        JSON.stringify([
          componentKeyPath,
          null,
          actionStateHookIndex
        ]),
        0
      )), formData.append("$ACTION_KEY", nextPostbackStateKey));
      return prefix2;
    });
    return [initialState, action, false];
  }
  var boundAction$22 = action.bind(null, initialState);
  return [
    initialState,
    function(payload) {
      boundAction$22(payload);
    },
    false
  ];
}
function unwrapThenable$1(thenable) {
  var index = thenableIndexCounter$1;
  thenableIndexCounter$1 += 1;
  null === thenableState$1 && (thenableState$1 = []);
  return trackUsedThenable$1(thenableState$1, thenable, index);
}
function unsupportedRefresh$1() {
  throw Error("Cache cannot be refreshed during server rendering.");
}
function noop$1$1() {
}
var HooksDispatcher$1 = {
  readContext: function(context) {
    return context._currentValue;
  },
  use: function(usable) {
    if (null !== usable && "object" === typeof usable) {
      if ("function" === typeof usable.then) return unwrapThenable$1(usable);
      if (usable.$$typeof === REACT_CONTEXT_TYPE$1) return usable._currentValue;
    }
    throw Error("An unsupported type was passed to use(): " + String(usable));
  },
  useContext: function(context) {
    resolveCurrentlyRenderingComponent$1();
    return context._currentValue;
  },
  useMemo: useMemo$1,
  useReducer: useReducer$1,
  useRef: function(initialValue) {
    currentlyRenderingComponent$1 = resolveCurrentlyRenderingComponent$1();
    workInProgressHook$1 = createWorkInProgressHook$1();
    var previousRef = workInProgressHook$1.memoizedState;
    return null === previousRef ? (initialValue = { current: initialValue }, workInProgressHook$1.memoizedState = initialValue) : previousRef;
  },
  useState: function(initialState) {
    return useReducer$1(basicStateReducer$1, initialState);
  },
  useInsertionEffect: noop$1$1,
  useLayoutEffect: noop$1$1,
  useCallback: function(callback, deps) {
    return useMemo$1(function() {
      return callback;
    }, deps);
  },
  useImperativeHandle: noop$1$1,
  useEffect: noop$1$1,
  useDebugValue: noop$1$1,
  useDeferredValue: function(value, initialValue) {
    resolveCurrentlyRenderingComponent$1();
    return void 0 !== initialValue ? initialValue : value;
  },
  useTransition: function() {
    resolveCurrentlyRenderingComponent$1();
    return [false, unsupportedStartTransition$1];
  },
  useId: function() {
    var JSCompiler_inline_result = currentlyRenderingTask$1.treeContext;
    var overflow = JSCompiler_inline_result.overflow;
    JSCompiler_inline_result = JSCompiler_inline_result.id;
    JSCompiler_inline_result = (JSCompiler_inline_result & ~(1 << 32 - clz32$1(JSCompiler_inline_result) - 1)).toString(32) + overflow;
    var resumableState = currentResumableState$1;
    if (null === resumableState)
      throw Error(
        "Invalid hook call. Hooks can only be called inside of the body of a function component."
      );
    overflow = localIdCounter$1++;
    JSCompiler_inline_result = ":" + resumableState.idPrefix + "R" + JSCompiler_inline_result;
    0 < overflow && (JSCompiler_inline_result += "H" + overflow.toString(32));
    return JSCompiler_inline_result + ":";
  },
  useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
    if (void 0 === getServerSnapshot)
      throw Error(
        "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
      );
    return getServerSnapshot();
  },
  useCacheRefresh: function() {
    return unsupportedRefresh$1;
  },
  useMemoCache: function(size) {
    for (var data = Array(size), i = 0; i < size; i++)
      data[i] = REACT_MEMO_CACHE_SENTINEL$1;
    return data;
  },
  useHostTransitionStatus: function() {
    resolveCurrentlyRenderingComponent$1();
    return sharedNotPendingObject$1;
  },
  useOptimistic: function(passthrough) {
    resolveCurrentlyRenderingComponent$1();
    return [passthrough, unsupportedSetOptimisticState$1];
  }
};
HooksDispatcher$1.useFormState = useActionState$1;
HooksDispatcher$1.useActionState = useActionState$1;
var currentResumableState$1 = null, DefaultAsyncDispatcher$1 = {
  getCacheForType: function() {
    throw Error("Not implemented.");
  }
};
function prepareStackTrace(error, structuredStackTrace) {
  error = (error.name || "Error") + ": " + (error.message || "");
  for (var i = 0; i < structuredStackTrace.length; i++)
    error += "\n    at " + structuredStackTrace[i].toString();
  return error;
}
var prefix$1, suffix$1;
function describeBuiltInComponentFrame$1(name) {
  if (void 0 === prefix$1)
    try {
      throw Error();
    } catch (x) {
      var match = x.stack.trim().match(/\n( *(at )?)/);
      prefix$1 = match && match[1] || "";
      suffix$1 = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return "\n" + prefix$1 + name + suffix$1;
}
var reentry$1 = false;
function describeNativeComponentFrame$1(fn, construct) {
  if (!fn || reentry$1) return "";
  reentry$1 = true;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = prepareStackTrace;
  try {
    var RunInRootFrame = {
      DetermineComponentFrameRoot: function() {
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if ("object" === typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                var control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x$24) {
                control = x$24;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x$25) {
              control = x$25;
            }
            (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
            });
          }
        } catch (sample) {
          if (sample && control && "string" === typeof sample.stack)
            return [sample.stack, control.stack];
        }
        return [null, null];
      }
    };
    RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var namePropDescriptor = Object.getOwnPropertyDescriptor(
      RunInRootFrame.DetermineComponentFrameRoot,
      "name"
    );
    namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
      RunInRootFrame.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
    if (sampleStack && controlStack) {
      var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
      for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
        RunInRootFrame++;
      for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
        "DetermineComponentFrameRoot"
      ); )
        namePropDescriptor++;
      if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
        for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
          namePropDescriptor--;
      for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
        if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
          if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
            do
              if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                return frame;
              }
            while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
          }
          break;
        }
    }
  } finally {
    reentry$1 = false, Error.prepareStackTrace = previousPrepareStackTrace;
  }
  return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame$1(previousPrepareStackTrace) : "";
}
function describeComponentStackByType$1(type) {
  if ("string" === typeof type) return describeBuiltInComponentFrame$1(type);
  if ("function" === typeof type)
    return type.prototype && type.prototype.isReactComponent ? (type = describeNativeComponentFrame$1(type, true), type) : describeNativeComponentFrame$1(type, false);
  if ("object" === typeof type && null !== type) {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE$1:
        return describeNativeComponentFrame$1(type.render, false);
      case REACT_MEMO_TYPE$1:
        return describeNativeComponentFrame$1(type.type, false);
      case REACT_LAZY_TYPE$1:
        var lazyComponent = type, payload = lazyComponent._payload;
        lazyComponent = lazyComponent._init;
        try {
          type = lazyComponent(payload);
        } catch (x) {
          return describeBuiltInComponentFrame$1("Lazy");
        }
        return describeComponentStackByType$1(type);
    }
    if ("string" === typeof type.name)
      return payload = type.env, describeBuiltInComponentFrame$1(
        type.name + (payload ? " [" + payload + "]" : "")
      );
  }
  switch (type) {
    case REACT_SUSPENSE_LIST_TYPE$1:
      return describeBuiltInComponentFrame$1("SuspenseList");
    case REACT_SUSPENSE_TYPE$1:
      return describeBuiltInComponentFrame$1("Suspense");
  }
  return "";
}
function defaultErrorHandler$1(error) {
  if ("object" === typeof error && null !== error && "string" === typeof error.environmentName) {
    var JSCompiler_inline_result = error.environmentName;
    error = [error].slice(0);
    "string" === typeof error[0] ? error.splice(
      0,
      1,
      "\x1B[0m\x1B[7m%c%s\x1B[0m%c " + error[0],
      "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
      " " + JSCompiler_inline_result + " ",
      ""
    ) : error.splice(
      0,
      0,
      "\x1B[0m\x1B[7m%c%s\x1B[0m%c ",
      "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
      " " + JSCompiler_inline_result + " ",
      ""
    );
    error.unshift(console);
    JSCompiler_inline_result = bind$1.apply(console.error, error);
    JSCompiler_inline_result();
  } else console.error(error);
  return null;
}
function noop$3() {
}
function RequestInstance$1(resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
  var abortSet = /* @__PURE__ */ new Set();
  this.destination = null;
  this.flushScheduled = false;
  this.resumableState = resumableState;
  this.renderState = renderState;
  this.rootFormatContext = rootFormatContext;
  this.progressiveChunkSize = void 0 === progressiveChunkSize ? 12800 : progressiveChunkSize;
  this.status = 10;
  this.fatalError = null;
  this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0;
  this.completedRootSegment = null;
  this.abortableTasks = abortSet;
  this.pingedTasks = [];
  this.clientRenderedBoundaries = [];
  this.completedBoundaries = [];
  this.partialBoundaries = [];
  this.trackedPostpones = null;
  this.onError = void 0 === onError2 ? defaultErrorHandler$1 : onError2;
  this.onPostpone = void 0 === onPostpone ? noop$3 : onPostpone;
  this.onAllReady = void 0 === onAllReady ? noop$3 : onAllReady;
  this.onShellReady = void 0 === onShellReady ? noop$3 : onShellReady;
  this.onShellError = void 0 === onShellError ? noop$3 : onShellError;
  this.onFatalError = void 0 === onFatalError ? noop$3 : onFatalError;
  this.formState = void 0 === formState ? null : formState;
}
function createRequest$1(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
  resumableState = new RequestInstance$1(
    resumableState,
    renderState,
    rootFormatContext,
    progressiveChunkSize,
    onError2,
    onAllReady,
    onShellReady,
    onShellError,
    onFatalError,
    onPostpone,
    formState
  );
  renderState = createPendingSegment$1(
    resumableState,
    0,
    null,
    rootFormatContext,
    false,
    false
  );
  renderState.parentFlushed = true;
  children = createRenderTask$1(
    resumableState,
    null,
    children,
    -1,
    null,
    renderState,
    null,
    resumableState.abortableTasks,
    null,
    rootFormatContext,
    null,
    emptyTreeContext$1,
    null,
    false
  );
  pushComponentStack$1(children);
  resumableState.pingedTasks.push(children);
  return resumableState;
}
function createPrerenderRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError, onPostpone) {
  children = createRequest$1(
    children,
    resumableState,
    renderState,
    rootFormatContext,
    progressiveChunkSize,
    onError2,
    onAllReady,
    onShellReady,
    onShellError,
    onFatalError,
    onPostpone,
    void 0
  );
  children.trackedPostpones = {
    workingMap: /* @__PURE__ */ new Map(),
    rootNodes: [],
    rootSlots: null
  };
  return children;
}
var currentRequest$1 = null;
function resolveRequest() {
  if (currentRequest$1) return currentRequest$1;
  if (supportsRequestStorage) {
    var store = requestStorage.getStore();
    if (store) return store;
  }
  return null;
}
function pingTask$1(request, task) {
  request.pingedTasks.push(task);
  1 === request.pingedTasks.length && (request.flushScheduled = null !== request.destination, null !== request.trackedPostpones || 10 === request.status ? scheduleMicrotask(function() {
    return performWork$1(request);
  }) : setTimeout(function() {
    return performWork$1(request);
  }, 0));
}
function createSuspenseBoundary$1(request, fallbackAbortableTasks) {
  return {
    status: 0,
    rootSegmentID: -1,
    parentFlushed: false,
    pendingTasks: 0,
    completedSegments: [],
    byteSize: 0,
    fallbackAbortableTasks,
    errorDigest: null,
    contentState: createHoistableState$1(),
    fallbackState: createHoistableState$1(),
    trackedContentKeyPath: null,
    trackedFallbackNode: null
  };
}
function createRenderTask$1(request, thenableState2, node, childIndex, blockedBoundary, blockedSegment, hoistableState, abortSet, keyPath, formatContext, context, treeContext, componentStack, isFallback) {
  request.allPendingTasks++;
  null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
  var task = {
    replay: null,
    node,
    childIndex,
    ping: function() {
      return pingTask$1(request, task);
    },
    blockedBoundary,
    blockedSegment,
    hoistableState,
    abortSet,
    keyPath,
    formatContext,
    context,
    treeContext,
    componentStack,
    thenableState: thenableState2,
    isFallback
  };
  abortSet.add(task);
  return task;
}
function createReplayTask$1(request, thenableState2, replay, node, childIndex, blockedBoundary, hoistableState, abortSet, keyPath, formatContext, context, treeContext, componentStack, isFallback) {
  request.allPendingTasks++;
  null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
  replay.pendingTasks++;
  var task = {
    replay,
    node,
    childIndex,
    ping: function() {
      return pingTask$1(request, task);
    },
    blockedBoundary,
    blockedSegment: null,
    hoistableState,
    abortSet,
    keyPath,
    formatContext,
    context,
    treeContext,
    componentStack,
    thenableState: thenableState2,
    isFallback
  };
  abortSet.add(task);
  return task;
}
function createPendingSegment$1(request, index, boundary, parentFormatContext, lastPushedText, textEmbedded) {
  return {
    status: 0,
    id: -1,
    index,
    parentFlushed: false,
    chunks: [],
    children: [],
    parentFormatContext,
    boundary,
    lastPushedText,
    textEmbedded
  };
}
function pushComponentStack$1(task) {
  var node = task.node;
  if ("object" === typeof node && null !== node)
    switch (node.$$typeof) {
      case REACT_ELEMENT_TYPE$1:
        task.componentStack = { parent: task.componentStack, type: node.type };
    }
}
function getThrownInfo$1(node$jscomp$0) {
  var errorInfo = {};
  node$jscomp$0 && Object.defineProperty(errorInfo, "componentStack", {
    configurable: true,
    enumerable: true,
    get: function() {
      try {
        var info = "", node = node$jscomp$0;
        do
          info += describeComponentStackByType$1(node.type), node = node.parent;
        while (node);
        var JSCompiler_inline_result = info;
      } catch (x) {
        JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack;
      }
      Object.defineProperty(errorInfo, "componentStack", {
        value: JSCompiler_inline_result
      });
      return JSCompiler_inline_result;
    }
  });
  return errorInfo;
}
function logRecoverableError$1(request, error, errorInfo) {
  request = request.onError;
  error = request(error, errorInfo);
  if (null == error || "string" === typeof error) return error;
}
function fatalError$1(request, error) {
  var onShellError = request.onShellError, onFatalError = request.onFatalError;
  onShellError(error);
  onFatalError(error);
  null !== request.destination ? (request.status = 14, closeWithError(request.destination, error)) : (request.status = 13, request.fatalError = error);
}
function renderWithHooks$1(request, task, keyPath, Component2, props, secondArg) {
  var prevThenableState = task.thenableState;
  task.thenableState = null;
  currentlyRenderingComponent$1 = {};
  currentlyRenderingTask$1 = task;
  currentlyRenderingRequest$1 = request;
  currentlyRenderingKeyPath$1 = keyPath;
  actionStateCounter$1 = localIdCounter$1 = 0;
  actionStateMatchingIndex$1 = -1;
  thenableIndexCounter$1 = 0;
  thenableState$1 = prevThenableState;
  for (request = Component2(props, secondArg); didScheduleRenderPhaseUpdate$1; )
    didScheduleRenderPhaseUpdate$1 = false, actionStateCounter$1 = localIdCounter$1 = 0, actionStateMatchingIndex$1 = -1, thenableIndexCounter$1 = 0, numberOfReRenders$1 += 1, workInProgressHook$1 = null, request = Component2(props, secondArg);
  resetHooksState$1();
  return request;
}
function finishFunctionComponent$1(request, task, keyPath, children, hasId, actionStateCount, actionStateMatchingIndex2) {
  var didEmitActionStateMarkers = false;
  if (0 !== actionStateCount && null !== request.formState) {
    var segment = task.blockedSegment;
    if (null !== segment) {
      didEmitActionStateMarkers = true;
      segment = segment.chunks;
      for (var i = 0; i < actionStateCount; i++)
        i === actionStateMatchingIndex2 ? segment.push(formStateMarkerIsMatching) : segment.push(formStateMarkerIsNotMatching);
    }
  }
  actionStateCount = task.keyPath;
  task.keyPath = keyPath;
  hasId ? (keyPath = task.treeContext, task.treeContext = pushTreeContext$1(keyPath, 1, 0), renderNode$1(request, task, children, -1), task.treeContext = keyPath) : didEmitActionStateMarkers ? renderNode$1(request, task, children, -1) : renderNodeDestructive$1(request, task, children, -1);
  task.keyPath = actionStateCount;
}
function renderElement$1(request, task, keyPath, type, props, ref) {
  if ("function" === typeof type)
    if (type.prototype && type.prototype.isReactComponent) {
      var newProps = props;
      if ("ref" in props) {
        newProps = {};
        for (var propName in props)
          "ref" !== propName && (newProps[propName] = props[propName]);
      }
      var defaultProps = type.defaultProps;
      if (defaultProps) {
        newProps === props && (newProps = assign$1({}, newProps, props));
        for (var propName$33 in defaultProps)
          void 0 === newProps[propName$33] && (newProps[propName$33] = defaultProps[propName$33]);
      }
      props = newProps;
      newProps = emptyContextObject$1;
      defaultProps = type.contextType;
      "object" === typeof defaultProps && null !== defaultProps && (newProps = defaultProps._currentValue);
      newProps = new type(props, newProps);
      var initialState = void 0 !== newProps.state ? newProps.state : null;
      newProps.updater = classComponentUpdater$1;
      newProps.props = props;
      newProps.state = initialState;
      defaultProps = { queue: [], replace: false };
      newProps._reactInternals = defaultProps;
      ref = type.contextType;
      newProps.context = "object" === typeof ref && null !== ref ? ref._currentValue : emptyContextObject$1;
      ref = type.getDerivedStateFromProps;
      "function" === typeof ref && (ref = ref(props, initialState), initialState = null === ref || void 0 === ref ? initialState : assign$1({}, initialState, ref), newProps.state = initialState);
      if ("function" !== typeof type.getDerivedStateFromProps && "function" !== typeof newProps.getSnapshotBeforeUpdate && ("function" === typeof newProps.UNSAFE_componentWillMount || "function" === typeof newProps.componentWillMount))
        if (type = newProps.state, "function" === typeof newProps.componentWillMount && newProps.componentWillMount(), "function" === typeof newProps.UNSAFE_componentWillMount && newProps.UNSAFE_componentWillMount(), type !== newProps.state && classComponentUpdater$1.enqueueReplaceState(
          newProps,
          newProps.state,
          null
        ), null !== defaultProps.queue && 0 < defaultProps.queue.length)
          if (type = defaultProps.queue, ref = defaultProps.replace, defaultProps.queue = null, defaultProps.replace = false, ref && 1 === type.length)
            newProps.state = type[0];
          else {
            defaultProps = ref ? type[0] : newProps.state;
            initialState = true;
            for (ref = ref ? 1 : 0; ref < type.length; ref++)
              propName$33 = type[ref], propName$33 = "function" === typeof propName$33 ? propName$33.call(newProps, defaultProps, props, void 0) : propName$33, null != propName$33 && (initialState ? (initialState = false, defaultProps = assign$1({}, defaultProps, propName$33)) : assign$1(defaultProps, propName$33));
            newProps.state = defaultProps;
          }
        else defaultProps.queue = null;
      type = newProps.render();
      if (12 === request.status) throw null;
      props = task.keyPath;
      task.keyPath = keyPath;
      renderNodeDestructive$1(request, task, type, -1);
      task.keyPath = props;
    } else {
      type = renderWithHooks$1(request, task, keyPath, type, props, void 0);
      if (12 === request.status) throw null;
      finishFunctionComponent$1(
        request,
        task,
        keyPath,
        type,
        0 !== localIdCounter$1,
        actionStateCounter$1,
        actionStateMatchingIndex$1
      );
    }
  else if ("string" === typeof type)
    if (newProps = task.blockedSegment, null === newProps)
      newProps = props.children, defaultProps = task.formatContext, initialState = task.keyPath, task.formatContext = getChildFormatContext$1(defaultProps, type, props), task.keyPath = keyPath, renderNode$1(request, task, newProps, -1), task.formatContext = defaultProps, task.keyPath = initialState;
    else {
      initialState = pushStartInstance$1(
        newProps.chunks,
        type,
        props,
        request.resumableState,
        request.renderState,
        task.hoistableState,
        task.formatContext,
        newProps.lastPushedText,
        task.isFallback
      );
      newProps.lastPushedText = false;
      defaultProps = task.formatContext;
      ref = task.keyPath;
      task.formatContext = getChildFormatContext$1(defaultProps, type, props);
      task.keyPath = keyPath;
      renderNode$1(request, task, initialState, -1);
      task.formatContext = defaultProps;
      task.keyPath = ref;
      a: {
        task = newProps.chunks;
        request = request.resumableState;
        switch (type) {
          case "title":
          case "style":
          case "script":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break a;
          case "body":
            if (1 >= defaultProps.insertionMode) {
              request.hasBody = true;
              break a;
            }
            break;
          case "html":
            if (0 === defaultProps.insertionMode) {
              request.hasHtml = true;
              break a;
            }
        }
        task.push(endChunkForTag$1(type));
      }
      newProps.lastPushedText = false;
    }
  else {
    switch (type) {
      case REACT_LEGACY_HIDDEN_TYPE$1:
      case REACT_DEBUG_TRACING_MODE_TYPE$1:
      case REACT_STRICT_MODE_TYPE$1:
      case REACT_PROFILER_TYPE$1:
      case REACT_FRAGMENT_TYPE$1:
        type = task.keyPath;
        task.keyPath = keyPath;
        renderNodeDestructive$1(request, task, props.children, -1);
        task.keyPath = type;
        return;
      case REACT_OFFSCREEN_TYPE$1:
        "hidden" !== props.mode && (type = task.keyPath, task.keyPath = keyPath, renderNodeDestructive$1(request, task, props.children, -1), task.keyPath = type);
        return;
      case REACT_SUSPENSE_LIST_TYPE$1:
        type = task.keyPath;
        task.keyPath = keyPath;
        renderNodeDestructive$1(request, task, props.children, -1);
        task.keyPath = type;
        return;
      case REACT_SCOPE_TYPE$1:
        throw Error("ReactDOMServer does not yet support scope components.");
      case REACT_SUSPENSE_TYPE$1:
        a: if (null !== task.replay) {
          type = task.keyPath;
          task.keyPath = keyPath;
          keyPath = props.children;
          try {
            renderNode$1(request, task, keyPath, -1);
          } finally {
            task.keyPath = type;
          }
        } else {
          type = task.keyPath;
          var parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState;
          ref = task.blockedSegment;
          propName$33 = props.fallback;
          props = props.children;
          var fallbackAbortSet = /* @__PURE__ */ new Set();
          propName = createSuspenseBoundary$1(request, fallbackAbortSet);
          null !== request.trackedPostpones && (propName.trackedContentKeyPath = keyPath);
          var boundarySegment = createPendingSegment$1(
            request,
            ref.chunks.length,
            propName,
            task.formatContext,
            false,
            false
          );
          ref.children.push(boundarySegment);
          ref.lastPushedText = false;
          var contentRootSegment = createPendingSegment$1(
            request,
            0,
            null,
            task.formatContext,
            false,
            false
          );
          contentRootSegment.parentFlushed = true;
          if (null !== request.trackedPostpones) {
            newProps = [keyPath[0], "Suspense Fallback", keyPath[2]];
            defaultProps = [newProps[1], newProps[2], [], null];
            request.trackedPostpones.workingMap.set(newProps, defaultProps);
            propName.trackedFallbackNode = defaultProps;
            task.blockedSegment = boundarySegment;
            task.keyPath = newProps;
            boundarySegment.status = 6;
            try {
              renderNode$1(request, task, propName$33, -1), boundarySegment.lastPushedText && boundarySegment.textEmbedded && boundarySegment.chunks.push(textSeparator), boundarySegment.status = 1;
            } catch (thrownValue) {
              throw boundarySegment.status = 12 === request.status ? 3 : 4, thrownValue;
            } finally {
              task.blockedSegment = ref, task.keyPath = type;
            }
            task = createRenderTask$1(
              request,
              null,
              props,
              -1,
              propName,
              contentRootSegment,
              propName.contentState,
              task.abortSet,
              keyPath,
              task.formatContext,
              task.context,
              task.treeContext,
              task.componentStack,
              task.isFallback
            );
            pushComponentStack$1(task);
            request.pingedTasks.push(task);
          } else {
            task.blockedBoundary = propName;
            task.hoistableState = propName.contentState;
            task.blockedSegment = contentRootSegment;
            task.keyPath = keyPath;
            contentRootSegment.status = 6;
            try {
              if (renderNode$1(request, task, props, -1), contentRootSegment.lastPushedText && contentRootSegment.textEmbedded && contentRootSegment.chunks.push(textSeparator), contentRootSegment.status = 1, queueCompletedSegment$1(propName, contentRootSegment), 0 === propName.pendingTasks && 0 === propName.status) {
                propName.status = 1;
                break a;
              }
            } catch (thrownValue$28) {
              propName.status = 4, 12 === request.status ? (contentRootSegment.status = 3, newProps = request.fatalError) : (contentRootSegment.status = 4, newProps = thrownValue$28), defaultProps = getThrownInfo$1(task.componentStack), initialState = logRecoverableError$1(
                request,
                newProps,
                defaultProps
              ), propName.errorDigest = initialState, untrackBoundary$1(request, propName);
            } finally {
              task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.blockedSegment = ref, task.keyPath = type;
            }
            task = createRenderTask$1(
              request,
              null,
              propName$33,
              -1,
              parentBoundary,
              boundarySegment,
              propName.fallbackState,
              fallbackAbortSet,
              [keyPath[0], "Suspense Fallback", keyPath[2]],
              task.formatContext,
              task.context,
              task.treeContext,
              task.componentStack,
              true
            );
            pushComponentStack$1(task);
            request.pingedTasks.push(task);
          }
        }
        return;
    }
    if ("object" === typeof type && null !== type)
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE$1:
          if ("ref" in props)
            for (boundarySegment in newProps = {}, props)
              "ref" !== boundarySegment && (newProps[boundarySegment] = props[boundarySegment]);
          else newProps = props;
          type = renderWithHooks$1(
            request,
            task,
            keyPath,
            type.render,
            newProps,
            ref
          );
          finishFunctionComponent$1(
            request,
            task,
            keyPath,
            type,
            0 !== localIdCounter$1,
            actionStateCounter$1,
            actionStateMatchingIndex$1
          );
          return;
        case REACT_MEMO_TYPE$1:
          renderElement$1(request, task, keyPath, type.type, props, ref);
          return;
        case REACT_PROVIDER_TYPE$1:
        case REACT_CONTEXT_TYPE$1:
          defaultProps = props.children;
          newProps = task.keyPath;
          props = props.value;
          initialState = type._currentValue;
          type._currentValue = props;
          ref = currentActiveSnapshot$1;
          currentActiveSnapshot$1 = type = {
            parent: ref,
            depth: null === ref ? 0 : ref.depth + 1,
            context: type,
            parentValue: initialState,
            value: props
          };
          task.context = type;
          task.keyPath = keyPath;
          renderNodeDestructive$1(request, task, defaultProps, -1);
          request = currentActiveSnapshot$1;
          if (null === request)
            throw Error(
              "Tried to pop a Context at the root of the app. This is a bug in React."
            );
          request.context._currentValue = request.parentValue;
          request = currentActiveSnapshot$1 = request.parent;
          task.context = request;
          task.keyPath = newProps;
          return;
        case REACT_CONSUMER_TYPE$1:
          props = props.children;
          type = props(type._context._currentValue);
          props = task.keyPath;
          task.keyPath = keyPath;
          renderNodeDestructive$1(request, task, type, -1);
          task.keyPath = props;
          return;
        case REACT_LAZY_TYPE$1:
          newProps = type._init;
          type = newProps(type._payload);
          if (12 === request.status) throw null;
          renderElement$1(request, task, keyPath, type, props, ref);
          return;
      }
    throw Error(
      "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == type ? type : typeof type) + ".")
    );
  }
}
function resumeNode$1(request, task, segmentId, node, childIndex) {
  var prevReplay = task.replay, blockedBoundary = task.blockedBoundary, resumedSegment = createPendingSegment$1(
    request,
    0,
    null,
    task.formatContext,
    false,
    false
  );
  resumedSegment.id = segmentId;
  resumedSegment.parentFlushed = true;
  try {
    task.replay = null, task.blockedSegment = resumedSegment, renderNode$1(request, task, node, childIndex), resumedSegment.status = 1, null === blockedBoundary ? request.completedRootSegment = resumedSegment : (queueCompletedSegment$1(blockedBoundary, resumedSegment), blockedBoundary.parentFlushed && request.partialBoundaries.push(blockedBoundary));
  } finally {
    task.replay = prevReplay, task.blockedSegment = null;
  }
}
function renderNodeDestructive$1(request, task, node, childIndex) {
  null !== task.replay && "number" === typeof task.replay.slots ? resumeNode$1(request, task, task.replay.slots, node, childIndex) : (task.node = node, task.childIndex = childIndex, node = task.componentStack, pushComponentStack$1(task), retryNode$1(request, task), task.componentStack = node);
}
function retryNode$1(request, task) {
  var node = task.node, childIndex = task.childIndex;
  if (null !== node) {
    if ("object" === typeof node) {
      switch (node.$$typeof) {
        case REACT_ELEMENT_TYPE$1:
          var type = node.type, key = node.key, props = node.props;
          node = props.ref;
          var ref = void 0 !== node ? node : null, name = getComponentNameFromType$1(type), keyOrIndex = null == key ? -1 === childIndex ? 0 : childIndex : key;
          key = [task.keyPath, name, keyOrIndex];
          if (null !== task.replay)
            a: {
              var replay = task.replay;
              childIndex = replay.nodes;
              for (node = 0; node < childIndex.length; node++) {
                var node$jscomp$0 = childIndex[node];
                if (keyOrIndex === node$jscomp$0[1]) {
                  if (4 === node$jscomp$0.length) {
                    if (null !== name && name !== node$jscomp$0[0])
                      throw Error(
                        "Expected the resume to render <" + node$jscomp$0[0] + "> in this slot but instead it rendered <" + name + ">. The tree doesn't match so React will fallback to client rendering."
                      );
                    var childNodes = node$jscomp$0[2];
                    name = node$jscomp$0[3];
                    keyOrIndex = task.node;
                    task.replay = {
                      nodes: childNodes,
                      slots: name,
                      pendingTasks: 1
                    };
                    try {
                      renderElement$1(request, task, key, type, props, ref);
                      if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                        throw Error(
                          "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                        );
                      task.replay.pendingTasks--;
                    } catch (x) {
                      if ("object" === typeof x && null !== x && (x === SuspenseException$1 || "function" === typeof x.then))
                        throw task.node === keyOrIndex && (task.replay = replay), x;
                      task.replay.pendingTasks--;
                      props = getThrownInfo$1(task.componentStack);
                      key = task.blockedBoundary;
                      type = x;
                      props = logRecoverableError$1(request, type, props);
                      abortRemainingReplayNodes$1(
                        request,
                        key,
                        childNodes,
                        name,
                        type,
                        props
                      );
                    }
                    task.replay = replay;
                  } else {
                    if (type !== REACT_SUSPENSE_TYPE$1)
                      throw Error(
                        "Expected the resume to render <Suspense> in this slot but instead it rendered <" + (getComponentNameFromType$1(type) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering."
                      );
                    b: {
                      replay = void 0;
                      type = node$jscomp$0[5];
                      ref = node$jscomp$0[2];
                      name = node$jscomp$0[3];
                      keyOrIndex = null === node$jscomp$0[4] ? [] : node$jscomp$0[4][2];
                      node$jscomp$0 = null === node$jscomp$0[4] ? null : node$jscomp$0[4][3];
                      var prevKeyPath = task.keyPath, previousReplaySet = task.replay, parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState, content = props.children;
                      props = props.fallback;
                      var fallbackAbortSet = /* @__PURE__ */ new Set(), resumedBoundary = createSuspenseBoundary$1(
                        request,
                        fallbackAbortSet
                      );
                      resumedBoundary.parentFlushed = true;
                      resumedBoundary.rootSegmentID = type;
                      task.blockedBoundary = resumedBoundary;
                      task.hoistableState = resumedBoundary.contentState;
                      task.keyPath = key;
                      task.replay = {
                        nodes: ref,
                        slots: name,
                        pendingTasks: 1
                      };
                      try {
                        renderNode$1(request, task, content, -1);
                        if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                          throw Error(
                            "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                          );
                        task.replay.pendingTasks--;
                        if (0 === resumedBoundary.pendingTasks && 0 === resumedBoundary.status) {
                          resumedBoundary.status = 1;
                          request.completedBoundaries.push(resumedBoundary);
                          break b;
                        }
                      } catch (error) {
                        resumedBoundary.status = 4, childNodes = getThrownInfo$1(task.componentStack), replay = logRecoverableError$1(
                          request,
                          error,
                          childNodes
                        ), resumedBoundary.errorDigest = replay, task.replay.pendingTasks--, request.clientRenderedBoundaries.push(
                          resumedBoundary
                        );
                      } finally {
                        task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.replay = previousReplaySet, task.keyPath = prevKeyPath;
                      }
                      task = createReplayTask$1(
                        request,
                        null,
                        {
                          nodes: keyOrIndex,
                          slots: node$jscomp$0,
                          pendingTasks: 0
                        },
                        props,
                        -1,
                        parentBoundary,
                        resumedBoundary.fallbackState,
                        fallbackAbortSet,
                        [key[0], "Suspense Fallback", key[2]],
                        task.formatContext,
                        task.context,
                        task.treeContext,
                        task.componentStack,
                        true
                      );
                      pushComponentStack$1(task);
                      request.pingedTasks.push(task);
                    }
                  }
                  childIndex.splice(node, 1);
                  break a;
                }
              }
            }
          else renderElement$1(request, task, key, type, props, ref);
          return;
        case REACT_PORTAL_TYPE$1:
          throw Error(
            "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render."
          );
        case REACT_LAZY_TYPE$1:
          childNodes = node._init;
          node = childNodes(node._payload);
          if (12 === request.status) throw null;
          renderNodeDestructive$1(request, task, node, childIndex);
          return;
      }
      if (isArrayImpl$1(node)) {
        renderChildrenArray$1(request, task, node, childIndex);
        return;
      }
      null === node || "object" !== typeof node ? childNodes = null : (childNodes = MAYBE_ITERATOR_SYMBOL$1 && node[MAYBE_ITERATOR_SYMBOL$1] || node["@@iterator"], childNodes = "function" === typeof childNodes ? childNodes : null);
      if (childNodes && (childNodes = childNodes.call(node))) {
        node = childNodes.next();
        if (!node.done) {
          props = [];
          do
            props.push(node.value), node = childNodes.next();
          while (!node.done);
          renderChildrenArray$1(request, task, props, childIndex);
        }
        return;
      }
      if ("function" === typeof node.then)
        return task.thenableState = null, renderNodeDestructive$1(request, task, unwrapThenable$1(node), childIndex);
      if (node.$$typeof === REACT_CONTEXT_TYPE$1)
        return renderNodeDestructive$1(
          request,
          task,
          node._currentValue,
          childIndex
        );
      childIndex = Object.prototype.toString.call(node);
      throw Error(
        "Objects are not valid as a React child (found: " + ("[object Object]" === childIndex ? "object with keys {" + Object.keys(node).join(", ") + "}" : childIndex) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    if ("string" === typeof node)
      childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance$1(
        childIndex.chunks,
        node,
        request.renderState,
        childIndex.lastPushedText
      ));
    else if ("number" === typeof node || "bigint" === typeof node)
      childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance$1(
        childIndex.chunks,
        "" + node,
        request.renderState,
        childIndex.lastPushedText
      ));
  }
}
function renderChildrenArray$1(request, task, children, childIndex) {
  var prevKeyPath = task.keyPath;
  if (-1 !== childIndex && (task.keyPath = [task.keyPath, "Fragment", childIndex], null !== task.replay)) {
    for (var replay = task.replay, replayNodes = replay.nodes, j = 0; j < replayNodes.length; j++) {
      var node = replayNodes[j];
      if (node[1] === childIndex) {
        childIndex = node[2];
        node = node[3];
        task.replay = { nodes: childIndex, slots: node, pendingTasks: 1 };
        try {
          renderChildrenArray$1(request, task, children, -1);
          if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
            throw Error(
              "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
            );
          task.replay.pendingTasks--;
        } catch (x) {
          if ("object" === typeof x && null !== x && (x === SuspenseException$1 || "function" === typeof x.then))
            throw x;
          task.replay.pendingTasks--;
          children = getThrownInfo$1(task.componentStack);
          var boundary = task.blockedBoundary, error = x;
          children = logRecoverableError$1(request, error, children);
          abortRemainingReplayNodes$1(
            request,
            boundary,
            childIndex,
            node,
            error,
            children
          );
        }
        task.replay = replay;
        replayNodes.splice(j, 1);
        break;
      }
    }
    task.keyPath = prevKeyPath;
    return;
  }
  replay = task.treeContext;
  replayNodes = children.length;
  if (null !== task.replay && (j = task.replay.slots, null !== j && "object" === typeof j)) {
    for (childIndex = 0; childIndex < replayNodes; childIndex++)
      node = children[childIndex], task.treeContext = pushTreeContext$1(replay, replayNodes, childIndex), boundary = j[childIndex], "number" === typeof boundary ? (resumeNode$1(request, task, boundary, node, childIndex), delete j[childIndex]) : renderNode$1(request, task, node, childIndex);
    task.treeContext = replay;
    task.keyPath = prevKeyPath;
    return;
  }
  for (j = 0; j < replayNodes; j++)
    childIndex = children[j], task.treeContext = pushTreeContext$1(replay, replayNodes, j), renderNode$1(request, task, childIndex, j);
  task.treeContext = replay;
  task.keyPath = prevKeyPath;
}
function untrackBoundary$1(request, boundary) {
  request = request.trackedPostpones;
  null !== request && (boundary = boundary.trackedContentKeyPath, null !== boundary && (boundary = request.workingMap.get(boundary), void 0 !== boundary && (boundary.length = 4, boundary[2] = [], boundary[3] = null)));
}
function spawnNewSuspendedReplayTask$1(request, task, thenableState2) {
  return createReplayTask$1(
    request,
    thenableState2,
    task.replay,
    task.node,
    task.childIndex,
    task.blockedBoundary,
    task.hoistableState,
    task.abortSet,
    task.keyPath,
    task.formatContext,
    task.context,
    task.treeContext,
    task.componentStack,
    task.isFallback
  );
}
function spawnNewSuspendedRenderTask$1(request, task, thenableState2) {
  var segment = task.blockedSegment, newSegment = createPendingSegment$1(
    request,
    segment.chunks.length,
    null,
    task.formatContext,
    segment.lastPushedText,
    true
  );
  segment.children.push(newSegment);
  segment.lastPushedText = false;
  return createRenderTask$1(
    request,
    thenableState2,
    task.node,
    task.childIndex,
    task.blockedBoundary,
    newSegment,
    task.hoistableState,
    task.abortSet,
    task.keyPath,
    task.formatContext,
    task.context,
    task.treeContext,
    task.componentStack,
    task.isFallback
  );
}
function renderNode$1(request, task, node, childIndex) {
  var previousFormatContext = task.formatContext, previousContext = task.context, previousKeyPath = task.keyPath, previousTreeContext = task.treeContext, previousComponentStack = task.componentStack, segment = task.blockedSegment;
  if (null === segment)
    try {
      return renderNodeDestructive$1(request, task, node, childIndex);
    } catch (thrownValue) {
      if (resetHooksState$1(), node = thrownValue === SuspenseException$1 ? getSuspendedThenable$1() : thrownValue, "object" === typeof node && null !== node) {
        if ("function" === typeof node.then) {
          childIndex = getThenableStateAfterSuspending$1();
          request = spawnNewSuspendedReplayTask$1(request, task, childIndex).ping;
          node.then(request, request);
          task.formatContext = previousFormatContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext;
          task.componentStack = previousComponentStack;
          switchContext$1(previousContext);
          return;
        }
        if ("Maximum call stack size exceeded" === node.message) {
          node = getThenableStateAfterSuspending$1();
          node = spawnNewSuspendedReplayTask$1(request, task, node);
          request.pingedTasks.push(node);
          task.formatContext = previousFormatContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext;
          task.componentStack = previousComponentStack;
          switchContext$1(previousContext);
          return;
        }
      }
    }
  else {
    var childrenLength = segment.children.length, chunkLength = segment.chunks.length;
    try {
      return renderNodeDestructive$1(request, task, node, childIndex);
    } catch (thrownValue$48) {
      if (resetHooksState$1(), segment.children.length = childrenLength, segment.chunks.length = chunkLength, node = thrownValue$48 === SuspenseException$1 ? getSuspendedThenable$1() : thrownValue$48, "object" === typeof node && null !== node) {
        if ("function" === typeof node.then) {
          childIndex = getThenableStateAfterSuspending$1();
          request = spawnNewSuspendedRenderTask$1(request, task, childIndex).ping;
          node.then(request, request);
          task.formatContext = previousFormatContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext;
          task.componentStack = previousComponentStack;
          switchContext$1(previousContext);
          return;
        }
        if ("Maximum call stack size exceeded" === node.message) {
          node = getThenableStateAfterSuspending$1();
          node = spawnNewSuspendedRenderTask$1(request, task, node);
          request.pingedTasks.push(node);
          task.formatContext = previousFormatContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext;
          task.componentStack = previousComponentStack;
          switchContext$1(previousContext);
          return;
        }
      }
    }
  }
  task.formatContext = previousFormatContext;
  task.context = previousContext;
  task.keyPath = previousKeyPath;
  task.treeContext = previousTreeContext;
  switchContext$1(previousContext);
  throw node;
}
function abortTaskSoft$1(task) {
  var boundary = task.blockedBoundary;
  task = task.blockedSegment;
  null !== task && (task.status = 3, finishedTask$1(this, boundary, task));
}
function abortRemainingReplayNodes$1(request$jscomp$0, boundary, nodes, slots, error, errorDigest$jscomp$0) {
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (4 === node.length)
      abortRemainingReplayNodes$1(
        request$jscomp$0,
        boundary,
        node[2],
        node[3],
        error,
        errorDigest$jscomp$0
      );
    else {
      node = node[5];
      var request = request$jscomp$0, errorDigest = errorDigest$jscomp$0, resumedBoundary = createSuspenseBoundary$1(request, /* @__PURE__ */ new Set());
      resumedBoundary.parentFlushed = true;
      resumedBoundary.rootSegmentID = node;
      resumedBoundary.status = 4;
      resumedBoundary.errorDigest = errorDigest;
      resumedBoundary.parentFlushed && request.clientRenderedBoundaries.push(resumedBoundary);
    }
  }
  nodes.length = 0;
  if (null !== slots) {
    if (null === boundary)
      throw Error(
        "We should not have any resumable nodes in the shell. This is a bug in React."
      );
    4 !== boundary.status && (boundary.status = 4, boundary.errorDigest = errorDigest$jscomp$0, boundary.parentFlushed && request$jscomp$0.clientRenderedBoundaries.push(boundary));
    if ("object" === typeof slots) for (var index in slots) delete slots[index];
  }
}
function abortTask$1(task, request, error) {
  var boundary = task.blockedBoundary, segment = task.blockedSegment;
  if (null !== segment) {
    if (6 === segment.status) return;
    segment.status = 3;
  }
  segment = getThrownInfo$1(task.componentStack);
  if (null === boundary) {
    if (13 !== request.status && 14 !== request.status) {
      boundary = task.replay;
      if (null === boundary) {
        logRecoverableError$1(request, error, segment);
        fatalError$1(request, error);
        return;
      }
      boundary.pendingTasks--;
      0 === boundary.pendingTasks && 0 < boundary.nodes.length && (task = logRecoverableError$1(request, error, segment), abortRemainingReplayNodes$1(
        request,
        null,
        boundary.nodes,
        boundary.slots,
        error,
        task
      ));
      request.pendingRootTasks--;
      0 === request.pendingRootTasks && completeShell$1(request);
    }
  } else
    boundary.pendingTasks--, 4 !== boundary.status && (boundary.status = 4, task = logRecoverableError$1(request, error, segment), boundary.status = 4, boundary.errorDigest = task, untrackBoundary$1(request, boundary), boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary)), boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
      return abortTask$1(fallbackTask, request, error);
    }), boundary.fallbackAbortableTasks.clear();
  request.allPendingTasks--;
  0 === request.allPendingTasks && completeAll$1(request);
}
function safelyEmitEarlyPreloads$1(request, shellComplete) {
  try {
    var renderState = request.renderState, onHeaders = renderState.onHeaders;
    if (onHeaders) {
      var headers = renderState.headers;
      if (headers) {
        renderState.headers = null;
        var linkHeader = headers.preconnects;
        headers.fontPreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.fontPreloads);
        headers.highImagePreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.highImagePreloads);
        if (!shellComplete) {
          var queueIter = renderState.styles.values(), queueStep = queueIter.next();
          b: for (; 0 < headers.remainingCapacity && !queueStep.done; queueStep = queueIter.next())
            for (var sheetIter = queueStep.value.sheets.values(), sheetStep = sheetIter.next(); 0 < headers.remainingCapacity && !sheetStep.done; sheetStep = sheetIter.next()) {
              var sheet = sheetStep.value, props = sheet.props, key = props.href, props$jscomp$0 = sheet.props, header = getPreloadAsHeader$1(props$jscomp$0.href, "style", {
                crossOrigin: props$jscomp$0.crossOrigin,
                integrity: props$jscomp$0.integrity,
                nonce: props$jscomp$0.nonce,
                type: props$jscomp$0.type,
                fetchPriority: props$jscomp$0.fetchPriority,
                referrerPolicy: props$jscomp$0.referrerPolicy,
                media: props$jscomp$0.media
              });
              if (0 <= (headers.remainingCapacity -= header.length + 2))
                renderState.resets.style[key] = PRELOAD_NO_CREDS$1, linkHeader && (linkHeader += ", "), linkHeader += header, renderState.resets.style[key] = "string" === typeof props.crossOrigin || "string" === typeof props.integrity ? [props.crossOrigin, props.integrity] : PRELOAD_NO_CREDS$1;
              else break b;
            }
        }
        linkHeader ? onHeaders({ Link: linkHeader }) : onHeaders({});
      }
    }
  } catch (error) {
    logRecoverableError$1(request, error, {});
  }
}
function completeShell$1(request) {
  null === request.trackedPostpones && safelyEmitEarlyPreloads$1(request, true);
  request.onShellError = noop$3;
  request = request.onShellReady;
  request();
}
function completeAll$1(request) {
  safelyEmitEarlyPreloads$1(
    request,
    null === request.trackedPostpones ? true : null === request.completedRootSegment || 5 !== request.completedRootSegment.status
  );
  request = request.onAllReady;
  request();
}
function queueCompletedSegment$1(boundary, segment) {
  if (0 === segment.chunks.length && 1 === segment.children.length && null === segment.children[0].boundary && -1 === segment.children[0].id) {
    var childSegment = segment.children[0];
    childSegment.id = segment.id;
    childSegment.parentFlushed = true;
    1 === childSegment.status && queueCompletedSegment$1(boundary, childSegment);
  } else boundary.completedSegments.push(segment);
}
function finishedTask$1(request, boundary, segment) {
  if (null === boundary) {
    if (null !== segment && segment.parentFlushed) {
      if (null !== request.completedRootSegment)
        throw Error(
          "There can only be one root segment. This is a bug in React."
        );
      request.completedRootSegment = segment;
    }
    request.pendingRootTasks--;
    0 === request.pendingRootTasks && completeShell$1(request);
  } else
    boundary.pendingTasks--, 4 !== boundary.status && (0 === boundary.pendingTasks ? (0 === boundary.status && (boundary.status = 1), null !== segment && segment.parentFlushed && 1 === segment.status && queueCompletedSegment$1(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), 1 === boundary.status && (boundary.fallbackAbortableTasks.forEach(abortTaskSoft$1, request), boundary.fallbackAbortableTasks.clear())) : null !== segment && segment.parentFlushed && 1 === segment.status && (queueCompletedSegment$1(boundary, segment), 1 === boundary.completedSegments.length && boundary.parentFlushed && request.partialBoundaries.push(boundary)));
  request.allPendingTasks--;
  0 === request.allPendingTasks && completeAll$1(request);
}
function performWork$1(request$jscomp$2) {
  if (14 !== request$jscomp$2.status && 13 !== request$jscomp$2.status) {
    var prevContext = currentActiveSnapshot$1, prevDispatcher = ReactSharedInternals$1.H;
    ReactSharedInternals$1.H = HooksDispatcher$1;
    var prevAsyncDispatcher = ReactSharedInternals$1.A;
    ReactSharedInternals$1.A = DefaultAsyncDispatcher$1;
    var prevRequest = currentRequest$1;
    currentRequest$1 = request$jscomp$2;
    var prevResumableState = currentResumableState$1;
    currentResumableState$1 = request$jscomp$2.resumableState;
    try {
      var pingedTasks = request$jscomp$2.pingedTasks, i;
      for (i = 0; i < pingedTasks.length; i++) {
        var task = pingedTasks[i], request = request$jscomp$2, segment = task.blockedSegment;
        if (null === segment) {
          var request$jscomp$0 = request;
          if (0 !== task.replay.pendingTasks) {
            switchContext$1(task.context);
            try {
              "number" === typeof task.replay.slots ? resumeNode$1(
                request$jscomp$0,
                task,
                task.replay.slots,
                task.node,
                task.childIndex
              ) : retryNode$1(request$jscomp$0, task);
              if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                throw Error(
                  "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                );
              task.replay.pendingTasks--;
              task.abortSet.delete(task);
              finishedTask$1(request$jscomp$0, task.blockedBoundary, null);
            } catch (thrownValue) {
              resetHooksState$1();
              var x = thrownValue === SuspenseException$1 ? getSuspendedThenable$1() : thrownValue;
              if ("object" === typeof x && null !== x && "function" === typeof x.then) {
                var ping = task.ping;
                x.then(ping, ping);
                task.thenableState = getThenableStateAfterSuspending$1();
              } else {
                task.replay.pendingTasks--;
                task.abortSet.delete(task);
                var errorInfo = getThrownInfo$1(task.componentStack);
                request = void 0;
                var request$jscomp$1 = request$jscomp$0, boundary = task.blockedBoundary, error$jscomp$0 = 12 === request$jscomp$0.status ? request$jscomp$0.fatalError : x, replayNodes = task.replay.nodes, resumeSlots = task.replay.slots;
                request = logRecoverableError$1(
                  request$jscomp$1,
                  error$jscomp$0,
                  errorInfo
                );
                abortRemainingReplayNodes$1(
                  request$jscomp$1,
                  boundary,
                  replayNodes,
                  resumeSlots,
                  error$jscomp$0,
                  request
                );
                request$jscomp$0.pendingRootTasks--;
                0 === request$jscomp$0.pendingRootTasks && completeShell$1(request$jscomp$0);
                request$jscomp$0.allPendingTasks--;
                0 === request$jscomp$0.allPendingTasks && completeAll$1(request$jscomp$0);
              }
            } finally {
            }
          }
        } else if (request$jscomp$0 = void 0, request$jscomp$1 = segment, 0 === request$jscomp$1.status) {
          request$jscomp$1.status = 6;
          switchContext$1(task.context);
          var childrenLength = request$jscomp$1.children.length, chunkLength = request$jscomp$1.chunks.length;
          try {
            retryNode$1(request, task), request$jscomp$1.lastPushedText && request$jscomp$1.textEmbedded && request$jscomp$1.chunks.push(textSeparator), task.abortSet.delete(task), request$jscomp$1.status = 1, finishedTask$1(request, task.blockedBoundary, request$jscomp$1);
          } catch (thrownValue) {
            resetHooksState$1();
            request$jscomp$1.children.length = childrenLength;
            request$jscomp$1.chunks.length = chunkLength;
            var x$jscomp$0 = thrownValue === SuspenseException$1 ? getSuspendedThenable$1() : 12 === request.status ? request.fatalError : thrownValue;
            if ("object" === typeof x$jscomp$0 && null !== x$jscomp$0 && "function" === typeof x$jscomp$0.then) {
              request$jscomp$1.status = 0;
              task.thenableState = getThenableStateAfterSuspending$1();
              var ping$jscomp$0 = task.ping;
              x$jscomp$0.then(ping$jscomp$0, ping$jscomp$0);
            } else {
              var errorInfo$jscomp$0 = getThrownInfo$1(task.componentStack);
              task.abortSet.delete(task);
              request$jscomp$1.status = 4;
              var boundary$jscomp$0 = task.blockedBoundary;
              request$jscomp$0 = logRecoverableError$1(
                request,
                x$jscomp$0,
                errorInfo$jscomp$0
              );
              null === boundary$jscomp$0 ? fatalError$1(request, x$jscomp$0) : (boundary$jscomp$0.pendingTasks--, 4 !== boundary$jscomp$0.status && (boundary$jscomp$0.status = 4, boundary$jscomp$0.errorDigest = request$jscomp$0, untrackBoundary$1(request, boundary$jscomp$0), boundary$jscomp$0.parentFlushed && request.clientRenderedBoundaries.push(
                boundary$jscomp$0
              )));
              request.allPendingTasks--;
              0 === request.allPendingTasks && completeAll$1(request);
            }
          } finally {
          }
        }
      }
      pingedTasks.splice(0, i);
      null !== request$jscomp$2.destination && flushCompletedQueues$1(request$jscomp$2, request$jscomp$2.destination);
    } catch (error) {
      logRecoverableError$1(request$jscomp$2, error, {}), fatalError$1(request$jscomp$2, error);
    } finally {
      currentResumableState$1 = prevResumableState, ReactSharedInternals$1.H = prevDispatcher, ReactSharedInternals$1.A = prevAsyncDispatcher, prevDispatcher === HooksDispatcher$1 && switchContext$1(prevContext), currentRequest$1 = prevRequest;
    }
  }
}
function flushSubtree$1(request, destination, segment, hoistableState) {
  segment.parentFlushed = true;
  switch (segment.status) {
    case 0:
      segment.id = request.nextSegmentId++;
    case 5:
      return hoistableState = segment.id, segment.lastPushedText = false, segment.textEmbedded = false, request = request.renderState, writeChunk(destination, placeholder1), writeChunk(destination, request.placeholderPrefix), request = stringToChunk(hoistableState.toString(16)), writeChunk(destination, request), writeChunkAndReturn(destination, placeholder2);
    case 1:
      segment.status = 2;
      var r = true, chunks = segment.chunks, chunkIdx = 0;
      segment = segment.children;
      for (var childIdx = 0; childIdx < segment.length; childIdx++) {
        for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
          writeChunk(destination, chunks[chunkIdx]);
        r = flushSegment$1(request, destination, r, hoistableState);
      }
      for (; chunkIdx < chunks.length - 1; chunkIdx++)
        writeChunk(destination, chunks[chunkIdx]);
      chunkIdx < chunks.length && (r = writeChunkAndReturn(destination, chunks[chunkIdx]));
      return r;
    default:
      throw Error(
        "Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React."
      );
  }
}
function flushSegment$1(request, destination, segment, hoistableState) {
  var boundary = segment.boundary;
  if (null === boundary)
    return flushSubtree$1(request, destination, segment, hoistableState);
  boundary.parentFlushed = true;
  if (4 === boundary.status)
    boundary = boundary.errorDigest, writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary), writeChunk(destination, clientRenderedSuspenseBoundaryError1), boundary && (writeChunk(destination, clientRenderedSuspenseBoundaryError1A), writeChunk(destination, stringToChunk(escapeTextForBrowser$1(boundary))), writeChunk(
      destination,
      clientRenderedSuspenseBoundaryErrorAttrInterstitial
    )), writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2), flushSubtree$1(request, destination, segment, hoistableState);
  else if (1 !== boundary.status)
    0 === boundary.status && (boundary.rootSegmentID = request.nextSegmentId++), 0 < boundary.completedSegments.length && request.partialBoundaries.push(boundary), writeStartPendingSuspenseBoundary$1(
      destination,
      request.renderState,
      boundary.rootSegmentID
    ), hoistableState && (boundary = boundary.fallbackState, boundary.styles.forEach(hoistStyleQueueDependency$1, hoistableState), boundary.stylesheets.forEach(
      hoistStylesheetDependency$1,
      hoistableState
    )), flushSubtree$1(request, destination, segment, hoistableState);
  else if (boundary.byteSize > request.progressiveChunkSize)
    boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary$1(
      destination,
      request.renderState,
      boundary.rootSegmentID
    ), flushSubtree$1(request, destination, segment, hoistableState);
  else {
    hoistableState && (segment = boundary.contentState, segment.styles.forEach(hoistStyleQueueDependency$1, hoistableState), segment.stylesheets.forEach(hoistStylesheetDependency$1, hoistableState));
    writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
    segment = boundary.completedSegments;
    if (1 !== segment.length)
      throw Error(
        "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
      );
    flushSegment$1(request, destination, segment[0], hoistableState);
  }
  return writeChunkAndReturn(destination, endSuspenseBoundary);
}
function flushSegmentContainer$1(request, destination, segment, hoistableState) {
  writeStartSegment$1(
    destination,
    request.renderState,
    segment.parentFormatContext,
    segment.id
  );
  flushSegment$1(request, destination, segment, hoistableState);
  return writeEndSegment$1(destination, segment.parentFormatContext);
}
function flushCompletedBoundary$1(request, destination, boundary) {
  for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++)
    flushPartiallyCompletedSegment$1(
      request,
      destination,
      boundary,
      completedSegments[i]
    );
  completedSegments.length = 0;
  writeHoistablesForBoundary$1(
    destination,
    boundary.contentState,
    request.renderState
  );
  completedSegments = request.resumableState;
  request = request.renderState;
  i = boundary.rootSegmentID;
  boundary = boundary.contentState;
  var requiresStyleInsertion = request.stylesToHoist;
  request.stylesToHoist = false;
  writeChunk(destination, request.startInlineScript);
  requiresStyleInsertion ? 0 === (completedSegments.instructions & 2) ? (completedSegments.instructions |= 10, writeChunk(destination, completeBoundaryWithStylesScript1FullBoth)) : 0 === (completedSegments.instructions & 8) ? (completedSegments.instructions |= 8, writeChunk(destination, completeBoundaryWithStylesScript1FullPartial)) : writeChunk(destination, completeBoundaryWithStylesScript1Partial) : 0 === (completedSegments.instructions & 2) ? (completedSegments.instructions |= 2, writeChunk(destination, completeBoundaryScript1Full)) : writeChunk(destination, completeBoundaryScript1Partial);
  completedSegments = stringToChunk(i.toString(16));
  writeChunk(destination, request.boundaryPrefix);
  writeChunk(destination, completedSegments);
  writeChunk(destination, completeBoundaryScript2);
  writeChunk(destination, request.segmentPrefix);
  writeChunk(destination, completedSegments);
  requiresStyleInsertion ? (writeChunk(destination, completeBoundaryScript3a), writeStyleResourceDependenciesInJS$1(destination, boundary)) : writeChunk(destination, completeBoundaryScript3b);
  boundary = writeChunkAndReturn(destination, completeBoundaryScriptEnd);
  return writeBootstrap$1(destination, request) && boundary;
}
function flushPartiallyCompletedSegment$1(request, destination, boundary, segment) {
  if (2 === segment.status) return true;
  var hoistableState = boundary.contentState, segmentID = segment.id;
  if (-1 === segmentID) {
    if (-1 === (segment.id = boundary.rootSegmentID))
      throw Error(
        "A root segment ID must have been assigned by now. This is a bug in React."
      );
    return flushSegmentContainer$1(request, destination, segment, hoistableState);
  }
  if (segmentID === boundary.rootSegmentID)
    return flushSegmentContainer$1(request, destination, segment, hoistableState);
  flushSegmentContainer$1(request, destination, segment, hoistableState);
  boundary = request.resumableState;
  request = request.renderState;
  writeChunk(destination, request.startInlineScript);
  0 === (boundary.instructions & 1) ? (boundary.instructions |= 1, writeChunk(destination, completeSegmentScript1Full)) : writeChunk(destination, completeSegmentScript1Partial);
  writeChunk(destination, request.segmentPrefix);
  segmentID = stringToChunk(segmentID.toString(16));
  writeChunk(destination, segmentID);
  writeChunk(destination, completeSegmentScript2);
  writeChunk(destination, request.placeholderPrefix);
  writeChunk(destination, segmentID);
  destination = writeChunkAndReturn(destination, completeSegmentScriptEnd);
  return destination;
}
function flushCompletedQueues$1(request, destination) {
  currentView = new Uint8Array(2048);
  writtenBytes = 0;
  try {
    if (!(0 < request.pendingRootTasks)) {
      var i, completedRootSegment = request.completedRootSegment;
      if (null !== completedRootSegment) {
        if (5 === completedRootSegment.status) return;
        var renderState = request.renderState, htmlChunks = renderState.htmlChunks, headChunks = renderState.headChunks, i$jscomp$0;
        if (htmlChunks) {
          for (i$jscomp$0 = 0; i$jscomp$0 < htmlChunks.length; i$jscomp$0++)
            writeChunk(destination, htmlChunks[i$jscomp$0]);
          if (headChunks)
            for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
              writeChunk(destination, headChunks[i$jscomp$0]);
          else
            writeChunk(destination, startChunkForTag$1("head")), writeChunk(destination, endOfStartTag);
        } else if (headChunks)
          for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
            writeChunk(destination, headChunks[i$jscomp$0]);
        var charsetChunks = renderState.charsetChunks;
        for (i$jscomp$0 = 0; i$jscomp$0 < charsetChunks.length; i$jscomp$0++)
          writeChunk(destination, charsetChunks[i$jscomp$0]);
        charsetChunks.length = 0;
        renderState.preconnects.forEach(flushResource$1, destination);
        renderState.preconnects.clear();
        var viewportChunks = renderState.viewportChunks;
        for (i$jscomp$0 = 0; i$jscomp$0 < viewportChunks.length; i$jscomp$0++)
          writeChunk(destination, viewportChunks[i$jscomp$0]);
        viewportChunks.length = 0;
        renderState.fontPreloads.forEach(flushResource$1, destination);
        renderState.fontPreloads.clear();
        renderState.highImagePreloads.forEach(flushResource$1, destination);
        renderState.highImagePreloads.clear();
        renderState.styles.forEach(flushStylesInPreamble$1, destination);
        var importMapChunks = renderState.importMapChunks;
        for (i$jscomp$0 = 0; i$jscomp$0 < importMapChunks.length; i$jscomp$0++)
          writeChunk(destination, importMapChunks[i$jscomp$0]);
        importMapChunks.length = 0;
        renderState.bootstrapScripts.forEach(flushResource$1, destination);
        renderState.scripts.forEach(flushResource$1, destination);
        renderState.scripts.clear();
        renderState.bulkPreloads.forEach(flushResource$1, destination);
        renderState.bulkPreloads.clear();
        var hoistableChunks = renderState.hoistableChunks;
        for (i$jscomp$0 = 0; i$jscomp$0 < hoistableChunks.length; i$jscomp$0++)
          writeChunk(destination, hoistableChunks[i$jscomp$0]);
        hoistableChunks.length = 0;
        htmlChunks && null === headChunks && writeChunk(destination, endChunkForTag$1("head"));
        flushSegment$1(request, destination, completedRootSegment, null);
        request.completedRootSegment = null;
        writeBootstrap$1(destination, request.renderState);
      }
      var renderState$jscomp$0 = request.renderState;
      completedRootSegment = 0;
      var viewportChunks$jscomp$0 = renderState$jscomp$0.viewportChunks;
      for (completedRootSegment = 0; completedRootSegment < viewportChunks$jscomp$0.length; completedRootSegment++)
        writeChunk(destination, viewportChunks$jscomp$0[completedRootSegment]);
      viewportChunks$jscomp$0.length = 0;
      renderState$jscomp$0.preconnects.forEach(flushResource$1, destination);
      renderState$jscomp$0.preconnects.clear();
      renderState$jscomp$0.fontPreloads.forEach(flushResource$1, destination);
      renderState$jscomp$0.fontPreloads.clear();
      renderState$jscomp$0.highImagePreloads.forEach(
        flushResource$1,
        destination
      );
      renderState$jscomp$0.highImagePreloads.clear();
      renderState$jscomp$0.styles.forEach(preloadLateStyles$1, destination);
      renderState$jscomp$0.scripts.forEach(flushResource$1, destination);
      renderState$jscomp$0.scripts.clear();
      renderState$jscomp$0.bulkPreloads.forEach(flushResource$1, destination);
      renderState$jscomp$0.bulkPreloads.clear();
      var hoistableChunks$jscomp$0 = renderState$jscomp$0.hoistableChunks;
      for (completedRootSegment = 0; completedRootSegment < hoistableChunks$jscomp$0.length; completedRootSegment++)
        writeChunk(destination, hoistableChunks$jscomp$0[completedRootSegment]);
      hoistableChunks$jscomp$0.length = 0;
      var clientRenderedBoundaries = request.clientRenderedBoundaries;
      for (i = 0; i < clientRenderedBoundaries.length; i++) {
        var boundary = clientRenderedBoundaries[i];
        renderState$jscomp$0 = destination;
        var resumableState = request.resumableState, renderState$jscomp$1 = request.renderState, id = boundary.rootSegmentID, errorDigest = boundary.errorDigest;
        writeChunk(
          renderState$jscomp$0,
          renderState$jscomp$1.startInlineScript
        );
        0 === (resumableState.instructions & 4) ? (resumableState.instructions |= 4, writeChunk(renderState$jscomp$0, clientRenderScript1Full)) : writeChunk(renderState$jscomp$0, clientRenderScript1Partial);
        writeChunk(renderState$jscomp$0, renderState$jscomp$1.boundaryPrefix);
        writeChunk(renderState$jscomp$0, stringToChunk(id.toString(16)));
        writeChunk(renderState$jscomp$0, clientRenderScript1A);
        errorDigest && (writeChunk(
          renderState$jscomp$0,
          clientRenderErrorScriptArgInterstitial
        ), writeChunk(
          renderState$jscomp$0,
          stringToChunk(
            escapeJSStringsForInstructionScripts$1(errorDigest || "")
          )
        ));
        var JSCompiler_inline_result = writeChunkAndReturn(
          renderState$jscomp$0,
          clientRenderScriptEnd
        );
        if (!JSCompiler_inline_result) {
          request.destination = null;
          i++;
          clientRenderedBoundaries.splice(0, i);
          return;
        }
      }
      clientRenderedBoundaries.splice(0, i);
      var completedBoundaries = request.completedBoundaries;
      for (i = 0; i < completedBoundaries.length; i++)
        if (!flushCompletedBoundary$1(request, destination, completedBoundaries[i])) {
          request.destination = null;
          i++;
          completedBoundaries.splice(0, i);
          return;
        }
      completedBoundaries.splice(0, i);
      completeWriting(destination);
      currentView = new Uint8Array(2048);
      writtenBytes = 0;
      var partialBoundaries = request.partialBoundaries;
      for (i = 0; i < partialBoundaries.length; i++) {
        var boundary$51 = partialBoundaries[i];
        a: {
          clientRenderedBoundaries = request;
          boundary = destination;
          var completedSegments = boundary$51.completedSegments;
          for (JSCompiler_inline_result = 0; JSCompiler_inline_result < completedSegments.length; JSCompiler_inline_result++)
            if (!flushPartiallyCompletedSegment$1(
              clientRenderedBoundaries,
              boundary,
              boundary$51,
              completedSegments[JSCompiler_inline_result]
            )) {
              JSCompiler_inline_result++;
              completedSegments.splice(0, JSCompiler_inline_result);
              var JSCompiler_inline_result$jscomp$0 = false;
              break a;
            }
          completedSegments.splice(0, JSCompiler_inline_result);
          JSCompiler_inline_result$jscomp$0 = writeHoistablesForBoundary$1(
            boundary,
            boundary$51.contentState,
            clientRenderedBoundaries.renderState
          );
        }
        if (!JSCompiler_inline_result$jscomp$0) {
          request.destination = null;
          i++;
          partialBoundaries.splice(0, i);
          return;
        }
      }
      partialBoundaries.splice(0, i);
      var largeBoundaries = request.completedBoundaries;
      for (i = 0; i < largeBoundaries.length; i++)
        if (!flushCompletedBoundary$1(request, destination, largeBoundaries[i])) {
          request.destination = null;
          i++;
          largeBoundaries.splice(0, i);
          return;
        }
      largeBoundaries.splice(0, i);
    }
  } finally {
    0 === request.allPendingTasks && 0 === request.pingedTasks.length && 0 === request.clientRenderedBoundaries.length && 0 === request.completedBoundaries.length ? (request.flushScheduled = false, i = request.resumableState, i.hasBody && writeChunk(destination, endChunkForTag$1("body")), i.hasHtml && writeChunk(destination, endChunkForTag$1("html")), completeWriting(destination), request.status = 14, destination.close(), request.destination = null) : completeWriting(destination);
  }
}
function startWork(request) {
  request.flushScheduled = null !== request.destination;
  supportsRequestStorage ? scheduleMicrotask(function() {
    return requestStorage.run(request, performWork$1, request);
  }) : scheduleMicrotask(function() {
    return performWork$1(request);
  });
  setTimeout(function() {
    10 === request.status && (request.status = 11);
    null === request.trackedPostpones && (supportsRequestStorage ? requestStorage.run(
      request,
      enqueueEarlyPreloadsAfterInitialWork,
      request
    ) : enqueueEarlyPreloadsAfterInitialWork(request));
  }, 0);
}
function enqueueEarlyPreloadsAfterInitialWork(request) {
  safelyEmitEarlyPreloads$1(request, 0 === request.pendingRootTasks);
}
function enqueueFlush$1(request) {
  false === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination && (request.flushScheduled = true, setTimeout(function() {
    var destination = request.destination;
    destination ? flushCompletedQueues$1(request, destination) : request.flushScheduled = false;
  }, 0));
}
function startFlowing$1(request, destination) {
  if (13 === request.status)
    request.status = 14, closeWithError(destination, request.fatalError);
  else if (14 !== request.status && null === request.destination) {
    request.destination = destination;
    try {
      flushCompletedQueues$1(request, destination);
    } catch (error) {
      logRecoverableError$1(request, error, {}), fatalError$1(request, error);
    }
  }
}
function abort$1(request, reason) {
  if (11 === request.status || 10 === request.status) request.status = 12;
  try {
    var abortableTasks = request.abortableTasks;
    if (0 < abortableTasks.size) {
      var error = void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason;
      request.fatalError = error;
      abortableTasks.forEach(function(task) {
        return abortTask$1(task, request, error);
      });
      abortableTasks.clear();
    }
    null !== request.destination && flushCompletedQueues$1(request, request.destination);
  } catch (error$53) {
    logRecoverableError$1(request, error$53, {}), fatalError$1(request, error$53);
  }
}
function ensureCorrectIsomorphicReactVersion() {
  var isomorphicReactPackageVersion = React$1.version;
  if ("19.0.0" !== isomorphicReactPackageVersion)
    throw Error(
      'Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:\n  - react:      ' + (isomorphicReactPackageVersion + "\n  - react-dom:  19.0.0\nLearn more: https://react.dev/warnings/version-mismatch")
    );
}
ensureCorrectIsomorphicReactVersion();
ensureCorrectIsomorphicReactVersion();
reactDomServer_edge_production.prerender = function(children, options) {
  return new Promise(function(resolve, reject) {
    var onHeaders = options ? options.onHeaders : void 0, onHeadersImpl;
    onHeaders && (onHeadersImpl = function(headersDescriptor) {
      onHeaders(new Headers(headersDescriptor));
    });
    var resources = createResumableState$1(
      options ? options.identifierPrefix : void 0,
      options ? options.unstable_externalRuntimeSrc : void 0,
      options ? options.bootstrapScriptContent : void 0,
      options ? options.bootstrapScripts : void 0,
      options ? options.bootstrapModules : void 0
    ), request = createPrerenderRequest(
      children,
      resources,
      createRenderState$1(
        resources,
        void 0,
        options ? options.unstable_externalRuntimeSrc : void 0,
        options ? options.importMap : void 0,
        onHeadersImpl,
        options ? options.maxHeadersLength : void 0
      ),
      createRootFormatContext(options ? options.namespaceURI : void 0),
      options ? options.progressiveChunkSize : void 0,
      options ? options.onError : void 0,
      function() {
        var result = {
          prelude: new ReadableStream(
            {
              type: "bytes",
              pull: function(controller) {
                startFlowing$1(request, controller);
              },
              cancel: function(reason) {
                request.destination = null;
                abort$1(request, reason);
              }
            },
            { highWaterMark: 0 }
          )
        };
        resolve(result);
      },
      void 0,
      void 0,
      reject,
      options ? options.onPostpone : void 0
    );
    if (options && options.signal) {
      var signal = options.signal;
      if (signal.aborted) abort$1(request, signal.reason);
      else {
        var listener = function() {
          abort$1(request, signal.reason);
          signal.removeEventListener("abort", listener);
        };
        signal.addEventListener("abort", listener);
      }
    }
    startWork(request);
  });
};
reactDomServer_edge_production.renderToReadableStream = function(children, options) {
  return new Promise(function(resolve, reject) {
    var onFatalError, onAllReady, allReady = new Promise(function(res, rej) {
      onAllReady = res;
      onFatalError = rej;
    }), onHeaders = options ? options.onHeaders : void 0, onHeadersImpl;
    onHeaders && (onHeadersImpl = function(headersDescriptor) {
      onHeaders(new Headers(headersDescriptor));
    });
    var resumableState = createResumableState$1(
      options ? options.identifierPrefix : void 0,
      options ? options.unstable_externalRuntimeSrc : void 0,
      options ? options.bootstrapScriptContent : void 0,
      options ? options.bootstrapScripts : void 0,
      options ? options.bootstrapModules : void 0
    ), request = createRequest$1(
      children,
      resumableState,
      createRenderState$1(
        resumableState,
        options ? options.nonce : void 0,
        options ? options.unstable_externalRuntimeSrc : void 0,
        options ? options.importMap : void 0,
        onHeadersImpl,
        options ? options.maxHeadersLength : void 0
      ),
      createRootFormatContext(options ? options.namespaceURI : void 0),
      options ? options.progressiveChunkSize : void 0,
      options ? options.onError : void 0,
      onAllReady,
      function() {
        var stream = new ReadableStream(
          {
            type: "bytes",
            pull: function(controller) {
              startFlowing$1(request, controller);
            },
            cancel: function(reason) {
              request.destination = null;
              abort$1(request, reason);
            }
          },
          { highWaterMark: 0 }
        );
        stream.allReady = allReady;
        resolve(stream);
      },
      function(error) {
        allReady.catch(function() {
        });
        reject(error);
      },
      onFatalError,
      options ? options.onPostpone : void 0,
      options ? options.formState : void 0
    );
    if (options && options.signal) {
      var signal = options.signal;
      if (signal.aborted) abort$1(request, signal.reason);
      else {
        var listener = function() {
          abort$1(request, signal.reason);
          signal.removeEventListener("abort", listener);
        };
        signal.addEventListener("abort", listener);
      }
    }
    startWork(request);
  });
};
reactDomServer_edge_production.version = "19.0.0";
var reactDomServerLegacy_browser_production = {};
/**
 * @license React
 * react-dom-server-legacy.browser.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = reactExports, ReactDOM = reactDomExports;
function formatProdErrorMessage(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_SCOPE_TYPE = Symbol.for("react.scope"), REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden"), REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, isArrayImpl = Array.isArray;
function murmurhash3_32_gc(key, seed) {
  var remainder = key.length & 3;
  var bytes = key.length - remainder;
  var h1 = seed;
  for (seed = 0; seed < bytes; ) {
    var k1 = key.charCodeAt(seed) & 255 | (key.charCodeAt(++seed) & 255) << 8 | (key.charCodeAt(++seed) & 255) << 16 | (key.charCodeAt(++seed) & 255) << 24;
    ++seed;
    k1 = 3432918353 * (k1 & 65535) + ((3432918353 * (k1 >>> 16) & 65535) << 16) & 4294967295;
    k1 = k1 << 15 | k1 >>> 17;
    k1 = 461845907 * (k1 & 65535) + ((461845907 * (k1 >>> 16) & 65535) << 16) & 4294967295;
    h1 ^= k1;
    h1 = h1 << 13 | h1 >>> 19;
    h1 = 5 * (h1 & 65535) + ((5 * (h1 >>> 16) & 65535) << 16) & 4294967295;
    h1 = (h1 & 65535) + 27492 + (((h1 >>> 16) + 58964 & 65535) << 16);
  }
  k1 = 0;
  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(seed + 2) & 255) << 16;
    case 2:
      k1 ^= (key.charCodeAt(seed + 1) & 255) << 8;
    case 1:
      k1 ^= key.charCodeAt(seed) & 255, k1 = 3432918353 * (k1 & 65535) + ((3432918353 * (k1 >>> 16) & 65535) << 16) & 4294967295, k1 = k1 << 15 | k1 >>> 17, h1 ^= 461845907 * (k1 & 65535) + ((461845907 * (k1 >>> 16) & 65535) << 16) & 4294967295;
  }
  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = 2246822507 * (h1 & 65535) + ((2246822507 * (h1 >>> 16) & 65535) << 16) & 4294967295;
  h1 ^= h1 >>> 13;
  h1 = 3266489909 * (h1 & 65535) + ((3266489909 * (h1 >>> 16) & 65535) << 16) & 4294967295;
  return (h1 ^ h1 >>> 16) >>> 0;
}
var assign = Object.assign, hasOwnProperty = Object.prototype.hasOwnProperty, VALID_ATTRIBUTE_NAME_REGEX = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return true;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return validatedAttributeNameCache[attributeName] = true;
  illegalAttributeNameCache[attributeName] = true;
  return false;
}
var unitlessNumbers = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
), aliases = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), matchHtmlRegExp = /["'&<>]/;
function escapeTextForBrowser(text) {
  if ("boolean" === typeof text || "number" === typeof text || "bigint" === typeof text)
    return "" + text;
  text = "" + text;
  var match = matchHtmlRegExp.exec(text);
  if (match) {
    var html = "", index, lastIndex = 0;
    for (index = match.index; index < text.length; index++) {
      switch (text.charCodeAt(index)) {
        case 34:
          match = "&quot;";
          break;
        case 38:
          match = "&amp;";
          break;
        case 39:
          match = "&#x27;";
          break;
        case 60:
          match = "&lt;";
          break;
        case 62:
          match = "&gt;";
          break;
        default:
          continue;
      }
      lastIndex !== index && (html += text.slice(lastIndex, index));
      lastIndex = index + 1;
      html += match;
    }
    text = lastIndex !== index ? html + text.slice(lastIndex, index) : html;
  }
  return text;
}
var uppercasePattern = /([A-Z])/g, msPattern = /^ms-/, isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function sanitizeURL(url) {
  return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
}
var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
  pending: false,
  data: null,
  method: null,
  action: null
}, previousDispatcher = ReactDOMSharedInternals.d;
ReactDOMSharedInternals.d = {
  f: previousDispatcher.f,
  r: previousDispatcher.r,
  D: prefetchDNS,
  C: preconnect,
  L: preload,
  m: preloadModule,
  X: preinitScript,
  S: preinitStyle,
  M: preinitModuleScript
};
var PRELOAD_NO_CREDS = [], scriptRegex = /(<\/|<)(s)(cript)/gi;
function scriptReplacer(match, prefix2, s, suffix2) {
  return "" + prefix2 + ("s" === s ? "\\u0073" : "\\u0053") + suffix2;
}
function createResumableState(identifierPrefix, externalRuntimeConfig, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
  return {
    idPrefix: void 0 === identifierPrefix ? "" : identifierPrefix,
    nextFormID: 0,
    streamingFormat: 0,
    bootstrapScriptContent,
    bootstrapScripts,
    bootstrapModules,
    instructions: 0,
    hasBody: false,
    hasHtml: false,
    unknownResources: {},
    dnsResources: {},
    connectResources: { default: {}, anonymous: {}, credentials: {} },
    imageResources: {},
    styleResources: {},
    scriptResources: {},
    moduleUnknownResources: {},
    moduleScriptResources: {}
  };
}
function createFormatContext(insertionMode, selectedValue, tagScope) {
  return {
    insertionMode,
    selectedValue,
    tagScope
  };
}
function getChildFormatContext(parentContext, type, props) {
  switch (type) {
    case "noscript":
      return createFormatContext(2, null, parentContext.tagScope | 1);
    case "select":
      return createFormatContext(
        2,
        null != props.value ? props.value : props.defaultValue,
        parentContext.tagScope
      );
    case "svg":
      return createFormatContext(3, null, parentContext.tagScope);
    case "picture":
      return createFormatContext(2, null, parentContext.tagScope | 2);
    case "math":
      return createFormatContext(4, null, parentContext.tagScope);
    case "foreignObject":
      return createFormatContext(2, null, parentContext.tagScope);
    case "table":
      return createFormatContext(5, null, parentContext.tagScope);
    case "thead":
    case "tbody":
    case "tfoot":
      return createFormatContext(6, null, parentContext.tagScope);
    case "colgroup":
      return createFormatContext(8, null, parentContext.tagScope);
    case "tr":
      return createFormatContext(7, null, parentContext.tagScope);
  }
  return 5 <= parentContext.insertionMode ? createFormatContext(2, null, parentContext.tagScope) : 0 === parentContext.insertionMode ? "html" === type ? createFormatContext(1, null, parentContext.tagScope) : createFormatContext(2, null, parentContext.tagScope) : 1 === parentContext.insertionMode ? createFormatContext(2, null, parentContext.tagScope) : parentContext;
}
var styleNameCache = /* @__PURE__ */ new Map();
function pushStyleAttribute(target, style) {
  if ("object" !== typeof style) throw Error(formatProdErrorMessage(62));
  var isFirst = true, styleName;
  for (styleName in style)
    if (hasOwnProperty.call(style, styleName)) {
      var styleValue = style[styleName];
      if (null != styleValue && "boolean" !== typeof styleValue && "" !== styleValue) {
        if (0 === styleName.indexOf("--")) {
          var nameChunk = escapeTextForBrowser(styleName);
          styleValue = escapeTextForBrowser(("" + styleValue).trim());
        } else
          nameChunk = styleNameCache.get(styleName), void 0 === nameChunk && (nameChunk = escapeTextForBrowser(
            styleName.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-")
          ), styleNameCache.set(styleName, nameChunk)), styleValue = "number" === typeof styleValue ? 0 === styleValue || unitlessNumbers.has(styleName) ? "" + styleValue : styleValue + "px" : escapeTextForBrowser(("" + styleValue).trim());
        isFirst ? (isFirst = false, target.push(' style="', nameChunk, ":", styleValue)) : target.push(";", nameChunk, ":", styleValue);
      }
    }
  isFirst || target.push('"');
}
function pushBooleanAttribute(target, name, value) {
  value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '=""');
}
function pushStringAttribute(target, name, value) {
  "function" !== typeof value && "symbol" !== typeof value && "boolean" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
}
var actionJavaScriptURL = escapeTextForBrowser(
  "javascript:throw new Error('React form unexpectedly submitted.')"
);
function pushAdditionalFormField(value, key) {
  this.push('<input type="hidden"');
  validateAdditionalFormField(value);
  pushStringAttribute(this, "name", key);
  pushStringAttribute(this, "value", value);
  this.push("/>");
}
function validateAdditionalFormField(value) {
  if ("string" !== typeof value) throw Error(formatProdErrorMessage(480));
}
function getCustomFormFields(resumableState, formAction) {
  if ("function" === typeof formAction.$$FORM_ACTION) {
    var id = resumableState.nextFormID++;
    resumableState = resumableState.idPrefix + id;
    try {
      var customFields = formAction.$$FORM_ACTION(resumableState);
      if (customFields) {
        var formData = customFields.data;
        null != formData && formData.forEach(validateAdditionalFormField);
      }
      return customFields;
    } catch (x) {
      if ("object" === typeof x && null !== x && "function" === typeof x.then)
        throw x;
    }
  }
  return null;
}
function pushFormActionAttribute(target, resumableState, renderState, formAction, formEncType, formMethod, formTarget, name) {
  var formData = null;
  if ("function" === typeof formAction) {
    var customFields = getCustomFormFields(resumableState, formAction);
    null !== customFields ? (name = customFields.name, formAction = customFields.action || "", formEncType = customFields.encType, formMethod = customFields.method, formTarget = customFields.target, formData = customFields.data) : (target.push(" ", "formAction", '="', actionJavaScriptURL, '"'), formTarget = formMethod = formEncType = formAction = name = null, injectFormReplayingRuntime(resumableState, renderState));
  }
  null != name && pushAttribute(target, "name", name);
  null != formAction && pushAttribute(target, "formAction", formAction);
  null != formEncType && pushAttribute(target, "formEncType", formEncType);
  null != formMethod && pushAttribute(target, "formMethod", formMethod);
  null != formTarget && pushAttribute(target, "formTarget", formTarget);
  return formData;
}
function pushAttribute(target, name, value) {
  switch (name) {
    case "className":
      pushStringAttribute(target, "class", value);
      break;
    case "tabIndex":
      pushStringAttribute(target, "tabindex", value);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      pushStringAttribute(target, name, value);
      break;
    case "style":
      pushStyleAttribute(target, value);
      break;
    case "src":
    case "href":
      if ("" === value) break;
    case "action":
    case "formAction":
      if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
        break;
      value = sanitizeURL("" + value);
      target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "ref":
      break;
    case "autoFocus":
    case "multiple":
    case "muted":
      pushBooleanAttribute(target, name.toLowerCase(), value);
      break;
    case "xlinkHref":
      if ("function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
        break;
      value = sanitizeURL("" + value);
      target.push(" ", "xlink:href", '="', escapeTextForBrowser(value), '"');
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '=""');
      break;
    case "capture":
    case "download":
      true === value ? target.push(" ", name, '=""') : false !== value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "rowSpan":
    case "start":
      "function" === typeof value || "symbol" === typeof value || isNaN(value) || target.push(" ", name, '="', escapeTextForBrowser(value), '"');
      break;
    case "xlinkActuate":
      pushStringAttribute(target, "xlink:actuate", value);
      break;
    case "xlinkArcrole":
      pushStringAttribute(target, "xlink:arcrole", value);
      break;
    case "xlinkRole":
      pushStringAttribute(target, "xlink:role", value);
      break;
    case "xlinkShow":
      pushStringAttribute(target, "xlink:show", value);
      break;
    case "xlinkTitle":
      pushStringAttribute(target, "xlink:title", value);
      break;
    case "xlinkType":
      pushStringAttribute(target, "xlink:type", value);
      break;
    case "xmlBase":
      pushStringAttribute(target, "xml:base", value);
      break;
    case "xmlLang":
      pushStringAttribute(target, "xml:lang", value);
      break;
    case "xmlSpace":
      pushStringAttribute(target, "xml:space", value);
      break;
    default:
      if (!(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1]) {
        if (name = aliases.get(name) || name, isAttributeNameSafe(name)) {
          switch (typeof value) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var prefix$8 = name.toLowerCase().slice(0, 5);
              if ("data-" !== prefix$8 && "aria-" !== prefix$8) return;
          }
          target.push(" ", name, '="', escapeTextForBrowser(value), '"');
        }
      }
  }
}
function pushInnerHTML(target, innerHTML, children) {
  if (null != innerHTML) {
    if (null != children) throw Error(formatProdErrorMessage(60));
    if ("object" !== typeof innerHTML || !("__html" in innerHTML))
      throw Error(formatProdErrorMessage(61));
    innerHTML = innerHTML.__html;
    null !== innerHTML && void 0 !== innerHTML && target.push("" + innerHTML);
  }
}
function flattenOptionChildren(children) {
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
function injectFormReplayingRuntime(resumableState, renderState) {
  0 === (resumableState.instructions & 16) && (resumableState.instructions |= 16, renderState.bootstrapChunks.unshift(
    renderState.startInlineScript,
    `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`,
    "<\/script>"
  ));
}
function pushLinkImpl(target, props) {
  target.push(startChunkForTag("link"));
  for (var propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(formatProdErrorMessage(399, "link"));
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push("/>");
  return null;
}
var styleRegex = /(<\/|<)(s)(tyle)/gi;
function styleReplacer(match, prefix2, s, suffix2) {
  return "" + prefix2 + ("s" === s ? "\\73 " : "\\53 ") + suffix2;
}
function pushSelfClosing(target, props, tag) {
  target.push(startChunkForTag(tag));
  for (var propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(formatProdErrorMessage(399, tag));
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push("/>");
  return null;
}
function pushTitleImpl(target, props) {
  target.push(startChunkForTag("title"));
  var children = null, innerHTML = null, propKey;
  for (propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            children = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push(">");
  props = Array.isArray(children) ? 2 > children.length ? children[0] : null : children;
  "function" !== typeof props && "symbol" !== typeof props && null !== props && void 0 !== props && target.push(escapeTextForBrowser("" + props));
  pushInnerHTML(target, innerHTML, children);
  target.push(endChunkForTag("title"));
  return null;
}
function pushScriptImpl(target, props) {
  target.push(startChunkForTag("script"));
  var children = null, innerHTML = null, propKey;
  for (propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            children = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push(">");
  pushInnerHTML(target, innerHTML, children);
  "string" === typeof children && target.push(("" + children).replace(scriptRegex, scriptReplacer));
  target.push(endChunkForTag("script"));
  return null;
}
function pushStartGenericElement(target, props, tag) {
  target.push(startChunkForTag(tag));
  var innerHTML = tag = null, propKey;
  for (propKey in props)
    if (hasOwnProperty.call(props, propKey)) {
      var propValue = props[propKey];
      if (null != propValue)
        switch (propKey) {
          case "children":
            tag = propValue;
            break;
          case "dangerouslySetInnerHTML":
            innerHTML = propValue;
            break;
          default:
            pushAttribute(target, propKey, propValue);
        }
    }
  target.push(">");
  pushInnerHTML(target, innerHTML, tag);
  return "string" === typeof tag ? (target.push(escapeTextForBrowser(tag)), null) : tag;
}
var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, validatedTagCache = /* @__PURE__ */ new Map();
function startChunkForTag(tag) {
  var tagStartChunk = validatedTagCache.get(tag);
  if (void 0 === tagStartChunk) {
    if (!VALID_TAG_REGEX.test(tag))
      throw Error(formatProdErrorMessage(65, tag));
    tagStartChunk = "<" + tag;
    validatedTagCache.set(tag, tagStartChunk);
  }
  return tagStartChunk;
}
function pushStartInstance(target$jscomp$0, type, props, resumableState, renderState, hoistableState, formatContext, textEmbedded, isFallback) {
  switch (type) {
    case "div":
    case "span":
    case "svg":
    case "path":
      break;
    case "a":
      target$jscomp$0.push(startChunkForTag("a"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              case "href":
                "" === propValue ? pushStringAttribute(target$jscomp$0, "href", "") : pushAttribute(target$jscomp$0, propKey, propValue);
                break;
              default:
                pushAttribute(target$jscomp$0, propKey, propValue);
            }
        }
      target$jscomp$0.push(">");
      pushInnerHTML(target$jscomp$0, innerHTML, children);
      if ("string" === typeof children) {
        target$jscomp$0.push(escapeTextForBrowser(children));
        var JSCompiler_inline_result = null;
      } else JSCompiler_inline_result = children;
      return JSCompiler_inline_result;
    case "g":
    case "p":
    case "li":
      break;
    case "select":
      target$jscomp$0.push(startChunkForTag("select"));
      var children$jscomp$0 = null, innerHTML$jscomp$0 = null, propKey$jscomp$0;
      for (propKey$jscomp$0 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$0)) {
          var propValue$jscomp$0 = props[propKey$jscomp$0];
          if (null != propValue$jscomp$0)
            switch (propKey$jscomp$0) {
              case "children":
                children$jscomp$0 = propValue$jscomp$0;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$0 = propValue$jscomp$0;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$0,
                  propValue$jscomp$0
                );
            }
        }
      target$jscomp$0.push(">");
      pushInnerHTML(target$jscomp$0, innerHTML$jscomp$0, children$jscomp$0);
      return children$jscomp$0;
    case "option":
      var selectedValue = formatContext.selectedValue;
      target$jscomp$0.push(startChunkForTag("option"));
      var children$jscomp$1 = null, value = null, selected = null, innerHTML$jscomp$1 = null, propKey$jscomp$1;
      for (propKey$jscomp$1 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$1)) {
          var propValue$jscomp$1 = props[propKey$jscomp$1];
          if (null != propValue$jscomp$1)
            switch (propKey$jscomp$1) {
              case "children":
                children$jscomp$1 = propValue$jscomp$1;
                break;
              case "selected":
                selected = propValue$jscomp$1;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$1 = propValue$jscomp$1;
                break;
              case "value":
                value = propValue$jscomp$1;
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$1,
                  propValue$jscomp$1
                );
            }
        }
      if (null != selectedValue) {
        var stringValue = null !== value ? "" + value : flattenOptionChildren(children$jscomp$1);
        if (isArrayImpl(selectedValue))
          for (var i = 0; i < selectedValue.length; i++) {
            if ("" + selectedValue[i] === stringValue) {
              target$jscomp$0.push(' selected=""');
              break;
            }
          }
        else
          "" + selectedValue === stringValue && target$jscomp$0.push(' selected=""');
      } else selected && target$jscomp$0.push(' selected=""');
      target$jscomp$0.push(">");
      pushInnerHTML(target$jscomp$0, innerHTML$jscomp$1, children$jscomp$1);
      return children$jscomp$1;
    case "textarea":
      target$jscomp$0.push(startChunkForTag("textarea"));
      var value$jscomp$0 = null, defaultValue = null, children$jscomp$2 = null, propKey$jscomp$2;
      for (propKey$jscomp$2 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$2)) {
          var propValue$jscomp$2 = props[propKey$jscomp$2];
          if (null != propValue$jscomp$2)
            switch (propKey$jscomp$2) {
              case "children":
                children$jscomp$2 = propValue$jscomp$2;
                break;
              case "value":
                value$jscomp$0 = propValue$jscomp$2;
                break;
              case "defaultValue":
                defaultValue = propValue$jscomp$2;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(91));
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$2,
                  propValue$jscomp$2
                );
            }
        }
      null === value$jscomp$0 && null !== defaultValue && (value$jscomp$0 = defaultValue);
      target$jscomp$0.push(">");
      if (null != children$jscomp$2) {
        if (null != value$jscomp$0) throw Error(formatProdErrorMessage(92));
        if (isArrayImpl(children$jscomp$2)) {
          if (1 < children$jscomp$2.length)
            throw Error(formatProdErrorMessage(93));
          value$jscomp$0 = "" + children$jscomp$2[0];
        }
        value$jscomp$0 = "" + children$jscomp$2;
      }
      "string" === typeof value$jscomp$0 && "\n" === value$jscomp$0[0] && target$jscomp$0.push("\n");
      null !== value$jscomp$0 && target$jscomp$0.push(escapeTextForBrowser("" + value$jscomp$0));
      return null;
    case "input":
      target$jscomp$0.push(startChunkForTag("input"));
      var name = null, formAction = null, formEncType = null, formMethod = null, formTarget = null, value$jscomp$1 = null, defaultValue$jscomp$0 = null, checked = null, defaultChecked = null, propKey$jscomp$3;
      for (propKey$jscomp$3 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$3)) {
          var propValue$jscomp$3 = props[propKey$jscomp$3];
          if (null != propValue$jscomp$3)
            switch (propKey$jscomp$3) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(399, "input"));
              case "name":
                name = propValue$jscomp$3;
                break;
              case "formAction":
                formAction = propValue$jscomp$3;
                break;
              case "formEncType":
                formEncType = propValue$jscomp$3;
                break;
              case "formMethod":
                formMethod = propValue$jscomp$3;
                break;
              case "formTarget":
                formTarget = propValue$jscomp$3;
                break;
              case "defaultChecked":
                defaultChecked = propValue$jscomp$3;
                break;
              case "defaultValue":
                defaultValue$jscomp$0 = propValue$jscomp$3;
                break;
              case "checked":
                checked = propValue$jscomp$3;
                break;
              case "value":
                value$jscomp$1 = propValue$jscomp$3;
                break;
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$3,
                  propValue$jscomp$3
                );
            }
        }
      var formData = pushFormActionAttribute(
        target$jscomp$0,
        resumableState,
        renderState,
        formAction,
        formEncType,
        formMethod,
        formTarget,
        name
      );
      null !== checked ? pushBooleanAttribute(target$jscomp$0, "checked", checked) : null !== defaultChecked && pushBooleanAttribute(target$jscomp$0, "checked", defaultChecked);
      null !== value$jscomp$1 ? pushAttribute(target$jscomp$0, "value", value$jscomp$1) : null !== defaultValue$jscomp$0 && pushAttribute(target$jscomp$0, "value", defaultValue$jscomp$0);
      target$jscomp$0.push("/>");
      null != formData && formData.forEach(pushAdditionalFormField, target$jscomp$0);
      return null;
    case "button":
      target$jscomp$0.push(startChunkForTag("button"));
      var children$jscomp$3 = null, innerHTML$jscomp$2 = null, name$jscomp$0 = null, formAction$jscomp$0 = null, formEncType$jscomp$0 = null, formMethod$jscomp$0 = null, formTarget$jscomp$0 = null, propKey$jscomp$4;
      for (propKey$jscomp$4 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$4)) {
          var propValue$jscomp$4 = props[propKey$jscomp$4];
          if (null != propValue$jscomp$4)
            switch (propKey$jscomp$4) {
              case "children":
                children$jscomp$3 = propValue$jscomp$4;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$2 = propValue$jscomp$4;
                break;
              case "name":
                name$jscomp$0 = propValue$jscomp$4;
                break;
              case "formAction":
                formAction$jscomp$0 = propValue$jscomp$4;
                break;
              case "formEncType":
                formEncType$jscomp$0 = propValue$jscomp$4;
                break;
              case "formMethod":
                formMethod$jscomp$0 = propValue$jscomp$4;
                break;
              case "formTarget":
                formTarget$jscomp$0 = propValue$jscomp$4;
                break;
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$4,
                  propValue$jscomp$4
                );
            }
        }
      var formData$jscomp$0 = pushFormActionAttribute(
        target$jscomp$0,
        resumableState,
        renderState,
        formAction$jscomp$0,
        formEncType$jscomp$0,
        formMethod$jscomp$0,
        formTarget$jscomp$0,
        name$jscomp$0
      );
      target$jscomp$0.push(">");
      null != formData$jscomp$0 && formData$jscomp$0.forEach(pushAdditionalFormField, target$jscomp$0);
      pushInnerHTML(target$jscomp$0, innerHTML$jscomp$2, children$jscomp$3);
      if ("string" === typeof children$jscomp$3) {
        target$jscomp$0.push(escapeTextForBrowser(children$jscomp$3));
        var JSCompiler_inline_result$jscomp$0 = null;
      } else JSCompiler_inline_result$jscomp$0 = children$jscomp$3;
      return JSCompiler_inline_result$jscomp$0;
    case "form":
      target$jscomp$0.push(startChunkForTag("form"));
      var children$jscomp$4 = null, innerHTML$jscomp$3 = null, formAction$jscomp$1 = null, formEncType$jscomp$1 = null, formMethod$jscomp$1 = null, formTarget$jscomp$1 = null, propKey$jscomp$5;
      for (propKey$jscomp$5 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$5)) {
          var propValue$jscomp$5 = props[propKey$jscomp$5];
          if (null != propValue$jscomp$5)
            switch (propKey$jscomp$5) {
              case "children":
                children$jscomp$4 = propValue$jscomp$5;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$3 = propValue$jscomp$5;
                break;
              case "action":
                formAction$jscomp$1 = propValue$jscomp$5;
                break;
              case "encType":
                formEncType$jscomp$1 = propValue$jscomp$5;
                break;
              case "method":
                formMethod$jscomp$1 = propValue$jscomp$5;
                break;
              case "target":
                formTarget$jscomp$1 = propValue$jscomp$5;
                break;
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$5,
                  propValue$jscomp$5
                );
            }
        }
      var formData$jscomp$1 = null, formActionName = null;
      if ("function" === typeof formAction$jscomp$1) {
        var customFields = getCustomFormFields(
          resumableState,
          formAction$jscomp$1
        );
        null !== customFields ? (formAction$jscomp$1 = customFields.action || "", formEncType$jscomp$1 = customFields.encType, formMethod$jscomp$1 = customFields.method, formTarget$jscomp$1 = customFields.target, formData$jscomp$1 = customFields.data, formActionName = customFields.name) : (target$jscomp$0.push(
          " ",
          "action",
          '="',
          actionJavaScriptURL,
          '"'
        ), formTarget$jscomp$1 = formMethod$jscomp$1 = formEncType$jscomp$1 = formAction$jscomp$1 = null, injectFormReplayingRuntime(resumableState, renderState));
      }
      null != formAction$jscomp$1 && pushAttribute(target$jscomp$0, "action", formAction$jscomp$1);
      null != formEncType$jscomp$1 && pushAttribute(target$jscomp$0, "encType", formEncType$jscomp$1);
      null != formMethod$jscomp$1 && pushAttribute(target$jscomp$0, "method", formMethod$jscomp$1);
      null != formTarget$jscomp$1 && pushAttribute(target$jscomp$0, "target", formTarget$jscomp$1);
      target$jscomp$0.push(">");
      null !== formActionName && (target$jscomp$0.push('<input type="hidden"'), pushStringAttribute(target$jscomp$0, "name", formActionName), target$jscomp$0.push("/>"), null != formData$jscomp$1 && formData$jscomp$1.forEach(pushAdditionalFormField, target$jscomp$0));
      pushInnerHTML(target$jscomp$0, innerHTML$jscomp$3, children$jscomp$4);
      if ("string" === typeof children$jscomp$4) {
        target$jscomp$0.push(escapeTextForBrowser(children$jscomp$4));
        var JSCompiler_inline_result$jscomp$1 = null;
      } else JSCompiler_inline_result$jscomp$1 = children$jscomp$4;
      return JSCompiler_inline_result$jscomp$1;
    case "menuitem":
      target$jscomp$0.push(startChunkForTag("menuitem"));
      for (var propKey$jscomp$6 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$6)) {
          var propValue$jscomp$6 = props[propKey$jscomp$6];
          if (null != propValue$jscomp$6)
            switch (propKey$jscomp$6) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(400));
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$6,
                  propValue$jscomp$6
                );
            }
        }
      target$jscomp$0.push(">");
      return null;
    case "object":
      target$jscomp$0.push(startChunkForTag("object"));
      var children$jscomp$5 = null, innerHTML$jscomp$4 = null, propKey$jscomp$7;
      for (propKey$jscomp$7 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$7)) {
          var propValue$jscomp$7 = props[propKey$jscomp$7];
          if (null != propValue$jscomp$7)
            switch (propKey$jscomp$7) {
              case "children":
                children$jscomp$5 = propValue$jscomp$7;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$4 = propValue$jscomp$7;
                break;
              case "data":
                var sanitizedValue = sanitizeURL("" + propValue$jscomp$7);
                if ("" === sanitizedValue) break;
                target$jscomp$0.push(
                  " ",
                  "data",
                  '="',
                  escapeTextForBrowser(sanitizedValue),
                  '"'
                );
                break;
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$7,
                  propValue$jscomp$7
                );
            }
        }
      target$jscomp$0.push(">");
      pushInnerHTML(target$jscomp$0, innerHTML$jscomp$4, children$jscomp$5);
      if ("string" === typeof children$jscomp$5) {
        target$jscomp$0.push(escapeTextForBrowser(children$jscomp$5));
        var JSCompiler_inline_result$jscomp$2 = null;
      } else JSCompiler_inline_result$jscomp$2 = children$jscomp$5;
      return JSCompiler_inline_result$jscomp$2;
    case "title":
      if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
        var JSCompiler_inline_result$jscomp$3 = pushTitleImpl(
          target$jscomp$0,
          props
        );
      else
        isFallback ? JSCompiler_inline_result$jscomp$3 = null : (pushTitleImpl(renderState.hoistableChunks, props), JSCompiler_inline_result$jscomp$3 = void 0);
      return JSCompiler_inline_result$jscomp$3;
    case "link":
      var rel = props.rel, href = props.href, precedence = props.precedence;
      if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp || "string" !== typeof rel || "string" !== typeof href || "" === href) {
        pushLinkImpl(target$jscomp$0, props);
        var JSCompiler_inline_result$jscomp$4 = null;
      } else if ("stylesheet" === props.rel)
        if ("string" !== typeof precedence || null != props.disabled || props.onLoad || props.onError)
          JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
            target$jscomp$0,
            props
          );
        else {
          var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
          if (null !== resourceState) {
            resumableState.styleResources[href] = null;
            styleQueue || (styleQueue = {
              precedence: escapeTextForBrowser(precedence),
              rules: [],
              hrefs: [],
              sheets: /* @__PURE__ */ new Map()
            }, renderState.styles.set(precedence, styleQueue));
            var resource = {
              state: 0,
              props: assign({}, props, {
                "data-precedence": props.precedence,
                precedence: null
              })
            };
            if (resourceState) {
              2 === resourceState.length && adoptPreloadCredentials(resource.props, resourceState);
              var preloadResource = renderState.preloads.stylesheets.get(href);
              preloadResource && 0 < preloadResource.length ? preloadResource.length = 0 : resource.state = 1;
            }
            styleQueue.sheets.set(href, resource);
            hoistableState && hoistableState.stylesheets.add(resource);
          } else if (styleQueue) {
            var resource$9 = styleQueue.sheets.get(href);
            resource$9 && hoistableState && hoistableState.stylesheets.add(resource$9);
          }
          textEmbedded && target$jscomp$0.push("<!-- -->");
          JSCompiler_inline_result$jscomp$4 = null;
        }
      else
        props.onLoad || props.onError ? JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
          target$jscomp$0,
          props
        ) : (textEmbedded && target$jscomp$0.push("<!-- -->"), JSCompiler_inline_result$jscomp$4 = isFallback ? null : pushLinkImpl(renderState.hoistableChunks, props));
      return JSCompiler_inline_result$jscomp$4;
    case "script":
      var asyncProp = props.async;
      if ("string" !== typeof props.src || !props.src || !asyncProp || "function" === typeof asyncProp || "symbol" === typeof asyncProp || props.onLoad || props.onError || 3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
        var JSCompiler_inline_result$jscomp$5 = pushScriptImpl(
          target$jscomp$0,
          props
        );
      else {
        var key = props.src;
        if ("module" === props.type) {
          var resources = resumableState.moduleScriptResources;
          var preloads = renderState.preloads.moduleScripts;
        } else
          resources = resumableState.scriptResources, preloads = renderState.preloads.scripts;
        var resourceState$jscomp$0 = resources.hasOwnProperty(key) ? resources[key] : void 0;
        if (null !== resourceState$jscomp$0) {
          resources[key] = null;
          var scriptProps = props;
          if (resourceState$jscomp$0) {
            2 === resourceState$jscomp$0.length && (scriptProps = assign({}, props), adoptPreloadCredentials(scriptProps, resourceState$jscomp$0));
            var preloadResource$jscomp$0 = preloads.get(key);
            preloadResource$jscomp$0 && (preloadResource$jscomp$0.length = 0);
          }
          var resource$jscomp$0 = [];
          renderState.scripts.add(resource$jscomp$0);
          pushScriptImpl(resource$jscomp$0, scriptProps);
        }
        textEmbedded && target$jscomp$0.push("<!-- -->");
        JSCompiler_inline_result$jscomp$5 = null;
      }
      return JSCompiler_inline_result$jscomp$5;
    case "style":
      var precedence$jscomp$0 = props.precedence, href$jscomp$0 = props.href;
      if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp || "string" !== typeof precedence$jscomp$0 || "string" !== typeof href$jscomp$0 || "" === href$jscomp$0) {
        target$jscomp$0.push(startChunkForTag("style"));
        var children$jscomp$6 = null, innerHTML$jscomp$5 = null, propKey$jscomp$8;
        for (propKey$jscomp$8 in props)
          if (hasOwnProperty.call(props, propKey$jscomp$8)) {
            var propValue$jscomp$8 = props[propKey$jscomp$8];
            if (null != propValue$jscomp$8)
              switch (propKey$jscomp$8) {
                case "children":
                  children$jscomp$6 = propValue$jscomp$8;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML$jscomp$5 = propValue$jscomp$8;
                  break;
                default:
                  pushAttribute(
                    target$jscomp$0,
                    propKey$jscomp$8,
                    propValue$jscomp$8
                  );
              }
          }
        target$jscomp$0.push(">");
        var child = Array.isArray(children$jscomp$6) ? 2 > children$jscomp$6.length ? children$jscomp$6[0] : null : children$jscomp$6;
        "function" !== typeof child && "symbol" !== typeof child && null !== child && void 0 !== child && target$jscomp$0.push(("" + child).replace(styleRegex, styleReplacer));
        pushInnerHTML(target$jscomp$0, innerHTML$jscomp$5, children$jscomp$6);
        target$jscomp$0.push(endChunkForTag("style"));
        var JSCompiler_inline_result$jscomp$6 = null;
      } else {
        var styleQueue$jscomp$0 = renderState.styles.get(precedence$jscomp$0);
        if (null !== (resumableState.styleResources.hasOwnProperty(href$jscomp$0) ? resumableState.styleResources[href$jscomp$0] : void 0)) {
          resumableState.styleResources[href$jscomp$0] = null;
          styleQueue$jscomp$0 ? styleQueue$jscomp$0.hrefs.push(
            escapeTextForBrowser(href$jscomp$0)
          ) : (styleQueue$jscomp$0 = {
            precedence: escapeTextForBrowser(precedence$jscomp$0),
            rules: [],
            hrefs: [escapeTextForBrowser(href$jscomp$0)],
            sheets: /* @__PURE__ */ new Map()
          }, renderState.styles.set(precedence$jscomp$0, styleQueue$jscomp$0));
          var target = styleQueue$jscomp$0.rules, children$jscomp$7 = null, innerHTML$jscomp$6 = null, propKey$jscomp$9;
          for (propKey$jscomp$9 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$9)) {
              var propValue$jscomp$9 = props[propKey$jscomp$9];
              if (null != propValue$jscomp$9)
                switch (propKey$jscomp$9) {
                  case "children":
                    children$jscomp$7 = propValue$jscomp$9;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$6 = propValue$jscomp$9;
                }
            }
          var child$jscomp$0 = Array.isArray(children$jscomp$7) ? 2 > children$jscomp$7.length ? children$jscomp$7[0] : null : children$jscomp$7;
          "function" !== typeof child$jscomp$0 && "symbol" !== typeof child$jscomp$0 && null !== child$jscomp$0 && void 0 !== child$jscomp$0 && target.push(
            ("" + child$jscomp$0).replace(styleRegex, styleReplacer)
          );
          pushInnerHTML(target, innerHTML$jscomp$6, children$jscomp$7);
        }
        styleQueue$jscomp$0 && hoistableState && hoistableState.styles.add(styleQueue$jscomp$0);
        textEmbedded && target$jscomp$0.push("<!-- -->");
        JSCompiler_inline_result$jscomp$6 = void 0;
      }
      return JSCompiler_inline_result$jscomp$6;
    case "meta":
      if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
        var JSCompiler_inline_result$jscomp$7 = pushSelfClosing(
          target$jscomp$0,
          props,
          "meta"
        );
      else
        textEmbedded && target$jscomp$0.push("<!-- -->"), JSCompiler_inline_result$jscomp$7 = isFallback ? null : "string" === typeof props.charSet ? pushSelfClosing(renderState.charsetChunks, props, "meta") : "viewport" === props.name ? pushSelfClosing(renderState.viewportChunks, props, "meta") : pushSelfClosing(renderState.hoistableChunks, props, "meta");
      return JSCompiler_inline_result$jscomp$7;
    case "listing":
    case "pre":
      target$jscomp$0.push(startChunkForTag(type));
      var children$jscomp$8 = null, innerHTML$jscomp$7 = null, propKey$jscomp$10;
      for (propKey$jscomp$10 in props)
        if (hasOwnProperty.call(props, propKey$jscomp$10)) {
          var propValue$jscomp$10 = props[propKey$jscomp$10];
          if (null != propValue$jscomp$10)
            switch (propKey$jscomp$10) {
              case "children":
                children$jscomp$8 = propValue$jscomp$10;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML$jscomp$7 = propValue$jscomp$10;
                break;
              default:
                pushAttribute(
                  target$jscomp$0,
                  propKey$jscomp$10,
                  propValue$jscomp$10
                );
            }
        }
      target$jscomp$0.push(">");
      if (null != innerHTML$jscomp$7) {
        if (null != children$jscomp$8) throw Error(formatProdErrorMessage(60));
        if ("object" !== typeof innerHTML$jscomp$7 || !("__html" in innerHTML$jscomp$7))
          throw Error(formatProdErrorMessage(61));
        var html = innerHTML$jscomp$7.__html;
        null !== html && void 0 !== html && ("string" === typeof html && 0 < html.length && "\n" === html[0] ? target$jscomp$0.push("\n", html) : target$jscomp$0.push("" + html));
      }
      "string" === typeof children$jscomp$8 && "\n" === children$jscomp$8[0] && target$jscomp$0.push("\n");
      return children$jscomp$8;
    case "img":
      var src = props.src, srcSet = props.srcSet;
      if (!("lazy" === props.loading || !src && !srcSet || "string" !== typeof src && null != src || "string" !== typeof srcSet && null != srcSet) && "low" !== props.fetchPriority && false === !!(formatContext.tagScope & 3) && ("string" !== typeof src || ":" !== src[4] || "d" !== src[0] && "D" !== src[0] || "a" !== src[1] && "A" !== src[1] || "t" !== src[2] && "T" !== src[2] || "a" !== src[3] && "A" !== src[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
        var sizes = "string" === typeof props.sizes ? props.sizes : void 0, key$jscomp$0 = srcSet ? srcSet + "\n" + (sizes || "") : src, promotablePreloads = renderState.preloads.images, resource$jscomp$1 = promotablePreloads.get(key$jscomp$0);
        if (resource$jscomp$1) {
          if ("high" === props.fetchPriority || 10 > renderState.highImagePreloads.size)
            promotablePreloads.delete(key$jscomp$0), renderState.highImagePreloads.add(resource$jscomp$1);
        } else if (!resumableState.imageResources.hasOwnProperty(key$jscomp$0)) {
          resumableState.imageResources[key$jscomp$0] = PRELOAD_NO_CREDS;
          var input = props.crossOrigin;
          var JSCompiler_inline_result$jscomp$8 = "string" === typeof input ? "use-credentials" === input ? input : "" : void 0;
          var headers = renderState.headers, header;
          headers && 0 < headers.remainingCapacity && ("high" === props.fetchPriority || 500 > headers.highImagePreloads.length) && (header = getPreloadAsHeader(src, "image", {
            imageSrcSet: props.srcSet,
            imageSizes: props.sizes,
            crossOrigin: JSCompiler_inline_result$jscomp$8,
            integrity: props.integrity,
            nonce: props.nonce,
            type: props.type,
            fetchPriority: props.fetchPriority,
            referrerPolicy: props.refererPolicy
          }), 0 <= (headers.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key$jscomp$0] = PRELOAD_NO_CREDS, headers.highImagePreloads && (headers.highImagePreloads += ", "), headers.highImagePreloads += header) : (resource$jscomp$1 = [], pushLinkImpl(resource$jscomp$1, {
            rel: "preload",
            as: "image",
            href: srcSet ? void 0 : src,
            imageSrcSet: srcSet,
            imageSizes: sizes,
            crossOrigin: JSCompiler_inline_result$jscomp$8,
            integrity: props.integrity,
            type: props.type,
            fetchPriority: props.fetchPriority,
            referrerPolicy: props.referrerPolicy
          }), "high" === props.fetchPriority || 10 > renderState.highImagePreloads.size ? renderState.highImagePreloads.add(resource$jscomp$1) : (renderState.bulkPreloads.add(resource$jscomp$1), promotablePreloads.set(key$jscomp$0, resource$jscomp$1)));
        }
      }
      return pushSelfClosing(target$jscomp$0, props, "img");
    case "base":
    case "area":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return pushSelfClosing(target$jscomp$0, props, type);
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      break;
    case "head":
      if (2 > formatContext.insertionMode && null === renderState.headChunks) {
        renderState.headChunks = [];
        var JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
          renderState.headChunks,
          props,
          "head"
        );
      } else
        JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
          target$jscomp$0,
          props,
          "head"
        );
      return JSCompiler_inline_result$jscomp$9;
    case "html":
      if (0 === formatContext.insertionMode && null === renderState.htmlChunks) {
        renderState.htmlChunks = [""];
        var JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
          renderState.htmlChunks,
          props,
          "html"
        );
      } else
        JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
          target$jscomp$0,
          props,
          "html"
        );
      return JSCompiler_inline_result$jscomp$10;
    default:
      if (-1 !== type.indexOf("-")) {
        target$jscomp$0.push(startChunkForTag(type));
        var children$jscomp$9 = null, innerHTML$jscomp$8 = null, propKey$jscomp$11;
        for (propKey$jscomp$11 in props)
          if (hasOwnProperty.call(props, propKey$jscomp$11)) {
            var propValue$jscomp$11 = props[propKey$jscomp$11];
            if (null != propValue$jscomp$11) {
              var attributeName = propKey$jscomp$11;
              switch (propKey$jscomp$11) {
                case "children":
                  children$jscomp$9 = propValue$jscomp$11;
                  break;
                case "dangerouslySetInnerHTML":
                  innerHTML$jscomp$8 = propValue$jscomp$11;
                  break;
                case "style":
                  pushStyleAttribute(target$jscomp$0, propValue$jscomp$11);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "ref":
                  break;
                case "className":
                  attributeName = "class";
                default:
                  if (isAttributeNameSafe(propKey$jscomp$11) && "function" !== typeof propValue$jscomp$11 && "symbol" !== typeof propValue$jscomp$11 && false !== propValue$jscomp$11) {
                    if (true === propValue$jscomp$11) propValue$jscomp$11 = "";
                    else if ("object" === typeof propValue$jscomp$11) continue;
                    target$jscomp$0.push(
                      " ",
                      attributeName,
                      '="',
                      escapeTextForBrowser(propValue$jscomp$11),
                      '"'
                    );
                  }
              }
            }
          }
        target$jscomp$0.push(">");
        pushInnerHTML(target$jscomp$0, innerHTML$jscomp$8, children$jscomp$9);
        return children$jscomp$9;
      }
  }
  return pushStartGenericElement(target$jscomp$0, props, type);
}
var endTagCache = /* @__PURE__ */ new Map();
function endChunkForTag(tag) {
  var chunk = endTagCache.get(tag);
  void 0 === chunk && (chunk = "</" + tag + ">", endTagCache.set(tag, chunk));
  return chunk;
}
function writeBootstrap(destination, renderState) {
  renderState = renderState.bootstrapChunks;
  for (var i = 0; i < renderState.length - 1; i++)
    destination.push(renderState[i]);
  return i < renderState.length ? (i = renderState[i], renderState.length = 0, destination.push(i)) : true;
}
function writeStartPendingSuspenseBoundary(destination, renderState, id) {
  destination.push('<!--$?--><template id="');
  if (null === id) throw Error(formatProdErrorMessage(395));
  destination.push(renderState.boundaryPrefix);
  renderState = id.toString(16);
  destination.push(renderState);
  return destination.push('"></template>');
}
function writeStartSegment(destination, renderState, formatContext, id) {
  switch (formatContext.insertionMode) {
    case 0:
    case 1:
    case 2:
      return destination.push('<div hidden id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
    case 3:
      return destination.push('<svg aria-hidden="true" style="display:none" id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
    case 4:
      return destination.push('<math aria-hidden="true" style="display:none" id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
    case 5:
      return destination.push('<table hidden id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
    case 6:
      return destination.push('<table hidden><tbody id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
    case 7:
      return destination.push('<table hidden><tr id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
    case 8:
      return destination.push('<table hidden><colgroup id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
    default:
      throw Error(formatProdErrorMessage(397));
  }
}
function writeEndSegment(destination, formatContext) {
  switch (formatContext.insertionMode) {
    case 0:
    case 1:
    case 2:
      return destination.push("</div>");
    case 3:
      return destination.push("</svg>");
    case 4:
      return destination.push("</math>");
    case 5:
      return destination.push("</table>");
    case 6:
      return destination.push("</tbody></table>");
    case 7:
      return destination.push("</tr></table>");
    case 8:
      return destination.push("</colgroup></table>");
    default:
      throw Error(formatProdErrorMessage(397));
  }
}
var regexForJSStringsInInstructionScripts = /[<\u2028\u2029]/g;
function escapeJSStringsForInstructionScripts(input) {
  return JSON.stringify(input).replace(
    regexForJSStringsInInstructionScripts,
    function(match) {
      switch (match) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
  );
}
var regexForJSStringsInScripts = /[&><\u2028\u2029]/g;
function escapeJSObjectForInstructionScripts(input) {
  return JSON.stringify(input).replace(
    regexForJSStringsInScripts,
    function(match) {
      switch (match) {
        case "&":
          return "\\u0026";
        case ">":
          return "\\u003e";
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
  );
}
var currentlyRenderingBoundaryHasStylesToHoist = false, destinationHasCapacity = true;
function flushStyleTagsLateForBoundary(styleQueue) {
  var rules = styleQueue.rules, hrefs = styleQueue.hrefs, i = 0;
  if (hrefs.length) {
    this.push('<style media="not all" data-precedence="');
    this.push(styleQueue.precedence);
    for (this.push('" data-href="'); i < hrefs.length - 1; i++)
      this.push(hrefs[i]), this.push(" ");
    this.push(hrefs[i]);
    this.push('">');
    for (i = 0; i < rules.length; i++) this.push(rules[i]);
    destinationHasCapacity = this.push("</style>");
    currentlyRenderingBoundaryHasStylesToHoist = true;
    rules.length = 0;
    hrefs.length = 0;
  }
}
function hasStylesToHoist(stylesheet2) {
  return 2 !== stylesheet2.state ? currentlyRenderingBoundaryHasStylesToHoist = true : false;
}
function writeHoistablesForBoundary(destination, hoistableState, renderState) {
  currentlyRenderingBoundaryHasStylesToHoist = false;
  destinationHasCapacity = true;
  hoistableState.styles.forEach(flushStyleTagsLateForBoundary, destination);
  hoistableState.stylesheets.forEach(hasStylesToHoist);
  currentlyRenderingBoundaryHasStylesToHoist && (renderState.stylesToHoist = true);
  return destinationHasCapacity;
}
function flushResource(resource) {
  for (var i = 0; i < resource.length; i++) this.push(resource[i]);
  resource.length = 0;
}
var stylesheetFlushingQueue = [];
function flushStyleInPreamble(stylesheet2) {
  pushLinkImpl(stylesheetFlushingQueue, stylesheet2.props);
  for (var i = 0; i < stylesheetFlushingQueue.length; i++)
    this.push(stylesheetFlushingQueue[i]);
  stylesheetFlushingQueue.length = 0;
  stylesheet2.state = 2;
}
function flushStylesInPreamble(styleQueue) {
  var hasStylesheets = 0 < styleQueue.sheets.size;
  styleQueue.sheets.forEach(flushStyleInPreamble, this);
  styleQueue.sheets.clear();
  var rules = styleQueue.rules, hrefs = styleQueue.hrefs;
  if (!hasStylesheets || hrefs.length) {
    this.push('<style data-precedence="');
    this.push(styleQueue.precedence);
    styleQueue = 0;
    if (hrefs.length) {
      for (this.push('" data-href="'); styleQueue < hrefs.length - 1; styleQueue++)
        this.push(hrefs[styleQueue]), this.push(" ");
      this.push(hrefs[styleQueue]);
    }
    this.push('">');
    for (styleQueue = 0; styleQueue < rules.length; styleQueue++)
      this.push(rules[styleQueue]);
    this.push("</style>");
    rules.length = 0;
    hrefs.length = 0;
  }
}
function preloadLateStyle(stylesheet2) {
  if (0 === stylesheet2.state) {
    stylesheet2.state = 1;
    var props = stylesheet2.props;
    pushLinkImpl(stylesheetFlushingQueue, {
      rel: "preload",
      as: "style",
      href: stylesheet2.props.href,
      crossOrigin: props.crossOrigin,
      fetchPriority: props.fetchPriority,
      integrity: props.integrity,
      media: props.media,
      hrefLang: props.hrefLang,
      referrerPolicy: props.referrerPolicy
    });
    for (stylesheet2 = 0; stylesheet2 < stylesheetFlushingQueue.length; stylesheet2++)
      this.push(stylesheetFlushingQueue[stylesheet2]);
    stylesheetFlushingQueue.length = 0;
  }
}
function preloadLateStyles(styleQueue) {
  styleQueue.sheets.forEach(preloadLateStyle, this);
  styleQueue.sheets.clear();
}
function writeStyleResourceDependenciesInJS(destination, hoistableState) {
  destination.push("[");
  var nextArrayOpenBrackChunk = "[";
  hoistableState.stylesheets.forEach(function(resource) {
    if (2 !== resource.state)
      if (3 === resource.state)
        destination.push(nextArrayOpenBrackChunk), resource = escapeJSObjectForInstructionScripts(
          "" + resource.props.href
        ), destination.push(resource), destination.push("]"), nextArrayOpenBrackChunk = ",[";
      else {
        destination.push(nextArrayOpenBrackChunk);
        var precedence = resource.props["data-precedence"], props = resource.props, coercedHref = sanitizeURL("" + resource.props.href);
        coercedHref = escapeJSObjectForInstructionScripts(coercedHref);
        destination.push(coercedHref);
        precedence = "" + precedence;
        destination.push(",");
        precedence = escapeJSObjectForInstructionScripts(precedence);
        destination.push(precedence);
        for (var propKey in props)
          if (hasOwnProperty.call(props, propKey) && (precedence = props[propKey], null != precedence))
            switch (propKey) {
              case "href":
              case "rel":
              case "precedence":
              case "data-precedence":
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(399, "link"));
              default:
                writeStyleResourceAttributeInJS(
                  destination,
                  propKey,
                  precedence
                );
            }
        destination.push("]");
        nextArrayOpenBrackChunk = ",[";
        resource.state = 3;
      }
  });
  destination.push("]");
}
function writeStyleResourceAttributeInJS(destination, name, value) {
  var attributeName = name.toLowerCase();
  switch (typeof value) {
    case "function":
    case "symbol":
      return;
  }
  switch (name) {
    case "innerHTML":
    case "dangerouslySetInnerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "style":
    case "ref":
      return;
    case "className":
      attributeName = "class";
      name = "" + value;
      break;
    case "hidden":
      if (false === value) return;
      name = "";
      break;
    case "src":
    case "href":
      value = sanitizeURL(value);
      name = "" + value;
      break;
    default:
      if (2 < name.length && ("o" === name[0] || "O" === name[0]) && ("n" === name[1] || "N" === name[1]) || !isAttributeNameSafe(name))
        return;
      name = "" + value;
  }
  destination.push(",");
  attributeName = escapeJSObjectForInstructionScripts(attributeName);
  destination.push(attributeName);
  destination.push(",");
  attributeName = escapeJSObjectForInstructionScripts(name);
  destination.push(attributeName);
}
function createHoistableState() {
  return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set() };
}
function prefetchDNS(href) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if ("string" === typeof href && href) {
      if (!resumableState.dnsResources.hasOwnProperty(href)) {
        resumableState.dnsResources[href] = null;
        resumableState = renderState.headers;
        var header, JSCompiler_temp;
        if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity)
          JSCompiler_temp = (header = "<" + ("" + href).replace(
            regexForHrefInLinkHeaderURLContext,
            escapeHrefForLinkHeaderURLContextReplacer
          ) + ">; rel=dns-prefetch", 0 <= (resumableState.remainingCapacity -= header.length + 2));
        JSCompiler_temp ? (renderState.resets.dns[href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (header = [], pushLinkImpl(header, { href, rel: "dns-prefetch" }), renderState.preconnects.add(header));
      }
      enqueueFlush(request);
    }
  } else previousDispatcher.D(href);
}
function preconnect(href, crossOrigin) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if ("string" === typeof href && href) {
      var bucket = "use-credentials" === crossOrigin ? "credentials" : "string" === typeof crossOrigin ? "anonymous" : "default";
      if (!resumableState.connectResources[bucket].hasOwnProperty(href)) {
        resumableState.connectResources[bucket][href] = null;
        resumableState = renderState.headers;
        var header, JSCompiler_temp;
        if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity) {
          JSCompiler_temp = "<" + ("" + href).replace(
            regexForHrefInLinkHeaderURLContext,
            escapeHrefForLinkHeaderURLContextReplacer
          ) + ">; rel=preconnect";
          if ("string" === typeof crossOrigin) {
            var escapedCrossOrigin = ("" + crossOrigin).replace(
              regexForLinkHeaderQuotedParamValueContext,
              escapeStringForLinkHeaderQuotedParamValueContextReplacer
            );
            JSCompiler_temp += '; crossorigin="' + escapedCrossOrigin + '"';
          }
          JSCompiler_temp = (header = JSCompiler_temp, 0 <= (resumableState.remainingCapacity -= header.length + 2));
        }
        JSCompiler_temp ? (renderState.resets.connect[bucket][href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (bucket = [], pushLinkImpl(bucket, {
          rel: "preconnect",
          href,
          crossOrigin
        }), renderState.preconnects.add(bucket));
      }
      enqueueFlush(request);
    }
  } else previousDispatcher.C(href, crossOrigin);
}
function preload(href, as, options) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (as && href) {
      switch (as) {
        case "image":
          if (options) {
            var imageSrcSet = options.imageSrcSet;
            var imageSizes = options.imageSizes;
            var fetchPriority = options.fetchPriority;
          }
          var key = imageSrcSet ? imageSrcSet + "\n" + (imageSizes || "") : href;
          if (resumableState.imageResources.hasOwnProperty(key)) return;
          resumableState.imageResources[key] = PRELOAD_NO_CREDS;
          resumableState = renderState.headers;
          var header;
          resumableState && 0 < resumableState.remainingCapacity && "high" === fetchPriority && (header = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key] = PRELOAD_NO_CREDS, resumableState.highImagePreloads && (resumableState.highImagePreloads += ", "), resumableState.highImagePreloads += header) : (resumableState = [], pushLinkImpl(
            resumableState,
            assign(
              { rel: "preload", href: imageSrcSet ? void 0 : href, as },
              options
            )
          ), "high" === fetchPriority ? renderState.highImagePreloads.add(resumableState) : (renderState.bulkPreloads.add(resumableState), renderState.preloads.images.set(key, resumableState)));
          break;
        case "style":
          if (resumableState.styleResources.hasOwnProperty(href)) return;
          imageSrcSet = [];
          pushLinkImpl(
            imageSrcSet,
            assign({ rel: "preload", href, as }, options)
          );
          resumableState.styleResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
          renderState.preloads.stylesheets.set(href, imageSrcSet);
          renderState.bulkPreloads.add(imageSrcSet);
          break;
        case "script":
          if (resumableState.scriptResources.hasOwnProperty(href)) return;
          imageSrcSet = [];
          renderState.preloads.scripts.set(href, imageSrcSet);
          renderState.bulkPreloads.add(imageSrcSet);
          pushLinkImpl(
            imageSrcSet,
            assign({ rel: "preload", href, as }, options)
          );
          resumableState.scriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
          break;
        default:
          if (resumableState.unknownResources.hasOwnProperty(as)) {
            if (imageSrcSet = resumableState.unknownResources[as], imageSrcSet.hasOwnProperty(href))
              return;
          } else
            imageSrcSet = {}, resumableState.unknownResources[as] = imageSrcSet;
          imageSrcSet[href] = PRELOAD_NO_CREDS;
          if ((resumableState = renderState.headers) && 0 < resumableState.remainingCapacity && "font" === as && (key = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= key.length + 2)))
            renderState.resets.font[href] = PRELOAD_NO_CREDS, resumableState.fontPreloads && (resumableState.fontPreloads += ", "), resumableState.fontPreloads += key;
          else
            switch (resumableState = [], href = assign({ rel: "preload", href, as }, options), pushLinkImpl(resumableState, href), as) {
              case "font":
                renderState.fontPreloads.add(resumableState);
                break;
              default:
                renderState.bulkPreloads.add(resumableState);
            }
      }
      enqueueFlush(request);
    }
  } else previousDispatcher.L(href, as, options);
}
function preloadModule(href, options) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (href) {
      var as = options && "string" === typeof options.as ? options.as : "script";
      switch (as) {
        case "script":
          if (resumableState.moduleScriptResources.hasOwnProperty(href)) return;
          as = [];
          resumableState.moduleScriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
          renderState.preloads.moduleScripts.set(href, as);
          break;
        default:
          if (resumableState.moduleUnknownResources.hasOwnProperty(as)) {
            var resources = resumableState.unknownResources[as];
            if (resources.hasOwnProperty(href)) return;
          } else
            resources = {}, resumableState.moduleUnknownResources[as] = resources;
          as = [];
          resources[href] = PRELOAD_NO_CREDS;
      }
      pushLinkImpl(as, assign({ rel: "modulepreload", href }, options));
      renderState.bulkPreloads.add(as);
      enqueueFlush(request);
    }
  } else previousDispatcher.m(href, options);
}
function preinitStyle(href, precedence, options) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (href) {
      precedence = precedence || "default";
      var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
      null !== resourceState && (resumableState.styleResources[href] = null, styleQueue || (styleQueue = {
        precedence: escapeTextForBrowser(precedence),
        rules: [],
        hrefs: [],
        sheets: /* @__PURE__ */ new Map()
      }, renderState.styles.set(precedence, styleQueue)), precedence = {
        state: 0,
        props: assign(
          { rel: "stylesheet", href, "data-precedence": precedence },
          options
        )
      }, resourceState && (2 === resourceState.length && adoptPreloadCredentials(precedence.props, resourceState), (renderState = renderState.preloads.stylesheets.get(href)) && 0 < renderState.length ? renderState.length = 0 : precedence.state = 1), styleQueue.sheets.set(href, precedence), enqueueFlush(request));
    }
  } else previousDispatcher.S(href, precedence, options);
}
function preinitScript(src, options) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (src) {
      var resourceState = resumableState.scriptResources.hasOwnProperty(src) ? resumableState.scriptResources[src] : void 0;
      null !== resourceState && (resumableState.scriptResources[src] = null, options = assign({ src, async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.scripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
    }
  } else previousDispatcher.X(src, options);
}
function preinitModuleScript(src, options) {
  var request = currentRequest ? currentRequest : null;
  if (request) {
    var resumableState = request.resumableState, renderState = request.renderState;
    if (src) {
      var resourceState = resumableState.moduleScriptResources.hasOwnProperty(
        src
      ) ? resumableState.moduleScriptResources[src] : void 0;
      null !== resourceState && (resumableState.moduleScriptResources[src] = null, options = assign({ src, type: "module", async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.moduleScripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
    }
  } else previousDispatcher.M(src, options);
}
function adoptPreloadCredentials(target, preloadState) {
  null == target.crossOrigin && (target.crossOrigin = preloadState[0]);
  null == target.integrity && (target.integrity = preloadState[1]);
}
function getPreloadAsHeader(href, as, params) {
  href = ("" + href).replace(
    regexForHrefInLinkHeaderURLContext,
    escapeHrefForLinkHeaderURLContextReplacer
  );
  as = ("" + as).replace(
    regexForLinkHeaderQuotedParamValueContext,
    escapeStringForLinkHeaderQuotedParamValueContextReplacer
  );
  as = "<" + href + '>; rel=preload; as="' + as + '"';
  for (var paramName in params)
    hasOwnProperty.call(params, paramName) && (href = params[paramName], "string" === typeof href && (as += "; " + paramName.toLowerCase() + '="' + ("" + href).replace(
      regexForLinkHeaderQuotedParamValueContext,
      escapeStringForLinkHeaderQuotedParamValueContextReplacer
    ) + '"'));
  return as;
}
var regexForHrefInLinkHeaderURLContext = /[<>\r\n]/g;
function escapeHrefForLinkHeaderURLContextReplacer(match) {
  switch (match) {
    case "<":
      return "%3C";
    case ">":
      return "%3E";
    case "\n":
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error(
        "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
      );
  }
}
var regexForLinkHeaderQuotedParamValueContext = /["';,\r\n]/g;
function escapeStringForLinkHeaderQuotedParamValueContextReplacer(match) {
  switch (match) {
    case '"':
      return "%22";
    case "'":
      return "%27";
    case ";":
      return "%3B";
    case ",":
      return "%2C";
    case "\n":
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error(
        "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
      );
  }
}
function hoistStyleQueueDependency(styleQueue) {
  this.styles.add(styleQueue);
}
function hoistStylesheetDependency(stylesheet2) {
  this.stylesheets.add(stylesheet2);
}
function createRenderState(resumableState, generateStaticMarkup) {
  var idPrefix = resumableState.idPrefix, bootstrapChunks = [], bootstrapScriptContent = resumableState.bootstrapScriptContent, bootstrapScripts = resumableState.bootstrapScripts, bootstrapModules = resumableState.bootstrapModules;
  void 0 !== bootstrapScriptContent && bootstrapChunks.push(
    "<script>",
    ("" + bootstrapScriptContent).replace(scriptRegex, scriptReplacer),
    "<\/script>"
  );
  bootstrapScriptContent = idPrefix + "P:";
  var JSCompiler_object_inline_segmentPrefix_1482 = idPrefix + "S:";
  idPrefix += "B:";
  var JSCompiler_object_inline_preconnects_1496 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_fontPreloads_1497 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_highImagePreloads_1498 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_styles_1499 = /* @__PURE__ */ new Map(), JSCompiler_object_inline_bootstrapScripts_1500 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_scripts_1501 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_bulkPreloads_1502 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_preloads_1503 = {
    images: /* @__PURE__ */ new Map(),
    stylesheets: /* @__PURE__ */ new Map(),
    scripts: /* @__PURE__ */ new Map(),
    moduleScripts: /* @__PURE__ */ new Map()
  };
  if (void 0 !== bootstrapScripts)
    for (var i = 0; i < bootstrapScripts.length; i++) {
      var scriptConfig = bootstrapScripts[i], src, crossOrigin = void 0, integrity = void 0, props = {
        rel: "preload",
        as: "script",
        fetchPriority: "low",
        nonce: void 0
      };
      "string" === typeof scriptConfig ? props.href = src = scriptConfig : (props.href = src = scriptConfig.src, props.integrity = integrity = "string" === typeof scriptConfig.integrity ? scriptConfig.integrity : void 0, props.crossOrigin = crossOrigin = "string" === typeof scriptConfig || null == scriptConfig.crossOrigin ? void 0 : "use-credentials" === scriptConfig.crossOrigin ? "use-credentials" : "");
      scriptConfig = resumableState;
      var href = src;
      scriptConfig.scriptResources[href] = null;
      scriptConfig.moduleScriptResources[href] = null;
      scriptConfig = [];
      pushLinkImpl(scriptConfig, props);
      JSCompiler_object_inline_bootstrapScripts_1500.add(scriptConfig);
      bootstrapChunks.push('<script src="', escapeTextForBrowser(src));
      "string" === typeof integrity && bootstrapChunks.push('" integrity="', escapeTextForBrowser(integrity));
      "string" === typeof crossOrigin && bootstrapChunks.push(
        '" crossorigin="',
        escapeTextForBrowser(crossOrigin)
      );
      bootstrapChunks.push('" async=""><\/script>');
    }
  if (void 0 !== bootstrapModules)
    for (bootstrapScripts = 0; bootstrapScripts < bootstrapModules.length; bootstrapScripts++)
      props = bootstrapModules[bootstrapScripts], crossOrigin = src = void 0, integrity = {
        rel: "modulepreload",
        fetchPriority: "low",
        nonce: void 0
      }, "string" === typeof props ? integrity.href = i = props : (integrity.href = i = props.src, integrity.integrity = crossOrigin = "string" === typeof props.integrity ? props.integrity : void 0, integrity.crossOrigin = src = "string" === typeof props || null == props.crossOrigin ? void 0 : "use-credentials" === props.crossOrigin ? "use-credentials" : ""), props = resumableState, scriptConfig = i, props.scriptResources[scriptConfig] = null, props.moduleScriptResources[scriptConfig] = null, props = [], pushLinkImpl(props, integrity), JSCompiler_object_inline_bootstrapScripts_1500.add(props), bootstrapChunks.push(
        '<script type="module" src="',
        escapeTextForBrowser(i)
      ), "string" === typeof crossOrigin && bootstrapChunks.push(
        '" integrity="',
        escapeTextForBrowser(crossOrigin)
      ), "string" === typeof src && bootstrapChunks.push('" crossorigin="', escapeTextForBrowser(src)), bootstrapChunks.push('" async=""><\/script>');
  return {
    placeholderPrefix: bootstrapScriptContent,
    segmentPrefix: JSCompiler_object_inline_segmentPrefix_1482,
    boundaryPrefix: idPrefix,
    startInlineScript: "<script>",
    htmlChunks: null,
    headChunks: null,
    externalRuntimeScript: null,
    bootstrapChunks,
    importMapChunks: [],
    onHeaders: void 0,
    headers: null,
    resets: {
      font: {},
      dns: {},
      connect: { default: {}, anonymous: {}, credentials: {} },
      image: {},
      style: {}
    },
    charsetChunks: [],
    viewportChunks: [],
    hoistableChunks: [],
    preconnects: JSCompiler_object_inline_preconnects_1496,
    fontPreloads: JSCompiler_object_inline_fontPreloads_1497,
    highImagePreloads: JSCompiler_object_inline_highImagePreloads_1498,
    styles: JSCompiler_object_inline_styles_1499,
    bootstrapScripts: JSCompiler_object_inline_bootstrapScripts_1500,
    scripts: JSCompiler_object_inline_scripts_1501,
    bulkPreloads: JSCompiler_object_inline_bulkPreloads_1502,
    preloads: JSCompiler_object_inline_preloads_1503,
    stylesToHoist: false,
    generateStaticMarkup
  };
}
function pushTextInstance(target, text, renderState, textEmbedded) {
  if (renderState.generateStaticMarkup)
    return target.push(escapeTextForBrowser(text)), false;
  "" === text ? target = textEmbedded : (textEmbedded && target.push("<!-- -->"), target.push(escapeTextForBrowser(text)), target = true);
  return target;
}
function pushSegmentFinale(target, renderState, lastPushedText, textEmbedded) {
  renderState.generateStaticMarkup || lastPushedText && textEmbedded && target.push("<!-- -->");
}
var bind = Function.prototype.bind, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
function getComponentNameFromType(type) {
  if (null == type) return null;
  if ("function" === typeof type)
    return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return (type.displayName || "Context") + ".Provider";
      case REACT_CONSUMER_TYPE:
        return (type._context.displayName || "Context") + ".Consumer";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        type = type.displayName;
        type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
        return type;
      case REACT_MEMO_TYPE:
        return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
      case REACT_LAZY_TYPE:
        innerType = type._payload;
        type = type._init;
        try {
          return getComponentNameFromType(type(innerType));
        } catch (x) {
        }
    }
  return null;
}
var emptyContextObject = {}, currentActiveSnapshot = null;
function popToNearestCommonAncestor(prev, next) {
  if (prev !== next) {
    prev.context._currentValue2 = prev.parentValue;
    prev = prev.parent;
    var parentNext = next.parent;
    if (null === prev) {
      if (null !== parentNext) throw Error(formatProdErrorMessage(401));
    } else {
      if (null === parentNext) throw Error(formatProdErrorMessage(401));
      popToNearestCommonAncestor(prev, parentNext);
    }
    next.context._currentValue2 = next.value;
  }
}
function popAllPrevious(prev) {
  prev.context._currentValue2 = prev.parentValue;
  prev = prev.parent;
  null !== prev && popAllPrevious(prev);
}
function pushAllNext(next) {
  var parentNext = next.parent;
  null !== parentNext && pushAllNext(parentNext);
  next.context._currentValue2 = next.value;
}
function popPreviousToCommonLevel(prev, next) {
  prev.context._currentValue2 = prev.parentValue;
  prev = prev.parent;
  if (null === prev) throw Error(formatProdErrorMessage(402));
  prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : popPreviousToCommonLevel(prev, next);
}
function popNextToCommonLevel(prev, next) {
  var parentNext = next.parent;
  if (null === parentNext) throw Error(formatProdErrorMessage(402));
  prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext);
  next.context._currentValue2 = next.value;
}
function switchContext(newSnapshot) {
  var prev = currentActiveSnapshot;
  prev !== newSnapshot && (null === prev ? pushAllNext(newSnapshot) : null === newSnapshot ? popAllPrevious(prev) : prev.depth === newSnapshot.depth ? popToNearestCommonAncestor(prev, newSnapshot) : prev.depth > newSnapshot.depth ? popPreviousToCommonLevel(prev, newSnapshot) : popNextToCommonLevel(prev, newSnapshot), currentActiveSnapshot = newSnapshot);
}
var classComponentUpdater = {
  isMounted: function() {
    return false;
  },
  enqueueSetState: function(inst, payload) {
    inst = inst._reactInternals;
    null !== inst.queue && inst.queue.push(payload);
  },
  enqueueReplaceState: function(inst, payload) {
    inst = inst._reactInternals;
    inst.replace = true;
    inst.queue = [payload];
  },
  enqueueForceUpdate: function() {
  }
}, emptyTreeContext = { id: 1, overflow: "" };
function pushTreeContext(baseContext, totalChildren, index) {
  var baseIdWithLeadingBit = baseContext.id;
  baseContext = baseContext.overflow;
  var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
  baseIdWithLeadingBit &= ~(1 << baseLength);
  index += 1;
  var length = 32 - clz32(totalChildren) + baseLength;
  if (30 < length) {
    var numberOfOverflowBits = baseLength - baseLength % 5;
    length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
    baseIdWithLeadingBit >>= numberOfOverflowBits;
    baseLength -= numberOfOverflowBits;
    return {
      id: 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit,
      overflow: length + baseContext
    };
  }
  return {
    id: 1 << length | index << baseLength | baseIdWithLeadingBit,
    overflow: baseContext
  };
}
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
function clz32Fallback(x) {
  x >>>= 0;
  return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
}
var SuspenseException = Error(formatProdErrorMessage(460));
function noop$2() {
}
function trackUsedThenable(thenableState2, thenable, index) {
  index = thenableState2[index];
  void 0 === index ? thenableState2.push(thenable) : index !== thenable && (thenable.then(noop$2, noop$2), thenable = index);
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      throw thenable.reason;
    default:
      "string" === typeof thenable.status ? thenable.then(noop$2, noop$2) : (thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
        function(fulfilledValue) {
          if ("pending" === thenable.status) {
            var fulfilledThenable = thenable;
            fulfilledThenable.status = "fulfilled";
            fulfilledThenable.value = fulfilledValue;
          }
        },
        function(error) {
          if ("pending" === thenable.status) {
            var rejectedThenable = thenable;
            rejectedThenable.status = "rejected";
            rejectedThenable.reason = error;
          }
        }
      ));
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
      }
      suspendedThenable = thenable;
      throw SuspenseException;
  }
}
var suspendedThenable = null;
function getSuspendedThenable() {
  if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
  var thenable = suspendedThenable;
  suspendedThenable = null;
  return thenable;
}
function is(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs = "function" === typeof Object.is ? Object.is : is, currentlyRenderingComponent = null, currentlyRenderingTask = null, currentlyRenderingRequest = null, currentlyRenderingKeyPath = null, firstWorkInProgressHook = null, workInProgressHook = null, isReRender = false, didScheduleRenderPhaseUpdate = false, localIdCounter = 0, actionStateCounter = 0, actionStateMatchingIndex = -1, thenableIndexCounter = 0, thenableState = null, renderPhaseUpdates = null, numberOfReRenders = 0;
function resolveCurrentlyRenderingComponent() {
  if (null === currentlyRenderingComponent)
    throw Error(formatProdErrorMessage(321));
  return currentlyRenderingComponent;
}
function createHook() {
  if (0 < numberOfReRenders) throw Error(formatProdErrorMessage(312));
  return { memoizedState: null, queue: null, next: null };
}
function createWorkInProgressHook() {
  null === workInProgressHook ? null === firstWorkInProgressHook ? (isReRender = false, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = true, workInProgressHook = firstWorkInProgressHook) : null === workInProgressHook.next ? (isReRender = false, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = true, workInProgressHook = workInProgressHook.next);
  return workInProgressHook;
}
function getThenableStateAfterSuspending() {
  var state = thenableState;
  thenableState = null;
  return state;
}
function resetHooksState() {
  currentlyRenderingKeyPath = currentlyRenderingRequest = currentlyRenderingTask = currentlyRenderingComponent = null;
  didScheduleRenderPhaseUpdate = false;
  firstWorkInProgressHook = null;
  numberOfReRenders = 0;
  workInProgressHook = renderPhaseUpdates = null;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function useReducer(reducer, initialArg, init) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  if (isReRender) {
    var queue = workInProgressHook.queue;
    initialArg = queue.dispatch;
    if (null !== renderPhaseUpdates && (init = renderPhaseUpdates.get(queue), void 0 !== init)) {
      renderPhaseUpdates.delete(queue);
      queue = workInProgressHook.memoizedState;
      do
        queue = reducer(queue, init.action), init = init.next;
      while (null !== init);
      workInProgressHook.memoizedState = queue;
      return [queue, initialArg];
    }
    return [workInProgressHook.memoizedState, initialArg];
  }
  reducer = reducer === basicStateReducer ? "function" === typeof initialArg ? initialArg() : initialArg : void 0 !== init ? init(initialArg) : initialArg;
  workInProgressHook.memoizedState = reducer;
  reducer = workInProgressHook.queue = { last: null, dispatch: null };
  reducer = reducer.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingComponent,
    reducer
  );
  return [workInProgressHook.memoizedState, reducer];
}
function useMemo(nextCreate, deps) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  if (null !== workInProgressHook) {
    var prevState = workInProgressHook.memoizedState;
    if (null !== prevState && null !== deps) {
      var prevDeps = prevState[1];
      a: if (null === prevDeps) prevDeps = false;
      else {
        for (var i = 0; i < prevDeps.length && i < deps.length; i++)
          if (!objectIs(deps[i], prevDeps[i])) {
            prevDeps = false;
            break a;
          }
        prevDeps = true;
      }
      if (prevDeps) return prevState[0];
    }
  }
  nextCreate = nextCreate();
  workInProgressHook.memoizedState = [nextCreate, deps];
  return nextCreate;
}
function dispatchAction(componentIdentity, queue, action) {
  if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
  if (componentIdentity === currentlyRenderingComponent)
    if (didScheduleRenderPhaseUpdate = true, componentIdentity = { action, next: null }, null === renderPhaseUpdates && (renderPhaseUpdates = /* @__PURE__ */ new Map()), action = renderPhaseUpdates.get(queue), void 0 === action)
      renderPhaseUpdates.set(queue, componentIdentity);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = componentIdentity;
    }
}
function unsupportedStartTransition() {
  throw Error(formatProdErrorMessage(394));
}
function unsupportedSetOptimisticState() {
  throw Error(formatProdErrorMessage(479));
}
function useActionState(action, initialState, permalink) {
  resolveCurrentlyRenderingComponent();
  var actionStateHookIndex = actionStateCounter++, request = currentlyRenderingRequest;
  if ("function" === typeof action.$$FORM_ACTION) {
    var nextPostbackStateKey = null, componentKeyPath = currentlyRenderingKeyPath;
    request = request.formState;
    var isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;
    if (null !== request && "function" === typeof isSignatureEqual) {
      var postbackKey = request[1];
      isSignatureEqual.call(action, request[2], request[3]) && (nextPostbackStateKey = void 0 !== permalink ? "p" + permalink : "k" + murmurhash3_32_gc(
        JSON.stringify([componentKeyPath, null, actionStateHookIndex]),
        0
      ), postbackKey === nextPostbackStateKey && (actionStateMatchingIndex = actionStateHookIndex, initialState = request[0]));
    }
    var boundAction = action.bind(null, initialState);
    action = function(payload) {
      boundAction(payload);
    };
    "function" === typeof boundAction.$$FORM_ACTION && (action.$$FORM_ACTION = function(prefix2) {
      prefix2 = boundAction.$$FORM_ACTION(prefix2);
      void 0 !== permalink && (permalink += "", prefix2.action = permalink);
      var formData = prefix2.data;
      formData && (null === nextPostbackStateKey && (nextPostbackStateKey = void 0 !== permalink ? "p" + permalink : "k" + murmurhash3_32_gc(
        JSON.stringify([
          componentKeyPath,
          null,
          actionStateHookIndex
        ]),
        0
      )), formData.append("$ACTION_KEY", nextPostbackStateKey));
      return prefix2;
    });
    return [initialState, action, false];
  }
  var boundAction$22 = action.bind(null, initialState);
  return [
    initialState,
    function(payload) {
      boundAction$22(payload);
    },
    false
  ];
}
function unwrapThenable(thenable) {
  var index = thenableIndexCounter;
  thenableIndexCounter += 1;
  null === thenableState && (thenableState = []);
  return trackUsedThenable(thenableState, thenable, index);
}
function unsupportedRefresh() {
  throw Error(formatProdErrorMessage(393));
}
function noop$1() {
}
var HooksDispatcher = {
  readContext: function(context) {
    return context._currentValue2;
  },
  use: function(usable) {
    if (null !== usable && "object" === typeof usable) {
      if ("function" === typeof usable.then) return unwrapThenable(usable);
      if (usable.$$typeof === REACT_CONTEXT_TYPE) return usable._currentValue2;
    }
    throw Error(formatProdErrorMessage(438, String(usable)));
  },
  useContext: function(context) {
    resolveCurrentlyRenderingComponent();
    return context._currentValue2;
  },
  useMemo,
  useReducer,
  useRef: function(initialValue) {
    currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
    workInProgressHook = createWorkInProgressHook();
    var previousRef = workInProgressHook.memoizedState;
    return null === previousRef ? (initialValue = { current: initialValue }, workInProgressHook.memoizedState = initialValue) : previousRef;
  },
  useState: function(initialState) {
    return useReducer(basicStateReducer, initialState);
  },
  useInsertionEffect: noop$1,
  useLayoutEffect: noop$1,
  useCallback: function(callback, deps) {
    return useMemo(function() {
      return callback;
    }, deps);
  },
  useImperativeHandle: noop$1,
  useEffect: noop$1,
  useDebugValue: noop$1,
  useDeferredValue: function(value, initialValue) {
    resolveCurrentlyRenderingComponent();
    return void 0 !== initialValue ? initialValue : value;
  },
  useTransition: function() {
    resolveCurrentlyRenderingComponent();
    return [false, unsupportedStartTransition];
  },
  useId: function() {
    var JSCompiler_inline_result = currentlyRenderingTask.treeContext;
    var overflow = JSCompiler_inline_result.overflow;
    JSCompiler_inline_result = JSCompiler_inline_result.id;
    JSCompiler_inline_result = (JSCompiler_inline_result & ~(1 << 32 - clz32(JSCompiler_inline_result) - 1)).toString(32) + overflow;
    var resumableState = currentResumableState;
    if (null === resumableState) throw Error(formatProdErrorMessage(404));
    overflow = localIdCounter++;
    JSCompiler_inline_result = ":" + resumableState.idPrefix + "R" + JSCompiler_inline_result;
    0 < overflow && (JSCompiler_inline_result += "H" + overflow.toString(32));
    return JSCompiler_inline_result + ":";
  },
  useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
    if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
    return getServerSnapshot();
  },
  useCacheRefresh: function() {
    return unsupportedRefresh;
  },
  useMemoCache: function(size) {
    for (var data = Array(size), i = 0; i < size; i++)
      data[i] = REACT_MEMO_CACHE_SENTINEL;
    return data;
  },
  useHostTransitionStatus: function() {
    resolveCurrentlyRenderingComponent();
    return sharedNotPendingObject;
  },
  useOptimistic: function(passthrough) {
    resolveCurrentlyRenderingComponent();
    return [passthrough, unsupportedSetOptimisticState];
  }
};
HooksDispatcher.useFormState = useActionState;
HooksDispatcher.useActionState = useActionState;
var currentResumableState = null, DefaultAsyncDispatcher = {
  getCacheForType: function() {
    throw Error(formatProdErrorMessage(248));
  }
}, prefix, suffix;
function describeBuiltInComponentFrame(name) {
  if (void 0 === prefix)
    try {
      throw Error();
    } catch (x) {
      var match = x.stack.trim().match(/\n( *(at )?)/);
      prefix = match && match[1] || "";
      suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return "\n" + prefix + name + suffix;
}
var reentry = false;
function describeNativeComponentFrame(fn, construct) {
  if (!fn || reentry) return "";
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var RunInRootFrame = {
      DetermineComponentFrameRoot: function() {
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if ("object" === typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                var control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x$24) {
                control = x$24;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x$25) {
              control = x$25;
            }
            (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
            });
          }
        } catch (sample) {
          if (sample && control && "string" === typeof sample.stack)
            return [sample.stack, control.stack];
        }
        return [null, null];
      }
    };
    RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var namePropDescriptor = Object.getOwnPropertyDescriptor(
      RunInRootFrame.DetermineComponentFrameRoot,
      "name"
    );
    namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
      RunInRootFrame.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
    if (sampleStack && controlStack) {
      var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
      for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
        RunInRootFrame++;
      for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
        "DetermineComponentFrameRoot"
      ); )
        namePropDescriptor++;
      if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
        for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
          namePropDescriptor--;
      for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
        if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
          if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
            do
              if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                return frame;
              }
            while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
          }
          break;
        }
    }
  } finally {
    reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
  }
  return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
}
function describeComponentStackByType(type) {
  if ("string" === typeof type) return describeBuiltInComponentFrame(type);
  if ("function" === typeof type)
    return type.prototype && type.prototype.isReactComponent ? (type = describeNativeComponentFrame(type, true), type) : describeNativeComponentFrame(type, false);
  if ("object" === typeof type && null !== type) {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeNativeComponentFrame(type.render, false);
      case REACT_MEMO_TYPE:
        return describeNativeComponentFrame(type.type, false);
      case REACT_LAZY_TYPE:
        var lazyComponent = type, payload = lazyComponent._payload;
        lazyComponent = lazyComponent._init;
        try {
          type = lazyComponent(payload);
        } catch (x) {
          return describeBuiltInComponentFrame("Lazy");
        }
        return describeComponentStackByType(type);
    }
    if ("string" === typeof type.name)
      return payload = type.env, describeBuiltInComponentFrame(
        type.name + (payload ? " [" + payload + "]" : "")
      );
  }
  switch (type) {
    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame("SuspenseList");
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame("Suspense");
  }
  return "";
}
function defaultErrorHandler(error) {
  if ("object" === typeof error && null !== error && "string" === typeof error.environmentName) {
    var JSCompiler_inline_result = error.environmentName;
    error = [error].slice(0);
    "string" === typeof error[0] ? error.splice(
      0,
      1,
      "[%s] " + error[0],
      " " + JSCompiler_inline_result + " "
    ) : error.splice(0, 0, "[%s] ", " " + JSCompiler_inline_result + " ");
    error.unshift(console);
    JSCompiler_inline_result = bind.apply(console.error, error);
    JSCompiler_inline_result();
  } else console.error(error);
  return null;
}
function noop() {
}
function RequestInstance(resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
  var abortSet = /* @__PURE__ */ new Set();
  this.destination = null;
  this.flushScheduled = false;
  this.resumableState = resumableState;
  this.renderState = renderState;
  this.rootFormatContext = rootFormatContext;
  this.progressiveChunkSize = void 0 === progressiveChunkSize ? 12800 : progressiveChunkSize;
  this.status = 10;
  this.fatalError = null;
  this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0;
  this.completedRootSegment = null;
  this.abortableTasks = abortSet;
  this.pingedTasks = [];
  this.clientRenderedBoundaries = [];
  this.completedBoundaries = [];
  this.partialBoundaries = [];
  this.trackedPostpones = null;
  this.onError = void 0 === onError2 ? defaultErrorHandler : onError2;
  this.onPostpone = void 0 === onPostpone ? noop : onPostpone;
  this.onAllReady = void 0 === onAllReady ? noop : onAllReady;
  this.onShellReady = void 0 === onShellReady ? noop : onShellReady;
  this.onShellError = void 0 === onShellError ? noop : onShellError;
  this.onFatalError = void 0 === onFatalError ? noop : onFatalError;
  this.formState = void 0 === formState ? null : formState;
}
function createRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
  resumableState = new RequestInstance(
    resumableState,
    renderState,
    rootFormatContext,
    progressiveChunkSize,
    onError2,
    onAllReady,
    onShellReady,
    onShellError,
    onFatalError,
    onPostpone,
    formState
  );
  renderState = createPendingSegment(
    resumableState,
    0,
    null,
    rootFormatContext,
    false,
    false
  );
  renderState.parentFlushed = true;
  children = createRenderTask(
    resumableState,
    null,
    children,
    -1,
    null,
    renderState,
    null,
    resumableState.abortableTasks,
    null,
    rootFormatContext,
    null,
    emptyTreeContext,
    null,
    false
  );
  pushComponentStack(children);
  resumableState.pingedTasks.push(children);
  return resumableState;
}
var currentRequest = null;
function pingTask(request, task) {
  request.pingedTasks.push(task);
  1 === request.pingedTasks.length && (request.flushScheduled = null !== request.destination, performWork(request));
}
function createSuspenseBoundary(request, fallbackAbortableTasks) {
  return {
    status: 0,
    rootSegmentID: -1,
    parentFlushed: false,
    pendingTasks: 0,
    completedSegments: [],
    byteSize: 0,
    fallbackAbortableTasks,
    errorDigest: null,
    contentState: createHoistableState(),
    fallbackState: createHoistableState(),
    trackedContentKeyPath: null,
    trackedFallbackNode: null
  };
}
function createRenderTask(request, thenableState2, node, childIndex, blockedBoundary, blockedSegment, hoistableState, abortSet, keyPath, formatContext, context, treeContext, componentStack, isFallback) {
  request.allPendingTasks++;
  null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
  var task = {
    replay: null,
    node,
    childIndex,
    ping: function() {
      return pingTask(request, task);
    },
    blockedBoundary,
    blockedSegment,
    hoistableState,
    abortSet,
    keyPath,
    formatContext,
    context,
    treeContext,
    componentStack,
    thenableState: thenableState2,
    isFallback
  };
  abortSet.add(task);
  return task;
}
function createReplayTask(request, thenableState2, replay, node, childIndex, blockedBoundary, hoistableState, abortSet, keyPath, formatContext, context, treeContext, componentStack, isFallback) {
  request.allPendingTasks++;
  null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
  replay.pendingTasks++;
  var task = {
    replay,
    node,
    childIndex,
    ping: function() {
      return pingTask(request, task);
    },
    blockedBoundary,
    blockedSegment: null,
    hoistableState,
    abortSet,
    keyPath,
    formatContext,
    context,
    treeContext,
    componentStack,
    thenableState: thenableState2,
    isFallback
  };
  abortSet.add(task);
  return task;
}
function createPendingSegment(request, index, boundary, parentFormatContext, lastPushedText, textEmbedded) {
  return {
    status: 0,
    id: -1,
    index,
    parentFlushed: false,
    chunks: [],
    children: [],
    parentFormatContext,
    boundary,
    lastPushedText,
    textEmbedded
  };
}
function pushComponentStack(task) {
  var node = task.node;
  if ("object" === typeof node && null !== node)
    switch (node.$$typeof) {
      case REACT_ELEMENT_TYPE:
        task.componentStack = { parent: task.componentStack, type: node.type };
    }
}
function getThrownInfo(node$jscomp$0) {
  var errorInfo = {};
  node$jscomp$0 && Object.defineProperty(errorInfo, "componentStack", {
    configurable: true,
    enumerable: true,
    get: function() {
      try {
        var info = "", node = node$jscomp$0;
        do
          info += describeComponentStackByType(node.type), node = node.parent;
        while (node);
        var JSCompiler_inline_result = info;
      } catch (x) {
        JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack;
      }
      Object.defineProperty(errorInfo, "componentStack", {
        value: JSCompiler_inline_result
      });
      return JSCompiler_inline_result;
    }
  });
  return errorInfo;
}
function logRecoverableError(request, error, errorInfo) {
  request = request.onError;
  error = request(error, errorInfo);
  if (null == error || "string" === typeof error) return error;
}
function fatalError(request, error) {
  var onShellError = request.onShellError, onFatalError = request.onFatalError;
  onShellError(error);
  onFatalError(error);
  null !== request.destination ? (request.status = 14, request.destination.destroy(error)) : (request.status = 13, request.fatalError = error);
}
function renderWithHooks(request, task, keyPath, Component2, props, secondArg) {
  var prevThenableState = task.thenableState;
  task.thenableState = null;
  currentlyRenderingComponent = {};
  currentlyRenderingTask = task;
  currentlyRenderingRequest = request;
  currentlyRenderingKeyPath = keyPath;
  actionStateCounter = localIdCounter = 0;
  actionStateMatchingIndex = -1;
  thenableIndexCounter = 0;
  thenableState = prevThenableState;
  for (request = Component2(props, secondArg); didScheduleRenderPhaseUpdate; )
    didScheduleRenderPhaseUpdate = false, actionStateCounter = localIdCounter = 0, actionStateMatchingIndex = -1, thenableIndexCounter = 0, numberOfReRenders += 1, workInProgressHook = null, request = Component2(props, secondArg);
  resetHooksState();
  return request;
}
function finishFunctionComponent(request, task, keyPath, children, hasId, actionStateCount, actionStateMatchingIndex2) {
  var didEmitActionStateMarkers = false;
  if (0 !== actionStateCount && null !== request.formState) {
    var segment = task.blockedSegment;
    if (null !== segment) {
      didEmitActionStateMarkers = true;
      segment = segment.chunks;
      for (var i = 0; i < actionStateCount; i++)
        i === actionStateMatchingIndex2 ? segment.push("<!--F!-->") : segment.push("<!--F-->");
    }
  }
  actionStateCount = task.keyPath;
  task.keyPath = keyPath;
  hasId ? (keyPath = task.treeContext, task.treeContext = pushTreeContext(keyPath, 1, 0), renderNode(request, task, children, -1), task.treeContext = keyPath) : didEmitActionStateMarkers ? renderNode(request, task, children, -1) : renderNodeDestructive(request, task, children, -1);
  task.keyPath = actionStateCount;
}
function renderElement(request, task, keyPath, type, props, ref) {
  if ("function" === typeof type)
    if (type.prototype && type.prototype.isReactComponent) {
      var newProps = props;
      if ("ref" in props) {
        newProps = {};
        for (var propName in props)
          "ref" !== propName && (newProps[propName] = props[propName]);
      }
      var defaultProps = type.defaultProps;
      if (defaultProps) {
        newProps === props && (newProps = assign({}, newProps, props));
        for (var propName$33 in defaultProps)
          void 0 === newProps[propName$33] && (newProps[propName$33] = defaultProps[propName$33]);
      }
      props = newProps;
      newProps = emptyContextObject;
      defaultProps = type.contextType;
      "object" === typeof defaultProps && null !== defaultProps && (newProps = defaultProps._currentValue2);
      newProps = new type(props, newProps);
      var initialState = void 0 !== newProps.state ? newProps.state : null;
      newProps.updater = classComponentUpdater;
      newProps.props = props;
      newProps.state = initialState;
      defaultProps = { queue: [], replace: false };
      newProps._reactInternals = defaultProps;
      ref = type.contextType;
      newProps.context = "object" === typeof ref && null !== ref ? ref._currentValue2 : emptyContextObject;
      ref = type.getDerivedStateFromProps;
      "function" === typeof ref && (ref = ref(props, initialState), initialState = null === ref || void 0 === ref ? initialState : assign({}, initialState, ref), newProps.state = initialState);
      if ("function" !== typeof type.getDerivedStateFromProps && "function" !== typeof newProps.getSnapshotBeforeUpdate && ("function" === typeof newProps.UNSAFE_componentWillMount || "function" === typeof newProps.componentWillMount))
        if (type = newProps.state, "function" === typeof newProps.componentWillMount && newProps.componentWillMount(), "function" === typeof newProps.UNSAFE_componentWillMount && newProps.UNSAFE_componentWillMount(), type !== newProps.state && classComponentUpdater.enqueueReplaceState(
          newProps,
          newProps.state,
          null
        ), null !== defaultProps.queue && 0 < defaultProps.queue.length)
          if (type = defaultProps.queue, ref = defaultProps.replace, defaultProps.queue = null, defaultProps.replace = false, ref && 1 === type.length)
            newProps.state = type[0];
          else {
            defaultProps = ref ? type[0] : newProps.state;
            initialState = true;
            for (ref = ref ? 1 : 0; ref < type.length; ref++)
              propName$33 = type[ref], propName$33 = "function" === typeof propName$33 ? propName$33.call(newProps, defaultProps, props, void 0) : propName$33, null != propName$33 && (initialState ? (initialState = false, defaultProps = assign({}, defaultProps, propName$33)) : assign(defaultProps, propName$33));
            newProps.state = defaultProps;
          }
        else defaultProps.queue = null;
      type = newProps.render();
      if (12 === request.status) throw null;
      props = task.keyPath;
      task.keyPath = keyPath;
      renderNodeDestructive(request, task, type, -1);
      task.keyPath = props;
    } else {
      type = renderWithHooks(request, task, keyPath, type, props, void 0);
      if (12 === request.status) throw null;
      finishFunctionComponent(
        request,
        task,
        keyPath,
        type,
        0 !== localIdCounter,
        actionStateCounter,
        actionStateMatchingIndex
      );
    }
  else if ("string" === typeof type)
    if (newProps = task.blockedSegment, null === newProps)
      newProps = props.children, defaultProps = task.formatContext, initialState = task.keyPath, task.formatContext = getChildFormatContext(defaultProps, type, props), task.keyPath = keyPath, renderNode(request, task, newProps, -1), task.formatContext = defaultProps, task.keyPath = initialState;
    else {
      initialState = pushStartInstance(
        newProps.chunks,
        type,
        props,
        request.resumableState,
        request.renderState,
        task.hoistableState,
        task.formatContext,
        newProps.lastPushedText,
        task.isFallback
      );
      newProps.lastPushedText = false;
      defaultProps = task.formatContext;
      ref = task.keyPath;
      task.formatContext = getChildFormatContext(defaultProps, type, props);
      task.keyPath = keyPath;
      renderNode(request, task, initialState, -1);
      task.formatContext = defaultProps;
      task.keyPath = ref;
      a: {
        task = newProps.chunks;
        request = request.resumableState;
        switch (type) {
          case "title":
          case "style":
          case "script":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break a;
          case "body":
            if (1 >= defaultProps.insertionMode) {
              request.hasBody = true;
              break a;
            }
            break;
          case "html":
            if (0 === defaultProps.insertionMode) {
              request.hasHtml = true;
              break a;
            }
        }
        task.push(endChunkForTag(type));
      }
      newProps.lastPushedText = false;
    }
  else {
    switch (type) {
      case REACT_LEGACY_HIDDEN_TYPE:
      case REACT_DEBUG_TRACING_MODE_TYPE:
      case REACT_STRICT_MODE_TYPE:
      case REACT_PROFILER_TYPE:
      case REACT_FRAGMENT_TYPE:
        type = task.keyPath;
        task.keyPath = keyPath;
        renderNodeDestructive(request, task, props.children, -1);
        task.keyPath = type;
        return;
      case REACT_OFFSCREEN_TYPE:
        "hidden" !== props.mode && (type = task.keyPath, task.keyPath = keyPath, renderNodeDestructive(request, task, props.children, -1), task.keyPath = type);
        return;
      case REACT_SUSPENSE_LIST_TYPE:
        type = task.keyPath;
        task.keyPath = keyPath;
        renderNodeDestructive(request, task, props.children, -1);
        task.keyPath = type;
        return;
      case REACT_SCOPE_TYPE:
        throw Error(formatProdErrorMessage(343));
      case REACT_SUSPENSE_TYPE:
        a: if (null !== task.replay) {
          type = task.keyPath;
          task.keyPath = keyPath;
          keyPath = props.children;
          try {
            renderNode(request, task, keyPath, -1);
          } finally {
            task.keyPath = type;
          }
        } else {
          type = task.keyPath;
          var parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState;
          ref = task.blockedSegment;
          propName$33 = props.fallback;
          props = props.children;
          var fallbackAbortSet = /* @__PURE__ */ new Set();
          propName = createSuspenseBoundary(request, fallbackAbortSet);
          null !== request.trackedPostpones && (propName.trackedContentKeyPath = keyPath);
          var boundarySegment = createPendingSegment(
            request,
            ref.chunks.length,
            propName,
            task.formatContext,
            false,
            false
          );
          ref.children.push(boundarySegment);
          ref.lastPushedText = false;
          var contentRootSegment = createPendingSegment(
            request,
            0,
            null,
            task.formatContext,
            false,
            false
          );
          contentRootSegment.parentFlushed = true;
          if (null !== request.trackedPostpones) {
            newProps = [keyPath[0], "Suspense Fallback", keyPath[2]];
            defaultProps = [newProps[1], newProps[2], [], null];
            request.trackedPostpones.workingMap.set(newProps, defaultProps);
            propName.trackedFallbackNode = defaultProps;
            task.blockedSegment = boundarySegment;
            task.keyPath = newProps;
            boundarySegment.status = 6;
            try {
              renderNode(request, task, propName$33, -1), pushSegmentFinale(
                boundarySegment.chunks,
                request.renderState,
                boundarySegment.lastPushedText,
                boundarySegment.textEmbedded
              ), boundarySegment.status = 1;
            } catch (thrownValue) {
              throw boundarySegment.status = 12 === request.status ? 3 : 4, thrownValue;
            } finally {
              task.blockedSegment = ref, task.keyPath = type;
            }
            task = createRenderTask(
              request,
              null,
              props,
              -1,
              propName,
              contentRootSegment,
              propName.contentState,
              task.abortSet,
              keyPath,
              task.formatContext,
              task.context,
              task.treeContext,
              task.componentStack,
              task.isFallback
            );
            pushComponentStack(task);
            request.pingedTasks.push(task);
          } else {
            task.blockedBoundary = propName;
            task.hoistableState = propName.contentState;
            task.blockedSegment = contentRootSegment;
            task.keyPath = keyPath;
            contentRootSegment.status = 6;
            try {
              if (renderNode(request, task, props, -1), pushSegmentFinale(
                contentRootSegment.chunks,
                request.renderState,
                contentRootSegment.lastPushedText,
                contentRootSegment.textEmbedded
              ), contentRootSegment.status = 1, queueCompletedSegment(propName, contentRootSegment), 0 === propName.pendingTasks && 0 === propName.status) {
                propName.status = 1;
                break a;
              }
            } catch (thrownValue$28) {
              propName.status = 4, 12 === request.status ? (contentRootSegment.status = 3, newProps = request.fatalError) : (contentRootSegment.status = 4, newProps = thrownValue$28), defaultProps = getThrownInfo(task.componentStack), initialState = logRecoverableError(
                request,
                newProps,
                defaultProps
              ), propName.errorDigest = initialState, untrackBoundary(request, propName);
            } finally {
              task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.blockedSegment = ref, task.keyPath = type;
            }
            task = createRenderTask(
              request,
              null,
              propName$33,
              -1,
              parentBoundary,
              boundarySegment,
              propName.fallbackState,
              fallbackAbortSet,
              [keyPath[0], "Suspense Fallback", keyPath[2]],
              task.formatContext,
              task.context,
              task.treeContext,
              task.componentStack,
              true
            );
            pushComponentStack(task);
            request.pingedTasks.push(task);
          }
        }
        return;
    }
    if ("object" === typeof type && null !== type)
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          if ("ref" in props)
            for (boundarySegment in newProps = {}, props)
              "ref" !== boundarySegment && (newProps[boundarySegment] = props[boundarySegment]);
          else newProps = props;
          type = renderWithHooks(
            request,
            task,
            keyPath,
            type.render,
            newProps,
            ref
          );
          finishFunctionComponent(
            request,
            task,
            keyPath,
            type,
            0 !== localIdCounter,
            actionStateCounter,
            actionStateMatchingIndex
          );
          return;
        case REACT_MEMO_TYPE:
          renderElement(request, task, keyPath, type.type, props, ref);
          return;
        case REACT_PROVIDER_TYPE:
        case REACT_CONTEXT_TYPE:
          defaultProps = props.children;
          newProps = task.keyPath;
          props = props.value;
          initialState = type._currentValue2;
          type._currentValue2 = props;
          ref = currentActiveSnapshot;
          currentActiveSnapshot = type = {
            parent: ref,
            depth: null === ref ? 0 : ref.depth + 1,
            context: type,
            parentValue: initialState,
            value: props
          };
          task.context = type;
          task.keyPath = keyPath;
          renderNodeDestructive(request, task, defaultProps, -1);
          request = currentActiveSnapshot;
          if (null === request) throw Error(formatProdErrorMessage(403));
          request.context._currentValue2 = request.parentValue;
          request = currentActiveSnapshot = request.parent;
          task.context = request;
          task.keyPath = newProps;
          return;
        case REACT_CONSUMER_TYPE:
          props = props.children;
          type = props(type._context._currentValue2);
          props = task.keyPath;
          task.keyPath = keyPath;
          renderNodeDestructive(request, task, type, -1);
          task.keyPath = props;
          return;
        case REACT_LAZY_TYPE:
          newProps = type._init;
          type = newProps(type._payload);
          if (12 === request.status) throw null;
          renderElement(request, task, keyPath, type, props, ref);
          return;
      }
    throw Error(
      formatProdErrorMessage(130, null == type ? type : typeof type, "")
    );
  }
}
function resumeNode(request, task, segmentId, node, childIndex) {
  var prevReplay = task.replay, blockedBoundary = task.blockedBoundary, resumedSegment = createPendingSegment(
    request,
    0,
    null,
    task.formatContext,
    false,
    false
  );
  resumedSegment.id = segmentId;
  resumedSegment.parentFlushed = true;
  try {
    task.replay = null, task.blockedSegment = resumedSegment, renderNode(request, task, node, childIndex), resumedSegment.status = 1, null === blockedBoundary ? request.completedRootSegment = resumedSegment : (queueCompletedSegment(blockedBoundary, resumedSegment), blockedBoundary.parentFlushed && request.partialBoundaries.push(blockedBoundary));
  } finally {
    task.replay = prevReplay, task.blockedSegment = null;
  }
}
function renderNodeDestructive(request, task, node, childIndex) {
  null !== task.replay && "number" === typeof task.replay.slots ? resumeNode(request, task, task.replay.slots, node, childIndex) : (task.node = node, task.childIndex = childIndex, node = task.componentStack, pushComponentStack(task), retryNode(request, task), task.componentStack = node);
}
function retryNode(request, task) {
  var node = task.node, childIndex = task.childIndex;
  if (null !== node) {
    if ("object" === typeof node) {
      switch (node.$$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = node.type, key = node.key, props = node.props;
          node = props.ref;
          var ref = void 0 !== node ? node : null, name = getComponentNameFromType(type), keyOrIndex = null == key ? -1 === childIndex ? 0 : childIndex : key;
          key = [task.keyPath, name, keyOrIndex];
          if (null !== task.replay)
            a: {
              var replay = task.replay;
              childIndex = replay.nodes;
              for (node = 0; node < childIndex.length; node++) {
                var node$jscomp$0 = childIndex[node];
                if (keyOrIndex === node$jscomp$0[1]) {
                  if (4 === node$jscomp$0.length) {
                    if (null !== name && name !== node$jscomp$0[0])
                      throw Error(
                        formatProdErrorMessage(490, node$jscomp$0[0], name)
                      );
                    var childNodes = node$jscomp$0[2];
                    name = node$jscomp$0[3];
                    keyOrIndex = task.node;
                    task.replay = {
                      nodes: childNodes,
                      slots: name,
                      pendingTasks: 1
                    };
                    try {
                      renderElement(request, task, key, type, props, ref);
                      if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                        throw Error(formatProdErrorMessage(488));
                      task.replay.pendingTasks--;
                    } catch (x) {
                      if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then))
                        throw task.node === keyOrIndex && (task.replay = replay), x;
                      task.replay.pendingTasks--;
                      props = getThrownInfo(task.componentStack);
                      key = task.blockedBoundary;
                      type = x;
                      props = logRecoverableError(request, type, props);
                      abortRemainingReplayNodes(
                        request,
                        key,
                        childNodes,
                        name,
                        type,
                        props
                      );
                    }
                    task.replay = replay;
                  } else {
                    if (type !== REACT_SUSPENSE_TYPE)
                      throw Error(
                        formatProdErrorMessage(
                          490,
                          "Suspense",
                          getComponentNameFromType(type) || "Unknown"
                        )
                      );
                    b: {
                      replay = void 0;
                      type = node$jscomp$0[5];
                      ref = node$jscomp$0[2];
                      name = node$jscomp$0[3];
                      keyOrIndex = null === node$jscomp$0[4] ? [] : node$jscomp$0[4][2];
                      node$jscomp$0 = null === node$jscomp$0[4] ? null : node$jscomp$0[4][3];
                      var prevKeyPath = task.keyPath, previousReplaySet = task.replay, parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState, content = props.children;
                      props = props.fallback;
                      var fallbackAbortSet = /* @__PURE__ */ new Set(), resumedBoundary = createSuspenseBoundary(
                        request,
                        fallbackAbortSet
                      );
                      resumedBoundary.parentFlushed = true;
                      resumedBoundary.rootSegmentID = type;
                      task.blockedBoundary = resumedBoundary;
                      task.hoistableState = resumedBoundary.contentState;
                      task.keyPath = key;
                      task.replay = {
                        nodes: ref,
                        slots: name,
                        pendingTasks: 1
                      };
                      try {
                        renderNode(request, task, content, -1);
                        if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                          throw Error(formatProdErrorMessage(488));
                        task.replay.pendingTasks--;
                        if (0 === resumedBoundary.pendingTasks && 0 === resumedBoundary.status) {
                          resumedBoundary.status = 1;
                          request.completedBoundaries.push(resumedBoundary);
                          break b;
                        }
                      } catch (error) {
                        resumedBoundary.status = 4, childNodes = getThrownInfo(task.componentStack), replay = logRecoverableError(
                          request,
                          error,
                          childNodes
                        ), resumedBoundary.errorDigest = replay, task.replay.pendingTasks--, request.clientRenderedBoundaries.push(
                          resumedBoundary
                        );
                      } finally {
                        task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.replay = previousReplaySet, task.keyPath = prevKeyPath;
                      }
                      task = createReplayTask(
                        request,
                        null,
                        {
                          nodes: keyOrIndex,
                          slots: node$jscomp$0,
                          pendingTasks: 0
                        },
                        props,
                        -1,
                        parentBoundary,
                        resumedBoundary.fallbackState,
                        fallbackAbortSet,
                        [key[0], "Suspense Fallback", key[2]],
                        task.formatContext,
                        task.context,
                        task.treeContext,
                        task.componentStack,
                        true
                      );
                      pushComponentStack(task);
                      request.pingedTasks.push(task);
                    }
                  }
                  childIndex.splice(node, 1);
                  break a;
                }
              }
            }
          else renderElement(request, task, key, type, props, ref);
          return;
        case REACT_PORTAL_TYPE:
          throw Error(formatProdErrorMessage(257));
        case REACT_LAZY_TYPE:
          childNodes = node._init;
          node = childNodes(node._payload);
          if (12 === request.status) throw null;
          renderNodeDestructive(request, task, node, childIndex);
          return;
      }
      if (isArrayImpl(node)) {
        renderChildrenArray(request, task, node, childIndex);
        return;
      }
      null === node || "object" !== typeof node ? childNodes = null : (childNodes = MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL] || node["@@iterator"], childNodes = "function" === typeof childNodes ? childNodes : null);
      if (childNodes && (childNodes = childNodes.call(node))) {
        node = childNodes.next();
        if (!node.done) {
          props = [];
          do
            props.push(node.value), node = childNodes.next();
          while (!node.done);
          renderChildrenArray(request, task, props, childIndex);
        }
        return;
      }
      if ("function" === typeof node.then)
        return task.thenableState = null, renderNodeDestructive(request, task, unwrapThenable(node), childIndex);
      if (node.$$typeof === REACT_CONTEXT_TYPE)
        return renderNodeDestructive(
          request,
          task,
          node._currentValue2,
          childIndex
        );
      childIndex = Object.prototype.toString.call(node);
      throw Error(
        formatProdErrorMessage(
          31,
          "[object Object]" === childIndex ? "object with keys {" + Object.keys(node).join(", ") + "}" : childIndex
        )
      );
    }
    if ("string" === typeof node)
      childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
        childIndex.chunks,
        node,
        request.renderState,
        childIndex.lastPushedText
      ));
    else if ("number" === typeof node || "bigint" === typeof node)
      childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
        childIndex.chunks,
        "" + node,
        request.renderState,
        childIndex.lastPushedText
      ));
  }
}
function renderChildrenArray(request, task, children, childIndex) {
  var prevKeyPath = task.keyPath;
  if (-1 !== childIndex && (task.keyPath = [task.keyPath, "Fragment", childIndex], null !== task.replay)) {
    for (var replay = task.replay, replayNodes = replay.nodes, j = 0; j < replayNodes.length; j++) {
      var node = replayNodes[j];
      if (node[1] === childIndex) {
        childIndex = node[2];
        node = node[3];
        task.replay = { nodes: childIndex, slots: node, pendingTasks: 1 };
        try {
          renderChildrenArray(request, task, children, -1);
          if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
            throw Error(formatProdErrorMessage(488));
          task.replay.pendingTasks--;
        } catch (x) {
          if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then))
            throw x;
          task.replay.pendingTasks--;
          children = getThrownInfo(task.componentStack);
          var boundary = task.blockedBoundary, error = x;
          children = logRecoverableError(request, error, children);
          abortRemainingReplayNodes(
            request,
            boundary,
            childIndex,
            node,
            error,
            children
          );
        }
        task.replay = replay;
        replayNodes.splice(j, 1);
        break;
      }
    }
    task.keyPath = prevKeyPath;
    return;
  }
  replay = task.treeContext;
  replayNodes = children.length;
  if (null !== task.replay && (j = task.replay.slots, null !== j && "object" === typeof j)) {
    for (childIndex = 0; childIndex < replayNodes; childIndex++)
      node = children[childIndex], task.treeContext = pushTreeContext(replay, replayNodes, childIndex), boundary = j[childIndex], "number" === typeof boundary ? (resumeNode(request, task, boundary, node, childIndex), delete j[childIndex]) : renderNode(request, task, node, childIndex);
    task.treeContext = replay;
    task.keyPath = prevKeyPath;
    return;
  }
  for (j = 0; j < replayNodes; j++)
    childIndex = children[j], task.treeContext = pushTreeContext(replay, replayNodes, j), renderNode(request, task, childIndex, j);
  task.treeContext = replay;
  task.keyPath = prevKeyPath;
}
function untrackBoundary(request, boundary) {
  request = request.trackedPostpones;
  null !== request && (boundary = boundary.trackedContentKeyPath, null !== boundary && (boundary = request.workingMap.get(boundary), void 0 !== boundary && (boundary.length = 4, boundary[2] = [], boundary[3] = null)));
}
function spawnNewSuspendedReplayTask(request, task, thenableState2) {
  return createReplayTask(
    request,
    thenableState2,
    task.replay,
    task.node,
    task.childIndex,
    task.blockedBoundary,
    task.hoistableState,
    task.abortSet,
    task.keyPath,
    task.formatContext,
    task.context,
    task.treeContext,
    task.componentStack,
    task.isFallback
  );
}
function spawnNewSuspendedRenderTask(request, task, thenableState2) {
  var segment = task.blockedSegment, newSegment = createPendingSegment(
    request,
    segment.chunks.length,
    null,
    task.formatContext,
    segment.lastPushedText,
    true
  );
  segment.children.push(newSegment);
  segment.lastPushedText = false;
  return createRenderTask(
    request,
    thenableState2,
    task.node,
    task.childIndex,
    task.blockedBoundary,
    newSegment,
    task.hoistableState,
    task.abortSet,
    task.keyPath,
    task.formatContext,
    task.context,
    task.treeContext,
    task.componentStack,
    task.isFallback
  );
}
function renderNode(request, task, node, childIndex) {
  var previousFormatContext = task.formatContext, previousContext = task.context, previousKeyPath = task.keyPath, previousTreeContext = task.treeContext, previousComponentStack = task.componentStack, segment = task.blockedSegment;
  if (null === segment)
    try {
      return renderNodeDestructive(request, task, node, childIndex);
    } catch (thrownValue) {
      if (resetHooksState(), node = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, "object" === typeof node && null !== node) {
        if ("function" === typeof node.then) {
          childIndex = getThenableStateAfterSuspending();
          request = spawnNewSuspendedReplayTask(request, task, childIndex).ping;
          node.then(request, request);
          task.formatContext = previousFormatContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext;
          task.componentStack = previousComponentStack;
          switchContext(previousContext);
          return;
        }
        if ("Maximum call stack size exceeded" === node.message) {
          node = getThenableStateAfterSuspending();
          node = spawnNewSuspendedReplayTask(request, task, node);
          request.pingedTasks.push(node);
          task.formatContext = previousFormatContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext;
          task.componentStack = previousComponentStack;
          switchContext(previousContext);
          return;
        }
      }
    }
  else {
    var childrenLength = segment.children.length, chunkLength = segment.chunks.length;
    try {
      return renderNodeDestructive(request, task, node, childIndex);
    } catch (thrownValue$48) {
      if (resetHooksState(), segment.children.length = childrenLength, segment.chunks.length = chunkLength, node = thrownValue$48 === SuspenseException ? getSuspendedThenable() : thrownValue$48, "object" === typeof node && null !== node) {
        if ("function" === typeof node.then) {
          childIndex = getThenableStateAfterSuspending();
          request = spawnNewSuspendedRenderTask(request, task, childIndex).ping;
          node.then(request, request);
          task.formatContext = previousFormatContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext;
          task.componentStack = previousComponentStack;
          switchContext(previousContext);
          return;
        }
        if ("Maximum call stack size exceeded" === node.message) {
          node = getThenableStateAfterSuspending();
          node = spawnNewSuspendedRenderTask(request, task, node);
          request.pingedTasks.push(node);
          task.formatContext = previousFormatContext;
          task.context = previousContext;
          task.keyPath = previousKeyPath;
          task.treeContext = previousTreeContext;
          task.componentStack = previousComponentStack;
          switchContext(previousContext);
          return;
        }
      }
    }
  }
  task.formatContext = previousFormatContext;
  task.context = previousContext;
  task.keyPath = previousKeyPath;
  task.treeContext = previousTreeContext;
  switchContext(previousContext);
  throw node;
}
function abortTaskSoft(task) {
  var boundary = task.blockedBoundary;
  task = task.blockedSegment;
  null !== task && (task.status = 3, finishedTask(this, boundary, task));
}
function abortRemainingReplayNodes(request$jscomp$0, boundary, nodes, slots, error, errorDigest$jscomp$0) {
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (4 === node.length)
      abortRemainingReplayNodes(
        request$jscomp$0,
        boundary,
        node[2],
        node[3],
        error,
        errorDigest$jscomp$0
      );
    else {
      node = node[5];
      var request = request$jscomp$0, errorDigest = errorDigest$jscomp$0, resumedBoundary = createSuspenseBoundary(request, /* @__PURE__ */ new Set());
      resumedBoundary.parentFlushed = true;
      resumedBoundary.rootSegmentID = node;
      resumedBoundary.status = 4;
      resumedBoundary.errorDigest = errorDigest;
      resumedBoundary.parentFlushed && request.clientRenderedBoundaries.push(resumedBoundary);
    }
  }
  nodes.length = 0;
  if (null !== slots) {
    if (null === boundary) throw Error(formatProdErrorMessage(487));
    4 !== boundary.status && (boundary.status = 4, boundary.errorDigest = errorDigest$jscomp$0, boundary.parentFlushed && request$jscomp$0.clientRenderedBoundaries.push(boundary));
    if ("object" === typeof slots) for (var index in slots) delete slots[index];
  }
}
function abortTask(task, request, error) {
  var boundary = task.blockedBoundary, segment = task.blockedSegment;
  if (null !== segment) {
    if (6 === segment.status) return;
    segment.status = 3;
  }
  segment = getThrownInfo(task.componentStack);
  if (null === boundary) {
    if (13 !== request.status && 14 !== request.status) {
      boundary = task.replay;
      if (null === boundary) {
        logRecoverableError(request, error, segment);
        fatalError(request, error);
        return;
      }
      boundary.pendingTasks--;
      0 === boundary.pendingTasks && 0 < boundary.nodes.length && (task = logRecoverableError(request, error, segment), abortRemainingReplayNodes(
        request,
        null,
        boundary.nodes,
        boundary.slots,
        error,
        task
      ));
      request.pendingRootTasks--;
      0 === request.pendingRootTasks && completeShell(request);
    }
  } else
    boundary.pendingTasks--, 4 !== boundary.status && (boundary.status = 4, task = logRecoverableError(request, error, segment), boundary.status = 4, boundary.errorDigest = task, untrackBoundary(request, boundary), boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary)), boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
      return abortTask(fallbackTask, request, error);
    }), boundary.fallbackAbortableTasks.clear();
  request.allPendingTasks--;
  0 === request.allPendingTasks && completeAll(request);
}
function safelyEmitEarlyPreloads(request, shellComplete) {
  try {
    var renderState = request.renderState, onHeaders = renderState.onHeaders;
    if (onHeaders) {
      var headers = renderState.headers;
      if (headers) {
        renderState.headers = null;
        var linkHeader = headers.preconnects;
        headers.fontPreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.fontPreloads);
        headers.highImagePreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.highImagePreloads);
        if (!shellComplete) {
          var queueIter = renderState.styles.values(), queueStep = queueIter.next();
          b: for (; 0 < headers.remainingCapacity && !queueStep.done; queueStep = queueIter.next())
            for (var sheetIter = queueStep.value.sheets.values(), sheetStep = sheetIter.next(); 0 < headers.remainingCapacity && !sheetStep.done; sheetStep = sheetIter.next()) {
              var sheet = sheetStep.value, props = sheet.props, key = props.href, props$jscomp$0 = sheet.props, header = getPreloadAsHeader(props$jscomp$0.href, "style", {
                crossOrigin: props$jscomp$0.crossOrigin,
                integrity: props$jscomp$0.integrity,
                nonce: props$jscomp$0.nonce,
                type: props$jscomp$0.type,
                fetchPriority: props$jscomp$0.fetchPriority,
                referrerPolicy: props$jscomp$0.referrerPolicy,
                media: props$jscomp$0.media
              });
              if (0 <= (headers.remainingCapacity -= header.length + 2))
                renderState.resets.style[key] = PRELOAD_NO_CREDS, linkHeader && (linkHeader += ", "), linkHeader += header, renderState.resets.style[key] = "string" === typeof props.crossOrigin || "string" === typeof props.integrity ? [props.crossOrigin, props.integrity] : PRELOAD_NO_CREDS;
              else break b;
            }
        }
        linkHeader ? onHeaders({ Link: linkHeader }) : onHeaders({});
      }
    }
  } catch (error) {
    logRecoverableError(request, error, {});
  }
}
function completeShell(request) {
  null === request.trackedPostpones && safelyEmitEarlyPreloads(request, true);
  request.onShellError = noop;
  request = request.onShellReady;
  request();
}
function completeAll(request) {
  safelyEmitEarlyPreloads(
    request,
    null === request.trackedPostpones ? true : null === request.completedRootSegment || 5 !== request.completedRootSegment.status
  );
  request = request.onAllReady;
  request();
}
function queueCompletedSegment(boundary, segment) {
  if (0 === segment.chunks.length && 1 === segment.children.length && null === segment.children[0].boundary && -1 === segment.children[0].id) {
    var childSegment = segment.children[0];
    childSegment.id = segment.id;
    childSegment.parentFlushed = true;
    1 === childSegment.status && queueCompletedSegment(boundary, childSegment);
  } else boundary.completedSegments.push(segment);
}
function finishedTask(request, boundary, segment) {
  if (null === boundary) {
    if (null !== segment && segment.parentFlushed) {
      if (null !== request.completedRootSegment)
        throw Error(formatProdErrorMessage(389));
      request.completedRootSegment = segment;
    }
    request.pendingRootTasks--;
    0 === request.pendingRootTasks && completeShell(request);
  } else
    boundary.pendingTasks--, 4 !== boundary.status && (0 === boundary.pendingTasks ? (0 === boundary.status && (boundary.status = 1), null !== segment && segment.parentFlushed && 1 === segment.status && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), 1 === boundary.status && (boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear())) : null !== segment && segment.parentFlushed && 1 === segment.status && (queueCompletedSegment(boundary, segment), 1 === boundary.completedSegments.length && boundary.parentFlushed && request.partialBoundaries.push(boundary)));
  request.allPendingTasks--;
  0 === request.allPendingTasks && completeAll(request);
}
function performWork(request$jscomp$2) {
  if (14 !== request$jscomp$2.status && 13 !== request$jscomp$2.status) {
    var prevContext = currentActiveSnapshot, prevDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = HooksDispatcher;
    var prevAsyncDispatcher = ReactSharedInternals.A;
    ReactSharedInternals.A = DefaultAsyncDispatcher;
    var prevRequest = currentRequest;
    currentRequest = request$jscomp$2;
    var prevResumableState = currentResumableState;
    currentResumableState = request$jscomp$2.resumableState;
    try {
      var pingedTasks = request$jscomp$2.pingedTasks, i;
      for (i = 0; i < pingedTasks.length; i++) {
        var task = pingedTasks[i], request = request$jscomp$2, segment = task.blockedSegment;
        if (null === segment) {
          var request$jscomp$0 = request;
          if (0 !== task.replay.pendingTasks) {
            switchContext(task.context);
            try {
              "number" === typeof task.replay.slots ? resumeNode(
                request$jscomp$0,
                task,
                task.replay.slots,
                task.node,
                task.childIndex
              ) : retryNode(request$jscomp$0, task);
              if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                throw Error(formatProdErrorMessage(488));
              task.replay.pendingTasks--;
              task.abortSet.delete(task);
              finishedTask(request$jscomp$0, task.blockedBoundary, null);
            } catch (thrownValue) {
              resetHooksState();
              var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
              if ("object" === typeof x && null !== x && "function" === typeof x.then) {
                var ping = task.ping;
                x.then(ping, ping);
                task.thenableState = getThenableStateAfterSuspending();
              } else {
                task.replay.pendingTasks--;
                task.abortSet.delete(task);
                var errorInfo = getThrownInfo(task.componentStack);
                request = void 0;
                var request$jscomp$1 = request$jscomp$0, boundary = task.blockedBoundary, error$jscomp$0 = 12 === request$jscomp$0.status ? request$jscomp$0.fatalError : x, replayNodes = task.replay.nodes, resumeSlots = task.replay.slots;
                request = logRecoverableError(
                  request$jscomp$1,
                  error$jscomp$0,
                  errorInfo
                );
                abortRemainingReplayNodes(
                  request$jscomp$1,
                  boundary,
                  replayNodes,
                  resumeSlots,
                  error$jscomp$0,
                  request
                );
                request$jscomp$0.pendingRootTasks--;
                0 === request$jscomp$0.pendingRootTasks && completeShell(request$jscomp$0);
                request$jscomp$0.allPendingTasks--;
                0 === request$jscomp$0.allPendingTasks && completeAll(request$jscomp$0);
              }
            } finally {
            }
          }
        } else if (request$jscomp$0 = void 0, request$jscomp$1 = segment, 0 === request$jscomp$1.status) {
          request$jscomp$1.status = 6;
          switchContext(task.context);
          var childrenLength = request$jscomp$1.children.length, chunkLength = request$jscomp$1.chunks.length;
          try {
            retryNode(request, task), pushSegmentFinale(
              request$jscomp$1.chunks,
              request.renderState,
              request$jscomp$1.lastPushedText,
              request$jscomp$1.textEmbedded
            ), task.abortSet.delete(task), request$jscomp$1.status = 1, finishedTask(request, task.blockedBoundary, request$jscomp$1);
          } catch (thrownValue) {
            resetHooksState();
            request$jscomp$1.children.length = childrenLength;
            request$jscomp$1.chunks.length = chunkLength;
            var x$jscomp$0 = thrownValue === SuspenseException ? getSuspendedThenable() : 12 === request.status ? request.fatalError : thrownValue;
            if ("object" === typeof x$jscomp$0 && null !== x$jscomp$0 && "function" === typeof x$jscomp$0.then) {
              request$jscomp$1.status = 0;
              task.thenableState = getThenableStateAfterSuspending();
              var ping$jscomp$0 = task.ping;
              x$jscomp$0.then(ping$jscomp$0, ping$jscomp$0);
            } else {
              var errorInfo$jscomp$0 = getThrownInfo(task.componentStack);
              task.abortSet.delete(task);
              request$jscomp$1.status = 4;
              var boundary$jscomp$0 = task.blockedBoundary;
              request$jscomp$0 = logRecoverableError(
                request,
                x$jscomp$0,
                errorInfo$jscomp$0
              );
              null === boundary$jscomp$0 ? fatalError(request, x$jscomp$0) : (boundary$jscomp$0.pendingTasks--, 4 !== boundary$jscomp$0.status && (boundary$jscomp$0.status = 4, boundary$jscomp$0.errorDigest = request$jscomp$0, untrackBoundary(request, boundary$jscomp$0), boundary$jscomp$0.parentFlushed && request.clientRenderedBoundaries.push(
                boundary$jscomp$0
              )));
              request.allPendingTasks--;
              0 === request.allPendingTasks && completeAll(request);
            }
          } finally {
          }
        }
      }
      pingedTasks.splice(0, i);
      null !== request$jscomp$2.destination && flushCompletedQueues(request$jscomp$2, request$jscomp$2.destination);
    } catch (error) {
      logRecoverableError(request$jscomp$2, error, {}), fatalError(request$jscomp$2, error);
    } finally {
      currentResumableState = prevResumableState, ReactSharedInternals.H = prevDispatcher, ReactSharedInternals.A = prevAsyncDispatcher, prevDispatcher === HooksDispatcher && switchContext(prevContext), currentRequest = prevRequest;
    }
  }
}
function flushSubtree(request, destination, segment, hoistableState) {
  segment.parentFlushed = true;
  switch (segment.status) {
    case 0:
      segment.id = request.nextSegmentId++;
    case 5:
      return hoistableState = segment.id, segment.lastPushedText = false, segment.textEmbedded = false, request = request.renderState, destination.push('<template id="'), destination.push(request.placeholderPrefix), request = hoistableState.toString(16), destination.push(request), destination.push('"></template>');
    case 1:
      segment.status = 2;
      var r = true, chunks = segment.chunks, chunkIdx = 0;
      segment = segment.children;
      for (var childIdx = 0; childIdx < segment.length; childIdx++) {
        for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
          destination.push(chunks[chunkIdx]);
        r = flushSegment(request, destination, r, hoistableState);
      }
      for (; chunkIdx < chunks.length - 1; chunkIdx++)
        destination.push(chunks[chunkIdx]);
      chunkIdx < chunks.length && (r = destination.push(chunks[chunkIdx]));
      return r;
    default:
      throw Error(formatProdErrorMessage(390));
  }
}
function flushSegment(request, destination, segment, hoistableState) {
  var boundary = segment.boundary;
  if (null === boundary)
    return flushSubtree(request, destination, segment, hoistableState);
  boundary.parentFlushed = true;
  if (4 === boundary.status)
    return request.renderState.generateStaticMarkup || (boundary = boundary.errorDigest, destination.push("<!--$!-->"), destination.push("<template"), boundary && (destination.push(' data-dgst="'), boundary = escapeTextForBrowser(boundary), destination.push(boundary), destination.push('"')), destination.push("></template>")), flushSubtree(request, destination, segment, hoistableState), request = request.renderState.generateStaticMarkup ? true : destination.push("<!--/$-->"), request;
  if (1 !== boundary.status)
    return 0 === boundary.status && (boundary.rootSegmentID = request.nextSegmentId++), 0 < boundary.completedSegments.length && request.partialBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
      destination,
      request.renderState,
      boundary.rootSegmentID
    ), hoistableState && (boundary = boundary.fallbackState, boundary.styles.forEach(hoistStyleQueueDependency, hoistableState), boundary.stylesheets.forEach(
      hoistStylesheetDependency,
      hoistableState
    )), flushSubtree(request, destination, segment, hoistableState), destination.push("<!--/$-->");
  if (boundary.byteSize > request.progressiveChunkSize)
    return boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
      destination,
      request.renderState,
      boundary.rootSegmentID
    ), flushSubtree(request, destination, segment, hoistableState), destination.push("<!--/$-->");
  hoistableState && (segment = boundary.contentState, segment.styles.forEach(hoistStyleQueueDependency, hoistableState), segment.stylesheets.forEach(hoistStylesheetDependency, hoistableState));
  request.renderState.generateStaticMarkup || destination.push("<!--$-->");
  segment = boundary.completedSegments;
  if (1 !== segment.length) throw Error(formatProdErrorMessage(391));
  flushSegment(request, destination, segment[0], hoistableState);
  request = request.renderState.generateStaticMarkup ? true : destination.push("<!--/$-->");
  return request;
}
function flushSegmentContainer(request, destination, segment, hoistableState) {
  writeStartSegment(
    destination,
    request.renderState,
    segment.parentFormatContext,
    segment.id
  );
  flushSegment(request, destination, segment, hoistableState);
  return writeEndSegment(destination, segment.parentFormatContext);
}
function flushCompletedBoundary(request, destination, boundary) {
  for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++)
    flushPartiallyCompletedSegment(
      request,
      destination,
      boundary,
      completedSegments[i]
    );
  completedSegments.length = 0;
  writeHoistablesForBoundary(
    destination,
    boundary.contentState,
    request.renderState
  );
  completedSegments = request.resumableState;
  request = request.renderState;
  i = boundary.rootSegmentID;
  boundary = boundary.contentState;
  var requiresStyleInsertion = request.stylesToHoist;
  request.stylesToHoist = false;
  destination.push(request.startInlineScript);
  requiresStyleInsertion ? 0 === (completedSegments.instructions & 2) ? (completedSegments.instructions |= 10, destination.push(
    '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
  )) : 0 === (completedSegments.instructions & 8) ? (completedSegments.instructions |= 8, destination.push(
    '$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
  )) : destination.push('$RR("') : 0 === (completedSegments.instructions & 2) ? (completedSegments.instructions |= 2, destination.push(
    '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("'
  )) : destination.push('$RC("');
  completedSegments = i.toString(16);
  destination.push(request.boundaryPrefix);
  destination.push(completedSegments);
  destination.push('","');
  destination.push(request.segmentPrefix);
  destination.push(completedSegments);
  requiresStyleInsertion ? (destination.push('",'), writeStyleResourceDependenciesInJS(destination, boundary)) : destination.push('"');
  boundary = destination.push(")<\/script>");
  return writeBootstrap(destination, request) && boundary;
}
function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
  if (2 === segment.status) return true;
  var hoistableState = boundary.contentState, segmentID = segment.id;
  if (-1 === segmentID) {
    if (-1 === (segment.id = boundary.rootSegmentID))
      throw Error(formatProdErrorMessage(392));
    return flushSegmentContainer(request, destination, segment, hoistableState);
  }
  if (segmentID === boundary.rootSegmentID)
    return flushSegmentContainer(request, destination, segment, hoistableState);
  flushSegmentContainer(request, destination, segment, hoistableState);
  boundary = request.resumableState;
  request = request.renderState;
  destination.push(request.startInlineScript);
  0 === (boundary.instructions & 1) ? (boundary.instructions |= 1, destination.push(
    '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
  )) : destination.push('$RS("');
  destination.push(request.segmentPrefix);
  segmentID = segmentID.toString(16);
  destination.push(segmentID);
  destination.push('","');
  destination.push(request.placeholderPrefix);
  destination.push(segmentID);
  destination = destination.push('")<\/script>');
  return destination;
}
function flushCompletedQueues(request, destination) {
  try {
    if (!(0 < request.pendingRootTasks)) {
      var i, completedRootSegment = request.completedRootSegment;
      if (null !== completedRootSegment) {
        if (5 === completedRootSegment.status) return;
        var renderState = request.renderState, htmlChunks = renderState.htmlChunks, headChunks = renderState.headChunks, i$jscomp$0;
        if (htmlChunks) {
          for (i$jscomp$0 = 0; i$jscomp$0 < htmlChunks.length; i$jscomp$0++)
            destination.push(htmlChunks[i$jscomp$0]);
          if (headChunks)
            for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
              destination.push(headChunks[i$jscomp$0]);
          else {
            var chunk = startChunkForTag("head");
            destination.push(chunk);
            destination.push(">");
          }
        } else if (headChunks)
          for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
            destination.push(headChunks[i$jscomp$0]);
        var charsetChunks = renderState.charsetChunks;
        for (i$jscomp$0 = 0; i$jscomp$0 < charsetChunks.length; i$jscomp$0++)
          destination.push(charsetChunks[i$jscomp$0]);
        charsetChunks.length = 0;
        renderState.preconnects.forEach(flushResource, destination);
        renderState.preconnects.clear();
        var viewportChunks = renderState.viewportChunks;
        for (i$jscomp$0 = 0; i$jscomp$0 < viewportChunks.length; i$jscomp$0++)
          destination.push(viewportChunks[i$jscomp$0]);
        viewportChunks.length = 0;
        renderState.fontPreloads.forEach(flushResource, destination);
        renderState.fontPreloads.clear();
        renderState.highImagePreloads.forEach(flushResource, destination);
        renderState.highImagePreloads.clear();
        renderState.styles.forEach(flushStylesInPreamble, destination);
        var importMapChunks = renderState.importMapChunks;
        for (i$jscomp$0 = 0; i$jscomp$0 < importMapChunks.length; i$jscomp$0++)
          destination.push(importMapChunks[i$jscomp$0]);
        importMapChunks.length = 0;
        renderState.bootstrapScripts.forEach(flushResource, destination);
        renderState.scripts.forEach(flushResource, destination);
        renderState.scripts.clear();
        renderState.bulkPreloads.forEach(flushResource, destination);
        renderState.bulkPreloads.clear();
        var hoistableChunks = renderState.hoistableChunks;
        for (i$jscomp$0 = 0; i$jscomp$0 < hoistableChunks.length; i$jscomp$0++)
          destination.push(hoistableChunks[i$jscomp$0]);
        hoistableChunks.length = 0;
        if (htmlChunks && null === headChunks) {
          var chunk$jscomp$0 = endChunkForTag("head");
          destination.push(chunk$jscomp$0);
        }
        flushSegment(request, destination, completedRootSegment, null);
        request.completedRootSegment = null;
        writeBootstrap(destination, request.renderState);
      }
      var renderState$jscomp$0 = request.renderState;
      completedRootSegment = 0;
      var viewportChunks$jscomp$0 = renderState$jscomp$0.viewportChunks;
      for (completedRootSegment = 0; completedRootSegment < viewportChunks$jscomp$0.length; completedRootSegment++)
        destination.push(viewportChunks$jscomp$0[completedRootSegment]);
      viewportChunks$jscomp$0.length = 0;
      renderState$jscomp$0.preconnects.forEach(flushResource, destination);
      renderState$jscomp$0.preconnects.clear();
      renderState$jscomp$0.fontPreloads.forEach(flushResource, destination);
      renderState$jscomp$0.fontPreloads.clear();
      renderState$jscomp$0.highImagePreloads.forEach(
        flushResource,
        destination
      );
      renderState$jscomp$0.highImagePreloads.clear();
      renderState$jscomp$0.styles.forEach(preloadLateStyles, destination);
      renderState$jscomp$0.scripts.forEach(flushResource, destination);
      renderState$jscomp$0.scripts.clear();
      renderState$jscomp$0.bulkPreloads.forEach(flushResource, destination);
      renderState$jscomp$0.bulkPreloads.clear();
      var hoistableChunks$jscomp$0 = renderState$jscomp$0.hoistableChunks;
      for (completedRootSegment = 0; completedRootSegment < hoistableChunks$jscomp$0.length; completedRootSegment++)
        destination.push(hoistableChunks$jscomp$0[completedRootSegment]);
      hoistableChunks$jscomp$0.length = 0;
      var clientRenderedBoundaries = request.clientRenderedBoundaries;
      for (i = 0; i < clientRenderedBoundaries.length; i++) {
        var boundary = clientRenderedBoundaries[i];
        renderState$jscomp$0 = destination;
        var resumableState = request.resumableState, renderState$jscomp$1 = request.renderState, id = boundary.rootSegmentID, errorDigest = boundary.errorDigest;
        renderState$jscomp$0.push(renderState$jscomp$1.startInlineScript);
        0 === (resumableState.instructions & 4) ? (resumableState.instructions |= 4, renderState$jscomp$0.push(
          '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
        )) : renderState$jscomp$0.push('$RX("');
        renderState$jscomp$0.push(renderState$jscomp$1.boundaryPrefix);
        var chunk$jscomp$1 = id.toString(16);
        renderState$jscomp$0.push(chunk$jscomp$1);
        renderState$jscomp$0.push('"');
        if (errorDigest) {
          renderState$jscomp$0.push(",");
          var chunk$jscomp$2 = escapeJSStringsForInstructionScripts(
            errorDigest || ""
          );
          renderState$jscomp$0.push(chunk$jscomp$2);
        }
        var JSCompiler_inline_result = renderState$jscomp$0.push(")<\/script>");
        if (!JSCompiler_inline_result) {
          request.destination = null;
          i++;
          clientRenderedBoundaries.splice(0, i);
          return;
        }
      }
      clientRenderedBoundaries.splice(0, i);
      var completedBoundaries = request.completedBoundaries;
      for (i = 0; i < completedBoundaries.length; i++)
        if (!flushCompletedBoundary(request, destination, completedBoundaries[i])) {
          request.destination = null;
          i++;
          completedBoundaries.splice(0, i);
          return;
        }
      completedBoundaries.splice(0, i);
      var partialBoundaries = request.partialBoundaries;
      for (i = 0; i < partialBoundaries.length; i++) {
        var boundary$51 = partialBoundaries[i];
        a: {
          clientRenderedBoundaries = request;
          boundary = destination;
          var completedSegments = boundary$51.completedSegments;
          for (JSCompiler_inline_result = 0; JSCompiler_inline_result < completedSegments.length; JSCompiler_inline_result++)
            if (!flushPartiallyCompletedSegment(
              clientRenderedBoundaries,
              boundary,
              boundary$51,
              completedSegments[JSCompiler_inline_result]
            )) {
              JSCompiler_inline_result++;
              completedSegments.splice(0, JSCompiler_inline_result);
              var JSCompiler_inline_result$jscomp$0 = false;
              break a;
            }
          completedSegments.splice(0, JSCompiler_inline_result);
          JSCompiler_inline_result$jscomp$0 = writeHoistablesForBoundary(
            boundary,
            boundary$51.contentState,
            clientRenderedBoundaries.renderState
          );
        }
        if (!JSCompiler_inline_result$jscomp$0) {
          request.destination = null;
          i++;
          partialBoundaries.splice(0, i);
          return;
        }
      }
      partialBoundaries.splice(0, i);
      var largeBoundaries = request.completedBoundaries;
      for (i = 0; i < largeBoundaries.length; i++)
        if (!flushCompletedBoundary(request, destination, largeBoundaries[i])) {
          request.destination = null;
          i++;
          largeBoundaries.splice(0, i);
          return;
        }
      largeBoundaries.splice(0, i);
    }
  } finally {
    0 === request.allPendingTasks && 0 === request.pingedTasks.length && 0 === request.clientRenderedBoundaries.length && 0 === request.completedBoundaries.length && (request.flushScheduled = false, i = request.resumableState, i.hasBody && (partialBoundaries = endChunkForTag("body"), destination.push(partialBoundaries)), i.hasHtml && (i = endChunkForTag("html"), destination.push(i)), request.status = 14, destination.push(null), request.destination = null);
  }
}
function enqueueFlush(request) {
  if (false === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination) {
    request.flushScheduled = true;
    var destination = request.destination;
    destination ? flushCompletedQueues(request, destination) : request.flushScheduled = false;
  }
}
function startFlowing(request, destination) {
  if (13 === request.status)
    request.status = 14, destination.destroy(request.fatalError);
  else if (14 !== request.status && null === request.destination) {
    request.destination = destination;
    try {
      flushCompletedQueues(request, destination);
    } catch (error) {
      logRecoverableError(request, error, {}), fatalError(request, error);
    }
  }
}
function abort(request, reason) {
  if (11 === request.status || 10 === request.status) request.status = 12;
  try {
    var abortableTasks = request.abortableTasks;
    if (0 < abortableTasks.size) {
      var error = void 0 === reason ? Error(formatProdErrorMessage(432)) : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error(formatProdErrorMessage(530)) : reason;
      request.fatalError = error;
      abortableTasks.forEach(function(task) {
        return abortTask(task, request, error);
      });
      abortableTasks.clear();
    }
    null !== request.destination && flushCompletedQueues(request, request.destination);
  } catch (error$53) {
    logRecoverableError(request, error$53, {}), fatalError(request, error$53);
  }
}
function onError() {
}
function renderToStringImpl(children, options, generateStaticMarkup, abortReason) {
  var didFatal = false, fatalError2 = null, result = "", readyToStream = false;
  options = createResumableState(options ? options.identifierPrefix : void 0);
  children = createRequest(
    children,
    options,
    createRenderState(options, generateStaticMarkup),
    createFormatContext(0, null, 0),
    Infinity,
    onError,
    void 0,
    function() {
      readyToStream = true;
    },
    void 0,
    void 0,
    void 0
  );
  children.flushScheduled = null !== children.destination;
  performWork(children);
  10 === children.status && (children.status = 11);
  null === children.trackedPostpones && safelyEmitEarlyPreloads(children, 0 === children.pendingRootTasks);
  abort(children, abortReason);
  startFlowing(children, {
    push: function(chunk) {
      null !== chunk && (result += chunk);
      return true;
    },
    destroy: function(error) {
      didFatal = true;
      fatalError2 = error;
    }
  });
  if (didFatal && fatalError2 !== abortReason) throw fatalError2;
  if (!readyToStream) throw Error(formatProdErrorMessage(426));
  return result;
}
reactDomServerLegacy_browser_production.renderToStaticMarkup = function(children, options) {
  return renderToStringImpl(
    children,
    options,
    true,
    'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server'
  );
};
reactDomServerLegacy_browser_production.renderToString = function(children, options) {
  return renderToStringImpl(
    children,
    options,
    false,
    'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server'
  );
};
reactDomServerLegacy_browser_production.version = "19.0.0";
var b;
var l;
{
  b = reactDomServer_edge_production;
  l = reactDomServerLegacy_browser_production;
}
b.version;
var renderToReadableStream = b.renderToReadableStream;
l.renderToString;
l.renderToStaticMarkup;
if (b.resume) {
  b.resume;
}
const ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, routerContext, _loadContext) {
  let shellRendered = false;
  const userAgent = request.headers.get("user-agent");
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServerRouter,
      {
        context: routerContext,
        url: request.url,
        abortDelay: ABORT_DELAY
      }
    ),
    {
      onError(error) {
        responseStatusCode = 500;
        if (shellRendered) {
          console.error(error);
        }
      }
    }
  );
  shellRendered = true;
  if (userAgent && isbot(userAgent) || routerContext.isSpaMode) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component2) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return reactExports.createElement(Component2, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return reactExports.createElement(ErrorBoundary3, props);
  };
}
const stylesheet = "/assets/app-BmO3rm-F.css";
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: stylesheet
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsxs("head", {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, {}), /* @__PURE__ */ jsxRuntimeExports.jsx(Links, {})]
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("body", {
      children: [children, /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollRestoration, {}), /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
function loader({
  context
}) {
  return {
    message: context.VALUE_FROM_CLOUDFLARE
  };
}
const home = withComponentProps(function Home({
  loaderData
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
    children: "homw"
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C1wptIQo.js", "imports": ["/assets/chunk-D52XG6IA-C_PBXKmx.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DXR21_vG.js", "imports": ["/assets/chunk-D52XG6IA-C_PBXKmx.js", "/assets/with-props-B1Bv_2nK.js"], "css": [] }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-DRn6Kpir.js", "imports": ["/assets/with-props-B1Bv_2nK.js", "/assets/chunk-D52XG6IA-C_PBXKmx.js"], "css": [] } }, "url": "/assets/manifest-e4522271.js", "version": "e4522271" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
const serverBuild = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assets: serverManifest,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
}, Symbol.toStringTag, { value: "Module" }));
export {
  app as default
};
