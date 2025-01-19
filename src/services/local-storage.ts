import { ITask } from '../components'

const LOCAL_STORAGE_KEY = 'todo-list-app:tasks'

export const LocalStorage = {
  tasks: {
    get(): ITask[] {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY)

      return data ? JSON.parse(data) : []
    },
    set(tasks: ITask[]) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
    }
  }
}
