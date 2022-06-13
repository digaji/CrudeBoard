# CrudeBoard
This is the greatest kanban mask dashboard of All Time

CrudeBoard is a task management web application with integrated support for face mask detection. Users can manage their tasks through their own kanban board and admins can monitor their mask usage through the admin panel.

Made By:
- Jason J (2440077301)
- Bryn (2502087263)

Features:
- Registration, sign in, sign out
- Kanban board
- Admin panel

Made With:
- React
- Tailwind CSS
- react-beautiful-dnd
- Node.js
- Express
- Firebase
- Nodeflux
- My VPS (Frontend hosting)
- Google Cloud Run (Backend hosting)

# Local Configuration
Install the modules
```bash
npm install
```

Change Constants.ts to point to the local backend
```
Uncomment the last line and comment out the Cloud Run line
```

CD into the backend and install its modules
```bash
cd backend
npm install
```

Run the backend first
```bash
npm run dev
```

Run the frontend after
```bash
cd ..
npm run start
```
