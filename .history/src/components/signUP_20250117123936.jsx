import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const SignUP = ({) => {


  const navigate = useNavigate();

  const handlesignup = () => {
    // Simulate a login process
    onSignIn(); // Update authentication state
    navigate("/dashboard"); // Navigate to dashboard after login
  };


  const [formData, setFormData] = useState({phoneNumber:""});
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Failed to add data.');
    }
  };
// uploads


const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('http://localhost:2000/accounts', {
    method: 'POST',
    body: formData,
  });

  const imageUrl = await response.json();

  // Save the image URL to db.json
  await fetch('http://localhost:5000/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: Date.now(), url: imageUrl }),
  });
}

const Buttons =()=>{
  handleChange()
  handlesignup()
}



  return (
    <div style={{}}>
      <h2 className='text-center mb-3'>Create New Account </h2>
     
      {/* {erroMessage} */}

      <div className='' style={{}}>
        <div className='col-lg-6 mx-auto'></div>
        <form style={{}} onSubmit={(event)=>handleSubmit(event)}  method="POST"  >
            <div className='mb-3'>
                <label className='col-sm-4 col-form-label'>First Name</label>
                <div className='col-sm-8'>
                    <input className='form-control'
                    type='text'
                    name=' firstNname'
                    value={formData.firstName}
                    defaultValue=''
                    placeholder='Enter your Name'
                    onChange={handleChange}
                    />

                </div>

            </div>
             
            <div className='mb-3'>
                <label className='col-sm-4 col-form-label'>Middel Name</label>
                <div className='col-sm-8'>
                    <input className='form-control'
                    type='text'
                    name='middleName'
                    Value={formData.middleName}
                    onChange={handleChange}
                    placeholder='Enter your Middle Name'
                    />

                </div>

            </div>

            <div className='mb-3'>
                <label className='col-sm-4 col-form-label'>Last Name</label>
                <div className='col-sm-8'>
                    <input className='form-control'
                    type="text"
                    name='lastName'
                    Value={formData.lastName}
                    onChange={handleChange}
                    placeholder='Enter your Last Name'
                    />

                </div>

            </div>
            <div className='mb-3'>
                <label className='col-sm-4 col-form-label'>Date of Birth</label>
                <div className='col-sm-8'>
                    <input className='form-control'
                    type='number'
                    name='dob'
                    Value={formData.dob}
                    onChange={handleChange}
                    placeholder='DD/MM/YY'
                    />

                </div>

            </div>
            <div className='mb-3'>
                <label className='col-sm-4 col-form-label'>Phone Number</label>
                <div className='col-sm-8'>
                 <div style={{display:"flex"}}>
                 <select style={{border:"0px"}}>
                    <option value="+237">+237</option>
                    <option Value="+234">+234</option>
                    </select>
                 <input className='form-control'
                 name='phoneNumber'
                 value={formData.phoneNumber}
                 placeholder='Phone number'
                 defaultValue=""
                 onChange={handleChange}
                 
                 />
                 </div>
                  
                </div>
                </div>

                <div className='mb-3'>
                <label className='col-sm-4 col-form-label'>E mail</label>
                <div className='col-sm-8'>
                    <input className='form-control'
                    value={FormData.email}
                    name='email'
                    type="text"
                    defaultValue=""
                    placeholder='example@gmail.com '
                    onChange={handleChange}
                    />

                </div>
                </div>

            <div className='mb-3'>
                <label className='col-sm-4 col-form-label'>Address</label>
                <div className='col-sm-8'>
                    <input className='form-control'
                    value={formData.address}
                    name='address'
                    type="text"
                    defaultValue=""
                    placeholder='State/City, Town/Village, Street/House Number'
                    onChange={handleChange}
                    />

                </div>
            </div>  

           
    
            <div className='mb-3'>
                <div className='offset-sm-4 col-sm-4 d-grid'>
                    <button type='submit' onClick={handleChange} onSubmit={handleUpload} className='btn btn-primary btn-sm me-3'>Save</button>
                </div>
                {/* <div className='col-sm-4 d-grid'>
                <button type="submit" >Submit</button>
                <button type='button' className='btn btn-secondary me-2'>Cancel</button>

                </div> */}
            </div>    
        </form>
        {responseMessage && <p>{responseMessage}</p>}

      </div>

      
    </div>
  )
}

export default SignUP
