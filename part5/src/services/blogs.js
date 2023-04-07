import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = userToken => {
  let token = `Bearer ${userToken}`
  let userConfig = {
    headers: { Authorization: token }
  }
  return userConfig
}

const newBlog = async (newBlog,userToken) => {
  const response = await axios.post(baseUrl,newBlog,setToken(userToken))
  return response.data
}

const updateBlog = async (updatedBlog,id) => {
  const response = await axios.put(`${baseUrl}/${id}`,updatedBlog)
  return response.data
}

const deleteBlog = async (id,userToken) => {
  const response = await axios.delete(`${baseUrl}/${id}`,setToken(userToken))
  return response.data
}


export default { getAll,newBlog,updateBlog,deleteBlog }