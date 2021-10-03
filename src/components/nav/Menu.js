import React from 'react'
import { Drawer, List, ListItem, ListItemText, Divider, makeStyles } from '@material-ui/core'

export default function Menu({ open, setOpen, user }) {
    const classes = useStyles()

    const signOut = () => {
        localStorage.removeItem('accessToken')
        window.open('/sign', '_self')
    }
    return (
        <Drawer 
        anchor="left" 
        open={open.drawer}
        onClose={() => setOpen({...open, drawer: false})}>
            <div
            role="presentation"
            className={classes.menu}>
                <List>
                    <ListItem 
                    button>
                        <ListItemText 
                        primary={`Welcome, ${user.name}!`}/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem 
                    button
                    onClick={() => signOut()}>
                        <ListItemText 
                        primary="Sign out"/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}

const useStyles = makeStyles({
    menu: {
        width: '70vw', 
        maxWidth: 500
    }
})
