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
    })
  })
})