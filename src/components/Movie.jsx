import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useDeleteMovies, useGetSavedMovies, useSaveMovies } from "../api/movieMutation";
import { setToast } from "./Toast/toastUtils";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Movie = ({ movie={}, handDelete=()=>{}, savedMovies=[] }) => {
  const [like, setLike] = useState(false);
  const [added, setAdded] = useState(false);
  // const { user } = useAuth();
  const {setFeaturedMovie, user, scrollToFeaturedMovie} = useAuth();
  const {mutateAsync:saveMovie} = useSaveMovies()
  const {data:lovedMovies}= useGetSavedMovies({category: "loved"})
   const {mutateAsync:removeMovie}= useDeleteMovies()
   const navegate =useNavigate()

  // Extract video ID and thumbnail URL;
  const thumbnailUrl = movie?.snippet?.thumbnails?.high?.url;
  const title = movie?.snippet?.title;

  const saveShow = async (e) => {
    e.stopPropagation();
      if (!user) {
        setToast("warning", "Please login to like movies");
        return;
      }
    const isLoved = lovedMovies?.some((m) => m?.id?.videoId === movie?.id?.videoId);
    if (isLoved) {
    await removeMovie({
      videoId: movie.id.videoId,
      category: "loved", // or "watchLater", "watching"
    })
    setToast("success", "successfully Removed");
    } else {   
       await saveMovie({
         videoId: movie.id.videoId,
         title: movie.snippet.title,
         description: movie.snippet.description,
         thumbnail: movie.snippet.thumbnails.high.url,
         channelTitle: movie.snippet.channelTitle,
         publishedAt: movie.snippet.publishedAt,
         category: "loved", // or "watchLater", "watching"
       })
       setToast("success", "Saved successfully");
    }
  };

useEffect(() => {
const isLoved = lovedMovies?.some((m) => m?.id?.videoId === movie?.id?.videoId);
    setLike(isLoved);
}, [lovedMovies])


useEffect(() => {
const isAdded = savedMovies.length>0 && savedMovies?.some((m) => m?.id?.videoId === movie?.id?.videoId);
setAdded(isAdded);
}, [savedMovies])

const handleWatchMovie=()=>{
  setFeaturedMovie(movie)
  navegate('/')

  setTimeout(() => {
    scrollToFeaturedMovie();
  }, 300);
}


  return (
    <div onClick={handleWatchMovie} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
      <img
        className="w-full h-full object-cover"
        src={thumbnailUrl}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white transition-opacity duration-300">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center px-2">
          {title}
        </p>
        <p onClick={saveShow} className="absolute top-4 left-4">
          {like ? (
            <FaHeart className="text-red-500 hover:text-red-400 transition-colors" />
          ) : (
            <FaRegHeart className="text-gray-300 hover:text-white transition-colors" />
          )}
        </p>
        {added && <p onClick={(e)=>handDelete(e,movie.id.videoId)} className="absolute top-4 right-4">
          <Trash2 size={16} />
        </p>}
      </div>
    </div>
  );
};

export default Movie;
