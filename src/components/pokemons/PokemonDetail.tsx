"use client";

import { Pokemon, PokemonIdProps } from "@/types/pokemon.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// tanstack query 로 데이터 가져오고 여기서 보여주기

const PokemonDetail: React.FC<PokemonIdProps> = ({ id }) => {
  const {
    data: pokemonData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["pokemonData"],
    queryFn: async (): Promise<Pokemon> => {
      const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
      const pokemonData = await response.json();

      return pokemonData;
    },
    // 캐시된 데이터를 사용하지 않고 매번 새로운 데이터를 가져오도록 설정.
    // 포켓몬 상세 정보 페이지에 머무리는 시간은 30초 이상으로 설정. 30 초 지나면 캐시된 데이터는 삭제됨.
    // 다른 포켓몬의 정보로 이동할 때, 캐시된 데이터가 나타나지 않도록 하기 위함.
    staleTime: 0,
    gcTime: 30 * 1000,
  });

  // 부모 컴포넌트에서 Suspense 로 대신 처리?
  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error with fetch Data. Sorry...</div>;

  console.log(pokemonData);

  return (
    <section className="flex flex-col items-center m-4 border-2">
      <div className="flex flex-col items-center">
        <h1>{pokemonData.name}</h1>
        <span>{`No. ${pokemonData.id}`}</span>
      </div>
      <figure>
        <Image
          src={pokemonData.sprites.front_default}
          height={86}
          width={86}
          alt={pokemonData.name}
          priority={true}
        />
      </figure>
      <h4>{`Name: ${pokemonData.name}`}</h4>
      <span>{`Height: ${pokemonData.height / 10}m, Weight: ${
        pokemonData.weight / 10
      }kg`}</span>
      <br />
      <ul>
        Type:
        {pokemonData.types.map((type, index) => {
          return (
            <li
              key={index}
              className="appearance-none bg-orange-600 border border-gray-300 rounded-md shadow-sm box-border text-white 
            inline-block font-sans font-semibold text-base leading-5 py-1.5 px-4 relative text-center no-underline select-none 
            focus:outline-none hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 disabled:bg-orange-300 disabled:border-gray-200 
            disabled:text-opacity-80 disabled:cursor-default active:bg-orange-800 active:shadow-inner"
            >
              {type.type.name}
            </li>
          );
        })}
      </ul>
      <ul className="my-2">
        Ability:
        {pokemonData.abilities.map((ability, index) => {
          return (
            <li
              key={index}
              className="appearance-none bg-green-600 border border-gray-300 rounded-md shadow-sm box-border text-white 
            inline-block font-sans font-semibold text-base leading-5 py-1.5 px-4 relative text-center no-underline select-none 
            focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-green-300 disabled:bg-green-300 disabled:border-gray-200 
            disabled:text-opacity-80 disabled:cursor-default active:bg-green-800 active:shadow-inner"
            >
              {ability.ability.name}
            </li>
          );
        })}
      </ul>
      <span>Move:</span>
      <ul className="grid grid-cols-5 gap-2">
        {pokemonData.moves.map((move, index) => {
          return <li key={index}>{move.move.name}</li>;
        })}
      </ul>

      <Link href="/">
        <button
          className="bg-blue-500 border border-transparent rounded shadow-inner 
        text-white cursor-pointer inline-block font-sans font-normal text-sm 
        leading-snug p-2 px-3 m-2 relative text-center no-underline select-none focus:ring 
        focus:ring-blue-200 focus:ring-opacity-50 hover:bg-blue-700 active:bg-blue-900 active:shadow-none"
        >
          뒤로 가기
        </button>
      </Link>
    </section>
  );
};

export default PokemonDetail;
