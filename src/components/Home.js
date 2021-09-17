import React, { useState, useEffect } from 'react'
import { Grid, Paper, IconButton, AppBar, Toolbar, Dialog, Snackbar, CircularProgress } from '@material-ui/core'
import { Menu, Add, Close } from '@material-ui/icons'

import Drawer from './Drawer'
import Post from './Post'
import PostSend from './PostSend'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState({name: ''})
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState({
        drawer: false,
        dialog: false,
        snackbar: false
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
            <Drawer 
            open={open.drawer} 
            setOpen={setOpen}
            user={user}/>
            <Paper 
            elevation={0} 
            style={styles.paper}>
                <AppBar
                position="static" 
                style={{width: '100vw', backgroundColor: '#3f51b5'}}>
                    <Toolbar>
                        <IconButton 
                        onClick={() => setOpen({...open, drawer: true})}>
                            <Menu />
                        </IconButton>
                    </Toolbar>
                </AppBar>
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
                    onClick={() => setOpen({...open, snackbar: false})}
                    >
                        <Close 
                        fontSize="small" />
                    </IconButton>
                } />
                <Dialog 
                open={open.dialog} 
                onClose={() => setOpen({...open, dialog: false})}
                style={styles.dialog}>
                    <PostSend 
                    open={open} 
                    setOpen={setOpen} 
                    getPosts={getPosts}/>
                </Dialog>
                <IconButton
                onClick={() => setOpen({...open, dialog: true})}
                style={styles.add}>
                    <Add/>
                </IconButton>
                <Grid 
                container 
                alignItems="center" 
                style={styles.header}>
                    <h2 style={styles.title}>Posts</h2>
                </Grid>
                <Grid 
                container
                justifyContent="flex-start" 
                alignItems="center"
                style={styles.main}>
                    {
                        posts.map(
                            post => <Post key={post.postId} user={post.user} title={post.title} body={post.body} />
                        )
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        maxWidth: 600
    },
    header: {
        height: '10%',
        textAlign: 'left',
        padding: '0 40px'
    },
    title: {
        fontWeight: 'normal', 
        margin: 0
    },
    main: {
        flex: 1,
        flexWrap: 'nowrap',
        flexDirection: 'column',
        padding: '0 20px 20px 20px',
        overflow: 'scroll'
    },
    add: {
        backgroundColor: '#3f51b5',
        position: 'absolute',
        bottom: 20,
        zIndex: 1
    },
    dialog: {
        zIndex: 1, 
        color: '#fff'
    }
}