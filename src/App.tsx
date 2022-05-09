import React, {useState} from 'react';
import Contacts from './components/Contacts';
import Sidebar from './components/Sidebar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const tagList = ["incididunt", "nulla", "reprehenderit", "ullamco", "velit", "enim", "magna", "quis", "sint", "duis", "occaecat", "dolore", "eu", "proident", "voluptate", "irure", "esse", "tempor", "ex" ]

type checkedListType ={}

function App() {
  const [checkedList, setCheckedList] = useState<checkedListType[]>([])
      const [checkedStateForInclude, setCheckedStateForInclude] = useState( new Array(tagList.length).fill(false));

  const handleIncludeToggle = (position: any) => {
    //     const currentIndex:any = checkedList[position]
    //     const newCheckedList = [...checkedList]

    //     if (currentIndex === -1) {
    //         newCheckedList.push(tagList[position])
    //     } else {
    //         newCheckedList.splice(currentIndex, 1)
    //     }
    //   setCheckedList(newCheckedList)
    // console.log(checkedList);
    
     const updatedCheckedState = checkedStateForInclude.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedStateForInclude(updatedCheckedState);
    console.log(checkedStateForInclude);     
  }
  
  return (
    <>
     <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} justifyContent="flex-start">
        <Grid item xl xs>
          <Sidebar handleIncludeToggle={handleIncludeToggle} tagList={tagList} checkedStateForInclude={checkedStateForInclude}/>
          </Grid>
          <Grid item xs={6} sm={6} md={8} xl={9}>
            <Contacts checkedList={checkedList} />
          </Grid>
      </Grid>
    </Box>
      </>
  );
}

export default App;
