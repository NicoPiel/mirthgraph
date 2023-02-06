<template>
  <div class="q-pa-md">
    <q-layout view="hHh LpR lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-toolbar-title>Mirth Graph</q-toolbar-title>
          <q-btn to="/">Graph</q-btn>
          <q-btn to="/ports">Ports</q-btn>
          <div>v1.0.1 (06.02.2023)</div>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <RouterView/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
