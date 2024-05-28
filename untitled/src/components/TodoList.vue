<template>
  <div
      class="card mt-2"
      :key="todo.id"
      v-for="(todo, index) in todos"
  >
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
        <input
            class="form-check-input"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index)"
        >
        <label
            class="form-check-label"
            :class="{todo : todo.completed}"
        >
          {{ todo.subject }}
        </label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos : {
      type: Array,
      required: true
    }
  },
  emits: ["toggleTodo", "deleteTodo"],
  setup(props, {emit}) {

    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };

    const deleteTodo = (index) => {
      emit("delete-todo", index);
    }

    return {
      toggleTodo,
      deleteTodo
    }
  }
}
</script>

<style scoped>

</style>