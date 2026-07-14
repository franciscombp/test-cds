import { useState } from 'react'
import NameScreen from './components/NameScreen'
import TestForm from './components/TestForm'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const [screen, setScreen] = useState('name')
  const [childName, setChildName] = useState('')
  const [answers, setAnswers] = useState({})

  const handleNameSubmit = (name) => {
    setChildName(name)
    setScreen('test')
  }

  const handleTestComplete = (answers) => {
    setAnswers(answers)
    setScreen('results')
  }

  const handleRestart = () => {
    setChildName('')
    setAnswers({})
    setScreen('name')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {screen === 'name' && (
        <NameScreen onSubmit={handleNameSubmit} />
      )}
      {screen === 'test' && (
        <TestForm childName={childName} onComplete={handleTestComplete} />
      )}
      {screen === 'results' && (
        <ResultsScreen
          childName={childName}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
