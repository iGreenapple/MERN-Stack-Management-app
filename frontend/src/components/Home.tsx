import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col gap-10 items-center'>
      <h1 className='home-heading mx-5'>Welcome to the Project management App</h1>
      <div className='flex gap-5'>
        <button>Sign up</button>
        <button>Log In</button>
      </div>
    </div>
  )
}

export default Home