import React from 'react'
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Divider, makeStyles } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

export default function Nav({ open, setOpen, user }) {
    const classes = useStyles()

    const signOut = () => {
        localStorage.removeItem('accessToken')
        window.open('/sign', '_self')
    }
    return (
        <>
            <AppBar
            position="static" 
            className={classes.bar}>
                <Toolbar>
                    <IconButton 
                    onClick={() => setOpen({...open, drawer: true})}>
                        <Menu />
                    </IconButton>
                </Toolbar>
            </AppBar>
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
        </>
    )
}

const useStyles = makeStyles({
    bar: {
        width: '100vw', 
        backgroundColor: '#3f51b5'
    },
    menu: {
        width: '70vw', 
        maxWidth: 500
    }
})