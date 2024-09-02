import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log("user controller file executed");
// Function to handle user registration
export const registerUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  console.log("Rregister user triggered");
  if (!name || !email) {
    console.error('Name and email are required');
    return res.status(400).json({ error: "Invalid data" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = await prisma.user.create({
    data: { name, email },
  });
  console.error('User registered successfully');
  return res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
};


// Function to handle user subscription
export const subscribeUser = async (req: Request, res: Response) => {
  const { userId, type } = req.body;

  if (!userId || !type) {
    console.error('Email and message are required for subscription');
    return res.status(400).json({ error: "Invalid data" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    console.log("User not found");
    return res.status(404).json({ error: "User not found" });
  }

  const newSubscription = await prisma.subscription.create({
    data: {
      type,
      userId,
    },
  });
  console.log("User subscribed successfully");
  return res.status(201).json({
    message: "User subscribed successfully",
    subscription: newSubscription,
  });
};
