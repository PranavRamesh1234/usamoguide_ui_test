import { OAuthApp } from '@octokit/oauth-app';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

const app = new OAuthApp({
  clientType: 'github-app',
  clientId: process.env.EDITOR_CLIENT_ID ?? process.env.GATSBY_EDITOR_CLIENT_ID ?? '',
  clientSecret: process.env.EDITOR_CLIENT_SECRET ?? '',
});
interface RequestBody {
  code: string;
}
export default async function handler(
  request: GatsbyFunctionRequest<RequestBody>,
  response: GatsbyFunctionResponse
) {
  try {
    if (!process.env.EDITOR_CLIENT_ID && !process.env.GATSBY_EDITOR_CLIENT_ID) {
      response.status(500).json({ error: 'Missing EDITOR_CLIENT_ID' });
      return;
    }
    if (!process.env.EDITOR_CLIENT_SECRET) {
      response.status(500).json({ error: 'Missing EDITOR_CLIENT_SECRET' });
      return;
    }
    if (!request.body?.code) {
      response.status(400).json({ error: 'Missing OAuth code' });
      return;
    }
    const {
      authentication: { token },
    } = await app.createToken({
      code: request.body.code,
    });
    response.json({ token });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Token exchange failed';
    response.status(500).json({ error: message });
  }
}
