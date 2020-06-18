import React from 'react'
import ReactTypingEffect from 'react-typing-effect'

const Speaking = () => {
  return (
    <ReactTypingEffect
      text={['         ', 'Welcome TRAINER! To the World of POKÉMON!', 'To play, choose your favourite 6 POKÉMON by clicking the POKÉDEX',  'Next, select PROCEED to battle your RIVAL for the title of POKÉMON MASTER!', 'Good Luck!']}
      eraseDelay={1000}
      typingDelay={0}
    />
  )
}

export default Speaking

