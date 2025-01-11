import { assertMethod, defineEventHandler, readBody, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  assertMethod(event, 'POST');

  const { idToken, refreshToken } = await readBody(event);

  if (idToken) {
    setCookie(event, 'nfa-id', idToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  } else {
    setCookie(event, 'nfa-id', '', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 0,
    });
  }

  if (refreshToken) {
    setCookie(event, 'nfa-refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  } else {
    setCookie(event, 'nfa-refresh', '', {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 0,
    });
  }
});