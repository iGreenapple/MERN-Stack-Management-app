import React, { useEffect, useState } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('')

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault(); // preventDefault zabraňuje tomu aby se po submitu refreshla stránka
    await fetch('http://localhost:5000/project', {
      method: 'POST',
      body: JSON.stringify({
        title
      }),
      headers: {
        "Content-Type": "application/json", // zde určujeme datový typ obsahu body (vtp na JSON)
      },
    });
    setTitle(""); // po odeslání data na server se input vyprázdní
  };
  // useEffect se spustí při načtení komponenty
  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch('http://localhost:5000/project'); // z fetch dostáváme Response, kterou musíme ještě převést na objekt
      
      const loadedProjects = await response.json(); // převedení na objekt
      
      setProjects(loadedProjects)
    }
    fetchProjects();
  }, [])

  return (
    <div className='w-screen flex flex-col justify-center items-center'>
      <form onSubmit={handleCreateProject}>
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
          projects.map((project) => {
            return (
              <div key={project._id} className='p-[5px] border rounded'>
                {project.title}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
