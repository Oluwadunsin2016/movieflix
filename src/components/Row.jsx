import React, { useState, useRef, useEffect } from "react";
import Movie from "./Movie";
import { useGetMovies } from "../api/movieMutation";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Skeleton component for loading state
const MovieSkeleton = () => (
  <div className="inline-block w-40 md:w-48 lg:w-56 m-2 animate-pulse">
    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-700" />
  </div>
);

const Row = ({ title, query, rowId }) => {
  const { data: movies, isLoading } = useGetMovies(query);
  const sliderRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  
  useEffect(() => {
    const checkOverflow = () => {
      if (sliderRef.current) {
        const element = sliderRef.current;
        const hasHorizontalOverflow = element.scrollWidth > element.clientWidth;
        setHasOverflow(hasHorizontalOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [movies, isLoading]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  // Create skeleton array for loading state
  const skeletonItems = Array.from({ length: 8 }, (_, i) => (
    <MovieSkeleton key={`skeleton-${i}`} />
  ));

  return (
    <div className="mt-4 md:mt-6 relative">
      <h2 className="text-white font-bold md:text-xl mb-3">{title}</h2>
      {isLoading ? (
        // Loading skeleton state
        <div className="relative">
          <div
            ref={sliderRef}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          >
            {skeletonItems}
          </div>
        </div>
      ) : movies && movies.length > 0 ? (
        // Loaded with movies
        <div className="relative flex items-center group">
          {/* Left chevron - only show if hasOverflow */}
          {hasOverflow && (
            <button
              onClick={slideLeft}
              className="bg-white text-gray-950 left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition-all duration-300 p-1"
              aria-label={`Scroll ${title} left`}
            >
              <MdChevronLeft size={30} />
            </button>
          )}
          
          <div
            ref={sliderRef}
            id={`slider${rowId}`}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative space-x-4"
          >
            {movies.map((movie, id) => (
              <Movie key={id} movie={movie} />
            ))}
          </div>
          
          {/* Right chevron - only show if hasOverflow */}
          {hasOverflow && (
            <button
              onClick={slideRight}
              className="bg-white text-gray-950 right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition-all duration-300 p-1"
              aria-label={`Scroll ${title} right`}
            >
              <MdChevronRight size={30} />
            </button>
          )}
        </div>
      ) : (
        // No movies found state
        <div className="w-full h-[10rem] flex items-center justify-center rounded-lg bg-gray-800/50">
          <p className="text-gray-400 text-center p-4">
            No movies found for this category
          </p>
        </div>
      )}
    </div>
  );
};

export default Row;