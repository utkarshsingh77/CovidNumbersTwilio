# COVID Numbers Twilio

## To use this application, simply text anything to 720-706-7515 to get started.

### About:
While working on my separate COVID19 Contact Tracing app, I decided to incorporate one of the features in the app with Twilio's programmable messaging platform to allow users to get data about the spread of COVID-19 in their area by simply texting their zip code to the bot. 

#### Flow chart of the text message cycle and responses
Following the trigger from the user, the bot sends back a welcome message asking for the user to reply with their zip code. Then, the bot confirms that this zip code is valid using RegEx. If it is valid, it sends the zip code to a getDataByZipcode function described below which interacts with an external COVID-19 data API and calculates the new number of positive cases and COVID related deaths in that zip code in the past week and sends the user that data. If the user did not send a valid zip code, then the bot tells the user to try again with a valid zip code and handles the valid zip code properly as described above.

#### Function to receive data 

I have uploaded this function's code to the getDataByZipcode file in this repository. This function gets the zip code from the user's submission and then sends a GET request to an external API (http://localcoviddata.com) with the zipcode and the amount of days to query as parameters. This API returns results by county within a zipcode so my function iterates over each of these counties and sums both their death and positive case count currently and a week ago. It finds the difference between these values to provide the user with how many new positive cases and how many new deaths have occurred within the last week.
