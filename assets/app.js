/* Stacey Porter Antiques: shared site script */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page || "";
  const money = (n) => "$" + n.toLocaleString("en-US");
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const catLabel = (k) => (CATEGORIES.find((c) => c.key === k) || {}).label || "";

  /* ---------- safe storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("spa_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("spa_" + k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem("spa_" + k); } catch {} },
  };

  /* ---------- cart ---------- */
  const MAX_QTY = 10;
  const cart = {
    map() {
      let v = store.get("cart", {});
      if (Array.isArray(v)) v = Object.fromEntries(v.map((id) => [id, 1])); // old format
      return Object.fromEntries(Object.entries(v).filter(([id, q]) => byId(id) && q > 0));
    },
    save(m) { store.set("cart", m); updateBadge(); },
    items() { return Object.keys(this.map()); },
    qty(id) { return this.map()[id] || 0; },
    count() { return Object.values(this.map()).reduce((a, b) => a + b, 0); },
    has(id) { return this.qty(id) > 0; },
    add(id, q = 1, quiet = false) {
      const m = this.map(), before = m[id] || 0;
      if (before >= MAX_QTY) { toast(`Maximum of ${MAX_QTY} per item`, "fa-circle-info"); return false; }
      m[id] = Math.min(MAX_QTY, before + q);
      this.save(m);
      if (!quiet) toast(before ? `Cart updated: ${m[id]} in your cart` : `Added ${m[id]} to your cart`, "fa-check", "cart.html", "View cart");
      return true;
    },
    setQty(id, q) { const m = this.map(); m[id] = Math.max(1, Math.min(MAX_QTY, q)); this.save(m); },
    remove(id) { const m = this.map(); delete m[id]; this.save(m); },
    clear() { this.save({}); },
  };
  const user = () => store.get("user", null);

  /* ---------- header ---------- */
  const nav = [
    ["index.html", "Home", "home", "fa-solid fa-house"],
    ["shop.html", "Shop", "shop", "fa-solid fa-store"],
    ["index.html#reviews", "Reviews", "reviews", "fa-regular fa-star"],
    ["index.html#visit", "Visit", "visit", "fa-regular fa-calendar"],
    ["index.html#contact", "Contact", "contact", "fa-regular fa-envelope"],
  ];
  const drawerLink = (href, label, icon, attrs) => {
    const extra = attrs || "";
    const html = `<a href="${href}" ${extra}><span class="drawer-ico"><i class="${icon}"></i></span><span class="drawer-label">${label}</span><i class="fa-solid fa-chevron-right drawer-arrow"></i></a>`;
    return html;
  };
  function header() {
    const u = user();
    const acct = u
      ? `<a href="account.html" role="menuitem"><i class="fa-regular fa-user"></i> My Account</a>
         <a href="orders.html" role="menuitem"><i class="fa-solid fa-receipt"></i> Orders</a>
         <button type="button" data-signout role="menuitem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out</button>`
      : `<a href="account.html" role="menuitem"><i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In</a>
         <a href="account.html#create" role="menuitem"><i class="fa-solid fa-user-plus"></i> Create Account</a>
         <a href="orders.html" role="menuitem"><i class="fa-solid fa-receipt"></i> Orders</a>`;
    const links = nav.map(([h, l, k]) =>
      `<a href="${h}" data-nav="${k}" class="${k === page ? "is-active" : ""}" ${k === page ? 'aria-current="page"' : ""}>${l}</a>`).join("");
    const drawerLinks = nav.map(([h, l, k, ico]) => {
      const isActive = k === page;
      const attrs = `data-nav="${k}" class="${isActive ? "is-active" : ""}" ${isActive ? 'aria-current="page"' : ""}`;
      return drawerLink(h, l, ico, attrs);
    }).join("");
    const drawerAcct = u
      ? drawerLink("account.html", "My Account", "fa-regular fa-user")
      : drawerLink("account.html", "Sign In", "fa-solid fa-arrow-right-to-bracket") + drawerLink("account.html#create", "Create Account", "fa-solid fa-user-plus");
    const drawerMine = drawerLink("cart.html", "Cart", "fa-solid fa-bag-shopping") + drawerAcct + drawerLink("orders.html", "Orders", "fa-solid fa-receipt");
    return `
    <a class="skip" href="#main">Skip to content</a>
    <div class="topbar"><div class="wrap">
      <span><i class="fa-solid fa-location-dot"></i> ${SHOP.location} · Visits by appointment</span>
      <div class="topbar-contact">
        <a href="${SHOP.phoneHref}"><i class="fa-solid fa-phone"></i> ${SHOP.phone}</a>
        <a class="topbar-email" href="mailto:${SHOP.email}"><i class="fa-regular fa-envelope"></i> ${SHOP.email}</a>
      </div>
    </div></div>
    <header class="site-header" id="siteHeader"><div class="wrap head-row">
      <a class="logo" href="index.html" aria-label="Stacey Porter Antiques home">
        <span class="logo-mark">SP</span>
        <span class="logo-text">Stacey Porter<small>Antiques</small></span>
      </a>
      <nav class="main-nav" aria-label="Main">${links}</nav>
      <div class="head-actions">
        <div class="acct">
          <button class="icon-btn" id="acctBtn" aria-haspopup="true" aria-expanded="false" aria-label="Account menu">
            <i class="fa-regular fa-user"></i><span class="hide-sm">${u ? u.name.split(" ")[0] : "Sign In"}</span>
          </button>
          <div class="acct-menu" id="acctMenu" role="menu">${acct}</div>
        </div>
        <a class="icon-btn cart-btn" href="cart.html" aria-label="Cart">
          <i class="fa-solid fa-bag-shopping"></i><span class="hide-sm">Cart</span><span class="badge" id="cartBadge">0</span>
        </a>
        <button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
      </div>
    </div></header>
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer-panel">
        <div class="drawer-head">
          <span class="drawer-title">Menu</span>
          <button class="icon-btn drawer-close" id="drawerClose" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <nav aria-label="Mobile">
          <p class="drawer-section">Browse</p>
          ${drawerLinks}
          <p class="drawer-section">Your account</p>
          ${drawerMine}
        </nav>
        <div class="drawer-contact"><a href="${SHOP.phoneHref}"><i class="fa-solid fa-phone"></i> ${SHOP.phone}</a><a href="mailto:${SHOP.email}"><i class="fa-regular fa-envelope"></i> Email us</a></div>
      </div>
    </div>`;
  }

  function footer() {
    const y = new Date().getFullYear();
    return `
    <footer class="site-footer"><div class="wrap">
      <div class="foot-grid">
        <div>
          <a class="logo logo-light" href="index.html"><span class="logo-mark">SP</span><span class="logo-text">Stacey Porter<small>Antiques</small></span></a>
          <p class="foot-note">One of a kind antique and vintage pieces for the home, garden and wardrobe, hand selected in ${SHOP.location}.</p>
        </div>
        <div><h4>Explore</h4><a href="index.html">Home</a><a href="shop.html">Shop</a><a href="index.html#visit">Visit by appointment</a><a href="index.html#contact">Contact</a></div>
        <div><h4>Your account</h4><a href="account.html">Sign In</a><a href="account.html#create">Create Account</a><a href="orders.html">Orders</a><a href="cart.html">Cart</a></div>
        <div><h4>Get in touch</h4>
          <a href="${SHOP.phoneHref}"><i class="fa-solid fa-phone"></i> ${SHOP.phone}</a>
          <a href="mailto:${SHOP.email}"><i class="fa-regular fa-envelope"></i> ${SHOP.email}</a>
          <span><i class="fa-solid fa-location-dot"></i> ${SHOP.location}</span>
          <a href="${SHOP.chairish}" target="_blank" rel="noopener"><i class="fa-solid fa-store"></i> Our Chairish shop</a>
        </div>
      </div>
      <div class="foot-bottom">
        <p>Copyright © ${y} Stacey Porter Antiques Ltd. All Rights Reserved.</p>
        <p><a href="privacy-policy.html">Privacy Policy</a><a href="terms-and-conditions.html">Terms and Conditions</a></p>
      </div>
    </div></footer>
    <button class="to-top" id="toTop" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>
    <div class="toasts" id="toasts" aria-live="polite"></div>`;
  }

  $("#header-slot").outerHTML = header();
  $("#footer-slot").outerHTML = footer();

  function updateBadge() {
    const n = cart.count(), b = $("#cartBadge");
    if (!b) return;
    b.textContent = n; b.classList.toggle("show", n > 0);
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  }
  updateBadge();

  /* ---------- toast ---------- */
  function toast(msg, icon = "fa-check", href, linkText) {
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<i class="fa-solid ${icon}"></i><span>${msg}</span>${href ? `<a href="${href}">${linkText}</a>` : ""}`;
    $("#toasts").appendChild(t);
    requestAnimationFrame(() => t.classList.add("in"));
    setTimeout(() => { t.classList.remove("in"); setTimeout(() => t.remove(), 400); }, 3200);
  }

  /* ---------- header interactions ---------- */
  const hdr = $("#siteHeader");
  const onScroll = () => {
    hdr.classList.toggle("scrolled", scrollY > 30);
    $("#toTop").classList.toggle("show", scrollY > 700);
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#toTop").onclick = () => scrollTo({ top: 0, behavior: "smooth" });

  const acctBtn = $("#acctBtn"), acctMenu = $("#acctMenu");
  acctBtn.onclick = (e) => { e.stopPropagation(); const o = acctMenu.classList.toggle("open"); acctBtn.setAttribute("aria-expanded", o); };
  document.addEventListener("click", () => { acctMenu.classList.remove("open"); acctBtn.setAttribute("aria-expanded", false); });
  $$("[data-signout]").forEach((b) => b.onclick = () => { store.del("user"); location.href = "index.html"; });

  const drawer = $("#drawer");
  const setDrawer = (o) => { drawer.classList.toggle("open", o); drawer.setAttribute("aria-hidden", !o); $("#burger").setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; };
  $("#burger").onclick = () => setDrawer(true);
  $("#drawerClose").onclick = () => setDrawer(false);
  drawer.onclick = (e) => { if (e.target === drawer) setDrawer(false); };
  $$("#drawer a").forEach((a) => a.addEventListener("click", () => setDrawer(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") { setDrawer(false); acctMenu.classList.remove("open"); closeLightbox && closeLightbox(); } });

  /* ---------- cookie notice (kept from the original site) ---------- */
  if (!store.get("cookies", false)) {
    const c = document.createElement("div");
    c.className = "cookie";
    c.innerHTML = `<p><i class="fa-solid fa-cookie-bite"></i> This website uses cookies to keep your cart and account working. <a href="privacy-policy.html">Learn more</a></p><button class="btn btn-sm">Accept</button>`;
    document.body.appendChild(c);
    setTimeout(() => c.classList.add("in"), 900);
    $("button", c).onclick = () => { store.set("cookies", true); c.classList.remove("in"); setTimeout(() => c.remove(), 400); };
  }

  /* ---------- page transitions ---------- */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || reduce || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:/.test(href)) return;
    const url = new URL(href, location.href);
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => (location.href = href), 260);
  });
  addEventListener("pageshow", () => document.body.classList.remove("leaving"));

  /* ---------- reveal on scroll ---------- */
  function reveal(root = document) {
    const els = $$(".reveal:not(.in)", root);
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- product card ---------- */
  function card(p, i = 0) {
    const inCart = cart.has(p.id);
    return `
    <article class="card reveal" style="--d:${(i % 4) * 70}ms">
      <a class="card-media" href="product.html?id=${p.id}" aria-label="${p.title}">
        <img src="${p.imgs[0]}" alt="${p.title}" loading="lazy">
        ${p.imgs[1] ? `<img class="alt" src="${p.imgs[1]}" alt="" loading="lazy" aria-hidden="true">` : ""}
        ${p.was ? `<span class="tag tag-sale">Reduced</span>` : ""}
        <span class="card-view">View details <i class="fa-solid fa-arrow-right"></i></span>
      </a>
      <div class="card-body">
        <p class="card-meta">${catLabel(p.cat)} · ${p.era}</p>
        <h3><a href="product.html?id=${p.id}">${p.title}</a></h3>
        <div class="card-foot">
          <p class="price">${money(p.price)}${p.was ? ` <s>${money(p.was)}</s>` : ""}</p>
          <button class="add-btn ${inCart ? "added" : ""}" data-add="${p.id}" aria-label="Add ${p.title} to cart">
            <i class="fa-solid ${inCart ? "fa-check" : "fa-plus"}"></i><span>${inCart ? "In cart" : "Add"}</span>
          </button>
        </div>
      </div>
    </article>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-add]");
    if (!b) return;
    if (cart.has(b.dataset.add)) { toast("Already in your cart. Change the quantity in your cart", "fa-circle-info", "cart.html", "Open cart"); return; }
    if (cart.add(b.dataset.add)) {
      $$(`[data-add="${b.dataset.add}"]`).forEach((x) => {
        x.classList.add("added");
        if (x.classList.contains("add-btn")) x.innerHTML = `<i class="fa-solid fa-check"></i><span>In cart</span>`;
        else x.innerHTML = `<i class="fa-solid fa-check"></i> In your cart`;
      });
    }
  });

  /* ---------- forms: simple validation helper ---------- */
  function validate(form) {
    let ok = true;
    $$("[required]", form).forEach((f) => {
      const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.closest(".field")?.classList.toggle("error", bad);
      if (bad && ok) { f.focus(); ok = false; }
    });
    return ok;
  }
  document.addEventListener("input", (e) => e.target.closest(".field.error")?.classList.remove("error"));

  /* ================= PAGES ================= */

  /* HOME */
  if (page === "home") {
    $("#featuredGrid").innerHTML = FEATURED.map(byId).map(card).join("");
    $("#catGrid").innerHTML = CATEGORIES.map((c, i) => {
      const items = PRODUCTS.filter((p) => p.cat === c.key);
      return `<a class="cat reveal" style="--d:${i * 70}ms" href="shop.html?cat=${c.key}">
        <img src="${items[0].imgs[0]}" alt="" loading="lazy">
        <span class="cat-label"><i class="fa-solid ${c.icon}"></i> ${c.label}<small>${items.length} pieces <i class="fa-solid fa-arrow-right"></i></small></span>
      </a>`;
    }).join("");


    /* scrollspy: highlight Home / Reviews / Visit / Contact as you scroll */
    const spy = ["reviews", "visit", "contact"].map((id) => document.getElementById(id));
    const setNav = (k) => $$("[data-nav]").forEach((a) => {
      const on = a.dataset.nav === k;
      a.classList.toggle("is-active", on);
      on ? a.setAttribute("aria-current", k === "home" ? "page" : "location") : a.removeAttribute("aria-current");
    });
    const spyRun = () => {
      const y = scrollY + innerHeight * 0.35;
      let cur = "home";
      spy.forEach((sec) => { if (sec.offsetTop <= y) cur = sec.id; });
      if (innerHeight + scrollY >= document.body.scrollHeight - 4) cur = "contact";
      setNav(cur);
    };
    addEventListener("scroll", spyRun, { passive: true }); spyRun();

    /* reviews slider */
    const track = $("#revTrack"), dots = $("#revDots");
    const stars = (n) => Array.from({ length: 5 }, (_, i) => `<i class="fa-${i < n ? "solid" : "regular"} fa-star"></i>`).join("");
    const perView = () => (innerWidth < 700 ? 1 : 2);
    let rp = 0;
    function drawReviews() {
      const pv = perView(), pages = Math.ceil(REVIEWS.length / pv);
      rp = Math.min(rp, pages - 1);
      const items = REVIEWS.slice(rp * pv, rp * pv + pv);
      track.classList.add("fade");
      setTimeout(() => {
        track.innerHTML = items.map((r) => `
          <figure class="rev-card">
            ${r.sample ? '<span class="sample-tag" title="Replace with a real review">Sample</span>' : ""}
            <i class="fa-solid fa-quote-left q"></i>
            <p class="stars" aria-label="${r.stars} out of 5 stars">${stars(r.stars)}</p>
            <blockquote>${r.text}</blockquote>
            <figcaption><span class="rev-av">${r.name.charAt(0)}</span><span><b>${r.name}</b><small>${r.place}${r.item ? " · Bought: " + r.item : ""}</small></span></figcaption>
          </figure>`).join("");
        track.classList.remove("fade");
      }, reduce ? 0 : 200);
      dots.innerHTML = Array.from({ length: pages }, (_, i) =>
        `<button role="tab" aria-selected="${i === rp}" aria-label="Page ${i + 1} of ${pages}" data-p="${i}"></button>`).join("");
      $("#revPrev").disabled = rp === 0;
      $("#revNext").disabled = rp === pages - 1;
    }
    $("#revPrev").onclick = () => { rp--; drawReviews(); };
    $("#revNext").onclick = () => { rp++; drawReviews(); };
    dots.onclick = (e) => { const b = e.target.closest("[data-p]"); if (b) { rp = +b.dataset.p; drawReviews(); } };
    let sx = 0;
    track.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) (dx < 0 ? $("#revNext") : $("#revPrev")).disabled || (dx < 0 ? $("#revNext") : $("#revPrev")).click();
    });
    let lastPv = perView();
    addEventListener("resize", () => { if (perView() !== lastPv) { lastPv = perView(); rp = 0; drawReviews(); } });
    drawReviews();

    /* write a review modal */
    const modal = $("#revModal");
    const openM = (o) => {
      modal.classList.toggle("open", o); modal.setAttribute("aria-hidden", !o);
      document.body.style.overflow = o ? "hidden" : "";
      o ? setTimeout(() => $("#rvName").focus(), 200) : $("#writeReview").focus();
    };
    $("#writeReview").onclick = () => openM(true);
    modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) openM(false); });
    addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) openM(false); });
    const rf = $("#revForm");
    rf.onsubmit = (e) => {
      e.preventDefault();
      if (!validate(rf)) return;
      const d = Object.fromEntries(new FormData(rf));
      const body = `Rating: ${d.stars}/5\nName: ${d.name}\nItem: ${d.item || "-"}\n\n${d.text}`;
      location.href = `mailto:${SHOP.email}?subject=${encodeURIComponent("Customer review from " + d.name)}&body=${encodeURIComponent(body)}`;
      rf.reset(); openM(false);
      toast("Thank you! Your review is ready in your email app", "fa-heart");
    };
    const f = $("#contactForm");
    f.onsubmit = (e) => {
      e.preventDefault();
      if (!validate(f)) return;
      const d = Object.fromEntries(new FormData(f));
      const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}\nReason: ${d.reason}\n\n${d.message}`;
      location.href = `mailto:${SHOP.email}?subject=${encodeURIComponent("Website enquiry: " + d.reason)}&body=${encodeURIComponent(body)}`;
      f.reset();
      $("#contactDone").hidden = false;
      toast("Thank you! Your email app is opening", "fa-paper-plane");
    };
  }

  /* SHOP */
  if (page === "shop") {
    const params = new URLSearchParams(location.search);
    let state = { cat: params.get("cat") || "all", q: params.get("q") || "", sort: "featured" };
    const chips = $("#chips");
    chips.innerHTML = [`<button data-cat="all">All pieces <span>${PRODUCTS.length}</span></button>`]
      .concat(CATEGORIES.map((c) => `<button data-cat="${c.key}"><i class="fa-solid ${c.icon}"></i> ${c.label} <span>${PRODUCTS.filter((p) => p.cat === c.key).length}</span></button>`)).join("");
    const catSelect = $("#catSelect");
    const catOptions = [`<option value="all">All pieces (${PRODUCTS.length})</option>`]
      .concat(CATEGORIES.map((c) => {
        const count = PRODUCTS.filter((p) => p.cat === c.key).length;
        return `<option value="${c.key}">${c.label} (${count})</option>`;
      }));
    catSelect.innerHTML = catOptions.join("");
    $("#q").value = state.q;

    function render() {
      $$("button", chips).forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === state.cat));
      catSelect.value = state.cat;
      let list = PRODUCTS.filter((p) => state.cat === "all" || p.cat === state.cat);
      const q = state.q.trim().toLowerCase();
      if (q) list = list.filter((p) => (p.title + " " + p.desc + " " + p.era + " " + catLabel(p.cat)).toLowerCase().includes(q));
      if (state.sort === "low") list = [...list].sort((a, b) => a.price - b.price);
      if (state.sort === "high") list = [...list].sort((a, b) => b.price - a.price);
      if (state.sort === "sale") list = [...list].sort((a, b) => (b.was ? 1 : 0) - (a.was ? 1 : 0));
      $("#count").textContent = `${list.length} ${list.length === 1 ? "piece" : "pieces"}`;
      const grid = $("#shopGrid");
      grid.classList.add("fading");
      setTimeout(() => {
        grid.innerHTML = list.length ? list.map(card).join("")
          : `<div class="empty"><i class="fa-solid fa-magnifying-glass"></i><h3>No pieces match “${state.q}”</h3><p>Try a different word, or <button class="link" id="resetAll">show everything</button>.</p></div>`;
        grid.classList.remove("fading");
        reveal(grid);
        $("#resetAll")?.addEventListener("click", () => { state = { cat: "all", q: "", sort: state.sort }; $("#q").value = ""; render(); });
      }, reduce ? 0 : 180);
      const u = new URL(location.href);
      state.cat === "all" ? u.searchParams.delete("cat") : u.searchParams.set("cat", state.cat);
      state.q ? u.searchParams.set("q", state.q) : u.searchParams.delete("q");
      history.replaceState(null, "", u);
    }
    chips.onclick = (e) => { const b = e.target.closest("button"); if (b) { state.cat = b.dataset.cat; render(); } };
    catSelect.onchange = (e) => {
      state.cat = e.target.value;
      render();
    };
    let t; $("#q").oninput = (e) => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; render(); }, 220); };
    $("#searchForm").onsubmit = (e) => { e.preventDefault(); state.q = $("#q").value; render(); };
    $("#sort").onchange = (e) => { state.sort = e.target.value; render(); };
    render();
  }

  /* PRODUCT */
  let closeLightbox = null;
  if (page === "product") {
    const p = byId(new URLSearchParams(location.search).get("id")) || PRODUCTS[0];
    document.title = `${p.title} · Stacey Porter Antiques`;
    $("#crumbCat").textContent = catLabel(p.cat);
    $("#crumbCat").href = `shop.html?cat=${p.cat}`;
    $("#crumbTitle").textContent = p.title;
    const inCart = cart.has(p.id);
    $("#productWrap").innerHTML = `
      <div class="gallery reveal">
        <button class="main-img" id="mainImg" aria-label="Zoom image"><img src="${p.imgs[0]}" alt="${p.title}"><span class="zoom"><i class="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge</span></button>
        ${p.imgs.length > 1 ? `<div class="thumbs">${p.imgs.map((s, i) => `<button class="${i ? "" : "on"}" data-i="${i}" aria-label="Photo ${i + 1}"><img src="${s}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
      </div>
      <div class="pinfo reveal" style="--d:120ms">
        <p class="eyebrow">${catLabel(p.cat)} · ${p.era}</p>
        <h1>${p.title}</h1>
        <p class="price big">${money(p.price)}${p.was ? ` <s>${money(p.was)}</s> <span class="save">Save ${money(p.was - p.price)}</span>` : ""}</p>
        <p class="lead">${p.desc}</p>
        <dl class="specs">
          <div><dt><i class="fa-solid fa-ruler-combined"></i> Dimensions</dt><dd>${p.dims}</dd></div>
          <div><dt><i class="fa-regular fa-clock"></i> Period</dt><dd>${p.era}</dd></div>
          <div><dt><i class="fa-solid fa-fingerprint"></i> Availability</dt><dd>Limited, quantity confirmed with your order</dd></div>
        </dl>
        <div class="qty-row">
          <label for="qtyInput">Quantity</label>
          <div class="qty" data-qty>
            <button type="button" class="qty-btn" data-step="-1" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
            <input id="qtyInput" type="number" inputmode="numeric" min="1" max="${MAX_QTY}" value="1" aria-live="polite">
            <button type="button" class="qty-btn" data-step="1" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
          </div>
          <span class="qty-total" id="qtyTotal">Total ${money(p.price)}</span>
        </div>
        <p class="in-cart-note" id="inCartNote" ${inCart ? "" : "hidden"}><i class="fa-solid fa-check"></i> <span>${cart.qty(p.id)}</span> already in your cart</p>
        <div class="buy">
          <button class="btn btn-lg" id="addQty"><i class="fa-solid fa-bag-shopping"></i> Add to cart</button>
          <a class="btn btn-lg btn-ghost" href="${p.url}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Buy on Chairish</a>
        </div>
        <ul class="assure">
          <li><i class="fa-solid fa-calendar-check"></i> See it in person in Williams Bay by appointment</li>
          <li><i class="fa-solid fa-truck"></i> Shipping quotes available on request</li>
          <li><i class="fa-regular fa-comments"></i> <a href="mailto:${SHOP.email}?subject=${encodeURIComponent("Question about: " + p.title)}">Ask a question about this piece</a></li>
        </ul>
      </div>`;
    const qIn = $("#qtyInput");
    const clampQ = (v) => Math.max(1, Math.min(MAX_QTY, parseInt(v, 10) || 1));
    const syncQ = () => {
      const q = clampQ(qIn.value); qIn.value = q;
      $('[data-step="-1"]').disabled = q <= 1;
      $('[data-step="1"]').disabled = q >= MAX_QTY;
      $("#qtyTotal").textContent = `Total ${money(p.price * q)}`;
    };
    $$("[data-step]").forEach((b) => (b.onclick = () => {
      qIn.value = clampQ(qIn.value) + +b.dataset.step; syncQ();
      qIn.classList.remove("bump"); void qIn.offsetWidth; qIn.classList.add("bump");
    }));
    qIn.addEventListener("change", syncQ);
    qIn.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); syncQ(); } });
    syncQ();
    $("#addQty").onclick = () => {
      syncQ();
      if (cart.add(p.id, clampQ(qIn.value))) {
        const note = $("#inCartNote"); note.hidden = false; $("span", note).textContent = cart.qty(p.id);
        const b = $("#addQty"); b.classList.add("added"); b.innerHTML = '<i class="fa-solid fa-check"></i> Added';
        setTimeout(() => { b.classList.remove("added"); b.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to cart'; }, 1600);
        qIn.value = 1; syncQ();
      }
    };

    let cur = 0;
    const setImg = (i) => {
      cur = (i + p.imgs.length) % p.imgs.length;
      const img = $("#mainImg img");
      img.classList.add("swap");
      setTimeout(() => { img.src = p.imgs[cur]; img.classList.remove("swap"); }, reduce ? 0 : 160);
      $$(".thumbs button").forEach((b) => b.classList.toggle("on", +b.dataset.i === cur));
    };
    $$(".thumbs button").forEach((b) => (b.onclick = () => setImg(+b.dataset.i)));

    const lb = $("#lightbox"), lbImg = $("#lbImg");
    const lbSet = () => { lbImg.src = p.imgs[cur]; $("#lbCount").textContent = `${cur + 1} / ${p.imgs.length}`; };
    $("#mainImg").onclick = () => { lbSet(); lb.classList.add("open"); lb.setAttribute("aria-hidden", false); document.body.style.overflow = "hidden"; $("#lbClose").focus(); };
    closeLightbox = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", true); document.body.style.overflow = ""; };
    $("#lbClose").onclick = closeLightbox;
    lb.onclick = (e) => { if (e.target === lb) closeLightbox(); };
    $("#lbPrev").onclick = () => { setImg(cur - 1); lbSet(); };
    $("#lbNext").onclick = () => { setImg(cur + 1); lbSet(); };
    $$("#lbPrev,#lbNext").forEach((b) => (b.hidden = p.imgs.length < 2));
    addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "ArrowLeft") $("#lbPrev").click();
      if (e.key === "ArrowRight") $("#lbNext").click();
    });

    const rel = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).concat(PRODUCTS.filter((x) => x.cat !== p.cat)).slice(0, 4);
    $("#relatedGrid").innerHTML = rel.map(card).join("");
  }

  /* CART */
  if (page === "cart") {
    function renderCart() {
      const items = cart.items().map(byId);
      const wrap = $("#cartWrap");
      if (!items.length) {
        wrap.innerHTML = `<div class="empty reveal"><i class="fa-solid fa-bag-shopping"></i><h3>Your cart is empty</h3><p>Every piece is one of a kind, so when you spot something you love, add it before it finds another home.</p><a class="btn" href="shop.html">Browse the shop</a></div>`;
        reveal(wrap); return;
      }
      let sub = items.reduce((s, p) => s + p.price * cart.qty(p.id), 0);
      const units = cart.count();
      const u = user() || {};
      wrap.innerHTML = `
      <div class="cart-grid">
        <div class="cart-list reveal">
          ${items.map((p) => `
            <div class="line" data-line="${p.id}">
              <a href="product.html?id=${p.id}" class="line-img"><img src="${p.imgs[0]}" alt=""></a>
              <div class="line-info">
                <p class="card-meta">${catLabel(p.cat)} · ${p.era}</p>
                <h3><a href="product.html?id=${p.id}">${p.title}</a></h3>
                <p class="muted">${p.dims}</p>
              </div>
              <div class="line-end">
                <div class="qty qty-sm" data-line-qty="${p.id}">
                  <button type="button" class="qty-btn" data-lstep="-1" aria-label="Decrease quantity" ${cart.qty(p.id) <= 1 ? "disabled" : ""}><i class="fa-solid fa-minus"></i></button>
                  <input type="number" min="1" max="${MAX_QTY}" value="${cart.qty(p.id)}" aria-label="Quantity for ${p.title}">
                  <button type="button" class="qty-btn" data-lstep="1" aria-label="Increase quantity" ${cart.qty(p.id) >= MAX_QTY ? "disabled" : ""}><i class="fa-solid fa-plus"></i></button>
                </div>
                <p class="price" data-line-price>${money(p.price * cart.qty(p.id))}${cart.qty(p.id) > 1 ? `<small class="each">${money(p.price)} each</small>` : ""}</p>
                <button class="link danger" data-remove="${p.id}"><i class="fa-regular fa-trash-can"></i> Remove</button>
              </div>
            </div>`).join("")}
          <a href="shop.html" class="link back"><i class="fa-solid fa-arrow-left"></i> Continue shopping</a>
        </div>
        <aside class="summary reveal" style="--d:120ms">
          <h2>Order summary</h2>
          <div class="sum-row"><span id="sumUnits">Items (${units})</span><span id="sumItems">${money(sub)}</span></div>
          <div class="sum-row"><span>Delivery</span><span>Quoted after request</span></div>
          <div class="sum-row total"><span>Subtotal</span><span id="sumTotal">${money(sub)}</span></div>
          <form id="checkout" novalidate>
            <h3>Request to purchase</h3>
            <p class="muted small">Send your request and Stacey will confirm availability, delivery and payment with you personally.</p>
            <div class="field"><label for="cName">Full name</label><input id="cName" name="name" required value="${u.name || ""}" autocomplete="name"><span class="err">Please enter your name</span></div>
            <div class="field"><label for="cEmail">Email</label><input id="cEmail" name="email" type="email" required value="${u.email || ""}" autocomplete="email"><span class="err">Please enter a valid email</span></div>
            <div class="field"><label for="cPhone">Phone (optional)</label><input id="cPhone" name="phone" type="tel" autocomplete="tel"></div>
            <fieldset class="field radios"><legend>How would you like to receive it?</legend>
              <label><input type="radio" name="delivery" value="Pick up in Williams Bay" checked> Pick up in Williams Bay</label>
              <label><input type="radio" name="delivery" value="Shipping quote please"> Ship it to me (quote)</label>
            </fieldset>
            <button class="btn btn-lg btn-block" type="submit"><i class="fa-solid fa-paper-plane"></i> Send purchase request</button>
            <p class="secure small"><i class="fa-solid fa-lock"></i> No payment is taken online.</p>
          </form>
        </aside>
      </div>`;
      reveal(wrap);
      $$("[data-remove]").forEach((b) => (b.onclick = () => {
        const line = b.closest(".line");
        line.classList.add("removing");
        setTimeout(() => { cart.remove(b.dataset.remove); renderCart(); toast("Removed from cart", "fa-trash-can"); }, reduce ? 0 : 300);
      }));
      $$("[data-line-qty]").forEach((box) => {
        const id = box.dataset.lineQty, inp = $("input", box);
        const p = byId(id), line = box.closest(".line");
        const apply = (q) => {
          cart.setQty(id, q);
          const n = cart.qty(id);
          inp.value = n;
          $('[data-lstep="-1"]', box).disabled = n <= 1;
          $('[data-lstep="1"]', box).disabled = n >= MAX_QTY;
          $("[data-line-price]", line).innerHTML = money(p.price * n) + (n > 1 ? `<small class="each">${money(p.price)} each</small>` : "");
          const all = cart.items().map(byId), tot = all.reduce((a, x) => a + x.price * cart.qty(x.id), 0);
          sub = tot;
          $("#sumUnits").textContent = `Items (${cart.count()})`;
          $("#sumItems").textContent = money(tot);
          $("#sumTotal").textContent = money(tot);
          [$("#sumTotal"), $("[data-line-price]", line)].forEach((el) => { el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); });
        };
        $$("[data-lstep]", box).forEach((b) => (b.onclick = () => apply(cart.qty(id) + +b.dataset.lstep)));
        inp.onchange = () => apply(parseInt(inp.value, 10) || 1);
      });
      const f = $("#checkout");
      f.onsubmit = (e) => {
        e.preventDefault();
        if (!validate(f)) return;
        const d = Object.fromEntries(new FormData(f));
        const ref = "SP" + Date.now().toString().slice(-6);
        const orders = store.get("orders", []);
        orders.unshift({ ref, date: new Date().toISOString(), items: items.map((p) => p.id), qty: cart.map(), total: sub, delivery: d.delivery, email: d.email, name: d.name });
        store.set("orders", orders);
        const body = `Purchase request ${ref}\n\n${items.map((p) => `• ${cart.qty(p.id)} × ${p.title} (${money(p.price * cart.qty(p.id))})`).join("\n")}\n\nSubtotal: ${money(sub)}\nDelivery: ${d.delivery}\n\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}`;
        location.href = `mailto:${SHOP.email}?subject=${encodeURIComponent("Purchase request " + ref)}&body=${encodeURIComponent(body)}`;
        cart.clear();
        wrap.innerHTML = `<div class="empty success reveal"><i class="fa-solid fa-circle-check"></i><h3>Request ${ref} is ready to send</h3><p>Your email app has opened with the details filled in. Just press send and Stacey will reply to confirm.</p><div class="row-btns"><a class="btn" href="orders.html">View my orders</a><a class="btn btn-ghost" href="shop.html">Keep browsing</a></div></div>`;
        reveal(wrap);
      };
    }
    renderCart();
  }

  /* ACCOUNT */
  if (page === "account") {
    const wrap = $("#acctWrap");
    function show() {
      const u = user();
      if (u) {
        const n = store.get("orders", []).length;
        wrap.innerHTML = `
        <div class="panel reveal">
          <div class="avatar">${u.name.trim().charAt(0).toUpperCase()}</div>
          <h1>Welcome back, ${u.name.split(" ")[0]}</h1>
          <p class="muted">${u.email}</p>
          <div class="acct-tiles">
            <a href="orders.html"><i class="fa-solid fa-receipt"></i><b>Orders</b><span>${n} ${n === 1 ? "request" : "requests"}</span></a>
            <a href="cart.html"><i class="fa-solid fa-bag-shopping"></i><b>Cart</b><span>${cart.count()} ${cart.count() === 1 ? "item" : "items"}</span></a>
            <a href="shop.html"><i class="fa-solid fa-store"></i><b>Shop</b><span>New arrivals</span></a>
          </div>
          <button class="btn btn-ghost" data-signout-page><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out</button>
        </div>`;
        $("[data-signout-page]").onclick = () => { store.del("user"); location.reload(); };
        reveal(wrap); return;
      }
      const create = location.hash === "#create";
      wrap.innerHTML = `
      <div class="panel reveal">
        <div class="tabs" role="tablist">
          <button role="tab" id="tabIn" aria-selected="${!create}">Sign In</button>
          <button role="tab" id="tabUp" aria-selected="${create}">Create Account</button>
          <span class="tab-ink"></span>
        </div>
        <form id="authForm" novalidate>
          <div class="field only-up"><label for="aName">Full name</label><input id="aName" name="name" autocomplete="name"><span class="err">Please enter your name</span></div>
          <div class="field"><label for="aEmail">Email</label><input id="aEmail" name="email" type="email" required autocomplete="email"><span class="err">Please enter a valid email</span></div>
          <div class="field"><label for="aPass">Password</label>
            <div class="pass"><input id="aPass" name="password" type="password" required minlength="6" autocomplete="current-password"><button type="button" class="eye" aria-label="Show password"><i class="fa-regular fa-eye"></i></button></div>
            <span class="err">Please enter a password (6+ characters)</span></div>
          <button class="btn btn-lg btn-block" type="submit" id="authSubmit"></button>
          <p class="muted small center" id="authAlt"></p>
        </form>
      </div>`;
      const f = $("#authForm");
      const setMode = (up) => {
        $("#tabIn").setAttribute("aria-selected", !up); $("#tabUp").setAttribute("aria-selected", up);
        f.classList.toggle("up", up);
        $("#aName").required = up;
        $("#authSubmit").innerHTML = up ? '<i class="fa-solid fa-user-plus"></i> Create my account' : '<i class="fa-solid fa-arrow-right-to-bracket"></i> Sign in';
        $("#authAlt").innerHTML = up ? 'Already have an account? <button type="button" class="link" data-mode="in">Sign in</button>' : 'New here? <button type="button" class="link" data-mode="up">Create an account</button>';
        $("[data-mode]").onclick = (e) => setMode(e.target.dataset.mode === "up");
        history.replaceState(null, "", up ? "#create" : location.pathname);
      };
      $("#tabIn").onclick = () => setMode(false);
      $("#tabUp").onclick = () => setMode(true);
      $(".eye").onclick = (e) => { const i = $("#aPass"); const s = i.type === "password"; i.type = s ? "text" : "password"; e.currentTarget.innerHTML = `<i class="fa-regular ${s ? "fa-eye-slash" : "fa-eye"}"></i>`; };
      setMode(create);
      f.onsubmit = (e) => {
        e.preventDefault();
        const pw = $("#aPass");
        if (!validate(f)) return;
        if (pw.value.length < 6) { pw.closest(".field").classList.add("error"); pw.focus(); return; }
        const d = Object.fromEntries(new FormData(f));
        const name = d.name || (store.get("profile", {})[d.email] || d.email.split("@")[0]);
        if (d.name) store.set("profile", { ...store.get("profile", {}), [d.email]: d.name });
        store.set("user", { name, email: d.email });
        location.href = "account.html";
      };
      reveal(wrap);
    }
    show();
  }

  /* ORDERS */
  if (page === "orders") {
    const wrap = $("#ordersWrap");
    const orders = store.get("orders", []);
    if (!orders.length) {
      wrap.innerHTML = `<div class="empty reveal"><i class="fa-solid fa-receipt"></i><h3>No orders yet</h3><p>When you send a purchase request from your cart, it will appear here so you can keep track of it.</p><a class="btn" href="shop.html">Start shopping</a></div>`;
    } else {
      wrap.innerHTML = orders.map((o, i) => `
        <article class="order reveal" style="--d:${i * 60}ms">
          <header><div><b>Request ${o.ref}</b><span class="muted">${new Date(o.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span></div><span class="status"><i class="fa-regular fa-clock"></i> Awaiting confirmation</span></header>
          <div class="order-items">${o.items.map(byId).filter(Boolean).map((p) => `<a href="product.html?id=${p.id}"><img src="${p.imgs[0]}" alt=""><span>${(o.qty && o.qty[p.id] > 1) ? o.qty[p.id] + " × " : ""}${p.title}</span><b>${money(p.price * ((o.qty && o.qty[p.id]) || 1))}</b></a>`).join("")}</div>
          <footer><span><i class="fa-solid fa-truck"></i> ${o.delivery}</span><b>Total ${money(o.total)}</b></footer>
        </article>`).join("");
    }
  }

  reveal();
})();
