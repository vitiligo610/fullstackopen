const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
	test('notes are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')
		const titles = response.body.map(r => r.title)

		expect(titles).toContain('Go To Statement Considered Harmful')
	})
	
	test('there is a unique identifier of each blog called id', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach(blog => {
			expect(blog.id).toBeDefined()
		})
	})
})

describe('addition of a blog', () => {
	test('a valid blog object can be added', async () => {
		const newBlog = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12
		}
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	
		const blogsAtEnd = await helper.blogsInDb()
		const titles = blogsAtEnd.map(blog => blog.title)
		
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
		expect(titles).toContain('Canonical string reduction')
	})

	test('if title or url are missing error code 400 is returned', async () => {
		const newBlog = {
			author: 'Edsger W. Dijkstra',
			likes: 10
		}
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
		
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})
	
	test('if likes are missing it will default to 0', async () => {
		const blog = {
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
		}

		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)

		const blogsAtEnd = await helper.blogsInDb()
		const likelessBlog = blogsAtEnd.find(r => r.title === blog.title)

		expect(likelessBlog.likes).toBe(0)
	})
})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

		const titles = blogsAtEnd.map(r => r.title)
		expect(titles).not.toContain(blogToDelete.title)
	})
})

describe('updating a blog', () => {
	test('succeeds with status code 200 if updated successfully', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const blog = {
			...blogToUpdate,
			likes: 29
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blog)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()
		const updatedBlog = blogsAtEnd[0]

		expect(updatedBlog.likes).toEqual(blog.likes)
		expect(updatedBlog.likes).not.toEqual(blogToUpdate.likes)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
