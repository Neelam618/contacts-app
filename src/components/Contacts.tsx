import axios, { AxiosError } from 'axios'
import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ContactCard from './ContactCard'

export type contactType = {
  name: string
  phoneNumber: string
}

function Contacts() {
  let count = 0;
  const [contacts, setContacts] = useState<contactType[]>([])

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

  useEffect(() => {
    getContacts()
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
       <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', padding: '30px' }}>
         {
        contacts.map(contact => {
          return <ContactCard name={contact.name} phoneNumber={contact.phoneNumber} />
        })
          }
          </Box>
      </Container>
    </div>
  )
}

export default Contacts