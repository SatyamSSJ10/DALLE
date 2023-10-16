import axios from "axios";
//const axios = require("axios");
//export default class NetworkHandler {
export default class NetworkHandler {
  constructor() {
    this.baseURL = "http://52.194.56.164:3000"; //10.0.2.2
    this.token = "";
    console.log("Created Object");
  }
  x;

  async callLogin(users, passwd) {
    try {
      const response = await axios.post(this.baseURL + "/login", {
        username: users,
        password: passwd,
      });
      this.token = response.data["token"];
      console.log(this.token);
    } catch (err) {
      if (err.response) {
        // Throw the status code so it can be caught by callers of callLogin
        throw err.response.status;
      } else if (err.request) {
        // The request was made but no response was received
        throw new Error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw err;
      }
    }
  }

  callImage(prompts, sizes) {
    return axios
      .post(this.baseURL + "/image", {
        Authorization: this.token,
        prompt: prompts,
        size: sizes,
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      }) //console.log(response.data))
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
  }

  callAuth() {
    axios
      .get(this.baseURL + "/auth", {
        Authorization: this.token,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
}

// const new1 = new NetworkHandler();
// new1.callLogin("user1", "password1").then(() => {
//   new1.callImage("1girl, dancing", "256x256");
// });
