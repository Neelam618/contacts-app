import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import ContactCard from './ContactCard'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

type ContactsProps = {
  contacts: {
    tags: string[]
    name: string
  phoneNumber: string
  id: string
  }[],
  setSearchTerm: (searchTerm: string) => void,
  loading: boolean
};

const label = { inputProps: { 'aria-label': 'Select All' } };

function Contacts(props: ContactsProps) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<Array<string>>([])

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(props.contacts.map((contact:any) => contact.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e:React.MouseEvent<HTMLInputElement>) => {
    const { id, checked } = e.target as HTMLInputElement;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
    console.log(isCheck);
  };

    return (
    <div style={{width: '100%'}}>
        <Box sx={{ paddingRight: '40px' }}>
          <h2>All Contacts(173)</h2>
          <div style={{ display: 'flex', background: '#e9eff1', padding: '0 10px', borderRadius: 20 }}>
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton> 
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search contacts"
              inputProps={{ 'aria-label': 'search google maps' }}
              style={{marginLeft: '1em', width: '100%'}} onChange={(e)=> props.setSearchTerm(e.target.value)}
              />
            </div>
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
    </div>
  )
}

export default Contacts