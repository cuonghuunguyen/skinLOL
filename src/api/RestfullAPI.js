import Axios from "axios";
import { BASE_URL, CONFIG } from "./../constant/apiInfo";

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  ...CONFIG
});
