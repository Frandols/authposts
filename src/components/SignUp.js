import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import useStyles from '../styles/styles'

export default function SignUp({handleChange}){
    const classes = useStyles()

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
        className={classes.grid}>
            <Paper 
            elevation={0} 
            className={classes.paper}>
                <Grid 
                align='center'>
                    <Avatar 
                    className={classes.avatar}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField 
                label='Name'
                placeholder='Enter your name'
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className={classes.input} 
                required
                fullWidth/>
                <TextField 
                label='Email' 
                placeholder='Enter your email'
                type='email'
                value={form.email}
                onChange={e => {setForm({...form, email: e.target.value}); setError(null)}}
                className={classes.input}  
                required
                fullWidth/>
                <TextField 
                label='Password'
                placeholder='Enter your password'
                type='password'
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className={classes.input} 
                required
                fullWidth/>
                <TextField 
                label='Confirm Password'
                placeholder='Confirm your password'
                type='password'
                value={form.passwordConfirmation}
                onChange={e => setForm({...form, passwordConfirmation: e.target.value})}
                className={classes.input} 
                required
                fullWidth/>
                <Button 
                color='primary'
                variant='contained' 
                onClick={() => signUp()}
                className={classes.button} 
                disabled={form.name === '' || form.email === '' || form.password.length < 6 || form.passwordConfirmation !== form.password}
                fullWidth>
                    Sign up
                </Button>
                {
                    error ? <p className={classes.error}>{error}</p> : null
                }
            </Paper>
        </Grid>
    )
}