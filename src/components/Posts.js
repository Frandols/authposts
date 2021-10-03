import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Post from './Post'

export default function Posts({ posts }) {
    const classes = useStyles()
    return (
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
    )
}

const useStyles = makeStyles({
    posts: {
        flex: 1,
        flexWrap: 'nowrap',
        flexDirection: 'column',
        overflow: 'scroll'
    }
})