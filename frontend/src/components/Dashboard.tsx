import Project from './Project';
import CreateModal from './CreateModal';

import { TProject } from '../types/types';

import useProjects from '../hooks/useProjects';

const Dashboard = () => {
  // použité useState a handlery načítáme z vlastního hooku useProjects
  const { projects, openModal, toggleModal, handleCreateProject, handleDeleteProject } = useProjects();

  return (
    <div className="relative w-screen h-full flex flex-auto flex-col items-center justify-evenly gap-5">
      <button className='absolute p-2 top-5 right-5 text-lg border-black border-2 rounded-full'
        onClick={toggleModal} // Použijeme toggleModal místo přímého nastavení stavu 
      >
        {/* DOHLEDAT MÍSTO SVG free IKONU */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-dark stroke-[3px]" fill="none" viewBox="0 0 40 40">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 0 L20 40 M0 20 L40 20" />
        </svg>
      </button>
      <CreateModal open={openModal} setModal={toggleModal} handleCreateProject={handleCreateProject} />
      <div className='flex flex-wrap justify-center gap-8 text-center'>
        {
          projects.map((project : TProject) => (
            <Project 
              key={project._id}
              project={project}
              deleteProjects={handleDeleteProject}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard