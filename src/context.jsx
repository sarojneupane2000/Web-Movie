//context <ApI></>
//useContext hooks

// context(warehouse)
// provider(delivery)
// consumer / (useContext( you ))
import React, { useContext, useEffect, useState } from "react";

//create api

export const API_URL = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}`;
//context
const AppContext = React.createContext();

//we need to create a provider function
const AppProvider = ({children}) => {
     //to fecth it in movie.js
    //state 1
    const [isLoading, setIsLoading] = useState(true);
    // state2
    const [movie, setMovie] = useState([]);
    //state3
    const[isError,setIsError]=useState({ show:"false", msg:"" });
    //state4 for search functionality
    const[query , setQuery] = useState("Batman");

    //defining getMovies
   const getMovies = async(url) =>{
    setIsLoading(true);
    try{
      // res= response
      //return promise should wait
      const res = await fetch(url);
      //the gain response will not be proper so fro we 
      // can read we use json method
      const data = await res.json();
      console.log(data);

      //passing data
       if(data.Response === "True"){
        setIsLoading(false);
        setIsError({
          Show: false, 
          msg:"",
        });
        setMovie(data.Search);
       }else{
        setIsError({
          Show: true, 
          msg: data.Error,
        });
       }

    }catch (error) {
        console.log(error);
    }
   };

//by deafalt we get data when we first time load dthe page
 //for that we use this
  useEffect(()=> {
    let timerOut= setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 800)

    return ()=> clearTimeout(timerOut)
  },[query]);

    return <AppContext.Provider value={{ isLoading, isError, movie ,query , setQuery }}>
        {children}
    </AppContext.Provider>
};

// gobal custom hooks
const useGlobalContext = () =>{
 return useContext(AppContext);
};

export {AppContext, AppProvider, useGlobalContext};