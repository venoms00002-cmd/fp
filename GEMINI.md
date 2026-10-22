# Project Overview

This is a [Next.js](https://nextjs.org) 16 application using the App Router, React 19, and TypeScript. It was bootstrapped with `create-next-app` and is configured with Tailwind CSS 4 for styling.

## Technologies

- **Next.js 16**: Utilizing the App Router for routing and layout management.
- **React 19**: Leveraging the latest React features and concurrent rendering.
- **TypeScript**: Ensuring type safety across the codebase.
- **Tailwind CSS 4**: Modern utility-first CSS framework for rapid UI development.
- **Telegram Service**: Built-in service in `lib/telegram.ts` for sending messages via Telegram Bot API with Markdown support.
- **ESLint**: Configured for code quality and consistency.

# Building and Running

### Development

Start the development server with hot-reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

# Development Conventions

- **App Router**: Follow Next.js App Router conventions. Place page components in `page.tsx` and layouts in `layout.tsx` within the `app/` directory.
- **Components**: Prefer functional components and React Hooks. Use TypeScript interfaces/types for component props.
- **Styling**: Use Tailwind CSS utility classes. Global styles are managed in `app/globals.css`.
- **Fonts**: Utilize `next/font` for optimized font loading (Geist and Geist Mono are currently configured).
- **Metadata**: Use the `Metadata` API in `layout.tsx` or `page.tsx` for SEO and document head management.
