<script setup lang="ts">
import {Observer} from "mobx-vue-lite";

import {ITodo} from "./todo-api";

interface Props {
  todo: ITodo,
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const {todo, onToggleComplete, onDelete} = defineProps<Props>()

console.log('todo => ', todo)

const handleToggle = () => {
  onToggleComplete(todo.id)
}

const handleDelete = () => {
  onDelete(todo.id)
}

</script>

<template>
  <Observer>
    <li>
      <label>
        <input
            type="checkbox"
            class="hidden_real_check"
            @checked="todo.completed"
            @change="handleToggle"
        />
        <div class="todo_element">
          <button class='deleteButton' @click="handleDelete">
            Delete
          </button>
          <span class="customized_ckeck">
							<span class="checkbox">
								<span class='internal_one'></span>
								<span class='internal_two'></span>
							</span>
						</span>
          <span class="element_title">{{todo.title}}</span>
        </div>
      </label>
    </li>
  </Observer>
</template>