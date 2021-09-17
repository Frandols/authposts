import React, { useState } from 'react'
import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core'

import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp' 


export default function SignInOutContainer(){
    const [value, setValue] = useState(0)

    const handleChange = (_, value) => {
        setValue(value);
    }

    function TabPanel({ children, value, index, ...other }) {
        return (
            <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
                {value === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        )
    }
    
        return (
            <Paper elevation={0} style={styles.paper}>
                <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                style={{width: '100%'}}
                aria-label="disabled tabs example">
                    <Tab 
                    label="Sign In" 
                    style={styles.tab}/>
                    <Tab 
                    label="Sign Up" 
                    style={styles.tab}/>
                </Tabs>
                <TabPanel 
                value={value} 
                index={0}>
                    <SignIn/>
                </TabPanel>
                <TabPanel 
                value={value} 
                index={1}>
                    <SignUp 
                    handleChange={handleChange}/>
                </TabPanel>
            </Paper>
        )
}

const styles = {
    paper: {
        height: '100vh',
        width: '100vw',
        maxWidth: 600,
        margin: '20px auto'
    },
    tab: {
        width: '50%', 
        maxWidth: 'none'
    }
}