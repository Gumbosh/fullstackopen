import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(BASE_URL).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(BASE_URL, newObject).then((response) => response.data);
};

export default { getAll, create };
