import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogList from '../components/BlogList'
import BlogForm from '../components/BlogForm'

const blog = {
  title: 'prova',
  author: 'fabio',
  url: 'https://prova',
  likes: 0
}
const user = userEvent.setup()

test('display only blog author and title', () => {
  const { container }=render(<BlogList blog={blog} />)
  const list = container.querySelector('.blog-list')

  expect(list).toHaveTextContent('prova')
  expect(list).toHaveTextContent('fabio')
  expect(list).not.toHaveTextContent('https://prova')

})

test('display url and likes after button clicked',async () => {
  const { container }=render(<BlogList blog={blog} />)
  const buttonShow = container.querySelector('#show')
  await user.click(buttonShow)

  const list = container.querySelector('.blog-list-visible')
  expect(list).toHaveTextContent('https://prova')
  expect(list).toHaveTextContent('Likes: ')
})

test('test likes button handler called twice',async () => {
  const handleUpdateLikes = jest.fn()
  const { container }=render(<BlogList onUpdate={ handleUpdateLikes } blog={ blog } />)
  const buttonShow = container.querySelector('#show')
  await user.click(buttonShow)

  const buttonLikes = container.querySelector('#like')
  await user.click(buttonLikes)
  await user.click(buttonLikes)

  expect(handleUpdateLikes.mock.calls).toHaveLength(2)
})

test('testing new blog',async () => {
  const handleNewBlog = jest.fn()
  render (<BlogForm onCreate={handleNewBlog} />)

  const title = screen.getByPlaceholderText('insert title...')
  const author = screen.getByPlaceholderText('insert author...')
  const url = screen.getByPlaceholderText('insert url...')
  const buttonCreate = screen.getByText('create')

  await user.type(title,blog.title)
  await user.type(author,blog.author)
  await user.type(url,blog.url)
  await user.click(buttonCreate)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0].title).toBe('prova')
  expect(handleNewBlog.mock.calls[0][0].author).toBe('fabio')
  expect(handleNewBlog.mock.calls[0][0].url).toBe('https://prova')


})