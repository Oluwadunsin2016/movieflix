
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Movie from './Movie';
import { useGetMovies } from '../api/movieMutation';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


const SearchedMovies = () => {
  const [searchParams]= useSearchParams()
  const searchText = searchParams.get('search') || '';
  const {data:movies, isLoading} = useGetMovies(searchText||'')
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

console.log("Saved Movies:", movies);



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

  return (
    <>
{movies && movies.length > 0 && <div className="mt-4 md:mt-6">
    <h2 className="text-white font-bold md:text-xl mb-3">Search Results</h2>
 <div className="relative flex items-center group">
           {hasOverflow && (
                  <button
                    onClick={slideLeft}
                    className="bg-white text-gray-950 left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition-all duration-300 p-1"
                  >
                    <MdChevronLeft size={30} />
                  </button>
                )}
      <div
            ref={sliderRef}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative space-x-4"
      >
        {movies?.map((movie, id) => (
          <Movie key={id} movie={movie} />
        ))}
      </div>
       {hasOverflow && (
                  <button
                    onClick={slideRight}
                    className="bg-white text-gray-950 right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition-all duration-300 p-1"
                  >
                    <MdChevronRight size={30} />
                  </button>
                )}
    </div>
  </div>}
    </>
  )
}

export default SearchedMovies