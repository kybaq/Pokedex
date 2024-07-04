"use client";

import React from "react";
import PokemonCard from "./PokemonCard";
import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "@/types/pokemon.type";

const PokemonList: React.FC = () => {
  const {
    data: pokemons: Pokemon[],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async (): Promise<Pokemon[]> => {
      const response = await fetch("http://localhost:3000/api/pokemons/");
      const pokemons = await response.json();

      return pokemons;
    },
    staleTime: 60 * 1000,
  });

  // 부모 컴포넌트에서 Suspense 로 대신 처리?
  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error with fetch Data. Sorry...</div>;

  return (
    <>
      <h1 className="text-center my-4 text-xl font-bold">Pokédex</h1>
      <ul className="grid grid-cols-5 gap-4">
        {pokemons.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </ul>
    </>
  );
};

export default PokemonList;
