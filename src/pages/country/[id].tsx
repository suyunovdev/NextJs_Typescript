// pages/country/[id].tsx
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CountryDetails = () => {
  const params = useParams();
  const id = params?.id; // params.ni tekshirib, id ni olish
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!country) return <p>Country not found.</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{country.name.common}</h1>
      <img
        src={country.flags.png}
        alt={country.name.common}
        className="w-1/2 mt-4"
      />
      <p>
        <strong>Native Name:</strong>{" "}
        {country.name.nativeName
          ? Object.values(
              country.name.nativeName as Record<string, { common: string }>
            )[0].common
          : "N/A"}
      </p>
      <p>
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p>
        <strong>Sub Region:</strong> {country.subregion}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
      </p>
      <p>
        <strong>Border Countries:</strong>{" "}
        {country.borders ? country.borders.join(", ") : "N/A"}
      </p>
      <p>
        <strong>Top Level Domain:</strong> {country.tld.join(", ")}
      </p>
      <p>
        <strong>Currencies:</strong>{" "}
        {Object.values(country.currencies as Record<string, { name: string }>)
          .map(currency => currency.name)
          .join(", ")}
      </p>
      <p>
        <strong>Languages:</strong>{" "}
        {Object.values(country.languages as Record<string, string>).join(", ")}
      </p>
    </div>
  );
};

export default CountryDetails;
