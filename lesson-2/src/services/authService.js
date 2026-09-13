import { randomUUID } from 'node:crypto';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/authConstants.js';
import { Session } from '../db/models/Session.js';

export const createSession = (userId) =>
  Session.create({
    userId,
    accessToken: randomUUID(),
    refreshToken: randomUUID(),
    accessTokenValidUntil: new Date(Date.now() + accessTokenLifeTime),
    refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifeTime),
  });

export const setSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    sameSite: 'none',
    maxAge: refreshTokenLifeTime,
  });

  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    sameSite: 'none',
    maxAge: accessTokenLifeTime,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    maxAge: refreshTokenLifeTime,
  });
};
