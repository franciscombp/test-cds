# Test CDS - Escala de Depresión para Niños

Aplicación web interactiva para administración del Test de Depresión en Niños (CDS) de M. Lang y M. Tisher.

## Características

✅ **Interfaz intuitiva tipo Typeform**: Una pregunta por pantalla con botones grandes y claros
✅ **18 preguntas del test CDS**: Todas las preguntas del test estándar
✅ **Cálculo automático de resultados**: Según el manual de Lang y Tisher
✅ **Interpretación de resultados**: Categorización automática del nivel de depresión
✅ **Exportación a PDF**: Reporte completo y profesional
✅ **Exportación a CSV**: Para análisis y registro de datos
✅ **Diseño responsivo**: Funciona en desktop, tablet y móvil
✅ **Accesibilidad**: Texto grande y clara navegación

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build para Producción

```bash
npm run build
npm run preview
```

## Uso

1. **Ingresa el nombre del niño/a**
2. **Responde cada pregunta**: Lee la pregunta en voz alta si es necesario. El niño/a debe elegir una opción:
   - Nunca
   - A veces
   - Frecuentemente
   - Siempre
3. **Revisa los resultados**: La aplicación calcula automáticamente el puntaje y la categoría
4. **Descarga el reporte**: Genera PDF o CSV con todos los datos

## Interpretación de Resultados

| Puntaje | Categoría | Descripción |
|---------|-----------|-------------|
| 0-15 | Sin depresión | No presenta síntomas significativos |
| 16-25 | Depresión leve | Síntomas leves, seguimiento recomendado |
| 26-40 | Depresión moderada | Síntomas moderados, intervención profesional recomendada |
| 41-54 | Depresión severa | Síntomas severos, atención inmediata requerida |

## Tecnologías Utilizadas

- React 18
- Vite
- Tailwind CSS
- HTML2PDF (para exportación)
- PapaParse (para CSV)

## Nota Importante

Este test es una herramienta de screening y no reemplaza una evaluación profesional. Los resultados deben ser interpretados por un profesional de la salud mental especializado. Si se detecta depresión, se recomienda derivación a un psicólogo o psiquiatra.

## Licencia

Uso educativo y profesional únicamente.
