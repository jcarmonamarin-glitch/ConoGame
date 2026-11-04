/**
 * ConoGame · base de datos en Google Sheets
 * Pegar en la hoja "ConoGame - Base de datos" → Extensiones → Apps Script.
 * Desplegar como aplicación web: ejecutar como "Yo", acceso "Cualquier usuario".
 *
 * El juego llama por GET:
 *   ?accion=entrar&id=lucia&nombre=Lucía&clave=🐶🐱🐭🐰
 *       → crea el jugador si no existe; si existe, comprueba la clave.
 *       → {ok:true, nuevo, prog:{ingles:{f:{n110:3}, n:{}, d:{}}, ...}}
 *   ?accion=guardar&id=lucia&nombre=Lucía&clave=...&asig=ingles&nivel=n&tema=n110&temaNombre=Numbers 1-10&estrellas=3
 *       → guarda el máximo entre lo que había y lo nuevo.
 *   ?accion=borrar&id=lucia&clave=...&asig=ingles
 *       → borra todas las estrellas de ese jugador en esa asignatura (las tres dificultades).
 */
const ASIG = {medio: 'Conocimiento del Medio', lengua: 'Lengua', mates: 'Matemáticas', ingles: 'Inglés'};
const NIV = {f: 'Fácil', n: 'Normal', d: 'Difícil'};
const NIV_ID = {'Fácil': 'f', 'Normal': 'n', 'Difícil': 'd'};

function doGet(e) {
  const p = (e && e.parameter) || {};
  let r;
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    if (p.accion === 'entrar') r = entrar(p);
    else if (p.accion === 'guardar') r = guardar(p);
    else if (p.accion === 'borrar') r = borrar(p);
    else r = {ok: false, error: 'accion'};
  } catch (err) {
    r = {ok: false, error: String(err)};
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
  return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}

function hoja(n) { return SpreadsheetApp.getActive().getSheetByName(n); }

// Texto seguro: corto y sin que empiece por = + - @ (para que nunca sea una fórmula)
function texto(s, max) {
  s = String(s || '').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function idValido(id) { return /^[a-z0-9ñ]{1,24}$/.test(String(id || '')); }

// Busca al jugador. Devuelve {fila, clave} o null.
function buscarJugador(id) {
  const h = hoja('Jugadores'), n = h.getLastRow();
  if (n < 2) return null;
  const v = h.getRange(2, 2, n - 1, 2).getValues(); // Id, Clave
  for (let i = 0; i < v.length; i++) if (String(v[i][0]) === id) return {fila: i + 2, clave: String(v[i][1])};
  return null;
}

function comprobar(p) {
  if (!idValido(p.id)) return {ok: false, error: 'id'};
  const clave = String(p.clave || '');
  if (!clave || clave.length > 40) return {ok: false, error: 'clave'};
  const j = buscarJugador(p.id);
  if (j && j.clave !== clave) return {ok: false, error: 'clave'};
  return {ok: true, j: j, clave: clave};
}

function entrar(p) {
  const c = comprobar(p);
  if (!c.ok) return c;
  const ahora = new Date(), h = hoja('Jugadores');
  if (!c.j) {
    h.appendRow([texto(p.nombre, 24), p.id, c.clave, ahora, ahora]);
    return {ok: true, nuevo: true, prog: {}};
  }
  h.getRange(c.j.fila, 1).setValue(texto(p.nombre, 24));
  h.getRange(c.j.fila, 5).setValue(ahora);
  return {ok: true, nuevo: false, prog: leerProgreso(p.id)};
}

function leerProgreso(id) {
  const h = hoja('Estrellas'), n = h.getLastRow(), prog = {};
  if (n < 2) return prog;
  const asigId = {};
  Object.keys(ASIG).forEach(k => asigId[ASIG[k]] = k);
  h.getRange(2, 1, n - 1, 8).getValues().forEach(r => {
    if (String(r[0]) !== id) return;
    const a = asigId[r[2]], nv = NIV_ID[r[3]], t = String(r[7]);
    if (!a || !nv || !t) return;
    prog[a] = prog[a] || {f: {}, n: {}, d: {}};
    prog[a][nv][t] = Math.max(prog[a][nv][t] || 0, Number(r[5]) || 0);
  });
  return prog;
}

function guardar(p) {
  const c = comprobar(p);
  if (!c.ok) return c;
  if (!c.j) return {ok: false, error: 'noexiste'};
  const asig = ASIG[p.asig], niv = NIV[p.nivel], tema = String(p.tema || '');
  const est = Math.max(0, Math.min(3, Number(p.estrellas) || 0));
  if (!asig || !niv || !/^[a-z0-9_-]{1,20}$/.test(tema)) return {ok: false, error: 'datos'};
  const h = hoja('Estrellas'), n = h.getLastRow(), ahora = new Date();
  if (n >= 2) {
    const v = h.getRange(2, 1, n - 1, 8).getValues();
    for (let i = 0; i < v.length; i++) {
      const r = v[i];
      if (String(r[0]) === p.id && r[2] === asig && r[3] === niv && String(r[7]) === tema) {
        if (est > (Number(r[5]) || 0)) h.getRange(i + 2, 6, 1, 2).setValues([[est, ahora]]);
        h.getRange(i + 2, 2).setValue(texto(p.nombre, 24));
        return {ok: true};
      }
    }
  }
  h.appendRow([p.id, texto(p.nombre, 24), asig, niv, texto(p.temaNombre || tema, 40), est, ahora, tema]);
  return {ok: true};
}

function borrar(p) {
  const c = comprobar(p);
  if (!c.ok) return c;
  if (!c.j) return {ok: true};
  const asig = ASIG[p.asig];
  if (!asig) return {ok: false, error: 'datos'};
  const h = hoja('Estrellas'), n = h.getLastRow();
  if (n < 2) return {ok: true};
  const v = h.getRange(2, 1, n - 1, 3).getValues();
  let borradas = 0;
  for (let i = v.length - 1; i >= 0; i--) { // de abajo arriba para no descolocar las filas
    if (String(v[i][0]) === p.id && v[i][2] === asig) { h.deleteRow(i + 2); borradas++; }
  }
  return {ok: true, borradas: borradas};
}
