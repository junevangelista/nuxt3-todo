<script lang="ts" setup>
const links = [
  ['mdi-inbox-arrow-down', 'To Do List'],
]
</script>

<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item v-for="[icon, text] in links" :key="icon" :prepend-icon="icon" :title="text" link></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>