import createHttpError from 'http-errors';
import { User } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { Session } from '../db/models/Session.js';
import { createSession, setSessionCookies } from '../services/authService.js';
import sendEmail from '../../../src/services/sendEmail.js';
import jwt from 'jsonwebtoken';
import Handlebars from 'handlebars';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const verifyEmailTemplatePath = resolve(
  'lesson-2',
  'src',
  'templates',
  'verify-email.html',
);
// console.log(verifyEmailTemplatePath);

const handlebarsVerifyEmailSource = await readFile(
  verifyEmailTemplatePath,
  'utf-8',
);

const { BASE_URL, JWT_SECRET } = process.env;

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  const token = jwt.sign({ email }, JWT_SECRET);
  // const session = await createSession(newUser._id);
  // setSessionCookies(res, session);

  const template = Handlebars.compile(handlebarsVerifyEmailSource);
  const html = template({
    username: req.body.username,
    link: `${BASE_URL}/auth/verify?token=${token}`,
  });

  const verifyEmail = {
    to: email,
    Subject: 'verify email',
    html: html,
    // html: `<a target='_blank' href='${BASE_URL}/auth/verify?token=${token}'>Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json(newUser);
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, `User with email=${email} not found`);
    }

    if (user.verify) {
      throw createHttpError(404, `User is already verified`);
    }

    user.verify = true;
    await user.save();
    res.json({
      message: 'Email successfully verified',
    });
  } catch (error) {
    throw createHttpError(401, error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password (credentials)');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid email or password (credentials)');
  }
  if (!user.verify) {
    throw createHttpError(401, 'Email is not verified');
  }
  await Session.deleteOne({ userId: user._id });

  const session = await createSession(user._id);
  setSessionCookies(res, session);
  res.json(user);
};

export const refreshUserSession = async (req, res) => {
  const { sessionId } = req.cookies;
  const session = await Session.findOne({ _id: sessionId });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session expired');
  }
  await Session.deleteOne({ _id: sessionId });

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);
  res.json({ message: 'Session refreshed' });
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;
  const session = await Session.findOne({ _id: sessionId });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  await Session.deleteOne({ _id: sessionId });
  res.clearCookie('sessionId');
  res.clearCookie('accessToken');

  res.clearCookie('refreshToken');
  res.status(204).send();
};
