import React from 'react';
import './Messager.css'

export default ({ name, message }) =>
  <p>
    <strong>{name}</strong> <em>{message}</em>
  </p>