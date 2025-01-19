import { Check, Trash2 } from 'lucide-react'

export interface ITask {
  id: string
  title: string
  isCompleted: boolean
}

interface TaskProps {
  task: ITask
  handleCompleteTask: (taskId: string) => void
  handleDeleteTask: (taskId: string) => void
}

export function Task({
  task: { id, title, isCompleted },
  handleCompleteTask,
  handleDeleteTask
}: TaskProps) {
  return (
    <div className="flex gap-3 items-center p-3 bg-gray-500 rounded-md">
      <button
        type="button"
        data-checked={isCompleted}
        className="size-6 rounded-full bg-transparent border-2 border-blue data-[checked=true]:bg-purple data-[checked=true]:border-purple"
        onClick={() => handleCompleteTask(id)}
      >
        {isCompleted && <Check size={20} className="text-white" />}
      </button>
      <p
        data-checked={isCompleted}
        className="flex-1 text-gray-100 data-[checked=true]:line-through data-[checked=true]:text-gray-300"
      >
        {title}
      </p>
      <button
        type="button"
        className="hover:text-danger transition-colors duration-200"
        onClick={() => handleDeleteTask(id)}
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}
