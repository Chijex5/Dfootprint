"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from 'next/image'; 
import Link from "next/link";

export default function Products() {
  const baseUrl = "https://chijex5-backend2-1.onrender.com";
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState(null);
  const [height, setHeight] = useState('100vh');
  const [shoeImages, setShoeImages] = useState([]);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [shoesData, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const toggleCartPopup = () => {
    setIsCartPopupOpen((prevState) => !prevState);
  };
  useEffect(() => {
    fetchProducts();
}, []);

const fetchProducts = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/product-list`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Assuming gender information might not be included in the data fetched, if it's available, map it properly
        const formattedData = data.map(product => ({
            id: product.id,
            src: product.image_url,
            name: product.name,
            price: product.price,
            gender: product.section // Change as necessary based on your database
        }));
        setProducts(formattedData);
    } catch (error) {
        console.error(error);
    }
};

console.log(shoesData)
  
  const handleAddToCart = (shoe) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.name === shoe.name);
      if (existingItem) {
        // Update the quantity if the item already exists
        return prev.map((item) =>
          item.name === shoe.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prev, { ...shoe, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prevCart) => {
      const item = prevCart[index];
      if (item.quantity > 1) {
        // Reduce quantity if it's greater than 1
        return prevCart.map((el, idx) =>
          idx === index ? { ...el, quantity: el.quantity - 1 } : el
        );
      } else {
        // Remove the item completely if quantity is 1
        return prevCart.filter((_, idx) => idx !== index);
      }
    });
  };
  const handleProceedToCheckout = () => {
    setCheckout(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setCheckout(false);
    setCart([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      localStorage.setItem('checkoutForm', JSON.stringify(newData));
      return newData;
    });
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('checkoutForm'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);


  useEffect(() => {
    // Set images based on gender selection
    const maleImages = ['/1.jpeg', '/2.jpeg', '/3.jpeg', '/4.jpeg'];
    const femaleImages = ['/5.jpeg', '/6.jpeg', '/7.jpeg', '/8.jpeg', '/9.jpeg', '/10.jpeg', '/11.jpeg'];

    setShoeImages(selectedGender === 'male' ? maleImages : femaleImages);
  }, [selectedGender]);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);  // Enable click for mobile
      } else {
        setIsMobile(false); // Disable click for desktop, enable hover
      }
    };

    checkMobile(); // Check on initial render

    window.addEventListener('resize', checkMobile); // Check when window resizes

    return () => {
      window.removeEventListener('resize', checkMobile); // Clean up listener
    };
  }, []);

  useEffect(() => {
    // Function to calculate the available height
    const updateHeight = () => {
      setHeight(`${window.innerHeight}px`);
    };

    // Initial height setup
    updateHeight();

    // Update height when the window is resized
    window.addEventListener('resize', updateHeight);

    // Cleanup event listener when component is unmounted
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // Function to handle gender selection
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    router.push(`/products?type=${gender}`); // Navigate to the products page with the selected gender
  };

  // Check if no gender is selected
  if (!selectedGender) {
    return (
      <div>
        { !isMobile && (
        <div className="relative flex items-center justify-center w-full min-h-screen">
          {/* Left Section */}
          <button
            className="relative flex flex-col justify-end w-1/2 h-screen overflow-hidden group transition-all duration-500"
            onClick={() => handleGenderSelect('male')}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src="/4.jpeg"
              fill
              alt="Male Footwears"
              className="absolute inset-0 object-cover transition-transform duration-700 transform scale-110 group-hover:scale-100"
              priority={true}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
            {/* Title */}
            <div className="relative z-10 p-8">
              <h2 className="text-white text-3xl font-bold mb-2">Male Footwear</h2>
              <p className="text-white opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                Shop now
              </p>
            </div>
          </button>

          {/* Right Section */}
          <button
            className="relative flex flex-col justify-end w-1/2 h-screen overflow-hidden group transition-all duration-500"
            onClick={() => handleGenderSelect('female')}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src="/6.jpeg"
              fill
              alt="Female Footwears"
              className="absolute inset-0 object-cover transition-transform duration-700 transform scale-110 group-hover:scale-100"
              priority={true}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
            {/* Title */}
            <div className="relative z-10 p-8">
              <h2 className="text-white text-3xl font-bold mb-2">Female Footwear</h2>
              <p className="text-white opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                Shop now
              </p>
            </div>
          </button>
        </div>
        )}
        {isMobile && (
          <div className="relative flex flex-col w-full min-h-screen">
          {/* Fashion & Accessories Section */}
          <button
            className="relative flex flex-col justify-end w-full h-[50vh] overflow-hidden group transition-all duration-500"
            onClick={() => handleGenderSelect('male')}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src="/4.jpeg"
              fill
              alt="Male Footwear"
              className="absolute inset-0 object-cover transition-transform duration-700 transform scale-110 group-hover:scale-100"
              priority={true}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
            {/* Title */}
            <div className="relative z-10 p-4">
              <h2 className="text-white text-xl font-bold mb-2">Male Footwear</h2>
              <p className="text-white opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                Shop now
              </p>
            </div>
          </button>
        
          {/* Fragrance & Beauty Section */}
          <button
            className="relative flex flex-col justify-end w-full h-[50vh] overflow-hidden group transition-all duration-500"
            onClick={() => handleGenderSelect('female')}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src="/6.jpeg"
              fill
              alt="Female Footwears"
              className="absolute inset-0 object-cover transition-transform duration-700 transform scale-110 group-hover:scale-100"
              priority={true}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
            {/* Title */}
            <div className="relative z-10 p-4">
              <h2 className="text-white text-xl font-bold mb-2">Female Footwear</h2>
              <p className="text-white opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                Shop now
              </p>
            </div>
          </button>
        </div>        
        )}
      </div>
        




    );
  }

  // If gender is selected, you can proceed to show products (optional)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      {/* Luxurious Header */}
      <header className={`fixed top-0 left-0 w-full z-50 bg-white shadow-lg transition-all duration-500 ease-in-out transform bg-opacity-90`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-lg font-bold text-primary">D&apos;footprint</Link>
            <nav className="flex space-x-4">
              <p onClick={() =>
                setSelectedGender(null)
              } 
              className="text-gray-700 hover:text-primary transition-colors transform hover:scale-105 duration-200 cursor-pointer"
              >
                {selectedGender === 'male' ? 'Male Footwear' : 'Female Footwear'}
              </p>
              <Link href="/track" className="text-gray-700 hover:text-primary transition-colors transform hover:scale-105 duration-200">Track an Order</Link>
            </nav>
          </div>
        </header>
      {/* Shoe Display Grid */}
      {!checkout ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mb-12">
            {shoesData
              .filter((shoe) => shoe.gender === selectedGender)
              .map((shoe, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-[rgba(0,0,0,0.8)] transition-all duration-500">
                  <Image src={shoe.src} alt={shoe.name} layout="responsive" width={500} height={500} objectFit="cover" className="transition-transform duration-500 transform scale-110 group-hover:scale-100" priority formats={['image/webp']} />
                  <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-white text-lg md:text-xl font-semibold">{shoe.name}</h2>
                    <p className="text-white text-sm md:text-lg">₦{shoe.price}</p>
                    <button className="mt-2 bg-accent text-white px-3 py-1 rounded hover:bg-opacity-80" onClick={() => handleAddToCart(shoe)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>


          {/* Cart Overview */}
          {cart.length > 0 && (
            
            <div className="fixed bottom-4 right-4 bg-black bg-opacity-70 p-4 rounded-lg shadow-lg flex items-center justify-between">
              {/* Cart Count */}
              {!isCartPopupOpen && (
              <div>
                <span className="text-white font-bold text-lg">
                  {cart.length} {cart.length > 1 ? 'items' : 'item'} added
                </span>
                
                {/* Show Cart Button */}
                <button
                  className="bg-accent text-white px-4 py-2 ml-4 rounded hover:bg-opacity-80"
                  onClick={toggleCartPopup}
                >
                  {!isCartPopupOpen ? 'Show Cart' : 'Close Cart'}
                </button>
              </div>
              )}
              {isCartPopupOpen && (
                <div className="absolute bottom-4 right-0 bg-primary p-6 rounded-lg shadow-2xl mb-16 w-80 z-50">
                  <h3 className="text-white text-2xl font-bold mb-4">Cart</h3>
                  {cart.length > 0 ? (
                    <div>
                      {cart.map((item, index) => (
                        <div key={index} className="flex justify-between mb-2">
                          <span className="text-white">{item.name} (x{item.quantity})</span>
                          <span className="text-white">₦{(item.price * item.quantity).toFixed(2)}</span>
                          <button className="text-red-500 hover:underline" onClick={() => handleRemoveItem(index)}>Remove</button>
                        </div>
                      ))}
                      <div className="border-t border-white mt-4 pt-2">
                        <div className="flex justify-between text-lg font-semibold text-white">
                          <span>Total:</span>
                          <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                        </div>
                      </div>
                      <button className="mt-4 bg-accent text-white px-4 py-2 rounded hover:bg-opacity-80" onClick={handleProceedToCheckout}>
                        Proceed to Checkout
                      </button>
                      <button
                        className="bg-accent text-white px-4 py-2 ml-4 rounded hover:bg-opacity-80"
                        onClick={toggleCartPopup}
                      >
                        {!isCartPopupOpen ? 'Show Cart' : 'Close Cart'}
                      </button>
                    </div>
                  ) : (
                    <p className="text-white">Your cart is empty.</p>
                  )}
                </div>
              )}

            </div>
          )}

        </>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-2xl p-6 bg-black bg-opacity-70 rounded-lg shadow-xl"
        >
          <h2 className="text-3xl text-white font-bold mb-6">Checkout</h2>
          <div className="mb-4">
            <label className="text-white">Name (Required)</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-white text-primary"
              required
            />
            <small className="text-gray-400">
              We need this to address you personally.
            </small>
          </div>
          <div className="mb-4">
            <label className="text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-primary bg-white"
            />
            <small className="text-gray-400">
              This is for order confirmation and support.
            </small>
          </div>
          <div className="mb-4">
            <label className="text-white">Phone (Required)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-primary bg-white"
              required
            />
            <small className="text-gray-400">
              Our agent will contact you via phone regarding your order.
            </small>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded mt-4 hover:bg-opacity-80"
          >
            Confirm Order
          </button>
        </form>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
            <p className="text-lg mb-6">An agent will contact you soon about your order.</p>
            <button
              className="bg-accent text-white px-4 py-2 rounded hover:bg-opacity-80"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  
  );
}
