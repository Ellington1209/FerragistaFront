import { Http } from "../../conf/GlobalConf";

class CategoriaService {
  static async create(obj) {
    let res = null;

    await Http.post("/api/categoria", obj).then((response) => {
      res = response.data;
    });

    return res;
  }
  static async getCategorias() {
    let res = null;

    await Http.get("/api/categoria").then((response) => {
      res = response.data;      
    });
    return res;
  }
}
export default CategoriaService;