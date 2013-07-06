var setupHelpers = require('./helperFunctions.js');

exports.description = 'Displays a welcome message.';

exports.invoke = function (options, shell) {
    var res = this;
    setupHelpers(res);
    res.type("Well hello there! My name is Alex Ford.");
    res.type("I'd just like to say...");
    res.log();
    res.log('&nbsp;/$$      /$$           /$$                                            ');
    res.log('| $$  /$ | $$          | $$                                            ');
    res.log('| $$ /$$$| $$  /$$$$$$ | $$  /$$$$$$$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$ ');
    res.log('| $$/$$ $$ $$ /$$__  $$| $$ /$$_____/ /$$__  $$| $$_  $$_  $$ /$$__  $$');
    res.log('| $$$$_  $$$$| $$$$$$$$| $$| $$      | $$  \\ $$| $$ \\ $$ \\ $$| $$$$$$$$');
    res.log('| $$$/ \\  $$$| $$_____/| $$| $$      | $$  | $$| $$ | $$ | $$| $$_____/');
    res.log('| $$/   \\  $$|  $$$$$$$| $$|  $$$$$$$|  $$$$$$/| $$ | $$ | $$|  $$$$$$$');
    res.log('|__/     \\__/ \\_______/|__/ \\_______/ \\______/ |__/ |__/ |__/ \\_______/');
    res.log();
    res.type('...to my interactive résumé!');
    res.log();
    res.type("Type 'intro' to get started or 'help' if you've been here before.", 0, 0, 1000);
};