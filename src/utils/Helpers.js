export const ItemTypes = {
  CARD: 'card'
}

export const calculateEffectiveness = (moveType, oppositionType) => {
  const effectivenessChart = {
    normal: {
      rock: 0.5,
      ghost: 0
    },
    fire: {
      fire: 0.5,
      water: 0.5,
      grass: 2,
      ice: 2, 
      bug: 2, 
      rock: 0.5, 
      dragon: 0.5
    },
    water: {
      fire: 2,
      water: 0.5,
      grass: 0.5,
      ground: 2,
      rock: 2,
      dragon: 0.5
    },
    electric: {
      water: 2,
      electric: 0.5,
      grass: 0.5,
      ground: 0,
      flying: 2,
      dragon: 0.5
    },
    grass: {
      fire: 0.5,
      water: 2,
      grass: 0.5,
      poison: 0.5, 
      ground: 2,
      flying: 0.5,
      bug: 0.5,
      rock: 2,
      dragon: 0.5
    },
    ice: {
      water: 0.5,
      grass: 2,
      ice: 0.5,
      flying: 2,
      dragon: 2
    },
    fighting: {
      normal: 2,
      ice: 2,
      poison: 0.5,
      flying: 0.5,
      psychic: 0.5,
      bug: 0.5,
      rock: 2, 
      ghost: 0
    },
    poison: {
      grass: 2,
      poison: 0.5,
      ground: 0.5,
      bug: 2,
      rock: 0.5,
      ghost: 0.5
    },
    ground: {
      fire: 2,
      electric: 2,
      grass: 0.5,
      poison: 2,
      flying: 0,
      bug: 0.5,
      rock: 2
    },
    flying: {
      electric: 0.5,
      grass: 2,
      fighting: 2,
      bug: 2,
      rock: 0.5
    },
    psychic: {
      fighting: 2,
      poison: 2,
      psychic: 0.5
    },
    bug: {
      fire: 0.5,
      grass: 2,
      fighting: 0.5,
      poison: 2,
      flying: 0.5,
      psychic: 2,
      ghost: 0.5
    },
    rock: {
      fire: 2,
      ice: 2,
      fighting: 0.5,
      ground: 0.5,
      flying: 2,
      bug: 2
    },
    ghost: { 
      ghost: 2 
    },
    dragon: { 
      dragon: 2 
    }
  }
  return effectivenessChart[moveType][oppositionType]
}

export class Pokemon {
  constructor(name, hp, atk, def, spAtk, spDef, speed, [...types], backSprite, frontSprite, { ...moves }) {
    this.name = name
    this.hp = hp
    this.atk = atk
    this.def = def
    this.spAtk = spAtk
    this.spDef = spDef,
    this.speed = speed,
    this.types = [...types]
    this.backSprite = backSprite
    this.frontSprite = frontSprite
    this.moves = { ...moves }
  }

  attack(move, oppositionType) {
    if (this.moves.move.pp < 1) return 'No PP left!'
    if (Math.random() * 100 > this.moves.move.accuracy) {
      this.moves.move.pp--
      return 'You missed!'
    }
    const multiplier = this.moves.move.type === this.type ? this.spAtk / this.spDef : this.atk / this.def
    const damage = this.moves.move.power * multiplier * calculateEffectiveness(this.moves.move.type, oppositionType)
    
    return damage
  }

}