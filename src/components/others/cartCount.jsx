import React, { useEffect, useState } from 'react';

const CartCount = ({cart, }) => {

  



  // Calculate total items in cart
//   const totalItems = cart.reduce((total, item) => total + item.forCount, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.forCount}
          </li>
        ))}
      </ul>
      {/* <h2>Total Items: {totalItems}</h2> */}
    </div>
  );
};

export default CartCount;