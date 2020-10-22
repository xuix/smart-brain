import React, {Component} from 'react';
import {baseURL} from '../../container/App';



class Register extends Component {



    constructor(props){
    super(props)

    this.state  = {
        registerName:'',
        registerEmail:'',
        registerPassword:'',
    }
    

    }


    onNameChange =(event) =>{

        this.setState({registerName:event.target.value})
        console.log(this.state.registerName)

    }

    onEmailChange =(event) =>{

        this.setState({registerEmail:event.target.value})
        console.log(this.state.registerEmail)

    }

    onPasswordChange =(event) =>{

        this.setState({registerPassword:event.target.value})
        console.log(this.state.registerPassword)

    }


    onsubmit =(event) =>{

        const {onRouteChange, loadUser} = this.props

        console.log('fetching to back end',baseURL)

        fetch(`${baseURL}/register`, {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body:JSON.stringify(
                            {name:this.state.registerName,
                            email:this.state.registerEmail,
                            password:this.state.registerPassword}
                            )
                        })
        .then(res => res.json())
        .then(user=>{console.log('!!user=',user)
                if (user.id != null){
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
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
             <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
             <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNameChange}/>
             </div>
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
            <input className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onsubmit}/>
        </div>
        <div className="">
        <p className="f4 mt3 fw6 ph0 mh0 pointer" 
        onClick={()=>{onRouteChange('signin')}}>Sign In</p>
        </div>
        </div>

        </article>
 


)
    }

}
// const Register =({onRouteChange})=>{
// return(
   
//     <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 grow center shadow-5">

//         <div className="measure pa4">
//         <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//             <legend className="f1 fw6 ph0 mh0">Register</legend>
//             <div className="mt3">
//             <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
//             <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="email-name"/>
//             </div>
//             <div className="mt3">
//             <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//             <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
//             </div>
//             <div className="mv3">
//             <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//             <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
//             </div>
//         </fieldset>
//         <div className="">
//             <input className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={()=>{onRouteChange('home')}}/>
//         </div>
//         </div>
//         </article>
 


// )


// }
export default Register;