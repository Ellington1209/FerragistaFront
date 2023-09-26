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
  static async editCategorias(id) {
    let res = null;

    await Http.get(`/api/categoria/${id}`).then((response) => {
      res = response.data;     
    
    });
    return res;
  }
  static async UpdateCategorias(id, categoria) {
    let res = null;
  
    const data = {
      id: id,
      categoria: categoria,
    };
  
    await Http.put(`/api/categoria/${id}`, data).then((response) => {
      res = response.data;
    });
  
    return res;
  }
}
export default CategoriaService;