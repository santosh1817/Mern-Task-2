import React, { Component } from 'react'
import axios from 'axios'

class ListReservation extends Component {
    constructor(props){
        super(props)
        this.state={
            reservationsList:[],
            radioButton:''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3005/reservation/view',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            this.setState(()=>({
                reservationsList:response.data
            }))
            console.log(response)
        })
    }

    
    render() {
        return (
            <div>
                <h1>List of booked reservations </h1>
                 {this.state.reservationsList.length<1 && <h3>No reservation done yet</h3>}

                 <div>
                  <input type="radio"
                   id="Upcoming reservations"
                   name="reservation"
                   value={this.state.radioButton}
                   
                  />
                  <label  >
                    Upcoming Reservations
                  </label>
                 </div>

                 <div>
                  <input type="radio"
                   id="Past reservations"
                   name="reservation"
                   value={this.state.radioButton}
                  />
                  <label >
                    Past Reservations
                  </label>
                 </div>
                
            <table border="2">
              <thead>
                <tr> 
                  <th> Name </th>  
                  <th>Mobile </th>
                  <th>Service</th>
                  <th> Date </th>
                  <th> Slot </th>
                  <th> Message </th> 
                </tr>
              </thead>

            <tbody>
            {
              this.state.reservationsList.map(form =>{
                return (
                   
                  <tr key ={form._id} className="actiontext">
                    <td> { form.username.username } </td>
                    <td> { form.mobile } </td>
                    <td> { form.service }</td>
                    <td> { form.date  }</td>
                    <td> { form.timeSlot }</td>
                    <td> { form.message}</td>
                  </tr>

                )
              })
            }
            </tbody>
            </table>
            
          </div>
        )
    }
}

export default ListReservation
