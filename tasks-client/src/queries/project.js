import gql from 'graphql-tag'

export const PROJECTS_QUERY = gql`
  query FindAllProjects {
    findAllProjects {
      id
      name
    }
  }
`

export const FIND_PROJECT_QUERY = gql`
  query FindProject ($id: Int!){
    findProject(id: $id) {
      id
      name
    }
  }
`

export const COUNT_PROJECTS_QUERY = gql`
  query CountProjects {
    countProjects
  }
`

export const MUTATION_CREATE_PROJECT = gql`
  mutation ($name: String!) {
    newProject(name: $name) {
      id
      name
    }
  }
`

export const MUTATION_DELETE_PROJECT = gql`
  mutation ($id: String!) {
    deleteProject(id: $id)
  }
`

export const MUTATION_UPDATE_PROJECT = gql`
  mutation UpdateProject($project: ProjectInput!) {
    updateProject (project: $project) {
      id
      name
    }
  }
`
