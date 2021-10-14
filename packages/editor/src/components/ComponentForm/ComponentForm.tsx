import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Application } from '@meta-ui/core';
import _ from 'lodash';
import React from 'react';
import { eventBus } from '../../eventBus';
import { ModifyComponentPropertyOperation } from '../../operations/Operations';

type Props = { selectedId: string; app: Application };

const renderFormField = (properties: {
  key: string;
  value: unknown;
  fullKey: string;
  selectedId: string;
}) => {
  const { key, value, fullKey, selectedId } = properties;
  if (typeof value !== 'object') {
    const ref = React.createRef<HTMLInputElement>();
    const onBlur = () => {
      eventBus.send(
        'operation',
        new ModifyComponentPropertyOperation(selectedId, fullKey, ref.current?.value)
      );
    };
    return (
      <FormControl key={key}>
        <FormLabel>{key}</FormLabel>
        <Input ref={ref} onBlur={onBlur} defaultValue={value as string} />
      </FormControl>
    );
  } else {
    const array = _.flatten(
      Object.keys(value || []).map(childKey => {
        const childValue = (value as any)[childKey];
        return renderFormField({
          key: childKey,
          value: childValue,
          fullKey: `${fullKey}.${childKey}`,
          selectedId,
        });
      })
    );

    return (
      <div>
        {array.map(formItem => {
          return formItem;
        })}
      </div>
    );
  }
};

export const ComponentForm: React.FC<Props> = props => {
  const { selectedId, app } = props;

  const selectedComponent = app.spec.components.find(c => c.id === selectedId);
  const properties = selectedComponent?.properties;
  const fields = Object.keys(properties || []).map(key => {
    const value = properties![key];
    return renderFormField({ key, value, fullKey: key, selectedId });
  });

  return (
    <div>
      <div>Component Form</div>
      <div>ID: {selectedComponent?.id}</div>
      <form>{fields}</form>
    </div>
  );
};
