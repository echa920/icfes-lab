# ICFES Lab

Diagnóstico y preparación para la prueba **Saber 11° del Icfes**. Sitio estático,
sin cuenta, sin servidor, sin anuncios, sin rastreo.

## Qué trae

- **Examen diagnóstico** — 20 preguntas (4 por cada una de las cinco áreas) con
  reloj de 30 minutos, navegador de preguntas, marcado de dudosas y entrega
  automática al acabarse el tiempo. El intento sobrevive si cierras la pestaña.
- **Puntaje global de 0 a 500** con la fórmula oficial del Icfes:
  `[(3·LC + 3·MAT + 3·SOC + 3·CN + 1·ING) ÷ 13] × 5`, más el puntaje de 0 a 100
  por área y el **nivel de desempeño** según los puntos de corte oficiales
  (Niveles 1–4, y A−/A1/A2/B1/B+ en Inglés).
- **Revisión pregunta por pregunta** — tu respuesta, la correcta y una
  explicación escrita para cada una de las 75 preguntas.
- **Práctica libre** — filtra por área, por dificultad, por "solo las que fallé"
  o por "no vistas", con retroalimentación inmediata.
- **Videoteca** — guarda tus propios videos de YouTube por área y reprodúcelos
  dentro del sitio.
- **Guía de la prueba** — cómo se calcula el puntaje, la tabla de niveles de
  desempeño y estrategia por área.
- **Progreso en el tiempo** — gráfica de tus intentos contra tu meta, acierto por
  área y cobertura del banco de preguntas.

## Cómo usarlo

Abre `index.html` en cualquier navegador, o entra al sitio publicado. Nada más.

Funciona sin conexión, salvo los videos de YouTube. En el celular se puede
instalar como app desde el menú del navegador ("Agregar a la pantalla de inicio").

## Estructura

| Archivo | Qué contiene |
|---|---|
| `index.html` | estructura y estilos |
| `questions.js` | las 75 preguntas, las cinco áreas y los puntos de corte |
| `app.js` | lógica: puntajes, diagnóstico, práctica, progreso, respaldo |

Los `id` de las preguntas (`lc01`, `mat07`, …) son estables a propósito: de ellos
dependen tu historial de errores y de preguntas vistas. Si renombras uno, pierdes
ese progreso.

## Notas honestas

- Las **75 preguntas son originales**, escritas en el formato de Saber 11°.
  **No son preguntas liberadas por el Icfes** ni reproducen ningún examen real.
  Para material oficial, consulta las guías de orientación y los cuadernillos
  publicados en [icfes.gov.co](https://www.icfes.gov.co).
- El sitio viene con **5 puntajes precargados** (promedio global 268) para que las
  gráficas y la pestaña Promedio no se vean vacías la primera vez. Se quitan desde
  **Guía → Ajustes → Puntajes precargados**. Son cifras de muestra generadas para
  la demostración; **no corresponden a resultados de ninguna persona real.**
- La **fórmula del puntaje global es la oficial**. Lo que es una estimación son
  los puntajes por área: el Icfes los calcula con modelos de Teoría de Respuesta
  al Ítem, que ponderan cada pregunta según su dificultad y no son públicos.
  Aquí se usa una curva de aproximación sobre el porcentaje de aciertos,
  calibrada para que un 50 % de aciertos caiga cerca del promedio nacional.
  Tómalo como una orientación de dónde estás parado, no como un pronóstico.
- Los **puntos de corte de los niveles de desempeño sí son los oficiales**,
  verificados contra los documentos "Niveles de desempeño" del Icfes:

  | Prueba | Nivel 1 | Nivel 2 | Nivel 3 | Nivel 4 |
  |---|---|---|---|---|
  | Lectura Crítica | 0–35 | 36–50 | 51–65 | 66–100 |
  | Matemáticas | 0–35 | 36–50 | 51–70 | 71–100 |
  | Sociales y Ciudadanas | 0–40 | 41–55 | 56–70 | 71–100 |
  | Ciencias Naturales | 0–40 | 41–55 | 56–70 | 71–100 |

  Inglés: A− 0–47 · A1 48–57 · A2 58–67 · B1 68–78 · B+ 79–100

- El diagnóstico usa **siempre las mismas 20 preguntas**, a propósito: así los
  intentos se comparan contra la misma vara. Para variedad, usa Práctica.
- Con 4 preguntas por área, **cada acierto mueve el puntaje de esa área unos 25
  puntos**. El diagnóstico ubica tu punto de partida y te dice qué área está más
  floja; no mide diferencias finas. Una variación de 25 puntos entre dos intentos
  puede ser una sola pregunta adivinada. Para una lectura más estable, practica
  por área con las 75 preguntas del banco.
- El progreso vive en el `localStorage` del navegador. Si borras los datos de
  navegación, se pierde, y no te sigue a otro dispositivo — usa
  **Guía → Ajustes → Exportar** para respaldarlo.
- Los videos que agregues pertenecen a sus respectivos canales de YouTube; este
  proyecto solo enlaza contenido público y usa el dominio `youtube-nocookie.com`.

No está afiliado al Icfes ni avalado por esa entidad.
