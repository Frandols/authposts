import React from 'react'
import { AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

export default function Bar({ open, setOpen }) {
    const classes = useStyles()
    return (
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
    )
}

const useStyles = makeStyles({
    bar: {
        width: '100vw', 
        backgroundColor: '#3f51b5'
    }
})