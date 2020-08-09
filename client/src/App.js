import React from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import axios from 'axios';
import './app.css';
import CreateReservation from './Components/Reservation/CreateReservation'
import ListReservation from './Components/Reservation/ListReservation'


class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false 
    }
  }
  // handle page reloading, if the user is logged in, continue to login
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState(() => ({ 
        isAuthenticated: true 
      }))
    }
  }

  handleAuthentication = (boolean) => {
    this.setState(() => ({
      isAuthenticated: boolean
    }))
  }

  render() {
    return(
      <BrowserRouter>
      
        <div className="container">
          
          <div className="pt-5">
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <ul className="navbar-nav mr-auto">
                {this.state.isAuthenticated ? (
                 
                  <div className=" navitems1 "> 
                  <li className="nav-item ml-4"><Link to="/reservation/create" >Create reservation</Link></li>
                  <li className="nav-item ml-4"><Link to="/reservation/view" >View reservation</Link></li>
                  <li className="nav-item ml-4"><Link to="/users/logout" >Logout</Link></li>
                  </div>
              

                  ) : (
                  <div className="navitems1">
                    <li className="nav-item"><Link to="/users/register">Register</Link></li>
                    <li className="nav-item ml-5"><Link to="/users/login">Login</Link></li>
                  </div>
                )}
              </ul>
            </nav>

          </div>
          <Switch>
          <Route path="/reservation/view" component={ ListReservation } />
          <Route path="/reservation/create" component={ CreateReservation } />
          <Route path="/users/register" component={ Register } />
          <Route path="/users/login" render={(props) => {
              return <Login {...props} handleAuthentication={this.handleAuthentication} />
          }} />
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Welcome to D Magical Saloon</h1>
                <p className="lead">Built using Node + Express + React + Mongo</p><br/>
                <p>Please Login to use the online   reservation portal</p>
            </div>
          </div>
          <Route path="/users/logout" render={(props) => {
              axios.delete('http://localhost:3005/users/logout', {
                headers: {
                  'x-auth': localStorage.getItem('token')
                }
                })
                .then(response => {
                  props.history.push('/users/login')
                  this.setState(() => ({
                    isAuthenticated: false
                  }))
                  localStorage.removeItem('token')
                })
              }} />
        </Switch>
        </div>
      </BrowserRouter>  
    )
  }
}

export default App;
