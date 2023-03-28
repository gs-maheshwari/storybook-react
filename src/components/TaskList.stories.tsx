import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TaskData, TaskEvents } from '../types';
import { TaskListProps } from '../types/taskList';
import { Default as TaskDefaultStory } from './Task.stories';
import { TaskList } from './TaskList';

export default {
     component: TaskList,
     title: 'TaskList',
     decorators: [story => <div style={{ padding: '3rem' }}>{story()}</div>]
} as ComponentMeta<typeof TaskList>;

const Template: ComponentStory<typeof TaskList> = (args: TaskListProps & TaskEvents) => <TaskList {...args}></TaskList>;

export const Default = Template.bind({});

const defaultTask = TaskDefaultStory.args as TaskData;

Default.args = {
    tasks: [
        { ...defaultTask, id: '1', title: 'Task 1' },
        { ...defaultTask, id: '2', title: 'Task 2' },
        { ...defaultTask, id: '3', title: 'Task 3' },
        { ...defaultTask, id: '4', title: 'Task 4' },
        { ...defaultTask, id: '5', title: 'Task 5' },
        { ...defaultTask, id: '6', title: 'Task 6' },
      ],
}

export const Loading = Template.bind({});

Loading.args = {
    loading: true
}

export const Empty = Template.bind({});

Empty.args = {
    loading: false,
    tasks: []
}