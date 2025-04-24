const Products = ({  }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // Unified fetch function
  const fetchData = useCallback(async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  }, []);

  // Paginated products fetch
  const fetchProducts = useCallback(async () => {
    const data = await fetchData(`${api}/products?page=${page}&limit=4`);
    setFilteredProducts(prev => [...prev, ...data.products]);
    setHasMore(data.products.length > 0);
  }, [page, api, fetchData]);

  // Search implementation
  const fetchSearchResults = useCallback(debounce(async (query: string) => {
    if (!query) {
      fetchProducts();
      return;
    }
    
    const data = await fetchData(`${api}/search?query=${query}`);
    setFilteredProducts(data);
    setPage(1);  // Reset pagination for new searches
  }, 500), [api, fetchProducts]);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && hasMore && setPage(p => p + 1),
      { rootMargin: "100px" }
    );
    
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loaderRef.current]);

  return (
    <div>
      <Box
        Mobject={filteredProducts}
        Dobject={filteredProducts}
        loaderRef={loaderRef}
        SelectedProduct={(product) => {
          SelectedProduct(product);
          localStorage.setItem("selectedProduct", JSON.stringify(product));
          navigate("/selectedProduct");
        }}
        highlightText={highlightText}
        category={category}
      />
    </div>
  );
};