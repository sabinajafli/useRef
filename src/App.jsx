import React, { useEffect, useState } from "react";
import Search from "./Components/Search";
import Product from "./Components/Product";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [oldData, setOldData] = useState([]);
  const getData = () => {
    fetch('https://fakestoreapi.com/products').then(res => res.json()).then((data) => {
      setData(data);
      setOldData(data);
    });
  }

 useEffect(() => {
  getData();
 }, []);

 useEffect(() => {
 setData(
   oldData.filter((item) => {
    if(item.title.toLowerCase().includes(query.toLowerCase())) {
    return item;
    }
  })
 )}, [query]);

  return (
    <div>
      <Search query={query} setQuery={setQuery} />
      <div className="flex flex-wrap justify-center">
        {data.map((product) => {
        return <Product key={product.id}  product={product} />
      })}
      </div>
    </div>
    
  );
}

export default App;
