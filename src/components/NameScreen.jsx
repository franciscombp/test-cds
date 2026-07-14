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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">
          Test CDS
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Escala de Depresión para Niños
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Nombre del niño/a:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              placeholder="Ingresa el nombre"
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition transform hover:scale-105 active:scale-95"
          >
            Comenzar Test
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">
            <strong>Instrucción:</strong> Este test consta de 18 preguntas sobre los sentimientos del niño/a.
            Lee cada pregunta con atención y marca la respuesta que mejor describe su situación.
          </p>
        </div>
      </div>
    </div>
  )
}
