import axios from "axios";

const url='http://localhost:3001/persons';

const getAll = () =>{
    const request = axios.get(url)
    return request.then(response=>response.data)
}

const create = newNumber =>{
    const request = axios.post(url , newNumber)
    return request.then(response=>response.data)
}
// eslint-disable-next-line
export default {getAll,create}