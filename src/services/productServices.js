import http from "../http-common";

class productServices{
    getIkans(){
        return http.get("/products");
    }
}

export default productServices