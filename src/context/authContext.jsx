import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userInfo"]);

  const [authData, setAuthData] = useState();

  // const fetchUserData = async () => {
  //   const res = await axios.get("/api/v1/profile", {
  //     withCredentials: true,
  //   });

  //   const user = await res.data;

  //   setAuthData(user);

  //   console.log("authcontext hit", authData);
  //   setCookie("userInfo", JSON.stringify(user.user));
  // };

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get("/api/v1/profile", {
        withCredentials: true,
      });

      const user = await res.data;

      setAuthData(user);
      setCookie("userInfo", JSON.stringify(user.user));
    };

    fetchUserData();
  }, []);

  const setAuthUser = (user) => {
    setAuthData({ user });
    setCookie("userInfo", JSON.stringify(user));
  };

  const logout = () => {
    setAuthData(null);
    removeCookie("userInfo");
  };

  const refetchUser = async () => {
    const res = await axios.get("/api/v1/profile", {
      withCredentials: true,
    });

    const user = await res.data;

    console.log("authData1", authData);
    setAuthData(user);
    console.log("authData2", authData);
    setCookie("userInfo", JSON.stringify(user.user));
  };

  console.log("authDataFin", authData);

  return (
    <AuthContext.Provider
      value={{
        user: authData?.user,
        logout,
        setAuthUser,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
