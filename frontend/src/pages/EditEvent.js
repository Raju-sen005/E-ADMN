import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
    registerLink: "",
  });

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/events/${id}`);
      setEventData(res.data);
    } catch (err) {
      alert("Failed to load event");
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/events/${id}`, eventData);
      alert("Event updated successfully");
      navigate("/all-events");
    } catch (err) {
      alert("Failed to update event");
    }
  };

  return (
    <div className="container mt-4" style={{ position: "relative", top: "50px", left: "200px" }}>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Event Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={eventData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={eventData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={eventData.date?.substring(0, 10)}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={eventData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={eventData.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Register Now Link</label>
          <input
            type="text"
            name="registerLink"
            className="form-control"
            value={eventData.registerLink}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
