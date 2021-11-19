import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'

export default function Header() {
    const classes = useStyles()

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.onresize = () => setScreenWidth(window.innerWidth)
    }, [])
    return (
        <Grid 
        container 
        alignItems="center" 
        className={classes.header}
        style={{
            marginTop: screenWidth < 600 ? '56px' : '64px'
        }}>
            <h2 className={classes.title}>Posts</h2>
        </Grid>
    )
}

const useStyles = makeStyles({
    header: {
        minHeight: 80,
        padding: '0 40px',
        textAlign: 'left'
    },
    title: {
        margin: 0,
        fontWeight: 'normal'
    }
})