---
title: "Assignment 5: Frontend Design & Implementation"
layout: doc
---

# Assignment 5: Frontend Design & Implementation

## Heuristic Evaluation

### Usability

#### Safety

* When deleting posts or comments, a pop-up will occur that will make the user confirm the deletion
    * It will also let them know this deletion is permanent

* When sending a DM to a user that isn't the user's friend, a warning will be shown before the DM is sent to ensure they meant to send a message to someone that isn't their friend

#### Error Tolerance

* Likes, dislikes, trusts, and mistrusts can quickly be retracted by clicking a second time on the corresponding button

* Posts and comments will be able to be removed by clicking the "Delete" button next to said item
    * This was not added initially, but follows the heuristic so will be added

### Physical

#### Fitt's Law

* Search bar is very wide and at the top, resulting in a large Fitt's Law score
    * This hightlights the high likelihood of users searching and allows them to select the search bar more easily

* Post creationg area is large and at the side, resulting in a large Fitt's Law score
    * This hightlights the high likelihood of users making a post while use RealTalk

#### Gestalt principles

* Likes and dislikes are right next to each other, as they conceptually fill the same role but in opposite directions
    * This association allows users to see them as clearly connected

* Trusts and mistrusts are right next to each other, as they conceptually fill the same role but in opposite directions
    * This association allows users to see them as clearly connected

* Likes/dislikes and trusts/mistrusts are not near each other, as they conceptually fill completely different roles
    * This reduces the likelihood that users trust every post/comment they like and mistrust every post/comment they dislike, as this is against the philosophy of RealTalk

* Users usernames and profile pictures are right next to each other
    * This makes users associate to two with each other, building a mental view of various online personas

* User stats are near the corresponding username/profile picture

### Linguistic

#### Speak a user's language

* In the posting interface, there is a clear area to add text labeled "Post something..." and a clear option to add images, videos, or gifs labeled "Add Media"
    * Some clarification could be made on "Add Media," as some users may not understand that media includes images and videos. Perhaps the text could cycle between multiple types of media, cycling from "Add Image" to "Add Video" to "Add GIF"

* Currently, likes, dislikes, trusts, mistrusts, comments, and DMs all have text that say what each button does
    * Changing these to common symbols would ensure the user still knows what each button does and simplify the UI

#### Consistency 

* In every single location that likes, dislikes, trusts, mistrusts, comments, and DMs are used, the symbol/text used to represent them will be the same
    * Users will be able to familiarize themselves with a symbol and never be confused when they click it

## Links