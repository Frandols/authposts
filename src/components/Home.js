import React, { useState, useEffect } from 'react'
import { Grid, Paper, CircularProgress, makeStyles } from '@material-ui/core'

import Nav from './Nav'
import Header from './Header'
import Posts from './Posts'
import Form from './Form'
import CircleButton from './CircleButton'
import SnackbarAlert from './SnackbarAlert'

export default function Home() {
    const classes = useStyles()

    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState({
        drawer: false,
        dialog: false,
        snackbar: false
    })
    const [user, setUser] = useState({
        name: ''
    })

    useEffect(() => {
        const getData = async () => {
            await getUser()
            await getPosts()
            setIsLoading(false)
        }
        getData()
    }, [])

    const getUser = async () => {
        const res = await fetch('https://api-frandolsmedia.herokuapp.com/api', {
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem('accessToken')
            }
        })

        if(res.status !== 200) return false

        setUser((await res.json()).user)
    }
    const getPosts = async () => {
        const res = await fetch('https://api-frandolsmedia.herokuapp.com/api/posts')
        
        if(res.status !== 200) return false

        setPosts((await res.json()).posts.reverse())
    }

    if(isLoading) return <CircularProgress />
    return (
        <Grid>
            <Paper 
            elevation={0} 
            className={classes.home}>
                <Nav open={open} setOpen={setOpen} user={user} />
                <Header />
                <Posts posts={posts} />
                <Form open={open} setOpen={setOpen} getPosts={getPosts}/>
                <CircleButton open={open} setOpen={setOpen} />
                <SnackbarAlert open={open} setOpen={setOpen} />
            </Paper>
        </Grid>
    )
}

const useStyles = makeStyles({
    home: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        maxWidth: 600
    }
})