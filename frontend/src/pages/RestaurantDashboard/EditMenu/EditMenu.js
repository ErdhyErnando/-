import React, { useState } from "react";
import "./EditMenu.css"; // Make sure to create a corresponding CSS file for styling

const EditMenu = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "", details: "", price: "", image: null },
    // ... more items
  ]);

  const handleAddMenu = () => {
    const newItem = {
      id: menuItems.length + 1,
      name: "",
      details: "",
      price: "",
      image: null,
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleRemoveMenu = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleMenuItemChange = (id, field, value) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // You will also need to handle image uploads; this is just a placeholder
  const handleImageUpload = (id, image) => {
    handleMenuItemChange(id, "image", image);
  };

  return (
    <div className="edit-menu-container">
      <h1>Edit Menu</h1>
      <button onClick={handleAddMenu}>Add Menu</button>
      {menuItems.map((item) => (
        <div key={item.id} className="menu-item">
          <div className="food-image-placeholder">
            {/* Display the food image here, if available */}
            {item.image ? (
              <img src={item.image} alt="Food" />
            ) : (
              "Insert Food Image"
            )}
          </div>
          <input
            type="text"
            value={item.name}
            onChange={(e) =>
              handleMenuItemChange(item.id, "name", e.target.value)
            }
            placeholder="Insert Food Name"
          />
          <textarea
            value={item.details}
            onChange={(e) =>
              handleMenuItemChange(item.id, "details", e.target.value)
            }
            placeholder="Insert Food Details"
          />
          <input
            type="text"
            value={item.price}
            onChange={(e) =>
              handleMenuItemChange(item.id, "price", e.target.value)
            }
            placeholder="Insert Food Price"
          />
          <button onClick={() => handleRemoveMenu(item.id)}>Remove Menu</button>
        </div>
      ))}
    </div>
  );
};

export default EditMenu;
