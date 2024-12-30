# ZICUROassignment

# Draft.js Custom Editor

This project is a customizable rich text editor built using [Draft.js](https://draftjs.org/). The editor supports special input patterns for text formatting and persists its content using local storage.

## Features

### Input Patterns
1. Typing `#` at the start of a line and pressing space:
   - Converts the text on the line into a **Heading** style.
   - The `#` symbol is removed after pressing space.

2. Typing `*` at the start of a line and pressing space:
   - Applies **bold** styling to the rest of the line.
   - The `*` symbol is removed after pressing space.

3. Typing `**` at the start of a line and pressing space:
   - Applies **red text** styling to the rest of the line.
   - The `**` symbols are removed after pressing space.

4. Typing `***` at the start of a line and pressing space:
   - Applies **underline** styling to the rest of the line.
   - The `***` symbols are removed after pressing space.

### Persistence
- Clicking the **Save** button saves the editor's content to the browser's local storage.
- On refreshing the page, previously saved content is automatically loaded into the editor.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harshvardhan119/ZICUROassignment.git
   ```


2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the application in your browser at `http://localhost:3000`.

## File Structure

```
src/
├── components/
│   └── DraftEditor.js   # Main editor component
├── index.js             # Application entry point
└── App.css              # Global styles
```

## Customization

### Styles
- Update `styleMap` in `DraftEditor.js` to define custom styles for text formatting.
- Modify inline styles or create a separate CSS file for further customization of the editor container and buttons.

### Features
- Add new input patterns by extending the `handleBeforeInput` function.
- Implement additional functionality like exporting content to a file or integrating with external APIs.

## Dependencies
- `draft-js`: Core library for building rich text editors.
- `react`: Front-end library for building user interfaces.




