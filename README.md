<h1>Our Xbox 360 Game Library v1.0</h1>
<h3>An AngularJS (v1.2.3) Demo Project</h3>

<h3>Project Overview:</h3>

<p>
This application is designed to help teams keep track of their XBOX 360 Game library. Team members suggest titles they want added to the team's game library. As the suggestion list grows everybody gets to vote for their particular favorite. As vote count grows the list automatically begins to sort by vote count (decending order), so the most popular games appear on top. When a game is purchased, the game can then be marked as "Owned", and will shift into the appropriate column. Games in the owned column are sorted alphabetically at page render and also as titles are added to the column.
</p>

<p>
Users are allowed to make one suggestion or cast a single vote, once per day, but not both. Also, title duplications are not allowed - although there is no mechanism in place (in this version) to check whether the suggested title is a real XBOX 360 game.
</p>


<h3>Project Review:</h3>

<p>
Download the complete contents of project into a web folder of your choice, navigate to public, and double click on index.html. Note I have included startServer.js and a "public" folder in case you (like me) use Node.js and would rather use review the project as a "real" webpage.
</p>

<h3>Technical Features:</h3>

<ul>
<li> Features my first implementation of Bootstrap (v3.0)! </li>
<li> Demonstration of a single page application using simple controls and a friendly (hopefully!) UI </li>
<li> Clean Web API use (JSONP), with asynchronous Promises implemented for maximum usability </li>
<li> Automatic rerouting of subpage requests back to index.html (admittedly a little heavy handed!) </li>
<li> No server side dependencies, all functionality is encapsulated within client side files. </li>
<li> Semantic and valid HTML, clean CSS, well documented JS </li>
<li> Use of HTML5 Local Storage (string-to-string mapping, no messy serialization / deserialization) </li>
<li> Implementation of a truly portable, reusable JS "clock" object that affords simple timestamping and day-of-week (more functionality to come!) </li>
<li> Responsive Design implemented to afford best possible user experience on (hopefully) any device!
</ul>

<h3>Thank You!</h3>

<p>
I hope you enjoy reviewing my code. Please stay tuned to <a href="http://www.compassinhand.com">www.compassinhand.com</a> for an upcoming series documenting the technical implementation of this project (including the many forehead-smacking challenges I faced).
</p>
