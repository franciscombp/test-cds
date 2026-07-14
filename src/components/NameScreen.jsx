import { useState } from 'react'

export default function NameScreen({ onSubmit }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Por favor ingresa el nombre del niño/a')
      return
    }
    onSubmit(name.trim())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 mb-6">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 mb-4">
              <span className="text-4xl">📋</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
              Test CDS
            </h1>
            <p className="text-gray-600 text-lg font-semibold">
              Escala de Depresión para Niños
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Lang & Tisher
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-gray-800 mb-3">
                👤 Nombre del niño/a
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="Ej: Juan Pérez"
                className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition bg-gray-50"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 font-semibold">✗ {error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 md:py-4 px-6 rounded-xl text-lg transition transform hover:scale-105 active:scale-95 shadow-lg"
            >
              ▶ Comenzar Test
            </button>
          </form>
        </div>

        {/* Instructions Card */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-blue-600">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📌 Instrucciones</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>El test consta de <strong>66 preguntas</strong> sobre los sentimientos del niño/a</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Escala: <strong>1 a 5</strong> (Muy en desacuerdo a Muy de acuerdo)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Tiempo estimado: <strong>5-10 minutos</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Puedes navegar hacia <strong>atrás y adelante</strong></span>
            </li>
          </ul>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-blue-100 text-sm">
          <p>Herramienta de screening psicológico</p>
          <p className="text-blue-200 mt-1">Para uso profesional</p>
        </div>
      </div>
    </div>
  )
}
