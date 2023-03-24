import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = userToken => {
  let token = `Bearer ${userToken}`
  let userConfig = {
    headers: {Authorization: token}
  }
  return userConfig
}

const newBlog = async (newBlog,userToken) => {
  const response = await axios.post(baseUrl,newBlog,setToken(userToken))
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,newBlog }