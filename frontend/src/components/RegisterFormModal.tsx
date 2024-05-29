import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerUser } from '../api/registerUser';

interface LoginFormModalProps {
  open: boolean,
  setModal: any,
}

const RegisterFormModal: React.FC<LoginFormModalProps> = ({open, setModal}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registruju uživatele');
    
    // try {
    //   const token = await registerUser(email, password);
    //   localStorage.setItem('token', token.);
    //   navigate('/dashboard')
    // }
    // catch (error) {
    //   console.error('Login failed', error);
    // }
  }


  if (!open) return null
  return (
    <div className='absolute bw-border bg-white z-10 xl:w-[25%] lg:w-[288px] h-auto p-10 shadow-3xl'>
      <button className='absolute w-8 h-8 top-2 right-2' onClick={setModal}>
        <FontAwesomeIcon icon="xmark" size='2xl'/>
      </button>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label className='text-dark-500' htmlFor='user-email'>Email</label>
          <input
            className='p-2.5 w-full bg-grey border-navy rounded-xl text-sm text-black font-bold'
            type='text'
            id='user-email'
            value={email}
          />
          <label className='text-dark-500' htmlFor='user-password'>Password</label>
          <input
            className='p-2.5 w-full bg-grey border-navy rounded-xl text-sm text-black font-bold'
            type='text'
            id='user-password'
            value={email}
          />
      </form>
    </div>
  )

}


export default RegisterFormModal;