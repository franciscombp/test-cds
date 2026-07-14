import { useState } from 'react'
import { CDS_QUESTIONS, RESPONSE_OPTIONS } from '../data/cdsTest'

export default function TestForm({ childName, onComplete }) {
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
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b border-gray-200">
        <h1 className="text-gray-900 text-2xl md:text-3xl font-bold mb-1">Test CDS</h1>
        <p className="text-gray-600 text-sm md:text-base font-semibold">{childName}</p>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-800 text-sm font-semibold">
            Pregunta {currentQuestion + 1} de {CDS_QUESTIONS.length}
          </span>
          <span className="text-gray-600 text-sm font-semibold">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content - Flex to fill space */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        {/* Question Card */}
        <div className="bg-white rounded-lg p-6 md:p-8 mb-6 flex flex-col flex-1 border border-gray-200">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
            {question.question}
          </h2>

          {/* Response Options */}
          <div className="space-y-2.5 md:space-y-3 flex-1 flex flex-col justify-center">
            {RESPONSE_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-3 md:p-4 text-base md:text-lg font-semibold rounded-lg transition-all flex items-center justify-between group border ${
                  answers[question.id] === option.value
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
                }`}
              >
                <span className="flex-1 text-left">{option.label}</span>
                <span className={`text-xs md:text-sm font-bold ml-3 rounded-full w-8 h-8 flex items-center justify-center ${
                  answers[question.id] === option.value
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 md:gap-3 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1 bg-white hover:bg-gray-100 disabled:bg-gray-300 disabled:opacity-50 text-gray-800 disabled:text-gray-500 font-bold py-2.5 md:py-3 px-3 md:px-4 rounded-lg text-sm md:text-base transition border border-gray-300 disabled:border-gray-300"
          >
            ← Anterior
          </button>

          {currentQuestion < CDS_QUESTIONS.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!answered}
              className="flex-1 bg-white hover:bg-gray-100 disabled:bg-gray-300 disabled:opacity-50 text-gray-800 disabled:text-gray-500 font-bold py-2.5 md:py-3 px-3 md:px-4 rounded-lg text-sm md:text-base transition border border-gray-300 disabled:border-gray-300"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={() => answered && onComplete(answers)}
              disabled={!answered}
              className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:opacity-50 text-white disabled:text-gray-500 font-bold py-2.5 md:py-3 px-3 md:px-4 rounded-lg text-sm md:text-base transition border border-gray-900 disabled:border-gray-300"
            >
              ✓ Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
