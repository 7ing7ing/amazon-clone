import axios from "axios";

const instance = axios.create({
    baseURL: "https://us-central1-clone-d59c6.cloudfunctions.net/api" //The Api (cloud function) URL
});
//baseURL: "http://localhost:5001/clone-d59c6/us-central1/api"
export default instance;