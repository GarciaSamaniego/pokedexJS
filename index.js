const pokemonContainer = document.querySelector('.pokemon-container');
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

function refresh(){
  window.location.reload("Refresh")
}
function nextPage() {
  fetchPokemon()
}

function createPokemon(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon-block');

  const spriteContainer = document.createElement('div');
  spriteContainer.classList.add('img-container');

  const sprite = document.createElement('img');
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement('p');
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement('p');
  name.classList.add('name');
  name.textContent = pokemon.name;

  
  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);

  for (let k = 0; k<= 6; k++){
    const stats = document.createElement('p')
    stats.classList.add('stats');
    stats.textContent = `${pokemon.stats[k].stat.name}: ${pokemon.stats[k].base_stat}`;
    card.appendChild(stats);
    pokemonContainer.appendChild(card);
  }
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset, limit);