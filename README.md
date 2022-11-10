# Serverless HTML2PDF with Express API

## Notes:
- According to a thread we *should* save the generated file to /tmp/file.pdf (currently being generated at same level of task)
- Instead of using `setContent` [This thread shows a better way to doing it](https://stackoverflow.com/questions/46106396/phantomjs-render-html-to-pdf)
- Not clear on how to properly create the promises for the child process

## Testing/Debugging rasterize.js locally
- run `phantomjs ./lib/rasterize.js <html_to_be_sent> <output_filename.pdf>`

## Structure
- `index.js` is the express routing
- `phantom.js` is the node layer that connects with `rasterize.js`
- `rasterize.js` is the code that interprets phantomjs
