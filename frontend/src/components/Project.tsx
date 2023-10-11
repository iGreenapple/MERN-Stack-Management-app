import React from 'react'
import { Link } from 'react-router-dom'
import { TProject } from '../types/types'

// Přesnější typová kontrola v komponentě
// tímto typescriptu říkám, že očekávám vlastnost 'data' typu 'TProject' v komponentě Project
const Project: React.FC<{ project: TProject; deleteProjects:() => void }> = ({project, deleteProjects}) => {

  const deleteClick = (event: any) => {
    event.stopPropagation();
    deleteProjects()
  }

  return (
    <div className='relative p-10 w-[250px] h-[100px] bw-border'>
      <button className='absolute top-2 right-2' onClick={deleteClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-red stroke-[3px] hover:stroke-1" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </button>
      <Link  to={`/project/${project._id}`}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </Link>
    </div>
    
    

    // <div className='p-[5px] w-[150px] h-[75px] border rounded flex justify-evenly items-center gap-2'>
    //   <Link to={`/project/${data._id}`}>{data.title}</Link>
    //   <button className='' onClick={() => handleDeleteProject(data._id)}>X</button>
    //   <DeleteButton />
    // </div>
  )
}

const DeleteButton = () => {
  return (
    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full flex items-center justify-end">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default Project