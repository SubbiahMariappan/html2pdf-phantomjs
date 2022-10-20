const phantom = require('phantom');

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


module.exports = {
    render
}