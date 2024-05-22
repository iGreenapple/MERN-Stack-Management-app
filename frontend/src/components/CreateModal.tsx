import React, { useState } from 'react'
import useProjects from '../hooks/useProjects';

const CreateModal: React.FC<{ open: boolean;  setModal: any}> = ( {open, setModal } ) => {

  const { handleCreateProject } = useProjects()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // preventDefault zabraňuje tomu aby se po submitu refreshla stránka
    await handleCreateProject(title, description)
    setTitle(""); // po odeslání data na server se input vyprázdní
    setDescription("");
    setModal(!open);
  }
  
  if (!open) return null
  return (
    <div className='absolute bw-border bg-white z-10 xl:w-[25%] lg:w-[288px] h-auto p-10 shadow-3xl'>
      <button className='absolute top-2 right-2' onClick={() => {setModal(!open)}}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-dark stroke-[3px] hover:stroke-grey" fill="none" viewBox="0 0 32 32">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4 L28 28 M4 28 L28 4" />
        </svg>
      </button>
      <form onSubmit={handleFormSubmit} className='flex flex-col items-center gap-3 '>
          <label className='text-dark-500' htmlFor='project-title'>Project Title</label>
          <input
            className='p-2.5 w-full bg-grey border-navy rounded-xl text-sm text-black font-bold'
            type='text'
            id='project-title'
            value={title}
            placeholder='e.g. "Build a house'
            // v ts je třeba specifikovat o jaký druh eventu se jedná a pro jaký element
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          />
          <label htmlFor='project-description'>Project Description</label>
          <textarea
            className='p-2.5 w-full bg-grey border-black rounded-xl text-sm text-black font-bold'
            id='project-description'
            rows={9}
            value={description}
            placeholder='Describe your project'
            // v ts je třeba specifikovat o jaký druh eventu se jedná a pro jaký element
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(event.target.value);
            }}
          />
          <button>Create</button>
        </form>
    </div>
  )
}

export default CreateModal