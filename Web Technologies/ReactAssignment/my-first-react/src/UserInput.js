import React from 'react';
import firebase from './index';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export const UserInput = ({user}) => {
    const classes = useStyles();
    const [name,setName]= React.useState(user.name)
    const onUpdate =  () => {
        const db = firebase.firestore()
        db.collection('users').doc(user.id).set({...user,name});
    }
    const onDelete =  () => {
        const db = firebase.firestore()
        db.collection('users').doc(user.id).delete();
    }
    return(<>
    <Grid container spacing={1}>
        <Grid item  xs={6}>
        <Paper className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" value={name} onChange={e => {setName(e.target.value);}}/>
        </form>
        </Paper>
        </Grid>
        <Grid item  xs={3}>
        <Paper className={classes.paper}>
        <Button variant="contained" color="default" size="small" onClick={onUpdate}>Update</Button>
        </Paper>
        </Grid>
        <Grid item  xs={3}>
        <Paper className={classes.paper}>
        <Button variant="contained" size="small" color="secondary" onClick={onDelete}>Delete</Button>
        </Paper>
        </Grid>
        </Grid>
    </>)
}
