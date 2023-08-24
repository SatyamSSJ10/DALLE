import axios from "axios";

export default class NetworkHandler {
  constructor() {
    this.baseURL = "http://10.0.2.2:3000";
    this.token = "";
    console.log("Created Object");
  }

  async callLogin(users, passwd) {
    await axios
      .post(this.baseURL + "/login", {
        username: users,
        password: passwd,
      })
      .then((response) => {
        console.log(response.data);
        this.token = response.data["token"];
        console.log(this.token);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });
  }

  callImage(prompts, sizes) {
    axios
      .post(this.baseURL + "/image", {
        Authorization: this.token,
        prompt: prompts,
        size: sizes,
      })
      .then((response) => console.log(response.data))
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
// new1.callLogin("user1","password1").then(()=>{new1.callImage("1girl, dancing","256x256")});
//
