const pokemonContainer = document.querySelector(".pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
let offset = 1;
let limit = 2;

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 3;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 3;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

const searchPokemon = event => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  removeChildNodes(pokemonContainer);
  fetchPokemon(value.toLowerCase());
}

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
    });
}

function fetchPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function refresh() {
  window.location.reload("Refresh");
}
function nextPage() {
  fetchPokemon();
}

function createPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;

  const typeContainer = document.createElement('div')
  typeContainer.classList.add("iconContainer");

  const pokemonType = document.createElement("div");
  pokemonType.classList.add(`${pokemon.types[0].type.name}`, "icon");

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  card.appendChild(typeContainer);
  typeContainer.appendChild(pokemonType);
  pokemonContainer.appendChild(card);
  
  if (pokemon.types[1] === undefined) {
    console.log('No tiene otro tipo');
  } else {
    const pokemonType2 = document.createElement("div");
    pokemonType2.classList.add(`${pokemon.types[1].type.name}`, "icon");
    typeContainer.appendChild(pokemonType2);
  }

  for (let k = 0; k <= 2; k++) {
    const stats = document.createElement("p");
    stats.classList.add("stats");
    stats.textContent = `${pokemon.stats[k].stat.name.toUpperCase()}: ${pokemon.stats[k].base_stat}`;
    card.appendChild(stats);
  }

}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset, limit);
