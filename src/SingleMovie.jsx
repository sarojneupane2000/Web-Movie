import React,{ useState, useEffect}from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { API_URL } from './context';

const SingleMovie = () => {
  const { id } = useParams();
   //state 1
   const [isLoading, setIsLoading] = useState(true);
   // state2
   const [movie, setMovie] = useState("");

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
       setMovie(data);
      }

   }catch (error) {
       console.log(error);
   }
  };

//by deafalt we get data when we first time load dthe page
//for that we use this
 useEffect(()=> {
   let timerOut= setTimeout(() => {
     getMovies(`${API_URL}&i=${id}`);
   }, 800)

   return ()=> clearTimeout(timerOut)
 },[id]);

   if(isLoading){
    return(
      <div className='movie-section'>
        <div className='loading'>
          Loading....
        </div>
      </div>
    )
   }
  return (
    <>
     <section className='movie-section'>
      <div className='movie-card'>
        <figure>
          <img src={movie.Poster} alt=""/>
        </figure>
        <div className='card-content'>

          <p className='title'>{movie.Title}</p>
          <p className='card-test'>{movie.Released}</p>
          <p className='card-test'>{movie.Genre}</p>
          <p className='card-test'>{movie.imdbRating} /10</p>
          <p className='card-test'>{movie.Country}</p>
          <p className='card-test'>{movie.Language}</p>
              {/* used for sending them to home */}
          <NavLink to ="/" className="back-btn">Go Home</NavLink>
        </div>
      </div>
     </section>
    </>
  );
};

export default SingleMovie;
