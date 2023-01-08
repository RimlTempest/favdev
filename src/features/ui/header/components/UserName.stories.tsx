import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserName } from './';

export default {
  title: 'Features/ui/header/UserName',
  component: UserName,
  // argTypes: {
  //   name: undefined,
  // },
} as ComponentMeta<typeof UserName>;

const Template: ComponentStory<typeof UserName> = (args) => (
  <UserName {...args} />
);

export const Default = Template.bind({});

export const Login = Template.bind({});
Login.args = {
  name: 'Riml',
};
