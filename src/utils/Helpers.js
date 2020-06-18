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
  try {
    effectivenessChart[moveType][oppositionType]
  } catch (err) {
    return 1
  }
  return effectivenessChart[moveType][oppositionType] ? effectivenessChart[moveType][oppositionType] : 1
}

export class Pokemon {
  constructor(name, hp, atk, def, spAtk, spDef, speed, types, backSprite, frontSprite, moves, index) {
    this.name = name
    this.hp = hp
    this.currentHp = hp
    this.atk = atk
    this.def = def
    this.spAtk = spAtk
    this.spDef = spDef,
    this.speed = speed,
    this.types = [...types]
    this.backSprite = backSprite
    this.frontSprite = frontSprite
    this.moves = moves
    this.index = index

    this.isOut = false
    this.isChoosing = true
    this.isFighting = false
    this.isAttacking = false
    this.hasAttacked = false
    this.isSwitching = false
    this.isRunning = false
    this.hasFainted = false
    this.willFaint = false
    this.missed = false
  }

  reduceHp(amount) {
    console.log('Reducing', this.name, 'hp by', amount)
    if (this.currentHp - amount <= 0) {
      this.faint()
    } else {
      this.currentHp -= amount
    }
  }

  faint() {
    this.hasFainted = true
    this.isAttacking = false
    this.hasAttacked = false
    this.currentHp = 0
  }

  willThisPokemonFaint(damage) {
    if (this.currentHp - damage <= 0) {
      this.willFaint = true
    }
  }

  attack(move, target) {
    this.missed = false
    if (!move) {
      console.log('This wasn\'t a move:', move)
      return 0
    }
    if (this.moves[move]?.ppLeft < 1) {
      console.log(this.name)
      console.log(move)
      this.isFighting = true
      this.isAttacking = false
      this.hasAttacked = false
      alert('No PP left for that move!')
      return 0
    }
    // if (Math.random() * 100 > this.moves[move]?.accuracy) {
    //   console.log('MIssed!!!')
    //   this.moves[move].ppLeft--
    //   this.missed = true
    //   alert(`${this.name} missed!`)
    //   return 0
    // }
    const specialMoveTypes = ['electric', 'fire', 'water', 'grass', 'ice', 'psychic', 'dragon', 'dark']
    const multiplier = specialMoveTypes.includes(this.moves[move]?.type) ? this.spAtk / target.spDef : this.atk / target.def
    const damage = (((10 * this.moves[move]?.power * multiplier) / 50) + 2) * calculateEffectiveness(this.moves[move]?.type, target.types[0])
    this.moves[move].ppLeft--
    return Math.round(damage)
  }

}
