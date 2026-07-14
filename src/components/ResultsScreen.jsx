import { calculateCDSScore, getInterpretation, CDS_QUESTIONS } from '../data/cdsTest'
import { downloadPDF, downloadCSV } from '../utils/exportUtils'

export default function ResultsScreen({ childName, answers, onRestart }) {
  const score = calculateCDSScore(answers)
  const interpretation = getInterpretation(score)

  const handleDownloadPDF = () => {
    downloadPDF(childName, score, interpretation, answers)
  }

  const handleDownloadCSV = () => {
    downloadCSV(childName, score, interpretation, answers)
  }

  const getBaremoColor = (score) => {
    if (score <= 110) return { bg: 'bg-gradient-to-r from-green-400 to-emerald-500', text: 'text-white' }
    if (score <= 150) return { bg: 'bg-gradient-to-r from-yellow-400 to-amber-500', text: 'text-white' }
    if (score <= 200) return { bg: 'bg-gradient-to-r from-orange-400 to-red-500', text: 'text-white' }
    return { bg: 'bg-gradient-to-r from-red-500 to-red-700', text: 'text-white' }
  }

  const baremosData = [
    { range: '66-110', category: 'Sin depresión o depresión muy leve', color: 'from-green-400 to-emerald-500', icon: '✓' },
    { range: '111-150', category: 'Depresión leve', color: 'from-yellow-400 to-amber-500', icon: '⚠' },
    { range: '151-200', category: 'Depresión moderada', color: 'from-orange-400 to-red-500', icon: '⚠' },
    { range: '201-330', category: 'Depresión severa', color: 'from-red-500 to-red-700', icon: '⚠' }
  ]

  const currentBaremo = baremosData.find(b => {
    const [min, max] = b.range.split('-').map(Number)
    return score >= min && score <= max
  })

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Resultados</h1>
          <p className="text-xl text-gray-600">Evaluación de {childName}</p>
        </div>

        {/* Main Score Card */}
        <div className="bg-white rounded-lg p-8 md:p-10 mb-6 border border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4 font-semibold">Puntaje Total Obtenido</p>
            <div className="inline-block mb-6">
              <span className="text-7xl md:text-8xl font-bold text-gray-900">{score}</span>
              <span className="text-2xl text-gray-600 ml-2">/ 330</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{interpretation.category}</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{interpretation.description}</p>
          </div>
        </div>

        {/* Baremos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {baremosData.map((baremo, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 border transition ${
                currentBaremo.range === baremo.range
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <div className={`text-3xl mb-2 ${currentBaremo.range === baremo.range ? 'text-white' : 'text-gray-600'}`}>
                {baremo.icon}
              </div>
              <p className={`text-sm font-bold ${currentBaremo.range === baremo.range ? 'text-gray-300' : 'text-gray-600'}`}>
                Puntaje: {baremo.range}
              </p>
              <p className={`text-lg font-bold ${currentBaremo.range === baremo.range ? 'text-white' : 'text-gray-900'}`}>
                {baremo.category}
              </p>
              {currentBaremo.range === baremo.range && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-sm font-semibold text-white">✓ TU RESULTADO</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Interpretation */}
        <div className="bg-white rounded-lg p-6 md:p-8 mb-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Interpretación Detallada</h3>

          <div className="space-y-6">
            {/* Interpretation Info */}
            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900 text-lg">Categoría Obtenida:</strong><br/>
                {interpretation.category} - {interpretation.description}
              </p>
            </div>

            {/* Score Analysis */}
            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900 text-lg">Análisis del Puntaje:</strong><br/>
                El niño/a obtuvo un puntaje de <strong className="text-gray-900 text-xl">{score}</strong> puntos de 330 posibles,
                lo que sitúa el resultado en la categoría de <strong className="text-gray-900">{interpretation.category}</strong>.
                {score <= 110 && ' No presenta síntomas significativos de depresión.'}
                {score > 110 && score <= 150 && ' Se recomienda seguimiento profesional.'}
                {score > 150 && score <= 200 && ' Se recomienda intervención profesional inmediata.'}
                {score > 200 && ' Requiere atención profesional especializada urgente.'}
              </p>
            </div>

            {/* Manual Reference */}
            <div className="bg-gray-50 rounded-lg p-5 border-l-4 border-gray-400">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong className="text-gray-900">Referencia:</strong> Escala de Depresión para Niños (CDS) de M. Lang y M. Tisher<br/>
                <strong className="text-gray-900">Rango de Puntaje:</strong> 66 (mínimo) a 330 (máximo)<br/>
                <strong className="text-gray-900">Escala de Respuesta:</strong> 5 puntos (1: Muy en desacuerdo hasta 5: Muy de acuerdo)
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-400 mb-8">
          <p className="text-gray-700 leading-relaxed">
            <strong className="text-gray-900 text-lg">⚠ Recomendación Importante:</strong><br/>
            Este test es una herramienta de screening psicológico. Los resultados deben ser interpretados por un profesional
            de la salud mental especializado. En caso de sospechar depresión o ideación suicida, se recomienda derivación
            inmediata a un psicólogo, psiquiatra o servicio de emergencias psicológicas.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleDownloadPDF}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 md:py-4 px-6 rounded-lg transition border border-gray-900"
          >
            📄 PDF
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 md:py-4 px-6 rounded-lg transition border border-gray-900"
          >
            📊 CSV
          </button>
          <button
            onClick={onRestart}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 md:py-4 px-6 rounded-lg transition border border-gray-900"
          >
            ↻ Nuevo Test
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Test CDS - Escala de Depresión para Niños (Lang & Tisher)</p>
          <p className="text-gray-600 mt-2">{new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  )
}
