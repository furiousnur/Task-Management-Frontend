import api from "./axios";
import toastr from "toastr";

export const getTasks = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/tasks?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    toastr.error("Failed to fetch tasks");
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  } catch (error) {
    toastr.error("Failed to fetch task");
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const res = await api.post("/tasks", taskData);
    toastr.success("Task created successfully");
    return res.data;
  } catch (error) {
    toastr.error("Failed to create task");
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const res = await api.patch(`/tasks/${id}`, taskData);
    toastr.success("Task updated successfully");
    return res.data;
  } catch (error) {
    toastr.error("Failed to update task");
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await api.delete(`/tasks/${id}`);
    toastr.success("Task deleted successfully");
    return res.data;
  } catch (error) {
    toastr.error("Failed to delete task");
    throw error;
  }
};