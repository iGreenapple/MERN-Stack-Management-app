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

  const handleIncreaseStage = async () => {
    if (task.stage < 3) {
      await updateTask(task._id, { stage: task.stage + 1 })
    }
  };
  const handleDecreaseStage = async () => {
    if (task.stage > 1) {
      await updateTask(task._id, { stage: task.stage - 1 })
    }
  };

  return (
    <li key={task._id} className='relative bw-border bg-grey p-5 w-[300px] h-[125px] flex justify-center items-center gap-5'>
      {task.stage > 1 ? (
        <button className='flex-none' onClick={() => handleDecreaseStage()}>
          <FontAwesomeIcon icon="chevron-left" size='xl' className='hover:text-[green]' />
        </button>
      ) : (
        null
      )}
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
        <p className='font-bold mx-auto' onDoubleClick={() => setIsEditing(true)}>{task.title}</p>
      )}
      {task.stage < 3 ? (
        <button className='flex-none' onClick={() => handleIncreaseStage()}>
          <FontAwesomeIcon icon="chevron-right" size='xl' className='hover:text-[green]' />
        </button>
      ) : (
        null
      )}
      <button className='absolute w-6 h-6 top-1 right-1' onClick={() => deleteTask(task._id)}>
        <FontAwesomeIcon icon="xmark" size='xl' className='hover:text-[#ED6E6E]' />
      </button>
    </li>
  )
}

export default TaskCard