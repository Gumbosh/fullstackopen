import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(BASE_URL);
  return req.then((response) => response.data);
};

const create = (newObject) => {
  const req = axios.post(BASE_URL, newObject);
  return req.then((res) => res.data);
};

const update = (id, newObject) => {
  const req = axios.put(`${BASE_URL}/${id}`, newObject);
  return req.then((res) => res.data);
};

const remove = (id) => {
  const req = axios.delete(`${BASE_URL}/${id}`);
  return req.then((res) => res.data);
};

export default { getAll, create, update, remove };
