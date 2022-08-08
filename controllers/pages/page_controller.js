const yelpAPI = require("../../source/yelp_api");

const allListingsURI ="https://api.yelp.com/v3/businesses/search?term=noodles&location=Singapore&limit=20";
const yelpAPIBase = "https://api.yelp.com/v3/businesses";

const controller = {
    showHome: (req, res) => {
        res.locals.firstName = "hello"
        res.locals.lastName = "world"
        res.render("./pages/home.ejs");
    },

    showListings: async (req, res) => {
        const listOfFood = await yelpAPI(allListingsURI);
        const foodListings = listOfFood.businesses
        res.render("./pages/food.ejs", { foodListings, errorObject });
    },

    showIndividualListing: async (req, res) => {
        let errorObject = {}

        const listingID = req.params.listing_id;
        const listingCall = `${yelpAPIBase}/${listingID}`;

        //Individual Listing
        const listing = await yelpAPI(listingCall);
        const listingLocation = listing.location;
        const listingId = listing.id;

        //Individual Listing Reviews. Max of 3 reviews. Yelp API limitation. 
        const listingReviews = await yelpAPI(`${listingCall}/reviews`)
        const allListingReviews = listingReviews.reviews


        res.render("./pages/listing.ejs", {
          listing,
          listingID,
          listingLocation,
          allListingReviews,
          errorObject
        });
    },
};

module.exports = controller;
