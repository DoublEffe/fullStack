import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogList from '../components/BlogList'

test('display only blog author and title', () => {
  const blog = {
    title: 'prova',
    author: 'fabio',
    url: 'https://prova',
    likes: 0
  }

  const { container }=render(<BlogList blog={blog} />)
  const list = container.querySelector('.blog-list')
  expect(list).toHaveTextContent('prova')
  expect(list).toHaveTextContent('fabio')
  expect(list).not.toHaveTextContent('https://prova')

})

test.only('display url and likes after button clicked',async () => {
  const blog = {
    title: 'prova',
    author: 'fabio',
    url: 'https://prova',
    likes: 0
  }

  const { container }=render(<BlogList blog={blog} />)
  const user = userEvent.setup()
  const buttonShow = container.querySelector('#show')
  await user.click(buttonShow)

  const list = container.querySelector('.blog-list-visible')
  expect(list).toHaveTextContent('https://prova')
  expect(list).toHaveTextContent('Likes: ')
})
