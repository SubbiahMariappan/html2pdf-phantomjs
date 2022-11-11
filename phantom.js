const phantom = require('phantom');
const util = require('util');

const fs = require('fs')
const path = require('path')
const execFile = util.promisify(require('child_process').execFile);

async function render(body){
    console.log('rendering');
    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.property('viewportSize', { width: 1024, height: 600 });
    await page.setContent( body.body, 'https://www.google.com/');
    var title = await page.property('title');
    
    await page.property("paperSize",{format: "A4", margin: "1cm"});
    await page.property("dpi", 95);

    var pdf = await page.render('test.pdf');
    // console.log(pdf)

    console.log(title);
    
    console.log(`File created at [./test.pdf]`);

    await instance.exit();
    return pdf;
};

async function render2(body){
    const phantomjs = path.resolve('bin/phantomjs-linux')
    // rasterize file responsible for executing phantomjs code
    const rasterize = path.resolve('lib/rasterize.js')
    const outputPDF = '/tmp/testo.pdf'
    console.log('inside render2')
    //simple test body
    const mbody = "<html><body>GodZalo</body></html>";
    console.log('execute phantomjs')
     const promise = execFile(phantomjs, [rasterize, body.body, outputPDF]);
     const child = promise.child;
     child.on('error',(err) => {
        console.log(err)
     })
     child.on('close',(resp) => {
            const output = fs.readFileSync(outputPDF) 
            output.toString('base64');
            console.log(output.toString('base64'))
          }
     );
     const {pdfBinary } = await promise;
     console.log(`return ${pdfBinary}`);
     return pdfBinary;
}

module.exports = {
    render,
    render2
}