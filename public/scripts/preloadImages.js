var images = [
	'/images/ajax-loader.gif'
];
$(images).each(function () {
	$('<img/>')[0].src = this;
});