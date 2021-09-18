import React, { useState, useEffect } from 'react'
import { Grid, Paper, IconButton, AppBar, Toolbar, Dialog, Drawer, Snackbar, CircularProgress, List, ListItem, ListItemText, Divider, makeStyles } from '@material-ui/core'
import { Menu, Add, Close } from '@material-ui/icons'

import Post from './Post'
import CreatePostForm from './CreatePostForm'

export default function Home() {
    const classes = useStyles()

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
    const signOut = () => {
        localStorage.removeItem('accessToken')
        window.open('/sign', '_self')
    }

    if(isLoading) return <CircularProgress />
    return (
        <Grid>
            <Drawer 
            anchor="left" 
            open={open.drawer}
            onClose={() => setOpen({...open, drawer: false})}>
                <div
                role="presentation"
                className={classes.menu}>
                    <List>
                        <ListItem 
                        button>
                            <ListItemText 
                            primary={`Welcome, ${user.name}!`}/>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem 
                        button
                        onClick={() => signOut()}>
                            <ListItemText 
                            primary="Sign out"/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <Paper 
            elevation={0} 
            className={classes.home}>
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
                <Dialog 
                open={open.dialog} 
                onClose={() => setOpen({...open, dialog: false})}
                className={classes.dialog}>
                    <CreatePostForm 
                    open={open} 
                    setOpen={setOpen} 
                    getPosts={getPosts}/>
                </Dialog>
                <IconButton
                onClick={() => setOpen({...open, dialog: true})}
                style={{backgroundColor: '#3f51b5'}}
                className={classes.add}>
                    <Add/>
                </IconButton>
                <Grid 
                container 
                alignItems="center" 
                className={classes.header}>
                    <h2 className={classes.title}>Posts</h2>
                </Grid>
                <Grid 
                container
                justifyContent="flex-start" 
                alignItems="center"
                className={classes.main}>
                    {
                        posts.map(
                            post => <Post key={post.postId} user={post.user} title={post.title} body={post.body}/>
                        )
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}

const useStyles = makeStyles({
    home: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        maxWidth: 600
    },
    bar: {
        width: '100vw', 
        backgroundColor: '#3f51b5'
    },
    header: {
        height: '10%',
        padding: '0 40px',
        textAlign: 'left'
    },
    title: {
        margin: 0,
        fontWeight: 'normal'
    },
    main: {
        flex: 1,
        flexWrap: 'nowrap',
        flexDirection: 'column',
        padding: '0 20px 20px 20px',
        overflow: 'scroll'
    },
    add: {
        position: 'absolute',
        bottom: 20,
        zIndex: 1
    },
    dialog: {
        color: '#fff',
        zIndex: 1
    },
    menu: {
        width: '70vw', 
        maxWidth: 500
    }
})