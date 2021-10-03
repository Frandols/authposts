import React, { useState, useEffect } from 'react'
import { ListItem, ListItemText, CircularProgress, makeStyles } from '@material-ui/core'

export default function Post({user, title, body}) {
    const classes = useStyles()

    const [isLoading, setIsLoading] = useState(true)

    const [name, setName] = useState(null)

    useEffect(() => {
        const getName = async () => {
            const res = await fetch(`https://api-frandolsmedia.herokuapp.com/api/users/${user}`)
    
            if(res.status !== 200) return false
    
            setName((await res.json()).user.name)
            setIsLoading(false)
        }
        getName()
    }, [user])
 
    return (
        <ListItem 
        button 
        className={classes.post}>
            {
                isLoading ? 
                <CircularProgress 
                size={20}/>
                :
                <ListItemText 
                primary={`${name}: ${title}`} 
                secondary={body} />
            }
        </ListItem>
    )
}

const useStyles = makeStyles({
    post: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        minHeight: 100,
        textAlign: 'left',
        padding: '20px 40px'
    }
})