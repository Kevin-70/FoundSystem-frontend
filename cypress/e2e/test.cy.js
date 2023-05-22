describe('The Home Page Jump', () => {
    it('successfully loads', () => {
      cy.visit('http://localhost:5173/') // change URL to match your dev URL
      cy.url().should('include', '/')
      cy.get(":nth-child(2) > .el-button").click()
      cy.url().should('include',"/login")

      cy.visit('http://localhost:5173/') // change URL to match your dev URL
      cy.url().should('include', '/')
      cy.get(":nth-child(1) > .el-button").click()
      cy.url().should('include',"/register")
    })
  })
describe('SE front-end test', () => {
  it('login as admin', () => {
    cy.visit('http://localhost:5173/login/#/login')
    // cy.url().should('include',"/login")

    cy.get(':nth-child(1) > .el-form-item__content > .el-input').type("admin@qq.com")
    cy.get(':nth-child(2) > .el-form-item__content > .el-input').type("admin")
    cy.get(":nth-child(3) > .el-radio-button__inner").click()
    cy.get(".el-button").click()
    cy.url().should('include',"/admins")
  })
})
describe('SE Staff test',()=>{
    it('login as staff',()=>{
        cy.visit('http://localhost:5173/login/#/login')
        cy.get(':nth-child(1) > .el-form-item__content > .el-input >.el-input__wrapper').type("1145275381@qq.com")
        cy.get(':nth-child(2) > .el-form-item__content > .el-input >.el-input__wrapper').type("123")
        cy.get(':nth-child(1) > .el-radio-button__inner').click() //>表示是什么的child node
        cy.get(".el-button").click()
        cy.url().should('include',"/staff/")//get in the user's url

        cy.get(" .el-menu > :nth-child(3) ").click()
        cy.url().should("include","/expenditure")
        cy.get('.el-container > :nth-child(2)').click()
        cy.get('.el-form')
        cy.get(":nth-child(1) > .el-form-item__content > .el-input > .el-input__wrapper").type("CY")
        cy.get(":nth-child(2) > .el-form-item__content > .el-input > .el-input__wrapper").type("CY1")
        cy.get(".dialog-footer > .el-button--primary").click()
        cy.get('.dialog-footer > :nth-child(1)').click()
        cy.get(".el-table")
        cy.get('thead > tr > .el-table_1_column_1')
    
    })
})
