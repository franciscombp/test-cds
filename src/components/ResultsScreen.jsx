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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Resultados</h1>
          <p className="text-lg text-gray-600">Test de {childName}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="bg-indigo-600 rounded-full w-32 h-32 flex items-center justify-center">
                <span className="text-5xl font-bold text-white">{score}</span>
              </div>
              <p className="text-center text-gray-600 mt-4">Puntaje Total</p>
            </div>
          </div>

          {/* Interpretation */}
          <div className={`${interpretation.color} rounded-lg p-6 mb-8 border-l-4`}>
            <h3 className="text-2xl font-bold mb-2">{interpretation.category}</h3>
            <p className="text-base leading-relaxed">{interpretation.description}</p>
          </div>

          {/* Score Range Reference */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-gray-800 mb-4">Rango de Puntajes (según Manual Lang & Tisher):</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• <strong>66-110:</strong> Sin depresión o depresión muy leve</p>
              <p>• <strong>111-150:</strong> Depresión leve</p>
              <p>• <strong>151-200:</strong> Depresión moderada</p>
              <p>• <strong>201-330:</strong> Depresión severa</p>
            </div>
            <p className="text-xs text-gray-600 mt-4">Puntaje mínimo: 66 | Puntaje máximo: 330</p>
          </div>

          {/* Detailed Answers */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-gray-800 mb-4">Respuestas Detalladas:</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {CDS_QUESTIONS.map((question) => (
                <div key={question.id} className="flex justify-between text-sm py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700 flex-1">
                    {question.id}. {question.question}
                  </span>
                  <span className="text-indigo-600 font-bold ml-4">
                    {['Nunca', 'A veces', 'Frecuentemente', 'Siempre'][answers[question.id]]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleDownloadPDF}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            📄 Descargar PDF
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            📊 Descargar CSV
          </button>
          <button
            onClick={onRestart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            ↻ Nuevo Test
          </button>
        </div>

        {/* Notes */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>Nota:</strong> Este test es una herramienta de screening. Los resultados deben ser interpretados
            por un profesional de la salud mental especializado. Si sospechas depresión, consulta con un psicólogo o psiquiatra.
          </p>
        </div>
      </div>
    </div>
  )
}
