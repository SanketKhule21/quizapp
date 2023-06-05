import { rest } from 'msw';
// For more information on creating simulated HTTP API endpoints, please visit https://mswjs.io/docs/
export const routes = [
  rest.get('/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message:
          'Choose Your Category',
      })
    );
  }),
];
