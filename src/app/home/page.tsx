import React from "react";

const Davlatlar = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

const Home = async () => {
  const data = await Davlatlar();
  return (
    <div className="flex flex-col h-full px-10">
      <div className="flex justify-between items-center pb-5">
        <input
          type="text"
          placeholder="Search for a country..."
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-1/2"
        />
        <select className="border-2 border-gray-300 rounded-lg px-5 py-2 outline-none">
          <option value="Filter by Region">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.map((item: any) => (
          <div
            key={item.name.common}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-left bg-white h-full">
            <img
              src={item.flags.png}
              alt={item.name.common}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h1 className="text-xl font-semibold mb-2">{item.name.common}</h1>
            <p className="text-gray-700 mb-1">
              Capital: {item.capital || "N/A"}
            </p>
            <p className="text-gray-700 mb-1">Region: {item.region}</p>
            <p className="text-gray-700 mb-1">
              Population: {item.population.toLocaleString()}
            </p>
            <p className="text-gray-700 mb-1">
              Area: {item.area.toLocaleString()} km²
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
