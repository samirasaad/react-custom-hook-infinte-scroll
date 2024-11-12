import { useEffect } from "react";
import { axiosInstance } from "./axios/axiosInstance";
import { useState } from "react";
import useInfiniteScroll from "./hooks/UseInfinteScroll";
import "./App.css";

// skip => should equals number of limit as dummy json desont contain page keyword for pages
function App() {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [paginationObj, setPaginationObj] = useState({});

  const fetchData = async () => {
    try {
      setILoading(true);
      const res = await axiosInstance.get(
        `/products?limit=30&skip=${page}&delay=1500`
      );
      console.log(res);
      if (res) {
        setILoading(false);
        setPage(page + 30);
        setProducts((prevProducts) => [...prevProducts, ...res.data.products]);
        setPaginationObj({
          skip: res.data.skip,
          total: res.data.total,
          limit: res.data.limit,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isLoading, setILoading] = useInfiniteScroll(fetchData);

  useEffect(() => {
    console.log("test login");

    fetchData();
  }, []);

  return (
    <div className="App">
      {products?.map((product) => (
        <p
          key={product.id}
          style={{
            background: "gray",
            border: "1px solid black",
            padding: "10px",
          }}
        >
          {`${product.id}-${product.title}`}
        </p>
      ))}
      {isLoading && <p>loading.........</p>}
      {paginationObj.total === products.length && (
        <p style={{ fontWeight: "bold" }}>you reached the end of the results</p>
      )}
    </div>
  );
}

export default App;
