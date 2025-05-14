import { User, Post, Category, Comment } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'Travel', slug: 'travel' },
  { id: '3', name: 'Food', slug: 'food' },
  { id: '4', name: 'Lifestyle', slug: 'lifestyle' },
  { id: '5', name: 'Business', slug: 'business' },
  { id: '6', name: 'Health', slug: 'health' },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    bio: 'Tech enthusiast and avid blogger with a passion for exploring cutting-edge technologies.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2023-05-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'James Rodriguez',
    email: 'james@example.com',
    bio: 'Travel writer and photographer capturing moments from around the world.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2023-06-20T14:45:00Z',
  },
  {
    id: '3',
    name: 'Sophia Chen',
    email: 'sophia@example.com',
    bio: 'Food blogger passionate about culinary experiences and sharing recipes.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinedAt: '2023-04-10T09:15:00Z',
  },
];

export const comments: Comment[] = [
  {
    id: '1',
    content: 'This is such an insightful article! Thanks for sharing your knowledge.',
    publishedAt: '2023-08-15T16:30:00Z',
    author: users[1],
  },
  {
    id: '2',
    content: 'I\'ve been looking for information on this topic. Your post is exactly what I needed.',
    publishedAt: '2023-08-16T10:15:00Z',
    author: users[2],
  },
  {
    id: '3',
    content: 'Great perspective! Have you considered exploring the impact of this technology on smaller businesses?',
    publishedAt: '2023-08-16T14:45:00Z',
    author: users[0],
  },
];

export const posts: Post[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in Modern Society',
    excerpt: 'Explore how AI is reshaping our world and what the future holds for this rapidly evolving technology.',
    content: `Artificial Intelligence (AI) is no longer a concept of the future; it's very much a part of our present. From voice assistants like Siri and Alexa to recommendation algorithms on Netflix and Spotify, AI has seamlessly integrated into our daily lives.

The capabilities of AI have grown exponentially in recent years. Machine learning algorithms can now analyze vast amounts of data to identify patterns and make predictions with remarkable accuracy. Natural language processing has advanced to the point where AI can understand and generate human-like text, translate languages in real-time, and even write poetry or code.

The Impact on Industries

AI is transforming industries across the board. In healthcare, AI algorithms can diagnose diseases from medical images with accuracy rivaling that of human doctors. In finance, AI-powered systems detect fraudulent transactions and optimize investment portfolios. Manufacturing companies use AI to predict equipment failures before they happen, reducing downtime and maintenance costs.

The transportation industry is perhaps experiencing one of the most visible AI-driven transformations with the development of autonomous vehicles. Companies like Tesla, Waymo, and Cruise are pushing the boundaries of what's possible with self-driving technology, promising a future where car accidents due to human error are a thing of the past.

Ethical Considerations

As AI becomes more advanced and ubiquitous, important ethical questions arise. Who is responsible when an AI system makes a mistake? How do we ensure AI doesn't perpetuate or amplify existing biases? What rights should intelligent systems have? These questions don't have easy answers, but they're critical to address as AI continues to evolve.

Privacy concerns also loom large in the AI discussion. Many AI systems require vast amounts of data to function effectively, raising questions about data collection, consent, and security. Striking the right balance between leveraging data for AI advancement and protecting individual privacy remains a significant challenge.

The Future Outlook

Looking ahead, the potential of AI seems boundless. We're moving toward a future where AI could help solve some of humanity's most pressing problems, from climate change to disease. AI might help us develop new materials, design more efficient renewable energy systems, or discover life-saving drugs.

However, this future also comes with uncertainties. Will AI lead to widespread job displacement? How will our relationship with technology change as AI becomes more advanced? Will we create artificial general intelligence that matches or exceeds human capabilities across all domains?

One thing is certain: AI will continue to be a powerful force shaping our society. How we harness and direct that force will determine whether the future it creates is one we want to live in. As we stand at this technological crossroads, thoughtful discussion and informed decision-making about AI have never been more important.`,
    coverImage: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-08-15T12:00:00Z',
    updatedAt: '2023-08-15T12:00:00Z',
    author: users[0],
    likes: 42,
    comments: [comments[0], comments[1]],
    categories: [categories[0]],
    tags: ['AI', 'Technology', 'Future'],
    isLikedByUser: false,
  },
  {
    id: '2',
    title: 'Exploring the Hidden Gems of Southeast Asia',
    excerpt: 'Discover breathtaking destinations off the beaten path in Southeast Asia that most tourists miss.',
    content: `Southeast Asia has long been a favorite destination for travelers seeking rich cultural experiences, stunning landscapes, and unforgettable adventures. While places like Bangkok, Bali, and Singapore attract millions of visitors each year, the region is home to countless hidden gems that offer equally amazing experiences without the crowds.

Cambodia Beyond Angkor Wat

When most people think of Cambodia, Angkor Wat immediately comes to mind. While this ancient temple complex certainly deserves its fame, Cambodia has much more to offer. The sleepy riverside town of Kampot, with its French colonial architecture and proximity to Bokor National Park, provides a perfect blend of relaxation and adventure. Nearby, the coastal town of Kep offers fresh seafood and pristine beaches without the development seen in other Southeast Asian beach destinations.

For a truly unique experience, consider visiting the floating villages of Tonle Sap Lake. These communities, where houses, schools, and shops all float on the water, offer a fascinating glimpse into a way of life adapted to the lake's dramatic seasonal changes.

Laos: The Land of a Million Elephants

Landlocked Laos remains one of Southeast Asia's most unspoiled destinations. The ancient royal capital of Luang Prabang, with its golden temples and morning alms-giving ceremony, offers a serene atmosphere rarely found in modern cities. Further south, the 4000 Islands (Si Phan Don) region of the Mekong River creates a laid-back paradise perfect for hammock-lounging and dolphin-watching.

For the adventurous, the Thakhek Loop motorcycle journey takes you through limestone karst landscapes, past blue lagoons, and into some of the largest cave systems in the world. The mysterious Plain of Jars in northeastern Laos presents an archaeological enigma that still puzzles experts today.

Myanmar's Untouched Beauty

Myanmar (Burma) has only recently opened to widespread tourism, meaning many of its treasures remain relatively undiscovered. While Bagan and Inle Lake have gained popularity, places like the ancient kingdoms of Mrauk U offer temple experiences to rival Bagan without the crowds. The Mergui Archipelago in the south consists of over 800 islands, most completely uninhabited, with pristine coral reefs and beaches accessed by only a handful of tour operators.

Hpa-An in eastern Myanmar captivates visitors with its karst mountains, sacred caves filled with thousands of Buddha images, and the picturesque Mount Zwegabin. The genuine warmth of the people in these less-visited areas adds another dimension to the travel experience.

The Ethical Traveler

As these hidden destinations become more accessible, responsible tourism becomes increasingly important. Supporting locally-owned businesses, respecting cultural norms and traditions, and minimizing environmental impact should be priorities for anyone venturing off the beaten path.

These lesser-known destinations often have fewer resources to manage tourism impacts, making responsible travel practices even more crucial. By treading lightly and spending money in ways that benefit local communities, we can help ensure these hidden gems remain special for generations to come.

Southeast Asia's true magic often lies in its less-visited corners. By venturing beyond the well-worn tourist trail, travelers can discover authentic experiences, connect with local cultures, and create memories that few others share. In a world where overtourism threatens many popular destinations, these hidden gems offer both respite and revelation for the curious traveler.`,
    coverImage: 'https://images.pexels.com/photos/5368622/pexels-photo-5368622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-08-10T09:30:00Z',
    updatedAt: '2023-08-11T14:15:00Z',
    author: users[1],
    likes: 67,
    comments: [comments[2]],
    categories: [categories[1]],
    tags: ['Travel', 'Southeast Asia', 'Adventure'],
    isLikedByUser: true,
  },
  {
    id: '3',
    title: 'The Art of Sustainable Cooking: Farm to Table Recipes',
    excerpt: 'Learn how to create delicious meals while reducing your environmental footprint with these sustainable cooking practices.',
    content: `In an era of increasing environmental awareness, the concept of sustainable cooking has moved from niche food philosophy to mainstream culinary practice. At its heart, sustainable cooking is about making food choices that are healthier for both people and the planet. It emphasizes seasonal, locally-sourced ingredients, minimizes waste, and celebrates the connection between the food on our plates and the land it comes from.

Starting with Sourcing

The journey to sustainable cooking begins long before you turn on the stove. It starts with how and where you source your ingredients. Farmers' markets offer a direct connection to local growers, allowing you to purchase seasonal produce that hasn't traveled thousands of miles to reach you. This not only reduces carbon emissions associated with food transportation but also supports the local economy and typically delivers fresher, more nutritious food.

Community Supported Agriculture (CSA) programs offer another excellent option, providing regular deliveries of seasonal produce directly from farms to consumers. These programs create a mutually beneficial relationship: farmers receive financial security, and consumers get ultra-fresh food with the added benefit of reconnecting with the cycles of nature through the changing seasonal offerings.

The Whole Ingredient Approach

Sustainable cooking embraces a "nose-to-tail" or "root-to-stem" philosophy that aims to use every part of an ingredient. Vegetable scraps that might typically end up in the trash can transform into flavorful stocks. Carrot tops become vibrant pestos, and stale bread turns into crispy croutons or thickening agents for soups.

This approach not only reduces food waste—a significant contributor to greenhouse gas emissions when it decomposes in landfills—but also maximizes the nutritional benefits and flavors of your ingredients while stretching your food budget further.

Seasonal Recipes: Summer Bounty

One of the joys of sustainable cooking is adapting your meals to celebrate what's currently thriving in your region. During summer months, when tomatoes reach their peak flavor, a simple Heirloom Tomato Galette showcases their natural sweetness. Combine sliced tomatoes with herbs from your garden or windowsill, layer them on a whole grain crust made with local butter, and add dollops of goat cheese from a nearby farm for a meal that tells the story of your local foodshed.

For a refreshing side dish, Cucumber and Watermelon Salad with Mint combines cooling summer fruits with a light dressing of local honey, lime juice, and a pinch of sea salt. The contrast of sweet and savory makes this a perfect accompaniment to grilled dishes or a standalone light lunch.

Autumn Harvest Creations

As summer transitions to fall, hearty squashes, root vegetables, and orchard fruits take center stage. A Roasted Butternut Squash and Apple Soup captures this season perfectly. Roasting the vegetables before blending intensifies their flavors while requiring less added fat. Top with toasted pumpkin seeds (saved from your Halloween pumpkin) for added texture and nutritional benefits.

For a main course, try a Wild Mushroom and Barley Risotto featuring foraged mushrooms or varieties from local specialty growers. Barley offers a sustainable alternative to traditional Arborio rice, requiring less water to grow and providing more fiber. Finish with a drizzle of herb oil made from any herbs that might be fading in your garden before winter.

Preserving the Seasons

Sustainable cooking extends beyond immediate meal preparation to preservation techniques that allow you to enjoy local abundance throughout the year. Simple water-bath canning transforms summer berries into preserves that brighten winter mornings. Lacto-fermentation—one of humanity's oldest food preservation methods—converts cabbage into sauerkraut and cucumbers into pickles, while simultaneously creating probiotic-rich foods that support gut health.

Freezing prepared dishes like pestos, soups, and stews provides convenient future meals while reducing the temptation of less sustainable convenience foods during busy times.

The Community Connection

Perhaps the most overlooked aspect of sustainable cooking is its potential to strengthen community bonds. Cooking and sharing food has brought humans together since the discovery of fire. Modern expressions of this might include starting a neighborhood produce exchange, organizing community meals featuring local foods, or teaching cooking skills to younger generations.

These activities not only spread sustainable practices but also build resilience in local food systems and create networks of support and knowledge sharing.

Sustainable cooking isn't about perfection or deprivation—it's about making thoughtful choices that align your kitchen with your values. By focusing on whole, seasonal, locally-sourced foods, minimizing waste, and sharing your table with others, you participate in a delicious revolution that nourishes both body and planet.`,
    coverImage: 'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-08-05T15:45:00Z',
    updatedAt: '2023-08-05T15:45:00Z',
    author: users[2],
    likes: 53,
    comments: [],
    categories: [categories[2]],
    tags: ['Food', 'Sustainability', 'Cooking', 'Recipes'],
    isLikedByUser: false,
  },
  {
    id: '4',
    title: 'Building a Minimalist Lifestyle: Less Stuff, More Joy',
    excerpt: 'Discover the benefits of minimalism and practical strategies for decluttering your space and mind.',
    content: `In a world constantly telling us to buy more, have more, and be more, minimalism offers a refreshing counter-narrative: perhaps the path to happiness involves less rather than more. Minimalism isn't about deprivation or living with nothing—it's about being intentional with what you allow into your life and removing what doesn't add value.

The Psychology of Stuff

Our relationship with material possessions is complex and deeply emotional. Objects can carry memories, represent aspirations, or provide a sense of security. However, psychological research increasingly suggests that beyond meeting our basic needs, accumulating more possessions has diminishing returns for happiness. In fact, excess clutter has been linked to increased stress, decreased focus, and even disrupted sleep patterns.

The minimalist perspective invites us to examine why we own what we own. Are we keeping things out of habit, obligation, or fear? Or do these items genuinely enhance our daily experience? By questioning the automatic accumulation that modern consumerism encourages, we create space to define what "enough" means for ourselves.

Starting the Minimalist Journey

Embracing minimalism doesn't require emptying your house in one weekend. It's a gradual process of becoming more conscious about what you own and what you choose to acquire. Many find success with an incremental approach, starting with a single category of items or one room.

The KonMari method popularized by Marie Kondo suggests asking whether each item "sparks joy." Project 333 challenges participants to dress with just 33 items for three months. The 90/90 rule asks whether you've used an item in the past 90 days or will use it in the next 90. There's no single "right" method—the best approach is one that feels sustainable for your lifestyle.

Digital Minimalism

Minimalism extends beyond physical possessions to our digital lives as well. Notification overload, endless social media feeds, and the pressure to stay constantly connected can leave us feeling scattered and drained. Digital minimalism applies the same principles of intentionality to our technology use.

Practical steps might include removing social media apps from your phone, turning off non-essential notifications, unsubscribing from email lists that don't add value, and establishing technology-free times or zones in your home. Many digital minimalists report improved concentration, better in-person relationships, and a renewed ability to enjoy moments without the compulsion to document them online.

Creating a Minimalist Home

A minimalist home isn't defined by a particular aesthetic—it doesn't need to be all white walls and sparse furniture (though it can be if that's what you prefer). Rather, a minimalist home is one where every item serves a purpose, whether functional or bringing genuine beauty and joy.

Start by clearing horizontal surfaces, which naturally attract clutter. Establish "homes" for items that tend to float around the house. Incorporate storage that keeps necessities accessible but out of sight. Consider the traffic flow and how spaces are used, removing furniture that obstructs movement or serves no clear purpose.

When acquiring new items for your home, implement a "one in, one out" rule, and favor quality over quantity. A well-made item that lasts for years ultimately creates less waste and often provides more satisfaction than cheaper alternatives that need frequent replacement.

Minimalism Beyond Stuff

As many discover on their minimalist journey, the principles extend far beyond physical decluttering. Applying minimalist thinking to your schedule means ruthlessly eliminating commitments that don't align with your priorities. It means learning to say no to good opportunities to leave room for great ones.

Financial minimalism focuses on eliminating unnecessary expenses and debt, potentially opening pathways to working less, saving more, or pursuing more meaningful work. Relationship minimalism involves investing deeply in connections that nurture you while creating healthy boundaries with those that drain your energy.

The Environmental Impact

While minimalism is often pursued for personal benefits, its environmental impact can be substantial. Every item we own represents resources extracted, energy used in production and shipping, and eventual waste when the item is discarded. By buying less and choosing well, minimalists naturally reduce their ecological footprint.

This aspect of minimalism connects individual choices to larger systems of production and consumption. Many minimalists find themselves becoming more conscious consumers, considering factors like ethical manufacturing, repairability, and end-of-life disposal when making purchases.

Maintaining Minimalism

Like any lifestyle change, minimalism requires maintenance. Our culture's default setting is acquisition, constantly bombarding us with messages about what we "need." Staying mindful of these influences helps in maintaining your minimalist practices.

Regular decluttering sessions, mindful consumption habits, and connecting with like-minded individuals can help sustain your minimalist journey. Many find that as the benefits of minimalism become apparent—more time, less stress, financial flexibility, environmental alignment—the motivation to continue grows stronger.

Minimalism isn't about achieving some perfect state of ownership or following strict rules. It's about creating space—physical, mental, and emotional—for what truly matters to you. In a culture of more, choosing less can be a radical act of self-determination, allowing you to design a life around your values rather than external expectations.`,
    coverImage: 'https://images.pexels.com/photos/6048199/pexels-photo-6048199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-08-01T11:20:00Z',
    updatedAt: '2023-08-02T09:10:00Z',
    author: users[0],
    likes: 89,
    comments: [],
    categories: [categories[3]],
    tags: ['Lifestyle', 'Minimalism', 'Wellness'],
    isLikedByUser: true,
  },
];