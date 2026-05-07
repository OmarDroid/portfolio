// Curated list of Medium posts. Auto-managed by scripts/sync-medium.mjs.
//
// You can edit entries here freely — the script preserves your manual changes
// when it merges new posts in. Re-run `node scripts/sync-medium.mjs` whenever
// you publish a new article to append it to the top.
//
// Schema per entry:
//   { title, link, contentSnippet, image?, pubDate (YYYY-MM-DD) }

const blogPosts = [
  {
    "title": "From A to O(n): Advanced &amp; Specialized Trees — Heaps and Tries",
    "link": "https://omaroid.medium.com/from-a-to-o-n-advanced-specialized-trees-heaps-and-tries-d67aa47feb54",
    "contentSnippet": "From A to O(n): Advanced & Specialized Trees — Heaps and Tries Meet the specialists — learn how Heaps manage priority with O(1) access and how Tries enable lightning-fast autocomplete and prefix searches. Welcome back!…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*BquxDjlVFRVx4a43zwLDZQ.png",
    "pubDate": "2026-04-30"
  },
  {
    "title": "From A to O(n): Thinking in Hierarchies — Trees and Search",
    "link": "https://omaroid.medium.com/from-a-to-o-n-thinking-in-hierarchies-trees-and-search-99838830f6dd",
    "contentSnippet": "From A to O(n): Thinking in Hierarchies — Trees and Search Move beyond linear data and explore the world of nodes and branches with Binary Trees, BSTs, and the essential DFS & BFS traversal patterns. Welcome back to the…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*BXfjVyVN3yWTjORnUvd-AA.png",
    "pubDate": "2026-01-27"
  },
  {
    "title": "From A to O(n): The Power of Hashing — HashMaps and HashSets",
    "link": "https://omaroid.medium.com/from-a-to-o-n-the-power-of-hashing-hashmaps-and-hashsets-98b626ad7396",
    "contentSnippet": "From A to O(n): The Power of Hashing — HashMaps and HashSets Uncover the magic behind O(1) lookups and learn how the Frequency Counting pattern can solve complex problems with stunningly simple code. Welcome back to the…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*1_bREivw2kb6kbjyCXRz4A.png",
    "pubDate": "2025-12-01"
  },
  {
    "title": "From A to O(n): Ordered Access — Stacks and Queues",
    "link": "https://omaroid.medium.com/from-a-to-o-n-ordered-access-stacks-and-queues-3de07c401d5a",
    "contentSnippet": "From A to O(n): Ordered Access — Stacks and Queues Master LIFO and FIFO principles, learn why ArrayDeque is Kotlin’s unsung hero, and unlock the power of the Monotonic Stack pattern. Welcome back! In Part 2 , we…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*9fPJPAri-fNArTdGuBdKsA.png",
    "pubDate": "2025-11-25"
  },
  {
    "title": "From A to O(n): Linear Data Structures — Arrays vs. Linked Lists",
    "link": "https://omaroid.medium.com/from-a-to-o-n-linear-data-structures-arrays-vs-linked-lists-c870835fce18",
    "contentSnippet": "From A to O(n): Linear Data Structures — Arrays vs. Linked Lists A head-to-head comparison of the two most fundamental data structures and an introduction to the Two Pointers and Sliding Window patterns. Welcome back to…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*ijin73djw-_mhcTQYPwcbg.png",
    "pubDate": "2025-11-13"
  },
  {
    "title": "From A to O(n): The Foundations of Algorithmic Thinking",
    "link": "https://omaroid.medium.com/from-a-to-o-n-the-foundations-of-algorithmic-thinking-372974d17c2a",
    "contentSnippet": "Learn the three pillars of writing efficient code — Big O, Data Structures, and Patterns. The first part of a complete guide to mastering algorithmic thinking in Kotlin. Welcome, fellow Kotlin developer! Anyone can…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*waFvbXbKaOmXB-ttXg8AJQ.png",
    "pubDate": "2025-10-29"
  },
  {
    "title": "Clean Android Architecture in 2025: SOLID Principles, Supercharged by Kotlin",
    "link": "https://omaroid.medium.com/clean-android-architecture-in-2025-solid-principles-supercharged-by-kotlin-9d63ecf1e429",
    "contentSnippet": "In the ever-evolving landscape of Android development, crafting clean, maintainable, and scalable applications isn’t just a technical goal — it’s a business imperative. While these practices align with Google’s official…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*Lc4SVOC12cG7AQIN7Ii7fA.png",
    "pubDate": "2025-09-17"
  },
  {
    "title": "From Android to API: A Guide to Building a Dockerized Ktor &amp; PostgreSQL Backend",
    "link": "https://omaroid.medium.com/from-android-to-api-a-guide-to-building-a-dockerized-ktor-postgresql-backend-2dcc6857e2a2",
    "contentSnippet": "A step-by-step journey applying Clean Architecture and professional testing to create a complete, containerized Kotlin REST API. As a longtime Android developer, I’ve always been fascinated by the backend but often saw…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*7i6LVooGJ2-fIt10DUS38g.png",
    "pubDate": "2025-08-21"
  },
  {
    "title": "The Kotlin Flow Operator Cheat Sheet",
    "link": "https://omaroid.medium.com/the-kotlin-flow-operator-cheat-sheet-01a4cf8978a2",
    "contentSnippet": "A practical guide to demystifying asynchronous streams for everyday development. Handling real-time user input, multiple network responses, and database updates can quickly tangle your code into a complex mess. This is…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*I8FEvvLvfJ5_b1-dHUx0ug.png",
    "pubDate": "2025-07-01"
  },
  {
    "title": "Kotlin Coroutine Cancellation: An Advanced Guide",
    "link": "https://omaroid.medium.com/kotlin-coroutine-cancellation-an-advanced-guide-867cb43b5a48",
    "contentSnippet": "Coroutines make Android development safer and more efficient — but only if you handle cancellation correctly. This guide covers everything from the basics to real-world scenarios and best practices for writing robust,…",
    "image": "https://cdn-images-1.medium.com/max/1024/1*bUV1p-_25QROKJGgfo3c4Q.png",
    "pubDate": "2025-05-07"
  }
];

export default blogPosts.slice().sort((a, b) => {
  const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
  const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
  return db - da;
});
