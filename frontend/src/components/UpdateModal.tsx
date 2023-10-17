import React, { useEffect, useState } from 'react'
import { TProject, TUpdateProject } from '../types/types';


const UpdateModal: React.FC<{ actualProject:TProject | undefined; open: boolean;  setModal: any; handleUpdateProject: any;}> = ({actualProject, open, setModal, handleUpdateProject}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (actualProject) {
      setTitle(actualProject.title || '')
      setDescription(actualProject.description || '')
    }
  }, [actualProject])

  const handleFormSubmit = async (e: React.FormEvent) => {
    setModal() // po submit zavřeme modal
    e.preventDefault();
    const updatedProject : TUpdateProject = {
      title: title,
      description: description
    }
    
    await handleUpdateProject(updatedProject)
    
  }
  
  if (!open) return null
  return (
    <div className='absolute bw-border bg-white z-10 xl:w-[25%] lg:w-[288px] h-auto p-10'>
      <button className='absolute top-2 right-2' onClick={setModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-dark stroke-[3px] hover:stroke-grey" fill="none" viewBox="0 0 32 32">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4 L28 28 M4 28 L28 4" />
        </svg>
      </button>
      <form onSubmit={handleFormSubmit} className='flex flex-col items-center gap-3'>
          <label className='text-dark-500' htmlFor='project-title'>Project Title</label>
          <input
            className='p-2.5 w-full bg-navy rounded-xl text-sm'
            type='text'
            id='project-title'
            value={title}
            placeholder={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          />
          <label htmlFor='project-description'>Project Description</label>
          <textarea
            className='p-2.5 w-full bg-navy rounded-xl text-sm'
            id='project-description'
            rows={9}
            value={description}
            placeholder={description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(event.target.value);
            }}
          />
          <button>Update</button>
        </form>
    </div>
  )
}

export default UpdateModal





  

  

 


    


