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
  }

  reduceHp(amount) {
    if (this.currentHp - amount <= 0) {
      this.faint()
    }
    this.currentHp -= amount
  }

  faint() {
    this.hasFainted = true
    this.isOut = false
  }

  attack(move, target) {
    if (this.moves[move].ppLeft < 1) {
      alert('No PP left for that move!')
      return
    }
    if (Math.random() * 100 > this.moves[move].accuracy) {
      this.moves[move].ppLeft--
      this.isAttacking = false
      this.hasAttacked = true
      alert('You missed!')
      return 0
    }
    const specialMoveTypes = ['electric', 'fire', 'water', 'grass', 'ice', 'psychic', 'dragon', 'dark']
    const multiplier = specialMoveTypes.includes(this.moves[move].type) ? this.spAtk / target.spDef : this.atk / target.def
    const damage = (((10 * this.moves[move].power * multiplier) / 50) + 2) * calculateEffectiveness(this.moves[move].type, target.types[0])
    this.moves[move].ppLeft--
    return Math.round(damage)
  }

}



// export const samplePlayerBattleTeam = [{ 'name': 'pidgey','hp': 40,'currentHp': 40,'atk': 45,'def': 40,'spAtk': 35,'spDef': 35,'speed': 56,'types': [['normal','flying']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png','moves': { 'uproar': { 'accuracy': 100,'name': 'uproar','pp': 10,'type': 'normal','power': 90,'ppLeft': 10 },'wing-attack': { 'accuracy': 100,'name': 'wing-attack','pp': 35,'type': 'flying','power': 60,'ppLeft': 35 },'hidden-power': { 'accuracy': 100,'name': 'hidden-power','pp': 15,'type': 'normal','power': 60,'ppLeft': 15 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'machamp','hp': 90,'currentHp': 90,'atk': 130,'def': 80,'spAtk': 65,'spDef': 85,'speed': 55,'types': [['fighting']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/68.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png','moves': { 'karate-chop': { 'accuracy': 100,'name': 'karate-chop','pp': 25,'type': 'fighting','power': 50,'ppLeft': 25 },'thief': { 'accuracy': 100,'name': 'thief','pp': 25,'type': 'dark','power': 60,'ppLeft': 25 },'secret-power': { 'accuracy': 100,'name': 'secret-power','pp': 20,'type': 'normal','power': 70,'ppLeft': 20 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'dragonite','hp': 91,'currentHp': 91,'atk': 134,'def': 95,'spAtk': 100,'spDef': 100,'speed': 80,'types': [['dragon','flying']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/149.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png','moves': { 'sky-drop': { 'accuracy': 100,'name': 'sky-drop','pp': 10,'type': 'flying','power': 60,'ppLeft': 10 },'outrage': { 'accuracy': 100,'name': 'outrage','pp': 10,'type': 'dragon','power': 120,'ppLeft': 10 },'hurricane': { 'accuracy': 70,'name': 'hurricane','pp': 10,'type': 'flying','power': 110,'ppLeft': 10 },'zap-cannon': { 'accuracy': 50,'name': 'zap-cannon','pp': 5,'type': 'electric','power': 120,'ppLeft': 5 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'exeggutor','hp': 95,'currentHp': 95,'atk': 95,'def': 85,'spAtk': 125,'spDef': 75,'speed': 55,'types': [['grass','psychic']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/103.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png','moves': { 'energy-ball': { 'accuracy': 100,'name': 'energy-ball','pp': 10,'type': 'grass','power': 90,'ppLeft': 10 },'psychic': { 'accuracy': 100,'name': 'psychic','pp': 10,'type': 'psychic','power': 90,'ppLeft': 10 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'golduck','hp': 80,'currentHp': 80,'atk': 82,'def': 78,'spAtk': 95,'spDef': 80,'speed': 85,'types': [['water']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/55.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png','moves': { 'scratch': { 'accuracy': 100,'name': 'scratch','pp': 35,'type': 'normal','power': 40,'ppLeft': 35 },'fury-cutter': { 'accuracy': 95,'name': 'fury-cutter','pp': 20,'type': 'bug','power': 40,'ppLeft': 20 },'psyshock': { 'accuracy': 100,'name': 'psyshock','pp': 10,'type': 'psychic','power': 80,'ppLeft': 10 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'rattata','hp': 30,'currentHp': 30,'atk': 56,'def': 35,'spAtk': 25,'spDef': 35,'speed': 72,'types': [['normal']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/19.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png','moves': { 'covet': { 'accuracy': 100,'name': 'covet','pp': 25,'type': 'normal','power': 60,'ppLeft': 25 },'retaliate': { 'accuracy': 100,'name': 'retaliate','pp': 5,'type': 'normal','power': 70,'ppLeft': 5 },'flame-wheel': { 'accuracy': 100,'name': 'flame-wheel','pp': 25,'type': 'fire','power': 60,'ppLeft': 25 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false }]

export const sampleComputerBattleTeam = [{ 'name': 'tentacool','hp': 40,'currentHp': 40,'atk': 40,'def': 35,'spAtk': 50,'spDef': 100,'speed': 70,'types': [['water','poison']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/72.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png','moves': { 'skull-bash': { 'accuracy': 100,'name': 'skull-bash','pp': 10,'type': 'normal','power': 130,'ppLeft': 10 },'secret-power': { 'accuracy': 100,'name': 'secret-power','pp': 20,'type': 'normal','power': 70,'ppLeft': 20 },'thief': { 'accuracy': 100,'name': 'thief','pp': 25,'type': 'dark','power': 60,'ppLeft': 25 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'clefairy','hp': 70,'currentHp': 70,'atk': 45,'def': 48,'spAtk': 60,'spDef': 65,'speed': 35,'types': [['fairy']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png','moves': { 'covet': { 'accuracy': 100,'name': 'covet','pp': 25,'type': 'normal','power': 60,'ppLeft': 25 },'signal-beam': { 'accuracy': 100,'name': 'signal-beam','pp': 15,'type': 'bug','power': 75,'ppLeft': 15 },'mud-slap': { 'accuracy': 100,'name': 'mud-slap','pp': 10,'type': 'ground','power': 20,'ppLeft': 10 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'machamp','hp': 90,'currentHp': 90,'atk': 130,'def': 80,'spAtk': 65,'spDef': 85,'speed': 55,'types': [['fighting']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/68.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png','moves': { 'brick-break': { 'accuracy': 100,'name': 'brick-break','pp': 15,'type': 'fighting','power': 75,'ppLeft': 15 },'rage': { 'accuracy': 100,'name': 'rage','pp': 20,'type': 'normal','power': 20,'ppLeft': 20 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'staryu','hp': 30,'currentHp': 30,'atk': 45,'def': 55,'spAtk': 70,'spDef': 55,'speed': 85,'types': [['water']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/120.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png','moves': { 'ice-beam': { 'accuracy': 100,'name': 'ice-beam','pp': 10,'type': 'ice','power': 90,'ppLeft': 10 },'take-down': { 'accuracy': 85,'name': 'take-down','pp': 20,'type': 'normal','power': 90,'ppLeft': 20 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'growlithe','hp': 55,'currentHp': 55,'atk': 70,'def': 45,'spAtk': 70,'spDef': 50,'speed': 60,'types': [['fire']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/58.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png','moves': { 'double-edge': { 'accuracy': 100,'name': 'double-edge','pp': 15,'type': 'normal','power': 120,'ppLeft': 15 },'snore': { 'accuracy': 100,'name': 'snore','pp': 15,'type': 'normal','power': 50,'ppLeft': 15 },'ember': { 'accuracy': 100,'name': 'ember','pp': 25,'type': 'fire','power': 40,'ppLeft': 25 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false },{ 'name': 'aerodactyl','hp': 80,'currentHp': 80,'atk': 105,'def': 65,'spAtk': 60,'spDef': 75,'speed': 130,'types': [['rock','flying']],'backSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/142.png','frontSprite': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png','moves': { 'rage': { 'accuracy': 100,'name': 'rage','pp': 20,'type': 'normal','power': 20,'ppLeft': 20 },'secret-power': { 'accuracy': 100,'name': 'secret-power','pp': 20,'type': 'normal','power': 70,'ppLeft': 20 },'smack-down': { 'accuracy': 100,'name': 'smack-down','pp': 15,'type': 'rock','power': 50,'ppLeft': 15 } },'isFainted': false,'isOut': false,'isChoosing': false,'isFighting': false,'isAttacking': false,'isRunning': false,'isSwitching': false }]