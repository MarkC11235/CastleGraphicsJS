Castle Graphics \n

JavaScript Library for rendering \n
This is intended to be used for games, as my plan is to make a game framework that uses this \n

To use: \n
    - Get the canvas(es) that you want to use\n
    - then call addCGCanvas for each canvas, pass in the canvas, the draw function, and the width and height\n
    - Then call render which creates a render loop with those draw functions at 60 fps\n\n

Features: \n
    - Handles resizing the canvas whenever the screen is adjusted \n
    - Will adjust to any screen size \n
    - Can use your own coordinates (width and height passed into addCGCanvas)\n
    - Only renders if the canvas is at least in part on the screen\n

    2D: \n
        - Draw/Fill: Rectangle, Circle, Triangle \n
        - Draw Lines\n
        - Clear/Fill canvas\n
        - Draw border of various width \n
        - Draw Text\n
        - Can draw sprites and animated sprites\n

    3D: \n
        - Projects 3D points onto the 2D screen\n
        - Can draw cubes and rectangular prisms\n 
        - Has a light source to do shading with\n
