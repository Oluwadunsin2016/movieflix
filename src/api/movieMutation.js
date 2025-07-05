

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import http from "./http";
const API_KEY = import.meta.env.VITE_GOOGLE_YOUTUBE;
export const useGetMovies = (query) => {
  return useQuery({
    queryKey: ['movies', query], // include query here
    queryFn: async () => {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            videoDuration: "long",
            maxResults: 50,
            key: API_KEY,
          },
        }
      );
      return res.data.items;
    //   return [{
    //   "kind": "youtube#searchResult",
    //   "etag": "bPeGsp4qzEwLZjdid_u4RaXnePw",
    //   "id": {
    //     "kind": "youtube#video",
    //     "videoId": "daxLrGQcJJU"
    //   },
    //   "snippet": {
    //     "publishedAt": "2025-06-30T17:00:34Z",
    //     "channelId": "UCypAoMCRQuNL2RBwy-x4oQg",
    //     "title": "DON&#39;T JUDGE ME - MAURICE SAM, SONIA UCHE, Latest 2025 Nigerian Movie",
    //     "description": "This powerful movie explores love, pain, and redemption in a world quick to condemn. A perfect watch for the week, Don't Watch ...",
    //     "thumbnails": {
    //       "default": {
    //         "url": "https://i.ytimg.com/vi/daxLrGQcJJU/default.jpg",
    //         "width": 120,
    //         "height": 90
    //       },
    //       "medium": {
    //         "url": "https://i.ytimg.com/vi/daxLrGQcJJU/mqdefault.jpg",
    //         "width": 320,
    //         "height": 180
    //       },
    //       "high": {
    //         "url": "https://i.ytimg.com/vi/daxLrGQcJJU/hqdefault.jpg",
    //         "width": 480,
    //         "height": 360
    //       }
    //     },
    //     "channelTitle": "Uchenna Mbunabo Tv",
    //     "liveBroadcastContent": "none",
    //     "publishTime": "2025-06-30T17:00:34Z"
    //   }
    // },];
    },
    staleTime: 1000 * 60 * 5, // optional: cache each query for 5 mins
  });
};

export const useSaveMovies=()=>{
  const queryClient =useQueryClient();
  return useMutation({
mutationFn:async(payload)=>{
  const response = await http.post('/movie/save',payload)
    return response?.data
},
onSuccess:async(response,variables)=>{
const {category} = variables;
  queryClient.invalidateQueries({
    queryKey: ["savedMovies", category]
  });
}
  })
}

export const useDeleteMovies=()=>{
  const queryClient =useQueryClient();
  return useMutation({
mutationFn:async(payload)=>{
  const response = await http.delete(`/movie/${payload.videoId}/${payload?.category}`)
    return response?.data
},
onSuccess:async(response,variables)=>{
const {category} = variables;
  queryClient.invalidateQueries({
    queryKey: ["savedMovies", category]
  });
}
  })
}

export const useGetSavedMovies = ({ category }) => {
  return useQuery({
    queryKey: ['savedMovies', category],
    queryFn: () => http.get(`/movie/${category}`).then(res => res.data),
    enabled: !!localStorage.getItem('movieToken'),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};