import React, { useState } from "react";
import axios from "axios";

const BlogAdd = () => {
  const [blogs, setBlogs] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
    categories: [],
    subCategories: [],
  });

  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogs((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setBlogs((prev) => ({ ...prev, [e.target.name]: options }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogsData = new blogsData();

    blogsData.append("title", blogs.title);
    blogsData.append("content", blogs.content);
    blogsData.append("author", blogs.author);
    blogsData.append("date", blogs.date);
    blogsData.append("image", image);
    blogsData.append("categories", JSON.stringify(blogs.categories));
    blogsData.append("subCategories", JSON.stringify(blogs.subCategories));

    try {
      const res = await axios.post("http://localhost:5000/api/blogs/", blogsData);
      setMsg(res.data.message);
      setBlogs({
        title: "",
        content: "",
        author: "",
        date: "",
        categories: [],
        subCategories: [],
      });
      setImage(null);
    } catch (err) {
      setMsg("Error: " + err.response?.data?.error);
    }
  };

  const categoriesList = [
    "Hotels", "Educations", "Medical", "Health", "Fitness",
    "Tution", "Software", "Wedding", "Party", "Spa/Club"
  ];

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2>Add New Blog</h2>
      {msg && <p>{msg}</p>}
      <blogs onSubmit={handleSubmit} encType="multipart/blogs-data">
        <div className="mb-3">
          <label>Post Title</label>
          <input
            type="text"
            name="title"
            className="blogs-control"
            value={blogs.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Author Name</label>
          <input
            type="text"
            name="author"
            className="blogs-control"
            value={blogs.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="blogs-control"
            value={blogs.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description / Content</label>
          <textarea
            name="content"
            className="blogs-control"
            rows="5"
            value={blogs.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Categories</label>
          <select
            name="categories"
            className="blogs-select"
            multiple
            value={blogs.categories}
            onChange={handleMultiSelect}
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Sub Categories</label>
          <select
            name="subCategories"
            className="blogs-select"
            multiple
            value={blogs.subCategories}
            onChange={handleMultiSelect}
          >
            {categoriesList.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Banner Image</label>
          <input
            type="file"
            className="blogs-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Blog
        </button>
      </blogs>
    </div>
  );
};

export default BlogAdd;
