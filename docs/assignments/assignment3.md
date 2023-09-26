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
>>to represent a single person using RealTalk
>
>**state**
>
>>karma: Integer
>
>**actions**
>
>**operational principle**

#### Session
>**concept** session
>
>**purpose**
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
>>post(u: User, up: Post, c: Content)
>>>store c as content of up  
>>>associate up with u in posts
>>unpost(u: User, up: Post)
>>>when up belongs to some user's posts  
>>>remove up from that user's posts  
>>>forget content of up
>
>**operational principle**
>>after post(u, up, c) until unpost(u, up), up in posts

#### Comment
>**concept** comment \[Post, User, Content]
>
>**purpose**
>>respond to other information
>
>**state**
>>comments: Post -> set Content
>>author: Content -> one User
>
>**actions**
>>comment(p: Post, u: User, c: Content)  
>>>associate c with p in comments  
>>>store u as author c is from
>>uncomment(u: User, c: Content)  
>>>when the author of c is u  
>>>remove association of c to p  
>>>forget author of c 
>
>**operational principle**
>>after comment(p, u, c) until uncomment(u, c), c in comments and u is author of c

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
>>>associate u with p in likes  
>>>when u is associated with p in dislikes  
>>>remove the association of u to p in dislikes
>>dislike(p: Post, u: User)  
>>>associate u with p in dislikes  
>>>when u is associated with p in likes  
>>>remove the association of u to p in likes
>>neutralize(p: Post, u: User)
>>>when u is associated with p in likes  
>>>remove the association of u with p in likes  
>>>when u is associated with p in dislikes  
>>>remove the association of u with p in dislikes
>
>**operational principle**
>>after like(p, u) until dislike(p, u) or neutralize(p, u), u in likes  
>>after dislike(p, u) until like(p, u) or neutralize(p, u), u in dislikes

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
>>>associate u with p in trusts  
>>>when u is associated with p in mistrusts  
>>>remove the association of u to p in mistrusts
>>mistrust(p: Post, u: User)  
>>>associate u with p in mistrusts  
>>>when u is associated with p in trusts  
>>>remove the association of u to p in trusts
>>neutralize(p: Post, u: User)
>>>when u is associated with p in trusts  
>>>remove the association of u with p in trusts  
>>>when u is associated with p in mistrusts  
>>>remove the association of u with p in mistrusts
>
>**operational principle**
>>after trust(p, u) until mistrust(p, u) or neutralize(p, u), u in trusts  
>>after mistrust(p, u) until trust(p, u) or neutralize(p, u), u in mistrusts

### Synchronizations

### Dependency Diagram

## Wireframe

## Design Tradeoffs