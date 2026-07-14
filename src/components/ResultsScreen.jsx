import { calculateCDSScore, getInterpretation, CDS_QUESTIONS } from '../data/cdsTest'
import { downloadPDF, downloadCSV } from '../utils/exportUtils'

export default function ResultsScreen({ childData, answers, onRestart }) {
  const score = calculateCDSScore(answers)
  const interpretation = getInterpretation(score)

  const handleDownloadPDF = () => {
    downloadPDF(childData, score, interpretation, answers)
  }

  const handleDownloadCSV = () => {
    downloadCSV(childData, score, interpretation, answers)
  }

  const baremosData = [
    { range: '66-110', category: 'Sin depresión o muy leve', severity: 'normal' },
    { range: '111-150', category: 'Depresión leve', severity: 'mild' },
    { range: '151-200', category: 'Depresión moderada', severity: 'moderate' },
    { range: '201-330', category: 'Depresión severa', severity: 'severe' }
  ]

  const currentBaremo = baremosData.find(b => {
    const [min, max] = b.range.split('-').map(Number)
    return score >= min && score <= max
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Resultados</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            {childData.name}
          </h1>
          <p className="text-sm text-gray-400">
            {childData.age} años · {childData.sex === 'M' ? 'Masculino' : 'Femenino'}
          </p>
        </div>

        {/* Score Display */}
        <div className="mb-12 py-12 text-center bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-700">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6 font-semibold">Puntaje Total</p>
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{score}</span>
            <span className="text-2xl text-gray-400 font-light">/ 330</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            {interpretation.category}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-lg mx-auto">
            {interpretation.description}
          </p>
        </div>

        {/* Baremos Reference */}
        <div className="mb-12">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6 font-semibold">Escalas de Severidad</p>
          <div className="space-y-3">
            {baremosData.map((baremo, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border transition-all ${
                  currentBaremo.range === baremo.range
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500 ring-2 ring-blue-500/30'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-xs font-semibold mb-1 uppercase tracking-widest ${
                      currentBaremo.range === baremo.range ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {baremo.range} puntos
                    </p>
                    <p className={`text-sm font-semibold ${
                      currentBaremo.range === baremo.range ? 'text-white' : 'text-gray-300'
                    }`}>
                      {baremo.category}
                    </p>
                  </div>
                  {currentBaremo.range === baremo.range && (
                    <span className="text-sm font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">✓ Tu Resultado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div className="mb-12 space-y-4">
          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Análisis Detallado</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              El puntaje de <strong className="text-white">{score}</strong> puntos indica{' '}
              {score <= 110 && 'ausencia de síntomas significativos de depresión. No se requiere intervención inmediata.'}
              {score > 110 && score <= 150 && 'síntomas leves que requieren seguimiento profesional. Se recomienda evaluación periódica.'}
              {score > 150 && score <= 200 && 'síntomas moderados que requieren intervención profesional. Se recomienda seguimiento psicológico.'}
              {score > 200 && 'síntomas severos que requieren atención especializada urgente. Se recomienda derivación inmediata.'}
            </p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Información Técnica</p>
            <div className="text-xs text-gray-400 leading-relaxed space-y-2">
              <div><span className="text-gray-300">Escala:</span> Depresión para Niños (CDS) — Lang & Tisher</div>
              <div><span className="text-gray-300">Rango:</span> 66 (mínimo) a 330 (máximo)</div>
              <div><span className="text-gray-300">Respuestas:</span> Escala Likert 1-5 puntos</div>
              <div><span className="text-gray-300">Edad del paciente:</span> {childData.age} años</div>
              <div><span className="text-gray-300">Fecha:</span> {new Date().toLocaleDateString('es-ES')}</div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mb-12 p-6 bg-red-950/40 rounded-xl border border-red-900/60">
          <p className="text-xs text-red-400 uppercase tracking-widest font-semibold mb-2">⚠ Recomendación Importante</p>
          <p className="text-sm text-red-200 leading-relaxed">
            Este test es una herramienta de screening psicológico. Los resultados deben ser interpretados por un profesional de salud mental especializado. En caso de sospechar depresión o ideación suicida, se recomienda derivación inmediata a un psicólogo, psiquiatra o servicio de emergencias psicológicas.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleDownloadPDF}
            className="w-full px-4 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30"
          >
            📄 Descargar Informe PDF
          </button>
          <button
            onClick={handleDownloadCSV}
            className="w-full px-4 py-4 bg-slate-800 hover:bg-slate-700 text-gray-200 text-sm font-semibold rounded-xl transition-all border border-slate-700"
          >
            📊 Descargar Datos CSV
          </button>
          <button
            onClick={onRestart}
            className="w-full px-4 py-4 text-gray-300 hover:text-white text-sm font-semibold rounded-xl transition-all hover:bg-slate-800/50"
          >
            ↻ Realizar Nuevo Test
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-slate-700">
          <p className="text-xs text-gray-500">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}
