
# Messenger-Like
A Chat Application so friends can connect from anywhere in the world at any time.

(**work in progress-** last section goes over functionality still being created )

[Live Link](https://master--jovial-platypus-473ca4.netlify.app/)

[Link to Backend](https://github.com/hassankaz1/messenger-backend)

<p align="center">
  <img src="https://github.com/hassankaz1/messenger-frontend/blob/master/demo-gifs/main.gif" alt="animated" />
</p>



## What it does
In Messenger-Like users can create account where they may explore and find new friends in the application. Once connected they may chat and recieve live updates. 




# Composition
### Technologies used
#### Frameworks & Libraries
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![socket](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)


#### Database:
![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000)
![AWS](https://img.shields.io/badge/Amazon_AWS-%23232f3e.svg?style=for-the-badge&logo=amazonaws&logoColor=ec912d)

#### Deployed On
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)


# How It Works
## Login/Signup
Users are greeted with a login/signup page. If account exists, they may log in normally. If they are new to the application, the user has the option to sign up. They can choose to add a custom avatar or will be assigned a space man/woman as default.

#### Login 
<p align="center">
  <img src="https://github.com/hassankaz1/messenger-frontend/blob/master/demo-gifs/login.gif" alt="animated" />
</p>

#### Signup
<p align="center">
  <img src="https://github.com/hassankaz1/messenger-frontend/blob/master/demo-gifs/signup.gif" alt="animated" />
</p>

## Find or View Friends
Within the dashboard for the user. Users may press the friends icon to do 3 things:

1. Explore new friends: here you can view all users active in the application
2. View current friends: there is a chat icon when clicked will start a new or open conversation with the friend
3. Accept requests made by other users that want to be your friend

<p align="center">
  <img src="https://github.com/hassankaz1/messenger-frontend/blob/master/demo-gifs/modal.gif" alt="animated" />
</p>

#### Adding Friend
<p align="center">
  <img src="https://github.com/hassankaz1/messenger-frontend/blob/master/demo-gifs/addfriend.gif" alt="animated" />
</p>


## Chat
In the dashboard, all active chats are displayed on the left side of the screen. Within this we will see notification of unseen messages that are updated live through sockets. Within the conversation, the user can add emoji's and enjoy a fun conversation. 

<p align="center">
  <img src="https://github.com/hassankaz1/messenger-frontend/blob/master/demo-gifs/chatting.gif" alt="animated" />
</p>

### Future Plans

This project is still very much a work in progress. I would like to add many functionalities such as 
- Video/Audio Call
- Ability to edit profile
- Ability to send media/links/images/gifs
- Group Chat 
- Delete chats, accounts, friends
- Search bar functionality to ease how we explore friends or chats

I intend to complete these goals and update the readme and live site accordingly