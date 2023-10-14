
import { useEffect, useState } from 'react'
import { getProject } from '../api/getProject'

import { TProject  } from '../types/types';
import { TTask } from '../types/types';
import { useParams } from 'react-router-dom';

const ProjectBoard = () => {
  // název proměnné v useParams, musí odpovídat názvu v url adrese /project/:projectId → const { projectId }
  const { projectId } = useParams<{ projectId: string }>();
  // zajištění aby hodnota co posíláme do getProject() byl vždy string
  // Typescript totiž předpokládá, že z useParams můžeme dostat string nebo nic (undefined)
  // více přístupů na https://bobbyhadz.com/blog/typescript-argument-type-undefined-not-assignable-parameter-type-string
  const openedProjectId = projectId !== undefined ? projectId : ""
  
  const [project, setProject] = useState<TProject>();

  useEffect(()=> {
    const fetchProject = async () => {
      const loadedProject = await getProject(openedProjectId);
      setProject(loadedProject)
    }
    fetchProject()
  }, [])

  return (
    <div className='bw-border w-full h-[80%] p-10'>
      <h1 className='font-bold text-3xl mb-5'>{project?.title}</h1>
      <p className='box line-clamp-4 mb-5'>{project?.description}</p>
      <ul className=''>
        {project?.tasks.map((task ) => (
          <li className='bw-border'
          >{task}</li>
        )
          
      )}
        <form className='flex justify-center'>
          <input className='w-full h-10 text-center' type="text" name='newTask' placeholder='Name of new task'/>
        </form>
      </ul>
      
    </div>
  )
}

export default ProjectBoard;