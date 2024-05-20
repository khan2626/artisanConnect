const Artisan = require('../models/artisan');


async function createArtisan(artisan) {
    
    //Create and save a new artisan
    const newArtisan = new Artisan(artisan);
    await newArtisan.save();
    console.log('Artisan created successfully:', newArtisan);
}

module.exports = { createArtisan };
