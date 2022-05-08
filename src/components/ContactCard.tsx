import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ContactCard(props: any) {  

  return (
    <div style={{ margin: '20px 0', display: 'flex' }}>
      <Checkbox {...label} value={props.id} onChange={props.handleClick} name={props.name}
          id={props.id}
          onClick={props.handleSelectAll}
        checked={props.isCheck.includes(props.id)} />
      <div style={{display:'flex', justifyContent: 'space-between', width: '100%'}}>
        <div>
          <div style={{fontWeight: 700}}>{props.name}</div>
          <div>{props.phoneNumber}</div>
        </div>
        <div>
          {
            (props.tags.length !== 0) ?
                <Stack direction="row" spacing={1}>
                  {props.tags.map((tag: any) => {
                    return (
                    <Chip label={tag.name} size="small" color="primary" />
                    )
                  }
                  )}
                  </Stack>: null
          }
          </div>
        </div>
    </div>
  )
}

export default ContactCard