import gql from 'graphql-tag'

export const TASKS_QUERY = gql`
  query findAllTasks($projectId: String!) {
    findAllTasks(projectId: $projectId) {
      id
      title
      description
    }
  }`
