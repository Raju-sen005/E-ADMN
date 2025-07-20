import React, { useState } from "react";
import axios from "axios";

const AddEvent = () => {
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        date: "",
        location: "",
        registerLink: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5001/api/events", formData);
            alert("Event added successfully!");
            setFormData({ image: "", title: "", date: "", location: "", registerLink: "" });
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Failed to add event.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg" style={{
            position: "relative",
            top: "60px",
            width: "180vh",
            left: "500px"
        }}>
            <h2 className="text-2xl font-bold mb-5 text-center">Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="url"
                    name="registerLink"
                    placeholder="Register Now Redirect Link"
                    value={formData.registerLink}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default AddEvent;
