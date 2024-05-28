<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button
          class="btn btn-primary"
          @click="moveToCreatePage"
      >
        Create Todo
      </button>
    </div>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
    >
    <hr/>
    <div>{{ error }}</div>
    <div v-if="!todos.length">
      There is nothing to display
    </div>
    <TodoList
        :todos="todos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
    />
    <hr/>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage - 1)">
            Previous
          </a>
        </li>
        <li
            v-for="page in numberOfPages"
            :key="page"
            class="page-item"
            :class="currentPage === page ? 'active' : ''"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastAlertType"
  />
</template>

<script>
import {ref, computed, watch} from "vue";
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import axios from "axios";
import {useRouter} from "vue-router";

import {useToast} from "@/composables/toast.js";
import Toast from "@/components/Toast.vue"

export default {
  components: {
    TodoSimpleForm,
    TodoList,
    Toast
  },
  setup() {
    const error = ref("");
    const todos = ref([]);
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref("");
    const router = useRouter();

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast();

    // const triggerToast = (message, type = "success") => {
    //   toastMessage.value = message;
    //   toastAlertType.value = type;
    //   showToast.value = true;
    //   toastTimeout.value = setTimeout(() => {
    //     toastMessage.value = "";
    //     toastAlertType.value = "";
    //     showToast.value = false;
    //   }, 3000)
    // }


    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}&_sort=id&_order=desc`);
        numberOfTodos.value = res.headers["x-total-count"];
        todos.value = res.data;
      } catch (err) {
        error.value = "Something went wrong";
        triggerToast("Something went wrong", "danger");
      }
    }

    getTodos();

    const addTodo = async (todo) => {
      try {
        await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        })
        getTodos(1);

      } catch (err) {
        error.value = "Something went wrong";
        triggerToast("Something went wrong", "danger");
      }
    }

    const deleteTodo = async (id) => {

      try {
        await axios.delete("http://localhost:3000/todos/" + id);
        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong"
        triggerToast("Something went wrong", "danger");
      }

    }

    const toggleTodo = async (index, checked) => {
      console.log(index)
      console.log(checked);
      const id = todos.value[index].id;
      try {
        await axios.patch("http://localhost:3000/todos/" + id, {
          completed: checked
        });
        todos.value[index].completed = checked;
      } catch (err) {
        console.log(err);
        triggerToast("Something went wrong", "danger");
      }
    }


    let timeout = null;

    const searchTodo = () => {
      console.log("Test");
      clearTimeout(timeout);
      getTodos(1);
    }

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);

    })

    const moveToCreatePage = () => {
      router.push({
        name: "TodoCreate"
      })
    }

    return {
      todos,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
      moveToCreatePage
    };
  }
}

</script>

<style>

</style>