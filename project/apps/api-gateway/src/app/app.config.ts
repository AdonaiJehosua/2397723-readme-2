export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/auth',
  Blog = 'http://localhost:3010/api/posts',
  Tags = 'http://localhost:3010/api/tags',
  Files = 'http://localhost:3020/api/files',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
