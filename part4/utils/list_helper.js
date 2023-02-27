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
  let allLikes = []
  blogs.forEach(blog => {
    allLikes.push(blog.likes)
  })
  return Math.max(...allLikes)
}

module.exports = {
  dummy,
  totlaLikes,
  favoriteBlog
}