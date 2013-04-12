exports.description = 'Interactive résumé application';

exports.usage = '[options]';

exports.options = {
    cover: {
        aliases: ['C'],
        description: 'Displays my cover letter.'
    },
    contact: {
        aliases: ['c'],
        description: 'Displays my contact information.'
    },
    objectives: {
        aliases: ['o'],
        description: 'Displays my career goals and objectives.'
    },
    education: {
        aliases: ['E'],
        description: 'Displays my education and schooling.'
    },
    employment: {
        aliases: ['e'],
        description: 'Displays my employment history.'
    },
    skills: {
        aliases: ['s'],
        description: 'Displays my skills and abilities.'
    },
    honors: {
        aliases: ['H'],
        description: 'Displays my honors and awards.'
    },
    references: {
        aliases: ['r'],
        description: 'Displays a list of my references.'
    },
    intro: {
        description: 'Show the résumé introduction.'
    },
    help: {
        aliases: ['?','h'],
        description: 'Displays all available resume options.'
    }
};

function setupHelpers(res) {
    res.type = function (text, speed, delayBefore, delayAfter) {
        res.log(text, {
            typeOptions: {
                typeSpeed: typeof speed !== 'undefined' ? speed : 35,
                delayBeforeType: typeof delayBefore !== 'undefined' ? delayBefore : 1000,
                delayAfterType: typeof delayAfter !== 'undefined' ? delayAfter : 1000
            }
        });
    };
}

exports.invoke = function (res, options, shell) {

    setupHelpers(res);

    if (options.cover) {
        res.log('Cover Letter');
    }
    if (options.contact) {
        res.log('Contact Section');
    }
    if (options.objectives) {
        res.log('Objectives Section');
    }
    if (options.education) {
        res.log('Education Section');
    }
    if (options.employment) {
        res.log('Employment Section');
    }
    if (options.skils) {
        res.log('Skills Section');
    }
    if (options.honors) {
        res.log('Honors Section');
    }
    if (options.references) {
        res.log('References Section');
    }
    if (options.help) {
        result = shell.execute('help resume');
        res.lines.push.apply(res.lines, result.lines);
    }
    if (options.intro) {

        if (!("Disk 1?" in options)) {
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
            res.type("I bet you thought my resume was going to be dry and boring like everyone else's huh?");
            res.type("Well I showed you!");
            res.type("It's actually super modern and cutting edge.");
            res.type("I mean, you can't get much more cutting edge than a terminal.");
            res.type("Okay, so you probably want to see my résumé now. Give me a second to go fetch it...");
            res.log();
            res.type("Communicating with server...", 0, 0, 500);
            res.type("...done!", 0, 0, 1000);
            res.type("Spinning up tape drive...", 0, 0, 500);
            res.type("...", 0, 0, 500);
            res.type("...", 0, 0, 500);
            res.type('...file corrupt!', 0, 0, 1500);
            res.type("Accessing backups (A:)..........no disk", 0, 0, 500);
        }
        res.prompt("You do have Disk 1 don't you? (y/n)", "Disk 1?", function (answer) {
            switch (answer.toLowerCase()) {
                case 'n' || 'no':
                    res.type("No? What's wrong with you?");
                    res.type('Fine......accessing telegraph array...', 0, 0, 500);
                    break;
                case 'y' || 'yes':
                    res.type("Okay good, just checking.");
                    res.type("I don't actually need it for anything.");
                    res.type('Accessing telegraph array...', 0, 0, 500);
                    break;
            }
            res.type("we get signal");
            res.type(".... --- .-- / .- .-. . / -.-- --- ..- / --. . -. - .-.. . -- . -.", 0, 0, 300);
            res.type(".- .-.. .-.. / -.-- --- ..- .-. / -... .- ... . / .- .-. . / -... . .-.. --- -. --. / - --- / ..- ...", 0, 0, 300);
            res.type("-.-- --- ..- / .- .-. . / --- -. / -.-- --- ..- .-. / .-- .- -.-- / - --- / -.. . ... - .-. ..- -.-. - .. --- -.", 0, 0, 1000);
            res.type("what you say?");
            res.type("-.-- --- ..- / .... .- ...- . / -. --- / -.-. .... .- -. -.-. . / - --- / ... ..- .-. ...- .. ...- . / -- .- -.- . / -.-- --- ..- .-. / - .. -- .", 0, 0, 1000);
            res.type("Okay well the telegraph was a fail I guess. Any other ideas?");
            res.log();
            res.type("You know, I'm actually surprised you even need to see my résumé...");
            res.type("I'm kind of a big deal.");
            res.type("You should probably just hire me.");
            res.type("You know it's the right thing to do. Your company needs me.");
            res.type("But just in case you are still uncertain...");
            res.log('<div style="height: 400px;"><img style="height:400px;" src="/images/hypnotoad.gif" /></div>', { dontType: true });
            res.type("You couldn't possibly resist the influence of hypnotoad.", 35, 0, 5000);
            res.type("Still not convinced?");
            res.type("Okay okay.....have a look at my résumé.", 35, 0, 2000);
            res.log();
            result = shell.execute('help resume');
            res.lines.push.apply(res.lines, result.lines);
            res.setContext('resume');
        });
    }

    var hasOptions = false;
    for (var key in exports.options) {
        if (!hasOptions) hasOptions = options.hasOwnProperty(key);
    }
    if (!hasOptions) {
        res.setContext('resume');
        res.type("Type '--intro' to get started or '--help' if you've been here before.", 0, 0, 1000);
    }
};