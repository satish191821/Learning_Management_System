# SignUp Component Documentation

## Overview

The `SignUp` component is a React-based user registration interface for the Learning Management System (LMS). It provides a responsive form that allows users to create accounts as either students or educators.

## File Information

- **File Path**: `/src/pages/SignUp.jsx`
- **Last Updated**: October 3, 2025
- **Author**: LMS Development Team

## Component Architecture

### Dependencies

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { serverUrl } from "../App";
```

### Assets

```jsx
import logo from "../assets/logo1.jpg";
import google from "../assets/google.jpg";
```

## State Management

The component maintains the following state variables:

- `show` (boolean): Controls password visibility
- `name` (string): User's full name
- `email` (string): User's email address
- `password` (string): User's password
- `role` (string): User type - defaults to "student"
- `loading` (boolean): Indicates API request status

## API Integration

### Authentication Service

The component communicates with the backend authentication service via:

```javascript
const handleSignup = async () => {
  setLoading(true);
  try {
    const result = await axios.post(
      serverUrl + "/api/auth/signup",
      { name, password, email, role },
      { withCredentials: true }
    );
    setLoading(false);
    navigate("/");
    toast.success("Signup Successfully!✅");
  } catch (error) {
    setLoading(false);
    toast.error(error.response.data.message);
  }
};
```

## User Experience


### Role Selection

- Student (default)
- Educator

### Authentication Options

- Standard email/password registration
- OAuth integration with Google (UI only, implementation pending)

## Responsive Design

- Fully responsive layout adapts to mobile and desktop viewports
- Brand logo and visual elements hidden on mobile for optimized space

## Navigation Flow

- Successful registration redirects user to the home page
- Link provided to login page for existing users

## Technical Implementation Details

### TailwindCSS Classes

The component uses TailwindCSS for styling with responsive design patterns:

- Mobile-first approach with `md:` breakpoints
- Flex layouts for alignment and positioning
- Custom color schemes matching brand identity

### Form Submission

Form submission is managed through a custom handler with `preventDefault()` to avoid page reloads:

```jsx
<form onSubmit={(e) => e.preventDefault()}>
```

### Security Considerations

- Password field is masked by default
- Authentication tokens stored in cookies with `withCredentials: true`
- Error messages from the server are displayed to the user with proper context

## Future Enhancements

- Google OAuth implementation
- Form validation with error messages
- CAPTCHA integration for bot prevention
- Password strength indicator

## Related Components

- `Login.jsx`: Companion component for user authentication
- `Home.jsx`: Dashboard component users are redirected to after successful registration