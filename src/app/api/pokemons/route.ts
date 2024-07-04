import { NextResponse } from "next/server";
import axios from "axios";

// 더 불러올까 했는데 데이터가 너무 많아 처리하기 어렵다
const TOTAL_POKEMON = 151;

export const GET = async (request: Request) => {
  try {
    // Json 에서 배열형태로 전환.
    // TOTAL_POKEMON 만큼 길이를 설정하고, 1번 부터 151 번 까지 한 번에 .all 로 모아서 배열로반환
    const allPokemonPromises = Array.from(
      { length: TOTAL_POKEMON },
      (_, index) => {
        const id = index + 1;
        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      }
    );

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse], index) => {
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
