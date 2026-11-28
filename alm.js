// alm.js v1 (v1.56) - Pantalla ACCESO: ALMIRANTAZGO: editar los .txt del almirante sin entrar en GitHub.
// Se abre con la dirección …/cdsn-web/#almirantazgo. Solo guarda con un token de GitHub del almirante,
// que se queda en su navegador (localStorage). Sin token se puede mirar, pero no guardar.
// Respeta los comentarios (#) de cada archivo: solo cambia las líneas que se tocan.
(() => {
"use strict";
const DUENO = "ortemedder", API = "https://api.github.com", KTOK = "cdsn_alm_token";
const ARCH = {
  op:  {repo: "cdsn-datos", path: "operaciones.txt", nom: "🛡 Operaciones", tipo: "op",
        ayuda: "Lo que hace CDSN a propósito (p. ej. bajar nuestra influencia para que otra facción no se retire). Mientras dure, la web pone 🛡 OPERACIÓN PROPIA, no salta el FLASH y la IA lo explica. Al pasar la fecha se ignora sola."},
  nf:  {repo: "cdsn-datos", path: "noticia_fija.txt", nom: "📌 Noticia fija", tipo: "nf",
        ayuda: "Sale en La Crónica como 📌 COMUNICADO DEL ALMIRANTE. Primera línea = titular; el resto, el texto. **así** = negrita. Una línea con solo --- separa dos noticias. Vacío = sin noticia fija."},
  imp: {repo: "cdsn-datos", path: "imprescindibles.txt", nom: "◆ Imprescindibles", tipo: "imp",
        ayuda: "Los sistemas que no queremos perder. Nivel 1 (◆): controlarlos. Nivel 2 (◇): no perder presencia. Sus alertas van siempre primero y pueden lanzar el FLASH."},
  arq: {repo: "cdsn-datos", path: "arquitectos.txt", nom: "🏗 Arquitectos", tipo: "arq",
        ayuda: "Quién colonizó cada sistema. Si es un CMDR de CDSN, la web le avisa cuando su sistema está en peligro. «heredado *» = anterior a la colonización. El escucha añade al final los sistemas nuevos."},
  mie: {repo: "cdsn-web", path: "miembros.txt", nom: "👥 Miembros", tipo: "mie",
        ayuda: "Miembros de CDSN tal cual salen en el juego (uno por fila). Sirve para las insignias doradas, «A avisar hoy» y la pestaña Miembros."}
};
const ESP = ["heredado *", "colonizado (arquitecto oculto)"];
let TIT0 = document.title, TAB = "op", ST = {}, MSG = "", BUSCA = {arq: "", mie: ""}, REVISA = null, OCUP = false;

// ---------- utilidades ----------
const $ = s => document.querySelector(s);
const e_ = s => (typeof esc == "function" ? esc(s) : String(s ?? "").replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c])));
const tok = () => { try { return localStorage.getItem(KTOK) || ""; } catch (x) { return ""; } };
const b64e = s => { const b = new TextEncoder().encode(s); let r = ""; for (let i = 0; i < b.length; i += 0x8000) r += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(r); };
const b64d = s => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g, "")), c => c.charCodeAt(0)));
const esCom = t => !t.trim() || t.trim().startsWith("#");
const sisCDSN = () => (typeof D != "undefined" && D && D.sistemas) ? Object.keys(D.sistemas).filter(n => !D.sistemas[n].fuera) : [];
const miembros = () => (typeof MIEM != "undefined" && MIEM) ? [...MIEM.values()] : [];
const hoyIso = () => new Date().toLocaleDateString("sv-SE", {timeZone: "Europe/Madrid"});
function parecido(n, L) {  // el nombre más parecido (para «¿quisiste decir…?»)
  const a = n.toLowerCase(); let best = "", bd = 99;
  for (const x of L) { const b = x.toLowerCase(); if (Math.abs(a.length - b.length) > 3) continue;
    const d = lev(a, b); if (d < bd) { bd = d; best = x; } }
  return bd <= 3 ? best : "";
}
function lev(a, b) { const m = a.length, n = b.length, d = Array.from({length: m + 1}, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] == b[j - 1] ? 0 : 1));
  return d[m][n]; }

// ---------- GitHub ----------
async function gh(metodo, repo, path, cuerpo) {
  const h = {"Accept": "application/vnd.github+json"}; const t = tok();
  if (t) h.Authorization = "Bearer " + t;
  if (cuerpo) h["Content-Type"] = "application/json";
  const r = await fetch(`${API}/repos/${DUENO}/${repo}/contents/${path}` + (metodo == "GET" ? "?ref=main&_=" + Date.now() : ""),
    {method: metodo, headers: h, body: cuerpo ? JSON.stringify(cuerpo) : undefined, cache: "no-store"});
  const exp = r.headers.get("github-authentication-token-expiration");
  if (exp) ST._caduca = exp;
  let j = null; try { j = await r.json(); } catch (x) {}
  if (!r.ok) { const er = new Error((j && j.message) || ("HTTP " + r.status)); er.status = r.status; throw er; }
  return j;
}
async function carga(k, forzar) {
  if (ST[k] && !forzar) return;
  const A = ARCH[k];
  ST[k] = {cargando: true};
  try {
    let txt, sha = null;
    if (tok()) { const j = await gh("GET", A.repo, A.path); txt = b64d(j.content || ""); sha = j.sha; }
    else { const r = await fetch(`https://raw.githubusercontent.com/${DUENO}/${A.repo}/main/${A.path}?${Date.now()}`); if (!r.ok) throw new Error("HTTP " + r.status); txt = await r.text(); }
    const fin = txt.endsWith("\n");
    ST[k] = {orig: txt, sha, fin, L: (fin ? txt.slice(0, -1) : txt).split("\n").map(t => ({t}))};
  } catch (x) {
    ST[k] = {error: x.status == 401 ? "El token no vale o ha caducado. Pon uno nuevo." : x.status == 404 ? "No encuentro el archivo (o el token no tiene acceso a " + A.repo + ")." : "No se pudo leer: " + x.message};
  }
  pinta();
}
const texto = k => { const S = ST[k]; return S.L.filter(l => !l.del).map(l => l.t).join("\n") + (S.fin ? "\n" : ""); };
const cambiado = k => ST[k] && ST[k].L && texto(k) != ST[k].orig;

// ---------- formatos de cada archivo ----------
const RX_HASTA = /\s*[·\-,;]?\s*hasta\s+(\d{1,2})[/.-](\d{1,2})(?:[/.-](\d{2,4}))?\s*$/i;
function opLee(t) { const i = t.indexOf("="); const sys = t.slice(0, i).trim(); let q = t.slice(i + 1).trim(), f = "";
  const m = q.match(RX_HASTA);
  if (m) { let y = m[3] ? +m[3] : new Date().getFullYear(); if (y < 100) y += 2000;
    f = `${y}-${String(m[2]).padStart(2, "0")}-${String(m[1]).padStart(2, "0")}`; q = q.slice(0, m.index).trim(); }
  return {sys, q, f}; }
function opEsc(o) { let h = ""; if (o.f) { const [y, m, d] = o.f.split("-"); h = ` · hasta ${d}/${m}` + (+y != new Date().getFullYear() ? "/" + y : ""); }
  return `${o.sys.trim()} = ${o.q.trim()}${h}`; }
const filasKV = k => ST[k].L.map((l, i) => [l, i]).filter(([l]) => !l.del && !esCom(l.t) && l.t.includes("="));
function nivDe(L, i) { let n = 1; for (let j = 0; j <= i; j++) { const m = L[j].t.trim().match(/^\[\s*nivel\s*(\d+)\s*\]$/i); if (m && !L[j].del) n = +m[1]; } return n; }

// ---------- comprobaciones (errores bloquean el guardado; avisos no) ----------
function revisa(k) {
  const S = ST[k], err = [], av = [], SIS = sisCDSN(), sis = new Set(SIS.map(x => x.toLowerCase())), hay = SIS.length > 0;
  const malSis = (n, donde) => { if (hay && !sis.has(n.toLowerCase())) { const p = parecido(n, SIS); return `${donde}: «${n}» no es un sistema de CDSN` + (p ? ` · ¿quisiste decir «${p}»?` : ""); } return ""; };
  if (!S || !S.L) return {err, av};
  if (k == "op") {
    const vistos = new Set();
    for (const [l, i] of filasKV(k)) { const o = opLee(l.t), fila = "Fila «" + (o.sys || "?") + "»";
      if (!o.sys) err.push("Hay una operación sin sistema");
      else { const m = malSis(o.sys, fila); if (m) err.push(m); if (vistos.has(o.sys.toLowerCase())) err.push(fila + ": repetida"); vistos.add(o.sys.toLowerCase()); }
      if (!o.q) err.push(fila + ": falta qué hacemos");
      if (!o.f) av.push(fila + ": sin fecha, dura 7 días desde que se guarda");
      else if (o.f < hoyIso()) av.push(fila + ": la fecha ya pasó (se ignora; puedes borrarla)"); }
  }
  if (k == "imp") {
    const vistos = new Set();
    S.L.forEach((l, i) => { if (l.del || esCom(l.t) || /^\[/.test(l.t.trim())) return; const n = l.t.trim();
      const m = malSis(n, "Imprescindible"); if (m) err.push(m);
      if (vistos.has(n.toLowerCase())) err.push(`«${n}» está repetido`); vistos.add(n.toLowerCase()); });
  }
  if (k == "arq") {
    const vistos = new Set(), MI = new Set(miembros().map(x => x.toLowerCase()));
    for (const [l] of filasKV(k)) { const i = l.t.indexOf("="), n = l.t.slice(0, i).trim(), v = l.t.slice(i + 1).trim();
      if (!n || !v) { err.push("Hay una fila sin sistema o sin arquitecto"); continue; }
      if (vistos.has(n.toLowerCase())) err.push(`«${n}» está dos veces`); vistos.add(n.toLowerCase());
      if (hay && !sis.has(n.toLowerCase()) && l.nuevo) av.push(`«${n}» no es ahora un sistema de CDSN`);
      if (l.nuevo && !ESP.includes(v) && MI.size && !MI.has(v.toLowerCase())) av.push(`«${v}» no está en Miembros: no saldrá como CMDR de CDSN`); }
  }
  if (k == "mie") {
    const vistos = new Set();
    S.L.forEach(l => { if (l.del || esCom(l.t)) return; const n = l.t.trim();
      if (vistos.has(n.toLowerCase())) err.push(`«${n}» está repetido`); vistos.add(n.toLowerCase()); });
  }
  return {err, av};
}

// ---------- diferencias (+ / −) ----------
function diff(a, b) {
  const A = a.split("\n"), B = b.split("\n"), m = A.length, n = B.length;
  const T = Array.from({length: m + 1}, () => new Uint16Array(n + 1));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) T[i][j] = A[i] == B[j] ? T[i + 1][j + 1] + 1 : Math.max(T[i + 1][j], T[i][j + 1]);
  const R = []; let i = 0, j = 0;
  while (i < m && j < n) { if (A[i] == B[j]) { i++; j++; } else if (T[i + 1][j] >= T[i][j + 1]) R.push(["-", A[i++]]); else R.push(["+", B[j++]]); }
  while (i < m) R.push(["-", A[i++]]); while (j < n) R.push(["+", B[j++]]);
  return R.filter(([, t]) => t.trim() !== "" || true);
}

// ---------- pintar ----------
const dl = (id, L) => `<datalist id="${id}">${L.map(x => `<option value="${e_(x)}">`).join("")}</datalist>`;
function pinta() {
  const v = $("#alm"); if (!v) return;
  const S = ST[TAB], A = ARCH[TAB], t = tok(), rv = revisa(TAB);
  let h = `<div class="almTop"><img src="logo-azul.png" alt=""><h1>ACCESO: ALMIRANTAZGO</h1>
<span class="almK">${t ? `🔑 token guardado en este navegador${ST._caduca ? ` · caduca el ${e_(new Date(ST._caduca).toLocaleDateString("es-ES"))}` : ""} · <a href="#" data-a="olvida">olvidar</a>` : `<span style="color:#ffd228">🔒 solo lectura: falta el token</span> · <a href="#" data-a="token">poner token</a>`}
 · <a href="#" data-a="salir">volver a la web</a></span></div>`;
  if (MSG) h += `<div class="almMsg">${MSG}</div>`;
  h += `<div class="almTabs">${Object.entries(ARCH).map(([k, x]) => `<button data-tab="${k}" class="${k == TAB ? "on" : ""}">${x.nom}${cambiado(k) ? " ●" : ""}</button>`).join("")}</div><div class="almBox">`;
  if (ST._pideTok || !t && ST._pideTok !== false && !ST._visto) h += tokenHTML();
  h += `<div class="almAy">${e_(A.ayuda)}</div>`;
  if (!S || S.cargando) h += `<p>Cargando ${e_(A.path)}…</p>`;
  else if (S.error) h += `<p class="almErr">⚠ ${e_(S.error)}</p>`;
  else h += ({op: pintaOp, nf: pintaNf, imp: pintaImp, arq: pintaArq, mie: pintaMie})[A.tipo]();
  if (S && S.L) {
    h += `<div class="almRow"><button data-a="texto" class="almB">📝 ${S.verTexto ? "Ver como tabla" : "Ver como texto"}</button><span style="flex:1"></span>
<button data-a="descarta" class="almB"${cambiado(TAB) ? "" : " disabled"}>Descartar cambios</button>
<button data-a="revisa" class="almB almP"${cambiado(TAB) ? "" : " disabled"}>💾 Revisar y guardar</button></div>`;
    if (rv.err.length || rv.av.length) h += `<div class="almChk">${rv.err.map(x => `<div class="almErr">⚠ ${e_(x)}</div>`).join("")}${rv.av.map(x => `<div class="almAv">ℹ ${e_(x)}</div>`).join("")}</div>`;
    if (REVISA == TAB) h += revisaHTML(rv);
  }
  h += `</div>` + dl("almSis", sisCDSN().sort()) + dl("almArq", [...ESP, ...miembros().sort()]);
  const foco = document.activeElement && document.activeElement.dataset ? [document.activeElement.dataset.i, document.activeElement.dataset.c, document.activeElement.selectionStart] : null;
  v.innerHTML = h;
  if (foco && foco[1]) { const el = v.querySelector(`[data-i="${foco[0]}"][data-c="${foco[1]}"]`); if (el) { el.focus(); try { el.setSelectionRange(foco[2], foco[2]); } catch (x) {} } }
}
function tokenHTML() {
  return `<div class="almTok"><b>🔑 Token de GitHub (solo la primera vez, en cada PC)</b>
<ol><li>Entra en <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token</a>.</li>
<li>Nombre: <i>almirantazgo</i> · Expiration: 1 año.</li>
<li>Repository access: <b>Only select repositories</b> → <b>cdsn-datos</b> y <b>cdsn-web</b>.</li>
<li>Permissions → Repository permissions → <b>Contents: Read and write</b> (nada más).</li>
<li>Generate token, cópialo y pégalo aquí:</li></ol>
<div class="almRow"><input type="password" id="almTokIn" placeholder="github_pat_…" style="flex:1" autocomplete="off"><button data-a="tokOk" class="almB almP">Probar y guardar</button><button data-a="tokNo" class="almB">Ahora no</button></div>
<div class="almAy" style="margin-top:6px">Se guarda solo en este navegador. No lo compartas: con él se puede cambiar la web y los datos.</div></div>`;
}
const inp = (i, c, val, extra = "") => `<input data-i="${i}" data-c="${c}" value="${e_(val)}" ${extra}>`;
function pintaTexto() { return `<textarea id="almTxt" class="almTA" spellcheck="false">${e_(texto(TAB).replace(/\n$/, ""))}</textarea><div class="almAy">Escribe libremente; las líneas con # son comentarios. Al cambiar a tabla se aplica.</div>`; }
function pintaOp() {
  if (ST.op.verTexto) return pintaTexto();
  const F = filasKV("op");
  return `<table class="almT"><tr><th style="width:30%">Sistema</th><th>Qué hacemos</th><th style="width:160px">Hasta</th><th style="width:44px"></th></tr>` +
    F.map(([l, i]) => { const o = opLee(l.t), malo = o.sys && sisCDSN().length && !sisCDSN().some(x => x.toLowerCase() == o.sys.toLowerCase());
      return `<tr><td>${inp(i, "sys", o.sys, `list="almSis" class="${malo ? "mal" : o.sys ? "ok" : ""}" placeholder="sistema"`)}</td><td>${inp(i, "q", o.q, 'placeholder="qué estamos haciendo"')}</td><td><input type="date" data-i="${i}" data-c="f" value="${e_(o.f)}" class="${o.f && o.f < hoyIso() ? "mal" : ""}"></td><td><button class="almDel" data-del="${i}" title="Borrar">🗑</button></td></tr>`; }).join("") +
    `</table>${F.length ? "" : '<p class="almAy">No hay operaciones.</p>'}<div class="almRow"><button data-a="nuevo" class="almB">＋ Añadir operación</button></div>`;
}
function pintaNf() {
  const S = ST.nf, cab = [], cuerpo = []; let enCab = true;
  S.L.forEach(l => { if (l.del) return; if (enCab && esCom(l.t)) cab.push(l.t); else { enCab = false; cuerpo.push(l.t); } });
  S._cab = cab.length;
  const txt = cuerpo.join("\n").replace(/^\n+|\n+$/g, "");
  const N = txt.split(/^---\s*$/m).map(b => b.split("\n").filter(l => !l.trim().startsWith("#")).join("\n").trim()).filter(Boolean).map(b => { const [t, ...x] = b.split("\n"); return [t, x.join("\n").trim()]; });
  const ng = typeof negritas == "function" ? negritas : e_;
  return `<div class="almNf"><div><b>Texto</b><textarea id="almNfT" class="almTA" spellcheck="true" placeholder="Titular&#10;Texto de la noticia…">${e_(txt)}</textarea>
<div class="almRow"><button data-a="nfQuita" class="almB">Quitar la noticia fija</button><button data-a="nfSep" class="almB">＋ Otra noticia (---)</button></div></div>
<div><b>Vista previa</b>${N.length ? N.map(([t, x]) => `<div class="fija"><div class="porK">📌 COMUNICADO DEL ALMIRANTE</div><div class="porT">${ng(t)}</div>${x ? `<div class="porE">${ng(x).replace(/\n/g, "<br>")}</div>` : ""}</div>`).join("") : '<p class="almAy">Sin noticia fija: no sale nada en La Crónica.</p>'}</div></div>`;
}
function pintaImp() {
  if (ST.imp.verTexto) return pintaTexto();
  const L = ST.imp.L, col = {1: [], 2: []};
  L.forEach((l, i) => { if (l.del || esCom(l.t) || /^\[/.test(l.t.trim())) return; const n = nivDe(L, i); (col[n] || (col[n] = [])).push([l.t.trim(), i]); });
  const c = (n, tit) => `<div class="almCol"><h3>${tit} <small>(${(col[n] || []).length})</small></h3>${(col[n] || []).map(([s, i]) => `<div class="almIt"><span>${n == 1 ? "◆" : "◇"} ${e_(s)}</span><button class="almB almS" data-mv="${i}" title="Pasar al nivel ${n == 1 ? 2 : 1}">${n == 1 ? "→ nivel 2" : "← nivel 1"}</button><button class="almDel" data-del="${i}" title="Quitar">🗑</button></div>`).join("")}
<div class="almRow"><input id="almImp${n}" list="almSis" placeholder="añadir sistema…" style="flex:1"><button class="almB" data-add="${n}">＋</button></div></div>`;
  return `<div class="almCols">${c(1, "◆ Nivel 1 · controlarlos")}${c(2, "◇ Nivel 2 · no perder presencia")}</div>`;
}
function pintaArq() {
  if (ST.arq.verTexto) return pintaTexto();
  const q = BUSCA.arq.toLowerCase(), F = filasKV("arq").filter(([l]) => !q || l.t.toLowerCase().includes(q) || l.nuevo);
  const tot = filasKV("arq").length, cm = filasKV("arq").filter(([l]) => !/=\s*(heredad|coloniza)/i.test(l.t)).length;
  return `<div class="almRow"><input id="almBusArq" type="search" placeholder="🔍 buscar sistema o CMDR…" value="${e_(BUSCA.arq)}" style="flex:1"><span class="almAy">${tot} sistemas · ${cm} con CMDR</span></div>
<table class="almT"><tr><th style="width:45%">Sistema</th><th>Arquitecto</th><th style="width:44px"></th></tr>` +
    F.slice(0, 300).map(([l, i]) => { const k = l.t.indexOf("=");
      return `<tr><td>${inp(i, "a", l.t.slice(0, k).trim(), 'list="almSis"')}</td><td>${inp(i, "b", l.t.slice(k + 1).trim(), 'list="almArq"')}</td><td><button class="almDel" data-del="${i}">🗑</button></td></tr>`; }).join("") +
    `</table>${F.length ? "" : '<p class="almAy">Nada con esa búsqueda.</p>'}<div class="almRow"><button data-a="nuevo" class="almB">＋ Añadir sistema</button></div>`;
}
function pintaMie() {
  if (ST.mie.verTexto) return pintaTexto();
  const q = BUSCA.mie.toLowerCase(), F = ST.mie.L.map((l, i) => [l, i]).filter(([l]) => !l.del && !esCom(l.t));
  const V = F.filter(([l]) => !q || l.t.toLowerCase().includes(q) || l.nuevo);
  return `<div class="almRow"><input id="almBusMie" type="search" placeholder="🔍 buscar miembro…" value="${e_(BUSCA.mie)}" style="flex:1"><span class="almAy">${F.length} miembros</span></div>
<div class="almMie">${V.map(([l, i]) => `<div class="almIt">${inp(i, "n", l.t, 'style="flex:1"')}<button class="almDel" data-del="${i}">🗑</button></div>`).join("")}</div>
<div class="almRow"><button data-a="nuevo" class="almB">＋ Añadir miembro</button><span class="almAy">Escríbelo tal cual sale en el juego.</span></div>`;
}
function revisaHTML(rv) {
  const D_ = diff(ST[TAB].orig.replace(/\n$/, ""), texto(TAB).replace(/\n$/, "")), A = ARCH[TAB];
  const bloq = rv.err.length > 0, sinTok = !tok();
  return `<div class="almDif"><div class="almDT">CAMBIOS QUE SE VAN A SUBIR A GITHUB (${e_(A.repo)}/${e_(A.path)})</div>
${D_.length ? D_.map(([s, t]) => `<div class="${s == "+" ? "almMas" : "almMenos"}">${s} ${e_(t) || "<i>(línea vacía)</i>"}</div>`).join("") : "<div>Sin cambios.</div>"}
<div class="almRow"><input id="almCm" value="Almirantazgo: ${e_(A.path)}" style="flex:1" title="Mensaje del cambio en GitHub">
<button data-a="sube" class="almB almP"${bloq || sinTok || OCUP ? " disabled" : ""}>${OCUP ? "Subiendo…" : "✔ Confirmar y subir"}</button><button data-a="cancela" class="almB">Volver</button></div>
${bloq ? `<div class="almErr">Corrige los ${rv.err.length} errores de arriba para poder guardar.</div>` : sinTok ? `<div class="almErr">Para guardar hace falta el token.</div>` : ""}</div>`;
}

// ---------- editar ----------
function fija(i, c, val) {
  const S = ST[TAB], l = S.L[i]; if (!l) return;
  if (TAB == "op") { const o = opLee(l.t.includes("=") ? l.t : " = "); o[c] = val; l.t = opEsc(o); }
  else if (TAB == "arq") { const k = l.t.indexOf("="); const a = c == "a" ? val : l.t.slice(0, k).trim(), b = c == "b" ? val : l.t.slice(k + 1).trim(); l.t = `${a.trim()} = ${b.trim()}`; }
  else if (TAB == "mie") l.t = val.trim();
}
function nuevo() {
  const S = ST[TAB];
  if (TAB == "op") S.L.push({t: " = ", nuevo: 1});
  if (TAB == "arq") { S.L.push({t: " = ", nuevo: 1}); BUSCA.arq = ""; }
  if (TAB == "mie") { S.L.push({t: "", nuevo: 1}); BUSCA.mie = ""; }
  pinta();
  const ins = [...document.querySelectorAll("#alm .almT input, #alm .almMie input")]; if (ins.length) ins[ins.length - 1 - (TAB == "op" ? 2 : TAB == "arq" ? 1 : 0)].focus();
}
function aTexto(txt) { const S = ST[TAB], fin = txt.endsWith("\n"); S.L = (fin ? txt.slice(0, -1) : txt).split("\n").map(t => ({t})); }
function impAnade(n, nom) {
  nom = (nom || "").trim(); if (!nom) return; const L = ST.imp.L;
  const real = sisCDSN().find(x => x.toLowerCase() == nom.toLowerCase()) || nom;
  let h = L.findIndex(l => !l.del && new RegExp(`^\\[\\s*nivel\\s*${n}\\s*\\]$`, "i").test(l.t.trim()));
  if (h < 0) { L.push({t: ""}, {t: `[nivel ${n}]`}); h = L.length - 1; }
  let fin = h; for (let j = h + 1; j < L.length; j++) { if (/^\[/.test(L[j].t.trim()) && !L[j].del) break; if (!L[j].del && !esCom(L[j].t)) fin = j; }
  L.splice(fin + 1, 0, {t: real, nuevo: 1});
}
async function sube() {
  const A = ARCH[TAB], S = ST[TAB]; OCUP = true; pinta();
  try {
    const j = await gh("PUT", A.repo, A.path, {message: ($("#almCm") || {}).value || "Almirantazgo: " + A.path, content: b64e(texto(TAB)), sha: S.sha, branch: "main"});
    MSG = `✅ ${e_(A.path)} guardado en GitHub. ${A.repo == "cdsn-datos" ? "Las alertas y la web se actualizan en 1–2 minutos." : "La web se publica en 1–2 minutos."}`;
    REVISA = null; S.orig = texto(TAB); S.sha = j && j.content ? j.content.sha : S.sha; S.L.forEach(l => delete l.nuevo); S.L = S.L.filter(l => !l.del);
  } catch (x) {
    MSG = x.status == 409 || x.status == 422 ? `⚠ ${e_(A.path)} ha cambiado en GitHub mientras editabas (p. ej. el escucha). Copia tus cambios con «Ver como texto», pulsa «Descartar cambios» para recargar y vuelve a aplicarlos.`
      : x.status == 401 || x.status == 403 ? "⚠ El token no tiene permiso para guardar (revisa que tenga Contents: Read and write en " + e_(A.repo) + ")."
      : "⚠ No se pudo guardar: " + e_(x.message);
  }
  OCUP = false; pinta(); window.scrollTo(0, 0);
}

// ---------- eventos ----------
function eventos(v) {
  v.addEventListener("input", e => {
    const el = e.target;
    if (el.id == "almTxt") { aTexto(el.value + (ST[TAB].fin ? "\n" : "")); return; }
    if (el.id == "almNfT") { const S = ST.nf, cab = S.L.filter(l => !l.del).slice(0, S._cab).map(l => l.t);
      const cuerpo = el.value.replace(/\s+$/, ""); const sep = cab.length && !cab[cab.length - 1].trim() ? [] : [""]; S.L = [...cab, ...(cuerpo ? [...sep, ...cuerpo.split("\n")] : [])].map(t => ({t}));
      clearTimeout(S._tm); S._tm = setTimeout(() => { const p = el.selectionStart; pinta(); const n = $("#almNfT"); if (n) { n.focus(); n.setSelectionRange(p, p); } }, 400); return; }
    if (el.id == "almBusArq" || el.id == "almBusMie") { BUSCA[el.id == "almBusArq" ? "arq" : "mie"] = el.value; clearTimeout(v._tb); v._tb = setTimeout(() => { pinta(); const n = $("#" + el.id); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } }, 250); return; }
    if (el.dataset.i != null && el.dataset.c) { fija(+el.dataset.i, el.dataset.c, el.value); clearTimeout(v._tp); v._tp = setTimeout(pinta, 600); }
  });
  v.addEventListener("change", e => { const el = e.target; if (el.dataset.c == "f") { fija(+el.dataset.i, "f", el.value); pinta(); } });
  v.addEventListener("keydown", e => { if (e.key == "Enter" && /^almImp\d$/.test(e.target.id)) { impAnade(+e.target.id.slice(-1), e.target.value); pinta(); } });
  v.addEventListener("click", async e => {
    const el = e.target.closest("[data-a],[data-tab],[data-del],[data-mv],[data-add]"); if (!el) return;
    if (el.tagName == "A") e.preventDefault();
    const S = ST[TAB];
    if (el.dataset.tab) { TAB = el.dataset.tab; REVISA = null; MSG = ""; pinta(); carga(TAB); return; }
    if (el.dataset.del != null) { S.L[+el.dataset.del].del = true; pinta(); return; }
    if (el.dataset.mv != null) { const i = +el.dataset.mv, n = nivDe(S.L, i), nom = S.L[i].t.trim(); S.L[i].del = true; impAnade(n == 1 ? 2 : 1, nom); pinta(); return; }
    if (el.dataset.add) { const x = $("#almImp" + el.dataset.add); impAnade(+el.dataset.add, x && x.value); pinta(); return; }
    const a = el.dataset.a;
    if (a == "salir") { location.hash = ""; return; }
    if (a == "token") { ST._pideTok = true; pinta(); return; }
    if (a == "tokNo") { ST._pideTok = false; ST._visto = true; pinta(); return; }
    if (a == "olvida") { if (confirm("¿Olvidar el token en este navegador?")) { try { localStorage.removeItem(KTOK); } catch (x) {} ST = {}; MSG = "Token olvidado. Ahora es solo lectura."; pinta(); carga(TAB); } return; }
    if (a == "tokOk") { const t = ($("#almTokIn") || {}).value.trim(); if (!t) return;
      try { localStorage.setItem(KTOK, t); } catch (x) {}
      try { await gh("GET", "cdsn-datos", "operaciones.txt"); await gh("GET", "cdsn-web", "miembros.txt");
        ST = {_caduca: ST._caduca}; MSG = "✅ Token guardado. Ya puedes editar y guardar."; }
      catch (x) { try { localStorage.removeItem(KTOK); } catch (y) {} MSG = "⚠ Ese token no funciona: " + e_(x.message) + ". Revisa los pasos (repositorios y permiso Contents)."; ST._pideTok = true; }
      pinta(); carga(TAB, true); return; }
    if (a == "texto") { S.verTexto = !S.verTexto; pinta(); return; }
    if (a == "nuevo") { nuevo(); return; }
    if (a == "descarta") { if (!cambiado(TAB) || confirm("¿Descartar los cambios sin guardar?")) { REVISA = null; delete ST[TAB]; MSG = ""; carga(TAB, true); } return; }
    if (a == "revisa") { REVISA = TAB; pinta(); const d = $(".almDif"); if (d) d.scrollIntoView({behavior: "smooth", block: "center"}); return; }
    if (a == "cancela") { REVISA = null; pinta(); return; }
    if (a == "sube") { sube(); return; }
    if (a == "nfQuita") { const t = $("#almNfT"); if (t && confirm("¿Quitar la noticia fija de La Crónica?")) { t.value = ""; t.dispatchEvent(new Event("input", {bubbles: true})); } return; }
    if (a == "nfSep") { const t = $("#almNfT"); if (t) { t.value = t.value.replace(/\s+$/, "") + "\n---\nTitular\nTexto"; t.dispatchEvent(new Event("input", {bubbles: true})); } return; }
  });
}

// ---------- abrir / cerrar ----------
const CSS = `body.almOn>*:not(#alm){display:none!important}#alm{min-height:100vh;background:#120c05;color:#e8d9b8;font-family:system-ui,"Segoe UI",sans-serif;padding-bottom:40px}
.almTop{display:flex;align-items:center;gap:14px;padding:14px 24px;border-bottom:2px solid #ff8c00;background:#1a1208;flex-wrap:wrap}.almTop img{width:44px}.almTop h1{margin:0;font:800 20px ui-monospace,Consolas,monospace;letter-spacing:.18em;color:#ff8c00}
.almK{margin-left:auto;font-size:13px;color:#4cd964}.almK a{color:#ffb347}.almMsg{margin:12px 24px 0;padding:10px 14px;border:1px solid #66cbff;border-radius:8px;background:rgba(102,203,255,.08)}
.almTabs{display:flex;gap:8px;padding:14px 24px 0;flex-wrap:wrap}.almTabs button{background:#1a1208;color:#e8d9b8;border:1px solid #5a4020;border-radius:8px 8px 0 0;padding:9px 16px;font-weight:700;font-size:14px;cursor:pointer}.almTabs .on{background:#ff8c00;color:#1a1208;border-color:#ff8c00}
.almBox{margin:0 24px;border:1px solid #5a4020;border-radius:0 8px 8px 8px;background:#1a1208;padding:16px 18px;max-width:1300px}.almAy{font-size:13px;opacity:.75;margin:0 0 12px}
.almT{width:100%;border-collapse:collapse;font-size:14px}.almT th{text-align:left;color:#ffd228;border-bottom:1px solid #5a4020;padding:8px 6px}.almT td{padding:5px 6px;border-bottom:1px solid #2a1e10}
#alm input,#alm textarea{background:#120c05;color:#e8d9b8;border:1px solid #5a4020;border-radius:6px;padding:7px 9px;font-size:14px;width:100%;box-sizing:border-box}#alm input.ok{border-color:#3a7a3a}#alm input.mal{border-color:#ff3b30}
.almTA{min-height:340px;font:13px/1.5 ui-monospace,Consolas,monospace!important}.almErr{color:#ff6a60;font-size:13px;margin:3px 0}.almAv{color:#ffd228;font-size:13px;margin:3px 0}.almChk{margin-top:12px}
.almDel{background:none;border:1px solid #5a2020;color:#ff6a60;border-radius:6px;padding:6px 10px;cursor:pointer}.almRow{display:flex;gap:10px;margin-top:12px;align-items:center;flex-wrap:wrap}.almRow input{width:auto}
.almB{background:#1a1208;color:#e8d9b8;border:1px solid #5a4020;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer}.almB:disabled{opacity:.4;cursor:default}.almP{background:#ff8c00;color:#1a1208;border-color:#ff8c00}.almS{padding:5px 10px;font-size:12px}
.almDif{margin-top:16px;border:1px dashed #66cbff;border-radius:8px;padding:10px 14px;font:13px ui-monospace,Consolas,monospace}.almDT{color:#66cbff;font-weight:700;margin-bottom:6px;letter-spacing:.08em}.almMas{color:#4cd964;white-space:pre-wrap}.almMenos{color:#ff6a60;white-space:pre-wrap}
.almCols{display:grid;grid-template-columns:1fr 1fr;gap:18px}.almCol h3{margin:0 0 8px;color:#ffd228;font-size:15px}.almIt{display:flex;gap:8px;align-items:center;padding:5px 0;border-bottom:1px solid #2a1e10}.almIt span{flex:1}
.almMie{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:0 16px}.almNf{display:grid;grid-template-columns:1fr 1fr;gap:18px}.almTok{border:1px solid #ffd228;border-radius:8px;padding:12px 16px;margin-bottom:14px;background:rgba(255,210,40,.05)}.almTok a{color:#66cbff}.almTok li{margin:3px 0}
@media(max-width:800px){.almCols,.almNf{grid-template-columns:1fr}.almBox,.almMsg{margin:0 8px}.almTabs{padding:10px 8px 0}}`;
function abre() {
  if (!$("#almCss")) { const s = document.createElement("style"); s.id = "almCss"; s.textContent = CSS; document.head.appendChild(s); }
  let v = $("#alm"); if (!v) { v = document.createElement("div"); v.id = "alm"; document.body.appendChild(v); eventos(v); }
  TIT0 = document.title.startsWith("Almirantazgo") ? TIT0 : document.title; document.body.classList.add("almOn"); document.title = "Almirantazgo · CDSN"; window.scrollTo(0, 0);
  pinta(); carga(TAB);
  if (!sisCDSN().length) { const t = setInterval(() => { if (sisCDSN().length) { clearInterval(t); pinta(); } }, 1000); setTimeout(() => clearInterval(t), 30000); }
}
function cierra() { document.body.classList.remove("almOn"); document.title = TIT0; }
window.addEventListener("beforeunload", e => { if (Object.keys(ARCH).some(cambiado)) { e.preventDefault(); e.returnValue = ""; } });
window.ALM = {abre, cierra};
abre();
})();
