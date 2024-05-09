import React from 'react'
import { TTask } from '../types/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProjectBoardColumn: React.FC<{ tasks: TTask[] | undefined; heading: string; deleteTask: any; createTask: any}> = ({tasks, heading, deleteTask, createTask}) => {

  const handleCreateClick = (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
    
  }

  return (
    <ul className='flex flex-col gap-3 justify-start items-center'>
      <h3 className='font-bold text-2xl'>{heading}</h3>
      {tasks?.map((task : TTask) => 
      <li key={task._id} className='relative bw-border bg-red p-5 w-full h-[100px] text-center'>
        <p className='font-bold'>{task.title}</p>
        <p>{task._id}</p>
        <button className='absolute w-6 h-6 top-2 right-2' onClick={() => deleteTask(task._id)}>
          <FontAwesomeIcon icon="xmark" size='xl' className='hover:text-[#ED6E6E]' />
        </button>
      </li>
      )}
      <form className='w-full mt-auto bg-none' onSubmit={handleCreateClick}>
          <input className='bg-none w-full h-10 text-center rounded-xl' type="text" placeholder='Add new task' />
          <input type="submit" hidden />
      </form>
    </ul>
  )
}

export default ProjectBoardColumn