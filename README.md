# Test CDS - Escala de Depresión para Niños

Aplicación web interactiva para administración del Test de Depresión en Niños (CDS) de M. Lang y M. Tisher. **100% frontend, sin servidor requerido.**

🌐 **Acceso en línea**: [https://franciscombp.github.io/test-cds](https://franciscombp.github.io/test-cds)

## Características

✅ **Interfaz intuitiva tipo Typeform**: Una pregunta por pantalla con botones grandes y claros
✅ **66 preguntas del test CDS**: Test completo según el manual de Lang y M. Tisher
✅ **Escala de 5 puntos**: Muy en desacuerdo (1) a Muy de acuerdo (5)
✅ **Cálculo automático de resultados**: Puntaje 66-330 según el manual oficial
✅ **Interpretación clínica**: Categorización automática del nivel de depresión
✅ **Exportación a PDF**: Reporte profesional con todas las respuestas
✅ **Exportación a CSV**: Para análisis y registros
✅ **100% Frontend**: Sin servidor, funciona completamente en el navegador
✅ **Diseño responsivo**: Desktop, tablet y móvil
✅ **Accesibilidad**: Texto grande y navegación clara

## Uso en Línea (GitHub Pages)

La aplicación está desplegada automáticamente en:
**[https://franciscombp.github.io/test-cds](https://franciscombp.github.io/test-cds)**

Solo abre el link y comienza a usar. ¡No requiere instalación!

## Desarrollo Local

### Instalación

```bash
git clone https://github.com/franciscombp/test-cds.git
cd test-cds
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
npm run build
npm run preview
```

El build se genera en la carpeta `dist/`.

## Uso

1. **Ingresa el nombre del niño/a**
2. **Responde cada pregunta**: Lee la pregunta en voz alta si es necesario. El niño/a debe elegir una opción:
   - Nunca
   - A veces
   - Frecuentemente
   - Siempre
3. **Revisa los resultados**: La aplicación calcula automáticamente el puntaje y la categoría
4. **Descarga el reporte**: Genera PDF o CSV con todos los datos

## Interpretación de Resultados (según Manual Lang & Tisher)

| Puntaje | Categoría | Descripción |
|---------|-----------|-------------|
| 66-110 | Sin depresión o depresión muy leve | No presenta síntomas significativos |
| 111-150 | Depresión leve | Síntomas leves, seguimiento profesional recomendado |
| 151-200 | Depresión moderada | Síntomas moderados, intervención profesional recomendada |
| 201-330 | Depresión severa | Síntomas severos, atención profesional inmediata requerida |

**Nota**: El puntaje va de 66 (mínimo) a 330 (máximo), con escala de 5 puntos por pregunta.

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
