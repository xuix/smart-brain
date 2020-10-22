import React from 'react';
import './FaceRecognitionBox.css';


const FaceRecognitionBox =({box})=>{
return(
    


    <div className='bounding-box' style={{top:box.top,right:box.right,bottom:box.bottom,left:box.left}}></div>


)


}
export default FaceRecognitionBox;