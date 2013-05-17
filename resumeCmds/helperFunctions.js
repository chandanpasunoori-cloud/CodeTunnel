module.exports = function(res) {
    res.type = function (text, speed, delayBefore, delayAfter) {
        res.log(text, {
            typeOptions: {
                typeSpeed: typeof speed !== 'undefined' ? speed : 35,
                delayBeforeType: typeof delayBefore !== 'undefined' ? delayBefore : 1000,
                delayAfterType: typeof delayAfter !== 'undefined' ? delayAfter : 1000
            }
        });
    };
};