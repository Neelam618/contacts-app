import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios'
import Contacts from './components/Contacts';
import Sidebar from './components/Sidebar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import useDebounce from './hooks/useDebounce'

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
  const [tagList, setTagList] = useState([])
  const [tagsToInclude, settagsToInclude] = useState<Array<string>>([])
  const [tagsToExclude, settagsToExclude] = useState<Array<string>>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const debouncedSearch = useDebounce(searchTerm, 500)

  let count = 10;

  const [inputValue, setInputValue] = useState<InputValueType>({
    minMsgsSent: 0,
    maxMsgsSent: 1,
    minMsgsRec: 0,
    maxMsgsRec: 1
  });

  useEffect(() => {
    getTags()
      window.addEventListener('scroll', handleScroll)
  },[])

  useEffect(() => {
    setLoading(true)
    getContacts()
  }, [tagsToInclude, tagsToExclude, inputValue, debouncedSearch])

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
        `https://api-im.chatdaddy.tech/contacts?q=${debouncedSearch}&count=${count}&tags=${tagsToInclude}&notTags=${tagsToExclude}&maxMessagesSent=${inputValue.maxMsgsSent}&minMessagesSent=${inputValue.minMsgsSent}&minMessagesRecv=${inputValue.minMsgsRec}&maxMessagesRecv=${inputValue.maxMsgsRec}`,
        {
          headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      ).then(async response => {
        console.log(response.data.contacts);
        setContacts(response.data.contacts);
        setLoading(false)
      }).catch((error: AxiosError) => {
        console.log(error.response);
        updateToken().then(getContacts);
      });
    } else {
      updateToken().then(getContacts);
    }
    count += 10
  }

const getTags = async () => {
    let token = localStorage.getItem('accessToken');
    const res = await axios.get('https://api-im.chatdaddy.tech/tags',
      {
        headers: {
          "Content-type": "Application/json",
          "Authorization": `Bearer ${token}`
        }
      }
  )
  // console.log(res.data);
  
  setTagList(res.data.tags.map((tag:any) => {
      return tag.name
    }));
  }

  const handleScroll = (e:any) => {
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
      getContacts()
    }
  }

  const handleIncludeToggle = (position: number) => {
    settagsToInclude((prevCheckedState: any) => {
      let newCheckedState = [...prevCheckedState]
      let tagName = tagList[position];
      if (newCheckedState.includes(tagName)) {
        newCheckedState.splice(newCheckedState.indexOf(tagName), 1)
      } else {
        newCheckedState.push(tagName)
      }
      return newCheckedState;
    });
  }

  const handleExcludeToggle = (position: any) => {
    settagsToExclude((prevCheckedState: any) => {
      let newCheckedState = [...prevCheckedState]
      let tagName = tagList[position];
      if (newCheckedState.includes(tagName)) {
        newCheckedState.splice(newCheckedState.indexOf(tagName), 1)
      } else {
        newCheckedState.push(tagName)
      }
      return newCheckedState;
    });
  }

  const handleInputChange = (e:any) => {
    setInputValue((prevState) => (
        { ...prevState, [e.target.name]: e.target.value }
    ))
    console.log(inputValue); 
  }
  
  return (
    <>
     <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} justifyContent="flex-start">
        <Grid item xl xs>
            <Sidebar handleIncludeToggle={handleIncludeToggle} handleExcludeToggle={handleExcludeToggle}
              tagList={tagList}
              handleInputChange={handleInputChange} inputValue={inputValue}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={8} xl={9}>
            <Contacts contacts={contacts} setSearchTerm={setSearchTerm} loading={loading} />
          </Grid>
      </Grid>
    </Box>
      </>
  );
}

export default App;
