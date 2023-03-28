
export type TaskId = number | string;

export interface TaskEvents {
    onArchiveTask: (id: TaskId) => void,
    onPinTask: (id: TaskId) => void
}

export interface TaskData {
    id: TaskId,
    title: string,
    state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED'
}