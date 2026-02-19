import { createContext,useReducer,useEffect } from "react";

export const CartContext = createContext()

const initialState ={
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":{
        const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

    if(existingItem){
      return {
        ...state,
        cartItems: state.cartItems.map((item) => item.id === action.payload.id ? {...item, quantity:item.quantity+1}: item
        )
      };}

      return{
        ...state,
        cartItems:[
            ...state.cartItems,
            {...action.payload,quantity:1}
        ]
      }}

    
    case "INCREASE_QTY":
        return{
            ...state,
            cartItems: state.cartItems.map((item) => item.id === action.payload ? {...item,quantity:item.quantity+1}:item)
        }
    
    case "DECREASE_QTY": {
  const item = state.cartItems.find(
    (item) => item.id === action.payload
  );

  if (item.quantity > 1) {
    return {
      ...state,
      cartItems: state.cartItems.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    };
  }

  return {
    ...state,
    cartItems: state.cartItems.filter(
      (item) => item.id !== action.payload
    )
  };
}
    case "REMOVE_FROM_CART":{

    const item = state.cartItems.find((item) => item.id === action.payload)
    if(item.quantity>1){

        return{
            ...state,
            cartItems: state.cartItems.map((item) => item.id === action.payload ? {...item, quantity:item.quantity-1}: item)
        }}
    return{
        ...state,
        cartItems:state.cartItems.filter((item) => item.id!== action.payload)
    }}

    default:
      return state;
  }
}

export function CartProvider({children}){
    const [state,dispatch] = useReducer(cartReducer,initialState);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },[state.cartItems])

    return(
        <CartContext.Provider value={{state,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}