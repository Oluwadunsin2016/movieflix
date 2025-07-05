/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetLoginUser } from "../api/authMutation";

const AuthContext = createContext({
  user: null,
  authenticate: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const storedToken = localStorage.getItem("movieToken");
  const isPublicRoute = ["/login", "/signup"].includes(location.pathname);
  const scrollRef = useRef(null);
  // ["/", "/sign-in", "/sign-up"].includes(location.pathname) ||
  // location.pathname.startsWith("/verification");
  // ["/sign-in", "/sign-up"].includes(location.pathname) ||
  // location.pathname.startsWith("/verification");

  const scrollToFeaturedMovie = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const tokenExpired = !storedToken || checkTokenExpiration(storedToken);
  
    if (tokenExpired) {
      if (!isPublicRoute) {
        logout();
      }
      return;
    }
  }, [location.pathname, storedToken]);

  
  
  const { data, isPending, isRefetching, error } = useGetLoginUser();

  useEffect(() => {
    if (error) {
      console.error("Error fetching profile:", error);
      logout(); // Log out if there's an auth error
    }
  }, [error]);

  useEffect(() => {
    
    if (!data) return;

    const { user: recentUser } = data.data;
    console.log("user", recentUser);
    if (recentUser && storedToken) {
      setUser(recentUser);
      startTokenExpirationCheck(storedToken);

      // Redirect if user is on sign-in page
      // if (["/", "/sign-in", "/sign-up"].includes(location.pathname)) {
      //   navigate("/home");
      // }
      if (recentUser && isPublicRoute) {
        // navigate("/home", { replace: true });
        navigate("/", { replace: true });
      }
      // if (location.pathname === "/sign-in"||location.pathname === "/sign-up") {
      //   navigate(-1);
      // }
    }
  }, [data, location.pathname]);

  // ✅ Function to check if the token is expired
  const checkTokenExpiration = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true; // Treat invalid tokens as expired
    }
  };

  // ✅ Start automatic logout when the token expires
  const startTokenExpirationCheck = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000;
    const timeUntilExpiry = expirationTime - Date.now();

    if (timeUntilExpiry > 0) {
      setTimeout(() => {
        logout();
      }, timeUntilExpiry);
    }
  };

  const authenticate = ({ user, token }) => {
    console.log("user", user);
    console.log("movieToken", token);
    localStorage.setItem("movieToken", token);
    setUser(user);
    // notifier({ message: "Logged in successfully", type: "success" });
    // navigate("/home");
    navigate("/");
    startTokenExpirationCheck(token);
  };

  const logout = () => {
    localStorage.removeItem("movieToken");
    setUser(null);
    navigate("/");
  };


  return (
    <AuthContext.Provider value={{ user, authenticate, logout,setFeaturedMovie,   scrollRef, scrollToFeaturedMovie,  featuredMovie, isReloading: isRefetching, isLoading: isPending }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
