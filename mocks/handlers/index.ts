// handlers.ts

import ReviewHandlers from './review';
const handlers = [...ReviewHandlers];

export default handlers;
// import { rest } from 'msw';
// s://example.com/reviews', (req, res, ctx) => {
//     return res(
//       ctx.json([
//         {
//           id: '31',
//           author:
// export const handlers = [
//   rest.get('https://example.com/products/:productId', (req, res, ctx) => {
//     const { productId } = req.params;

//     const products = [
//       {
//         id: '22',
//         name: 'banana',
//         quantity: 3,
//       },
//     ];

//     const product = products.filter((product) => product.id === productId)[0];

//     return res(ctx.json(product));
//   }),

//   rest.get('http'길동쓰',
//           content: '맛있는 바나나 👍 🍌',
//         },
//       ]),
//     );
//   }),
// ];
