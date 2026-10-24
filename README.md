# Juegos de Nael

Juegos de repaso para 2.º de Primaria: Conocimiento del Medio, Lengua y Matemáticas.
Funcionan en móvil, tablet y ordenador, sin instalar nada. Se publican con GitHub Pages:
https://jcarmonamarin-glitch.github.io/ConoGame/

## Cómo se juega

1. **Asignatura**: en el menú principal se elige Medio, Lengua o Matemáticas.
2. **Dificultad**: Fácil, Normal o Difícil (se recuerda en cada asignatura).
3. **Tema**: cada tema es una misión de 2 a 5 juegos. Al terminar da de 1 a 3 estrellas según los fallos.

| Dificultad | Qué cambia | Fallos para 3 / 2 estrellas |
|---|---|---|
| Fácil | ~60 % de las preguntas, 2 opciones por pregunta, sin palabras trampa al rellenar huecos. En Matemáticas, números hasta el 50 | 3 / 8 |
| Normal | Como en clase | 2 / 6 |
| Difícil | Todas las preguntas y sin pistas. En Matemáticas, recta sin el 5 marcado, más números y más parecidos | 1 / 4 |

Cada dificultad guarda sus estrellas aparte, en el navegador del dispositivo.

## Código de animales

En cada asignatura, **Guarda tus estrellas → Ver mi código** muestra 6 animales.
En otro dispositivo, **Tengo un código** (también en el menú principal) los recupera: abre la asignatura,
pone la dificultad y suma las estrellas (nunca quita las que ya hubiera).

El código ocupa 24 bits con 16 animales: asignatura (2 bits) + dificultad (2) + estrellas de 8 temas (2 cada uno) + control (4).
Un código por asignatura y dificultad. Si un animal está mal, el control lo detecta casi siempre.

## Estructura

```
base.html            Motor común: estilos, menús, actividades, sonido, estrellas y códigos
temario/indice.js    Lista de asignaturas del menú principal
temario/medio.js     Conocimiento del Medio · Tema 1 (el cuerpo humano)
temario/lengua.js    Lengua (abecedario, orden alfabético, sílabas, sinónimos, antónimos). El examen final se genera al azar con palabras que no salen en las misiones
temario/mates.js     Matemáticas (numeración 0-99; las preguntas se generan al azar)
index.html, medio.html, lengua.html, matematicas.html   Redirecciones a base.html
```

`base.html?a=<id>` abre una asignatura. Sin `?a=` muestra el menú principal.

## Añadir una asignatura

1. Crea `temario/<id>.js` siguiendo `lengua.js` (contenido fijo) o `mates.js` (contenido generado). Termina llamando a:
   ```js
   registrar({ id, title, eyebrow, h1, storeKey, icons, missions, final })
   ```
2. Añádela **al final** de `temario/indice.js` (no cambies el orden: va dentro de los códigos de animales).
3. Máximo 7 misiones + el examen final, para que quepan en el código de animales.

## Tipos de actividad

Cada misión es `{id, name, sub, color, acts:[...]}` o `{..., build(LV){ return [...] }}`.

| `type` | Campos | Qué hace |
|---|---|---|
| `quiz` | `items:[{q, opts, a, keep?, row?, pic?}]` | Elegir la respuesta. `a` = índice correcto; `keep` no baraja las opciones; `row` las pone en fila; `pic` = SVG encima |
| `quiz` (V/F) | `tf:true, items:[{q, a:true/false}]` | Verdadero o falso |
| `match` | `pairs:[[izq, der], ...]` | Unir con flechas |
| `fill` | `lines:['Texto con [hueco]'], extra:[...], small?` | Rellenar huecos tocando palabras |
| `order` | `items:[...]` (en el orden correcto) | Tocar en orden |
| `sort` | `buckets:[...], items:[[palabra, caja], ...]` | Clasificar en cajas |
| `build` | `items:[{e:'🐸', p:['r','a','n','a']}]` | Formar palabras con letras o sílabas |
| `label` | `diagram, opts, points:[[x,y,'Nombre']]` | Nombrar los números de un dibujo |
| `grid` | `mode:'fill', blanks:[...]` o `mode:'pick', test:n=>...` | Tabla del 0 al 99 |
| `pulse` | — | Cronómetro de 1 minuto para el pulso |

Todas aceptan `title` e `hint` (la pista se oculta en Difícil).

## Probar en local

Abre `base.html` en el navegador (no hace falta servidor).
