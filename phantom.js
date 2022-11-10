const phantom = require('phantom');

const fs = require('fs')
const path = require('path')
const execFile = require('child_process').execFile

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

function render2(body){

    console.log(body)
    const phantomjs = path.resolve('bin/phantomjs-linux')
    // rasterize file responsible for executing phantomjs code
    const rasterize = path.resolve('lib/rasterize.js')
    const outputPDF = 'testo.pdf'
    
    //simple test body
    const mbody = "<html><body>GodZalo</body></html>"

    execFile(phantomjs, [rasterize, mbody, outputPDF], (err, stdout, stderr) => {
        console.log('execute phantomjs')
        console.log(stdout)
        console.log(stderr)
        
        if (err){
            console.log(err)
        }else {
            console.log('You did it')
        }
      })
}

module.exports = {
    render,
    render2
}