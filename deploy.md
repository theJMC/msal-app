# MSAL App Deployment

## The React Web App: 

Firstly, make sure to populate the [env file](/v3/.env.example) with the Entra Application ClientID, and rename it to `/v3/.env` 

To build the React app, clone the repo, and in the `/v3` folder run `npm run build` to build the app.

Serve the built app via your preferred method (i.e. Apache, Nginx, etc) 

## The Azure Static Web Apps Way:
There is a workflow file in the repository already that should be all setup and ready to go, you just need to add the:
- `AZURE_CLIENT_ID` - The client ID of the Managed Identity
- `AZURE_TENANT_ID` - the tenant ID of the Managed Identity
- `AZURE_SUBSCRIPTION_ID` - The Subscription ID of the Managed Identity
- `AZURE_STATIC_WEB_APPS_API_TOKEN_WHITE_OCEAN_007A25503` - Update this to be your static web apps api token. 
into the GitHub Secrets section for your fork of this repo.

The Managed Idenity control access to an Azure KeyVault, which contains the secret `AI-CLIENTID` which is the client ID for the Application in EntraID (aka Azure Active Directory). Please ensure this Managed Identity has access to the secret, and the secret is setup before deploying the web app!


If there are any issues with this deployment, feel free to raise an issue and I can try to help!
