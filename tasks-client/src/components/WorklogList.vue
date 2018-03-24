<template>
  <div>
    <q-btn color="primary" @click="modalCreate = true">Logwork</q-btn>

    <table class="q-table bordered horizontal-separator vertical-separator">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="worklog in worklogList" :key="worklog.id">
          <td>{{ worklog.date }}</td>
          <td>{{ worklog.description }}</td>
          <td>{{ worklog.hours }}</td>
          <td>
            <q-btn color="primary">
              <q-icon name="assignment" />

              <q-popover>
                <q-list link separator class="scroll" style="min-width: 100px">
                  <q-item>
                    <q-item-main label="Edit" @click="edit(worklog)"/>
                  </q-item>
                  <q-item>
                    <q-item-main label="Delete" @click="deleteItem(worklog)"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </td>
        </tr>
      </tbody>
    </table>

    <q-modal v-model="modalCreate" :content-css="{minWidth: '80vw', minHeight: '40vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn
            flat
            round
            dense
            @click="modalCreate = false"
            icon="reply"
          />
          <q-toolbar-title>
            Create Worklog
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar slot="footer">
          <q-toolbar-title>
            <q-btn v-if="!worklog.id" color="positive" @click="addWorklog">Save</q-btn>
            <q-btn v-else color="positive" @click="updateWorklog">Save</q-btn>
          </q-toolbar-title>
        </q-toolbar>

        <div class="layout-padding">
          <q-input v-model="worklog.description" float-label="Description" placeholder="Description" />
          <q-input v-model="worklog.hours" float-label="Hours" placeholder="Hours" />
          <q-datetime v-model="worklog.date" type="date" float-label="Date" />
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script type="text/javascript">
  import {
    QModal,
    QModalLayout,
    QToolbar,
    QBtn,
    QToolbarTitle,
    QInput,
    QDatetime,
    QIcon,
    QPopover,
    QList,
    QItem,
    QItemMain,
    Dialog
  } from 'quasar'

  import {
    WORKLOG_LIST_QUERY,
    NEW_WORKLOG_MUTATION,
    DELETE_WORKLOG_MUTATION,
    UPDATE_WORKLOG_MUTATION
  } from 'src/queries/worklog'

  let self

  export default {
    name: 'WorklogList',
    props: {
      taskId: {
        type: String,
        required: true
      }
    },
    components: {
      QModal,
      QModalLayout,
      QToolbar,
      QBtn,
      QToolbarTitle,
      QInput,
      QDatetime,
      QIcon,
      QList,
      QItem,
      QItemMain,
      QPopover
    },
    data () {
      self = this
      return {
        worklogList: [],
        worklog: { description: '', hours: 0, date: new Date() },
        modalCreate: false
      }
    },
    methods: {
      loadWorklogList (taskId) {
        self.$apollo.query({
          query: WORKLOG_LIST_QUERY,
          variables: {
            taskId
          }
        }).then(({data: { findAllWorklogs }}) => {
          self.worklogList = findAllWorklogs
        })
      },

      addWorklog () {
        self.worklog.taskId = self.taskId
        const newWorklog = self.worklog
        self.$apollo.mutate({
          mutation: NEW_WORKLOG_MUTATION,
          variables: {
            worklog: newWorklog
          },
          update (proxy, { data: { newWorklog } }) {
            const data = proxy.readQuery({ query: WORKLOG_LIST_QUERY, variables: { taskId: self.taskId } })
            data.findAllWorklogs.push(newWorklog)
            proxy.writeQuery({ query: WORKLOG_LIST_QUERY, data })
          }
        }).then(() => {
          self.modalCreate = false
        })
      },

      updateWorklog () {
        self.$apollo.mutate({
          mutation: UPDATE_WORKLOG_MUTATION,
          variables: { worklog: self.worklog }
        }).then(() => {
          self.modalCreate = false
        })
      },

      edit (worklog) {
        self.worklog.id = worklog.id
        self.worklog.description = worklog.description
        self.worklog.hours = worklog.hours
        self.worklog.date = worklog.date
        self.worklog.taskId = worklog.taskId

        self.modalCreate = true
      },

      deleteItem (worklog) {
        Dialog.create({
          title: 'Confirmation',
          message: 'Delete?',
          buttons: [
            {
              label: 'No',
              color: 'negative'
            },
            {
              label: 'Yes',
              raised: true,
              color: 'positive',
              handler: () => {
                const deleted = worklog
                self.$apollo.mutate({
                  mutation: DELETE_WORKLOG_MUTATION,
                  variables: {
                    id: deleted.id
                  }
                })
              }
            }
          ]
        })
        
      }
    },

    mounted () {
      self.loadWorklogList(self.taskId)
    }
  }
</script>