import axios from "axios";
const instance = axios.create({
  baseURL: "https://flaskapi-sanjeev.herokuapp.com",
});
export default instance;
