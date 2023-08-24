import { useState, useEffect } from "react";

interface band {
  id: number;
  name: string;
  country: string;
  bio: string;
}

interface Props {
  setSearchMode: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ShowActors({ setSearchMode }: Props) {
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
        <div className="flex gap-4 flex-wrap justify-center p-4">
          {bands!.map((band: band) => (
            <button
              onClick={() => {
                setSearchMode(["byActor", band.name]);
              }}
              key={band.id}
              className="flex flex-col w-80 gap-5 md:gap-0 md:h-80 bg-slate-500 rounded-3xl p-2"
            >
              <h1 className="text-3xl mx-auto">{band.name}</h1>
              <p className="mx-auto text-xl my-auto">{band.bio}</p>
              <p className="mt-auto mx-auto">{band.country}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
