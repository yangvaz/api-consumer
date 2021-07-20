import { useState, useEffect } from "react";
import api from "../services/api";

import "../styles/views/list.css";
import { Award, Figma, Dribbble } from "react-feather";

interface ItemProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function List() {
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      api.get(`posts`).then((response) => {
        setItems(response.data);
      });
    };
    fetchItems();
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div className="starsContainer">
          <div className="uranusPlanet" />
          <div className="neptunePlanet" />

          <div className="oneBigStar" />

          <div className="litteStars">
            <div className="one" />
            <div className="two" />
            <div className="three" />
            <div className="four" />
            <div className="five" />
            <div className="six" />
            <div className="seven" />
          </div>
        </div>

        <section className="titleHeader">
          <div className="textHeader">
            <span className="gradient"> Code N Soul </span>
            Desafio recebido e feito
            <span className="gradient"> com gosto </span>
          </div>
        </section>

        <section className="badgesContainer">
          <div className="badge">
            {" "}
            <Award /> Premiado como melhor design do Brasil {" "}
          </div>
          <div className="badge mid">
            {" "}
            <Dribbble /> No top-5 de sites em ascensão{" "}
          </div>
          <div className="badge">
            {" "}
            <Figma /> Experiência de qualidade pro usuário{" "}
          </div>
        </section>

        <div className="listSection">
          <div className="listContainer">
            <h2> Lista de todos posts </h2>
            <hr />
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
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
