import React, {useState} from 'react';
import Contacts from './components/Contacts';
import Sidebar from './components/Sidebar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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

//   const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
  
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

    {/* <div style={{display: 'flex', justifyContent: 'space-evenly', margin: '2em'}}>
      <Sidebar handleIncludeToggle={handleIncludeToggle} tagList={tagList} checkedStateForInclude={checkedStateForInclude}/>
      <Contacts checkedList={checkedList} />
      </div> */}
      </>
  );
}

export default App;
