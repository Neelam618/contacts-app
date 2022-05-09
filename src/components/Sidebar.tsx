import React, {useState} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Sidebar(props: any) {

    return (
        <div style={{width: '100%'}}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: '30px' }}>
                <div>Audience</div>
                <div>
                    <div>Include Tags:</div>
                    <List>
                        {
                            props.tagList.map((tag:string, index:any) => {
                                return (
                                    <ListItem disablePadding>
                                        <ListItemText primary={tag} />
                                        <Checkbox {...label}
                                            onChange={() => props.handleToggle(index)}
                                            id={tag} checked={props.checkedState[index]}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                <div>
                    <div>Exclude Tags:</div>
                    <List>
                        {
                            props.tagList.map((tag:any) => {
                                return (
                                    <ListItem disablePadding>
                                        <ListItemText primary={tag} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
            </Box>
        </div>
    )
}

export default Sidebar