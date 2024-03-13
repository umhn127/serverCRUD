import { useEffect, useState } from "react";
import Form from "./components/Form";
import Loader from "./components/Loader";
import ListItem from "./components/ListItem";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPageCount, setMaxPageCount] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/todos", {
        timeout: 3000,
        timeoutErrorMessage: "zaman aşımı",
        params: {
          _per_page: 6,
          _page: page,
        },
      })
      .then((res) => {
        setMaxPageCount(res.data.pages);
        setTodos(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <div className="container  p-3 p-md-5">
      <h1 className="text-center">
        Server <span className="text-warning">CRUD</span>
      </h1>

      <Form setTodos={setTodos} />

      <ul className="list-group">
        {!todos && <Loader />}

        {/* {todos && todos.map((todo) => <li key={todo.id}>Eleman</li>)} */}
        {/* optional chaning "?." ile yazılışı */}
        {todos?.map((todo) => (
          <ListItem
            key={todo.id}
            todo={todo}
            allTodos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>

      <div className="d-flex justify-content-between my-5">
        <button
          disabled={page === 1}
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
        >
          Geri
        </button>
        <span>{page}</span>
        <button
          disabled={page === maxPageCount}
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
        >
          İleri
        </button>
      </div>
    </div>
  );
};

export default App;
