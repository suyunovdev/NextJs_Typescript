"use client";
// Home sahifasi
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Davlatlar = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("Filter by Region");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const countries = await Davlatlar();
      setData(countries);
      setFilteredData(countries);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (selectedRegion !== "Filter by Region") {
      filtered = filtered.filter(
        (country: any) => country.region === selectedRegion
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((country: any) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedRegion, searchTerm, data]);

  const handleCardClick = (countryName: string) => {
    router.push(`/country/${countryName}`);
  };

  return (
    <div className="flex flex-col h-full px-10">
      <div className="flex justify-between items-center pb-5">
        <input
          type="text"
          placeholder="Search for a country..."
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-1/2 outline-none dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="border-2 border-gray-300 rounded-lg px-5 py-2 outline-none text-black dark:bg-gray-800 dark:text-white"
          value={selectedRegion}
          onChange={e => setSelectedRegion(e.target.value)}>
          <option value="Filter by Region">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredData.map((item: any) => (
          <div
            key={item.name.common}
            className="card border rounded-lg shadow-lg p-4 flex flex-col items-left h-full hover:scale-[1.03] ease-linear transition-all cursor-pointer dark:bg-gray-800 dark:text-white"
            onClick={() => handleCardClick(item.name.common)}>
            <img
              src={item.flags.png}
              alt={item.name.common}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h1 className="text-xl font-semibold mb-2">{item.name.common}</h1>
            <p className="mb-1">Capital: {item.capital || "N/A"}</p>
            <p className="mb-1">Region: {item.region}</p>
            <p className="mb-1">
              Population: {item.population.toLocaleString()}
            </p>
            <p className="mb-1">Area: {item.area.toLocaleString()} km²</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
