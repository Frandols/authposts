import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export default function SignUp({handleChange}){
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const [error, setError] = useState(null)

    const signUp = async () => {
        if(form.name === '' || form.email === '' || form.password.length < 6 || form.passwordConfirmation !== form.password) return false

        const res = await fetch('https://api-frandolsmedia.herokuapp.com/api/users', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(res.status === 400) setError(await res.text())

        if(res.status !== 201) return false

        handleChange(null, 0)
    }
    return (
        <Grid 
        style={styles.grid}>
            <Paper 
            elevation={0} 
            style={styles.paper}>
                <Grid 
                align='center'>
                    <Avatar 
                    style={styles.avatar}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField 
                label='Name'
                placeholder='Enter your name'
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                style={styles.input} 
                required
                fullWidth/>
                <TextField 
                label='Email' 
                placeholder='Enter your email'
                type='email'
                value={form.email}
                onChange={e => {setForm({...form, email: e.target.value}); setError(null)}}
                style={styles.input}  
                required
                fullWidth/>
                <TextField 
                label='Password'
                placeholder='Enter your password'
                type='password'
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                style={styles.input} 
                required
                fullWidth/>
                <TextField 
                label='Confirm Password'
                placeholder='Confirm your password'
                type='password'
                value={form.passwordConfirmation}
                onChange={e => setForm({...form, passwordConfirmation: e.target.value})}
                style={styles.input} 
                required
                fullWidth/>
                <Button 
                color='primary'
                variant='contained' 
                onClick={() => signUp()}
                style={styles.button} 
                disabled={form.name === '' || form.email === '' || form.password.length < 6 || form.passwordConfirmation !== form.password}
                fullWidth>
                    Sign up
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