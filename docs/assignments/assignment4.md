---
title: "Assignment 4: Backend Design & Implementation"
layout: doc
---

# Assignment 4: Backend Design & Implementation

## Abstract Data Models  

### User
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
>>after a user registers with a username and password, they can authenticate with that same username and password  
>>after register(n, p, u), u in registered, u.username = n, u.password = p; authenticate(n, p, u') results in u = u'
</details>

### Session
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
>>after a session starts until it ends, getUser returns the same user that started the session  
>>after start(u, s) until end(s, u), getUser(s, u') results in u = u'
</details>

### Friend
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
>>after a user friends another user, they are both considered each others friends until one of them unfriends the other  
>>after friend(u1, u2) until unfriend(u1, u2), u2 in u1.friends, u1 in u2.friends, and areFriend(u1, u2, b) results in b = True
</details>

### Post
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

### Comment
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

### Like
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

### Trust
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

### Karma
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
>>after increase(u) until decrease(u), u.karma is 1 more than before  
>>after decrease(u) until increase(u), u.karma is 1 less than before
</details>

## App State Diagram  

## Backend Code  