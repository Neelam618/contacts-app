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

interface InputValueType  {
  minMsgsSent: number,
  maxMsgsSent: number,
  minMsgsRec: number,
  maxMsgsRec: number
}

function App() {
  const [contacts, setContacts] = useState<contactsType[]>([])
  const [includedCheckedList, setIncludedCheckedList] = useState<checkedListType[]>([])
  const [excludedCheckedList, setExcludedCheckedList] = useState<checkedListType[]>([])
  const [checkedStateForInclude, setCheckedStateForInclude] = useState(new Array(tagList.length).fill(false));
  const [checkedStateForExclude, setCheckedStateForExclude] = useState(new Array(tagList.length).fill(false));
  // const [minMessagesSent, setMinMessagesSent] = useState(0)
  // const [maxMessagesSent, setMaxMessagesSent] = useState(1)
  let count = 0;

  const [inputValue, setInputValue] = useState<InputValueType>({
    minMsgsSent: 0,
    maxMsgsSent: 1,
    minMsgsRec: 0,
    maxMsgsRec: 1
  });
  
  const handleInputChange = (e:any) => {
    setInputValue((prevState) => (
        { ...prevState, [e.target.name]: e.target.value }
    ))
    console.log(inputValue); 
  }
  
  useEffect(() => {
    console.log(includedCheckedList);
    getContacts()
    window.addEventListener('scroll', handleScroll)
  }, [checkedStateForInclude, checkedStateForExclude, inputValue])

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
      axios.get(
        `https://api-im.chatdaddy.tech/contacts?count=${count}&tags=${includedCheckedList}&notTags=${excludedCheckedList}&maxMessagesSent=${inputValue.maxMsgsSent}&minMessagesSent=${inputValue.minMsgsSent}&minMessagesRecv=${inputValue.minMsgsRec}&maxMessagesRecv=${inputValue.maxMsgsRec}`,
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
      const newCheckedList = includedCheckedList
      newCheckedList.push(tagList[position])
      console.log(includedCheckedList)
    }
    return updatedCheckedState
    });
  }

    const handleExcludeToggle = (position: any) => {
    setCheckedStateForExclude((prevCheckedState:any) => {
    const updatedCheckedState = prevCheckedState.map((item:boolean, index: any) => index === position ? !item : item);
    console.log(updatedCheckedState);

    if (updatedCheckedState[position] === true) {
      const newCheckedList = excludedCheckedList
      newCheckedList.push(tagList[position])
      console.log("excludedCheckedList", excludedCheckedList)
    }
    return updatedCheckedState
    });
  }

  
  return (
    <>
     <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} justifyContent="flex-start">
        <Grid item xl xs>
            <Sidebar handleIncludeToggle={handleIncludeToggle} handleExcludeToggle={handleExcludeToggle}
              tagList={tagList} checkedStateForInclude={checkedStateForInclude} checkedStateForExclude={checkedStateForExclude}
              handleInputChange={handleInputChange} inputValue={inputValue}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={8} xl={9}>
            <Contacts contacts={contacts} />
          </Grid>
      </Grid>
    </Box>
      </>
  );
}

export default App;
