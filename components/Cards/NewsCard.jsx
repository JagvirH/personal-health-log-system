// NewsCard.js
import React from 'react';

const NewsCard = ({ title, author, description, url, urlToImage, publishedAt }) => {
  return (
    <div className="news-card border p-4 mb-4 rounded bg-white shadow">
      {urlToImage && (
        <div className="news-image mb-2">
          <img src={urlToImage} alt={title} className="w-full h-auto rounded" />
        </div>
      )}
      <div className="news-content">
        <h2 className="news-title text-xl font-bold mb-2">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <div className="news-meta text-sm text-gray-600 mb-2">
          <span>{author}</span> | <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
        <p className="news-description text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
