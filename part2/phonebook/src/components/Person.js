import React from 'react';
import Button from './Button'

const Person = ({name, number, id, del, ind}) => <tr><td>{ind}</td><td>{name}</td><td>{number}</td><td><Button key={id} type="button" text="delete" handle={del}/></td></tr>

export default Person;
