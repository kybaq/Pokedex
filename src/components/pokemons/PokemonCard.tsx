import { PokemonCardProps } from "@/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// card 클릭하면 pokemons/[id] 로 넘기기
// FC type 이용해 제네릭으로 props type 지정 가능함
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Link href={`pokemons/${pokemon.id}`}>
      <li className="flex items-center h-28 border-2 border-solid rounded-xl">
        <div className="flex justify-center items-center p-2">
          <Image
            src={pokemon.sprites.front_default}
            height={86}
            width={86}
            alt={pokemon.name}
            priority={true}
          />
        </div>
        <div>
          <h4>{pokemon.name}</h4>
          <p>{`No. ${pokemon.id}`}</p>
        </div>
      </li>
    </Link>
  );
};

export default PokemonCard;
