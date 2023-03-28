import { TaskData, TaskEvents } from "./task";

export interface TaskListProps extends TaskEvents {
    loading: boolean,
    tasks: TaskData[]
}