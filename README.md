This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Initial Setup  

### 1. Install Node.js and npm  
If you don’t have Node.js and npm installed on your computer, follow these steps:  

#### Windows:  
- Download and install Node.js from [nodejs.org](https://nodejs.org/).  
- During installation, ensure the option to install `npm` (Node Package Manager) is selected.  
- Verify installation by running:  
  ```sh
  node -v
  npm -v
  ```
  These commands should return the installed versions of Node.js and npm.  

#### macOS (using Homebrew):  
- Install Homebrew if you don’t have it already:  
  ```sh
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
- Install Node.js and npm:  
  ```sh
  brew install node
  ```
- Verify installation:  
  ```sh
  node -v
  npm -v
  ```

#### Linux (Debian/Ubuntu):  
- Install Node.js and npm:  
  ```sh
  sudo apt update
  sudo apt install nodejs npm
  ```
- Verify installation:  
  ```sh
  node -v
  npm -v
  ```

### 2. Set Up the Project  

#### Create a New Folder for the Project  
1. Open a terminal or command prompt.  
2. Navigate to the location where you want to store the project.  
3. Create and enter a new directory:  
   ```sh
   mkdir real-time-chat
   cd real-time-chat
   ```

#### Clone the Repository  
Run the following command to clone the project repository:  
```sh
git clone https://github.com/ayuyamo/real-time-chat-app.git
```

#### Navigate to the Project Directory  
After cloning, there will be a new folder inside your current directory. Change into that directory:  
```sh
cd real-time-chat-app
```

#### Install Dependencies  
Once inside the project directory, install all required dependencies:  
```sh
npm install
```

This will download and set up all necessary packages for running the project.  

---

### Next Steps  
- Start the development server using:  
  ```sh
  npm run dev
  ```
- Open the project in a browser and test the real-time chat functionality.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## TODO 
- visuals (nothing has been done for frontend stuff, i.e. make it so messages were on the left if they were sent by other users and on the right if sent by current logged-in user)
- test chat room page display with different users
- deploy website & check chat app performance
- maybe add more features like which user have read the message, time message was sent or ability to modify & delete sent messages
- document all the code for the backend ( Halie )
- display warning if user tries to enter chat room without signing in
- add feature to allow user to select their profile image
- enable user to put emojis in text messages
- adjust user view on mobile devices 