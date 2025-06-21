# 🔗 New Social

A React + Firebase-based social media web application where users can create posts, update profiles, and interact through a clean and responsive UI.

---

## 📦 Project Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/new-social.git
cd new-social
```

2. **Install dependencies**

```bash
npm install
```

3. **Firebase setup**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new Firebase project
   - Enable:
     - Firebase Authentication (Email/Password)
     - Firestore Database
   - Create a `.env` file in the project root with:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. **Run the app locally**

```bash
npm start
```

5. **Build and deploy**

```bash
npm run build
firebase deploy
```

---

## ⚙️ Technologies Used

- **React.js** – Frontend UI
- **Firebase** – Authentication, Firestore, Hosting
- **Bootstrap** – UI components and responsive layout
- **React Router** – Page routing


---

## ✨ Key Features Implemented

- User registration and login using Firebase Authentication
- Creating, publishing, and displaying public posts
- Profile editing with name, bio, and avatar
- Profile avatars using file uploads or avatar generators
- Responsive navbar with dropdown (Create Post, Edit Profile, Logout)
- Firebase Hosting deployment

---

## ⚠️ Limitations / Known Issues

- **No image uploads in posts**  
  Image upload is not implemented as Firebase Storage is a paid service. This can be added if storage is enabled.

- **Limited interaction features**  
  Currently, there's no comment functionality. These can be added in future versions.

---
