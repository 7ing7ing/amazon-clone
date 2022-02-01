import React, {createContext, useContext, useReducer } from "react";

//1. First we *createContext* and assign it to *StateContext* object containing Provider and Consumer. We will need just a Provider here.
export const StateContext = createContext();
//2. Then we create new React component called StateProvider. This component wraps its children with Provider that accepts value prop.
export const StateProvider = ({ reducer, initialState, children}) => (
    //3. useReducer accept *reducer* and *initialState* which are passed as a props from outside. So you have full control over them inside your app as you see.
    // The main trick here is that we pass result of the useReducer hook as a value to our Provider. So it becomes available in any component in your app component tree.
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
//useContext is another React hook that accepts context object as a parameter (StateContext in our case). Normally you would use useContext(StateContext) everywhere inside your app, where you would like to access the value of the context. But why repeat yourself, right?
//So this useStateValue function on the last line of our code is basically a custom hook and it’s a little trick how to access your state in any component of your application with less amount of code. It returns exactly the same [state, dispatch] array, that is passed as a value to our Provider.
export const useStateValue = () => useContext(StateContext);