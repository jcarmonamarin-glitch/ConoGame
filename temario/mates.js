// Matemáticas · Bloque 2: los números hasta el 299 (centenas, decenas y unidades)
// Temas: centenas/decenas/unidades, descomponer, escribir con letras, anterior y posterior.
// (Unidad 3 «Aprendo los números hasta el 199», págs. 54-55, y Unidad 4 «Aprendo los números hasta el 299», págs. 70-71).
// El bloque 1 (numeración del 0 al 99) ya está examinado; está en el historial de git.
// Contenido de la asignatura. Lo carga base.html con ?a=mates
// Las misiones se generan al azar en cada partida: build(LV) recibe el nivel (1 Fácil, 2 Normal, 3 Difícil).
// Fácil: números del 100 al 199. Normal y Difícil: del 100 al 299.
(function(){
const ICONS={
 cdu:'<rect x="2.5" y="5" width="7" height="14" rx="1"/><rect x="11" y="5" width="3" height="14" rx="1"/><rect x="15.5" y="5" width="3" height="14" rx="1"/><rect x="20" y="15" width="2.5" height="2.5" rx=".5"/>',
 descompon:'<path d="M12 3v5M12 8l-7 6M12 8l7 6M12 8v6"/><rect x="2" y="15" width="6" height="5" rx="1"/><rect x="9" y="15" width="6" height="5" rx="1"/><rect x="16" y="15" width="6" height="5" rx="1"/>',
 nombres:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
 cuenta:'<path d="M3 12h5M5 9l-3 3 3 3M21 12h-5M19 9l3 3-3 3"/><circle cx="12" cy="12" r="2.5"/>'
};

/* ---------- ayudas ---------- */
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const HI=L=>L===1?199:299;          // Fácil: hasta el 199
const C=L=>L===1?1:(Math.random()<.6?2:1); // centena: más números del 200, que es lo último que han dado
const cdu=n=>[Math.floor(n/100),Math.floor(n/10)%10,n%10];
/* Números de un tipo: 'z' sin decenas (205), 'r' redondo (130), 'f' completo con cifras distintas (146), 'a' cualquiera */
function mk(L,k){const c=C(L);
  if(k==='z')return c*100+ri(1,9);
  if(k==='r')return c*100+ri(1,9)*10;
  if(k==='f'){let d,u;do{d=ri(1,9);u=ri(1,9)}while(d===u);return c*100+d*10+u}
  return ri(100,HI(L))}
/* k números distintos; kinds se repite en ciclo (p. ej. ['z','f','r','f']) */
function nums(L,k,kinds){const s=[];let t=0;while(s.length<k&&t++<5000){const v=mk(L,kinds[s.length%kinds.length]);if(!s.includes(v))s.push(v)}return s}
/* Opciones: la buena primero y dos trampas distintas (de la lista o, si no hay, un número cercano) */
function opts3(n,c,lo=0,hi=999){const s=[n];for(const v of c){if(v>=lo&&v<=hi&&!s.includes(v))s.push(v);if(s.length===3)break}
  let t=0;while(s.length<3&&t++<200){const v=n+[1,-1,10,-10,2,-2,11,-11][ri(0,7)];if(v>=lo&&v<=hi&&!s.includes(v))s.push(v)}return s}
/* Las trampas típicas: 108 → 180 o 18; 226 → 262; 237 → 247 */
function traps(n){const [c,d,u]=cdu(n),t=[];
  if(d!==u)t.push(c*100+u*10+d);
  if(d===0)t.push(c*100+u*10,c*10+u);
  if(u===0)t.push(c*10+d);
  t.push(n+10,n-10,n+100,n-100,n+1,n-1);return t}
const U=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
const T10=['diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve'];
const V2=['veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
const DEC=['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
function numW2(n){if(n<10)return U[n];if(n<20)return T10[n-10];if(n<30)return V2[n-20];const d=Math.floor(n/10),u=n%10;return DEC[d]+(u?' y '+U[u]:'')}
function numW(n){if(n<100)return numW2(n);if(n===100)return 'cien';const c=Math.floor(n/100),r=n%100;return (c===1?'ciento':'doscientos')+(r?' '+numW2(r):'')}
/* Respuestas válidas al escribir: «doscientas» también vale (el libro lo pone así al hablar de unidades) */
const numAns=n=>{const w=numW(n);return n>=200?[w,w.replace('doscientos','doscientas')]:[w]};
const cap=s=>s[0].toUpperCase()+s.slice(1);

/* ---------- dibujos (colores del libro: centenas verde, decenas rojo, unidades azul) ---------- */
const CC='var(--p3)',CD='var(--c-circ)',CU='var(--p2)';
function blocksSvg(n){const [c,d,u]=cdu(n);let x=4,s='';
  for(let i=0;i<c;i++){s+=`<rect x="${x}" y="4" width="58" height="58" rx="2" style="fill:${CC}"/>`;
    for(let j=1;j<10;j++)s+=`<line x1="${x+j*5.8}" x2="${x+j*5.8}" y1="4" y2="62" style="stroke:var(--card)" stroke-opacity=".35" stroke-width=".8"/><line y1="${4+j*5.8}" y2="${4+j*5.8}" x1="${x}" x2="${x+58}" style="stroke:var(--card)" stroke-opacity=".35" stroke-width=".8"/>`;x+=64}
  if(d){x+=4;for(let i=0;i<d;i++){s+=`<rect x="${x}" y="4" width="9" height="58" rx="1.5" style="fill:${CD}"/>`;for(let j=1;j<10;j++)s+=`<line x1="${x}" x2="${x+9}" y1="${4+j*5.8}" y2="${4+j*5.8}" style="stroke:var(--card)" stroke-opacity=".5" stroke-width=".8"/>`;x+=13}}
  if(u){x+=8;for(let j=0;j<u;j++){const cl=Math.floor(j/5),r=j%5;s+=`<rect x="${x+cl*12}" y="${53-r*12}" width="9" height="9" rx="1.5" style="fill:${CU}"/>`}x+=Math.ceil(u/5)*12}
  const W=x+4;return `<svg viewBox="0 0 ${W} 66" style="width:100%;max-width:${Math.round(W*1.7)}px" role="img" aria-label="Bloques de centenas, decenas y unidades">${s}</svg>`}
/* Tabla C D U. hide: 0, 1 o 2 (la columna que se pregunta) */
function tableSvg(n,hide){const dg=n>=100?cdu(n):[null,Math.floor(n/10)||null,n%10];let s='';
  ['C','D','U'].forEach((l,i)=>{const x=4+i*64,col=[CC,CD,CU][i],hid=i===hide;
    s+=`<rect x="${x}" y="4" width="64" height="34" style="fill:${col}"/><text x="${x+32}" y="29" text-anchor="middle" style="fill:#fff;font:800 22px var(--f-display)">${l}</text>`;
    s+=`<rect x="${x}" y="38" width="64" height="54" style="fill:${hid?'var(--gap)':'var(--card)'};stroke:${hid?'var(--gap-line)':'var(--ink)'}" stroke-width="2.5"${hid?' stroke-dasharray="6 4"':''}/>`;
    const v=hid?'?':dg[i]==null?'':dg[i];s+=`<text x="${x+32}" y="77" text-anchor="middle" style="fill:${hid?'var(--gap-line)':'var(--ink)'};font:800 32px var(--f-display)">${v}</text>`});
  return `<svg viewBox="0 0 200 96" style="width:100%;max-width:230px" role="img" aria-label="Tabla de centenas, decenas y unidades">${s}</svg>`}
/* Descomposición como en el libro: 146 = 100 + 40 + 6. hide: 'n', 'c', 'd' o 'u' */
function splitSvg(n,hide){const [c,d,u]=cdu(n),parts=[[c*100,CC,'centenas',80],[d*10,CD,'decenas',66],[u,CU,'unidades',56]];
  const box=(x,w,txt,col,hid)=>`<rect x="${x}" y="8" width="${w}" height="50" rx="10" style="fill:${hid?'var(--gap)':'var(--card)'};stroke:${hid?'var(--gap-line)':col}" stroke-width="3"${hid?' stroke-dasharray="6 4"':''}/><text x="${x+w/2}" y="44" text-anchor="middle" style="fill:${hid?'var(--gap-line)':col};font:800 28px var(--f-display)">${hid?'?':txt}</text>`;
  let x=4,s='';
  if(hide==='n'){s+=box(x,72,n,'var(--ink)',true);x+=76}else{s+=`<text x="${x+34}" y="44" text-anchor="middle" style="fill:var(--ink);font:800 30px var(--f-display)">${n}</text>`;x+=72}
  s+=`<text x="${x+11}" y="43" text-anchor="middle" style="fill:var(--ink);font:800 28px var(--f-display)">=</text>`;x+=24;
  parts.forEach(([v,col,lab,w],i)=>{s+=box(x,w,v,col,hide==='cdu'[i]);s+=`<text x="${x+w/2}" y="76" text-anchor="middle" style="fill:var(--muted);font:800 11px var(--f-body)">${lab}</text>`;x+=w;
    if(i<2){s+=`<text x="${x+13}" y="43" text-anchor="middle" style="fill:var(--ink);font:800 28px var(--f-display)">+</text>`;x+=26}});
  const W=x+4;return `<svg viewBox="0 0 ${W} 82" style="width:100%;max-width:${Math.round(W*1.25)}px" role="img" aria-label="${n} es ${c*100} más ${d*10} más ${u}">${s}</svg>`}

/* ---------- misiones ---------- */
const MISSIONS=[
{id:'cdu',name:'Centenas, decenas y unidades',sub:'1 C 2 D 3 U = 123',color:'var(--c-dig)',build(L){
  const bl=nums(L,4,['z','f','r','f']),tb=nums(L,6,['z','f','r']),wd=nums(L,4,['z','f','r','f']),mt=nums(L,4,['f','z','r','f']);
  const COL=['centenas','decenas','unidades'];
  const tbi=tb.map((n,i)=>{const k=[1,2,0,1,2,0][i],dg=cdu(n),others=[...new Set([...dg.filter((_,j)=>j!==k),dg[k]+1,dg[k]===0?1:dg[k]-1])].filter(v=>v!==dg[k]&&v>=0&&v<=9);
    return {pic:tableSvg(n,k),q:`En el ${n}, ¿cuántas ${COL[k]} hay?`,opts:[dg[k],...others.slice(0,2)].map(String),a:0,row:true}});
  const wdi=wd.map(n=>{const [c,d,u]=cdu(n);return {q:`${c} ${c===1?'centena':'centenas'}, ${d} ${d===1?'decena':'decenas'} y ${u} ${u===1?'unidad':'unidades'}`,opts:opts3(n,traps(n)).map(String),a:0,row:true}});
  return [
  {type:'quiz',title:'¿Cuántas hay?',hint:'El cuadrado verde vale 100, cada barra roja vale 10 y cada cubito azul vale 1.',items:bl.map(n=>({pic:blocksSvg(n),q:'¿Qué número es?',opts:opts3(n,traps(n)).map(String),a:0,row:true}))},
  {type:'quiz',title:'La tabla C D U',hint:'En el 123: el 1 son las centenas, el 2 las decenas y el 3 las unidades. Si no hay, se pone un 0.',items:tbi},
  {type:'quiz',title:'¿Qué número es?',hint:'Si hay 0 decenas, en el medio va un 0: 2 centenas, 0 decenas y 5 unidades son 205.',items:wdi},
  {type:'match',title:'Une cada número con su tabla',hint:'1 C 4 D 6 U es el 146.',pairs:mt.map(n=>{const [c,d,u]=cdu(n);return [`${c} C  ${d} D  ${u} U`,String(n)]})}]}},
{id:'descompon',name:'Descompón números',sub:'146 = 100 + 40 + 6',color:'var(--c-loco)',build(L){
  const sp=nums(L,6,['f','z','f','r','f','z']);
  const spl=shuffle(sp.map((n,i)=>{const [c,d,u]=cdu(n),k=i%4;
    if(k===0)return {pic:splitSvg(n,'c'),q:`${n} = ? + ${d*10} + ${u}`,opts:opts3(c*100,[n-u,c,c*100+d*10,c===1?200:100]).map(String),a:0,row:true};
    if(k===1)return {pic:splitSvg(n,'d'),q:`${n} = ${c*100} + ? + ${u}`,opts:opts3(d*10,[d===0?10:d,d*10+u,d===0?u*10:(d+1)*10],0,99).map(String),a:0,row:true};
    if(k===2)return {pic:splitSvg(n,'u'),q:`${n} = ${c*100} + ${d*10} + ?`,opts:opts3(u,[u*10||10,d,u+1],0,99).map(String),a:0,row:true};
    return {pic:splitSvg(n,'n'),q:`${c*100} + ${d*10} + ${u} = ?`,opts:opts3(n,traps(n)).map(String),a:0,row:true}}));
  // ¿Está bien roto? Con los fallos típicos: 226 = 210 + 10 + 6, 272 = 200 + 72 + 2, 108 = 100 + 10 + 8
  const tf=nums(L,6,['f','z','r','f','z','f']).map((n,i)=>{const [c,d,u]=cdu(n);
    if(i%2===0)return {q:`${n} = ${c*100} + ${d*10} + ${u}`,a:true};
    const bad=[[c*100+d*10,d*10,u],[c*100,d*10+u,u],[c*100,d===0?10:d,u],[c*100,u*10,d]].filter(([x,y,z])=>x+y+z!==n||x!==c*100||y!==d*10);
    const [x,y,z]=bad[ri(0,bad.length-1)];return {q:`${n} = ${x} + ${y} + ${z}`,a:false}});
  const mn=nums(L,4,['f','z','r','f']);
  return [
  {type:'quiz',title:'Rompe el número',hint:'El 146 se rompe en 100 + 40 + 6. Las centenas llevan dos ceros y las decenas uno.',items:spl},
  {type:'quiz',tf:true,title:'¿Está bien roto?',hint:'Mira cada cifra: en el 226, el primer 2 vale 200, el segundo 2 vale 20 y el 6 vale 6.',items:shuffle(tf)},
  {type:'match',title:'Une cada suma con su número',hint:'200 + 30 + 7 es el 237.',pairs:mn.map(n=>{const [c,d,u]=cdu(n);return [`${c*100} + ${d*10} + ${u}`,String(n)]})}]}},
{id:'nombres',name:'Escribe números',sub:'Ciento veinticinco',color:'var(--c-cuerpo)',build(L){
  const mt=nums(L,4,['f','z','r','f']),qs=nums(L,4,['f','z','f','r']),ws=nums(L,3,['f','z','r']),wr=nums(L,4,['f','z','r','f']);
  const wri=wr.map(n=>({q:'Escríbelo con letras:',big:n,a:numAns(n)}));
  if(L>1&&Math.random()<.5)wri[ri(0,3)]={q:'Adivinanza: dos centenas son… (escríbelo con letras)',a:['doscientos','doscientas']};
  else if(Math.random()<.5)wri[ri(0,3)]={q:'Escríbelo con letras:',big:100,a:['cien']};
  return [
  {type:'match',title:'Une cada número con su nombre',pairs:mt.map(n=>[String(n),numW(n)])},
  {type:'quiz',title:'¿Qué número es?',hint:'Toca el nombre para oírlo.',items:qs.map(n=>({q:cap(numW(n)),opts:opts3(n,traps(n),100,299).map(String),a:0,row:true}))},
  {type:'quiz',title:'¿Cómo se escribe con letras?',items:ws.map(n=>({q:String(n),opts:opts3(n,traps(n),100,299).map(numW),a:0}))},
  {type:'write',title:'Escríbelo tú',hint:'Del 101 al 199 empieza por «ciento»: 125 es ciento veinticinco. El 100 es «cien».',items:wri}]}},
{id:'cuenta',name:'Cuenta hacia delante y atrás',sub:'Anterior y posterior',color:'var(--c-circ)',build(L){
  const hi=HI(L),edges=shuffle([100,110,120,109,119,129+ri(0,6)*10,199,200,L>1?209:150,L>1?210+ri(0,7)*10:170]).filter(v=>v<=hi&&v>100);
  const ns=[...edges.slice(0,3),...[ri(101,hi-1),ri(101,hi-1)]];
  const it=shuffle(ns).map((n,i)=>i%2===0?{q:`¿Qué número va justo antes del ${n}?`,opts:opts3(n-1,[n+1,n-10,n-2]).map(String),a:0,row:true}:{q:`¿Qué número va justo después del ${n}?`,opts:opts3(n+1,[n-1,n+10,n+2]).map(String),a:0,row:true});
  // Contar seguido, como en el libro: «Cuenta del 100 al 119, hacia delante y hacia atrás»
  const run=(sg)=>{const tens=C(L)*100+ri(0,8)*10,a=sg>0?tens+ri(6,8):tens+ri(1,3);return [0,1,2,3,4].map(i=>a+sg*i)};
  const fl=[];for(const v of [...edges.slice(3),...[...Array(60)].map(()=>ri(101,hi-1))]){if(fl.length<4&&fl.every(w=>Math.abs(v-w)>2))fl.push(v)}
  fl.sort(()=>Math.random()-.5);
  return [
  {type:'quiz',title:'Anterior y posterior',hint:'El anterior va justo antes. El posterior va justo después. Después del 199 viene el 200.',items:it},
  {type:'order',title:'Cuenta hacia delante',hint:'Toca los números en orden, uno detrás de otro.',items:run(1).map(String)},
  {type:'order',title:'Cuenta hacia atrás',hint:'Ahora al revés: del más grande al más pequeño.',items:run(-1).map(String)},
  {type:'fill',small:true,title:'Completa los vecinos',hint:'Pon el anterior y el posterior.',lines:fl.map(n=>`[${n-1}]   ${n}   [${n+1}]`),extra:['300','99'].filter(x=>!fl.some(n=>Math.abs(+x-n)<=1))}]}}
];

const by=(id,L)=>MISSIONS.find(m=>m.id===id).build(L);
/* El examen cambia cada vez: todo sale al azar. Usa el id final2 para empezar con 0 estrellas en este bloque. */
const FINAL={id:'final2',name:'Examen final',sub:'Un poco de todo',color:'var(--c-final)',build(L){
  const cd=by('cdu',L),de=by('descompon',L),no=by('nombres',L),cu=by('cuenta',L);
  const q=shuffle([...cd[0].items.slice(0,3),...cd[1].items.slice(0,3),...cd[2].items.slice(0,2),...de[0].items.slice(0,4),...no[1].items.slice(0,2),...cu[0].items.slice(0,2)]);
  return [
   {type:'quiz',title:'Pregunta rápida',items:q.slice(0,8)},
   {...de[1],items:de[1].items.slice(0,4)},
   {...no[3],items:no[3].items.slice(0,3)},
   cu[3],
   cu[Math.random()<.5?1:2],
   {type:'quiz',title:'Última ronda',items:q.slice(8,16)}];
}};

registrar({
  id:'mates',
  title:'La aventura de los números',
  eyebrow:'Matemáticas · 2.º de Primaria',
  h1:'La aventura <span>de los números</span>',
  storeKey:'nael-mates',
  icons:ICONS,
  missions:MISSIONS,
  final:FINAL
});
})();
