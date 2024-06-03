import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../api/loginUser';
import { TUser } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LoginFormModalProps {
  open: boolean,
  setModal: any,
}

const LoginFormModal: React.FC<LoginFormModalProps> = ({open, setModal}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log(email, password);
      
      const token = await loginUser(email, password);
      localStorage.setItem('token', token);
      navigate('/dashboard')
    }
    catch (error) {
      setError('Login failed');
      console.error(error);
    }
  }

  if (!open) return null
  return (
    <div className='absolute bw-border bg-white z-10 xl:w-[25%] lg:w-[288px] h-auto p-10 shadow-3xl'>
      <button className='absolute w-8 h-8 top-2 right-2' onClick={setModal}>
        <FontAwesomeIcon icon="xmark" size='2xl'/>
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1 className='font-bold text-2xl text-center'>Log in</h1>
      <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit}>
        <label className='text-dark-500' htmlFor='user-email'>Email</label>
        <input
          className='p-2.5 w-full bg-grey border-navy rounded-xl text-sm text-black font-bold'
          type='text'
          id='user-email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className='text-dark-500' htmlFor='user-password'>Password</label>
        <input
          className='p-2.5 w-full bg-grey border-navy rounded-xl text-sm text-black font-bold'
          type='text'
          id='user-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  )

}


export default LoginFormModal;