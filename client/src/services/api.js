import axios from "axios";

const API = axios.create({
  baseURL: "https://life-os-backend-mxzr.onrender.com/api",
});

export default API;