import React, {useState} from 'react';
import Contacts from './components/Contacts';
import Sidebar from './components/Sidebar';

const tagList = ["incididunt", "nulla", "reprehenderit", "ullamco", "velit", "enim", "magna", "quis", "sint", "duis", "occaecat", "dolore", "eu", "proident", "voluptate", "irure", "esse", "tempor", "ex" ]

type checkedListType ={}

function App() {
  const [checkedList, setCheckedList] = useState<checkedListType[]>([])
      const [checkedState, setCheckedState] = useState( new Array(tagList.length).fill(false));

  const handleToggle = (position: any, tag:any) => {
     const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    console.log(checkedState);     
  }
  
  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', margin: '2em'}}>
      <Sidebar handleToggle={handleToggle} tagList={tagList} checkedState={checkedState}/>
      <Contacts checkedList={checkedList} />
    </div>
  );
}

export default App;
