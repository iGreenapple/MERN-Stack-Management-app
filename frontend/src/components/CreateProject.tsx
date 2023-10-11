import React, { useState } from 'react'
import { TProject } from '../types/types';


const CreateProject: React.FC<{ open: boolean; createProject: any; onClose: any }> = ( {open, createProject, onClose} ) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const afterSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // preventDefault zabraňuje tomu aby se po submitu refreshla stránka
    
    createProject(title, description)
    setTitle(""); // po odeslání data na server se input vyprázdní
    setDescription("");
  }
  if (!open) return null

  return (
    <div className='absolute bw-border bg-white z-10'>
      <button className='absolute top-2 right-2' onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-red stroke-[3px] hover:stroke-1" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </button>
      <form onSubmit={afterSubmit} className='p-5 flex flex-col h-full items-center gap-3'>
          <label htmlFor='project-title'>Project Title</label>
          <input
            className='bg-white border-black-3'
            id='project-title'
            value={title}
            // v ts je třeba specifikovat o jaký druh eventu se jedná a pro jaký element
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          />
          <label htmlFor='project-destription'>Project Description</label>
          <textarea
            className='bg-white border-3'
            id='project-destription'
            value={description}
            // v ts je třeba specifikovat o jaký druh eventu se jedná a pro jaký element
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(event.target.value);
            }}
          />
          <button>Create Project</button>
        </form>
    </div>
  )
}

export default CreateProject