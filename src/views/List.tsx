import { Fragment, useState, useEffect } from "react";

import "../styles/views/list.css";
import api from "../services/api";

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
      api.get(`posts`).then(response => {
        setItems(response.data)
      });
    };
    fetchItems();
  }, []);

  return (
    <Fragment>
      {items.map((item) => (
        <div key={item.id} className="item">
          <a href={`/details/${item.id}`}>
            {JSON.stringify(item)}
          </a>
        </div>
      ))}

    </Fragment>

  );
}

export default List;
