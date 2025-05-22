# OGame Browser Extension

A browser extension for OGame built with TypeScript and bundled with esbuild.

## Development

### Prerequisites

- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- A Chromium-based browser (Chrome, Edge, Brave, etc.)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

### Development Commands

- `bun run dev` - Starts the development build with watch mode
- `bun run build` - Builds the extension
- `bun run build:prod` - Builds the extension for production (minified)
- `bun run package` - Creates a ZIP file for submission to browser stores

### Loading the Extension

1. Build the extension using `bun run build`
2. Open Chrome/Edge and navigate to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` directory

### Project Structure

```
├── public/           # Static files (manifest.json, icons, etc.)
├── src/
│   ├── background/   # Background script
│   ├── content/      # Content scripts
│   ├── popup/        # Popup UI
│   ├── options/      # Options page
│   └── utils/        # Shared utilities
└── build.ts         # Build configuration
```

## Features

- TypeScript support
- Modern build system with esbuild
- Hot reload during development
- Organized project structure
- Utility functions for common extension tasks

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
