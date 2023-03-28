export interface TaskProps {
    id: number,
    title: string,
    state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED',
    onArchiveTask: (id: number) => void,
    onPinTask: (id: number) => void
}