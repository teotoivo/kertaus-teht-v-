/* eslint-disable @typescript-eslint/no-unused-vars */
import ShowAll from "./pages/ShowAll";
import ShowByName from "./pages/ShowByName";
import ShowActors from "./pages/ShowActors";
import searchIcon from "./assets/search.svg";
import { useEffect, useState } from "react";

export default function App() {
  const [searchMode, setSearchMode] = useState("all");
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search.length > 0) setSearchMode("name");
    else setSearchMode("all");
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
          onClick={() => setSearchMode("all")}
          className="text-4xl md:text-6xl"
        >
          All
        </button>
        <button
          onClick={() => setSearchMode("actors")}
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
          if (searchMode === "all") {
            return <ShowAll />;
          } else if (searchMode === "name") {
            return <ShowByName data={search} />;
          } else if (searchMode === "actors") {
            return <ShowActors setSearch={setSearch} />;
          } else {
            return <ShowAll />;
          }
        })()}
      </main>
    </div>
  );
}
