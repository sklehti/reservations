import axios from "axios";
//const baseUrl = "http://localhost:3002/api";
const baseUrl = "/api";

const getDates = (playingDate) => {
  const request = axios.get(`${baseUrl}/getDate/${playingDate}`);
  return request.then((response) => response.data);
};

const getTopicalIssues = () => {
  const request = axios.get(`${baseUrl}/getTopicalIssues`);
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

const getGameBuddyUser = (email) => {
  const request = axios.get(`${baseUrl}/getGameBuddyUser/${email}`);
  return request.then((response) => response.data);
};

const getGameBuddies = (level, times) => {
  const request = axios.get(`${baseUrl}/getGameBuddies/${level}/${times}`);
  return request.then((response) => response.data);
};

const createBooking = (newBooking) => {
  axios.post(`${baseUrl}/createBooking`, newBooking);
};

const createUserWithBooking = (newBooking) => {
  axios.post(`${baseUrl}/createUserWithBooking`, newBooking);
};

const createTopicalIssue = (newIssue) => {
  axios.post(`${baseUrl}/createNewIssue`, newIssue);
};

const createGameBuddyUser = (newGameBuddyUser) => {
  axios.post(`${baseUrl}/createGameBuddyUser`, newGameBuddyUser);
};

const createMessage = (newMessage) => {
  axios.post(`${baseUrl}/sendMessage`, newMessage);
};

const deleteReservation = (id) => {
  axios.delete(`${baseUrl}/deleteReservation/${id}`);
};

const updateUserInfo = (user) => {
  axios.put(`${baseUrl}/updateUserInfo`, {
    name: user.name,
    address: user.address,
    email: user.email,
  });
};

const updateGameBuddyUser = (name, level, times, email) => {
  axios.put(`${baseUrl}/updateGamebuddyUser`, {
    name: name,
    level: level,
    times: times,
    email: email,
  });
};

export default {
  getTopicalIssues,
  getDates,
  getBooker,
  getBooking,
  getUserEmail,
  getGameBuddyUser,
  getGameBuddies,
  createBooking,
  createUserWithBooking,
  createTopicalIssue,
  createGameBuddyUser,
  createMessage,
  deleteReservation,
  updateUserInfo,
  updateGameBuddyUser,
};
