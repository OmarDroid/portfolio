/**
 * API route to proxy requests to the RSS2JSON service
 * This centralizes the API call and adds caching for better performance
 */

export async function GET() {
  try {
    // Fetch data from RSS2JSON
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@omaroid",
      { next: { revalidate: 3600 } } // Cache for 1 hour (3600 seconds)
    );
    
    if (!response.ok) {
      return Response.json({ error: "Failed to fetch blog posts" }, { status: response.status });
    }
    
    const data = await response.json();
    
    // Return the data
    return Response.json(data);
  } catch (error) {
    console.error("Error in blog API route:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}