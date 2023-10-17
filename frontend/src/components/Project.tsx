import React from 'react'
import { Link } from 'react-router-dom'
import { TProject } from '../types/types'

// Přesnější typová kontrola v komponentě
// tímto typescriptu říkám, že očekávám vlastnost 'data' typu 'TProject' v komponentě Project
const Project: React.FC<{ project: TProject; deleteProjects: any}> = ({project, deleteProjects}) => {

  const deleteClick = (projectId: string) => {
    deleteProjects(projectId)
  }
  // limitace délky zobrazeného description
  // const maxDescriptionLength = 100
  // const truncatedDescription = project.description.length > maxDescriptionLength
  //   ? `${project.description.substring(0, maxDescriptionLength)}...`
  //   : project.description

  return (
    <div className='relative p-7 w-[330px] h-auto bw-border shadow-3xl'>
      <button className='absolute top-2 right-2' onClick={() => deleteClick(project._id)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-grey stroke-[2px] hover:stroke-[3px] hover:stroke-red" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 19 L19 5 M5 5 L19 19" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </button>
      <Link className='flex flex-col gap-3 text-left hover:text-navy' 
        to={`/project/${project._id}`}>
        <h3 className='font-bold text-lg line-clamp-1'>{project.title}</h3>
        <p className='line-clamp-4'>{project.description}</p>
      </Link>
    </div>

  )
}  
export default Project