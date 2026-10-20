// Matemáticas · numeración del 0 al 99
// Contenido de la asignatura. Lo carga base.html con ?a=mates
// Las misiones se generan al azar en cada partida: build(LV) recibe el nivel (1 Fácil, 2 Normal, 3 Difícil).
(function(){
const ICONS={
 tabla:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
 escribe:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
 ud:'<rect x="3" y="3" width="4" height="18" rx="1"/><rect x="9" y="3" width="4" height="18" rx="1"/><rect x="16" y="15" width="5" height="5" rx="1"/>',
 compara:'<path d="M10 6l-6 6 6 6M14 6l6 6-6 6"/>',
 ordena:'<path d="M5 20v-5M10 20v-8M15 20v-11M20 20V4"/>',
 vecinos:'<path d="M3 12h5M5 9l-3 3 3 3M21 12h-5M19 9l3 3-3 3"/><circle cx="12" cy="12" r="2.5"/>',
 recta:'<path d="M2 15h20M5 12v6M12 12v6M19 12v6"/><path d="M12 3v5M9.5 5.5L12 8l2.5-2.5"/>'
};

/* ---------- ayudas ---------- */
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
function pickN(k,a,b,f){const s=new Set();let t=0;while(s.size<k&&t++<5000){const v=ri(a,b);if(!f||f(v))s.add(v)}return [...s]}
function near(n,c){const s=[n];for(const v of c){if(v>=0&&v<=99&&!s.includes(v))s.push(v);if(s.length===3)break}while(s.length<3){const v=ri(0,99);if(!s.includes(v))s.push(v)}return s}
const swap=n=>(n%10)*10+Math.floor(n/10);
const two=v=>v%10!==0&&v%10!==Math.floor(v/10);
const TOP=L=>L===1?50:99; // Fácil: hasta el 50
const U=['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
const T10=['diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve'];
const V2=['veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
const DEC=['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
function numW(n){if(n<10)return U[n];if(n<20)return T10[n-10];if(n<30)return V2[n-20];const d=Math.floor(n/10),u=n%10;return DEC[d]+(u?' y '+U[u]:'')}
const cap=s=>s[0].toUpperCase()+s.slice(1);

/* ---------- dibujos ---------- */
function blocksSvg(n){const d=Math.floor(n/10),u=n%10;let x=4,s='';
  for(let i=0;i<d;i++){s+=`<rect x="${x}" y="4" width="14" height="100" rx="2" style="fill:var(--p2)"/>`;for(let j=1;j<10;j++)s+=`<line x1="${x}" x2="${x+14}" y1="${4+j*10}" y2="${4+j*10}" style="stroke:var(--card)" stroke-width="1.2"/>`;x+=20}
  if(u){x+=6;for(let j=0;j<u;j++){const c=Math.floor(j/5),r=j%5;s+=`<rect x="${x+c*15}" y="${92-r*15}" width="12" height="12" rx="2" style="fill:var(--p4)"/>`}x+=Math.ceil(u/5)*15}
  const W=x+4;return `<svg viewBox="0 0 ${W} 108" style="width:${Math.round(W*1.7)}px" role="img" aria-label="Bloques de decenas y unidades">${s}</svg>`}
function lineSvg(a,b,step,labels,arrow){const n=(b-a)/step,X=v=>24+(v-a)/step*(292/n);
  let s=`<line x1="8" y1="54" x2="332" y2="54" style="stroke:var(--ink)" stroke-width="3" stroke-linecap="round"/>`;
  for(let v=a;v<=b;v+=step){const big=labels.includes(v);s+=`<line x1="${X(v)}" x2="${X(v)}" y1="${big?44:47}" y2="${big?64:61}" style="stroke:var(--ink)" stroke-width="${big?3:2}"/>`;if(big)s+=`<text x="${X(v)}" y="86" text-anchor="middle" style="fill:var(--ink);font:800 17px var(--f-body)">${v}</text>`}
  const A=X(arrow);s+=`<polygon points="${A-11},10 ${A+11},10 ${A},38" style="fill:var(--c-final)"/>`;
  return `<svg viewBox="0 0 340 96" style="width:100%;max-width:440px" role="img" aria-label="Recta numérica">${s}</svg>`}
const CMP=['<','=','>'];

/* ---------- misiones ---------- */
const MISSIONS=[
{id:'tabla',name:'La tabla del 99',sub:'Los números del 0 al 99',color:'var(--c-exc)',build(L){const t=ri(1,9),d=ri(1,9);return [
  {type:'grid',mode:'fill',title:'Completa la tabla',hint:'Toca el número que va en la casilla que parpadea.',blanks:pickN([0,5,8,12][L],1,99).sort((x,y)=>x-y)},
  {type:'grid',mode:'pick',title:`Toca los números que terminan en ${t}`,hint:'¡Hay 10! Búscalos todos.',test:n=>n%10===t},
  {type:'grid',mode:'pick',title:`Toca los números que tienen ${d} decenas`,hint:'¡Hay 10! Fíjate en la cifra de las decenas.',test:n=>Math.floor(n/10)===d}]}},
{id:'escribe',name:'Escribe números',sub:'Con números y con letras',color:'var(--c-cuerpo)',build(L){
  const top=TOP(L),ns=pickN(4,13,top),qs=pickN(4,13,top,two),ws=pickN(3,13,top);return [
  {type:'match',title:'Une cada número con su nombre',pairs:ns.map(n=>[String(n),numW(n)])},
  {type:'quiz',title:'¿Qué número es?',hint:'Toca el nombre para oírlo.',items:qs.map(n=>({q:cap(numW(n)),opts:near(n,[swap(n),n+10,n-10,n+1]).map(String),a:0,row:true}))},
  {type:'quiz',title:'¿Cómo se escribe con letras?',items:ws.map(n=>({q:String(n),opts:near(n,[swap(n),n+10,n-10,n+1]).map(numW),a:0}))}]}},
{id:'ud',name:'Decenas y unidades',sub:'D y U',color:'var(--c-loco)',build(L){
  const top=TOP(L),bl=pickN(3,12,Math.min(96,top),two),qn=pickN(4,21,Math.min(98,top),two),mn=pickN(4,12,Math.min(98,top),two);
  const items=[];qn.forEach((n,i)=>{const d=Math.floor(n/10),u=n%10;
    if(i%4===0)items.push({q:`¿Cuántas decenas tiene el ${n}?`,opts:near(d,[u,(d+1)%10,(d+2)%10]).map(String),a:0,row:true});
    if(i%4===1)items.push({q:`¿Cuántas unidades tiene el ${n}?`,opts:near(u,[d,(u+1)%10,(u+2)%10]).map(String),a:0,row:true});
    if(i%4===2)items.push({q:`${d} decenas y ${u} unidades son…`,opts:[String(n),String(swap(n)),String(d*100+u)],a:0,row:true});
    if(i%4===3)items.push({q:`¿Cuál tiene ${d} decenas?`,opts:near(n,[swap(n),(d===9?8:d+1)*10+u]).map(String),a:0,row:true});});
  return [
  {type:'quiz',title:'¿Qué número es?',hint:'Cada barra azul es una decena (10). Cada cuadradito es una unidad (1).',items:bl.map(n=>({pic:blocksSvg(n),q:'¿Qué número es?',opts:near(n,[swap(n),n+1,n-1]).map(String),a:0,row:true}))},
  {type:'quiz',title:'Decenas y unidades',hint:'En el 47, el 4 son las decenas y el 7 las unidades.',items},
  {type:'match',title:'Une cada número',pairs:mn.map(n=>[`${Math.floor(n/10)} D y ${n%10} U`,String(n)])}]}},
{id:'compara',name:'Mayor, menor, igual',sub:'>  <  =',color:'var(--c-resp)',build(L){
  const top=TOP(L),pairs=[];const a1=ri(10,top-1);pairs.push([a1,a1]);
  const b=pickN(1,12,Math.min(98,top),two)[0];pairs.push(Math.random()<.5?[b,swap(b)]:[swap(b),b]);
  const t=ri(1,L===1?4:9)*10;pairs.push([t+ri(0,4),t+ri(5,9)].sort(()=>Math.random()-.5));
  if(L===3){const t2=ri(1,9)*10;pairs.push([t2+ri(0,4),t2+ri(5,9)].sort(()=>Math.random()-.5))}
  while(pairs.length<(L===3?9:7)){const x=ri(0,top),y=ri(0,top);if(x!==y)pairs.push([x,y])}
  const it=shuffle(pairs).map(([x,y])=>({q:`${x}   ?   ${y}`,opts:CMP,a:x<y?0:x===y?1:2,keep:true,row:true}));
  const mm=[];for(let i=0;i<4;i++){const [x,y]=pickN(2,0,top);const big=i%2===0;mm.push({q:big?'¿Cuál es mayor?':'¿Cuál es menor?',opts:(big?[Math.max(x,y),Math.min(x,y)]:[Math.min(x,y),Math.max(x,y)]).map(String),a:0,row:true})}
  return [
  {type:'quiz',title:'¿Mayor, menor o igual?',hint:'La boca del cocodrilo se abre hacia el número más grande: 23 < 45.',items:it},
  {type:'quiz',title:'Elige el número',items:mm}]}},
{id:'ordena',name:'Ordena números',sub:'De menor a mayor y al revés',color:'var(--c-dig)',build(L){
  const top=TOP(L),n=L===3?5:4,t=ri(1,L===1?3:7)*10;return [
  {type:'order',title:'De menor a mayor',hint:'Toca primero el más pequeño.',items:pickN(n,0,top).sort((x,y)=>x-y).map(String)},
  {type:'order',title:'De mayor a menor',hint:'Toca primero el más grande.',items:pickN(n,0,top).sort((x,y)=>y-x).map(String)},
  {type:'order',title:'De menor a mayor (¡muy parecidos!)',items:pickN(L===3?6:5,t,t+19).sort((x,y)=>x-y).map(String)}]}},
{id:'vecinos',name:'Anterior y posterior',sub:'El de antes y el de después',color:'var(--c-circ)',build(L){
  const top=TOP(L),edge=()=>[ri(2,L===1?5:9)*10,ri(1,L===1?4:8)*10+9];
  const ns=shuffle([...edge(),...pickN(3,2,top-2)]);
  const it=ns.map((n,i)=>i%2===0?{q:`¿Qué número va justo antes del ${n}?`,opts:near(n-1,[n+1,n-10,n-2]).map(String),a:0,row:true}:{q:`¿Qué número va justo después del ${n}?`,opts:near(n+1,[n-1,n+10,n+2]).map(String),a:0,row:true});
  const fl=shuffle([...edge(),...pickN(2,2,top-2)]);
  return [
  {type:'quiz',title:'Anterior y posterior',hint:'El anterior va justo antes. El posterior va justo después.',items:it},
  {type:'fill',small:true,title:'Completa los vecinos',hint:'Pon el anterior y el posterior.',lines:fl.map(n=>`[${n-1}]   ${n}   [${n+1}]`),extra:pickN(2,0,99,v=>!fl.some(n=>Math.abs(v-n)<=1)).map(String)}]}},
{id:'recta',name:'Recta y series',sub:'De 2 en 2, de 5 en 5, de 10 en 10',color:'var(--c-sent)',build(L){
  const it=[];for(let i=0;i<4;i++){if(i<3){const a=ri(0,L===1?4:8)*10,mid=L!==3;let v;do{v=a+ri(1,9)}while(mid&&v===a+5);
      it.push({pic:lineSvg(a,a+10,1,mid?[a,a+5,a+10]:[a,a+10],v),q:'¿Qué número señala la flecha?',opts:near(v,[v+1,v-1,v+2]).map(String),a:0,row:true})}
    else{const v=[10,20,30,40,60,70,80,90][ri(0,7)];it.push({pic:lineSvg(0,100,10,[0,50,100],v),q:'¿Qué número señala la flecha?',opts:near(v,[v+10,v-10]).map(String),a:0,row:true})}}
  const ser=(st,stp,len,gaps,lab)=>{const v=[...Array(len)].map((_,i)=>st+i*stp);return {line:`${lab}:  `+v.map((x,i)=>gaps.includes(i)?`[${x}]`:x).join('  '),ans:gaps.map(i=>v[i])}};
  const s2=ser(ri(1,L===1?15:30)*2,2,6,[2,4,5],'De 2 en 2'),s5=ser(ri(0,L===1?4:8)*5,5,6,[1,3,5],'De 5 en 5'),s10=ser(ri(0,3)*10+ri(1,9),10,6,[2,3,5],'De 10 en 10');
  const b10=ser(ri(6,9)*10+ri(0,9),-10,6,[1,3,4],'Hacia atrás de 10 en 10'),b2=ser(ri(25,49)*2,-2,6,[2,3,5],'Hacia atrás de 2 en 2');
  const ex=a=>pickN(2,0,99,v=>!a.includes(v)).map(String);
  return [
  {type:'quiz',title:'La recta numérica',hint:'Cuenta las rayitas desde el número que conoces.',items:it},
  {type:'fill',small:true,title:'Sigue la serie',lines:[s2.line,s5.line,s10.line],extra:ex([...s2.ans,...s5.ans,...s10.ans])},
  {type:'fill',small:true,title:'Series hacia atrás',lines:[b10.line,b2.line],extra:ex([...b10.ans,...b2.ans])}]}}
];

const by=(id,L)=>MISSIONS.find(m=>m.id===id).build(L);
const FINAL={id:'final',name:'Examen final',sub:'Un poco de todo',color:'var(--c-final)',build(L){
  const q=shuffle([...by('compara',L)[0].items.slice(0,3),...by('ud',L)[0].items.slice(0,2),...by('ud',L)[1].items.slice(0,2),...by('vecinos',L)[0].items.slice(0,3),...by('recta',L)[0].items.slice(0,2),...by('escribe',L)[1].items.slice(0,2)]);
  return [
   {type:'grid',mode:'fill',title:'Completa la tabla',hint:'Toca el número que va en la casilla que parpadea.',blanks:pickN([0,4,6,9][L],1,99).sort((x,y)=>x-y)},
   {type:'quiz',title:'Pregunta rápida',items:q.slice(0,7)},
   by('ordena',L)[Math.random()<.5?0:1],
   by('recta',L)[1],
   {type:'quiz',title:'Última ronda',items:q.slice(7,14)}];
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
