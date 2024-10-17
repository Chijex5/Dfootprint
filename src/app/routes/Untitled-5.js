// Example using fetch in a Node.js script or React component
fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'First Product',
        price: 99.99,
        section: 'Footwear',
        image_url: 'https://example.com/product-image.jpg',
        status: 'active',
    }),
})
    .then((response) => response.json())
    .then((data) => console.log('Product added successfully:', data))
    .catch((error) => console.error('Error adding product:', error));
