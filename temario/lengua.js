// Lengua · Bloque 2: el nombre (común/propio, individual/colectivo), el artículo y palabras polisémicas
// (Unidades 3 y 4 del libro: págs. 54, 55, 69 y 72).
// El bloque 1 (abecedario, sílabas, sinónimos y antónimos) ya está examinado; está en el historial de git.
// Contenido de la asignatura. Lo carga base.html con ?a=lengua
// Tipos de actividad y formato: ver README.md
(function(){
const ICONS={
 comun:'<path d="M5 19V5h3l8 10V5h3v14h-3L8 9v10z"/>',
 colect:'<circle cx="7" cy="9" r="2.5"/><circle cx="17" cy="9" r="2.5"/><circle cx="12" cy="7" r="2.5"/><path d="M3 19c0-3 2-5 4-5s4 2 4 5M13 19c0-3 2-5 4-5s4 2 4 5"/>',
 art:'<path d="M4 18V8a3 3 0 0 1 6 0v10M4 13h6"/><path d="M14 18h6M17 6v12"/>',
 genero:'<circle cx="9" cy="10" r="4"/><path d="M9 14v6M6.5 17.5h5"/><circle cx="16" cy="9" r="3"/><path d="M18 7l3-3M18.5 4H21v2.5"/>',
 detind:'<path d="M4 7h7M4 12h7M4 17h7"/><path d="M15 7l2 2 4-4M15 15l5 5M20 15l-5 5"/>',
 poli:'<path d="M12 4v5M12 9l-6 5M12 9l6 5M12 9v6"/><circle cx="6" cy="17" r="2.2"/><circle cx="12" cy="17" r="2.2"/><circle cx="18" cy="17" r="2.2"/>',
 final:'<path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z"/>'
};

const DIAGRAMS={},DIAG_VIEW={};
const ART=['el','la','los','las'];
const ART4=a=>({opts:ART,a:ART.indexOf(a),keep:true,row:true});
const MISSIONS=[
{id:'comun',name:'Comunes y propios',sub:'¿Minúscula o mayúscula?',color:'var(--c-loco)',acts:[
 {type:'sort',title:'¿Común o propio?',hint:'Los propios son el nombre de alguien o de un sitio concreto, y van con mayúscula.',buckets:['Común','Propio'],items:[
   ['pez','Común'],['casa','Común'],['libro','Común'],['gato','Común'],['coche','Común'],['bombero','Común'],['entrenadora','Común'],['jugador','Común'],
   ['Marta','Propio'],['Francia','Propio'],['Sevilla','Propio'],['Triana','Propio'],['Antonio','Propio'],['Cádiz','Propio'],['España','Propio'],['Nael','Propio']]},
 {type:'write',title:'Escribe el nombre común',hint:'Con minúscula: es un nombre común.',items:[
   {q:'¿Qué es?',big:'🐱',a:'gato'},{q:'¿Qué es?',big:'🚗',a:'coche'},{q:'¿Quién es?',big:'👩‍🚒',a:['bombera','bombero']},
   {q:'¿Qué es?',big:'🐟',a:'pez'},{q:'¿Qué es?',big:'🏠',a:'casa'},{q:'¿Qué es?',big:'📕',a:'libro'}]},
 {type:'quiz',title:'¿Cuál está bien escrita?',hint:'Los nombres propios empiezan con mayúscula.',items:[
   {q:'Mi perro se llama…',opts:['Toby','toby'],a:0,keep:true,row:true},
   {q:'Vivo en…',opts:['San Fernando','san fernando'],a:0,keep:true,row:true},
   {q:'En el árbol hay un…',opts:['pájaro','Pájaro'],a:0,keep:true,row:true},
   {q:'Mi amiga se llama…',opts:['Lucía','lucía'],a:0,keep:true,row:true},
   {q:'Me he comprado una…',opts:['pelota','Pelota'],a:0,keep:true,row:true}]},
 {type:'quiz',title:'Piensa y elige',items:[
   {q:'Los nombres propios se escriben con…',opts:['mayúscula inicial','minúscula'],a:0,keep:true},
   {q:'Los nombres comunes se escriben con…',opts:['minúscula','mayúscula inicial'],a:0,keep:true},
   {q:'La entrenadora se llama Triana. ¿Qué palabra es un nombre propio?',opts:['Triana','entrenadora','llama'],a:0},
   {q:'El jugador es Antonio. ¿Qué palabra es un nombre común?',opts:['jugador','Antonio','es'],a:0}]}
]},
{id:'colect',name:'Individuales y colectivos',sub:'Uno solo o un grupo',color:'var(--c-cuerpo)',acts:[
 {type:'match',title:'Une cada nombre individual con su colectivo',pairs:[['oveja','rebaño'],['carta','baraja'],['jugador','equipo'],['músico','orquesta']]},
 {type:'match',title:'Más colectivos',pairs:[['flor','ramo'],['árbol','bosque'],['abeja','enjambre'],['pez','banco']]},
 {type:'fill',title:'Completa con el nombre colectivo',lines:['El florista preparó un hermoso [ramo].','En la [orquesta] había veinte músicos.','Ayer ganó nuestro [equipo] de voleibol.','El pastor cuida su [rebaño].'],extra:['baraja']},
 {type:'sort',title:'¿Individual o colectivo?',hint:'Colectivo: una sola palabra que nombra a un grupo.',buckets:['Individual','Colectivo'],items:[
   ['oveja','Individual'],['jugador','Individual'],['flor','Individual'],['carta','Individual'],['abeja','Individual'],['árbol','Individual'],
   ['rebaño','Colectivo'],['equipo','Colectivo'],['ramo','Colectivo'],['baraja','Colectivo'],['enjambre','Colectivo'],['bosque','Colectivo']]},
 {type:'quiz',title:'Piensa y elige',items:[
   {q:'Los nombres colectivos nombran…',opts:['a un grupo','a uno solo'],a:0,keep:true},
   {q:'Los nombres individuales nombran…',opts:['a uno solo','a un grupo'],a:0,keep:true},
   {q:'«Equipo» es un nombre…',opts:['colectivo','individual'],a:0,keep:true},
   {q:'«Jugador» es un nombre…',opts:['individual','colectivo'],a:0,keep:true}]}
]},
{id:'art',name:'El artículo',sub:'el, la, los, las',color:'var(--c-resp)',acts:[
 {type:'quiz',title:'Elige el artículo',hint:'Mira si es chico o chica, y si es uno o varios.',items:[
   {q:'___ piloto',...ART4('el')},{q:'___ ilustradora',...ART4('la')},{q:'___ músicos',...ART4('los')},
   {q:'___ bailaoras',...ART4('las')},{q:'___ directora',...ART4('la')},{q:'___ farmacéutico',...ART4('el')},
   {q:'___ niñas',...ART4('las')},{q:'___ bosque',...ART4('el')}]},
 {type:'fill',title:'Completa con el, la, los, las',lines:['[Los] niños y [las] niñas de [la] clase de segundo se han encontrado un gatito en [el] bosque.'],extra:['un']},
 {type:'quiz',title:'¡Cuidado con la terminación!',hint:'farmacéutico = uno solo → el. farmacéuticos = varios → los.',items:[
   {q:'¿Cuál está bien?',opts:['el farmacéutico','los farmacéutico'],a:0,keep:true},
   {q:'¿Cuál está bien?',opts:['las camisas','la camisas'],a:0,keep:true},
   {q:'¿Cuál está bien?',opts:['los árboles','el árboles'],a:0,keep:true},
   {q:'¿Cuál está bien?',opts:['la directora','el directora'],a:0,keep:true},
   {q:'¿Cuál está bien?',opts:['el rinoceronte','los rinoceronte'],a:0,keep:true}]},
 {type:'quiz',title:'Piensa y elige',items:[
   {q:'Los artículos van…',opts:['delante de los nombres','detrás de los nombres'],a:0,keep:true},
   {q:'¿Cuál es un artículo?',opts:['la','gato','come'],a:0},
   {q:'¿Cuál es un artículo?',opts:['los','niños','bosque'],a:0}]}
]},
{id:'genero',name:'Género y número',sub:'Masculino, femenino, singular y plural',color:'var(--c-circ)',acts:[
 {type:'sort',title:'¿Masculino o femenino?',hint:'Masculino: el niño. Femenino: la niña.',buckets:['Masculino','Femenino'],items:[
   ['niño','Masculino'],['piloto','Masculino'],['gato','Masculino'],['rinoceronte','Masculino'],['bosque','Masculino'],['músico','Masculino'],
   ['niña','Femenino'],['directora','Femenino'],['ardilla','Femenino'],['camisa','Femenino'],['ilustradora','Femenino'],['clase','Femenino']]},
 {type:'sort',title:'¿Singular o plural?',hint:'Singular: uno solo (gato). Plural: varios (gatos).',buckets:['Singular','Plural'],items:[
   ['gato','Singular'],['árbol','Singular'],['camisa','Singular'],['músico','Singular'],['flor','Singular'],['ardilla','Singular'],
   ['gatos','Plural'],['árboles','Plural'],['camisas','Plural'],['músicos','Plural'],['flores','Plural'],['bailaoras','Plural']]},
 {type:'match',title:'Une el singular con su plural',pairs:[['gato','gatos'],['árbol','árboles'],['flor','flores'],['pez','peces']]},
 {type:'quiz',title:'Piensa y elige',items:[
   {q:'«niña» es…',opts:['femenino','masculino'],a:0,keep:true,row:true},
   {q:'«gatos» es…',opts:['plural','singular'],a:0,keep:true,row:true},
   {q:'El femenino de «director» es…',opts:['directora','directores','directo'],a:0},
   {q:'El plural de «camisa» es…',opts:['camisas','camiseta','camisón'],a:0},
   {q:'El artículo y el nombre tienen el mismo…',opts:['género y número','color y tamaño'],a:0,keep:true}]}
]},
{id:'detind',name:'Determinados e indeterminados',sub:'el, la… y un, una…',color:'var(--c-exc)',acts:[
 {type:'sort',title:'Clasifica los artículos',hint:'Determinados: el, la, los, las. Indeterminados: un, una, unos, unas.',buckets:['Determinados','Indeterminados'],items:[
   ['el','Determinados'],['la','Determinados'],['los','Determinados'],['las','Determinados'],
   ['un','Indeterminados'],['una','Indeterminados'],['unos','Indeterminados'],['unas','Indeterminados']]},
 {type:'match',title:'Relaciona',pairs:[['una','ardilla'],['unos','árboles'],['el','rinoceronte'],['las','camisas']]},
 {type:'quiz',title:'Elige un, una, unos, unas',items:[
   {q:'___ gatito',opts:['un','una','unos','unas'],a:0,keep:true,row:true},
   {q:'___ ardilla',opts:['un','una','unos','unas'],a:1,keep:true,row:true},
   {q:'___ árboles',opts:['un','una','unos','unas'],a:2,keep:true,row:true},
   {q:'___ camisas',opts:['un','una','unos','unas'],a:3,keep:true,row:true},
   {q:'___ libro',opts:['un','una','unos','unas'],a:0,keep:true,row:true},
   {q:'___ flores',opts:['un','una','unos','unas'],a:3,keep:true,row:true}]},
 {type:'quiz',title:'¿Determinado o indeterminado?',items:[
   {q:'«el» bosque',opts:['determinado','indeterminado'],a:0,keep:true},
   {q:'«un» gatito',opts:['determinado','indeterminado'],a:1,keep:true},
   {q:'«las» niñas',opts:['determinado','indeterminado'],a:0,keep:true},
   {q:'«unas» camisas',opts:['determinado','indeterminado'],a:1,keep:true},
   {q:'«la» clase',opts:['determinado','indeterminado'],a:0,keep:true}]}
]},
{id:'poli',name:'Palabras polisémicas',sub:'Una palabra, varios significados',color:'var(--c-dig)',acts:[
 {type:'quiz',title:'¿Qué palabra es?',hint:'Es la misma palabra para las dos cosas.',items:[
   {q:'🪑 para sentarse  ·  🐟 grupo de peces  ·  🏦 donde se guarda el dinero',opts:['banco','silla','caja'],a:0},
   {q:'🐭 animal  ·  🖱️ del ordenador',opts:['ratón','teclado','gato'],a:0},
   {q:'🦩 ave rosa  ·  💃 baile',opts:['flamenco','pato','salsa'],a:0},
   {q:'☄️ del cielo  ·  🪁 juguete que vuela',opts:['cometa','estrella','globo'],a:0},
   {q:'🧜‍♀️ mitad pez  ·  🚨 alarma que suena',opts:['sirena','pez','timbre'],a:0},
   {q:'🐒 animal  ·  👷 traje de trabajo',opts:['mono','oso','chaqueta'],a:0},
   {q:'✉️ se manda por correo  ·  🃏 de la baraja',opts:['carta','sobre','sello'],a:0}]},
 {type:'match',title:'Une cada palabra con sus dos significados',pairs:[['ratón','🐭 + 🖱️'],['cometa','☄️ + 🪁'],['sirena','🧜‍♀️ + 🚨'],['carta','✉️ + 🃏']]},
 {type:'write',title:'Escribe la palabra',hint:'Una sola palabra con los dos significados.',items:[
   {q:'Lámina de papel y parte de una planta',big:'📄 🍃',a:'hoja'},
   {q:'Objeto para coser y manecilla del reloj',big:'🪡 🕐',a:'aguja'},
   {q:'Animal que se come el queso y aparato del ordenador',big:'🐭 🖱️',a:['ratón','raton']},
   {q:'Animal que trepa y traje de trabajo',big:'🐒 👷',a:'mono'}]},
 {type:'quiz',title:'Piensa y elige',items:[
   {q:'Las palabras polisémicas tienen…',opts:['varios significados','un solo significado'],a:0,keep:true},
   {q:'¿Cuál es una palabra polisémica?',opts:['banco','mesa','perro'],a:0},
   {q:'El significado de una palabra polisémica depende de…',opts:['la situación en que se usa','las letras que tiene'],a:0,keep:true}]}
]}
];

// Examen final: se genera al azar cada vez con palabras que NO salen en las misiones,
// para que no se lo sepan de memoria.
const pick=(a,n)=>shuffle(a).slice(0,n),one=a=>a[Math.random()*a.length|0];
const BANK={
 comun:['perro','mesa','ciudad','río','montaña','profesora','médico','bicicleta','lápiz','pueblo','camión','ventana'],
 propio:['Lucas','Carmen','Madrid','Málaga','Pablo','Sofía','Italia','Hugo','Valencia','Lola','Portugal','Granada'],
 // [individual, colectivo]
 colect:[['lobo','manada'],['pájaro','bandada'],['soldado','ejército'],['barco','flota'],['uva','racimo'],['diente','dentadura'],['libro','biblioteca'],['cantante','coro'],['alumno','clase'],['estrella','constelación'],['letra','abecedario'],['isla','archipiélago']],
 // [nombre, artículo determinado]
 art:[['perro','el'],['mesa','la'],['lápices','los'],['ventanas','las'],['camión','el'],['montaña','la'],['zapatos','los'],['tortugas','las'],['médico','el'],['profesora','la'],['caballos','los'],['manzanas','las'],['balón','el'],['nube','la'],['patos','los'],['sillas','las']],
 // [palabra, significado 1, significado 2]
 poli:[['pata','la pierna de un animal','la pata de la mesa'],['planta','un vegetal','un piso del edificio'],['cola','la de un perro','una fila de gente'],['lengua','está en la boca','un idioma'],['llave','abre la puerta','el grifo del agua'],['pico','la boca de un pájaro','la punta de una montaña'],['muñeca','un juguete','une la mano con el brazo'],['sierra','herramienta para cortar madera','muchas montañas juntas'],['copa','un vaso con pie','la parte de arriba del árbol'],['gato','un animal','sirve para levantar el coche']]
};
const INDET={el:'un',la:'una',los:'unos',las:'unas'};
const genero=a=>a==='el'||a==='los'?'Masculino':'Femenino',numero=a=>a==='el'||a==='la'?'Singular':'Plural';
const FINAL={id:'final2',name:'Examen final',sub:'¡Cada vez es distinto!',color:'var(--c-final)',build(LV){
  const B=BANK;
  // 1. Común o propio
  const cp=[...pick(B.comun,4).map(w=>[w,'Común']),...pick(B.propio,4).map(w=>[w,'Propio'])];
  // 2. Mayúscula
  const may=pick(B.propio,3).map(w=>({q:'¿Cuál está bien escrita?',opts:[w,w.toLowerCase()],a:0,keep:true,row:true}));
  // 3. Colectivos
  const col=shuffle(B.colect),colPairs=col.slice(0,4);
  const ic=[...col.slice(4,7).map(([i])=>[i,'Individual']),...col.slice(7,10).map(([,c])=>[c,'Colectivo'])];
  // 4. Artículos
  const art=shuffle(B.art);
  const artQ=art.slice(0,5).map(([w,a])=>({q:`___ ${w}`,...ART4(a)}));
  const indQ=art.slice(5,9).map(([w,a])=>({q:`___ ${w}`,opts:['un','una','unos','unas'],a:['un','una','unos','unas'].indexOf(INDET[a]),keep:true,row:true}));
  const gen=art.slice(9,13).flatMap(([w,a])=>[{q:`«${w}» es…`,opts:['masculino','femenino'],a:genero(a)==='Masculino'?0:1,keep:true,row:true}]);
  const num=art.slice(13,16).map(([w,a])=>[w,numero(a)]);
  const det=shuffle([['el','Determinados'],['la','Determinados'],['los','Determinados'],['las','Determinados'],['un','Indeterminados'],['una','Indeterminados'],['unos','Indeterminados'],['unas','Indeterminados']]);
  // 5. Polisémicas
  const po=shuffle(B.poli),poW=po.map(p=>p[0]);
  const poliQ=po.slice(0,LV===1?3:4).map(([w,s1,s2])=>({q:`Tiene dos significados: ${s1} y ${s2}.`,opts:[w,...pick(poW.filter(x=>x!==w),2)],a:0}));
  return [
   {type:'sort',title:'¿Común o propio?',hint:'Los propios van con mayúscula.',buckets:['Común','Propio'],items:cp},
   {type:'quiz',title:'¿Cuál está bien escrita?',hint:'Los nombres propios empiezan con mayúscula.',items:may},
   {type:'match',title:'Une el individual con su colectivo',pairs:colPairs},
   {type:'sort',title:'¿Individual o colectivo?',hint:'Colectivo: nombra a un grupo.',buckets:['Individual','Colectivo'],items:ic},
   {type:'quiz',title:'Elige el artículo',hint:'¿Uno o varios? ¿Masculino o femenino?',items:artQ},
   {type:'quiz',title:'Elige un, una, unos, unas',items:indQ},
   {type:'sort',title:'Clasifica los artículos',buckets:['Determinados','Indeterminados'],items:det},
   {type:'quiz',title:'¿Masculino o femenino?',items:gen},
   {type:'sort',title:'¿Singular o plural?',buckets:['Singular','Plural'],items:num.concat(pick([['flor','Singular'],['peces','Plural'],['casa','Singular'],['libros','Plural']],3))},
   {type:'quiz',title:'Palabras polisémicas',hint:'Es la misma palabra para las dos cosas.',items:poliQ}
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
