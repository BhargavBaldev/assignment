import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export default class App extends React.Component {
  
  state = { list: [] };
  onClick = e => {
    if(this.state.uname===''){
      alert("user name should not be empty");
    }else{
    this.state.list.push(this.state)
    this.setState({uname:'',password:''});
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
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {this.state.list.map((person) => (
                  <p>User name: {person.uname}<br/> Password {person.password}</p>))}
              </Grid>
            </Grid>
          </div>  
        </Container>
      </React.Fragment>
    );
  }
}