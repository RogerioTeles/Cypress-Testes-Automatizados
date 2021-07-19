
//Usando o FAKER pra gerar dados aleatórios => npm install faker -D
const faker = require('faker')

describe('Create Project', () => {
    it('sucessfully', () => {
        const project ={
            name: `project-${faker.random.uuid()}`,
            description: faker.random.words(5)
        }
        //ao executar isso, precisaremos de um retorno da API
        cy.api_createProject(project)
        .then(response=>{
            expect(response.status).to.equal(201)
            expect(response.body.name).to.equal(project.name)
            expect(response.body.description).to.equal(project.description)
        })
        

    });
});