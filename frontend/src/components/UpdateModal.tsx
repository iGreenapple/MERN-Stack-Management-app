import React, { useEffect, useState } from 'react'
import { TProject, TUpdateProject } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



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
    <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 bw-border bg-white z-10 xl:w-[25%] lg:w-[288px] h-auto p-10'>
      <button className='absolute w-8 h-8 top-2 right-2' onClick={setModal}>
        <FontAwesomeIcon icon="xmark" size='2xl'/>
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





  

  

 


    


