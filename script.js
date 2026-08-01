/* ============================================================
   Museum of Us — interactive friendship-day site
   Vanilla JS. No frameworks. Everything is editable from the
   settings panel and stored in localStorage.
   ============================================================ */
(() => {
  "use strict";

  const KEY = "museum-of-us.v1";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------------------------------------------------
     1. DEFAULT CONTENT  (all of it editable)
     --------------------------------------------------------- */
  const DEFAULTS = {
    meta: { to: "Thanesha", from: "Shreya", credit: "made by hand, for you" },

    notif: {
      tag: "for you · now",
      line1: "1 unopened message",
      line2: "Actually… it's more than a message.",
      line3: "It took embarrassingly long. Please act surprised.",
      btn: "OPEN IT",
      foot: "still not too late to run",
    },

    door: {
      knock: "knock knock…",
      hi: "HEY {to},",
      sub: "I made a tiny place on the internet for you.",
      warn: "You have to keep going until the end.",
      yes: "FINE →",
      no: "ABSOLUTELY NOT",
      noReply: "wrong button. try the other one.",
    },

    museum: {
      title: "Welcome to the extremely prestigious Museum of Us.",
      sub: "Check the exhibit one by one.",
      cta: "CONTINUE THE TOUR →",
      back: "BACK TO THE HALLWAY",
      exhibits: [
        {
          label: "Exhibit A",
          glyph: "🖼",
          kind: "plaque",
          title: "The Origin Story",
          text: "It was on Oct 3 that we first met. It was so strange that out of all those people u chose me to ask for the directions.I was clueless u were too.",
          caption: "Nobody knew the world became such a long-term commitment that day.",
          img: "",
        },
        {
          label: "Exhibit B",
          glyph: "🗄",
          kind: "curtain",
          title: "Certified Weirdness",
          text: "V started our chat in insta on Oct13 v started sharing relatable reels it took time till nov25 to change the content to bf u reacted a reel with 1st time dec24",
          caption: "Exhibit kept behind a curtain for public safety.",
          img: "assets/image.jpeg",
        },
        {
          label: "Exhibit C",
          glyph: "🗄",
          kind: "box",
          title: "The Classified Archive",
          text: "Thousands of completely unnecessary conversations.",
          caption: "ARCHIVE-01 · access granted to exactly one person.",
          img: "",
        },
      ],
    },

    donot: {
      hand: "do NOT.",
      tag: "DO NOT PRESS",
      note: "seriously. do not.",
      alert: "FRIENDSHIP EMERGENCY DETECTED",
      running: "RUNNING FRIENDSHIP DIAGNOSTIC",
      checks: [
        "Checking loyalty :: SUSPICIOUS",
        "Checking emotional damage :: MUTUAL",
        "Checking stupidity :: COUNT FAILED",
        "Checking embarrassing intel :: CLASSIFIED",
      ],
      resultTitle: "YOU KNOW WAY TOO MUCH.",
      resultSub: "Unfortunately, we are now friends for life.",
      fine: "NO CANCELLATIONS. NO REFUNDS.",
      btn: "ACCEPT MY FATE",
    },

    cleanup: {
      title: "Let's clean up our friendship history.",
      sub: "swipe · or use the buttons",
      del: "✕ DELETE",
      keep: "KEEP →",
      deleteVerdict: "DELETED",
      keepVerdict: "KEPT",
      done: "You kept all of them. Of course you did.",
      next: "OKAY, ENOUGH →",
      memories: [
        { img: "assets/memory-1.jpg", caption: "Being there when life gets a little too real.", tag: "01" },
        { img: "assets/memory-2.jpg", caption: "Eating something questionable at 1am.", tag: "02" },
        { img: "assets/memory-3.jpg", caption: "That sunset nobody could photograph properly.", tag: "03" },
      ],
    },

    interlude: {
      lines: ["OKAY.", "JOKES APART.", "THERE'S ONE THING I ACTUALLY WANTED TO TELL YOU."],
      hint: "tap anywhere to continue",
    },

    envelope: {
      hint: "slide your finger across the flap to open it",
      opened: "…okay. here goes.",
    },

    letter: {
      greeting: "Dear {to},",
      lines: [
        "Life has a strange way of introducing us to hundreds of people.",
        "Some stay for a conversation.",
        "Some stay for a chapter.",
        "And somehow, a very small number become part of the story itself.",
        "==You're one of those people for me.==",
        "~~Thank you for being exactly the kind of weird that matches mine.~~",
        "I don't know what life will look like years from now.",
        "But I'm really glad there was a version of my life where our paths crossed.",
        "And I hope there are many more versions after this one.",
        "==Happy Friendship Day 💛==",
      ],
      sign: "— {from}",
      btn: "I'M NOT CRYING",
      sysTitle: "SYSTEM MESSAGE",
      sysBody: "Emotional moment detected. This is getting uncomfortable.",
      sysBtn: "FIX IT IMMEDIATELY",
    },

    wordsearch: {
      title: "spot the hidden words? · ·",
      words: ["HAPPY", "FRIENDSHIP", "DAY", "FOOL"],
      btn: "REVEAL IT, GENIUS",
      success: "HAPPY FRIENDSHIP DAY, YOU FOOL 💛",
      next: "CONTINUE →",
    },

    agreement: {
      title: "FRIENDSHIP RENEWAL AGREEMENT",
      intro: "By continuing, {to} agrees to:",
      clauses: [
        "Continue sending unnecessary memes",
        "Provide emotional support when required",
        "Pretend to listen to repeated stories",
        "Participate in questionable plans",
        "Remain available for random 3am “are you up” messages",
        "Maintain confidentiality regarding embarrassing information",
      ],
      term: "Lifetime",
      cancel: "None",
      btn: "I ACCEPT",
      hint: "tick every clause first",
      stamp: "FRIENDSHIP RENEWED",
      next: "→",
    },

    end: {
      title: "THAT'S IT.",
      sub: "You can leave now.",
      tiny: "(although you may leave a reply)",
      replay: "run it back",
    },

    theme: {
      accent: "#e23b3b",
      heart: "#ff4d6d",
      radius: 18,
      fs: 16,
      tape: true,
      fontDisplay: "'Fraunces', Georgia, serif",
      fontHand: "'Caveat', cursive",
      fontBody: "'Plus Jakarta Sans', system-ui, sans-serif",
      scenes: {
        notif: { bg: "#f2b8d0", ink: "#3a1f2b" },
        door: { bg: "#b9b6f0", ink: "#241f52" },
        museum: { bg: "#f6d34a", ink: "#3b2f07" },
        exhibit: { bg: "#f5f1e6", ink: "#22201c" },
        donot: { bg: "#f7f4f0", ink: "#221f1d" },
        cleanup: { bg: "#4fc0a1", ink: "#0f3a30" },
        interlude: { bg: "#f7f4ec", ink: "#1d1a17" },
        envelope: { bg: "#f7f4ec", ink: "#1d1a17" },
        letter: { bg: "#fbf8ee", ink: "#1a2440" },
        wordsearch: { bg: "#2b2b33", ink: "#f4f1e8" },
        agreement: { bg: "#b6a8ec", ink: "#241f52" },
        end: { bg: "#f6d34a", ink: "#3b2f07" },
      },
    },

    fx: {
      hearts: true,
      sparkles: true,
      density: 26,
      speed: 1,
      typeSpeed: 34,
      lineDelay: 900,
      confetti: true,
    },

    music: { src: "assets/sample-music.mp3", name: "Sample track", autoplay: false, volume: 0.45 },
  };

  /* ---------------------------------------------------------
     2. STATE
     --------------------------------------------------------- */
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
  const merge = (base, over) => {
    const out = clone(base);
    for (const k in over) {
      if (isObj(out[k]) && isObj(over[k])) out[k] = merge(out[k], over[k]);
      else if (over[k] !== undefined) out[k] = clone(over[k]);
    }
    return out;
  };

  let cfg = clone(DEFAULTS);
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) cfg = merge(DEFAULTS, JSON.parse(raw));
  } catch (e) {
    /* ignore corrupted storage */
  }

  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cfg));
    } catch (e) {
      toast("Storage full — try smaller images");
    }
  };
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), cfg);
  const set = (path, val) => {
    const parts = path.split(".");
    const last = parts.pop();
    const target = parts.reduce((o, k) => (o[k] ??= {}), cfg);
    target[last] = val;
    save();
  };

  const tokens = (s) =>
    String(s == null ? "" : s)
      .replaceAll("{to}", cfg.meta.to || "you")
      .replaceAll("{from}", cfg.meta.from || "me");

  /* ---------------------------------------------------------
     3. CHROME / THEME
     --------------------------------------------------------- */
  const paper = $("#paper");
  const stage = $("#stage");
  const toastEl = $("#toast");
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("on"), 1900);
  }

  function applyTheme(sceneId) {
    const t = cfg.theme;
    const s = t.scenes[sceneId] || t.scenes.notif;
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--heart", t.heart);
    r.setProperty("--radius", t.radius + "px");
    r.setProperty("--fs", t.fs + "px");
    r.setProperty("--display", t.fontDisplay);
    r.setProperty("--hand", t.fontHand);
    r.setProperty("--body", t.fontBody);
    r.setProperty("--speed", String(cfg.fx.speed || 1));
    paper.style.background = s.bg;
    paper.style.color = s.ink;
    paper.dataset.tape = t.tape ? "on" : "off";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", s.bg);
  }

  /* ---------------------------------------------------------
     4. FLOATING HEARTS / SPARKLES
     --------------------------------------------------------- */
  const canvas = $("#fx");
  const ctx = canvas.getContext("2d");
  let parts = [];
  let dpr = 1;

  function sizeCanvas() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function seed() {
    const n = cfg.fx.hearts || cfg.fx.sparkles ? cfg.fx.density : 0;
    parts = Array.from({ length: n }, () => spawn(true));
  }
  function spawn(anywhere) {
    const sparkle = cfg.fx.sparkles && (!cfg.fx.hearts || Math.random() < 0.4);
    return {
      x: Math.random() * innerWidth,
      y: anywhere ? Math.random() * innerHeight : innerHeight + 30,
      r: sparkle ? 1 + Math.random() * 2 : 7 + Math.random() * 12,
      vy: (0.25 + Math.random() * 0.7) * (cfg.fx.speed || 1),
      vx: (Math.random() - 0.5) * 0.4,
      a: 0.15 + Math.random() * 0.4,
      rot: Math.random() * Math.PI,
      sparkle,
      phase: Math.random() * 6.28,
    };
  }
  function heartPath(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y, x - s, y - s * 0.2, x - s, y - s * 0.7);
    ctx.bezierCurveTo(x - s, y - s * 1.3, x, y - s * 1.3, x, y - s * 0.85);
    ctx.bezierCurveTo(x, y - s * 1.3, x + s, y - s * 1.3, x + s, y - s * 0.7);
    ctx.bezierCurveTo(x + s, y - s * 0.2, x, y, x, y + s * 0.3);
    ctx.closePath();
  }
  let burst = [];
  function confetti(x, y) {
    if (!cfg.fx.confetti) return;
    for (let i = 0; i < 60; i++) {
      burst.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 9,
        vy: -Math.random() * 9 - 2,
        life: 1,
        c: ["#ffd84d", "#e23b3b", "#4fc0a1", "#b9b6f0", "#ff4d6d"][(Math.random() * 5) | 0],
        s: 4 + Math.random() * 5,
      });
    }
  }
  function loop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    const heart = cfg.theme.heart;
    for (const p of parts) {
      p.y -= p.vy;
      p.x += p.vx + Math.sin((p.phase += 0.01)) * 0.4;
      if (p.y < -40) Object.assign(p, spawn(false));
      ctx.globalAlpha = p.sparkle ? p.a * (0.5 + 0.5 * Math.sin(p.phase * 4)) : p.a;
      if (p.sparkle) {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fill();
      } else {
        ctx.fillStyle = heart;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.sin(p.phase) * 0.25);
        heartPath(0, 0, p.r * 0.6);
        ctx.fill();
        ctx.restore();
      }
    }
    burst = burst.filter((b) => b.life > 0);
    for (const b of burst) {
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.35;
      b.life -= 0.014;
      ctx.globalAlpha = Math.max(0, b.life);
      ctx.fillStyle = b.c;
      ctx.fillRect(b.x, b.y, b.s, b.s * 1.6);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  addEventListener("resize", () => {
    sizeCanvas();
    seed();
  });

  /* ---------------------------------------------------------
     5. MUSIC
     --------------------------------------------------------- */
  const audio = $("#audio");
  const musicBtn = $("#musicBtn");
  function loadMusic() {
    audio.src = cfg.music.src || "";
    audio.volume = cfg.music.volume;
  }
  function toggleMusic(force) {
    const want = force ?? audio.paused;
    if (want && audio.src) {
      audio.play().then(
        () => musicBtn.classList.add("on"),
        () => {}
      );
    } else {
      audio.pause();
      musicBtn.classList.remove("on");
    }
  }
  musicBtn.addEventListener("click", () => toggleMusic());

  /* ---------------------------------------------------------
     6. SCENE ENGINE
     --------------------------------------------------------- */
  const SCENES = [
    "notif",
    "door",
    "museum",
    "donot",
    "cleanup",
    "interlude",
    "envelope",
    "letter",
    "wordsearch",
    "agreement",
    "end",
  ];
  let idx = 0;
  let currentTimers = [];
  const after = (ms, fn) => currentTimers.push(setTimeout(fn, ms / (cfg.fx.speed || 1)));

  function go(target, dir = 1) {
    const i = typeof target === "number" ? target : SCENES.indexOf(target);
    if (i < 0 || i >= SCENES.length) return;
    currentTimers.forEach(clearTimeout);
    currentTimers = [];
    const old = stage.firstElementChild;
    if (old) {
      old.classList.add("out");
      setTimeout(() => old.remove(), 300 / (cfg.fx.speed || 1));
    }
    idx = i;
    const id = SCENES[i];
    applyTheme(id);
    const node = el("section", "scene");
    node.dataset.scene = id;
    setTimeout(
      () => {
        stage.innerHTML = "";
        stage.appendChild(node);
        stage.scrollTop = 0;
        RENDER[id](node);
        renderDots();
      },
      old ? 280 / (cfg.fx.speed || 1) : 0
    );
  }

  function renderDots() {
    const wrap = $("#dots");
    wrap.innerHTML = "";
    SCENES.forEach((s, i) => {
      const b = el("button");
      b.title = s;
      if (i === idx) b.classList.add("on");
      b.addEventListener("click", () => go(i));
      wrap.appendChild(b);
    });
  }

  const nextBtn = (label, extra = "") => {
    const b = el("button", "btn " + extra, esc(label));
    b.addEventListener("click", () => go(idx + 1));
    return b;
  };

  /* ---------------------------------------------------------
     7. SCENE RENDERERS
     --------------------------------------------------------- */
  const RENDER = {};

  /* --- 1. unopened message --- */
  RENDER.notif = (n) => {
    const c = cfg.notif;
    const items = [c.line1, c.line2, c.line3].filter(Boolean);
    n.innerHTML = `
      <p class="eyebrow center">${esc(tokens(c.tag))}</p>
      <div class="notif-stack"></div>
      <div class="row center" style="margin-top:14px"></div>
      <p class="hand center" style="font-size:19px">${esc(tokens(c.foot))}</p>`;
    const stack = $(".notif-stack", n);
    items.forEach((t, i) => {
      const item = el(
        "div",
        "notif",
        `<div class="notif__icon">✉</div>
         <div><div class="notif__meta">${esc(tokens(c.tag))}</div>
         <div class="notif__text">${esc(tokens(t))}</div></div>`
      );
      item.style.setProperty("--d", i * 0.45 + "s");
      stack.appendChild(item);
    });
    const b = el("button", "btn btn--accent", esc(tokens(c.btn)));
    b.style.animation = `notifIn .6s ${items.length * 0.45 + 0.3}s both`;
    b.addEventListener("click", (e) => {
      confetti(e.clientX, e.clientY);
      if (cfg.music.autoplay) toggleMusic(true);
      go(idx + 1);
    });
    $(".row", n).appendChild(b);
  };

  /* --- 2. knock knock door --- */
  RENDER.door = (n) => {
    const c = cfg.door;
    n.innerHTML = `
      <p class="hand">${esc(tokens(c.knock))}</p>
      <div class="door-wrap">
        <div class="door-stage"><div class="door-frame"></div><div class="door" id="door"></div></div>
      </div>
      <h2 class="title center">${esc(tokens(c.hi))}</h2>
      <p class="lead center">${esc(tokens(c.sub))}</p>
      <p class="lead center" style="font-weight:700;opacity:.9">${esc(tokens(c.warn))}</p>
      <div class="row center"></div>`;
    const open = () => {
      $("#door", n).classList.add("open");
      after(900, () => go(idx + 1));
    };
    $("#door", n).addEventListener("click", open);
    const yes = el("button", "btn btn--accent", esc(tokens(c.yes)));
    yes.addEventListener("click", open);
    const no = el("button", "btn btn--ghost btn--flee", esc(tokens(c.no)));
    let dodges = 0;
    no.addEventListener("pointerenter", () => {
      dodges++;
      no.style.transform = `translate(${(Math.random() - 0.5) * 120}px, ${(Math.random() - 0.5) * 60}px)`;
    });
    no.addEventListener("click", () => toast(tokens(c.noReply)));
    $(".row", n).append(yes, no);
  };

  /* --- 3. museum hallway + exhibits --- */
  const seen = new Set();
  RENDER.museum = (n) => {
    const c = cfg.museum;
    n.innerHTML = `
      <h2 class="title center">${esc(tokens(c.title))}</h2>
      <p class="lead center">${esc(tokens(c.sub))}</p>
      <div class="exhibits"></div>
      <div class="row center" style="margin-top:10px"></div>`;
    const grid = $(".exhibits", n);
    c.exhibits.forEach((x, i) => {
      const card = el(
        "div",
        "exhibit-card" + (seen.has(i) ? " seen" : ""),
        `<span class="glyph">${esc(x.glyph || "🖼")}</span><span class="lbl">${esc(x.label)}</span>`
      );
      card.addEventListener("click", () => showExhibit(i));
      grid.appendChild(card);
    });
    const cta = el("button", "btn btn--accent", esc(tokens(c.cta)));
    cta.addEventListener("click", () => go("donot"));
    $(".row", n).appendChild(cta);
  };

  function showExhibit(i) {
    const x = cfg.museum.exhibits[i];
    seen.add(i);
    applyTheme("exhibit");
    const n = el("section", "scene");
    n.dataset.scene = "exhibit";
    n.innerHTML = `
      <span class="tag">${esc(x.label)}</span>
      <div class="frame" id="frame"></div>
      <p class="lead center">${esc(tokens(x.caption))}</p>
      <div class="row center"></div>`;
    const frame = $("#frame", n);

    if (x.kind === "box") {
      frame.innerHTML = `<div class="lockbox">
          <div class="lockbox__box" id="box">🔒</div>
          <p class="hand" id="boxTxt" style="font-size:20px">tap to unlock</p>
        </div>`;
    } else if (x.img) {
      frame.innerHTML = `<div class="frame__media" style="position:relative;overflow:hidden;border-radius:3px">
          <img src="${esc(x.img)}" alt="${esc(x.title)}" /></div>
        <p class="frame__plaque" style="padding:12px 6px 2px">${esc(tokens(x.text))}</p>`;
    } else {
      frame.innerHTML = `<p class="frame__plaque">${esc(tokens(x.text))}</p>`;
    }

    if (x.kind === "curtain") {
      const cur = el(
        "div",
        "curtain",
        `<span></span><span></span><p class="curtain__hint">tap to open the curtain</p>`
      );
      cur.addEventListener("click", () => cur.classList.add("open"));
      ($(".frame__media", n) || frame).appendChild(cur);
    }

    const back = el("button", "btn btn--ghost btn--sm", esc(tokens(cfg.museum.back)));
    back.addEventListener("click", () => go("museum"));
    $(".row", n).appendChild(back);

    const old = stage.firstElementChild;
    if (old) old.classList.add("out");
    setTimeout(() => {
      stage.innerHTML = "";
      stage.appendChild(n);
      const box = $("#box", n);
      if (box)
        box.addEventListener("click", () => {
          box.classList.add("open");
          box.textContent = "🔓";
          $("#boxTxt", n).textContent = tokens(x.text);
        });
    }, 260 / (cfg.fx.speed || 1));
  }

  /* --- 4. do not press --- */
  RENDER.donot = (n) => {
    const c = cfg.donot;
    n.innerHTML = `
      <p class="hand">${esc(tokens(c.hand))}</p>
      <span class="tag" style="align-self:center">${esc(tokens(c.tag))}</span>
      <div class="bigbutton" id="bigbtn" role="button" tabindex="0" aria-label="${esc(c.tag)}"></div>
      <p class="lead center" id="dnNote">${esc(tokens(c.note))}</p>
      <div id="dnOut"></div>`;
    const btn = $("#bigbtn", n);
    const out = $("#dnOut", n);
    let fired = false;

    const press = (e) => {
      if (fired) return;
      fired = true;
      btn.classList.add("pressed");
      confetti(e?.clientX ?? innerWidth / 2, e?.clientY ?? innerHeight / 2);
      $("#dnNote", n).remove();
      out.innerHTML = `<p class="alert-banner">${esc(tokens(c.alert))}</p>
        <p class="eyebrow center" style="margin:6px 0 8px">${esc(tokens(c.running))}</p>
        <div class="terminal" id="term"></div>`;
      const term = $("#term", n);
      c.checks.forEach((raw, i) => {
        const [label, res = ""] = String(raw).split("::").map((s) => s.trim());
        after(500 + i * 750, () => {
          const row = el("div", null, `<span>${esc(tokens(label))}…</span><b>${esc(tokens(res))}</b>`);
          row.style.animation = "fadeUp .4s ease both";
          term.appendChild(row);
        });
      });
      after(600 + c.checks.length * 750, () => {
        const res = el("div", null, "");
        res.style.animation = "fadeUp .6s ease both";
        res.innerHTML = `
          <p class="eyebrow center" style="margin-top:14px">RESULT</p>
          <h2 class="title center">${esc(tokens(c.resultTitle))}</h2>
          <p class="lead center">${esc(tokens(c.resultSub))}</p>
          <div class="row center" style="margin-top:12px">
            <span class="tag" style="background:#ffd0dd">${esc(tokens(c.fine))}</span>
          </div>
          <div class="row center" style="margin-top:10px"><button class="btn btn--accent" id="fate">${esc(
            tokens(c.btn)
          )}</button></div>`;
        out.appendChild(res);
        $("#fate", n).addEventListener("click", () => go(idx + 1));
      });
    };
    btn.addEventListener("click", press);
    btn.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && press());
  };

  /* --- 5. memory cleanup (swipe gallery) --- */
  RENDER.cleanup = (n) => {
    const c = cfg.cleanup;
    n.innerHTML = `
      <h2 class="title">${esc(tokens(c.title))}</h2>
      <div class="row" style="gap:8px">
        <button class="btn btn--sm btn--ghost" id="delBtn">${esc(tokens(c.del))}</button>
        <button class="btn btn--sm" id="keepBtn">${esc(tokens(c.keep))}</button>
      </div>
      <p class="lead">${esc(tokens(c.sub))}</p>
      <div class="polaroids" id="pols"><div class="stamp-verdict" id="verdict"></div></div>
      <div class="row center" id="cleanFoot"></div>`;
    const wrap = $("#pols", n);
    const verdict = $("#verdict", n);
    const list = c.memories.slice().reverse();
    const nodes = [];

    list.forEach((m, i) => {
      const depth = list.length - 1 - i;
      const fig = el("figure", "polaroid");
      fig.innerHTML = `<span class="pin">${esc(m.tag || "")}</span>
        ${m.img ? `<img src="${esc(m.img)}" alt="${esc(m.caption || "memory")}" />` : `<div style="aspect-ratio:1;background:var(--wash)"></div>`}
        <figcaption>${esc(tokens(m.caption || ""))}</figcaption>`;
      fig.style.transform = `translateY(${-depth * 6}px) rotate(${(depth % 2 ? 1 : -1) * depth * 2}deg) scale(${1 - depth * 0.03})`;
      fig.style.zIndex = String(10 + i);
      wrap.appendChild(fig);
      nodes.push(fig);
    });

    let alive = nodes.length;
    const top = () => nodes[nodes.length - 1];

    function dismiss(dir) {
      const card = top();
      if (!card) return;
      verdict.textContent = dir < 0 ? tokens(c.deleteVerdict) : tokens(c.keepVerdict);
      verdict.style.color = dir < 0 ? "#c0392b" : "#1a7a52";
      verdict.classList.remove("show");
      void verdict.offsetWidth;
      verdict.classList.add("show");
      card.classList.add(dir < 0 ? "gone-left" : "gone-right");
      nodes.pop();
      alive--;
      setTimeout(() => card.remove(), 400);
      if (!alive) finish();
    }

    function finish() {
      const done = el("div", "center", `<p class="hand" style="font-size:26px">${esc(tokens(c.done))}</p>`);
      done.style.animation = "fadeUp .6s ease both";
      wrap.appendChild(done);
      const b = nextBtn(tokens(c.next), "btn--accent");
      $("#cleanFoot", n).appendChild(b);
      confetti(innerWidth / 2, innerHeight / 2);
    }

    // drag to swipe
    nodes.forEach((card) => {
      let sx = 0,
        dx = 0,
        dragging = false;
      card.addEventListener("pointerdown", (e) => {
        if (card !== top()) return;
        dragging = true;
        sx = e.clientX;
        card.setPointerCapture(e.pointerId);
        card.style.transition = "none";
      });
      card.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        dx = e.clientX - sx;
        card.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
      });
      const end = () => {
        if (!dragging) return;
        dragging = false;
        card.style.transition = "";
        if (Math.abs(dx) > 90) dismiss(Math.sign(dx));
        else card.style.transform = "";
        dx = 0;
      };
      card.addEventListener("pointerup", end);
      card.addEventListener("pointercancel", end);
    });

    $("#delBtn", n).addEventListener("click", () => dismiss(-1));
    $("#keepBtn", n).addEventListener("click", () => dismiss(1));
  };

  /* --- 6. interlude --- */
  RENDER.interlude = (n) => {
    const c = cfg.interlude;
    n.innerHTML = `<div class="interlude">${c.lines
      .map((l, i) => `<span style="--d:${i * 1.1}s">${esc(tokens(l))}</span>`)
      .join("")}</div>
      <p class="lead center" style="margin-top:22px">${esc(tokens(c.hint))}</p>`;
    after(c.lines.length * 1100 + 400, () => n.addEventListener("click", () => go(idx + 1), { once: true }));
    after(c.lines.length * 1100 + 3600, () => go(idx + 1));
  };

  /* --- 7. envelope --- */
  RENDER.envelope = (n) => {
    const c = cfg.envelope;
    n.innerHTML = `
      <div class="env-stage">
        <div class="envelope" id="env">
          <div class="env__body"></div>
          <div class="env__flap"></div>
          <div class="env__seal">♥</div>
        </div>
      </div>
      <p class="env__hint" id="envHint">${esc(tokens(c.hint))}</p>`;
    const env = $("#env", n);
    let sx = null;
    const open = () => {
      if (env.classList.contains("open")) return;
      env.classList.add("open");
      $("#envHint", n).textContent = tokens(c.opened);
      after(1100, () => go(idx + 1));
    };
    env.addEventListener("pointerdown", (e) => (sx = e.clientX));
    env.addEventListener("pointermove", (e) => {
      if (sx != null && Math.abs(e.clientX - sx) > 60) open();
    });
    env.addEventListener("pointerup", () => (sx = null));
    env.addEventListener("click", open);
  };

  /* --- 8. handwritten letter --- */
  const markup = (s) =>
    esc(tokens(s))
      .replace(/==(.+?)==/g, '<span class="hl">$1</span>')
      .replace(/~~(.+?)~~/g, '<span class="hl">$1</span>');

  RENDER.letter = (n) => {
    const c = cfg.letter;
    n.innerHTML = `<div class="ruled" id="ruled"></div><div class="row center" id="letterFoot"></div>`;
    const ruled = $("#ruled", n);
    const lines = [c.greeting, ...c.lines, c.sign];

    lines.forEach((raw, i) => {
      const isSign = i === lines.length - 1;
      const p = el("p", "letter-line" + (isSign ? " sign" : "") + (/~~/.test(raw) ? " pink" : ""));
      p.innerHTML = markup(raw);
      ruled.appendChild(p);
      after(300 + i * (cfg.fx.lineDelay || 900), () => {
        p.classList.add("in");
        ruled.parentElement.scrollTop = ruled.parentElement.scrollHeight;
      });
    });

    after(500 + lines.length * (cfg.fx.lineDelay || 900), () => {
      const b = el("button", "btn btn--accent", esc(tokens(c.btn)));
      b.addEventListener("click", () => {
        b.remove();
        const sys = el("div", "sysmsg");
        sys.innerHTML = `<h4>${esc(tokens(c.sysTitle))}</h4>
          <p style="margin:0">${esc(tokens(c.sysBody))}</p>
          <button class="btn btn--sm btn--danger" id="fix">${esc(tokens(c.sysBtn))}</button>`;
        n.appendChild(sys);
        $("#fix", n).addEventListener("click", () => go(idx + 1));
      });
      $("#letterFoot", n).appendChild(b);
    });
  };

  /* --- 9. word search --- */
  function buildGrid(words, size) {
    const g = Array.from({ length: size }, () => Array(size).fill(""));
    const found = [];
    const dirs = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ];
    for (const w of words) {
      const word = String(w).toUpperCase().replace(/[^A-Z]/g, "");
      if (!word) continue;
      let placed = false;
      for (let attempt = 0; attempt < 400 && !placed; attempt++) {
        const [dx, dy] = dirs[(Math.random() * dirs.length) | 0];
        const x = (Math.random() * size) | 0;
        const y = (Math.random() * size) | 0;
        const ex = x + dx * (word.length - 1);
        const ey = y + dy * (word.length - 1);
        if (ex < 0 || ey < 0 || ex >= size || ey >= size) continue;
        let ok = true;
        for (let i = 0; i < word.length; i++) {
          const cell = g[y + dy * i][x + dx * i];
          if (cell && cell !== word[i]) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        const cells = [];
        for (let i = 0; i < word.length; i++) {
          g[y + dy * i][x + dx * i] = word[i];
          cells.push((y + dy * i) * size + (x + dx * i));
        }
        found.push({ word, cells });
        placed = true;
      }
    }
    const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) if (!g[y][x]) g[y][x] = A[(Math.random() * 26) | 0];
    return { g, found };
  }

  RENDER.wordsearch = (n) => {
    const c = cfg.wordsearch;
    const size = Math.max(8, Math.min(13, Math.max(...c.words.map((w) => String(w).length)) + 2));
    const { g, found } = buildGrid(c.words, size);
    n.innerHTML = `
      <p class="hand center">${esc(tokens(c.title))}</p>
      <div class="ws-grid" id="ws" style="grid-template-columns:repeat(${size},1fr)"></div>
      <p class="ws-legend">${c.words.map((w) => `<span>${esc(w)}</span>`).join("")}</p>
      <div class="row center"><button class="btn btn--accent" id="reveal">${esc(tokens(c.btn))}</button></div>
      <div id="wsOut"></div>`;
    const grid = $("#ws", n);
    g.flat().forEach((ch) => grid.appendChild(el("span", null, ch)));

    $("#reveal", n).addEventListener("click", (e) => {
      e.target.remove();
      found.forEach((f, wi) =>
        f.cells.forEach((ci, i) =>
          after(wi * 420 + i * 70, () => grid.children[ci]?.classList.add("hit"))
        )
      );
      const total = found.reduce((m, f) => Math.max(m, f.cells.length), 0);
      after(found.length * 420 + total * 70 + 300, () => {
        confetti(innerWidth / 2, innerHeight / 2);
        const out = $("#wsOut", n);
        out.innerHTML = `<h2 class="title center" style="animation:fadeUp .6s ease both">${esc(
          tokens(c.success)
        )}</h2>`;
        const b = nextBtn(tokens(c.next), "btn--accent");
        const row = el("div", "row center");
        row.style.marginTop = "12px";
        row.appendChild(b);
        out.appendChild(row);
      });
    });
  };

  /* --- 10. renewal agreement --- */
  RENDER.agreement = (n) => {
    const c = cfg.agreement;
    n.innerHTML = `
      <div class="contract">
        <h3>${esc(tokens(c.title))}</h3>
        <p class="lead">${esc(tokens(c.intro))}</p>
        <div id="clauses" style="display:grid;gap:9px"></div>
        <div class="contract__meta">
          <div>Term: ${esc(tokens(c.term))}</div>
          <div>Cancellation policy: ${esc(tokens(c.cancel))}</div>
        </div>
        <div class="sign-line" id="signLine"></div>
        <div class="stamp" id="stamp">${esc(tokens(c.stamp))}</div>
      </div>
      <p class="lead center" id="agHint">${esc(tokens(c.hint))}</p>
      <div class="row center"><button class="btn btn--accent" id="accept" disabled>${esc(
        tokens(c.btn)
      )}</button></div>`;
    const box = $("#clauses", n);
    let ticked = 0;
    c.clauses.forEach((t) => {
      const row = el("label", "clause", `<i>✓</i><span>${esc(tokens(t))}</span>`);
      row.addEventListener("click", () => {
        if (row.classList.contains("on")) return;
        row.classList.add("on");
        ticked++;
        if (ticked === c.clauses.length) {
          $("#accept", n).disabled = false;
          $("#agHint", n).textContent = "";
        }
      });
      box.appendChild(row);
    });
    $("#accept", n).addEventListener("click", (e) => {
      $("#signLine", n).textContent = tokens("{to}");
      $("#stamp", n).classList.add("on");
      e.target.remove();
      confetti(innerWidth / 2, innerHeight / 2);
      after(1000, () => {
        const row = el("div", "row center");
        row.appendChild(nextBtn(tokens(c.next), "btn--accent"));
        n.appendChild(row);
      });
    });
  };

  /* --- 11. the end --- */
  RENDER.end = (n) => {
    const c = cfg.end;
    n.innerHTML = `<div class="the-end">
        <p class="big">${esc(tokens(c.title))}</p>
        <p class="lead">${esc(tokens(c.sub))}</p>
        <p class="heart">♥</p>
        <p class="tiny">${esc(tokens(c.tiny))}</p>
        <button class="btn btn--ghost btn--sm" id="replay">${esc(tokens(c.replay))}</button>
      </div>`;
    $("#replay", n).addEventListener("click", () => {
      seen.clear();
      go(0);
    });
    confetti(innerWidth / 2, innerHeight * 0.4);
  };

  /* ---------------------------------------------------------
     8. SETTINGS PANEL
     --------------------------------------------------------- */
  const FONTS = [
    ["'Fraunces', Georgia, serif", "Fraunces"],
    ["'Caveat', cursive", "Caveat"],
    ["'Plus Jakarta Sans', system-ui, sans-serif", "Plus Jakarta Sans"],
    ["'Courier Prime', monospace", "Courier Prime"],
    ["Georgia, serif", "Georgia"],
  ];

  const SCHEMA = [
    {
      tab: "Look",
      fields: [
        { h: "Global" },
        { p: "theme.accent", t: "color", l: "Accent colour" },
        { p: "theme.heart", t: "color", l: "Hearts colour" },
        { p: "theme.radius", t: "range", l: "Corner roundness", min: 0, max: 40 },
        { p: "theme.fs", t: "range", l: "Base text size", min: 14, max: 20 },
        { p: "theme.tape", t: "check", l: "Washi tape corners" },
        { p: "theme.fontDisplay", t: "select", l: "Display font", opts: FONTS },
        { p: "theme.fontHand", t: "select", l: "Handwriting font", opts: FONTS },
        { p: "theme.fontBody", t: "select", l: "Body font", opts: FONTS },
        { h: "Scene colours" },
        ...[
          ["notif", "Unopened message"],
          ["door", "Knock knock door"],
          ["museum", "Museum hallway"],
          ["exhibit", "Exhibit page"],
          ["donot", "Do not press"],
          ["cleanup", "Memory cleanup"],
          ["interlude", "Interlude"],
          ["envelope", "Envelope"],
          ["letter", "Letter"],
          ["wordsearch", "Word search"],
          ["agreement", "Agreement"],
          ["end", "The end"],
        ].flatMap(([k, label]) => [
          { p: `theme.scenes.${k}.bg`, t: "color", l: label + " — background" },
          { p: `theme.scenes.${k}.ink`, t: "color", l: label + " — text" },
        ]),
      ],
    },
    {
      tab: "Names",
      fields: [
        { p: "meta.to", t: "text", l: "Their name (use {to} anywhere)" },
        { p: "meta.from", t: "text", l: "Your name (use {from} anywhere)" },
        { p: "meta.credit", t: "text", l: "Caption under the card" },
      ],
    },
    {
      tab: "Intro",
      fields: [
        { h: "Unopened message" },
        { p: "notif.tag", t: "text", l: "Notification label" },
        { p: "notif.line1", t: "text", l: "Notification 1" },
        { p: "notif.line2", t: "text", l: "Notification 2" },
        { p: "notif.line3", t: "text", l: "Notification 3" },
        { p: "notif.btn", t: "text", l: "Open button" },
        { p: "notif.foot", t: "text", l: "Handwritten footnote" },
        { h: "Knock knock" },
        { p: "door.knock", t: "text", l: "Handwritten note" },
        { p: "door.hi", t: "text", l: "Greeting" },
        { p: "door.sub", t: "text", l: "Subtitle" },
        { p: "door.warn", t: "text", l: "Warning line" },
        { p: "door.yes", t: "text", l: "Yes button" },
        { p: "door.no", t: "text", l: "No button" },
        { p: "door.noReply", t: "text", l: "No-button reply" },
      ],
    },
    {
      tab: "Museum",
      fields: [
        { p: "museum.title", t: "area", l: "Hall title" },
        { p: "museum.sub", t: "text", l: "Hall subtitle" },
        { p: "museum.cta", t: "text", l: "Continue button" },
        { p: "museum.back", t: "text", l: "Back button" },
        { h: "Exhibits" },
        { p: "museum.exhibits", t: "exhibits" },
      ],
    },
    {
      tab: "Button",
      fields: [
        { p: "donot.hand", t: "text", l: "Handwritten note" },
        { p: "donot.tag", t: "text", l: "Sticker label" },
        { p: "donot.note", t: "text", l: "Small note" },
        { p: "donot.alert", t: "text", l: "Alert banner" },
        { p: "donot.running", t: "text", l: "Diagnostic heading" },
        { p: "donot.checks", t: "lines", l: "Diagnostic lines", hint: "One per line · format: label :: result" },
        { p: "donot.resultTitle", t: "text", l: "Result title" },
        { p: "donot.resultSub", t: "area", l: "Result subtitle" },
        { p: "donot.fine", t: "text", l: "Fine print sticker" },
        { p: "donot.btn", t: "text", l: "Accept button" },
      ],
    },
    {
      tab: "Memories",
      fields: [
        { p: "cleanup.title", t: "area", l: "Title" },
        { p: "cleanup.sub", t: "text", l: "Subtitle" },
        { p: "cleanup.del", t: "text", l: "Delete button" },
        { p: "cleanup.keep", t: "text", l: "Keep button" },
        { p: "cleanup.deleteVerdict", t: "text", l: "Delete stamp" },
        { p: "cleanup.keepVerdict", t: "text", l: "Keep stamp" },
        { p: "cleanup.done", t: "area", l: "Finished note" },
        { p: "cleanup.next", t: "text", l: "Next button" },
        { h: "Photos" },
        { p: "cleanup.memories", t: "memories" },
      ],
    },
    {
      tab: "Letter",
      fields: [
        { p: "interlude.lines", t: "lines", l: "Interlude lines", hint: "One per line" },
        { p: "interlude.hint", t: "text", l: "Interlude hint" },
        { h: "Envelope" },
        { p: "envelope.hint", t: "text", l: "Envelope hint" },
        { p: "envelope.opened", t: "text", l: "After opening" },
        { h: "The letter" },
        { p: "letter.greeting", t: "text", l: "Greeting" },
        {
          p: "letter.lines",
          t: "lines",
          l: "Letter lines",
          hint: "One per line · wrap in ==yellow highlight== or ~~pink highlight~~",
        },
        { p: "letter.sign", t: "text", l: "Signature" },
        { p: "letter.btn", t: "text", l: "Button under the letter" },
        { p: "letter.sysTitle", t: "text", l: "System message title" },
        { p: "letter.sysBody", t: "area", l: "System message body" },
        { p: "letter.sysBtn", t: "text", l: "System message button" },
      ],
    },
    {
      tab: "Endgame",
      fields: [
        { h: "Word search" },
        { p: "wordsearch.title", t: "text", l: "Prompt" },
        { p: "wordsearch.words", t: "lines", l: "Hidden words", hint: "One per line, letters only" },
        { p: "wordsearch.btn", t: "text", l: "Reveal button" },
        { p: "wordsearch.success", t: "area", l: "Success message" },
        { p: "wordsearch.next", t: "text", l: "Next button" },
        { h: "Agreement" },
        { p: "agreement.title", t: "text", l: "Contract title" },
        { p: "agreement.intro", t: "text", l: "Intro line" },
        { p: "agreement.clauses", t: "lines", l: "Clauses", hint: "One per line" },
        { p: "agreement.term", t: "text", l: "Term" },
        { p: "agreement.cancel", t: "text", l: "Cancellation policy" },
        { p: "agreement.hint", t: "text", l: "Hint" },
        { p: "agreement.btn", t: "text", l: "Accept button" },
        { p: "agreement.stamp", t: "text", l: "Stamp text" },
        { h: "The end" },
        { p: "end.title", t: "text", l: "Big line" },
        { p: "end.sub", t: "text", l: "Sub line" },
        { p: "end.tiny", t: "text", l: "Tiny line" },
        { p: "end.replay", t: "text", l: "Replay button" },
      ],
    },
    {
      tab: "Music & FX",
      fields: [
        { h: "Music" },
        { p: "music.src", t: "audio", l: "Background music" },
        { p: "music.autoplay", t: "check", l: "Start music on the first tap" },
        { p: "music.volume", t: "range", l: "Volume", min: 0, max: 1, step: 0.05 },
        { h: "Effects" },
        { p: "fx.hearts", t: "check", l: "Floating hearts" },
        { p: "fx.sparkles", t: "check", l: "Sparkles" },
        { p: "fx.confetti", t: "check", l: "Confetti bursts" },
        { p: "fx.density", t: "range", l: "How many particles", min: 0, max: 80 },
        { p: "fx.speed", t: "range", l: "Animation speed", min: 0.5, max: 2, step: 0.1 },
        { p: "fx.lineDelay", t: "range", l: "Letter line delay (ms)", min: 250, max: 2000, step: 50 },
      ],
    },
  ];

  const panel = $("#panel");
  const panelBody = $("#panelBody");
  const panelTabs = $("#panelTabs");
  let activeTab = 0;

  function readFile(file, cb) {
    const fr = new FileReader();
    fr.onload = () => cb(fr.result);
    fr.readAsDataURL(file);
  }

  function refresh() {
    save();
    applyTheme(SCENES[idx]);
    seed();
    audio.volume = cfg.music.volume;
    $("#credit").textContent = tokens(cfg.meta.credit);
  }

  function buildField(f) {
    if (f.h) {
      const h = el("h3", null, esc(f.h));
      return h;
    }
    const wrap = el("label", "field");
    const val = get(f.p);

    if (f.t === "memories") return buildMemories();
    if (f.t === "exhibits") return buildExhibits();

    wrap.appendChild(el("span", null, esc(f.l || f.p)));

    let input;
    if (f.t === "area") {
      input = el("textarea");
      input.rows = 3;
      input.value = val ?? "";
    } else if (f.t === "lines") {
      input = el("textarea");
      input.rows = Math.min(12, (val || []).length + 2);
      input.value = (val || []).join("\n");
    } else if (f.t === "color") {
      input = el("input");
      input.type = "color";
      input.value = val;
    } else if (f.t === "range") {
      input = el("input");
      input.type = "range";
      input.min = f.min;
      input.max = f.max;
      input.step = f.step ?? 1;
      input.value = val;
    } else if (f.t === "check") {
      wrap.classList.add("inline");
      input = el("input");
      input.type = "checkbox";
      input.checked = !!val;
    } else if (f.t === "select") {
      input = el("select");
      f.opts.forEach(([v, label]) => {
        const o = el("option", null, label);
        o.value = v;
        input.appendChild(o);
      });
      input.value = val;
    } else if (f.t === "audio") {
      input = el("input");
      input.type = "file";
      input.accept = "audio/*";
      input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file) return;
        readFile(file, (d) => {
          set("music.src", d);
          set("music.name", file.name);
          loadMusic();
          toast("Music updated");
        });
      });
      wrap.appendChild(input);
      wrap.appendChild(el("span", "hint", esc(cfg.music.name || "custom track")));
      return wrap;
    } else {
      input = el("input");
      input.type = "text";
      input.value = val ?? "";
    }

    const commit = () => {
      let v;
      if (f.t === "check") v = input.checked;
      else if (f.t === "range") v = parseFloat(input.value);
      else if (f.t === "lines") v = input.value.split("\n").filter((l) => l.trim() !== "");
      else v = input.value;
      set(f.p, v);
      refresh();
      if (!f.p.startsWith("theme") && !f.p.startsWith("fx") && !f.p.startsWith("music")) rerenderScene();
    };
    input.addEventListener("input", commit);
    input.addEventListener("change", commit);
    wrap.appendChild(input);
    if (f.hint) wrap.appendChild(el("span", "hint", esc(f.hint)));
    return wrap;
  }

  let rerenderT;
  function rerenderScene() {
    clearTimeout(rerenderT);
    rerenderT = setTimeout(() => go(idx), 450);
  }

  function buildMemories() {
    const box = el("div", "mini-list");
    cfg.cleanup.memories.forEach((m, i) => {
      const item = el("div", "mini-item");
      item.innerHTML = `<img src="${esc(m.img || "")}" alt="" />
        <input type="text" placeholder="Caption" value="${esc(m.caption || "")}" data-k="caption" />
        <input type="text" placeholder="Tag" value="${esc(m.tag || "")}" data-k="tag" />
        <div class="row">
          <label class="btn btn--sm btn--ghost">Photo<input type="file" accept="image/*" hidden /></label>
          <button class="btn btn--sm btn--danger">Remove</button>
        </div>`;
      $$("input[type=text]", item).forEach((inp) =>
        inp.addEventListener("input", () => {
          m[inp.dataset.k] = inp.value;
          save();
          rerenderScene();
        })
      );
      $("input[type=file]", item).addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        readFile(file, (d) => {
          m.img = d;
          save();
          $("img", item).src = d;
          rerenderScene();
        });
      });
      $("button.btn--danger", item).addEventListener("click", () => {
        cfg.cleanup.memories.splice(i, 1);
        save();
        renderPanel();
        rerenderScene();
      });
      box.appendChild(item);
    });
    const add = el("button", "btn btn--sm", "+ Add photo");
    add.addEventListener("click", () => {
      cfg.cleanup.memories.push({ img: "", caption: "A new memory", tag: "" });
      save();
      renderPanel();
      rerenderScene();
    });
    box.appendChild(add);
    return box;
  }

  function buildExhibits() {
    const box = el("div", "mini-list");
    cfg.museum.exhibits.forEach((x, i) => {
      const item = el("div", "mini-item");
      item.innerHTML = `
        <input type="text" value="${esc(x.label)}" data-k="label" placeholder="Exhibit A" />
        <input type="text" value="${esc(x.glyph || "")}" data-k="glyph" placeholder="Icon (emoji)" />
        <textarea rows="2" data-k="text" placeholder="Plaque text">${esc(x.text || "")}</textarea>
        <textarea rows="2" data-k="caption" placeholder="Caption">${esc(x.caption || "")}</textarea>
        <select data-k="kind">
          <option value="plaque">Plain plaque</option>
          <option value="curtain">Hidden behind a curtain</option>
          <option value="box">Locked box</option>
        </select>
        ${x.img ? `<img src="${esc(x.img)}" alt="" />` : ""}
        <div class="row">
          <label class="btn btn--sm btn--ghost">Photo<input type="file" accept="image/*" hidden /></label>
          <button class="btn btn--sm btn--danger">Remove</button>
        </div>`;
      $("select", item).value = x.kind || "plaque";
      $$("[data-k]", item).forEach((inp) =>
        inp.addEventListener("input", () => {
          x[inp.dataset.k] = inp.value;
          save();
          rerenderScene();
        })
      );
      $("input[type=file]", item).addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        readFile(file, (d) => {
          x.img = d;
          save();
          renderPanel();
          rerenderScene();
        });
      });
      $("button.btn--danger", item).addEventListener("click", () => {
        cfg.museum.exhibits.splice(i, 1);
        save();
        renderPanel();
        rerenderScene();
      });
      box.appendChild(item);
    });
    const add = el("button", "btn btn--sm", "+ Add exhibit");
    add.addEventListener("click", () => {
      cfg.museum.exhibits.push({
        label: "Exhibit " + String.fromCharCode(65 + cfg.museum.exhibits.length),
        glyph: "🖼",
        kind: "plaque",
        text: "Something worth putting in a museum.",
        caption: "",
        img: "",
      });
      save();
      renderPanel();
      rerenderScene();
    });
    box.appendChild(add);
    return box;
  }

  function renderPanel() {
    panelTabs.innerHTML = "";
    SCHEMA.forEach((grp, i) => {
      const b = el("button", i === activeTab ? "on" : "", esc(grp.tab));
      b.addEventListener("click", () => {
        activeTab = i;
        renderPanel();
      });
      panelTabs.appendChild(b);
    });
    panelBody.innerHTML = "";
    SCHEMA[activeTab].fields.forEach((f) => panelBody.appendChild(buildField(f)));
  }

  const openPanel = (on) => {
    panel.classList.toggle("open", on);
    $("#scrim").classList.toggle("on", on);
    if (on) renderPanel();
  };
  $("#btnSettings").addEventListener("click", () => openPanel(true));
  $("#panelClose").addEventListener("click", () => openPanel(false));
  $("#scrim").addEventListener("click", () => openPanel(false));
  $("#btnBack").addEventListener("click", () => go(Math.max(0, idx - 1)));

  $("#exportCfg").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: "application/json" });
    const a = el("a");
    a.href = URL.createObjectURL(blob);
    a.download = "museum-of-us-settings.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $("#importCfg").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    file.text().then((txt) => {
      try {
        cfg = merge(DEFAULTS, JSON.parse(txt));
        save();
        renderPanel();
        loadMusic();
        refresh();
        go(idx);
        toast("Settings imported");
      } catch (err) {
        toast("That file isn't valid settings JSON");
      }
    });
  });
  $("#resetCfg").addEventListener("click", () => {
    if (!confirm("Reset everything back to the original content?")) return;
    localStorage.removeItem(KEY);
    cfg = clone(DEFAULTS);
    renderPanel();
    loadMusic();
    refresh();
    go(0);
  });

  /* keyboard nav */
  addEventListener("keydown", (e) => {
    if (panel.classList.contains("open")) {
      if (e.key === "Escape") openPanel(false);
      return;
    }
    if (e.key === "ArrowRight") go(idx + 1);
    if (e.key === "ArrowLeft") go(idx - 1);
  });

  /* first tap can start the music */
  addEventListener(
    "pointerdown",
    () => {
      if (cfg.music.autoplay) toggleMusic(true);
    },
    { once: true }
  );

  /* ---------------------------------------------------------
     9. BOOT
     --------------------------------------------------------- */
  sizeCanvas();
  seed();
  loop();
  loadMusic();
  refresh();
  go(0);
  addEventListener("load", () => setTimeout(() => $("#loader").classList.add("hide"), 350));
  setTimeout(() => $("#loader").classList.add("hide"), 2200);
})();
