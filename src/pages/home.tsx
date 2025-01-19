import { FormEvent, useEffect, useState } from 'react'
import { CirclePlus } from 'lucide-react'
import { Header, Task, ITask } from '../components'
import { LocalStorage } from '../services/local-storage'
import { toast } from '../utils/toast'

export function Home() {
  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState<ITask[]>(() => {
    return LocalStorage.tasks.get()
  })

  function getCompletedTasks() {
    return tasks.filter((task) => task.isCompleted)
  }

  function onCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (taskName.trim() === '') {
      toast.error('Por favor, insira uma tarefa')
      return
    }

    setTasks((state) => {
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: taskName.trim(),
          isCompleted: false
        }
      ]
    })

    setTaskName('')
  }

  useEffect(() => {
    LocalStorage.tasks.set(tasks)
  }, [tasks])

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
      <Header />
      <main className="w-[736px] mx-auto flex flex-col items-center pb-4">
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
                  <Task
                    key={task.id}
                    task={task}
                    handleCompleteTask={handleCompleteTask}
                    handleDeleteTask={handleDeleteTask}
                  />
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
