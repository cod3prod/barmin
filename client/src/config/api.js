import { API_URL } from "../config/config.js";
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
