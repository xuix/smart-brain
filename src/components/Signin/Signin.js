import React, { Component } from 'react';
import {baseURL} from '../../container/App';

import'./Signin.css';

class Signin extends Component {



    constructor(props){
    super(props)

    this.state  = {
        signinEmail:'',
        signinPassword:''
    }
    

    }

    onEmailChange =(event) =>{

        this.setState({signinEmail:event.target.value})
        console.log(this.state.signinEmail)

    }

    onPasswordChange =(event) =>{

        this.setState({signinPassword:event.target.value})
        console.log(this.state.signinPassword)

    }


    onsubmit =(event) =>{
        const {onRouteChange, loadUser} = this.props


        console.log('fetching to back end',baseURL)
        console.log('props=',this.props)


        fetch(`${baseURL}/signin`, {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body:JSON.stringify(
                            {email:this.state.signinEmail,password:this.state.signinPassword}
                            )
                        })
        .then(res => res.json())
        .then(user=>{console.log('!!user=',user)
                if (user.id){
                    loadUser(user)
                    onRouteChange('home')
                }
    
    
    })
        .catch(err => console.log('!!error=',err))
                    

       
            

    }

    render(){
        const {onRouteChange} = this.props

    return(
   
    <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 grow center shadow-5">

        <div className="measure pa4">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
            </div>
            <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
            </div>
        </fieldset>
        <div className="">
            <input className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onsubmit}/>
        </div>
        <div className="">
        <p className="f4 mt3 fw6 ph0 mh0 pointer" 
        onClick={()=>{onRouteChange('register')}}>Register</p>
        </div>
        </div>

        </article>
 


)
    }

}


export default Signin;