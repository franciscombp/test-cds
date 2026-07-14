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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex flex-col p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">Test CDS</h1>
        <p className="text-blue-100 text-sm md:text-base font-semibold">{childName}</p>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-sm font-semibold">
            Pregunta {currentQuestion + 1} de {CDS_QUESTIONS.length}
          </span>
          <span className="text-blue-100 text-sm font-semibold">{progress}%</span>
        </div>
        <div className="w-full bg-blue-300 bg-opacity-50 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all duration-300 shadow-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content - Flex to fill space */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6 flex flex-col flex-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8 leading-tight">
            {question.question}
          </h2>

          {/* Response Options */}
          <div className="space-y-2.5 md:space-y-3 flex-1 flex flex-col justify-center">
            {RESPONSE_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-3 md:p-4 text-base md:text-lg font-semibold rounded-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-between group ${
                  answers[question.id] === option.value
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl scale-105'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <span className="flex-1 text-left">{option.label}</span>
                <span className={`text-xs md:text-sm font-bold ml-3 rounded-full w-8 h-8 flex items-center justify-center ${
                  answers[question.id] === option.value
                    ? 'bg-white text-blue-600'
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
            className="flex-1 bg-white hover:bg-blue-50 disabled:bg-gray-300 disabled:opacity-50 text-gray-800 disabled:text-gray-500 font-bold py-2.5 md:py-3 px-3 md:px-4 rounded-xl text-sm md:text-base transition"
          >
            ← Anterior
          </button>

          {currentQuestion < CDS_QUESTIONS.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!answered}
              className="flex-1 bg-white hover:bg-blue-50 disabled:bg-gray-300 disabled:opacity-50 text-gray-800 disabled:text-gray-500 font-bold py-2.5 md:py-3 px-3 md:px-4 rounded-xl text-sm md:text-base transition"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={() => answered && onComplete(answers)}
              disabled={!answered}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:opacity-50 text-white disabled:text-gray-500 font-bold py-2.5 md:py-3 px-3 md:px-4 rounded-xl text-sm md:text-base transition"
            >
              ✓ Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
