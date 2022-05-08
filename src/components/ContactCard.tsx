import React, {ChangeEvent, useState} from 'react'
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ContactCard(props: any) {
  const [check, setCheck] = useState(false)

  const handleCheck = (e:any) => {
    setCheck(!e.target.checked)
  }

  return (
    <div style={{ margin: '20px 0', display: 'flex' }}>
      <Checkbox {...label} value={props.id} onChange={props.handleClick} name={props.name}
          id={props.id}
          onClick={props.handleSelectAll}
          checked={props.isCheck.includes(props.id)} />
      <div>
        <div style={{fontWeight: 700}}>{props.name}</div>
        <div>{props.phoneNumber}</div>
      </div>
    </div>
  )
}

export default ContactCard