import axios, { AxiosError } from 'axios'
import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import ContactCard from './ContactCard'

export type contactType = {
  name: string
  phoneNumber: string
  id: string
  tags: tagsType[]
}
type tagsType = {
  name: string
}

type isCheckType = {}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Contacts(props:any) {
  let count = 0;
  const [contacts, setContacts] = useState<contactType[]>([])
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<isCheckType[]>([])

  const updateToken = async () => {
    let res = await axios.post('https://api-teams.chatdaddy.tech/token',
      {
        "refreshToken": "059c420e-7424-431f-b23b-af0ecabfe7b8",
        "teamId": "a001994b-918b-4939-8518-3377732e4e88"
      }
    )
    if (res && res.data) {
      console.log("new token",res);
      localStorage.setItem('accessToken', res.data.access_token);
    }
  }

  const getContacts = () => {
    let token = localStorage.getItem('accessToken');
    if (token) {
      axios.get(`https://api-im.chatdaddy.tech/contacts?count=${count}`,
        {
          headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      ).then(async response => {
        console.log(response.data.contacts);
        setContacts(response.data.contacts);
      }).catch((error: AxiosError) => {
        console.log(error.response);
        updateToken().then(getContacts);
      });
    } else {
      updateToken().then(getContacts);
    }
    count += 10
  }

  const handleScroll = (e:any) => {
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
      getContacts()
    }
  }

  const handleSelectAll = (e:any) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(contacts.map(contact => contact.id));
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

  useEffect(() => {
    getContacts()
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{width: '100%'}}>
      {/* <CssBaseline /> */}
      {/* <Container maxWidth="sm"> */}
        <Box sx={{ padding: '30px' }}>
          <Checkbox {...label} onClick={handleSelectAll}
        checked={isCheckAll}  name="selectAll"
        id="selectAll" /> Select All
          {
            contacts.map(contact => {
              return <ContactCard name={contact.name} handleClick={handleClick} phoneNumber={contact.phoneNumber} id={contact.id} isCheck={isCheck} tags={contact.tags} />
            })
          }
          </Box>
      {/* </Container> */}
    </div>
  )
}

export default Contacts