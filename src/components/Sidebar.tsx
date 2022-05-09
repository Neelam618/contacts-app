import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const tagList = ["incididunt", "nulla", "reprehenderit", "ullamco", "velit", "enim", "magna", "quis", "sint", "duis", "occaecat", "dolore", "eu", "proident", "voluptate", "irure", "esse", "tempor", "ex" ]

function Sidebar() {
    return (
        <div style={{width: '100%'}}>
            <div>Audience</div>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <div>
                    <div>Include Tags:</div>
                    <List>
                        {
                            tagList.map((tag) => {
                                return (
                                    <ListItem disablePadding>
                                        <ListItemText primary={tag} />
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
                            tagList.map((tag) => {
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