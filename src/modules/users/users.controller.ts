import { Request, Response } from "express";
import { userSchema } from "./users.schema";
import { User } from "./users.model";

let users: User[] = [
  { id: 1, username: "user1", email: "user1@example.com" },
  { id: 2, username: "user2", email: "user2@example.com" },
];

// Get all users
export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

// Get a single user by ID
export const getUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Create a new user
export const createUser = (req: Request, res: Response) => {
  const parseResult = userSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.errors });
  }

  const newUser: User = {
    id: users.length + 1,
    ...parseResult.data,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update an existing user
export const updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    const parseResult = userSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ errors: parseResult.error.errors });
    }

    users[userIndex] = { ...users[userIndex], ...parseResult.data };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Delete a user
export const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    users = users.filter((user) => user.id !== id);
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
