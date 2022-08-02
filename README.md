<h2 align="center">
# GA-Projects -- Projects for General Assembly SEI course --
</h2>
<h3 align="center">
Project #3: OnlyFriends
</h3>

Developed by [@3lueberry](https://github.com/3lueberry), [@yixinlee](https://github.com/yixinlee) and [@c-zhenhao](https://github.com/c-zhenhao)

# What is `<`OnlyFriends`>` ? 🤔

Onlyfriends is a full MERN stack app which allows users to discover and match with other users and rate them. It takes inspiration from the popular Tinder

Deployed Front-end on Vercel, Back-end on Heroku
- Link: http://czhenhao-sei-35-project3.vercel.app/
- Backend Repo: https://github.com/c-zhenhao/czhenhao-sei35-project3-expressonly

# Demo

- Match
- ![OnlyFriends_demo_match](https://user-images.githubusercontent.com/16322250/175983159-775d1467-a517-4984-9550-e67766857451.gif)

- Rate
- ![OnlyFriends_demo_rate](https://user-images.githubusercontent.com/16322250/175982610-e0203276-ff60-4aa5-9d84-806a13a0a422.gif)

- Create Profile / Account
- ![OnlyFriends_demo_createProfile](https://user-images.githubusercontent.com/16322250/175986348-d85a9a88-ead4-4950-bc10-66040df630e0.gif)

- Update Profile
- ![OnlyFriends_demo_updateProfile](https://user-images.githubusercontent.com/16322250/175983973-5ae874ab-f93e-4ad8-b997-62b14cdc408b.gif)

- Filter 
- ![OnlyFriends_demo_filter_delete](https://user-images.githubusercontent.com/16322250/175983908-ceb2466b-ef9d-48df-b80e-4a8301598df3.gif)

- Delete Account


**_Currently available features:_**

```
- User creation, edit and delete
- Matching users with other users
- Filtering feature to allow users to narrow their matches
- Profile rating
```

**_Future Features:_** 🏗

```
- ~~Deployment~~ done 27 Jun 2022
- 1-to-1 chat
- Feature to send "meeting" invites to users which have matched each other
    - Ability to accept, decline
- Better matching algorithm
- Upload and store images
```

## User Stories

```
1. Create profile (name, age, height, photo, )
    1. Edit profile
2. Match with other profiles
3. Rate your matches from 0 - 5
    1. The user's rating is an average of all other user ratings, reflected on profile
```

## Planning & Development

- API calls
    - ![image](https://user-images.githubusercontent.com/16322250/163623987-2cb189a8-d496-4a46-9118-4aa320275de5.png)
 
- DB Schema
    - ![image](https://user-images.githubusercontent.com/16322250/163624017-7eef07da-0eab-4518-85c4-e707f36c0aaa.png)

- Work partition
  - Backend user authentication, API calls, frontend and backend debugging, lead | @3luberry
  - Creation, edit of user & target Profile pages, rating feature | @yixinlee
  - Match and list views, matching and filtering user and targets | @c-zhenhao


## How is it developed? 🧑🏻‍💻

### FrontEnd

```
- React
- React Router 6
- React Redux
- React Bootstrap
- Styled Components
- Axios AJAX
- Custom Modals: Error, Loading and Tooltips
- Material UI
- React-tinder-cards package
```

### Backend

```
- Database: MongoDB
- Express
    - mongoose
    - auth middleware + sessions + bcrypt
    - router
```
