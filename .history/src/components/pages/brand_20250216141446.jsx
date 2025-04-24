const Brand = () => {
  const [productsByBrand, setProductsByBrand] = useState({});
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(null);

  useEffect(() => {
    // Fetch data from db.json
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        // Group products by brand
        const grouped = data.products.reduce((acc, product) => {
          const brand = product.brand;
          if (!acc[brand]) {
            acc[brand] = [];
          }
          acc[brand].push(product);
          return acc;
        }, {});
        setProductsByBrand(grouped);
      });
  }, []);

  const handleBrandSelect = (index) => {
    setSelectedBrandIndex(index);
  };

  const brands = Object.keys(productsByBrand);

  return (
    <div>
      <h1>Products by Brand</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {brands.map((brand, index) => (
          <div
            key={brand}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: selectedBrandIndex === index ? 'lightblue' : 'white',
            }}
            onClick={() => handleBrandSelect(index)}
          >
            {brand}
          </div>
        ))}
      </div>

      {selectedBrandIndex !== null && (
        <div>
          <h2>Selected Brand: {brands[selectedBrandIndex]}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            {productsByBrand[brands[selectedBrandIndex]].map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                  width: '100px',
                  textAlign: 'center',
                }}
              >
                {product.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h2>Links to Brand Pages</h2>
        {brands.map((brand) => (
          <a
            key={brand}
            href={`/brand/${brand.replace(/[\[\]]/g, '')``}} // Remove square brackets for URL
            style={{ display: 'block', margin: '5px 0' }}
          >
            View all products for {brand}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Brand;