---
title: "Project 3: Convergent Design"
layout: doc
outline:
 level: [2, 4]
---


# {{ $frontmatter.title }}


## Team Contacts


Team Email: [61040-project@mit.edu](mailto:61040-project@mit.edu)


### Team Members


| Name             | Email                                       | GitHub                                             |
| ---------------- | ------------------------------------------- | -------------------------------------------------- |
| Henry Asa        | [henryasa@mit.edu](mailto:henryasa@mit.edu) | [@HenryAsa](https://github.com/HenryAsa)           |
| Amir Kazeminia   | [amirka@mit.edu](mailto:amirka@mit.edu)     | [@amirika20](https://github.com/amirika20)         |
| Cal Wilson       | [calwilsn@mit.edu](mailto:calwilsn@mit.edu) | [@calwilsn](https://github.com/calwilsn)           |
| Jonatan Fontanez | [jonfon01@mit.edu](mailto:jonfon01@mit.edu) | [@DragonStorm25](https://github.com/DragonStorm25) |


### Team Project Mentors


| Name                | Email                                       |
| ------------------- | ------------------------------------------- |
| Ashley Granquist    | [ashleymg@mit.edu](mailto:ashleymg@mit.edu) |
| Fabrizzio Orderique | [porderiq@mit.edu](mailto:porderiq@mit.edu) |




## Application Summary: Sharefolio


> Invest exactly like Warren Buffett without being Warren Buffett.


Sharefolio is a community-powered asset trading platform.  Unlike other asset marketplaces, users are able to see other users' asset holdings and public leaderboards are used to rank users' trading/investment performance on the application.  With this data made public, users can make more informed decisions on what they want to invest in depending on their peer's actions and holdings.  Additionally, users can choose to `Copy-Invest` other users' portfolios, meaning that all trades a copied portfolio makes are automatically reflected in all copiers' portfolios.  This `Copy-Investing` feature allows users to "invest exactly like Warren Buffett, without being Warren Buffett."


::: warning Important Note About Privacy
Similar to how Venmo conceals the value of each transaction but publicizes the comment associated with a given transaction, users will be able to choose whether a particular transaction will be public or private.  Additionally, **all specific values** (for example, the amount of money a particular user invested in a certain asset) are always private.  Percentage distributions may be made public (depending on the user's discretion), but specific quantities are confidential.
:::




# Functional Design


## Concepts


### Asset


<br>


#### Purpose
To track the current price, history, and statistics associated with an asset or share of a company.


#### Principle
Purchasing an asset $s$ signifies ownership of one share of a company $c$ in sector $z$, its current and historical price $p$, beta $\beta$, and other statistics about the stock may be viewed.  The price at the time they bought the stock, $x$, will also be used to track relative price changes.


#### State
```TypeScript
assetName: one String
allAssets: const set String
purchaseDate: one Date
priceHistory: one String, one Date -> opt Number
beta: one String -> one Number
dividend: one String -> one Number
pe: one String -> one Number
```


#### Actions
```Python
getPE(name: string, out pe: Number)
   pe := pe(name)
   assert pe is not None


getBeta(name: string, out beta: Number)
   beta := beta(name)
   assert beta is not None


getDividend(name: string, out dividend: Number)
   dividend := dividend(string)
   assert dividend is not None


getPrice(name: string, d: Date, out price: Number)
   price := priceHistory(name, d)
   assert price is not None


getPriceChange(a: Asset, d: Date, out delta: Number)
   startPrice := priceHistory(a.assetName, a.purchaseDate)
   endPrice := priceHistory(a.assetName, d)
   assert startPrice is not None and endPrice is not None
   delta := endPrice - startPrice


purchase(name: string, d: Date, out s: Asset)
   assert name in allAssets
   s := Asset()
   s.assetName = name
   s.purchaseDate = d
```


### Portfolio[Asset]


<br>


#### Purpose
`Portfolios` are a collection of stocks that make it easy to organize, track, and manage a collection of assets.


#### Principle
After adding a collection of assets $s$, to their portfolio, their combined beta $b$, and other statistics may be viewed


#### State
```TypeScript
portfolioName: one String
nameToOwner: one String -> one String
stocksInPorfolio: one String -> set Asset
```


#### Actions
```Python
getStocks(name: String, out stocks: set Asset)
   stocks := stocksInPortfolio(name)
   assert stocks is not None


getOwner(name: String, out owner: String)
   owner := nameToOwner(name)
   assert owner is not None


createPortfolio(name: string, owner: String, out p: Portfolio)
   p := Portfolio()
   p.portfolioName := name
   nameToOwner(name) = owner


addToPortfolio(name: string, a: Asset)
   assert name in stocksInPortfolio
   stocksInPortfolio(name) += a


getBeta(name: String, out beta: Number)
   stocks := stocksInPortfolio(name)
   assert stocks is not None
   beta := 0
   totalQuantity := 0
   for stock in stocks:
       totalQuantity += 1
       beta += Asset.getBeta(stock.assetName)
   beta /= totalQuantity


getProfit(name: String, d: Date, out profit: Number)
   stocks := stocksInPortfolio(name)
   assert stocks is not None
   profit := 0
   for stock in stocks:
       profit += Asset.getPriceChange(stock, d)


getRelativeProfit(name: String, d: Date, out relativeProfit: Number)
   stocks := stocksInPortfolio(name)
   assert stocks is not None
   relativeProfit := 0
   totalQuantity := 0
   for stock in stocks:
       totalQuantity += 1
       relativeProfit += Asset.getPriceChange(stock, d) / Asset.getPrice(stock.assetName, stock.purchaseDate)
   relativeProfit /= totalQuantity
```




### Friend[User]


<br>


#### Purpose
To allow for a connection between users.


#### Principle
After a user $u$ befriends another user $u'$, they may gain special permissions to view hidden attributes about one another.


#### State
```TypeScript
friends: User -> set User
```


#### Actions
```Python
friend(u1, u2: User)
   u1.friends += u2 
   u2.friends += u1 


unfriend(u1, u2: User)
   when u2 in u1.friends 
   u1.friends -= u2 
   when u1 in u2.friends 
   u2.friends -= u1 


areFriends(u1, u2: User, out b: Boolean)
   when u2 in u1.friends or u1 in u2.friends 
   b := True 
   otherwise 
   b := False 
```




### Money


<br>


#### Purpose
A medium that simplifies transactions, serves as a measure of value and stores wealth.


#### Principle
Some amount of money $m$ is deposited on the app, which may be used for some actions within the app before some quantity of money $m'$ is later withdrawn.


#### State
```TypeScript
balances: one String -> one Number
```


#### Actions
```Python
createAccount(n: name)
   assert name not in balances
   balances(name) = 0


deposit(n: name, quantity: Number)
   assert quantity > 0
   assert name in balances
   balances(name) += quantity


withdraw(n: name, quantity: Number)
   assert quantity > 0
   assert name in balances
   assert balances(name) > quantity
   balances(name) -= quantity
```




### Leaderboard[T]


<br>


#### Purpose
To rank users based on a defined factor that describes their performance in trading.


#### Principle
Some underlying metric may be used to sort a collection of `Asset`'s $a$ or users' `Portfolio`'s $p$, ranking their performance in sorted order in `Leaderboard` $l$.


#### State
```TypeScript
name: one String
allLeaderboards: set String
items: one String -> one set T
```


#### Actions
```Python
createLeaderboard(name: String, items: set T, out l: Leaderboard[T])
   assert name not in allLeaderboards
   items(name) := items
   allLeaderboards += name


sortLeaderboard(name: String, sortFunc: T, T -> bool)
   assert name in items
   sort(items, sortFunc)
```




### Article[GPT]


<br>


#### Purpose
To inform users about the news, recent trends, or developments in the market or related topics.


#### Principle
Each article $a$ provides a set of tools including filtering, and summarization to analyze the text $t$ of that article.


#### State
```TypeScript
title: one String
body: one String
dateUploaded: one Date
allArticles: one String -> one Article
```


#### Actions
```Python
createArticle(t: String, b: String, d: Date out a: Article)
   assert t not in allArticles
   a := Article()
   a.title := t
   a.body := b
   a.date := d
   allArticles(t) := a


filterArticle(t: String, pattern: String, out indices: set Numbers)
   assert t in allArticles
   article := allArticles(t)
   text := article.body
   indices = text.find_all(pattern)


summarizeArticle(t: String, out summary: String)
   assert t in allArticles
   article := allArticles(t)
   text := article.body
   # ope no GPT in set relation syntax
   summary = GPT(f"summarize this text: \n {text}")
```




### NewsFeed[Article]


<br>


#### Purpose
Presents a collection of articles to the user that are relevant to that user's interests, asset holdings, and preferences.


#### Principle
A collection of related articles $a$ are collected into a single NewsFeed $n$.


#### State
```TypeScript
feedName: one String
allNewsFeeds: one String -> one NewsFeed
articlesInFeed: one String -> set Article
```


#### Actions
```Python
createFeed(name: String, out n: NewsFeed)
   assert name not in allNewsFeeds
   n := NewsFeed()
   n.feedName := name
   allNewsFeeds(name) := n


addToFeed(name: String, a: Article)
   assert name in allNews
```




### aiAssistant[GPT]


<br>


#### Purpose
A tool to help users assess their assumptions with the current news and help inform their trading decisions referencing current news about the market.


#### Principle
After some text $q$ containing a question or comment about a company or portfolio is used to prompt the AI Assistant $A$, the AI Assistant would use recent market trends and its training data to output some text $t$ to assess the validity of the users' comment, answer any questions, or correct any false assumptions that might have been made in the original message.


#### State
```TypeScript
userQueries: set String
aiResponses: set String
```


#### Actions
```Python
getFeedback(q: String, out a: String)
   a = GPT.query(q)
   userQueries += q
   aiResponses += a
```








### Search[T]


<br>


#### Purpose
To simplify the process of finding an item of interest


#### Principle
After querying a string $s$, all items in the database matching that string will be viewable as a collection of items $t$.


#### State
```TypeScript
userQueries: one String -> one String
itemsByQuery: one String -> set T
```


#### Actions
```Python
search(q: String, u: String out items: set T)
   if q in itemsByQuery:
       items = itemsByQuery(q)
   else:
       items = T.readMany(q)
   itemsByQuery -= userQueries(u)
   userQueries(u) = q
   itemsByQuery(q) = items
```








## Dependency Diagram




## Syncs





# Wireframe

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F1JhcQh5sMFEy0u13iuNhLE%2FSharefolio%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DRgBtmmdJVvebVpCn-1" allowfullscreen></iframe>
# Heuristic Evaluation

## Usability Criteria

### Learnability

* Many of the icons are standard icons used in most other applications
* This includes a gear to represent the settings tab
* Those that are not standard show very small samples of what the icon is supposed to represent
* The portfolio icon shows a graph of increasing and decreasing value, one of the most important parts of a portfolio
* The trade icon shows two arrows in a square-shaped cycle, representing the movement of shares and money between two parties.

### Pleasantness

* The interface has a dark background base with yellow and pale yellow letters/icons
	* The dark background and bright letters/icons increase the readability, and the color combination engenders the idea of wealth

* The logo is simple and yet represents our app well, showing multiple stacks of coins to represent the wealth that can be achieved with good trading

## Physical Heuristics

### Fitt’s Law

* The nav bar is very wide and at the top, resulting in a large Fitt’s law score
	* This highlights the sections the user will likely use, as they are the main sections of our app

* The split areas in the news tab each have a large Fitt’s law score
	* Each individual story has a large clickable section with text, timestamps, and tags describing the story, so each story have a fairly large Fitt’s law score

### Gestalt Principles

* Each story in the news list has multiple pieces of information, each of with are close to each other within a story

	* Different story components, such as the text one story A and the text of story B, are farther apart to differentiate them

* When choosing a timespan to show the value of your portfolio in the portfolio view, the list of possible ranges are in a straight line right next to each other

	* This clearly shows a progression from shortest to longest range while keeping them related

## Linguistic Level

### Speak a User’s Language

* Every button in the navbar either uses a common icon or an icon that is closely related to what the button will show the user. There is also text directly underneath each button for even more clarification

* While the leaderboard is fairly straightforward in its presentation and can easily be understood, the user may not understand why one person is higher than another. The exact metrics used are only known to the developer, but this may not be necessary to show the user

### Consistency

* On every page, there is a small question mark button in the bottom right that when clicked, provides helpful information to the user about the use and purpose of the page and its components

* The navbar is the same on every page, containing the same text and icons in the same order
# Visual Study Design

<iframe src="https://docs.google.com/presentation/d/1joZYLiVZ-08b-tYZAH7Udc-LI7VLccgGYPj-nlyPNxk/embed?start=false&loop=false&delayms=5000" frameborder="0" width="100%" height="424" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

# Project Plan

## [Project Git Repository](https://github.com/HenryAsa/61040-project)

Our final project will be coded on [this GitHub repository](https://github.com/HenryAsa/61040-project).
