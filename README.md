# FindAPlayerAPI
Restful api code for FindAPlayer app.

https://vast-meadow-12159.herokuapp.com/

add extention "/users" , "/chats", "/messages", "/comments", "/replys", "/posts", "/plays_sports", "/sports", "/roles", "/plays_roles", "/ratings" to see entire collection

EX: https://vast-meadow-12159.herokuapp.com/users to see all users, then add "/primarykey" of whatever the pk of the item you wnat is to get that particular item.

so if user had a UID of 1234, then use https://vast-meadow-12159.herokuapp.com/users/1234 to get that particular user

to run locally, clone repo, navigate to folder FindAPlayer-API in terminal. ensure you have node installed, type node app.js. then you can access the api at
"localhost:3000". so to see users you would type localhost:3000/users


for posts, access post by PID, UID, SID. notice the flages at the end EX: https://vast-meadow-12159.herokuapp.com/posts/PID

EX: https://vast-meadow-12159.herokuapp.com/posts/UID/flag1

EX: https://vast-meadow-12159.herokuapp.com/posts/SID/flag1/flag2

for pushing, use "git push heroku HEAD:main"
