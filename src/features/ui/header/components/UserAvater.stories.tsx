import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserAvatar } from './';

export default {
  title: 'Features/ui/header/UserAvatar',
  component: UserAvatar,
  // argTypes: {
  //   image: undefined,
  // },
} as ComponentMeta<typeof UserAvatar>;

const Template: ComponentStory<typeof UserAvatar> = (args) => (
  <UserAvatar {...args} />
);

export const Default = Template.bind({});

export const Image = Template.bind({});
Image.args = {
  image:
    'https://raw.githubusercontent.com/RimlTempest/favdev/develop/public/icon-512x512.png?token=GHSAT0AAAAAAB45LSGUCN5H2GCOYFAPDNDCY53DRHA',
};
