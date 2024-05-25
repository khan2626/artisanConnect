const Review = require('../models/review');


async function createReview(review) {

    //Create and save a new review.
    const newReview = new Review(review);
    await newReview.save();
    onsole.log('Review created successfully:', newReview);
}

module.exports = { createReview };