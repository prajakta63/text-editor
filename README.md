# Text Editor

This project is a simple text editor built with React and Draft.js. It supports applying styles to text based on specific input patterns (e.g., `#`, `*`, `**`, `***` followed by a space) and allows saving the content to localStorage.

## Features

- `#` + space: Applies "Heading" style to the text.
- `*` + space: Applies "Bold" style to the text.
- `**` + space: Applies "Red" style to the text.
- `***` + space: Applies "Underline" style to the text.
- Save button: Saves the content to localStorage.
- Auto-loads saved content from localStorage on refresh.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/prajakta63/text-editor.git
```

Navigate into the project directory:

```bash
cd text-editor
```

### Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### Start the Development Server

Start the application with the command:

```bash
npm start
```

This will start the development server and open the application in your default web browser at:

```
http://localhost:3000
```

## Usage

1. Open the editor in your browser.
2. Test the following input patterns:
   - Type `#` followed by a space to apply the "Heading" style.
   - Type `*` followed by a space to apply the "Bold" style.
   - Type `**` followed by a space to apply the "Red" style.
   - Type `***` followed by a space to apply the "Underline" style.
3. Click the "Save" button to store the editor content in localStorage.
4. Refresh the page to verify that the saved content is reloaded.

## Optional: Run Online on CodeSandbox

If you'd like to test the code online:

1. Copy your repository URL.
2. Visit [CodeSandbox Import](https://codesandbox.io/s/).
3. Paste the GitHub URL and click "Import and Fork."

## Troubleshooting

### Missing Dependencies

Ensure `draft-js` is installed by running:

```bash
npm install draft-js
```
