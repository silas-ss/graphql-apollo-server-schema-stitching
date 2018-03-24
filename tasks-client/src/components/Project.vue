<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="glossy">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Tasks
      </q-toolbar-title>
    </q-toolbar>

    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->
    <div class="layout-padding">
      <q-btn color="primary" @click="modalCreate = true">Create</q-btn>

      <q-list highlight>
        <q-list-header>Projects</q-list-header>
        <q-item link v-for="project in findAllProjects" :key="project.id" @click="$router.push({ name: 'list-task', params: { project } })">
          <q-item-main :label="project.name" />
          <q-item-side right>

            <q-btn color="primary">
              <q-icon name="assignment" />

              <q-popover>
                <q-list link separator class="scroll" style="min-width: 100px">
                  <q-item>
                    <q-item-main label="Edit" @click="edit(project)"/>
                  </q-item>
                  <q-item>
                    <q-item-main label="Delete" @click="deleteItem(project)"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          
          </q-item-side>
        </q-item>
      </q-list>

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
              Create Project
            </q-toolbar-title>
          </q-toolbar>

          <q-toolbar slot="footer">
            <q-toolbar-title>
              <q-btn color="positive" @click="addProject">Save</q-btn>
            </q-toolbar-title>
          </q-toolbar>

          <div class="layout-padding">
            <q-input v-model="newProject.name" float-label="Name" placeholder="Name" />
          </div>
        </q-modal-layout>
      </q-modal>
    </div>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QItemTile,
  QModal,
  QModalLayout,
  QInput,
  QPopover,
  Dialog
} from 'quasar'

import {
  PROJECTS_QUERY,
  MUTATION_CREATE_PROJECT,
  COUNT_PROJECTS_QUERY,
  MUTATION_DELETE_PROJECT
} from 'src/queries/project'

let self

export default {
  name: 'index',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QItemTile,
    QModal,
    QModalLayout,
    QInput,
    QPopover
  },
  data () {
    self = this
    return {
      findAllProjects: [],
      countProjects: 0,
      modalCreate: false,
      newProject: { name: '' }
    }
  },

  apollo: {
    findAllProjects: {
      query: PROJECTS_QUERY
    },
    countProjects: {
      query: COUNT_PROJECTS_QUERY
    }
  },

  methods: {
    addProject () {
      const newProject = this.newProject
      self.newProject = { name: '' }
      self.$apollo.mutate({
        mutation: MUTATION_CREATE_PROJECT,
        variables: {
          name: newProject.name
        },
        update (store, { data: { newProject } }) {
          const data = store.readQuery({ query: PROJECTS_QUERY })
          data.findAllProjects.push(newProject)
          store.writeQuery({ query: PROJECTS_QUERY, data })
        }
      }).then(() => {
        self.modalCreate = false
      })
    },

    edit (p) {
      self.$router.push({ name: 'edit-project', params: { project: p } })
    },

    deleteItem (p) {
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
              const project = p
              self.$apollo.mutate({
                mutation: MUTATION_DELETE_PROJECT,
                variables: {
                  id: project.id
                },
                update (store, { data: { deleteProject } }) {
                  // const data = store.readQuery({ query: PROJECTS_QUERY })
                }
              })
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus">
.logo-container
  width 255px
  height 242px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
