import { useEffect, useState } from 'react';

import Project from './Project';

import { getProject } from '../api/getProjects';
import { createProject } from '../api/createProjects';
import { deleteProject } from '../api/deleteProject';

import { TProject } from '../types/types';
import CreateProject from './CreateProject';


const Dashboard = () => {
  const [projects, setProjects] = useState<TProject[]>([]);

  const [createModal, setCreateModal] = useState(false)

  // useEffect se spustí při načtení komponenty a načítá data
  useEffect(() => {
    async function fetchProjects() {
      const loadedProjects = await getProject();
      setProjects(loadedProjects)
    }
    fetchProjects();
  }, [])

  const handleCreateProject = async (e: React.FormEvent, title: string, description: string) => {
    console.log("creating...");
    
    // provádění tzv. Optimistic Updates → jedná se o update UI, který předpokládá, že dojde na straně serveru k nějaké změně, takže tu změnu už rovnou provede v UI
    // provedeme ho tak, že si necháme v proměnné project uložit POST request a poté pomocí metody .json vytvoříme lokální proměnou project, kterou přidáme přes setProjects
    const project = await createProject(title, description);
    setProjects([...projects, project])
  };

  const handleDeleteProject = async (projectId: string) => {
    await deleteProject(projectId)
    //Optimistic Updates - vymazaní projektu i z frontendu → přes setProjects nastavíme seznam na projekty, které splňují podmínku toho, že se nerovnají ID zvolenému projektu
    setProjects(projects.filter((project) => project._id !== projectId))
  }

  return (
    <div className="relative w-screen h-full flex flex-auto flex-col items-center justify-evenly gap-5">
      <button 
        className='absolute p-2 top-5 right-5 border-black border-2 rounded-full'
        onClick={() => setCreateModal(true)}>
        Create
      </button>
      <CreateProject open={createModal} onClose={() => setCreateModal(!createModal)} createProject={handleCreateProject} />
      
      <div className='flex flex-wrap justify-center gap-4 text-center'>
        {
          projects.map((project : TProject) => (
            <Project 
              key={project._id}
              project={project}
              deleteProjects={() => handleDeleteProject(project._id)}
            />
          ))
        }
      </div>
      
    </div>
  )
}

export default Dashboard