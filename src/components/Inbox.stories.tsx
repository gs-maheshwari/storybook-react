
import Inbox from './Inbox';
import store from '../lib/store';

import { Provider } from 'react-redux';
import { ComponentMeta, Story } from '@storybook/react';
import { rest } from 'msw';
import { MockedState } from './TaskList.stories';
import { fireEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library';

export default {
  component: Inbox,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof Inbox>;

const Template = () => <Inbox />;

export const Default: Story = Template.bind({});

Default.parameters  = {
    msw: {
        handlers: [
            rest.get('https://jsonplaceholder.typicode.com/todos?userId=1', (req, res, ctx) => {
                return res(ctx.json(MockedState.tasks))
            })
        ]
    }
}

Default.play = async ({ canvasElement }) => {
     const canvas = within(canvasElement);
     await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
     await waitFor(async () => {
        await fireEvent.click(canvas.getByLabelText('pinTask-1'));
        await fireEvent.click(canvas.getByLabelText('pinTask-3'));
    });
};

export const Error: Story = Template.bind({});

Error.parameters = {
    msw: {
        handlers: [
            rest.get('https://jsonplaceholder.typicode.com/todos?userId=1', (req, res, ctx) => {
                return res(ctx.status(403))
            })
        ]
    }
}