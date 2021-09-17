import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

export default function SignIn(){
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)

    const signIn = async () => {
        if(form.email === '' || form.password.length < 6) return false

        const res = await fetch('https://api-frandolsmedia.herokuapp.com/api/tokens', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(res.status === 400) setError(await res.text())

        if(res.status !== 200) return false

        localStorage.setItem('accessToken', (await res.json()).accessToken)
        window.open('/', '_self')
    }
    return(
        <Grid 
        style={styles.grid}>
            <Paper 
            elevation={0} 
            style={styles.paper}>
                <Grid 
                align='center'>
                    <Avatar 
                    style={styles.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField 
                label='Email' 
                placeholder='Enter email' 
                type='email'
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                style={styles.input} 
                required
                fullWidth/>
                <TextField 
                label='Password' 
                placeholder='Enter password' 
                type='password'
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                style={styles.input}  
                required
                fullWidth/>
                <Button 
                color='primary' 
                variant="contained" 
                onClick={() => signIn()}
                style={styles.button} 
                disabled={form.email === '' || form.password.length < 6}
                fullWidth>
                    Sign in
                </Button>
                {
                    error ? <p style={styles.error}>{error}</p> : null
                }
            </Paper>
        </Grid>
    )
}

const styles = {
    grid: {
        padding: 40
    },
    paper: {
        marginTop: 20,
        height: '100%',
        width: '100%'
    },
    avatar: {
        backgroundColor: '#3f51b5'
    },
    input: {
        margin: '5px 0'
    },
    button: {
        margin: '10px 0'
    },
    error: {
        color: 'red', 
        textAlign: 'center', 
        fontSize: 15
    }
}