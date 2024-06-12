import { useState, useEffect, useRef } from 'react'
import sunIcon from '../assets/sun-svgrepo-com.svg'
import moonIcon from '../assets/moon-stars-svgrepo-com.svg'
import darkGithubIcon from '../assets/github-dark-svgrepo-com.svg'
import lightGithubIcon from '../assets/github-light-svgrepo-com.svg'
import darkMenuDotsIcon from '../assets/hamburger-menu-dots-dark-svgrepo-com.svg'
import lightMenuDotsIcon from '../assets/hamburger-menu-dots-white-svgrepo-com.svg'
import darkCloseIcon from '../assets/close-sm-dark-svgrepo-com.svg'
import lightCloseIcon from '../assets/close-sm-white-svgrepo-com.svg'

function Navbar() {
  const darkTheme = JSON.parse(localStorage.getItem('darkTheme'))

  const [isDarkMode, setIsDarkMode] = useState(darkTheme ?? false)
  const [dialog, setDialog] = useState(false)

  const dialogRef = useRef(null)

  useEffect(() => {
    // Mengecek apakah darkTheme aktif atau jika preferensi sistem adalah tema gelap
    if (darkTheme || (!('darkTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      // Menambahkan kelas 'dark' ke elemen root (html) dan 'bg-oldBlue' ke body jika tema gelap
      document.documentElement.classList.add('dark')
      document.body.classList.add('bg-oldBlue')
      setIsDarkMode(true)
    } else {
      // Menghapus kelas 'dark' dari elemen root (html) dan 'bg-oldBlue' dari body jika tema terang
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('bg-oldBlue')
      setIsDarkMode(false)
    }
  }, [darkTheme]) // Efek ini akan dijalankan ulang jika state 'darkTheme' berubah

  useEffect(() => {
    // Fungsi untuk menangani klik di luar dialog
    function handleClickOutside(event) {
      // Memeriksa apakah dialogRef ada dan apakah klik terjadi di luar elemen dialog
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        // Menutup dialog jika klik terjadi di luar elemen dialog
        setDialog(false)
      }
    }

    // Menambahkan event listener saat dialog terbuka
    if (dialog) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      // Menghapus event listener saat dialog tertutup
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // Cleanup function: menghapus event listener saat komponen unmount atau state dialog berubah
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dialog]) // Efek ini akan dijalankan ulang jika state 'dialog' berubah

  function handleMode() {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('darkTheme', JSON.stringify(!isDarkMode))
  }

  function handleClose() {
    setDialog(!dialog)
  }

  function handleMenuDots() {
    setDialog(true)
  }

  return (
    <>
      <div className='flex items-center border-b dark:border-[#192032] dark:text-white pt-6 pb-4'>
        <a href='/' className='me-auto ms-7'>
          <span>mizz-quote</span>
        </a>
        <nav className='hidden sm:flex'>
          <ul className='flex  text-sm font-semibold'>
            <li className='me-10 hover:text-[#0ea5e9]'>
              <a href='/'>Home</a>
            </li>
            <li className='me-10 hover:text-[#0ea5e9]'>
              <a href='/about'>About</a>
            </li>
          </ul>
        </nav>
        <div className='flex space-x-6 me-4 sm:me-7'>
          <button className='hidden sm:flex' onClick={handleMode}>
            <img src={isDarkMode ? moonIcon : sunIcon} alt='switch-mode' />
          </button>
          <a href='https://github.com/mizzcode' target='_blank' rel='noopener noreferrer'>
            <img src={isDarkMode ? lightGithubIcon : darkGithubIcon} alt='github' />
          </a>
          <button className='sm:hidden' onClick={handleMenuDots}>
            <img src={isDarkMode ? lightMenuDotsIcon : darkMenuDotsIcon} alt='menu-dots' />
          </button>
          {dialog ? (
            <div className='sm:hidden'>
              <div className='fixed -inset-full bg-black/20 backdrop-blur-sm dark:bg-slate-900/80'></div>
              <div
                ref={dialogRef}
                className='fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5'>
                <button className='absolute right-5 top-5' onClick={handleClose}>
                  <img src={isDarkMode ? lightCloseIcon : darkCloseIcon} alt='' />
                </button>
                <ul className='space-y-6'>
                  <li>
                    <a href='/'>Home</a>
                  </li>
                  <li>
                    <a href='/about'>About</a>
                  </li>
                </ul>
                <div className='mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10'>
                  <div className='flex items-center justify-between'>
                    <label htmlFor='theme'>Switch theme</label>
                    <div className='flex gap-5'>
                      <button onClick={handleMode}>
                        <img src={isDarkMode ? moonIcon : sunIcon} alt='darkMode' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
