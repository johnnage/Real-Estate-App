import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://bug-free-invention-9r4q5p4xjrrh9rrq-8800.app.github.dev/api",
    withCredentials: true,
});

export default apiRequest;