describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'fabio',
      name: 'fab',
      password: '1234'
    }
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[type="text"]').type('fabio')
      cy.get('input[type="password"]').type('1234')
      cy.contains('Login').click()

      cy.get('.message').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[type="text"]').type('fabio')
      cy.get('input[type="password"]').type('123')
      cy.contains('Login').click()

      cy.get('.messagerror').should('be.visible')
        .and('have.css','color','rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login( {
        username: 'fabio', password: '1234'
      })
      
    })

    it('create a new blog', function() {
      cy.contains('new blog').click()
      cy.get('input[placeholder="insert title..."]').type('provaCy')
      cy.get('input[placeholder="insert author..."]').type('fabio')
      cy.get('input[placeholder="insert url..."]').type('https://prova')
      cy.get('button[type="submit"]').click()
      
      cy.get('.blog-list').should('have.length', 1)
    })
  
    describe('With a blog already created', function() {
      beforeEach(function() {
        cy.createBlog()
      })

      it('like a blog', function() {
        cy.get('#show').click()
        cy.get('#like').click()

        cy.get('span').contains(1)
      })

      it.only('creator of a blog can delete its own blog', function() {
        //cy.get('#show').click()
        cy.get('.blog-list').then(blog => console.log(blog))
        //[0].__reactProps$jllvrzibg.children[3]._owner.key
        //cy.get('.blog-list').should('have.length', 0)
      })
    })
  })
})