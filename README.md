# SyncBoard 🚀

A real-time collaborative whiteboard that allows multiple users to draw, communicate, and collaborate in shared rooms.

Built with **React.js, Node.js, Express.js, Socket.IO, and Tailwind CSS**.

## ✨ Features

- 🎨 Real-time collaborative drawing
- 👥 Multi-user synchronization
- 🔐 Private collaboration rooms
- 🔑 Join rooms using a room code
- 💬 Real-time team chat
- 🌙 Dark/light theme support
- 🖼️ Export whiteboard as PNG
- 📱 Responsive SaaS-style interface
- 🧹 Synchronized canvas clearing
- ⚡ Real-time communication using Socket.IO

## 🖥️ Application Overview

SyncBoard provides a shared digital workspace where multiple users can join the same room and collaborate on a whiteboard in real time.

Users can:

- Create or join a collaboration room
- Draw on the shared whiteboard
- See other users' drawing actions in real time
- Communicate through integrated chat
- Clear the shared canvas
- Export the whiteboard as a PNG image
- Switch between dark and light themes

## 🏗️ Architecture

The application follows a client-server architecture.

**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**Real-time communication:** Socket.IO

The basic flow is:

```text
React Frontend
      |
      | Socket.IO
      v
Node.js + Express.js
      |
      | Socket.IO Server
      v
Collaboration Rooms
      |
      v
Connected Users
```

The React frontend communicates with the Node.js/Express backend using Socket.IO.

Drawing actions and chat messages are transmitted through socket events and synchronized between users connected to the same room.

## 🔄 Real-Time Collaboration

The core of SyncBoard is real-time communication using Socket.IO.

A simplified flow looks like this:

```text
User A
  |
  | Drawing / Chat Event
  v
Socket.IO Server
  |
  | Broadcast to Room
  v
User B -------- User C
```

When a user performs an action, the frontend emits an event through Socket.IO.

The server receives the event and broadcasts the relevant information to users connected to the same collaboration room.

This allows multiple users to interact with the same whiteboard without manually refreshing the page.

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- Tailwind CSS
- Socket.IO Client
- React Router DOM
- HTML5 Canvas

### Backend

- Node.js
- Express.js
- Socket.IO
- JavaScript

### Development Tools

- Git
- GitHub
- npm
- VS Code

## 📁 Project Structure

```text
SyncBoard/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Sanskriti12Ag/SyncBoard.git
cd SyncBoard
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 3. Install backend dependencies

Open a new terminal and navigate to the backend:

```bash
cd SyncBoard/server
npm install
```

Start the backend server:

```bash
npm start
```

## 🎨 Core Functionality

### Collaborative Whiteboard

The application uses the HTML5 Canvas API to provide a drawing area where users can create and modify drawings.

Drawing actions are synchronized between users through Socket.IO.

### Room-Based Collaboration

Users can collaborate inside private rooms using a room code.

Each room provides an isolated collaboration space so users in different rooms do not receive each other's drawing and chat events.

### Real-Time Chat

Users inside the same room can communicate using the integrated chat functionality.

Messages are transmitted through Socket.IO and displayed to connected users in real time.

### Canvas Controls

Users can interact with the whiteboard through drawing controls and can clear the shared canvas.

### PNG Export

The whiteboard can be exported as a PNG image, allowing users to save their work locally.

### Theme Support

SyncBoard includes dark and light theme support for a more flexible user experience.

## 🔐 Room Isolation

The collaboration model uses Socket.IO rooms.

```text
                SyncBoard Server
                       |
          +------------+------------+
          |            |            |
       Room A       Room B       Room C
          |            |            |
       Users         Users        Users
```

Events are handled within the appropriate collaboration room so that users interact with the intended group.

## 📌 Current Features

- [x] Real-time collaborative drawing
- [x] Room-based collaboration
- [x] Room code joining
- [x] Real-time chat
- [x] Multi-user synchronization
- [x] Dark/light theme
- [x] PNG export
- [x] Synchronized canvas clearing

## 🔮 Future Improvements

- [ ] Undo/Redo functionality
- [ ] User authentication
- [ ] MongoDB persistence
- [ ] Persistent whiteboards
- [ ] Live user cursors
- [ ] Improved room management
- [ ] Production deployment
- [ ] Additional drawing tools
- [ ] Better collaboration controls

## 📚 What I Learned

Building SyncBoard helped strengthen my understanding of:

- React component-based development
- Client-server communication
- Socket.IO rooms and events
- WebSocket-based real-time applications
- HTML5 Canvas
- State management
- Real-time event synchronization
- Backend development with Node.js and Express.js
- Git and GitHub workflows
- Building a full-stack application

## 🚧 Project Status

SyncBoard is an actively evolving project.

The core real-time collaboration, room functionality, drawing synchronization, chat, and canvas features are implemented.

Additional features such as authentication, persistence, live cursors, and production deployment are planned for future iterations.

## 👩‍💻 Author

**Sanskriti Agarwal**

Computer Science Engineering Graduate | Full-Stack Developer | Backend Developer

- GitHub: https://github.com/Sanskriti12Ag
- LinkedIn: https://www.linkedin.com/in/sanskriti-agarwal-2807a725/

---

⭐ If you find this project interesting, feel free to explore the repository.
