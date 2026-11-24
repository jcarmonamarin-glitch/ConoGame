// Inglés · Unit 4 (la casa: phone, mirror, clock, sofa, mat, lamp; bedroom, kitchen, bathroom, living room;
// There's a… in the…; Whose is this? It's mine / yours; Is that… yours? Yes, it is…) y repaso de los números del 1 al 20.
// El temario anterior (juguetes, This is / These are, Whose is this? It's Anna's) está en el historial de git.
// Contenido de la asignatura. Lo carga base.html con ?a=ingles
// Las misiones se generan al azar en cada partida: build(LV) recibe el nivel (1 Fácil, 2 Normal, 3 Difícil).
// La voz habla en inglés (lang:'en-GB'): los ejercicios de escuchar usan el campo `say`.
(function(){
const ICONS={
 n120:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
 things:'<path d="M8 4h8l3 8H5z"/><path d="M12 12v7M8 20h8"/>',
 rooms:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M12 10v10M5 15h14"/>',
 there:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><circle cx="12" cy="15" r="2.5"/>',
 code:'<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v2"/>',
 mine:'<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L3.5 14a1.5 1.5 0 0 1 2.5-1.6L8 15"/>',
 yours:'<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M16.5 5.5a2.5 2.5 0 1 1 3.2 2.4c-.8.3-1.2.9-1.2 1.6v.5"/><circle cx="18.5" cy="13" r=".6" fill="currentColor"/>'
};

/* ---------- datos ---------- */
const N=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
// Palabras que se confunden mucho: para que las opciones malas se parezcan
const LOOK={3:[13,30],4:[14,40],5:[15,50],6:[16,60],7:[17,70],8:[18,80],9:[19,90],2:[12,20],1:[11,10],10:[11,20],11:[7,12],12:[2,20],13:[3,30],14:[4,40],15:[5,50],16:[6,60],17:[7,70],18:[8,80],19:[9,90],20:[2,12]};
/* ---------- ayudas ---------- */
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=(arr,k)=>shuffle(arr).slice(0,k);
const range=(a,b)=>[...Array(b-a+1)].map((_,i)=>a+i);
const emo=(e,n)=>`<div class="emo">${Array(n).fill(e).join(' ')}</div>`;
const hear=canSpeak; // si el dispositivo no habla, el ejercicio de escuchar enseña la palabra escrita
// Tres opciones de número, con trampas que suenan parecido (13/30) o están al lado
function numOpts(n,lo,hi){const s=[n];
  for(const v of [...(LOOK[n]||[]).filter(v=>v>=lo&&v<=hi),n+1,n-1,n+2,n-2])if(v>=lo&&v<=hi&&v>=1&&!s.includes(v)&&s.length<3)s.push(v);
  while(s.length<3){const v=ri(lo,hi);if(!s.includes(v))s.push(v)}return s}
// Tres opciones de palabra parecidas: thirteen / thirty no existe en 1-20, así que vecinos y "-teen"
function wordOpts(n,lo,hi){return numOpts(n,Math.max(1,lo-2),Math.min(20,hi+2)).map(v=>N[v])}
// Quitar 1 o 2 letras de la palabra: 'tw[e]lv[e]'
function holes(w,LV){const idx=[...w].map((c,i)=>i).filter(i=>i>0&&w[i]!==' ');const k=LV===3?Math.min(3,idx.length):LV===1?1:2;
  const hs=pick(idx,k);return [...w].map((c,i)=>hs.includes(i)?`[${c}]`:c).join('')}

/* ---------- bloques de ejercicios ---------- */
function numMatch(ns){return {type:'match',title:'Une el número con su nombre',hint:'Lee la palabra en voz alta.',pairs:ns.map(n=>[String(n),N[n]])}}
function numListen(ns,lo,hi){return {type:'quiz',title:hear?'Escucha y elige el número':'Lee y elige el número',hint:hear?'Si no lo oyes bien, toca «Escuchar otra vez».':'',
  items:ns.map(n=>{const o=numOpts(n,lo,hi);return {q:hear?'¿Qué número has oído?':`«${N[n]}»`,say:hear?N[n]:undefined,opts:o.map(String),a:0,row:true}})}}
function numRead(ns,lo,hi){return {type:'quiz',title:'¿Cómo se escribe?',hint:'Fíjate bien en las letras.',items:ns.map(n=>({q:`El ${n} en inglés es…`,opts:wordOpts(n,lo,hi),a:0}))}}
function numWord(ns,lo,hi){return {type:'quiz',title:'¿Qué número es?',items:ns.map(n=>({q:`«${N[n]}» es el…`,opts:numOpts(n,lo,hi).map(String),a:0,row:true}))}}
function numOrder(lo,hi,k){const ns=pick(range(lo,hi),k).sort((a,b)=>a-b);return {type:'order',title:'Ordena de menor a mayor',hint:'One, two, three…',items:ns.map(n=>N[n])}}
function numWrite(ns){return {type:'write',title:'Escribe el número en inglés',hint:'Con todas sus letras. Ejemplo: 7 → seven.',items:ns.map(n=>({q:'¿Cómo se escribe?',big:n,a:N[n]}))}}
function numDictation(ns){return {type:'write',title:'Escucha y escribe',hint:'Escribe con letras el número que oyes.',items:ns.map(n=>({q:'Escribe lo que oyes',say:N[n],a:N[n]}))}}
function numHoles(ns,LV){return {type:'fill',small:true,title:'Completa las letras que faltan',hint:'Di el número en voz alta y piensa qué letra falta.',
  lines:ns.map(n=>`${n} → ${holes(N[n],LV)}`),extra:LV===1?[]:pick(['a','o','u','i','y'],2)}}
function numBuild(ns){return {type:'build',title:'Forma el número con letras',hint:'Toca las letras en orden.',items:ns.map(n=>({e:String(n),p:N[n].split('')}))}}

function numMission(lo,hi,LV){
  const all=range(lo,hi),k=LV===1?4:LV===3?7:5;
  return [numMatch(pick(all,LV===1?4:5)),numListen(pick(all,k),lo,hi),numRead(pick(all,k),lo,hi),numOrder(lo,hi,LV===1?4:LV===3?6:5),numBuild(pick(all,LV===3?4:3)),numWrite(pick(all,k))];
}

/* ---------- Unit 4: dibujos de la casa ---------- */
// Dibujo de 64×64. w = tamaño en píxeles (sin w, lo pone el CSS); title = palabra que sale en el repaso de fallos
const S=(body,w,title)=>`<svg viewBox="0 0 64 64" class="cosa"${w?` width="${w}" height="${w}"`:''} role="img">${title?`<title>${title}</title>`:''}<g fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
const KEYS=[27,32,37].flatMap(y=>[26,30.5,35].map(x=>`<rect x="${x}" y="${y}" width="3.5" height="3" rx=".6" fill="#f08a5d" stroke-width="1"/>`)).join('');
const TICKS=[...Array(12)].map((_,i)=>{const a=i*Math.PI/6;return `<circle cx="${(32+17*Math.sin(a)).toFixed(1)}" cy="${(32-17*Math.cos(a)).toFixed(1)}" r="${i%3?1:1.7}" fill="#333" stroke="none"/>`}).join('');
const FRINGE=[...[8,13,18,23,28,33,38,43,48,53].map(x=>`<path d="M${x} 46l-1 6"/>`),...[16,21,26,31,36,41,46].map(x=>`<path d="M${x} 22l1-5"/>`)].join('').replace(/"\/>/g,'" stroke="#c98b4a" stroke-width="1.8"/>');
// Las cosas de la ficha. wall: va colgada en la pared (en el dibujo de la casa sale arriba)
const TH=[
 {w:'phone',es:'teléfono',d:`<rect x="10" y="46" width="44" height="11" rx="4" fill="#4a90d9"/><path d="M38 13V4"/><rect x="22" y="12" width="20" height="38" rx="5" fill="#b8c2cc"/><rect x="26" y="16" width="12" height="7" rx="1" fill="#d6f0c8"/>${KEYS}`},
 {w:'mirror',es:'espejo',wall:true,d:`<circle cx="32" cy="6" r="3" fill="#c98b4a"/><rect x="12" y="9" width="40" height="49" rx="3" fill="#c98b4a"/><rect x="18" y="15" width="28" height="37" fill="#bfe3f5"/><path d="M24 30l12-12M25 42l18-18" stroke="#fff" stroke-width="3"/>`},
 {w:'clock',es:'reloj',wall:true,d:`<circle cx="32" cy="32" r="27" fill="#4a90d9"/><circle cx="32" cy="32" r="21" fill="#fff"/>${TICKS}<path d="M32 32V19M32 32l8 6" stroke-width="3"/><circle cx="32" cy="32" r="2.5" fill="#f08a5d"/>`},
 {w:'sofa',es:'sofá',d:`<rect x="13" y="14" width="38" height="24" rx="6" fill="#4a90d9"/><rect x="14" y="33" width="36" height="12" rx="3" fill="#7db4ee"/><rect x="5" y="26" width="13" height="24" rx="5" fill="#f08a5d"/><rect x="46" y="26" width="13" height="24" rx="5" fill="#f08a5d"/><rect x="16" y="44" width="32" height="6" fill="#f08a5d"/><path d="M10 50v6M54 50v6"/>`},
 {w:'mat',es:'alfombrilla',d:`${FRINGE}<polygon points="14,22 50,22 58,46 6,46" fill="#f08a5d"/><polygon points="19,26 45,26 50,42 14,42" fill="#4a90d9"/><path d="M18 31h28M16 37h32" stroke="#fff" stroke-width="2"/>`},
 {w:'lamp',es:'lámpara',d:`<rect x="29" y="30" width="6" height="21" fill="#f08a5d"/><path d="M45 30v8"/><circle cx="45" cy="40" r="2" fill="#f08a5d"/><path d="M21 8h22l9 22H12z" fill="#ffcf4a"/><path d="M27 9l-4 20M37 9l4 20" stroke-width="1.5"/><rect x="18" y="50" width="28" height="7" rx="3.5" fill="#4a90d9"/>`}
];
const thPic=t=>S(t.d,0,t.w);
const thOpt=t=>S(t.d,0,t.w);
// Muebles fijos de cada habitación, para reconocerla: cama, bañera, fregadero y tele
const BED=`<rect x="4" y="18" width="7" height="38" rx="2" fill="#c98b4a"/><rect x="9" y="34" width="51" height="13" rx="2" fill="#fff"/><rect x="24" y="31" width="36" height="16" rx="3" fill="#9b6bff"/><rect x="12" y="28" width="13" height="8" rx="3" fill="#fff"/><path d="M10 47v9M58 47v9"/>`;
const BATH=`<path d="M54 30V14h-8"/><circle cx="46" cy="18" r="1.5" fill="#333"/><path d="M4 30h56v8a12 12 0 0 1-12 12H16A12 12 0 0 1 4 38z" fill="#fff"/><path d="M8 34h48" stroke="#7cc6f5" stroke-width="4"/><path d="M15 50l-3 6M49 50l3 6"/>`;
const SINK=`<path d="M30 23V12h8v4" fill="none"/><rect x="2" y="22" width="60" height="6" fill="#b8c2cc"/><rect x="5" y="28" width="54" height="29" fill="#f6e3c5"/><rect x="9" y="32" width="20" height="21" rx="1"/><rect x="35" y="32" width="20" height="21" rx="1"/><circle cx="26" cy="42" r="1.3" fill="#333"/><circle cx="38" cy="42" r="1.3" fill="#333"/>`;
const TV=`<rect x="10" y="8" width="44" height="30" rx="3" fill="#444"/><rect x="14" y="12" width="36" height="22" fill="#7cc6f5"/><path d="M32 38v6"/><rect x="8" y="44" width="48" height="6" fill="#c98b4a"/><path d="M12 50v7M52 50v7"/>`;
const RM=[
 {w:'bedroom',es:'dormitorio',x:20,y:64,d:BED},
 {w:'bathroom',es:'cuarto de baño',x:120,y:64,d:BATH},
 {w:'kitchen',es:'cocina',x:20,y:129,d:SINK},
 {w:'living room',es:'salón',x:120,y:129,d:TV}
];
const RH=65;
// Casa con 4 habitaciones. pl = {bedroom:[cosas], ...}; hi = habitación pintada de amarillo
function house(pl={},hi=null,title='',cls='casa'){
  let o=`<polygon points="6,66 120,10 234,66" fill="#ef7b6b"/><path d="M58 44h22M100 30h26M146 36h24M176 52h22M84 56h20M130 50h18" stroke="#b94e40" stroke-width="2"/>`;
  o+=`<rect x="20" y="64" width="200" height="130" fill="#fff8ea" stroke="none"/>`;
  if(hi)o+=`<rect x="${hi.x}" y="${hi.y}" width="100" height="${RH}" fill="#ffe27a" stroke="none"/>`;
  RM.forEach(r=>{o+=`<g transform="translate(${r.x+2},${r.y+RH-39}) scale(.6)">${r.d}</g>`;
    (pl[r.w]||[]).forEach((t,i)=>{o+=`<g transform="translate(${r.x+41+i*29},${t.wall?r.y+4:r.y+RH-31}) scale(.46)">${t.d}</g>`})});
  o+=`<path d="M120 64v130M20 129h200" stroke-width="3.5"/><rect x="20" y="64" width="200" height="130" stroke-width="3.5"/>`;
  return `<svg viewBox="0 0 240 200" class="${cls}" role="img">${title?`<title>${title}</title>`:''}<g fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${o}</g></svg>`;
}
const rmPic=r=>house({},r);
const rmOpt=r=>house({},r,r.w,'mini');
// Reparte las 6 cosas por la casa, como mucho 2 en cada habitación
function placeAll(){const pl={};RM.forEach(r=>pl[r.w]=[]);
  shuffle(TH).forEach(t=>{const free=RM.filter(r=>pl[r.w].length<2);pl[free[ri(0,free.length-1)].w].push(t)});return pl}
const roomOf=(pl,t)=>RM.find(r=>pl[r.w].includes(t));
const roomAns=r=>[r.w,`the ${r.w}`,`in the ${r.w}`].flatMap(x=>[x,x.replace('living room','livingroom')]);

/* ---------- Things at home ---------- */
function thMatch(ts){return {type:'match',title:'Une cada palabra con su significado',hint:'Lee la palabra en inglés y busca cómo se dice en español.',pairs:ts.map(t=>[t.w,t.es])}}
function thListen(ts){return {type:'quiz',title:hear?'Escucha y elige el dibujo':'Lee y elige el dibujo',hint:hear?'Si no lo oyes bien, toca «Escuchar otra vez».':'',
  items:ts.map(t=>({q:hear?'¿Qué has oído?':`«${t.w}»`,say:hear?t.w:undefined,opts:[t,...pick(TH.filter(x=>x!==t),2)].map(thOpt),a:0,row:true}))}}
function thRead(ts){return {type:'quiz',title:'¿Cómo se llama en inglés?',items:ts.map(t=>({q:'What is it? ¿Qué es?',pic:thPic(t),opts:[t,...pick(TH.filter(x=>x!==t),2)].map(x=>x.w),a:0}))}}
function thBuild(ts){return {type:'build',title:'Forma la palabra',hint:'Toca las letras en orden.',items:ts.map(t=>({e:t.es,pic:thPic(t),p:t.w.split('')}))}}
function thWrite(ts){return {type:'write',title:'Escribe el nombre en inglés',items:ts.map(t=>({q:'What is it? ¿Qué es?',pic:thPic(t),a:t.w}))}}
function thSpell(ts){return {type:'write',title:'Escucha y escribe',hint:'Escribe la palabra que oyes.',items:ts.map(t=>({q:'Escribe lo que oyes',say:t.w,a:t.w}))}}

/* ---------- Rooms ---------- */
const WHERE=[['¿Dónde duermes?','bedroom'],['¿Dónde te bañas?','bathroom'],['¿Dónde se cocina?','kitchen'],['¿Dónde ves la tele con tu familia?','living room'],
  ['¿Dónde está la cama?','bedroom'],['¿Dónde está la bañera?','bathroom'],['¿Dónde está el fregadero?','kitchen'],['¿Dónde está la tele?','living room']];
function rmMatch(){return {type:'match',title:'Une cada habitación con su nombre',hint:'living room = salón.',pairs:RM.map(r=>[r.w,r.es])}}
function rmQuiz(k){return {type:'quiz',title:'What room is this?',hint:'Mira los muebles de la habitación amarilla.',
  items:[...shuffle(RM),...shuffle(RM)].slice(0,k).map(r=>({q:'¿Qué habitación es la amarilla?',pic:rmPic(r),opts:[r,...RM.filter(x=>x!==r)].map(x=>x.w),a:0}))}}
function rmListen(k){return {type:'quiz',title:hear?'Escucha y elige la habitación':'Lee y elige la habitación',hint:hear?'Si no lo oyes bien, toca «Escuchar otra vez».':'',
  items:[...shuffle(RM),...shuffle(RM)].slice(0,k).map(r=>({q:hear?'¿Qué habitación has oído?':`«${r.w}»`,say:hear?r.w:undefined,opts:[r,...RM.filter(x=>x!==r)].map(rmOpt),a:0,two:true}))}}
function rmWhere(k){return {type:'quiz',title:'¿En qué habitación?',hint:'bedroom, bathroom, kitchen o living room.',
  items:pick(WHERE,k).map(([q,w])=>({q,opts:[w,...RM.map(r=>r.w).filter(x=>x!==w)],a:0}))}}
function rmBuild(){return {type:'build',title:'Forma la palabra',hint:'Toca las letras en orden.',items:shuffle(RM.filter(r=>!r.w.includes(' '))).map(r=>({e:r.es,pic:rmPic(r),p:r.w.split('')}))}}
function rmWrite(k){return {type:'write',title:'Escribe el nombre de la habitación',hint:'La amarilla. Ojo: living room son dos palabras.',
  items:pick(RM,k).map(r=>({q:'What room is this?',pic:rmPic(r),a:roomAns(r)}))}}

/* ---------- There's a… in the… (como la Extension worksheet) ---------- */
function thereWhere(k){const pl=placeAll();return {type:'quiz',title:'Mira la casa y elige',hint:'Busca el dibujo en la casa. ¿En qué habitación está?',pic:house(pl),
  items:pick(TH,k).map(t=>{const r=roomOf(pl,t);return {q:`There's a ${t.w} in the …`,opts:[r,...RM.filter(x=>x!==r)].map(x=>x.w),a:0}})}}
function thereWhat(k){const pl=placeAll();const rs=shuffle(RM.filter(r=>pl[r.w].length)).slice(0,k);
  return {type:'quiz',title:'¿Qué hay en la habitación?',hint:'Mira la habitación y elige lo que hay.',pic:house(pl),
  items:rs.map(r=>{const t=pick(pl[r.w],1)[0];return {q:`There's a … in the ${r.w}.`,opts:[t,...pick(TH.filter(x=>!pl[r.w].includes(x)),2)].map(x=>x.w),a:0}})}}
function thereTF(k){const pl=placeAll();return {type:'quiz',tf:true,title:'¿Verdadero o falso?',hint:'Mira bien la casa antes de contestar.',pic:house(pl),
  items:pick(TH,k).map(t=>{const r=roomOf(pl,t),ok=Math.random()<.5,r2=ok?r:pick(RM.filter(x=>x!==r),1)[0];return {q:`There's a ${t.w} in the ${r2.w}.`,a:ok}})}}
function thereFill(LV){const pl=placeAll();
  const lines=shuffle(RM.filter(r=>pl[r.w].length)).slice(0,LV===1?2:4).map(r=>{const ts=pl[r.w];
    return `There's a [${ts[0].w}]${ts[1]?` and a [${ts[1].w}]`:''} in the [${r.w}].`});
  const used=lines.join(' ');
  return {type:'fill',small:true,title:'Mira la casa y completa',hint:"Como en la ficha: There's a mat and a lamp in the bedroom.",pic:house(pl),lines,
    extra:pick([...TH.map(t=>t.w),...RM.map(r=>r.w)].filter(w=>!used.includes(`[${w}]`)),2)}}
function thereWrite(k){const pl=placeAll();return {type:'write',title:'¿Dónde está? Escribe la habitación',hint:'bedroom, bathroom, kitchen o living room.',pic:house(pl),
  items:pick(TH,k).map(t=>({q:`There's a ${t.w} in the …`,a:roomAns(roomOf(pl,t))}))}}
// Read and write: el texto de la ficha
function readText(){const bath=RM[1],pl={bathroom:[TH[1],TH[4]]};
  return {type:'fill',small:true,title:'Lee y completa: My bathroom',hint:'Palabras: face, bath, bedroom, mat, mirror.',pic:house(pl,bath),
  lines:['My bathroom is next to my [bedroom].','In my bathroom, I sit in the [bath] and wash my body.','On the wall, there is a [mirror].','You can see your [face] in it.','There is a blue [mat] on the floor. You can stand on it.'],
  extra:['sofa','lamp']}}

/* ---------- Secret code: los números dicen las letras (como el ejercicio 3 del libro) ---------- */
const CODEW=[...TH.map(t=>t.w),'bath','bedroom','kitchen'];
function codeKey(words){const ls=[...new Set(words.join('').split(''))];const ns=pick(range(1,20),ls.length);const key=ls.map((l,i)=>[ns[i],l]).sort((a,b)=>a[0]-b[0]);
  return {key,num:Object.fromEntries(key.map(([n,l])=>[l,n])),let:Object.fromEntries(key)}}
const keyHtml=K=>`<div style="display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font-weight:800;font-size:18px;max-width:440px">${K.key.map(([n,l])=>`<span style="white-space:nowrap">${N[n]} → <b style="color:var(--c-resp);font-size:22px">${l}</b></span>`).join('')}</div>`;
const boxes=(ws,K)=>ws.split('').map(c=>`<span style="display:inline-block;border:2px solid var(--line);border-radius:8px;min-width:34px;padding:4px 3px;margin:2px;text-align:center;font-weight:800;font-size:20px;background:var(--card)">${K.num[c]}</span>`).join('');
const codePic=(w,K)=>`<div style="display:flex;flex-direction:column;align-items:center;gap:12px">${keyHtml(K)}<div>${boxes(w,K)}</div></div>`;
function codeLetter(k){const ws=pick(CODEW,2),K=codeKey(ws);
  return {type:'quiz',title:'Mira la clave: ¿qué letra es?',hint:'Busca el número escrito en inglés. Ejemplo: 16 = sixteen.',pic:`<div>${keyHtml(K)}</div>`,
  items:pick(K.key,Math.min(k,K.key.length)).map(([n,l])=>({q:`${n} → ¿qué letra?`,opts:[l,...pick(K.key.filter(x=>x[1]!==l),2).map(x=>x[1])],a:0,row:true}))}}
function codeBuild(k){return {type:'build',title:'Descifra la palabra secreta',hint:'Cada número es una letra. Mira la clave de arriba.',
  items:pick(CODEW,k).map(w=>{const K=codeKey([w]);return {e:'Palabra secreta',pic:codePic(w,K),p:w.split('')}})}}
function codeWrite(k){return {type:'write',title:'Descifra y escribe la palabra',hint:'Cada número es una letra. Escribe la palabra entera.',
  items:pick(CODEW,k).map(w=>{const K=codeKey([w]);return {q:'¿Qué palabra es?',pic:codePic(w,K),a:w}})}}

/* ---------- Whose is this? It's mine / It's yours ---------- */
// 🙋 = es mío (el que contesta) · 👉 = es tuyo (el que pregunta)
const OBJ=[{w:'pencil',e:'✏️',es:'lápiz',f:false},{w:'bag',e:'🎒',es:'mochila',f:true},{w:'book',e:'📕',es:'libro',f:false},{w:'ruler',e:'📏',es:'regla',f:true}];
const chip=(txt,bg)=>`<div style="text-align:center;margin-top:6px"><span style="display:inline-block;background:${bg};color:#fff;font-weight:800;font-size:22px;border-radius:999px;padding:3px 18px">${txt}</span></div>`;
const owners=os=>os.map(o=>{const me=Math.random()<.5;return {...o,me,ans:me?'mine':'yours',cue:me?`🙋 Es ${o.f?'mía':'mío'}`:`👉 Es ${o.f?'tuya':'tuyo'}`}});
const mPic=o=>emo(o.e,1)+chip(o.cue,o.me?'var(--c-resp)':'var(--c-circ)');
const objs=k=>{const r=[];while(r.length<k)r.push(...shuffle(OBJ));return r.slice(0,k)};
function mineMatch(){return {type:'match',title:'Une cada cosa con su nombre',pairs:OBJ.map(o=>[o.e+' \u200b',o.w])}}
function mineObj(k){return {type:'quiz',title:'Whose is this…? ¿Qué es?',hint:'pencil, bag, book o ruler.',
  items:objs(k).map(o=>({q:'Whose is this …?',pic:emo(o.e,1),opts:[o,...pick(OBJ.filter(x=>x!==o),2)].map(x=>x.w),a:0}))}}
function mineMean(){return {type:'quiz',title:'¿Qué significa?',items:shuffle([
  {q:'«mine» significa…',opts:['mío / mía','tuyo / tuya'],a:0,keep:true,two:true},
  {q:'«yours» significa…',opts:['mío / mía','tuyo / tuya'],a:1,keep:true,two:true},
  {q:'Es mío. → It\'s …',opts:['mine','yours'],a:0,keep:true,two:true},
  {q:'Es tuyo. → It\'s …',opts:['mine','yours'],a:1,keep:true,two:true}])}}
function mineQuiz(k){return {type:'quiz',title:"Contesta: It's mine o It's yours",hint:'🙋 Es mío → mine · 👉 Es tuyo → yours.',
  items:owners(objs(k)).map(o=>({q:`Whose is this ${o.w}?`,pic:mPic(o),opts:["It's mine.","It's yours."],a:o.me?0:1,keep:true,two:true}))}}
const both=os=>{os[0]={...os[0],me:true,ans:'mine'};os[1]={...os[1],me:false,ans:'yours'};return shuffle(os)};
function mineFill(k,LV){const os=both(owners(objs(k)));
  return {type:'fill',small:true,title:'Completa las conversaciones',hint:'🙋 = mío/mía → mine · 👉 = tuyo/tuya → yours.',
  lines:os.map(o=>`${o.e} Whose is this [${o.w}]? ${o.me?'🙋':'👉'} It's [${o.ans}].`),extra:LV===1?[]:pick(OBJ.filter(o=>!os.some(x=>x.w===o.w)).map(o=>o.w),1)}}
function mineWrite(k){return {type:'write',title:'Contesta con la frase entera',hint:"It's mine. o It's yours.",
  items:owners(objs(k)).map(o=>({q:`Whose is this ${o.w}?`,pic:mPic(o),a:[`It's ${o.ans}`,`It is ${o.ans}`,`Its ${o.ans}`]}))}}

/* ---------- Is that… yours? Yes, it is / No, they aren't ---------- */
const PEOPLE=['👧','👨','👦','👩'];
const THINGS2=[{w:'guitar',e:'🎸'},{w:'T-shirt',e:'👕'},{w:'kite',e:'🪁'},{w:'cat',e:'🐈'},
  {w:'shoes',e:'👟👟',pl:true},{w:'dogs',e:'🐕🐕',pl:true},{w:'books',e:'📚',pl:true},{w:'socks',e:'🧦',pl:true}];
const askY=t=>t.pl?`Are those ${t.w} yours?`:`Is that ${t.w} yours?`;
const ansY=(t,yes)=>t.pl?(yes?'Yes, they are.':"No, they aren't."):(yes?'Yes, it is.':"No, it isn't.");
const ALLY=['Yes, it is.',"No, it isn't.",'Yes, they are.',"No, they aren't."];
// Una persona con sus cosas (2 o 3, al menos una de cada tipo) y preguntas mezcladas
function person(){const its=shuffle(THINGS2.filter(t=>!t.pl)),pls=shuffle(THINGS2.filter(t=>t.pl));
  const has=[its[0],pls[0],...(Math.random()<.5?[its[1]]:[pls[1]])];const p=PEOPLE[ri(0,PEOPLE.length-1)];
  const pic=`<div style="text-align:center"><div style="font-size:64px;line-height:1.1">${p}</div><div style="font-weight:800;font-size:15px;opacity:.75;margin:2px 0">Sus cosas:</div><div style="display:inline-flex;gap:14px;font-size:40px;background:var(--card);border:3px solid var(--line);border-radius:16px;padding:4px 16px">${shuffle(has).map(t=>`<span>${t.e}</span>`).join('')}</div></div>`;
  return {has,pic,qs:k=>{const not=shuffle(THINGS2.filter(t=>!has.includes(t)));const yes=shuffle(has);const r=[];
    for(let i=0;r.length<k&&i<8;i++){const t=i%2?not[i>>1]:yes[i>>1];if(t)r.push({t,yes:has.includes(t)})}return shuffle(r)}}}
function isThat(k){return {type:'quiz',title:'¿Is that o Are those?',hint:'Uno → Is that… · Más de uno → Are those…',
  items:pick(THINGS2,k).map(t=>({q:`… ${t.w} yours?`,pic:emo(t.e,1),opts:['Is that','Are those'],a:t.pl?1:0,keep:true,two:true}))}}
function yoursQuiz(k,LV){const P=person();
  return {type:'quiz',title:'Contesta como si fueras él o ella',hint:'Si está en sus cosas: Yes. Si no: No. Uno → it is · Más de uno → they are.',pic:P.pic,
  items:P.qs(k).map(({t,yes})=>{const ok=ansY(t,yes);
    return LV===1?{q:askY(t),opts:[ansY(t,true),ansY(t,false)],a:yes?0:1,keep:true,two:true}:{q:askY(t),opts:ALLY,a:ALLY.indexOf(ok),keep:true,two:true}})}}
function yoursFill(k,LV){const P=person(),qs=P.qs(k);const used=qs.map(({t,yes})=>ansY(t,yes));
  return {type:'fill',small:true,title:'Mira sus cosas y completa',hint:'Yes, it is. · No, it isn\'t. · Yes, they are. · No, they aren\'t.',pic:P.pic,
  lines:qs.map(({t,yes})=>`${askY(t)} [${ansY(t,yes)}]`),extra:LV===1?[]:pick(ALLY.filter(x=>!used.includes(x)),2)}}
function yoursWrite(k){const P=person();return {type:'write',title:'Escribe la respuesta',hint:'Yes, it is. · No, it isn\'t. · Yes, they are. · No, they aren\'t.',pic:P.pic,
  items:P.qs(k).map(({t,yes})=>{const a=ansY(t,yes);return {q:askY(t),a:[a,a.replace("isn't",'is not').replace("aren't",'are not')]}})}}

/* ---------- misiones ---------- */
const MISSIONS=[
{id:'n120',name:'Numbers 1-20',sub:'Repaso del 1 al 20',color:'var(--c-cuerpo)',build(LV){
  const all=range(1,20),k=LV===1?4:LV===3?7:5;
  return [numHoles(pick(all,LV===1?3:4),LV),numWord(pick(all,k),1,20),numDictation(pick(all,k)),numWrite(pick(all,k)),numListen(pick(all,k),1,20)]}},
{id:'things',name:'Things at home',sub:'phone, mirror, clock…',color:'var(--c-resp)',build(LV){
  const k=LV===1?4:LV===3?6:5;
  return [thMatch(pick(TH,LV===1?4:6)),thListen(pick(TH,k)),thRead(pick(TH,k)),thBuild(pick(TH,LV===3?4:3)),thWrite(pick(TH,LV===1?3:5)),...(LV===3?[thSpell(pick(TH,4))]:[])]}},
{id:'rooms',name:'Rooms',sub:'bedroom, kitchen…',color:'var(--c-loco)',build(LV){
  const k=LV===1?4:LV===3?8:6;
  return [rmMatch(),rmQuiz(k),rmListen(LV===1?3:4),rmWhere(k),rmBuild(),...(LV===1?[]:[rmWrite(LV===3?4:3)])]}},
{id:'there',name:"There's a… in the…",sub:'Como en la ficha',color:'var(--c-sent)',build(LV){
  const k=LV===1?4:LV===3?6:5;
  return [thereWhere(k),thereWhat(LV===1?3:4),thereTF(k),thereFill(LV),readText(),...(LV===3?[thereWrite(5)]:[])]}},
{id:'code',name:'Secret code',sub:'sixteen → m',color:'var(--c-exc)',build(LV){
  return [codeLetter(LV===1?4:LV===3?7:5),codeBuild(LV===1?2:3),...(LV===1?[]:[codeWrite(LV===3?3:2)])]}},
{id:'mine',name:"It's mine!",sub:"Whose is this? mine / yours",color:'var(--c-dig)',build(LV){
  const k=LV===1?4:LV===3?8:6;
  return [mineMatch(),mineMean(),mineObj(LV===1?3:4),mineQuiz(k),mineFill(LV===1?3:4,LV),...(LV===1?[]:[mineWrite(LV===3?5:3)])]}},
{id:'yours',name:'Is that yours?',sub:'Yes, it is / No, they aren\'t',color:'var(--c-circ)',build(LV){
  const k=LV===1?5:LV===3?6:6;
  return [isThat(LV===1?4:6),yoursQuiz(k,LV),yoursQuiz(k,LV),yoursFill(4,LV),...(LV===1?[]:[yoursWrite(LV===3?5:3)])]}}
];

// Examen final: un poco de todo el tema 4 (y algún número)
const FINAL={id:'final2',name:'Examen final',sub:'Un poco de todo',color:'var(--c-final)',build(LV){
  const k=LV===1?3:LV===3?5:4;
  return [thListen(pick(TH,k)),thRead(pick(TH,k)),rmQuiz(k),thereWhere(k+1),readText(),mineQuiz(k+1),yoursQuiz(k+1,LV),
    thWrite(pick(TH,LV===1?2:3)),numListen(pick(range(1,20),k),1,20)]}};

registrar({
  id:'ingles',
  lang:'en-GB',
  title:'English adventure',
  eyebrow:'Inglés · 2.º de Primaria · Unit 4',
  h1:'English <span>adventure</span>',
  storeKey:'nael-ingles',
  icons:ICONS,
  missions:MISSIONS,
  final:FINAL
});
})();
