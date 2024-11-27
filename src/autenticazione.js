
  import axios from "axios";

  // Set up the base URL and token
  const API_URL = "http://localhost:8055";
  const API_TOKEN = "2_a9PnJW2MjJBmBwzAOfV_57YnJz5qVU"; // Replace with your actual token

  const directusApi = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  // Fetch tasks example
  async function fetchTasks() {
    try {
      const response = await directusApi.get("/items/tasks");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

// Create a task example
async function createTask(data) {
  try {
    const response = await directusApi.post("/items/tasks", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

//fetch task_types example
async function fetchTaskTypes() {
  try {
    const response = await directusApi.get("/items/task_types");
    console.log(response.data);
    console.log(response.data.data[0].id , response.data.data[0].name);
    return response.data;
  } catch (error) {
    console.error("Error fetching task types:", error);
    throw error;
  }
}
async function updateTaskStatus(taskId, status) {
  try {
    const response = await directusApi.patch(`/items/tasks/${taskId}`, {
      status: status,
    });
    return response;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
}



export { fetchTasks, createTask, fetchTaskTypes, updateTaskStatus };