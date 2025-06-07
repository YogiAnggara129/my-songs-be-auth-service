// // infrastructure/auth/AuthJsProvider.ts
// import { AuthService } from '../../application/services/AuthService';
// import { UserRepository } from '../repositories/UserRepository';
// import { ExpressAuth } from '@auth/express';

// const userRepo = new UserRepository();
// const authService = new AuthService(userRepo);

// export const authMiddleware = ExpressAuth({
//   providers: [
//     {
//       id: 'credentials',
//       name: 'Credentials',
//       type: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials: any) => {
//         if (!credentials) return null;
//         const { email, password } = credentials;
//         const user = await authService.validateUser(email, password);
//         if (user) {
//           // Return minimal user object for session
//           return { id: user.id, email: user.email };
//         }
//         return null;
//       },
//     },
//   ],
//   secret: process.env.AUTH_SECRET || 'supersecret',
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user = { id: token.id as string, email: token.email as string, emailVerified: new Date() };
//       }
//       return session;
//     },
//   },
// });
