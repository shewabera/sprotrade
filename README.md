
## HOW TO RUN THE APP

- clone/download the repo
- inside the backend directory run docker-compose up
- apis should be available at localhost:8080

## End points

 - insert bets and findout max profit (POST)
 - -  hit the api http://localhost:8080/api/bets/CalculateMaximumProfit
 - -  use request body of the form 
```
{
"bets" : [52,50,53,46,51,53,48,45]
}
// you can use any numbers (number only) in the array, if array contains non number api results in error
```
- fetch all bets 
- - hit the api http://localhost:8080/api/bets?sortBy=maxProfit&sortOrder=desc
- - you can use 'maxProfit', 'inserted on', or input for sortBy
- - you can use asc or desc for sortOrder







