import {observer} from "mobx-react-lite";
import {TodoList} from "./todo";

const App = observer(() => {

  return (
    <>
        <TodoList />
    </>
  )
})

export default App
