import React, { useState } from 'react'
import { TextField, Button, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'

export default function PostSend({ open, setOpen, getPosts }) {
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
        <>
            <DialogTitle>Create a post</DialogTitle>
            <DialogContent
            style={styles.card}>
                <DialogContentText>Write title and body. Body must have at least 15 characters.</DialogContentText>
                <TextField 
                label='Title' 
                placeholder='Enter title' 
                variant='outlined'
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                style={styles.input} 
                fullWidth/>
                <TextField 
                label='Body' 
                placeholder='Enter body' 
                multiline
                rows={2}
                variant='outlined'
                value={form.body}
                onChange={e => setForm({...form, body: e.target.value})}
                style={styles.input} 
                fullWidth/>
                <Button 
                color='primary' 
                variant='contained'
                onClick={() => sendPost()}
                style={styles.button} 
                disabled={form.title === '' || form.body.length < 16}
                fullWidth>
                    Post
                </Button>
            </DialogContent>
        </>
    )
}

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: 'auto',
        padding: 20,
        backgroundColor: '#fff'
    },
    input: {
        margin: '5px 0'
    },
    button: {
        margin: '10px 0'
    }
}
