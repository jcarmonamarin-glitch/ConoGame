// Inglés · números del 1 al 20, juguetes y This is / These are
// Contenido de la asignatura. Lo carga base.html con ?a=ingles
// Las misiones se generan al azar en cada partida: build(LV) recibe el nivel (1 Fácil, 2 Normal, 3 Difícil).
// La voz habla en inglés (lang:'en-GB'): los ejercicios de escuchar usan el campo `say`.
(function(){
const ICONS={
 n110:'<path d="M7 7l3-2v14M5 19h8"/><circle cx="17" cy="12" r="4"/>',
 n1120:'<path d="M5 7l2-1.5V19M3.5 19h7"/><path d="M13 9a3 3 0 1 1 6 0c0 2.5-6 6-6 10h6"/>',
 n120:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
 toys:'<rect x="5" y="9" width="14" height="11" rx="3"/><path d="M12 9V5"/><circle cx="12" cy="4" r="1.5"/><circle cx="9.5" cy="14" r="1.2"/><circle cx="14.5" cy="14" r="1.2"/>',
 plural:'<rect x="3" y="9" width="6" height="6" rx="1.5"/><rect x="13" y="5" width="6" height="6" rx="1.5"/><rect x="15" y="13" width="6" height="6" rx="1.5"/>',
 this:'<path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/>'
};

/* ---------- datos ---------- */
const N=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
// Palabras que se confunden mucho: para que las opciones malas se parezcan
const LOOK={3:[13,30],4:[14,40],5:[15,50],6:[16,60],7:[17,70],8:[18,80],9:[19,90],2:[12,20],1:[11,10],10:[11,20],11:[7,12],12:[2,20],13:[3,30],14:[4,40],15:[5,50],16:[6,60],17:[7,70],18:[8,80],19:[9,90],20:[2,12]};
const TOYS=[ // [singular, plural, dibujo]
 ['doll','dolls','🪆'],['robot','robots','🤖'],['alien','aliens','👽'],['camera','cameras','📷'],['lorry','lorries','🚚'],
 ['watch','watches','⌚'],['kite','kites','🪁'],['computer game','computer games','🎮'],['board game','board games','🎲']];

/* ---------- ayudas ---------- */
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=(arr,k)=>shuffle(arr).slice(0,k);
const range=(a,b)=>[...Array(b-a+1)].map((_,i)=>a+i);
const art=w=>/^[aeiou]/.test(w)?'an':'a';
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

const toyPic=(t,n)=>emo(t[2],n);
function toyMatch(ts){return {type:'match',title:'Une el dibujo con su nombre',pairs:ts.map(t=>[t[2],t[0]])}}
function toyListen(ts){return {type:'quiz',title:hear?'Escucha y elige el dibujo':'Lee y elige el dibujo',
  items:ts.map(t=>{const o=[t,...pick(TOYS.filter(x=>x!==t),2)];return {q:hear?'¿Qué has oído?':`«${t[0]}»`,say:hear?t[0]:undefined,opts:o.map(x=>x[2]),a:0,row:true}})}}
function toyRead(ts){return {type:'quiz',title:'¿Cómo se llama?',items:ts.map(t=>({q:'¿Qué es esto?',pic:toyPic(t,1),opts:[t,...pick(TOYS.filter(x=>x!==t),2)].map(x=>x[0]),a:0}))}}
function toyBuild(ts){return {type:'build',title:'Forma la palabra',hint:'Toca las letras en orden.',items:ts.filter(t=>!t[0].includes(' ')).map(t=>({e:t[2],p:t[0].split('')}))}}
function toyWrite(ts){return {type:'write',title:'Escribe el nombre en inglés',items:ts.map(t=>({q:'¿Qué es esto?',pic:toyPic(t,1),a:t[0]}))}}

function plQuiz(ts){return {type:'quiz',title:'¿Uno o más de uno?',hint:'Si hay más de uno, la palabra lleva -s o -es al final.',
  items:ts.map(t=>{const n=Math.random()<.5?1:ri(2,3);return {q:'Elige la palabra',pic:toyPic(t,n),opts:[n>1?t[1]:t[0],n>1?t[0]:t[1]],a:0}})}}
function plMatch(ts){return {type:'match',title:'Une uno con muchos',hint:'watch → watches, lorry → lorries.',pairs:ts.map(t=>[t[0],t[1]])}}
function plSort(ts){const it=shuffle(ts.flatMap(t=>Math.random()<.5?[[t[0],'Uno']]:[[t[1],'Muchos']]));
  if(!it.some(x=>x[1]==='Uno'))it[0]=[ts[0][0],'Uno'];if(!it.some(x=>x[1]==='Muchos'))it[1]=[ts[1][1],'Muchos'];
  return {type:'sort',title:'¿Es uno o son muchos?',buckets:['Uno','Muchos'],items:it}}
function plWrite(ts){return {type:'write',title:'Escribe cuando hay muchos',hint:'Casi siempre se añade -s. Ojo: watches y lorries.',items:ts.map(t=>({q:`${t[0]} → muchos…`,pic:toyPic(t,2),a:t[1]}))}}

// This is (uno) / These are (más de uno)
function thisQuiz(ts){return {type:'quiz',title:'¿This is o These are?',hint:'This is → uno. These are → más de uno.',
  items:ts.map(t=>{const n=Math.random()<.5?1:ri(2,3);return {q:n>1?`… ${t[1]}.`:`… ${art(t[0])} ${t[0]}.`,pic:toyPic(t,n),opts:['This is','These are'],a:n>1?1:0,keep:true,two:true}})}}
function thisFill(ts){return {type:'fill',title:'Mira los dibujos y completa',hint:'This is → uno. These are → más de uno.',
  lines:ts.map(t=>{const n=Math.random()<.5?1:ri(2,3);return n>1?`${Array(n).fill(t[2]).join('')} [These are] ${t[1]}.`:`${t[2]} [This is] ${art(t[0])} ${t[0]}.`})}}
function thisCount(ts,LV){return {type:'write',title:'Mira, cuenta y escribe',hint:'Escribe el número con letras y el nombre. Ejemplo: two kites.',
  items:ts.map(t=>{const n=ri(1,LV===3?6:4);return {q:'¿Cuántos hay?',pic:toyPic(t,n),a:n>1?[`${N[n]} ${t[1]}`,`these are ${N[n]} ${t[1]}`]:[`one ${t[0]}`,`${art(t[0])} ${t[0]}`,`this is ${art(t[0])} ${t[0]}`,`this is one ${t[0]}`]}})}}
function thisSentence(ts){return {type:'write',title:'Escribe la frase entera',hint:'Empieza con This is o These are.',
  items:ts.map(t=>{const n=Math.random()<.5?1:2;const a=n>1?`These are ${t[1]}`:`This is ${art(t[0])} ${t[0]}`;return {q:'Escribe la frase',pic:toyPic(t,n),a:[a,a.replace(/^(These are) /,'$1 two ')]}})}}

/* ---------- misiones ---------- */
const MISSIONS=[
{id:'n110',name:'Numbers 1-10',sub:'One, two, three…',color:'var(--c-loco)',build:LV=>numMission(1,10,LV)},
{id:'n1120',name:'Numbers 11-20',sub:'Eleven… twenty',color:'var(--c-sent)',build:LV=>numMission(11,20,LV)},
{id:'n120',name:'Escribe los números',sub:'Del 1 al 20, solo',color:'var(--c-cuerpo)',build(LV){
  const all=range(1,20),k=LV===1?4:LV===3?7:5;
  return [numHoles(pick(all,LV===1?3:4),LV),numWord(pick(all,k),1,20),numDictation(pick(all,k)),numWrite(pick(all,k)),numListen(pick(all,k),1,20)]}},
{id:'toys',name:'Toys',sub:'Doll, robot, kite…',color:'var(--c-resp)',build(LV){
  const k=LV===1?4:LV===3?9:6;
  return [toyMatch(pick(TOYS,LV===1?4:5)),toyListen(pick(TOYS,k)),toyRead(pick(TOYS,k)),toyBuild(pick(TOYS.filter(t=>!t[0].includes(' ')),LV===3?5:3)),toyWrite(pick(TOYS,LV===1?3:5))]}},
{id:'plural',name:'One or more',sub:'kite → kites',color:'var(--c-exc)',build(LV){
  const k=LV===1?4:LV===3?8:6;
  return [plQuiz(pick(TOYS,k)),plMatch(pick(TOYS,LV===1?4:5)),plSort(pick(TOYS,LV===1?6:8)),plWrite(pick(TOYS,LV===1?3:5))]}},
{id:'this',name:'This is / These are',sub:'Como en la ficha',color:'var(--c-dig)',build(LV){
  const k=LV===1?5:LV===3?9:7;
  return [thisQuiz(pick(TOYS,k)),thisFill(pick(TOYS,LV===1?3:5)),thisCount(pick(TOYS,LV===1?3:5),LV),...(LV===1?[]:[thisSentence(pick(TOYS,LV===3?5:3))])]}}
];

// Examen final: un poco de todo, como el examen del martes
const FINAL={id:'final',name:'Examen final',sub:'Un poco de todo',color:'var(--c-final)',build(LV){
  const all=range(1,20),k=LV===1?3:LV===3?6:4;
  return [numListen(pick(all,k),1,20),numMatch(pick(all,LV===1?4:5)),numWrite(pick(all,k)),numDictation(pick(all,LV===1?2:3)),
    toyListen(pick(TOYS,k)),thisQuiz(pick(TOYS,k+1)),thisCount(pick(TOYS,k),LV)]}};

registrar({
  id:'ingles',
  lang:'en-GB',
  title:'English adventure',
  eyebrow:'Inglés · 2.º de Primaria',
  h1:'English <span>adventure</span>',
  storeKey:'nael-ingles',
  icons:ICONS,
  missions:MISSIONS,
  final:FINAL
});
})();
