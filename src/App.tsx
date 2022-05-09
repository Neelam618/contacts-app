import React from 'react';
import Contacts from './components/Contacts';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
      <Sidebar/>
      <Contacts />
    </div>
  );
}

export default App;
