import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

class ListReservation extends Component {
    constructor(props){
        super(props)
        this.state={
            reservationsList:[],
            selectedRadio:"",
            reservations:[]
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

    handleRadioUpcoming=(e)=>{
      
    
      this.setState({

        selectedRadio:e.target.value,
        reservations:this.state.reservationsList.filter((item)=>{
          
          return new Date(item.date)>new Date()
        })
      })
     
   
    }

    handleRadioPast=(e)=>{
   
     
      this.setState({
        selectedRadio:e.target.value,
        
        reservations:this.state.reservationsList.filter((item)=>{
          
          return new Date(item.date)<new Date()
        })
      })
  
    }
    handleRadioAll=(e)=>{
   
     
      this.setState({
        selectedRadio:e.target.value,
        reservations:this.state.reservationsList
          
        
      })
  
    }

    
    render() {
        return (
            <div>
                <h1>List of booked reservations </h1>
                 {this.state.reservationsList.length<1 && <h3>No reservation done yet</h3>}

                 <div>
                  <input type="radio"
                   
                   //name="upcoming reservations"
                   checked={this.state.selectedRadio==="upcoming reservations"}
                   value="upcoming reservations"  
                   onChange={this.handleRadioUpcoming}
                   
                  />
                  <label  >
                    Upcoming Reservations
                  </label>
                 </div>

                 <div>
                  <input type="radio"
                  //  id="All reservations"
                  //  name="reservation"
                   checked={this.state.selectedRadio==="all reservations"}
                   value="all reservations"
                   onChange={this.handleRadioAll}
                   
                  />
                  <label  >
                    All Reservations
                  </label>
                 </div>

                 <div>
                  <input type="radio"
                  //  id="Past reservations"
                  //  name="reservation"
                   checked={this.state.selectedRadio==="past reservations"}
                   value="past reservations"
                   onChange={this.handleRadioPast}
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
              this.state.reservations.map(form =>{
                return (
                   
                  <tr key ={form._id} className="actiontext">
                    <td> { form.username.username } </td>
                    <td> { form.mobile } </td>
                    <td> { form.service }</td>
                    <td> { moment(new Date(form.date)).format('DD-MM-YYYY') }</td>
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
