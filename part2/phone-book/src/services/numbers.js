import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(BASE_URL).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(BASE_URL, newObject).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export default { getAll, create, remove };
