
import "./products.css";
import { useNavigate, Link } from "react-router-dom";
import "../translations/i18n";
import Box from "./boxes";

const Products = ({
  filteredProducts,
  SelectedProduct,
  highlightText,

 
}) => {

  const navigate = useNavigate();
  
  const handleProductClick = (product) => {
    SelectedProduct(product);
    localStorage.setItem("selectedProduct", product);
    navigate("/selectedProduct");
    

    

  
  

  return (
    <>
      {isMobile ? (
        <MobileCard
          addToCartAPI={addToCartAPI}
          addToCartBeforeLogin={addToCartBeforeLogin}
          addToWishlist={addToWishlist}
          Mobject={filteredProducts||Mobject}
          handleWislistToggle={handleWislistToggle}
          isInWishlist={isInWishlist}
          handleProductClick={handleProductClick}
          show={show}
          position={position}
          Iposition={Iposition}
          userId={userId}
          highlightText={highlightText}
          searchTerm={searchTerm}
          fontSize={fontSize}
          IfontSize={IfontSize}
          showDetails={showDetails}
          maxLength={maxLength}
          isExpanded={isExpanded}
          WishlistArray={WishlistArray}
        />
      ) : (
        <DesktopCards
          addToCartAPI={addToCartAPI}
          addToCartBeforeLogin={addToCartBeforeLogin}
          addToWishlist={addToWishlist}
          Dobject={Dobject}
          ts={ts}
          show={show}
          position={position}
          Iposition={Iposition}
          userId={userId}
          highlightText={highlightText}
          searchTerm={searchTerm}
          fontSize={fontSize}
          IfontSize={IfontSize}
          showDetails={showDetails}
          selectedProduct={selectedProduct}
          handleProductHid={handleProductHid}
          setSelectedProduct={setSelectedProduct}
          isExpanded={isExpanded}
          toggleLike={toggleLike}
          SelectedProductDesktop={SelectedProductDesktop}
          maxLength={maxLength}
          WishlistArray={WishlistArray}
        />
      )}
    </>
  );
};

export default Products;
