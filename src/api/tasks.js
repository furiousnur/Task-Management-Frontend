import api from "./axios";

export const getTasks = async (page = 1, limit = 10) => {
  const res = await api.get(`/tasks?page=${page}&limit=${limit}`);
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await api.post("/tasks", taskData);
  return res.data;
};

export const updateTask = async (id, taskData) => {
  const res = await api.patch(`/tasks/${id}`, taskData);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
