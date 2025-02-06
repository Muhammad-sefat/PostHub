import React from "react";

const Stories = () => {
  // Dummy data for stories
  const dummyStories = [
    {
      id: 1,
      name: "Alice",
      image: "https://i.ibb.co.com/zhwCHfQ0/fitness-10.jpg",
    },
    {
      id: 2,
      name: "Bob",
      image:
        "https://i.ibb.co.com/FRTCvQS/christian-buehner-84-E44-Ed-D18o-unsplash.jpg",
    },
    {
      id: 3,
      name: "Charlie",
      image: "https://i.ibb.co.com/HfqTCgYt/pexels-binyaminmellish-116077.jpg",
    },
    {
      id: 4,
      name: "Diana",
      image:
        "https://i.ibb.co.com/0jZWB16L/pexels-anastasiya-gepp-654466-1462630.jpg",
    },
    {
      id: 5,
      name: "Edward",
      image: "https://i.ibb.co.com/Z6trqZp4/pexels-olly-3769706.jpg",
    },
    {
      id: 6,
      name: "Fiona",
      image: "https://i.ibb.co.com/SD0ymXss/trainer-05.jpg",
    },
  ];

  return (
    <div className="py-4 px-2 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Stories</h2>
      <div className="flex space-x-6 overflow-x-auto">
        {dummyStories.map((story) => (
          <div key={story.id} className="flex flex-col items-center">
            <img
              src={story.image}
              alt={story.name}
              className="w-16 h-16 rounded-full border-2 border-red-500 object-cover"
            />
            <span className="mt-2 text-sm">{story.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
