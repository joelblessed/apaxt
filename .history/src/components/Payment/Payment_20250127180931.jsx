import React, { useState } from 'react'

const Payment = (calculateTotal) => {

    
    async function createApiUser() {
        console.log('Creating API user...');
        // Add the logic to create an API user
        // You should replace the URL with your server's endpoint for creating an API user
        // This is a sample logic
        const response = await fetch('http://localhost:3001/create-api-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
    
    async function getCreatedUser(userId) {
        console.log('Retrieving created user...');
        const response = await fetch(`http://localhost:3001/get-created-user/${userId}`);
        return response.json();
    }
    
    async function retrieveApiKey(userId) {
        console.log('Retrieving API key...');
        const response = await fetch(`http://localhost:3001/retrieve-api-key/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
    
    async function generateApiToken(userId, apiKey) {
        console.log('Generating MoMo token...');
        const response = await fetch('http://localhost:3001/generate-api-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, apiKey })
        });
        return response.json();
    }
    
    async function requestToPay(phone, amount, momoTokenId) {
        console.log('Making payment request...');
        console.log('MoMo Token: ', JSON.stringify(momoTokenId));
        const response = await fetch('http://localhost:3001/request-to-pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${momoTokenId}`
            },
            body: JSON.stringify({ phone, total: amount, momoTokenId })
        });
        return response.json();
    }
    


    const [amount, setAmount] = useState("")
    const [phone, setNumber] = useState("")
    const [message, setMessage] = useState("")
 async function Data (e) {
        
       
        
    
        if (!phone || !amount) {
            setMessage('Please enter both phone number and amount.');
            return;
        }
    
        try {
            // Step 1: Create API User
            const userCreationResponse = await createApiUser();
            const userId = userCreationResponse.userId;
            console.log('user id: ', userId);
    
            // Step 2: Retrieve Created User
            await getCreatedUser(userId);
    
            // Step 3: Retrieve API Key
            const apiKeyResponse = await retrieveApiKey(userId);
            const apiKey = apiKeyResponse.apiKey;
            console.log('user api key: ', apiKey);
    
            // Step 4: Generate MoMo Token
            const tokenResponse = await generateApiToken(userId, apiKey);
            const momoTokenId = tokenResponse.access_token;
            console.log('momo token: ', momoTokenId);
    
            // Step 5: Make Payment Request
            const paymentResponse = await requestToPay(phone, amount, momoTokenId);
    
            console.log('Payment Reference id: ', paymentResponse.paymentRefId);
            console.log('externalId: ', paymentResponse.externalId);
    
            if (paymentResponse.success) {
                setMessage('Payment successful!');
            } else {
                setMessage('Payment failed.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setMessage('An error occurred while processing the payment.');
        }
    };

    
  return (
    <div>
        <h1>{phone}</h1>
        <h1>{amount}</h1>
         <div class="payment-form">
        <h2>MoMo Payment</h2>
        <input type="number" placeholder="Phone Number" onChange={(e) => setNumber(e.target.value)} />
        <input type="number"  placeholder="Amount" onChange={(e) => setAmount(e.target.value)}/>
        <button  onClick={ Data }>Pay Now</button>
        <p>
        {message}
        </p>
    </div>
      
    </div>
  )
}

export default Payment
