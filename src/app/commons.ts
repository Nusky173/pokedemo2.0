export const colorsTypes = {
    normal: "#9FA19F",
    fire: "#EE7373",
    fighting: "#81B9EF",
    water: "#73ACF4",
    flying: "#81B9EF",  
    grass: "#3FA129",
    poison: "#9141CB",
    electric: "#FAC000",
    ground: "#915121",
    psychic: "#EF4179",
    rock: "#AFA981",
    ice: "#3dcef3",
    bug: "#91A119",
    dragon: "#5060E1",
    ghost: "#704170",
    dark: "#624D4E",
    steel: "#60A1B8",
    fairy: "#EF70EF",
    stellar: "#8599CA",
}

type ColorType = typeof colorsTypes;
export type ColorCss = keyof ColorType; 

export const generation = {
    'generation-i': "Generation 1",
    'generation-ii': "Generation 2",
    'generation-iii': "Generation 3",
    'generation-iv': "Generation 4",
    'generation-v': "Generation 5",
    'generation-vi': "Generation 6",
    'generation-vii': "Generation 7",
    'generation-viii': "Generation 8",
}

type GenerationType = typeof generation;
export type GenerationName = keyof GenerationType; 

export const statColor = {
    "attack": "#ffa94d",
    "defense": "#ffd43b",
    "hp": "#ff8787",
    "special-attack": "#a5d8ff",
    "special-defense": "#69db7c",
    "speed": "#f783ac",
}

type StatColorName = typeof statColor;
export type StatColorValue = keyof StatColorName; 

export const _getCssColor = (colorName: ColorCss) => {
    return colorsTypes[colorName];
}

export const _getGenerationName= (generationName: GenerationName) => {
    return generation[generationName];
}

export const _getStatColorValue= (colorName: StatColorValue) => {
    return statColor[colorName];
}

export const MAX_POKEMON_COUNT = 1302
