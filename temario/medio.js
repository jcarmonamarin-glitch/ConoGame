// Conocimiento del Medio · Tema 1: el cuerpo humano
// Contenido de la asignatura. Lo carga base.html con ?a=medio
// Tipos de actividad y formato: ver README.md
(function(){
const ICONS={
 cuerpo:'<circle cx="12" cy="5" r="3"/><path d="M12 8v7M6 11h12M12 15l-4 6M12 15l4 6"/>',
 resp:'<path d="M12 3v7M12 9c-1-1-3-1-4 1-2 3-3 7-3 9 0 1 1 2 3 1l3-2zM12 9c1-1 3-1 4 1 2 3 3 7 3 9 0 1-1 2-3 1l-3-2z"/>',
 dig:'<path d="M9 2v5c0 3-4 3-4 8 0 4 4 7 9 6 4-1 6-5 4-9-1-2-3-3-5-1"/>',
 circ:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
 exc:'<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"/>',
 sent:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 loco:'<path d="M8 8l8 8"/><circle cx="6.5" cy="5" r="2"/><circle cx="5" cy="6.5" r="2"/><circle cx="17.5" cy="19" r="2"/><circle cx="19" cy="17.5" r="2"/>',
 final:'<path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z"/>'
};

/* ---------- Dibujos para "¿cómo se llama el número...?" ---------- */
const HEAD=(cx,cy,r)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--skin)" stroke="var(--skin-line)" stroke-width="2"/><circle cx="${cx-10}" cy="${cy-6}" r="3" fill="var(--ink)"/><circle cx="${cx+10}" cy="${cy-6}" r="3" fill="var(--ink)"/>`;
const DIAGRAMS={
 resp:`${HEAD(100,48,34)}<path d="M96 52q4 6 8 0" fill="none" stroke="var(--skin-line)" stroke-width="2.5"/><path d="M88 66q12 8 24 0" fill="none" stroke="#b5475a" stroke-width="3" stroke-linecap="round"/>
  <path d="M100 82v52M100 120l-14 14M100 120l14 14" stroke="#c9879a" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="72" cy="172" rx="24" ry="44" fill="#f2a7bb" stroke="#c45a78" stroke-width="2.5"/><ellipse cx="128" cy="172" rx="24" ry="44" fill="#f2a7bb" stroke="#c45a78" stroke-width="2.5"/>`,
 dig:`${HEAD(100,40,30)}<path d="M88 56q12 8 24 0" fill="none" stroke="#b5475a" stroke-width="3" stroke-linecap="round"/>
  <path d="M100 72v38q0 10 12 10" fill="none" stroke="#9cc04a" stroke-width="9" stroke-linecap="round"/>
  <path d="M106 112c10-14 44-12 42 8-2 18-30 22-44 10" fill="#7fae2e" stroke="#4f7514" stroke-width="2.5"/>
  <rect x="58" y="150" width="96" height="78" rx="26" fill="#c9d3e8" stroke="#7d8fb5" stroke-width="2.5"/>
  <path d="M74 170q10-8 20 0t20 0 20 0M74 190q10-8 20 0t20 0 20 0M74 210q10-8 20 0t20 0 20 0" fill="none" stroke="#7d8fb5" stroke-width="3"/>`,
 exc:`<path d="M95 20v170M105 20v170" stroke="#d23b3b" stroke-width="5"/><path d="M105 20v170" stroke="#3b6fd2" stroke-width="5"/>
  <path d="M60 50c-22 0-22 50 0 50 10 0 12-10 8-25 4-15 2-25-8-25zM140 50c22 0 22 50 0 50-10 0-12-10-8-25-4-15-2-25 8-25z" fill="#9c3434" stroke="#6e1f1f" stroke-width="2.5"/>
  <path d="M68 92q14 40 24 80M132 92q-14 40-24 80" fill="none" stroke="#e5c84a" stroke-width="5"/>
  <circle cx="100" cy="196" r="24" fill="#f4d64e" stroke="#b59a14" stroke-width="2.5"/>`
};
const DIAG_VIEW={resp:'0 0 200 230',dig:'0 0 200 240',exc:'0 0 200 230'};

/* ---------- Contenido del tema (sacado del libro) ---------- */
const MISSIONS=[
{id:'cuerpo',name:'Así eres',sub:'Partes del cuerpo',color:'var(--c-cuerpo)',acts:[
 {type:'sort',title:'¿Dónde está cada parte?',hint:'Toca la caja correcta.',buckets:['Cabeza','Tronco','Extremidades'],items:[
   ['Cara','Cabeza'],['Frente','Cabeza'],['Mejillas','Cabeza'],['Barbilla','Cabeza'],
   ['Espalda','Tronco'],['Tórax','Tronco'],['Abdomen','Tronco'],
   ['Brazo','Extremidades'],['Mano','Extremidades'],['Pierna','Extremidades'],['Pie','Extremidades']]},
 {type:'sort',title:'¿Se ve por fuera o está escondido?',hint:'Algunas partes están bajo la piel y otras muy, muy dentro.',buckets:['Por fuera','Bajo la piel','Parte más interna'],items:[
   ['Ojos','Por fuera'],['Orejas','Por fuera'],['Labios','Por fuera'],
   ['Músculos','Bajo la piel'],['Huesos','Bajo la piel'],
   ['Cerebro','Parte más interna'],['Pulmones','Parte más interna'],['Corazón','Parte más interna'],['Estómago','Parte más interna'],['Intestinos','Parte más interna']]},
 {type:'quiz',title:'Piensa y elige',items:[
   {q:'Los brazos y las manos son extremidades…',opts:['superiores','inferiores'],a:0},
   {q:'Las piernas y los pies son extremidades…',opts:['superiores','inferiores'],a:1},
   {q:'El cuerpo tiene tres partes: cabeza, tronco y…',opts:['extremidades','orejas','pelo'],a:0}]}
]},
{id:'resp',name:'Respiras',sub:'Aparato respiratorio',color:'var(--c-resp)',acts:[
 {type:'label',title:'¿Cómo se llama cada número?',diagram:'resp',opts:['Nariz','Boca','Pulmones','Estómago'],points:[[100,52,'Nariz'],[100,76,'Boca'],[72,172,'Pulmones']]},
 {type:'fill',title:'Completa las frases',lines:['El aire entra y sale por la [nariz] o por la [boca].','El aire llega hasta los [pulmones].','En los pulmones se toma el [oxígeno].'],extra:['corazón','estómago']},
 {type:'quiz',title:'¡Vamos a tomar el aire!',items:[
   {q:'Toma mucho aire. ¿Qué le pasa a tu pecho?',opts:['Se hincha','Se deshincha'],a:0},
   {q:'Y al echar el aire, tu pecho…',opts:['se hincha','se deshincha'],a:1},
   {q:'¿Para qué respiramos?',opts:['Para obtener oxígeno','Para hacer la digestión','Para formar la orina'],a:0},
   {q:'Respirar lo hace el aparato…',opts:['digestivo','respiratorio','locomotor'],a:1}]}
]},
{id:'dig',name:'Te alimentas',sub:'Aparato digestivo',color:'var(--c-dig)',acts:[
 {type:'label',title:'¿Cómo se llama cada número?',hint:'¡Ojo! El estómago es la bolsa y los intestinos son los tubos enrollados.',diagram:'dig',opts:['Boca','Esófago','Estómago','Intestinos'],points:[[100,48,'Boca'],[100,92,'Esófago'],[128,122,'Estómago'],[106,190,'Intestinos']]},
 {type:'order',title:'El viaje de la comida',hint:'Toca primero la parte por donde entra la comida.',items:['Boca','Esófago','Estómago','Intestinos']},
 {type:'order',title:'Ordena las etapas',hint:'¿Qué pasa primero? Toca en orden.',items:['Entrada y masticación','Paso hasta el estómago','Digestión','Obtención de sustancias','Expulsión de restos']},
 {type:'match',title:'Une con flechas',hint:'Toca una parte y luego lo que hace.',pairs:[['Boca','Mastica la comida'],['Esófago','Lleva la comida al estómago'],['Estómago','Hace la digestión'],['Intestinos','Sacan las sustancias']]},
 {type:'quiz',title:'Piensa y elige',items:[
   {q:'¿Qué hace el aparato digestivo?',opts:['Saca de los alimentos lo que necesitamos','Mueve los huesos','Bombea la sangre'],a:0},
   {q:'Los restos que no necesitamos…',opts:['se expulsan','se quedan para siempre'],a:0}]}
]},
{id:'circ',name:'Transportas',sub:'Aparato circulatorio',color:'var(--c-circ)',acts:[
 {type:'fill',title:'Completa las frases',lines:['El [corazón] impulsa la sangre.','La sangre circula por los vasos [sanguíneos].','La sangre reparte el [oxígeno] por todo el cuerpo.','Todo esto lo hace el aparato [circulatorio].'],extra:['pulmones','respiratorio']},
 {type:'quiz',title:'¿Verdadero o falso?',tf:true,items:[
   {q:'Cada pulsación es un latido del corazón.',a:true},
   {q:'El pulso se puede notar en la muñeca.',a:true},
   {q:'Después de correr, el corazón late más despacio.',a:false},
   {q:'Hacer deporte fortalece el corazón.',a:true},
   {q:'La sangre está quieta dentro del cuerpo.',a:false}]},
 {type:'pulse',title:'¡Tómate el pulso!'}
]},
{id:'exc',name:'Eliminas desechos',sub:'Aparato excretor',color:'var(--c-exc)',acts:[
 {type:'label',title:'¿Cómo se llama cada número?',diagram:'exc',opts:['Riñones','Vejiga','Corazón','Pulmones'],points:[[140,75,'Riñones'],[100,196,'Vejiga']]},
 {type:'order',title:'Ordena del 1 al 3',items:['La sangre lleva los desechos a los riñones','En los riñones se forma la orina','La orina se guarda en la vejiga y se expulsa']},
 {type:'fill',title:'Completa las frases',lines:['En los [riñones] se forma la orina.','En la [vejiga] se almacena la orina.','El aparato [excretor] elimina lo que no necesitamos.'],extra:['estómago','digestivo']}
]},
{id:'sent',name:'Notas y reaccionas',sub:'Sentidos, cerebro y nervios',color:'var(--c-sent)',acts:[
 {type:'match',title:'Une cada sentido con su parte',pairs:[['Vista','👁️ Ojos'],['Gusto','👅 Lengua'],['Oído','👂 Orejas'],['Olfato','👃 Nariz'],['Tacto','✋ Piel']]},
 {type:'match',title:'¿Qué hacemos con cada uno?',pairs:[['👁️ Ojos','Ver'],['👅 Lengua','Saborear'],['👂 Orejas','Oír'],['👃 Nariz','Oler'],['✋ Piel','Tocar']]},
 {type:'quiz',title:'¿Qué sentido usas?',items:[
   {q:'🌵 Notas que el cactus pincha.',opts:['Tacto','Vista','Oído'],a:0},
   {q:'🌼 Hueles una flor.',opts:['Gusto','Olfato','Tacto'],a:1},
   {q:'🥁 Oyes un tambor.',opts:['Oído','Vista','Olfato'],a:0},
   {q:'🍦 Saboreas un helado.',opts:['Tacto','Gusto','Oído'],a:1},
   {q:'📺 Ves la tele.',opts:['Vista','Olfato','Gusto'],a:0}]},
 {type:'order',title:'Escuchas música. ¿Qué pasa?',items:['El oído nota el sonido','Los nervios llevan la información al cerebro','El cerebro da órdenes para reaccionar']},
 {type:'fill',title:'Completa',lines:['Notamos lo que pasa gracias a los [sentidos], el [cerebro] y los [nervios].','Reaccionamos, por ejemplo, [moviéndonos].'],extra:['pulmones','riñones']}
]},
{id:'loco',name:'Te mueves',sub:'Aparato locomotor',color:'var(--c-loco)',acts:[
 {type:'fill',title:'Completa las frases',lines:['Para movernos tenemos el aparato [locomotor].','El esqueleto está formado por los [huesos] y las [articulaciones].','Los [músculos] se estiran y se encogen para mover el cuerpo.'],extra:['digestivo','nervios']},
 {type:'sort',title:'¿Hueso, articulación o músculo?',hint:'Las articulaciones son donde se dobla el cuerpo.',buckets:['Hueso','Articulación','Músculo'],items:[
   ['Cráneo','Hueso'],['Costillas','Hueso'],['Húmero','Hueso'],['Fémur','Hueso'],['Tibia','Hueso'],
   ['Muñeca','Articulación'],['Codo','Articulación'],['Hombro','Articulación'],['Rodilla','Articulación'],['Tobillo','Articulación'],
   ['Frontal','Músculo'],['Bíceps','Músculo'],['Pectorales','Músculo'],['Abdominales','Músculo'],['Cuádriceps','Músculo'],['Gemelos','Músculo']]},
 {type:'quiz',title:'¿Dónde está?',items:[
   {q:'El fémur está en…',opts:['la pierna','el brazo','la cabeza'],a:0},
   {q:'El cráneo está en…',opts:['la cabeza','el pie','la barriga'],a:0},
   {q:'El bíceps está en…',opts:['el brazo','la pierna','la espalda'],a:0},
   {q:'Las costillas están en…',opts:['el pecho','la mano','la rodilla'],a:0},
   {q:'Los gemelos están en…',opts:['la pierna, por detrás','la cara','el brazo'],a:0},
   {q:'Los músculos están unidos al…',opts:['esqueleto','corazón','estómago'],a:0}]}
]}
];

const FINAL={id:'final',name:'Examen final',sub:'Un poco de todo el tema',color:'var(--c-final)',build(){
  const quiz=[],tf=[];
  MISSIONS.forEach(m=>m.acts.forEach(a=>{if(a.type==='quiz')(a.tf?tf:quiz).push(...a.items)}));
  return [
   {type:'match',title:'Une cada aparato con una parte',pairs:[['Respiratorio','Pulmones'],['Digestivo','Estómago'],['Circulatorio','Corazón'],['Excretor','Riñones'],['Locomotor','Huesos']]},
   {type:'quiz',title:'Pregunta rápida',items:shuffle(quiz).slice(0,6)},
   {type:'fill',title:'Completa',lines:['Respiras con el aparato [respiratorio] y te alimentas con el aparato [digestivo].','Transportas sustancias por medio de la [sangre].','Gracias al aparato [locomotor] bailas, caminas y haces deporte.'],extra:['excretor','cerebro']},
   {type:'quiz',title:'¿Verdadero o falso?',tf:true,items:shuffle(tf).slice(0,4)},
   {type:'match',title:'¿Qué hace cada aparato?',pairs:[['Respiratorio','Toma el oxígeno'],['Circulatorio','Reparte la sangre'],['Excretor','Forma la orina'],['Locomotor','Nos mueve']]}
  ];
}};

registrar({
  id:'medio',
  title:'La aventura del cuerpo',
  eyebrow:'Conocimiento del Medio · Tema 1',
  h1:'La aventura <span>del cuerpo</span>',
  storeKey:'nael-cuerpo',
  icons:ICONS,
  diagrams:typeof DIAGRAMS!=='undefined'?DIAGRAMS:{},
  diagView:typeof DIAG_VIEW!=='undefined'?DIAG_VIEW:{},
  missions:MISSIONS,
  final:FINAL
});
})();
