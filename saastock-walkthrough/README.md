
# Beefree SDK Installation Walkthrough

## Who is this for?

This walkthrough is designed for anyone who wants to learn how to install and configure the Beefree SDK before attempting to integrate it into their own app. 

## Why follow this walkthrough?

Instead of giving you a pre-built demo, we’ve crafted this walkthrough to show you each step involved in the installation process. This gives you more insights into what you’ll need to do when you integrate Beefree SDK into your own project. By the end, you’ll have a solid grasp of the installation steps and be ready to build something custom on your own.

> **Note:** You’ll be following along with a simple app setup, similar to what you’ll do in your own project. This approach ensures you understand how each part fits together and gives you more control over your implementation.

---

## Installation Steps

### Step 1: Sign up for Beefree SDK
Head over to [Beefree.io](https://beefree.io) and sign up for access to the SDK. You’ll need to get your credentials from the Developer Console, which we’ll use in a later step.

---

### Step 2: Install the SDK
To install the Beefree SDK, you can run the following command in your React project’s root directory:

```bash
npm install @beefree.io/sdk
```

Alternatively, visit our official NPM page to copy the code directly: [Beefree SDK on NPM](https://www.npmjs.com/package/@beefree.io/sdk)

After installation, you can start the project to see your progress:

```bash
npm start
```

> **Why?** This installs the SDK package, which contains everything you need to embed the content creation tools in your app.

---

### Step 3: Add Your Credentials
Go to the Beefree Developer Console and retrieve your `clientId` and `clientSecret`. These credentials authenticate your app and allow it to interact securely with the SDK’s services.

Add them to your project’s `.env` file:

```
VITE_CLIENT_ID=string
VITE_CLIENT_SECRET=string
```

---

### Step 4: Import Environment Variables

Let’s import those environment variables into our main application file:

```js
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
```

> **Why?** This step sets up the necessary variables so that your app can securely connect to Beefree’s servers using your unique credentials.

---

### Step 5: Create Configuration Object

Now we’ll create a configuration object that stores the necessary settings for initializing the SDK.

```js
const configuration = {
  uid: 'my-user-folder',  // Change this to fit your project
  container: 'sdk-container',  // This is the div where the SDK will load
};
```

---

### Step 6: Initialize Beefree SDK
Let’s add an initialization function to start the SDK. This function handles the authentication and kicks off the SDK in your app.

```js
const initializeBeeFreeSDK = async () => {
  const sdk = new BeefreeSDK();
  await sdk.getToken(clientId, clientSecret);  // Authenticates your app
  sdk.start(configuration, {});  // Starts the SDK in the container
};
```

> **Why?** This function encapsulates the logic needed to authenticate and launch the SDK, ensuring it’s set up properly.

---

### Step 7: Run the Initialization on Page Load
In React, if you want to run code only once when the page loads, you can use the `useEffect` hook. This way, the SDK is initialized as soon as the app loads.

```js
useEffect(() => {
  initializeBeeFreeSDK();
}, []);
```

> **Why?** This ensures the SDK runs as soon as the page loads, making it available to users without additional clicks or actions.

---

### Step 8: Check the Browser
That’s it! Once the setup is complete, Beefree SDK will load in your browser. You can now start customizing content using the powerful drag-and-drop builder.

---

### Conclusion
With just a few steps, you’ve learned how to install and configure the Beefree SDK in a React app. Following this walkthrough gives you better insights into how the installation works, rather than starting with a finished demo. Now that you’ve seen each step, you’re ready to implement it in your own app and unlock powerful content creation tools for your users.
