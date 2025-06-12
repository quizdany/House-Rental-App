import React, { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image_url: "",
  });

  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch houses from backend on load
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch("https://house-rental-app-backend.onrender.com/api/houses");
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://house-rental-app-backend.onrender.com/api/houses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newHouse = await response.json();
      alert("House added successfully!");
      setHouses([newHouse, ...houses]); // Add new house to list
      setFormData({ title: "", location: "", price: "", image_url: "" }); // Reset form
    } else {
      alert("Error adding house.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🏡 Add a House Listing</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="title"
          placeholder="House Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />
        <input
          name="image_url"
          placeholder="Image URL (optional)"
          value={formData.image_url}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />
        <button type="submit" style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
          Submit
        </button>
      </form>

      <h2>📋 Listed Houses</h2>
      {loading ? (
        <p>Loading houses...</p>
      ) : houses.length === 0 ? (
        <p>No houses listed yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {houses.map((house) => (
            <li key={house.id} style={{ marginBottom: "1.5rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <h3>{house.title}</h3>
              <p><strong>Location:</strong> {house.location}</p>
              <p><strong>Price:</strong> ${house.price}</p>
              {house.image_url && (
                <img
                  src={house.image_url}
                  alt={house.title}
                  style={{ width: "100%", maxWidth: "400px", height: "auto", borderRadius: "8px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
