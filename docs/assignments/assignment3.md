---
title: "Assignment 3: Convergent Design"
layout: doc
---

# Assignment 3: Convergent Design

## Pitch
The internet is full of so much information, but along with that information comes a tsunami of misinformation. RealTalk is a social media app meant for those who are tired of reading misinformation on the internet. By prioritizing the sharing of true information, we hope to reduce the spread of misinformation and making the internet a better place to learn. To do this, we give users the option of trusting or mistrusting posts and comments and apply a karma score to users depending on how trustworthy they are. When choosing which posts we show to users, we consider both the trust score of the post and the karma of the original poster. 

## Functional Design

### Concepts

#### User
<details>
<summary>User State Machine</summary>  

>**concept** User
>
>**purpose** authenticate a partipicant of RealTalk
>
>**state**
>>registered: set User  
>>username, password: registered -> one String
>
>**actions**
>>register(n, p: String, out u: User)
>>>u not in registered  
>>>registered += u  
>>>u.username := n  
>>>u.passowrd := p  
>
>>authenticate(n, p: String, out u: User)
>>>u in registered  
>>>u.username = n and u.password = p  
>
>**operational principle**
>>after register(n, p, u), u in registered and u.username = n and u.password = p
</details>

#### Session
<details>
<summary>Session State Machine</summary>

>**concept** Session \[User]
>
>**purpose** authenticate users for an extended period of time
>
>**state**
>>active: set Session  
>>curUser: active -> one User
>
>**actions**
>>start(u: User, out s: Session)
>>>s not in active  
>>>active += s  
>>>s.curUser = u
>
>>end(s: Session)
>>>s in active  
>>>active -= s
>
>>getUser(s: Session, out u: User)
>>>s in active  
>>>u := s.curUser
>
>**operational principle**
>>after start(u, s) until end(s, u), getUser(s, u') results in u = u'
</details>

#### Friend
<details>
<summary>Friend State Machine</summary>  

>**concept** Friend \[User]
>
>**purpose** increase connections between others
>
>**state**
>>friends: User -> set User
>
>**actions**
>>friend(u1, u2: User)
>>>u1.friends += u2  
>>>u2.friends += u1  
>
>>unfriend(u1, u2: User)
>>>when u2 in u1.friends  
>>>u1.friends -= u2  
>>>when u1 in u2.friends  
>>>u2.friends -= u1  
>
>>areFriends(u1, u2: User, out b: Boolean)
>>>when u2 in u1.friends or u1 in u2.friends  
>>>b := True  
>>>otherwise  
>>>b := False  
>
>**operational principle**
>>after friend(u1, u2) until unfriend(u1, u2), u2 in u1.friends and u1 in u2.friends 
</details>

#### Post
<details>
<summary>Post State Machine</summary>  

>**concept** Post \[User, Content]
>
>**purpose** share content with others
>
>**state**
>>posts: User -> set Post  
>>content: Post -> one Content  
>>author: Post -> one User  
>
>**actions**
>>post(u: User, c: Content, out p: Post)
>>>p.content := c  
>>>p.author := u  
>>>u.posts += p  
>  
>>unpost(u: User, p: Post)
>>>when p in u.posts
>>>u.posts -= p  
>>>forget content of p  
>>>forget author of p  
>
>**operational principle**
>>after post(u, p, c) until unpost(u, p), p in u.posts, u = p.author, and c = p.content
</details>

#### Comment
<details>
<summary>Comment State Machine</summary>  

>**concept** Comment \[Target, User, Content]
>
>**purpose** react to other content
>
>**state**
>>comments: Target -> set Content
>>author: Content -> one User
>
>**actions**
>>comment(t: Target, u: User, c: Content)  
>>>t.comments += c  
>>>store u as author c is from  
>  
>>uncomment(t: Target, u: User, c: Content)  
>>>when the author of c is u  
>>>t.comments -= c  
>>>forget author of c  
>
>**operational principle**
>>after comment(t, u, c) until uncomment(u, c), c in t.comments and u is author of c
</details>

#### Like
<details>
<summary>Like State Machine</summary>  

>**concept** Like \[Target, User]
>
>**purpose** show approval or disapproval of information
>
>**state**
>>likes, dislikes: Target -> set User  
>
>**actions**
>>like(t: Target, u: User)  
>>>t.likes += u  
>  
>>dislike(t: Target, u: User)  
>>>t.dislikes += u  
>  
>>neutralize(t: Target, u: User)
>>>when u in t.likes  
>>>t.likes -= u  
>>>when u in t.dislikes  
>>>t.dislikes -= u  
>
>**operational principle**
>>after like(t, u) until dislike(t, u) or neutralize(t, u), u in t.likes  
>>after dislike(t, u) until like(t, u) or neutralize(t, u), u in t.dislikes
</details>

#### Trust
<details>
<summary>Trust State Machine</summary>  

>**concept** Trust \[Target, User]
>
>**purpose** show agreement or disagreement with the truthfulness of information
>
>**state**
>>trusts, mistrusts: Target -> set User  
>
>**actions**
>>trust(t: Target, u: User)  
>>>t.trusts += u  
>  
>>mistrust(t: Target, u: User)  
>>>t.mistrusts += u  
>  
>>neutralize(t: Target, u: User)
>>>when u in t.trusts  
>>>t.trusts -= u  
>>>when u in t.mistrusts  
>>>t.mistrusts -= u  
>
>**operational principle**
>>after trust(t, u) until mistrust(t, u) or neutralize(t, u), u in t.trusts  
>>after mistrust(t, u) until trust(t, u) or neutralize(t, u), u in t.mistrusts
</details>

#### Karma
<details>
<summary>Karma State Machine</summary>  

>**concept** Karma \[User]
>
>**purpose** show how truthful a user is
>
>**state**
>>karma: User -> one Integer
>
>**actions**
>>increase(u: User)
>>>when u in karma  
>>>u.karma := u.karma + 1  
>>>when u not in karma  
>>>u.karma := 1  
>
>>decrease(u: User)
>>>when u in karma  
>>>u.karma := u.karma - 1  
>>>when u not in karma  
>>>u.karma := -1  
>
>**operational principle**
>>after increase(u) until increase(u) or decrease(u), u.karma is 1 more than before  
>>after decrease(u) until increase(u) or decrease(u), u.karma is 1 less than before
</details>

### Synchronizations

#### UserSession
<details>
<summary>UserSession Sync State Machine</summary>  

>**concept** UserSession
>>include User  
>>include Session \[User.User]
>
>>sync register(username, password: String, out user: User)
>>>User.register(username, password, user)
>
>>sync login(username, password: String, out user: User, out s: Session)
>>>when User.authenticate(username, password, user)  
>>>Session.start(user, s)
>
>>sync authenticate(s: Session, u: User)
>>>Session.getUser(s, u)
>
>>sync logout(s: Session)
>>>Session.end(s)
</details>

#### UserReact
<details>
<summary>UserReact Sync State Machine</summary>  

>**concept** UserReact
>>include User  
>>include Target  
>>include Like \[Target.Target, User.User]  
>>include Trust \[Target.Target, User.User]  
>>include Karma \[User.User]
>
>>sync like(u: User, t: Target)
>>>Like.neutralize(t, u)  
>>>Like.like(t, u)
>
>>sync dislike(u: User, t: Target)
>>>Like.neutralize(t, u)  
>>>Like.dislike(t, u)
>
>>sync neutralLike(u: User, t: Target)
>>>Like.neutralize(t, u)
>
>>sync trust(u: User, t: Target)
>>>Trust.neutralize(t, u)  
>>>Trust.trust(t, u)  
>>>Karma.increase(u)
>
>>sync mistrust(u: User, t: Target)
>>>Trust.neutralize(t, u)  
>>>Trust.mistrust(t, u)  
>>>Karma.decrease(u)
>
>>sync neutralTrust(u: User, t: Target)
>>>Trust.neutralize(t, u)
</details>

#### UserComment
<details>
<summary>UserComment Sync State Machine</summary>  

>**concept** UserReact
>>include User  
>>include Target  
>>include Content  
>>include Comment \[Target.Target, User.User, Content.Content]  
>
>>sync comment(u: User, t: Target, c: Content)
>>>Comment.comment(t, u, c)
>
>>sync uncomment(u: User, t: Target, c: Content)
>>>Comment.uncomment(t, u, c)
</details>

#### UserProfile
<details>
<summary>UserProfile Sync State Machine</summary>  

>**concept** UserProfile  
>include User  
>include Content  
>include Post  \[User.User, Content.Content]  
>include Friend \[User.User]  
>
>>sync friend(u1, u2: User)
>>>Friend.friend(u1, u2)
>
>>sync unfriend(u1, u2: User)
>>>Friend.unfriend(u1, u2)
>
>>sync areFriends(u1, u2: User, out b: Boolean)
>>>Friend.areFriends(u1, u2, b)
>
>>sync makePost(u: User, c: Content, out p: Post)
>>>Post.post(u, c, p)
>
>>sync deletePost(u: User, p: Post)
>>>Post.unpost(u, p)
</details>

### Dependency Diagram

## Wireframe

## Design Tradeoffs

1.  
    a. Like System  
    b. Likes vs. likes and dislikes  
    c. 
2.  
    a. Post Creation Options  
    b. Only registered users can create posts vs even anonymous users can create posts  
    c. The main design of RealTalk is to push true information and to reduce misinformation. If anonymous users could make posts, they would be able to post large amounts of misinformation without their account getting flagged or pushed down in the algorithm, as they have no account.
3.  
    a.  
    b.  
    c.  