import { IServerResponse, ISessionDetails } from 'src/types';

export const isSessionValid = (
  sessionDetails: ISessionDetails,
  cookieHeaders: { sessionId: string; username: string },
): IServerResponse<string> => {
  const isSessionIdValid =
    sessionDetails?.sessionId === cookieHeaders.sessionId;

  if (!isSessionIdValid)
    return {
      result: null,
      error: 'Error - Session is not valid',
    };

  const currentTimestamp = Date.now();
  const hasSessionExpired =
    currentTimestamp > sessionDetails.generatedAt + sessionDetails.expiresIn;

  if (hasSessionExpired)
    return {
      result: null,
      error: 'Error - Session has expired',
    };

  return {
    result: 'Session Valid',
    error: null,
  };
};
