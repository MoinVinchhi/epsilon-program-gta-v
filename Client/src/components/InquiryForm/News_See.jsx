import React, { useEffect, useState } from "react";

const UserNews = () => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/news");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <>
      <div className="p-6  page-background bg-opacity-10 text-center">
        <h1 className="font-bold mb-6 text-2xl">Epsilon Program News</h1>
        {news.length === 0 ? (
          <p>No news available.</p>
        ) : (
          <div className="flex flex-wrap gap-8 ">
            {news.map((item) => (
              <div
                key={item.id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col"
              >
                <a href="#" onClick={() => openModal(item)}>
                  <div className="relative w-full h-40 md:h-56 lg:h-64">
                    <img
                      className="absolute inset-0 object-cover w-full h-full rounded-t-lg"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                </a>
                <div className="p-5 flex-grow">
                  <a href="#" onClick={() => openModal(item)}>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.title}
                    </h5>
                  </a>
                  <p className="mb-3 text-gray-700 dark:text-gray-400">
                    {item.description.length > 100 ? (
                      <>
                        {item.description.slice(0, 100)}...
                        <button
                          onClick={() => openModal(item)}
                          className="text-blue-600 hover:underline ml-2"
                        >
                          Read more
                        </button>
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <h2 className="text-2xl font-bold mb-6">{selectedNews.title}</h2>
          <div className="bg-white p-8 flex flex-center items-center justify-center rounded-lg shadow-lg max-w-3xl max-h-[90vh]  mx-4 sm:mx-auto overflow-y-auto relative gap-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <img
              className="w-48 h-48 object-cover mb-6 rounded-lg"
              src={selectedNews.image}
              alt={selectedNews.title}
            />
            <p className="text-lg text-gray-700">{selectedNews.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNews;
