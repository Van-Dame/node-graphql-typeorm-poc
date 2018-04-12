import jwt from 'jsonwebtoken';
import { User } from './entities/User';
import { IVerifyResult, ISecrets } from './types/AuthTypes';

async function getUser(authorization, secrets: ISecrets) {
  const bearerLength = 'Bearer '.length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    console.log('Bearer token: ', token);
    const { ok, result, error } = await new Promise<IVerifyResult>(resolve =>
      jwt.verify(token, secrets.JWT_SECRET_KEY, (err, res) => resolve({ ok: !err, result: res, error: err }))
    );

    if (ok) {
      const user = await User.findOneById(result.uid);
      return user;
    } else {
      console.error(error);
      return null;
    }
  }

  return null;
}

export default async function(headers, secrets) {
  const user = await getUser(headers.authorization, secrets);

  return {
    headers,
    secrets,
    user
  };
}
