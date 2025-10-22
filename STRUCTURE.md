# Project Structure

This project follows React best practices with a standard directory structure.

## Directory Structure

```
tlv-parser/
├── src/
│   ├── components/          # React components
│   │   ├── index.ts        # Barrel export for components
│   │   ├── TLVParser.tsx   # TLV to JSON parser component
│   │   └── JSONToTLVConverter.tsx  # JSON to TLV converter with QR code
│   │
│   ├── lib/                # Utility functions and constants
│   │   ├── index.ts        # Barrel export for lib
│   │   ├── tlv.ts          # TLV parsing logic
│   │   ├── json-to-tlv.ts  # JSON to TLV conversion logic
│   │   └── constants.ts    # Sample data constants
│   │
│   ├── App.tsx             # Main App component
│   ├── App.css             # App styles
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── dist/                   # Production build output
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tsconfig.node.json      # TypeScript config for Vite
└── vite.config.ts          # Vite configuration

```

## Key Architectural Decisions

### Component Structure
- **Separation of Concerns**: Each component handles its own state and logic
- **Reusability**: Components are designed to be reusable with props
- **Type Safety**: Full TypeScript support with proper interfaces

### Library Organization
- **lib/**: Contains all business logic and utilities separate from UI
- **Barrel Exports**: Using `index.ts` files for cleaner imports
- **Constants**: Centralized in `lib/constants.ts`

### Import Patterns
```typescript
// Clean barrel imports
import { TLVParser, JSONToTLVConverter } from './components';
import { TLV, JSONToTLV, samplePayload } from './lib';
```

## Component Details

### TLVParser Component
- **Purpose**: Parse TLV strings to JSON format
- **Props**: `initialPayload?: string`
- **Features**: 
  - Real-time parsing
  - Error handling
  - Copy to clipboard
  - Success/error alerts

### JSONToTLVConverter Component
- **Purpose**: Convert JSON to TLV format with QR code generation
- **Props**: `initialJSON?: string`
- **Features**:
  - JSON validation
  - TLV generation
  - QR code generation (using qrcode npm package)
  - QR code download
  - Copy to clipboard

## QR Code Implementation

The QR code is generated using the `qrcode` npm package:
- **Import**: `import * as QRCode from 'qrcode'` (namespace import for proper TypeScript support)
- **Method**: `QRCode.toCanvas()` renders directly to canvas element
- **Timing**: Generated via `useEffect` when TLV string changes
- **Canvas Ref**: Uses React `useRef` for canvas element access

## Type Safety

All code is fully typed with TypeScript:
- Interface definitions in `lib/tlv.ts`
- Exported types via barrel exports
- Strict mode enabled
- No `any` types used

## Best Practices Applied

1. ✅ Component-based architecture
2. ✅ Separation of UI and business logic
3. ✅ Barrel exports for clean imports
4. ✅ TypeScript strict mode
5. ✅ React hooks (useState, useRef, useEffect)
6. ✅ Proper error handling
7. ✅ CSS modules pattern
8. ✅ Responsive design
