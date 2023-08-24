/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

interface Festival {
  id: number;
  name: string;
  date: string;
  city: string;
  bands: string;
}

interface Props {
  style: {
    container: string;
    card: string;
    title: string;
    bio: string;
    country: string;
    bands: string;
    date: string;
    city: string;
  };
}

export default function ShowAll({ style }: Props) {
  const [festivals, setFestivals] = useState<Festival[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchFestivals() {
      const res = await fetch("http://localhost:3001/festivals");
      let json = await res.json();
      json = json.map((festival: Festival) => {
        festival.date = new Date(festival.date).toLocaleDateString();
        return festival;
      });
      setFestivals(json);
      setLoading(false);
    }
    fetchFestivals();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={style.container}>
          {festivals!.map((festival: Festival) => (
            <div key={festival.id} className={style.card}>
              <h1 className={style.title}>{festival.name}</h1>

              <p className={style.bands}>
                {festival.bands.replace(/,/g, ", ")}
              </p>
              <p className={style.date}>{festival.date}</p>
              <p className={style.city}>{festival.city}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
