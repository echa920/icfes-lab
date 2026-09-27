/* ICFES Lab — banco de preguntas
   75 preguntas originales escritas en el formato y nivel de Saber 11.
   NO son preguntas liberadas por el Icfes ni reproducen ningún examen real.

   Campos:
     id    identificador estable (no cambiarlo: de él dependen tu progreso y tus errores)
     a     área: lc | mat | soc | cn | ing
     d     dificultad: 1 fácil · 2 media · 3 difícil
     diag  true si forma parte del diagnóstico fijo de 20 preguntas (4 por área)
     ctx   texto, gráfico o enunciado de apoyo (opcional)
     q     pregunta
     o     cuatro opciones
     c     índice de la opción correcta (0-3)
     e     explicación
*/

const AREAS = [
  { id: 'lc',  nombre: 'Lectura Crítica',       corto: 'L. Crítica', peso: 3, color: '#38bdf8' },
  { id: 'mat', nombre: 'Matemáticas',           corto: 'Matemáticas', peso: 3, color: '#fbbf24' },
  { id: 'soc', nombre: 'Sociales y Ciudadanas', corto: 'Sociales',   peso: 3, color: '#f472b6' },
  { id: 'cn',  nombre: 'Ciencias Naturales',    corto: 'C. Naturales', peso: 3, color: '#34d399' },
  { id: 'ing', nombre: 'Inglés',                corto: 'Inglés',     peso: 1, color: '#a78bfa' }
];

/* Puntos de corte oficiales de los niveles de desempeño Saber 11.
   Verificados contra los documentos "Niveles de desempeño" del Icfes. */
const NIVELES = {
  lc:  [ { max:35,  n:'Nivel 1' }, { max:50, n:'Nivel 2' }, { max:65, n:'Nivel 3' }, { max:100, n:'Nivel 4' } ],
  mat: [ { max:35,  n:'Nivel 1' }, { max:50, n:'Nivel 2' }, { max:70, n:'Nivel 3' }, { max:100, n:'Nivel 4' } ],
  soc: [ { max:40,  n:'Nivel 1' }, { max:55, n:'Nivel 2' }, { max:70, n:'Nivel 3' }, { max:100, n:'Nivel 4' } ],
  cn:  [ { max:40,  n:'Nivel 1' }, { max:55, n:'Nivel 2' }, { max:70, n:'Nivel 3' }, { max:100, n:'Nivel 4' } ],
  ing: [ { max:47,  n:'A−' }, { max:57, n:'A1' }, { max:67, n:'A2' }, { max:78, n:'B1' }, { max:100, n:'B+' } ]
};

const DIFS = { 1:'Fácil', 2:'Media', 3:'Difícil' };

const BANCO = [

/* ===================================================================
   LECTURA CRÍTICA — 15
=================================================================== */
{
  id:'lc01', a:'lc', d:2, diag:true,
  ctx:'La ciudad creció sin que nadie la planeara. Cada familia que llegaba levantaba su casa donde encontraba sitio, y así el barrio fue tomando la forma torcida de un río: callejones que no llevaban a ninguna parte, escaleras que nacían de la nada. Los urbanistas que llegaron cuarenta años después trajeron planos, reglas y buenas intenciones. Querían endurecer y enderezar lo que el tiempo había torcido. Pero los vecinos, que conocían cada piedra, sabían algo que los planos no decían: en esos callejones sin salida jugaban los niños, y en esas escaleras se sentaban los viejos a conversar.',
  q:'La oposición central que plantea el texto es entre',
  o:['la pobreza del barrio y la riqueza de los urbanistas.',
     'el orden planeado desde afuera y el orden creado por el uso cotidiano.',
     'las casas antiguas y las construcciones modernas.',
     'la generación de los niños y la de los viejos.'],
  c:1,
  e:'El texto contrapone dos formas de orden: el de los planos ("reglas y buenas intenciones") y el que surgió del habitar diario, que los vecinos defienden porque cumple funciones invisibles en el plano. Las demás opciones mencionan elementos presentes en el texto, pero ninguno es el eje del contraste.'
},
{
  id:'lc02', a:'lc', d:2, diag:true,
  ctx:'Los urbanistas que llegaron cuarenta años después trajeron planos, reglas y buenas intenciones. Pero los vecinos, que conocían cada piedra, sabían algo que los planos no decían.',
  q:'La expresión "sabían algo que los planos no decían" cumple en el texto la función de',
  o:['descalificar por completo el conocimiento técnico de los urbanistas.',
     'introducir un tipo de saber que no se registra en la representación técnica.',
     'anunciar que los vecinos se opondrán violentamente a la obra.',
     'explicar por qué el barrio creció de manera desordenada.'],
  c:1,
  e:'La frase abre paso al saber práctico de quien habita el lugar, que el plano no puede capturar. No descalifica la técnica del todo (la opción A exagera con "por completo"), ni anuncia violencia, ni explica el origen del desorden, que ya se había explicado antes.'
},
{
  id:'lc03', a:'lc', d:2, diag:true,
  ctx:'Señor editor: en su edición del martes afirman que el nuevo sistema de transporte "fracasó rotundamente" porque en su primer mes movilizó apenas 12.000 pasajeros diarios, muy por debajo de los 40.000 proyectados. Me permito señalar que el sistema opera hoy con 8 de las 34 estaciones previstas y con una sola de las cuatro rutas alimentadoras. Juzgar el sistema completo por el desempeño de una cuarta parte de su infraestructura es como evaluar un puente por su primer pilar.',
  q:'El autor de la carta cuestiona la afirmación del periódico porque considera que',
  o:['las cifras de pasajeros que publicó el periódico son falsas.',
     'la comparación se hace entre una meta total y un sistema aún incompleto.',
     'los 40.000 pasajeros proyectados eran una meta poco ambiciosa.',
     'el periódico tiene intereses en contra del sistema de transporte.'],
  c:1,
  e:'El autor no discute los datos, sino la validez de la comparación: se contrasta la meta de un sistema completo con el resultado de un sistema parcial. La analogía del puente refuerza precisamente ese punto.'
},
{
  id:'lc04', a:'lc', d:3, diag:true,
  ctx:'Señor editor: ... Juzgar el sistema completo por el desempeño de una cuarta parte de su infraestructura es como evaluar un puente por su primer pilar.',
  q:'La analogía del puente y el pilar se usa para sostener que',
  o:['una parte en funcionamiento no permite predecir el rendimiento del conjunto.',
     'toda obra de infraestructura requiere pilares sólidos.',
     'el sistema de transporte es tan necesario como un puente.',
     'los proyectos de gran escala siempre se retrasan.'],
  c:0,
  e:'La analogía traslada el argumento a un caso donde el error de juicio es evidente: nadie evaluaría un puente terminado mirando solo su primer pilar. Las otras lecturas toman la imagen literalmente en lugar de leer su función argumentativa.'
},
{
  id:'lc05', a:'lc', d:2,
  ctx:'Durante décadas se enseñó que memorizar era lo contrario de comprender. Hoy la evidencia sugiere algo más incómodo: sin un mínimo de información retenida en la memoria, la comprensión no tiene con qué construirse. Quien no recuerda qué pasó en 1810 difícilmente podrá analizar el siglo XIX colombiano, no porque la fecha valga por sí misma, sino porque sin ella no hay dónde colgar lo demás.',
  q:'Del texto se infiere que el autor defiende que la memorización',
  o:['debe ser el objetivo central de la educación.',
     'es una condición necesaria, aunque no suficiente, para comprender.',
     'resulta igual de inútil que se creía hace décadas.',
     'solo es útil en la enseñanza de la historia.'],
  c:1,
  e:'El autor sostiene que sin datos retenidos la comprensión "no tiene con qué construirse" (necesaria), pero aclara que la fecha no "vale por sí misma" (no suficiente). La opción A convierte un requisito en finalidad, algo que el texto no dice.'
},
{
  id:'lc06', a:'lc', d:1,
  q:'En la oración "Aunque el informe era contundente, el comité decidió aplazar la votación", el conector "aunque" indica que',
  o:['la decisión del comité fue consecuencia directa del informe.',
     'la decisión del comité contradice lo que el informe haría esperar.',
     'el informe y la votación ocurrieron al mismo tiempo.',
     'el comité no alcanzó a leer el informe.'],
  c:1,
  e:'"Aunque" es un conector concesivo: presenta un hecho que debería haber llevado a otro resultado. Si el informe era contundente, se esperaría una votación inmediata; el conector marca que ocurrió lo contrario.'
},
{
  id:'lc07', a:'lc', d:2,
  ctx:'Anuncio: "Nueve de cada diez odontólogos recomiendan nuestra crema dental."\n(letra pequeña: encuesta realizada entre odontólogos asistentes al congreso patrocinado por la marca, n = 40)',
  q:'La principal debilidad del argumento publicitario está en que',
  o:['la muestra es pequeña y fue seleccionada en un evento financiado por la marca.',
     'los odontólogos no son expertos en cremas dentales.',
     'la proporción de nueve de cada diez es matemáticamente imposible.',
     'no se menciona el precio del producto.'],
  c:0,
  e:'El problema es la validez de la muestra: 40 personas reunidas en un congreso pagado por la marca no representan al conjunto de los odontólogos, y el patrocinio introduce un sesgo de selección. La proporción es perfectamente posible (36 de 40).'
},
{
  id:'lc08', a:'lc', d:3,
  ctx:'No escribo para que me entiendan. Escribo para entender. La página en blanco no es un público: es un espejo que todavía no refleja nada.',
  q:'La metáfora del "espejo que todavía no refleja nada" sugiere que la escritura',
  o:['es un acto inútil mientras no haya lectores.',
     'revela al autor algo de sí mismo que antes no veía.',
     'debe imitar fielmente la realidad exterior.',
     'siempre resulta incomprensible para los demás.'],
  c:1,
  e:'Si la página es un espejo, lo que aparecerá en ella es una imagen del autor; el "todavía no" indica que ese reflejo surge al escribir. Esto encaja con "escribo para entender": la escritura como herramienta de autoconocimiento.'
},
{
  id:'lc09', a:'lc', d:3,
  ctx:'Tesis A: Las redes sociales polarizan porque sus algoritmos muestran a cada persona solo lo que confirma sus creencias.\nTesis B: Las redes sociales no crean la polarización; la hacen visible. Antes, el vecino que pensaba distinto callaba en el ascensor.',
  q:'La tesis B responde a la tesis A cuestionando',
  o:['la existencia de los algoritmos de recomendación.',
     'la relación de causa que A establece entre redes y polarización.',
     'la idea de que la polarización sea un fenómeno negativo.',
     'los datos sobre el número de usuarios de redes sociales.'],
  c:1,
  e:'B no niega que haya polarización ni que existan algoritmos: discute el vínculo causal. Para A las redes producen la polarización; para B solo la exponen, porque ya existía pero permanecía silenciada.'
},
{
  id:'lc10', a:'lc', d:1,
  ctx:'Instructivo de un medicamento: "No suspenda el tratamiento aunque los síntomas desaparezcan antes de completar los diez días."',
  q:'La advertencia se incluye porque el fabricante anticipa que el paciente podría',
  o:['confundir este medicamento con otro de aspecto similar.',
     'interpretar la mejoría de los síntomas como señal de curación completa.',
     'tomar una dosis mayor a la recomendada.',
     'olvidar la hora exacta de cada toma.'],
  c:1,
  e:'La estructura "no suspenda aunque los síntomas desaparezcan" revela cuál es el error previsto: tomar el alivio de los síntomas como prueba de que la infección ya cedió. Las otras conductas no guardan relación con lo que la frase advierte.'
},
{
  id:'lc11', a:'lc', d:2,
  ctx:'Reseña: "La película tiene una fotografía impecable, un diseño sonoro que envuelve y actuaciones sólidas. Dura 160 minutos. Podría haber durado 100."',
  q:'Con la última oración, el reseñista',
  o:['elogia la capacidad del director para sostener una película larga.',
     'introduce una crítica al ritmo, tras enumerar aspectos positivos.',
     'informa que existe una versión más corta de la película.',
     'señala que la duración es la norma en el cine actual.'],
  c:1,
  e:'Tras tres elogios, el contraste entre "dura 160 minutos" y "podría haber durado 100" funciona como reproche: sobran unos sesenta minutos. La brevedad de la frase final concentra la objeción.'
},
{
  id:'lc12', a:'lc', d:3,
  ctx:'Un funcionario declara: "No hemos incumplido la meta de vivienda. Lo que ocurrió es que la meta se reformuló en función de las nuevas condiciones del mercado."',
  q:'La estrategia discursiva del funcionario consiste en',
  o:['aportar cifras que refutan la acusación.',
     'redefinir el criterio de evaluación para que el resultado deje de ser un incumplimiento.',
     'atribuir la responsabilidad a un gobierno anterior.',
     'reconocer el error y anunciar correctivos.'],
  c:1,
  e:'No presenta datos ni acepta la falla: cambia la vara de medir. Si la meta es otra, el resultado ya no la incumple. Es un desplazamiento del criterio, no una refutación.'
},
{
  id:'lc13', a:'lc', d:2,
  ctx:'Y en el fondo del patio, el naranjo seguía dando frutos que nadie recogía. La casa llevaba once años cerrada.',
  q:'El contraste entre las dos oraciones produce un efecto de',
  o:['humor, por lo absurdo de la situación.',
     'persistencia de la vida frente al abandono humano.',
     'suspenso, porque anuncia la llegada de alguien.',
     'crítica al desperdicio de alimentos en la ciudad.'],
  c:1,
  e:'El naranjo sigue su ciclo con indiferencia hacia la ausencia de habitantes: la vida continúa aunque nadie la aproveche. Ese desajuste entre naturaleza y abandono es el efecto buscado.'
},
{
  id:'lc14', a:'lc', d:1,
  ctx:'Gráfico descrito: el eje horizontal muestra los años 2015 a 2024; la línea de "matrículas en programas técnicos" sube de forma constante, mientras la de "matrículas en programas universitarios" se mantiene casi plana.',
  q:'La conclusión que el gráfico permite sostener es que, en ese período,',
  o:['la educación universitaria perdió matrículas en términos absolutos.',
     'los programas técnicos crecieron mientras los universitarios se estancaron.',
     'los programas técnicos ya superan en número a los universitarios.',
     'la calidad de los programas técnicos mejoró.'],
  c:1,
  e:'Una línea que sube y otra plana indican crecimiento frente a estancamiento. No se puede concluir pérdida absoluta (la universitaria no baja), ni qué línea está más arriba (el gráfico describe tendencias, no niveles), ni nada sobre calidad.'
},
{
  id:'lc15', a:'lc', d:3,
  ctx:'"Todos los grandes deportistas se levantan de madrugada. Yo me levanto de madrugada. Por lo tanto, voy camino a ser un gran deportista."',
  q:'El razonamiento falla porque',
  o:['la primera afirmación no ha sido demostrada con estadísticas.',
     'compartir una característica de un grupo no implica pertenecer a él.',
     'levantarse de madrugada es perjudicial para la salud.',
     'no define qué significa "gran deportista".',
     ],
  c:1,
  e:'Es un error de lógica: aunque todos los A sean B, ser B no convierte a nadie en A. Madrugar puede ser común entre grandes deportistas sin ser lo que los hace grandes. La falta de definición (D) es un problema menor frente al salto inválido.'
},

/* ===================================================================
   MATEMÁTICAS — 15
=================================================================== */
{
  id:'mat01', a:'mat', d:2, diag:true,
  ctx:'Un comerciante compra un artículo en $80.000 y lo vende con una ganancia del 25 % sobre el precio de compra. Luego, en temporada de descuentos, rebaja ese precio de venta en 20 %.',
  q:'El precio final del artículo es',
  o:['$76.000','$80.000','$84.000','$100.000'],
  c:1,
  e:'Precio de venta: 80.000 × 1,25 = 100.000. Descuento del 20 %: 100.000 × 0,80 = 80.000. Subir 25 % y luego bajar 20 % devuelve al valor inicial, porque 1,25 × 0,80 = 1. El comerciante queda sin ganancia.'
},
{
  id:'mat02', a:'mat', d:1, diag:true,
  q:'Si 3x − 7 = 2x + 5, entonces el valor de x² es',
  o:['12','24','144','169'],
  c:2,
  e:'3x − 7 = 2x + 5 → 3x − 2x = 5 + 7 → x = 12. Por tanto x² = 144. El error común es responder 12, que es x y no x².'
},
{
  id:'mat03', a:'mat', d:2, diag:true,
  ctx:'Un tanque cilíndrico tiene 2 m de radio y 5 m de altura. Se llena con agua a razón de 4 m³ por hora.',
  q:'El tiempo aproximado que tarda en llenarse por completo es (use π ≈ 3,14)',
  o:['10,5 horas','15,7 horas','20,0 horas','31,4 horas'],
  c:1,
  e:'Volumen = πr²h = 3,14 × 2² × 5 = 3,14 × 20 = 62,8 m³. Tiempo = 62,8 ÷ 4 = 15,7 horas.'
},
{
  id:'mat04', a:'mat', d:1, diag:true,
  ctx:'Notas de un estudiante en cinco evaluaciones: 3,0 · 4,5 · 2,5 · 4,0 · 3,5',
  q:'La mediana de las notas es',
  o:['3,0','3,5','3,4','4,0'],
  c:1,
  e:'Se ordenan los datos: 2,5 · 3,0 · 3,5 · 4,0 · 4,5. Con cinco valores, la mediana es el tercero: 3,5. El valor 3,4 corresponde al promedio, no a la mediana.'
},
{
  id:'mat05', a:'mat', d:1,
  q:'En una bolsa hay 4 balotas rojas y 6 azules. Si se extrae una al azar, la probabilidad de que NO sea roja es',
  o:['2/5','3/5','2/3','1/2'],
  c:1,
  e:'No ser roja equivale a ser azul: 6 de 10 balotas, es decir 6/10 = 3/5. También se puede calcular como 1 − 4/10 = 6/10.'
},
{
  id:'mat06', a:'mat', d:3,
  ctx:'La altura (en metros) de una pelota lanzada hacia arriba es h(t) = −5t² + 20t, con t en segundos.',
  q:'La altura máxima que alcanza la pelota es',
  o:['15 m','20 m','25 m','40 m'],
  c:1,
  e:'El vértice de la parábola está en t = −b/(2a) = −20/(2 × −5) = 2 s. Al sustituir: h(2) = −5(4) + 20(2) = −20 + 40 = 20 m.'
},
{
  id:'mat07', a:'mat', d:3,
  ctx:'Un plano de una casa está a escala 1 : 50. En el plano, la sala mide 8 cm por 6 cm.',
  q:'El área real de la sala es',
  o:['2,4 m²','12 m²','24 m²','120 m²'],
  c:1,
  e:'Medidas reales: 8 cm × 50 = 400 cm = 4 m; 6 cm × 50 = 300 cm = 3 m. Área = 4 × 3 = 12 m². Un error frecuente es multiplicar el área del plano (48 cm²) por 50 en lugar de por 50².'
},
{
  id:'mat08', a:'mat', d:1,
  q:'Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. Su perímetro es',
  o:['21 cm','30 cm','36 cm','54 cm'],
  c:2,
  e:'Hipotenusa: √(9² + 12²) = √(81 + 144) = √225 = 15 cm. Perímetro = 9 + 12 + 15 = 36 cm.'
},
{
  id:'mat09', a:'mat', d:2,
  ctx:'Una empresa de mensajería cobra $6.000 fijos más $1.200 por kilómetro recorrido.',
  q:'Si un cliente pagó $25.200, la distancia recorrida fue',
  o:['14 km','16 km','18 km','21 km'],
  c:1,
  e:'Se resta el cargo fijo: 25.200 − 6.000 = 19.200. Luego 19.200 ÷ 1.200 = 16 km. El modelo es 6.000 + 1.200k = 25.200.'
},
{
  id:'mat10', a:'mat', d:2,
  ctx:'En un colegio, 180 estudiantes practican fútbol, 120 practican baloncesto y 45 practican ambos deportes.',
  q:'El número de estudiantes que practica al menos uno de los dos deportes es',
  o:['255','300','345','390'],
  c:0,
  e:'Por el principio de inclusión-exclusión: 180 + 120 − 45 = 255. Sumar 180 + 120 = 300 cuenta dos veces a quienes practican ambos.'
},
{
  id:'mat11', a:'mat', d:2,
  ctx:'Tabla de frecuencias del número de hermanos de 40 estudiantes:\n0 hermanos → 8 · 1 hermano → 14 · 2 hermanos → 12 · 3 hermanos → 6',
  q:'El promedio de hermanos por estudiante es',
  o:['1,20','1,40','1,55','1,80'],
  c:1,
  e:'Suma total = 0(8) + 1(14) + 2(12) + 3(6) = 0 + 14 + 24 + 18 = 56. Promedio = 56 ÷ 40 = 1,40.'
},
{
  id:'mat12', a:'mat', d:3,
  ctx:'Una población de bacterias se duplica cada 3 horas. Inicialmente hay 500 bacterias.',
  q:'Después de 12 horas habrá',
  o:['2.000','4.000','8.000','16.000'],
  c:2,
  e:'En 12 horas hay 12 ÷ 3 = 4 duplicaciones. Población = 500 × 2⁴ = 500 × 16 = 8.000. El error común es multiplicar por 4 en lugar de elevar 2 a la cuarta.'
},
{
  id:'mat13', a:'mat', d:2,
  ctx:'Un terreno rectangular tiene 24 m de perímetro. Su largo es el doble de su ancho.',
  q:'El área del terreno es',
  o:['16 m²','24 m²','32 m²','48 m²'],
  c:2,
  e:'Si el ancho es a, el largo es 2a. Perímetro: 2(a + 2a) = 6a = 24 → a = 4 m, largo = 8 m. Área = 4 × 8 = 32 m².'
},
{
  id:'mat14', a:'mat', d:3,
  ctx:'Se lanzan dos dados de seis caras.',
  q:'La probabilidad de que la suma sea 7 es',
  o:['1/12','1/9','1/6','5/36'],
  c:2,
  e:'Los casos favorables son (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) = 6 de 36 resultados posibles, es decir 6/36 = 1/6. El 7 es la suma más probable con dos dados.'
},
{
  id:'mat15', a:'mat', d:1,
  ctx:'Una receta para 4 personas necesita 300 g de harina.',
  q:'Para 10 personas se necesitan',
  o:['600 g','700 g','750 g','800 g'],
  c:2,
  e:'Regla de tres directa: 300 ÷ 4 = 75 g por persona. Para 10 personas: 75 × 10 = 750 g.'
},

/* ===================================================================
   SOCIALES Y CIUDADANAS — 15
=================================================================== */
{
  id:'soc01', a:'soc', d:1, diag:true,
  q:'Según la Constitución Política de 1991, la acción de tutela tiene como finalidad',
  o:['demandar la inconstitucionalidad de una ley ante la Corte Constitucional.',
     'proteger de forma inmediata los derechos fundamentales cuando son vulnerados o amenazados.',
     'exigir a una entidad pública la entrega de información solicitada.',
     'revocar el mandato de un alcalde o gobernador electo.'],
  c:1,
  e:'La tutela (artículo 86) es un mecanismo de protección inmediata de derechos fundamentales, procedente cuando no hay otro medio de defensa judicial. La opción C describe el derecho de petición y la D, la revocatoria del mandato.'
},
{
  id:'soc02', a:'soc', d:3, diag:true,
  ctx:'Un alcalde expide un decreto que prohíbe toda manifestación pública en el municipio durante seis meses, argumentando que las protestas afectan el comercio local.',
  q:'La medida resulta cuestionable desde el punto de vista constitucional porque',
  o:['los alcaldes no tienen facultad para expedir decretos de ningún tipo.',
     'restringe de forma general y prolongada un derecho fundamental por razones económicas.',
     'la decisión debía tomarla el concejo municipal mediante acuerdo.',
     'el comercio local no genera ingresos suficientes al municipio.'],
  c:1,
  e:'El derecho de reunión y manifestación pública es fundamental (artículo 37) y solo admite limitaciones específicas, proporcionales y justificadas. Una prohibición total por seis meses, fundada en la afectación al comercio, no cumple esos criterios.'
},
{
  id:'soc03', a:'soc', d:2, diag:true,
  q:'El mecanismo de participación ciudadana mediante el cual se decide si se aprueba o se rechaza una norma ya vigente se denomina',
  o:['plebiscito','referendo derogatorio','consulta popular','cabildo abierto'],
  c:1,
  e:'El referendo derogatorio somete una norma vigente a votación para decidir si se deroga. El plebiscito respalda o rechaza una decisión del ejecutivo; la consulta popular pregunta sobre un asunto de interés general; el cabildo abierto es una reunión pública deliberativa.'
},
{
  id:'soc04', a:'soc', d:2, diag:true,
  ctx:'La Constitución de 1991 reconoció a Colombia como un Estado social de derecho, pluriétnico y multicultural, e incorporó la jurisdicción especial indígena.',
  q:'Esta última figura implica que las autoridades indígenas pueden',
  o:['crear leyes aplicables a todo el territorio nacional.',
     'ejercer funciones jurisdiccionales en su ámbito territorial conforme a sus normas propias.',
     'desconocer por completo la Constitución y las leyes de la República.',
     'negociar tratados internacionales de manera independiente.'],
  c:1,
  e:'El artículo 246 faculta a las autoridades de los pueblos indígenas para ejercer funciones jurisdiccionales dentro de su ámbito territorial según sus propias normas, siempre que no contraríen la Constitución y las leyes de la República.'
},
{
  id:'soc05', a:'soc', d:2,
  ctx:'Entre 1948 y 1958 Colombia vivió el período conocido como La Violencia, marcado por el enfrentamiento entre liberales y conservadores. El Frente Nacional (1958-1974) surgió como salida a esa confrontación.',
  q:'El Frente Nacional consistió en',
  o:['la eliminación de los partidos políticos tradicionales.',
     'un acuerdo de alternancia en la presidencia y reparto paritario de cargos entre liberales y conservadores.',
     'la instauración de un régimen militar de largo plazo.',
     'la convocatoria de una asamblea constituyente con participación popular amplia.'],
  c:1,
  e:'El Frente Nacional fue un pacto bipartidista de alternancia presidencial cada cuatro años y distribución equitativa de los cargos públicos. Al cerrar el sistema a terceras fuerzas, se le señala como uno de los factores del surgimiento de movimientos armados.'
},
{
  id:'soc06', a:'soc', d:1,
  q:'La entidad encargada de ejercer el control fiscal sobre el manejo de los recursos públicos en Colombia es',
  o:['la Procuraduría General de la Nación.',
     'la Contraloría General de la República.',
     'la Fiscalía General de la Nación.',
     'la Defensoría del Pueblo.'],
  c:1,
  e:'La Contraloría ejerce el control fiscal, es decir, la vigilancia sobre el uso de los recursos públicos. La Procuraduría ejerce control disciplinario sobre servidores públicos, la Fiscalía investiga delitos y la Defensoría promueve los derechos humanos.'
},
{
  id:'soc07', a:'soc', d:3,
  ctx:'Un estudio muestra que en una ciudad los barrios con menor cobertura de alcantarillado son también los que registran mayor incidencia de enfermedades gastrointestinales en menores de cinco años.',
  q:'La conclusión más razonable a partir de este dato es que',
  o:['la falta de saneamiento básico es la única causa de esas enfermedades.',
     'existe una asociación entre déficit de infraestructura sanitaria y problemas de salud infantil.',
     'las familias de esos barrios desconocen las normas de higiene.',
     'las enfermedades gastrointestinales causan el deterioro del alcantarillado.'],
  c:1,
  e:'El estudio muestra una correlación, que permite hablar de asociación pero no de causa única ni de dirección causal invertida. La opción C introduce un juicio sobre las familias que el dato no respalda.'
},
{
  id:'soc08', a:'soc', d:2,
  q:'El principio de dignidad humana, base del Estado social de derecho colombiano, implica que la persona',
  o:['debe ser tratada como un fin en sí misma y no como un medio.',
     'tiene derechos solo si cumple con sus deberes tributarios.',
     'adquiere valor según su aporte económico a la sociedad.',
     'puede renunciar libremente a todos sus derechos fundamentales.'],
  c:0,
  e:'La dignidad humana supone que la persona vale por sí misma, no en función de su utilidad. De ahí que los derechos fundamentales no dependan de la productividad ni del cumplimiento de obligaciones económicas, y que sean en principio irrenunciables.'
},
{
  id:'soc09', a:'soc', d:3,
  ctx:'En una asamblea estudiantil, un grupo propone que las decisiones se tomen por mayoría simple. Otro grupo advierte que así los cursos con menos estudiantes nunca lograrán que sus necesidades sean atendidas.',
  q:'La objeción del segundo grupo apunta a un problema clásico de la democracia conocido como',
  o:['la separación de poderes.','la tiranía de la mayoría.','el clientelismo político.','la abstención electoral.'],
  c:1,
  e:'La "tiranía de la mayoría" describe el riesgo de que la regla mayoritaria anule sistemáticamente los intereses de las minorías. Por eso los sistemas democráticos incorporan derechos y mecanismos que no dependen del voto mayoritario.'
},
{
  id:'soc10', a:'soc', d:2,
  q:'El proceso de urbanización acelerada que vivió Colombia en la segunda mitad del siglo XX se explica principalmente por',
  o:['la llegada masiva de inmigrantes europeos.',
     'la migración del campo a la ciudad por causas económicas y por el conflicto armado.',
     'una política estatal de traslado obligatorio de población.',
     'el descenso de la natalidad en las zonas urbanas.'],
  c:1,
  e:'La migración interna campo-ciudad, impulsada por la búsqueda de empleo y servicios y por el desplazamiento forzado derivado del conflicto, transformó a Colombia en un país mayoritariamente urbano. La inmigración europea fue marginal en ese período.'
},
{
  id:'soc11', a:'soc', d:1,
  q:'En Colombia, la rama legislativa del poder público está conformada por',
  o:['la Corte Suprema de Justicia y el Consejo de Estado.',
     'el Senado de la República y la Cámara de Representantes.',
     'el Presidente y su gabinete de ministros.',
     'los concejos municipales y las asambleas departamentales.'],
  c:1,
  e:'El Congreso, órgano de la rama legislativa, es bicameral: Senado y Cámara de Representantes. Los concejos y asambleas son corporaciones administrativas de elección popular en el nivel territorial, no parte de la rama legislativa nacional.'
},
{
  id:'soc12', a:'soc', d:3,
  ctx:'Dos países vecinos firman un acuerdo para reducir aranceles entre ellos, pero mantienen los aranceles frente a terceros países.',
  q:'Este tipo de acuerdo corresponde a',
  o:['una unión monetaria.','una zona de libre comercio.','un mercado común con libre movilidad de personas.','una economía planificada.'],
  c:1,
  e:'Una zona de libre comercio elimina o reduce aranceles entre los firmantes y conserva la política arancelaria propia frente al resto. La unión monetaria implica moneda común y el mercado común añade libre circulación de trabajadores y capitales.'
},
{
  id:'soc13', a:'soc', d:2,
  ctx:'Una empresa despide a una trabajadora al enterarse de que está embarazada.',
  q:'La conducta de la empresa vulnera principalmente',
  o:['el derecho a la libre escogencia de profesión u oficio.',
     'la estabilidad laboral reforzada derivada del fuero de maternidad.',
     'el derecho a la propiedad privada de la trabajadora.',
     'el principio de libre competencia económica.'],
  c:1,
  e:'La Constitución y la jurisprudencia protegen a la mujer durante el embarazo y la lactancia mediante el fuero de maternidad: el despido en esas condiciones se presume discriminatorio y requiere autorización previa del inspector de trabajo.'
},
{
  id:'soc14', a:'soc', d:2,
  ctx:'Un municipio decide construir una represa que inundará el territorio de una comunidad indígena asentada allí ancestralmente.',
  q:'Antes de ejecutar el proyecto, el Estado está obligado a',
  o:['indemnizar en dinero y proceder con la obra.',
     'realizar consulta previa con la comunidad afectada.',
     'someter la decisión a referendo nacional.',
     'esperar a que la comunidad presente una acción de tutela.'],
  c:1,
  e:'La consulta previa, libre e informada es un derecho fundamental de los pueblos étnicos reconocido en el Convenio 169 de la OIT e incorporado al ordenamiento colombiano. Es un requisito anterior a la ejecución, no una compensación posterior.'
},
{
  id:'soc15', a:'soc', d:3,
  ctx:'Indicador: el coeficiente de Gini de un país pasó de 0,52 a 0,48 en una década.',
  q:'Esa variación indica que en ese período',
  o:['la pobreza extrema desapareció.',
     'la desigualdad en la distribución del ingreso disminuyó.',
     'el producto interno bruto creció un 4 %.',
     'la desigualdad aumentó, porque el número es menor.'],
  c:1,
  e:'El Gini va de 0 (igualdad perfecta) a 1 (concentración total). Bajar de 0,52 a 0,48 señala menor desigualdad. No dice nada sobre el nivel de pobreza ni sobre el crecimiento del PIB, que son indicadores distintos.'
},

/* ===================================================================
   CIENCIAS NATURALES — 15
=================================================================== */
{
  id:'cn01', a:'cn', d:1, diag:true,
  ctx:'Un estudiante coloca una planta acuática en un tubo con agua y la expone a luz intensa. Observa que se forman burbujas de gas en las hojas.',
  q:'El gas que se acumula corresponde principalmente a',
  o:['dióxido de carbono liberado por la respiración.',
     'oxígeno producido en la fotosíntesis.',
     'vapor de agua por evaporación.',
     'nitrógeno absorbido del agua.'],
  c:1,
  e:'En presencia de luz, la fotosíntesis descompone el agua y libera O₂ como subproducto: 6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂. La respiración libera CO₂, pero con luz intensa la fotosíntesis predomina claramente.'
},
{
  id:'cn02', a:'cn', d:2, diag:true,
  q:'Un móvil parte del reposo y acelera uniformemente a 3 m/s² durante 4 segundos. La distancia recorrida es',
  o:['12 m','24 m','36 m','48 m'],
  c:1,
  e:'Con v₀ = 0: d = ½at² = ½ × 3 × 4² = ½ × 3 × 16 = 24 m. Un error común es usar d = v·t con la velocidad final (12 m/s × 4 s = 48 m), que ignora que la velocidad fue creciendo.'
},
{
  id:'cn03', a:'cn', d:2, diag:true,
  ctx:'Se cruzan dos plantas de flores rosadas heterocigotas (Rr), donde R (flor roja) es dominante sobre r (flor blanca).',
  q:'La proporción esperada de descendientes con flores blancas es',
  o:['0 %','25 %','50 %','75 %'],
  c:1,
  e:'El cruce Rr × Rr da RR, Rr, rR, rr, es decir 1/4 de genotipo rr. Solo los homocigotos recesivos expresan el fenotipo blanco: 25 %.'
},
{
  id:'cn04', a:'cn', d:1, diag:true,
  q:'En la tabla periódica, los elementos de un mismo grupo comparten',
  o:['el número de niveles de energía ocupados.',
     'el número de electrones en su último nivel de energía.',
     'exactamente la misma masa atómica.',
     'el mismo número de neutrones.'],
  c:1,
  e:'Los grupos (columnas) agrupan elementos con igual número de electrones de valencia, lo que explica su comportamiento químico similar. Los períodos (filas) son los que comparten número de niveles de energía.'
},
{
  id:'cn05', a:'cn', d:2,
  ctx:'Una muestra de agua tiene pH = 5.',
  q:'Respecto a una muestra neutra, esta agua es',
  o:['básica, con menor concentración de iones H⁺.',
     'ácida, con mayor concentración de iones H⁺.',
     'neutra, porque el pH está entre 0 y 14.',
     'ácida, con menor concentración de iones H⁺.'],
  c:1,
  e:'El pH neutro es 7. Un pH de 5 indica acidez, y como la escala es logarítmica inversa, un pH menor significa mayor concentración de H⁺: cien veces más que a pH 7.'
},
{
  id:'cn06', a:'cn', d:2,
  ctx:'Cadena trófica: pasto → saltamontes → rana → serpiente → águila',
  q:'Si desaparecieran todas las ranas, el efecto inmediato más probable sería',
  o:['aumento de saltamontes y disminución de serpientes.',
     'aumento de serpientes y disminución de saltamontes.',
     'aumento del pasto y de las águilas por igual.',
     'ningún cambio, porque cada especie es independiente.'],
  c:0,
  e:'Al perderse el depredador de los saltamontes, su población crece; al perderse la presa de las serpientes, estas disminuyen. El efecto se propaga en ambos sentidos de la cadena.'
},
{
  id:'cn07', a:'cn', d:1,
  q:'La fuerza necesaria para dar a un cuerpo de 8 kg una aceleración de 2,5 m/s² es',
  o:['3,2 N','10,5 N','20 N','80 N'],
  c:2,
  e:'Por la segunda ley de Newton, F = m·a = 8 kg × 2,5 m/s² = 20 N. El valor 80 N correspondería a multiplicar por la gravedad, que no interviene aquí.'
},
{
  id:'cn08', a:'cn', d:1,
  ctx:'Durante la mitosis, una célula con 46 cromosomas se divide.',
  q:'Cada célula hija resultante tendrá',
  o:['23 cromosomas, por reducción a la mitad.',
     '46 cromosomas, idénticos a los de la célula madre.',
     '92 cromosomas, por duplicación del material.',
     'un número variable según el tejido.'],
  c:1,
  e:'La mitosis produce dos células genéticamente idénticas con el mismo número de cromosomas que la madre (46). La reducción a 23 ocurre en la meiosis, propia de la formación de gametos.'
},
{
  id:'cn09', a:'cn', d:2,
  ctx:'Se calienta agua en una olla sobre una estufa. Después de un rato, el agua de la superficie también está caliente aunque no toque la base.',
  q:'El mecanismo de transferencia de calor que explica esto dentro del agua es principalmente',
  o:['conducción','convección','radiación','sublimación'],
  c:1,
  e:'El agua caliente de la base se expande, pierde densidad y sube, mientras la más fría baja: se forman corrientes de convección que distribuyen el calor en el fluido. La conducción domina en sólidos y la radiación no requiere medio material.'
},
{
  id:'cn10', a:'cn', d:2,
  q:'En la reacción 2H₂ + O₂ → 2H₂O, si reaccionan 4 moles de H₂ con oxígeno suficiente, se obtienen',
  o:['2 moles de H₂O','4 moles de H₂O','6 moles de H₂O','8 moles de H₂O'],
  c:1,
  e:'La estequiometría indica una relación 2:2, es decir 1:1 entre H₂ y H₂O. Por tanto 4 moles de H₂ producen 4 moles de agua, consumiendo 2 moles de O₂.'
},
{
  id:'cn11', a:'cn', d:3,
  ctx:'Un bloque de 2 kg se deja caer desde 10 m de altura. Se desprecia la resistencia del aire (g = 10 m/s²).',
  q:'La velocidad con que llega al suelo es',
  o:['10 m/s','14 m/s','20 m/s','100 m/s'],
  c:1,
  e:'Por conservación de la energía: ½mv² = mgh → v = √(2gh) = √(2 × 10 × 10) = √200 ≈ 14,1 m/s. La masa no influye en el resultado.'
},
{
  id:'cn12', a:'cn', d:3,
  ctx:'Un investigador quiere saber si un fertilizante aumenta la altura de las plantas. Prepara 50 macetas con fertilizante y 50 sin él, en las mismas condiciones de luz, riego y suelo.',
  q:'El grupo de 50 macetas sin fertilizante cumple la función de',
  o:['variable independiente','grupo control','variable dependiente','hipótesis'],
  c:1,
  e:'El grupo control permite comparar: si las plantas sin fertilizante crecen distinto, la diferencia puede atribuirse al tratamiento. El fertilizante es la variable independiente y la altura, la dependiente.'
},
{
  id:'cn13', a:'cn', d:2,
  ctx:'En el cuerpo humano, el intercambio de oxígeno y dióxido de carbono entre el aire y la sangre ocurre en una estructura específica del pulmón.',
  q:'Esa estructura es',
  o:['la tráquea','los bronquios','los alvéolos','la pleura'],
  c:2,
  e:'Los alvéolos son sacos microscópicos de pared muy delgada rodeados de capilares: allí el O₂ pasa a la sangre y el CO₂ sale. La tráquea y los bronquios solo conducen aire; la pleura es la membrana que recubre el pulmón.'
},
{
  id:'cn14', a:'cn', d:3,
  ctx:'Se disuelven 20 g de sal en agua hasta completar 500 mL de solución.',
  q:'La concentración en g/L es',
  o:['10 g/L','20 g/L','40 g/L','100 g/L'],
  c:2,
  e:'500 mL = 0,5 L. Concentración = 20 g ÷ 0,5 L = 40 g/L. El error frecuente es responder 20, olvidando ajustar el volumen a litros.'
},
{
  id:'cn15', a:'cn', d:2,
  ctx:'Un circuito tiene una resistencia de 10 Ω conectada a una fuente de 20 V.',
  q:'La corriente que circula es',
  o:['0,5 A','2 A','10 A','200 A'],
  c:1,
  e:'Por la ley de Ohm, I = V/R = 20 V ÷ 10 Ω = 2 A. Multiplicar (200) daría la potencia mal calculada; la división es la operación correcta.'
},

/* ===================================================================
   INGLÉS — 15
=================================================================== */
{
  id:'ing01', a:'ing', d:1, diag:true,
  q:'Choose the option that best completes the sentence: "If I ______ more time, I would learn to play the guitar."',
  o:['have','had','will have','am having'],
  c:1,
  e:'Es un condicional tipo 2 (situación hipotética). La estructura es: If + pasado simple, would + infinitivo. Por eso "had" y no "have".'
},
{
  id:'ing02', a:'ing', d:2, diag:true,
  ctx:'NOTICE\nThe library will be closed on Monday 15th for maintenance. Books due that day may be returned on Tuesday without penalty.',
  q:'According to the notice, students who had to return a book on Monday',
  o:['must pay a fine on Tuesday.',
     'can return it the next day at no extra cost.',
     'have to return it before Monday.',
     'cannot borrow books again.'],
  c:1,
  e:'"May be returned on Tuesday without penalty" significa que pueden devolverlo el martes sin multa. "Without penalty" descarta la opción A.'
},
{
  id:'ing03', a:'ing', d:1, diag:true,
  q:'Complete: "She has been working here ______ 2019."',
  o:['for','since','during','ago'],
  c:1,
  e:'"Since" se usa con un punto de inicio en el tiempo (2019); "for" acompaña una duración (for five years). "Ago" va después del período y con pasado simple.'
},
{
  id:'ing04', a:'ing', d:2, diag:true,
  ctx:'Text message\nAna: Are you coming to the study group?\nLuis: I wish I could, but I have to finish my chemistry lab report tonight.',
  q:"Luis's answer means that he",
  o:['will definitely attend the study group.',
     'wants to go but cannot because of other work.',
     'is not interested in the study group.',
     'has already finished his report.'],
  c:1,
  e:'"I wish I could" expresa el deseo de asistir, y "but I have to finish" da la razón por la que no puede. La combinación indica imposibilidad, no falta de interés.'
},
{
  id:'ing05', a:'ing', d:2,
  q:'Choose the correct question: "______ did you go to the concert with?"',
  o:['Who','Whose','Which','What'],
  c:0,
  e:'Se pregunta por la persona que acompañó, así que corresponde "Who" (en inglés actual, "Who ... with?" es la forma habitual). "Whose" pregunta por posesión y "Which" por selección entre opciones.'
},
{
  id:'ing06', a:'ing', d:1,
  ctx:'RECIPE — step 3\nPour the mixture into the pan and bake for 25 minutes. Do not open the oven during the first 15 minutes.',
  q:'The instruction warns the reader not to',
  o:['bake the mixture for more than 25 minutes.',
     'open the oven too early in the process.',
     'use a pan that is too small.',
     'pour the mixture too quickly.'],
  c:1,
  e:'"Do not open the oven during the first 15 minutes" es una advertencia explícita sobre abrir el horno demasiado pronto.'
},
{
  id:'ing07', a:'ing', d:1,
  q:'Complete: "This is ______ interesting book I have ever read."',
  o:['the more','the most','most','more'],
  c:1,
  e:'Con adjetivos largos, el superlativo se forma con "the most" + adjetivo. La presencia de "I have ever read" confirma que se necesita un superlativo, no un comparativo.'
},
{
  id:'ing08', a:'ing', d:2,
  ctx:'Email\nSubject: Volunteer program\nDear applicant, thank you for your interest. Unfortunately, all positions for July have been filled. We encourage you to apply again for the August cycle.',
  q:'The email informs the applicant that',
  o:['he or she has been accepted for July.',
     'there are no places left in July but there is a new chance in August.',
     'the volunteer program has been cancelled.',
     'the application was incomplete.'],
  c:1,
  e:'"All positions for July have been filled" indica que no quedan cupos, y "apply again for the August cycle" ofrece una nueva oportunidad. El programa sigue existiendo.'
},
{
  id:'ing09', a:'ing', d:1,
  q:'Choose the option with the correct past forms: "Yesterday we ______ to the museum and ______ many paintings."',
  o:['go / see','went / saw','gone / seen','were going / see'],
  c:1,
  e:'"Yesterday" exige pasado simple. Las formas irregulares correspondientes son went (go) y saw (see). "Gone" y "seen" son participios, que requieren un auxiliar.'
},
{
  id:'ing10', a:'ing', d:2,
  ctx:'Sign at a national park\nTAKE ONLY PHOTOGRAPHS. LEAVE ONLY FOOTPRINTS.',
  q:'The message on the sign asks visitors to',
  o:['avoid taking pictures of the wildlife.',
     'not remove anything and not leave waste behind.',
     'walk only on marked paths.',
     'register before entering the park.'],
  c:1,
  e:'Es una fórmula conservacionista: lo único que se puede llevar son fotos (no plantas, piedras ni animales) y lo único que se debe dejar son huellas (no basura).'
},
{
  id:'ing11', a:'ing', d:3,
  q:'Complete: "She asked me ______ I had finished the report."',
  o:['that','if','what','which'],
  c:1,
  e:'En el discurso indirecto, una pregunta de sí/no se introduce con "if" o "whether". "That" introduce afirmaciones reportadas, no preguntas.'
},
{
  id:'ing12', a:'ing', d:2,
  ctx:'JOB AD\nWanted: part-time assistant. Previous experience is not required, but applicants must be available on weekends.',
  q:'According to the advertisement, applicants',
  o:['need at least one year of experience.',
     'do not need experience but must work on weekends.',
     'will work only during the week.',
     'must have a university degree.'],
  c:1,
  e:'"Experience is not required" descarta la exigencia de experiencia; "must be available on weekends" establece la condición real. "Must" marca el requisito obligatorio.'
},
{
  id:'ing13', a:'ing', d:3,
  q:'Choose the sentence in the passive voice.',
  o:['The committee reviewed the proposal.',
     'The proposal was reviewed by the committee.',
     'The committee is reviewing the proposal.',
     'The committee will review the proposal.'],
  c:1,
  e:'La pasiva se construye con verbo "to be" + participio pasado, y el agente aparece con "by": "was reviewed by the committee". Las demás son activas en distintos tiempos.'
},
{
  id:'ing14', a:'ing', d:1,
  ctx:'Weather forecast\nTomorrow will be cloudy in the morning with a chance of rain in the afternoon. Temperatures will drop to 12 °C at night.',
  q:'According to the forecast, in the afternoon it may',
  o:['snow','rain','be sunny all day','reach 30 °C'],
  c:1,
  e:'"A chance of rain in the afternoon" indica posibilidad de lluvia. "Chance of" expresa probabilidad, no certeza, y ninguna otra opción aparece en el texto.'
},
{
  id:'ing15', a:'ing', d:2,
  q:'Complete: "There isn\'t ______ milk left in the fridge."',
  o:['many','much','a few','several'],
  c:1,
  e:'"Milk" es un sustantivo incontable, así que se usa "much" en oraciones negativas. "Many", "a few" y "several" acompañan sustantivos contables en plural.'
}

];

/* Conjunto fijo del diagnóstico: 20 preguntas, 4 por área, siempre las mismas */
const DIAG_IDS = BANCO.filter(q => q.diag).map(q => q.id);
