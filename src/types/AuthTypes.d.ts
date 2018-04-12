export interface IPayload {
  uid: number;
  email: string;
  name: string;
}

export interface IVerifyResult {
  ok: boolean;
  result: IPayload;
  error: Error;
}

export interface ISecrets {
  /** Port number for the GraphQL server */
  PORT: number;
  /** JWT Issuing Authority */
  ISSUER: string;
  /** Encryption key for signing JWTs */
  JWT_SECRET_KEY: string;
  /** Expiration timespan for issued JWT */
  TOKEN_EXPIRY: string;
}
