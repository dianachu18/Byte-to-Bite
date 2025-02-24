import { useState, useEffect } from 'react';
import { Card } from './Card';

export function CardList() {
  const [data, setData] = useState([]);

  async function getData() {
    let response = await fetch('./data.json');
    let info = await response.json();
    return await setData(info);
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="list">
      {
        data &&
        data.length > 0 &&
        data.map((item, index) =>
          <Card 
          title={item.title} 
          text={item.text}
          linkTitle={item.linkTitle}
          key={index}
          />
        )
      }
    </div>
  );
}
