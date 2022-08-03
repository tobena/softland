import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const forgotPassword = (email) => {
  return axios.post(API_URL + "forgotpassword", {

    email,

  });
};

const updatePassword = (resetid,resetcode,password) => {
  return axios.post(API_URL + "updatepassword", {
    resetcode,
    resetid,
    password,

  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

const updateUser = (userid,walletAddress,currentUser) => {
  return axios.post(API_URL + "updateuser", {
    userid,
    walletAddress,
    currentUser

  }).then(response => {
    if (response) {

      refreshUser();
    }

    return response.data;
  }).catch(err => {
    
    return { message: err.message };
    
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log("******* sign in *********** "+JSON.stringify(response.data));
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const refreshUser = () => {
  console.log("******* refreshUser *********** ");
 const currentUser = JSON.parse(localStorage.getItem("user"));

 return axios.post(API_URL + "refreshuser", currentUser
 ).then((response) => {

   if (response.data.accessToken) {
    localStorage.removeItem("user");
    console.log("******* removed former User object *********** ");
     localStorage.setItem("user", JSON.stringify(response.data));
     console.log("******* added new User object *********** ");
   }

   return response.data;
 });

};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  updatePassword,
  updateUser,
  refreshUser
};
