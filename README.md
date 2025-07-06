# Text Relay for Raycast

A Raycast extension that allows you to send typed text to the currently active window. Perfect for situations where you need to input text into applications that don't support direct paste or have special input requirements.

## Features

- 📝 Type text in Raycast and send it to any active window
- ⏱️ Configurable delay before sending (allows time to switch windows)
- 🇯🇵 Full Unicode support including Japanese characters
- ⌨️ Keyboard shortcut: `Cmd+Enter` to send

## Installation

### Prerequisites

- [Raycast](https://raycast.com/) installed on your Mac
- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) package manager

### Steps

1. Clone this repository:
```bash
git clone https://github.com/yourusername/raycast-extension-text-relay.git
cd raycast-extension-text-relay
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the extension:
```bash
pnpm run build
```

4. Add to Raycast:
```bash
pnpm run dev
```

This will open the extension in Raycast's development mode. You can also import the extension manually through Raycast's preferences.

## Usage

1. Open Raycast (default: `Cmd+Space`)
2. Search for "Send Text to Active Window"
3. Enter the text you want to send
4. Set the delay (default: 0.1 seconds)
5. Press `Cmd+Enter` to send
6. Quickly switch to your target window
7. The text will be automatically typed after the delay

## How it Works

The extension uses Raycast's native Clipboard API to:
1. Wait for the specified delay
2. Automatically close the Raycast window
3. Return focus to the previously active application
4. Paste the text using the `Clipboard.paste()` method

This approach ensures compatibility with Unicode characters and special symbols while providing a more reliable and simpler implementation.

## Development

```bash
# Run in development mode
pnpm run dev

# Build for production
pnpm run build

# Lint code
pnpm run lint

# Fix lint issues
pnpm run fix-lint
```

## Limitations

- The target application must support clipboard paste operations

## Contributing

Pull requests are welcome! Please feel free to submit issues or enhance the extension.

## License

MIT