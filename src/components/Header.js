import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

export default function Header() {
    const classes = useStyles()
    return (
        <Grid 
        container 
        alignItems="center" 
        className={classes.header}>
            <h2 className={classes.title}>Posts</h2>
        </Grid>
    )
}

const useStyles = makeStyles({
    header: {
        height: '10%',
        padding: '0 40px',
        textAlign: 'left'
    },
    title: {
        margin: 0,
        fontWeight: 'normal'
    }
})