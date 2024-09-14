const app = Vue.createApp({
    data() {
        return {
            pokemonName: '',
            pokemons: [],
            searchpoke: null,
            searchPokeName:''
        };
    },
    created() {
        this.pokenames(); // Fetch all Pokémon on component load
    },
    methods: {
        async pokeInfo() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`);
                if (!response.ok) throw new Error('Network response is not ok');
                const data = await response.json();
                this.searchpoke = data;
                console.log(this.searchpoke);
            } catch (error) {
                console.error(error);
            }
        },
        async pokenames() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`); // Limit to 1000 for demo purposes
                if (!response.ok) throw new Error('Network response is not ok');
                const dataNames = await response.json();
                let pokemons = [];
                for (let i = 0; i < dataNames.results.length; i++) {
                    let pokemon = dataNames.results[i];
                    pokemons.push({
                        name: pokemon.name,
                        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
                    });
                }
                this.pokemons = pokemons;
                
                console.log(this.pokemons);
            } catch (error) {
                console.error(error);
            }
        }

    }
});

app.mount('#app');