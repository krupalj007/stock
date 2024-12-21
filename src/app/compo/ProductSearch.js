import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdown, setDropdown] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isAddChecked, setIsAddChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        let apiUrl = '/api/product';
        if (searchQuery.trim() !== '') {
          apiUrl = `/api/search?query=${searchQuery}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDropdown(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      async function fetchAllProducts() {
        setLoading(true);

        try {
          const response = await fetch('/api/products');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setDropdown(data.products);
        } catch (error) {
          console.error('Error fetching data:', error);
        
        } finally {
          setLoading(false);
        }
      }

      fetchAllProducts();
    }
  }, [searchQuery]);

  const handlePurchaseAddStock = (index, operation, action, slug, value, qunti) => {
    const updatedDropdown = [...dropdown];
    const inputValueAsNumber = parseInt(inputValues[index] || 0, 10);

    if (isNaN(inputValueAsNumber)) {
      return;
    }

    if (operation === 'purchase') {
      if (inputValueAsNumber > updatedDropdown[index].quntity) {
        toast.error('Not enough products in stock for purchase.');
        return;
      }

      updatedDropdown[index].quntity -= inputValueAsNumber;

      if (updatedDropdown[index].quntity === 0) {
        toast.error('Product is now out of stock.');
      } else {
        toast.success(`Purchased ${inputValueAsNumber} product(s) successfully.`);
      }
    } else if (operation === 'addStock') {
      const confirmAddStock = window.confirm(`Are you sure you want to add ${inputValueAsNumber} stock?`);
      if (confirmAddStock) {
        updatedDropdown[index].quntity += inputValueAsNumber;
      } else {
        return;
      }
    }

    setDropdown(updatedDropdown);
    setInputValues((prevInputValues) => ({ ...prevInputValues, [index]: '' }));

    fetch('/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, slug, value, qunti }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        toast.error('Error updating data. Please try again later.');
        setDropdown([...dropdown]);
      });
  };

  const handleQuantityUpdate = (index, increment) => {
    const inputValueAsNumber = parseInt(inputValues[index] || 0, 10);
    if (!isNaN(inputValueAsNumber) && inputValueAsNumber + increment >= 0) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [index]: (inputValueAsNumber + increment).toString(),
      }));
    }
  };

  const toggleAddStockCheckbox = () => {
    setIsAddChecked(!isAddChecked);
  };

  const filterItems = (item) => {
    const searchTerm = searchQuery.toLowerCase();
    const categoryMatches =
      selectedCategory === 'All' || item.slug.toLowerCase().includes(selectedCategory.toLowerCase());
    const searchMatches =
      item.slug.toLowerCase().includes(searchTerm) || item.price.toString().includes(searchTerm);

    return categoryMatches && searchMatches;
  };

  return (
    <div className="p-2 overflow-y-auto mb-2">
      <div className="flex flex-col md:flex-row mb-4 overflow-y-auto">
        <input
          type="text"
          className="border rounded-r px-2 py-1 flex-grow mb-2 md:mb-0 md:mr-2"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />

        <div className="border p-2 mt-2 md:mt-0 bg-gray-100">
          <label>
            <input
              type="checkbox"
              checked={isAddChecked}
              onChange={toggleAddStockCheckbox}
            />
             _Add New Stock?
          </label>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center overflow-y-auto">
           <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g transform="rotate(0 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(30 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
  </rect>
</g>
</svg>
        </div>
      )}

      {dropdown.length > 0 ? (
        <div className="overflow-y-auto overflow-x-auto h-96 mb-4 border-8 border-black-500 scrollbar-hide">
          {dropdown.filter(filterItems).map((item, index) => (
            <div key={item._id} className="border p-4 mb-2 flex flex-col md:flex-row items-center" style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <div className="flex-grow mb-2 md:mb-0 md:mr-4">
                <div className="mb-2 text-xl font-semibold">{item.slug}</div>
                <div className="text-gray-600">Price: ₹{item.price}</div>
                <div>
                  <h1 className="text-lg">
                    Quantity: <span className={item.quntity <= 0 ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>{item.quntity <= 0 ? '( Out Of Stock! )' : item.quntity}</span>
                  </h1>
                </div>
              </div>

              <div className="md:mr-40">
                <img
                  src={item.photo}
                  alt={item.slug}
                  className="h-36 w-36 mx-auto max-w-full sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
                />
              </div>

              <div className="block">
                <div className="items-center">
                  <div className="mr-4"></div>
                  <div>
                    <label htmlFor={`purchase-stock-${index}`} className="block mb-1 text-bold">
                      Purchase/Add Stock:
                    </label>

                    <button
                      className="mt-2 ml-2 px-5 py-5 border text-neutral-50 rounded bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out sm:py-1 sm:px-2 md:py-2 md:px-4 lg:py-2 lg:px-4 xl:py-2 xl:px-4 2xl:py-2 2xl:px-4"
                      onClick={() => handleQuantityUpdate(index, -5)}
                    >
                      -5
                    </button>
                    <button
                      className="mt-2 ml-2 mr-2 px-5 py-5 border text-black rounded bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out sm:py-1 sm:px-2 md:py-2 md:px-4 lg:py-2 lg:px-4 xl:py-2 xl:px-4 2xl:py-2 2xl:px-4"
                      onClick={() => handleQuantityUpdate(index, -1)}
                    >
                      -1
                    </button>

                    <input
                      id={`purchase-stock-${index}`}
                      type="number"
                      value={inputValues[index] || ''}
                      defaultValue={0}
                      placeholder='QTY'
                      onChange={(e) => setInputValues({ ...inputValues, [index]: e.target.value })}
                      className="border rounded px-2 py-1 w-16 text-center"
                    />

                    <button
                      className="mt-2 ml-2 px-5 py-5 text-black border rounded bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out sm:py-1 sm:px-2 md:py-2 md:px-4 lg:py-2 lg:px-4 xl:py-2 xl:px-4 2xl:py-2 2xl:px-4"
                      onClick={() => handleQuantityUpdate(index, 1)}
                    >
                      +1
                    </button>
                    <button
                      className="mt-2 ml-2 px-5 py-5 text-black border rounded bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out sm:py-1 sm:px-2 md:py-2 md:px-4 lg:py-2 lg:px-4 xl:py-2 xl:px-4 2xl:py-2 2xl:px-4"
                      onClick={() => handleQuantityUpdate(index, 5)}
                    >
                      +5
                    </button>
                  </div>

                  {isAddChecked ? (
                    <button
                      className="mt-2 ml-2 px-2 py-1 border text-zinc-950 rounded bg-violet-400 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                      onClick={() => handlePurchaseAddStock(index, 'addStock', 'add', item.slug, inputValues[index], item.quntity)}
                    >
                      Add Stock
                    </button>
                  ) : (
                    <button
                      className="mt-2 ml-2 px-2 py-1 border text-zinc-950 rounded bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                      onClick={() => handlePurchaseAddStock(index, 'purchase', 'sub', item.slug, inputValues[index], item.quntity)}
                    >
                      Purchase-
                    </button>
                  )}
                </div>
              </div>
             
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">{loading ? 'Loading...' : 'Loading...'}</div>
      )}
    </div>
  );
}

export default SearchBar;
