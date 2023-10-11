import { Http } from "../../conf/GlobalConf";

class ProdutosService {
  static async create(data) {
    let res = null;

    const headers = {
      "Content-Type": "multipart/form-data",
    };
   
    await Http.post("/api/produtos", data, { headers }).then((response) => {
      res = response.data;
     
    });

    return res;
  }

 

  static async getProdutos() {
    let res = null;

    await Http.get("/api/produtos").then((response) => {
      res = response.data; });
    return res;
  }

  static async UpdateProdutos(id, categoria) {
    let res = null;
  
    const data = {
      id: id,
      categoria: categoria,
    };
  
    await Http.put(`/api/produto/${id}`, data).then((response) => {
      res = response.data;
    });
  
    return res;
  }

  static async DeleteProdutos(id) {
    let res = null;
  

    await Http.delete(`/api/produto/${id}`).then((response) => {
      res = response.data;
    });
  
    return res;
  }
}
export default ProdutosService;