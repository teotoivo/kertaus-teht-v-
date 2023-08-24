/* eslint-disable @typescript-eslint/no-unused-vars */
import ShowAll from "./pages/ShowAll";
import ShowByName from "./pages/ShowByName";
import ShowActors from "./pages/ShowActors";
import ShowByActor from "./pages/ShowByActor";
import searchIcon from "./assets/search.svg";
import { useEffect, useState } from "react";

const styles = {
  container: "flex gap-4 flex-wrap justify-center p-4",
  card: "flex flex-col w-80 gap-5 md:gap-0 md:h-80 bg-slate-500 rounded-3xl p-2",
  title: "text-3xl mx-auto",
  bio: "mx-auto text-xl my-auto",
  country: "mt-auto mx-auto",
  bands: "text-xl mx-auto my-auto",
  date: "text-xl mx-auto",
  city: "text-xl mx-auto",
};

export default function App() {
  const [searchMode, setSearchMode] = useState(["all", ""]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search.length > 0) setSearchMode(["name", ""]);
    else setSearchMode(["all", ""]);
  }, [search]);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const x = e.currentTarget[0] as HTMLInputElement;
    setSearch(x.value);
    x.value = "";
    e.preventDefault();
  }
  return (
    <div className="flex-1">
      <header className=" p-3 gap-3 md:gap-6 md:h-24 w-full bg-slate-700 flex flex-col items-center md:flex-row">
        <button
          onClick={() => setSearchMode(["all", ""])}
          className="text-4xl md:text-6xl"
        >
          All
        </button>
        <button
          onClick={() => setSearchMode(["actors", ""])}
          className="text-4xl md:text-4xl"
        >
          Bands
        </button>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 h-20 md:h-3/4 w-11/12 flex md:w-1/3 md:ml-auto rounded-3xl"
        >
          <input
            type="text"
            className="ml-4 outline-none h-full w-full rounded-3xl text-2xl"
          />
          <button type="submit" className="mr-2 m-auto h-3/4">
            <img src={searchIcon} alt="O" className=" h-full" />
          </button>
        </form>
      </header>
      <main>
        {(() => {
          if (searchMode[0] === "all") {
            return <ShowAll style={styles} />;
          } else if (searchMode[0] === "name") {
            return <ShowByName data={search} style={styles} />;
          } else if (searchMode[0] === "actors") {
            return <ShowActors setSearchMode={setSearchMode} style={styles} />;
          } else if (searchMode[0] === "byActor") {
            return <ShowByActor data={searchMode[1]} style={styles} />;
          } else {
            return <ShowAll style={styles} />;
          }
        })()}
      </main>
    </div>
  );
}
