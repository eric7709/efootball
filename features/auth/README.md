# Auth Feature

Authentication is isolated as its own feature.

```text
features/auth/
├── roles/
│   ├── admin/
│   └── user/
├── types.auth.ts
├── store.auth.ts
├── hooks/
│   ├── api.auth.ts
│   ├── useLogin.ts
│   ├── useRegister.ts
│   ├── useLogout.ts
│   └── useCurrentUser.ts
├── utils/
├── dummydata/
└── shared/
```

The frontend expects the backend to expose:

- POST `/auth/login`
- POST `/auth/register`
- POST `/auth/logout`
- GET `/auth/me`

Authentication is intended to use an HTTP-only cookie/session. The Axios instance sends credentials to the backend.
