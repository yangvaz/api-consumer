import { useState, useEffect } from "react";

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
      const itemsFilter = result.filter(
        (item: any) => item.id !== Number(params.id)
      );

      //Limitando a exibição de posts para 4
      itemsFilter.length = 4;
      
      setItems(itemsFilter);
    });
  }, [params.id]);

  return (
    <div className="main">
      <div className="detailsContainer">
        <section className="detailsHeader">
          <div className="detailsTextHeader">
            <div className="gradient"> Code N Soul </div>
          </div>
        </section>

        <section className="mainDetailsDiv">
          <div className="showDetails">
            <div className="about">
              <h2> Detalhes do post selecionado </h2>
            </div>
            <div className="infoPost">
              <ul>
                <li>
                  {" "}
                  <span> Title: </span> {titleSelected}{" "}
                </li>
                <li>
                  {" "}
                  <span> Body: </span> {bodySelected}{" "}
                </li>
                <br />
              </ul>
            </div>
          </div>

          <hr />

          <div className="readMore">
            <h3> Leia mais </h3>
            <span>
              {" "}
              Os 4 primeiros da lista, sem considerar o exibido acima{" "}
            </span>

            <div className="showTheFour">
              {items.map((item) => (
                <div key={item.id} className="item">
                  <a href={`/details/${item.id}`}>
                    <ul>
                      <li key={item.id}> userId: {item.userId} </li>
                      <li> id: {item.id} </li>
                      <li> title: {item.title} </li>
                      <li> body: {item.body} </li>
                    </ul>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="footer">
          <a href="/"> Voltar pra página inicial </a>
        </section>
      </div>
    </div>
  );
}

export default List;
