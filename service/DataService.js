import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
  },
});

class DataService {
  getTodayPlaylist() {
    return http.get("/playlist/today");
  }
  getAllPlaylist() {
    return http.get("/playlist/all");
  }
  getValidSc() {
    return http.get("/superchat/valid");
  }
  getAllSc() {
    return http.get("/superchat/all");
  }
  expireSc(id) {
    return http.get(`/superchat/expire/${id}`)
  }
  deleteAllSc() {
    return http.get("/superchat/delete/all");
  }
}

export default new DataService();
