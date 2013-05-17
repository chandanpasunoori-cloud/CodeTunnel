var setupHelpers = require('./helperFunctions.js');

exports.description = 'Displays my contact information.';

exports.invoke = function (res, options, shell) {
    setupHelpers(res);
    res.log('Alex Ford');
    res.log('<a href="mailto:Alex.Ford@CodeTunnel.com">Alex.Ford@CodeTunnel.com</a>', { dontType: true });
    res.log('(801) 769-6018');
    res.log('<a href="http://www.linkedin.com/pub/alex-ford/42/42a/452">Visit my LinkedIn profile</a>', { dontType: true });
    res.log();
    res.type('Feel free to contact me at any time!');
};