import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'

export default function CircleButton({ open, setOpen }) {
    const classes = useStyles()
    return (
        <IconButton
        onClick={() => setOpen({...open, dialog: true})}
        style={{backgroundColor: '#3f51b5'}}
        className={classes.button}>
            <Add/>
        </IconButton>
    )
}

const useStyles = makeStyles({
    button: {
        position: 'fixed',
        bottom: 20,
        zIndex: 1
    }
})
