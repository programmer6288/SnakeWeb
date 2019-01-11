I used the p5js library for drawing objects to the HTML canvas.
This was used instead of writing directly to the HTML DOM.
All the files required to run this program are in this folder.

All you need to do to see my project is to decompress the zip file and then open index.html in the browser of your choice.

A page in your browser will open up, showing a welcome page with a navbar at the top. You can navigate to the one player and two player modes.

In the one player mode, you can set your own controls (they can only be english characters right now) in the text boxes. To start the game,
press the "Play Game" button. If any of the values in the text boxes are equal, an alert will pop up.

In the two player mode, each player can set their own controls (they can only be english characters right now) in the text boxes. To start the game,
press the "Play Game" button. If any of the values in the text boxes are equal, an alert will pop up.

If you would like to lower the framerate for any of the games to do some testing, then go to either:
  onePlayer.js: line 67 for the one player mode
  OR
  twoPlayer.js: line 115 for the two player mode
and lower the framerate setting.
