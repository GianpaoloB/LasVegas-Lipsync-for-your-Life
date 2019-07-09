1. HTML/CSS

    - slots
        - a square with a circle in it
        - classes to indicate a player has claimed a slot
        - feel free to add classes to slots to make them easier to find in the DOM
    - board
        - 7 elements for columns containing 6 slots
            - do something to get the seven columns to stay in a row (flexbox, absolute positioning, float)
        - 6 elements for rows containing 7 slots
        - 1 element containing 42 slots

2. Javascript

    - keep track of the current player

    - column selection

        - add the current player's class to the lowest slot in the selected column that has neither the player 1 class nor the player 2 class.
            - if you get through all the slots in the column without finding an empty one, the column is full and you should return out of the function

    - check for victory
        - check in column
        - check in row
        - check diagonally
    - If there is a victory, show victory message
        - Play cannot continue while victory message is displayed
    - If there is not a victory, switch players
