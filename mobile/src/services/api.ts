import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.63:3333",
});

export { API };
