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
>
>>authenticate a partipicant of RealTalk
>
>**state**
>
>**actions**
>
>**operational principle**

#### Post
>**concept** post \[User, Post, Content]
>
>**purpose**
>>share information with others
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
>**concept** comment \[Post, User, Content]
>
>**purpose**
>>react to other content
>
>**state**
>>comments: Post -> set Content
>>author: Content -> one User
>
>**actions**
>>comment(p: Post, u: User, c: Content)  
>>>p.comments += c
>>>store u as author c is from  
>  
>>uncomment(u: User, c: Content)  
>>>when the author of c is u  
>>>p.comments -= c
>>>forget author of c  
>
>**operational principle**
>>after comment(p, u, c) until uncomment(u, c), c in p.comments and u is author of c

#### Like
>**concept** like \[Post, User]
>
>**purpose**
>>show approval or disapproval of information
>
>**state**
>>likes, dislikes: Post -> set User  
>
>**actions**
>>like(p: Post, u: User)  
>>>p.likes += u  
>>>when u is associated with p in dislikes  
>>>p.dislikes -= u  
>  
>>dislike(p: Post, u: User)  
>>>p.dislikes += u  
>>>when u is associated with p in likes  
>>>p.dislikes -= u  
>  
>>neutralize(p: Post, u: User)
>>>when u is associated with p in likes  
>>>p.likes -= u  
>>>when u is associated with p in dislikes  
>>>p.dislikes -= u  
>
>**operational principle**
>>after like(p, u) until dislike(p, u) or neutralize(p, u), u in p.likes  
>>after dislike(p, u) until like(p, u) or neutralize(p, u), u in p.dislikes

#### Trust
>**concept** trust \[Post, User]
>
>**purpose**
>>show agreement or disagreement with the truthfulness of information
>
>**state**
>>trusts, mistrusts: Post -> set User  
>
>**actions**
>>trust(p: Post, u: User)  
>>>p.trusts += u  
>>>when u is associated with p in mistrusts  
>>>p.mistrusts -= u  
>  
>>mistrust(p: Post, u: User)  
>>>p.mistrusts += u  
>>>when u is associated with p in trusts  
>>>p.mistrusts -= u  
>  
>>neutralize(p: Post, u: User)
>>>when u is associated with p in trusts  
>>>p.trusts -= u  
>>>when u is associated with p in mistrusts  
>>>p.mistrusts -= u  
>
>**operational principle**
>>after trust(p, u) until mistrust(p, u) or neutralize(p, u), u in p.trusts  
>>after mistrust(p, u) until trust(p, u) or neutralize(p, u), u in p.mistrusts

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
2.  
    a.  
    b.  
    c.  
3.  
    a.  
    b.  
    c.  