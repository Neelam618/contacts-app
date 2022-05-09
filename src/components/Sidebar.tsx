import React, {useState} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Sidebar(props: any) {

    return (
        <div style={{width: '100%', position: 'fixed', zIndex: 1, top: 0, left: 0, maxWidth: 360}}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: '30px' }}>
                <div style={{marginBottom: '1em'}}>Audience</div>
                <div>
                    <div style={{fontWeight: 'bold'}}>Include Tags:</div>
                    <List style={{height: '150px', overflow: 'auto'}}>
                        {
                            props.tagList.map((tag:string, index:any) => {
                                return (
                                    <ListItem disablePadding>
                                        <ListItemText primary={tag} style={{paddingLeft: '10px'}} />
                                        <Checkbox {...label}
                                            onChange={() => props.handleIncludeToggle(index)}
                                            id={tag} checked={props.checkedStateForInclude[index]}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                <div style={{margin: '2em 0'}}>
                    <div style={{fontWeight: 'bold'}}>Exclude Tags:</div>
                    <List style={{height: '150px', overflow: 'auto'}}>
                        {
                            props.tagList.map((tag:any, index:any) => {
                                return (
                                    <ListItem disablePadding>
                                        <ListItemText primary={tag} style={{paddingLeft: '10px'}}/>
                                        <Checkbox {...label}
                                            onChange={() => props.handleExcludeToggle(index)}
                                            id={tag}
                                            // checked={props.checkedStateForExclude[index]}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                <div>
                    <div style={{ margin: '1em 0', fontWeight: 'bold' }}>Message Sent</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div><input type="number" placeholder='Min' style={{ height: 30 }} /></div>
                        <div><input type="number" placeholder='Max' style={{ height: 30 }} /></div> 
                    </div>    
                </div>
                 <div>
                    <div style={{margin: '1em 0', fontWeight: 'bold'}}>Message Received</div> 
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div><input type="number" placeholder='Min' style={{ height: 30 }} /></div>
                        <div><input type="number" placeholder='Max' style={{ height: 30 }} /></div> 
                    </div>  
                </div>
            </Box>
        </div>
    )
}

export default Sidebar