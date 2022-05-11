import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

const label = { inputProps: { 'aria-label': 'Select Contact' } };

type ContactCardProps = {
  contact: {
    name: string;
    id: string;
    tags: {
      name: string;
    }[];
    phoneNumber: string;
  },
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectAll: () => void;
  isCheck: string[];
}

function ContactCard(props: ContactCardProps) {  
  return (
    <div style={{ margin: '20px 0', display: 'flex' }}>
      <Checkbox {...label} value={props.contact.id} onChange={props.handleClick} name={props.contact.name}
          id={props.contact.id}
          onClick={props.handleSelectAll}
          checked={props.isCheck.includes(props.contact.id)} />
       <Avatar alt={props.contact.name} src="/static/images/avatar/1.jpg" style={{marginRight: '1em'}} />
      <div style={{display:'flex', justifyContent: 'space-between', width: '100%'}}>
        <div>
          <div style={{fontWeight: 700}}>{props.contact.name}</div>
          <div style={{color: 'gray'}}>{props.contact.phoneNumber}</div>
        </div>
        <div>
          {
            (props.contact.tags.length !== 0) ?
                <Stack direction="row" spacing={1}>
                  {props.contact.tags.map((tag: {name: string}) => {
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