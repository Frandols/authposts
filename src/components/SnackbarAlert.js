import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default function SnackbarAlert({ open, setOpen }) {
    return (
        <Snackbar 
        open={open.snackbar} 
        autoHideDuration={6000} 
        message="Post sent!" 
        onClose={() => setOpen({...open, snackbar: false})}
        action={
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpen({...open, snackbar: false})}>
                <Close 
                fontSize="small"/>
            </IconButton>
        }/>
    )
}
