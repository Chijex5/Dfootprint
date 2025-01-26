const deleteProduct = async (productId, setProducts, setMessage) => {
    try {
      // Make the DELETE request to the backend
      const response = await axios.delete(`http://127.0.0.1:5000/api/products/delete/${productId}`);
  
      if (response.status === 200) {
        // Update the products state by removing the deleted product
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  
        // Display a success message
        setMessage({ type: "success", text: "Product deleted successfully." });
      }
    } catch (error) {
  
      // Display an error message
      setMessage({ type: "error", text: "Failed to delete product. Please try again." });
    }
  };
  