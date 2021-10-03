import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    grid: {
        padding: 40
    },
    paper: {
        width: '100%',
        height: '100%',
        marginTop: 20
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 'auto',
        backgroundColor: '#fff',
        padding: 20
    },
    input: {
        margin: '5px 0'
    },
    button: {
        margin: '10px 0'
    },
    avatar: {
        backgroundColor: '#3f51b5'
    },
    error: {
        color: 'red', 
        fontSize: 15,
        textAlign: 'center'
    },
    dialog: {
        color: '#fff',
        zIndex: 1
    }
})

export default useStyles