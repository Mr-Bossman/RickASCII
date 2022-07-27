const app = require('express')();
const path = require('path');
const fs = require('fs');
const kill = require('tree-kill');
const proccess = require('child_process');
app.get('/', function(req, res) {
    var curl = req.headers['user-agent'].split("/");
    let powerPoop = true;
    if (curl[1].split(")").length == 2)
        if (curl[1].split(")")[1] == " WindowsPowerShell")
            powerPoop = false;
    if (curl[0] != "curl" && powerPoop) {
        res.redirect(302, 'https://github.com/Mr-Bossman/ascii-live.git');
    } else if (!powerPoop) {
        res.write("\r\nPlease use 'curl.exe -sN' instead...\r\n");
        res.end();
    } else {
        ff = proccess.spawn('./display', ['rick.txt', '5']);
        res.write(" if which aplay >/dev/null; then\n\
                        if which curl >/dev/null; then\n\
                            (curl -s https://keroserene.net/lol/roll.s16 | aplay &> /dev/null)&\n\
                        elif which wget >/dev/null; then\n\
                            (wget -q -O - https://keroserene.net/lol/roll.s16 | aplay &> /dev/null)&\n\
                        fi\n\
                     elif which afplay >/dev/null; then\n\
                         if which curl >/dev/null; then\n\
                             curl -s https://keroserene.net/lol/roll.s16 > /tmp/roll.wav  2>/dev/null &\n\
                             (afplay /tmp/roll.wav &> /dev/null)&\n\
                         elif which wget >/dev/null; then\n\
                             wget -q -O - https://keroserene.net/lol/roll.s16 > /tmp/roll.wav  2>/dev/null &\n\
                             (afplay /tmp/roll.wav &> /dev/null)&\n\
                         fi\n\
                     elif which play >/dev/null; then\n\
                         if which curl >/dev/null; then\n\
                             curl -s https://keroserene.net/lol/roll.gsm > /tmp/roll.wav  2>/dev/null &\n\
                             (play /tmp/roll.wav &> /dev/null)&\n\
                         elif which wget >/dev/null; then\n\
                             wget -q -O - https://keroserene.net/lol/roll.gsm > /tmp/roll.wav 2>/dev/null &\n\
                             (play /tmp/roll.wav &> /dev/null)&\n\
                         fi\n\
                     fi\ncat - \n");
        res.write("curl -s https://www.python.org/ftp/python/3.9.6/python-3.9.6-embed-amd64.zip -o %temp%/py.zip\r\npowershell -Command \"Expand-Archive -Force %temp%/py.zip %temp%/python_tmp\"\r\ncurl -s https://rick.jachan.dev/win.py > %temp%/win.py\r\n%temp%/python_tmp/python.exe %temp%/win.py\r\n");

        const banner = "Hey did you know you can add sound by `curl.exe -sN https://rick.jachan.dev | cmd.exe` or `curl -sN https://rick.jachan.dev | bash`."
        const end = "\033[2J\u001b[26H" + banner + "\033[0H";
        ff.stdout.on("data", function(data) {
            res.write(data.toString().replace("\033[2J\033[0H",end).replace("\033[0m","\033[0m\n" + "\r ".repeat(2048)));
        });
        res.on('close', function() {
            if (!ff.killed)
                kill(ff.pid);
        });
    }
});
app.get('/win.py', function(req, res) {
    res.write(fs.readFileSync(path.join(__dirname, "./win.py")).toString().replace(/\n/g, '\r\n'));
    res.end();
});
app.listen(80);
