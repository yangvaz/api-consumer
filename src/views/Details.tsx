import { Fragment, useState, useEffect } from "react";

import "../styles/views/details.css";
import { useParams } from "react-router-dom";
import api from "../services/api";

interface ItemProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface PostParams {
  id: string;
}

function List() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [titleSelected, setTitleSelected] = useState("");
  const [bodySelected, setBodySelected] = useState("");
  const params = useParams<PostParams>();

  // const [leiaMais, setLeiaMais] = useState(false);

  // Exibindo a informação correspondente ao post selecionado anteriormente
  useEffect(() => {
    api.get(`posts/${params.id}`).then((response) => {
      const { title, body } = response.data;
      setTitleSelected(title);
      setBodySelected(body);
    });
  }, [params.id]);

  // Para exibir os dados na seção Leia Mais
  useEffect(() => {
    api.get(`posts/`).then((response) => {
      const result = response.data;
      //Filtrando o item, que já foi exibido na tela, do Array
      const itemsFilter = result.filter((item:any) => item.id !== Number(params.id));
      
      //Limitando a exibição de posts para 4
      if(itemsFilter.length > 4) {
        itemsFilter.length = 4;
      }
      setItems(itemsFilter);
    });
  }, [params.id]);

  return (
    <Fragment>
      <h2> Detalhes do post selecionado: </h2>
      <hr />
      <ul>
        <li> title: {titleSelected} </li>
        <li> body: {bodySelected} </li>
        <br />
      </ul>

      <h3> Leia mais (soon) </h3>
      <p> Os 4 primeiros, sem considerar o exibido acima: </p>

      {items.map((item) => (
        <div key={item.id} className="item">
          <a href={`/details/${item.id}`}>{JSON.stringify(item)}</a>
        </div>
      ))}
    </Fragment>
  );
}

export default List;
