var newD = 'newplayjj.com',
	oldD = ['alloeclub.com', 'allohalive.com', 'allohastream.com', 'thealloha.club', 'newplayjj.com'],
	port = ':444',
	delay = 200,
	rep = false,
	timeO;

replace();

function replace() {
	timeO = setTimeout(replace, delay++);

	Array.prototype.find.call(document.body.getElementsByTagName("iframe"), function (elem) {
		var src = elem.src,
			p = '';
		oldD.forEach( (item) => {
			if ( src.includes( item ) ) {
				if ( !src.includes( port ) ) p = port;
				elem.src = src.replace(item, newD + p);
				rep = true;
			}
		} );
		console.log(src);
	});

	if ( rep ) clearTimeout(timeO);
}
