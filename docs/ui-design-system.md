# 🎨 Move-In UI Design System

## 1 - Purpose
This document defines the UI standards for the Move-In web application. The goal is a consistent, modern, and accessible experience across all pages and user roles (Guest, Customer, Vendor, Support Staff, Manager).

## 2 - Brand Style (Look & Feel)
**Design vibe:** clean, friendly, trustworthy  
**Core style:** light UI, soft shadows, rounded corners, lots of spacing  
**Primary brand mood:** blue/green gradient (used in hero sections and key highlights)

## 3 - Color Palette - Primary Brand Colors
| Usage | Name | Hex |
|------|------|-----|
| Primary (buttons/links) | Move-In Blue | **#1D72F2** |
| Accent (highlights) | Move-In Green | **#2BB673** |
| Gradient (hero/sections) | Blue → Green | **#1D72F2 → #2BB673** |

### Neutral Colors
| Usage | Hex |
|------|-----|
| Background | **#F7F9FC** |
| Card Background | **#FFFFFF** |
| Border / Divider | **#E6EAF0** |
| Text Primary | **#1F2937** |
| Text Secondary | **#6B7280** |

### Status Colors
| Usage | Hex |
|------|-----|
| Success | **#22C55E** |
| Warning | **#F59E0B** |
| Error | **#EF4444** |
| Info | **#3B82F6** |


## 4 - Typography
Use a clean sans-serif font (system default is okay).

| Element | Size | Weight |

| Page Title (H1) | 28–32px | Bold |
| Section Title (H2) | 20–24px | Semi-Bold |
| Card Title (H3) | 16–18px | Semi-Bold |
| Body Text | 14–16px | Regular |
| Helper Text | 12–13px | Regular |
| Button Text | 14–16px | Medium |

## 5 - Layout & Spacing
- Base spacing unit: **8px**
- Common spacing: **16px / 24px / 32px**
- Page padding: **24px**
- Section spacing: **24–32px**
- Card padding: **16–20px**
- Border radius: **10–12px** (modern rounded look)

## 6 - Buttons

### Primary Button
- Background: **Move-In Blue (#1D72F2)**
- Text: **White**
- Hover: slightly darker blue
- Used for: Create, Save, Confirm

### Secondary Button
- Background: transparent
- Border: **#1D72F2**
- Text: **#1D72F2**
- Used for: Cancel, Back, View

### Success Button (optional)
- Background: **#2BB673**
- Used for: Confirm booking / Approve type actions

### Danger Button
- Background: **#EF4444**
- Used for: Delete actions

## 7 - Cards
Cards are used for dashboards, listings, summaries.

**Card style**
- Background: **#FFFFFF**
- Border: **#E6EAF0**
- Shadow: soft and minimal
- Radius: **10–12px**
- Padding: **16–20px**

## 8 - Forms & Inputs
- Labels above input fields
- Input padding: **12px**
- Radius: **10px**
- Clear placeholder text
- Required fields marked with `*`

### Error State
- Border: **#EF4444**
- Error message text: **#EF4444**
- Keep messages short and helpful

## 9 - Tables / Listings Layout
- Use tables on desktop if needed
- Switch to cards on mobile (responsive)
- Actions aligned right (Edit/Delete)

## 10 - Alerts & Feedback
Use clear, non-dramatic messages:
- Success: “Saved successfully.”
- Error: “Something went wrong. Please try again.”
- Warning: “Please review required fields.”

## 11- Icons & Navigation
- Use simple icons for actions: View, Edit, Delete, Add
- Keep navigation consistent across roles
- Vendor pages should clearly show “Vendor” context (Vendor Dashboard, My Listings, etc.)

## 12 - Accessibility & UX Rules
- Maintain readable contrast (especially on gradient backgrounds)
- Buttons must look clickable (size, hover, spacing)
- Avoid long forms: group fields into sections
- Mobile-friendly layouts required (test in small screen)

## 13 - Consistency Requirement
All UI components must follow this design system to maintain a consistent experience across:
- Guest browsing pages
- Customer booking flow
- Vendor Dashboard
- Admin/Support dashboards
