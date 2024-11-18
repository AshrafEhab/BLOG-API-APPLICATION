# Blog API

**Introduction**

This document outlines the API endpoints for a blog application. The API provides functionalities for user management, post creation and interaction, and comment management.

**Authentication**

Authentication is handled using JWT tokens. Users must be logged in to access protected routes.

**User Routes (API Prefix: `/user`)**

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/user` | Get all users (Admin only) | None |
| GET | `/user/:id` | Get a specific user by ID | None |
| POST | `/user/create` | Create a new user | Required |
| POST | `/user/login` | Login a user and obtain a JWT token | Required |
| PUT | `/user/follow/:id` | Follow another user | Required |
| PUT | `/user/unfollow/:id` | Unfollow another user | Required |
| PUT | `/user/view/:id` | View a user profile | Required |
| PUT | `/user/edit/:id` | Edit user profile | Required |
| PUT | `/user/adminBlockUser/:id` | Block a user (Admin only) | Admin |
| PUT | `/user/adminUnblockUser/:id` | Unblock a user (Admin only) | Admin |
| DELETE | `/user/delete/:id` | Delete user account | Required |

**Post Routes (API Prefix: `/post`)**

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/post` | Get all posts | None |
| GET | `/post/:id` | Get a specific post by ID | None |
| POST | `/post/create` | Create a new post | Required |
| PUT | `/post/:id/like` | Like a post | Required |
| PUT | `/post/:id/unlike` | Unlike a post | Required |
| PUT | `/post/:id/dislike` | Dislike a post | Required |
| PUT | `/post/:id/undislike` | Undislike a post | Required |
| PUT | `/post/edit/:id` | Edit a post | Required |
| DELETE | `/post/delete/:id` | Delete a post | Required |

**Comment Routes (API Prefix: `/comment`)**

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/comment` | Get all comments | None |
| GET | `/comment/:id` | Get a specific comment by ID | None |
| POST | `/comment/create` | Create a new comment on a post | Required |
| PUT | `/comment/edit/:id` | Edit a comment | Required |
| DELETE | `/comment/delete/:id` | Delete a comment | Required |

**Additional Notes**

* Error handling should be implemented for all routes.
* Consider using a versioning strategy for the API.
* Refer to the actual code for detailed implementation and validation logic.
