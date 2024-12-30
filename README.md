# Nothread

## Description
Nothread is Not a Threads. Send text messages to everyone anonymously. Users can create text posts visible on the Explore tab of the website, fostering a platform for open and anonymous expression.

## Prerequisites
Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **Yarn**
- A **Firebase** project for backend services

Dependencies required by the app:

```json
"dependencies": {
  "dotenv": "^16.4.7",
  "firebase": "^11.1.0",
  "next": "15.1.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.4.0"
},
"devDependencies": {
  "@eslint/eslintrc": "^3",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.1.3",
  "postcss": "^8",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

## Installation

Follow these steps to set up Nothread on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/nothread.git
   cd nothread
   ```

2. **Install Dependencies**:
   Using Yarn:
   ```bash
   yarn install
   ```
   Or using npm:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Run the Development Server**:
   ```bash
   yarn dev
   ```
   Or using npm:
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` to view the app.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the Repository**
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "Add your message here"
   ```
4. **Push to the Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request**

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For questions or support, contact:

- **Email**: davieriawan34@gmail.com
- **GitHub**: [abcdavk](https://github.com/abcdavk)
- **Personal Website**: [Dafolio](abcdavk.vercel.app)

