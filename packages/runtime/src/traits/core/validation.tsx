import React, { useCallback, useMemo } from 'react';
import { createTrait } from '@meta-ui/core';
import { Static, Type } from '@sinclair/typebox';
import { TraitImplementation } from '../../registry';
import { min } from 'lodash';

type ValidationProps = {
  value: string;
  minLength: number;
  maxLength: number;
};

const useValidationTrait: TraitImplementation<ValidationProps> = ({
  value,
  minLength,
  maxLength,
}) => {
  console.log('validate', value);
  const errorMsg =
    value.length < minLength ? <span>最少{minLength}个字符</span> : null;

  return {
    props: null,
    component: props => (
      <div>
        {props.children}
        {errorMsg}
      </div>
    ),
  };
};

const ValidationValuePropertySchema = Type.String();
const ValidationMinLengthPropertySchema = Type.Integer();
const ValidationMaxLengthPropertySchema = Type.Integer();

export default {
  ...createTrait({
    version: 'core/v1',
    metadata: {
      name: 'validation',
      description: 'validation trait',
    },
    spec: {
      properties: [
        {
          name: 'value',
          ...ValidationValuePropertySchema,
        },
        {
          name: 'minLength',
          ...ValidationMinLengthPropertySchema,
        },
        {
          name: 'maxLength',
          ...ValidationMaxLengthPropertySchema,
        },
      ],
      state: {},
      methods: [],
    },
  }),
  impl: useValidationTrait,
};
