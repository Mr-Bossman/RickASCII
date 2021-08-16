const app = require('express')();
const kill = require('tree-kill');
const proccess = require('child_process');
app.get('/', function(req, res) {
    var curl = req.headers['user-agent'].split("/")[0];
    if (curl != "curl") {
        res.redirect('https://github.com/Mr-Bossman/ascii-live.git', 302);
    } else {
        let height = 40;
        let width = 80;
        const query = Array.from((new URL(req.url, req.protocol + '://' + req.headers.host + '/')).searchParams);
        if (query.length === 2 && !isNaN(query[0][1]) && !isNaN(query[1][1])) {
            height = query[0][1];
            width = query[1][1];
            if (height > 360 || width > 640) {
                height = 360;
                width = 640;
            }

        }

        ff = proccess.spawn('./streamer.sh', [height.toString(), width.toString()]);


        res.write("\u001b[?1049h\u001b(B\u001b[m\u001b[?7h\u001b[?1\u001b[H\u001b[2J");

        let frame = new Uint8Array();
        let lastC = "";
        const end = "\u001b[m\u001b[" + height.toString() + "H\n\n\n";
        ff.stdout.on("data", function(data) {
            frame += data;
            if (frame.toString().substring(frame.toString().length - 1) === "H") {
                let tmp = frame.toString().match(".*(\\[.{0,10}H)");
                let pos = "";
                if (tmp)
                    pos = tmp.slice(-1)[0];
                res.write("\u001b" + lastC + frame.toString().split("\u0007").pop() + end + "\u001b" + pos);
                tmp = frame.toString().match(".*(\\[.{1,4}m)");
                if (tmp)
                    lastC = tmp.slice(-1)[0];
                frame = new Uint8Array();
            }
        });
        res.on('close', function() {
            if (!ff.killed)
                kill(ff.pid);
        });
    }
});
app.listen(80);