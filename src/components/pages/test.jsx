const product = {
  id: 182,
  brand: { name: "UNNEL" },
  category: { sub: "Parts", main: "Electronics" },
  dimensions: { kg: 0.5, hcm: 30, wcm: 19 },
  attributes: { "suitable for": "14-43" },
  created_at: "2025-06-13T15:49:38.699Z",
  thumbnail_index: null,
  name: "Flat panel TV Wall Mount",
  description: "Tv mount",
  user_products: [
    {
      id: 225,
      city: "Douala",
      owner: "Denis ",
      price: 43000,
      colors: ["black"],
      status: "New",
      address: "Kombe Market",
      discount: 0,
      owner_id: "e9959e3d-cb2f-44a5-9076-6390723cce17",
      phone_number: "+237652799981",
      number_in_stock: 4
    },
    {
      id: 186,
      city: "Douala",
      owner: "Fabricetelecom",
      price: 53000,
      colors: ["black"],
      status: "New",
      address: "Kombe Market",
      discount: 0,
      owner_id: "f1ca2adf-723e-4fe6-b7d1-4ec5af58b96b",
      phone_number: "+237670318040",
      number_in_stock: 4
    }
  ],
  images: [
    "https://f004.backblazeb2.com/file/apaxt-images/products/a338c608906653eab6d6b8039c9705a9.png"
  ],
  primaryImage:
    "https://f004.backblazeb2.com/file/apaxt-images/products/a338c608906653eab6d6b8039c9705a9.png",
  thumbnail:
    "https://f004.backblazeb2.com/file/apaxt-images/products/a338c608906653eab6d6b8039c9705a9.png"
};

function Test() {
  return (<>
   {product.user_products.map((seller) => (
  <div
    key={seller.id}
    style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}
  >
    {/* Shared Product Info */}
    <img src={product.primaryImage} alt={product.name} width={150} />
    <h2>{product.name}</h2>
    <p><strong>Brand:</strong> {product.brand.name}</p>
    <p><strong>Category:</strong> {product.category.main} / {product.category.sub}</p>
    <p><strong>Description:</strong> {product.description}</p>

    <hr />

    {/* Unique Seller Info */}
    <h3>Seller: {seller.owner}</h3>
    <p><strong>Price:</strong> {seller.price.toLocaleString()} FCFA</p>
    <p><strong>City:</strong> {seller.city}</p>
    <p><strong>Phone:</strong> {seller.phone_number}</p>
    <p><strong>In Stock:</strong> {seller.number_in_stock}</p>
  </div>
))}
</>
  );
}

export default Test;