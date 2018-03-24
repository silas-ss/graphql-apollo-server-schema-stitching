import gql from 'graphql-tag'

export const WORKLOG_LIST_QUERY = gql`
  query FindAllWorklogs($taskId: String!) {
    findAllWorklogs(taskId: $taskId) {
      id
      description
      date
      hours
      taskId
    }
  }
`
export const NEW_WORKLOG_MUTATION = gql`
  mutation NewWorklog($worklog: WorklogInput!) {
    newWorklog(worklog: $worklog) {
      id
      description
      hours
      date
      taskId
    }
  }
`

export const DELETE_WORKLOG_MUTATION = gql`
  mutation DeleteWorklog($id: String!) {
    deleteWorklog(id: $id)
  }
`

export const UPDATE_WORKLOG_MUTATION = gql`
  mutation UpdateWorklog($worklog: WorklogInput!) {
    updateWorklog(worklog: $worklog) {
      id
      description
      date
      hours
      taskId
    }
  }
`
