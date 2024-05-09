import React from 'react'
import { Link } from 'react-router-dom'
import { TProject } from '../types/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <button className='absolute w-8 h-8 top-2 right-2' onClick={() => deleteClick(project._id)}>
        <FontAwesomeIcon icon="xmark" size='xl' className='hover:text-[#ED6E6E]' />
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