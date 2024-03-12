import store from "../core/store";
import axios from "axios";

let baseURL: string = "http://dev.trainee.dex-it.ru/api";
const axiosInstance = axios.create({
  baseURL: "http://dev.trainee.dex-it.ru/api",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = JSON.parse(localStorage.auth).token;
    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
const Api = {
  async registration(data: any) {
    let response = await fetch(`${baseURL}/Auth/SignUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    return { data: result };
  },
  async login(data: any) {
    let formData = new FormData();
    let response = await fetch(`${baseURL}/Auth/SignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    return result;
  },
  team: {
    delete(id: any) {
      return axiosInstance.delete(`Team/Delete?id=${id}`, id);
    },
    async add(data: any) {
      // return axiosInstance.post("Team/Add", data);
      let response = await fetch(`${baseURL}/Team/Add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      return { data: result };
    },
    async upDateTeam(data: any) {
      // return axiosInstance.put("Team/Update", data);
      let response = await fetch(`${baseURL}/Team/Update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      return { data: result };
    },
    async getTeams(data: any) {
      // return axiosInstance.get(
      //   `Team/GetTeams?Page=${data.page}&PageSize=${data.pageSize}`
      // );
      let response = await fetch(
        `${baseURL}/Team/GetTeams?Page=${data.page}&PageSize=${data.pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
          },
        }
      );
      let result = await response.json();
      return { data: result };
    },
    async getTeam(data: any) {
      // return axiosInstance.get(`Team/Get?id=${data.id}`);
      let response = await fetch(`${baseURL}/Team/Get?id=${data.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
        },
      });
      let result = await response.json();
      return { data: result };
    },
  },
  player: {
    delete(id: any) {
      return axiosInstance.delete(`Player/Delete?id=${id}`, id);
    },
    async add(data: any) {
      //   return axiosInstance.post("Player/Add", data);
      let response = await fetch(`${baseURL}/Player/Add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      return { data: result };
    },
    async getPositions() {
      // return axiosInstance.get("Player/GetPositions");
      let response = await fetch(`${baseURL}/Player/GetPositions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
        },
      });
      let result = await response.json();
      return { data: result };
    },

    async getPlayers(data: any) {
      let response = await fetch(
        `${baseURL}/Player/GetPlayers?TeamIds=${data.teamIds
          .map((id: any) => id)
          .join("&&TeamIds=")}&Page=${data.page}&PageSize=${data.pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
          },
        }
      );
      let result = await response.json();
      return { data: result };
    },

    async upDate(data: any) {
      // return axiosInstance.put("Player/Update", data);
      let response = await fetch(`${baseURL}/Player/Update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      return { data: result };
    },

    async get(data: any) {
      // console.log(data);
      // return axiosInstance.get(`Player/Get?id=${data.id}`);
      let response = await fetch(`${baseURL}/Player/Get?id=${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
        },
      });
      let result = await response.json();
      return { data: result };
    },
  },

  async saveImage(data: any) {
    let response = await fetch(`${baseURL}/Image/SaveImage`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.auth).token}`,
      },
      body: data,
    });
    let result = await response.json();
    return { data: result };
  },
};

export default Api;
