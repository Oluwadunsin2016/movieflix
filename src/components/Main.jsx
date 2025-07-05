import React, { useEffect, useState } from "react";
import { useGetMovies, useSaveMovies } from "../api/movieMutation";
import { useAuth } from "../context/AuthContext";
import { Button } from "@heroui/react";
import { setToast } from "./Toast/toastUtils";

const Main = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const {featuredMovie, setFeaturedMovie, user} = useAuth();
  const { data:movies, isLoading } = useGetMovies("full movie 2025");
   const {mutateAsync:saveMovie} = useSaveMovies()


  // Set a random featured movie when movies are loaded
  useEffect(() => {
    if (movies?.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies?.length)];
      setFeaturedMovie(randomMovie);
    }
  }, [movies]);

  const handlePlay = async(selectedVideo) => {
    console.log("Playing video:", selectedVideo);
    setPlayingVideoId(selectedVideo.id.videoId);
    if (!user)return;
    await saveMovie({
       videoId: selectedVideo.id.videoId,
       title: selectedVideo.snippet.title,
       description: selectedVideo.snippet.description,
       thumbnail: selectedVideo.snippet.thumbnails.high.url,
       channelTitle: selectedVideo.snippet.channelTitle,
       publishedAt: selectedVideo.snippet.publishedAt,
       category: "watching", // or "watchLater", "loved"
     })
  };

  const handleWatchLater = async(selectedVideo) => {
try {
  if (!user) {
    setToast("warning", "Please login to add to watchlist");
    return;
    
  }
  const response = await saveMovie({
    videoId: selectedVideo.id.videoId,
    title: selectedVideo.snippet.title,
    description: selectedVideo.snippet.description,
    thumbnail: selectedVideo.snippet.thumbnails.high.url,
    channelTitle: selectedVideo.snippet.channelTitle,
    publishedAt: selectedVideo.snippet.publishedAt,
    category: "watchLater", // or "watchLater", "watching"
  })
  setToast("success", response.message || "Added to Watchlist");
} catch (error) {
  setToast("error", error.response.data.message || "There is an error");
}
  };

  const handleCloseVideo = () => {
    setPlayingVideoId(null);
    
    // Set a new random movie when closing the player
    if (movies?.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies?.length);
      setFeaturedMovie(movies[randomIndex]);
    }
  };

  const truncatedString = (str, num) => {
    if (!str) return "";
    if (str.length > num) {
      return str.slice(0, num) + '...';
    }
    return str;
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full h-[400px] md:h-[550px] flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading featured movies...</p>
        </div>
      </div>
    );
  }

  // Show video player if playing
  if (playingVideoId) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="flex justify-between gap-6 items-center p-4 bg-black">
          <h2 className="md:text-xl font-bold text-white line-clamp-1">
            {/* Now Playing: {truncatedString(featuredMovie?.snippet?.title, 30 )|| "Movie"} */}
            Now Playing: {featuredMovie?.snippet?.title|| "Movie"}
          </h2>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-2 md:px-4 p-1 md:py-2 rounded-lg transition flex items-center cursor-pointer text-sm"
            onClick={handleCloseVideo}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Close
          </button>
        </div>
        
        <div className="flex-grow relative">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1&mute=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video Player"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    );
  }

  // Show banner if no video is playing
  return (
    <div className="w-full h-[350px] md:h-[600px] text-white relative overflow-hidden">
      {featuredMovie ? (
        <>
          {/* Background image with gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black z-10"></div>  
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={featuredMovie.snippet.thumbnails.high.url}
            alt={featuredMovie.snippet.title}
          />
                 <div className="absolute hidden top-4 w-full h-full z-20 md:flex justify-between px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
         <img
            className="size-12 rounded"
            // src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png'
            src='./M_black.png'
            alt='netflix logo'
          />
          
          {/* Random movie indicator */}
          <div className="bg-black/70 px-3 h-6 rounded-full text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured Movie
          </div>
          </div>
          {/* Movie info overlay */}
          <div className="absolute bottom-0 left-0 w-full z-20">
            <div className="mx-6 md:mx-12 lg:mx-16 xl:mx-20 2xl:mx-24">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg line-clamp-2">
                {featuredMovie.snippet.title}
              </h1>
              
              <div className="flex gap-3 my-4 z-[999]">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 md:py-3 md:px-6 rounded flex items-center transition transform hover:scale-105"
                  onPress={() => handlePlay(featuredMovie)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Play Now
                </Button>
                <Button onPress={() => handleWatchLater(featuredMovie)} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 md:py-3 md:px-6 rounded flex items-center transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Watch Later
                </Button>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">
                Released: {formatDate(featuredMovie.snippet.publishedAt)}
              </p>
              
              <p className="text-gray-200 text-sm md:text-base max-w-2xl">
                {truncatedString(featuredMovie.snippet.description, 200)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <p className="text-xl text-gray-400">No featured movie available</p>
        </div>
      )}
    </div>
  );
};

export default Main;