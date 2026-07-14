import { useState } from 'react'

export default function NameScreen({ onSubmit }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    if (!age || age < 6 || age > 18) {
      newErrors.age = 'La edad debe estar entre 6 y 18 años'
    }
    if (!sex) {
      newErrors.sex = 'Selecciona el sexo del niño/a'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      name: name.trim(),
      age: parseInt(age),
      sex
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl">
            <span className="text-2xl">🧠</span>
          </div>
          <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight">
            Test CDS
          </h1>
          <p className="text-sm text-gray-400 font-normal">
            Escala de Depresión para Niños
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Lang & Tisher
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Nombre */}
          <div>
            <label className="block text-sm text-gray-300 mb-3 font-medium">
              Nombre del paciente
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: '' })
              }}
              placeholder="Juan Pérez"
              className="w-full px-4 py-3 text-white placeholder-gray-600 bg-slate-700 border-0 border-b-2 border-slate-600 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors rounded-lg rounded-b-none"
              autoFocus
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-2">{errors.name}</p>
            )}
          </div>

          {/* Edad */}
          <div>
            <label className="block text-sm text-gray-300 mb-3 font-medium">
              Edad (6-18 años)
            </label>
            <input
              type="number"
              min="6"
              max="18"
              value={age}
              onChange={(e) => {
                setAge(e.target.value)
                if (errors.age) setErrors({ ...errors, age: '' })
              }}
              placeholder="12"
              className="w-full px-4 py-3 text-white placeholder-gray-600 bg-slate-700 border-0 border-b-2 border-slate-600 focus:outline-none focus:border-blue-500 focus:ring-0 transition-colors rounded-lg rounded-b-none"
            />
            {errors.age && (
              <p className="text-red-400 text-xs mt-2">{errors.age}</p>
            )}
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm text-gray-300 mb-4 font-medium">
              Sexo
            </label>
            <div className="flex gap-3">
              {[
                { value: 'M', label: 'Masculino' },
                { value: 'F', label: 'Femenino' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSex(option.value)
                    if (errors.sex) setErrors({ ...errors, sex: '' })
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all ${
                    sex === option.value
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {errors.sex && (
              <p className="text-red-400 text-xs mt-2">{errors.sex}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-lg text-base transition-all mt-10 shadow-lg shadow-blue-500/50"
          >
            Comenzar Evaluación
          </button>
        </form>

        {/* Info */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="space-y-3 text-xs text-gray-400">
            <p className="font-semibold text-gray-300 mb-4">Características:</p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-400">✓</span>
                <span>66 preguntas de screening psicológico</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">✓</span>
                <span>Duración aproximada: 5-10 minutos</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">✓</span>
                <span>Análisis detallado por categorías</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">✓</span>
                <span>Exportar en PDF con todas las métricas</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>Herramienta clínica de screening psicológico</p>
        </div>
      </div>
    </div>
  )
}
