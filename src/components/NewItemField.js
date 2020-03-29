import React from 'react';
import { Add } from '@material-ui/icons';
import { EditableField } from './EditableField';

export const NewItemField = ({className, placeholder, handleUpdate}) => {
  return (
    <div className={className}>
    <Add />
    <EditableField placeholder={placeholder} handleUpdate={handleUpdate} />
  </div>
  )
}