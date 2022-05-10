import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios'
import Contacts from './components/Contacts';
import Sidebar from './components/Sidebar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const tagList = ["incididunt", "nulla", "reprehenderit", "ullamco", "velit", "enim", "magna", "quis", "sint", "duis", "occaecat", "dolore", "eu", "proident", "voluptate", "irure", "esse", "tempor", "ex" ]

type checkedListType = {}

export type contactsType = contactType[]

export type contactType = {
  name: string
  phoneNumber: string
  id: string
  tags: tagsType[]
}

type tagsType = {
  name: string
}

function App() {
  const [contacts, setContacts] = useState<contactsType[]>([])
  const [checkedList, setCheckedList] = useState<checkedListType[]>([])
  const [checkedStateForInclude, setCheckedStateForInclude] = useState(new Array(tagList.length).fill(false));
  let count = 0;
  
   useEffect(() => {
    console.log(checkedList);
    getContacts()
    window.addEventListener('scroll', handleScroll)
   }, [checkedList])
  
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
      axios.get(`https://api-im.chatdaddy.tech/contacts?count=${count}&tags=${checkedList}`,
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


  const handleIncludeToggle = (position: any) => {
       setCheckedStateForInclude((prevCheckedState:any) => {
      const updatedCheckedState = prevCheckedState.map((item:boolean, index: any) => index === position ? !item : item);
      console.log(updatedCheckedState);

      if (updatedCheckedState[position] === true) {
        const newCheckedList = checkedList
        newCheckedList.push(tagList[position])
        console.log(checkedList)
      }
      return updatedCheckedState
    });
  }
  
  return (
    <>
     <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} justifyContent="flex-start">
        <Grid item xl xs>
          <Sidebar handleIncludeToggle={handleIncludeToggle} tagList={tagList} checkedStateForInclude={checkedStateForInclude}/>
          </Grid>
          <Grid item xs={6} sm={6} md={8} xl={9}>
            <Contacts checkedList={checkedList} contacts={contacts} />
          </Grid>
      </Grid>
    </Box>
      </>
  );
}

export default App;
