import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registerUser } from '../api/registerUser';

interface LoginFormModalProps {
  open: boolean,
  setModal: any,
  setLoginModal: any,
}

const RegisterFormModal: React.FC<LoginFormModalProps> = ({open, setModal, setLoginModal}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registruju uživatele');
    
    try {
      await registerUser(email, password);
      setModal();
      setLoginModal();
    }
    catch (error) {
      console.error('Registration failed', error);
    }
  }

  if (!open) return null
  return (
    <div className='absolute bw-border bg-white z-10 xl:w-[25%] lg:w-[288px] h-auto p-10 shadow-3xl'>
      <button className='absolute w-8 h-8 top-2 right-2' onClick={setModal}>
        <FontAwesomeIcon icon="xmark" size='2xl'/>
      </button>
      <h1 className='font-bold text-2xl text-center'>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit}>
        <label className='text-dark-500' htmlFor='user-email'>Email</label>
          <input
            className='p-2.5 w-full bg-grey border-navy rounded-xl text-sm text-black font-bold'
            type='email'
            id='user-email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className='text-dark-500' htmlFor='user-password'>Password</label>
          <input
            className='p-2.5 w-full bg-grey border-navy rounded-xl text-sm text-black font-bold'
            type='password'
            id='user-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='border' type="submit">Registrovat</button>
      </form>
    </div>
  )

}

export default RegisterFormModal;