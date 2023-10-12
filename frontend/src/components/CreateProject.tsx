import React, { useState } from 'react'

// do komponenty posíláme useState zajišťující modal okno (open, setModal)
// dále posíláme funkci handleCreateProject (od props handleCreateProject) → přes tu jsou posílány data do Parent komponenty (Dashboard)
const CreateProject: React.FC<{ open: boolean;  setModal: any; handleCreateProject: any;}> = ( {open, setModal, handleCreateProject, } ) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const afterSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // preventDefault zabraňuje tomu aby se po submitu refreshla stránka
    console.log(`Title: ${title}`);
    console.log(`Description: ${description}`);
    await handleCreateProject(title, description)
    setTitle(""); // po odeslání data na server se input vyprázdní
    setDescription("");
  }

  if (!open) return null

  return (
    <div className='absolute bw-border bg-white z-10 xl:w-[25%] lg:w-[288px] h-auto p-10'>
      <button className='absolute top-2 right-2' onClick={setModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-dark stroke-[3px] hover:stroke-grey" fill="none" viewBox="0 0 32 32">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4 L28 28 M4 28 L28 4" />
          {/* <circle cx="12" cy="12" r="10" /> */}
        </svg>
      </button>
      <form onSubmit={afterSubmit} className='flex flex-col items-center gap-3'>
          <label className='text-dark-500' htmlFor='project-title'>Project Title</label>
          <input
            className='p-2.5 w-full bg-navy rounded-xl text-sm'
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
            className='p-2.5 w-full bg-navy rounded-xl text-sm'
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

export default CreateProject