# Widgets Architecture Documentation

## Overview
The widgets library provides reusable, composable components organized by functionality type. This modular approach promotes code reuse, maintainability, and consistency across the dashboard.

## Directory Structure
```
/src/components/widgets/
├── stats/              # Statistical display widgets
│   ├── StatCard.tsx    # Individual stat card component
│   └── index.ts
├── charts/             # Data visualization widgets
│   ├── ChartWidgets.tsx # Pie charts and progress bars
│   └── index.ts
├── cards/              # Card-based UI components
│   ├── CardWidgets.tsx  # Generic card wrapper and grid
│   └── index.ts
├── tables/             # Table and data grid widgets
│   ├── TableWidget.tsx  # Reusable table component
│   └── index.ts
├── actions/            # Button and action widgets
│   ├── ActionWidgets.tsx # Action buttons and grids
│   └── index.ts
├── forms/              # Form input widgets
│   ├── FormWidgets.tsx  # Form fields and input components
│   └── index.ts
└── index.ts            # Central export file
```

## Widget Categories

### 1. Stats Widgets (`/stats/`)
**Purpose**: Display key metrics and statistics

**Components**:
- **StatCard**: Basic stat display with icon, label, value, and optional trend indicator
- **StatGrid**: Container for displaying multiple stat cards in a responsive grid

**Usage**:
```tsx
import { StatCard, StatGrid } from '@/components/widgets';

const stats = [
  { icon: '🎂', label: 'Wedding Days Left', value: '120', trend: 'down' },
  { icon: '✓', label: 'Tasks Completed', value: '8', trend: 'up' }
];

<StatGrid stats={stats} columns={4} />
```

### 2. Chart Widgets (`/charts/`)
**Purpose**: Data visualization and progress tracking

**Components**:
- **PieChartWidget**: Interactive pie chart with legend for budget breakdown
- **ProgressBarWidget**: Horizontal progress bar with percentage display

**Usage**:
```tsx
import { PieChartWidget, ProgressBarWidget } from '@/components/widgets';

const budgetData = [
  { name: 'Venue', value: 50000 },
  { name: 'Catering', value: 30000 }
];

<PieChartWidget data={budgetData} colors={['#ff6b6b', '#4ecdc4']} />
<ProgressBarWidget label="Budget Used" value={60} max={100} />
```

### 3. Card Widgets (`/cards/`)
**Purpose**: Reusable card containers for displaying content

**Components**:
- **Card**: Generic card wrapper with gradient backgrounds, optional image, and action buttons
- **CardGrid**: Responsive grid container for cards

**Usage**:
```tsx
import { Card, CardGrid } from '@/components/widgets';

<CardGrid columns={3}>
  <Card 
    title="Vendor Name"
    rating={4.5}
    price="₹5,000"
    location="Mumbai"
    onEdit={() => alert('Edit')}
    onDelete={() => alert('Delete')}
  />
</CardGrid>
```

### 4. Table Widgets (`/tables/`)
**Purpose**: Display and manage tabular data

**Components**:
- **TableWidget**: Inline editable table with CRUD operations

**Usage**:
```tsx
import { TableWidget } from '@/components/widgets';

const columns = [
  { key: 'name', label: 'Guest Name' },
  { key: 'status', label: 'RSVP Status' }
];

<TableWidget 
  columns={columns}
  data={guests}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### 5. Action Widgets (`/actions/`)
**Purpose**: Interactive buttons and action triggers

**Components**:
- **ActionButton**: Individual action button with icon and description
- **ActionGrid**: Grid layout for multiple action buttons

**Usage**:
```tsx
import { ActionGrid } from '@/components/widgets';

const actions = [
  { icon: '✉️', label: 'Invitations', onClick: () => {} },
  { icon: '🏢', label: 'Vendors', onClick: () => {} }
];

<ActionGrid actions={actions} columns={4} />
```

### 6. Form Widgets (`/forms/`)
**Purpose**: Form input components and layouts

**Components**:
- **FormField**: Individual form input field (text, number, select, etc.)
- **FormWidget**: Complete form container with submit button
- **AddNewItemWidget**: Specialized form for adding new items

**Usage**:
```tsx
import { FormWidget } from '@/components/widgets';

const fields = [
  { label: 'Guest Name', value: '', type: 'text', required: true },
  { label: 'Status', value: 'PENDING', type: 'select', options: [...] }
];

<FormWidget title="Add Guest" fields={fields} onSubmit={handleSubmit} />
```

## Integration with Dashboard Components

### Refactored Components
1. **QuickPlanningActions**: Now uses `ActionGrid` widget
2. **TasksManagement**: Now uses `ProgressBarWidget` for progress tracking

### How to Refactor Existing Components
1. Identify reusable patterns (cards, progress bars, forms, etc.)
2. Import widget from `/components/widgets`
3. Extract data from component state into widget props
4. Replace manual DOM rendering with widget component

**Example**:
```tsx
// Before
<div className="grid grid-cols-4 gap-4">
  {items.map(item => (
    <div key={item.id} className="card">
      {/* Card content */}
    </div>
  ))}
</div>

// After
<CardGrid columns={4}>
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</CardGrid>
```

## Styling & Theme

### Design Patterns
- **Backdrop Blur**: All widgets use `backdrop-blur-md` for glassmorphic effect
- **Gradients**: Consistent gradient backgrounds (amber/orange/rose color palette)
- **Borders**: Semi-transparent white borders (`border-white/40`)
- **Shadows**: Hover effects with shadow elevation
- **Animations**: Framer Motion for smooth transitions

### Color Grid
- **Primary**: Amber/Orange gradients
- **Success**: Green (`from-green-500 to-green-600`)
- **Warning**: Amber (`from-amber-500 to-amber-600`)
- **Danger**: Red (`from-red-500 to-red-600`)

## Performance Optimization

### Best Practices
1. **Memoization**: Widgets are lightweight and don't require memoization
2. **Data Persistence**: Dashboard components handle localStorage
3. **Lazy Loading**: Consider lazy-loading heavy components
4. **Animation**: Use `whileHover` for smooth performance

## Component Composition Examples

### Complete Dashboard Section
```tsx
import { StatGrid, ProgressBarWidget, ActionGrid, CardGrid, Card } from '@/components/widgets';

function DashboardSection() {
  return (
    <>
      <StatGrid stats={summaryStats} columns={5} />
      <ProgressBarWidget label="Budget Used" value={60} />
      <ActionGrid actions={quickActions} columns={4} />
      <CardGrid columns={3}>
        {vendors.map(vendor => (
          <Card key={vendor.id} {...vendor} />
        ))}
      </CardGrid>
    </>
  );
}
```

## Export Reference

All widgets are centrally exported from `/src/components/widgets/index.ts`:

```tsx
// Import all widgets
import {
  StatCard, StatGrid,
  PieChartWidget, ProgressBarWidget,
  Card, CardGrid,
  TableWidget,
  ActionButton, ActionGrid,
  FormField, FormWidget, AddNewItemWidget
} from '@/components/widgets';
```

## Future Enhancements

1. **Additional Widgets**:
   - Timeline widget for event scheduling
   - Calendar widget for date picking
   - Modal/Dialog widgets
   - Notification/Toast widgets

2. **Customization**:
   - Theme switching system
   - Custom gradient palettes
   - Size variants (compact, normal, large)

3. **Accessibility**:
   - ARIA labels and roles
   - Keyboard navigation
   - Screen reader support

4. **Testing**:
   - Unit tests for each widget
   - Integration tests for dashboard
   - E2E tests for user workflows
