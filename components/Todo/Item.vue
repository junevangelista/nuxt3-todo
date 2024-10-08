<script setup lang="ts">
import { type TodoItem } from '@/types/TodoItem'

const props = defineProps<{ todo: TodoItem }>()

const emit = defineEmits<{
  (event: 'toggle-done'): void
  (event: 'update-item', value: string): string
  (event: 'delete-item'): void
}>()

const revisedTodo = ref<string>()

const toggleDone = () => {
  emit('toggle-done')
}

const isEditing = ref<boolean>(false)

const saveButtonDisabled = computed(() => {
  return (props.todo.name === revisedTodo.value) || !revisedTodo.value
})

const handleEditMode = () => {
  isEditing.value = true
  revisedTodo.value = props.todo.name
}

const updateItem = () => {
  isEditing.value = false
  if (revisedTodo.value) {
    emit('update-item', revisedTodo.value)
  }
}

const cancelEditItem = () => {
  isEditing.value = false
}

const deleteItem = () => {
  emit('delete-item')
}
</script>

<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-list-item-action>
        <v-checkbox-btn :model-value="todo.done" @update:model-value="toggleDone"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <v-text-field v-if="isEditing" v-model="revisedTodo" variant="underlined">
      <template v-slot:append-inner>
        <v-btn variant="plain" size="x-small" :disabled="saveButtonDisabled" @click="updateItem">Save</v-btn>
        <v-btn variant="plain" size="x-small" @click="cancelEditItem">Cancel</v-btn>
      </template>
    </v-text-field>

    <span v-else :class="{ 'text-decoration-line-through': todo.done }">{{ todo.name }}</span>

    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item @click="handleEditMode">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteItem">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
  <v-divider></v-divider>
</template>