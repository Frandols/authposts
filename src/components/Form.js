import React, { useState } from 'react'
import { TextField, Button, Dialog, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'
import useStyles from '../styles'

export default function CreatePostForm({ open, setOpen, getPosts }) {
    const classes = useStyles()

    const [form, setForm] = useState({
        title: '',
        body: ''
    })

    const sendPost = async () => {
        if(form.title === '' || form.body.length < 16) return false

        const res = await fetch('https://api-frandolsmedia.herokuapp.com/api/posts', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('accessToken')
            }
        })

        if(res.status !== 201) return false

        getPosts()
        setOpen({
            ...open, 
            dialog: false,
            snackbar: true 
        })
    }
    return (
        <Dialog
        open={open.dialog}
        onClose={() => setOpen({...open, dialog: false})}
        className={classes.dialog}>
            <DialogTitle>Create a post</DialogTitle>
            <DialogContent
            className={classes.card}>
                <DialogContentText>Write title and body. Body must have at least 15 characters.</DialogContentText>
                <TextField 
                label='Title' 
                placeholder='Enter title' 
                variant='outlined'
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                className={classes.input} 
                fullWidth/>
                <TextField 
                label='Body' 
                placeholder='Enter body' 
                multiline
                rows={2}
                variant='outlined'
                value={form.body}
                onChange={e => setForm({...form, body: e.target.value})}
                className={classes.input} 
                fullWidth/>
                <Button 
                color='primary' 
                variant='contained'
                onClick={() => sendPost()}
                className={classes.button} 
                disabled={form.title === '' || form.body.length < 16}
                fullWidth>
                    Post
                </Button>
            </DialogContent>
        </Dialog>
    )
}