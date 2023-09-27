---
title: "Assignment 3: Convergent Design"
layout: doc
---

# Assignment 3: Convergent Design

## Pitch
The internet is full of so much information, but along with that information comes a tsunami of misinformation. RealTalk is a social media app meant for those who are tired of reading misinformation on the internet. By prioritizing the sharing of true information, we hope to reduce the spread of misinformation and making the internet a better place to learn. To do this, we give users the option of trusting or mistrusting posts and comments and apply a karma score to users depending on how trustworthy they are. When choosing which posts we show to users, we consider both the trust score of the post and the karma of the original poster. 

## Functional Design

### Concept List

#### User
>**concept** user
>
>**purpose**
>>authenticate a partipicant of RealTalk
>
>**state**
>
>**actions**
>
>**operational principle**

#### Friend
>**concept** friend
>
>**purpose**
>>increase connections between others
>
>**state**
>>friends: User -> set User
>
>**actions**
>
>**operational principle**

#### Post
>**concept** post \[User, Post, Content]
>
>**purpose**
>>share content with others
>
>**state**
>>posts: User -> set Post  
>>content: Post -> Content
>
>**actions**
>>post(u: User, p: Post, c: Content)
>>>p.content := c  
>>>u.posts += p  
>  
>>unpost(u: User, p: Post)
>>>when p belongs to some user's posts  
>>>u.posts -= p  
>>>forget content of p  
>
>**operational principle**
>>after post(u, p, c) until unpost(u, p), p in u.posts

#### Comment
>**concept** comment \[Target, User, Content]
>
>**purpose**
>>react to other content
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
>>uncomment(u: User, c: Content)  
>>>when the author of c is u  
>>>t.comments -= c
>>>forget author of c  
>
>**operational principle**
>>after comment(t, u, c) until uncomment(u, c), c in t.comments and u is author of c

#### Like
>**concept** like \[Target, User]
>
>**purpose**
>>show approval or disapproval of information
>
>**state**
>>likes, dislikes: Target -> set User  
>
>**actions**
>>like(t: Target, u: User)  
>>>t.likes += u  
>>>when u is associated with t in dislikes  
>>>t.dislikes -= u  
>  
>>dislike(t: Target, u: User)  
>>>t.dislikes += u  
>>>when u is associated with t in likes  
>>>t.dislikes -= u  
>  
>>neutralize(t: Target, u: User)
>>>when u is associated with t in likes  
>>>t.likes -= u  
>>>when u is associated with t in dislikes  
>>>t.dislikes -= u  
>
>**operational principle**
>>after like(t, u) until dislike(t, u) or neutralize(t, u), u in t.likes  
>>after dislike(t, u) until like(t, u) or neutralize(t, u), u in t.dislikes

#### Trust
>**concept** trust \[Target, User]
>
>**purpose**
>>show agreement or disagreement with the truthfulness of information
>
>**state**
>>trusts, mistrusts: Target -> set User  
>
>**actions**
>>trust(t: Target, u: User)  
>>>t.trusts += u  
>>>when u is associated with t in mistrusts  
>>>t.mistrusts -= u  
>  
>>mistrust(t: Target, u: User)  
>>>t.mistrusts += u  
>>>when u is associated with t in trusts  
>>>t.mistrusts -= u  
>  
>>neutralize(t: Target, u: User)
>>>when u is associated with t in trusts  
>>>t.trusts -= u  
>>>when u is associated with t in mistrusts  
>>>t.mistrusts -= u  
>
>**operational principle**
>>after trust(t, u) until mistrust(t, u) or neutralize(t, u), u in t.trusts  
>>after mistrust(t, u) until trust(t, u) or neutralize(t, u), u in t.mistrusts

### Karma
>**concept** karma \[User]
>
>**purpose**
>>show how truthful a user is
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

### Synchronizations

### Dependency Diagram

## Wireframe

## Design Tradeoffs

1. Only Using Likes vs Using Likes and Dislikes  
    a.  
    b.  
    c.  
2.  Posts Created by Authenticated Users vs. Anonymous Users
    a.  
    b.  
    c.  
3.  
    a.  
    b.  
    c.  