
import Inbox from './Inbox';
import store from '../lib/store';

import { Provider } from 'react-redux';
import { ComponentMeta } from '@storybook/react';

export default {
  component: Inbox,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof Inbox>;

const Template = () => <Inbox />;

export const Default = Template.bind({});
export const Error = Template.bind({});