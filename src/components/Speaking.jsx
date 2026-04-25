import React from 'react';
import Typewriter from 'typewriter-effect';

const Speaking = () => {
  return (
    <Typewriter
      options={{
        strings: [
          '         ',
          'Welcome TRAINER! To the World of POKÉMON!',
          'To play, choose your favourite 6 POKÉMON by clicking the POKÉDEX',
          'Next, select PROCEED to battle your RIVAL for the title of POKÉMON MASTER!',
          'Good Luck!',
        ],
        autoStart: true,
      }}
    />
  );
  // return (
  //   <ReactTypingEffect
  //     text={}
  //     eraseDelay={1000}
  //     typingDelay={0}
  //   />
  // );
};

export default Speaking;
