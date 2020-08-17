# Project 2 - 48-hour hackathon

NB Save some essential bug fixes associated with file-loader imports, I have left the project as it was after the end of 48 hours so as to better evidence what we were able to achieve within the timeframe.

## Brief

Build a React application that consumes a public API during a 48-hour hackathon between two people.

## Requirements

- Consume public API
- Use multiple components
- Contain front-end routing
- Employ semantically clean HTML
- Deploy online

## General Approach

With my colleague, Michael Adair, we decided to utilise the Pokemon API, due primarily to the depth and breadth of the information available and the effective design of the API in general. We narrowed the application down to a battle scenario. Graphically, we were keen to emulate the classic feel of the original games.

### MVP

1. User is able to pick pokemon team of 6 from the original Pokedex;
2. Computer is randomly assigned a team of six pokemon, duplicate pokemon is fine as this remains true to the original gameplay;
3. Moves randomly assigned from the pokemon's move set for both the user and computer teams;
4. Battle scenario with turn-based battle logic;
5. Win or lose ending.

### Methodologies

1. Pair programming using VS Code Live Share;
2. Distributed development using Git source control;
3. Allocation of responsibilities along following general lines:

- I managed the React routing logic, general functionality, and battle logic;
- Michael Adair managed the design and user experience, with particular focus on emulating a nostalgic "feel";

4. Feature-driven development with minimal crossover so as to avoid merge conflicts, particularly important given time constraints;
5. DRY code throughout;
6. Emphasis on declarative and readable code, notwithstanding time constraints.

## Challenges

The main challenges were:

1. Managing multiple asynchronous API calls in a way that did not impact the user experience;
2. Implementing battle logic that would provide a good experience in the time available;
3. Managing the finer points of battle logic, such as type-based move effectiveness and what happens when a pokemon faints.

## Conclusions

Overall, and not just for reasons of nostalgic sentimality, I believe that we can take pride in what we were able to achieve in 48 hours. The "feel" is true to the original games and the functionality complements this by implementing turn-based battle logic, the ability to choose your moves, the ability to change pokemon, and visual cues for loss of health points. Behind the scenes, the code is loyal to the original game's algorithms and incorporates type-based move effectiveness and type-relative attack/defence bonuses. The API was consumed in such a way as to provide only the moves that that pokemon would actually have in the game.

The main area I would like to revisit is state management. Because I had not expected to get as far as we did with the battle logic, a number of the features were added on top of code which had not necessarily been designed to accomodate additional features. This required a number of workarounds, a lot of optional chaining, and resulted in bloated state management solutions. I was fortunate in this respect that we had determined to implement declarative and readable code, which meant that adding battle logic features was not as arduous as it might have been.

One of the smaller features I would like to revisit is what happens when a move misses. Unfortunately, the time constraints prevented this feature from reaching the deployed product, however I believe the difficulties encountered would have been eased by better defined state management.
