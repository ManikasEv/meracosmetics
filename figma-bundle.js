const Zm = (e) => import(e), Jm = () => Promise.resolve().then(() => Ym), { Fragment: an, jsx: c, jsxs: f } = globalThis.__GLOBALS__.ReactJSXRuntime;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
globalThis.__GLOBALS__.React;
const { Children: qs, cloneElement: eo, Component: Mn, createContext: j, createElement: M, createFactory: Qm, createRef: ef, forwardRef: je, Fragment: Se, isValidElement: Ys, lazy: tf, memo: to, Profiler: nf, PureComponent: sf, startTransition: Cn, StrictMode: af, Suspense: rf, use: of, useCallback: be, useContext: P, useDebugValue: lf, useDeferredValue: cf, useEffect: ie, useId: Fn, useImperativeHandle: uf, useInsertionEffect: Xs, useLayoutEffect: Dn, useMemo: W, useReducer: df, useRef: J, useState: G, useSyncExternalStore: hf, useTransition: mf, version: ff } = globalThis.__GLOBALS__.React;
/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var ki = "popstate";
function no(e = {}) {
  function t(i, s) {
    let { pathname: a, search: r, hash: o } = i.location;
    return rn(
      "",
      { pathname: a, search: r, hash: o },
      // state defaults to `null` because `window.history.state` does
      s.state && s.state.usr || null,
      s.state && s.state.key || "default"
    );
  }
  function n(i, s) {
    return typeof s == "string" ? s : et(s);
  }
  return so(
    t,
    n,
    null,
    e
  );
}
function V(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function re(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function io() {
  return Math.random().toString(36).substring(2, 10);
}
function Ti(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t
  };
}
function rn(e, t, n = null, i) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...typeof t == "string" ? Oe(t) : t,
    state: n,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || i || io()
  };
}
function et({
  pathname: e = "/",
  search: t = "",
  hash: n = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e;
}
function Oe(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substring(n), e = e.substring(0, n));
    let i = e.indexOf("?");
    i >= 0 && (t.search = e.substring(i), e = e.substring(0, i)), e && (t.pathname = e);
  }
  return t;
}
function so(e, t, n, i = {}) {
  let { window: s = document.defaultView, v5Compat: a = !1 } = i, r = s.history, o = "POP", l = null, u = d();
  u == null && (u = 0, r.replaceState({ ...r.state, idx: u }, ""));
  function d() {
    return (r.state || { idx: null }).idx;
  }
  function h() {
    o = "POP";
    let b = d(), x = b == null ? null : b - u;
    u = b, l && l({ action: o, location: v.location, delta: x });
  }
  function m(b, x) {
    o = "PUSH";
    let y = rn(v.location, b, x);
    u = d() + 1;
    let w = Ti(y, u), R = v.createHref(y);
    try {
      r.pushState(w, "", R);
    } catch (k) {
      if (k instanceof DOMException && k.name === "DataCloneError")
        throw k;
      s.location.assign(R);
    }
    a && l && l({ action: o, location: v.location, delta: 1 });
  }
  function p(b, x) {
    o = "REPLACE";
    let y = rn(v.location, b, x);
    u = d();
    let w = Ti(y, u), R = v.createHref(y);
    r.replaceState(w, "", R), a && l && l({ action: o, location: v.location, delta: 0 });
  }
  function g(b) {
    return ao(b);
  }
  let v = {
    get action() {
      return o;
    },
    get location() {
      return e(s, r);
    },
    listen(b) {
      if (l)
        throw new Error("A history only accepts one active listener");
      return s.addEventListener(ki, h), l = b, () => {
        s.removeEventListener(ki, h), l = null;
      };
    },
    createHref(b) {
      return t(s, b);
    },
    createURL: g,
    encodeLocation(b) {
      let x = g(b);
      return {
        pathname: x.pathname,
        search: x.search,
        hash: x.hash
      };
    },
    push: m,
    replace: p,
    go(b) {
      return r.go(b);
    }
  };
  return v;
}
function ao(e, t = !1) {
  let n = "http://localhost";
  typeof window < "u" && (n = window.location.origin !== "null" ? window.location.origin : window.location.href), V(n, "No window.location.(origin|href) available to create URL");
  let i = typeof e == "string" ? e : et(e);
  return i = i.replace(/ $/, "%20"), !t && i.startsWith("//") && (i = n + i), new URL(i, n);
}
function Zs(e, t, n = "/") {
  return ro(e, t, n, !1);
}
function ro(e, t, n, i) {
  let s = typeof t == "string" ? Oe(t) : t, a = ce(s.pathname || "/", n);
  if (a == null)
    return null;
  let r = Js(e);
  oo(r);
  let o = null;
  for (let l = 0; o == null && l < r.length; ++l) {
    let u = vo(a);
    o = yo(
      r[l],
      u,
      i
    );
  }
  return o;
}
function Js(e, t = [], n = [], i = "", s = !1) {
  let a = (r, o, l = s, u) => {
    let d = {
      relativePath: u === void 0 ? r.path || "" : u,
      caseSensitive: r.caseSensitive === !0,
      childrenIndex: o,
      route: r
    };
    if (d.relativePath.startsWith("/")) {
      if (!d.relativePath.startsWith(i) && l)
        return;
      V(
        d.relativePath.startsWith(i),
        `Absolute route path "${d.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ), d.relativePath = d.relativePath.slice(i.length);
    }
    let h = le([i, d.relativePath]), m = n.concat(d);
    r.children && r.children.length > 0 && (V(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      r.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${h}".`
    ), Js(
      r.children,
      t,
      m,
      h,
      l
    )), !(r.path == null && !r.index) && t.push({
      path: h,
      score: po(h, r.index),
      routesMeta: m
    });
  };
  return e.forEach((r, o) => {
    if (r.path === "" || !r.path?.includes("?"))
      a(r, o);
    else
      for (let l of Qs(r.path))
        a(r, o, !0, l);
  }), t;
}
function Qs(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...i] = t, s = n.endsWith("?"), a = n.replace(/\?$/, "");
  if (i.length === 0)
    return s ? [a, ""] : [a];
  let r = Qs(i.join("/")), o = [];
  return o.push(
    ...r.map(
      (l) => l === "" ? a : [a, l].join("/")
    )
  ), s && o.push(...r), o.map(
    (l) => e.startsWith("/") && l === "" ? "/" : l
  );
}
function oo(e) {
  e.sort(
    (t, n) => t.score !== n.score ? n.score - t.score : go(
      t.routesMeta.map((i) => i.childrenIndex),
      n.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var lo = /^:[\w-]+$/, co = 3, uo = 2, ho = 1, mo = 10, fo = -2, Ri = (e) => e === "*";
function po(e, t) {
  let n = e.split("/"), i = n.length;
  return n.some(Ri) && (i += fo), t && (i += uo), n.filter((s) => !Ri(s)).reduce(
    (s, a) => s + (lo.test(a) ? co : a === "" ? ho : mo),
    i
  );
}
function go(e, t) {
  return e.length === t.length && e.slice(0, -1).every((i, s) => i === t[s]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function yo(e, t, n = !1) {
  let { routesMeta: i } = e, s = {}, a = "/", r = [];
  for (let o = 0; o < i.length; ++o) {
    let l = i[o], u = o === i.length - 1, d = a === "/" ? t : t.slice(a.length) || "/", h = Pt(
      { path: l.relativePath, caseSensitive: l.caseSensitive, end: u },
      d
    ), m = l.route;
    if (!h && u && n && !i[i.length - 1].route.index && (h = Pt(
      {
        path: l.relativePath,
        caseSensitive: l.caseSensitive,
        end: !1
      },
      d
    )), !h)
      return null;
    Object.assign(s, h.params), r.push({
      // TODO: Can this as be avoided?
      params: s,
      pathname: le([a, h.pathname]),
      pathnameBase: ko(
        le([a, h.pathnameBase])
      ),
      route: m
    }), h.pathnameBase !== "/" && (a = le([a, h.pathnameBase]));
  }
  return r;
}
function Pt(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, i] = bo(
    e.path,
    e.caseSensitive,
    e.end
  ), s = t.match(n);
  if (!s) return null;
  let a = s[0], r = a.replace(/(.)\/+$/, "$1"), o = s.slice(1);
  return {
    params: i.reduce(
      (u, { paramName: d, isOptional: h }, m) => {
        if (d === "*") {
          let g = o[m] || "";
          r = a.slice(0, a.length - g.length).replace(/(.)\/+$/, "$1");
        }
        const p = o[m];
        return h && !p ? u[d] = void 0 : u[d] = (p || "").replace(/%2F/g, "/"), u;
      },
      {}
    ),
    pathname: a,
    pathnameBase: r,
    pattern: e
  };
}
function bo(e, t = !1, n = !0) {
  re(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let i = [], s = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (r, o, l) => (i.push({ paramName: o, isOptional: l != null }), l ? "/?([^\\/]+)?" : "/([^\\/]+)")
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return e.endsWith("*") ? (i.push({ paramName: "*" }), s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? s += "\\/*$" : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"), [new RegExp(s, t ? void 0 : "i"), i];
}
function vo(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return re(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function ce(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, i = e.charAt(n);
  return i && i !== "/" ? null : e.slice(n) || "/";
}
var xo = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function wo(e, t = "/") {
  let {
    pathname: n,
    search: i = "",
    hash: s = ""
  } = typeof e == "string" ? Oe(e) : e, a;
  return n ? (n = n.replace(/\/\/+/g, "/"), n.startsWith("/") ? a = Ni(n.substring(1), "/") : a = Ni(n, t)) : a = t, {
    pathname: a,
    search: To(i),
    hash: Ro(s)
  };
}
function Ni(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((s) => {
    s === ".." ? n.length > 1 && n.pop() : s !== "." && n.push(s);
  }), n.length > 1 ? n.join("/") : "/";
}
function Ot(e, t, n, i) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ao(e) {
  return e.filter(
    (t, n) => n === 0 || t.route.path && t.route.path.length > 0
  );
}
function ea(e) {
  let t = Ao(e);
  return t.map(
    (n, i) => i === t.length - 1 ? n.pathname : n.pathnameBase
  );
}
function ta(e, t, n, i = !1) {
  let s;
  typeof e == "string" ? s = Oe(e) : (s = { ...e }, V(
    !s.pathname || !s.pathname.includes("?"),
    Ot("?", "pathname", "search", s)
  ), V(
    !s.pathname || !s.pathname.includes("#"),
    Ot("#", "pathname", "hash", s)
  ), V(
    !s.search || !s.search.includes("#"),
    Ot("#", "search", "hash", s)
  ));
  let a = e === "" || s.pathname === "", r = a ? "/" : s.pathname, o;
  if (r == null)
    o = n;
  else {
    let h = t.length - 1;
    if (!i && r.startsWith("..")) {
      let m = r.split("/");
      for (; m[0] === ".."; )
        m.shift(), h -= 1;
      s.pathname = m.join("/");
    }
    o = h >= 0 ? t[h] : "/";
  }
  let l = wo(s, o), u = r && r !== "/" && r.endsWith("/"), d = (a || r === ".") && n.endsWith("/");
  return !l.pathname.endsWith("/") && (u || d) && (l.pathname += "/"), l;
}
var le = (e) => e.join("/").replace(/\/\/+/g, "/"), ko = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), To = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Ro = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, No = class {
  constructor(e, t, n, i = !1) {
    this.status = e, this.statusText = t || "", this.internal = i, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
  }
};
function Po(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
function So(e) {
  return e.map((t) => t.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
}
var na = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function ia(e, t) {
  let n = e;
  if (typeof n != "string" || !xo.test(n))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: n
    };
  let i = n, s = !1;
  if (na)
    try {
      let a = new URL(window.location.href), r = n.startsWith("//") ? new URL(a.protocol + n) : new URL(n), o = ce(r.pathname, t);
      r.origin === a.origin && o != null ? n = o + r.search + r.hash : s = !0;
    } catch {
      re(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return {
    absoluteURL: i,
    isExternal: s,
    to: n
  };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var sa = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  sa
);
var Eo = [
  "GET",
  ...sa
];
new Set(Eo);
var Ue = j(null);
Ue.displayName = "DataRouter";
var Dt = j(null);
Dt.displayName = "DataRouterState";
var Mo = j(!1), aa = j({
  isTransitioning: !1
});
aa.displayName = "ViewTransition";
var Co = j(
  /* @__PURE__ */ new Map()
);
Co.displayName = "Fetchers";
var Fo = j(null);
Fo.displayName = "Await";
var ee = j(
  null
);
ee.displayName = "Navigation";
var ot = j(
  null
);
ot.displayName = "Location";
var he = j({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
he.displayName = "Route";
var Vn = j(null);
Vn.displayName = "RouteError";
var ra = "REACT_ROUTER_ERROR", Do = "REDIRECT", Vo = "ROUTE_ERROR_RESPONSE";
function Bo(e) {
  if (e.startsWith(`${ra}:${Do}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (typeof t == "object" && t && typeof t.status == "number" && typeof t.statusText == "string" && typeof t.location == "string" && typeof t.reloadDocument == "boolean" && typeof t.replace == "boolean")
        return t;
    } catch {
    }
}
function Io(e) {
  if (e.startsWith(
    `${ra}:${Vo}:{`
  ))
    try {
      let t = JSON.parse(e.slice(40));
      if (typeof t == "object" && t && typeof t.status == "number" && typeof t.statusText == "string")
        return new No(
          t.status,
          t.statusText,
          t.data
        );
    } catch {
    }
}
function Lo(e, { relative: t } = {}) {
  V(
    lt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: n, navigator: i } = P(ee), { hash: s, pathname: a, search: r } = ct(e, { relative: t }), o = a;
  return n !== "/" && (o = a === "/" ? n : le([n, a])), i.createHref({ pathname: o, search: r, hash: s });
}
function lt() {
  return P(ot) != null;
}
function me() {
  return V(
    lt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), P(ot).location;
}
var oa = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function la(e) {
  P(ee).static || Dn(e);
}
function zo() {
  let { isDataRoute: e } = P(he);
  return e ? Zo() : jo();
}
function jo() {
  V(
    lt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = P(Ue), { basename: t, navigator: n } = P(ee), { matches: i } = P(he), { pathname: s } = me(), a = JSON.stringify(ea(i)), r = J(!1);
  return la(() => {
    r.current = !0;
  }), be(
    (l, u = {}) => {
      if (re(r.current, oa), !r.current) return;
      if (typeof l == "number") {
        n.go(l);
        return;
      }
      let d = ta(
        l,
        JSON.parse(a),
        s,
        u.relative === "path"
      );
      e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : le([t, d.pathname])), (u.replace ? n.replace : n.push)(
        d,
        u.state,
        u
      );
    },
    [
      t,
      n,
      a,
      s,
      e
    ]
  );
}
j(null);
function ct(e, { relative: t } = {}) {
  let { matches: n } = P(he), { pathname: i } = me(), s = JSON.stringify(ea(n));
  return W(
    () => ta(
      e,
      JSON.parse(s),
      i,
      t === "path"
    ),
    [e, s, i, t]
  );
}
function Oo(e, t) {
  return ca(e, t);
}
function ca(e, t, n, i, s) {
  V(
    lt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: a } = P(ee), { matches: r } = P(he), o = r[r.length - 1], l = o ? o.params : {}, u = o ? o.pathname : "/", d = o ? o.pathnameBase : "/", h = o && o.route;
  {
    let y = h && h.path || "";
    da(
      u,
      !h || y.endsWith("*") || y.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y === "/" ? "*" : `${y}/*`}">.`
    );
  }
  let m = me(), p;
  if (t) {
    let y = typeof t == "string" ? Oe(t) : t;
    V(
      d === "/" || y.pathname?.startsWith(d),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${y.pathname}" was given in the \`location\` prop.`
    ), p = y;
  } else
    p = m;
  let g = p.pathname || "/", v = g;
  if (d !== "/") {
    let y = d.replace(/^\//, "").split("/");
    v = "/" + g.replace(/^\//, "").split("/").slice(y.length).join("/");
  }
  let b = Zs(e, { pathname: v });
  re(
    h || b != null,
    `No routes matched location "${p.pathname}${p.search}${p.hash}" `
  ), re(
    b == null || b[b.length - 1].route.element !== void 0 || b[b.length - 1].route.Component !== void 0 || b[b.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  );
  let x = Ho(
    b && b.map(
      (y) => Object.assign({}, y, {
        params: Object.assign({}, l, y.params),
        pathname: le([
          d,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          a.encodeLocation ? a.encodeLocation(
            y.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : y.pathname
        ]),
        pathnameBase: y.pathnameBase === "/" ? d : le([
          d,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          a.encodeLocation ? a.encodeLocation(
            y.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : y.pathnameBase
        ])
      })
    ),
    r,
    n,
    i,
    s
  );
  return t && x ? /* @__PURE__ */ M(
    ot.Provider,
    {
      value: {
        location: {
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default",
          ...p
        },
        navigationType: "POP"
        /* Pop */
      }
    },
    x
  ) : x;
}
function Uo() {
  let e = Xo(), t = Po(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), n = e instanceof Error ? e.stack : null, i = "rgba(200,200,200, 0.5)", s = { padding: "0.5rem", backgroundColor: i }, a = { padding: "2px 4px", backgroundColor: i }, r = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), r = /* @__PURE__ */ M(Se, null, /* @__PURE__ */ M("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ M("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ M("code", { style: a }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ M("code", { style: a }, "errorElement"), " prop on your route.")), /* @__PURE__ */ M(Se, null, /* @__PURE__ */ M("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ M("h3", { style: { fontStyle: "italic" } }, t), n ? /* @__PURE__ */ M("pre", { style: s }, n) : null, r);
}
var $o = /* @__PURE__ */ M(Uo, null), ua = class extends Mn {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, t) {
    return t.location !== e.location || t.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : t.error,
      location: t.location,
      revalidation: e.revalidation || t.revalidation
    };
  }
  componentDidCatch(e, t) {
    this.props.onError ? this.props.onError(e, t) : console.error(
      "React Router caught the following error during render",
      e
    );
  }
  render() {
    let e = this.state.error;
    if (this.context && typeof e == "object" && e && "digest" in e && typeof e.digest == "string") {
      const n = Io(e.digest);
      n && (e = n);
    }
    let t = e !== void 0 ? /* @__PURE__ */ M(he.Provider, { value: this.props.routeContext }, /* @__PURE__ */ M(
      Vn.Provider,
      {
        value: e,
        children: this.props.component
      }
    )) : this.props.children;
    return this.context ? /* @__PURE__ */ M(Wo, { error: e }, t) : t;
  }
};
ua.contextType = Mo;
var Ut = /* @__PURE__ */ new WeakMap();
function Wo({
  children: e,
  error: t
}) {
  let { basename: n } = P(ee);
  if (typeof t == "object" && t && "digest" in t && typeof t.digest == "string") {
    let i = Bo(t.digest);
    if (i) {
      let s = Ut.get(t);
      if (s) throw s;
      let a = ia(i.location, n);
      if (na && !Ut.get(t))
        if (a.isExternal || i.reloadDocument)
          window.location.href = a.absoluteURL || a.to;
        else {
          const r = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(a.to, {
              replace: i.replace
            })
          );
          throw Ut.set(t, r), r;
        }
      return /* @__PURE__ */ M(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${a.absoluteURL || a.to}`
        }
      );
    }
  }
  return e;
}
function _o({ routeContext: e, match: t, children: n }) {
  let i = P(Ue);
  return i && i.static && i.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ M(he.Provider, { value: e }, n);
}
function Ho(e, t = [], n = null, i = null, s = null) {
  if (e == null) {
    if (!n)
      return null;
    if (n.errors)
      e = n.matches;
    else if (t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else
      return null;
  }
  let a = e, r = n?.errors;
  if (r != null) {
    let d = a.findIndex(
      (h) => h.route.id && r?.[h.route.id] !== void 0
    );
    V(
      d >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        r
      ).join(",")}`
    ), a = a.slice(
      0,
      Math.min(a.length, d + 1)
    );
  }
  let o = !1, l = -1;
  if (n)
    for (let d = 0; d < a.length; d++) {
      let h = a[d];
      if ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (l = d), h.route.id) {
        let { loaderData: m, errors: p } = n, g = h.route.loader && !m.hasOwnProperty(h.route.id) && (!p || p[h.route.id] === void 0);
        if (h.route.lazy || g) {
          o = !0, l >= 0 ? a = a.slice(0, l + 1) : a = [a[0]];
          break;
        }
      }
    }
  let u = n && i ? (d, h) => {
    i(d, {
      location: n.location,
      params: n.matches?.[0]?.params ?? {},
      unstable_pattern: So(n.matches),
      errorInfo: h
    });
  } : void 0;
  return a.reduceRight(
    (d, h, m) => {
      let p, g = !1, v = null, b = null;
      n && (p = r && h.route.id ? r[h.route.id] : void 0, v = h.route.errorElement || $o, o && (l < 0 && m === 0 ? (da(
        "route-fallback",
        !1,
        "No `HydrateFallback` element provided to render during initial hydration"
      ), g = !0, b = null) : l === m && (g = !0, b = h.route.hydrateFallbackElement || null)));
      let x = t.concat(a.slice(0, m + 1)), y = () => {
        let w;
        return p ? w = v : g ? w = b : h.route.Component ? w = /* @__PURE__ */ M(h.route.Component, null) : h.route.element ? w = h.route.element : w = d, /* @__PURE__ */ M(
          _o,
          {
            match: h,
            routeContext: {
              outlet: d,
              matches: x,
              isDataRoute: n != null
            },
            children: w
          }
        );
      };
      return n && (h.route.ErrorBoundary || h.route.errorElement || m === 0) ? /* @__PURE__ */ M(
        ua,
        {
          location: n.location,
          revalidation: n.revalidation,
          component: v,
          error: p,
          children: y(),
          routeContext: { outlet: null, matches: x, isDataRoute: !0 },
          onError: u
        }
      ) : y();
    },
    null
  );
}
function Bn(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ko(e) {
  let t = P(Ue);
  return V(t, Bn(e)), t;
}
function Go(e) {
  let t = P(Dt);
  return V(t, Bn(e)), t;
}
function qo(e) {
  let t = P(he);
  return V(t, Bn(e)), t;
}
function In(e) {
  let t = qo(e), n = t.matches[t.matches.length - 1];
  return V(
    n.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), n.route.id;
}
function Yo() {
  return In(
    "useRouteId"
    /* UseRouteId */
  );
}
function Xo() {
  let e = P(Vn), t = Go(
    "useRouteError"
    /* UseRouteError */
  ), n = In(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : t.errors?.[n];
}
function Zo() {
  let { router: e } = Ko(
    "useNavigate"
    /* UseNavigateStable */
  ), t = In(
    "useNavigate"
    /* UseNavigateStable */
  ), n = J(!1);
  return la(() => {
    n.current = !0;
  }), be(
    async (s, a = {}) => {
      re(n.current, oa), n.current && (typeof s == "number" ? await e.navigate(s) : await e.navigate(s, { fromRouteId: t, ...a }));
    },
    [e, t]
  );
}
var Pi = {};
function da(e, t, n) {
  !t && !Pi[e] && (Pi[e] = !0, re(!1, n));
}
to(Jo);
function Jo({
  routes: e,
  future: t,
  state: n,
  onError: i
}) {
  return ca(e, void 0, n, i, t);
}
function Me(e) {
  V(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function Qo({
  basename: e = "/",
  children: t = null,
  location: n,
  navigationType: i = "POP",
  navigator: s,
  static: a = !1,
  unstable_useTransitions: r
}) {
  V(
    !lt(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let o = e.replace(/^\/*/, "/"), l = W(
    () => ({
      basename: o,
      navigator: s,
      static: a,
      unstable_useTransitions: r,
      future: {}
    }),
    [o, s, a, r]
  );
  typeof n == "string" && (n = Oe(n));
  let {
    pathname: u = "/",
    search: d = "",
    hash: h = "",
    state: m = null,
    key: p = "default"
  } = n, g = W(() => {
    let v = ce(u, o);
    return v == null ? null : {
      location: {
        pathname: v,
        search: d,
        hash: h,
        state: m,
        key: p
      },
      navigationType: i
    };
  }, [o, u, d, h, m, p, i]);
  return re(
    g != null,
    `<Router basename="${o}"> is not able to match the URL "${u}${d}${h}" because it does not start with the basename, so the <Router> won't render anything.`
  ), g == null ? null : /* @__PURE__ */ M(ee.Provider, { value: l }, /* @__PURE__ */ M(ot.Provider, { children: t, value: g }));
}
function el({
  children: e,
  location: t
}) {
  return Oo(on(e), t);
}
function on(e, t = []) {
  let n = [];
  return qs.forEach(e, (i, s) => {
    if (!Ys(i))
      return;
    let a = [...t, s];
    if (i.type === Se) {
      n.push.apply(
        n,
        on(i.props.children, a)
      );
      return;
    }
    V(
      i.type === Me,
      `[${typeof i.type == "string" ? i.type : i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    ), V(
      !i.props.index || !i.props.children,
      "An index route cannot have child routes."
    );
    let r = {
      id: i.props.id || a.join("-"),
      caseSensitive: i.props.caseSensitive,
      element: i.props.element,
      Component: i.props.Component,
      index: i.props.index,
      path: i.props.path,
      middleware: i.props.middleware,
      loader: i.props.loader,
      action: i.props.action,
      hydrateFallbackElement: i.props.hydrateFallbackElement,
      HydrateFallback: i.props.HydrateFallback,
      errorElement: i.props.errorElement,
      ErrorBoundary: i.props.ErrorBoundary,
      hasErrorBoundary: i.props.hasErrorBoundary === !0 || i.props.ErrorBoundary != null || i.props.errorElement != null,
      shouldRevalidate: i.props.shouldRevalidate,
      handle: i.props.handle,
      lazy: i.props.lazy
    };
    i.props.children && (r.children = on(
      i.props.children,
      a
    )), n.push(r);
  }), n;
}
var wt = "get", At = "application/x-www-form-urlencoded";
function Vt(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function tl(e) {
  return Vt(e) && e.tagName.toLowerCase() === "button";
}
function nl(e) {
  return Vt(e) && e.tagName.toLowerCase() === "form";
}
function il(e) {
  return Vt(e) && e.tagName.toLowerCase() === "input";
}
function sl(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function al(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !sl(e);
}
var ft = null;
function rl() {
  if (ft === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), ft = !1;
    } catch {
      ft = !0;
    }
  return ft;
}
var ol = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function $t(e) {
  return e != null && !ol.has(e) ? (re(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${At}"`
  ), null) : e;
}
function ll(e, t) {
  let n, i, s, a, r;
  if (nl(e)) {
    let o = e.getAttribute("action");
    i = o ? ce(o, t) : null, n = e.getAttribute("method") || wt, s = $t(e.getAttribute("enctype")) || At, a = new FormData(e);
  } else if (tl(e) || il(e) && (e.type === "submit" || e.type === "image")) {
    let o = e.form;
    if (o == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let l = e.getAttribute("formaction") || o.getAttribute("action");
    if (i = l ? ce(l, t) : null, n = e.getAttribute("formmethod") || o.getAttribute("method") || wt, s = $t(e.getAttribute("formenctype")) || $t(o.getAttribute("enctype")) || At, a = new FormData(o, e), !rl()) {
      let { name: u, type: d, value: h } = e;
      if (d === "image") {
        let m = u ? `${u}.` : "";
        a.append(`${m}x`, "0"), a.append(`${m}y`, "0");
      } else u && a.append(u, h);
    }
  } else {
    if (Vt(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    n = wt, i = null, s = At, r = e;
  }
  return a && s === "text/plain" && (r = a, a = void 0), { action: i, method: n.toLowerCase(), encType: s, formData: a, body: r };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Ln(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function cl(e, t, n, i) {
  let s = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return n ? s.pathname.endsWith("/") ? s.pathname = `${s.pathname}_.${i}` : s.pathname = `${s.pathname}.${i}` : s.pathname === "/" ? s.pathname = `_root.${i}` : t && ce(s.pathname, t) === "/" ? s.pathname = `${t.replace(/\/$/, "")}/_root.${i}` : s.pathname = `${s.pathname.replace(/\/$/, "")}.${i}`, s;
}
async function ul(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let n = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return t[e.id] = n, n;
  } catch (n) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(n), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function dl(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function hl(e, t, n) {
  let i = await Promise.all(
    e.map(async (s) => {
      let a = t.routes[s.route.id];
      if (a) {
        let r = await ul(a, n);
        return r.links ? r.links() : [];
      }
      return [];
    })
  );
  return gl(
    i.flat(1).filter(dl).filter((s) => s.rel === "stylesheet" || s.rel === "preload").map(
      (s) => s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" }
    )
  );
}
function Si(e, t, n, i, s, a) {
  let r = (l, u) => n[u] ? l.route.id !== n[u].route.id : !0, o = (l, u) => (
    // param change, /users/123 -> /users/456
    n[u].pathname !== l.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    n[u].route.path?.endsWith("*") && n[u].params["*"] !== l.params["*"]
  );
  return a === "assets" ? t.filter(
    (l, u) => r(l, u) || o(l, u)
  ) : a === "data" ? t.filter((l, u) => {
    let d = i.routes[l.route.id];
    if (!d || !d.hasLoader)
      return !1;
    if (r(l, u) || o(l, u))
      return !0;
    if (l.route.shouldRevalidate) {
      let h = l.route.shouldRevalidate({
        currentUrl: new URL(
          s.pathname + s.search + s.hash,
          window.origin
        ),
        currentParams: n[0]?.params || {},
        nextUrl: new URL(e, window.origin),
        nextParams: l.params,
        defaultShouldRevalidate: !0
      });
      if (typeof h == "boolean")
        return h;
    }
    return !0;
  }) : [];
}
function ml(e, t, { includeHydrateFallback: n } = {}) {
  return fl(
    e.map((i) => {
      let s = t.routes[i.route.id];
      if (!s) return [];
      let a = [s.module];
      return s.clientActionModule && (a = a.concat(s.clientActionModule)), s.clientLoaderModule && (a = a.concat(s.clientLoaderModule)), n && s.hydrateFallbackModule && (a = a.concat(s.hydrateFallbackModule)), s.imports && (a = a.concat(s.imports)), a;
    }).flat(1)
  );
}
function fl(e) {
  return [...new Set(e)];
}
function pl(e) {
  let t = {}, n = Object.keys(e).sort();
  for (let i of n)
    t[i] = e[i];
  return t;
}
function gl(e, t) {
  let n = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((i, s) => {
    let a = JSON.stringify(pl(s));
    return n.has(a) || (n.add(a), i.push({ key: a, link: s })), i;
  }, []);
}
function ha() {
  let e = P(Ue);
  return Ln(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function yl() {
  let e = P(Dt);
  return Ln(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var zn = j(void 0);
zn.displayName = "FrameworkContext";
function ma() {
  let e = P(zn);
  return Ln(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function bl(e, t) {
  let n = P(zn), [i, s] = G(!1), [a, r] = G(!1), { onFocus: o, onBlur: l, onMouseEnter: u, onMouseLeave: d, onTouchStart: h } = t, m = J(null);
  ie(() => {
    if (e === "render" && r(!0), e === "viewport") {
      let v = (x) => {
        x.forEach((y) => {
          r(y.isIntersecting);
        });
      }, b = new IntersectionObserver(v, { threshold: 0.5 });
      return m.current && b.observe(m.current), () => {
        b.disconnect();
      };
    }
  }, [e]), ie(() => {
    if (i) {
      let v = setTimeout(() => {
        r(!0);
      }, 100);
      return () => {
        clearTimeout(v);
      };
    }
  }, [i]);
  let p = () => {
    s(!0);
  }, g = () => {
    s(!1), r(!1);
  };
  return n ? e !== "intent" ? [a, m, {}] : [
    a,
    m,
    {
      onFocus: Ke(o, p),
      onBlur: Ke(l, g),
      onMouseEnter: Ke(u, p),
      onMouseLeave: Ke(d, g),
      onTouchStart: Ke(h, p)
    }
  ] : [!1, m, {}];
}
function Ke(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function vl({ page: e, ...t }) {
  let { router: n } = ha(), i = W(
    () => Zs(n.routes, e, n.basename),
    [n.routes, e, n.basename]
  );
  return i ? /* @__PURE__ */ M(wl, { page: e, matches: i, ...t }) : null;
}
function xl(e) {
  let { manifest: t, routeModules: n } = ma(), [i, s] = G([]);
  return ie(() => {
    let a = !1;
    return hl(e, t, n).then(
      (r) => {
        a || s(r);
      }
    ), () => {
      a = !0;
    };
  }, [e, t, n]), i;
}
function wl({
  page: e,
  matches: t,
  ...n
}) {
  let i = me(), { future: s, manifest: a, routeModules: r } = ma(), { basename: o } = ha(), { loaderData: l, matches: u } = yl(), d = W(
    () => Si(
      e,
      t,
      u,
      a,
      i,
      "data"
    ),
    [e, t, u, a, i]
  ), h = W(
    () => Si(
      e,
      t,
      u,
      a,
      i,
      "assets"
    ),
    [e, t, u, a, i]
  ), m = W(() => {
    if (e === i.pathname + i.search + i.hash)
      return [];
    let v = /* @__PURE__ */ new Set(), b = !1;
    if (t.forEach((y) => {
      let w = a.routes[y.route.id];
      !w || !w.hasLoader || (!d.some((R) => R.route.id === y.route.id) && y.route.id in l && r[y.route.id]?.shouldRevalidate || w.hasClientLoader ? b = !0 : v.add(y.route.id));
    }), v.size === 0)
      return [];
    let x = cl(
      e,
      o,
      s.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    return b && v.size > 0 && x.searchParams.set(
      "_routes",
      t.filter((y) => v.has(y.route.id)).map((y) => y.route.id).join(",")
    ), [x.pathname + x.search];
  }, [
    o,
    s.unstable_trailingSlashAwareDataRequests,
    l,
    i,
    a,
    d,
    t,
    e,
    r
  ]), p = W(
    () => ml(h, a),
    [h, a]
  ), g = xl(h);
  return /* @__PURE__ */ M(Se, null, m.map((v) => /* @__PURE__ */ M("link", { key: v, rel: "prefetch", as: "fetch", href: v, ...n })), p.map((v) => /* @__PURE__ */ M("link", { key: v, rel: "modulepreload", href: v, ...n })), g.map(({ key: v, link: b }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ M(
      "link",
      {
        key: v,
        nonce: n.nonce,
        ...b,
        crossOrigin: b.crossOrigin ?? n.crossOrigin
      }
    )
  )));
}
function Al(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
var kl = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  kl && (window.__reactRouterVersion = // @ts-expect-error
  "7.13.0");
} catch {
}
function Tl({
  basename: e,
  children: t,
  unstable_useTransitions: n,
  window: i
}) {
  let s = J();
  s.current == null && (s.current = no({ window: i, v5Compat: !0 }));
  let a = s.current, [r, o] = G({
    action: a.action,
    location: a.location
  }), l = be(
    (u) => {
      n === !1 ? o(u) : Cn(() => o(u));
    },
    [n]
  );
  return Dn(() => a.listen(l), [a, l]), /* @__PURE__ */ M(
    Qo,
    {
      basename: e,
      children: t,
      location: r.location,
      navigationType: r.action,
      navigator: a,
      unstable_useTransitions: n
    }
  );
}
var fa = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, H = je(
  function({
    onClick: t,
    discover: n = "render",
    prefetch: i = "none",
    relative: s,
    reloadDocument: a,
    replace: r,
    state: o,
    target: l,
    to: u,
    preventScrollReset: d,
    viewTransition: h,
    unstable_defaultShouldRevalidate: m,
    ...p
  }, g) {
    let { basename: v, unstable_useTransitions: b } = P(ee), x = typeof u == "string" && fa.test(u), y = ia(u, v);
    u = y.to;
    let w = Lo(u, { relative: s }), [R, k, S] = bl(
      i,
      p
    ), E = Sl(u, {
      replace: r,
      state: o,
      target: l,
      preventScrollReset: d,
      relative: s,
      viewTransition: h,
      unstable_defaultShouldRevalidate: m,
      unstable_useTransitions: b
    });
    function T(I) {
      t && t(I), I.defaultPrevented || E(I);
    }
    let C = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ M(
        "a",
        {
          ...p,
          ...S,
          href: y.absoluteURL || w,
          onClick: y.isExternal || a ? t : T,
          ref: Al(g, k),
          target: l,
          "data-discover": !x && n === "render" ? "true" : void 0
        }
      )
    );
    return R && !x ? /* @__PURE__ */ M(Se, null, C, /* @__PURE__ */ M(vl, { page: w })) : C;
  }
);
H.displayName = "Link";
var Rl = je(
  function({
    "aria-current": t = "page",
    caseSensitive: n = !1,
    className: i = "",
    end: s = !1,
    style: a,
    to: r,
    viewTransition: o,
    children: l,
    ...u
  }, d) {
    let h = ct(r, { relative: u.relative }), m = me(), p = P(Dt), { navigator: g, basename: v } = P(ee), b = p != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Dl(h) && o === !0, x = g.encodeLocation ? g.encodeLocation(h).pathname : h.pathname, y = m.pathname, w = p && p.navigation && p.navigation.location ? p.navigation.location.pathname : null;
    n || (y = y.toLowerCase(), w = w ? w.toLowerCase() : null, x = x.toLowerCase()), w && v && (w = ce(w, v) || w);
    const R = x !== "/" && x.endsWith("/") ? x.length - 1 : x.length;
    let k = y === x || !s && y.startsWith(x) && y.charAt(R) === "/", S = w != null && (w === x || !s && w.startsWith(x) && w.charAt(x.length) === "/"), E = {
      isActive: k,
      isPending: S,
      isTransitioning: b
    }, T = k ? t : void 0, C;
    typeof i == "function" ? C = i(E) : C = [
      i,
      k ? "active" : null,
      S ? "pending" : null,
      b ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let I = typeof a == "function" ? a(E) : a;
    return /* @__PURE__ */ M(
      H,
      {
        ...u,
        "aria-current": T,
        className: C,
        ref: d,
        style: I,
        to: r,
        viewTransition: o
      },
      typeof l == "function" ? l(E) : l
    );
  }
);
Rl.displayName = "NavLink";
var Nl = je(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: n,
    reloadDocument: i,
    replace: s,
    state: a,
    method: r = wt,
    action: o,
    onSubmit: l,
    relative: u,
    preventScrollReset: d,
    viewTransition: h,
    unstable_defaultShouldRevalidate: m,
    ...p
  }, g) => {
    let { unstable_useTransitions: v } = P(ee), b = Cl(), x = Fl(o, { relative: u }), y = r.toLowerCase() === "get" ? "get" : "post", w = typeof o == "string" && fa.test(o);
    return /* @__PURE__ */ M(
      "form",
      {
        ref: g,
        method: y,
        action: x,
        onSubmit: i ? l : (k) => {
          if (l && l(k), k.defaultPrevented) return;
          k.preventDefault();
          let S = k.nativeEvent.submitter, E = S?.getAttribute("formmethod") || r, T = () => b(S || k.currentTarget, {
            fetcherKey: t,
            method: E,
            navigate: n,
            replace: s,
            state: a,
            relative: u,
            preventScrollReset: d,
            viewTransition: h,
            unstable_defaultShouldRevalidate: m
          });
          v && n !== !1 ? Cn(() => T()) : T();
        },
        ...p,
        "data-discover": !w && e === "render" ? "true" : void 0
      }
    );
  }
);
Nl.displayName = "Form";
function Pl(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function pa(e) {
  let t = P(Ue);
  return V(t, Pl(e)), t;
}
function Sl(e, {
  target: t,
  replace: n,
  state: i,
  preventScrollReset: s,
  relative: a,
  viewTransition: r,
  unstable_defaultShouldRevalidate: o,
  unstable_useTransitions: l
} = {}) {
  let u = zo(), d = me(), h = ct(e, { relative: a });
  return be(
    (m) => {
      if (al(m, t)) {
        m.preventDefault();
        let p = n !== void 0 ? n : et(d) === et(h), g = () => u(e, {
          replace: p,
          state: i,
          preventScrollReset: s,
          relative: a,
          viewTransition: r,
          unstable_defaultShouldRevalidate: o
        });
        l ? Cn(() => g()) : g();
      }
    },
    [
      d,
      u,
      h,
      n,
      i,
      t,
      e,
      s,
      a,
      r,
      o,
      l
    ]
  );
}
var El = 0, Ml = () => `__${String(++El)}__`;
function Cl() {
  let { router: e } = pa(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = P(ee), n = Yo(), i = e.fetch, s = e.navigate;
  return be(
    async (a, r = {}) => {
      let { action: o, method: l, encType: u, formData: d, body: h } = ll(
        a,
        t
      );
      if (r.navigate === !1) {
        let m = r.fetcherKey || Ml();
        await i(m, n, r.action || o, {
          unstable_defaultShouldRevalidate: r.unstable_defaultShouldRevalidate,
          preventScrollReset: r.preventScrollReset,
          formData: d,
          body: h,
          formMethod: r.method || l,
          formEncType: r.encType || u,
          flushSync: r.flushSync
        });
      } else
        await s(r.action || o, {
          unstable_defaultShouldRevalidate: r.unstable_defaultShouldRevalidate,
          preventScrollReset: r.preventScrollReset,
          formData: d,
          body: h,
          formMethod: r.method || l,
          formEncType: r.encType || u,
          replace: r.replace,
          state: r.state,
          fromRouteId: n,
          flushSync: r.flushSync,
          viewTransition: r.viewTransition
        });
    },
    [i, s, t, n]
  );
}
function Fl(e, { relative: t } = {}) {
  let { basename: n } = P(ee), i = P(he);
  V(i, "useFormAction must be used inside a RouteContext");
  let [s] = i.matches.slice(-1), a = { ...ct(e || ".", { relative: t }) }, r = me();
  if (e == null) {
    a.search = r.search;
    let o = new URLSearchParams(a.search), l = o.getAll("index");
    if (l.some((d) => d === "")) {
      o.delete("index"), l.filter((h) => h).forEach((h) => o.append("index", h));
      let d = o.toString();
      a.search = d ? `?${d}` : "";
    }
  }
  return (!e || e === ".") && s.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (a.pathname = a.pathname === "/" ? n : le([n, a.pathname])), et(a);
}
function Dl(e, { relative: t } = {}) {
  let n = P(aa);
  V(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = pa(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), s = ct(e, { relative: t });
  if (!n.isTransitioning)
    return !1;
  let a = ce(n.currentLocation.pathname, i) || n.currentLocation.pathname, r = ce(n.nextLocation.pathname, i) || n.nextLocation.pathname;
  return Pt(s.pathname, r) != null || Pt(s.pathname, a) != null;
}
const Ei = {
  de: {
    "nav.home": "Home",
    "nav.treatments": "Behandlungen",
    "nav.about": "Über MERA",
    "nav.contact": "Kontakt",
    "nav.book": "Termin buchen",
    "nav.language": "Sprache",
    "whatsapp.message": "Hallo, ich möchte gerne einen Termin bei MERA Cosmetics vereinbaren.",
    "home.hero.title": "Treat yourself to love",
    "home.hero.subtitle": "Ein besonderer Ort für die Erholung. Hier widmen wir unsere Zeit ganz Ihnen, mit höchster Qualität, Ruhe und ungeteilter Aufmerksamkeit.",
    "home.hero.cta": "Behandlungen entdecken",
    "home.concept.title": "Ein privater Rückzugsort für Ästhetik.",
    "home.concept.subtitle": "Das Konzept",
    "home.philosophy.tag": "Philosophie",
    "home.philosophy.title": "Meine Philosophie",
    "home.philosophy.text1": "MERA ist ein privater Beratungsraum für Ästhetik, der sich gezielt von der Massenabfertigung abhebt. Ich glaube daran, dass Erholung absolute Ruhe und ungeteilte Aufmerksamkeit erfordert.",
    "home.philosophy.text2": "In meinem privaten Beratungsraum in Dietikon begleite ich Sie persönlich auf dem Weg zu Ihrer persönlichen Erholung. Schweizer Präzision trifft hier auf ein tiefes Verständnis für individuelle Bedürfnisse.",
    "home.philosophy.cta": "Mehr über MERA",
    "home.journal.tag": "Journal",
    "home.values.title": "Wofür MERA steht",
    "home.values.nature": "Natürlichkeit",
    "home.values.nature.text": "Hochwertige, natürliche Produkte, die deine Schönheit unterstreichen.",
    "home.values.mindfulness": "Achtsamkeit",
    "home.values.mindfulness.text": "Jede Behandlung ist ein besonderer Moment der Erholung, den du dir verdienst.",
    "home.values.trust": "Vertrauen",
    "home.values.trust.text": "Ein geschützter Raum, in dem du dich fallen lassen kannst.",
    "home.testimonials.title": "Was meine Kunden sagen",
    "home.testimonial1.text": "Bei MERA fühle ich mich endlich verstanden. Viviane nimmt sich wirklich Zeit und berät ehrlich.",
    "home.testimonial1.name": "Sarah M.",
    "home.testimonial2.text": "Ein ort, an dem ich komplett abschalten kann. Die Atmosphäre ist so ruhig und hochwertig.",
    "home.testimonial2.name": "Lisa K.",
    "home.cta.title": "Bereit für deine Auszeit?",
    "home.cta.subtitle": "Buche jetzt deinen Termin und erlebe einen Moment der Ruhe und Regeneration.",
    "home.cta.button": "Termin anfragen",
    "home.instagram.title": "Instagram Journal",
    "home.instagram.subtitle": "Einblicke in meine Arbeit und Philosophie.",
    "home.instagram.button": "@mera.cosmetics.zh",
    "treatments.title": "Behandlungen & Preise",
    "treatments.subtitle": "Jede Behandlung wird individuell auf dich abgestimmt. Nimm dir Zeit für dich selbst und erlebe eine hochwertige Schönheitspflege.",
    "treatments.filter.all": "Alle",
    "treatments.filter.manicure": "Maniküre",
    "treatments.filter.pedicure": "Pediküre",
    "treatments.filter.waxing": "Waxing",
    "treatments.filter.lashes": "Wimpern & Brauen",
    "treatments.filter.body": "Körper",
    "treatments.combos.title": "Kombinationen",
    "treatments.combos.subtitle": "Gerne stelle ich dir ein individuelles Paket zusammen. Sprich mich einfach darauf an!",
    "treatments.combos.mani.pedi": "Maniküre + Pediküre",
    "treatments.combos.lashes": "Wimpern färben + Augenbrauen",
    "treatments.combos.peeling": "Peeling + Massage",
    "treatments.combos.fullbody": "Ganzkörper Verwöhnprogramm",
    "treatments.combos.note": "Preise für Kombinationen auf Anfrage",
    "treatments.cta.title": "Bereit für deine Behandlung?",
    "treatments.cta.subtitle": "Vereinbare jetzt deinen Termin und erlebe einen Moment der Entspannung und Schönheit.",
    "treatments.cta.book": "Termin anfragen",
    "treatments.cta.whatsapp": "Via WhatsApp buchen",
    "treatments.cta.direct": "Direkt buchen",
    "about.title": "Über MERA",
    "about.subtitle": "Ein Raum für Zeit und Aufmerksamkeit",
    "about.origin.title": "Wie MERA entstand",
    "about.origin.text1": "MERA ist aus dem Wunsch entstanden, einen Ort zu schaffen, an dem du dich wirklich wohlfühlen kannst. Einen Ort, der mit Liebe gestaltet wurde und in dem du als Mensch im Mittelpunkt stehst, nicht als Kunde.",
    "about.origin.text2": 'Der Name „MERA" bedeutet für mich „Mein Raum": ein Raum für dich, für mich, für uns. Ein Ort ohne Hektik, ohne Druck: nur du, deine Zeit und achtsame Erholung.',
    "about.viviane.title": "Viviane Rovito",
    "about.viviane.text": "Als Expertin für ganzheitliche Ästhetik mit Leidenschaft für natürliche Schönheit möchte ich dir einen sicheren Raum bieten, in dem du dich entspannen und wohlfühlen kannst. Bei mir geht es nicht um Perfektion, sondern um dein Wohlbefinden und darum, dass du dich bei mir rundum wohl fühlst.",
    "about.header.title": "Über MERA",
    "about.header.subtitle": "Ein Raum für Zeit und Aufmerksamkeit",
    "about.story.title": "Die Geschichte von MERA",
    "about.story.text1": "MERA ist aus dem tiefen Wunsch entstanden, einen Ort zu schaffen, an dem du dich wirklich wohlfühlen kannst. Einen Ort, der mit Liebe und Achtsamkeit gestaltet wurde, in dem du als Mensch im Mittelpunkt stehst, nicht als Kunde.",
    "about.story.text2": 'Der Name „MERA" bedeutet für mich „Mein Raum": ein Raum für dich, für mich, für uns. Ein Ort ohne Hektik und ohne Druck. Nur du, deine Zeit und achtsame Erholung.',
    "about.story.text3": "Bei MERA geht es nicht um schnelle Ergebnisse oder darum, Erwartungen zu erfüllen. Es geht darum, dir einen geschützten Raum zu geben, in dem ich mich voll und ganz um deine Erholung kümmere.",
    "about.name.title": "Was bedeutet MERA?",
    "about.name.intro": "Der Name MERA trägt zwei Bedeutungen in sich, die beide für meine Philosophie stehen:",
    "about.name.independence.title": "Mera: Der Tag (ΕΛΛΗΝΙΚΆ)",
    "about.name.independence.text": 'Im Griechischen bedeutet „Mera" (μέρα) schlicht: Der Tag. Für mich symbolisiert der Name, dass dies DEIN Tag ist: ein Moment, der nur dir gehört und an dem du im Mittelpunkt stehst.',
    "about.name.newday.title": "Ein neuer Anfang",
    "about.name.newday.text": "Jeder Besuch bei MERA soll sich wie ein neuer Tag anfühlen: frisch, voller Energie und mit dem Gefühl, dass du dir selbst etwas Kostbares geschenkt hast.",
    "about.values.title": "Meine Werte",
    "about.values.quality": "Qualität ohne Kompromisse",
    "about.values.quality.text": "Ich arbeite ausschliesslich mit hochwertigen, natürlichen Produkten, die ich persönlich ausgewählt habe.",
    "about.values.time": "Zeit für dich",
    "about.values.time.text": "Jede Behandlung bekommt die Zeit, die sie braucht. Ohne Zeitdruck, ohne Hektik.",
    "about.values.trust": "Vertrauen und Diskretion",
    "about.values.trust.text": "Was bei MERA passiert, bleibt bei MERA. Hier kannst du dich vollkommen fallen lassen.",
    "about.values.respect": "Respekt vor deiner Individualität",
    "about.values.respect.text": "Du bist einzigartig, und genau so behandle ich dich. Bei mir gibt es keine Standards, sondern nur individuelle Lösungen.",
    "about.values.honesty": "Ehrlichkeit vor Verkauf",
    "about.values.honesty.text": "Ich verkaufe dir nichts, was du nicht brauchst. Meine Empfehlungen basieren auf deinen Bedürfnissen, nicht auf meinem Umsatz.",
    "about.values.humanity": "Menschlichkeit vor Perfektion",
    "about.values.humanity.text": "Bei mir geht es nicht darum, einem Ideal zu entsprechen. Es geht darum, dass du dich bei mir vollkommen wohlfühlst, so wie du bist.",
    "about.values.qualityovermass": "Qualität vor Masse",
    "about.values.qualityovermass.text": "Ich betreue gezielt nur eine begrenzte Anzahl an Kunden, um jedem die Aufmerksamkeit zu geben, die er verdient.",
    "about.stands.title": "Wofür MERA steht und wofür nicht",
    "about.stands.for": "MERA steht für:",
    "about.stands.selflove": "Selbstliebe statt Selbstoptimierung",
    "about.stands.mindfulness": "Achtsamkeit statt Perfektionismus",
    "about.stands.consciouscare": "Achtsame Erholung statt Schnelligkeit",
    "about.stands.calm": "Ruhe statt Hektik",
    "about.stands.naturalness": "Natürlichkeit statt Trends",
    "about.stands.not": "MERA steht nicht für:",
    "about.stands.mass": "Massenabfertigung",
    "about.stands.pressure": "Zeitdruck oder Stress",
    "about.stands.sales": "Verkaufsdruck",
    "about.stands.ideals": "Unrealistische Schönheitsideale",
    "about.stands.marketing": "Marketing-Versprechen",
    "about.beauty.title": "Meine Haltung zu Schönheit",
    "about.beauty.text1": "Für mich bedeutet Schönheit nicht, einem bestimmten Ideal zu entsprechen. Schönheit entsteht, wenn du dich vollkommen wohlfühlst, wenn du dich selbst magst und pflegst.",
    "about.beauty.text2": "Meine Arbeit zielt nicht darauf ab, dich zu verändern, sondern deine natürliche Schönheit zu unterstreichen und dir das Gefühl zu geben, dass du dich um dich selbst kümmerst.",
    "about.beauty.text3": "MERA ist ein Ort, an dem du lernen kannst, dich selbst wertzuschätzen, ohne Druck, ohne Vergleiche, ohne Erwartungen.",
    "about.beauty.cta": "Behandlungen entdecken",
    "about.person.intro": "Ich bin Viviane Rovito: Schweizerin mit griechischen Wurzeln.",
    "about.person.text": "Meine Mutter stammt aus Griechenland, und obwohl ich in der Schweiz geboren und aufgewachsen bin, trägt meine Arbeit beide Welten in sich. MERA ist die Verbindung aus Schweizer Präzision und der herzlichen, griechischen „Safe Place“-Philosophie. Es ist mein persönlicher Anspruch, dir einen Raum zu bieten, in dem du dich absolut sicher, geborgen und verstanden fühlst: ein echtes Stück Lebensqualität.",
    "about.person.languages": "Beratung und Behandlung auf Deutsch, Englisch und ΕΛΛΗΝΙΚΆ möglich.",
    "about.person.cta": "Kontaktiere mich",
    "about.studio.note": "Hinweis: Das Studio wird räumlich geteilt. Die Unternehmen sind jedoch rechtlich und wirtschaftlich unabhängig voneinander.",
    "about.cta.question": "Möchtest du mehr erfahren oder direkt einen Termin vereinbaren?",
    "about.cta.treatments": "Behandlungen ansehen",
    "about.cta.contact": "Termin anfragen",
    "contact.title": "Kontakt",
    "contact.subtitle": "Ich freue mich auf dich. Vereinbare jetzt deinen Termin und erlebe einen Moment der Ruhe.",
    "contact.details.title": "So erreichst du mich",
    "contact.studio.tag": "Das Studio",
    "contact.studio.name": "MERA Cosmetics by Viviane Rovito",
    "contact.studio.address1": "Staffelackerstrasse 11",
    "contact.studio.address2": "8953 Dietikon",
    "contact.studio.address3": "Schweiz",
    "contact.email": "info@meracosmetics.ch",
    "contact.phone": "+41 78 211 15 03",
    "contact.whatsapp": "+41 78 211 15 03",
    "contact.connect.tag": "Let's Connect",
    "contact.connect.whatsapp.tag": "Schnellste Antwort",
    "contact.connect.email.tag": "Direktnachricht",
    "contact.connect.voice.tag": "Anruf",
    "contact.booking.title": "Terminvereinbarung",
    "contact.booking.text": "Für Terminanfragen ruf mich gerne an, schreib mir eine E-Mail oder kontaktiere mich über WhatsApp. Ich melde mich schnellstmöglich bei dir zurück.",
    "contact.booking.urgent": "Bei kurzfristigen Terminwünschen (innerhalb von 48 Stunden) bitte ich dich, mich telefonisch zu kontaktieren.",
    "contact.booking.languages": "Beratung und Behandlung auf Deutsch, Englisch und ΕΛΛΗΝΙΚΆ möglich.",
    "contact.form.title": "Nachricht senden",
    "contact.form.name": "Name",
    "contact.form.email": "E-Mail",
    "contact.form.phone": "Telefon (optional)",
    "contact.form.message": "Deine Nachricht",
    "contact.form.required": "* Pflichtfelder",
    "contact.form.privacy": "Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.",
    "contact.form.submit": "Nachricht senden",
    "contact.hours.title": "Öffnungszeiten",
    "contact.hours.weekday": "Montag - Freitag",
    "contact.hours.weekday.time": "10:00 - 19:00 Uhr",
    "contact.hours.saturday": "Samstag",
    "contact.hours.saturday.time": "10:00 - 16:00 Uhr",
    "contact.hours.sunday": "Sonntag",
    "contact.hours.sunday.time": "Geschlossen",
    "contact.hours.note": "Termine nach Vereinbarung. Auf Anfrage bieten wir auch Termine ausserhalb der offiziellen Öffnungszeiten an.",
    "contact.social.title": "Folge mir",
    "contact.social.instagram": "Instagram",
    "contact.social.tiktok": "TikTok",
    "contact.social.facebook": "Facebook",
    "contact.location.note": "Das Studio wird räumlich geteilt. Die Unternehmen sind jedoch rechtlich und wirtschaftlich unabhängig voneinander.",
    "legal.imprint.title": "Impressum",
    "legal.privacy.title": "Datenschutz",
    "footer.about": "Über MERA",
    "footer.about.text": "Ein Rückzugsort für Erholung und natürliche Schönheit.",
    "footer.quick.links": "Schnellzugriff",
    "footer.legal": "Rechtliches",
    "footer.contact.title": "Kontakt",
    "footer.rights": "© 2026 MERA Cosmetics by Viviane Rovito. Alle Rechte vorbehalten.",
    "footer.tagline": "Ein Rückzugsort für Erholung und natürliche Schönheit.",
    "footer.nav.title": "Navigation",
    "footer.nav.treatments": "Behandlungen",
    "footer.nav.about": "Über MERA",
    "footer.nav.contact": "Kontakt",
    "footer.nav.legal": "Rechtliches",
    "footer.copyright": "Alle Rechte vorbehalten.",
    "footer.legal.imprint": "Impressum",
    "footer.legal.privacy": "Datenschutz",
    "common.discount.students": "10% Rabatt mit Lehrlings- oder Studentenausweis",
    "common.discount.referral": "Weiterempfehlungs-Bonus: CHF 20.- Rabatt für dich bei der nächsten Behandlung"
  },
  en: {
    "nav.home": "Home",
    "nav.treatments": "Treatments",
    "nav.about": "About MERA",
    "nav.contact": "Contact",
    "nav.book": "Book Appointment",
    "nav.language": "Language",
    "whatsapp.message": "Hello, I would like to book an appointment at MERA Cosmetics.",
    "home.hero.title": "Treat yourself to love",
    "home.hero.subtitle": "A special place for relaxation. Here we dedicate our time entirely to you, with the highest quality, serenity and undivided attention.",
    "home.hero.cta": "Discover treatments",
    "home.concept.title": "A private retreat for aesthetics.",
    "home.concept.subtitle": "The Concept",
    "home.philosophy.tag": "Philosophy",
    "home.philosophy.title": "My Philosophy",
    "home.philosophy.text1": "MERA is a private aesthetic space that consciously stands out from mass processing. I believe that relaxation requires absolute peace and undivided attention.",
    "home.philosophy.text2": "In my private consulting room in Dietikon, I personally accompany you on the way to your personal relaxation. Swiss precision meets a deep understanding of individual needs.",
    "home.philosophy.cta": "More about MERA",
    "home.journal.tag": "Journal",
    "home.values.title": "What MERA stands for",
    "home.values.nature": "Naturalness",
    "home.values.nature.text": "High-quality, natural products that enhance your beauty.",
    "home.values.mindfulness": "Mindfulness",
    "home.values.mindfulness.text": "Each treatment is a special moment of relaxation that you deserve.",
    "home.values.trust": "Trust",
    "home.values.trust.text": "A safe space where you can let go.",
    "home.testimonials.title": "What my clients say",
    "home.testimonial1.text": "At MERA I finally feel understood. Viviane really takes her time and gives honest advice.",
    "home.testimonial1.name": "Sarah M.",
    "home.testimonial2.text": "A place where I can completely switch off. The atmosphere is so calm and high-quality.",
    "home.testimonial2.name": "Lisa K.",
    "home.cta.title": "Ready for your break?",
    "home.cta.subtitle": "Book your appointment now and experience a moment of peace and regeneration.",
    "home.cta.button": "Request appointment",
    "home.instagram.title": "Instagram Journal",
    "home.instagram.subtitle": "Insights into my work and philosophy.",
    "home.instagram.button": "@mera.cosmetics.zh",
    "treatments.title": "Treatments & Prices",
    "treatments.subtitle": "Each treatment is individually tailored to you. Take time for yourself and experience high-quality beauty care.",
    "treatments.filter.all": "All",
    "treatments.filter.manicure": "Manicure",
    "treatments.filter.pedicure": "Pedicure",
    "treatments.filter.waxing": "Waxing",
    "treatments.filter.lashes": "Lashes & Brows",
    "treatments.filter.body": "Body",
    "treatments.combos.title": "Combos",
    "treatments.combos.subtitle": "I can put together an individual package for you. Just ask me!",
    "treatments.combos.mani.pedi": "Manicure + Pedicure",
    "treatments.combos.lashes": "Lash tinting + Brow shaping",
    "treatments.combos.peeling": "Peeling + Massage",
    "treatments.combos.fullbody": "Full body pampering program",
    "treatments.combos.note": "Prices for combos on request",
    "treatments.cta.title": "Ready for your treatment?",
    "treatments.cta.subtitle": "Book your appointment now and experience a moment of relaxation and beauty.",
    "treatments.cta.book": "Request appointment",
    "treatments.cta.whatsapp": "Book via WhatsApp",
    "treatments.cta.direct": "Book now",
    "about.title": "About MERA",
    "about.subtitle": "A space for time and attention",
    "about.origin.title": "How MERA was created",
    "about.origin.text1": "MERA was born from the desire to create a place where you can truly feel comfortable. A place that was designed with love and where you as a person are at the center, not as a customer.",
    "about.origin.text2": 'The name "MERA" means "My Space" to me: a space for you, for me, for us. A place without rush, without pressure: just you, your time and mindful relaxation.',
    "about.viviane.title": "Viviane Rovito",
    "about.viviane.text": "As an expert in holistic aesthetics with a passion for natural beauty, I want to offer you a safe space where you can relax and feel comfortable. For me, it's not about perfection, but about your well-being and making sure you feel completely comfortable with me.",
    "about.header.title": "About MERA",
    "about.header.subtitle": "A space for time and attention",
    "about.story.title": "The Story of MERA",
    "about.story.text1": "MERA was born from the deep desire to create a place where you can truly feel comfortable. A place designed with love and mindfulness: where you as a person are at the center, not as a customer.",
    "about.story.text2": 'The name "MERA" means "My Space" to me: a space for you, for me, for us. A place without rush and without pressure. Just you, your time and mindful relaxation.',
    "about.story.text3": "At MERA, it's not about quick results or meeting expectations. It's about giving you a safe space where I take full care of your relaxation.",
    "about.name.title": "What does MERA mean?",
    "about.name.intro": "The name MERA carries two meanings, both representing my philosophy:",
    "about.name.independence.title": "Mera: The Day (ΕΛΛΗΝΙΚΆ)",
    "about.name.independence.text": 'In Greek, "Mera" (μέρα) simply means: The Day. For me, it symbolizes that this is YOUR day: a moment that belongs only to you, where you are the focus.',
    "about.name.newday.title": "A New Beginning",
    "about.name.newday.text": "Every visit to MERA should feel like a new day: fresh, full of energy, and with the feeling that you have given yourself something precious.",
    "about.values.title": "My Values",
    "about.values.quality": "Quality without compromise",
    "about.values.quality.text": "I only work with high-quality, natural products that I have personally selected.",
    "about.values.time": "Time for you",
    "about.values.time.text": "Each treatment gets the time it needs. No time pressure, no rush.",
    "about.values.trust": "Trust and discretion",
    "about.values.trust.text": "What happens at MERA stays at MERA. Here you can completely let go.",
    "about.values.respect": "Respect for your individuality",
    "about.values.respect.text": "You are unique, and that's exactly how I treat you. There are no standards here, only individual solutions.",
    "about.values.honesty": "Honesty over sales",
    "about.values.honesty.text": "I won't sell you anything you don't need. My recommendations are based on your needs, not my revenue.",
    "about.values.humanity": "Humanity over perfection",
    "about.values.humanity.text": "It's not about conforming to an ideal. It's about feeling completely comfortable with me, just as you are.",
    "about.values.qualityovermass": "Quality over quantity",
    "about.values.qualityovermass.text": "I consciously serve only a limited number of clients to give everyone the attention they deserve.",
    "about.stands.title": "What MERA stands for and what it doesn't",
    "about.stands.for": "What MERA stands for:",
    "about.stands.selflove": "Self-love instead of self-optimization",
    "about.stands.mindfulness": "Mindfulness instead of perfectionism",
    "about.stands.consciouscare": "Conscious relaxation instead of speed",
    "about.stands.calm": "Calm instead of rush",
    "about.stands.naturalness": "Naturalness instead of trends",
    "about.stands.not": "What MERA doesn't stand for:",
    "about.stands.mass": "Mass processing",
    "about.stands.pressure": "Time pressure or stress",
    "about.stands.sales": "Sales pressure",
    "about.stands.ideals": "Unrealistic beauty ideals",
    "about.stands.marketing": "Marketing promises",
    "about.beauty.title": "My Attitude Towards Beauty",
    "about.beauty.text1": "For me, beauty doesn't mean conforming to a certain ideal. Beauty emerges when you feel completely comfortable, when you like and care for yourself.",
    "about.beauty.text2": "My work doesn't aim to change you, but to enhance your natural beauty and give you the feeling that you're taking care of yourself.",
    "about.beauty.text3": "MERA is a place where you can learn to appreciate yourself, without pressure, without comparisons, without expectations.",
    "about.beauty.cta": "Discover treatments",
    "about.person.intro": "I am Viviane Rovito: Swiss with Greek roots.",
    "about.person.text": 'My mother is from Greece, and although I was born and raised in Switzerland, my work carries both worlds within it. MERA is the fusion of Swiss precision and the warm, Greek "Safe Place" philosophy. It is my personal goal to offer you a space where you feel absolutely safe, secure, and understood: a true piece of life quality.',
    "about.person.languages": "Consultation and treatment available in German, English, and ΕΛΛΗΝΙΚΆ.",
    "about.person.cta": "Contact me",
    "about.studio.note": "Note: The studio space is shared. However, the businesses are legally and economically independent.",
    "about.cta.question": "Would you like to learn more or book an appointment directly?",
    "about.cta.treatments": "View treatments",
    "about.cta.contact": "Request appointment",
    "contact.title": "Contact",
    "contact.subtitle": "I look forward to meeting you. Book your appointment now and experience a moment of peace.",
    "contact.details.title": "How to reach me",
    "contact.studio.tag": "The Studio",
    "contact.studio.name": "MERA Cosmetics by Viviane Rovito",
    "contact.studio.address1": "Staffelackerstrasse 11",
    "contact.studio.address2": "8953 Dietikon",
    "contact.studio.address3": "Switzerland",
    "contact.email": "info@meracosmetics.ch",
    "contact.phone": "+41 78 211 15 03",
    "contact.whatsapp": "+41 78 211 15 03",
    "contact.connect.tag": "Let's Connect",
    "contact.connect.whatsapp.tag": "Fastest Response",
    "contact.connect.email.tag": "Direct Message",
    "contact.connect.voice.tag": "Call",
    "contact.booking.title": "Booking appointments",
    "contact.booking.text": "For appointment requests, please call me, send me an email or contact me via WhatsApp. I will get back to you as soon as possible.",
    "contact.booking.urgent": "For urgent appointment requests (within 48 hours), please contact me by phone.",
    "contact.booking.languages": "Consultation and treatment available in German, English and ΕΛΛΗΝΙΚΆ.",
    "contact.form.title": "Send a message",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone (optional)",
    "contact.form.message": "Your message",
    "contact.form.required": "* Required fields",
    "contact.form.privacy": "Your data will be handled confidentially and not shared with third parties.",
    "contact.form.submit": "Send message",
    "contact.hours.title": "Opening hours",
    "contact.hours.weekday": "Monday - Friday",
    "contact.hours.weekday.time": "10:00 - 19:00",
    "contact.hours.saturday": "Saturday",
    "contact.hours.saturday.time": "10:00 - 16:00",
    "contact.hours.sunday": "Sunday",
    "contact.hours.sunday.time": "Closed",
    "contact.hours.note": "By appointment. Upon request, we also offer appointments outside of official opening hours.",
    "contact.social.title": "Follow me",
    "contact.social.instagram": "Instagram",
    "contact.social.tiktok": "TikTok",
    "contact.social.facebook": "Facebook",
    "contact.location.note": "The studio is spatially shared. However, the businesses are legally and economically independent.",
    "legal.imprint.title": "Imprint",
    "legal.privacy.title": "Privacy Policy",
    "footer.about": "About MERA",
    "footer.about.text": "A retreat for relaxation and natural beauty.",
    "footer.quick.links": "Quick Links",
    "footer.legal": "Legal",
    "footer.contact.title": "Contact",
    "footer.rights": "© 2026 MERA Cosmetics by Viviane Rovito. All rights reserved.",
    "footer.tagline": "A retreat for relaxation and natural beauty.",
    "footer.nav.title": "Navigation",
    "footer.nav.treatments": "Treatments",
    "footer.nav.about": "About MERA",
    "footer.nav.contact": "Contact",
    "footer.nav.legal": "Legal",
    "footer.copyright": "All rights reserved.",
    "footer.legal.imprint": "Imprint",
    "footer.legal.privacy": "Privacy Policy",
    "common.discount.students": "10% discount with apprentice or student ID",
    "common.discount.referral": "Referral Bonus: CHF 20.- discount for you on your next treatment"
  },
  gr: {
    "nav.home": "Αρχική",
    "nav.treatments": "Θεραπείες",
    "nav.about": "Σχετικά με MERA",
    "nav.contact": "Επικοινωνία",
    "nav.book": "Κλείστε Ραντεβού",
    "nav.language": "Γλώσσα",
    "whatsapp.message": "Γεια σας, θα ήθελα να κλείσω ραντεβού στο MERA Cosmetics.",
    "home.hero.title": "Treat yourself to love",
    "home.hero.subtitle": "Ένας ξεχωριστός χώρος για την αναζωογόνησή σας. Εδώ αφιερώνουμε το χρόνο μας αποκλειστικά σε εσάς, με την υψηλότερη ποιότητα, γαλήνη και αμέριστη προσοχή.",
    "home.hero.cta": "Ανακάλυψε θεραπείες",
    "home.concept.title": "Ένας ιδιωτικός χώρος για αισθητική.",
    "home.concept.subtitle": "Το Concept",
    "home.philosophy.tag": "Φιλοσοφία",
    "home.philosophy.title": "Η Φιλοσοφία μου",
    "home.philosophy.text1": "Το MERA είναι ένας ιδιωτικός χώρος αισθητικής που ξεχωρίζει συνειδητά από τη μαζική εξυπηρέτηση. Πιστεύω ότι η αναζωογόνηση απαιτεί απόλυτη ηρεμία και αμέριστη προσοχή.",
    "home.philosophy.text2": "Στον ιδιωτικό μου χώρο στο Dietikon, σας συνοδεύω προσωπικά στο δρόμο για την προσωπική σας αναζωογόνηση. Η ελβετική ακρίβεια συναντά τη βαθιά κατανόηση των ατομικών αναγκών.",
    "home.philosophy.cta": "Περισσότερα για MERA",
    "home.journal.tag": "Journal",
    "home.values.title": "Τι αντιπροσωπεύει το MERA",
    "home.values.nature": "Φυσικότητα",
    "home.values.nature.text": "Υψηλής ποιότητας, φυσικά προϊόντα που αναδεικνύουν την ομορφιά σου.",
    "home.values.mindfulness": "Ευσυνειδητοτητα",
    "home.values.mindfulness.text": "Καθε θεραπεία ειναι μια ιδιαίτερη στιγμη φροντιδας που χρωστας στον εαυτό σου.",
    "home.values.trust": "Εμπιστοσύνη",
    "home.values.trust.text": "Ένας προστατευμένος χώρος όπου μπορείς να αφεθείς.",
    "home.testimonials.title": "Τι λένε οι πελάτες μου",
    "home.testimonial1.text": "Στο MERA νιώθω επιτέλους κατανοητή. Η Viviane αφιερώνει πραγματικά χρόνο και συμβουλεύει ειλικρινά.",
    "home.testimonial1.name": "Sarah M.",
    "home.testimonial2.text": "Ένας χώρος όπου μπορώ να αποσυνδεθώ εντελώς. Η ατμόσφαιρα είναι τόσο ήρεμη και υψηλής ποιότητας.",
    "home.testimonial2.name": "Lisa K.",
    "home.cta.title": "Έτοιμη για το διάλειμμά σου;",
    "home.cta.subtitle": "Κλείσε το ραντεβού σου τώρα και βίωσε μια στιγμή ηρεμίας και αναγέννησης.",
    "home.cta.button": "Αίτηση ραντεβού",
    "home.instagram.title": "Instagram Journal",
    "home.instagram.subtitle": "Στιγμιότυπα από τη δουλειά και τη φιλοσοφία μου.",
    "home.instagram.button": "@mera.cosmetics.zh",
    "treatments.title": "Θεραπείες & Τιμές",
    "treatments.subtitle": "Καθε θεραπεία προσαρμζεται ατομικά. Αφιέρωσε χρόνο για τον εαυτό σου οπως σου αξιζει.",
    "treatments.filter.all": "Όλα",
    "treatments.filter.manicure": "Μανικιούρ",
    "treatments.filter.pedicure": "Πεντικιούρ",
    "treatments.filter.waxing": "Αποτρίχωση",
    "treatments.filter.lashes": "Βλεφαρίδες & Φρύδια",
    "treatments.filter.body": "Σώμα",
    "treatments.combos.title": "Συνδυασμοί",
    "treatments.combos.subtitle": "Μπορώ να συνδυάσω ένα προσωπικό πακέτο για σένα. Απλά ρωτήστε με!",
    "treatments.combos.mani.pedi": "Μανικιούρ + Πεντικιούρ",
    "treatments.combos.lashes": "Βαφή βλεφαρίδων + Διαμόρφωση φρυδιών",
    "treatments.combos.peeling": "Peeling + Μασάζ",
    "treatments.combos.fullbody": "Πρόγραμμα πλήρους σώματος",
    "treatments.combos.note": "Τιμές για συνδυασμούς κατόπιν αιτήματος",
    "treatments.cta.title": "Έτοιμη για τη θεραπεία σου;",
    "treatments.cta.subtitle": "Κλείσε το ραντεβού σου τώρα και βίωσε μια στιγμή χαλάρωσης και ομορφιάς.",
    "treatments.cta.book": "Αίτηση ραντεβού",
    "treatments.cta.whatsapp": "Κλείσε μέσω WhatsApp",
    "treatments.cta.direct": "Άμεση κράτηση",
    "about.title": "Σχετικά με MERA",
    "about.subtitle": "Ένας χώρος για χρόνο και προσοχή",
    "about.origin.title": "Πώς δημιουργήθηκε το MERA",
    "about.origin.text1": "Το MERA γεννήθηκε από την επιθυμία να δημιουργηθεί ένας χώρος όπου μπορείς πραγματικά να νιώθεις άνετα. Ένας χώρος που σχεδιάστηκε με αγάπη και όπου εσύ ως άνθρωπος είσαι στο επίκεντρο, όχι ως πελάτης.",
    "about.origin.text2": 'Το όνομα "MERA" σημαίνει για μένα "Ο Χώρος μου": ένας χώρος για σένα, για μένα, για εμάς. Ένας χώρος χωρίς βιασύνη, χωρίς πίεση: μόνο εσύ, ο χρόνος σου και συνειδητή αναζωογόνηση.',
    "about.viviane.title": "Viviane Rovito",
    "about.viviane.text": "Ως ειδικός στην ολιστική αισθητική με πάθος για τη φυσική ομορφιά, θέλω να σου προσφέρω έναν ασφαλή χώρο όπου μπορείς να χαλαρώσεις και να νιώσεις άνετα. Για μένα δεν πρόκειται για τελειότητα, αλλά για την ευεξία σου και να νιώθεις εντελώς άνετα μαζί μου.",
    "about.header.title": "Σχετικά με MERA",
    "about.header.subtitle": "Ένας χώρος για χρόνο και προσοχή",
    "about.story.title": "Η Ιστορία του MERA",
    "about.story.text1": "Το MERA γεννήθηκε από τη βαθιά επιθυμία να δημιουργήσω έναν χώρο όπου μπορείς πραγματικά να νιώθεις άνετα. Ένας χώρος που σχεδιάστηκε με αγάπη και προσοχή: όπου εσύ ως άνθρωπος είσαι στο επίκεντρο, όχι ως πελάτης.",
    "about.story.text2": 'Το όνομα "MERA" σημαίνει για μένα "Ο Χώρος μου": ένας χώρος για σένα, για μένα, für uns. Ένας τόπος χωρίς βιασύνη και χωρίς πίεση. Μόνο εσύ, ο χρόνος σου και συνειδητή αναζωογόνηση.',
    "about.story.text3": "Στο Μερα ,δε μας ενδιαφέρει το γρηγορο αποτέλεσμα, αλλα να απαντήσουμε τις προσδοκίες σας και να σας προσφέρουμε εναν χωρο χαλάρωσης και ασφάλειας, με την πλήρη φροντιδα του εαυτού σου.",
    "about.name.title": "Τι σημαίνει MERA;",
    "about.name.intro": "Το όνομα MERA φέρει δύο σημασίες, και οι δύο αντιπροσωπεύουν τη φιλοσοφία μου:",
    "about.name.independence.title": "Mera: Η Μέρα (ΕΛΛΗΝΙΚΆ)",
    "about.name.independence.text": 'Στα Ελληνικά, η λέξη "Mera" (μέρα) σημαίνει απλά: Η Μέρα. Για μένα συμβολίζει ότι αυτή είναι η ΔΙΚΗ ΣΟΥ μέρα: μια στιγμή που σου ανήκει αποκλειστικά, όπου εσύ είσαι το επίκεντρο.',
    "about.name.newday.title": "Μια νέα αρχή",
    "about.name.newday.text": "Κάθε επίσκεψη στο MERA πρέπει να την αισθάνεσαι σαν μια νέα μέρα: φρέσκια, γεμάτη ενέργεια και με το αίσθημα ότι έδωσες στον εαυτό σου κάτι πολύτιμο.",
    "about.values.title": "Οι Αξίες μου",
    "about.values.quality": "Ποιότητα χωρίς συμβιβασμούς",
    "about.values.quality.text": "Εργάζομαι αποκλειστικά με υψηλής ποιότητας, φυσικά προϊόντα που έχω επιλέξει προσωπικά.",
    "about.values.time": "Χρόνος για σένα",
    "about.values.time.text": "Κάθε θεραπεία παίρνει τον χρόνο που χρειάζεται. Χωρίς χρονική πίεση, χωρίς βιασύνη.",
    "about.values.trust": "Εμπιστοσύνη και διακριτικότητα",
    "about.values.trust.text": "Αυτό που συμβαίνει στο MERA μένει στο MERA. Εδώ μπορείς να αφεθείς εντελώς.",
    "about.values.respect": "Σεβασμός για την ατομικότητά σου",
    "about.values.respect.text": "Είσαι μοναδικός, και ακριβώς έτσι σε αντιμετωπίζω. Εδώ δεν υπάρχουν πρότυπα, μόνο ατομικές λύσεις.",
    "about.values.honesty": "Ειλικρίνεια πάνω από πωλήσεις",
    "about.values.honesty.text": "Δεν θα σου πουλήσω κάτι που δεν χρειάζεσαι. Οι συστάσεις μου βασίζονται στις ανάγκες σου, όχι στα έσοδά μου.",
    "about.values.humanity": "Ανθρωπιά πάνω από τελειότητα",
    "about.values.humanity.text": "Δεν πρόκειται για το να ακολουθήσεις ένα ιδανικό. Πρόκειται για να νιώθεις εντελώς άνετα μαζί μου, ακριβώς όπως είσαι.",
    "about.values.qualityovermass": "Ποιότητα πάνω από ποσότητα",
    "about.values.qualityovermass.text": "Εξυπηρετώ συνειδητά μόνο έναν περιορισμένο αριθμό πελατών για να δώσω σε όλους την προσοχή που τους αξίζει.",
    "about.stands.title": "Για τι στέκεται το MERA και για τι όχι",
    "about.stands.for": "Το MERA στέκεται για:",
    "about.stands.selflove": "Αυτοαγάπη αντί για αυτοβελτίωση",
    "about.stands.mindfulness": "Ενσυνειδητότητα αντί για τελειομανία",
    "about.stands.consciouscare": "Συνειδητή αναζωογόνηση αντί για ταχύτητα",
    "about.stands.calm": "Ηρεμία αντί για βιασύνη",
    "about.stands.naturalness": "Φυσικότητα αντί για τάσεις",
    "about.stands.not": "Το MERA δεν στέκεται για:",
    "about.stands.mass": "Μαζική εξυπηρέτηση",
    "about.stands.pressure": "Χρονική πίεση ή άγχος",
    "about.stands.sales": "Πίεση πωλήσεων",
    "about.stands.ideals": "Μη ρεαλιστικά ιδανικά ομορφιάς",
    "about.stands.marketing": "Υποσχέσεις μάρκετινγκ",
    "about.beauty.title": "Η στάση μου απέναντι στην ομορφιά",
    "about.beauty.text1": "Για μένα, η ομορφιά δεν σημαίνει συμμόρφωση σε ένα συγκεκριμένο ιδανικό. Η ομορφιά αναδύεται όταν νιώθεις εντελώς άνετα, όταν αγαπάς και φροντίζεις τον εαυτό σου.",
    "about.beauty.text2": "Η δουλειά μου δεν στοχεύει στο να σε αλλάξει, αλλά στο να αναδείξει τη φυσική σου ομορφιά και να σου δώσει το αίσθημα ότι φροντίζεις τον εαυτό σου.",
    "about.beauty.text3": "Το MERA είναι ένας χώρος όπου μπορείς να μάθεις να εκτιμάς τον εαυτό σου, χωρίς πίεση, χωρίς συγκρίσεις, χωρίς προσδοκίες.",
    "about.beauty.cta": "Ανακάλυψε θεραπείες",
    "about.person.intro": "Είμαι η Viviane Rovito: Ελβετίδα με ελληνικές ρίζες.",
    "about.person.text": "Η μητέρα μου κατάγεται από την Ελλάδα και παρόλο που γεννήθηκα και μεγάλωσα στην Ελβετία, η δουλειά μου φέρει και τους δύο κόσμους μέσα της. Το MERA είναι η ένωση της ελβετικής ακρίβειας και της θερμής, ελληνικής φιλοσοφίας „Safe Place“. Είναι προσωπική μου φιλοδοξία να σου προσφέρω έναν χώρο όπου θα νιώθεις απόλυτα ασφαλής, σίγουρος και κατανοητός: ένα πραγματικό κομμάτι ποιότητας ζωής.",
    "about.person.languages": "Συμβουλευτική και θεραπεία διαθέσιμη στα Γερμανικά, Αγγλικά και ΕΛΛΗΝΙΚΆ.",
    "about.person.cta": "Επικοινώνησε μαζί μου",
    "about.studio.note": "Σημείωση: Το στούντιο μοιράζεται χωρικά. Ωστόσο, οι επιχειρήσεις είναι νομικά και οικονομικά ανεξάρτητες.",
    "about.cta.question": "Θα ήθελες να μάθεις περισσότερα ή να κλείσεις ραντεβού απευθείας;",
    "about.cta.treatments": "Δες θεραπείες",
    "about.cta.contact": "Αίτηση ραντεβού",
    "contact.title": "Επικοινωνία",
    "contact.subtitle": "Χαίρομαι να σε δεχθώ. Κλείσε το ραντεβού σου τώρα και βίωσε μια στιγμή ηρεμίας.",
    "contact.details.title": "Πώς μπορείς να με βρεις",
    "contact.studio.tag": "Το Στούντιο",
    "contact.studio.name": "MERA Cosmetics by Viviane Rovito",
    "contact.studio.address1": "Staffelackerstrasse 11",
    "contact.studio.address2": "8953 Dietikon",
    "contact.studio.address3": "Ελβετία",
    "contact.email": "info@meracosmetics.ch",
    "contact.phone": "+41 78 211 15 03",
    "contact.whatsapp": "+41 78 211 15 03",
    "contact.connect.tag": "Ας συνδεθούμε",
    "contact.connect.whatsapp.tag": "Γρήγορότερη απάντηση",
    "contact.connect.email.tag": "Άμεσο μήνυμα",
    "contact.connect.voice.tag": "Κλήση",
    "contact.booking.title": "Κλείσιμο ραντεβού",
    "contact.booking.text": "Για αιτήσεις ραντεβού, μπορείς να με καλέσεις, να μου στείλεις email ή να επικοινωνήσεις μέσω WhatsApp. Θα επικοινωνήσω μαζί σου το συντομότερο δυνατόν.",
    "contact.booking.urgent": "Για έκτακτες αιτήσεις ραντεβού (μέσα σε 48 ώρες), παρακαλώ επικοινώνησε μαζί μου τηλεφωνικά.",
    "contact.booking.languages": "Συμβουλευτική και θεραπεία διαθέσιμη στα Γερμανικά, Αγγλικά και ΕΛΛΗΝΙΚΆ.",
    "contact.form.title": "Αποστολή μηνύματος",
    "contact.form.name": "Όνομα",
    "contact.form.email": "Email",
    "contact.form.phone": "Τηλέφωνο (προαιρετικό)",
    "contact.form.message": "Το μήνυμά σου",
    "contact.form.required": "* Απαιτούμενα πεδία",
    "contact.form.privacy": "Τα δεδομένα σου θα χειριστούν με απόρρητο και δεν θα μεταδοθούν σε τρίτους.",
    "contact.form.submit": "Αποστολή μηνύματος",
    "contact.hours.title": "Ωράρια λειτουργίας",
    "contact.hours.weekday": "Δευτέρα - Παρασκευή",
    "contact.hours.weekday.time": "10:00 - 19:00",
    "contact.hours.saturday": "Σάββατο",
    "contact.hours.saturday.time": "10:00 - 16:00",
    "contact.hours.sunday": "Κυριακή",
    "contact.hours.sunday.time": "Κλειστό",
    "contact.hours.note": "Με ραντεβού. Κατόπιν αιτήματος, προσφέρουμε επίσης ραντεβού εκτός των επίσημων ωρών λειτουργίας.",
    "contact.social.title": "Ακολούθησέ με",
    "contact.social.instagram": "Instagram",
    "contact.social.tiktok": "TikTok",
    "contact.social.facebook": "Facebook",
    "contact.location.note": "Το στούντιο μοιράζεται χωρικά. Ωστόσο, οι επιχειρήσεις είναι νομικά και οικονομικά ανεξάρτητες.",
    "legal.imprint.title": "Νομικά Στοιχεία",
    "legal.privacy.title": "Προστασία Δεδομένων",
    "footer.about": "Σχετικά με MERA",
    "footer.about.text": "Ένας χώρος για αναζωογόνηση και φυσική ομορφιά.",
    "footer.quick.links": "Γρήγοροι Σύνδεσμοι",
    "footer.legal": "Νομικά",
    "footer.contact.title": "Επικοινωνία",
    "footer.rights": "© 2026 MERA Cosmetics by Viviane Rovito. Με επιφύλαξη παντός δικαιώματος.",
    "footer.tagline": "Ένας χώρος για αναζωογόνηση και φυσική ομορφιά.",
    "footer.nav.title": "Πλοήγηση",
    "footer.nav.treatments": "Θεραπείες",
    "footer.nav.about": "Σχετικά με MERA",
    "footer.nav.contact": "Επικοινωνία",
    "footer.nav.legal": "Νομικά",
    "footer.copyright": "Με επιφύλαξη παντός δικαιώματος.",
    "footer.legal.imprint": "Νομικά Στοιχεία",
    "footer.legal.privacy": "Προστασία Δεδομένων",
    "common.discount.students": "Έκπτωση 10% με μαθητική ή φοιτητική ταυτότητα",
    "common.discount.referral": "Μπόνους Σύστασης: Έκπτωση 20 CHF για εσάς στην επόμενη θεραπεία"
  }
}, ga = j({
  language: "de",
  setLanguage: () => {
  },
  t: (e) => e
}), Vl = ({ children: e }) => {
  const [t, n] = G("de"), i = (s) => Ei[t]?.[s] || Ei.de?.[s] || s;
  return /* @__PURE__ */ c(ga.Provider, { value: { language: t, setLanguage: n, t: i }, children: e });
}, ve = () => P(ga);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bl = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Il = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, i) => i ? i.toUpperCase() : n.toLowerCase()
), Mi = (e) => {
  const t = Il(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, ya = (...e) => e.filter((t, n, i) => !!t && t.trim() !== "" && i.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ll = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zl = je(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: i,
    className: s = "",
    children: a,
    iconNode: r,
    ...o
  }, l) => M(
    "svg",
    {
      ref: l,
      ...Ll,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: i ? Number(n) * 24 / Number(t) : n,
      className: ya("lucide", s),
      ...o
    },
    [
      ...r.map(([u, d]) => M(u, d)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = (e, t) => {
  const n = je(
    ({ className: i, ...s }, a) => M(zl, {
      ref: a,
      iconNode: t,
      className: ya(
        `lucide-${Bl(Mi(e))}`,
        `lucide-${e}`,
        i
      ),
      ...s
    })
  );
  return n.displayName = Mi(e), n;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jl = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
], Ol = $e("facebook", jl);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ul = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], $l = $e("globe", Ul);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wl = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
], _l = $e("instagram", Wl);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hl = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], Kl = $e("menu", Hl);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gl = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
], ql = $e("message-circle", Gl);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yl = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Xl = $e("x", Yl), jn = j({});
function Bt(e) {
  const t = J(null);
  return t.current === null && (t.current = e()), t.current;
}
const On = typeof window < "u", Un = On ? Dn : ie, It = /* @__PURE__ */ j(null);
function $n(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Wn(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const ue = (e, t, n) => n > t ? t : n < e ? e : n;
let _n = () => {
};
const de = {}, ba = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function va(e) {
  return typeof e == "object" && e !== null;
}
const xa = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function Hn(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Q = /* @__NO_SIDE_EFFECTS__ */ (e) => e, Zl = (e, t) => (n) => t(e(n)), ut = (...e) => e.reduce(Zl), tt = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const i = t - e;
  return i === 0 ? 1 : (n - e) / i;
};
class Kn {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return $n(this.subscriptions, t), () => Wn(this.subscriptions, t);
  }
  notify(t, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](t, n, i);
      else
        for (let a = 0; a < s; a++) {
          const r = this.subscriptions[a];
          r && r(t, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const se = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, Z = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function wa(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const Aa = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, Jl = 1e-7, Ql = 12;
function ec(e, t, n, i, s) {
  let a, r, o = 0;
  do
    r = t + (n - t) / 2, a = Aa(r, i, s) - e, a > 0 ? n = r : t = r;
  while (Math.abs(a) > Jl && ++o < Ql);
  return r;
}
function dt(e, t, n, i) {
  if (e === t && n === i)
    return Q;
  const s = (a) => ec(a, 0, 1, e, n);
  return (a) => a === 0 || a === 1 ? a : Aa(s(a), t, i);
}
const ka = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Ta = (e) => (t) => 1 - e(1 - t), Ra = /* @__PURE__ */ dt(0.33, 1.53, 0.69, 0.99), Gn = /* @__PURE__ */ Ta(Ra), Na = /* @__PURE__ */ ka(Gn), Pa = (e) => (e *= 2) < 1 ? 0.5 * Gn(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), qn = (e) => 1 - Math.sin(Math.acos(e)), Sa = Ta(qn), Ea = ka(qn), tc = /* @__PURE__ */ dt(0.42, 0, 1, 1), nc = /* @__PURE__ */ dt(0, 0, 0.58, 1), Ma = /* @__PURE__ */ dt(0.42, 0, 0.58, 1), ic = (e) => Array.isArray(e) && typeof e[0] != "number", Ca = (e) => Array.isArray(e) && typeof e[0] == "number", sc = {
  linear: Q,
  easeIn: tc,
  easeInOut: Ma,
  easeOut: nc,
  circIn: qn,
  circInOut: Ea,
  circOut: Sa,
  backIn: Gn,
  backInOut: Na,
  backOut: Ra,
  anticipate: Pa
}, ac = (e) => typeof e == "string", Ci = (e) => {
  if (Ca(e)) {
    _n(e.length === 4);
    const [t, n, i, s] = e;
    return dt(t, n, i, s);
  } else if (ac(e))
    return sc[e];
  return e;
}, pt = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function rc(e, t) {
  let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), s = !1, a = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(d) {
    r.has(d) && (u.schedule(d), e()), d(o);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (d, h = !1, m = !1) => {
      const g = m && s ? n : i;
      return h && r.add(d), g.has(d) || g.add(d), d;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (d) => {
      i.delete(d), r.delete(d);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (d) => {
      if (o = d, s) {
        a = !0;
        return;
      }
      s = !0, [n, i] = [i, n], n.forEach(l), n.clear(), s = !1, a && (a = !1, u.process(d));
    }
  };
  return u;
}
const oc = 40;
function Fa(e, t) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, a = () => n = !0, r = pt.reduce((w, R) => (w[R] = rc(a), w), {}), { setup: o, read: l, resolveKeyframes: u, preUpdate: d, update: h, preRender: m, render: p, postRender: g } = r, v = () => {
    const w = de.useManualTiming ? s.timestamp : performance.now();
    n = !1, de.useManualTiming || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(w - s.timestamp, oc), 1)), s.timestamp = w, s.isProcessing = !0, o.process(s), l.process(s), u.process(s), d.process(s), h.process(s), m.process(s), p.process(s), g.process(s), s.isProcessing = !1, n && t && (i = !1, e(v));
  }, b = () => {
    n = !0, i = !0, s.isProcessing || e(v);
  };
  return { schedule: pt.reduce((w, R) => {
    const k = r[R];
    return w[R] = (S, E = !1, T = !1) => (n || b(), k.schedule(S, E, T)), w;
  }, {}), cancel: (w) => {
    for (let R = 0; R < pt.length; R++)
      r[pt[R]].cancel(w);
  }, state: s, steps: r };
}
const { schedule: F, cancel: ge, state: U, steps: Wt } = /* @__PURE__ */ Fa(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Q, !0);
let kt;
function lc() {
  kt = void 0;
}
const K = {
  now: () => (kt === void 0 && K.set(U.isProcessing || de.useManualTiming ? U.timestamp : performance.now()), kt),
  set: (e) => {
    kt = e, queueMicrotask(lc);
  }
}, Da = (e) => (t) => typeof t == "string" && t.startsWith(e), Yn = /* @__PURE__ */ Da("--"), cc = /* @__PURE__ */ Da("var(--"), Xn = (e) => cc(e) ? uc.test(e.split("/*")[0].trim()) : !1, uc = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, We = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, nt = {
  ...We,
  transform: (e) => ue(0, 1, e)
}, gt = {
  ...We,
  default: 1
}, Ye = (e) => Math.round(e * 1e5) / 1e5, Zn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function dc(e) {
  return e == null;
}
const hc = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Jn = (e, t) => (n) => !!(typeof n == "string" && hc.test(n) && n.startsWith(e) || t && !dc(n) && Object.prototype.hasOwnProperty.call(n, t)), Va = (e, t, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, a, r, o] = i.match(Zn);
  return {
    [e]: parseFloat(s),
    [t]: parseFloat(a),
    [n]: parseFloat(r),
    alpha: o !== void 0 ? parseFloat(o) : 1
  };
}, mc = (e) => ue(0, 255, e), _t = {
  ...We,
  transform: (e) => Math.round(mc(e))
}, Te = {
  test: /* @__PURE__ */ Jn("rgb", "red"),
  parse: /* @__PURE__ */ Va("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: i = 1 }) => "rgba(" + _t.transform(e) + ", " + _t.transform(t) + ", " + _t.transform(n) + ", " + Ye(nt.transform(i)) + ")"
};
function fc(e) {
  let t = "", n = "", i = "", s = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), i = e.substring(5, 7), s = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), i = e.substring(3, 4), s = e.substring(4, 5), t += t, n += n, i += i, s += s), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const ln = {
  test: /* @__PURE__ */ Jn("#"),
  parse: fc,
  transform: Te.transform
}, ht = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), pe = /* @__PURE__ */ ht("deg"), ae = /* @__PURE__ */ ht("%"), N = /* @__PURE__ */ ht("px"), pc = /* @__PURE__ */ ht("vh"), gc = /* @__PURE__ */ ht("vw"), Fi = {
  ...ae,
  parse: (e) => ae.parse(e) / 100,
  transform: (e) => ae.transform(e * 100)
}, Ce = {
  test: /* @__PURE__ */ Jn("hsl", "hue"),
  parse: /* @__PURE__ */ Va("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(e) + ", " + ae.transform(Ye(t)) + ", " + ae.transform(Ye(n)) + ", " + Ye(nt.transform(i)) + ")"
}, z = {
  test: (e) => Te.test(e) || ln.test(e) || Ce.test(e),
  parse: (e) => Te.test(e) ? Te.parse(e) : Ce.test(e) ? Ce.parse(e) : ln.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? Te.transform(e) : Ce.transform(e),
  getAnimatableNone: (e) => {
    const t = z.parse(e);
    return t.alpha = 0, z.transform(t);
  }
}, yc = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function bc(e) {
  return isNaN(e) && typeof e == "string" && (e.match(Zn)?.length || 0) + (e.match(yc)?.length || 0) > 0;
}
const Ba = "number", Ia = "color", vc = "var", xc = "var(", Di = "${}", wc = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function it(e) {
  const t = e.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let a = 0;
  const o = t.replace(wc, (l) => (z.test(l) ? (i.color.push(a), s.push(Ia), n.push(z.parse(l))) : l.startsWith(xc) ? (i.var.push(a), s.push(vc), n.push(l)) : (i.number.push(a), s.push(Ba), n.push(parseFloat(l))), ++a, Di)).split(Di);
  return { values: n, split: o, indexes: i, types: s };
}
function La(e) {
  return it(e).values;
}
function za(e) {
  const { split: t, types: n } = it(e), i = t.length;
  return (s) => {
    let a = "";
    for (let r = 0; r < i; r++)
      if (a += t[r], s[r] !== void 0) {
        const o = n[r];
        o === Ba ? a += Ye(s[r]) : o === Ia ? a += z.transform(s[r]) : a += s[r];
      }
    return a;
  };
}
const Ac = (e) => typeof e == "number" ? 0 : z.test(e) ? z.getAnimatableNone(e) : e;
function kc(e) {
  const t = La(e);
  return za(e)(t.map(Ac));
}
const ye = {
  test: bc,
  parse: La,
  createTransformer: za,
  getAnimatableNone: kc
};
function Ht(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Tc({ hue: e, saturation: t, lightness: n, alpha: i }) {
  e /= 360, t /= 100, n /= 100;
  let s = 0, a = 0, r = 0;
  if (!t)
    s = a = r = n;
  else {
    const o = n < 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - o;
    s = Ht(l, o, e + 1 / 3), a = Ht(l, o, e), r = Ht(l, o, e - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(a * 255),
    blue: Math.round(r * 255),
    alpha: i
  };
}
function St(e, t) {
  return (n) => n > 0 ? t : e;
}
const D = (e, t, n) => e + (t - e) * n, Kt = (e, t, n) => {
  const i = e * e, s = n * (t * t - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, Rc = [ln, Te, Ce], Nc = (e) => Rc.find((t) => t.test(e));
function Vi(e) {
  const t = Nc(e);
  if (!t)
    return !1;
  let n = t.parse(e);
  return t === Ce && (n = Tc(n)), n;
}
const Bi = (e, t) => {
  const n = Vi(e), i = Vi(t);
  if (!n || !i)
    return St(e, t);
  const s = { ...n };
  return (a) => (s.red = Kt(n.red, i.red, a), s.green = Kt(n.green, i.green, a), s.blue = Kt(n.blue, i.blue, a), s.alpha = D(n.alpha, i.alpha, a), Te.transform(s));
}, cn = /* @__PURE__ */ new Set(["none", "hidden"]);
function Pc(e, t) {
  return cn.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function Sc(e, t) {
  return (n) => D(e, t, n);
}
function Qn(e) {
  return typeof e == "number" ? Sc : typeof e == "string" ? Xn(e) ? St : z.test(e) ? Bi : Cc : Array.isArray(e) ? ja : typeof e == "object" ? z.test(e) ? Bi : Ec : St;
}
function ja(e, t) {
  const n = [...e], i = n.length, s = e.map((a, r) => Qn(a)(a, t[r]));
  return (a) => {
    for (let r = 0; r < i; r++)
      n[r] = s[r](a);
    return n;
  };
}
function Ec(e, t) {
  const n = { ...e, ...t }, i = {};
  for (const s in n)
    e[s] !== void 0 && t[s] !== void 0 && (i[s] = Qn(e[s])(e[s], t[s]));
  return (s) => {
    for (const a in i)
      n[a] = i[a](s);
    return n;
  };
}
function Mc(e, t) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < t.values.length; s++) {
    const a = t.types[s], r = e.indexes[a][i[a]], o = e.values[r] ?? 0;
    n[s] = o, i[a]++;
  }
  return n;
}
const Cc = (e, t) => {
  const n = ye.createTransformer(t), i = it(e), s = it(t);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? cn.has(e) && !s.values.length || cn.has(t) && !i.values.length ? Pc(e, t) : ut(ja(Mc(i, s), s.values), n) : St(e, t);
};
function Oa(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? D(e, t, n) : Qn(e)(e, t);
}
const Fc = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => F.update(t, n),
    stop: () => ge(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => U.isProcessing ? U.timestamp : K.now()
  };
}, Ua = (e, t, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(t / n), 2);
  for (let a = 0; a < s; a++)
    i += Math.round(e(a / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, Et = 2e4;
function ei(e) {
  let t = 0;
  const n = 50;
  let i = e.next(t);
  for (; !i.done && t < Et; )
    t += n, i = e.next(t);
  return t >= Et ? 1 / 0 : t;
}
function Dc(e, t = 100, n) {
  const i = n({ ...e, keyframes: [0, t] }), s = Math.min(ei(i), Et);
  return {
    type: "keyframes",
    ease: (a) => i.next(s * a).value / t,
    duration: /* @__PURE__ */ Z(s)
  };
}
const Vc = 5;
function $a(e, t, n) {
  const i = Math.max(t - Vc, 0);
  return wa(n - e(i), t - i);
}
const B = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, Gt = 1e-3;
function Bc({ duration: e = B.duration, bounce: t = B.bounce, velocity: n = B.velocity, mass: i = B.mass }) {
  let s, a, r = 1 - t;
  r = ue(B.minDamping, B.maxDamping, r), e = ue(B.minDuration, B.maxDuration, /* @__PURE__ */ Z(e)), r < 1 ? (s = (u) => {
    const d = u * r, h = d * e, m = d - n, p = un(u, r), g = Math.exp(-h);
    return Gt - m / p * g;
  }, a = (u) => {
    const h = u * r * e, m = h * n + n, p = Math.pow(r, 2) * Math.pow(u, 2) * e, g = Math.exp(-h), v = un(Math.pow(u, 2), r);
    return (-s(u) + Gt > 0 ? -1 : 1) * ((m - p) * g) / v;
  }) : (s = (u) => {
    const d = Math.exp(-u * e), h = (u - n) * e + 1;
    return -Gt + d * h;
  }, a = (u) => {
    const d = Math.exp(-u * e), h = (n - u) * (e * e);
    return d * h;
  });
  const o = 5 / e, l = Lc(s, a, o);
  if (e = /* @__PURE__ */ se(e), isNaN(l))
    return {
      stiffness: B.stiffness,
      damping: B.damping,
      duration: e
    };
  {
    const u = Math.pow(l, 2) * i;
    return {
      stiffness: u,
      damping: r * 2 * Math.sqrt(i * u),
      duration: e
    };
  }
}
const Ic = 12;
function Lc(e, t, n) {
  let i = n;
  for (let s = 1; s < Ic; s++)
    i = i - e(i) / t(i);
  return i;
}
function un(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const zc = ["duration", "bounce"], jc = ["stiffness", "damping", "mass"];
function Ii(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function Oc(e) {
  let t = {
    velocity: B.velocity,
    stiffness: B.stiffness,
    damping: B.damping,
    mass: B.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Ii(e, jc) && Ii(e, zc))
    if (e.visualDuration) {
      const n = e.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, a = 2 * ue(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(s);
      t = {
        ...t,
        mass: B.mass,
        stiffness: s,
        damping: a
      };
    } else {
      const n = Bc(e);
      t = {
        ...t,
        ...n,
        mass: B.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function Mt(e = B.visualDuration, t = B.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: i, restDelta: s } = n;
  const a = n.keyframes[0], r = n.keyframes[n.keyframes.length - 1], o = { done: !1, value: a }, { stiffness: l, damping: u, mass: d, duration: h, velocity: m, isResolvedFromDuration: p } = Oc({
    ...n,
    velocity: -/* @__PURE__ */ Z(n.velocity || 0)
  }), g = m || 0, v = u / (2 * Math.sqrt(l * d)), b = r - a, x = /* @__PURE__ */ Z(Math.sqrt(l / d)), y = Math.abs(b) < 5;
  i || (i = y ? B.restSpeed.granular : B.restSpeed.default), s || (s = y ? B.restDelta.granular : B.restDelta.default);
  let w;
  if (v < 1) {
    const k = un(x, v);
    w = (S) => {
      const E = Math.exp(-v * x * S);
      return r - E * ((g + v * x * b) / k * Math.sin(k * S) + b * Math.cos(k * S));
    };
  } else if (v === 1)
    w = (k) => r - Math.exp(-x * k) * (b + (g + x * b) * k);
  else {
    const k = x * Math.sqrt(v * v - 1);
    w = (S) => {
      const E = Math.exp(-v * x * S), T = Math.min(k * S, 300);
      return r - E * ((g + v * x * b) * Math.sinh(T) + k * b * Math.cosh(T)) / k;
    };
  }
  const R = {
    calculatedDuration: p && h || null,
    next: (k) => {
      const S = w(k);
      if (p)
        o.done = k >= h;
      else {
        let E = k === 0 ? g : 0;
        v < 1 && (E = k === 0 ? /* @__PURE__ */ se(g) : $a(w, k, S));
        const T = Math.abs(E) <= i, C = Math.abs(r - S) <= s;
        o.done = T && C;
      }
      return o.value = o.done ? r : S, o;
    },
    toString: () => {
      const k = Math.min(ei(R), Et), S = Ua((E) => R.next(k * E).value, k, 30);
      return k + "ms " + S;
    },
    toTransition: () => {
    }
  };
  return R;
}
Mt.applyToOptions = (e) => {
  const t = Dc(e, 100, Mt);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ se(t.duration), e.type = "keyframes", e;
};
function dn({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: a = 500, modifyTarget: r, min: o, max: l, restDelta: u = 0.5, restSpeed: d }) {
  const h = e[0], m = {
    done: !1,
    value: h
  }, p = (T) => o !== void 0 && T < o || l !== void 0 && T > l, g = (T) => o === void 0 ? l : l === void 0 || Math.abs(o - T) < Math.abs(l - T) ? o : l;
  let v = n * t;
  const b = h + v, x = r === void 0 ? b : r(b);
  x !== b && (v = x - h);
  const y = (T) => -v * Math.exp(-T / i), w = (T) => x + y(T), R = (T) => {
    const C = y(T), I = w(T);
    m.done = Math.abs(C) <= u, m.value = m.done ? x : I;
  };
  let k, S;
  const E = (T) => {
    p(m.value) && (k = T, S = Mt({
      keyframes: [m.value, g(m.value)],
      velocity: $a(w, T, m.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: a,
      restDelta: u,
      restSpeed: d
    }));
  };
  return E(0), {
    calculatedDuration: null,
    next: (T) => {
      let C = !1;
      return !S && k === void 0 && (C = !0, R(T), E(T)), k !== void 0 && T >= k ? S.next(T - k) : (!C && R(T), m);
    }
  };
}
function Uc(e, t, n) {
  const i = [], s = n || de.mix || Oa, a = e.length - 1;
  for (let r = 0; r < a; r++) {
    let o = s(e[r], e[r + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[r] || Q : t;
      o = ut(l, o);
    }
    i.push(o);
  }
  return i;
}
function $c(e, t, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const a = e.length;
  if (_n(a === t.length), a === 1)
    return () => t[0];
  if (a === 2 && t[0] === t[1])
    return () => t[1];
  const r = e[0] === e[1];
  e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const o = Uc(t, i, s), l = o.length, u = (d) => {
    if (r && d < e[0])
      return t[0];
    let h = 0;
    if (l > 1)
      for (; h < e.length - 2 && !(d < e[h + 1]); h++)
        ;
    const m = /* @__PURE__ */ tt(e[h], e[h + 1], d);
    return o[h](m);
  };
  return n ? (d) => u(ue(e[0], e[a - 1], d)) : u;
}
function Wc(e, t) {
  const n = e[e.length - 1];
  for (let i = 1; i <= t; i++) {
    const s = /* @__PURE__ */ tt(0, t, i);
    e.push(D(n, 1, s));
  }
}
function _c(e) {
  const t = [0];
  return Wc(t, e.length - 1), t;
}
function Hc(e, t) {
  return e.map((n) => n * t);
}
function Kc(e, t) {
  return e.map(() => t || Ma).splice(0, e.length - 1);
}
function Xe({ duration: e = 300, keyframes: t, times: n, ease: i = "easeInOut" }) {
  const s = ic(i) ? i.map(Ci) : Ci(i), a = {
    done: !1,
    value: t[0]
  }, r = Hc(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : _c(t),
    e
  ), o = $c(r, t, {
    ease: Array.isArray(s) ? s : Kc(t, s)
  });
  return {
    calculatedDuration: e,
    next: (l) => (a.value = o(l), a.done = l >= e, a)
  };
}
const Gc = (e) => e !== null;
function ti(e, { repeat: t, repeatType: n = "loop" }, i, s = 1) {
  const a = e.filter(Gc), o = s < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : a.length - 1;
  return !o || i === void 0 ? a[o] : i;
}
const qc = {
  decay: dn,
  inertia: dn,
  tween: Xe,
  keyframes: Xe,
  spring: Mt
};
function Wa(e) {
  typeof e.type == "string" && (e.type = qc[e.type]);
}
class ni {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const Yc = (e) => e / 100;
class ii extends ni {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== K.now() && this.tick(K.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Wa(t);
    const { type: n = Xe, repeat: i = 0, repeatDelay: s = 0, repeatType: a, velocity: r = 0 } = t;
    let { keyframes: o } = t;
    const l = n || Xe;
    l !== Xe && typeof o[0] != "number" && (this.mixKeyframes = ut(Yc, Oa(o[0], o[1])), o = [0, 100]);
    const u = l({ ...t, keyframes: o });
    a === "mirror" && (this.mirroredGenerator = l({
      ...t,
      keyframes: [...o].reverse(),
      velocity: -r
    })), u.calculatedDuration === null && (u.calculatedDuration = ei(u));
    const { calculatedDuration: d } = u;
    this.calculatedDuration = d, this.resolvedDuration = d + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = u;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: a, mirroredGenerator: r, resolvedDuration: o, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: u = 0, keyframes: d, repeat: h, repeatType: m, repeatDelay: p, type: g, onUpdate: v, finalKeyframe: b } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - s / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const x = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), y = this.playbackSpeed >= 0 ? x < 0 : x > s;
    this.currentTime = Math.max(x, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let w = this.currentTime, R = i;
    if (h) {
      const T = Math.min(this.currentTime, s) / o;
      let C = Math.floor(T), I = T % 1;
      !I && T >= 1 && (I = 1), I === 1 && C--, C = Math.min(C, h + 1), !!(C % 2) && (m === "reverse" ? (I = 1 - I, p && (I -= p / o)) : m === "mirror" && (R = r)), w = ue(0, 1, I) * o;
    }
    const k = y ? { done: !1, value: d[0] } : R.next(w);
    a && (k.value = a(k.value));
    let { done: S } = k;
    !y && l !== null && (S = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const E = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return E && g !== dn && (k.value = ti(d, this.options, b, this.speed)), v && v(k.value), E && this.finish(), k;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ Z(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Z(t);
  }
  get time() {
    return /* @__PURE__ */ Z(this.currentTime);
  }
  set time(t) {
    t = /* @__PURE__ */ se(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(K.now());
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = /* @__PURE__ */ Z(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: t = Fc, startTime: n } = this.options;
    this.driver || (this.driver = t((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(K.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), t.observe(this);
  }
}
function Xc(e) {
  for (let t = 1; t < e.length; t++)
    e[t] ?? (e[t] = e[t - 1]);
}
const Re = (e) => e * 180 / Math.PI, hn = (e) => {
  const t = Re(Math.atan2(e[1], e[0]));
  return mn(t);
}, Zc = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: hn,
  rotateZ: hn,
  skewX: (e) => Re(Math.atan(e[1])),
  skewY: (e) => Re(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, mn = (e) => (e = e % 360, e < 0 && (e += 360), e), Li = hn, zi = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), ji = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), Jc = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: zi,
  scaleY: ji,
  scale: (e) => (zi(e) + ji(e)) / 2,
  rotateX: (e) => mn(Re(Math.atan2(e[6], e[5]))),
  rotateY: (e) => mn(Re(Math.atan2(-e[2], e[0]))),
  rotateZ: Li,
  rotate: Li,
  skewX: (e) => Re(Math.atan(e[4])),
  skewY: (e) => Re(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function fn(e) {
  return e.includes("scale") ? 1 : 0;
}
function pn(e, t) {
  if (!e || e === "none")
    return fn(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = Jc, s = n;
  else {
    const o = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = Zc, s = o;
  }
  if (!s)
    return fn(t);
  const a = i[t], r = s[1].split(",").map(eu);
  return typeof a == "function" ? a(r) : r[a];
}
const Qc = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return pn(n, t);
};
function eu(e) {
  return parseFloat(e.trim());
}
const _e = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], He = new Set(_e), Oi = (e) => e === We || e === N, tu = /* @__PURE__ */ new Set(["x", "y", "z"]), nu = _e.filter((e) => !tu.has(e));
function iu(e) {
  const t = [];
  return nu.forEach((n) => {
    const i = e.getValue(n);
    i !== void 0 && (t.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const Ne = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => pn(t, "x"),
  y: (e, { transform: t }) => pn(t, "y")
};
Ne.translateX = Ne.x;
Ne.translateY = Ne.y;
const Pe = /* @__PURE__ */ new Set();
let gn = !1, yn = !1, bn = !1;
function _a() {
  if (yn) {
    const e = Array.from(Pe).filter((i) => i.needsMeasurement), t = new Set(e.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    t.forEach((i) => {
      const s = iu(i);
      s.length && (n.set(i, s), i.render());
    }), e.forEach((i) => i.measureInitialState()), t.forEach((i) => {
      i.render();
      const s = n.get(i);
      s && s.forEach(([a, r]) => {
        i.getValue(a)?.set(r);
      });
    }), e.forEach((i) => i.measureEndState()), e.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  yn = !1, gn = !1, Pe.forEach((e) => e.complete(bn)), Pe.clear();
}
function Ha() {
  Pe.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (yn = !0);
  });
}
function su() {
  bn = !0, Ha(), _a(), bn = !1;
}
class si {
  constructor(t, n, i, s, a, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = i, this.motionValue = s, this.element = a, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Pe.add(this), gn || (gn = !0, F.read(Ha), F.resolveKeyframes(_a))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: i, motionValue: s } = this;
    if (t[0] === null) {
      const a = s?.get(), r = t[t.length - 1];
      if (a !== void 0)
        t[0] = a;
      else if (i && n) {
        const o = i.readValue(n, r);
        o != null && (t[0] = o);
      }
      t[0] === void 0 && (t[0] = r), s && a === void 0 && s.set(t[0]);
    }
    Xc(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), Pe.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Pe.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const au = (e) => e.startsWith("--");
function ru(e, t, n) {
  au(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const ou = /* @__PURE__ */ Hn(() => window.ScrollTimeline !== void 0), lu = {};
function cu(e, t) {
  const n = /* @__PURE__ */ Hn(e);
  return () => lu[t] ?? n();
}
const Ka = /* @__PURE__ */ cu(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), qe = ([e, t, n, i]) => `cubic-bezier(${e}, ${t}, ${n}, ${i})`, Ui = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ qe([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ qe([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ qe([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ qe([0.33, 1.53, 0.69, 0.99])
};
function Ga(e, t) {
  if (e)
    return typeof e == "function" ? Ka() ? Ua(e, t) : "ease-out" : Ca(e) ? qe(e) : Array.isArray(e) ? e.map((n) => Ga(n, t) || Ui.easeOut) : Ui[e];
}
function uu(e, t, n, { delay: i = 0, duration: s = 300, repeat: a = 0, repeatType: r = "loop", ease: o = "easeOut", times: l } = {}, u = void 0) {
  const d = {
    [t]: n
  };
  l && (d.offset = l);
  const h = Ga(o, s);
  Array.isArray(h) && (d.easing = h);
  const m = {
    delay: i,
    duration: s,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: a + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return u && (m.pseudoElement = u), e.animate(d, m);
}
function qa(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function du({ type: e, ...t }) {
  return qa(e) && Ka() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class hu extends ni {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: a, allowFlatten: r = !1, finalKeyframe: o, onComplete: l } = t;
    this.isPseudoElement = !!a, this.allowFlatten = r, this.options = t, _n(typeof t.type != "string");
    const u = du(t);
    this.animation = uu(n, i, s, u, a), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !a) {
        const d = ti(s, this.options, o, this.speed);
        this.updateMotionValue ? this.updateMotionValue(d) : ru(n, i, d), this.animation.cancel();
      }
      l?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const t = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ Z(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ Z(t);
  }
  get time() {
    return /* @__PURE__ */ Z(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ se(t);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(t) {
    this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, observe: n }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t && ou() ? (this.animation.timeline = t, Q) : n(this);
  }
}
const Ya = {
  anticipate: Pa,
  backInOut: Na,
  circInOut: Ea
};
function mu(e) {
  return e in Ya;
}
function fu(e) {
  typeof e.ease == "string" && mu(e.ease) && (e.ease = Ya[e.ease]);
}
const $i = 10;
class pu extends hu {
  constructor(t) {
    fu(t), Wa(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: i, onComplete: s, element: a, ...r } = this.options;
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const o = new ii({
      ...r,
      autoplay: !1
    }), l = /* @__PURE__ */ se(this.finishedTime ?? this.time);
    n.setWithVelocity(o.sample(l - $i).value, o.sample(l).value, $i), o.stop();
  }
}
const Wi = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(ye.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function gu(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function yu(e, t, n, i) {
  const s = e[0];
  if (s === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const a = e[e.length - 1], r = Wi(s, t), o = Wi(a, t);
  return !r || !o ? !1 : gu(e) || (n === "spring" || qa(n)) && i;
}
function vn(e) {
  e.duration = 0, e.type = "keyframes";
}
const bu = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), vu = /* @__PURE__ */ Hn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function xu(e) {
  const { motionValue: t, name: n, repeatDelay: i, repeatType: s, damping: a, type: r } = e;
  if (!(t?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = t.owner.getProps();
  return vu() && n && bu.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && s !== "mirror" && a !== 0 && r !== "inertia";
}
const wu = 40;
class Au extends ni {
  constructor({ autoplay: t = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: a = 0, repeatType: r = "loop", keyframes: o, name: l, motionValue: u, element: d, ...h }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = K.now();
    const m = {
      autoplay: t,
      delay: n,
      type: i,
      repeat: s,
      repeatDelay: a,
      repeatType: r,
      name: l,
      motionValue: u,
      element: d,
      ...h
    }, p = d?.KeyframeResolver || si;
    this.keyframeResolver = new p(o, (g, v, b) => this.onKeyframesResolved(g, v, m, !b), l, u, d), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(t, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: a, type: r, velocity: o, delay: l, isHandoff: u, onUpdate: d } = i;
    this.resolvedAt = K.now(), yu(t, a, r, o) || ((de.instantAnimations || !l) && d?.(ti(t, i, n)), t[0] = t[t.length - 1], vn(i), i.repeat = 0);
    const m = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > wu ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: t
    }, p = !u && xu(m) ? new pu({
      ...m,
      element: m.motionValue.owner.current
    }) : new ii(m);
    p.finished.then(() => this.notifyFinished()).catch(Q), this.pendingTimeline && (this.stopTimeline = p.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = p;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), su()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
const ku = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Tu(e) {
  const t = ku.exec(e);
  if (!t)
    return [,];
  const [, n, i, s] = t;
  return [`--${n ?? i}`, s];
}
function Xa(e, t, n = 1) {
  const [i, s] = Tu(e);
  if (!i)
    return;
  const a = window.getComputedStyle(t).getPropertyValue(i);
  if (a) {
    const r = a.trim();
    return ba(r) ? parseFloat(r) : r;
  }
  return Xn(s) ? Xa(s, t, n + 1) : s;
}
function ai(e, t) {
  return e?.[t] ?? e?.default ?? e;
}
const Za = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ..._e
]), Ru = {
  test: (e) => e === "auto",
  parse: (e) => e
}, Ja = (e) => (t) => t.test(e), Qa = [We, N, ae, pe, gc, pc, Ru], _i = (e) => Qa.find(Ja(e));
function Nu(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || xa(e) : !0;
}
const Pu = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Su(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [i] = n.match(Zn) || [];
  if (!i)
    return e;
  const s = n.replace(i, "");
  let a = Pu.has(t) ? 1 : 0;
  return i !== n && (a *= 100), t + "(" + a + s + ")";
}
const Eu = /\b([a-z-]*)\(.*?\)/gu, xn = {
  ...ye,
  getAnimatableNone: (e) => {
    const t = e.match(Eu);
    return t ? t.map(Su).join(" ") : e;
  }
}, Hi = {
  ...We,
  transform: Math.round
}, Mu = {
  rotate: pe,
  rotateX: pe,
  rotateY: pe,
  rotateZ: pe,
  scale: gt,
  scaleX: gt,
  scaleY: gt,
  scaleZ: gt,
  skew: pe,
  skewX: pe,
  skewY: pe,
  distance: N,
  translateX: N,
  translateY: N,
  translateZ: N,
  x: N,
  y: N,
  z: N,
  perspective: N,
  transformPerspective: N,
  opacity: nt,
  originX: Fi,
  originY: Fi,
  originZ: N
}, ri = {
  // Border props
  borderWidth: N,
  borderTopWidth: N,
  borderRightWidth: N,
  borderBottomWidth: N,
  borderLeftWidth: N,
  borderRadius: N,
  radius: N,
  borderTopLeftRadius: N,
  borderTopRightRadius: N,
  borderBottomRightRadius: N,
  borderBottomLeftRadius: N,
  // Positioning props
  width: N,
  maxWidth: N,
  height: N,
  maxHeight: N,
  top: N,
  right: N,
  bottom: N,
  left: N,
  // Spacing props
  padding: N,
  paddingTop: N,
  paddingRight: N,
  paddingBottom: N,
  paddingLeft: N,
  margin: N,
  marginTop: N,
  marginRight: N,
  marginBottom: N,
  marginLeft: N,
  // Misc
  backgroundPositionX: N,
  backgroundPositionY: N,
  ...Mu,
  zIndex: Hi,
  // SVG
  fillOpacity: nt,
  strokeOpacity: nt,
  numOctaves: Hi
}, Cu = {
  ...ri,
  // Color props
  color: z,
  backgroundColor: z,
  outlineColor: z,
  fill: z,
  stroke: z,
  // Border props
  borderColor: z,
  borderTopColor: z,
  borderRightColor: z,
  borderBottomColor: z,
  borderLeftColor: z,
  filter: xn,
  WebkitFilter: xn
}, er = (e) => Cu[e];
function tr(e, t) {
  let n = er(e);
  return n !== xn && (n = ye), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const Fu = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Du(e, t, n) {
  let i = 0, s;
  for (; i < e.length && !s; ) {
    const a = e[i];
    typeof a == "string" && !Fu.has(a) && it(a).values.length && (s = e[i]), i++;
  }
  if (s && n)
    for (const a of t)
      e[a] = tr(n, s);
}
class Vu extends si {
  constructor(t, n, i, s, a) {
    super(t, n, i, s, a, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      if (typeof u == "string" && (u = u.trim(), Xn(u))) {
        const d = Xa(u, n.current);
        d !== void 0 && (t[l] = d), l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !Za.has(i) || t.length !== 2)
      return;
    const [s, a] = t, r = _i(s), o = _i(a);
    if (r !== o)
      if (Oi(r) && Oi(o))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else Ne[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, i = [];
    for (let s = 0; s < t.length; s++)
      (t[s] === null || Nu(t[s])) && i.push(s);
    i.length && Du(t, i, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: i } = this;
    if (!t || !t.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Ne[i](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && t.getValue(i, s).jump(s, !1);
  }
  measureEndState() {
    const { element: t, name: n, unresolvedKeyframes: i } = this;
    if (!t || !t.current)
      return;
    const s = t.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const a = i.length - 1, r = i[a];
    i[a] = Ne[n](t.measureViewportBox(), window.getComputedStyle(t.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([o, l]) => {
      t.getValue(o).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function Bu(e, t, n) {
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let i = document;
    const s = n?.[e] ?? i.querySelectorAll(e);
    return s ? Array.from(s) : [];
  }
  return Array.from(e);
}
const nr = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
function ir(e) {
  return va(e) && "offsetHeight" in e;
}
const Ki = 30, Iu = (e) => !isNaN(parseFloat(e));
class Lu {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = K.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const a of this.dependents)
          a.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = K.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Iu(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Kn());
    const i = this.events[t].add(n);
    return t === "change" ? () => {
      i(), F.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const t = K.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Ki)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Ki);
    return wa(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Le(e, t) {
  return new Lu(e, t);
}
const { schedule: oi } = /* @__PURE__ */ Fa(queueMicrotask, !1), te = {
  x: !1,
  y: !1
};
function sr() {
  return te.x || te.y;
}
function zu(e) {
  return e === "x" || e === "y" ? te[e] ? null : (te[e] = !0, () => {
    te[e] = !1;
  }) : te.x || te.y ? null : (te.x = te.y = !0, () => {
    te.x = te.y = !1;
  });
}
function ar(e, t) {
  const n = Bu(e), i = new AbortController(), s = {
    passive: !0,
    ...t,
    signal: i.signal
  };
  return [n, s, () => i.abort()];
}
function Gi(e) {
  return !(e.pointerType === "touch" || sr());
}
function ju(e, t, n = {}) {
  const [i, s, a] = ar(e, n), r = (o) => {
    if (!Gi(o))
      return;
    const { target: l } = o, u = t(l, o);
    if (typeof u != "function" || !l)
      return;
    const d = (h) => {
      Gi(h) && (u(h), l.removeEventListener("pointerleave", d));
    };
    l.addEventListener("pointerleave", d, s);
  };
  return i.forEach((o) => {
    o.addEventListener("pointerenter", r, s);
  }), a;
}
const rr = (e, t) => t ? e === t ? !0 : rr(e, t.parentElement) : !1, li = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, Ou = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Uu(e) {
  return Ou.has(e.tagName) || e.tabIndex !== -1;
}
const Tt = /* @__PURE__ */ new WeakSet();
function qi(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function qt(e, t) {
  e.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const $u = (e, t) => {
  const n = e.currentTarget;
  if (!n)
    return;
  const i = qi(() => {
    if (Tt.has(n))
      return;
    qt(n, "down");
    const s = qi(() => {
      qt(n, "up");
    }), a = () => qt(n, "cancel");
    n.addEventListener("keyup", s, t), n.addEventListener("blur", a, t);
  });
  n.addEventListener("keydown", i, t), n.addEventListener("blur", () => n.removeEventListener("keydown", i), t);
};
function Yi(e) {
  return li(e) && !sr();
}
function Wu(e, t, n = {}) {
  const [i, s, a] = ar(e, n), r = (o) => {
    const l = o.currentTarget;
    if (!Yi(o))
      return;
    Tt.add(l);
    const u = t(l, o), d = (p, g) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", m), Tt.has(l) && Tt.delete(l), Yi(p) && typeof u == "function" && u(p, { success: g });
    }, h = (p) => {
      d(p, l === window || l === document || n.useGlobalTarget || rr(l, p.target));
    }, m = (p) => {
      d(p, !1);
    };
    window.addEventListener("pointerup", h, s), window.addEventListener("pointercancel", m, s);
  };
  return i.forEach((o) => {
    (n.useGlobalTarget ? window : o).addEventListener("pointerdown", r, s), ir(o) && (o.addEventListener("focus", (u) => $u(u, s)), !Uu(o) && !o.hasAttribute("tabindex") && (o.tabIndex = 0));
  }), a;
}
function or(e) {
  return va(e) && "ownerSVGElement" in e;
}
function _u(e) {
  return or(e) && e.tagName === "svg";
}
const $ = (e) => !!(e && e.getVelocity), Hu = [...Qa, z, ye], Ku = (e) => Hu.find(Ja(e)), ci = j({
  transformPagePoint: (e) => e,
  isStatic: !1,
  reducedMotion: "never"
});
function Xi(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Gu(...e) {
  return (t) => {
    let n = !1;
    const i = e.map((s) => {
      const a = Xi(s, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const a = i[s];
          typeof a == "function" ? a() : Xi(e[s], null);
        }
      };
  };
}
function qu(...e) {
  return be(Gu(...e), e);
}
class Yu extends Mn {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const i = n.offsetParent, s = ir(i) && i.offsetWidth || 0, a = this.props.sizeRef.current;
      a.height = n.offsetHeight || 0, a.width = n.offsetWidth || 0, a.top = n.offsetTop, a.left = n.offsetLeft, a.right = s - a.width - a.left;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function Xu({ children: e, isPresent: t, anchorX: n, root: i }) {
  const s = Fn(), a = J(null), r = J({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: o } = P(ci), l = qu(a, e?.ref);
  return Xs(() => {
    const { width: u, height: d, top: h, left: m, right: p } = r.current;
    if (t || !a.current || !u || !d)
      return;
    const g = n === "left" ? `left: ${m}` : `right: ${p}`;
    a.current.dataset.motionPopId = s;
    const v = document.createElement("style");
    o && (v.nonce = o);
    const b = i ?? document.head;
    return b.appendChild(v), v.sheet && v.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${d}px !important;
            ${g}px !important;
            top: ${h}px !important;
          }
        `), () => {
      b.contains(v) && b.removeChild(v);
    };
  }, [t]), c(Yu, { isPresent: t, childRef: a, sizeRef: r, children: eo(e, { ref: l }) });
}
const Zu = ({ children: e, initial: t, isPresent: n, onExitComplete: i, custom: s, presenceAffectsLayout: a, mode: r, anchorX: o, root: l }) => {
  const u = Bt(Ju), d = Fn();
  let h = !0, m = W(() => (h = !1, {
    id: d,
    initial: t,
    isPresent: n,
    custom: s,
    onExitComplete: (p) => {
      u.set(p, !0);
      for (const g of u.values())
        if (!g)
          return;
      i && i();
    },
    register: (p) => (u.set(p, !1), () => u.delete(p))
  }), [n, u, i]);
  return a && h && (m = { ...m }), W(() => {
    u.forEach((p, g) => u.set(g, !1));
  }, [n]), ie(() => {
    !n && !u.size && i && i();
  }, [n]), r === "popLayout" && (e = c(Xu, { isPresent: n, anchorX: o, root: l, children: e })), c(It.Provider, { value: m, children: e });
};
function Ju() {
  return /* @__PURE__ */ new Map();
}
function lr(e = !0) {
  const t = P(It);
  if (t === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: s } = t, a = Fn();
  ie(() => {
    if (e)
      return s(a);
  }, [e]);
  const r = be(() => e && i && i(a), [a, i, e]);
  return !n && i ? [!1, r] : [!0];
}
const yt = (e) => e.key || "";
function Zi(e) {
  const t = [];
  return qs.forEach(e, (n) => {
    Ys(n) && t.push(n);
  }), t;
}
const Ji = ({ children: e, custom: t, initial: n = !0, onExitComplete: i, presenceAffectsLayout: s = !0, mode: a = "sync", propagate: r = !1, anchorX: o = "left", root: l }) => {
  const [u, d] = lr(r), h = W(() => Zi(e), [e]), m = r && !u ? [] : h.map(yt), p = J(!0), g = J(h), v = Bt(() => /* @__PURE__ */ new Map()), [b, x] = G(h), [y, w] = G(h);
  Un(() => {
    p.current = !1, g.current = h;
    for (let S = 0; S < y.length; S++) {
      const E = yt(y[S]);
      m.includes(E) ? v.delete(E) : v.get(E) !== !0 && v.set(E, !1);
    }
  }, [y, m.length, m.join("-")]);
  const R = [];
  if (h !== b) {
    let S = [...h];
    for (let E = 0; E < y.length; E++) {
      const T = y[E], C = yt(T);
      m.includes(C) || (S.splice(E, 0, T), R.push(T));
    }
    return a === "wait" && R.length && (S = R), w(Zi(S)), x(h), null;
  }
  const { forceRender: k } = P(jn);
  return c(an, { children: y.map((S) => {
    const E = yt(S), T = r && !u ? !1 : h === y || m.includes(E), C = () => {
      if (v.has(E))
        v.set(E, !0);
      else
        return;
      let I = !0;
      v.forEach((fe) => {
        fe || (I = !1);
      }), I && (k?.(), w(g.current), r && d?.(), i && i());
    };
    return c(Zu, { isPresent: T, initial: !p.current || n ? void 0 : !1, custom: t, presenceAffectsLayout: s, mode: a, root: l, onExitComplete: T ? void 0 : C, anchorX: o, children: S }, E);
  }) });
}, cr = j({ strict: !1 }), Qi = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, ze = {};
for (const e in Qi)
  ze[e] = {
    isEnabled: (t) => Qi[e].some((n) => !!t[n])
  };
function Qu(e) {
  for (const t in e)
    ze[t] = {
      ...ze[t],
      ...e[t]
    };
}
const ed = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function Ct(e) {
  return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || ed.has(e);
}
let ur = (e) => !Ct(e);
function td(e) {
  typeof e == "function" && (ur = (t) => t.startsWith("on") ? !Ct(t) : e(t));
}
try {
  td(require("@emotion/is-prop-valid").default);
} catch {
}
function nd(e, t, n) {
  const i = {};
  for (const s in e)
    s === "values" && typeof e.values == "object" || (ur(s) || n === !0 && Ct(s) || !t && !Ct(s) || // If trying to use native HTML drag events, forward drag listeners
    e.draggable && s.startsWith("onDrag")) && (i[s] = e[s]);
  return i;
}
const Lt = /* @__PURE__ */ j({});
function zt(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function st(e) {
  return typeof e == "string" || Array.isArray(e);
}
const ui = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], di = ["initial", ...ui];
function jt(e) {
  return zt(e.animate) || di.some((t) => st(e[t]));
}
function dr(e) {
  return !!(jt(e) || e.variants);
}
function id(e, t) {
  if (jt(e)) {
    const { initial: n, animate: i } = e;
    return {
      initial: n === !1 || st(n) ? n : void 0,
      animate: st(i) ? i : void 0
    };
  }
  return e.inherit !== !1 ? t : {};
}
function sd(e) {
  const { initial: t, animate: n } = id(e, P(Lt));
  return W(() => ({ initial: t, animate: n }), [es(t), es(n)]);
}
function es(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const at = {};
function ad(e) {
  for (const t in e)
    at[t] = e[t], Yn(t) && (at[t].isCSSVariable = !0);
}
function hr(e, { layout: t, layoutId: n }) {
  return He.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!at[e] || e === "opacity");
}
const rd = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, od = _e.length;
function ld(e, t, n) {
  let i = "", s = !0;
  for (let a = 0; a < od; a++) {
    const r = _e[a], o = e[r];
    if (o === void 0)
      continue;
    let l = !0;
    if (typeof o == "number" ? l = o === (r.startsWith("scale") ? 1 : 0) : l = parseFloat(o) === 0, !l || n) {
      const u = nr(o, ri[r]);
      if (!l) {
        s = !1;
        const d = rd[r] || r;
        i += `${d}(${u}) `;
      }
      n && (t[r] = u);
    }
  }
  return i = i.trim(), n ? i = n(t, s ? "" : i) : s && (i = "none"), i;
}
function hi(e, t, n) {
  const { style: i, vars: s, transformOrigin: a } = e;
  let r = !1, o = !1;
  for (const l in t) {
    const u = t[l];
    if (He.has(l)) {
      r = !0;
      continue;
    } else if (Yn(l)) {
      s[l] = u;
      continue;
    } else {
      const d = nr(u, ri[l]);
      l.startsWith("origin") ? (o = !0, a[l] = d) : i[l] = d;
    }
  }
  if (t.transform || (r || n ? i.transform = ld(t, e.transform, n) : i.transform && (i.transform = "none")), o) {
    const { originX: l = "50%", originY: u = "50%", originZ: d = 0 } = a;
    i.transformOrigin = `${l} ${u} ${d}`;
  }
}
const mi = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function mr(e, t, n) {
  for (const i in t)
    !$(t[i]) && !hr(i, n) && (e[i] = t[i]);
}
function cd({ transformTemplate: e }, t) {
  return W(() => {
    const n = mi();
    return hi(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function ud(e, t) {
  const n = e.style || {}, i = {};
  return mr(i, n, e), Object.assign(i, cd(e, t)), i;
}
function dd(e, t) {
  const n = {}, i = ud(e, t);
  return e.drag && e.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const hd = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, md = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function fd(e, t, n = 1, i = 0, s = !0) {
  e.pathLength = 1;
  const a = s ? hd : md;
  e[a.offset] = N.transform(-i);
  const r = N.transform(t), o = N.transform(n);
  e[a.array] = `${r} ${o}`;
}
function fr(e, {
  attrX: t,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: a = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...o
}, l, u, d) {
  if (hi(e, o, u), l) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: h, style: m } = e;
  h.transform && (m.transform = h.transform, delete h.transform), (m.transform || h.transformOrigin) && (m.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), m.transform && (m.transformBox = d?.transformBox ?? "fill-box", delete h.transformBox), t !== void 0 && (h.x = t), n !== void 0 && (h.y = n), i !== void 0 && (h.scale = i), s !== void 0 && fd(h, s, a, r, !1);
}
const pr = () => ({
  ...mi(),
  attrs: {}
}), gr = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function pd(e, t, n, i) {
  const s = W(() => {
    const a = pr();
    return fr(a, t, gr(i), e.transformTemplate, e.style), {
      ...a.attrs,
      style: { ...a.style }
    };
  }, [t]);
  if (e.style) {
    const a = {};
    mr(a, e.style, e), s.style = { ...a, ...s.style };
  }
  return s;
}
const gd = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function fi(e) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof e != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    e.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(gd.indexOf(e) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(e))
    )
  );
}
function yd(e, t, n, { latestValues: i }, s, a = !1) {
  const o = (fi(e) ? pd : dd)(t, i, s, e), l = nd(t, typeof e == "string", a), u = e !== Se ? { ...l, ...o, ref: n } : {}, { children: d } = t, h = W(() => $(d) ? d.get() : d, [d]);
  return M(e, {
    ...u,
    children: h
  });
}
function ts(e) {
  const t = [{}, {}];
  return e?.values.forEach((n, i) => {
    t[0][i] = n.get(), t[1][i] = n.getVelocity();
  }), t;
}
function pi(e, t, n, i) {
  if (typeof t == "function") {
    const [s, a] = ts(i);
    t = t(n !== void 0 ? n : e.custom, s, a);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [s, a] = ts(i);
    t = t(n !== void 0 ? n : e.custom, s, a);
  }
  return t;
}
function Rt(e) {
  return $(e) ? e.get() : e;
}
function bd({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, i, s) {
  return {
    latestValues: vd(n, i, s, e),
    renderState: t()
  };
}
function vd(e, t, n, i) {
  const s = {}, a = i(e, {});
  for (const m in a)
    s[m] = Rt(a[m]);
  let { initial: r, animate: o } = e;
  const l = jt(e), u = dr(e);
  t && u && !l && e.inherit !== !1 && (r === void 0 && (r = t.initial), o === void 0 && (o = t.animate));
  let d = n ? n.initial === !1 : !1;
  d = d || r === !1;
  const h = d ? o : r;
  if (h && typeof h != "boolean" && !zt(h)) {
    const m = Array.isArray(h) ? h : [h];
    for (let p = 0; p < m.length; p++) {
      const g = pi(e, m[p]);
      if (g) {
        const { transitionEnd: v, transition: b, ...x } = g;
        for (const y in x) {
          let w = x[y];
          if (Array.isArray(w)) {
            const R = d ? w.length - 1 : 0;
            w = w[R];
          }
          w !== null && (s[y] = w);
        }
        for (const y in v)
          s[y] = v[y];
      }
    }
  }
  return s;
}
const yr = (e) => (t, n) => {
  const i = P(Lt), s = P(It), a = () => bd(e, t, i, s);
  return n ? a() : Bt(a);
};
function gi(e, t, n) {
  const { style: i } = e, s = {};
  for (const a in i)
    ($(i[a]) || t.style && $(t.style[a]) || hr(a, e) || n?.getValue(a)?.liveStyle !== void 0) && (s[a] = i[a]);
  return s;
}
const xd = /* @__PURE__ */ yr({
  scrapeMotionValuesFromProps: gi,
  createRenderState: mi
});
function br(e, t, n) {
  const i = gi(e, t, n);
  for (const s in e)
    if ($(e[s]) || $(t[s])) {
      const a = _e.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[a] = e[s];
    }
  return i;
}
const wd = /* @__PURE__ */ yr({
  scrapeMotionValuesFromProps: br,
  createRenderState: pr
}), Ad = Symbol.for("motionComponentSymbol");
function Fe(e) {
  return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function kd(e, t, n) {
  return be(
    (i) => {
      i && e.onMount && e.onMount(i), t && (i ? t.mount(i) : t.unmount()), n && (typeof n == "function" ? n(i) : Fe(n) && (n.current = i));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [t]
  );
}
const yi = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Td = "framerAppearId", vr = "data-" + yi(Td), xr = j({});
function Rd(e, t, n, i, s) {
  const { visualElement: a } = P(Lt), r = P(cr), o = P(It), l = P(ci).reducedMotion, u = J(null);
  i = i || r.renderer, !u.current && i && (u.current = i(e, {
    visualState: t,
    parent: a,
    props: n,
    presenceContext: o,
    blockInitialAnimation: o ? o.initial === !1 : !1,
    reducedMotionConfig: l
  }));
  const d = u.current, h = P(xr);
  d && !d.projection && s && (d.type === "html" || d.type === "svg") && Nd(u.current, n, s, h);
  const m = J(!1);
  Xs(() => {
    d && m.current && d.update(n, o);
  });
  const p = n[vr], g = J(!!p && !window.MotionHandoffIsComplete?.(p) && window.MotionHasOptimisedAnimation?.(p));
  return Un(() => {
    d && (m.current = !0, window.MotionIsMounted = !0, d.updateFeatures(), d.scheduleRenderMicrotask(), g.current && d.animationState && d.animationState.animateChanges());
  }), ie(() => {
    d && (!g.current && d.animationState && d.animationState.animateChanges(), g.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(p);
    }), g.current = !1), d.enteringChildren = void 0);
  }), d;
}
function Nd(e, t, n, i) {
  const { layoutId: s, layout: a, drag: r, dragConstraints: o, layoutScroll: l, layoutRoot: u, layoutCrossfade: d } = t;
  e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : wr(e.parent)), e.projection.setOptions({
    layoutId: s,
    layout: a,
    alwaysMeasureLayout: !!r || o && Fe(o),
    visualElement: e,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof a == "string" ? a : "both",
    initialPromotionConfig: i,
    crossfade: d,
    layoutScroll: l,
    layoutRoot: u
  });
}
function wr(e) {
  if (e)
    return e.options.allowProjection !== !1 ? e.projection : wr(e.parent);
}
function Yt(e, { forwardMotionProps: t = !1 } = {}, n, i) {
  n && Qu(n);
  const s = fi(e) ? wd : xd;
  function a(o, l) {
    let u;
    const d = {
      ...P(ci),
      ...o,
      layoutId: Pd(o)
    }, { isStatic: h } = d, m = sd(o), p = s(o, h);
    if (!h && On) {
      Sd();
      const g = Ed(d);
      u = g.MeasureLayout, m.visualElement = Rd(e, p, d, i, g.ProjectionNode);
    }
    return f(Lt.Provider, { value: m, children: [u && m.visualElement ? c(u, { visualElement: m.visualElement, ...d }) : null, yd(e, o, kd(p, m.visualElement, l), p, h, t)] });
  }
  a.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const r = je(a);
  return r[Ad] = e, r;
}
function Pd({ layoutId: e }) {
  const t = P(jn).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function Sd(e, t) {
  P(cr).strict;
}
function Ed(e) {
  const { drag: t, layout: n } = ze;
  if (!t && !n)
    return {};
  const i = { ...t, ...n };
  return {
    MeasureLayout: t?.isEnabled(e) || n?.isEnabled(e) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function Md(e, t) {
  if (typeof Proxy > "u")
    return Yt;
  const n = /* @__PURE__ */ new Map(), i = (a, r) => Yt(a, r, e, t), s = (a, r) => i(a, r);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (a, r) => r === "create" ? i : (n.has(r) || n.set(r, Yt(r, void 0, e, t)), n.get(r))
  });
}
function Ar({ top: e, left: t, right: n, bottom: i }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: i }
  };
}
function Cd({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Fd(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), i = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function Xt(e) {
  return e === void 0 || e === 1;
}
function wn({ scale: e, scaleX: t, scaleY: n }) {
  return !Xt(e) || !Xt(t) || !Xt(n);
}
function ke(e) {
  return wn(e) || kr(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function kr(e) {
  return ns(e.x) || ns(e.y);
}
function ns(e) {
  return e && e !== "0%";
}
function Ft(e, t, n) {
  const i = e - n, s = t * i;
  return n + s;
}
function is(e, t, n, i, s) {
  return s !== void 0 && (e = Ft(e, s, i)), Ft(e, n, i) + t;
}
function An(e, t = 0, n = 1, i, s) {
  e.min = is(e.min, t, n, i, s), e.max = is(e.max, t, n, i, s);
}
function Tr(e, { x: t, y: n }) {
  An(e.x, t.translate, t.scale, t.originPoint), An(e.y, n.translate, n.scale, n.originPoint);
}
const ss = 0.999999999999, as = 1.0000000000001;
function Dd(e, t, n, i = !1) {
  const s = n.length;
  if (!s)
    return;
  t.x = t.y = 1;
  let a, r;
  for (let o = 0; o < s; o++) {
    a = n[o], r = a.projectionDelta;
    const { visualElement: l } = a.options;
    l && l.props.style && l.props.style.display === "contents" || (i && a.options.layoutScroll && a.scroll && a !== a.root && Ve(e, {
      x: -a.scroll.offset.x,
      y: -a.scroll.offset.y
    }), r && (t.x *= r.x.scale, t.y *= r.y.scale, Tr(e, r)), i && ke(a.latestValues) && Ve(e, a.latestValues));
  }
  t.x < as && t.x > ss && (t.x = 1), t.y < as && t.y > ss && (t.y = 1);
}
function De(e, t) {
  e.min = e.min + t, e.max = e.max + t;
}
function rs(e, t, n, i, s = 0.5) {
  const a = D(e.min, e.max, s);
  An(e, t, n, a, i);
}
function Ve(e, t) {
  rs(e.x, t.x, t.scaleX, t.scale, t.originX), rs(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function Rr(e, t) {
  return Ar(Fd(e.getBoundingClientRect(), t));
}
function Vd(e, t, n) {
  const i = Rr(e, n), { scroll: s } = t;
  return s && (De(i.x, s.offset.x), De(i.y, s.offset.y)), i;
}
const os = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Be = () => ({
  x: os(),
  y: os()
}), ls = () => ({ min: 0, max: 0 }), L = () => ({
  x: ls(),
  y: ls()
}), kn = { current: null }, Nr = { current: !1 };
function Bd() {
  if (Nr.current = !0, !!On)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => kn.current = e.matches;
      e.addEventListener("change", t), t();
    } else
      kn.current = !1;
}
const Id = /* @__PURE__ */ new WeakMap();
function Ld(e, t, n) {
  for (const i in t) {
    const s = t[i], a = n[i];
    if ($(s))
      e.addValue(i, s);
    else if ($(a))
      e.addValue(i, Le(s, { owner: e }));
    else if (a !== s)
      if (e.hasValue(i)) {
        const r = e.getValue(i);
        r.liveStyle === !0 ? r.jump(s) : r.hasAnimated || r.set(s);
      } else {
        const r = e.getStaticValue(i);
        e.addValue(i, Le(r !== void 0 ? r : s, { owner: e }));
      }
  }
  for (const i in n)
    t[i] === void 0 && e.removeValue(i);
  return t;
}
const cs = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class zd {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, i) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: i, reducedMotionConfig: s, blockInitialAnimation: a, visualState: r }, o = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = si, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const m = K.now();
      this.renderScheduledAt < m && (this.renderScheduledAt = m, F.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = r;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = t, this.props = n, this.presenceContext = i, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = s, this.options = o, this.blockInitialAnimation = !!a, this.isControllingVariants = jt(n), this.isVariantNode = dr(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: d, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const m in h) {
      const p = h[m];
      l[m] !== void 0 && $(p) && p.set(l[m]);
    }
  }
  mount(t) {
    this.current = t, Id.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), Nr.current || Bd(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : kn.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), ge(this.notifyUpdate), ge(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features) {
      const n = this.features[t];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const i = He.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (r) => {
      this.latestValues[t] = r, this.props.onUpdate && F.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let a;
    window.MotionCheckAppearSync && (a = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      s(), a && a(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in ze) {
      const n = ze[t];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[t] && s && i(this.props) && (this.features[t] = new s(this)), this.features[t]) {
        const a = this.features[t];
        a.isMounted ? a.update() : (a.mount(), a.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : L();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let i = 0; i < cs.length; i++) {
      const s = cs[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const a = "on" + s, r = t[a];
      r && (this.propEventSubscriptions[s] = this.on(s, r));
    }
    this.prevMotionValues = Ld(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const i = this.values.get(t);
    n !== i && (i && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let i = this.values.get(t);
    return i === void 0 && n !== void 0 && (i = Le(n === null ? void 0 : n, { owner: this }), this.addValue(t, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    let i = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return i != null && (typeof i == "string" && (ba(i) || xa(i)) ? i = parseFloat(i) : !Ku(i) && ye.test(n) && (i = tr(t, n)), this.setBaseTarget(t, $(i) ? i.get() : i)), $(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const a = pi(this.props, n, this.presenceContext?.custom);
      a && (i = a[t]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, t);
    return s !== void 0 && !$(s) ? s : this.initialValues[t] !== void 0 && i === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Kn()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    oi.render(this.render);
  }
}
class Pr extends zd {
  constructor() {
    super(...arguments), this.KeyframeResolver = Vu;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: i }) {
    delete n[t], delete i[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    $(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function Sr(e, { style: t, vars: n }, i, s) {
  const a = e.style;
  let r;
  for (r in t)
    a[r] = t[r];
  s?.applyProjectionStyles(a, i);
  for (r in n)
    a.setProperty(r, n[r]);
}
function jd(e) {
  return window.getComputedStyle(e);
}
class Od extends Pr {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Sr;
  }
  readValueFromInstance(t, n) {
    if (He.has(n))
      return this.projection?.isProjecting ? fn(n) : Qc(t, n);
    {
      const i = jd(t), s = (Yn(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Rr(t, n);
  }
  build(t, n, i) {
    hi(t, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return gi(t, n, i);
  }
}
const Er = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function Ud(e, t, n, i) {
  Sr(e, t, void 0, i);
  for (const s in t.attrs)
    e.setAttribute(Er.has(s) ? s : yi(s), t.attrs[s]);
}
class $d extends Pr {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = L;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (He.has(n)) {
      const i = er(n);
      return i && i.default || 0;
    }
    return n = Er.has(n) ? n : yi(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return br(t, n, i);
  }
  build(t, n, i) {
    fr(t, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, n, i, s) {
    Ud(t, n, i, s);
  }
  mount(t) {
    this.isSVGTag = gr(t.tagName), super.mount(t);
  }
}
const Wd = (e, t) => fi(e) ? new $d(t) : new Od(t, {
  allowProjection: e !== Se
});
function Ie(e, t, n) {
  const i = e.getProps();
  return pi(i, t, n !== void 0 ? n : i.custom, e);
}
const Tn = (e) => Array.isArray(e);
function _d(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Le(n));
}
function Hd(e) {
  return Tn(e) ? e[e.length - 1] || 0 : e;
}
function bi(e, t) {
  const n = Ie(e, t);
  let { transitionEnd: i = {}, transition: s = {}, ...a } = n || {};
  a = { ...a, ...i };
  for (const r in a) {
    const o = Hd(a[r]);
    _d(e, r, o);
  }
}
function Kd(e) {
  return !!($(e) && e.add);
}
function Rn(e, t) {
  const n = e.getValue("willChange");
  if (Kd(n))
    return n.add(t);
  if (!n && de.WillChange) {
    const i = new de.WillChange("auto");
    e.addValue("willChange", i), i.add(t);
  }
}
function Mr(e) {
  return e.props[vr];
}
const Gd = (e) => e !== null;
function qd(e, { repeat: t, repeatType: n = "loop" }, i) {
  const s = e.filter(Gd), a = t && n !== "loop" && t % 2 === 1 ? 0 : s.length - 1;
  return s[a];
}
const Yd = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Xd = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Zd = {
  type: "keyframes",
  duration: 0.8
}, Jd = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Qd = (e, { keyframes: t }) => t.length > 2 ? Zd : He.has(e) ? e.startsWith("scale") ? Xd(t[1]) : Yd : Jd;
function eh({ when: e, delay: t, delayChildren: n, staggerChildren: i, staggerDirection: s, repeat: a, repeatType: r, repeatDelay: o, from: l, elapsed: u, ...d }) {
  return !!Object.keys(d).length;
}
const vi = (e, t, n, i = {}, s, a) => (r) => {
  const o = ai(i, e) || {}, l = o.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ se(l);
  const d = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...o,
    delay: -u,
    onUpdate: (m) => {
      t.set(m), o.onUpdate && o.onUpdate(m);
    },
    onComplete: () => {
      r(), o.onComplete && o.onComplete();
    },
    name: e,
    motionValue: t,
    element: a ? void 0 : s
  };
  eh(o) || Object.assign(d, Qd(e, d)), d.duration && (d.duration = /* @__PURE__ */ se(d.duration)), d.repeatDelay && (d.repeatDelay = /* @__PURE__ */ se(d.repeatDelay)), d.from !== void 0 && (d.keyframes[0] = d.from);
  let h = !1;
  if ((d.type === !1 || d.duration === 0 && !d.repeatDelay) && (vn(d), d.delay === 0 && (h = !0)), (de.instantAnimations || de.skipAnimations) && (h = !0, vn(d), d.delay = 0), d.allowFlatten = !o.type && !o.ease, h && !a && t.get() !== void 0) {
    const m = qd(d.keyframes, o);
    if (m !== void 0) {
      F.update(() => {
        d.onUpdate(m), d.onComplete();
      });
      return;
    }
  }
  return o.isSync ? new ii(d) : new Au(d);
};
function th({ protectedKeys: e, needsAnimating: t }, n) {
  const i = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, i;
}
function Cr(e, t, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: a = e.getDefaultTransition(), transitionEnd: r, ...o } = t;
  i && (a = i);
  const l = [], u = s && e.animationState && e.animationState.getState()[s];
  for (const d in o) {
    const h = e.getValue(d, e.latestValues[d] ?? null), m = o[d];
    if (m === void 0 || u && th(u, d))
      continue;
    const p = {
      delay: n,
      ...ai(a || {}, d)
    }, g = h.get();
    if (g !== void 0 && !h.isAnimating && !Array.isArray(m) && m === g && !p.velocity)
      continue;
    let v = !1;
    if (window.MotionHandoffAnimation) {
      const x = Mr(e);
      if (x) {
        const y = window.MotionHandoffAnimation(x, d, F);
        y !== null && (p.startTime = y, v = !0);
      }
    }
    Rn(e, d), h.start(vi(d, h, m, e.shouldReduceMotion && Za.has(d) ? { type: !1 } : p, e, v));
    const b = h.animation;
    b && l.push(b);
  }
  return r && Promise.all(l).then(() => {
    F.update(() => {
      r && bi(e, r);
    });
  }), l;
}
function Fr(e, t, n, i = 0, s = 1) {
  const a = Array.from(e).sort((u, d) => u.sortNodePosition(d)).indexOf(t), r = e.size, o = (r - 1) * i;
  return typeof n == "function" ? n(a, r) : s === 1 ? a * i : o - a * i;
}
function Nn(e, t, n = {}) {
  const i = Ie(e, t, n.type === "exit" ? e.presenceContext?.custom : void 0);
  let { transition: s = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const a = i ? () => Promise.all(Cr(e, i, n)) : () => Promise.resolve(), r = e.variantChildren && e.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: d, staggerDirection: h } = s;
    return nh(e, t, l, u, d, h, n);
  } : () => Promise.resolve(), { when: o } = s;
  if (o) {
    const [l, u] = o === "beforeChildren" ? [a, r] : [r, a];
    return l().then(() => u());
  } else
    return Promise.all([a(), r(n.delay)]);
}
function nh(e, t, n = 0, i = 0, s = 0, a = 1, r) {
  const o = [];
  for (const l of e.variantChildren)
    l.notify("AnimationStart", t), o.push(Nn(l, t, {
      ...r,
      delay: n + (typeof i == "function" ? 0 : i) + Fr(e.variantChildren, l, i, s, a)
    }).then(() => l.notify("AnimationComplete", t)));
  return Promise.all(o);
}
function Dr(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let i;
  if (Array.isArray(t)) {
    const s = t.map((a) => Nn(e, a, n));
    i = Promise.all(s);
  } else if (typeof t == "string")
    i = Nn(e, t, n);
  else {
    const s = typeof t == "function" ? Ie(e, t, n.custom) : t;
    i = Promise.all(Cr(e, s, n));
  }
  return i.then(() => {
    e.notify("AnimationComplete", t);
  });
}
function Vr(e, t) {
  if (!Array.isArray(t))
    return !1;
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (t[i] !== e[i])
      return !1;
  return !0;
}
const ih = di.length;
function Br(e) {
  if (!e)
    return;
  if (!e.isControllingVariants) {
    const n = e.parent ? Br(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < ih; n++) {
    const i = di[n], s = e.props[i];
    (st(s) || s === !1) && (t[i] = s);
  }
  return t;
}
const sh = [...ui].reverse(), ah = ui.length;
function rh(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: i }) => Dr(e, n, i)));
}
function oh(e) {
  let t = rh(e), n = us(), i = !0;
  const s = (l) => (u, d) => {
    const h = Ie(e, d, l === "exit" ? e.presenceContext?.custom : void 0);
    if (h) {
      const { transition: m, transitionEnd: p, ...g } = h;
      u = { ...u, ...g, ...p };
    }
    return u;
  };
  function a(l) {
    t = l(e);
  }
  function r(l) {
    const { props: u } = e, d = Br(e.parent) || {}, h = [], m = /* @__PURE__ */ new Set();
    let p = {}, g = 1 / 0;
    for (let b = 0; b < ah; b++) {
      const x = sh[b], y = n[x], w = u[x] !== void 0 ? u[x] : d[x], R = st(w), k = x === l ? y.isActive : null;
      k === !1 && (g = b);
      let S = w === d[x] && w !== u[x] && R;
      if (S && i && e.manuallyAnimateOnMount && (S = !1), y.protectedKeys = { ...p }, // If it isn't active and hasn't *just* been set as inactive
      !y.isActive && k === null || // If we didn't and don't have any defined prop for this animation type
      !w && !y.prevProp || // Or if the prop doesn't define an animation
      zt(w) || typeof w == "boolean")
        continue;
      const E = lh(y.prevProp, w);
      let T = E || // If we're making this variant active, we want to always make it active
      x === l && y.isActive && !S && R || // If we removed a higher-priority variant (i is in reverse order)
      b > g && R, C = !1;
      const I = Array.isArray(w) ? w : [w];
      let fe = I.reduce(s(x), {});
      k === !1 && (fe = {});
      const { prevResolvedValues: xi = {} } = y, Jr = {
        ...xi,
        ...fe
      }, wi = (O) => {
        T = !0, m.has(O) && (C = !0, m.delete(O)), y.needsAnimating[O] = !0;
        const q = e.getValue(O);
        q && (q.liveStyle = !1);
      };
      for (const O in Jr) {
        const q = fe[O], we = xi[O];
        if (p.hasOwnProperty(O))
          continue;
        let Ee = !1;
        Tn(q) && Tn(we) ? Ee = !Vr(q, we) : Ee = q !== we, Ee ? q != null ? wi(O) : m.add(O) : q !== void 0 && m.has(O) ? wi(O) : y.protectedKeys[O] = !0;
      }
      y.prevProp = w, y.prevResolvedValues = fe, y.isActive && (p = { ...p, ...fe }), i && e.blockInitialAnimation && (T = !1);
      const Ai = S && E;
      T && (!Ai || C) && h.push(...I.map((O) => {
        const q = { type: x };
        if (typeof O == "string" && i && !Ai && e.manuallyAnimateOnMount && e.parent) {
          const { parent: we } = e, Ee = Ie(we, O);
          if (we.enteringChildren && Ee) {
            const { delayChildren: Qr } = Ee.transition || {};
            q.delay = Fr(we.enteringChildren, e, Qr);
          }
        }
        return {
          animation: O,
          options: q
        };
      }));
    }
    if (m.size) {
      const b = {};
      if (typeof u.initial != "boolean") {
        const x = Ie(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        x && x.transition && (b.transition = x.transition);
      }
      m.forEach((x) => {
        const y = e.getBaseTarget(x), w = e.getValue(x);
        w && (w.liveStyle = !0), b[x] = y ?? null;
      }), h.push({ animation: b });
    }
    let v = !!h.length;
    return i && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (v = !1), i = !1, v ? t(h) : Promise.resolve();
  }
  function o(l, u) {
    if (n[l].isActive === u)
      return Promise.resolve();
    e.variantChildren?.forEach((h) => h.animationState?.setActive(l, u)), n[l].isActive = u;
    const d = r(l);
    for (const h in n)
      n[h].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: r,
    setActive: o,
    setAnimateFunction: a,
    getState: () => n,
    reset: () => {
      n = us();
    }
  };
}
function lh(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !Vr(t, e) : !1;
}
function Ae(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function us() {
  return {
    animate: Ae(!0),
    whileInView: Ae(),
    whileHover: Ae(),
    whileTap: Ae(),
    whileDrag: Ae(),
    whileFocus: Ae(),
    exit: Ae()
  };
}
class xe {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
class ch extends xe {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = oh(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    zt(t) && (this.unmountControls = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let uh = 0;
class dh extends xe {
  constructor() {
    super(...arguments), this.id = uh++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === i)
      return;
    const s = this.node.animationState.setActive("exit", !t);
    n && !t && s.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const hh = {
  animation: {
    Feature: ch
  },
  exit: {
    Feature: dh
  }
};
function rt(e, t, n, i = { passive: !0 }) {
  return e.addEventListener(t, n, i), () => e.removeEventListener(t, n);
}
function mt(e) {
  return {
    point: {
      x: e.pageX,
      y: e.pageY
    }
  };
}
const mh = (e) => (t) => li(t) && e(t, mt(t));
function Ze(e, t, n, i) {
  return rt(e, t, mh(n), i);
}
const Ir = 1e-4, fh = 1 - Ir, ph = 1 + Ir, Lr = 0.01, gh = 0 - Lr, yh = 0 + Lr;
function _(e) {
  return e.max - e.min;
}
function bh(e, t, n) {
  return Math.abs(e - t) <= n;
}
function ds(e, t, n, i = 0.5) {
  e.origin = i, e.originPoint = D(t.min, t.max, e.origin), e.scale = _(n) / _(t), e.translate = D(n.min, n.max, e.origin) - e.originPoint, (e.scale >= fh && e.scale <= ph || isNaN(e.scale)) && (e.scale = 1), (e.translate >= gh && e.translate <= yh || isNaN(e.translate)) && (e.translate = 0);
}
function Je(e, t, n, i) {
  ds(e.x, t.x, n.x, i ? i.originX : void 0), ds(e.y, t.y, n.y, i ? i.originY : void 0);
}
function hs(e, t, n) {
  e.min = n.min + t.min, e.max = e.min + _(t);
}
function vh(e, t, n) {
  hs(e.x, t.x, n.x), hs(e.y, t.y, n.y);
}
function ms(e, t, n) {
  e.min = t.min - n.min, e.max = e.min + _(t);
}
function Qe(e, t, n) {
  ms(e.x, t.x, n.x), ms(e.y, t.y, n.y);
}
function X(e) {
  return [e("x"), e("y")];
}
const zr = ({ current: e }) => e ? e.ownerDocument.defaultView : null, fs = (e, t) => Math.abs(e - t);
function xh(e, t) {
  const n = fs(e.x, t.x), i = fs(e.y, t.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class jr {
  constructor(t, n, { transformPagePoint: i, contextWindow: s = window, dragSnapToOrigin: a = !1, distanceThreshold: r = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const m = Jt(this.lastMoveEventInfo, this.history), p = this.startEvent !== null, g = xh(m.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!p && !g)
        return;
      const { point: v } = m, { timestamp: b } = U;
      this.history.push({ ...v, timestamp: b });
      const { onStart: x, onMove: y } = this.handlers;
      p || (x && x(this.lastMoveEvent, m), this.startEvent = this.lastMoveEvent), y && y(this.lastMoveEvent, m);
    }, this.handlePointerMove = (m, p) => {
      this.lastMoveEvent = m, this.lastMoveEventInfo = Zt(p, this.transformPagePoint), F.update(this.updatePoint, !0);
    }, this.handlePointerUp = (m, p) => {
      this.end();
      const { onEnd: g, onSessionEnd: v, resumeAnimation: b } = this.handlers;
      if (this.dragSnapToOrigin && b && b(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const x = Jt(m.type === "pointercancel" ? this.lastMoveEventInfo : Zt(p, this.transformPagePoint), this.history);
      this.startEvent && g && g(m, x), v && v(m, x);
    }, !li(t))
      return;
    this.dragSnapToOrigin = a, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = r, this.contextWindow = s || window;
    const o = mt(t), l = Zt(o, this.transformPagePoint), { point: u } = l, { timestamp: d } = U;
    this.history = [{ ...u, timestamp: d }];
    const { onSessionStart: h } = n;
    h && h(t, Jt(l, this.history)), this.removeListeners = ut(Ze(this.contextWindow, "pointermove", this.handlePointerMove), Ze(this.contextWindow, "pointerup", this.handlePointerUp), Ze(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), ge(this.updatePoint);
  }
}
function Zt(e, t) {
  return t ? { point: t(e.point) } : e;
}
function ps(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Jt({ point: e }, t) {
  return {
    point: e,
    delta: ps(e, Or(t)),
    offset: ps(e, wh(t)),
    velocity: Ah(t, 0.1)
  };
}
function wh(e) {
  return e[0];
}
function Or(e) {
  return e[e.length - 1];
}
function Ah(e, t) {
  if (e.length < 2)
    return { x: 0, y: 0 };
  let n = e.length - 1, i = null;
  const s = Or(e);
  for (; n >= 0 && (i = e[n], !(s.timestamp - i.timestamp > /* @__PURE__ */ se(t))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  const a = /* @__PURE__ */ Z(s.timestamp - i.timestamp);
  if (a === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (s.x - i.x) / a,
    y: (s.y - i.y) / a
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function kh(e, { min: t, max: n }, i) {
  return t !== void 0 && e < t ? e = i ? D(t, e, i.min) : Math.max(e, t) : n !== void 0 && e > n && (e = i ? D(n, e, i.max) : Math.min(e, n)), e;
}
function gs(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
  };
}
function Th(e, { top: t, left: n, bottom: i, right: s }) {
  return {
    x: gs(e.x, n, s),
    y: gs(e.y, t, i)
  };
}
function ys(e, t) {
  let n = t.min - e.min, i = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, i] = [i, n]), { min: n, max: i };
}
function Rh(e, t) {
  return {
    x: ys(e.x, t.x),
    y: ys(e.y, t.y)
  };
}
function Nh(e, t) {
  let n = 0.5;
  const i = _(e), s = _(t);
  return s > i ? n = /* @__PURE__ */ tt(t.min, t.max - i, e.min) : i > s && (n = /* @__PURE__ */ tt(e.min, e.max - s, t.min)), ue(0, 1, n);
}
function Ph(e, t) {
  const n = {};
  return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n;
}
const Pn = 0.35;
function Sh(e = Pn) {
  return e === !1 ? e = 0 : e === !0 && (e = Pn), {
    x: bs(e, "left", "right"),
    y: bs(e, "top", "bottom")
  };
}
function bs(e, t, n) {
  return {
    min: vs(e, t),
    max: vs(e, n)
  };
}
function vs(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const Eh = /* @__PURE__ */ new WeakMap();
class Mh {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = L(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const a = (h) => {
      const { dragSnapToOrigin: m } = this.getProps();
      m ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(mt(h).point);
    }, r = (h, m) => {
      const { drag: p, dragPropagation: g, onDragStart: v } = this.getProps();
      if (p && !g && (this.openDragLock && this.openDragLock(), this.openDragLock = zu(p), !this.openDragLock))
        return;
      this.latestPointerEvent = h, this.latestPanInfo = m, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), X((x) => {
        let y = this.getAxisMotionValue(x).get() || 0;
        if (ae.test(y)) {
          const { projection: w } = this.visualElement;
          if (w && w.layout) {
            const R = w.layout.layoutBox[x];
            R && (y = _(R) * (parseFloat(y) / 100));
          }
        }
        this.originPoint[x] = y;
      }), v && F.postRender(() => v(h, m)), Rn(this.visualElement, "transform");
      const { animationState: b } = this.visualElement;
      b && b.setActive("whileDrag", !0);
    }, o = (h, m) => {
      this.latestPointerEvent = h, this.latestPanInfo = m;
      const { dragPropagation: p, dragDirectionLock: g, onDirectionLock: v, onDrag: b } = this.getProps();
      if (!p && !this.openDragLock)
        return;
      const { offset: x } = m;
      if (g && this.currentDirection === null) {
        this.currentDirection = Ch(x), this.currentDirection !== null && v && v(this.currentDirection);
        return;
      }
      this.updateAxis("x", m.point, x), this.updateAxis("y", m.point, x), this.visualElement.render(), b && b(h, m);
    }, l = (h, m) => {
      this.latestPointerEvent = h, this.latestPanInfo = m, this.stop(h, m), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => X((h) => this.getAnimationState(h) === "paused" && this.getAxisMotionValue(h).animation?.play()), { dragSnapToOrigin: d } = this.getProps();
    this.panSession = new jr(t, {
      onSessionStart: a,
      onStart: r,
      onMove: o,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: d,
      distanceThreshold: i,
      contextWindow: zr(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(t, n) {
    const i = t || this.latestPointerEvent, s = n || this.latestPanInfo, a = this.isDragging;
    if (this.cancel(), !a || !s || !i)
      return;
    const { velocity: r } = s;
    this.startAnimation(r);
    const { onDragEnd: o } = this.getProps();
    o && F.postRender(() => o(i, s));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, i) {
    const { drag: s } = this.getProps();
    if (!i || !bt(t, s, this.currentDirection))
      return;
    const a = this.getAxisMotionValue(t);
    let r = this.originPoint[t] + i[t];
    this.constraints && this.constraints[t] && (r = kh(r, this.constraints[t], this.elastic[t])), a.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, s = this.constraints;
    t && Fe(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && i ? this.constraints = Th(i.layoutBox, t) : this.constraints = !1, this.elastic = Sh(n), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && X((a) => {
      this.constraints !== !1 && this.getAxisMotionValue(a) && (this.constraints[a] = Ph(i.layoutBox[a], this.constraints[a]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !Fe(t))
      return !1;
    const i = t.current, { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const a = Vd(i, s.root, this.visualElement.getTransformPagePoint());
    let r = Rh(s.layout.layoutBox, a);
    if (n) {
      const o = n(Cd(r));
      this.hasMutatedConstraints = !!o, o && (r = Ar(o));
    }
    return r;
  }
  startAnimation(t) {
    const { drag: n, dragMomentum: i, dragElastic: s, dragTransition: a, dragSnapToOrigin: r, onDragTransitionEnd: o } = this.getProps(), l = this.constraints || {}, u = X((d) => {
      if (!bt(d, n, this.currentDirection))
        return;
      let h = l && l[d] || {};
      r && (h = { min: 0, max: 0 });
      const m = s ? 200 : 1e6, p = s ? 40 : 1e7, g = {
        type: "inertia",
        velocity: i ? t[d] : 0,
        bounceStiffness: m,
        bounceDamping: p,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...a,
        ...h
      };
      return this.startAxisValueAnimation(d, g);
    });
    return Promise.all(u).then(o);
  }
  startAxisValueAnimation(t, n) {
    const i = this.getAxisMotionValue(t);
    return Rn(this.visualElement, t), i.start(vi(t, i, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    X((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    X((t) => this.getAxisMotionValue(t).animation?.pause());
  }
  getAnimationState(t) {
    return this.getAxisMotionValue(t).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`, i = this.visualElement.getProps(), s = i[n];
    return s || this.visualElement.getValue(t, (i.initial ? i.initial[t] : void 0) || 0);
  }
  snapToCursor(t) {
    X((n) => {
      const { drag: i } = this.getProps();
      if (!bt(n, i, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, a = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: r, max: o } = s.layout.layoutBox[n];
        a.set(t[n] - D(r, o, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: t, dragConstraints: n } = this.getProps(), { projection: i } = this.visualElement;
    if (!Fe(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    X((r) => {
      const o = this.getAxisMotionValue(r);
      if (o && this.constraints !== !1) {
        const l = o.get();
        s[r] = Nh({ min: l, max: l }, this.constraints[r]);
      }
    });
    const { transformTemplate: a } = this.visualElement.getProps();
    this.visualElement.current.style.transform = a ? a({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), X((r) => {
      if (!bt(r, t, null))
        return;
      const o = this.getAxisMotionValue(r), { min: l, max: u } = this.constraints[r];
      o.set(D(l, u, s[r]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Eh.set(this.visualElement, this);
    const t = this.visualElement.current, n = Ze(t, "pointerdown", (l) => {
      const { drag: u, dragListener: d = !0 } = this.getProps();
      u && d && this.start(l);
    }), i = () => {
      const { dragConstraints: l } = this.getProps();
      Fe(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, a = s.addEventListener("measure", i);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), F.read(i);
    const r = rt(window, "resize", () => this.scalePositionWithinConstraints()), o = s.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (X((d) => {
        const h = this.getAxisMotionValue(d);
        h && (this.originPoint[d] += l[d].translate, h.set(h.get() + l[d].translate));
      }), this.visualElement.render());
    }));
    return () => {
      r(), n(), a(), o && o();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: s = !1, dragConstraints: a = !1, dragElastic: r = Pn, dragMomentum: o = !0 } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: s,
      dragConstraints: a,
      dragElastic: r,
      dragMomentum: o
    };
  }
}
function bt(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function Ch(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n;
}
class Fh extends xe {
  constructor(t) {
    super(t), this.removeGroupControls = Q, this.removeListeners = Q, this.controls = new Mh(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Q;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const xs = (e) => (t, n) => {
  e && F.postRender(() => e(t, n));
};
class Dh extends xe {
  constructor() {
    super(...arguments), this.removePointerDownListener = Q;
  }
  onPointerDown(t) {
    this.session = new jr(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: zr(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: i, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: xs(t),
      onStart: xs(n),
      onMove: i,
      onEnd: (a, r) => {
        delete this.session, s && F.postRender(() => s(a, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Ze(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const Nt = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function ws(e, t) {
  return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
const Ge = {
  correct: (e, t) => {
    if (!t.target)
      return e;
    if (typeof e == "string")
      if (N.test(e))
        e = parseFloat(e);
      else
        return e;
    const n = ws(e, t.target.x), i = ws(e, t.target.y);
    return `${n}% ${i}%`;
  }
}, Vh = {
  correct: (e, { treeScale: t, projectionDelta: n }) => {
    const i = e, s = ye.parse(e);
    if (s.length > 5)
      return i;
    const a = ye.createTransformer(e), r = typeof s[0] != "number" ? 1 : 0, o = n.x.scale * t.x, l = n.y.scale * t.y;
    s[0 + r] /= o, s[1 + r] /= l;
    const u = D(o, l, 0.5);
    return typeof s[2 + r] == "number" && (s[2 + r] /= u), typeof s[3 + r] == "number" && (s[3 + r] /= u), a(s);
  }
};
let Qt = !1;
class Bh extends Mn {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: i, layoutId: s } = this.props, { projection: a } = t;
    ad(Ih), a && (n.group && n.group.add(a), i && i.register && s && i.register(a), Qt && a.root.didUpdate(), a.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), a.setOptions({
      ...a.options,
      onExitComplete: () => this.safeToRemove()
    })), Nt.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: i, drag: s, isPresent: a } = this.props, { projection: r } = i;
    return r && (r.isPresent = a, Qt = !0, s || t.layoutDependency !== n || n === void 0 || t.isPresent !== a ? r.willUpdate() : this.safeToRemove(), t.isPresent !== a && (a ? r.promote() : r.relegate() || F.postRender(() => {
      const o = r.getStack();
      (!o || !o.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t && (t.root.didUpdate(), oi.postRender(() => {
      !t.currentAnimation && t.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: s } = t;
    Qt = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), i && i.deregister && i.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Ur(e) {
  const [t, n] = lr(), i = P(jn);
  return c(Bh, { ...e, layoutGroup: i, switchLayoutGroup: P(xr), isPresent: t, safeToRemove: n });
}
const Ih = {
  borderRadius: {
    ...Ge,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Ge,
  borderTopRightRadius: Ge,
  borderBottomLeftRadius: Ge,
  borderBottomRightRadius: Ge,
  boxShadow: Vh
};
function Lh(e, t, n) {
  const i = $(e) ? e : Le(e);
  return i.start(vi("", i, t, n)), i.animation;
}
const zh = (e, t) => e.depth - t.depth;
class jh {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    $n(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    Wn(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(zh), this.isDirty = !1, this.children.forEach(t);
  }
}
function Oh(e, t) {
  const n = K.now(), i = ({ timestamp: s }) => {
    const a = s - n;
    a >= t && (ge(i), e(a - t));
  };
  return F.setup(i, !0), () => ge(i);
}
const $r = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Uh = $r.length, As = (e) => typeof e == "string" ? parseFloat(e) : e, ks = (e) => typeof e == "number" || N.test(e);
function $h(e, t, n, i, s, a) {
  s ? (e.opacity = D(0, n.opacity ?? 1, Wh(i)), e.opacityExit = D(t.opacity ?? 1, 0, _h(i))) : a && (e.opacity = D(t.opacity ?? 1, n.opacity ?? 1, i));
  for (let r = 0; r < Uh; r++) {
    const o = `border${$r[r]}Radius`;
    let l = Ts(t, o), u = Ts(n, o);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || ks(l) === ks(u) ? (e[o] = Math.max(D(As(l), As(u), i), 0), (ae.test(u) || ae.test(l)) && (e[o] += "%")) : e[o] = u;
  }
  (t.rotate || n.rotate) && (e.rotate = D(t.rotate || 0, n.rotate || 0, i));
}
function Ts(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const Wh = /* @__PURE__ */ Wr(0, 0.5, Sa), _h = /* @__PURE__ */ Wr(0.5, 0.95, Q);
function Wr(e, t, n) {
  return (i) => i < e ? 0 : i > t ? 1 : n(/* @__PURE__ */ tt(e, t, i));
}
function Rs(e, t) {
  e.min = t.min, e.max = t.max;
}
function Y(e, t) {
  Rs(e.x, t.x), Rs(e.y, t.y);
}
function Ns(e, t) {
  e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin;
}
function Ps(e, t, n, i, s) {
  return e -= t, e = Ft(e, 1 / n, i), s !== void 0 && (e = Ft(e, 1 / s, i)), e;
}
function Hh(e, t = 0, n = 1, i = 0.5, s, a = e, r = e) {
  if (ae.test(t) && (t = parseFloat(t), t = D(r.min, r.max, t / 100) - r.min), typeof t != "number")
    return;
  let o = D(a.min, a.max, i);
  e === a && (o -= t), e.min = Ps(e.min, t, n, o, s), e.max = Ps(e.max, t, n, o, s);
}
function Ss(e, t, [n, i, s], a, r) {
  Hh(e, t[n], t[i], t[s], t.scale, a, r);
}
const Kh = ["x", "scaleX", "originX"], Gh = ["y", "scaleY", "originY"];
function Es(e, t, n, i) {
  Ss(e.x, t, Kh, n ? n.x : void 0, i ? i.x : void 0), Ss(e.y, t, Gh, n ? n.y : void 0, i ? i.y : void 0);
}
function Ms(e) {
  return e.translate === 0 && e.scale === 1;
}
function _r(e) {
  return Ms(e.x) && Ms(e.y);
}
function Cs(e, t) {
  return e.min === t.min && e.max === t.max;
}
function qh(e, t) {
  return Cs(e.x, t.x) && Cs(e.y, t.y);
}
function Fs(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function Hr(e, t) {
  return Fs(e.x, t.x) && Fs(e.y, t.y);
}
function Ds(e) {
  return _(e.x) / _(e.y);
}
function Vs(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
class Yh {
  constructor() {
    this.members = [];
  }
  add(t) {
    $n(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (Wn(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((s) => t === s);
    if (n === 0)
      return !1;
    let i;
    for (let s = n; s >= 0; s--) {
      const a = this.members[s];
      if (a.isPresent !== !1) {
        i = a;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(t, n) {
    const i = this.lead;
    if (t !== i && (this.prevLead = i, this.lead = t, t.show(), i)) {
      i.instance && i.scheduleRender(), t.scheduleRender(), t.resumeFrom = i, n && (t.resumeFrom.preserveOpacity = !0), i.snapshot && (t.snapshot = i.snapshot, t.snapshot.latestValues = i.animationValues || i.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: s } = t.options;
      s === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: i } = t;
      n.onExitComplete && n.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function Xh(e, t, n) {
  let i = "";
  const s = e.x.translate / t.x, a = e.y.translate / t.y, r = n?.z || 0;
  if ((s || a || r) && (i = `translate3d(${s}px, ${a}px, ${r}px) `), (t.x !== 1 || t.y !== 1) && (i += `scale(${1 / t.x}, ${1 / t.y}) `), n) {
    const { transformPerspective: u, rotate: d, rotateX: h, rotateY: m, skewX: p, skewY: g } = n;
    u && (i = `perspective(${u}px) ${i}`), d && (i += `rotate(${d}deg) `), h && (i += `rotateX(${h}deg) `), m && (i += `rotateY(${m}deg) `), p && (i += `skewX(${p}deg) `), g && (i += `skewY(${g}deg) `);
  }
  const o = e.x.scale * t.x, l = e.y.scale * t.y;
  return (o !== 1 || l !== 1) && (i += `scale(${o}, ${l})`), i || "none";
}
const en = ["", "X", "Y", "Z"], Zh = 1e3;
let Jh = 0;
function tn(e, t, n, i) {
  const { latestValues: s } = t;
  s[e] && (n[e] = s[e], t.setStaticValue(e, 0), i && (i[e] = 0));
}
function Kr(e) {
  if (e.hasCheckedOptimisedAppear = !0, e.root === e)
    return;
  const { visualElement: t } = e.options;
  if (!t)
    return;
  const n = Mr(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: a } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", F, !(s || a));
  }
  const { parent: i } = e;
  i && !i.hasCheckedOptimisedAppear && Kr(i);
}
function Gr({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: i, resetTransform: s }) {
  return class {
    constructor(r = {}, o = t?.()) {
      this.id = Jh++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(tm), this.nodes.forEach(am), this.nodes.forEach(rm), this.nodes.forEach(nm);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = o ? o.root || o : this, this.path = o ? [...o.path, o] : [], this.parent = o, this.depth = o ? o.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new jh());
    }
    addEventListener(r, o) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new Kn()), this.eventHandlers.get(r).add(o);
    }
    notifyListeners(r, ...o) {
      const l = this.eventHandlers.get(r);
      l && l.notify(...o);
    }
    hasListeners(r) {
      return this.eventHandlers.has(r);
    }
    /**
     * Lifecycles
     */
    mount(r) {
      if (this.instance)
        return;
      this.isSVG = or(r) && !_u(r), this.instance = r;
      const { layoutId: o, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || o) && (this.isLayoutDirty = !0), e) {
        let d, h = 0;
        const m = () => this.root.updateBlockedByResize = !1;
        F.read(() => {
          h = window.innerWidth;
        }), e(r, () => {
          const p = window.innerWidth;
          p !== h && (h = p, this.root.updateBlockedByResize = !0, d && d(), d = Oh(m, 250), Nt.hasAnimatedSinceResize && (Nt.hasAnimatedSinceResize = !1, this.nodes.forEach(Ls)));
        });
      }
      o && this.root.registerSharedNode(o, this), this.options.animate !== !1 && u && (o || l) && this.addEventListener("didUpdate", ({ delta: d, hasLayoutChanged: h, hasRelativeLayoutChanged: m, layout: p }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const g = this.options.transition || u.getDefaultTransition() || dm, { onLayoutAnimationStart: v, onLayoutAnimationComplete: b } = u.getProps(), x = !this.targetLayout || !Hr(this.targetLayout, p), y = !h && m;
        if (this.options.layoutRoot || this.resumeFrom || y || h && (x || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const w = {
            ...ai(g, "layout"),
            onPlay: v,
            onComplete: b
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (w.delay = 0, w.type = !1), this.startAnimation(w), this.setAnimationOrigin(d, y);
        } else
          h || Ls(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = p;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ge(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(om), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: r } = this.options;
      return r && r.getProps().transformTemplate;
    }
    willUpdate(r = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Kr(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let d = 0; d < this.path.length; d++) {
        const h = this.path[d];
        h.shouldResetTransform = !0, h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: o, layout: l } = this.options;
      if (o === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), r && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Bs);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Is);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(sm), this.nodes.forEach(Qh), this.nodes.forEach(em)) : this.nodes.forEach(Is), this.clearAllSnapshots();
      const o = K.now();
      U.delta = ue(0, 1e3 / 60, o - U.timestamp), U.timestamp = o, U.isProcessing = !0, Wt.update.process(U), Wt.preRender.process(U), Wt.render.process(U), U.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, oi.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(im), this.sharedNodes.forEach(lm);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, F.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      F.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !_(this.snapshot.measuredBox.x) && !_(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = L(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: o } = this.options;
      o && o.notify("LayoutMeasure", this.layout.layoutBox, r ? r.layoutBox : void 0);
    }
    updateScroll(r = "measure") {
      let o = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === r && (o = !1), o && this.instance) {
        const l = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: r,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!s)
        return;
      const r = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, o = this.projectionDelta && !_r(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, d = u !== this.prevTransformTemplateValue;
      r && this.instance && (o || ke(this.latestValues) || d) && (s(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const o = this.measurePageBox();
      let l = this.removeElementScroll(o);
      return r && (l = this.removeTransform(l)), hm(l), {
        animationId: this.root.animationId,
        measuredBox: o,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: r } = this.options;
      if (!r)
        return L();
      const o = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(mm))) {
        const { scroll: u } = this.root;
        u && (De(o.x, u.offset.x), De(o.y, u.offset.y));
      }
      return o;
    }
    removeElementScroll(r) {
      const o = L();
      if (Y(o, r), this.scroll?.wasRoot)
        return o;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: d, options: h } = u;
        u !== this.root && d && h.layoutScroll && (d.wasRoot && Y(o, r), De(o.x, d.offset.x), De(o.y, d.offset.y));
      }
      return o;
    }
    applyTransform(r, o = !1) {
      const l = L();
      Y(l, r);
      for (let u = 0; u < this.path.length; u++) {
        const d = this.path[u];
        !o && d.options.layoutScroll && d.scroll && d !== d.root && Ve(l, {
          x: -d.scroll.offset.x,
          y: -d.scroll.offset.y
        }), ke(d.latestValues) && Ve(l, d.latestValues);
      }
      return ke(this.latestValues) && Ve(l, this.latestValues), l;
    }
    removeTransform(r) {
      const o = L();
      Y(o, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !ke(u.latestValues))
          continue;
        wn(u.latestValues) && u.updateSnapshot();
        const d = L(), h = u.measurePageBox();
        Y(d, h), Es(o, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, d);
      }
      return ke(this.latestValues) && Es(o, this.latestValues), o;
    }
    setTargetDelta(r) {
      this.targetDelta = r, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(r) {
      this.options = {
        ...this.options,
        ...r,
        crossfade: r.crossfade !== void 0 ? r.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== U.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(r = !1) {
      const o = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = o.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = o.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = o.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== o;
      if (!(r || l && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: d, layoutId: h } = this.options;
      if (!(!this.layout || !(d || h))) {
        if (this.resolvedRelativeTargetAt = U.timestamp, !this.targetDelta && !this.relativeTarget) {
          const m = this.getClosestProjectingParent();
          m && m.layout && this.animationProgress !== 1 ? (this.relativeParent = m, this.forceRelativeParentToResolveTarget(), this.relativeTarget = L(), this.relativeTargetOrigin = L(), Qe(this.relativeTargetOrigin, this.layout.layoutBox, m.layout.layoutBox), Y(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = L(), this.targetWithTransforms = L()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), vh(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : Y(this.target, this.layout.layoutBox), Tr(this.target, this.targetDelta)) : Y(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const m = this.getClosestProjectingParent();
          m && !!m.resumingFrom == !!this.resumingFrom && !m.options.layoutScroll && m.target && this.animationProgress !== 1 ? (this.relativeParent = m, this.forceRelativeParentToResolveTarget(), this.relativeTarget = L(), this.relativeTargetOrigin = L(), Qe(this.relativeTargetOrigin, this.target, m.target), Y(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || wn(this.parent.latestValues) || kr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      const r = this.getLead(), o = !!this.resumingFrom || this !== r;
      let l = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1), o && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === U.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: d } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || d))
        return;
      Y(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, m = this.treeScale.y;
      Dd(this.layoutCorrected, this.treeScale, this.path, o), r.layout && !r.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (r.target = r.layout.layoutBox, r.targetWithTransforms = L());
      const { target: p } = r;
      if (!p) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Ns(this.prevProjectionDelta.x, this.projectionDelta.x), Ns(this.prevProjectionDelta.y, this.projectionDelta.y)), Je(this.projectionDelta, this.layoutCorrected, p, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== m || !Vs(this.projectionDelta.x, this.prevProjectionDelta.x) || !Vs(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", p));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(r = !0) {
      if (this.options.visualElement?.scheduleRender(), r) {
        const o = this.getStack();
        o && o.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Be(), this.projectionDelta = Be(), this.projectionDeltaWithTransform = Be();
    }
    setAnimationOrigin(r, o = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, d = { ...this.latestValues }, h = Be();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !o;
      const m = L(), p = l ? l.source : void 0, g = this.layout ? this.layout.source : void 0, v = p !== g, b = this.getStack(), x = !b || b.members.length <= 1, y = !!(v && !x && this.options.crossfade === !0 && !this.path.some(um));
      this.animationProgress = 0;
      let w;
      this.mixTargetDelta = (R) => {
        const k = R / 1e3;
        zs(h.x, r.x, k), zs(h.y, r.y, k), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Qe(m, this.layout.layoutBox, this.relativeParent.layout.layoutBox), cm(this.relativeTarget, this.relativeTargetOrigin, m, k), w && qh(this.relativeTarget, w) && (this.isProjectionDirty = !1), w || (w = L()), Y(w, this.relativeTarget)), v && (this.animationValues = d, $h(d, u, this.latestValues, k, y, x)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = k;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ge(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = F.update(() => {
        Nt.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Le(0)), this.currentAnimation = Lh(this.motionValue, [0, 1e3], {
          ...r,
          velocity: 0,
          isSync: !0,
          onUpdate: (o) => {
            this.mixTargetDelta(o), r.onUpdate && r.onUpdate(o);
          },
          onStop: () => {
          },
          onComplete: () => {
            r.onComplete && r.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const r = this.getStack();
      r && r.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Zh), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: o, target: l, layout: u, latestValues: d } = r;
      if (!(!o || !l || !u)) {
        if (this !== r && this.layout && u && qr(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || L();
          const h = _(this.layout.layoutBox.x);
          l.x.min = r.target.x.min, l.x.max = l.x.min + h;
          const m = _(this.layout.layoutBox.y);
          l.y.min = r.target.y.min, l.y.max = l.y.min + m;
        }
        Y(o, l), Ve(o, d), Je(this.projectionDeltaWithTransform, this.layoutCorrected, o, d);
      }
    }
    registerSharedNode(r, o) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new Yh()), this.sharedNodes.get(r).add(o);
      const u = o.options.initialPromotionConfig;
      o.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(o) : void 0
      });
    }
    isLead() {
      const r = this.getStack();
      return r ? r.lead === this : !0;
    }
    getLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: r } = this.options;
      if (r)
        return this.root.sharedNodes.get(r);
    }
    promote({ needsReset: r, transition: o, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), r && (this.projectionDelta = void 0, this.needsReset = !0), o && this.setOptions({ transition: o });
    }
    relegate() {
      const r = this.getStack();
      return r ? r.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: r } = this.options;
      if (!r)
        return;
      let o = !1;
      const { latestValues: l } = r;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (o = !0), !o)
        return;
      const u = {};
      l.z && tn("z", r, u, this.animationValues);
      for (let d = 0; d < en.length; d++)
        tn(`rotate${en[d]}`, r, u, this.animationValues), tn(`skew${en[d]}`, r, u, this.animationValues);
      r.render();
      for (const d in u)
        r.setStaticValue(d, u[d]), this.animationValues && (this.animationValues[d] = u[d]);
      r.scheduleRender();
    }
    applyProjectionStyles(r, o) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        r.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, r.visibility = "", r.opacity = "", r.pointerEvents = Rt(o?.pointerEvents) || "", r.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (r.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, r.pointerEvents = Rt(o?.pointerEvents) || ""), this.hasProjected && !ke(this.latestValues) && (r.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      r.visibility = "";
      const d = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let h = Xh(this.projectionDeltaWithTransform, this.treeScale, d);
      l && (h = l(d, h)), r.transform = h;
      const { x: m, y: p } = this.projectionDelta;
      r.transformOrigin = `${m.origin * 100}% ${p.origin * 100}% 0`, u.animationValues ? r.opacity = u === this ? d.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : d.opacityExit : r.opacity = u === this ? d.opacity !== void 0 ? d.opacity : "" : d.opacityExit !== void 0 ? d.opacityExit : 0;
      for (const g in at) {
        if (d[g] === void 0)
          continue;
        const { correct: v, applyTo: b, isCSSVariable: x } = at[g], y = h === "none" ? d[g] : v(d[g], u);
        if (b) {
          const w = b.length;
          for (let R = 0; R < w; R++)
            r[b[R]] = y;
        } else
          x ? this.options.visualElement.renderState.vars[g] = y : r[g] = y;
      }
      this.options.layoutId && (r.pointerEvents = u === this ? Rt(o?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => r.currentAnimation?.stop()), this.root.nodes.forEach(Bs), this.root.sharedNodes.clear();
    }
  };
}
function Qh(e) {
  e.updateLayout();
}
function em(e) {
  const t = e.resumeFrom?.snapshot || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = e.layout, { animationType: s } = e.options, a = t.source !== e.layout.source;
    s === "size" ? X((d) => {
      const h = a ? t.measuredBox[d] : t.layoutBox[d], m = _(h);
      h.min = n[d].min, h.max = h.min + m;
    }) : qr(s, t.layoutBox, n) && X((d) => {
      const h = a ? t.measuredBox[d] : t.layoutBox[d], m = _(n[d]);
      h.max = h.min + m, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[d].max = e.relativeTarget[d].min + m);
    });
    const r = Be();
    Je(r, n, t.layoutBox);
    const o = Be();
    a ? Je(o, e.applyTransform(i, !0), t.measuredBox) : Je(o, n, t.layoutBox);
    const l = !_r(r);
    let u = !1;
    if (!e.resumeFrom) {
      const d = e.getClosestProjectingParent();
      if (d && !d.resumeFrom) {
        const { snapshot: h, layout: m } = d;
        if (h && m) {
          const p = L();
          Qe(p, t.layoutBox, h.layoutBox);
          const g = L();
          Qe(g, n, m.layoutBox), Hr(p, g) || (u = !0), d.options.layoutRoot && (e.relativeTarget = g, e.relativeTargetOrigin = p, e.relativeParent = d);
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: n,
      snapshot: t,
      delta: o,
      layoutDelta: r,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: u
    });
  } else if (e.isLead()) {
    const { onExitComplete: n } = e.options;
    n && n();
  }
  e.options.transition = void 0;
}
function tm(e) {
  e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function nm(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function im(e) {
  e.clearSnapshot();
}
function Bs(e) {
  e.clearMeasurements();
}
function Is(e) {
  e.isLayoutDirty = !1;
}
function sm(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function Ls(e) {
  e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function am(e) {
  e.resolveTargetDelta();
}
function rm(e) {
  e.calcProjection();
}
function om(e) {
  e.resetSkewAndRotation();
}
function lm(e) {
  e.removeLeadSnapshot();
}
function zs(e, t, n) {
  e.translate = D(t.translate, 0, n), e.scale = D(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint;
}
function js(e, t, n, i) {
  e.min = D(t.min, n.min, i), e.max = D(t.max, n.max, i);
}
function cm(e, t, n, i) {
  js(e.x, t.x, n.x, i), js(e.y, t.y, n.y, i);
}
function um(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const dm = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Os = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), Us = Os("applewebkit/") && !Os("chrome/") ? Math.round : Q;
function $s(e) {
  e.min = Us(e.min), e.max = Us(e.max);
}
function hm(e) {
  $s(e.x), $s(e.y);
}
function qr(e, t, n) {
  return e === "position" || e === "preserve-aspect" && !bh(Ds(t), Ds(n), 0.2);
}
function mm(e) {
  return e !== e.root && e.scroll?.wasRoot;
}
const fm = Gr({
  attachResizeListener: (e, t) => rt(e, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), nn = {
  current: void 0
}, Yr = Gr({
  measureScroll: (e) => ({
    x: e.scrollLeft,
    y: e.scrollTop
  }),
  defaultParent: () => {
    if (!nn.current) {
      const e = new fm({});
      e.mount(window), e.setOptions({ layoutScroll: !0 }), nn.current = e;
    }
    return nn.current;
  },
  resetTransform: (e, t) => {
    e.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), pm = {
  pan: {
    Feature: Dh
  },
  drag: {
    Feature: Fh,
    ProjectionNode: Yr,
    MeasureLayout: Ur
  }
};
function Ws(e, t, n) {
  const { props: i } = e;
  e.animationState && i.whileHover && e.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, a = i[s];
  a && F.postRender(() => a(t, mt(t)));
}
class gm extends xe {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = ju(t, (n, i) => (Ws(this.node, i, "Start"), (s) => Ws(this.node, s, "End"))));
  }
  unmount() {
  }
}
class ym extends xe {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = ut(rt(this.node.current, "focus", () => this.onFocus()), rt(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function _s(e, t, n) {
  const { props: i } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled)
    return;
  e.animationState && i.whileTap && e.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), a = i[s];
  a && F.postRender(() => a(t, mt(t)));
}
class bm extends xe {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = Wu(t, (n, i) => (_s(this.node, i, "Start"), (s, { success: a }) => _s(this.node, s, a ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const Sn = /* @__PURE__ */ new WeakMap(), sn = /* @__PURE__ */ new WeakMap(), vm = (e) => {
  const t = Sn.get(e.target);
  t && t(e);
}, xm = (e) => {
  e.forEach(vm);
};
function wm({ root: e, ...t }) {
  const n = e || document;
  sn.has(n) || sn.set(n, {});
  const i = sn.get(n), s = JSON.stringify(t);
  return i[s] || (i[s] = new IntersectionObserver(xm, { root: e, ...t })), i[s];
}
function Am(e, t, n) {
  const i = wm(t);
  return Sn.set(e, n), i.observe(e), () => {
    Sn.delete(e), i.unobserve(e);
  };
}
const km = {
  some: 0,
  all: 1
};
class Tm extends xe {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(), { root: n, margin: i, amount: s = "some", once: a } = t, r = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof s == "number" ? s : km[s]
    }, o = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, a && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: d, onViewportLeave: h } = this.node.getProps(), m = u ? d : h;
      m && m(l);
    };
    return Am(this.node.current, r, o);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Rm(t, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Rm({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const Nm = {
  inView: {
    Feature: Tm
  },
  tap: {
    Feature: bm
  },
  focus: {
    Feature: ym
  },
  hover: {
    Feature: gm
  }
}, Pm = {
  layout: {
    ProjectionNode: Yr,
    MeasureLayout: Ur
  }
}, Sm = {
  ...hh,
  ...Nm,
  ...pm,
  ...Pm
}, A = /* @__PURE__ */ Md(Sm, Wd);
function Em(e) {
  e.values.forEach((t) => t.stop());
}
function En(e, t) {
  [...t].reverse().forEach((i) => {
    const s = e.getVariant(i);
    s && bi(e, s), e.variantChildren && e.variantChildren.forEach((a) => {
      En(a, t);
    });
  });
}
function Mm(e, t) {
  if (Array.isArray(t))
    return En(e, t);
  if (typeof t == "string")
    return En(e, [t]);
  bi(e, t);
}
function Cm() {
  const e = /* @__PURE__ */ new Set(), t = {
    subscribe(n) {
      return e.add(n), () => void e.delete(n);
    },
    start(n, i) {
      const s = [];
      return e.forEach((a) => {
        s.push(Dr(a, n, {
          transitionOverride: i
        }));
      }), Promise.all(s);
    },
    set(n) {
      return e.forEach((i) => {
        Mm(i, n);
      });
    },
    stop() {
      e.forEach((n) => {
        Em(n);
      });
    },
    mount() {
      return () => {
        t.stop();
      };
    }
  };
  return t;
}
function Fm() {
  const e = Bt(Cm);
  return Un(e.mount, []), e;
}
const Dm = Fm, ne = globalThis.__GLOBALS__.getAssetURL("b1e9802bb3d56ad52a5c98150dccd9e7794673a3.png");
function Vm() {
  const e = me(), { language: t, setLanguage: n, t: i } = ve(), [s, a] = G(!1), [r, o] = G(!1), [l, u] = G(!1);
  ie(() => {
    const m = () => {
      o(window.scrollY > 30);
    };
    return window.addEventListener("scroll", m), () => window.removeEventListener("scroll", m);
  }, []);
  const d = [
    { path: "/", labelKey: "nav.home" },
    { path: "/behandlungen", labelKey: "nav.treatments" },
    { path: "/uber-mera", labelKey: "nav.about" },
    { path: "/kontakt", labelKey: "nav.contact" }
  ], h = [
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "gr", label: "ΕΛΛΗΝΙΚΆ", flag: "🇬🇷" }
  ];
  return /* @__PURE__ */ f(
    A.nav,
    {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${r ? "py-4 bg-[#FAF7F2]/95 backdrop-blur-xl shadow-xs border-b border-[#4A3F35]/5" : "py-6 lg:py-10 bg-transparent"}`,
      children: [
        /* @__PURE__ */ c("div", { className: "max-w-7xl mx-auto px-6 lg:px-12", children: /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ c(H, { to: "/", className: "relative z-10", children: /* @__PURE__ */ c(
            A.img,
            {
              src: ne,
              alt: "MERA Cosmetics",
              className: "h-10 lg:h-14 w-auto transition-all duration-700",
              whileHover: { scale: 1.05 }
            }
          ) }),
          /* @__PURE__ */ c("div", { className: "hidden lg:flex items-center gap-16 absolute left-1/2 -translate-x-1/2", children: d.map((m) => /* @__PURE__ */ f(
            H,
            {
              to: m.path,
              className: "relative group py-2",
              children: [
                /* @__PURE__ */ c(
                  "span",
                  {
                    className: `text-lg tracking-wide transition-all duration-500 font-serif italic ${e.pathname === m.path ? "text-[#8B7355]" : "text-[#7A6F65] hover:text-[#4A3F35]"}`,
                    children: i(m.labelKey)
                  }
                ),
                /* @__PURE__ */ c(
                  A.div,
                  {
                    className: `absolute -bottom-1 left-0 right-0 h-[1px] bg-[#8B7355]/30 origin-left transition-transform duration-500 ${e.pathname === m.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`
                  }
                )
              ]
            },
            m.path
          )) }),
          /* @__PURE__ */ f("div", { className: "flex items-center gap-4 lg:gap-8", children: [
            /* @__PURE__ */ f("div", { className: "hidden lg:block relative", children: [
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => u(!l),
                  className: "flex items-center gap-2 text-[#7A6F65] hover:text-[#4A3F35] transition-colors duration-300 group",
                  children: [
                    /* @__PURE__ */ c($l, { className: "w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" }),
                    /* @__PURE__ */ c("span", { className: "text-[0.625rem] tracking-[0.2em] uppercase font-medium", children: h.find((m) => m.code === t)?.code })
                  ]
                }
              ),
              /* @__PURE__ */ c(Ji, { children: l && /* @__PURE__ */ c(
                A.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: 10 },
                  className: "absolute right-0 top-full mt-6 bg-white shadow-2xl rounded-2xl overflow-hidden min-w-[160px] border border-[#4A3F35]/5",
                  children: h.map((m) => /* @__PURE__ */ f(
                    "button",
                    {
                      onClick: () => {
                        n(m.code), u(!1);
                      },
                      className: `w-full px-6 py-4 text-left text-sm flex items-center gap-3 hover:bg-[#FAF7F2] transition-colors ${t === m.code ? "bg-[#FAF7F2] text-[#4A3F35]" : "text-[#7A6F65]"}`,
                      children: [
                        /* @__PURE__ */ c("span", { children: m.flag }),
                        /* @__PURE__ */ c("span", { className: "tracking-wide", children: m.label })
                      ]
                    },
                    m.code
                  ))
                }
              ) })
            ] }),
            /* @__PURE__ */ c(
              "a",
              {
                href: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/all-offer?share=true&pId=2775917",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "hidden lg:block px-6 py-2.5 bg-[#8B7355] text-white text-[0.625rem] tracking-[0.2em] uppercase rounded-full hover:bg-[#6B5540] transition-all duration-500 font-medium",
                children: i("nav.book")
              }
            ),
            /* @__PURE__ */ c(
              "button",
              {
                onClick: () => a(!s),
                className: "lg:hidden p-3 text-[#4A3F35] bg-[#E8DDD0]/20 rounded-full transition-colors",
                "aria-label": "Toggle menu",
                children: s ? /* @__PURE__ */ c(Xl, { className: "w-5 h-5" }) : /* @__PURE__ */ c(Kl, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ c(Ji, { children: s && /* @__PURE__ */ f(
          A.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 top-0 left-0 w-full h-screen bg-[#FAF7F2] z-40 lg:hidden flex flex-col pt-32 px-12",
            children: [
              /* @__PURE__ */ f("div", { className: "space-y-8 flex flex-col", children: [
                d.map((m, p) => /* @__PURE__ */ c(
                  A.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: p * 0.1 },
                    children: /* @__PURE__ */ c(
                      H,
                      {
                        to: m.path,
                        onClick: () => a(!1),
                        className: `text-4xl font-serif italic ${e.pathname === m.path ? "text-[#8B7355]" : "text-[#4A3F35]"}`,
                        children: i(m.labelKey)
                      }
                    )
                  },
                  m.path
                )),
                /* @__PURE__ */ c("div", { className: "pt-6 flex gap-3", children: h.map((m) => /* @__PURE__ */ c(
                  "button",
                  {
                    onClick: () => {
                      n(m.code), a(!1);
                    },
                    className: `w-9 h-9 flex items-center justify-center rounded-full border text-[10px] tracking-widest uppercase transition-all duration-300 font-medium ${t === m.code ? "bg-[#8B7355] text-white border-[#8B7355]" : "border-[#4A3F35]/10 text-[#7A6F65]"}`,
                    children: m.code
                  },
                  m.code
                )) }),
                /* @__PURE__ */ c("div", { className: "pt-4", children: /* @__PURE__ */ c(
                  "a",
                  {
                    href: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/all-offer?share=true&pId=2775917",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-block px-10 py-5 bg-[#8B7355] text-white text-[0.625rem] tracking-[0.2em] uppercase rounded-full font-medium",
                    children: i("nav.book")
                  }
                ) })
              ] }),
              /* @__PURE__ */ f("div", { className: "mt-auto pb-16 space-y-10", children: [
                /* @__PURE__ */ c("div", { className: "h-[1px] w-full bg-[#4A3F35]/5" }),
                /* @__PURE__ */ f("div", { className: "flex flex-col gap-5", children: [
                  /* @__PURE__ */ c(
                    H,
                    {
                      to: "/rechtliches",
                      onClick: () => a(!1),
                      className: "text-lg text-[#7A6F65] hover:text-[#4A3F35] transition-colors font-serif italic",
                      children: i("legal.imprint.title")
                    }
                  ),
                  /* @__PURE__ */ c(
                    H,
                    {
                      to: "/rechtliches",
                      onClick: () => a(!1),
                      className: "text-lg text-[#7A6F65] hover:text-[#4A3F35] transition-colors font-serif italic",
                      children: i("legal.privacy.title")
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
function Bm({ className: e }) {
  return /* @__PURE__ */ c(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: e,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ c("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" })
    }
  );
}
function Im() {
  const { t: e } = ve();
  return /* @__PURE__ */ f("footer", { className: "border-t border-[#4A3F35]/10 bg-[#FAF7F2] relative overflow-hidden pt-24 pb-12", children: [
    /* @__PURE__ */ c("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-linear-to-r from-transparent via-[#8B7355]/20 to-transparent" }),
    /* @__PURE__ */ f("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 relative z-10", children: [
      /* @__PURE__ */ f("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24", children: [
        /* @__PURE__ */ f("div", { className: "lg:col-span-5 space-y-10", children: [
          /* @__PURE__ */ c(H, { to: "/", className: "inline-block group", children: /* @__PURE__ */ c(
            "img",
            {
              src: ne,
              alt: "MERA Cosmetics",
              className: "h-16 lg:h-20 w-auto transition-transform duration-700 group-hover:scale-105"
            }
          ) }),
          /* @__PURE__ */ c("p", { className: "text-xl text-[#7A6F65] leading-relaxed italic max-w-sm font-serif opacity-80", children: e("footer.tagline") }),
          /* @__PURE__ */ c("p", { className: "text-[0.625rem] tracking-[0.2em] uppercase text-[#8B7355] font-medium opacity-60 italic", children: e("common.discount.students") }),
          /* @__PURE__ */ c("p", { className: "text-[0.625rem] tracking-[0.2em] uppercase text-[#8B7355] font-medium opacity-60 italic mt-1", children: e("common.discount.referral") }),
          /* @__PURE__ */ c("div", { className: "flex gap-4", children: [
            { icon: _l, href: "https://www.instagram.com/mera.cosmetics.zh/", label: "Instagram" },
            { icon: Bm, href: "https://www.tiktok.com/@mera.cosmetics.zh?lang=de-DE", label: "TikTok" },
            { icon: Ol, href: "https://www.facebook.com/profile.php?id=61586948390288", label: "Facebook" }
          ].map((t, n) => /* @__PURE__ */ c(
            "a",
            {
              href: t.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-10 h-10 rounded-full border border-[#4A3F35]/10 flex items-center justify-center text-[#7A6F65] hover:text-[#8B7355] hover:border-[#8B7355]/30 transition-all duration-500",
              "aria-label": t.label,
              children: /* @__PURE__ */ c(t.icon, { className: "w-4 h-4" })
            },
            n
          )) })
        ] }),
        /* @__PURE__ */ f("div", { className: "lg:col-span-3", children: [
          /* @__PURE__ */ c("h4", { className: "text-[0.625rem] tracking-[0.4em] uppercase text-[#8B7355] mb-12 font-bold opacity-60", children: e("footer.nav.title") }),
          /* @__PURE__ */ c("ul", { className: "space-y-5", children: [
            { to: "/behandlungen", labelKey: "footer.nav.treatments" },
            { to: "/uber-mera", labelKey: "footer.nav.about" },
            { to: "/kontakt", labelKey: "footer.nav.contact" },
            { to: "/rechtliches", labelKey: "footer.nav.legal" }
          ].map((t) => /* @__PURE__ */ c("li", { children: /* @__PURE__ */ f(
            H,
            {
              to: t.to,
              className: "text-lg lg:text-xl text-[#7A6F65] hover:text-[#4A3F35] transition-all duration-700 font-serif italic relative group inline-block py-1",
              children: [
                /* @__PURE__ */ c("span", { className: "relative z-10", children: e(t.labelKey) }),
                /* @__PURE__ */ c("span", { className: "absolute bottom-1 left-0 w-0 h-[0.5px] bg-[#8B7355]/40 transition-all duration-700 group-hover:w-full" })
              ]
            }
          ) }, t.to)) })
        ] }),
        /* @__PURE__ */ f("div", { className: "lg:col-span-4", children: [
          /* @__PURE__ */ c("h4", { className: "text-[0.625rem] tracking-[0.4em] uppercase text-[#8B7355] mb-10 font-medium", children: e("footer.contact.title") }),
          /* @__PURE__ */ f("div", { className: "space-y-8", children: [
            /* @__PURE__ */ f("div", { className: "space-y-2", children: [
              /* @__PURE__ */ c("p", { className: "text-lg text-[#4A3F35] font-serif italic", children: "MERA Cosmetics" }),
              /* @__PURE__ */ f("p", { className: "text-[#7A6F65] font-serif opacity-80 leading-relaxed", children: [
                "Staffelackerstrasse 11",
                /* @__PURE__ */ c("br", {}),
                "8953 Dietikon, CH"
              ] })
            ] }),
            /* @__PURE__ */ f("div", { className: "space-y-3", children: [
              /* @__PURE__ */ c(
                "a",
                {
                  href: "tel:+41782111503",
                  className: "text-lg text-[#7A6F65] hover:text-[#4A3F35] transition-colors duration-300 block font-serif",
                  children: "+41 78 211 15 03"
                }
              ),
              /* @__PURE__ */ c(
                "a",
                {
                  href: "mailto:info@meracosmetics.ch",
                  className: "text-lg text-[#7A6F65] hover:text-[#4A3F35] transition-colors duration-300 block font-serif underline underline-offset-4 decoration-[#8B7355]/20 hover:decoration-[#8B7355]",
                  children: "info@meracosmetics.ch"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ f("div", { className: "pt-12 border-t border-[#4A3F35]/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[0.625rem] tracking-[0.1em] uppercase text-[#7A6F65]/60", children: [
        /* @__PURE__ */ f("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " MERA Cosmetics | ",
          e("footer.copyright")
        ] }),
        /* @__PURE__ */ f("div", { className: "flex gap-12 font-medium", children: [
          /* @__PURE__ */ c(H, { to: "/rechtliches", className: "hover:text-[#8B7355] transition-colors", children: e("footer.legal.imprint") }),
          /* @__PURE__ */ c(H, { to: "/rechtliches", className: "hover:text-[#8B7355] transition-colors", children: e("footer.legal.privacy") })
        ] })
      ] })
    ] })
  ] });
}
function Lm() {
  const { t: e } = ve(), t = "+41782111503", n = encodeURIComponent(e("whatsapp.message")), i = `https://wa.me/${t}?text=${n}`;
  return /* @__PURE__ */ c(
    "a",
    {
      href: i,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300",
      "aria-label": "WhatsApp kontaktieren",
      children: /* @__PURE__ */ c(ql, { className: "w-6 h-6" })
    }
  );
}
function zm() {
  const { pathname: e } = me();
  return ie(() => {
    window.scrollTo(0, 0);
  }, [e]), null;
}
const jm = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function Xr(e) {
  const [t, n] = G(!1), i = () => {
    n(!0);
  }, { src: s, alt: a, style: r, className: o, ...l } = e;
  return t ? /* @__PURE__ */ c(
    "div",
    {
      className: `inline-block bg-gray-100 text-center align-middle ${o ?? ""}`,
      style: r,
      children: /* @__PURE__ */ c("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ c("img", { src: jm, alt: "Error loading image", ...l, "data-original-url": s }) })
    }
  ) : /* @__PURE__ */ c("img", { src: s, alt: a, className: o, style: r, ...l, onError: i });
}
const Hs = globalThis.__GLOBALS__.getAssetURL("546386dd4d4d396e3c3a7a0b3a7228054e1971dc.png"), Zr = globalThis.__GLOBALS__.getAssetURL("4c8d494fb2056abf749de0457e0874508eb054d2.png"), vt = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
}, Om = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};
function Um() {
  const { t: e } = ve(), [t, n] = G(!1), i = Dm();
  return ie(() => {
    (async () => {
      await new Promise((a) => setTimeout(a, 800)), await i.start({
        y: "-100%",
        opacity: 0,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
      }), n(!0);
    })();
  }, [i]), /* @__PURE__ */ f("div", { className: "relative", children: [
    /* @__PURE__ */ c(
      A.div,
      {
        initial: { y: 0, opacity: 1 },
        animate: i,
        className: "fixed inset-0 z-[100] bg-[#FAF7F2] flex items-center justify-center",
        style: { pointerEvents: t ? "none" : "auto" },
        children: /* @__PURE__ */ c(
          A.img,
          {
            src: Hs,
            alt: "MERA Cosmetics",
            className: "max-w-[80%] lg:max-w-[60%] h-auto max-h-[20vh] object-contain",
            initial: { opacity: 0, scale: 0.98 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 1 }
          }
        )
      }
    ),
    /* @__PURE__ */ f(
      A.div,
      {
        className: "pt-20 lg:pt-24",
        initial: { opacity: 0 },
        animate: { opacity: t ? 1 : 0 },
        transition: { duration: 0.8 },
        children: [
          /* @__PURE__ */ f("section", { className: "min-h-[90svh] flex items-center justify-center px-6 lg:px-12 py-32 lg:py-48 bg-gradient-to-b from-[#FAF7F2] to-[#FDFBF9] relative overflow-hidden", children: [
            /* @__PURE__ */ c(
              A.img,
              {
                src: ne,
                alt: "",
                className: "absolute -right-20 top-20 w-[40vw] opacity-[0.02] select-none pointer-events-none",
                initial: { opacity: 0, rotate: -15 },
                animate: { opacity: 0.02, rotate: 0 },
                transition: { duration: 3 }
              }
            ),
            /* @__PURE__ */ f(
              A.div,
              {
                initial: "initial",
                animate: "animate",
                variants: Om,
                className: "max-w-6xl mx-auto text-center relative z-10",
                children: [
                  /* @__PURE__ */ c(A.div, { variants: vt, className: "mb-16 lg:mb-24", children: /* @__PURE__ */ c(
                    "img",
                    {
                      src: Hs,
                      alt: "MERA Cosmetics",
                      className: "w-full max-w-[500px] h-auto mx-auto object-contain opacity-80"
                    }
                  ) }),
                  /* @__PURE__ */ c(
                    A.h1,
                    {
                      variants: vt,
                      className: "text-6xl md:text-8xl lg:text-9xl mb-12 text-[#4A3F35] tracking-tight leading-[0.9] font-serif",
                      children: e("home.hero.title")
                    }
                  ),
                  /* @__PURE__ */ c(
                    A.p,
                    {
                      variants: vt,
                      className: "text-xl lg:text-2xl text-[#7A6F65] max-w-3xl mx-auto mb-20 leading-relaxed font-serif italic opacity-70",
                      children: e("home.hero.subtitle")
                    }
                  ),
                  /* @__PURE__ */ c(A.div, { variants: vt, children: /* @__PURE__ */ c(
                    "a",
                    {
                      href: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/all-offer?share=true&pId=2775917",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-block px-14 py-6 bg-[#8B7355] text-[#FAF7F2] text-[0.625rem] tracking-[0.3em] uppercase rounded-full hover:bg-[#6B5540] transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 font-medium",
                      children: e("nav.book")
                    }
                  ) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ c("section", { className: "py-24 lg:py-40 px-6 lg:px-12 bg-white border-y border-[#4A3F35]/5", children: /* @__PURE__ */ c("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ f(
            A.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
              viewport: { once: !0 },
              className: "space-y-12 lg:space-y-20",
              children: [
                /* @__PURE__ */ f("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ c("span", { className: "block text-[0.625rem] tracking-[0.5em] uppercase text-[#8B7355] font-bold italic opacity-60", children: e("home.concept.subtitle") }),
                  /* @__PURE__ */ c("h2", { className: "text-4xl lg:text-7xl text-[#4A3F35] font-serif leading-[1.1] tracking-tight", children: e("home.concept.title") })
                ] }),
                /* @__PURE__ */ f("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start", children: [
                  /* @__PURE__ */ c("p", { className: "text-lg lg:text-2xl text-[#7A6F65] font-serif italic leading-relaxed opacity-80", children: e("home.philosophy.text1") }),
                  /* @__PURE__ */ f("div", { className: "space-y-8", children: [
                    /* @__PURE__ */ c("p", { className: "text-lg lg:text-xl text-[#7A6F65] font-sans leading-relaxed", children: e("home.philosophy.text2") }),
                    /* @__PURE__ */ c(
                      "a",
                      {
                        href: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/all-offer?share=true&pId=2775917",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-block text-[0.65rem] tracking-[0.4em] uppercase text-[#4A3F35] font-bold border-b border-[#8B7355]/40 pb-1 hover:border-[#8B7355] transition-all",
                        children: e("nav.book")
                      }
                    )
                  ] })
                ] })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("section", { className: "py-32 lg:py-56 px-6 lg:px-12", children: /* @__PURE__ */ c("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ f(
            A.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
              viewport: { once: !0, margin: "-100px" },
              className: "grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center",
              children: [
                /* @__PURE__ */ f("div", { className: "lg:col-span-5 order-2 lg:order-1", children: [
                  /* @__PURE__ */ c("span", { className: "block text-[0.625rem] tracking-[0.4em] uppercase text-[#8B7355] mb-8 font-medium", children: e("home.philosophy.tag") }),
                  /* @__PURE__ */ c("h2", { className: "text-5xl lg:text-7xl mb-10 text-[#4A3F35] tracking-tight leading-none font-serif", children: e("home.philosophy.title") }),
                  /* @__PURE__ */ f("div", { className: "space-y-8 text-lg lg:text-xl text-[#7A6F65] leading-relaxed font-serif italic opacity-80", children: [
                    /* @__PURE__ */ c("p", { children: e("home.philosophy.text1") }),
                    /* @__PURE__ */ c("p", { children: e("home.philosophy.text2") })
                  ] }),
                  /* @__PURE__ */ c("div", { className: "mt-16", children: /* @__PURE__ */ c(
                    H,
                    {
                      to: "/uber-mera",
                      className: "inline-block px-12 py-5 border border-[#8B7355]/30 text-[#8B7355] text-[0.625rem] tracking-[0.2em] uppercase rounded-full hover:bg-[#8B7355] hover:text-white transition-all duration-700 font-medium",
                      children: e("home.philosophy.cta")
                    }
                  ) })
                ] }),
                /* @__PURE__ */ c("div", { className: "lg:col-span-7 order-1 lg:order-2", children: /* @__PURE__ */ c("div", { className: "aspect-[4/5] overflow-hidden rounded-[3rem] bg-[#F5EFE7] shadow-sm grayscale-20 hover:grayscale-0 transition-all duration-1000", children: /* @__PURE__ */ c(
                  Xr,
                  {
                    src: "https://images.unsplash.com/photo-1762534960255-f2f79036040b?q=80&w=1200&auto=format&fit=crop",
                    alt: "MERA Aesthetic",
                    className: "w-full h-full object-cover"
                  }
                ) }) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("section", { className: "py-32 lg:py-56 px-6 lg:px-12 bg-[#E8DDD0]/10", children: /* @__PURE__ */ c("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ c("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20", children: [
            { title: e("home.values.nature"), text: e("home.values.nature.text") },
            { title: e("home.values.mindfulness"), text: e("home.values.mindfulness.text") },
            { title: e("home.values.trust"), text: e("home.values.trust.text") }
          ].map((s, a) => /* @__PURE__ */ f(
            A.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { delay: a * 0.1, duration: 0.8 },
              viewport: { once: !0 },
              className: "text-center group",
              children: [
                /* @__PURE__ */ c("h3", { className: "text-3xl lg:text-4xl mb-6 text-[#4A3F35] font-serif italic group-hover:text-[#8B7355] transition-colors", children: s.title }),
                /* @__PURE__ */ c("p", { className: "text-base lg:text-lg text-[#7A6F65] leading-relaxed font-serif opacity-70", children: s.text })
              ]
            },
            a
          )) }) }) }),
          /* @__PURE__ */ c("section", { className: "py-32 lg:py-48 px-6", children: /* @__PURE__ */ f(
            A.div,
            {
              initial: { opacity: 0, scale: 0.99 },
              whileInView: { opacity: 1, scale: 1 },
              transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              viewport: { once: !0 },
              className: "max-w-7xl mx-auto relative group",
              children: [
                /* @__PURE__ */ c("div", { className: "aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-[3rem] shadow-sm grayscale hover:grayscale-0 transition-all duration-[2000ms]", children: /* @__PURE__ */ c(
                  "img",
                  {
                    src: Zr,
                    alt: "Viviane Rovito",
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                  }
                ) }),
                /* @__PURE__ */ c("div", { className: "absolute -bottom-10 -right-10 w-48 h-48 bg-white/20 backdrop-blur-3xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000", children: /* @__PURE__ */ c("span", { className: "text-[0.5rem] tracking-[0.4em] uppercase font-medium text-[#4A3F35]/60", children: "Viviane Rovito" }) })
              ]
            }
          ) }),
          /* @__PURE__ */ c("section", { className: "py-32 lg:py-56 px-6 lg:px-12 bg-white", children: /* @__PURE__ */ c("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ f(
            A.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 1 },
              viewport: { once: !0 },
              className: "text-center space-y-8",
              children: [
                /* @__PURE__ */ f("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ c("span", { className: "block text-[0.625rem] tracking-[0.5em] uppercase text-[#8B7355] font-bold opacity-60 italic", children: e("home.journal.tag") }),
                  /* @__PURE__ */ c("h2", { className: "text-4xl lg:text-7xl text-[#4A3F35] font-serif tracking-tight", children: e("home.instagram.title") }),
                  /* @__PURE__ */ c("p", { className: "text-lg lg:text-2xl text-[#7A6F65] font-serif italic opacity-70", children: e("home.instagram.subtitle") })
                ] }),
                /* @__PURE__ */ c("div", { className: "pt-8", children: /* @__PURE__ */ c(
                  "a",
                  {
                    href: "https://www.instagram.com/mera.cosmetics.zh/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center justify-center px-12 py-5 border border-[#8B7355]/30 text-[#8B7355] text-[0.625rem] tracking-[0.2em] uppercase rounded-full hover:bg-[#8B7355] hover:text-white transition-all duration-700 font-medium",
                    children: e("home.instagram.button")
                  }
                ) })
              ]
            }
          ) }) }),
          /* @__PURE__ */ c("section", { className: "py-32 lg:py-64 px-6 lg:px-12 bg-gradient-to-b from-transparent to-[#E8DDD0]/20", children: /* @__PURE__ */ f(
            A.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 1 },
              viewport: { once: !0 },
              className: "max-w-4xl mx-auto text-center space-y-16",
              children: [
                /* @__PURE__ */ c("h2", { className: "text-5xl lg:text-8xl text-[#4A3F35] tracking-tight font-serif leading-none", children: e("home.cta.title") }),
                /* @__PURE__ */ c("p", { className: "text-xl lg:text-3xl text-[#7A6F65] leading-relaxed font-serif italic opacity-70", children: e("home.cta.subtitle") }),
                /* @__PURE__ */ c(
                  "a",
                  {
                    href: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/all-offer?share=true&pId=2775917",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-block px-16 py-7 bg-[#8B7355] text-[#FAF7F2] text-[0.75rem] tracking-[0.3em] uppercase rounded-full hover:bg-[#6B5540] transition-all duration-700 shadow-2xl active:scale-95 font-medium",
                    children: e("nav.book")
                  }
                )
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
const $m = () => [
  {
    id: "hands",
    title: { de: "Maniküre", en: "Manicure", gr: "Μανικιούρ" },
    treatments: [
      {
        name: { de: "Basis Maniküre", en: "Basic Manicure", gr: "Βασικό Μανικιούρ" },
        price: "55",
        duration: "40 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310935&share=true&pId=2775917"
      },
      {
        name: { de: "Maniküre mit Nagellack", en: "Manicure with Polish", gr: "Μανικιούρ με Βερνίκι" },
        price: "65",
        duration: "50 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310938&share=true&pId=2775917"
      },
      {
        name: { de: "Gellack Maniküre", en: "Gellack Manicure", gr: "Gellack Μανικιούρ" },
        price: "75",
        duration: "60 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310941&share=true&pId=2775917"
      },
      {
        name: { de: "Gellack Entfernung", en: "Gellack Removal", gr: "Αφαίρεση Gellack" },
        price: "5",
        duration: "+10 Min"
      },
      {
        name: { de: "Hand Peeling", en: "Hand Peeling", gr: "Απολέπιση Χεριών" },
        price: "25",
        duration: "+15 Min"
      }
    ]
  },
  {
    id: "feet",
    title: { de: "Pediküre", en: "Pedicure", gr: "Πεντικιούρ" },
    treatments: [
      {
        name: { de: "Basis Pediküre", en: "Basic Pedicure", gr: "Βασικό Πεντικιούρ" },
        price: "65",
        duration: "50 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310951&share=true&pId=2775917"
      },
      {
        name: { de: "Pediküre mit Nagellack", en: "Pedicure with Polish", gr: "Πεντικιούρ με Βερνίκι" },
        price: "75",
        duration: "60 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310961&share=true&pId=2775917"
      },
      {
        name: { de: "Gellack Pediküre", en: "Gellack Pedicure", gr: "Gellack Πεντικιούρ" },
        price: "85",
        duration: "70 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310957&share=true&pId=2775917"
      },
      {
        name: { de: "Gellack Entfernung", en: "Gellack Removal", gr: "Αφαίρεση Gellack" },
        price: "5",
        duration: "+10 Min"
      },
      {
        name: { de: "Fuss Peeling", en: "Foot Peeling", gr: "Απολέπιση Ποδιών" },
        price: "25",
        duration: "+15 Min"
      },
      {
        name: { de: "Fussmassage", en: "Foot Massage", gr: "Μασάζ Ποδιών" },
        price: "15",
        duration: "+15 Min"
      }
    ]
  },
  {
    id: "waxing",
    title: { de: "Waxing", en: "Waxing", gr: "Αποτρίχωση" },
    treatments: [],
    subcategories: [
      {
        title: { de: "Beine & Arme", en: "Legs & Arms", gr: "Πόδια & Χέρια" },
        treatments: [
          {
            name: { de: "Ganze Beine", en: "Full Legs", gr: "Ολόκληρα Πόδια" },
            price: "95",
            duration: "45 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310966&share=true&pId=2775917"
          },
          {
            name: { de: "Halbe Beine", en: "Half Legs", gr: "Μισά Πόδια" },
            price: "65",
            duration: "30 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310972&share=true&pId=2775917"
          },
          {
            name: { de: "Ganze Arme", en: "Full Arms", gr: "Ολόκληρα Χέρια" },
            price: "65",
            duration: "30 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310977&share=true&pId=2775917"
          },
          {
            name: { de: "Halbe Arme", en: "Half Arms", gr: "Μισά Χέρια" },
            price: "35",
            duration: "20 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310983&share=true&pId=2775917"
          }
        ]
      },
      {
        title: { de: "Intimbereich", en: "Intimate Area", gr: "Ευαίσθητες Περιοχές" },
        treatments: [
          {
            name: { de: "Bikinizone", en: "Bikini Line", gr: "Γραμμή Μπικίνι" },
            price: "45",
            duration: "20 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310987&share=true&pId=2775917"
          },
          {
            name: { de: "Brazilian", en: "Brazilian", gr: "Brazilian" },
            price: "85",
            duration: "35 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310993&share=true&pId=2775917"
          },
          {
            name: { de: "Achseln", en: "Underarms", gr: "Μασχάλες" },
            price: "45",
            duration: "15 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26310995&share=true&pId=2775917"
          }
        ]
      },
      {
        title: { de: "Gesicht", en: "Face", gr: "Πρόσωπο" },
        treatments: [
          {
            name: { de: "Augenbrauen", en: "Eyebrows", gr: "Φρύδια" },
            price: "25",
            duration: "15 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311003&share=true&pId=2775917"
          },
          {
            name: { de: "Oberlippe", en: "Upper Lip", gr: "Άνω Χείλος" },
            price: "15",
            duration: "10 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311014&share=true&pId=2775917"
          },
          {
            name: { de: "Kinn", en: "Chin", gr: "Πηγούνι" },
            price: "15",
            duration: "10 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311019&share=true&pId=2775917"
          },
          {
            name: { de: "Halbes Gesicht", en: "Half Face", gr: "Μισό Πρόσωπο" },
            price: "35",
            duration: "20 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311023&share=true&pId=2775917"
          },
          {
            name: { de: "Ganzes Gesicht", en: "Full Face", gr: "Ολόκληρο Πρόσωπο" },
            price: "50",
            duration: "30 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311027&share=true&pId=2775917"
          }
        ]
      },
      {
        title: { de: "Oberkörper", en: "Upper Body", gr: "Άνω Σώμα" },
        treatments: [
          {
            name: { de: "Halber Rücken", en: "Half Back", gr: "Μισή Πλάτη" },
            price: "55",
            duration: "30 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311029&share=true&pId=2775917"
          },
          {
            name: { de: "Ganzer Rücken", en: "Full Back", gr: "Ολόκληρη Πλάτη" },
            price: "65",
            duration: "40 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311034&share=true&pId=2775917"
          },
          {
            name: { de: "Schultern", en: "Shoulders", gr: "Ώμοι" },
            price: "25",
            duration: "15 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311036&share=true&pId=2775917"
          },
          {
            name: { de: "Brust", en: "Chest", gr: "Στήθος" },
            price: "30",
            duration: "20 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311041&share=true&pId=2775917"
          },
          {
            name: { de: "Bauch", en: "Belly", gr: "Κοιλιά" },
            price: "40",
            duration: "20 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311052&share=true&pId=2775917"
          },
          {
            name: { de: "Ganze Vorderseite", en: "Full Front", gr: "Ολόκληρη Πρόσοψη" },
            price: "60",
            duration: "35 Min",
            bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311060&share=true&pId=2775917"
          }
        ]
      }
    ]
  },
  {
    id: "lashes",
    title: { de: "Wimpern & Brauen", en: "Lashes & Brows", gr: "Βλεφαρίδες & Φρύδια" },
    treatments: [
      {
        name: { de: "Wimpern färben", en: "Lash Tint", gr: "Βαφή Βλεφαρίδων" },
        price: "15",
        duration: "15 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311065&share=true&pId=2775917"
      },
      {
        name: { de: "Augenbrauen färben", en: "Brow Tint", gr: "Βαφή Φρυδιών" },
        price: "15",
        duration: "15 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311067&share=true&pId=2775917"
      },
      {
        name: { de: "Augenbrauen waxen & formen", en: "Brow Wax & Shape", gr: "Κερί & Διαμόρφωση Φρυδιών" },
        price: "35",
        duration: "25 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311073&share=true&pId=2775917"
      },
      {
        name: { de: "Wimpernlifting", en: "Lash Lifting", gr: "Lifting Βλεφαρίδων" },
        price: "95",
        duration: "60 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311075&share=true&pId=2775917"
      }
    ]
  },
  {
    id: "body",
    title: { de: "Körper", en: "Body", gr: "Σώμα" },
    treatments: [
      {
        name: { de: "Rückenmassage", en: "Back Massage", gr: "Μασάζ Πλάτης" },
        price: "60",
        duration: "30 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311100&share=true&pId=2775917"
      },
      {
        name: { de: "Ganzkörper Massage", en: "Full Body Massage", gr: "Μασάζ Ολόκληρου Σώματος" },
        price: "100",
        duration: "60 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311109&share=true&pId=2775917"
      },
      {
        name: { de: "Rücken Peeling", en: "Back Peeling", gr: "Απολέπιση Πλάτης" },
        price: "90",
        duration: "45 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311116&share=true&pId=2775917"
      },
      {
        name: { de: "Ganzkörper Peeling", en: "Full Body Peeling", gr: "Απολέπιση Ολόκληρου Σώματος" },
        price: "140",
        duration: "75 Min",
        bookingUrl: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/services?lid=2870898&eid=5075365&oiid=sv%3A26311116&share=true&pId=2775917"
      }
    ]
  }
], Ks = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
}, Gs = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};
function Wm() {
  const { t: e, language: t } = ve(), [n, i] = G("all"), s = $m(), a = [
    { id: "all", labelKey: "treatments.filter.all" },
    { id: "hands", labelKey: "treatments.filter.manicure" },
    { id: "feet", labelKey: "treatments.filter.pedicure" },
    { id: "waxing", labelKey: "treatments.filter.waxing" },
    { id: "lashes", labelKey: "treatments.filter.lashes" },
    { id: "body", labelKey: "treatments.filter.body" }
  ], r = n === "all" ? s : s.filter((o) => o.id === n);
  return /* @__PURE__ */ f("div", { className: "pt-20 lg:pt-24", children: [
    /* @__PURE__ */ f("section", { className: "py-24 lg:py-40 px-6 lg:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE7] to-[#E8DDD0]/20 relative overflow-hidden", children: [
      /* @__PURE__ */ c(
        A.img,
        {
          src: ne,
          alt: "",
          className: "absolute -right-10 top-10 w-[30vw] opacity-[0.03] select-none pointer-events-none rotate-6"
        }
      ),
      /* @__PURE__ */ f(
        A.div,
        {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          className: "max-w-5xl mx-auto text-center relative z-10",
          children: [
            /* @__PURE__ */ c("h1", { className: "text-5xl md:text-7xl lg:text-8xl mb-10 text-[#4A3F35] tracking-tight px-4 font-serif leading-tight", children: e("treatments.title") }),
            /* @__PURE__ */ c("p", { className: "text-lg lg:text-2xl text-[#7A6F65] leading-relaxed max-w-3xl mx-auto px-4 font-sans", children: e("treatments.subtitle") })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c("section", { className: "py-8 px-6 lg:px-12 bg-[#FAF7F2]/90 backdrop-blur-xl sticky top-20 lg:top-24 z-30 border-b border-[#4A3F35]/5 shadow-sm", children: /* @__PURE__ */ c("div", { className: "max-w-7xl mx-auto overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden", children: /* @__PURE__ */ c("div", { className: "flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-10 lg:gap-20 px-8 py-4 min-w-max md:min-w-0", children: a.map((o) => {
      const l = n === o.id;
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => i(o.id),
          className: `relative py-4 flex flex-col items-center transition-all duration-1000 whitespace-nowrap cursor-pointer group ${l ? "text-[#8B7355]" : "text-[#7A6F65]/40 hover:text-[#4A3F35]"}`,
          children: [
            /* @__PURE__ */ c("span", { className: `text-[0.625rem] tracking-[0.5em] uppercase font-medium transition-all duration-700 ${l ? "font-serif italic lowercase tracking-wider text-xl" : ""}`, children: e(o.labelKey) }),
            l && /* @__PURE__ */ c(
              A.div,
              {
                layoutId: "activeCategoryMarker",
                className: "absolute -bottom-1 w-12 h-[0.5px] bg-[#8B7355]/40",
                transition: { type: "spring", stiffness: 150, damping: 25 }
              }
            )
          ]
        },
        o.id
      );
    }) }) }) }),
    /* @__PURE__ */ c("section", { className: "py-32 lg:py-48 px-6 lg:px-12 bg-white/30", children: /* @__PURE__ */ f("div", { className: "max-w-4xl mx-auto space-y-32 lg:space-y-48", children: [
      r.map((o, l) => /* @__PURE__ */ f(
        A.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          transition: { delay: l * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] },
          viewport: { once: !0, margin: "-100px" },
          children: [
            /* @__PURE__ */ f("div", { className: "text-center mb-16 lg:mb-24", children: [
              /* @__PURE__ */ c("h2", { className: "text-4xl lg:text-6xl text-[#4A3F35] mb-8 tracking-tight font-serif", children: o.title[t] }),
              /* @__PURE__ */ c("div", { className: "w-24 h-0.5 bg-[#8B7355]/30 mx-auto" })
            ] }),
            o.treatments.length > 0 && /* @__PURE__ */ c(
              A.div,
              {
                initial: "initial",
                whileInView: "animate",
                variants: Gs,
                viewport: { once: !0 },
                className: "space-y-0 bg-white/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20",
                children: o.treatments.map((u, d) => /* @__PURE__ */ f(
                  A.div,
                  {
                    variants: Ks,
                    className: "flex flex-col border-b border-[#4A3F35]/5 last:border-0 hover:bg-[#FAF7F2]/60 transition-all duration-500 group",
                    children: [
                      /* @__PURE__ */ f("div", { className: "flex items-center justify-between py-10 px-8 lg:px-12", children: [
                        /* @__PURE__ */ f("div", { className: "flex-1", children: [
                          /* @__PURE__ */ c("h3", { className: "text-xl lg:text-2xl text-[#4A3F35] mb-3 font-serif group-hover:text-[#8B7355] transition-colors", children: u.name[t] }),
                          /* @__PURE__ */ c("p", { className: "text-sm lg:text-base text-[#7A6F65] tracking-widest uppercase opacity-70", children: u.duration })
                        ] }),
                        /* @__PURE__ */ f("div", { className: "flex items-center gap-12 ml-12", children: [
                          /* @__PURE__ */ c("div", { className: "text-right", children: /* @__PURE__ */ f("p", { className: "text-3xl lg:text-4xl font-light text-[#8B7355]", children: [
                            /* @__PURE__ */ c("span", { className: "text-lg lg:text-xl mr-1 opacity-60", children: "CHF" }),
                            u.price
                          ] }) }),
                          u.bookingUrl && /* @__PURE__ */ c(
                            "a",
                            {
                              href: u.bookingUrl,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "hidden sm:inline-flex items-center justify-center px-8 py-3 bg-[#8B7355] text-[#FAF7F2] text-[0.625rem] tracking-[0.15em] uppercase rounded-full hover:bg-[#6B5540] transition-all duration-500 shadow-lg hover:shadow-[0_10px_20px_rgba(139,115,85,0.2)]",
                              children: e("treatments.cta.direct")
                            }
                          )
                        ] })
                      ] }),
                      u.bookingUrl && /* @__PURE__ */ c("div", { className: "sm:hidden px-8 pb-8", children: /* @__PURE__ */ c(
                        "a",
                        {
                          href: u.bookingUrl,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "w-full flex items-center justify-center px-8 py-4 bg-[#8B7355] text-[#FAF7F2] text-[0.625rem] tracking-[0.15em] uppercase rounded-full",
                          children: e("treatments.cta.direct")
                        }
                      ) })
                    ]
                  },
                  d
                ))
              }
            ),
            o.subcategories && /* @__PURE__ */ c("div", { className: "space-y-24 lg:space-y-32", children: o.subcategories.map((u, d) => /* @__PURE__ */ f("div", { children: [
              /* @__PURE__ */ c("h3", { className: "text-3xl lg:text-4xl text-[#4A3F35] mb-10 pb-6 border-b border-[#8B7355]/20 font-serif italic text-center md:text-left", children: u.title[t] }),
              /* @__PURE__ */ c(
                A.div,
                {
                  initial: "initial",
                  whileInView: "animate",
                  variants: Gs,
                  viewport: { once: !0 },
                  className: "space-y-0 bg-white/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20",
                  children: u.treatments.map((h, m) => /* @__PURE__ */ f(
                    A.div,
                    {
                      variants: Ks,
                      className: "flex flex-col border-b border-[#4A3F35]/5 last:border-0 hover:bg-[#FAF7F2]/60 transition-all duration-500 group",
                      children: [
                        /* @__PURE__ */ f("div", { className: "flex items-center justify-between py-10 px-8 lg:px-12", children: [
                          /* @__PURE__ */ f("div", { className: "flex-1", children: [
                            /* @__PURE__ */ c("h4", { className: "text-xl lg:text-2xl text-[#4A3F35] mb-3 font-serif group-hover:text-[#8B7355] transition-colors", children: h.name[t] }),
                            /* @__PURE__ */ c("p", { className: "text-sm lg:text-base text-[#7A6F65] tracking-widest uppercase opacity-70", children: h.duration })
                          ] }),
                          /* @__PURE__ */ f("div", { className: "flex items-center gap-12 ml-12", children: [
                            /* @__PURE__ */ c("div", { className: "text-right", children: /* @__PURE__ */ f("p", { className: "text-3xl lg:text-4xl font-light text-[#8B7355]", children: [
                              /* @__PURE__ */ c("span", { className: "text-lg lg:text-xl mr-1 opacity-60", children: "CHF" }),
                              h.price
                            ] }) }),
                            h.bookingUrl && /* @__PURE__ */ c(
                              "a",
                              {
                                href: h.bookingUrl,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "hidden sm:inline-flex items-center justify-center px-8 py-3 bg-[#8B7355] text-[#FAF7F2] text-[0.625rem] tracking-[0.15em] uppercase rounded-full hover:bg-[#6B5540] transition-all duration-500 shadow-lg hover:shadow-[0_10px_20px_rgba(139,115,85,0.2)]",
                                children: e("treatments.cta.direct")
                              }
                            )
                          ] })
                        ] }),
                        h.bookingUrl && /* @__PURE__ */ c("div", { className: "sm:hidden px-8 pb-8", children: /* @__PURE__ */ c(
                          "a",
                          {
                            href: h.bookingUrl,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "w-full flex items-center justify-center px-8 py-4 bg-[#8B7355] text-[#FAF7F2] text-[0.625rem] tracking-[0.15em] uppercase rounded-full",
                            children: e("treatments.cta.direct")
                          }
                        ) })
                      ]
                    },
                    m
                  ))
                }
              )
            ] }, d)) })
          ]
        },
        o.id
      )),
      /* @__PURE__ */ f(
        A.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          transition: { delay: 0.5, duration: 1 },
          viewport: { once: !0 },
          className: "pt-24 border-t border-[#8B7355]/30",
          children: [
            /* @__PURE__ */ f("div", { className: "text-center mb-16 lg:mb-24", children: [
              /* @__PURE__ */ c("h2", { className: "text-4xl lg:text-6xl text-[#4A3F35] mb-8 tracking-tight font-serif", children: e("treatments.combos.title") }),
              /* @__PURE__ */ c("div", { className: "w-24 h-0.5 bg-[#8B7355]/30 mx-auto" })
            ] }),
            /* @__PURE__ */ f("div", { className: "p-12 lg:p-20 bg-[#E8DDD0]/40 rounded-[3rem] shadow-2xl relative overflow-hidden group", children: [
              /* @__PURE__ */ c(
                A.img,
                {
                  src: ne,
                  alt: "",
                  className: "absolute -left-10 -bottom-10 w-64 opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]"
                }
              ),
              /* @__PURE__ */ c("p", { className: "text-xl lg:text-2xl text-[#7A6F65] leading-relaxed mb-12 text-center font-sans italic relative z-10", children: e("treatments.combos.subtitle") }),
              /* @__PURE__ */ c("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 relative z-10", children: [
                e("treatments.combos.mani.pedi"),
                e("treatments.combos.lashes"),
                e("treatments.combos.peeling"),
                e("treatments.combos.fullbody")
              ].map((o, l) => /* @__PURE__ */ c(
                "div",
                {
                  className: "py-6 px-8 bg-white/60 backdrop-blur-sm rounded-full text-center text-[#4A3F35] hover:bg-white hover:shadow-xl transition-all duration-500 font-sans tracking-wide",
                  children: o
                },
                l
              )) }),
              /* @__PURE__ */ c("p", { className: "text-sm lg:text-base text-[#8B7355] text-center tracking-widest uppercase font-sans font-medium relative z-10", children: e("treatments.combos.note") })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ f("section", { className: "py-32 lg:py-64 px-6 lg:px-12 bg-gradient-to-b from-[#FAF7F2] to-[#E8DDD0]/30 relative overflow-hidden", children: [
      /* @__PURE__ */ c(
        A.img,
        {
          src: ne,
          alt: "",
          className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] opacity-[0.02] select-none pointer-events-none"
        }
      ),
      /* @__PURE__ */ c("div", { className: "max-w-5xl mx-auto text-center relative z-10", children: /* @__PURE__ */ f(
        A.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          viewport: { once: !0 },
          children: [
            /* @__PURE__ */ c("h2", { className: "text-4xl lg:text-7xl mb-10 text-[#4A3F35] tracking-tight font-serif leading-tight", children: e("treatments.cta.title") }),
            /* @__PURE__ */ c("p", { className: "text-lg lg:text-2xl text-[#7A6F65] leading-relaxed mb-16 max-w-3xl mx-auto font-sans", children: e("treatments.cta.subtitle") }),
            /* @__PURE__ */ f("div", { className: "flex flex-col sm:flex-row gap-8 justify-center items-center", children: [
              /* @__PURE__ */ c(
                "a",
                {
                  href: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/all-offer?share=true&pId=2775917",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center px-14 py-6 bg-[#8B7355] text-[#FAF7F2] text-[0.8125rem] tracking-[0.15em] uppercase rounded-full hover:bg-[#6B5540] transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(139,115,85,0.3)] hover:scale-105 active:scale-95",
                  children: e("nav.book")
                }
              ),
              /* @__PURE__ */ c(
                "a",
                {
                  href: `https://wa.me/41782111503?text=${encodeURIComponent(e("whatsapp.message"))}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center px-14 py-6 border-2 border-[#25D366] text-[#25D366] text-[0.8125rem] tracking-[0.15em] uppercase rounded-full hover:bg-[#25D366] hover:text-white transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(37,211,102,0.15)] active:scale-95",
                  children: e("treatments.cta.whatsapp")
                }
              )
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
const oe = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
}, xt = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
function _m() {
  const { t: e } = ve();
  return /* @__PURE__ */ f("div", { className: "pt-20 lg:pt-24", children: [
    /* @__PURE__ */ f("section", { className: "py-24 lg:py-40 px-6 lg:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE7] to-[#E8DDD0]/20 relative overflow-hidden", children: [
      /* @__PURE__ */ c(
        A.img,
        {
          src: ne,
          alt: "",
          className: "absolute -left-20 top-20 w-[40vw] opacity-[0.03] select-none pointer-events-none rotate-12"
        }
      ),
      /* @__PURE__ */ f(
        A.div,
        {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          className: "max-w-5xl mx-auto text-center relative z-10",
          children: [
            /* @__PURE__ */ c("h1", { className: "text-5xl md:text-7xl lg:text-8xl mb-10 text-[#4A3F35] tracking-tight font-serif leading-tight", children: e("about.header.title") }),
            /* @__PURE__ */ c("p", { className: "text-lg lg:text-2xl text-[#7A6F65] leading-relaxed max-w-3xl mx-auto font-sans", children: e("about.header.subtitle") })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c("section", { className: "py-32 lg:py-56 px-6 lg:px-12", children: /* @__PURE__ */ c("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ f(
      A.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8 },
        viewport: { once: !0, margin: "-100px" },
        className: "grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center",
        children: [
          /* @__PURE__ */ c(
            A.div,
            {
              initial: { opacity: 0, x: -40 },
              whileInView: { opacity: 1, x: 0 },
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              viewport: { once: !0 },
              className: "lg:col-span-6 order-1",
              children: /* @__PURE__ */ c("div", { className: "aspect-[4/5] bg-[#D4C4B0] overflow-hidden rounded-[2.5rem] shadow-3xl group", children: /* @__PURE__ */ c(
                Xr,
                {
                  src: "https://images.unsplash.com/photo-1651841689044-00521ab0fa66?q=80&w=1200&auto=format&fit=crop",
                  alt: "MERA Studio Interior",
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
                }
              ) })
            }
          ),
          /* @__PURE__ */ f(
            A.div,
            {
              initial: "initial",
              whileInView: "animate",
              variants: xt,
              viewport: { once: !0 },
              className: "lg:col-span-6 order-2 space-y-8 text-[#7A6F65] leading-relaxed font-sans",
              children: [
                /* @__PURE__ */ c(A.h2, { variants: oe, className: "text-4xl lg:text-6xl text-[#4A3F35] mb-10 tracking-tight font-serif leading-tight", children: e("about.story.title") }),
                /* @__PURE__ */ c(A.p, { variants: oe, className: "text-lg lg:text-xl", children: e("about.story.text1") }),
                /* @__PURE__ */ c(A.p, { variants: oe, className: "text-lg lg:text-xl", children: e("about.story.text2") }),
                /* @__PURE__ */ c(A.p, { variants: oe, className: "text-lg lg:text-xl", children: e("about.story.text3") })
              ]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ f("section", { className: "py-32 lg:py-56 px-6 lg:px-12 bg-[#E8DDD0]/30 relative overflow-hidden", children: [
      /* @__PURE__ */ f(
        A.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          viewport: { once: !0 },
          className: "max-w-6xl mx-auto text-center mb-24 relative z-10",
          children: [
            /* @__PURE__ */ c("h2", { className: "text-4xl lg:text-6xl mb-10 text-[#4A3F35] tracking-tight font-serif", children: e("about.name.title") }),
            /* @__PURE__ */ c("p", { className: "text-lg lg:text-2xl text-[#7A6F65] leading-relaxed max-w-3xl mx-auto", children: e("about.name.intro") })
          ]
        }
      ),
      /* @__PURE__ */ f(
        A.div,
        {
          initial: "initial",
          whileInView: "animate",
          variants: xt,
          viewport: { once: !0 },
          className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 relative z-10",
          children: [
            /* @__PURE__ */ f(A.div, { variants: oe, className: "p-12 lg:p-16 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/20 hover:bg-white/60 transition-all duration-700 shadow-2xl group", children: [
              /* @__PURE__ */ c("h3", { className: "text-3xl lg:text-4xl mb-6 text-[#4A3F35] font-serif group-hover:text-[#8B7355] transition-colors", children: e("about.name.independence.title") }),
              /* @__PURE__ */ c("p", { className: "text-lg text-[#7A6F65] leading-relaxed", children: e("about.name.independence.text") })
            ] }),
            /* @__PURE__ */ f(A.div, { variants: oe, className: "p-12 lg:p-16 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/20 hover:bg-white/60 transition-all duration-700 shadow-2xl group", children: [
              /* @__PURE__ */ c("h3", { className: "text-3xl lg:text-4xl mb-6 text-[#4A3F35] font-serif group-hover:text-[#8B7355] transition-colors", children: e("about.name.newday.title") }),
              /* @__PURE__ */ c("p", { className: "text-lg text-[#7A6F65] leading-relaxed", children: e("about.name.newday.text") })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ c("section", { className: "py-32 lg:py-56 px-6 lg:px-12", children: /* @__PURE__ */ c("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ f(
      A.div,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.8 },
        viewport: { once: !0 },
        className: "grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center",
        children: [
          /* @__PURE__ */ c(
            A.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              viewport: { once: !0 },
              className: "lg:col-span-5",
              children: /* @__PURE__ */ c("div", { className: "aspect-square bg-[#2C2C2C] overflow-hidden rounded-[2.5rem] shadow-3xl", children: /* @__PURE__ */ c(
                "img",
                {
                  src: Zr,
                  alt: "Viviane Rovito - MERA Cosmetics",
                  className: "w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]"
                }
              ) })
            }
          ),
          /* @__PURE__ */ c(
            A.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.2 },
              viewport: { once: !0 },
              className: "lg:col-span-7",
              children: /* @__PURE__ */ f("div", { className: "p-12 lg:p-16 bg-[#E8DDD0]/40 rounded-[2.5rem] shadow-2xl relative overflow-hidden group", children: [
                /* @__PURE__ */ c(
                  A.img,
                  {
                    src: ne,
                    alt: "",
                    className: "absolute -right-10 -bottom-10 w-48 opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]"
                  }
                ),
                /* @__PURE__ */ c("h2", { className: "text-5xl lg:text-8xl text-[#4A3F35] mb-12 tracking-tighter font-serif italic leading-[0.8]", children: "Viviane Rovito" }),
                /* @__PURE__ */ c("p", { className: "text-lg lg:text-2xl text-[#7A6F65] leading-relaxed mb-8 italic", children: e("about.person.intro") }),
                /* @__PURE__ */ c("p", { className: "text-lg text-[#7A6F65] leading-relaxed mb-8", children: e("about.person.text") }),
                /* @__PURE__ */ c("p", { className: "text-sm lg:text-base text-[#8B7355] mb-12 tracking-widest uppercase font-sans", children: e("about.person.languages") }),
                /* @__PURE__ */ c("div", { className: "text-center lg:text-left", children: /* @__PURE__ */ c(
                  H,
                  {
                    to: "/kontakt",
                    className: "inline-block px-14 py-6 bg-[#8B7355] text-[#FAF7F2] text-[0.8125rem] tracking-[0.15em] uppercase rounded-full hover:bg-[#6B5540] transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(139,115,85,0.2)] hover:scale-105 active:scale-95",
                    children: e("about.person.cta")
                  }
                ) })
              ] })
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ c("section", { className: "py-32 lg:py-56 px-6 lg:px-12 bg-[#E8DDD0]/20", children: /* @__PURE__ */ f("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ c(
        A.h2,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7 },
          viewport: { once: !0 },
          className: "text-4xl lg:text-7xl mb-24 text-center text-[#4A3F35] tracking-tight font-serif",
          children: e("about.values.title")
        }
      ),
      /* @__PURE__ */ c(
        A.div,
        {
          initial: "initial",
          whileInView: "animate",
          variants: xt,
          viewport: { once: !0 },
          className: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12",
          children: [
            { title: e("about.values.respect"), description: e("about.values.respect.text") },
            { title: e("about.values.honesty"), description: e("about.values.honesty.text") },
            { title: e("about.values.trust"), description: e("about.values.trust.text") },
            { title: e("about.values.humanity"), description: e("about.values.humanity.text") },
            { title: e("about.values.qualityovermass"), description: e("about.values.qualityovermass.text") }
          ].map((t, n) => /* @__PURE__ */ f(
            A.div,
            {
              variants: oe,
              className: "p-12 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/20 hover:bg-white/60 hover:shadow-2xl transition-all duration-700 group",
              children: [
                /* @__PURE__ */ c("h3", { className: "text-2xl lg:text-3xl mb-5 text-[#4A3F35] font-serif group-hover:text-[#8B7355] transition-colors", children: t.title }),
                /* @__PURE__ */ c("p", { className: "text-lg text-[#7A6F65] leading-relaxed", children: t.description })
              ]
            },
            n
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ f("section", { className: "py-32 lg:py-64 px-6 lg:px-12 bg-gradient-to-b from-[#E8DDD0]/30 to-[#FAF7F2] relative overflow-hidden", children: [
      /* @__PURE__ */ c(
        A.img,
        {
          src: ne,
          alt: "",
          className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] opacity-[0.02] select-none pointer-events-none"
        }
      ),
      /* @__PURE__ */ f("div", { className: "max-w-5xl mx-auto text-center relative z-10", children: [
        /* @__PURE__ */ c(
          A.p,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.7 },
            viewport: { once: !0 },
            className: "text-xl lg:text-3xl text-[#7A6F65] leading-relaxed mb-16 font-sans italic",
            children: e("about.cta.question")
          }
        ),
        /* @__PURE__ */ f(
          A.div,
          {
            initial: "initial",
            whileInView: "animate",
            variants: xt,
            viewport: { once: !0 },
            className: "flex flex-col sm:flex-row gap-8 justify-center items-center",
            children: [
              /* @__PURE__ */ c(A.div, { variants: oe, children: /* @__PURE__ */ c(
                H,
                {
                  to: "/behandlungen",
                  className: "inline-flex items-center justify-center px-14 py-6 border-2 border-[#8B7355] text-[#8B7355] text-[0.8125rem] tracking-[0.15em] uppercase rounded-full hover:bg-[#8B7355] hover:text-[#FAF7F2] transition-all duration-500 shadow-xl",
                  children: e("about.cta.treatments")
                }
              ) }),
              /* @__PURE__ */ c(A.div, { variants: oe, children: /* @__PURE__ */ c(
                "a",
                {
                  href: "https://www.fresha.com/book-now/mera-cosmetics-lmbz7fto/all-offer?share=true&pId=2775917",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center px-14 py-6 bg-[#8B7355] text-[#FAF7F2] text-[0.8125rem] tracking-[0.15em] uppercase rounded-full hover:bg-[#6B5540] transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(139,115,85,0.3)] hover:scale-105",
                  children: e("nav.book")
                }
              ) })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function Hm() {
  const { t: e } = ve(), t = "+41782111503", n = encodeURIComponent(e("whatsapp.message"));
  return /* @__PURE__ */ f("div", { className: "pt-20 lg:pt-32 min-h-screen bg-[#FAF7F2]", children: [
    /* @__PURE__ */ f("section", { className: "relative px-6 lg:px-12 pt-16 sm:pt-24 pb-24 lg:pb-32 overflow-hidden", children: [
      /* @__PURE__ */ c(
        A.div,
        {
          initial: { opacity: 0, scale: 1.1 },
          animate: { opacity: 0.04, scale: 1 },
          transition: { duration: 2.5, ease: "easeOut" },
          className: "absolute right-[-20%] sm:right-[-10%] top-[-5%] w-[80vw] sm:w-[60vw] pointer-events-none select-none",
          children: /* @__PURE__ */ c("img", { src: ne, alt: "", className: "w-full rotate-12" })
        }
      ),
      /* @__PURE__ */ c("div", { className: "max-w-7xl mx-auto relative z-10", children: /* @__PURE__ */ f(
        A.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          children: [
            /* @__PURE__ */ c("span", { className: "block text-[0.625rem] tracking-[0.5em] uppercase mb-6 sm:mb-8 text-[#8B7355] font-medium", children: e("contact.subtitle") }),
            /* @__PURE__ */ f("h1", { className: "text-5xl sm:text-8xl lg:text-[10rem] leading-[0.9] text-[#4A3F35] tracking-tighter font-serif", children: [
              e("contact.title"),
              /* @__PURE__ */ c("span", { className: "block italic text-[0.4em] tracking-normal mt-2 sm:mt-4 opacity-40 font-serif", children: "by Viviane" })
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ c("section", { className: "px-6 lg:px-12 pb-32", children: /* @__PURE__ */ c("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ f("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start", children: [
      /* @__PURE__ */ f("div", { className: "lg:col-span-5 space-y-16 lg:space-y-24", children: [
        /* @__PURE__ */ f(
          A.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
            viewport: { once: !0 },
            className: "space-y-8",
            children: [
              /* @__PURE__ */ f("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ c("div", { className: "h-[1px] w-8 bg-[#8B7355]/30" }),
                /* @__PURE__ */ c("h2", { className: "text-[0.625rem] tracking-[0.4em] uppercase text-[#8B7355] font-medium", children: e("contact.studio.tag") })
              ] }),
              /* @__PURE__ */ f("div", { className: "pl-0 sm:pl-14 lg:pl-18", children: [
                /* @__PURE__ */ c("h3", { className: "text-2xl sm:text-3xl font-serif italic text-[#4A3F35] mb-4", children: e("contact.studio.name") }),
                /* @__PURE__ */ f("div", { className: "space-y-1 text-lg text-[#7A6F65] font-serif leading-relaxed opacity-80", children: [
                  /* @__PURE__ */ c("p", { children: e("contact.studio.address1") }),
                  /* @__PURE__ */ c("p", { children: e("contact.studio.address2") }),
                  /* @__PURE__ */ c("p", { children: e("contact.studio.address3") })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ c(
          A.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.1 },
            viewport: { once: !0 },
            className: "rounded-[2.5rem] overflow-hidden border border-[#4A3F35]/5 shadow-sm grayscale hover:grayscale-0 transition-all duration-1000 aspect-video lg:aspect-square max-h-[400px]",
            children: /* @__PURE__ */ c(
              "iframe",
              {
                src: "https://www.google.com/maps?q=MERA%20Cosmetics%20by%20Viviane%20Rovito%20Staffelackerstrasse%2011%20Dietikon&output=embed",
                width: "100%",
                height: "100%",
                style: { border: 0 },
                allowFullScreen: !0,
                loading: "lazy",
                referrerPolicy: "no-referrer-when-downgrade",
                title: "MERA Cosmetics Location"
              }
            )
          }
        ),
        /* @__PURE__ */ f(
          A.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.2 },
            viewport: { once: !0 },
            className: "bg-white/40 border border-[#8B7355]/5 backdrop-blur-sm p-8 sm:p-12 rounded-[2.5rem] group hover:bg-white/60 transition-colors duration-700",
            children: [
              /* @__PURE__ */ c("h2", { className: "text-[0.625rem] tracking-[0.4em] uppercase text-[#8B7355] font-medium mb-8", children: e("contact.hours.title") }),
              /* @__PURE__ */ c("div", { className: "space-y-6", children: [
                { label: e("contact.hours.weekday"), time: e("contact.hours.weekday.time") },
                { label: e("contact.hours.saturday"), time: e("contact.hours.saturday.time") },
                { label: e("contact.hours.sunday"), time: e("contact.hours.sunday.time"), italic: !0 }
              ].map((i, s) => /* @__PURE__ */ f("div", { className: "flex justify-between items-center group/item gap-4", children: [
                /* @__PURE__ */ c("span", { className: "text-sm sm:text-base text-[#7A6F65] group-hover/item:text-[#4A3F35] transition-colors font-serif italic", children: i.label }),
                /* @__PURE__ */ c("span", { className: `text-sm sm:text-base text-[#4A3F35] font-medium text-right ${i.italic ? "italic opacity-50" : ""}`, children: i.time })
              ] }, s)) }),
              /* @__PURE__ */ c("div", { className: "mt-10 pt-8 border-t border-[#8B7355]/10", children: /* @__PURE__ */ c("p", { className: "text-xs sm:text-sm text-[#8B7355] leading-relaxed font-serif italic", children: e("contact.hours.note") }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ c("div", { className: "lg:col-span-7 lg:pl-12 space-y-12", children: /* @__PURE__ */ f(
        A.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          transition: { duration: 1, delay: 0.2 },
          viewport: { once: !0 },
          children: [
            /* @__PURE__ */ f("div", { className: "flex items-center gap-6 mb-12 sm:mb-16", children: [
              /* @__PURE__ */ c("h2", { className: "text-[0.625rem] tracking-[0.4em] uppercase text-[#8B7355] font-medium", children: e("contact.connect.tag") }),
              /* @__PURE__ */ c("div", { className: "h-[1px] flex-grow bg-[#8B7355]/10" })
            ] }),
            /* @__PURE__ */ f("div", { className: "space-y-4", children: [
              /* @__PURE__ */ f(
                "a",
                {
                  href: `https://wa.me/${t}?text=${n}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group flex items-center justify-between p-6 sm:p-10 bg-[#8B7355] rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1",
                  children: [
                    /* @__PURE__ */ f("div", { className: "relative z-10", children: [
                      /* @__PURE__ */ c("span", { className: "block text-[0.5rem] tracking-[0.4em] uppercase font-medium text-white/50 mb-2", children: e("contact.connect.whatsapp.tag") }),
                      /* @__PURE__ */ c("h3", { className: "text-2xl sm:text-4xl font-serif italic text-white leading-none", children: "WhatsApp" })
                    ] }),
                    /* @__PURE__ */ c("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#8B7355] transition-all duration-500", children: /* @__PURE__ */ c("span", { className: "text-xl sm:text-2xl text-white group-hover:text-[#8B7355]", children: "→" }) })
                  ]
                }
              ),
              /* @__PURE__ */ f(
                "a",
                {
                  href: `mailto:${e("contact.email")}`,
                  className: "group flex items-center justify-between p-6 sm:p-10 bg-white border border-[#8B7355]/10 rounded-[2rem] transition-all duration-500 hover:shadow-lg hover:-translate-y-1",
                  children: [
                    /* @__PURE__ */ f("div", { children: [
                      /* @__PURE__ */ c("span", { className: "block text-[0.5rem] tracking-[0.4em] uppercase font-medium text-[#8B7355]/40 mb-2", children: e("contact.connect.email.tag") }),
                      /* @__PURE__ */ c("h3", { className: "text-2xl sm:text-4xl font-serif italic text-[#4A3F35] leading-none", children: "E-Mail" })
                    ] }),
                    /* @__PURE__ */ c("div", { className: "w-10 h-10 sm:w-12 sm:h-12 border border-[#8B7355]/10 rounded-full flex items-center justify-center group-hover:border-[#8B7355] transition-all duration-500", children: /* @__PURE__ */ c("span", { className: "text-xl sm:text-2xl text-[#8B7355]/30 group-hover:text-[#8B7355]", children: "→" }) })
                  ]
                }
              ),
              /* @__PURE__ */ f(
                "a",
                {
                  href: `tel:${e("contact.phone")}`,
                  className: "group flex items-center justify-between p-5 sm:p-8 bg-[#E8DDD0]/30 rounded-[1.5rem] transition-all duration-500 hover:bg-[#E8DDD0]/50",
                  children: [
                    /* @__PURE__ */ f("div", { children: [
                      /* @__PURE__ */ c("span", { className: "block text-[0.5rem] tracking-[0.4em] uppercase font-medium text-[#8B7355]/40 mb-1", children: e("contact.connect.voice.tag") }),
                      /* @__PURE__ */ c("h3", { className: "text-xl sm:text-2xl font-serif italic text-[#4A3F35] leading-none", children: e("contact.phone") })
                    ] }),
                    /* @__PURE__ */ c("span", { className: "text-lg text-[#8B7355]/20 group-hover:text-[#8B7355] transition-colors duration-500", children: "→" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ f("div", { className: "pt-16 sm:pt-24 space-y-12", children: [
              /* @__PURE__ */ f("div", { className: "space-y-4", children: [
                /* @__PURE__ */ c("p", { className: "text-sm text-[#7A6F65] leading-relaxed max-w-sm font-serif italic opacity-80", children: e("contact.booking.text") }),
                /* @__PURE__ */ c("p", { className: "text-[0.625rem] text-[#8B7355] font-medium tracking-[0.2em] uppercase", children: e("common.discount.students") }),
                /* @__PURE__ */ c("p", { className: "text-[0.625rem] text-[#8B7355] font-medium tracking-[0.2em] uppercase", children: e("common.discount.referral") }),
                /* @__PURE__ */ c("p", { className: "text-[0.625rem] text-[#8B7355] font-medium tracking-[0.2em] uppercase", children: e("contact.booking.languages") })
              ] }),
              /* @__PURE__ */ c("div", { className: "flex flex-wrap gap-x-10 sm:gap-x-16 gap-y-6 border-t border-[#4A3F35]/5 pt-12", children: [
                { name: e("contact.social.instagram"), url: "https://www.instagram.com/mera.cosmetics.zh/" },
                { name: e("contact.social.tiktok"), url: "https://www.tiktok.com/@mera.cosmetics.zh?lang=de-DE" },
                { name: e("contact.social.facebook"), url: "https://www.facebook.com/profile.php?id=61586948390288" }
              ].map((i) => /* @__PURE__ */ f(
                "a",
                {
                  href: i.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group relative overflow-hidden inline-block py-1",
                  children: [
                    /* @__PURE__ */ c("span", { className: "text-lg sm:text-xl font-serif italic text-[#4A3F35] transition-transform duration-500 block group-hover:-translate-y-full leading-none", children: i.name }),
                    /* @__PURE__ */ c("span", { className: "text-sm sm:text-base font-serif italic text-[#8B7355] transition-transform duration-700 absolute top-0 left-0 translate-y-full group-hover:translate-y-0 leading-none opacity-0 group-hover:opacity-100", children: i.name })
                  ]
                },
                i.name
              )) })
            ] })
          ]
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ f("section", { className: "py-12 border-t border-[#4A3F35]/5 flex justify-center items-center opacity-10", children: [
      /* @__PURE__ */ c("div", { className: "h-[1px] w-12 bg-[#8B7355]" }),
      /* @__PURE__ */ c("img", { src: ne, alt: "", className: "h-8 px-8" }),
      /* @__PURE__ */ c("div", { className: "h-[1px] w-12 bg-[#8B7355]" })
    ] })
  ] });
}
function Km() {
  const { language: e } = ve(), s = e === "de" ? {
    title: "Rechtliches",
    imprintTitle: "Impressum",
    privacyTitle: "Datenschutz",
    termsTitle: "Nutzungsbedingungen"
  } : e === "en" ? {
    title: "Legal",
    imprintTitle: "Imprint",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Use"
  } : {
    title: "Legal",
    imprintTitle: "Imprint",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Use"
  };
  return /* @__PURE__ */ f("div", { className: "pt-20 lg:pt-24", children: [
    /* @__PURE__ */ c("section", { className: "py-16 lg:py-24 px-6 lg:px-12 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE7] to-[#E8DDD0]/20", children: /* @__PURE__ */ c(
      A.div,
      {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        className: "max-w-5xl mx-auto text-center",
        children: /* @__PURE__ */ c("h1", { className: "text-4xl md:text-5xl lg:text-6xl text-[#4A3F35] tracking-tight", children: s.title })
      }
    ) }),
    /* @__PURE__ */ c("section", { className: "py-20 lg:py-32 px-6 lg:px-12", children: /* @__PURE__ */ f("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ c("h2", { className: "text-3xl lg:text-4xl mb-12 pb-6 border-b-2 border-[#C8A882]/30 text-[#4A3F35] tracking-tight", children: s.imprintTitle }),
      e === "de" ? /* @__PURE__ */ f("div", { className: "space-y-10 text-[#7A6F65] leading-relaxed", children: [
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Anbieterin dieser Website" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "MERA Cosmetics by Viviane Rovito" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Verantwortliche Person" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Viviane Rovito" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Adresse" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Staffelackerstrasse 11" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "8953 Dietikon" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Schweiz" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Kontakt" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "E-Mail: info@meracosmetics.ch" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Telefon: +41 78 211 15 03" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Rechtsform" }),
          /* @__PURE__ */ c("p", { children: "Einzelunternehmen" })
        ] }),
        /* @__PURE__ */ f("div", { className: "pt-6 border-t border-[#4A3F35]/10", children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Urheberrecht und Inhaltsnutzung" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "Sämtliche Inhalte dieser Website, insbesondere Texte, Konzepte, Struktur, Layout, Design, Fotos, Videos, Grafiken und sonstige Dateien, sind urheberrechtlich geschützt." }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "Ohne vorherige ausdrückliche schriftliche Zustimmung von MERA Cosmetics by Viviane Rovito ist untersagt:" }),
          /* @__PURE__ */ f("ul", { className: "list-disc pl-6 space-y-2 mb-4", children: [
            /* @__PURE__ */ c("li", { children: "das Kopieren, Vervielfältigen, Verbreiten oder öffentliche Zugänglichmachen von Inhalten," }),
            /* @__PURE__ */ c("li", { children: "die Nutzung von Texten, Bildern, Videos, Layouts oder Design-Elementen für eigene Websites, Social Media, Werbung, Marketing, Schulungen, Präsentationen oder sonstige kommerzielle Zwecke," }),
            /* @__PURE__ */ c("li", { children: "das Ableiten, Umgestalten oder Weiterverwenden (auch auszugsweise) der Inhalte, insbesondere zu Marketing- oder Eigenzwecken." })
          ] })
        ] }),
        /* @__PURE__ */ f("div", { className: "pt-6 border-t border-[#4A3F35]/10", children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Hinweis zum Standort" }),
          /* @__PURE__ */ c("p", { className: "text-sm italic", children: "Das Studio wird räumlich geteilt. Die Unternehmen sind rechtlich und wirtschaftlich unabhängig voneinander." })
        ] })
      ] }) : /* @__PURE__ */ f("div", { className: "space-y-10 text-[#7A6F65] leading-relaxed", children: [
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Provider of this website" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "MERA Cosmetics by Viviane Rovito" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Responsible person" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Viviane Rovito" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Address" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Staffelackerstrasse 11" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "8953 Dietikon" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Switzerland" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Contact" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Email: info@meracosmetics.ch" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Phone: +41 78 211 15 03" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-lg mb-4 font-medium", children: "Legal form" }),
          /* @__PURE__ */ c("p", { children: "Sole proprietorship" })
        ] }),
        /* @__PURE__ */ f("div", { className: "pt-6 border-t border-[#4A3F35]/10", children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Copyright and content usage" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "All content on this website, including texts, concepts, structure, layout, design, photos, videos, graphics and other files, is protected by copyright." }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "Without prior express written consent from MERA Cosmetics by Viviane Rovito, the following is prohibited:" }),
          /* @__PURE__ */ f("ul", { className: "list-disc pl-6 space-y-2 mb-4", children: [
            /* @__PURE__ */ c("li", { children: "copying, reproducing, distributing or making content publicly accessible," }),
            /* @__PURE__ */ c("li", { children: "using texts, images, videos, layouts or design elements for own websites, social media, advertising, marketing, training, presentations or other commercial purposes," }),
            /* @__PURE__ */ c("li", { children: "deriving, transforming or reusing (even in excerpts) the content, especially for marketing or own purposes." })
          ] })
        ] }),
        /* @__PURE__ */ f("div", { className: "pt-6 border-t border-[#4A3F35]/10", children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Studio note" }),
          /* @__PURE__ */ c("p", { className: "text-sm italic", children: "The studio is spatially shared. However, the businesses are legally and economically independent." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ c("section", { className: "py-20 lg:py-32 px-6 lg:px-12 bg-[#E8DDD0]/20", children: /* @__PURE__ */ f("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ c("h2", { className: "text-3xl lg:text-4xl mb-12 pb-6 border-b-2 border-[#C8A882]/30 text-[#4A3F35] tracking-tight", children: s.privacyTitle }),
      e === "de" ? /* @__PURE__ */ f("div", { className: "space-y-10 text-[#7A6F65] leading-relaxed", children: [
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Verantwortliche Stelle" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "Verantwortlich für die Bearbeitung personenbezogener Daten im Sinne des Schweizer Datenschutzgesetzes (DSG) ist:" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "MERA Cosmetics by Viviane Rovito" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Staffelackerstrasse 11" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "8953 Dietikon" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Schweiz" }),
          /* @__PURE__ */ c("p", { className: "mt-3 mb-1", children: "E-Mail: info@meracosmetics.ch" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Telefon: +41 78 211 15 03" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Grundsatz" }),
          /* @__PURE__ */ c("p", { children: "Der Schutz deiner personenbezogenen Daten ist wichtig. Personenbezogene Daten werden vertraulich behandelt und nur so bearbeitet, wie es zur Bereitstellung der Website, zur Kommunikation, zur Terminorganisation und zur Verbesserung der Nutzererfahrung erforderlich ist. Es gelten die Bestimmungen des Schweizer DSG." })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Deine Rechte" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "Du hast im Rahmen des DSG grundsätzlich folgende Rechte:" }),
          /* @__PURE__ */ f("ul", { className: "list-disc pl-6 space-y-1 mb-4", children: [
            /* @__PURE__ */ c("li", { children: "Auskunft über deine gespeicherten Daten" }),
            /* @__PURE__ */ c("li", { children: "Berichtigung unrichtiger Daten" }),
            /* @__PURE__ */ c("li", { children: "Löschung, soweit keine Aufbewahrungspflichten entgegenstehen" }),
            /* @__PURE__ */ c("li", { children: "Widerspruch gegen bestimmte Bearbeitungen, soweit zulässig" }),
            /* @__PURE__ */ c("li", { children: "Widerruf einer Einwilligung (mit Wirkung für die Zukunft)" })
          ] }),
          /* @__PURE__ */ c("p", { children: "Anfragen bitte an: info@meracosmetics.ch" })
        ] }),
        /* @__PURE__ */ c("div", { className: "pt-10 border-t border-[#4A3F35]/10", children: /* @__PURE__ */ c("p", { className: "text-sm text-[#8B7355] italic", children: "Stand: Januar 2026. Diese Datenschutzerklärung kann angepasst werden, wenn sich Prozesse, Tools oder gesetzliche Anforderungen ändern." }) })
      ] }) : /* @__PURE__ */ f("div", { className: "space-y-10 text-[#7A6F65] leading-relaxed", children: [
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Responsible entity" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "Responsible for the processing of personal data within the meaning of the Swiss Data Protection Act (DSG):" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "MERA Cosmetics by Viviane Rovito" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Staffelackerstrasse 11" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "8953 Dietikon" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Switzerland" }),
          /* @__PURE__ */ c("p", { className: "mt-3 mb-1", children: "Email: info@meracosmetics.ch" }),
          /* @__PURE__ */ c("p", { className: "mb-1", children: "Phone: +41 78 211 15 03" })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Principle" }),
          /* @__PURE__ */ c("p", { children: "The protection of your personal data is important. Personal data is treated confidentially and only processed as necessary for providing the website, communication, appointment organization and improving user experience. The provisions of the Swiss DSG apply." })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "What data is processed" }),
          /* @__PURE__ */ c("h4", { className: "text-[#4A3F35] text-lg mb-3 font-medium", children: "Contact data" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "When you contact us (email, phone, WhatsApp, contact form), the following data may be processed:" }),
          /* @__PURE__ */ f("ul", { className: "list-disc pl-6 space-y-1 mb-6", children: [
            /* @__PURE__ */ c("li", { children: "First and last name (if provided)" }),
            /* @__PURE__ */ c("li", { children: "Email address and/or phone number" }),
            /* @__PURE__ */ c("li", { children: "Content of your message" }),
            /* @__PURE__ */ c("li", { children: "Time of contact" }),
            /* @__PURE__ */ c("li", { children: "Other information you voluntarily provide" })
          ] }),
          /* @__PURE__ */ c("h4", { className: "text-[#4A3F35] text-lg mb-3 font-medium", children: "Technical data during website visit" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "When accessing the website, technical data is automatically logged by the hosting provider:" }),
          /* @__PURE__ */ f("ul", { className: "list-disc pl-6 space-y-1 mb-4", children: [
            /* @__PURE__ */ c("li", { children: "IP address (possibly shortened)" }),
            /* @__PURE__ */ c("li", { children: "Date and time of access" }),
            /* @__PURE__ */ c("li", { children: "Pages/files accessed" }),
            /* @__PURE__ */ c("li", { children: "Browser type and version" }),
            /* @__PURE__ */ c("li", { children: "Operating system" }),
            /* @__PURE__ */ c("li", { children: "Referrer URL" })
          ] }),
          /* @__PURE__ */ c("p", { children: "This data is used for technical provision, stability, security and error analysis." })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Data security" }),
          /* @__PURE__ */ c("p", { children: "Appropriate technical and organizational measures are taken to protect data against loss, manipulation, unauthorized access or disclosure. However, absolute security cannot be guaranteed on the internet." })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Your rights" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "Under the DSG, you generally have the following rights:" }),
          /* @__PURE__ */ f("ul", { className: "list-disc pl-6 space-y-1 mb-4", children: [
            /* @__PURE__ */ c("li", { children: "Information about your stored data" }),
            /* @__PURE__ */ c("li", { children: "Correction of incorrect data" }),
            /* @__PURE__ */ c("li", { children: "Deletion, unless there are retention obligations" }),
            /* @__PURE__ */ c("li", { children: "Objection to certain processing, if permitted" }),
            /* @__PURE__ */ c("li", { children: "Withdrawal of consent (with effect for the future)" })
          ] }),
          /* @__PURE__ */ c("p", { children: "Please contact: info@meracosmetics.ch" })
        ] }),
        /* @__PURE__ */ c("div", { className: "pt-10 border-t border-[#4A3F35]/10", children: /* @__PURE__ */ c("p", { className: "text-sm text-[#8B7355] italic", children: "Status: January 2026. This privacy policy may be updated if processes, tools or legal requirements change." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ c("section", { className: "py-20 lg:py-32 px-6 lg:px-12", children: /* @__PURE__ */ f("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ c("h2", { className: "text-3xl lg:text-4xl mb-12 pb-6 border-b-2 border-[#C8A882]/30 text-[#4A3F35] tracking-tight", children: s.termsTitle }),
      /* @__PURE__ */ c("div", { className: "space-y-10 text-[#7A6F65] leading-relaxed", children: e === "de" ? /* @__PURE__ */ f(an, { children: [
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Zweck der Website" }),
          /* @__PURE__ */ c("p", { children: "Diese Website dient ausschliesslich der Information von Kunden und Interessenten von MERA Cosmetics by Viviane Rovito, sowie der Kontaktaufnahme und Terminorganisation. Jede Nutzung der Website oder ihrer Inhalte für andere Zwecke ist untersagt, sofern nicht ausdrücklich schriftlich genehmigt." })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Änderungsvorbehalt" }),
          /* @__PURE__ */ c("p", { children: "MERA Cosmetics by Viviane Rovito behält sich vor, Inhalte dieser Website sowie diese rechtlichen Hinweise jederzeit ohne Vorankündigung anzupassen, zu ergänzen oder zu entfernen." })
        ] })
      ] }) : /* @__PURE__ */ f(an, { children: [
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Purpose of the website" }),
          /* @__PURE__ */ c("p", { children: "This website serves to provide information to clients and patients of MERA Cosmetics by Viviane Rovito, as well as for communication and appointment organization. Any use of the website or its content for other purposes is prohibited unless expressly approved in writing." })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Cookies and similar technologies" }),
          /* @__PURE__ */ c("p", { children: "The website may use cookies: technically necessary cookies (e.g. for basic functions like language settings) and optional analysis/marketing cookies (only if you actively consent)." })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Third-party providers" }),
          /* @__PURE__ */ c("p", { className: "mb-4", children: "The website contains links and integrations to third-party providers:" }),
          /* @__PURE__ */ f("ul", { className: "list-disc pl-6 space-y-2 mb-4", children: [
            /* @__PURE__ */ c("li", { children: "Social Media: Instagram, TikTok, Facebook (their privacy policies apply)." }),
            /* @__PURE__ */ c("li", { children: "Integrated content: Instagram feeds (data may be shared with the provider)." }),
            /* @__PURE__ */ c("li", { children: "Maps: Integration of map services may transmit data to the provider." }),
            /* @__PURE__ */ c("li", { children: "HubSpot: If used for forms or tracking, data may be processed by HubSpot based on consent." })
          ] })
        ] }),
        /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ c("h3", { className: "text-[#4A3F35] text-xl mb-6 font-medium", children: "Changes" }),
          /* @__PURE__ */ c("p", { children: "MERA Cosmetics by Viviane Rovito reserves the right to adjust, supplement or remove content of this website as well as these legal notices at any time without prior notice." })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Gm() {
  return /* @__PURE__ */ f("div", { className: "min-h-screen bg-[#FAF7F2] text-[#4A3F35]", children: [
    /* @__PURE__ */ c(Vm, {}),
    /* @__PURE__ */ c("main", { children: /* @__PURE__ */ f(el, { children: [
      /* @__PURE__ */ c(Me, { path: "/", element: /* @__PURE__ */ c(Um, {}) }),
      /* @__PURE__ */ c(Me, { path: "/behandlungen", element: /* @__PURE__ */ c(Wm, {}) }),
      /* @__PURE__ */ c(Me, { path: "/uber-mera", element: /* @__PURE__ */ c(_m, {}) }),
      /* @__PURE__ */ c(Me, { path: "/kontakt", element: /* @__PURE__ */ c(Hm, {}) }),
      /* @__PURE__ */ c(Me, { path: "/rechtliches", element: /* @__PURE__ */ c(Km, {}) })
    ] }) }),
    /* @__PURE__ */ c(Im, {}),
    /* @__PURE__ */ c(Lm, {})
  ] });
}
function qm() {
  return ie(() => {
    const e = document.createElement("script");
    e.async = !0, e.src = "https://www.googletagmanager.com/gtag/js?id=G-MQVLH58NQQ", document.head.appendChild(e);
    const t = document.createElement("script");
    t.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MQVLH58NQQ');
    `, document.head.appendChild(t);
  }, []), /* @__PURE__ */ c(Vl, { children: /* @__PURE__ */ f(Tl, { children: [
    /* @__PURE__ */ c(zm, {}),
    /* @__PURE__ */ c(Gm, {})
  ] }) });
}
const Ym = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qm
}, Symbol.toStringTag, { value: "Module" }));
export {
  Jm as Code0_8,
  Zm as __importModule__
};
