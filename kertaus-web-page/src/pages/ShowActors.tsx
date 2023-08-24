import { useState, useEffect } from "react";

interface band {
  id: number;
  name: string;
  country: string;
  bio: string;
}

interface Props {
  setSearchMode: React.Dispatch<React.SetStateAction<string[]>>;
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

export default function ShowActors({ setSearchMode, style }: Props) {
  const [bands, setBands] = useState<band[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchFestivals() {
      const res = await fetch(`http://localhost:3001/bands`);
      const json = await res.json();

      setBands(json);
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
          {bands!.map((band: band) => (
            <button
              onClick={() => {
                setSearchMode(["byActor", band.name]);
              }}
              key={band.id}
              className={style.card}
            >
              <h1 className={style.title}>{band.name}</h1>
              <p className={style.bio}>{band.bio}</p>
              <p className={style.country}>{band.country}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
