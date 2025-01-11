import { FormEvent, useState } from 'react'
import { CirclePlus, Trash2 } from 'lucide-react'

export function App() {
  interface Task {
    id: string
    title: string
    isCompleted: boolean
  }

  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  function getCompletedTasks() {
    return tasks.filter((task) => task.isCompleted)
  }

  function onCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (taskName.trim() === '') {
      return
    }

    setTasks((state) => [
      ...state,
      {
        id: crypto.randomUUID(),
        title: taskName.trim(),
        isCompleted: false
      }
    ])

    setTaskName('')
  }

  function handleDeleteTask(taskId: string) {
    setTasks((state) => state.filter((task) => task.id !== taskId))
  }

  function handleCompleteTask(taskId: string) {
    setTasks((state) =>
      state.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: !task.isCompleted
          }
        }

        return task
      })
    )
  }

  return (
    <>
      <header className="h-[200px] bg-gray-700 flex items-center justify-center">
        <img src="/logo.png" alt="Logotipo do ToDo app" draggable={false} />
      </header>
      <main className="w-[736px] mx-auto flex flex-col items-center">
        <form className="w-full flex gap-2 -mt-6" onSubmit={onCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            className="bg-gray-500 flex-1 p-3 rounded placeholder:text-gray-300 text-gray-100 outline-purple-dark"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            maxLength={100}
          />
          <button
            type="submit"
            className="bg-blue-dark text-gray-100 text-sm rounded-md p-3 hover:bg-blue transition-colors duration-200 flex items-center gap-2"
          >
            Criar <CirclePlus size={16} />
          </button>
        </form>

        <div className="w-full mt-10 flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue">Tarefas criadas</span>
              <span className="bg-gray-400 text-gray-200 text-sm px-2 rounded-full">
                {tasks.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple">Tarefas concluídas</span>
              <span className="bg-gray-400 text-gray-200 text-sm px-2 rounded-full">
                {getCompletedTasks().length} de {tasks.length}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-400">
            {tasks.length > 0 ? (
              <div className="mt-6 flex flex-col gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex gap-3 items-center p-3 bg-gray-500 rounded-md"
                  >
                    <button
                      type="button"
                      data-checked={task.isCompleted}
                      className="size-6 rounded-full bg-transparent border-2 border-blue data-[checked=true]:bg-purple data-[checked=true]:border-purple"
                      onClick={() => handleCompleteTask(task.id)}
                    ></button>
                    <p
                      data-checked={task.isCompleted}
                      className="flex-1 text-gray-100 data-[checked=true]:line-through data-[checked=true]:text-gray-300"
                    >
                      {task.title}
                    </p>
                    <button
                      type="button"
                      className="hover:text-danger transition-colors duration-200"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-16 flex flex-col items-center gap-4">
                <img
                  src="/empty-list.png"
                  alt="Ícone para representar lista vazia"
                  draggable={false}
                />
                <p className="text-center">
                  <strong className="block">
                    Você ainda não tem tarefas cadastradas
                  </strong>{' '}
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
