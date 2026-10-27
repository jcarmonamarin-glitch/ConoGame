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
/* Saltos con flechas: burbujas con el número y una flecha curva encima de cada salto (+2, -5…).
   gaps: posiciones con "?" (la primera es la que se pregunta); done: posiciones ya acertadas (en verde). */
function hopSvg(vals,stp,gaps,done,wide){const n=vals.length,R=25,D=wide?170:74,x0=32,cy=86,W=x0*2+(n-1)*D,X=i=>x0+i*D;
  const col=stp>0?'var(--p3)':'var(--p1)',lab=(stp>0?'+':'−')+Math.abs(stp);let s='';
  for(let i=0;i<n-1;i++){const sx=X(i)+R*.55,ex=X(i+1)-R*.55,ey=cy-R*.84,mx=(X(i)+X(i+1))/2,ctl=wide?cy-R-62:cy-R-46;
    s+=`<path d="M${sx} ${ey} Q${mx} ${ctl} ${ex} ${ey}" fill="none" style="stroke:${col}" stroke-width="3" stroke-linecap="round"/>`;
    const dx=ex-mx,dy=ey-ctl,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,b=11,w=6.5;
    s+=`<polygon points="${ex},${ey} ${ex-ux*b-uy*w},${ey-uy*b+ux*w} ${ex-ux*b+uy*w},${ey-uy*b-ux*w}" style="fill:${col}"/>`;
    s+=`<text x="${mx}" y="${(ey+ctl)/2-8}" text-anchor="middle" style="fill:${col};font:800 ${wide?24:19}px var(--f-display)">${lab}</text>`}
  vals.forEach((v,i)=>{const g=gaps.includes(i),ok=done&&done.includes(i),cur=g&&gaps[0]===i;
    s+=`<circle cx="${X(i)}" cy="${cy}" r="${R}" style="fill:${cur?'var(--gap)':ok?'var(--ok-soft)':'var(--card)'};stroke:${cur||g?'var(--gap-line)':ok?'var(--ok)':'var(--ink)'}" stroke-width="3"${g?' stroke-dasharray="6 4"':''}/>`;
    s+=`<text x="${X(i)}" y="${cy+8}" text-anchor="middle" style="fill:${g?'var(--gap-line)':ok?'var(--ok)':'var(--ink)'};font:800 22px var(--f-display)">${g?'?':v}</text>`});
  return `<svg viewBox="0 0 ${W} ${cy+R+6}" style="width:100%;max-width:${Math.round(W*1.3)}px" role="img" aria-label="Saltos de ${Math.abs(stp)} en ${Math.abs(stp)}">${s}</svg>`}
/* Descomposición como en el libro: 26 → 20 + 6. hide: 'n' (el número), 't' (las decenas), 'u' (las unidades). */
function splitSvg(n,hide){const t=Math.floor(n/10)*10,u=n%10;
  const box=(x,y,txt,c,hid)=>`<rect x="${x}" y="${y}" width="84" height="52" rx="12" style="fill:${hid?'var(--gap)':'var(--card)'};stroke:${hid?'var(--gap-line)':c}" stroke-width="3"${hid?' stroke-dasharray="6 4"':''}/><text x="${x+42}" y="${y+37}" text-anchor="middle" style="fill:${hid?'var(--gap-line)':c};font:800 32px var(--f-display)">${hid?'?':txt}</text>`;
  const arr=(x1,y1,x2,y2)=>{const L=Math.hypot(x2-x1,y2-y1),ux=(x2-x1)/L,uy=(y2-y1)/L;return `<line x1="${x1}" y1="${y1}" x2="${x2-ux*8}" y2="${y2-uy*8}" style="stroke:var(--ink)" stroke-width="3" stroke-linecap="round"/><polygon points="${x2},${y2} ${x2-ux*12-uy*7},${y2-uy*12+ux*7} ${x2-ux*12+uy*7},${y2-uy*12-ux*7}" style="fill:var(--ink)"/>`};
  return `<svg viewBox="0 0 300 184" style="width:100%;max-width:340px" role="img" aria-label="${n} es ${t} más ${u}">`+box(108,4,n,'var(--ink)',hide==='n')+arr(132,58,90,100)+arr(168,58,210,100)+
    box(38,102,t,'var(--p2)',hide==='t')+`<text x="150" y="140" text-anchor="middle" style="fill:var(--ink);font:800 34px var(--f-display)">+</text>`+box(178,102,u,'var(--p4)',hide==='u')+
    `<text x="80" y="178" text-anchor="middle" style="fill:var(--muted);font:800 14px var(--f-body)">decenas</text><text x="220" y="178" text-anchor="middle" style="fill:var(--muted);font:800 14px var(--f-body)">unidades</text></svg>`}
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
{id:'ud',name:'Decenas y unidades',sub:'26 = 20 + 6',color:'var(--c-loco)',build(L){
  const top=TOP(L),bl=pickN(3,12,Math.min(96,top),two),sp=pickN(6,12,Math.min(98,top),two),qn=pickN(4,21,Math.min(98,top),two),mn=pickN(4,12,Math.min(98,top),two);
  const spl=shuffle(sp.map((n,i)=>{const t=Math.floor(n/10)*10,u=n%10,d=t/10;
    if(i%3===0)return {pic:splitSvg(n,'t'),q:`${n} = ? + ${u}`,opts:near(t,[d,n,t+10]).map(String),a:0,row:true};
    if(i%3===1)return {pic:splitSvg(n,'u'),q:`${n} = ${t} + ?`,opts:near(u,[d,u*10,u+1]).map(String),a:0,row:true};
    return {pic:splitSvg(n,'n'),q:`${t} + ${u} = ?`,opts:near(n,[swap(n),d+u,n+10]).map(String),a:0,row:true}}));
  const items=[];qn.forEach((n,i)=>{const t=Math.floor(n/10)*10,d=t/10,u=n%10;
    if(i%4===0)items.push({q:`En el ${n}, ¿cuánto valen las decenas?`,opts:near(t,[d,u,t+10]).map(String),a:0,row:true});
    if(i%4===1)items.push({q:`En el ${n}, ¿cuánto valen las unidades?`,opts:near(u,[d,t,u*10]).map(String),a:0,row:true});
    if(i%4===2)items.push({q:`${d} decenas y ${u} unidades son…`,opts:[String(n),String(swap(n)),String(d*100+u)],a:0,row:true});
    if(i%4===3)items.push({q:`¿Qué número es ${t} + ${u}?`,opts:near(n,[swap(n),d+u,t]).map(String),a:0,row:true});});
  return [
  {type:'quiz',title:'¿Qué número es?',hint:'Cuenta las barras de 10 en 10 (10, 20, 30…) y luego suma los cuadraditos.',items:bl.map(n=>({pic:blocksSvg(n),q:'¿Qué número es?',opts:near(n,[swap(n),n+1,n-1]).map(String),a:0,row:true}))},
  {type:'quiz',title:'Rompe el número',hint:'El 26 se rompe en 20 + 6: las decenas llevan un 0 detrás.',items:spl},
  {type:'quiz',title:'Decenas y unidades',hint:'En el 47, el 4 son 4 decenas y valen 40. El 7 son 7 unidades. 47 = 40 + 7.',items},
  {type:'match',title:'Une cada suma con su número',hint:'40 + 7 es el 47.',pairs:mn.map(n=>[`${Math.floor(n/10)*10} + ${n%10}`,String(n)])}]}},
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
{id:'recta',name:'Recta y saltos',sub:'De 2 en 2, de 5 en 5, de 10 en 10',color:'var(--c-sent)',build(L){
  const top=TOP(L);
  const it=[];for(let i=0;i<4;i++){if(i<3){const a=ri(0,L===1?4:8)*10,mid=L!==3;let v;do{v=a+ri(1,9)}while(mid&&v===a+5);
      it.push({pic:lineSvg(a,a+10,1,mid?[a,a+5,a+10]:[a,a+10],v),q:'¿Qué número señala la flecha?',opts:near(v,[v+1,v-1,v+2]).map(String),a:0,row:true})}
    else{const v=[10,20,30,40,60,70,80,90][ri(0,7)];it.push({pic:lineSvg(0,100,10,[0,50,100],v),q:'¿Qué número señala la flecha?',opts:near(v,[v+10,v-10]).map(String),a:0,row:true})}}
  // Un salto: 24 + 2, 35 - 5, 26 + 10…
  const hops=shuffle([[2,1],[5,1],[10,1],[2,-1],[5,-1],[10,-1]]).map(([k,sg])=>{
    const a=k===5?(sg>0?ri(0,(top-5)/5|0)*5:ri(1,top/5|0)*5):(sg>0?ri(1,top-k):ri(k,top)),b=a+sg*k;
    return {pic:hopSvg([a,b],sg*k,[1],null,true),q:`${a} ${sg>0?'+':'-'} ${k} = ?`,opts:near(b,[b-sg,a-sg*k,k===10?a+sg:b+sg*k]).map(String),a:0,row:true}});
  // Series con flechas: 5 burbujas, una o dos con "?"
  const chains=shuffle([[2,1],[5,1],[10,1],[2,-1],[5,-1],[10,-1]]),N=5,ser=[];
  chains.forEach(([k,sg],ci)=>{let a;
    if(sg>0)a=k===2?ri(0,(top-8)/2|0)*2+(L>1&&Math.random()<.4?1:0):k===5?ri(0,(top-20)/5|0)*5:ri(0,top-40);
    else a=k===2?ri(5,top/2|0)*2-(L>1&&Math.random()<.4?1:0):k===5?ri(4,top/5|0)*5:ri(40,top);
    const v=[...Array(N)].map((_,i)=>a+sg*i*k),two_=L>1&&ci<3;
    const g=two_?shuffle([1,2,3,4]).slice(0,2).sort((x,y)=>x-y):[ri(1,4)];
    const lab=`${sg>0?'Sumamos':'Restamos'} ${k}. ¿Qué número va en el hueco azul?`;
    g.forEach((p,gi)=>ser.push({pic:hopSvg(v,sg*k,g.slice(gi),g.slice(0,gi)),q:lab,opts:near(v[p],[v[p]+1,v[p]-1,v[p]+sg*k*2]).map(String),a:0,row:true}))});
  return [
  {type:'quiz',title:'La recta numérica',hint:'Cuenta las rayitas desde el número que conoces.',items:it},
  {type:'quiz',title:'Un saltito',hint:'Mira la flecha: +2 es sumar 2 y −2 es restar 2. Con el 10 solo cambian las decenas: 26 + 10 = 36.',items:hops},
  {type:'quiz',title:'Sigue los saltos',hint:'Cada flecha suma o resta lo mismo. Salta desde el número de antes.',items:ser.slice(0,L===1?6:9)}]}}
];

const by=(id,L)=>MISSIONS.find(m=>m.id===id).build(L);
const FINAL={id:'final',name:'Examen final',sub:'Un poco de todo',color:'var(--c-final)',build(L){
  const ud=by('ud',L),re=by('recta',L);
  const q=shuffle([...by('compara',L)[0].items.slice(0,3),...ud[0].items.slice(0,2),...ud[1].items.slice(0,2),...ud[2].items.slice(0,2),...by('vecinos',L)[0].items.slice(0,3),...re[0].items.slice(0,2),...by('escribe',L)[1].items.slice(0,2)]);
  return [
   {type:'grid',mode:'fill',title:'Completa la tabla',hint:'Toca el número que va en la casilla que parpadea.',blanks:pickN([0,4,6,9][L],1,99).sort((x,y)=>x-y)},
   {type:'quiz',title:'Pregunta rápida',items:q.slice(0,8)},
   by('ordena',L)[Math.random()<.5?0:1],
   {...re[1],title:'Saltitos'},
   {...re[2],items:re[2].items.slice(0,6)},
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
