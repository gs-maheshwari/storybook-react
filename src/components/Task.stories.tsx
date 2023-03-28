import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Task } from './Task';

export default {
    component: Task,
    title: 'Task'
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}></Task>;

export const Default  = Template.bind({});

export const DefaultArgs = {
    id: 1,
    title: 'Test Task',
    state: 'TASK_INBOX' 
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
    state: 'TASK_ARCHIVED' 
}