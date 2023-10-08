import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { createProject } from './api/createProjects';
import { getProject, TProject } from './api/getProjects';
import { deleteProject } from './api/deleteProject';

function App() {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [title, setTitle] = useState('')

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault(); // preventDefault zabraňuje tomu aby se po submitu refreshla stránka
    
    // provádění tzv. Optimistic Updates → jedná se o update UI, který předpokládá, že dojde na straně serveru k nějaké změně, takže tu změnu už rovnou provede v UI
    // provedeme ho tak, že si necháme v proměnné project uložit POST request a poté pomocí metody .json vytvoříme lokální proměnou project, kterou přidáme přes setProjects

    const project = await createProject(title);
    setProjects([...projects, project])
    setTitle(""); // po odeslání data na server se input vyprázdní
    
  };
  
  const handleDeleteProject = async (projectId: string) => {
    await deleteProject(projectId)
    //Optimistic Updates - vymazaní projektu i z frontendu → přes setProjects nastavíme seznam na projekty, které splňují podmínku toho, že se nerovnají ID zvolenému projektu
    setProjects(projects.filter((project) => project._id !== projectId))
  }

  // useEffect se spustí při načtení komponenty a načítá data
  useEffect(() => {
    async function fetchProjects() {
      const loadedProjects = await getProject();
      setProjects(loadedProjects)
    }
    fetchProjects();
  }, [])

  return (
    <div className='w-screen flex flex-col justify-center items-center'>
      <form onSubmit={handleCreateProject} className='flex h-full items-center gap-3'>
        <label htmlFor='project-title'>Project Title</label>
        <input 
          id='project-title'
          value={title}
          // v ts je třeba specifikovat o jaký druh eventu se jedná a pro jaký element
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <button>Create Project</button>
      </form>
      <div className="projects flex flex-wrap gap-4">
        {
          projects.map((project : TProject) => {
            return (
              <div key={project._id} className='p-[5px] w-[150px] h-[75px] border rounded flex justify-evenly items-center gap-2'>
                <Link to={`/project/${project._id}`}>{project.title}</Link>
                <button className='' onClick={() => handleDeleteProject(project._id)}>X</button>
              </div>
              
            )
          })
        }
      </div>
    </div>
  )
}

export default App
