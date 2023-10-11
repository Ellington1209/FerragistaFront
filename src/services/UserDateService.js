import { Http } from "../conf/GlobalConf";

class UserDataService {
  static async create(obj) {
    let res = null;

    await Http.post("/api/user", obj).then((response) => {
      res = response.data;
    });

    return res;
  }
  static async getUser() {
    let res = null;

    await Http.get("/api/user").then((response) => {
      
      res = response.data;
    });
    return res;
  }
}
export default UserDataService;