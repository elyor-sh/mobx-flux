<script setup lang="ts">
import {Observer} from "mobx-vue-lite";

import {ITodo} from "./todo-api";

interface Props {
  todo: ITodo,
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const {todo, onToggleComplete, onDelete} = defineProps<Props>()

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

<style>

li {
  list-style: none;
}

li label{
  display: block;
  position: relative;
  padding: 0 10px;
}

.hidden_real_check{
  width: 100%;
  height: 100%;
  opacity:0;
  position: absolute;
}

.todo_element{
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.deleteButton {
  background: #fcb4b4;
  outline: none;
  border: none;
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
  position: relative;
  z-index: 10;
  padding: 7px;
  color: #ffffff;
}

.customized_ckeck{
  display: inline-flex;
  height: 2em;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
}
.element_title{
  display: inline-block;
  width: 85%;
  height: 2em;
  float: right;
  font-family: 'Open Sans', sans-serif;
  line-height: 2em;
  position : relative;
  color:#333;
  letter-spacing:1px;
}

.element_title:after{
  content: '';
  position: absolute;
  top :50%;
  height: 2px;
  width: 0;
  background-image: linear-gradient(90deg, #4facfe, #00f2fe);
  left: -5px;
  z-index: 2;
  transition: 0.3s;
}

.element_title:before{
  content: '';
  position: absolute;
  top :0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.7);
  z-index: 1;
  transition: 0.3s;
  opacity:0;
}

 li label .hidden_real_check:checked + .todo_element .element_title::after {width: 90%;}
 li label .hidden_real_check:checked + .todo_element .element_title::before {opacity: 1;}
.checkbox {
  width: 25px;
  height: 25px;
  margin-right:5px;
  position: relative;
  transition: 0.1s;
  transition-delay: 0.3s;
}
.checkbox span[class*='internal_'] {
  position: absolute;
  top: 0; right: 0; left: 0; bottom: 0;
}
.checkbox:after{
  content: '✔';
  position: absolute;
  top:0; left: 2px; right: -2px; bottom: 0;
  display: flex;
  align-items: center;
  justify-content:center;
  color: #4facfe;
  transform: scale(0);
  transition: 0.4s;
}
.checkbox:before{
  content: '';
  position: absolute;
  top:0; left: 2px; right: -2px; bottom: 0;
  border-radius:50%;
  border : 5px dotted #4facfe;
  transform: scale(0) rotate(0);
  transition: 0.5s;
  transition-delay: 0.3s;
}
.checkbox span[class*='internal_']::after, .checkbox span[class*='internal_']::before{
  content: '';
  position: absolute;
  top: 0px; left: 2px;
  height: 100%;
  width: 100%;
  border-radius:50%;
  border: 2px solid transparent;
  transform: rotate(45deg);
  box-sizing: border-box;
}
.checkbox span.internal_one::after{
  border-top-color:#4facfe !important;
  transition: 0.4s;
}
.checkbox span.internal_one::before{
  border-left-color:#4facfe !important;
  transition: 0.3s;
  transition-delay:0.1s;
}
.checkbox span.internal_two::after{
  border-bottom-color:#4facfe !important;
  transition: 0.2s;
  transition-delay:0.2s;
}
.checkbox span.internal_two::before{
  border-right-color:#4facfe !important;
  transition: 0.1s;
  transition-delay:0.3s;
}
 li label .hidden_real_check:checked + .todo_element .checkbox .internal_one:after{
  transform: rotate(-225deg);
}
 li label .hidden_real_check:checked + .todo_element .checkbox .internal_one:before{
  transform: rotate(-135deg);
}
 li label .hidden_real_check:checked + .todo_element .checkbox .internal_two:after{
  transform: rotate(-45deg);
}
 li label .hidden_real_check:checked + .todo_element .checkbox span[class*='internal_']:after,
 li label .hidden_real_check:checked + .todo_element .checkbox span[class*='internal_']:before{
  border-color: transparent !important;
}
 li label .hidden_real_check:checked + .todo_element .checkbox:after {
  transform : scale(1);
}
 li label .hidden_real_check:checked + .todo_element .checkbox:before {
  transform : scale(1.6) rotate(-90deg);
  opacity: 0;
}
</style>