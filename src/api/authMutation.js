import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import http from "./http"


export const useRegister=()=>{
    return useMutation({
mutationFn:async(payload)=>{
try {
const response = await http.post('/auth/register',payload)
    return response?.data
} catch (error) {
    throw Error(error)
}
}
    })
}
export const useLogin=()=>{
    const queryClient=useQueryClient()
    return useMutation({
mutationFn:async(payload)=>{
    const response = await http.post('/auth/login',payload)
return response?.data
},
onSuccess:async()=>{
queryClient.invalidateQueries(['user'])
}
    })
}
export const useUpdateUser=()=>{
    const queryClient = useQueryClient()
    return useMutation({
mutationFn:async(payload)=>{
   const response=await http.put('/auth/updateUser',payload);
   return response?.data
},
onSuccess:async()=>{
queryClient.invalidateQueries(['user'])
}
    })
}
export const useUploadProfileImage = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({file}) => {
        const formData = new FormData();
        formData.append("file", file); // the raw file
  
        const response = await http.post("/auth/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        return response?.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    });
  };
  
export const useGetLoginUser = () => {
    return useQuery({
      queryKey: ["user"],
      queryFn: () => http.get("/auth/user"),
      enabled: !!localStorage.getItem("movieToken"), // ✅ only run if token exists
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    });
  };

export const useGetAllUsers=()=>{
    return useQuery({
        queryKey:['users'],
queryFn:async()=>{
try {
   return await http.get('/auth/allUsers')
} catch (error) {
    throw Error(error)
}
}
    })
}