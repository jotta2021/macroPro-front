# macroPro-front — Project Rules

> Read the exact versioned Expo docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

---

## Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Expo + Expo Router (file-based routing) | SDK 56 |
| Language | TypeScript | ~6.0.3 |
| UI styling | NativeWind (Tailwind CSS for RN) | ^4.2.5 |
| Auth | better-auth + @better-auth/expo | ^1.6.20 |
| Data fetching | TanStack Query | ^5.101.1 |
| Forms | react-hook-form + zod | ^7 + ^4 |
| Global state | Zustand | ^5 |
| HTTP client | axios (via `@/core/api`) | ^1 |
| Charts / Canvas | @shopify/react-native-skia | 2.6.2 |
| Icons | @expo/vector-icons (Ionicons, FontAwesome) | ^15 |
| Fonts | Inter via @expo-google-fonts/inter | ^0.4.2 |

---

## Project Structure

```
src/
├── app/                  # Expo Router screens (file-based routing)
│   ├── _layout.tsx       # Root layout — auth guards, providers
│   ├── index.tsx         # Public landing screen
│   ├── started.tsx       # Onboarding start
│   ├── login.tsx         # Public auth screen
│   ├── register.tsx      # Public auth screen
│   └── private/
│       ├── _layout.tsx   # Private Stack root
│       ├── index.tsx     # Onboarding wizard (multi-step)
│       ├── editProfile.tsx
│       ├── _components/  # Screen-scoped components (NOT shared)
│       └── (tabs)/       # Tab navigator
│           ├── _layout.tsx
│           ├── index.tsx  # "Diário" tab
│           └── profile.tsx
├── core/
│   ├── api.ts            # Axios instance — ALWAYS use this for HTTP calls
│   └── apiKeys.ts        # TanStack Query key registry
├── enum/                 # TypeScript enums + description maps
├── hook/                 # Custom React hooks
├── lib/
│   ├── auth-client.ts    # better-auth client singleton
│   └── query-client.ts   # TanStack QueryClient singleton
├── models/               # TypeScript types for API data shapes
├── services/             # API call functions (one file per domain)
├── shared/
│   ├── theme/
│   │   └── colors.json   # Single source of truth for brand colors
│   └── ui/
│       ├── base/         # Lowest-level primitives (Avatar, etc.)
│       ├── organisms/    # Composed, feature-level components
│       ├── input.tsx
│       ├── customButton.tsx
│       └── optionSelector.tsx
└── store/                # Zustand stores (one file per domain)
```

---

## Architecture Rules

### Routing
- All screens live inside `src/app/`. Never create screens outside this folder.
- Auth guards are done at the root `_layout.tsx` via `Stack.Protected`:
  - `guard={!isLoggedIn}` → public screens (index, started, login, register)
  - `guard={isLoggedIn}` → private screens
- Never add redirect logic inside individual screens; use the root layout guard.
- Use `router.push()` for forward navigation, `router.back()` to go back, `router.replace()` to replace the stack (e.g. after login).

### HTTP / Services
- **Always** use the `api` instance from `@/core/api` — never use raw `axios` or `fetch`.
- The `api` instance automatically injects the Bearer token via request interceptor.
- One service file per backend domain under `src/services/` (e.g. `profile-service.ts`).
- Service functions are plain `async` functions — no classes, no decorators.
- Export pattern: default export for the primary mutation (`postX`), named exports for others (`getX`, `putX`, `deleteX`).

### Data Fetching
- All server state is managed by **TanStack Query**. Never use `useState` to store fetched data.
- All query keys are defined in `src/core/apiKeys.ts`. Never inline string keys in components.
- Use `useMutation` for write operations. Always invalidate affected queries in `onSuccess`.
- Use `useQuery` for read operations. Set `retry: false` when a 404 is a valid/expected state.

### Global State
- Use **Zustand** only for cross-screen client state (e.g. onboarding wizard progress).
- One store per domain under `src/store/`. Stores are defined with `create<State>()`.
- Each field has a dedicated setter (`setAge`, `setGender`, etc.) — no generic `setState`.
- Do NOT use Zustand to cache server data; that belongs in TanStack Query.

### Forms
- All forms use **react-hook-form** with **zod** validation via `zodResolver`.
- Zod schemas are defined at the top of the screen file (co-located).
- Use `Controller` for all form fields — never use uncontrolled refs.
- Always display field errors using the `FieldError` pattern (icon + red text below the field).

### Auth
- Use `authClient` from `@/lib/auth-client` for all auth operations.
- `authClient.useSession()` in the root layout is the single source of session truth.
- Sign out: `authClient.signOut()`.
- Sign up: `authClient.signUp.email({...})`.
- Never store tokens manually — the `expoClient` plugin handles SecureStore automatically.

---

## Styling Rules

### NativeWind / Tailwind
- Use **NativeWind v4** Tailwind classes for all styling. No `StyleSheet.create()`.
- Exceptions: use inline `style={{}}` only when a value must be dynamic/computed at runtime and cannot be expressed with Tailwind (e.g. animated transforms, dynamic widths from JS calculations).
- Never mix Tailwind classes with `StyleSheet` on the same component.

### Brand Colors
Colors are defined in `src/shared/theme/colors.json` and registered in `tailwind.config.js`:

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#7ED957` | CTAs, active states, highlights |
| `primaryDark` | `#468C2C` | Tab active tint, pressed states |
| `secondary` | `#ff9933` | Secondary accents |
| `neutral` | `#1F2228` | Primary text, headings |
| `neutralLight` | `#8F95A3` | Secondary/muted text, icons |

- Reference colors in Tailwind classes: `bg-primary`, `text-neutral`, `border-primary/20`.
- When you need a hex value directly in JS (e.g. for icon `color` prop), import from `colors.json`:
  ```ts
  import Colors from "@/shared/theme/colors.json";
  // Colors.primary, Colors.neutral, etc.
  ```
- Never hardcode hex values that already exist in the palette.

### Typography
Fonts are loaded in `_layout.tsx` and aliased in `tailwind.config.js`:

| Class | Weight |
|---|---|
| `font-inter` | Regular (400) |
| `font-inter-medium` | Medium (500) |
| `font-inter-semibold` | SemiBold (600) |
| `font-inter-bold` | Bold (700) |

- Always specify a font class. Never rely on the system default font.

### Component Styling Conventions
- Card containers: `bg-white border border-gray-100 rounded-3xl p-5 shadow-sm shadow-black/5`
- Section separators: `border-b border-gray-100`
- Primary buttons: `bg-primary w-full py-4 rounded-2xl`
- Disabled state: `bg-neutral/20` text `text-neutral/70`
- Error border: `border-red-400`
- Error text: `text-red-400 font-inter text-xs`
- Inputs: `flex-row items-center border rounded-xl px-4 bg-gray-50`

---

## Enums

Enums live in `src/enum/` and always export two things:
1. A TypeScript `enum` with string values (uppercase, matching backend).
2. A `Record<Enum, string>` description map for human-readable labels.

```ts
// Pattern to follow
export enum Goal {
  HYPERTROPHY = "HYPERTROPHY",
  MAINTENANCE = "MAINTENANCE",
  WEIGHTLOSS  = "WEIGHTLOSS",
}

export const descriptionGoal: Record<Goal, string> = {
  HYPERTROPHY: "Ganho de massa",
  MAINTENANCE: "Manutenção",
  WEIGHTLOSS:  "Perda de peso",
};
```

- Never use raw string literals where an enum exists. Always import and use the enum.

---

## Component Rules

### Shared UI (`src/shared/ui/`)
- `Input` — always pass `error` prop for field-level error border styling.
- `CustomButton` — use for all primary CTAs. Handles `loading` and `disabled` state.
- `OptionSelector<T>` — generic horizontal pill selector. Use for all enum selections.
- Add new shared components only if they are used in **2+ screens**.
- Screen-specific components go in `src/app/private/_components/` (or equivalent `_components` folder next to the screen).

### Screen-level Components
- Default export is always the screen component.
- Auxiliary small components (e.g. `FieldError`) can be defined in the same file if they are only used there.
- Do not create a new file for a component used only in one screen.

### SafeAreaView
- Always wrap the outermost `View` with `SafeAreaView` from `react-native-safe-area-context`.
- Use `edges={["top"]}` when the bottom edge is handled by the tab bar or a scroll view.

### Keyboard Handling
- Wrap scrollable forms with `KeyboardAvoidingView`:
  ```tsx
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
  ```
- Always set `keyboardShouldPersistTaps="handled"` on `ScrollView` inside forms.

---

## Toasts / Feedback
- Use `useToast()` from `react-native-toast-notifications` for all user feedback.
- Types: `"success"`, `"danger"`, `"warning"`, `"normal"`.
- Always show a toast on `onSuccess` and `onError` of mutations.
- Never use `alert()` or `console.error()` for user-facing errors.

---

## Path Aliases
The project uses `@/` as an alias for `src/`. Always use aliases, never relative `../../` imports, except within the same folder level.

```ts
// ✅ Correct
import api from "@/core/api";
import Colors from "@/shared/theme/colors.json";

// ❌ Wrong
import api from "../../core/api";
```

---

## TypeScript
- No `any` types unless strictly unavoidable (and a comment explaining why is required).
- Derive form types from zod schemas: `type FormData = z.infer<typeof schema>`.
- Model types for API shapes live in `src/models/`. Use them in service return types.
- Prefer `interface` for object shapes that will be extended; `type` for unions and intersections.

---

## Do Not
- ❌ Do not use `StyleSheet.create()` — use NativeWind classes.
- ❌ Do not call raw `fetch` or `axios` directly — use `@/core/api`.
- ❌ Do not inline query keys as strings — always use `apiKeys.*`.
- ❌ Do not store server data in `useState` — use `useQuery`.
- ❌ Do not create screens outside `src/app/`.
- ❌ Do not hardcode brand colors as hex strings — use Tailwind tokens or `colors.json`.
- ❌ Do not use the system default font — always apply an `font-inter*` class.
- ❌ Do not use `console.log` in production code — remove before committing.
- ❌ Do not use `alert()` for user feedback — use `useToast()`.
