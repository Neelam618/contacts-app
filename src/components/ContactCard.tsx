import React from 'react'

function ContactCard(props: any) {
  return (
    <div style={{margin: '20px 0'}}>
          <div style={{fontWeight: 700}}>{props.name}</div>
          <div>{props.phoneNumber}</div>
    </div>
  )
}

export default ContactCard