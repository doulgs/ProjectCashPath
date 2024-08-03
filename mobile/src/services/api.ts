import axios from "axios";
import { EXPO_IP_CONNECTION } from "@env";

const API = axios.create({
  baseURL: `http://${EXPO_IP_CONNECTION}:3333`,
});

export { API };
