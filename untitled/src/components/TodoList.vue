<template>
  <List
      :items="todos"
  >
    <template #default="{item, index}">
      <div
          class="card-body p-2 d-flex align-items-center"
          style="cursor: pointer"
          @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input
              class="ml-2 mr-2"
              type="checkbox"
              :checked="item.completed"
              @change="toggleTodo(index, $event)"
              @click.stop
          >
          <span
              class="form-check-label"
              :class="{todo : item.completed}"
          >
          {{ item.subject }}
        </span>
        </div>
        <div>
          <button
              class="btn btn-danger btn-sm"
              @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </List>
  <!--  </div>-->
  <Teleport to="#modal">
    <Modal
        v-if="showModal"
        @close="closeModal"
        @delete="deleteTodo"
    >

    </Modal>
  </Teleport>
</template>

<script>
import {useRouter} from "vue-router";
import Modal from "@/components/DeleteModal.vue";
import List from "@/components/List.vue"
import {ref} from "vue";

export default {
  components: {
    Modal,
    List
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  emits: ["toggleTodo", "deleteTodo"],
  setup(props, {emit}) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);

    const toggleTodo = (index, event) => {

      emit("toggle-todo", index, event.target.checked);
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    }

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    }

    const deleteTodo = () => {
      console.log(todoDeleteId.value)
      emit("delete-todo", todoDeleteId.value);


      showModal.value = false;
      todoDeleteId.value = null;
    }

    const moveToPage = (todoId) => {
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      });
    }

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal
    }
  }
}
</script>

<style scoped>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>