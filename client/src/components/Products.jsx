import React, { useState, useEffect } from 'react';

function App() {
  const [apiProducts, setApiProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:1337/api/products?populate=*');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to filter unique products based on name, price, and description
  const getUniqueProducts = (products) => {
    const uniqueProducts = {};
    products.forEach((product) => {
      const { name, price, description, size } = product.attributes;
      const key = `${name}_${price}_${description}`;
      
      if (!uniqueProducts[key]) {
        uniqueProducts[key] = { ...product };
        uniqueProducts[key].sizes = [size];
      } else {
        uniqueProducts[key].sizes.push(size);
      }
    });

    return Object.values(uniqueProducts);
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container-fluid pt-5">
          <div className="row px-xl-5 pb-3">
            {getUniqueProducts(apiProducts).map(product => (
              <div className="col-lg-4 col-md-6 pb-1" key={product.id}>
                <div className="cat-item d-flex flex-column border mb-4" style={{ padding: "30px" }}>
                  <p className="text-right">{product.attributes.name}</p>
                  <a href="/" className="cat-img position-relative overflow-hidden mb-3">
                    <img
                      className="img-fluid"
                      src={`http://localhost:1337${product.attributes.pic.data[0].attributes.url}`}
                      alt={product.attributes.name}
                    />
                  </a>
                  <p className="text-right">{product.attributes.description}</p>
                  <p className="text-right">Price:{product.attributes.price}</p>
                  <p className="text-right">Avaliable Sizes: {product.sizes.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
