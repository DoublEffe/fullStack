import axios from "axios";
//changed
const url='/api/persons';

const getAll = () =>{
    const request = axios.get(url)
    return request.then(response=>response.data)
}

const create = newNumber =>{
    const request = axios.post(url , newNumber)
    return request.then(response=>response.data)
}

const cancel = id =>{
    const request = axios.delete(url+`/${id}`)
    return request.then(response=>response)
}

const update = (id,updated) =>{
    const request = axios.put(url+`/${id}`,updated)
    return request.then(response=>response.data)
}

// eslint-disable-next-line
export default {getAll,create,cancel,update}