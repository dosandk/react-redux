import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '../index';

storiesOf('Input', module)
  .add('Default input', () => (
    <Input/>
  ));
