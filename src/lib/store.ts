import { configureStore, createSlice } from '@reduxjs/toolkit';
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