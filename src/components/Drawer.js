import React from 'react'
import { Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core'

export default function DrawerMenu({ open, setOpen, user }) {
    const signOut = () => {
        localStorage.removeItem('accessToken')
        window.open('/sign', '_self')
    }
    return (
        <Drawer 
        anchor="left" 
        open={open}
        onClose={() => setOpen({...open, drawer: false})} >
            <div
            role="presentation"
            style={styles.menu}>
                <List>
                    <ListItem 
                    button>
                        <ListItemText 
                        primary={`Welcome, ${user.name}!`} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem 
                    button
                    onClick={() => signOut()}>
                        <ListItemText 
                        primary="Sign out" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}

const styles = {
    menu: {
        width: '70vw', 
        maxWidth: 500
    }
}
