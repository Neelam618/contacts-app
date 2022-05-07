import React, {ChangeEvent, useState} from 'react'
import Checkbox from '@mui/material/Checkbox';
import { TextChange } from 'typescript';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function ContactCard(props: any) {

  return (
    <div style={{ margin: '20px 0', display: 'flex' }}>
      <Checkbox {...label} value={props.id} onChange={props.handleCheck} />
      <div>
        <div style={{fontWeight: 700}}>{props.name}</div>
        <div>{props.phoneNumber}</div>
      </div>
    </div>
  )
}

export default ContactCard