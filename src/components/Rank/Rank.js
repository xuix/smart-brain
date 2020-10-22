import React from 'react';

const Rank =({user})=>{


    console.log('in rank count =',user)
    return(
            <div>
            
                <div>
                    <p className='f3 white'>{`${user.name} your current Rank is.....`}</p>

                </div>

                <div>
                    <p className='f1 white'>{`${user.entries}`} </p>
                </div>
            </div>
    
        )

};
export default Rank;