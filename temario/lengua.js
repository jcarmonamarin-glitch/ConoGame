// Lengua · abecedario, sílabas, sinónimos y antónimos
// Contenido de la asignatura. Lo carga base.html con ?a=lengua
// Tipos de actividad y formato: ver README.md
(function(){
const ICONS={
 abc:'<path d="M3 19l4-13 4 13M4.6 14.5h4.8"/><path d="M14 6v13h3.6a3.2 3.2 0 0 0 0-6.5H14m0 0h3a3.2 3.2 0 0 0 0-6.5h-3"/>',
 orden:'<path d="M4 6h10M4 12h7M4 18h4"/><path d="M18 5v14M15 16l3 3 3-3"/>',
 letras:'<rect x="2.5" y="8" width="5" height="8" rx="1.5"/><rect x="9.5" y="8" width="5" height="8" rx="1.5"/><rect x="16.5" y="8" width="5" height="8" rx="1.5"/>',
 forma:'<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/>',
 silaba:'<path d="M4 9v6M8 6v12M12 9v6M16 4v16M20 10v4"/>',
 sino:'<path d="M5 9h14M5 15h14"/>',
 anto:'<path d="M4 8h15l-3-3M20 16H5l3 3"/>',
 final:'<path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z"/>'
};

const DIAGRAMS={},DIAG_VIEW={};
const sp=w=>w.split('');
const OPC=['Letra','Sílaba','Palabra','Oración'];
const N5=['1','2','3','4','5'];
const MISSIONS=[
{id:'abc',name:'El abecedario',sub:'Letras, vocales y consonantes',color:'var(--c-exc)',acts:[
 {type:'fill',small:true,title:'Completa el abecedario',hint:'En mayúscula.',lines:['A B [C] D E [F] G H [I] J K [L] M','N [Ñ] O P [Q] R S [T] U V [W] X Y [Z]'],extra:['E','O']},
 {type:'fill',small:true,title:'Ahora en minúscula',lines:['a b [c] d [e] f g [h] i j k [l] m','n [ñ] o p q [r] s t u [v] w x [y] z'],extra:['b','u']},
 {type:'sort',title:'¿Vocal o consonante?',hint:'Las vocales son a, e, i, o, u.',buckets:['Vocales','Consonantes'],items:[['a','Vocales'],['e','Vocales'],['i','Vocales'],['o','Vocales'],['u','Vocales'],['m','Consonantes'],['p','Consonantes'],['s','Consonantes'],['l','Consonantes'],['ñ','Consonantes'],['r','Consonantes'],['b','Consonantes']]},
 {type:'quiz',title:'Piensa y elige',items:[
   {q:'¿Cuántas vocales hay?',opts:['5','3','10'],a:0},
   {q:'¿Qué letra va después de la N?',opts:['Ñ','O','M'],a:0},
   {q:'¿Qué letra va después de la B?',opts:['C','D','A'],a:0},
   {q:'¿Qué letra va antes de la Z?',opts:['Y','X','W'],a:0},
   {q:'¿Cuál es una vocal?',opts:['U','R','T'],a:0},
   {q:'¿Cuál es una consonante?',opts:['S','A','E'],a:0}]}
]},
{id:'orden',name:'Orden alfabético',sub:'Mira la primera letra',color:'var(--c-cuerpo)',acts:[
 {type:'order',title:'Ordena por orden alfabético',hint:'Fíjate en la primera letra de cada palabra.',items:['cantar','leer','pintar']},
 {type:'order',title:'Ordena por orden alfabético',hint:'¿Qué letra va antes en el abecedario?',items:['árbol','casa','mesa','sol']},
 {type:'order',title:'¡Ahora con cinco!',items:['bici','foca','nube','tren','zapato']},
 {type:'quiz',title:'¿Cuál va primero?',items:[
   {q:'perro o gato',opts:['gato','perro'],a:0,keep:true},
   {q:'luna o dado',opts:['luna','dado'],a:1,keep:true},
   {q:'oso o vaca',opts:['oso','vaca'],a:0,keep:true},
   {q:'ratón o abeja',opts:['ratón','abeja'],a:1,keep:true}]}
]},
{id:'letras',name:'Letra, sílaba, palabra',sub:'Y oración',color:'var(--c-loco)',acts:[
 {type:'order',title:'De lo más pequeño a lo más grande',items:['Letra','Sílaba','Palabra','Oración']},
 {type:'match',title:'Une como corresponda',pairs:[['i n o ñ','Letras'],['ño · ni','Sílabas'],['niño','Palabra'],['El niño hace deporte.','Oración']]},
 {type:'match',title:'Une otra vez',pairs:[['m ú s i c a','Letras'],['mú · si · ca','Sílabas'],['música','Palabra'],['Me gusta la música.','Oración']]},
 {type:'fill',title:'Completa',lines:['Las [letras] se unen para formar sílabas.','Las [sílabas] se unen para formar palabras.','Las [palabras] se unen para formar [oraciones].'],extra:['números']},
 {type:'quiz',title:'¿Qué es?',items:[
   {q:'p',opts:OPC,a:0,keep:true},{q:'ca',opts:OPC,a:1,keep:true},{q:'sol',opts:OPC,a:2,keep:true},{q:'Mi perro corre.',opts:OPC,a:3,keep:true},{q:'mesa',opts:OPC,a:2,keep:true},{q:'to',opts:OPC,a:1,keep:true}]}
]},
{id:'forma',name:'Ordena y forma',sub:'Letras y sílabas revueltas',color:'var(--c-resp)',acts:[
 {type:'build',title:'Ordena las letras',hint:'Toca las letras en orden para escribir la palabra.',items:[{e:'🪆',p:sp('muñeca')},{e:'⚽',p:sp('pelota')},{e:'🍳',p:sp('cocina')},{e:'🐸',p:sp('rana')},{e:'🏠',p:sp('casa')}]},
 {type:'build',title:'Ordena las sílabas',hint:'Toca las sílabas en orden.',items:[{e:'🥋',p:['ká','ra','te']},{e:'🏀',p:['ba','lon','ces','to']},{e:'🦋',p:['ma','ri','po','sa']},{e:'🍅',p:['to','ma','te']},{e:'🎃',p:['ca','la','ba','za']}]},
 {type:'quiz',title:'¿Cuántas sílabas tiene?',hint:'Toca la palabra para oírla.',items:[
   {q:'kárate',opts:N5.slice(0,4),a:2,keep:true,row:true},{q:'baloncesto',opts:N5.slice(0,4),a:3,keep:true,row:true},{q:'sol',opts:N5.slice(0,4),a:0,keep:true,row:true},{q:'pelota',opts:N5.slice(0,4),a:2,keep:true,row:true}]}
]},
{id:'silaba',name:'Golpes de voz',sub:'La sílaba',color:'var(--c-circ)',acts:[
 {type:'quiz',title:'¿Cuántos golpes de voz?',hint:'Da una palmada por cada sílaba. Toca la palabra para oírla.',items:[
   {q:'pan',opts:N5,a:0,keep:true,row:true},{q:'leche',opts:N5,a:1,keep:true,row:true},{q:'tomate',opts:N5,a:2,keep:true,row:true},{q:'calabaza',opts:N5,a:3,keep:true,row:true},
   {q:'paz',opts:N5,a:0,keep:true,row:true},{q:'salud',opts:N5,a:1,keep:true,row:true},{q:'batidora',opts:N5,a:3,keep:true,row:true},{q:'oportunidad',opts:N5,a:4,keep:true,row:true}]},
 {type:'sort',title:'Clasifica por sílabas',hint:'Cuenta las palmadas de cada palabra.',buckets:['1 sílaba','2 sílabas','3 sílabas','4 sílabas'],items:[
   ['sol','1 sílaba'],['mar','1 sílaba'],['pez','1 sílaba'],['luz','1 sílaba'],
   ['mesa','2 sílabas'],['gato','2 sílabas'],['libro','2 sílabas'],['fruta','2 sílabas'],
   ['cocina','3 sílabas'],['zapato','3 sílabas'],['compartir','3 sílabas'],['tomate','3 sílabas'],
   ['calabaza','4 sílabas'],['mariposa','4 sílabas'],['alimentos','4 sílabas'],['batidora','4 sílabas']]},
 {type:'quiz',title:'¿Qué sílaba suena más fuerte?',hint:'Di la palabra en voz alta, como si llamaras a alguien.',items:[
   {q:'limón',opts:['li','món'],a:1,keep:true,row:true},{q:'mesa',opts:['me','sa'],a:0,keep:true,row:true},
   {q:'tiburón',opts:['ti','bu','rón'],a:2,keep:true,row:true},{q:'pelota',opts:['pe','lo','ta'],a:1,keep:true,row:true},
   {q:'sofá',opts:['so','fá'],a:1,keep:true,row:true},{q:'árbol',opts:['ár','bol'],a:0,keep:true,row:true},
   {q:'refunfuñón',opts:['re','fun','fu','ñón'],a:3,keep:true,row:true}]}
]},
{id:'sino',name:'Sinónimos',sub:'Significan lo mismo',color:'var(--c-dig)',acts:[
 {type:'match',title:'Une las que significan lo mismo',pairs:[['cocinar','guisar'],['mirar','observar'],['bailar','danzar'],['andar','caminar']]},
 {type:'match',title:'Más sinónimos',pairs:[['autobús','autocar'],['coche','automóvil'],['contento','alegre'],['empezar','comenzar']]},
 {type:'fill',title:'Cambia por un sinónimo',lines:['He acabado de comer. → He [terminado] de comer.','El plátano está riquísimo. → Está [buenísimo].','Tengo la cara colorada. → Tengo la cara [roja].'],extra:['azul','malísimo']},
 {type:'quiz',title:'¿Qué significa lo mismo?',items:[
   {q:'Lo mismo que «mirar»',opts:['observar','correr','dormir'],a:0},
   {q:'Lo mismo que «andar»',opts:['caminar','saltar','comer'],a:0},
   {q:'Lo mismo que «coche»',opts:['automóvil','bicicleta','barco'],a:0},
   {q:'Lo mismo que «contento»',opts:['alegre','triste','cansado'],a:0},
   {q:'Las palabras sinónimas significan…',opts:['lo mismo o parecido','lo contrario'],a:0,keep:true}]}
]},
{id:'anto',name:'Antónimos',sub:'Significan lo contrario',color:'var(--c-sent)',acts:[
 {type:'match',title:'Une las que significan lo contrario',pairs:[['feliz','infeliz'],['alto','bajo'],['contento','descontento'],['encendido','apagado'],['hacer','deshacer']]},
 {type:'quiz',title:'¿Con des- o con in-?',hint:'Fíjate: ordenada → desordenada, tranquilo → intranquilo.',items:[
   {q:'Lo contrario de «cómodo»',opts:['incómodo','descómodo'],a:0},
   {q:'Lo contrario de «tapar»',opts:['destapar','intapar'],a:0},
   {q:'Lo contrario de «ordenada»',opts:['desordenada','inordenada'],a:0},
   {q:'Lo contrario de «tranquilo»',opts:['intranquilo','destranquilo'],a:0},
   {q:'Lo contrario de «atar»',opts:['desatar','inatar'],a:0},
   {q:'Lo contrario de «útil»',opts:['inútil','desútil'],a:0}]},
 {type:'quiz',title:'Lo contrario',items:[
   {q:'grande',opts:['pequeño','enorme','alto'],a:0},{q:'día',opts:['noche','sol','mañana'],a:0},
   {q:'frío',opts:['caliente','helado','nieve'],a:0},{q:'abrir',opts:['cerrar','entrar','abierto'],a:0},
   {q:'arriba',opts:['abajo','encima','alto'],a:0},
   {q:'Las palabras antónimas significan…',opts:['lo mismo o parecido','lo contrario'],a:1,keep:true}]},
 {type:'sort',title:'¿Sinónimos o antónimos?',buckets:['Sinónimos','Antónimos'],items:[
   ['alto – bajo','Antónimos'],['coche – automóvil','Sinónimos'],['día – noche','Antónimos'],['mirar – observar','Sinónimos'],
   ['feliz – infeliz','Antónimos'],['bailar – danzar','Sinónimos'],['abrir – cerrar','Antónimos'],['andar – caminar','Sinónimos']]}
]}
];

// Examen final: se genera al azar cada vez con palabras que NO salen en las misiones,
// para que Nael no se lo sepa de memoria.
const ABC='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const VOC='AEIOU'.split(''),CONS=ABC.filter(l=>!VOC.includes(l));
const pick=(a,n)=>shuffle(a).slice(0,n),one=a=>a[Math.random()*a.length|0];
const BANK={
 orden:['ardilla','barco','cebra','delfín','erizo','fresa','globo','huevo','isla','jirafa','kiwi','león','mono','nariz','ojo','pato','queso','reloj','sandía','tigre','uva','violín','yogur','zorro'],
 quees:[['m',0],['t',0],['d',0],['pa',1],['lo',1],['me',1],['su',1],['flor',2],['ventana',2],['conejo',2],['Ana lee un cuento.',3],['Hace mucho calor.',3],['El sol brilla.',3]],
 lspo:[['pato','pa · to','El pato nada en el lago.'],['luna','lu · na','La luna sale de noche.'],['helado','he · la · do','Me como un helado.'],['barco','bar · co','El barco navega por el mar.'],['conejo','co · ne · jo','El conejo come zanahorias.'],['camisa','ca · mi · sa','Mi camisa es azul.'],['regalo','re · ga · lo','Mi abuela me trae un regalo.']],
 letras:[['🍓','fresa'],['🦁','león'],['🌙','luna'],['🦆','pato'],['🎈','globo'],['🧀','queso'],['🦊','zorro'],['🐢','tortuga'],['🍇','uva'],['🍎','manzana']],
 silabas:[['🐘',['e','le','fan','te']],['🍫',['cho','co','la','te']],['🚲',['bi','ci','cle','ta']],['🦒',['ji','ra','fa']],['🐊',['co','co','dri','lo']],['🍦',['he','la','do']],['🐰',['co','ne','jo']],['🥒',['pe','pi','no']],['🍬',['ca','ra','me','lo']],['🪁',['co','me','ta']],['🧦',['cal','ce','tín']]],
 s1:['flor','sal','red','voz','gol','mil','tos','col','mes'],
 s2:['silla','lápiz','nariz','ropa','taza','pato','vaso','dedo','lobo','cama'],
 s3:['camisa','conejo','pepino','paloma','gallina','maleta','pijama','helado'],
 s4:['elefante','chocolate','bicicleta','caramelo','cocodrilo','escalera','lavadora','patinete'],
 tonica:[['café',['ca','fé'],1],['lápiz',['lá','piz'],0],['pájaro',['pá','ja','ro'],0],['balón',['ba','lón'],1],['ventana',['ven','ta','na'],1],['sartén',['sar','tén'],1],['plátano',['plá','ta','no'],0],['cereza',['ce','re','za'],1],['reloj',['re','loj'],1],['corazón',['co','ra','zón'],2],['jabón',['ja','bón'],1],['martillo',['mar','ti','llo'],1],['teléfono',['te','lé','fo','no'],1],['sábado',['sá','ba','do'],0]],
 sino:[['rápido','veloz'],['bonito','lindo'],['cara','rostro'],['pequeño','chico'],['enfadado','enojado'],['alumno','estudiante'],['delgado','flaco'],['hablar','charlar'],['tirar','lanzar'],['sitio','lugar'],['contestar','responder'],['cansado','agotado'],['gritar','chillar']],
 anto:[['limpio','sucio'],['lleno','vacío'],['mojado','seco'],['nuevo','viejo'],['duro','blando'],['entrar','salir'],['ganar','perder'],['mucho','poco'],['fuerte','débil'],['cerca','lejos'],['dentro','fuera'],['primero','último'],['dulce','salado'],['ancho','estrecho'],['rico','pobre']],
 prefijo:[['obedecer','des'],['conocido','des'],['abrochar','des'],['enchufar','des'],['peinado','des'],['vestir','des'],['colgar','des'],['justo','in'],['visible','in'],['correcto','in'],['completo','in'],['seguro','in'],['capaz','in']]
};
const FINAL={id:'final',name:'Examen final',sub:'¡Cada vez es distinto!',color:'var(--c-final)',build(LV){
  const B=BANK;
  // 1. Trozo del abecedario con huecos
  const may=Math.random()<.5,cs=l=>may?l:l.toLowerCase();
  const st=Math.random()*(ABC.length-9)|0,seg=ABC.slice(st,st+9),gp=pick([1,2,3,4,5,6,7,8],3);
  const fillLine=seg.map((l,k)=>gp.includes(k)?`[${cs(l)}]`:cs(l)).join(' ');
  const extra=pick(ABC.filter(l=>!seg.includes(l)),2).map(cs);
  // 2. Pregunta rápida
  const qs=[];
  let i;do{i=2+(Math.random()*23|0)}while(ABC[i]==='N'||ABC[i]==='B');
  qs.push({q:`¿Qué letra va después de la ${ABC[i]}?`,opts:[ABC[i+1],ABC[i-1],ABC[i+2]],a:0});
  let k;do{k=2+(Math.random()*23|0)}while(k===i||ABC[k]==='Z');
  qs.push({q:`¿Qué letra va antes de la ${ABC[k]}?`,opts:[ABC[k-1],ABC[k+1],ABC[k-2]],a:0});
  qs.push(Math.random()<.5?{q:'¿Cuál es una vocal?',opts:[one(VOC),...pick(CONS,2)],a:0}:{q:'¿Cuál es una consonante?',opts:[one(CONS),...pick(VOC,2)],a:0});
  pick(B.quees,2).forEach(([w,a])=>qs.push({q:w,opts:OPC,a,keep:true}));
  // 3. Orden alfabético (primeras letras distintas)
  const ord=pick(B.orden,LV===3?5:4).sort((x,y)=>ABC.indexOf(x[0].toUpperCase().normalize('NFD')[0])-ABC.indexOf(y[0].toUpperCase().normalize('NFD')[0]));
  // 4. Letra, sílaba, palabra, oración
  const L=one(B.lspo);
  // 5. Formar palabras
  const bl=pick(B.letras,2).map(([e,w])=>({e,p:sp(w)})),bs=pick(B.silabas,2).map(([e,p])=>({e,p}));
  // 6. Sílabas
  const sil=[[B.s1,'1 sílaba'],[B.s2,'2 sílabas'],[B.s3,'3 sílabas'],[B.s4,'4 sílabas']].flatMap(([b,n])=>pick(b,2).map(w=>[w,n]));
  const ton=pick(B.tonica,4).map(([q,opts,a])=>({q,opts,a,keep:true,row:true}));
  // 7. Sinónimos y antónimos
  const sino=shuffle(B.sino),anto=shuffle(B.anto);
  const others=w=>anto.flatMap(x=>x).filter(x=>!w.includes(x));
  const contr=anto.slice(4,6).map(pr=>{const r=Math.random()<.5,[w,c]=r?pr:[pr[1],pr[0]];return {q:`Lo contrario de «${w}»`,opts:[c,...pick(others(pr),2)],a:0}});
  const pre=pick(B.prefijo,3).map(([w,p])=>({q:`Lo contrario de «${w}»`,opts:[p+w,(p==='des'?'in':'des')+w],a:0}));
  const sa=[...sino.slice(4,7).map(([x,y])=>[`${x} – ${y}`,'Sinónimos']),...anto.slice(6,9).map(([x,y])=>[`${x} – ${y}`,'Antónimos'])];
  return [
   {type:'fill',small:true,title:'Completa el abecedario',hint:may?'En mayúscula.':'En minúscula.',lines:[fillLine],extra},
   {type:'quiz',title:'Pregunta rápida',items:qs},
   {type:'order',title:'Ordena por orden alfabético',hint:'Fíjate en la primera letra de cada palabra.',items:ord},
   {type:'match',title:'Une como corresponda',pairs:[[sp(L[0]).join(' '),'Letras'],[L[1],'Sílabas'],[L[0],'Palabra'],[L[2],'Oración']]},
   {type:'build',title:'Forma la palabra',hint:'Toca las letras o las sílabas en orden.',items:[...bl,...bs]},
   {type:'sort',title:'Clasifica por sílabas',hint:'Da una palmada por cada sílaba.',buckets:['1 sílaba','2 sílabas','3 sílabas','4 sílabas'],items:sil},
   {type:'quiz',title:'¿Qué sílaba suena más fuerte?',hint:'Di la palabra en voz alta, como si llamaras a alguien.',items:ton},
   {type:'match',title:'Une los sinónimos',hint:'Significan lo mismo.',pairs:sino.slice(0,4)},
   {type:'match',title:'Une los antónimos',hint:'Significan lo contrario.',pairs:anto.slice(0,4)},
   {type:'quiz',title:'Lo contrario',hint:'Fíjate: ordenada → desordenada, tranquilo → intranquilo.',items:shuffle([...contr,...pre])},
   {type:'sort',title:'¿Sinónimos o antónimos?',buckets:['Sinónimos','Antónimos'],items:sa}
  ];
}};

registrar({
  id:'lengua',
  title:'La aventura de las letras',
  eyebrow:'Lengua · 2.º de Primaria',
  h1:'La aventura <span>de las letras</span>',
  storeKey:'nael-lengua',
  icons:ICONS,
  diagrams:typeof DIAGRAMS!=='undefined'?DIAGRAMS:{},
  diagView:typeof DIAG_VIEW!=='undefined'?DIAG_VIEW:{},
  missions:MISSIONS,
  final:FINAL
});
})();
