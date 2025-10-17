// GitHub OAuth proxy for Decap CMS
// Exchanges GitHub OAuth code for access token
// Required environment variables: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
// Optional: GITHUB_ALLOWED_ORGS (restrict access to specific GitHub organization)

export async function handler(event) {
  const { path, httpMethod, queryStringParameters } = event;

  try {
    // Validate required environment variables
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
      console.error("Missing required environment variables: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET");
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "Server configuration error" })
      };
    }

    // Handle OAuth callback from GitHub
    if (path.endsWith("/callback")) {
      const code = queryStringParameters?.code;
      if (!code) {
        return { 
          statusCode: 400, 
          body: JSON.stringify({ error: "Missing authorization code" })
        };
      }

      // Exchange code for access token
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      if (!tokenResponse.ok) {
        console.error(`GitHub token exchange failed: ${tokenResponse.status}`);
        return { 
          statusCode: 502, 
          body: JSON.stringify({ error: "Failed to authenticate with GitHub" })
        };
      }

      const data = await tokenResponse.json();
      
      if (data.error) {
        console.error("GitHub OAuth error:", data.error);
        return { 
          statusCode: 401, 
          body: JSON.stringify({ error: data.error_description || data.error })
        };
      }

      if (!data.access_token) {
        console.error("No access token received from GitHub");
        return { 
          statusCode: 401, 
          body: JSON.stringify({ error: "Authentication failed" })
        };
      }

      // Optional: Verify organization membership
      if (process.env.GITHUB_ALLOWED_ORGS) {
        const org = process.env.GITHUB_ALLOWED_ORGS;
        const membershipResponse = await fetch(
          `https://api.github.com/user/memberships/orgs/${org}`, 
          {
            headers: { 
              Authorization: `token ${data.access_token}`, 
              "User-Agent": "decap-cms-oauth",
              "Accept": "application/vnd.github.v3+json"
            },
          }
        );

        if (membershipResponse.status === 404 || membershipResponse.status === 403) {
          console.warn(`User not in allowed organization: ${org}`);
          return { 
            statusCode: 403, 
            body: JSON.stringify({ error: `Access restricted to ${org} organization members` })
          };
        }

        if (!membershipResponse.ok) {
          console.error(`Failed to verify org membership: ${membershipResponse.status}`);
          // Continue anyway - don't block if org check fails
        }
      }

      // Return the access token to Decap CMS
      return { 
        statusCode: 200, 
        body: JSON.stringify({ token: data.access_token })
      };
    }

    // Health check / OAuth flow start
    if (httpMethod === "GET") {
      return { 
        statusCode: 200, 
        body: JSON.stringify({ status: "ready" })
      };
    }

    // Method not allowed
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method not allowed" })
    };

  } catch (error) {
    console.error("Unexpected error in auth function:", error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
}
  