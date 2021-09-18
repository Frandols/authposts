import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    grid: {
        padding: 40
    },
    sign: {
        width: '100%',
        height: '100%',
        marginTop: 20
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
        fontSize: 15,
        textAlign: 'center'
    },
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
    post: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        minHeight: 100,
        textAlign: 'left',
        marginBottom: 10,
        padding: 20
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
    menu: {
        width: '70vw', 
        maxWidth: 500
    }
})

export default useStyles