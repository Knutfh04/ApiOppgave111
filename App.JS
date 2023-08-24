let pokemons = [];
const poke_container = document.getElementById("poke_container");
const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons_number = 151;
const search = document.getElementById("search");
const form = document.getElementById("form");

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getAllPokemon(i);
  }
  pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const removePokemon = () => {
  const pokemonEls = document.getElementsByClassName("pokemon");
  let removablePokemons = Array.from(pokemonEls);
  removablePokemons.forEach((remPoke) => remPoke.remove());
};


const getPokemon = async (id) => {
  const searchPokemons = pokemons.filter((poke) => poke.name.startsWith(id.toLowerCase()));
  removePokemon();
  searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));
};





const getAllPokemon = async (id) => {
  const res = await fetch(`${url}${id}`);
  const pokemon = await res.json();
  pokemons = [...pokemons, pokemon];
};

fetchPokemons();

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  const poke_types = pokemon.types.map((el) => el.type.name).slice(0, 1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const poke_stat = pokemon.stats.map((el) => el.stat.name);
  const stat = poke_stat.slice(0, 3);
  const base_value = pokemon.stats.map((el) => el.base_stat);
  const base_stat = base_value.slice(0, 3);
  const statList = stat.map((s) => `<li class="names">${s}</li>`).join("");
  const baseList = base_stat.map((b) => `<li class="base">${b}</li>`).join("");
  const pokeInnerHTML = `
    <div class="img-container">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}" />
    </div>
    <div class="info">
      <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
      <h3 class="name">${name}</h3>
      <small class="type"><span>${poke_types}</span></small>
    </div>
    <div class="stats">
      <h2>Stats</h2>
      <div class="flex">
        <ul>${statList}</ul>
        <ul>${baseList}</ul>
      </div>
    </div>`;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchItem = search.value.trim();
  if (searchItem) {
    await getPokemon(searchItem);
    search.value = "";
  } else if (searchItem === "") {
    pokemons = [];
    removePokemon();
    fetchPokemons();
  }
});