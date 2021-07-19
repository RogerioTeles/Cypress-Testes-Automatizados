

const faker = require('faker')

describe('Create Issue', () => {
    it('successfully', ()=> {
        const issue ={
            title: `issue-${faker.random.uuid()}`,
            description: faker.random.words(3),
            //criando um project pra passar como parâmetro dentro do create project
            project:{
                name: `project-${faker.random.uuid()}`,
                description: `${faker.random.words(5)}`
            }
        }
        cy.api_createIssue(issue)
        .then(response=>{
            expect(response.status).to.equal(201)
            expect(response.body.name).to.equal(issue.name)
            expect(response.body.description).to.equal(issue.description)
        })
    })
})