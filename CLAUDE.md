# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev      # start dev server (Next.js)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
```

There is no test suite configured in this repo.

Database schema is applied by running [seed/schema.sql](seed/schema.sql) against the Postgres instance pointed to by `DATABASE_URL`. It drops and recreates all tables — treat it as a full reset, not a migration.

## Environment

Configured via `.env` (see [README.md](README.md) for the full list): `DATABASE_URL`, `AUTH_SECRET`, `CLOUDINARY_CLOUD_NAME`/`CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET`, `PUSHER_APP_ID`/`PUSHER_APP_KEY`/`PUSHER_APP_SECRET`/`PUSHER_APP_CLUSTER`, `NEXT_PUBLIC_PUSHER_KEY`, `NEXT_PUBLIC_PUSHER_CLUSTER`.

## Architecture

Chat-Next is a Next.js 16 (App Router) real-time chat app supporting private 1:1 chats and public/private groups. Spanish is the language used for UI text and user-facing error messages — match it in any new user-facing strings.

**Layers:**
- `app/` — routes only. `(dashboard)` route group holds the authenticated shell: `page.tsx` (chat list), `g/[id]` (group chat), `p/[id]` (private chat). Each chat route fetches its chat's metadata server-side in `page.tsx`/`generateMetadata` and delegates messages to a client component.
- `actions/` — all data mutations and queries live here as Next.js Server Actions (`"use server"`), grouped by domain (`auth/`, `chats/`, `group/`, `messages/`, `private/`, `user/`). Components never query the DB directly; they call an action.
- `components/` — grouped by domain matching `actions/` (`auth/`, `chats/`, `group/`, `messages/`, `private/`), plus `ui/` for cross-cutting shell pieces (Sidebar, dropdowns, theme toggle) and `providers/` for the `SessionProvider` wrapper.
- `lib/` — singleton clients: `db.ts` (pg `Pool`, cached on `global` in dev to survive HMR), `auth.ts` (NextAuth config), `pusher-server.ts` / `pusher-client.ts`, `cloudinary.ts`.
- `store/` — Zustand stores for client-only UI state (e.g. `sidebar-store.ts` controls which sidebar menu/modal is open).
- `types/interfaces.ts` — shared shapes for DB query results (`Chat`, `Message`, `LastMessage`, `Group`, `GroupItem`, `PrivateChat`, `UserItem`). `types/next-auth.d.ts` augments the NextAuth `Session`/`User` with `id`, `username`, `fullname`, `profile_picture`, `bio`.
- `utils/` — small formatting/helper functions (timestamps, default avatars, media metadata, Cloudinary upload).

**Server action conventions** (see [actions/messages/send-message.ts](actions/messages/send-message.ts) and [actions/chats/get-chats.ts](actions/chats/get-chats.ts) as reference): every action calls `auth()` first and returns an early `{ ok: false, message }` if there's no session (never throws for expected auth/validation failures); the rest of the body is wrapped in try/catch, logs the error with `console.error`, and returns `{ ok: false, message }` on failure or `{ ok: true, ...data }` on success. Callers check `ok` and show `message` via `sonner`'s `toast.error`. SQL is raw parameterized queries via `pool.query` (no ORM) — follow the existing query style (explicit joins, `DISTINCT ON` for "latest message per chat", CTE-free by convention).

**Auth**: NextAuth v5 (beta) with the `Credentials` provider only, backed by `@auth/pg-adapter` against the same Postgres pool. Passwords are hashed with bcrypt. Sessions are database-backed (not pure JWT): a custom `jwt.encode` in [lib/auth.ts](lib/auth.ts) creates a real adapter session row for credentials logins and returns its `sessionToken` as the encoded token, so `sessions`/`accounts`/`verification_token` tables (Auth.js schema) must stay in sync with `seed/schema.sql`.

**Real-time**: Pusher channels are keyed by `chatId`. Server actions `trigger()` events (`send-message`, `typing-message`, `stop-typing-message`) after mutating Postgres; client components (`MessagesContainer`, `MessageInput`) `subscribe`/`bind` to the same channel and events. When adding a new real-time interaction, add the trigger in the action and the matching bind in the consuming client component — the two are not otherwise linked by types.

**Media uploads**: Files go through [utils/upload-image-or-video.ts](utils/upload-image-or-video.ts) → Cloudinary (`resource_type: "auto"`), returning `url`/`width`/`height`, which are stored on the `messages` row (`file_url`, `width`, `height`) and on chat/user pictures. Allowed remote image hosts are whitelisted in [next.config.ts](next.config.ts) (`res.cloudinary.com`, `ui-avatars.com`) — add new hosts there if needed. Server action body size limit is raised to 5mb in `next.config.ts` for uploads.

**Data model** ([seed/schema.sql](seed/schema.sql)): `users` → `chats` (type `private`|`group`) ↔ `chat_members` (role `member`|`owner`) → `messages` (type `text`|`image`|`video`). Private chats are just `chats` rows with `type = 'private'` and exactly two `chat_members`; there's no separate private-chat table — "the other user" is derived by joining `chat_members` excluding the current session user (see `get-chats.ts`).

**Styling**: Tailwind CSS v4 + daisyUI, dark/light theme persisted via `ToggleThemeButton`/`store` and applied through daisyUI's `data-theme`.