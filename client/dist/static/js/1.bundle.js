(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{148:
/*!******************************************!*\
  !*** ./node_modules/set/pkg/node/set.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e,n){var r;const o=Math.random;t.exports.__wbg_f_random_js_random_n=function(){return o()};const i=console.log;let u=new(0,n(/*! util */149).TextDecoder)("utf-8"),s=null;function c(){return null!==s&&s.buffer===r.memory.buffer||(s=new Uint8Array(r.memory.buffer)),s}function l(t,e){return u.decode(c().slice(t,t+e))}let f=null;function a(){return null!==f&&f.buffer===r.memory.buffer||(f=new Uint32Array(r.memory.buffer)),f}let p=null;function _(){return null===p&&(p=r.__wbindgen_global_argument_ptr()),p}function g(t){const e=_()/4+t;return a()[e]}t.exports.__wbg_f_log_console_log_n=function(t){let e=l(t,g(0));i(e)},t.exports.random_f64=function(){return r.random_f64()};let b=new(0,n(/*! util */149).TextEncoder)("utf-8");function d(t){const e=b.encode(t),n=r.__wbindgen_malloc(e.length);return c().set(e,n),[n,e.length]}function y(t,e){const n=_()/4+e;a()[n]=t}t.exports.Set=class t{static __construct(e){return new t(e)}constructor(t){this.ptr=t}get board_size(){return r.__wbg_get_set_board_size(this.ptr)}set board_size(t){return r.__wbg_set_set_board_size(this.ptr,t)}get number_of_features(){return r.__wbg_get_set_number_of_features(this.ptr)}set number_of_features(t){return r.__wbg_set_set_number_of_features(this.ptr,t)}get feature_options(){return r.__wbg_get_set_feature_options(this.ptr)}set feature_options(t){return r.__wbg_set_set_feature_options(this.ptr,t)}get sets(){return r.__wbg_get_set_sets(this.ptr)}set sets(t){return r.__wbg_set_set_sets(this.ptr,t)}free(){const t=this.ptr;this.ptr=0,r.__wbg_set_free(t)}static new(e,n){return t.__construct(r.set_new(e,n))}init_deck(){const t=r.set_init_deck(this.ptr),e=g(0),n=l(t,e);return r.__wbindgen_free(t,1*e),n}is_set(t){const[e,n]=d(t);return y(n,0),0!==r.set_is_set(this.ptr,e)}hint(t){const[e,n]=d(t);y(n,0);const o=r.set_hint(this.ptr,e),i=g(0),u=l(o,i);return r.__wbindgen_free(o,1*i),u}update_board(e,n){const[o,i]=d(e);y(i,0);const[u,s]=d(n);return y(s,1),t.__construct(r.set_update_board(this.ptr,o,u))}get_deck(){const t=r.set_get_deck(this.ptr),e=g(0),n=l(t,e);return r.__wbindgen_free(t,1*e),n}get_board(){const t=r.set_get_board(this.ptr),e=g(0),n=l(t,e);return r.__wbindgen_free(t,1*e),n}};let h=[],w=0;function m(t){w===h.length&&h.push(h.length+1);const e=w,n=h[e];return w=n,h[e]={obj:t,cnt:1},e<<1}let v=[];function x(t){if(1==(1&t))return v[t>>1];return h[t>>1].obj}t.exports.__wbindgen_object_clone_ref=function(t){if(1==(1&t))return m(x(t));return h[t>>1].cnt+=1,t},t.exports.__wbindgen_object_drop_ref=function(t){!function(t){let e=h[t>>1];e.cnt-=1,e.cnt>0||(h[t>>1]=w,w=t>>1)}(t)},t.exports.__wbindgen_string_new=function(t,e){return m(l(t,e))},t.exports.__wbindgen_number_new=function(t){return m(t)},t.exports.__wbindgen_number_get=function(t,e){let n=x(t);return"number"==typeof n?n:(c()[e]=1,0)},t.exports.__wbindgen_undefined_new=function(){return m(void 0)},t.exports.__wbindgen_null_new=function(){return m(null)},t.exports.__wbindgen_is_null=function(t){return null===x(t)?1:0},t.exports.__wbindgen_is_undefined=function(t){return void 0===x(t)?1:0},t.exports.__wbindgen_boolean_new=function(t){return m(1===t)},t.exports.__wbindgen_boolean_get=function(t){let e=x(t);return"boolean"==typeof e?e?1:0:2},t.exports.__wbindgen_symbol_new=function(t,e){let n;return m(n=0===t?Symbol():Symbol(l(t,e)))},t.exports.__wbindgen_is_symbol=function(t){return"symbol"==typeof x(t)?1:0},t.exports.__wbindgen_string_get=function(t,e){let n=x(t);if("string"!=typeof n)return 0;const[r,o]=d(n);return a()[e/4]=o,r},t.exports.__wbindgen_throw=function(t,e){throw new Error(l(t,e))},r=n(/*! ./set_bg */152)},149:
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e,n){(function(t,r){var o=/%[sdj%]/g;e.format=function(t){if(!y(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(s(arguments[n]));return e.join(" ")}n=1;for(var r=arguments,i=r.length,u=String(t).replace(o,function(t){if("%%"===t)return"%";if(n>=i)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return t}}),c=r[n];n<i;c=r[++n])b(c)||!m(c)?u+=" "+c:u+=" "+s(c);return u},e.deprecate=function(n,o){if(h(t.process))return function(){return e.deprecate(n,o).apply(this,arguments)};if(!0===r.noDeprecation)return n;var i=!1;return function(){if(!i){if(r.throwDeprecation)throw new Error(o);r.traceDeprecation?console.trace(o):console.error(o),i=!0}return n.apply(this,arguments)}};var i,u={};function s(t,n){var r={seen:[],stylize:l};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),g(n)?r.showHidden=n:n&&e._extend(r,n),h(r.showHidden)&&(r.showHidden=!1),h(r.depth)&&(r.depth=2),h(r.colors)&&(r.colors=!1),h(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=c),f(r,t,r.depth)}function c(t,e){var n=s.styles[e];return n?"["+s.colors[n][0]+"m"+t+"["+s.colors[n][1]+"m":t}function l(t,e){return t}function f(t,n,r){if(t.customInspect&&n&&j(n.inspect)&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var o=n.inspect(r,t);return y(o)||(o=f(t,o,r)),o}var i=function(t,e){if(h(e))return t.stylize("undefined","undefined");if(y(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}if(d(e))return t.stylize(""+e,"number");if(g(e))return t.stylize(""+e,"boolean");if(b(e))return t.stylize("null","null")}(t,n);if(i)return i;var u=Object.keys(n),s=function(t){var e={};return t.forEach(function(t,n){e[t]=!0}),e}(u);if(t.showHidden&&(u=Object.getOwnPropertyNames(n)),x(n)&&(u.indexOf("message")>=0||u.indexOf("description")>=0))return a(n);if(0===u.length){if(j(n)){var c=n.name?": "+n.name:"";return t.stylize("[Function"+c+"]","special")}if(w(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(v(n))return t.stylize(Date.prototype.toString.call(n),"date");if(x(n))return a(n)}var l,m="",S=!1,z=["{","}"];(_(n)&&(S=!0,z=["[","]"]),j(n))&&(m=" [Function"+(n.name?": "+n.name:"")+"]");return w(n)&&(m=" "+RegExp.prototype.toString.call(n)),v(n)&&(m=" "+Date.prototype.toUTCString.call(n)),x(n)&&(m=" "+a(n)),0!==u.length||S&&0!=n.length?r<0?w(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special"):(t.seen.push(n),l=S?function(t,e,n,r,o){for(var i=[],u=0,s=e.length;u<s;++u)E(e,String(u))?i.push(p(t,e,n,r,String(u),!0)):i.push("");return o.forEach(function(o){o.match(/^\d+$/)||i.push(p(t,e,n,r,o,!0))}),i}(t,n,r,s,u):u.map(function(e){return p(t,n,r,s,e,S)}),t.seen.pop(),function(t,e,n){if(t.reduce(function(t,e){return 0,e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1];return n[0]+e+" "+t.join(", ")+" "+n[1]}(l,m,z)):z[0]+m+z[1]}function a(t){return"["+Error.prototype.toString.call(t)+"]"}function p(t,e,n,r,o,i){var u,s,c;if((c=Object.getOwnPropertyDescriptor(e,o)||{value:e[o]}).get?s=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(s=t.stylize("[Setter]","special")),E(r,o)||(u="["+o+"]"),s||(t.seen.indexOf(c.value)<0?(s=b(n)?f(t,c.value,null):f(t,c.value,n-1)).indexOf("\n")>-1&&(s=i?s.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+s.split("\n").map(function(t){return"   "+t}).join("\n")):s=t.stylize("[Circular]","special")),h(u)){if(i&&o.match(/^\d+$/))return s;(u=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(u=u.substr(1,u.length-2),u=t.stylize(u,"name")):(u=u.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),u=t.stylize(u,"string"))}return u+": "+s}function _(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function b(t){return null===t}function d(t){return"number"==typeof t}function y(t){return"string"==typeof t}function h(t){return void 0===t}function w(t){return m(t)&&"[object RegExp]"===S(t)}function m(t){return"object"==typeof t&&null!==t}function v(t){return m(t)&&"[object Date]"===S(t)}function x(t){return m(t)&&("[object Error]"===S(t)||t instanceof Error)}function j(t){return"function"==typeof t}function S(t){return Object.prototype.toString.call(t)}function z(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(t){if(h(i)&&(i=r.env.NODE_DEBUG||""),t=t.toUpperCase(),!u[t])if(new RegExp("\\b"+t+"\\b","i").test(i)){var n=r.pid;u[t]=function(){var r=e.format.apply(e,arguments);console.error("%s %d: %s",t,n,r)}}else u[t]=function(){};return u[t]},e.inspect=s,s.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},s.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=_,e.isBoolean=g,e.isNull=b,e.isNullOrUndefined=function(t){return null==t},e.isNumber=d,e.isString=y,e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=h,e.isRegExp=w,e.isObject=m,e.isDate=v,e.isError=x,e.isFunction=j,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},e.isBuffer=n(/*! ./support/isBuffer */154);var O=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function E(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){var t,n;console.log("%s - %s",(t=new Date,n=[z(t.getHours()),z(t.getMinutes()),z(t.getSeconds())].join(":"),[t.getDate(),O[t.getMonth()],n].join(" ")),e.format.apply(e,arguments))},e.inherits=n(/*! inherits */153),e._extend=function(t,e){if(!e||!m(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t}}).call(this,n(/*! ./../webpack/buildin/global.js */4),n(/*! ./../process/browser.js */9))},151:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e,n){(function(t){function n(t,e){for(var n=0,r=t.length-1;r>=0;r--){var o=t[r];"."===o?t.splice(r,1):".."===o?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,o=function(t){return r.exec(t).slice(1)};function i(t,e){if(t.filter)return t.filter(e);for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}e.resolve=function(){for(var e="",r=!1,o=arguments.length-1;o>=-1&&!r;o--){var u=o>=0?arguments[o]:t.cwd();if("string"!=typeof u)throw new TypeError("Arguments to path.resolve must be strings");u&&(e=u+"/"+e,r="/"===u.charAt(0))}return e=n(i(e.split("/"),function(t){return!!t}),!r).join("/"),(r?"/":"")+e||"."},e.normalize=function(t){var r=e.isAbsolute(t),o="/"===u(t,-1);return(t=n(i(t.split("/"),function(t){return!!t}),!r).join("/"))||r||(t="."),t&&o&&(t+="/"),(r?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(i(t,function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},e.relative=function(t,n){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var o=r(t.split("/")),i=r(n.split("/")),u=Math.min(o.length,i.length),s=u,c=0;c<u;c++)if(o[c]!==i[c]){s=c;break}var l=[];for(c=s;c<o.length;c++)l.push("..");return(l=l.concat(i.slice(s))).join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){var e=o(t),n=e[0],r=e[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},e.basename=function(t,e){var n=o(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},e.extname=function(t){return o(t)[3]};var u="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return e<0&&(e=t.length+e),t.substr(e,n)}}).call(this,n(/*! ./../process/browser.js */9))},152:
/*!*********************************************!*\
  !*** ./node_modules/set/pkg/node/set_bg.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e,n){(function(e){let r={};r["./set"]=n(/*! ./set */148);const o=n(/*! path */151).join,i=n(/*! fs */64).readFileSync(o(e,"set_bg.wasm")),u=new WebAssembly.Module(i),s=new WebAssembly.Instance(u,r);t.exports=s.exports}).call(this,"/")},153:
/*!*********************************************************************!*\
  !*** ./node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},154:
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}}}]);