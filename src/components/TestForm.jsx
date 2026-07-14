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
    <div className="min-h-screen bg-white flex flex-col p-4 md:p-8">
      <div className="max-w-2xl mx-auto w-full flex flex-col h-full">
        {/* Header - Minimal */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
            Evaluación
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-normal">
            {childData.name} · {childData.age} años
          </p>
        </div>

        {/* Progress - Subtle */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 font-medium">
              Pregunta {currentQuestion + 1}/{CDS_QUESTIONS.length}
            </span>
            <span className="text-xs text-gray-500 font-medium">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Question */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed mb-2 tracking-tight">
              {question.question}
            </h2>
          </div>

          {/* Response Options - Minimal */}
          <div className="space-y-3 mb-12">
            {RESPONSE_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left px-4 py-4 rounded-lg transition-all flex items-center justify-between group border ${
                  answers[question.id] === option.value
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-900 border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className="text-sm md:text-base font-normal">{option.label}</span>
                <span className={`text-xs font-medium ml-3 rounded-full w-6 h-6 flex items-center justify-center ${
                  answers[question.id] === option.value
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {index + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation Buttons - Minimal */}
          <div className="flex gap-3 pt-6 border-t border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-transparent transition-colors rounded-lg"
            >
              Anterior
            </button>

            {currentQuestion < CDS_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!answered}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-transparent transition-colors rounded-lg"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={() => answered && onComplete(answers)}
                disabled={!answered}
                className="flex-1 px-4 py-3 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-400 transition-colors rounded-lg"
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
