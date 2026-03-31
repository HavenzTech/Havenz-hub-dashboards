# Havenz Facility Operations Room — Deployment & Operations Guide

## Overview

This document covers the complete deployment of 13 Samsung 55" signage displays in an energy/power facility operations room, running the Havenz Hub Dashboards system.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Hardware Requirements](#hardware-requirements)
3. [Network Setup](#network-setup)
4. [Software Deployment](#software-deployment)
5. [Screen Assignments](#screen-assignments)
6. [Mini PC Setup (Per Screen)](#mini-pc-setup-per-screen)
7. [Data Flow — Current (Mock Mode)](#data-flow--current-mock-mode)
8. [Data Flow — Production (Real Data)](#data-flow--production-real-data)
9. [Controller System](#controller-system)
10. [Advanced Control Features](#advanced-control-features)
11. [Remote Management](#remote-management)
12. [Failure & Recovery](#failure--recovery)
13. [Day-to-Day Operations](#day-to-day-operations)
14. [What Still Needs To Be Built](#what-still-needs-to-be-built)
15. [Cost Estimate](#cost-estimate)

---

## System Architecture

### Three-Repo System

```
┌─────────────────────────────────────────────────────────────────┐
│  Vercel — havenz-hub-dashboards                                 │
│  (This repo — display-only frontend)                            │
│                                                                 │
│  /facility/display/screen-1  through  /facility/display/screen-13│
│  /api/facility/config/[screenId]  (local mock API, temporary)   │
│  /dashboard  (personal dashboards — unused at facility)         │
└────────────────┬────────────────────────────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  Cloud Run — havenzbms (backend)                                │
│                                                                 │
│  EXISTING:                        NEEDS BUILDING:               │
│  • /api/havenzhub/equipment/*     • /api/havenzhub/screens/*    │
│  • /api/havenzhub/BmsDevice/*     • Screen config CRUD          │
│  • /api/havenzhub/AccessLog/*     • Screen heartbeat            │
│  • /api/havenzhub/IotMetric/*     • Screen status               │
│  • /api/havenzhub/properties/*    • Presets & schedules         │
│  • /api/auth/*                    • Alert-triggered switching    │
└─────────────────────────────────────────────────────────────────┘
                 ▲
                 │ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│  Vercel — zhub (controller frontend)                            │
│  (Separate repo — Zhub_original)                                │
│                                                                 │
│  • /screens — visual wall grid + config panel                   │
│  • Preset management                                            │
│  • Schedule management                                          │
│  • Alert rule configuration                                     │
│  • Works from phone, tablet, or laptop                          │
└─────────────────────────────────────────────────────────────────┘
```

### Physical Layout

```
                    OPERATIONS ROOM
  ┌──────────────────────────────────────────┐
  │                                          │
  │   ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐        │
  │   │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │  Row 1 │
  │   └───┘ └───┘ └───┘ └───┘ └───┘        │
  │                                          │
  │   ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐        │
  │   │ 6 │ │ 7 │ │ 8 │ │ 9 │ │10 │  Row 2 │
  │   └───┘ └───┘ └───┘ └───┘ └───┘        │
  │                                          │
  │         ┌───┐ ┌───┐ ┌───┐               │
  │         │11 │ │12 │ │13 │         Row 3  │
  │         └───┘ └───┘ └───┘               │
  │                                          │
  │   ┌─────────────────────┐                │
  │   │  Operator Desk      │                │
  │   │  (controller on     │                │
  │   │   laptop/tablet)    │                │
  │   └─────────────────────┘                │
  └──────────────────────────────────────────┘

  Each screen: Samsung QMC 55" in PORTRAIT orientation (2160×3840)
  Behind each: Mini PC connected via HDMI + Ethernet
```

---

## Hardware Requirements

### Per Screen

| Component | Recommendation | Notes |
|-----------|---------------|-------|
| **Display** | Samsung QMC 55" (LH55QMCEBGCXGO) | Already selected |
| **Mini PC** | Beelink Mini S12 Pro or Intel NUC | ~$180 CAD each |
| **RAM** | 8 GB minimum | Just running Chrome |
| **Storage** | 128 GB SSD | Minimal — only OS + Chrome |
| **OS** | Windows 11 Home or Pro | Pro if you want built-in RDP |
| **HDMI Cable** | HDMI 2.0, 2m length | Short run, behind the TV |
| **Ethernet Cable** | Cat6, length varies | Preferred over WiFi |
| **Power** | Standard outlet per mini PC | Use a power strip per row |

### Network

| Component | Requirement |
|-----------|-------------|
| **Internet** | Stable broadband — screens load from Vercel + Cloud Run |
| **Switch** | 16+ port managed switch (all mini PCs + uplink) |
| **WiFi** | Backup only — Ethernet preferred for reliability |
| **Bandwidth** | ~2-5 Mbps per screen (web dashboards, no video streams yet) |

### Operator Workstation

| Component | Purpose |
|-----------|---------|
| **Laptop/Tablet** | Runs the zhub controller — any modern browser |
| **Phone** | Can also control screens via zhub mobile view |

---

## Network Setup

```
Internet (ISP)
     │
     ▼
Facility Router
     │
     ▼
Managed Switch (16+ ports)
     │
     ├── Port 1  → Mini PC 1  ──HDMI──▶ TV 1  (Screen 1)
     ├── Port 2  → Mini PC 2  ──HDMI──▶ TV 2  (Screen 2)
     ├── Port 3  → Mini PC 3  ──HDMI──▶ TV 3  (Screen 3)
     ├── Port 4  → Mini PC 4  ──HDMI──▶ TV 4  (Screen 4)
     ├── Port 5  → Mini PC 5  ──HDMI──▶ TV 5  (Screen 5)
     ├── Port 6  → Mini PC 6  ──HDMI──▶ TV 6  (Screen 6)
     ├── Port 7  → Mini PC 7  ──HDMI──▶ TV 7  (Screen 7)
     ├── Port 8  → Mini PC 8  ──HDMI──▶ TV 8  (Screen 8)
     ├── Port 9  → Mini PC 9  ──HDMI──▶ TV 9  (Screen 9)
     ├── Port 10 → Mini PC 10 ──HDMI──▶ TV 10 (Screen 10)
     ├── Port 11 → Mini PC 11 ──HDMI──▶ TV 11 (Screen 11)
     ├── Port 12 → Mini PC 12 ──HDMI──▶ TV 12 (Screen 12)
     ├── Port 13 → Mini PC 13 ──HDMI──▶ TV 13 (Screen 13)
     ├── Port 14 → Operator Laptop (optional wired)
     └── Port 15 → WiFi AP (for mobile controller access)
```

All mini PCs need outbound HTTPS access to:
- `havenz-hub-dashboards.vercel.app` (or custom domain)
- `havenz-backend-599129251048.us-central1.run.app`

No inbound ports need to be opened. No VPN required.

---

## Software Deployment

### Vercel (Dashboards)

The dashboard app is deployed on Vercel. It already is — no changes needed.

**Environment variables on Vercel:**

```env
NEXT_PUBLIC_API_URL=https://havenz-backend-599129251048.us-central1.run.app
NEXT_PUBLIC_DEV_USER_EMAIL=<facility service account email>
NEXT_PUBLIC_DEV_USER_PASSWORD=<facility service account password>
NEXT_PUBLIC_FACILITY_API_MODE=local    # Change to "backend" when havenzbms has screen endpoints
```

**Deployment flow:**
1. Push code to GitHub → Vercel auto-deploys
2. All 13 screens pick up the new version on their next config poll (5 seconds) or page refresh
3. For immediate updates: reboot the mini PCs (or remote in and refresh Chrome)

### Cloud Run (Backend)

The havenzbms backend runs on Google Cloud Run. Existing BMS API endpoints already work. New screen management endpoints need to be added.

---

## Screen Assignments

| Screen | Template ID | Dashboard Name | Purpose |
|--------|------------|----------------|---------|
| 1 | `engine-room` | Engine Room — Mechanical Health | Engine status, RPM, temp, oil pressure, vibration, fuel efficiency |
| 2 | `engine-room-visual` | Engine Room — Visual Monitoring | Camera grid, 2D/3D facility layout, maintenance schedule |
| 3 | `power-platform` | Power Platform Overview | MW generation, system load, efficiency, fuel input, trend charts |
| 4 | `grid-interconnection` | Battery + Substation + Grid | BESS charge, substation voltage/current, grid export/import |
| 5 | `energy-flow` | Energy Flow Diagram | Animated SVG — power plant → substation → consumers → grid |
| 6 | `campus-health` | Campus Health | Network, water, HVAC zones, environmental, tenant energy usage |
| 7 | `operations-maintenance` | Operations + Maintenance | Staff on site, task tracker, maintenance windows, spare parts, alerts |
| 8 | `power-market` | Power Market (AESO) | Pool price, demand, forecasts, trading signals |
| 9 | `revenue-margin` | Revenue & Margin | Revenue today/month, gas cost, margin, trend charts |
| 10 | `esg-compliance` | ESG & Compliance | Emissions, audit status, compliance deadlines, regulatory alerts |
| 11 | `security-command` | Security Command | 8-camera grid, AI detection feed, motion/vehicle/person alerts |
| 12 | `access-personnel` | Access & Personnel | Personnel on site, door status, facial recognition, access log feed |
| 13 | `external-intel` | External Intelligence | Weather, grid advisories, market updates, regulatory changes |

---

## Mini PC Setup (Per Screen)

This is a **one-time setup** for each of the 13 mini PCs.

### Step 1: Initial OS Setup

1. Power on the mini PC, connect keyboard/mouse/monitor
2. Complete Windows 11 setup (use a local account, not Microsoft account)
3. Name the PC: `HAVENZ-SCREEN-01` through `HAVENZ-SCREEN-13`
4. Connect to facility network via Ethernet
5. Install all Windows updates
6. Set power settings to **Never Sleep**, **Never Turn Off Display**

### Step 2: Install Chrome

1. Download Google Chrome from `google.com/chrome`
2. Install and set as default browser
3. Sign into Chrome with a shared facility Google account (for Chrome Remote Desktop later)

### Step 3: Install Chrome Remote Desktop

1. Go to `remotedesktop.google.com/access`
2. Click "Set up remote access"
3. Install the Chrome Remote Desktop host
4. Name it `HAVENZ-SCREEN-01` (matching the PC name)
5. Set a PIN (use the same PIN for all 13 for simplicity)
6. Repeat for all 13 PCs

### Step 4: Create Kiosk Startup Script

Create `C:\kiosk\start-display.bat`:

```batch
@echo off
REM Wait for network to be ready
timeout /t 10 /nobreak

REM Kill any existing Chrome instances
taskkill /F /IM chrome.exe >nul 2>&1

REM Start Chrome in kiosk mode
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" ^
  --kiosk ^
  --start-fullscreen ^
  --disable-session-crashed-bubble ^
  --disable-infobars ^
  --noerrdialogs ^
  --disable-translate ^
  --no-first-run ^
  --fast ^
  --fast-start ^
  --disable-features=TranslateUI ^
  --autoplay-policy=no-user-gesture-required ^
  "https://havenz-hub-dashboards.vercel.app/facility/display/screen-1"
```

**Change `screen-1` to the correct screen number for each mini PC.**

### Step 5: Auto-Start on Boot

1. Press `Win + R`, type `shell:startup`, press Enter
2. Create a shortcut to `C:\kiosk\start-display.bat` in this folder
3. Reboot the PC to test — Chrome should open full-screen to the dashboard

### Step 6: Final Touches

1. **Hide taskbar:** Right-click taskbar → Taskbar settings → Auto-hide = On
2. **Disable notifications:** Settings → System → Notifications → Off
3. **Disable Windows Update restarts:** Settings → Windows Update → Active Hours → set to 00:00–23:00
4. **Disable lock screen:** Settings → Accounts → Sign-in options → Never
5. **Set auto-login:** Use `netplwiz` to skip the login screen on boot

### Step 7: Mount Behind TV

1. Power off the mini PC
2. Mount behind or below the Samsung display (many mini PCs have VESA mount kits)
3. Connect HDMI to TV, Ethernet to switch, power to outlet
4. Power on — dashboard should appear automatically

---

## Data Flow — Current (Mock Mode)

All 13 screens currently run on mock data. This is the flow:

```
Mini PC boots
     │
     ▼
Chrome kiosk opens: /facility/display/screen-N
     │
     ▼
Vercel serves the Next.js page
     │
     ▼
AuthProvider auto-logs in with credentials from .env
     │
     ▼
useScreenConfig polls: GET /api/facility/config/screen-N
     │
     ▼
Local mock API returns config from lib/data/facility-mock.ts
  → { template: "engine-room", params: {}, refreshIntervalMs: 10000 }
     │
     ▼
TemplateRouter renders the EngineRoom component
     │
     ▼
EngineRoom reads from lib/facility/mock-data.ts (hardcoded values)
     │
     ▼
Screen displays: engine status, metrics, alerts (all mock)
     │
     ▼
Polls config every 5s, refreshes data every 10s
Heartbeat silently fails (no endpoint — that's fine)
```

---

## Data Flow — Production (Real Data)

When havenzbms has screen config endpoints and real sensor data:

```
Mini PC boots
     │
     ▼
Chrome kiosk opens: /facility/display/screen-N
     │
     ▼
AuthProvider auto-logs in with facility service account
     │
     ▼
useScreenConfig polls: GET havenzbms/api/havenzhub/screens/screen-N/config
     │
     ▼
havenzbms returns config from its database
  → { template: "engine-room", params: { propertyId: "heat-power-plant" } }
     │
     ▼
TemplateRouter renders EngineRoom
     │
     ▼
EngineRoom calls real BMS API endpoints:
  • bmsApi.equipment.getMetrics("engine-1") → real RPM, temp, pressure
  • bmsApi.equipment.getAlerts("engine-1") → real active alerts
  • bmsApi.iotMetrics.getByProperty("heat-power-plant") → real sensor data
     │
     ▼
Screen displays REAL data from actual sensors
     │
     ▼
Auto-refreshes every 10s, heartbeat posts every 10s
```

**To switch from mock to real:** Set `NEXT_PUBLIC_FACILITY_API_MODE=backend` on Vercel.

---

## Controller System

The controller lives in the **zhub** frontend (separate repo). It is NOT built yet.

### How It Will Work

```
Operator opens zhub on phone/laptop → navigates to /screens
     │
     ▼
Controller loads → polls havenzbms for all 13 screen configs + statuses
     │
     ▼
Shows visual grid matching the physical wall layout:
  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
  │Screen 1│ │Screen 2│ │Screen 3│ │Screen 4│ │Screen 5│
  │Engine  │ │Visual  │ │Power   │ │Grid    │ │Energy  │
  │ ● ON   │ │ ● ON   │ │ ● ON   │ │ ● ON   │ │ ● ON   │
  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
  (repeat for rows 2 and 3)
     │
     ▼
Operator taps Screen 5 → config panel opens
     │
     ▼
Changes template from "Energy Flow" to "Security Command" → taps Apply
     │
     ▼
PUT havenzbms/api/havenzhub/screens/screen-5/config
     │
     ▼
Screen 5 polls config within 5 seconds → detects change → re-renders
     │
     ▼
TV 5 now shows Security Command instead of Energy Flow
```

### What The Controller Shows

- **Per screen:** Template name, online/offline status (from heartbeat), last heartbeat time
- **Quick actions:** Refresh all, reset to default layout, emergency mode (all screens → alerts)
- **Preset management:** Save current layout as a named preset, load presets
- **No physical access to mini PCs needed** — everything is remote

---

## Advanced Control Features

These are planned for future implementation in havenzbms + zhub.

### Presets

Save and instantly apply named screen layouts:

| Preset | Description |
|--------|-------------|
| Normal Operations | Default layout — all 13 screens as assigned |
| Emergency | Screens 7, 11, 12 switch to alerts/security, others dim |
| Night Shift | Only essential screens active (1, 3, 4, 7, 11) |
| Visitor Tour | Screens 5 (Energy Flow) and 9 (Revenue) highlighted |
| Maintenance Window | Screens 1, 2, 7 show maintenance-focused content |

### Scheduled Switching

Automatic layout changes on a time schedule:

```
06:00  →  "Day Shift" preset loads
18:00  →  "Night Shift" preset loads
```

Runs as a cron job in havenzbms. No operator needed.

### Alert-Triggered Switching

Rules configured in havenzbms:

```
IF critical alert on any equipment:
  → Switch screens 7 and 11 to show alerts
  → Flash screen border red
  → Revert after alert is acknowledged
```

### Voice Assistant

Integration with the Havenz AI agent (separate repo at `F:\HavenzAHIZ\Havenz`):

```
Operator says: "Show security cameras on screen 3"
     │
     ▼
AI model interprets → { screen: "screen-3", template: "security-command" }
     │
     ▼
Sends: PUT havenzbms/api/havenzhub/screens/screen-3/config
     │
     ▼
Screen 3 updates within 5 seconds
```

The voice assistant, controller, schedules, and alert rules all use the **same mechanism** — updating the screen config via the havenzbms API. The display doesn't know or care who changed the config.

---

## Remote Management

### Recommended: Chrome Remote Desktop (Free)

For remotely accessing any of the 13 mini PCs:

1. All mini PCs signed into the same Google account
2. Chrome Remote Desktop installed on each
3. Access from anywhere via `remotedesktop.google.com`
4. Can see the screen, restart Chrome, fix issues, update Windows

**When you'd use it:**
- A screen is frozen → remote in, restart Chrome
- Need to update the kiosk URL → edit `start-display.bat`
- Windows needs a manual update
- Troubleshoot a display issue

### Alternative: Windows RDP (Built-in, requires Pro)

- Works only on the same network (inside the facility)
- No extra software needed if using Windows 11 Pro
- Connect via `mstsc` from the operator workstation

### Future: Bulk Management Script

For managing all 13 PCs at once (e.g., reboot all):

```powershell
# Example: Restart Chrome on all screens
$screens = 1..13 | ForEach-Object { "HAVENZ-SCREEN-$($_.ToString('00'))" }
foreach ($pc in $screens) {
    Invoke-Command -ComputerName $pc -ScriptBlock {
        Stop-Process -Name chrome -Force
        Start-Process "C:\kiosk\start-display.bat"
    }
}
```

This requires PowerShell remoting enabled on all PCs (a later optimization).

---

## Failure & Recovery

| Scenario | What Happens | Recovery |
|----------|-------------|----------|
| **Mini PC crashes** | Screen goes black | Auto-reboots → Chrome auto-opens → dashboard loads (30-60s) |
| **Chrome freezes** | Screen stuck on last frame | Remote in via Chrome Remote Desktop → restart Chrome |
| **Internet goes down** | Screens show "Connection Error" | Auto-retries every 5s. Recovers when internet returns. |
| **Backend (havenzbms) down** | Screens keep showing stale data | Data refreshes automatically when backend recovers |
| **Vercel down** | Browser error page | Extremely rare. Recovers on Vercel recovery + page refresh. |
| **Power outage** | All screens go off | Mini PCs auto-boot → Chrome auto-opens → all screens recover |
| **Wrong content on a screen** | Screen shows wrong template | Use controller to reassign, or remote into mini PC |
| **Config poll fails** | Screen keeps current template | Retries every 5s. No data loss. |

**Key principle:** The system is designed to self-recover. No manual intervention needed for most failure scenarios.

---

## Day-to-Day Operations

### Normal Day

1. **06:00** — Day shift preset auto-loads (if scheduling is configured)
2. **Operator arrives** — 13 screens already running, data refreshing live
3. **During shift** — Screens auto-update every 5-30 seconds. No interaction needed.
4. **If attention needed** — Operator uses controller (phone/laptop) to switch screens
5. **18:00** — Night shift preset auto-loads
6. **Overnight** — Screens continue running unattended

### Software Updates

1. Developer pushes code to GitHub
2. Vercel auto-deploys (takes ~1 minute)
3. Screens pick up new version on next config poll or page refresh
4. For immediate updates: use Chrome Remote Desktop to refresh all screens, or reboot mini PCs

### Adding a New Screen Template

If stakeholders want a new dashboard type:

1. Add template ID to `types/facility.ts`
2. Add registry entry in `lib/facility/constants.ts`
3. Add mock data in `lib/facility/mock-data.ts`
4. Create template component in `components/facility/templates/`
5. Add case to `components/facility/TemplateRouter.tsx`
6. Update screen config to assign the new template to a screen
7. Deploy → screen picks it up automatically

### Troubleshooting

| Problem | Fix |
|---------|-----|
| Screen shows "Connecting..." | Check internet connection on that mini PC |
| Screen shows "Connection Error" | Backend may be down — check havenzbms Cloud Run |
| Screen shows "Screen Not Configured" | Screen ID not in the config — update mock config or backend |
| Screen shows wrong dashboard | Update config via controller or code |
| Screen is black | Check HDMI cable, mini PC power, or remote in to check |
| All screens down simultaneously | Check facility internet/router |

---

## What Still Needs To Be Built

### Priority 1 — Backend Screen Management (havenzbms)

| Endpoint | Purpose |
|----------|---------|
| `GET /api/havenzhub/screens/{id}/config` | Screen fetches its config |
| `PUT /api/havenzhub/screens/{id}/config` | Controller updates a screen |
| `POST /api/havenzhub/screens/{id}/heartbeat` | Screen reports it's alive |
| `GET /api/havenzhub/screens/configs` | Controller gets all configs |
| `GET /api/havenzhub/screens/status` | Controller gets all statuses |

### Priority 2 — Controller UI (zhub)

- Visual wall grid with live status
- Click-to-configure per screen
- Preset management (save/load/apply)
- Mobile-responsive

### Priority 3 — Real Data Integration (this repo)

- Replace mock data imports with real API hook calls in each template
- Delete `lib/facility/mock-data.ts` when all screens use real data
- Wire `useEquipmentMetrics`, `useEquipmentAlerts`, `useAccessLogs`, etc. into templates

### Priority 4 — Data Infrastructure

| Data Source | Screens Affected | Integration Method |
|-------------|-----------------|-------------------|
| Engine sensors (RPM, temp, etc.) | 1, 2 | IoT sensors → havenzbms IoT metrics API |
| SCADA / Modbus (substation, grid) | 3, 4 | Data ingestion gateway → havenzbms |
| AESO API (pool price, demand) | 8 | REST API integration in havenzbms |
| Weather API (Environment Canada) | 13 | REST API integration |
| Camera feeds (RTSP/HLS) | 2, 11 | Direct stream URLs in template config |
| Facial recognition | 12 | Already in havenzbms API |
| Access control (badges, doors) | 12 | Already in havenzbms API |

### Priority 5 — Advanced Features

- Preset scheduling (cron-based)
- Alert-triggered screen switching
- Voice assistant integration
- Screen grouping
- 3D model for Screen 2 (NWD → GLB conversion needed)

---

## Cost Estimate

### One-Time Hardware

| Item | Qty | Unit Cost (CAD) | Total (CAD) |
|------|-----|-----------------|-------------|
| Samsung QMC 55" Display | 13 | ~$1,200 | ~$15,600 |
| Beelink Mini S12 Pro | 13 | ~$180 | ~$2,340 |
| HDMI 2.0 Cables (2m) | 13 | ~$10 | ~$130 |
| Cat6 Ethernet Cables | 13 | ~$15 | ~$195 |
| 16-Port Managed Switch | 1 | ~$200 | ~$200 |
| Power Strips | 3 | ~$30 | ~$90 |
| VESA Mini PC Mounts | 13 | ~$15 | ~$195 |
| **Total Hardware** | | | **~$18,750** |

### Ongoing Costs

| Item | Monthly Cost |
|------|-------------|
| Vercel (dashboard hosting) | Free tier or ~$20/mo Pro |
| Cloud Run (havenzbms) | Existing — no change |
| Internet at facility | Existing — no change |
| Chrome Remote Desktop | Free |
| **Total Monthly** | **~$0–$20** |

---

## Quick Reference

### URLs

| Purpose | URL |
|---------|-----|
| Screen 1 | `https://havenz-hub-dashboards.vercel.app/facility/display/screen-1` |
| Screen 2 | `https://havenz-hub-dashboards.vercel.app/facility/display/screen-2` |
| ... | `...screen-3` through `...screen-13` |
| Debug mode (any screen) | Add `?debug=true` to any screen URL |
| Controller (future) | `https://zhub.vercel.app/screens` |
| Remote Desktop | `https://remotedesktop.google.com/access` |

### Key Files in This Repo

| File | Purpose |
|------|---------|
| `types/facility.ts` | Screen template type definitions |
| `lib/facility/constants.ts` | Template registry with labels/icons |
| `lib/facility/mock-data.ts` | ALL mock data (delete when real data ready) |
| `lib/facility/api.ts` | Facility API client |
| `lib/data/facility-mock.ts` | Mock screen configs (screen-1 → screen-13) |
| `app/facility/display/[screenId]/page.tsx` | Display page (what each TV loads) |
| `components/facility/TemplateRouter.tsx` | Maps template name → component |
| `components/facility/templates/` | All 13 screen template components |
| `hooks/facility/` | Data hooks for facility screens |

### Environment Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_API_URL` | Cloud Run URL | BMS backend API |
| `NEXT_PUBLIC_DEV_USER_EMAIL` | Service account email | Auto-login |
| `NEXT_PUBLIC_DEV_USER_PASSWORD` | Service account password | Auto-login |
| `NEXT_PUBLIC_FACILITY_API_MODE` | `local` or `backend` | Mock API vs real backend |
