# Chess Game 

This project is a simple **Chess game** implemented using **chess.js**, **Socket.IO**, **EJS**, and **Express**. It allows two players to play chess in real-time, and includes a variety of features such as:

- Real-time multiplayer gameplay with Socket.IO.
- Visual board rendering using **EJS** and custom styling.
- Check and Checkmate detection using chess.js.
- Highlighting the King when it's in check, and showing pieces responsible for the check.
- Highlighting squares where the King can escape or where a move is not allowed.

## Features

- **Real-time Multiplayer**: Players can join the game and play against each other in real-time.
- **Check Detection**: When the King is in check, the square will be highlighted in red.

- **Move Validation**: The game ensures that all moves are valid and follows standard chess rules.
- **Checkmate Detection**: The game detects checkmate situations and ends the game.

## Installation

To run this project locally:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/chess-game.git
    ```

2. Navigate to the project folder:

    ```bash
    cd chess-game
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to play the game.

## Technologies Used

- **chess.js**: A chess library for handling the logic of the game (moves, check, checkmate, etc.).
- **Socket.IO**: A library for real-time web applications to enable multiplayer functionality.
- **EJS**: A templating engine used to render the game board and user interface.
- **Express**: A fast and minimalist web framework for Node.js to set up the server and routes.
- **CSS**: Used for styling the game board and pieces.

## How to Play

1. Open the game in two separate browsers or tabs to simulate two players.

## Contributions

If you'd like to contribute to this project, feel free to fork it and submit a pull request. Here are a few ways you could contribute:

- Reporting bugs or issues.
- Suggesting new features or improvements.
- Submitting code improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Feel free to reach out** if you have any questions or suggestions. Enjoy playing chess! ♟️
