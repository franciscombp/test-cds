import { useState } from 'react'
import NameScreen from './components/NameScreen'
import TestForm from './components/TestForm'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const [screen, setScreen] = useState('name')
  const [childData, setChildData] = useState({ name: '', age: null, sex: '' })
  const [answers, setAnswers] = useState({})

  const handleNameSubmit = (data) => {
    setChildData(data)
    setScreen('test')
  }

  const handleTestComplete = (answers) => {
    setAnswers(answers)
    setScreen('results')
  }

  const handleRestart = () => {
    setChildData({ name: '', age: null, sex: '' })
    setAnswers({})
    setScreen('name')
  }

  return (
    <div className="min-h-screen bg-white">
      {screen === 'name' && (
        <NameScreen onSubmit={handleNameSubmit} />
      )}
      {screen === 'test' && (
        <TestForm childData={childData} onComplete={handleTestComplete} />
      )}
      {screen === 'results' && (
        <ResultsScreen
          childData={childData}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
