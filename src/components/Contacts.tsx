import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import ContactCard from './ContactCard'

type isCheckType = {}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Contacts(props:any) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<isCheckType[]>([])

  const handleSelectAll = (e:any) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(props.contacts.map((contact:any) => contact.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e:any) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
    console.log(isCheck);
  };

    return (
    <div style={{width: '100%'}}>
      {/* <CssBaseline /> */}
        {/* <Container maxWidth="sm"> */}
        <Box sx={{ padding: '30px' }}>
          <input type="text" style={{display: 'block', marginLeft: '1em', width: '100%'}} onChange={(e)=> props.setSearchTerm(e.target.value)} placeholder="Search"/>
          {
            props.contacts.length !== 0 ? (
              <>
                <Checkbox {...label} onClick={handleSelectAll}
                checked={isCheckAll}  name="selectAll"
                id="selectAll"
                /> <span>Select All</span>
              </>
            ) : null
          }
          
          {
            props.contacts.map((contact:any) => {
              return <ContactCard name={contact.name} handleClick={handleClick} phoneNumber={contact.phoneNumber} id={contact.id} isCheck={isCheck} tags={contact.tags} />
            })
          }
          </Box>
      {/* </Container> */}
    </div>
  )
}

export default Contacts