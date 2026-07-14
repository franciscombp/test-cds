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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Test CDS
          </h1>
          <p className="text-sm text-gray-500 font-normal">
            Escala de Depresión para Niños
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Lang & Tisher
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Nombre */}
          <div>
            <label className="block text-sm text-gray-700 mb-3 font-medium">
              Nombre del paciente
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors({ ...errors, name: '' })
                }}
                placeholder="Juan Pérez"
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 focus:ring-0 transition-colors"
                autoFocus
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-2">{errors.name}</p>
            )}
          </div>

          {/* Edad */}
          <div>
            <label className="block text-sm text-gray-700 mb-3 font-medium">
              Edad
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
              placeholder="Ej: 12"
              className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 focus:ring-0 transition-colors"
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-2">{errors.age}</p>
            )}
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm text-gray-700 mb-4 font-medium">
              Sexo
            </label>
            <div className="flex gap-4">
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
                  className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all border ${
                    sex === option.value
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {errors.sex && (
              <p className="text-red-500 text-xs mt-2">{errors.sex}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors mt-10"
          >
            Comenzar Evaluación
          </button>
        </form>

        {/* Info */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="space-y-3 text-xs text-gray-500">
            <p className="font-medium text-gray-600">Características:</p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-gray-300">—</span>
                <span>66 preguntas de screening</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-300">—</span>
                <span>Duración: 5-10 minutos</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-300">—</span>
                <span>Escalas normalizadas por edad y sexo</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-300">—</span>
                <span>Exportar resultados en PDF</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-400">
          <p>Herramienta clínica de screening psicológico</p>
        </div>
      </div>
    </div>
  )
}
