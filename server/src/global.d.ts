declare namespace Express {
  interface Request {
    auth?: {
      userId: number;
      sessionId: string;
    };
  }
}
