import { useState } from 'react'
import { CDS_QUESTIONS, RESPONSE_OPTIONS } from '../data/cdsTest'

export default function TestForm({ childData, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const question = CDS_QUESTIONS[currentQuestion]
  const answered = answers[question.id] !== undefined
  const progress = Math.round((Object.keys(answers).length / CDS_QUESTIONS.length) * 100)

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < CDS_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNext = () => {
    if (answered && currentQuestion < CDS_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4 md:p-8">
      <div className="max-w-2xl mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Pregunta {currentQuestion + 1} de {CDS_QUESTIONS.length}</p>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
            {childData.name}
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            {childData.age} años
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">{progress}% Completado</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Question */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-white leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Response Options */}
          <div className="space-y-3 mb-12">
            {RESPONSE_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all flex items-center justify-between group ${
                  answers[question.id] === option.value
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                }`}
              >
                <span className="text-sm md:text-base font-medium">{option.label}</span>
                <span className={`text-xs font-bold ml-3 rounded-full w-7 h-7 flex items-center justify-center ${
                  answers[question.id] === option.value
                    ? 'bg-white text-blue-600'
                    : 'bg-slate-600 text-gray-300'
                }`}>
                  {option.value}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-slate-700 disabled:text-gray-600 disabled:hover:bg-transparent transition-colors rounded-lg"
            >
              ← Anterior
            </button>

            {currentQuestion < CDS_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!answered}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-slate-700 disabled:text-gray-600 disabled:hover:bg-transparent transition-colors rounded-lg"
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={() => answered && onComplete(answers)}
                disabled={!answered}
                className="flex-1 px-4 py-3 text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 disabled:text-gray-500 transition-all rounded-lg shadow-lg shadow-blue-500/30"
              >
                Finalizar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
