import axios, { AxiosError } from 'axios'
import React, {useState, useEffect} from 'react'

function Contacts() {
  const [contacts, setContacts] = useState([])

  const updateToken = async () => {
    let res = await axios.post('https://api-teams.chatdaddy.tech/token',
      {
        "refreshToken": "059c420e-7424-431f-b23b-af0ecabfe7b8",
        "teamId": "a001994b-918b-4939-8518-3377732e4e88"
      }
    )
    if (res && res.data) {
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
        console.log(response.data);
        setContacts(response.data);
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
    <div>Contacts

      {JSON.stringify(contacts)}
    </div>
  )
}

export default Contacts