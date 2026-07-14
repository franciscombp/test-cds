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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <p className="text-lg text-indigo-600 font-semibold">
              Test CDS - {childName}
            </p>
            <p className="text-sm text-gray-600">
              Pregunta {currentQuestion + 1} de {CDS_QUESTIONS.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-relaxed">
            {question.question}
          </h2>

          {/* Response Options */}
          <div className="space-y-4">
            {RESPONSE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-6 text-lg font-semibold rounded-lg transition transform hover:scale-105 active:scale-95 ${
                  answers[question.id] === option.value
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg text-lg transition disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {currentQuestion < CDS_QUESTIONS.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!answered}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg text-lg transition disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={() => answered && onComplete(answers)}
              disabled={!answered}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg text-lg transition disabled:cursor-not-allowed"
            >
              Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
