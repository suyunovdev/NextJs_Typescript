// pages/country/[id].tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CountryDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCountryDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch country details");
          }
          const data = await response.json();
          setCountry(data[0]);
        } catch (error) {
          setError("Failed to fetch country details");
          console.error("Failed to fetch country details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCountryDetails();
    }
  }, [id]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!country)
    return <p className="text-center text-red-500">Country not found.</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <button
        onClick={() => router.back()}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
        Back
      </button>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-1/2 h-auto mb-4 rounded-lg shadow-md"
          />
          <h1 className="text-4xl font-extrabold mb-4">
            {country.name.common}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Native Name:</span>{" "}
              {country.name.nativeName
                ? Object.values(
                    country.name.nativeName as Record<
                      string,
                      { common: string }
                    >
                  )[0].common
                : "N/A"}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Population:</span>{" "}
              {country.population.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Region:</span> {country.region}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Sub Region:</span>{" "}
              {country.subregion}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Capital:</span>{" "}
              {country.capital ? country.capital[0] : "N/A"}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Border Countries:</span>{" "}
              {country.borders ? country.borders.join(", ") : "N/A"}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Top Level Domain:</span>{" "}
              {country.tld.join(", ")}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Currencies:</span>{" "}
              {Object.values(
                country.currencies as Record<string, { name: string }>
              )
                .map(currency => currency.name)
                .join(", ")}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-semibold">
              <span className="font-normal">Languages:</span>{" "}
              {Object.values(country.languages as Record<string, string>).join(
                ", "
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
