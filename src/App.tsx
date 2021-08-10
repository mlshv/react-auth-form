import { useCallback, useState } from 'react'
import AuthForm, { AuthFormValues } from './components/AuthForm/AuthForm'
import { NetworkError, ValidationError } from './errors'

async function mockSubmitResponse() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  const responses = [
    () => {
      // ok
    },
    () => {
      throw new NetworkError()
    },
    () => {
      throw new ValidationError('Incorrect login or password')
    },
    () => {
      throw new Error('Woops!')
    },
  ]

  const randomResponseIndex = Math.floor(Math.random() * responses.length)

  return responses[randomResponseIndex]()
}

function App() {
  const [email, setEmail] = useState<string>()

  const handleSubmit = useCallback(async (values: AuthFormValues) => {
    await mockSubmitResponse()

    setEmail(values.email)
  }, [])

  return (
    <div className="App" style={{ width: 300, margin: '0 auto' }}>
      {email ? (
        <div>
          <p>Logged in as {email}</p>
          <button onClick={() => setEmail(undefined)}>Log out</button>
        </div>
      ) : (
        <AuthForm onSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default App
