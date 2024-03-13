import axios from "axios";
import { toast } from "react-toastify";
import { v4 as generateId } from "uuid";

const Form = ({ setTodos }) => {
  //form gönderilince çalışır
  const handleSubmit = (e) => {
    //sayfa yenilenmesini engelle
    e.preventDefault();

    //formdaki verilere erişme
    const title = e.target[0].value;
    const status = e.target[1].value;

    //api ye kaydedilecek olan nesneyi hazırla
    const newTodo = {
      // id: new Date().getTime(),ıd oluşturma
      id: generateId(),
      title,
      status,
      date: new Date().toLocaleDateString(),
    };
    console.log(newTodo);
    //oluşturduğumuz todoyu api ye kaydet
    //axios ile post
    axios
      .post("http://localhost:3000/todos", newTodo)
      //state'e de ekle (arayüzün güncellenmesi için)
      .then(() => {
        toast.success("Todo Eklendi");
        setTodos((prev) => [...prev, newTodo]);
      })
      //istek başarısız olursa
      .catch((err) => toast.error("üzgünüz sorun oluştu"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input className="form-control shadow" type="text" />

      <select className="form-select w-50 shadow">
        <option value="important">Önemli</option>
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
      </select>

      <button className="btn btn-primary">Gönder</button>
    </form>
  );
};

export default Form;
