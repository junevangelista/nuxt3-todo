<script setup lang="ts">
import type { TodoItem } from '@/types/TodoItem'

const newTodo = ref<TodoItem | null>()

const { storedItems: storedTodos, fetchItems, updateAllItems } = useStorage('todos')

const activeTodos = computed(() => {
  return storedTodos.value.filter((item: TodoItem) => !item.done)
})

const handleSubmit = (): void => {
  storedTodos.value.push({
    id: Date.now(),
    name: newTodo.value,
    done: false
  })

  newTodo.value = null

  updateAllItems(storedTodos.value)
}

const toggleDone = (todoItem: TodoItem) => {
  const index = storedTodos.value.findIndex((item: TodoItem) => item.id === todoItem.id)

  storedTodos.value[index].done = !storedTodos.value[index].done

  updateAllItems(storedTodos.value)
}

const updateItem = (todoItem: TodoItem, newName: string) => {
  const index = storedTodos.value.findIndex((item: TodoItem) => item.id === todoItem.id)

  storedTodos.value[index].name = newName

  updateAllItems(storedTodos.value)
}

const deleteItem = (todoItem: TodoItem) => {
  const index = storedTodos.value.findIndex((item: TodoItem) => item.id === todoItem.id)

  storedTodos.value.splice(index, 1)

  updateAllItems(storedTodos.value)
}

// completed todos

const showCompletedTodos = ref<boolean>(true)

const completedTodos = computed(() => {
  return storedTodos.value.filter((item: TodoItem) => item.done)
})

const toggleCompletedTodos = () => {
  showCompletedTodos.value = !showCompletedTodos.value
}

onMounted(() => {
  fetchItems()
})
</script>

<template>
  <v-main>
    <v-container max-width="600">
      <v-card flat>
        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field v-model="newTodo" variant="outlined" density="compact" hide-details>
              <template v-slot:append>
                <v-btn type="submit" color="primary" :disabled="!newTodo">Add Task <v-icon icon="mdi-plus" /></v-btn>
              </template>
            </v-text-field>
          </v-form>

        </v-card-text>
      </v-card>

      <v-card class="mt-4" flat>
        <v-list>
          <!-- Active Todos -->
          <template v-if="storedTodos.length">
            <TodoItem v-for="todo in activeTodos" :todo="todo" @toggle-done="toggleDone(todo)"
              @update-item="updateItem(todo, $event)" @delete-item="deleteItem(todo)" />
          </template>
          <template v-else>
            <v-list-item>No active To Dos</v-list-item>
          </template>

          <v-btn class="mt-12" color="secondary" @click="toggleCompletedTodos">
            Completed
            <template v-slot:append>
              <v-icon :icon="showCompletedTodos ? 'mdi-chevron-down' : 'mdi-chevron-right'"></v-icon>
            </template>
          </v-btn>

          <!-- Completed Todos -->
          <template v-if="showCompletedTodos">
            <template v-if="completedTodos.length">
              <TodoItem v-for="todo in completedTodos" :todo="todo" @toggle-done="toggleDone(todo)"
                @update-item="updateItem(todo, $event)" @delete-item="deleteItem(todo)" />
            </template>
            <template v-else>
              <v-list-item class="mt-4">No completed To Dos</v-list-item>
            </template>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </v-main>
</template>