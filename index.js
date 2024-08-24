const express = require('express');
const jsdom = require("jsdom");
const fs = require('fs');
const path = require('path');
const { JSDOM } = jsdom;
const VM = require('vm'); //not sure if i should use this or not for executing .nhtml node code running node with stdin might be better

const app = express();

//util function to get the config and if it doesnt exists then return {}
// todo: make better
function getConfiguration(file) {
    if (fs.existsSync('/etc/dumoserv/conf/'+file)) {
        return JSON.parse(fs.readFileSync('/etc/dumoserv/conf/'+file, 'utf-8'));
    } else {
        return {};
    }
}

/**
 * 404 handler
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
function handle404(req, res) {
    //todo: make this better
    res.type('.txt').send('404 not found');
}

//handle .nhtml (node html) requests
app.all('*.nhtml', (req, res) => {
    const p2 = path.join(__dirname, 'www', req.path.substring(1));
    if (fs.existsSync(p2)) { //todo: don't use synchronous methods
        const newdom = new JSDOM(fs.readFileSync(p2, 'utf-8'));
        newdom.window.document.querySelectorAll('script[usenode]').forEach(item => {
            const code = item.innerHTML;
            let result = '';

            VM.runInNewContext(code, {
                dumoserv: {
                    write: (txt) => {
                        result += txt;
                    },
                    req
                }
            });

            item.outerHTML = result;
        });

        //serialize the manipulated html then return it back
        res.type('html').send(newdom.serialize());
    } else {
        handle404(req, res);
    }
});

app.use(express.static(path.join(__dirname, 'www')));

//404 handler
app.all('*', handle404);

app.listen(8080, () => console.log('http://localhost:8080'));