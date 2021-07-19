

describe('Logout', () => {
    beforeEach(() => cy.login());
    it('successfully' ,()=>{    
        cy.logout()

        cy.url().should('be.equal', 'http://localhost/users/sign_in')
    })
});

