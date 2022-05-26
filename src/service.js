import axios from "axios";
// import { useDispatch } from "react-redux";
import { getApiDataSuccess } from "./redux/GetApiData";

const BaseUrl = " https://flaskapi-sanjeev.herokuapp.com";

export const getUsers = async () => {
  const response = await axios.post(`${BaseUrl}/create`);
  return response;
};

export const loadBlogsData = async (dispatch) => {
  const response2 = await axios.get(
    "https://flaskapi-sanjeev.herokuapp.com/posts"
  );
  console.log("response2", response2?.data?.posts);
  dispatch(getApiDataSuccess(response2?.data?.posts));
};
