

const accessToken = Cypress.env('gitlab_access_token')

Cypress.Commands.add('api_createProject', project =>{
    cy.request({
        method:'POST',
        url: `api/v4/projects/?private_token=${accessToken}`,
        body:{
            name:project.name,
            description: project.description,
            initialize_with_readme: true
        }
    })
})

Cypress.Commands.add('api_createIssue', issue =>{
    //pra criar uma issue, precisamos de um projeto, então vamos 
    //chamar o custom command acima para que seja criado um project e dela
    //criemos uma issue
    cy.api_createProject(issue.project)
    .then(response => {
        cy.request({
            method:'POST',
            //essa chamada precisa q o ID do projeto seja passado no link, e para passar foi utilizado o
            //id retornado na resposta da criação do projeto
            url:`api/v4/projects/${response.body.id}/issues?private_token=${accessToken}`,
            body:{
                title:issue.title,
                description: issue.description
            }
        })
    })
})


Cypress.Commands.add('api_createLabel', (projectId, label)=> {
    cy.request({
        method: 'POST',
        url:`/api/v4/projects/${projectId}/labels?private_token=${accessToken}`,
        body:{
            name: label.name,
            color: label.color
        }
    })
})

Cypress.Commands.add('api_createMilestone', (projectId, milestone) => {
    cy.request({
      method: 'POST',
      url: `/api/v4/projects/${projectId}/milestones?private_token=${accessToken}`,
      body: { title: milestone.title }
    })
  })
  