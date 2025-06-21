// SearchResultsPage.js
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

function OuterSearch() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  const Search = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Search Results for ${searchQuery}`,
    description: "Find red sneakers at ApaxT.",
    url: `https://apaxt.com/search?query=${searchQuery}`,
  };

  return (
    <div>
      <Helmet>
        <title>Search Results for " {searchQuery ? `Search: ${searchQuery}` : "Browse Products"}" | [ApaxT]</title>
        <meta
            content={
            searchQuery
              ? `Find ${searchQuery} at Apaxt`
              : "Explore our collection."}
        />
        <link
          rel="canonical"
          href={`https://apaxt.com/search?query=${encodeURIComponent(
            searchQuery
          )}`}
        />
        
      
        <script type="application/ld+json">{JSON.stringify(Search)}</script>
      </Helmet>

      {/* Display search results here */}
      <h1>Results for: {searchQuery}</h1>
    </div>
  );
};
export default OuterSearch;