const dns = require('dns');
const pjson = require('./package.json');


class DnsInfo {

    constructor() {

        let argv = process.argv.slice();
        argv.splice(0, 2);

        switch (argv[0]) {

            case new RegExp('^-(v||version)$', 'i').test(argv[0]) && argv[0]:
                console.log('dns version', pjson.version);
                break;

            case new RegExp('^-(h||help)$', 'i').test(argv[0]) && argv[0]:
                console.log('Examples:');
                console.log('dns test-host-name.com');
                console.log('dns test.com');

                console.log('Commands: ');
                console.log('[-h] or [-help]');
                console.log('Example:');
                console.log('dns -h');
                console.log('[-v] or [-version]');
                console.log('Example:');
                console.log('dns -v');


                break;

            default:
                if (argv[0] && this.testDomianName(argv[0])) {
                    this.getDnsInfo(argv[0]);
                } else {
                    console.log('Domain name is required parameter');
                }
        }

    }

    getDnsInfo(domianName) {
        dns.resolveNs(domianName, function (err, addresses) {

            console.log('Name Servers:');
            console.log(addresses);
        });

        dns.resolveMx(domianName, function (err, addresses) {
            console.log('MX Servers:');
            console.log(addresses);
        });

        dns.lookup(domianName, {all: true}, function (err, addresses) {
            console.log('Domian ip:');
            console.log(addresses);
        })
    }

    testDomianName(domianName) {
        let re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
        return re.test(domianName);
    }

}

new DnsInfo();