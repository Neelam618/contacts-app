import React from 'react'
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ContactCard(props: any) {
  return (
    <div style={{ margin: '20px 0', display: 'flex' }}>
      <Checkbox {...label} />
      <div>
        <div style={{fontWeight: 700}}>{props.name}</div>
        <div>{props.phoneNumber}</div>
      </div>
    </div>
  )
}

export default ContactCard