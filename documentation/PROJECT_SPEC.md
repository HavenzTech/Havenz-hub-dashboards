# Sunny's Dashboard - Project Specification

## Overview

A Next.js dashboard application designed for display on a **55-inch Samsung screen in portrait orientation** (2160×3840 pixels). The app displays personal/company information, projects, LinkedIn posts, and a 3D visualization.

---

## Tech Stack

| Technology        | Purpose                |
| ----------------- | ---------------------- |
| Next.js 14+       | Framework (App Router) |
| TypeScript        | Type safety            |
| Tailwind CSS      | Styling                |
| React Three Fiber | 3D visualization       |
| @react-three/drei | 3D helpers             |

---

## Display Specifications

```
Screen: 55" Samsung (Portrait Mode)
Resolution: 2160 × 3840 pixels (4K rotated)
Aspect Ratio: 9:16 (portrait)
Pixel Density: ~80 PPI
Viewing Distance: ~6-10 feet typical
```

### Sizing Guidelines

- Use `vh` and `vw` units for major layout sections
- Minimum touch target: N/A (display only, no touch)
- Font sizes should be large for readability at distance:
  - Headers: 48-72px (3rem - 4.5rem)
  - Body text: 24-32px (1.5rem - 2rem)
  - Labels: 18-24px (1.125rem - 1.5rem)
- High contrast for visibility

---

## Design System

### Colors

```css
/* Background */
--bg-primary: #0a1628; /* Deep navy - main background */
--bg-secondary: #0d1f35; /* Slightly lighter - cards */
--bg-tertiary: #132743; /* Card backgrounds, sections */

/* Brand / Accent */
--accent-primary: #00d4aa; /* Teal/cyan - primary accent */
--accent-secondary: #0ea5e9; /* Blue - secondary accent */
--accent-gradient: linear-gradient(135deg, #00d4aa 0%, #0ea5e9 100%);

/* Status Colors */
--status-success: #22c55e; /* Green - completed/positive */
--status-warning: #f59e0b; /* Orange - in progress */
--status-error: #ef4444; /* Red - on hold/negative */
--status-info: #3b82f6; /* Blue - informational */

/* Text */
--text-primary: #ffffff; /* White - headings */
--text-secondary: #94a3b8; /* Slate - body text */
--text-muted: #64748b; /* Muted - labels */
```

### Tailwind Config Extension

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0a1628",
          card: "#0d1f35",
          section: "#132743",
          accent: "#00d4aa",
          "accent-blue": "#0ea5e9",
        },
        status: {
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-lg": ["4.5rem", { lineHeight: "1.1" }],
        display: ["3rem", { lineHeight: "1.2" }],
        heading: ["2rem", { lineHeight: "1.3" }],
        "body-lg": ["1.5rem", { lineHeight: "1.5" }],
        body: ["1.25rem", { lineHeight: "1.5" }],
        label: ["1rem", { lineHeight: "1.4" }],
      },
    },
  },
};
```

### Typography Scale (for 55" display)

| Element       | Size | Tailwind Class    | Usage                 |
| ------------- | ---- | ----------------- | --------------------- |
| Display Large | 72px | `text-display-lg` | Time, main numbers    |
| Display       | 48px | `text-display`    | Date, section headers |
| Heading       | 32px | `text-heading`    | Card titles           |
| Body Large    | 24px | `text-body-lg`    | Important body text   |
| Body          | 20px | `text-body`       | Regular body text     |
| Label         | 16px | `text-label`      | Labels, metadata      |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts, global styles
│   ├── page.tsx                # Home - redirects to main dashboard
│   ├── globals.css             # Global styles + Tailwind
│   │
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout (shared header)
│   │   ├── page.tsx            # Main dashboard (Screen 1)
│   │   └── [future-screen]/    # Additional screens
│   │       └── page.tsx
│   │
│   └── api/                    # API routes (if needed)
│       ├── weather/
│       │   └── route.ts
│       ├── linkedin/
│       │   └── route.ts
│       └── projects/
│           └── route.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Top header (logo, date, time, temp)
│   │   ├── Section.tsx         # Reusable section wrapper
│   │   └── Container.tsx       # Main container component
│   │
│   ├── ui/
│   │   ├── Card.tsx            # Base card component
│   │   ├── StatCircle.tsx      # Circular stat display
│   │   ├── ProgressBar.tsx     # Horizontal progress bar
│   │   ├── StatusBadge.tsx     # Status indicator badge
│   │   └── SectionTitle.tsx    # Section heading component
│   │
│   ├── widgets/
│   │   ├── DateTimeWidget.tsx  # Live date/time display
│   │   ├── TemperatureWidget.tsx
│   │   ├── PersonalInfo.tsx    # Name, age, personal details
│   │   ├── CompanyInfo.tsx     # Company branding section
│   │   ├── ProjectCard.tsx     # Individual project display
│   │   ├── ProjectsGrid.tsx    # Grid of project cards
│   │   ├── LinkedInFeed.tsx    # LinkedIn posts display
│   │   └── LinkedInPost.tsx    # Single LinkedIn post
│   │
│   └── three/
│       ├── Scene.tsx           # Main 3D scene wrapper
│       ├── HeatPlantModel.tsx  # 3D heat plant visualization
│       └── RotatingCamera.tsx  # Auto-rotating camera controller
│
├── hooks/
│   ├── useCurrentTime.ts       # Live clock hook
│   ├── useWeather.ts           # Weather data fetching
│   ├── useLinkedIn.ts          # LinkedIn data fetching
│   └── useProjects.ts          # Projects data fetching
│
├── lib/
│   ├── api.ts                  # API helper functions
│   ├── utils.ts                # General utilities
│   └── constants.ts            # App constants
│
├── types/
│   ├── index.ts                # Shared types
│   ├── project.ts              # Project types
│   ├── linkedin.ts             # LinkedIn types
│   └── weather.ts              # Weather types
│
└── styles/
    └── fonts.ts                # Font configuration
```

---

## Screen 1: Main Dashboard (MVP)

**Route:** `/dashboard`

### Layout (Top to Bottom)

```
┌─────────────────────────────────────┐
│            HEADER                   │  ~8% height
│  Logo | Company | Date/Time/Temp    │
├─────────────────────────────────────┤
│                                     │
│         PERSONAL INFO               │  ~12% height
│    Name, Age, Title, Details        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│           PROJECTS                  │  ~25% height
│    Grid of project cards            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         LINKEDIN FEED               │  ~25% height
│    Recent posts carousel            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│          3D MAP VIEW                │  ~30% height
│    Heat plant visualization         │
│    (slowly rotating)                │
│                                     │
└─────────────────────────────────────┘
```

### Section Specifications

#### 1. Header Component

```typescript
// components/layout/Header.tsx

interface HeaderProps {
  companyName: string;
  companyUrl?: string;
  logoSrc: string;
}

// Features:
// - Company logo (left)
// - Company name
// - Live date (formatted: "MARCH 08, 2023")
// - Live time (formatted: "10:18:36 AM") - updates every second
// - Current temperature (from weather API)
```

#### 2. Personal Info Section

```typescript
// components/widgets/PersonalInfo.tsx

interface PersonalInfoProps {
  name: string;
  age: number;
  title: string;
  company: string;
  details: {
    label: string;
    value: string;
  }[];
  avatarSrc?: string;
}

// Layout: Card with avatar on left, info on right
// Style: Same card style as reference designs
```

#### 3. Projects Section

```typescript
// components/widgets/ProjectCard.tsx

interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "completed" | "in-progress" | "on-hold" | "cancelled";
  admin: string;
  resource: string;
  progress: number; // 0-100
  hoursLogged: string;
}

// Display: 2-column grid
// Max visible: 4 projects (2x2)
// Each card shows: name, dates, status badge, progress bar
```

#### 4. LinkedIn Feed Section

```typescript
// components/widgets/LinkedInFeed.tsx

interface LinkedInPost {
  id: string;
  author: {
    name: string;
    title: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

// Display: Horizontal scrolling cards or 2-column layout
// Auto-rotate through posts every 10 seconds
// Show 2-3 posts at a time
```

#### 5. 3D Heat Plant Map

```typescript
// components/three/HeatPlantModel.tsx

// Features:
// - Simple 3D representation of heat/power plant
// - Buildings as geometric shapes (boxes, cylinders for towers)
// - Heat visualization (particles or glow effects)
// - Slow auto-rotation (0.1-0.2 rad/s)
// - Ambient lighting + directional light
// - Dark background matching app theme

// Camera:
// - Perspective camera
// - OrbitControls with autoRotate enabled
// - Positioned for overview angle
```

---

## Screen 2: [Future Reference Template]

**Route:** `/dashboard/detail`

### Layout Structure

```
┌─────────────────────────────────────┐
│            HEADER                   │  (same as Screen 1)
├─────────────────────────────────────┤
│                                     │
│         MAIN CONTENT                │
│    (Define based on needs)          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│       SECONDARY CONTENT             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         FOOTER/WIDGETS              │
│                                     │
└─────────────────────────────────────┘
```

Use the same component library and design system. Simply compose different widgets.

---

## Component Implementation Guidelines

### Card Component Base

```typescript
// components/ui/Card.tsx

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "gradient";
  padding?: "sm" | "md" | "lg";
}

// Base styles:
// - Background: bg-brand-card
// - Border: border border-white/10
// - Border radius: rounded-xl
// - Padding: p-6 (default)
```

### StatCircle Component

```typescript
// components/ui/StatCircle.tsx

interface StatCircleProps {
  value: number | string;
  label: string;
  color?: "teal" | "green" | "blue" | "orange";
  size?: "sm" | "md" | "lg";
  prefix?: "+" | "-";
}

// Use SVG circle with stroke-dasharray for progress
// Animate on mount
```

### StatusBadge Component

```typescript
// components/ui/StatusBadge.tsx

type Status = "completed" | "in-progress" | "on-hold" | "cancelled";

interface StatusBadgeProps {
  status: Status;
}

// Color mapping:
// completed: text-status-success
// in-progress: text-status-warning
// on-hold: text-status-error
// cancelled: text-status-error (dimmed)
```

---

## Data Fetching Strategy

### Server Components (Default)

Use for initial page load data:

```typescript
// app/dashboard/page.tsx

async function DashboardPage() {
  const [projects, linkedInPosts] = await Promise.all([
    fetch(`${API_URL}/projects`).then((res) => res.json()),
    fetch(`${API_URL}/linkedin`).then((res) => res.json()),
  ]);

  return <Dashboard projects={projects} linkedInPosts={linkedInPosts} />;
}
```

### Client Components (Where Needed)

Use `"use client"` for:

- `DateTimeWidget` - needs `setInterval` for live updates
- `TemperatureWidget` - periodic refresh
- `Scene` (Three.js) - requires client-side rendering
- Any component with `useState`, `useEffect`, event handlers

### API Routes

```typescript
// app/api/weather/route.ts

export async function GET() {
  // Fetch from weather API
  // Cache response for 5-10 minutes
  return Response.json({ temp: 20, unit: "C" });
}

// app/api/linkedin/route.ts

export async function GET() {
  // Fetch from LinkedIn API
  // Handle authentication
  return Response.json({ posts: [] });
}
```

---

## Performance Considerations

### For 55" Display

1. **No lazy loading needed** - Everything visible at once
2. **Preload fonts** - Use `next/font` for optimal loading
3. **Optimize 3D scene**:
   - Low poly models
   - Limit lights (1-2 max)
   - Use `frameloop="demand"` if not animating constantly
4. **Image optimization** - Use `next/image` with priority for above-fold
5. **Data refresh** - Use `revalidate` or polling for live data

### Refresh Strategy

```typescript
// For live data updates without full page refresh

// Option 1: Revalidate
export const revalidate = 60; // Revalidate every 60 seconds

// Option 2: Client-side polling (for widgets)
useEffect(() => {
  const interval = setInterval(fetchData, 30000);
  return () => clearInterval(interval);
}, []);
```

---

## Environment Variables

```env
# .env.local

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Weather API
WEATHER_API_KEY=your_key_here
WEATHER_LOCATION=your_city

# LinkedIn API
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_secret
LINKEDIN_ACCESS_TOKEN=your_token

# Optional: External APIs
NEXT_PUBLIC_COMPANY_NAME="Sunny's Company"
```

---

## Getting Started

### 1. Create Project

```bash
npx create-next-app@latest sunnys-dashboard --typescript --tailwind --app --src-dir
cd sunnys-dashboard
```

### 2. Install Dependencies

```bash
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```

### 3. Configure Tailwind

Extend `tailwind.config.ts` with the design system colors and typography defined above.

### 4. Build Components

Start with base UI components, then build widgets, then compose pages.

**Recommended order:**

1. `Card`, `StatusBadge`, `SectionTitle`
2. `Header`, `DateTimeWidget`
3. `PersonalInfo`, `ProjectCard`
4. `LinkedInFeed`, `LinkedInPost`
5. `Scene`, `HeatPlantModel`
6. Compose `DashboardPage`

---

## Testing on 55" Display

### Development Preview

```css
/* Add to globals.css for development preview */

@media (min-height: 2000px) {
  /* Styles for actual display */
}

/* Dev mode: simulate portrait 4K */
.dev-preview {
  width: 1080px; /* Half of 2160 */
  height: 1920px; /* Half of 3840 */
  transform: scale(0.5);
  transform-origin: top left;
}
```

### Browser Setup

- Use Chrome DevTools device emulation
- Custom device: 2160 × 3840
- Or scale down: 1080 × 1920 at 50%

---

## Accessibility Notes

Even though this is a display-only screen:

- Maintain good color contrast (WCAG AA minimum)
- Use semantic HTML
- Ensure text is readable at viewing distance
- Avoid rapidly flashing content

---

## Future Enhancements

- [ ] Add screen navigation (if multiple dashboards)
- [ ] WebSocket for real-time data
- [ ] Admin panel to configure displayed content
- [ ] Multiple themes/layouts
- [ ] Scheduling (different screens at different times)
