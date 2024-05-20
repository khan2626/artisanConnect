const mongoose = require('mongoose');
const { createUser } = require('./services/userService');
const { createArtisan } = require('./services/artisanService');
const { createProject } = require('./services/projectService');
const { createReview } = require('./services/reviewService');
const { connecDB } = require('./utils/db');

async function main() {
  // Create a user
  const user = {
    username: 'artisan123',
    password: 'hashedpassword',
    email: 'artisan@example.com',
    role: 'artisan',
    profile: {
      name: 'John Doe',
      bio: 'Experienced carpenter',
      location: 'New York',
      contactInfo: 'john@example.com',
      profilePictureUrl: 'http://example.com/john.jpg'
    }
  };
  await createUser(user);

  // Create an artisan
  const artisan = {
    userId: user._id, // Reference to the user ID
    skills: ['carpentry', 'woodworking'],
    portfolio: [
      {
        title: 'Wooden Chair',
        description: 'A beautifully crafted wooden chair',
        imageUrls: ['http://example.com/chair.jpg']
      }
    ],
    ratings: {
      averageRating: 0,
      reviewCount: 0
    },
    availability: 'full-time'
  };
  await createArtisan(artisan);

  // Create a project
  const project = {
    customerId: user._id,
    title: 'Build a table',
    description: 'Looking for an artisan to build a custom wooden table',
    category: 'Furniture',
    budget: 300,
    location: 'New York'
  };
  await createProject(project);

  // Create a review
  const review = {
    projectId: project._id,
    customerId: user._id,
    artisanId: artisan._id,
    rating: 5,
    comment: 'Great work!'
  };
  await createReview(review);
}

main().catch(console.error);
