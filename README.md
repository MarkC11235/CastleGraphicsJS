Castle Graphics 

JavaScript Library for rendering 

This is intended to be used for games, as my plan is to make a game framework that uses this 

To use: 

    - Get the canvas(es) that you want to use
    
    - then call addCGCanvas for each canvas, pass in the canvas, the draw function, and the width and height

    - Then call render which creates a render loop with those draw functions at 60 fps

Features: 

    - Handles resizing the canvas whenever the screen is adjusted 

    - Will adjust to any screen size 

    - Can use your own coordinates (width and height passed into addCGCanvas)

    - Only renders if the canvas is at least in part on the screen

    2D: 
        - Draw/Fill: Rectangle, Circle, Triangle 
        - Draw Lines
        - Clear/Fill canvas
        - Draw border of various width 
        - Draw Text
        - Can draw sprites and animated sprites

    3D: 
        - Projects 3D points onto the 2D screen
        - Can draw cubes and rectangular prisms 
        - Has a light source to do shading with
