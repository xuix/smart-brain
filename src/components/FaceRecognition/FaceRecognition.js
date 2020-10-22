import React from 'react';
import './FaceRecognition.css';
import FaceRecognitionBox from '../FaceRecognitionBox/FaceRecognitionBox'


const FaceRecognition =({imageUrl,boxes})=>{
    

return(

   
           
    <div className=" center">
    <div className="mt3 absolute center">
       <img id="inputimage" src={imageUrl} alt='' width="500px" height="auto"></img>
       {boxes.map(box => <FaceRecognitionBox box={box} />)}
    </div>
</div>

)


}
export default FaceRecognition;