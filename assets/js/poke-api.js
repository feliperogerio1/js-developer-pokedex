
const pokeApi = {} // objeto literal

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    //const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)

    //pokemon.abilities = abilities
    //pokemon.ability = ability

    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat
    pokemon.spAttack = pokeDetail.stats[3].base_stat
    pokemon.spDefense = pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat
    pokemon.total = pokemon.hp + pokemon.attack + pokemon.defense + pokemon.spAttack + pokemon.spDefense + pokemon.speed

    return pokemon
}
// função aplicada a cada elemento do array do map()
pokeApi.getPokemonDetail = (pokemon) => { 
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonDetailById = (pokemonId) => { 
    const urlId = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return fetch(urlId)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => { 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

// 1    Definindo uma função chamada getPokemons como uma propriedade do objeto pokeApi;
// 2    A const url é usada para buscar a lista de pokemon;
// 3    O fetch url faz uma solicitação HTTP GET à URL. O fetch é um recurso nativo do JavaScript 
//para fazer solicitações de rede;
// 4    O .then() permite você falar o que vai acontecer caso uma promise é resolvida com usada
//ela recebe o valor resolvido pela promise como um argumento;
