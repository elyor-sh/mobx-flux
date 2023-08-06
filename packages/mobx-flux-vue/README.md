Official Vue bindings for [mobx-flux](https://www.npmjs.com/package/mobx-flux)

> Note: To work with this package, you need to install this package [mobx-flux](https://www.npmjs.com/package/mobx-flux) 

[Demo](https://mobx-flux-vue.vercel.app)
[Source code of Demo](https://github.com/elyor-sh/mobx-flux/tree/main/examples/mobx-flux-vue-example)

## Installation

```sh
npm i mobx-flux-vue mobx-flux mobx mobx-vue-lite
```

## Usage

Create a store

```js
// ~/store.js

import {configureStore} from 'mobx-flux'

export const store = configureStore({...})
```
Register store with createStoreProvider

```js
// ~/main.js
import { createApp } from "vue";
import App from "./App.vue";
import {createStoreProvider} from "mobx-flux-vue";
import {store} from "./store";

const app = createApp(App)

app.use(createStoreProvider(store))

app.mount('#app')
```

Get store or dispatch action
```vue
// ~/App.vue
<script setup>
import {Observer} from 'mobx-vue-lite'
import {useSelector, useDispatch} from 'mobx-flux-vue'
import {increment} from './counterSlice' // Don't forget to create a slice

const dispatch = useDispatch()

const counter = useSelector(state => state.counter) // Don't destructure

const handleIncrement = () => {
  dispatch(increment())
}

</script>


<template>
    <Observer>
      <div>
        Count: {counter.count}
        <button @click="handleIncrement">Increment</button>
      </div>
    </Observer>
</template>
```

## Usage with Typescript

Create a store, custom typed hooks

```ts
// ~/store.ts

import {configureStore} from 'mobx-flux'
import {useDispatch, TypedUseSelectorHook, useSelector } from 'mobx-flux-vue'

export const store = configureStore({...})

// Type of root store
export type RootState = ReturnType<typeof store.getState>

// type of dispatch
export type AppDispatch = typeof store.dispatch

// Typed custom dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Typed custom selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


```
Register store with createStoreProvider

```ts
// ~/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import {createStoreProvider} from "mobx-flux-vue";
import {store} from "./store";

const app = createApp(App)

app.use(createStoreProvider(store))

app.mount('#app')
```

Get store or dispatch action
```vue
// ~/App.vue
<script setup lang="ts">
import {Observer} from 'mobx-vue-lite'
import {useAppSelector, useAppDispatch} from './store'
import {increment} from './counterSlice' // Don't forget to create a slice

const dispatch = useAppDispatch()

const counter = useAppSelector(state => state.counter) // Don't destructure

const handleIncrement = () => {
  dispatch(increment())
}

</script>


<template>
    <Observer>
      <div>
        Count: {counter.count}
        <button @click="handleIncrement">Increment</button>
      </div>
    </Observer>
</template>
```