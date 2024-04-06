import React, { useState } from "react";
import { MetaFunction } from "@remix-run/node";
import "../styles/index.css";

interface Article {
  title: string;
  author: string;
  body: string;
  publishDate?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [formData, setFormData] = useState<Article>({
    title: "",
    author: "",
    body: "",
    publishDate: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArticle: Article = {
      title: formData.title,
      author: formData.author,
      body: formData.body,
      publishDate: formData.publishDate || new Date().toISOString(),
    };
    setArticles([...articles, newArticle]);
    // You can add logic to save data to a local JSON file here
    setFormData({ title: "", author: "", body: "", publishDate: "" });
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={formData.body}
            onChange={(e) =>
              setFormData({ ...formData, body: e.target.value })
            }
            required
          ></textarea>
        </div>
        <div>
          <label>Publish Date:</label>
          <input
            type="date"
            value={formData.publishDate}
            onChange={(e) =>
              setFormData({ ...formData, publishDate: e.target.value })
            }
          />
        </div>
        <button type="submit">Add Article</button>
      </form>

      <h2>Articles</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>Author: {article.author}</p>
            <p>{article.body}</p>
            <p>Publish Date: {article.publishDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
