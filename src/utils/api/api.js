import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

class Api {
  constructor() {
    this.baseURL = BASE_URL;
    this.api = axios.create({
      baseURL: this.baseURL,
      params: {},
    });
    this.api.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async getWorkouts(id) {
    try {
      const response = await this.api.get(`/api/weeks/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching workouts:", error);
      return error.response ? error.response.data : { message: error.message };
    }
  }

  async getEveryWorkouts(diff, part) {
    try {
      let url = `/api/exercises`;
      if (diff && part) {
        url += `?difficulty=${diff}&part=${part}`;
      } else if (diff) {
        url += `?difficulty=${diff}`;
      } else if (part) {
        url += `?part=${part}`;
      }
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      return error.response ? error.response.data : { message: error.message };
    }
  }

  async getDayWorkouts(id, day) {
    try {
      const response = await this.api.get(`/api/day/${id}`, {
        params: { day },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching day workouts:", error);
      return error.response ? error.response.data : { message: error.message };
    }
  }

  async addWorkout(id, data) {
    try {
      const response = await this.api.post(`/api/day/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error adding workout:", error);
      return error.response ? error.response.data : { message: error.message };
    }
  }

  async updateWorkout(id, data) {
    try {
      const response = await this.api.put(`/api/day/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating workout:", error);
      return error.response ? error.response.data : { message: error.message };
    }
  }

  async deleteWorkout(id, data) {
    try {
      const response = await this.api.delete(`/api/day/${id}`, { data });
      return response.data;
    } catch (error) {
      console.error("Error deleting workout:", error);
      return error.response ? error.response.data : { message: error.message };
    }
  }
  async getUser(id) {
    try {
      const response = await this.api.get(`/api/user/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return error.response ? error.response.data : { message: error.message };
    }
  }
}

const api = new Api(BASE_URL);

export default api;
