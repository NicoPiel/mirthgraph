<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
          <q-toolbar-title>Mirth Graph</q-toolbar-title>
          <q-btn to="/">Graph</q-btn>
          <q-btn to="/ports">Ports</q-btn>
          <div>v0.0.1</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        overlay
        bordered
        class="bg-grey-3"
      >
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator"/>
          </template>
      </q-drawer>

      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {ref} from 'vue'

const menuList = [
  {
    icon: 'warning',
    label: 'Force Reload',
    separator: true
  },
]

export default {
  setup() {
    return {
      drawer: ref(false),
      menuList
    }
  }
}
</script>
