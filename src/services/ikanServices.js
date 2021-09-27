import http from "../http-common";

class ikanServices{
    getIkans(){
        return http.get("/ikan");
    }
}

export default ikanServices