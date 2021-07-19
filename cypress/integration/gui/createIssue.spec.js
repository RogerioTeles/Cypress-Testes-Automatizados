

const faker = require('faker')

describe('Create Issue', () => {

    const issue ={
        title: `issue-${faker.random.uuid()}`,
        description: faker.random.words(3),
        //criando um project pra passar como parâmetro dentro do create project
        project:{
            name: `project-${faker.random.uuid()}`,
            description: `${faker.random.words(5)}`
        }
    }


    beforeEach(() => {
        //Pré-Requisitos
        cy.login()
        //utilizando teste de gui pra criar o projeto
        cy.gui_createProject(issue.project)
        //utilizando api pra criar a pré condição de criar o projeto
        //cy.api_createProject(issue.project)
    });
    it('successfully', ()=> {
        cy.gui_createIssue(issue)

        cy.get('.issue-details')
        .should('contain', issue.title)
        .and('contain', issue.description)
    })
});