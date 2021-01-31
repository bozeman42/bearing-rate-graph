# Bearing rate graph
Inspired by a Smarter Every Day video made on a submarine. https://www.youtube.com/watch?v=AqqaYs7LjlM

Currently deployed here: https://happy-bartik-7a6e60.netlify.app/

## Running the code
This uses rollup to bundle the javascript.

To run the code on your local machine, clone the repo, `yarn install`, `yarn build`, then open the `index.html` file in the public folder in your browser.

## Description
The circle in the left box represents the submarine and if you mouse over that box, the cursor behaves as the contact. the right box is the bearing rate graph showing the relative angle of the submarine and the contact.

It does pretty much what I had hoped it would do, so I'm pleased with that.

This uses some code to handle 2d vectors that I made and have added to over time as I desired more features.

## To do
1. pull out the code for drawing the craft and the graph into their own files
2. add the ability to rotate the submarine
3. maybe a bit better art.
4. Make a math library so I don't just copy and paste the vector code between projects, looking for the latest version.