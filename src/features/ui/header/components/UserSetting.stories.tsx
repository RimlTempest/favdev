import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserSetting } from './';
import { Session } from 'next-auth';

export default {
  title: 'Features/ui/header/UserSetting',
  component: UserSetting,
  // argTypes: {
  //   isSession: undefined,
  //   signIn: () => undefined,
  //   signOut: () => undefined,
  // },
} as ComponentMeta<typeof UserSetting>;

const Template: ComponentStory<typeof UserSetting> = (args) => (
  <UserSetting {...args} />
);

export const Default = Template.bind({});

export const Login = Template.bind({});
Login.args = {
  isSession: {
    user: {
      name: 'Riml',
      email: null,
    },
  } as Session,
  signIn: () => undefined,
  signOut: () => undefined,
};
