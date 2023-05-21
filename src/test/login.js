
describe('Example Test', () => {
  it('should visit the homepage', () => {
    cy.visit('/login')
  })

  it('should find and click a button', () => {
    cy.get('button').click()
  })
})
