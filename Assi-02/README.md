# Dual Router Mutual Fund Dashboard

A comprehensive mutual fund dashboard demonstrating both Next.js App Router and Pages Router in a single application, showcasing all major rendering patterns (SSG, ISR, SSR, CSR).

## 🏗️ Routing Architecture

### App Router (`/learn/*`)
Modern Next.js 13+ routing with Server Components and advanced features:

- **`/learn`** (SSG) - Static overview page with app introduction and navigation
- **`/learn/funds`** (ISR, 24h) - Curated list of 10 mutual funds with latest NAV data
- **`/learn/fund/[code]`** (SSR) - Dynamic fund detail pages with complete NAV history
- **`/learn/tools`** (CSR) - Interactive fund search tool with real-time data fetching

### Pages Router (`/market/*`)
Traditional Next.js routing with getStaticProps and getServerSideProps:

- **`/market`** (ISR, 1h) - Market snapshot with 5 featured funds and performance metrics
- **`/market/fund/[code]`** (SSR) - Fund performance analysis with trailing returns
- **`/market/compare`** (CSR) - Interactive comparison tool for up to 3 funds
- **`/market/about`** (SSG) - Static documentation explaining the architecture

## 🔄 Rendering Methods Rationale

### Static Site Generation (SSG)
- **`/learn`**: Perfect for landing page content that doesn't change frequently
- **`/market/about`**: Documentation content that's static and benefits from build-time optimization

### Incremental Static Regeneration (ISR)
- **`/learn/funds`** (24h revalidation): Fund lists change daily, ISR provides optimal balance of performance and freshness
- **`/market`** (1h revalidation): Market snapshots need more frequent updates for better user experience

### Server-Side Rendering (SSR)
- **`/learn/fund/[code]`**: Individual fund pages need fresh data on every visit for accuracy
- **`/market/fund/[code]`**: Performance calculations require real-time data for precise metrics

### Client-Side Rendering (CSR)
- **`/learn/tools`**: Search functionality requires user interaction and real-time API calls
- **`/market/compare`**: Interactive comparison needs dynamic data fetching based on user input

## 📊 Data Integration

### API Source
- **Base URL**: `https://api.mfapi.in/mf`
- **Endpoints Used**:
  - `GET /mf` - List all mutual fund schemes
  - `GET /mf/<schemeCode>` - Get specific fund details with NAV history

### Return Calculations
- **Trailing Returns**: Calculated using nearest available NAV within ±3 days of target date
- **Formula**: `((Current NAV - Past NAV) / Past NAV) * 100`
- **Periods**: 1 month, 3 months, 6 months (approximate based on available data)

### Data Handling
- Latest NAV is always the first element in the sorted data array (descending by date)
- Missing data points display "—" with explanatory notes
- Error states provide helpful guidance for invalid scheme codes

## 🎨 Component Architecture

### Core Components (8+)
1. **NavBar** - Global navigation with responsive mobile menu
2. **AppLinkCard** - Reusable card component for navigation and CTAs
3. **FundSummaryCard** - Fund overview with NAV, returns, and quick actions
4. **FundList** - Responsive grid layout for multiple fund cards
5. **FundDetail** - Comprehensive fund information with NAV history table
6. **CompareTable** - Side-by-side fund comparison with performance metrics
7. **SearchBar** - Interactive search with loading states and validation
8. **EmptyState** - User-friendly error and no-results states

## 🚀 Performance Features

- **Optimized Images**: Next.js Image component for automatic optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching Strategy**: ISR for optimal balance of performance and data freshness
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton screens and loading indicators for better UX

## 🔧 Environment Configuration

The following curated scheme codes are used throughout the application:

```javascript
// Learn section (10 funds)
LEARN_FUND_CODES = [122639, 120492, 125497, 118825, 125354, 118955, 120166, 120586, 118778, 130503]

// Market section (5 funds)
MARKET_FUND_CODES = [122639, 120492, 125497, 118825, 125354]
```

## 📱 Design System

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React for consistent iconography
- **Typography**: Inter font with proper hierarchy
- **Color System**: Comprehensive palette with semantic color usage

## 🏃‍♂️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000/learn` to start exploring the dual router architecture.

## 🔍 Key Features Demonstrated

- **Routing Coexistence**: App Router and Pages Router working seamlessly together
- **Full Rendering Spectrum**: All four major rendering patterns in one application
- **Real-time Data**: Live mutual fund data with proper error handling
- **Interactive Tools**: Search and comparison functionality with client-side updates
- **Performance Optimization**: Strategic use of ISR for data that changes predictably
- **Mobile Responsiveness**: Fully responsive design with mobile-first approach
- **Accessibility**: Proper ARIA labels and semantic HTML structure

This application serves as a comprehensive example of modern Next.js development practices, demonstrating how to leverage both routing systems effectively for different use cases.