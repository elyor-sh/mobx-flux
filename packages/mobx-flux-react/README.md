Official React bindings for [mobx-flux](https://www.npmjs.com/package/mobx-flux)

> Note: To work with this package, you need to install this package [mobx-flux](https://www.npmjs.com/package/mobx-flux) 

[Demo](https://mobx-flux-react-demo.vercel.app/)
[Source code of Demo](https://github.com/elyor-sh/mobx-flux/tree/main/examples/mobx-flux-react-example)

## Installation

```sh
npm i mobx-flux-react mobx-flux mobx mobx-react-lite
```

## Usage

Create a store

```js
// ~/store.js

import {configureStore} from 'mobx-flux'

export const store = configureStore({...})
```
Wrap to CreateStoreProvider your app

```jsx
// ~/main.jsx
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {CreateStoreProvider} from 'mobx-flux-react'
import {store} from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <CreateStoreProvider store={store}>
            <App />
        </CreateStoreProvider>
    </>,
)
```

Get store or dispatch action
```jsx
// ~/App.jsx
import {useSelector, useDispatch} from 'mobx-flux-react'
import {observer} from 'mobx-react-lite'
import {increment} from './counterSlice' // Don't forget to create a slice

const App = observer(() => {
    
    const dispatch = useDispatch()
    
    const {count} = useSelector(state => state.counter)
    
    const handleIncrement = () => {
        dispatch(increment())
    }
    
    return (
        <>
            Count: {count}
            <button onClick={handleIncrement}>Increment</button>
        </>
    )
})

export default App
```

## Usage with Typescript

Create a store, custom typed hooks

```ts
// ~/store.ts

import {configureStore} from 'mobx-flux'
import {useDispatch, TypedUseSelectorHook, useSelector } from 'mobx-flux-react'

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
Wrap to CreateStoreProvider your app

```tsx
// ~/main.tsx
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from 'mobx-flux-react'
import {store} from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <Provider store={store}>
            <App />
        </Provider>
    </>,
)
```

Get store or dispatch action
```tsx
// ~/App.tsx
import {useAppSelector, useAppDispatch} from './store'
import {observer} from 'mobx-react-lite'
import {increment} from './counterSlice' // Don't forget to create a slice

const App = observer(() => {
    
    const dispatch = useAppDispatch() // typed dispatch
    
    const {count} = useAppSelector(state => state.counter) // typed selector
    
    const handleIncrement = () => {
        dispatch(increment())
    }
    
    return (
        <>
            Count: {count}
            <button onClick={handleIncrement}>Increment</button>
        </>
    )
})

export default App
```
