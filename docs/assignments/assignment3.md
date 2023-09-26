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
>**concept** User
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
>**concept** Session
>
>**purpose**
>
>**state**
>
>**actions**
>
>**operational principle**

#### Post
>**concept** Post
>
>**purpose**
>
>**state**
>
>**actions**
>
>**operational principle**

#### Comment
>**concept** Comment \[Post, User]
>
>**purpose**
>
>**state**
>>comments: Post -> set Comment
>
>**actions**
>
>>comment(p: Post, u: User, s: String)  
>>>add s under the post p with author u
>
>>uncomment(c: Comment, u: User)  
>>>when c was posted by u  
>>>delete c from under post  
>
>**operational principle**

#### Like
>**concept** Like \[Post, User]
>
>**purpose**
>
>**state**
>
>>likes, dislikes: Post -> set User  
>
>**actions**
>
>>like(p: Post, u: User)  
>>>associate u with p in likes  
>>>when u is associated with p in dislikes  
>>>remove the association of u to p in dislikes
>
>>dislike(p: Post, u: User)  
>>>associate u with p in dislikes  
>>>when u is associated with p in likes  
>>>remove the association of u to p in likes
>
>**operational principle**

#### Trust
>**concept** Trust \[Post, User]
>
>**purpose**
>
>**state**
>
>>trusts, mistrusts: Post -> set User  
>
>**actions**
>
>>trust(p: Post, u: User)  
>>>associate u with p in trusts  
>>>when u is associated with p in mistrusts  
>>>remove the association of u to p in mistrusts
>
>>mistrust(p: Post, u: User)  
>>>associate u with p in mistrusts  
>>>when u is associated with p in trusts  
>>>remove the association of u to p in trusts
>
>**operational principle**

### Synchronizations

### Dependency Diagram

## Wireframe

## Design Tradeoffs