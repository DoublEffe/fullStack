const dummy = (blogs) => {
  return 1
}

const totlaLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  let mostLiked = {}
  let max = 0
  blogs.forEach(blog => {
    if(blog.likes > max){
      max = blog.likes
      mostLiked = blog
    }
  })
  let { title, author, likes }=mostLiked
  return { title, author , likes }
}

const mostBlogs = (blogs) => {
  let mostBlogs = {}
  let max = 0
  blogs.forEach(blog => {
    if(blog.blog>max){
      max = blog.blog
      mostBlogs = blog
    }
  })
  let { author, blog } = mostBlogs
  return { author,blog }
}

const mostLikes = (blogs) => {
  let mostLikes = blogs.reduce((prev,curr,index) => {
    if(index===0){return curr}
    return prev.likes > curr.likes ? prev : curr
  },0)
  let { author,likes } = mostLikes
  return { author,likes }
}

module.exports = {
  dummy,
  totlaLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}