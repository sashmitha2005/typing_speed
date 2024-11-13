import axios from "axios"

const AxiosSetup = () =>{
    axios.defaults.baseURL = 'http://localhost:5000';
}

export default AxiosSetup;