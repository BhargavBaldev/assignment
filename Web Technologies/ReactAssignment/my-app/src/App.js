import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {css, withStyles} from "react-with-styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



export class App extends React.Component {
  
  
  state = { list: [] };
  
  onClick = e => {
    if(this.state.uname===''){
      alert("user name should not be empty");
    }else{
    this.state.list.push(this.state)
    this.setState({ uname:null, password:null });
    }
  };
  
  changeuname = e => {
    this.setState({ uname: e.target.value });
  };
  changepassword = e => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <form noValidate autoComplete="off">
            <TextField id="fname" onChange={this.changeuname} label="User Name" value={this.state.uname} /><br/>
            <TextField id="lname" onChange={this.changepassword} label="Password" value={this.state.password}  /><br/><br/>
            <Button onClick={this.onClick} variant="contained" color="primary">
              Show
            </Button>
          </form>
          <div {...css(styles.root)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper {...css(styles.paper)}>{this.state.list.map((person) => (<p>User name: {person.uname}<br/> Password {person.password}</p>))}</Paper>
              </Grid>
            </Grid>
          </div>  
        </Container>
      </React.Fragment>
    );
  }
}
export default withStyles(({flexGrow,padding,textAlign,color})=>({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: padding.spacing(2),
    textAlign: 'center',
    color: color.secondary,
  },
}))(App);