# Content Management System (CMS) - MEAN Stack

## Overview
This project is a simple Content Management System (CMS) built using the MEAN stack (MongoDB, Express.js, Angular, Nest.js). The CMS allows users to register, log in, and manage articles (create, read, update, delete).

## Features
- User Registration and Login
- JWT-based Authentication and Authorization
- Responsive Dashboard
- CRUD Operations for Articles
- RESTful APIs
- MongoDB Integration
- Clean and Intuitive User Interface
- Deployed to a cloud platform

## Technologies Used
- **Frontend**: Angular
- **Backend**: Nest.js (with Express.js)
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS
- **Deployment**: [Cloud Platform - e.g., Heroku, AWS, or Render]

---

## Installation and Setup

### Prerequisites
1. Node.js (v16 or later)
2. MongoDB (local or cloud-based)
3. Git
4. Angular CLI

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cms-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=3000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd cms-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

---

## Folder Structure

### Backend (Nest.js)
```
- src/
  - auth/
  - articles/
  - users/
  - app.module.ts
  - main.ts
```

### Frontend (Angular)
```
- src/
  - app/
    - components/
      - dashboard/
      - article-form/
      - article-details/
    - services/
      - auth.service.ts
      - article.service.ts
```

---

## API Endpoints

### Authentication
- `POST /auth/register`: User registration
- `POST /auth/login`: User login

### Articles
- `GET /articles`: Fetch all articles
- `POST /articles`: Create a new article
- `GET /articles/:id`: Fetch article by ID
- `PUT /articles/:id`: Update an article
- `DELETE /articles/:id`: Delete an article

---

## Deployment

The application is deployed at:
[**Deployed App Link**](<deployed-app-url>)

### Deployment Steps
1. Build the Angular application:
   ```bash
   ng build --prod
   ```

2. Deploy the Angular build and Nest.js server to a cloud platform such as Heroku, AWS, or Render.

---

## Usage
1. Register a new account.
2. Log in with your credentials.
3. Access the dashboard to manage articles.
4. Create, edit, view, or delete articles as needed.

---

## Additional Libraries
- **bcrypt**: For password hashing
- **@nestjs/jwt**: JWT management
- **mongoose**: MongoDB ORM

---

## Contribution
Feel free to submit issues or pull requests to enhance the project.

---

## Author
[Your Name](mailto:your-email@example.com)

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any questions or support, please contact [your-email@example.com].
