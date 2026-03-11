# Passport Photo Printer

A simple client-side web app that arranges passport photos onto standard print sizes (4x6" and 5x7") at 300 DPI - ready to print at home or at a pharmacy kiosk.

**Try it:** https://dandanilyuk.github.io/passport_photo_generator/

## How to Use

1. Crop your passport photo using the [State Department's free crop tool](https://tsg.phototool.state.gov/photo).
2. Upload your cropped photo.
3. Pick a print size (4x6" or 5x7").
4. Download the print-ready JPEG.

## Development

No build tools, package manager, or dev server required. Just open `index.html` in a browser.

### Project Structure

- `index.html` - Single page with file input, size selector, and canvas preview
- `imageProcessor.js` - Image loading, cropping, resizing, and JPEG download logic
- `styles.css` - Responsive layout

### Output Specs

All output is 300 DPI JPEG:

| Size | Pixels |
|------|--------|
| Passport (2x2") | 600 x 600 |
| 4x6" | 1200 x 1800 |
| 5x7" | 1500 x 2100 |

## License

MIT
