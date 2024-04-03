import { GenerationI, GenerationIi, GenerationIii, GenerationIv, GenerationV, GenerationVi, GenerationVii, GenerationViii } from "./sprites-type";


export interface PokeServiceRes
{
    count: number;
    next: string;
    previous: null;
    results: PokemonDetail[];
}

export interface PokemonDetail {
    id: number
    name: string
    url: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    abilities: Ability[]
    game_indices: Index[]
    location_area_encounters: string
    species: Species
    sprites: Sprites
    stats: Stat[]
    types: Type[]
  }

  export class Pokemon {
    constructor(public id: string, public  name: string, public url: string){}
}
  
  export interface Ability {
    is_hidden: boolean
    slot: number
    ability: Ability2
  }
  
  export interface Ability2 {
    name: string
    url: string
  }
  
  export interface Index {
    game_index: number
    version: Version
  }
  
  export interface Version {
    name: string
    url: string
  }
  
  export interface VersionDetail {
    rarity: number
    version: Version
  }
  
  export interface Species {
    name: string
    url: string
  }
  
  export interface Sprites {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
    other: Other
    versions: Versions
  }
  
  export interface Other {
    home: Home
    "official-artwork": OfficialArtwork
  }
  
  export interface Home {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
  }
  
  export interface OfficialArtwork {
    front_default: string
    front_shiny: string
  }
  
  export interface Versions {
    "generation-i": GenerationI
    "generation-ii": GenerationIi
    "generation-iii": GenerationIii
    "generation-iv": GenerationIv
    "generation-v": GenerationV
    "generation-vi": GenerationVi
    "generation-vii": GenerationVii
    "generation-viii": GenerationViii
  }
  
  export interface Stat {
    base_stat: number
    effort: number
    stat: Stat2
  }
  
  export interface Stat2 {
    name: string
    url: string
  }
  
  export interface StatIHM {
    value: number
    name: string
    color: string
  }

  export interface Type {
    slot: number
    type: Type2
  }
  
  export interface Type2 {
    name: string
    url: string
  }

  export interface TypeCss {
    name: string
    css: string
  }
  
  export interface Generation {
    name: string
    url: string
  }

  export interface PokemonSpecies {
    base_happiness: number
    capture_rate: number
    color: Color
    evolution_chain: EvolutionChainUrl
    form_descriptions: any[]
    forms_switchable: boolean
    gender_rate: number
    generation: Generation
    habitat: Habitat
    has_gender_differences: boolean
    hatch_counter: number
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    names: Name[]
    order: number
  }

  export interface Color {
    name: string
    url: string
  }

  export interface EvolutionChainUrl {
    url: string
  }

  export interface Habitat {
    name: string
    url: string
  }

  export interface Name {
    language: Language
    name: string
  }

  export interface Language {
    name: string
    url: string
  }

  export interface EvolutionChain {
    baby_trigger_item: any
    chain: Chain
    id: number
  }
  
  export interface Chain {
    evolution_details: any[]
    evolves_to: EvolvesTo[]
    is_baby: boolean
    species: Species
  }
  
  export interface EvolvesTo {
    evolution_details: EvolutionDetail[]
    evolves_to: EvolvesTo[]
    is_baby: boolean
    species: Species
  }
  
  export interface EvolutionDetail {
    gender: any
    held_item: any
    item: ItemLink
    known_move: any
    known_move_type: any
    location: any
    min_affection: any
    min_beauty: any
    min_happiness: any
    min_level: number
    needs_overworld_rain: boolean
    party_species: any
    party_type: any
    relative_physical_stats: any
    time_of_day: string
    trade_species: any
    trigger: Trigger
    turn_upside_down: boolean
  }

  export interface ItemLink {
    name: string
    url: string
  }
  
  export interface Trigger {
    name: string
    url: string
  }
  
  export interface Species {
    name: string
    url: string
  }

  export interface EvolutionDetailIHM {
    artwork?: string
    artworkShiny?: string
    level?: number
    itemName? : string
    itemSprite?: string
    name: string
  }
  
  export interface Item {
    attributes: Attribute[]
    baby_trigger_for: any
    category: Category
    cost: number
    effect_entries: EffectEntry[]
    flavor_text_entries: FlavorTextEntry[]
    fling_effect: any
    fling_power: number
    game_indices: Index[]
    held_by_pokemon: any[]
    id: number
    machines: any[]
    name: string
    names: Name[]
    sprites: ItemSprites
  }
  
  export interface Attribute {
    name: string
    url: string
  }
  
  export interface Category {
    name: string
    url: string
  }
  
  export interface EffectEntry {
    effect: string
    language: Language
    short_effect: string
  }
  
  export interface Language {
    name: string
    url: string
  }
  
  export interface FlavorTextEntry {
    language: Language2
    text: string
    version_group: VersionGroup
  }
  
  export interface Language2 {
    name: string
    url: string
  }
  
  export interface VersionGroup {
    name: string
    url: string
  }
  
  export interface Index {
    game_index: number
    generation: Generation
  }
  
  export interface Generation {
    name: string
    url: string
  }
  
  export interface Name {
    language: Language3
    name: string
  }
  
  export interface Language3 {
    name: string
    url: string
  }
  
  export interface ItemSprites {
    default: string
  }