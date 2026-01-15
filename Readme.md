# WikAds Web Application

Web application for browsing classified ads, with user authentication and persistent user preferences.

## Overview

- Backend implemented in **Node.js** with **Express**
- **RESTful API** for authentication and favorites management
- User data and sessions stored in **MongoDB Atlas**
- Ads data are retrieved asyncrhonous from the WikiAds API using the Fetch API and Promises.
- Deployed on **Render**

## Live Preview

🔗 https://wikiads-web-application.onrender.com/

⚠️ **Note:**  
The backend server may require a short time to respond on first access due to cold start (Render free tier).  
The same applies to the external WikiAds API.
(Response time may take up to ~3 minutes on first access.)


## Demo Users

| User   | Username | Password |
|--------|----------|----------|
| Demo 1 | mitsos   | 123      |
| Demo 2 | vasso    | 111      |

## Architecture (High Level)

- Client (Web Browser) consumes:
  - External WikiAds API for ads data
  - Custom backend API for authentication and favorites
- Backend server:
  - Exposes REST endpoints
  - Manages sessions and user state
  - Persists data in MongoDB Atlas

## Technologies

**Backend**
- Node.js
- Express
- MongoDB Atlas

**Frontend**
- HTML, CSS, JavaScript (Fetch API), Handlebars

## Additional Documentation

Detailed technical documentation, local run instructions, and coursework description (in Greek):  
📄 [README_GR_DOC.md](README_GR_DOC.md)
