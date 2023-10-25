# Game description
- https://www.whatdowedoallday.com/kaooa/
- https://www.youtube.com/watch?v=Jzeug1XTRQM

***

# HTML
## index.html
   - This file contains a static web page, which acts like an home page for the Kaooa game.

## index1.html
   - This file contains the entire structure of the main game page.
   - There are two major div in this web page.
   - This 1st div named outer futher contains 3 main div:
     - vulture div: This div contains the vul div for the vulture and 4 more div for the dead crows. These 4 div are initially hidden and will be visible as the crows are captured.
     - star div: This div contains 10 div for points of the star structure and 9 div for lines joining these points.
     - crows div: This div contains 7 div for 7 crows.
   - The vulture and crows are created using div attributes.
   - Lines are made by using jquery.
   - Some inline CSS is also being used for giving visibility property.
   - tilt.min.js is used for 3-d effect to the vulture div and the crows div.
   - "data-tilt" is used in the div tag for seeking its presence.

# CSS
## style.css
   - This file contains style for index.html.

## style1.css
   - This file contains the required styling for all components of the index1.html.

# JAVASCRIPT
## script.js
   - The lines joining the star points are drawn using the point cooordinates. The getBoundingClientRect() function  was used to get the coordinates of all points present in the star. The JQuery was used for drawing lines.
   - Vulture has ID as 0.
   - Crows having ID's as 1, 2, ..... ,7.
   - Captured crows have ID's as cc1, cc2, cc3, cc4.
   - Points in stars have their ID's as p1, p2, p3, ... , p10.
   - Two maps are used to store the data related to the star positions and the birds details.
     - Map named star_data stores the star points location ids and the corresponding bird ids. Here -1 denotes that the location is empty.
     - Map named birds_data stores the birds ids (0  for vulture and 1 to 7 for crows) and the corresponding star locations on which they are present. Here "-1" denotes that the bird has not entered the game yet and "captured" denotes that the bird (ie. crow) is captured.
   - The Drag and Drop method was used for playing the game.
   - All the functionalities are implemented in the drop().
   - The game is implemented in such a way that all the invalid moves will not be considered, by returning before appending in the target Id.
   - From drag, the Id of drag's element was obtained.
   - The turn of birds is tracked using a using a turn variable. If it is 1, then its crow's turn else if it is 0, its Vulture's turn.
   - In crow's turn, only crows are allowed to pass through the if condition, using their ID's and vice-versa.
   - Both the maps are updated accordingly after every move.
   - If the vulture captures any crow, that div of crow is deleted and the hidden div for captured crow is made visible.
   - If anyone of the two wins the game, then it is shown that Crow/Vulture won the game.
   - If the winning conditions are satisfied, then it will simply disable the further dragging and dropping using the return statement.
