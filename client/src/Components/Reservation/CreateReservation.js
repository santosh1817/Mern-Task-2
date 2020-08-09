import React, { Component } from 'react'
import axios from 'axios'   

class CreateReservation extends Component {

    constructor(){
        super()
        this.state={
            service:'',
            servicesArray:['Hair Cut','Face Wash','Face-De-Tan','Make-Up'],
            date:'',
            timeSlot:'',
            message:'',
            mobile:'',
            username:'',
            slotArrayInitial:['10-11','11-12','12-1','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            slotArray1:[],
            loggedInUserId:'',
            notice:''          
        }
        
    }
    componentDidMount(){
        axios.get('http://localhost:3005/users/loggedinuser',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })

        .then((response)=>{
            this.setState(()=>({
                loggedInUserId:response.data._id
            }))
            
            console.log(this.state.loggedInUserId)
        })


        .catch(err=>console.log(err))
    }
  
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }


    handleDateChange=(e)=>{
        e.persist()
        const date=e.target.value
        this.setState({date},function(){
            const formData={
                date:this.state.date
            }
               
            axios.post(`http://localhost:3005/reservation/find-slots`,formData,{
                headers:{
                    'x-auth':localStorage.getItem('token')
                }
            })
            .then(response=>{
                console.log(response)
                this.setState(()=>({
                    //slotsOnDate:response.data,
                    slotArray1:this.state.slotArrayInitial.filter(function(item){
                        return response.data.indexOf(item)===-1
                    })
                    
                }))
                
        
            })
        }
        )        

    }

    handleSubmit=(e)=>{
        e.preventDefault()
        console.log('submit')
        const formData={
            date:this.state.date,
            service:this.state.service,
            timeSlot:this.state.timeSlot,
            message:this.state.message,
            username:this.state.loggedInUserId,
            mobile:this.state.mobile

        }

        axios.post(`http://localhost:3005/reservation/create`,formData,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            
            
            if(response.data.error){
                console.log(response.data.error)
                // this.setState(()=>({
                //     notice:response.data.error
                // }))

                // this.setState(()=>({
                //     date:'',timeSlot:'',message:'',mobile:'',username:'',service:''
                // }))

                // setTimeout( () =>{
                //     this.setState( () => ({
                //         notice: '' 
                //     }))

                // },3000)

            }else{
                this.setState(()=>({
                    date:'',timeSlot:'',message:'',mobile:'',username:'',service:''
                }))
                this.props.history.push('/reservation/view')
            }


            
            
            
        })
        .catch(err=>{
            console.log(err)
        })

    }

    render() {
        
        return (
            <div>
                <h1>Welcome to DMagical saloon</h1>
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        
                        <div className="form-group">
                            <label>
                                mobile
                                <input type="text"
                                    name="mobile"
                                    value={this.state.mobile}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="person mobile"
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Service 
                                <select value={this.state.service} name="service" onChange={this.handleChange}>
                                    <option value="">select</option>
                                    {
                                        this.state.servicesArray.map((item)=>{
                                            return <option key={item} value={item}>{item}</option>
                                        })
                                    }

                                </select>
                            </label>
                        </div>


                        <div className="form-group">
                            <label>
                                date

                                <input type="date"
                                    name="date"
                                    value={this.state.date}
                                    
                                    onChange={this.handleDateChange}
                                    className="form-control"
                                    placeholder="person email"
                                /> 
                                
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Available Time Slots 
                                <select value={this.state.timeSlot} name="timeSlot" onChange={this.handleChange}>
                                    <option value="">select</option>
                                    {
                                        this.state.slotArray1.map((slot)=>{
                                            return <option key={slot} value={slot}>{slot}</option>
                                        })
                                    }

                                </select>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Note (If Any)<br/>
                                <textarea
                                value={this.state.message}
                                onChange={this.handleChange}
                                name="message">
                                </textarea>
                            </label>
                        </div>

                        <input type="submit" className="btn btn-primary" />

                        {this.state.notice && <h3> {this.state.notice} </h3>}
                    </form>
                </div>
                
            </div>
        )
    }
}
export default CreateReservation
