const { exec } = require('child_process');

function x( str) {
    console.log(str)
    // let result = ''
    return new Promise((res, rej) => {
        exec('sudo iw dev wlan0 scan | grep SSID', (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              rej(err)
            } else {
                res(stdout)
            }
             
        })

    })
    
}

module.exports = x 