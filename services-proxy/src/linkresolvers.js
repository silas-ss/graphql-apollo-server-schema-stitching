const linkResolvers = mergeInfo => ({
  Project: {
    tasks: {
      fragment: `fragment ProjectFragment on Project {id}`,
      resolve(parent, args, context, info) {
        const projectId = parent.id
        return mergeInfo.delegate(
          'query',
          'findAllTasks',
          { projectId },
          context,
          info)
      }
    }
  },

  Task: {
    worklogs: {
      fragment: `fragment TaskFragment on Task {id}`,
      resolve(parent, args, context, info) {
        const taskId = parent.id
        return mergeInfo.delegate(
          'query',
          'findAllWorklogs',
          { taskId },
          context,
          info)
      }
    }
  }
});

module.exports = linkResolvers

