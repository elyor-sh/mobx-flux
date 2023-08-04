<script setup lang="ts">

import {onMounted} from "vue";
import {Observer} from "mobx-vue-lite";

import TodoCard from "./todo-card.vue";
import {useAppDispatch, useAppSelector} from "../store";
import {fetchTodoList} from "./todo-api.ts";
import {deleteTodo, toggleTodo} from "./todo-store.ts";

const dispatch = useAppDispatch()

const handleToggle = (id: number) => {
  dispatch(toggleTodo(id))
}

const handleDelete = (id: number) => {
  dispatch(deleteTodo(id))
}

const todos = useAppSelector(state => state.todo)

onMounted(() => {
  dispatch(fetchTodoList());
})

</script>


<template>
  <Observer>
   <ul class="todo_list">
     <li v-for="todo in todos.todos" :key="todo.id">
       <TodoCard :on-delete="handleDelete" :on-toggle-complete="handleToggle" :todo="todo"/>
     </li>
   </ul>
  </Observer>
</template>


<style @global>

.todo_list{
  background: #fff;
  box-shadow: 0 0 27px #ccc;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
}

.todo_list ul {
  list-style: none;
  padding: 0;
}
</style>