import { StoryFn } from '@storybook/react-webpack5';
import React, { ComponentProps } from 'react';
import RadioList from '../components/elements/RadioList';

export default {
  title: 'RadioList',
  component: RadioList,
};

const Template: StoryFn<ComponentProps<typeof RadioList>> = args => (
  <RadioList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'choice',
  options: ['alpha', 'beta', 'gamma'],
  value: 'alpha',
  labelMap: {
    alpha: 'Alpha',
    beta: 'Beta',
    gamma: 'Gamma',
  },
  descriptionMap: {
    beta: 'Secondary option.',
    gamma: 'Tertiary option.',
  },
};
