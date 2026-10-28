# HUBI LOGISTICS — Admin Dashboard & Cloud Synchronization

A comprehensive administrative control center and real-time state synchronization system for HUBI LOGISTICS, empowering site administrators to manage branding assets, visual theme tokens, blog publications, and team contact information with immediate reflection across the public client portfolio.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed during Phase 1 interactive clarification:
>
> - **Persistence Layer**: Cloud-synchronized Firebase Firestore (`ai-studio-hubilogisticsgom-3a6f20bc-3f80-47b1-82da-86651a7091a8`) with automated fallback to `localStorage` and default `contentData.json` seeding to guarantee high availability and offline resilience.
> - **Presentation Mode**: Dedicated, standalone full-screen Admin Dashboard view (accessible via `/admin` hash route, header shortcut, and footer link) with one-click return to the live public portfolio.
> - **Image Management**: Dual-input media handler supporting both local file uploads (FileReader Data URL with instant thumbnail preview) and external web image URLs.
> - **Authentication Credentials**: Secure admin gate enforcing default credentials (`admin` / `admin123`) with persistent session token stored in browser session.

---

## 1. Overview & Core Concept

- **What It Does**: Adds an enterprise administrative workspace to HUBI LOGISTICS. Administrators can sign in, update corporate identity (logos, hero banners, theme accent colors), manage articles (create, edit, delete, tag, and write rich content), and modify team member directories and footer contact points.
- **Target Audience / Persona**: HUBI LOGISTICS operators, content editors, and site managers requiring a fast, responsive, and code-free way to keep delivery schedules, branding, and news up to date.
- **Key Value**: Decoupled content management that instantly synchronizes across both Firestore cloud storage and active client sessions without requiring redeployment or developer intervention.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Authentication Flow**:
   - User clicks "Đăng nhập Admin" in the public Footer or navigates to `/admin`.
   - Sleek login gate appears with user/password inputs (`admin` / `admin123`), error feedback, and quick hint.
   - Upon successful verification, user is transitioned into the full-screen Admin Dashboard with active session state.

2. **Branding & Theme Customization Flow**:
   - Admin navigates to the "Nhận diện & Giao diện" tab.
   - Dual-input image managers allow uploading new logo and hero banner files (with drag & drop or file picker) or entering image URLs. Real-time preview displays the asset immediately.
   - Color pickers for Primary Brand Color, Canvas/Background Color, and CTA Accent Color dynamically inject CSS variables into document root (`--color-hubi-dark`, `--color-hubi-cyan`, `--color-hubi-orange`).
   - Clicking "Lưu Cấu Hình" persists updates to Firestore and updates the client view immediately.

3. **Blog & Content CRUD Flow**:
   - Admin navigates to the "Quản lý Bài viết" tab.
   - High-density table displays all existing articles with title, category, publish date, read time, and action buttons (Edit, Delete).
   - "Thêm bài viết mới" button opens an article editor modal/drawer with fields: Title, Category/Tag, Cover Image (Upload or URL), Alt text, Read Time, and Content textarea.
   - Editing an existing article pre-fills the form; deleting prompts for confirmation before removing from the data store.

4. **Team & Contact Management Flow**:
   - Admin updates the 3 core project team members (Name, Role, Email, and Avatar).
   - Admin edits official hotline, dispatch email, operational headquarters, and operating hours.

### Visual Identity & Theme

- **Aesthetic Direction**: High-tech Deep Ocean command center matching HUBI's established palette (`#0A192F` deep navy, `#112240` surface panels, `#00E5FF` electric cyan, and `#F59E0B` warm amber).
- **Layout Math & Geometry**:
  - $260\text{px}$ persistent left sidebar navigation on desktop.
  - Compact single-line breadcrumb top bar with active admin identity and quick action buttons ("Xem Website", "Đăng xuất").
  - $16\text{px}$–$24\text{px}$ container padding respecting nested radius math ($r_{\text{inner}} = 12\text{px}, r_{\text{outer}} = 16\text{px}$).
- **Typography & Tabular Discipline**:
  - Titles & Headings: Clean geometric sans (`Plus Jakarta Sans` / System UI stack) with relaxed line-height ($1.4$) for Vietnamese diacritic rendering.
  - Numbers & Counters: Strictly formatted with `tabular-nums font-mono` for metrics, dates, and order figures.
  - Anti-Slop Discipline: Zero static pill enclosures, no mechanical comment headers, no artificial latency tickers, and clean unboxed metadata with `·` separators.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual-Layer Persistence (Firestore + LocalStorage Seed)**
  - *Chosen Approach*: Query and synchronize with the provisioned Firestore database `ai-studio-hubilogisticsgom-3a6f20bc-3f80-47b1-82da-86651a7091a8` under collection `app_settings` and `articles`. If the user is offline or Firebase terms/auth are pending, fall back seamlessly to browser `localStorage` seeded from `contentData.json`.
  - *Why*: Ensures zero-latency initial page load, zero broken states if offline, and cloud synchronization when connected.
  - *Alternatives Considered*: Pure memory state (loses changes on reload) or pure cloud only (fails if offline or network latency occurs).

- **Decision 2: In-App View Routing (`#/admin` and State Switcher)**
  - *Chosen Approach*: Hash/state-based routing where `#admin` or clicking the Admin link renders the full-screen Admin Dashboard, maintaining a single-page app without requiring Vite SSR/Express multi-page routing.
  - *Why*: Instant transitions, compatible with AI Studio preview iframes, and zero page refresh.

- **Decision 3: Image Handling via Data URL & Remote URLs**
  - *Chosen Approach*: When a file is uploaded, use the HTML5 `FileReader` API to convert it to an optimized base64 Data URL or preview blob, allowing local uploads to persist directly in settings without external storage buckets.
  - *Why*: Eliminates complex multi-part upload servers and works immediately inside the client browser.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        HUBI LOGISTICS APP                              │
├───────────────────────────────────┬────────────────────────────────────┤
│         Public Client View        │       Admin Dashboard View         │
│  - Slide1Home (Hero & Banner)     │  - AdminAuthGuard & Login Gate     │
│  - Slide2About (Team & Story)     │  - BrandThemeEditor (Colors/Media) │
│  - Slide3Services (Pricing)       │  - ArticleManager (CRUD Modal)     │
│  - Slide4Blog (Dynamic Carousel)  │  - TeamContactEditor               │
│  - Slide5Contact & Slide6Design   │  - Live Preview & Reset Controls   │
└─────────────────┬─────────────────┴─────────────────┬──────────────────┘
                  │                                   │
                  ▼                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     ContentContext & State Store                       │
│  - settings: { logoUrl, bannerUrl, colors: { primary, surface, accent }│
│  - articles: [ { id, title, category, date, readTime, image, alt... } ]│
│  - team: [ { name, role, email, avatar } ]                             │
│  - contact: { hotline, email, address, hours }                         │
└─────────────────┬───────────────────────────────────┬──────────────────┘
                  │                                   │
                  ▼                                   ▼
┌─────────────────────────────────┐   ┌──────────────────────────────────┐
│        Firebase Firestore       │   │           localStorage           │
│  Collection: 'hubi_config'      │   │  Key: 'hubi_admin_data_v1'       │
│  Doc: 'site_settings'           │   │  Fallback & Offline Cache        │
└─────────────────────────────────┘   └──────────────────────────────────┘
```

### Data Models & State Types

```typescript
export interface ThemeSettings {
  primaryColor: string;    // #0A192F (Background Canvas)
  surfaceColor: string;    // #112240 (Cards & Containers)
  accentColor: string;     // #00E5FF (Cyan Highlight)
  ctaColor: string;        // #F59E0B (CTA Amber)
  logoUrl: string;         // ./assets/s1_logo_brand_01.png or Data URL
  bannerUrl: string;       // ./assets/s1_hero_delivery_01.jpg or Data URL
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  alt: string;
  excerpt: string;
  content: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface ContactSettings {
  hotline: string;
  email: string;
  address: string;
  hours: string;
}
```

### Interactive Component & State Mapping

- **Admin Login Form**: Controlled inputs with validation against `admin`/`admin123`. Sets `hubi_admin_auth: true` in `sessionStorage` and activates admin mode.
- **Theme Color Customizer**: Live input bindings with `<input type="color">` + hex text inputs. Triggers `document.documentElement.style.setProperty()` in real-time so changes reflect immediately before and after saving.
- **Article Manager**:
  - Filter by category and search by title in table rows.
  - Add/Edit modal with field validation (title $\ge 5$ characters, content $\ge 20$ characters).
  - Delete with safety confirmation dialog.
- **Public Carousel Sync**: `Slide4Blog` subscribes to the dynamic `articles` array from context, instantly displaying new or updated articles and routing them to `ArticleModal` for full-text reading.
