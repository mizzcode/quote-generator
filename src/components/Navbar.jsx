import { useState, useEffect } from 'react'
import sunIcon from '../assets/sun-svgrepo-com.svg'
import moonIcon from '../assets/moon-stars-svgrepo-com.svg'
import darkGithubIcon from '../assets/github-dark-svgrepo-com.svg'
import lightGithubIcon from '../assets/github-light-svgrepo-com.svg'

function Navbar() {
  const darkTheme = JSON.parse(localStorage.getItem('darkTheme'))

  const [isDarkMode, setIsDarkMode] = useState(darkTheme ?? false)

  function handleMode() {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('darkTheme', JSON.stringify(!isDarkMode))
  }

  useEffect(() => {
    if (darkTheme || (!('darkTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('bg-oldBlue')
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('bg-oldBlue')
      setIsDarkMode(false)
    }
  }, [darkTheme])

  return (
    <nav className='flex items-center dark:text-white sticky top-0 border-b dark:border-[#192032] pt-6 pb-4 bg-transparent backdrop-blur-sm'>
      <a href='/' className='me-auto ms-7'>
        <span>quote-generator.netlify.app</span>
      </a>
      <ul className='flex  text-sm font-semibold'>
        <li className='me-10 hover:text-[#0ea5e9]'>
          <a href='#'>Home</a>
        </li>
        <li className='me-10 hover:text-[#0ea5e9]'>
          <a href='#'>About</a>
        </li>
      </ul>
      <div className='flex space-x-6 me-7'>
        <button onClick={handleMode}>
          <img src={isDarkMode ? moonIcon : sunIcon} alt='mode' />
        </button>
        <button>
          <a href='https://github.com/mizzcode' target='_blank' rel='noopener noreferrer'>
            <img src={isDarkMode ? darkGithubIcon : lightGithubIcon} alt='github' />
          </a>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
