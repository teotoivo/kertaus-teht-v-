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
  data: string;
}

export default function ShowByActor(props: Props) {
  const [festivals, setFestivals] = useState<Festival[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchFestivals() {
      const res = await fetch(`http://localhost:3001/bands/${props.data}`);
      let json = await res.json();
      json = json.map((festival: Festival) => {
        festival.date = new Date(festival.date).toLocaleDateString();
        return festival;
      });
      console.log(json);

      setFestivals(json);
      setLoading(false);
    }
    fetchFestivals();
  }, [props.data]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-center gap-4 flex-wrap p-4">
          {festivals!.map((festival: Festival) => (
            <div
              key={festival.id}
              className="flex flex-col w-80 gap-5 md:gap-0 md:h-80 bg-slate-500 rounded-3xl p-2"
            >
              <h1 className="text-3xl mx-auto">{festival.name}</h1>
              <p className="mx-auto text-xl my-auto">
                {festival.bands.replace(/,/g, ", ")}
              </p>
              <p className="mt-auto mx-auto">{festival.date}</p>
              <p className="mx-auto">{festival.city}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
