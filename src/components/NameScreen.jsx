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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow p-8 mb-6 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Test CDS
            </h1>
            <p className="text-gray-600 text-sm">
              Escala de Depresión para Niños (Lang & Tisher)
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del niño/a
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="Ej: Juan Pérez"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition bg-white"
                autoFocus
              />
              {error && (
                <p className="text-red-600 text-xs mt-1.5 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded text-sm transition"
            >
              Comenzar Test
            </button>
          </form>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Instrucciones</h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-start">
              <span className="font-bold mr-3 text-gray-400">•</span>
              <span><strong>66 preguntas</strong> sobre sentimientos y emociones</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-3 text-gray-400">•</span>
              <span>Escala: 1 a 5 puntos por respuesta</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-3 text-gray-400">•</span>
              <span>Duración aproximada: 5-10 minutos</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-3 text-gray-400">•</span>
              <span>Navegación libre entre preguntas</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>Herramienta clínica de screening psicológico</p>
        </div>
      </div>
    </div>
  )
}
