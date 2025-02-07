```
# Todo List API

A simple Todo List API built with Node.js, Express, and MongoDB. This app allows users to create, update, and delete tasks, as well as track whether each task is completed. The backend provides a clean and efficient API for managing tasks, making it easy to integrate with any frontend application.

## Features

- Create new tasks with a title and optional description.
- Update task details or mark them as completed.
- Delete tasks from the list.
- Built using Node.js, Express, and MongoDB for a full-stack experience.

## Installation

To get started, clone the repository:

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Make sure to create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=your_preferred_port
```

## Usage

To start the server, run:

```bash
npm start
```

This will start the server with `nodemon` for automatic reloading during development.

## API Request Guide

### Base URL
```
http://localhost:7000/api
```

### 1. Create Todo
**Endpoint:** `POST /todo`

**Request Body:**
```json
{
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the new feature"
}
```

**Success Response:**
```json
{
    "message": "Todo created successfully.",
    "todo": {
        "_id": "65c4f8c12a7b8d9e1234abcd",
        "title": "Complete project documentation",
        "description": "Write comprehensive documentation for the new feature",
        "completed": false,
        "createdAt": "2024-02-08T12:00:00.000Z"
    }
}
```

### 2. Get All Todos
**Endpoint:** `GET /todos`

**No Request Body Required**

**Success Response:**
```json
[
    {
        "_id": "65c4f8c12a7b8d9e1234abcd",
        "title": "Complete project documentation",
        "description": "Write comprehensive documentation for the new feature",
        "completed": false,
        "createdAt": "2024-02-08T12:00:00.000Z"
    },
    {
        "_id": "65c4f8c12a7b8d9e1234efgh",
        "title": "Review code",
        "description": "Perform code review for PR #123",
        "completed": true,
        "createdAt": "2024-02-08T11:00:00.000Z"
    }
]
```

### 3. Get Todo by ID
**Endpoint:** `GET /todo/:id`

**URL Parameter:** Replace `:id` with the actual todo ID

**Example:** `GET /todo/65c4f8c12a7b8d9e1234abcd`

**Success Response:**
```json
{
    "_id": "65c4f8c12a7b8d9e1234abcd",
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the new feature",
    "completed": false,
    "createdAt": "2024-02-08T12:00:00.000Z"
}
```

### 4. Update Todo
**Endpoint:** `PUT /todo/:id`

**URL Parameter:** Replace `:id` with the actual todo ID

**Request Body:**
```json
{
    "title": "Updated title",
    "description": "Updated description"
}
```

**Success Response:**
```json
{
    "message": "Todo updated successfully.",
    "todo": {
        "_id": "65c4f8c12a7b8d9e1234abcd",
        "title": "Updated title",
        "description": "Updated description",
        "completed": false,
        "createdAt": "2024-02-08T12:00:00.000Z"
    }
}
```

### 5. Toggle Todo Status
**Endpoint:** `PATCH /todo/toggle/:id`

**URL Parameter:** Replace `:id` with the actual todo ID

**No Request Body Required**

**Success Response:**
```json
{
    "message": "Todo status toggled successfully.",
    "todo": {
        "_id": "65c4f8c12a7b8d9e1234abcd",
        "title": "Updated title",
        "description": "Updated description",
        "completed": true,
        "createdAt": "2024-02-08T12:00:00.000Z"
    }
}
```

### 6. Delete Todo
**Endpoint:** `DELETE /todo/:id`

**URL Parameter:** Replace `:id` with the actual todo ID

**No Request Body Required**

**Success Response:**
```json
{
    "message": "Todo deleted successfully."
}
```

## Error Responses
All endpoints may return the following error responses:

### Not Found (404):
```json
{
    "message": "Todo not found."
}
```

### Server Error (500):
```json
{
    "errorMessage": "Error message details"
}
```
