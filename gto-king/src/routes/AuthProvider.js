import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getUserInfo } from '../api.js'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const checkSession = async () =>{
      const user = await getUserInfo();
      setUser(user)
    }
    checkSession()
  },[])

  // call this function when you want to authenticate the user
  const login = async (data) => {
    try {
      const user = await loginUser(data)
      setUser(user);
      navigate("/profile");
    } catch (error) {
      console.log("error")
      throw error
    }

  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };
  

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};