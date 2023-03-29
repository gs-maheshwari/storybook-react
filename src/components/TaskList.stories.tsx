import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TaskData } from '../types';
import { Default as TaskDefaultStory } from './Task.stories';
import { TaskList } from './TaskList';


import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { TaskListState } from '../lib/store';


const defaultTask = TaskDefaultStory.args as TaskData;

export const MockedState : TaskListState= {
  tasks: [
    { ...defaultTask, id: '1', title: 'Task 1', completed: false },
    { ...defaultTask, id: '2', title: 'Task 2', completed: false },
    { ...defaultTask, id: '3', title: 'Task 3', completed: false },
    { ...defaultTask, id: '4', title: 'Task 4', completed: false },
    { ...defaultTask, id: '5', title: 'Task 5', completed: false },
    { ...defaultTask, id: '6', title: 'Task 6', completed: false },
  ],
  status: 'idle' as const,
  error: null,
};

export default {
     component: TaskList,
     title: 'TaskList',
     decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>],
     excludeStories: /.*MockedState$/
} as ComponentMeta<typeof TaskList>;

const Template: ComponentStory<typeof TaskList> = () => <TaskList></TaskList>;

const MockStore = ({ taskListState, children }: { taskListState: TaskListState, children: React.ReactNode}) => {
    return (
        <Provider store={configureStore({
            reducer: {
                taskList: createSlice({
                    name: 'taskList',
                    initialState: taskListState,
                    reducers: {
                        updateTaskState: (state, action) =>{
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
                }).reducer
            }

        })}  >{children}</Provider>
    )
}


export const Default = Template.bind({});

Default.decorators = [(story) => <MockStore taskListState={MockedState}>{story()}</MockStore> ]


export const WithPinnedTasks = Template.bind({});

WithPinnedTasks.decorators = [(story) => {
    const pinnedTasks: TaskData[] = [
        ...MockedState.tasks.slice(0,5),
        { id: '7', title: 'Pinned Task', state: 'TASK_PINNED', completed: false}
    ]

    return (<MockStore taskListState={{...MockedState, tasks: pinnedTasks}}>{story()}</MockStore>)
}]


export const Loading = Template.bind({});

Loading.decorators= [(story) => <MockStore taskListState={{ ...MockedState, status: 'loading'}} >{story()}</MockStore>]

export const Empty = Template.bind({});

Empty.decorators = [(story) => <MockStore taskListState={{ tasks: [], status: 'success', error: null }}>{story()}</MockStore>]