# 📅 Event-Hub-Lite

Event-Hub-Lite is a lightweight mobile app built with **React Native (Expo + TypeScript)** that allows users to browse events, view details, save favorites offline, and purchase tickets via a mock checkout.

---

## ✨ Features

### Core User Stories
1. **Browse Events**  
   - Paginated list of events (10 per page).  
   - Search by title and filter by category.  
   - Each event card shows thumbnail, title, date, city, and price.

2. **Event Details**  
   - View full description, speakers, venue, and capacity.  
   - Availability badge (`remaining / capacity`).  
   - Favorite toggle button to save events offline.  

3. **Favorites & Offline Cache**  
   - Favorites stored locally (AsyncStorage).  
   - Cached events and details available offline.  

4. **Checkout Flow**  
   - Fill form with name, email, and ticket quantity.  
   - Validate inputs, simulate purchase.  
   - On success, show reference number with confetti 🎉.

---

## 🛠️ Tech Stack

- **Frontend:** React Native + Expo + TypeScript  
- **Navigation:** React Navigation  
- **Local Storage:** AsyncStorage (offline caching + favorites)  
- **UI Components:** React Native Paper / TailwindCSS  
- **Icons:** @expo/vector-icons  
- **Animations:** react-native-confetti-cannon  

---

