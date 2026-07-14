import { calculateCDSScore, getInterpretation } from '../data/cdsTest'
import { downloadPDF, downloadCSV } from '../utils/exportUtils'

export default function ResultsScreen({ childData, answers, onRestart }) {
  const score = calculateCDSScore(answers)
  const interpretation = getInterpretation(score)

  const handleDownloadPDF = () => {
    downloadPDF(childData.name, score, interpretation, answers)
  }

  const handleDownloadCSV = () => {
    downloadCSV(childData.name, score, interpretation, answers)
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

  const getSeverityStyle = (severity) => {
    const styles = {
      normal: 'bg-white border-gray-200',
      mild: 'bg-gray-100 border-gray-300',
      moderate: 'bg-gray-200 border-gray-400',
      severe: 'bg-gray-900 text-white border-gray-900'
    }
    return styles[severity] || styles.normal
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-2 font-medium">RESULTADOS DE LA EVALUACIÓN</p>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-3">
            {childData.name}
          </h1>
          <p className="text-sm text-gray-500">
            {childData.age} años · {childData.sex === 'M' ? 'Masculino' : 'Femenino'}
          </p>
        </div>

        {/* Score Display - Minimal */}
        <div className="mb-12 py-12 text-center border-y border-gray-100">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-medium">Puntaje Total</p>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-6xl md:text-7xl font-light text-gray-900">{score}</span>
            <span className="text-2xl text-gray-500 font-light">/ 330</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
            {interpretation.category}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">
            {interpretation.description}
          </p>
        </div>

        {/* Baremos Reference */}
        <div className="mb-12">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-6 font-medium">Escala de Referencia</p>
          <div className="space-y-3">
            {baremosData.map((baremo, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition ${
                  currentBaremo.range === baremo.range
                    ? 'bg-gray-900 text-white border-gray-900 ring-2 ring-offset-2 ring-gray-900'
                    : getSeverityStyle(baremo.severity)
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-xs font-medium mb-1 ${
                      currentBaremo.range === baremo.range ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {baremo.range} puntos
                    </p>
                    <p className={`text-sm font-medium ${
                      currentBaremo.range === baremo.range ? 'text-white' : 'text-gray-900'
                    }`}>
                      {baremo.category}
                    </p>
                  </div>
                  {currentBaremo.range === baremo.range && (
                    <span className="text-sm font-medium">✓ Resultado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div className="mb-12 space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-2">Análisis</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              El puntaje de <strong>{score}</strong> puntos indica{' '}
              {score <= 110 && 'ausencia de síntomas significativos de depresión.'}
              {score > 110 && score <= 150 && 'síntomas leves que requieren seguimiento profesional.'}
              {score > 150 && score <= 200 && 'síntomas moderados que requieren intervención profesional.'}
              {score > 200 && 'síntomas severos que requieren atención especializada urgente.'}
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-2">Referencia</p>
            <p className="text-xs text-gray-600 leading-relaxed space-y-1">
              <div>Escala de Depresión para Niños (CDS) — Lang & Tisher</div>
              <div>Rango: 66 a 330 puntos · Escala de respuesta: 1 a 5 puntos</div>
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="mb-12 p-6 bg-red-50 rounded-lg border border-red-100">
          <p className="text-xs text-red-700 uppercase tracking-widest font-medium mb-2">⚠ Importante</p>
          <p className="text-sm text-red-900 leading-relaxed">
            Este test es una herramienta de screening. Los resultados deben ser interpretados por un profesional de salud mental. En caso de sospechar depresión o ideación suicida, se recomienda derivación inmediata a un especialista o servicio de emergencias.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleDownloadPDF}
            className="w-full px-4 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 rounded-lg transition"
          >
            Descargar PDF
          </button>
          <button
            onClick={handleDownloadCSV}
            className="w-full px-4 py-3 bg-gray-100 text-gray-900 text-sm font-medium hover:bg-gray-200 rounded-lg transition border border-gray-200"
          >
            Descargar CSV
          </button>
          <button
            onClick={onRestart}
            className="w-full px-4 py-3 text-gray-900 text-sm font-medium hover:bg-gray-50 rounded-lg transition"
          >
            Realizar Nuevo Test
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}
