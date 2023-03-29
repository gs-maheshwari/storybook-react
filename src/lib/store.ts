import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskData } from '../types';

export interface TaskListState {
    status: 'idle' | 'loading' | 'success' | 'error',
    tasks: TaskData[],
    error: Object | null
}

const taskInitialState: TaskListState = {
    status: 'idle',
    tasks: [],
    error: null
}

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
        const data = await res.json();
        const result = data.map((task: TaskData) => ({
                id: `${task.id}`,
                title: task.title,
                state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
        }));
        return result;
});

const taskSlice = createSlice({
    name: 'tasklist',
    initialState: taskInitialState,
    reducers: {
        updateTaskState:  (state, action) => {
            const { id: taskId, newTaskState } = action.payload;
            const task = state.tasks.find(({ id }) => id === taskId) as TaskData;
            if(!task){
                return state;
            }

            task.state = newTaskState;
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    task
                }
            }
        }
    },
    extraReducers (builder) {
        builder.addCase(fetchTasks.pending, state => {
            state.status = 'loading';
            state.error = null;
            state.tasks = [];
        }).addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = 'success';
            state.error = null;
            state.tasks = action.payload;
        }).addCase(fetchTasks.rejected, state => {
            state.status = 'error';
            state.tasks = [];
            state.error = 'Something went wrong'
        })
    }
})

export const { updateTaskState } = taskSlice.actions;

const store = configureStore({
    reducer: {
        taskList: taskSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;