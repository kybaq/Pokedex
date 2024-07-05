import PokemonDetail from "@/components/pokemons/PokemonDetail";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <PokemonDetail id={params.id} />
    </>
  );
};

export default page;
