import React, { useState, useEffect } from "react";
import { MetaFunction } from "@remix-run/node";
import "../styles/index.css";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Article {
  title: string;
  author: string;
  body: string;
  publishDate?: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Article App" },
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

  useEffect(() => {
    const fetchArticles = async () => {
      const allArticles = await prisma.article.findMany();
      setArticles(allArticles);
    };
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArticle = {
      title: formData.title,
      author: formData.author,
      body: formData.body,
    };

    try {
      const createdArticle = await prisma.article.create({
        data: {
          title: newArticle.title,
          author: newArticle.author,
          body: newArticle.body,
        }
      })

      setArticles([...articles, createdArticle]);

      setFormData({ title: "", author: "", body: "", publishDate: "" });
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  const handleFetchAllArticles = async () => {
    const allArticles = await prisma.article.findMany();
    setArticles(allArticles);
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
        {/* Display articles */}
      </ul>

      <button onClick={handleFetchAllArticles}>Fetch All Articles</button>
    </div>
  );
}
