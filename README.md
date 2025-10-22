# TLV Parser & Generator with QR Code

A TypeScript React-based web application for parsing and generating TLV (Tag-Length-Value) formatted data with QR Code generation.

## Features

### 1. Read & Parse TLV
- Parse TLV strings into readable JSON format
- Supports nested TLV structures (children)
- Visual feedback for parsing success/errors
- Copy parsed JSON to clipboard

### 2. Convert JSON to TLV with QR Code
- Convert JSON objects back to TLV format
- **Automatically generate QR Code from TLV string**
- **Download QR Code as PNG image**
- Supports nested structures with children
- Validates JSON input
- Copy generated TLV to clipboard

## Tech Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **qrcode** (npm package) - QR Code generation
- **ES6 Modules** - Modern JavaScript with TypeScript

## Project Structure

```
src/
├── components/              # React components
│   ├── TLVParser.tsx       # TLV to JSON parser
│   ├── JSONToTLVConverter.tsx  # JSON to TLV with QR
│   └── index.ts            # Barrel exports
├── lib/                    # Business logic & utilities
│   ├── tlv.ts              # TLV parsing logic
│   ├── json-to-tlv.ts      # JSON conversion logic
│   ├── constants.ts        # Sample data
│   └── index.ts            # Barrel exports
├── App.tsx                 # Main component
├── App.css                 # Styles
├── main.tsx                # Entry point
└── index.css               # Global styles
```

See [STRUCTURE.md](./STRUCTURE.md) for detailed architecture documentation.

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Preview production build
npm run preview
```

## Usage

### Parsing TLV to JSON

1. Enter or paste your TLV string in the first textarea
2. Click "Parse TLV to JSON"
3. View the parsed JSON result
4. Click "Copy JSON" to copy the result

Example TLV input:
```
00020101021126610014COM.GO-JEK.WWW01189360091434630238780210G4630238780303URE
```

### Converting JSON to TLV with QR Code

1. Enter your JSON object in the second textarea
2. Click "Convert JSON to TLV"
3. View the generated TLV string
4. **QR Code will be automatically generated**
5. Click "Copy TLV" to copy the TLV string
6. Click "Download QR Code" to save the QR code as image

Example JSON input:
```json
[
    {
        "tag": "00",
        "length": 2,
        "value": "01"
    },
    {
        "tag": "01",
        "length": 2,
        "value": "12"
    }
]
```

## TLV Format

TLV (Tag-Length-Value) is a data encoding scheme where:
- **Tag**: 2-digit identifier
- **Length**: 2-digit length of the value
- **Value**: The actual data (can contain nested TLV structures)

## File Structure

- `index.html` - Main HTML structure (includes QRCode.js library)
- `styles.css` - Styling and layout (with QR code styles)
- `tlv.js` - TLV parsing class
- `json-to-tlv.js` - JSON to TLV conversion class
- `app.js` - Application logic, event handlers, and QR code generation

## Libraries Used

- **QRCode.js** (v1.5.3) - For generating QR codes from TLV strings

## How to Run

Simply open `index.html` in a web browser. No server or build process required!

## Browser Compatibility

Works with all modern browsers that support:
- ES6 JavaScript
- Clipboard API
- CSS Grid/Flexbox
- HTML5 Canvas (for QR Code)

## License

MIT License - Feel free to use and modify as needed.