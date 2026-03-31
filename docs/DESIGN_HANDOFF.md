# HavenZ Hub Dashboards - Design Handoff Document

> **Purpose:** Everything required to design and mockup all 13 facility dashboard screens for a 55" display.
> **Generated:** 2026-03-31

---

## 1. Design Tokens / Theme

### 1.1 Color Palette

#### Background Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a1628` | Page background, deepest layer |
| `--bg-secondary` | `#0d1f35` | Card backgrounds, panels |
| `--bg-tertiary` | `#132743` | Elevated sections, section backgrounds |
| `brand-dark` | `#0a1628` | Tailwind: `bg-brand-dark` |
| `brand-card` | `#0a1829` | Tailwind: `bg-brand-card` |
| `brand-section` | `#132743` | Tailwind: `bg-brand-section` |

#### Accent / Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-primary` | `#00d4aa` | Primary accent (teal/turquoise), CTAs, highlights, primary KPIs |
| `--accent-secondary` | `#0ea5e9` | Secondary accent (sky blue), secondary charts, info elements |

#### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--status-success` | `#22c55e` | Online, healthy, running, granted |
| `--status-warning` | `#f59e0b` | Warnings, due-soon, at-risk, motion |
| `--status-error` | `#ef4444` | Critical, fault, denied, overdue |
| `--status-info` | `#3b82f6` | Informational alerts |

#### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#ffffff` | Primary text, headings, values |
| `--text-secondary` | `#94a3b8` | Secondary text, descriptions |
| `--text-muted` | `#64748b` | Labels, timestamps, tertiary text |

#### Extended Colors Used in Templates
| Color | Hex | Usage |
|-------|-----|-------|
| Green 400 | `#4ade80` | Running status, export, granted |
| Green 500 | `#22c55e` | LIVE indicator dot, online dots |
| Yellow 400 | `#facc15` | Warnings, overdue, motion detect |
| Yellow 500 | `#eab308` | Warning borders/backgrounds |
| Red 400 | `#f87171` | Critical alerts, fault, denied |
| Red 500 | `#ef4444` | Error dots, offline dots |
| Orange 400 | `#fb923c` | Import, gas cost |
| Blue 400 | `#60a5fa` | Info alerts, regulatory |
| Purple 400 | `#c084fc` | AI predicted, regulatory |
| Slate 400 | `#94a3b8` | Cloudy weather icon |

### 1.2 Typography

#### Font Families
| Font | Source | CSS Variable | Usage |
|------|--------|-------------|-------|
| **Geist** | `next/font/google` | `--font-geist-sans` | All UI text (sans-serif) |
| **Geist Mono** | `next/font/google` | `--font-geist-mono` | Numeric values, timestamps, codes |

#### Type Scale (optimized for 55" display)
| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `.text-display-lg` | `4.5rem` (72px) | 1.1 | Hero KPI values (rare) |
| `.text-display` | `3rem` (48px) | 1.2 | Large featured values |
| `.text-heading` | `2rem` (32px) | 1.3 | Section headings |
| `.text-body-lg` | `1.5rem` (24px) | 1.5 | Large body text |
| `.text-body` | `1.25rem` (20px) | 1.5 | Standard body text |
| `.text-label` | `1rem` (16px) | 1.4 | Labels, small text |

#### Tailwind Text Classes Used in Templates
| Tailwind Class | Approx Size | Used For |
|----------------|-------------|----------|
| `text-6xl` | 3.75rem (60px) | Hero KPI numbers (pool price, revenue, charge %) |
| `text-5xl` | 3rem (48px) | Primary metric values, weather temp |
| `text-4xl` | 2.25rem (36px) | Metric card values |
| `text-3xl` | 1.875rem (30px) | Stat bar numbers, secondary KPIs |
| `text-2xl` | 1.5rem (24px) | Template header title, consumption values |
| `text-xl` | 1.25rem (20px) | Engine status labels, status card text |
| `text-lg` | 1.125rem (18px) | Camera labels, fuel units, metric units |
| `text-base` | 1rem (16px) | Alert messages, task titles |
| `text-sm` | 0.875rem (14px) | Secondary info, personnel names |
| `text-xs` | 0.75rem (12px) | Section labels, status chips, timestamps |
| `text-[10px]` | 10px | Micro labels (priority badges, TBD badges) |
| `text-[9px]` | 9px | Tiny badges ("DATA SOURCE TBD", "2D LAYOUT") |

### 1.3 Spacing

Tailwind v4 default spacing scale is used. Key values from templates:

| Token | Value | Common Usage |
|-------|-------|-------------|
| `p-8` | 2rem (32px) | Template content padding (all screens) |
| `gap-5` | 1.25rem (20px) | Primary section gap |
| `gap-6` | 1.5rem (24px) | Larger section gap (some screens) |
| `gap-4` | 1rem (16px) | Grid card gap |
| `gap-3` | 0.75rem (12px) | Row item gap |
| `gap-2` | 0.5rem (8px) | Inline element gap |
| `px-6 py-4` | 24px / 16px | Standard row padding |
| `px-8 py-5` | 32px / 20px | Hero bar padding |
| `p-6` / `p-7` | 24px / 28px | Card internal padding |

### 1.4 Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `0.625rem` (10px) | Base radius |
| `rounded-xl` | 0.75rem (12px) | Metric cards, alert rows |
| `rounded-2xl` | 1rem (16px) | Major cards, camera feeds, hero sections |
| `rounded-3xl` | 1.5rem (24px) | Placeholder icon area |
| `rounded-full` | 50% | Status dots, avatar circles, badges |
| `rounded-lg` | 0.5rem (8px) | Task rows, small cards |

### 1.5 Shadows & Glow Effects

#### Card Shadows
```css
/* Standard card inset highlight */
box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);

/* Slightly more visible inset */
box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);

/* Featured/primary card glow */
box-shadow: 0 0 25px rgba(0, 212, 170, 0.08), inset 0 1px 0 rgba(255,255,255,0.05);
box-shadow: 0 0 30px rgba(0, 212, 170, 0.06), inset 0 1px 0 rgba(255,255,255,0.05);

/* Revenue/green featured card */
box-shadow: 0 0 30px rgba(34, 197, 94, 0.06), inset 0 1px 0 rgba(255,255,255,0.05);

/* Blue featured card (weather) */
box-shadow: 0 0 25px rgba(59, 130, 246, 0.06), inset 0 1px 0 rgba(255,255,255,0.05);
```

#### Status Dot Glows
```css
/* Green (online/running) */
box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);    /* engine pulse */

/* Red (offline/fault) */
box-shadow: 0 0 6px rgba(239, 68, 68, 0.5);
box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);

/* Yellow (warning) */
box-shadow: 0 0 4px rgba(245, 158, 11, 0.4);

/* Teal (accent primary) */
box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);     /* pulse-glow keyframe */
```

#### Alert Row Shadows
```css
/* Critical alert */
box-shadow: 0 0 15px rgba(239, 68, 68, 0.08);
box-shadow: 0 0 12px rgba(239, 68, 68, 0.06);     /* external intel */

/* Warning alert */
box-shadow: 0 0 12px rgba(245, 158, 11, 0.05);
box-shadow: 0 0 10px rgba(245, 158, 11, 0.04);
```

### 1.6 Borders
```css
/* Standard card border */
border: 1px solid rgba(255, 255, 255, 0.1);   /* border-white/10 */

/* Subtle divider */
border: 1px solid rgba(255, 255, 255, 0.05);   /* border-white/5 */

/* Featured/accent border */
border: 1px solid;  /* border-accent-primary/30, border-green-500/30, etc. */

/* Status borders */
border: 2px solid;  /* Engine status cards, audit status card */
```

### 1.7 Background Patterns

#### Card Gradient
```css
/* Standard card */
background: linear-gradient(to bottom, rgba(255,255,255,0.04), transparent);
/* Tailwind: bg-gradient-to-b from-white/[0.04] to-transparent */

/* Subtle card */
background: linear-gradient(to bottom, rgba(255,255,255,0.03), transparent);
background: linear-gradient(to bottom, rgba(255,255,255,0.02), transparent);

/* Flat surface */
background: rgba(255,255,255,0.02);  /* bg-white/[0.02] */
```

#### Header Bar Gradient
```css
background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);
```

#### Grid Lines (Facility Layout)
```css
background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
background-size: 40px 40px;
opacity: 0.03;
```

### 1.8 CSS Utility Classes

```css
/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, #00d4aa 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Gradient border */
.border-gradient {
  border: 1px solid transparent;
  background: linear-gradient(#0d1f35, #0d1f35) padding-box,
              linear-gradient(135deg, #00d4aa 0%, #0ea5e9 100%) border-box;
}

/* Glass effect */
.glass {
  background: rgba(13, 31, 53, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Pulse glow animation */
.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 170, 0.3); }
  50%      { box-shadow: 0 0 40px rgba(0, 212, 170, 0.6); }
}
```

### 1.9 Global Styles

```css
html, body {
  background: #0a1628;
  color: #ffffff;
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
  height: 100vh;
  overflow: hidden;
}

/* Scrollbars hidden globally */
::-webkit-scrollbar { display: none; }
* { -ms-overflow-style: none; scrollbar-width: none; }
```

### 1.10 Animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| `pulse` (CSS native) | 2s infinite | Running engine dots, LIVE indicator |
| `pulse-glow` (custom) | 2s infinite | Teal glow pulsing |
| `flowDash` (SVG) | 0.6-1.2s linear infinite | Energy flow animated dashes |
| `animate-spin` | continuous | Loading spinner |
| `animate-pulse` | continuous | Motion detection badge, in-progress task icon |
| `BlurFade` entrance | 400-600ms | Staggered card entrance (per card delay 70-150ms) |

---

## 2. Component Inventory

### 2.1 Template Shell (Shared Wrapper)

**`TemplateShell`** - Wraps every facility screen.

| Element | Details |
|---------|---------|
| Background | `DarkVeil` WebGL shader at 20% opacity |
| Header bar height | Auto (~64px): `px-8 py-4` |
| Header left | Teal accent bar (1x8 rounded pill) + template label (`text-2xl font-bold`) + screen ID badge |
| Header right | Clock (`text-xl font-mono`) + date (`text-xs`) + LIVE indicator (green pulsing dot + "LIVE" text) |
| Content area | `flex-1 overflow-hidden` — fills remaining height |
| Root container | `h-screen w-screen overflow-hidden bg-brand-background` (from layout) |

### 2.2 Reusable UI Components

#### BlurFade
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delay` | number | 0 | Entry animation delay (ms) |
| `duration` | number | 500 | Animation duration (ms) |
| `blur` | string | "6px" | Starting blur amount |
| `yOffset` | number | 6 | Starting Y offset (px) |
| `className` | string | - | Pass-through class |

Used on every card/section for staggered entrance animations.

#### Card
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "bordered" \| "gradient"` | "default" | Visual style |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | "md" | Internal padding |

#### StatusBadge
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | ProjectStatus | required | Status to display |
| `size` | `"xxs" \| "xs" \| "sm" \| "md" \| "lg"` | "sm" | Badge size |
| `showDot` | boolean | true | Show colored dot |

#### ProgressBar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | number (0-100) | required | Fill percentage |
| `size` | `"sm" \| "md" \| "lg"` | "md" | Bar height |
| `color` | `"teal" \| "blue" \| "green" \| "orange"` | "teal" | Fill color |
| `showLabel` | boolean | false | Show % text |

#### StatCircle
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number \| string | required | Center value |
| `label` | string | required | Label below value |
| `color` | `"teal" \| "green" \| "blue" \| "orange"` | "teal" | Ring color |
| `size` | `"sm" \| "md" \| "lg"` | "md" | Circle diameter |
| `progress` | number (0-100) | - | SVG progress ring |

#### SectionTitle
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `subtitle` | string | - | Smaller text below |
| `action` | ReactNode | - | Right-side action area |
| `animated` | boolean | false | BlurText entrance |

#### DarkVeil (Background)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | number | 1.0 | Animation speed multiplier |
| `hueShift` | number | 0 | Color hue rotation |
| `noiseIntensity` | number | - | Noise overlay intensity |

WebGL-based procedural animated background using OGL library with CPPN shader.

### 2.3 Template-Local Sub-Components (Patterns)

These are defined locally in each template but follow consistent patterns:

#### SectionLabel
```
<h2> — text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70 mb-4
```
Used as section header in every screen.

#### MetricCard
Glass card with: icon (top-left, muted color) + label (text-xs text-muted) + large value (text-3xl or text-4xl font-bold font-mono) + unit.
Status-aware coloring: normal/warning/critical/inactive.

#### StatusCard
Like MetricCard but shows: icon + label + colored status dot + status label text (e.g., "CLOSED", "NORMAL").

#### FuelCard
Like MetricCard but without status logic. Optional accent coloring.

#### CameraCard
Rounded card with: dark gradient placeholder area + Camera icon + online/offline badge (top-right, backdrop-blur pill) + camera name/location footer.

#### AlertRow
Full-width rounded row: severity icon (left) + type badge + message + confidence % + time-ago (right). Background tint based on severity.

#### KPICard
Larger metric card with: icon + trend arrow (top row) + large value + unit + label. `isPrimary` flag adds teal border glow.

#### HeroStat
Rounded-2xl card: icon (top) + optional badge (top-right) + large value + unit + label. Used in Campus Health.

#### TrendChart (Recharts wrapper)
AreaChart inside a bordered card: gradient fill, monospace axis labels, custom tooltip. Configurable color and gradient ID.

#### SignalRow
Alert-style row with: type icon + message + "ACTIONABLE" badge (if applicable) + timestamp.

#### TechBadge
Small avatar circle (initials) + status dot below. Used in Ops+Maintenance staff bar.

#### PersonRow
Row: avatar initials circle + name + role + zone badge + method icon (face/badge/pin) + entry time.

#### DoorRow
Row: status dot (locked/unlocked/forced) + door name + zone + status label + last access time.

#### AccessRow
Row: granted checkmark or denied X + action text + person name + timestamp.

### 2.4 Chart Library

**Recharts** — used for all chart visualizations.

Components used:
- `AreaChart`, `Area` (gradient fill below line)
- `XAxis`, `YAxis` (monospace tick labels, no axis line)
- `CartesianGrid` (dashed, very faint `rgba(255,255,255,0.05)`)
- `Tooltip` (dark themed: `rgba(10,22,40,0.95)` background)
- `ReferenceLine` (average price line in Power Market)
- `ResponsiveContainer` (100% width/height)

Chart color pairs:
- Teal line: `#00d4aa` (24h generation, 1d price forecast)
- Blue line: `#0ea5e9` (7d generation, 7d price forecast)
- Green line: `#22c55e` (24h revenue)

### 2.5 Shadcn/UI Components Available
The project includes a full Shadcn/UI library (56+ components). Key ones potentially relevant to facility screens: `badge`, `button`, `dialog`, `dropdown-menu`, `progress`, `skeleton`, `table`, `tabs`, `tooltip`, `separator`.

---

## 3. Layout Structure

### 3.1 Display Target
```
Device:     55" Samsung display (portrait orientation)
Resolution: 2160 x 3840 px (4K portrait)
Mode:       Kiosk / fullscreen, no browser chrome
Scrolling:  NONE — all content must fit viewport
```

### 3.2 Facility Display Layout

```
app/facility/display/[screenId]/layout.tsx
```

```
+-------------------------------+
|  h-screen w-screen            |
|  overflow-hidden              |
|  bg-brand-background (#0a1628)|
|                               |
|  +---------------------------+|
|  |  TemplateShell            ||
|  |  +-----------------------+||
|  |  | HEADER BAR (~64px)    |||
|  |  | px-8 py-4             |||
|  |  | border-b white/10     |||
|  |  +-----------------------+||
|  |  | CONTENT (flex-1)      |||
|  |  | overflow-hidden       |||
|  |  | p-8 (32px all sides)  |||
|  |  |                       |||
|  |  | flex-col gap-5 or 6   |||
|  |  |                       |||
|  |  +-----------------------+||
|  +---------------------------+|
+-------------------------------+
```

### 3.3 Content Layout Patterns

All templates use `flex-col` with `flex-[n]` proportional sizing. No CSS grid at the page level. Sections use `flex-[n]` where n represents relative weight:

#### Pattern A: Hero Bar + Sections (most screens)
```
[Hero/Stats Bar]     — flex-shrink-0 (auto height)
[Section 1]          — flex-[3.5]
[Section 2]          — flex-[2.5]
[Section 3]          — flex-[2]
```

#### Pattern B: Equal Thirds (Grid Interconnection)
```
[BESS Battery]       — flex-1
[Substation]         — flex-1
[Grid Interconnection] — flex-1
```

#### Pattern C: Chart-Heavy (Power Platform, Revenue)
```
[KPI Grid]           — flex-[3]
[24h Chart]          — flex-[3.2]
[7d Chart]           — flex-[3.2]
```

### 3.4 Grid Systems Within Sections

| Pattern | Usage |
|---------|-------|
| `grid-cols-2` | Engine status cards, cameras (2x2), personnel + doors side-by-side |
| `grid-cols-3` | KPI cards (3x2), revenue hero, fuel cards, metric grids |
| `grid-cols-4` | Hero stats (Campus Health), substation metrics, market hero |
| `grid-cols-5` | HVAC zone cards |
| `grid-cols-6` | Weather (1 current + 5 forecast) |
| `grid-cols-4 grid-rows-2` | Camera grid (Security Command — 8 cameras) |
| `grid-cols-3 grid-rows-2` | Performance metrics, KPI grid |

### 3.5 Breakpoints / Responsiveness

**None.** Screens are designed for a fixed 2160x3840 portrait display. There are no responsive breakpoints in the facility templates. All sizing is flex-proportional.

---

## 4. Data Shapes

### 4.1 Screen Configuration

```typescript
type ScreenTemplate =
  | "engine-room" | "engine-room-visual" | "power-platform"
  | "grid-interconnection" | "energy-flow" | "campus-health"
  | "operations-maintenance" | "power-market" | "revenue-margin"
  | "esg-compliance" | "security-command" | "access-personnel"
  | "external-intel" | "facility-overview" | "alerts-board"
  | "equipment-monitor" | "heat-plant-overview" | "environmental"
  | "security" | "access-control" | "occupancy" | "maintenance"
  | "metrics-dashboard" | "power-energy" | "custom";

interface ScreenConfig {
  screenId: string;
  template: ScreenTemplate;
  label: string;
  params: Record<string, string>;
  autoRotate: { enabled: boolean; templates: ScreenTemplate[]; intervalMs: number };
  refreshIntervalMs: number;
  updatedAt: string;
}

interface TemplateProps {
  params: Record<string, string>;
  refreshIntervalMs: number;
  screenId: string;
}
```

### 4.2 Screen 1 — Engine Room

```typescript
type EngineStatus = "running" | "standby" | "fault" | "off";

interface MockEngine {
  id: string;
  name: string;
  status: EngineStatus;
  metrics: {
    rpm: number;
    temperature: number;      // °C
    oilPressure: number;      // PSI
    vibration: number;        // mm/s
    runtimeHours: number;
    loadFactor: number;       // %
  };
  fuel: {
    consumption: number;      // m³/hr
    efficiency: number;       // %
    heatRecovery: number;     // %
  };
}

interface MockCamera {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline";
}

interface MockPredictiveAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  type: string;
  message: string;
  engineId: string;
  confidence: number;         // %
  timestamp: string;          // ISO
}
```

### 4.3 Screen 2 — Engine Room Visual

```typescript
interface MockMaintenanceEntry {
  engineId: string;
  engineName: string;
  lastService: string;        // ISO date
  nextService: string;        // ISO date
  assignedTechnician: string;
  status: "on-schedule" | "due-soon" | "overdue";
  notes?: string;
}

interface MockHeatZone {
  id: string;
  name: string;
  temperature: number;        // °C
  status: "normal" | "warm" | "hot";
  x: number; y: number;       // % position
  width: number; height: number; // % size
}

interface MockAirflow {
  id: string;
  from: string; to: string;
  direction: "up" | "down" | "left" | "right";
  strength: "low" | "medium" | "high";
}
```

### 4.4 Screen 3 — Power Platform

```typescript
interface MockKPI {
  value: number;
  unit: string;
  label: string;
  trend: "up" | "down" | "stable";
  unknown?: boolean;           // shows "TBD" badge
}

interface MockTrendPoint {
  time: string;
  value: number;
}

// KPI keys: totalGeneration, systemLoad, heatRecovery,
//           systemEfficiency, fuelInput, operatingMargin
```

### 4.5 Screen 4 — Grid Interconnection

```typescript
type BreakerStatus = "closed" | "open" | "tripped";
type LineStatus = "energized" | "de-energized" | "fault";

// Battery shape
{ chargeLevel: number; chargeRate: number; dischargeRate: number;
  availableMW: number; health: number; cycleCount: number;
  temperature: number; thermalStatus: "normal"|"warm"|"hot";
  capacity: number; }

// Substation shape
{ transformerLoad: number; voltageHV: number; voltageLV: number;
  currentHV: number; currentLV: number; powerFactor: number;
  breakerStatus: BreakerStatus; switchgearStatus: "normal"|"alarm"|"fault"; }

// Grid shape
{ exportMW: number; importMW: number; netFlow: number;
  gridFrequency: number; gridVoltage: number;
  lineStatus: LineStatus; tieLineStatus: BreakerStatus; }
```

### 4.6 Screen 5 — Energy Flow

```typescript
type NodeStatus = "normal" | "high-load" | "alert" | "offline" | "future";

// Node connections defined as:
{ from: string; to: string; power: number; status: NodeStatus }

// Nodes: power-plant, substation, battery, grid,
//        data-center, vertical-farm, ev-charging, future-1, campus

// Summary shape
{ totalGeneration: number; totalConsumption: number;
  gridExport: number; batteryCharge: number; surplus: number; }
```

### 4.7 Screen 6 — Campus Health

```typescript
interface CampusSystemStatus {
  name: string;
  status: "healthy" | "warning" | "critical" | "offline";
  value: number | string;
  unit: string;
  detail?: string;
}

interface TenantUsage {
  building: string;
  consumption: number;         // kW
  percentage: number;          // %
  trend: "up" | "down" | "stable";
}

// HVAC zone shape
{ name: string; temperature: number; humidity: number;
  status: string; coolingLoad: number; }
```

### 4.8 Screen 7 — Operations + Maintenance

```typescript
interface MockTechnician {
  id: string; name: string; role: string;
  zone: string; status: "on-site" | "on-break" | "off-site";
}

interface MockTask {
  id: string; title: string; assignee: string; zone: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "in-progress" | "pending" | "overdue" | "completed";
  dueDate: string;
}

interface MockSparePart {
  name: string; category: string;
  inStock: number; minRequired: number;
  status: "ok" | "low" | "critical";
}

interface MockAlert {
  id: string; severity: "critical" | "warning" | "info";
  message: string; source: string;
  timestamp: string; resolved: boolean;
}

// Maintenance window shape
{ label: string; date: string; type: "scheduled" | "predictive"; }
```

### 4.9 Screen 8 — Power Market

```typescript
interface MarketSignal {
  id: string;
  type: "export-opportunity" | "peak-demand" | "low-price" | "price-spike";
  message: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
  actionable: boolean;
}

// Top-level data shape
{ poolPrice: number; poolPriceChange: number;     // $/MWh, %
  demandMW: number; demandCapacityMW: number;
  dayAheadAvg: number; volatility: "high"|"moderate"|"low";
  forecast1d: { time: string; price: number }[];
  forecast7d: { time: string; price: number }[];
  signals: MarketSignal[]; }
```

### 4.10 Screen 9 — Revenue & Margin

```typescript
{ revenueToday: number; revenueMonth: number;     // $
  revenueExport: number; gasCost: number;          // $
  costPerMWh: number; marginPerMWh: number;        // $
  marginPercent: number;                           // %
  trend24h: { time: string; value: number }[];
  trend7d: { time: string; value: number }[]; }
```

### 4.11 Screen 10 — ESG & Compliance

```typescript
interface ComplianceDeadline {
  id: string; title: string; dueDate: string;
  status: "on-track" | "at-risk" | "overdue" | "submitted";
  agency: string;
}

interface RegulatoryAlert {
  id: string; message: string;
  severity: "critical" | "warning" | "info";
  date: string;
}

// Emissions shape
{ co2Today: number; co2Month: number;     // tonnes
  co2Reduction: number;                    // % vs baseline
  intensity: number; intensityTarget: number; } // tCO₂/MWh

// auditStatus: "ready" | "issues" | "not-ready"
```

### 4.12 Screen 11 — Security Command

```typescript
interface SecurityCamera {
  id: string; name: string; location: string;
  status: "online" | "offline" | "recording";
  hasMotion: boolean;
  priority: "high" | "normal";
}

interface AIDetection {
  id: string;
  type: "motion" | "vehicle" | "person" | "unusual-activity";
  camera: string; confidence: number;
  timestamp: string;
  severity: "critical" | "warning" | "info";
  description: string;
}
```

### 4.13 Screen 12 — Access & Personnel

```typescript
interface PersonnelOnSite {
  id: string; name: string; role: string; zone: string;
  entryTime: string;
  method: "facial-recognition" | "badge" | "pin";
}

interface DoorStatus {
  id: string; name: string; zone: string;
  status: "locked" | "unlocked" | "forced" | "propped";
  lastAccess: string;
}

// Stats shape
{ totalOnSite: number; entriestoday: number;
  deniedToday: number; doorsUnlocked: number; doorsTotal: number; }

// Access log entry
{ time: string; name: string; action: string; granted: boolean; }
```

### 4.14 Screen 13 — External Intelligence

```typescript
interface ExternalAlert {
  id: string;
  category: "weather" | "grid" | "market" | "regulatory";
  severity: "critical" | "warning" | "info";
  title: string; description: string;
  source: string; timestamp: string;
}

// Weather shape
{ current: { temp: number; condition: string; icon: string;
             wind: number; humidity: number; };
  forecast: { day: string; condition: string;
              high: number; low: number; }[];
  alerts: { title: string; description: string; }[]; }
```

### 4.15 Status Configuration Maps

```typescript
// Shared across multiple screens
ALERT_SEVERITY_CONFIG: Record<"critical"|"warning"|"info",
  { label: string; color: string; bgColor: string }>;

ENGINE_STATUS_CONFIG: Record<EngineStatus,
  { label: string; color: string; bgColor: string; dotColor: string }>;

SYSTEM_STATUS_CONFIG: Record<"healthy"|"warning"|"critical"|"offline",
  { label: string; color: string; dotColor: string; bgColor: string }>;

BREAKER_STATUS_CONFIG: Record<BreakerStatus,
  { label: string; color: string; dotColor: string }>;

LINE_STATUS_CONFIG: Record<LineStatus,
  { label: string; color: string; dotColor: string }>;

NODE_STATUS_COLORS: Record<NodeStatus,
  { fill: string; stroke: string; glow: string; text: string }>;

DOOR_STATUS_CONFIG: Record<"locked"|"unlocked"|"forced"|"propped",
  { label: string; color: string; dotColor: string }>;

TASK_PRIORITY_CONFIG: Record<"critical"|"high"|"medium"|"low",
  { label: string; color: string; bgColor: string }>;

TASK_STATUS_CONFIG: Record<"in-progress"|"pending"|"overdue"|"completed",
  { label: string; color: string }>;

TECH_STATUS_CONFIG: Record<"on-site"|"on-break"|"off-site",
  { label: string; color: string; dotColor: string }>;

MAINTENANCE_STATUS_CONFIG: Record<"on-schedule"|"due-soon"|"overdue",
  { label: string; color: string; bgColor: string }>;

HEAT_ZONE_COLORS: Record<"normal"|"warm"|"hot", string>;
```

---

## 5. Icon Set

### Library: Lucide React (`lucide-react`)

All icons are imported from `lucide-react`. No custom SVG icon files are used for the facility screens.

### Icons by Screen

| Screen | Icons Used |
|--------|-----------|
| **1 - Engine Room** | Activity, Thermometer, Droplets, Vibrate, Clock, Gauge, Fuel, TrendingUp, Flame, Camera, AlertTriangle, Info, CircleAlert, CircleDot |
| **2 - Engine Room Visual** | Camera, Wrench, Calendar, User, Wind, Box, AlertTriangle |
| **3 - Power Platform** | Zap, Gauge, Flame, Fuel, DollarSign, TrendingUp, TrendingDown, Minus, AlertCircle |
| **4 - Grid Interconnection** | Battery, BatteryCharging, Thermometer, Heart, RefreshCw, Zap, Gauge, Cable, ArrowUpRight, ArrowDownLeft, Radio, ShieldCheck, AlertCircle, ToggleRight |
| **5 - Energy Flow** | Factory, BatteryCharging, Zap, Globe, Server, Sprout, Car, Plus, Building2 |
| **6 - Campus Health** | Network, Droplets, Wind, Leaf, Building2, TrendingUp, TrendingDown, Minus, AlertCircle, Thermometer, Wifi, Shield |
| **7 - Ops + Maintenance** | Users, Calendar, ClipboardList, Package, AlertTriangle, CircleAlert, Info, CheckCircle2, Clock, Wrench, BrainCircuit |
| **8 - Power Market** | TrendingUp, TrendingDown, Zap, Gauge, BarChart3, AlertTriangle, ArrowUpRight, Clock, Radio |
| **9 - Revenue & Margin** | DollarSign, TrendingUp, Fuel, ArrowUpRight, CircleDollarSign, PiggyBank |
| **10 - ESG & Compliance** | Leaf, ShieldCheck, Calendar, AlertTriangle, CheckCircle2, Clock, FileCheck, TrendingDown, Factory, Target |
| **11 - Security Command** | Camera, Shield, Eye, Car, User, AlertTriangle, Clock, Radio |
| **12 - Access & Personnel** | UserCheck, Users, DoorOpen, ShieldAlert, ScanFace, CreditCard, KeyRound, Clock, CheckCircle2, XCircle |
| **13 - External Intel** | CloudSnow, Zap, TrendingUp, FileText, AlertTriangle, Info, CircleAlert, Thermometer, Wind, Droplets, Clock, Sun, Cloud, Snowflake |

### Custom SVG
- **ZLogoSVG** — Custom Z-shaped logo with twinkling stars (used in VoiceIndicator, not in facility screens)

---

## 6. Target Display Context

### Confirmed Configuration
| Property | Value |
|----------|-------|
| Display | 55" Samsung, portrait orientation |
| Resolution | 2160 x 3840 (4K portrait) |
| Mode | Kiosk / fullscreen |
| Scrolling | Disabled globally (`overflow: hidden` on html/body) |
| Scrollbars | Hidden via CSS (webkit + Firefox) |
| Font scale | Optimized for distance viewing (base ~20px, values up to 60px) |
| Color scheme | Dark only (no light mode in facility screens) |

### Viewport Assumptions in Code
- `h-screen w-screen` on the layout root
- `overflow-hidden` everywhere — no scroll fallbacks
- All template content uses `flex-col` with proportional `flex-[n]` sizing to fill available height
- No media queries or responsive breakpoints in any template
- Typography is already scaled up for large display (Tailwind `text-6xl` = 60px for hero values)

### Notes for Designers
1. **No responsive design needed** — these are single-target fixed displays
2. **Content must fit** — every section uses flex proportions, no overflow/scroll
3. **Viewing distance** — assume 3-10 meters; minimum text is `text-[9px]` (micro badges) but most readable content is `text-sm` (14px) or larger
4. **Animation budget** — WebGL background shader runs continuously; BlurFade entrance animations fire once on load; pulse/glow animations are CSS-only and lightweight
5. **Auto-rotate** — screens can cycle between templates on a timer (default 30s), so transitions between templates should feel seamless
6. **Camera placeholders** — all camera feeds show placeholder UI ("Feed not connected") — real RTSP streams will replace these

---

## 7. Screen-by-Screen Layout Summary

### Screen 1 — Engine Room
```
[Engine Status]         2-col grid, 2 cards               ~auto
[Performance Metrics]   Per-engine 3x2 metric grid         flex-[3]
[Fuel & Efficiency]     3-col grid (running engines only)  ~auto
[Live Cameras]          2-col grid, 4 camera cards         flex-[2]
[AI Predictive Alerts]  Stacked alert rows                 flex-[1.5]
```

### Screen 2 — Engine Room Visual
```
[Live Camera Feeds]     2x2 grid                           flex-[3.5]
[Facility Layout]       2D schematic (heat + engines)      flex-[3.5]
[Maintenance Schedule]  Stacked entry rows                 flex-[2.5]
```

### Screen 3 — Power Platform
```
[Generation KPIs]       3x2 grid                           flex-[3]
[24h Generation Chart]  Area chart                         flex-[3.2]
[7d Generation Chart]   Area chart                         flex-[3.2]
```

### Screen 4 — Grid Interconnection
```
[Battery (BESS)]        Gauge + 3x2 metrics                flex-1
[Substation]            4x2 metric/status grid             flex-1
[Grid Interconnection]  Flow indicator + 3x2 metrics       flex-1
```

### Screen 5 — Energy Flow
```
[Summary Bar]           5-stat horizontal bar               ~auto
[Flow Diagram]          5-row node layout + SVG lines       flex-1
[Legend]                 Inline legend bar                   ~auto
```

### Screen 6 — Campus Health
```
[Infrastructure]        4 hero stats + 2 status panels     flex-[3]
[HVAC Zones]            5-col zone cards                   flex-[3]
[Energy by Building]    Stacked tenant rows                flex-[3]
```

### Screen 7 — Operations + Maintenance
```
[Staff Hero Bar]        Horizontal stats + avatars          ~auto
[Task Tracker]          Stacked task rows                  flex-[3.5]
[Maintenance + Parts]   2-col side-by-side panels          flex-[2.5]
[System Alerts]         Stacked alert rows                 flex-[2]
```

### Screen 8 — Power Market
```
[Market Hero]           4-col (price featured + stats)      ~auto
[1d Price Forecast]     Area chart                         flex-[2.8]
[7d Price Forecast]     Area chart                         flex-[2.8]
[Trading Signals]       Stacked signal rows                flex-[2.5]
```

### Screen 9 — Revenue & Margin
```
[Revenue Hero]          3-col cards                         ~auto
[Cost Breakdown]        Horizontal stat bar                 ~auto
[24h Revenue Chart]     Area chart                         flex-1
[7d Revenue Chart]      Area chart                         flex-1
```

### Screen 10 — ESG & Compliance
```
[Emissions + Audit]     3-col (2 metric stacks + audit)    flex-[3]
[Compliance Deadlines]  Stacked deadline rows              flex-[3.5]
[Regulatory Alerts]     Stacked alert rows                 flex-[2.5]
```

### Screen 11 — Security Command
```
[Status Bar]            Horizontal stats                    ~auto
[Camera Grid]           4x2 grid (8 cameras)               flex-[5.5]
[AI Detection Feed]     Stacked detection rows             flex-[3.5]
```

### Screen 12 — Access & Personnel
```
[Stats Bar]             Horizontal stats                    ~auto
[Personnel + Doors]     2-col side-by-side panels          flex-[4.2]
[Live Access Feed]      Stacked access rows                flex-[4.5]
```

### Screen 13 — External Intelligence
```
[Weather]               6-col (1 current + 5 forecast)     flex-[3]
                        + weather alert banner
[External Alerts]       Stacked alert rows                 flex-[6.5]
```

---

## 8. File Reference

| Category | Path |
|----------|------|
| Global CSS / Tokens | `app/globals.css` |
| Root Layout | `app/layout.tsx` |
| Facility Display Layout | `app/facility/display/[screenId]/layout.tsx` |
| Screen Page | `app/facility/display/[screenId]/page.tsx` |
| Template Router | `components/facility/TemplateRouter.tsx` |
| Template Shell | `components/facility/templates/TemplateShell.tsx` |
| Debug Overlay | `components/facility/ScreenDebugOverlay.tsx` |
| Templates (13) | `components/facility/templates/{EngineRoom,EngineRoomVisual,PowerPlatform,GridInterconnection,EnergyFlow,CampusHealth,OperationsMaintenance,PowerMarket,RevenueMargin,ESGCompliance,SecurityCommand,AccessPersonnel,ExternalIntel}.tsx` |
| Types | `types/facility.ts`, `types/bms.ts` |
| Constants / Registry | `lib/facility/constants.ts` |
| Mock Data | `lib/facility/mock-data.ts` |
| API Client | `lib/facility/api.ts` |
| Hooks | `hooks/facility/*.ts` (11 hook files) |
| UI Components | `components/ui/*.tsx` (BlurFade, Card, StatusBadge, ProgressBar, StatCircle, SectionTitle, + 56 Shadcn) |
| Background | `components/DarkVeil.tsx` (WebGL shader) |
