import axios, { AxiosError } from 'axios'
import React, { useState, useEffect } from 'react'

type contactType = {
  name: string
}

function Contacts() {
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
      axios.get('https://api-im.chatdaddy.tech/contacts',
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
  }

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <div>

      {
        contacts.map(contact => {
          return <div> {contact.name}</div>
        })
      }
    </div>
  )
}

export default Contacts