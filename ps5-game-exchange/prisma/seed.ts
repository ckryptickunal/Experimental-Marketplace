import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const gameData = [
  {
    title: "Spider-Man: Miles Morales",
    description: "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man. Includes all DLC content. Game disc is in perfect condition, case and manual included.",
    price: 29.99,
    condition: "LIKE_NEW" as const,
  },
  {
    title: "Demon's Souls",
    description: "From PlayStation Studios and Bluepoint Games comes a remake of the PlayStation classic. Entirely rebuilt from the ground up, this remake invites you to experience the unsettling story and ruthless combat.",
    price: 34.99,
    condition: "VERY_GOOD" as const,
  },
  {
    title: "Horizon Forbidden West",
    description: "Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier that conceals mysterious new threats. Explore distant lands, fight bigger and more awe-inspiring machines.",
    price: 39.99,
    condition: "NEW" as const,
  },
  {
    title: "God of War Ragnarök",
    description: "Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go. Witness the changing dynamic of their relationship as they prepare for war.",
    price: 44.99,
    condition: "LIKE_NEW" as const,
  },
  {
    title: "Ratchet & Clank: Rift Apart",
    description: "Blast your way through an interdimensional adventure with Ratchet and Clank. Jump between action-packed worlds and beyond at hyper-speed with the game's near-instant loading.",
    price: 32.99,
    condition: "VERY_GOOD" as const,
  },
  {
    title: "Gran Turismo 7",
    description: "Gran Turismo 7 brings together the very best features of the Real Driving Simulator. With the reintroduction of the legendary GT Simulation Mode, buy, tune, race and sell your way.",
    price: 35.99,
    condition: "GOOD" as const,
  },
  {
    title: "Ghost of Tsushima Director's Cut",
    description: "In the late 13th century, the Mongol empire has laid waste to entire nations. Tsushima Island is all that stands between mainland Japan and a massive invasion fleet. Includes Iki Island expansion.",
    price: 41.99,
    condition: "LIKE_NEW" as const,
  },
  {
    title: "The Last of Us Part II",
    description: "Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming. Experience the award-winning story remastered for PS5.",
    price: 28.99,
    condition: "VERY_GOOD" as const,
  },
  {
    title: "Returnal",
    description: "Break the cycle of chaos on an always-changing alien planet. After crash-landing, Selene must search through the barren landscape for her escape. Defeated, she's forced to restart her journey.",
    price: 31.99,
    condition: "GOOD" as const,
  },
  {
    title: "Final Fantasy XVI",
    description: "An epic dark fantasy world where the fate of the land is decided by the mighty Eikons and the Dominants who wield them. Experience the tale of Clive Rosfield in stunning detail.",
    price: 49.99,
    condition: "NEW" as const,
  },
  {
    title: "Marvel's Spider-Man 2",
    description: "Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask as they fight to save the city from Venom and the symbiote threat.",
    price: 54.99,
    condition: "LIKE_NEW" as const,
  },
  {
    title: "Hogwarts Legacy",
    description: "Experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret. Explore Hogwarts, Hogsmeade, the Forbidden Forest, and the surrounding Overland area.",
    price: 38.99,
    condition: "VERY_GOOD" as const,
  }
]

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.notification.deleteMany()
  await prisma.review.deleteMany()
  await prisma.message.deleteMany()
  await prisma.order.deleteMany()
  await prisma.listing.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Cleared existing data')

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@ps5exchange.com',
        password: hashedPassword,
        name: 'Admin User',
        isAdmin: true,
        isVerified: true,
        bio: 'Platform administrator',
      },
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        password: hashedPassword,
        name: 'John Gamer',
        isVerified: true,
        bio: 'Passionate gamer and collector. Always looking for rare titles!',
      },
    }),
    prisma.user.create({
      data: {
        email: 'sarah@example.com',
        password: hashedPassword,
        name: 'Sarah Player',
        isVerified: true,
        bio: 'Love RPGs and adventure games. Happy to trade!',
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike@example.com',
        password: hashedPassword,
        name: 'Mike Collector',
        bio: 'Building my PS5 collection one game at a time.',
      },
    }),
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create listings
  const listings = []
  for (let i = 0; i < gameData.length; i++) {
    const game = gameData[i]
    const seller = users[Math.floor(Math.random() * (users.length - 1)) + 1] // Random non-admin user
    
    const listing = await prisma.listing.create({
      data: {
        ...game,
        sellerId: seller.id,
        views: Math.floor(Math.random() * 500),
        images: [], // In production, these would be actual image URLs
      },
    })
    listings.push(listing)
  }

  console.log(`✅ Created ${listings.length} listings`)

  // Create some sample reviews
  const reviews = []
  for (let i = 0; i < 5; i++) {
    const listing = listings[i]
    const reviewer = users.find(u => u.id !== listing.sellerId)
    
    if (reviewer) {
      const review = await prisma.review.create({
        data: {
          rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
          comment: [
            "Great condition, exactly as described!",
            "Fast shipping and excellent communication.",
            "Perfect transaction, highly recommended seller!",
            "Game works perfectly, very happy with purchase.",
            "Amazing deal, will buy from again!"
          ][i],
          userId: reviewer.id,
          listingId: listing.id,
        },
      })
      reviews.push(review)
    }
  }

  console.log(`✅ Created ${reviews.length} reviews`)

  // Create sample messages
  const messages = []
  const message1 = await prisma.message.create({
    data: {
      content: "Is this game still available?",
      senderId: users[1].id,
      receiverId: users[2].id,
    },
  })
  messages.push(message1)

  const message2 = await prisma.message.create({
    data: {
      content: "Yes, it's still available! Would you like to purchase it?",
      senderId: users[2].id,
      receiverId: users[1].id,
      read: true,
    },
  })
  messages.push(message2)

  console.log(`✅ Created ${messages.length} messages`)

  // Create sample notifications
  const notifications = []
  for (const user of users.slice(1)) {
    const notification = await prisma.notification.create({
      data: {
        type: 'MESSAGE_RECEIVED',
        title: 'Welcome to PS5 Game Exchange!',
        message: 'Thanks for joining our community. Start browsing games or list your own!',
        userId: user.id,
      },
    })
    notifications.push(notification)
  }

  console.log(`✅ Created ${notifications.length} notifications`)

  console.log('✨ Seed completed successfully!')
  console.log('\n📝 Test Accounts:')
  console.log('Admin: admin@ps5exchange.com / password123')
  console.log('User: john@example.com / password123')
  console.log('User: sarah@example.com / password123')
  console.log('User: mike@example.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })