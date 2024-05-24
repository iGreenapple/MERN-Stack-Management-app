import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TTask } from '../types/types'

interface TaskCardProps {
  task: TTask
  updateTask: (taskId: string, updates: Partial<TTask>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskCard: React.FC<TaskCardProps> = ({task, updateTask, deleteTask}) => {

  const [title, setTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false); // ukladá zda se title tasku edituje

  const handleTitleUpdate = async () => {
    await updateTask(task._id, { title });
    setIsEditing(false);
    // setTitle(title)
  };

  return (
    <li key={task._id} className='relative bw-border bg-grey p-5 w-[300px] h-[100px] flex justify-center items-center'>
      {isEditing ? (
        <input
          className='font-bold w-full bg-transparent' 
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleUpdate}
          autoFocus
        /> 
      ) : (
        <p className='font-bold' onDoubleClick={() => setIsEditing(true)}>{task.title}</p>
      )}
      {}
      <button>
        <FontAwesomeIcon icon="chevron-right" size='xl' />
      </button>
      <button>
        <FontAwesomeIcon icon="chevron-left" size='xl' />
      </button>
      
      

      {/* <button className='absolute top-2 left-2' onClick={() => updateTask(task._id,{title})}>
        <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.0207 5.82839L15.8491 2.99996L20.7988 7.94971L17.9704 10.7781M13.0207 5.82839L3.41405 15.435C3.22652 15.6225 3.12116 15.8769 3.12116 16.1421V20.6776H7.65669C7.92191 20.6776 8.17626 20.5723 8.3638 20.3847L17.9704 10.7781M13.0207 5.82839L17.9704 10.7781" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/> </svg>
      </button> */}
      <button className='absolute w-6 h-6 top-1 right-1' onClick={() => deleteTask(task._id)}>
        <FontAwesomeIcon icon="xmark" size='xl' className='hover:text-[#ED6E6E]' />
      </button>
    </li>
  )
}

export default TaskCard