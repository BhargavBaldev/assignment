import React from 'react';
import './App.css';
import firebase from './index';
import {UserInput} from './UserInput'
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

function App() {
  
  const classes = useStyles();

  const [newUserName,setNewUserName] = React.useState()

  const [users,setUsers]=React.useState([])

  React.useEffect(() => {
    const fetchDate = async() =>{
      const db = firebase.firestore()
      const data = await db.collection("users").get()
      setUsers(data.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    fetchDate();
  },[])

  const onCreate =  () => {
    const db = firebase.firestore()
    db.collection('users').add({name:newUserName})
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Paper className={classes.paper}>
      <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" value={newUserName} placeholder="Enter name..." onChange={e=>setNewUserName(e.target.value)}/>
      <Button variant="contained" size="small" color="primary" onClick={onCreate}>Create</Button>
      </form>
      </Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper className={classes.paper}>
      <ol>
      {users.map(user =>  (
        <li key={user.name}>
          <UserInput user={user}/>
        </li>
      ))}
      </ol>
      </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
