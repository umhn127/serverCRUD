import axios from "axios";
import formatDate from "../utils/formatDate";
import ContentMode from "./ContentMode";
import EditMode from "./EditMode";
import { useState } from "react";
import { toast } from "react-toastify";
import getStatus from "../utils/getStatus";

const ListItem = ({ todo, setTodos, allTodos }) => {
  const [isEdit, setIsEdit] = useState(false);
  //sil butonuna tıklayınca çalışır
  const handleDelete = () => {
    //api ye delete isteği at

    axios
      .delete(`http://localhost:3000/todos/${todo.id}`)
      .then(() => {
        //bütün todolar arasından id sini bildiğimizi kaldır
        const filtredTodos = allTodos.filter((item) => item.id !== todo.id);

        //state i güncelle
        setTodos(filtredTodos);

        toast.info("Todo Kaldırıldı");
      })
      .catch((err) => console.log("başarısız oldu", err));
  };

  //güncelleme onaylanınca çalışır
  const handleUpdate = (e) => {
    e.preventDefault();

    //inputlardaki değerler
    const title = e.target[1].value;
    const status = e.target[0].value;

    //api ı güncelle

    axios
      .patch(`http://localhost:3000/todos/${todo.id}`, { title, status })
      //api güncellenirse state güncelle
      .then(() => {
        //mevcut todo nun title ve status değerlerini güncelle
        const update = { ...todo, title, status };

        // dizideki eski todo nun yerine güncel halini koy
        const newTodos = allTodos.map((item) =>
          item.id === update.id ? update : item
        );

        //state güncelle
        setTodos(newTodos);

        // düzenleme modundan çık
        setIsEdit(false);

        //bildirim gönder
        toast.success("Güncelleme Başarılı");
      });
  };
  return (
    <li className=" relative p-3 list-group-item d-flex justify-content-between align-items-center gap-3">
      {getStatus(todo.status)}
      {isEdit ? (
        <EditMode
          todo={todo}
          handleUpdate={handleUpdate}
          setIsEdit={setIsEdit}
        />
      ) : (
        <ContentMode
          todo={todo}
          handleDelete={handleDelete}
          setIsEdit={setIsEdit}
        />
      )}

      <span className="date">{formatDate(todo.date)}</span>
    </li>
  );
};

export default ListItem;
