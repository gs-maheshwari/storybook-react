import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TaskData } from '../types';

import { Task } from './Task';

export default {
    component: Task,
    title: 'Task'
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}></Task>;

export const Default  = Template.bind({});

export const DefaultArgs: TaskData = {
    id: 1,
    title: 'Test Task',
    state: 'TASK_INBOX',
    completed: false
} as const;

Default.args = {...DefaultArgs};


export const Pinned  = Template.bind({});

Pinned.args = {
    ...Default.args,
    state: 'TASK_PINNED' 
}

export const Archieved  = Template.bind({});

Archieved.args = {
    ...Default.args,
    completed: true,
    state: 'TASK_ARCHIVED' 
}