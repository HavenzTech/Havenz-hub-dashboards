# Sunny's Dashboard - Implementation Plan

## Project Overview
A Next.js dashboard for a 55-inch Samsung screen in portrait mode (2160×3840 pixels).

## Folder Structure (No src/ folder)
```
havenz-hub-dashboards/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── api/
│       ├── weather/route.ts
│       ├── projects/route.ts
│       └── linkedin/route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Section.tsx
│   │   └── Container.tsx
│   ├── ui/
│   │   ├── Card.tsx
│   │   ├── StatCircle.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── StatusBadge.tsx
│   │   └── SectionTitle.tsx
│   ├── widgets/
│   │   ├── DateTimeWidget.tsx
│   │   ├── TemperatureWidget.tsx
│   │   ├── PersonalInfo.tsx
│   │   ├── CompanyInfo.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── LinkedInFeed.tsx
│   │   └── LinkedInPost.tsx
│   └── three/
│       ├── Scene.tsx
│       ├── HeatPlantModel.tsx
│       └── RotatingCamera.tsx
├── hooks/
│   ├── useCurrentTime.ts
│   ├── useWeather.ts
│   ├── useLinkedIn.ts
│   └── useProjects.ts
├── lib/
│   ├── api.ts
│   ├── utils.ts
│   └── constants.ts
├── types/
│   ├── index.ts
│   ├── project.ts
│   ├── linkedin.ts
│   └── weather.ts
└── documentation/
    ├── PROJECT_SPEC.md
    ├── IMPLEMENTATION_PLAN.md
    └── PROGRESS_LOG.md
```

---

## Phase 1: Project Setup & Configuration ✅ COMPLETE
- [x] 1.1 Install dependencies (`three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`)
- [x] 1.2 Configure Tailwind with design system (colors, typography, custom font sizes)
- [x] 1.3 Set up Inter & JetBrains Mono fonts in `layout.tsx`
- [x] 1.4 Update `globals.css` with CSS variables and base styles
- [x] 1.5 Create folder structure (`components/`, `hooks/`, `lib/`, `types/`)

---

## Phase 2: Types & Constants ✅ COMPLETE
- [x] 2.1 Create `types/index.ts` - shared type exports
- [x] 2.2 Create `types/project.ts` - Project interface
- [x] 2.3 Create `types/linkedin.ts` - LinkedInPost interface
- [x] 2.4 Create `types/weather.ts` - Weather interface
- [x] 2.5 Create `lib/constants.ts` - app constants
- [x] 2.6 Create `lib/utils.ts` - utility functions (date formatting, cn helper)

---

## Phase 3: Base UI Components ✅ COMPLETE
- [x] 3.1 Create `components/ui/Card.tsx` - base card with variants (default, bordered, gradient)
- [x] 3.2 Create `components/ui/StatusBadge.tsx` - status indicator (completed, in-progress, on-hold, cancelled)
- [x] 3.3 Create `components/ui/ProgressBar.tsx` - horizontal progress bar with percentage
- [x] 3.4 Create `components/ui/SectionTitle.tsx` - section heading component
- [x] 3.5 Create `components/ui/StatCircle.tsx` - circular stat display with SVG

---

## Phase 4: Layout Components ✅ COMPLETE
- [x] 4.1 Create `components/layout/Container.tsx` - main container for portrait layout
- [x] 4.2 Create `components/layout/Section.tsx` - reusable section wrapper with height %
- [x] 4.3 Create `components/layout/Header.tsx` - top header (logo, company, date/time/temp)

---

## Phase 5: Custom Hooks ✅ COMPLETE
- [x] 5.1 Create `hooks/useCurrentTime.ts` - live clock (updates every second)
- [x] 5.2 Create `hooks/useWeather.ts` - weather data fetching

---

## Phase 6: Widget Components ✅ COMPLETE
- [x] 6.1 Create `components/widgets/DateTimeWidget.tsx` - live date/time display
- [x] 6.2 Create `components/widgets/TemperatureWidget.tsx` - temperature display
- [x] 6.3 Create `components/widgets/PersonalInfo.tsx` - name, age, title, details card
- [x] 6.4 Create `components/widgets/ProjectCard.tsx` - individual project card
- [x] 6.5 Create `components/widgets/ProjectsGrid.tsx` - 2x2 grid of project cards
- [x] 6.6 Create `components/widgets/LinkedInPost.tsx` - single LinkedIn post
- [x] 6.7 Create `components/widgets/LinkedInFeed.tsx` - auto-rotating posts carousel

---

## Phase 7: 3D Components ✅ COMPLETE
- [x] 7.1 Create `components/three/Scene.tsx` - Canvas wrapper with lighting setup
- [x] 7.2 Create `components/three/HeatPlantModel.tsx` - 3D heat plant visualization
- [x] 7.3 Create `components/three/RotatingCamera.tsx` - auto-rotating camera controller
- [x] 7.4 Create `components/three/HeatPlantScene.tsx` - client wrapper for SSR

---

## Phase 8: Dashboard Pages ✅ COMPLETE
- [x] 8.1 Create `app/dashboard/layout.tsx` - shared dashboard layout with header
- [x] 8.2 Create `app/dashboard/page.tsx` - main dashboard (Screen 1 MVP)
- [x] 8.3 Update `app/page.tsx` - redirect to `/dashboard`

---

## Phase 9: API Routes (Mock Data Initially) ✅ COMPLETE
- [x] 9.1 Create `app/api/weather/route.ts` - weather endpoint
- [x] 9.2 Create `app/api/projects/route.ts` - projects endpoint with mock data
- [x] 9.3 Create `app/api/linkedin/route.ts` - LinkedIn posts endpoint with mock data

---

## Phase 10: Testing & Polish ✅ COMPLETE
- [x] 10.1 Build passes successfully
- [x] 10.2 All components compile without errors
- [x] 10.3 Create `.env.example` template

---

## Tech Stack Reference
| Technology        | Purpose                |
| ----------------- | ---------------------- |
| Next.js 16        | Framework (App Router) |
| TypeScript        | Type safety            |
| Tailwind CSS 4    | Styling                |
| React Three Fiber | 3D visualization       |
| @react-three/drei | 3D helpers             |

---

## Design System Quick Reference

### Colors
```
Background:  #0a1628 (dark), #0d1f35 (card), #132743 (section)
Accent:      #00d4aa (teal), #0ea5e9 (blue)
Status:      #22c55e (success), #f59e0b (warning), #ef4444 (error), #3b82f6 (info)
Text:        #ffffff (primary), #94a3b8 (secondary), #64748b (muted)
```

### Typography (for 55" display)
```
Display Large: 72px - Time, main numbers
Display:       48px - Date, section headers
Heading:       32px - Card titles
Body Large:    24px - Important body text
Body:          20px - Regular body text
Label:         16px - Labels, metadata
```

### Dashboard Layout (Top to Bottom)
```
Header:        ~8%  height
Personal Info: ~12% height
Projects:      ~25% height
LinkedIn Feed: ~25% height
3D Map View:   ~30% height
```
