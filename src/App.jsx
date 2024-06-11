import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [quote, setQuote] = useState('')

  async function handleQuote() {
    await fetch('https://api.kanye.rest')
      .then((res) => res.json())
      .then((data) => setQuote(data.quote))
      .catch((e) => console.error(e))
  }

  return (
    <>
      <Navbar />
      <div className='dark:text-white text-center flex items-center flex-col space-y-14 mt-28'>
        <h1 className='font-bold text-3xl'>Quote Generator</h1>
        <p className='max-w-sm md:max-w-3xl lg:max-w-4xl'>
          {quote ? quote : 'Click the button below to generate a quote'}
        </p>
        <button
          onClick={handleQuote}
          className='font-semibold rounded-full bg-blue-500 hover:bg-blue-600 px-5 py-2 mt-10'>
          Generate
        </button>
      </div>
    </>
  )
}

export default App
