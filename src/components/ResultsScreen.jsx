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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Resultados</h1>
          <p className="text-xl text-blue-200">Evaluación de {childName}</p>
        </div>

        {/* Main Score Card */}
        <div className={`${currentBaremo.bg} rounded-3xl shadow-2xl p-8 md:p-10 mb-6 transform transition`}>
          <div className="text-center">
            <p className="text-blue-50 text-lg mb-4 font-semibold">Puntaje Total Obtenido</p>
            <div className="inline-block mb-6">
              <span className="text-7xl md:text-8xl font-bold text-white drop-shadow-lg">{score}</span>
              <span className="text-2xl text-blue-50 ml-2">/ 330</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{interpretation.category}</h2>
            <p className="text-blue-50 text-lg leading-relaxed">{interpretation.description}</p>
          </div>
        </div>

        {/* Baremos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {baremosData.map((baremo, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 border-2 transition transform ${
                currentBaremo.range === baremo.range
                  ? `bg-gradient-to-br ${baremo.color} border-white shadow-2xl scale-105`
                  : 'bg-white bg-opacity-10 border-blue-300 border-opacity-30'
              }`}
            >
              <div className={`text-3xl mb-2 ${currentBaremo.range === baremo.range ? 'text-white' : 'text-blue-300'}`}>
                {baremo.icon}
              </div>
              <p className={`text-sm font-bold ${currentBaremo.range === baremo.range ? 'text-white' : 'text-blue-200'}`}>
                Puntaje: {baremo.range}
              </p>
              <p className={`text-lg font-bold ${currentBaremo.range === baremo.range ? 'text-white' : 'text-blue-100'}`}>
                {baremo.category}
              </p>
              {currentBaremo.range === baremo.range && (
                <div className="mt-3 pt-3 border-t border-white border-opacity-30">
                  <p className="text-sm font-semibold text-white">✓ TU RESULTADO</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Interpretation */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-blue-300 border-opacity-30">
          <h3 className="text-2xl font-bold text-white mb-6">📊 Interpretación Detallada</h3>

          <div className="space-y-6">
            {/* Interpretation Info */}
            <div className="bg-white bg-opacity-5 rounded-xl p-5 border-l-4 border-blue-400">
              <p className="text-blue-50 leading-relaxed">
                <strong className="text-white text-lg">Categoría Obtenida:</strong><br/>
                {interpretation.category} - {interpretation.description}
              </p>
            </div>

            {/* Score Analysis */}
            <div className="bg-white bg-opacity-5 rounded-xl p-5 border-l-4 border-indigo-400">
              <p className="text-blue-50 leading-relaxed">
                <strong className="text-white text-lg">Análisis del Puntaje:</strong><br/>
                El niño/a obtuvo un puntaje de <strong className="text-white text-xl">{score}</strong> puntos de 330 posibles,
                lo que sitúa el resultado en la categoría de <strong className="text-white">{interpretation.category}</strong>.
                {score <= 110 && ' No presenta síntomas significativos de depresión.'}
                {score > 110 && score <= 150 && ' Se recomienda seguimiento profesional.'}
                {score > 150 && score <= 200 && ' Se recomienda intervención profesional inmediata.'}
                {score > 200 && ' Requiere atención profesional especializada urgente.'}
              </p>
            </div>

            {/* Manual Reference */}
            <div className="bg-white bg-opacity-5 rounded-xl p-5 border-l-4 border-purple-400">
              <p className="text-blue-50 text-sm leading-relaxed">
                <strong className="text-white">Referencia:</strong> Escala de Depresión para Niños (CDS) de M. Lang y M. Tisher<br/>
                <strong className="text-white">Rango de Puntaje:</strong> 66 (mínimo) a 330 (máximo)<br/>
                <strong className="text-white">Escala de Respuesta:</strong> 5 puntos (1: Muy en desacuerdo hasta 5: Muy de acuerdo)
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-yellow-400 bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-yellow-400 mb-8">
          <p className="text-yellow-50 leading-relaxed">
            <strong className="text-yellow-100 text-lg">⚠ Recomendación Importante:</strong><br/>
            Este test es una herramienta de screening psicológico. Los resultados deben ser interpretados por un profesional
            de la salud mental especializado. En caso de sospechar depresión o ideación suicida, se recomienda derivación
            inmediata a un psicólogo, psiquiatra o servicio de emergencias psicológicas.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 md:py-4 px-6 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-lg"
          >
            📄 PDF
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 md:py-4 px-6 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-lg"
          >
            📊 CSV
          </button>
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 md:py-4 px-6 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-lg"
          >
            ↻ Nuevo Test
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-200 text-sm">
          <p>Test CDS - Escala de Depresión para Niños (Lang & Tisher)</p>
          <p className="text-blue-300 mt-2">{new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  )
}
