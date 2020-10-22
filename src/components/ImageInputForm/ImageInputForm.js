import React from 'react';
import './ImageInputForm.css';
const ImageInputForm =({onSearchChange,onButtonClick})=>{
return ( <div >
            <p className='f3'>{'Smart Brain can detect faces. Enter a URL below'}</p>
       
            <div className='center '>
                <div className='pa4 br3 shadow-5 center form' >
                    <input className='f4 pa2 w-70 center' type='text' onChange={onSearchChange} ></input>
                    <button className='w-30 grow link ph3 pv2 dib white bg-light-purple'onClick={onButtonClick}>Detect</button>
                </div>
            </div>

        </div>
)

}
export default ImageInputForm;
    