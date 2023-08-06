<script setup lang="ts">
import TodoList from "./todo/todo-list.vue";
</script>

<template>
   <h1 class="title">
      Mobx flux with vue
   </h1>
   <div class="line"/>
   <TodoList />
</template>

<style scoped>
   .title {
      text-align: center;
   }

   .line {
      width: 100%;
      height: 1px;
      background: #888888;
      margin: 10px 0 20px;
   }
</style>