import PokemonList from "@/components/pokemons/PokemonList";
import React, { Suspense } from "react";

const page = () => {
  return (
    <main className="p-2">
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <PokemonList />
      {/* </Suspense> */}
    </main>
  );
};

export default page;
