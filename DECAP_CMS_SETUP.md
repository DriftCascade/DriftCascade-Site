# Decap CMS GitHub OAuth Setup Guide

This guide explains how to set up GitHub OAuth authentication for your Decap CMS at cms.driftcascade.com/admin.

## Overview

Your site is configured to use **custom GitHub OAuth** instead of Netlify Identity. This allows users to authenticate with their GitHub accounts to access the CMS.

## Prerequisites

- A GitHub account with access to the `drift-cascade/website` repository
- Admin access to your Netlify site (`cms.driftcascade.com`)

---

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in the application details:
   ```
   Application name: Drift Cascade CMS
   Homepage URL: https://driftcascade.com
   Authorization callback URL: https://cms.driftcascade.com/.netlify/functions/auth/callback
   ```
4. Click **Register application**
5. **Save** the **Client ID** (you'll need this)
6. Click **Generate a new client secret**
7. **Save** the **Client Secret** immediately (you can't view it again)

---

## Step 2: Configure Netlify Environment Variables

1. Log in to [Netlify](https://app.netlify.com)
2. Go to your site's dashboard (cms.driftcascade.com)
3. Navigate to **Site settings** → **Environment variables**
4. Add the following variables:

   | Variable Name | Value | Description |
   |---------------|-------|-------------|
   | `GITHUB_CLIENT_ID` | *Your Client ID* | From GitHub OAuth App |
   | `GITHUB_CLIENT_SECRET` | *Your Client Secret* | From GitHub OAuth App |
   | `GITHUB_ALLOWED_ORGS` | `drift-cascade` | (Optional) Restrict access to org members |

5. Click **Save**

---

## Step 3: Deploy Your Changes

1. Commit and push your code changes:
   ```bash
   git add .
   git commit -m "Configure Decap CMS with GitHub OAuth"
   git push origin main
   ```

2. Netlify will automatically deploy your changes

3. Wait for the deployment to complete (check the Netlify dashboard)

---

## Step 4: Test the Setup

1. Navigate to: https://cms.driftcascade.com/admin
2. You should see a "Login with GitHub" button
3. Click it to authenticate
4. Authorize the OAuth app when prompted
5. You should be redirected back to the CMS dashboard

---

## Troubleshooting

### "Server configuration error"
- **Cause**: Missing environment variables in Netlify
- **Solution**: Double-check that `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set correctly

### "Access restricted to drift-cascade organization members"
- **Cause**: User is not a member of the drift-cascade organization
- **Solution**: Either add the user to the organization or remove `GITHUB_ALLOWED_ORGS` from environment variables

### "Failed to authenticate with GitHub"
- **Cause**: Invalid Client ID or Secret
- **Solution**: Regenerate credentials in GitHub and update Netlify environment variables

### Function not found (404)
- **Cause**: Functions directory not properly configured or deployed
- **Solution**: Check that `netlify.toml` has `directory = "site/functions"` and redeploy

### Callback URL mismatch
- **Cause**: OAuth app callback URL doesn't match
- **Solution**: Ensure GitHub OAuth app callback URL is exactly:
  `https://cms.driftcascade.com/.netlify/functions/auth/callback`

---

## Configuration Files Modified

The following files have been configured for GitHub OAuth:

1. **site/static/admin/config.yml**
   - Backend set to `github`
   - Repository: `drift-cascade/website`
   - Auth endpoint: `/.netlify/functions/auth`

2. **netlify.toml**
   - Functions directory: `site/functions`

3. **site/functions/auth/index.js**
   - Custom OAuth proxy function with error handling

---

## Security Notes

✅ **Credentials are secure**: Client ID and Secret are stored as Netlify environment variables, not in code

✅ **Repository access controlled**: Only users with GitHub access to `drift-cascade/website` can edit content

✅ **Optional org restriction**: Set `GITHUB_ALLOWED_ORGS` to limit access to organization members only

⚠️ **HTTPS required**: OAuth will not work over HTTP

---

## Additional Resources

- [Decap CMS GitHub Backend Documentation](https://decapcms.org/docs/github-backend/)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [GitHub OAuth Apps Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)

