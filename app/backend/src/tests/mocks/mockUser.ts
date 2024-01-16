const invalidPassword = { email: 'admin@exemple.com', password: 'secret' };

const invalidEmail = { email: 'invalid_email', password: 'secret' };

const validToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNzA0ODI5ODc4LCJleHAiOjE3MDU0MzQ2Nzh9.iZjBF7RKmtkfNp6pH9p4qGJPXUFqt4-W0Ksjor0MXIw'

export {
  invalidEmail,
  invalidPassword,
  validToken,
};