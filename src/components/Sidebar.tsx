import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Sidebar(props: any) {

    return (
        <div style={{width: '100%', position: 'fixed', zIndex: 1, top: 0, left: 0, maxWidth: 360, padding: '0 30px'}}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: '30px' }}>
                <MenuRoundedIcon style={{marginRight: 10, verticalAlign: 'sub'}}/>
                <h1 style={{fontSize: '26px', marginTop: 0, display: 'inline'}}>Audience</h1>
                <div style={{marginTop: 10}}>
                    <div style={{fontWeight: 'bold'}}>Include Tags:</div>
                    <List style={{height: '150px', overflow: 'auto', margin: '8px 0'}}>
                        {
                            props.tagList.map((tag:string, index:any) => {
                                return (
                                    <ListItem disablePadding>
                                        <ListItemText primary={tag} style={{paddingLeft: '10px'}} />
                                        <Checkbox {...label}
                                            onChange={() => props.handleIncludeToggle(index)}
                                            id={tag}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </div>
                <div style={{margin: '2em 0'}}>
                    <div style={{fontWeight: 'bold'}}>Exclude Tags:</div>
                    <List style={{height: '150px', overflow: 'auto', margin: '8px 0'}}>
                        {
                            props.tagList.map((tag:any, index:any) => {
                                return (
                                    <ListItem disablePadding>
                                        <ListItemText primary={tag} style={{paddingLeft: '10px'}}/>
                                        <Checkbox {...label}
                                            onChange={() => props.handleExcludeToggle(index)}
                                            id={tag}
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
                        <InputBase
                            type='number'
                            name="minMsgsSent"
                            value={props.inputValue.minMsgsSent}
                            placeholder='Min'
                            onChange={props.handleInputChange}
                            style={{ background: '#e9eff1', padding: '0 10px', borderRadius: 10, width: 170 }}
                            
                        />
                        <InputBase
                            type='number'
                            name="maxMsgsSent"
                            value={props.inputValue.maxMsgsSent}
                            placeholder='Max'
                            onChange={props.handleInputChange}
                            style={{ background: '#e9eff1', padding: '0 10px', borderRadius: 10, width: 170 }}
                        />    
                    </div>    
                </div>
                 <div>
                    <div style={{margin: '1em 0', fontWeight: 'bold'}}>Message Received</div> 
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>                    
                        <InputBase
                            type='number'
                            name="minMsgsRec"
                            value={props.inputValue.minMsgsRec}
                            placeholder='Min'
                            onChange={props.handleInputChange}
                            style={{ background: '#e9eff1', padding: '0 10px', borderRadius: 10, width: 170 }}
                            
                        />
                        <InputBase
                            type='number'
                            name="maxMsgsRec"
                            value={props.inputValue.maxMsgsRec}
                            placeholder='Max'
                            onChange={props.handleInputChange}
                            style={{ background: '#e9eff1', padding: '0 10px', borderRadius: 10, width: 170 }}
                        />    

                    </div>  
                </div>
            </Box>
        </div>
    )
}

export default Sidebar