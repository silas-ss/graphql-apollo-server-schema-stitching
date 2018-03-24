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
        Quasar App
        <div slot="subtitle">Running on Quasar v{{$q.version}}</div>
      </q-toolbar-title>
    </q-toolbar>

    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->
    <div class="layout-padding">
      <h3>Create Project</h3>
      <q-input v-model="newProject.name" float-label="Name" placeholder="Name" /><br>
      <q-btn @click="addProject" color="positive">Save</q-btn>
      
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
  QPopover
} from 'quasar'

import {
  PROJECTS_QUERY,
  MUTATION_CREATE_PROJECT
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

          self.$router.push({ path: '/' })
        }
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
