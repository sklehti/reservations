import axios from "axios";
const baseUrl = "http://localhost:3002/api";

const getDates = (playingDate) => {
  const request = axios.get(`${baseUrl}/getDate/${playingDate}`);
  return request.then((response) => response.data);
};

const getBooker = (userEmail, userPassword) => {
  const request = axios.get(
    `${baseUrl}/getBooker/${userEmail}/${userPassword}`
  );
  return request.then((response) => response.data);
};

const getBooking = (userEmail) => {
  const request = axios.get(`${baseUrl}/getEmail/${userEmail}`);
  return request.then((response) => response.data);
};

const getUserEmail = (userEmail) => {
  const request = axios.get(`${baseUrl}/getUserEmail/${userEmail}`);
  return request.then((response) => response.data);
};

const createBooking = (newBooking) => {
  axios.post(`${baseUrl}/createBooking`, newBooking);
};

const createUserWithBooking = (newBooking) => {
  axios.post(`${baseUrl}/createUserWithBooking`, newBooking);
};

export default {
  getDates,
  getBooker,
  getBooking,
  getUserEmail,
  createBooking,
  createUserWithBooking,
};
