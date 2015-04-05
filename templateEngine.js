var TemplateEngine = function(html, options) {
	var re = /<%([^%>]+)?%>/g,
		reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
		code = 'var r = [];\n',
		cursor = 0;
	var match;
	var add = function(line, js) {
		js? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' :
			code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
	}
	while (match = re.exec(html)) {
		add(html.slice(cursor, match.index));
		add(match[1], true);
		cursor = match.index + match[0].length;
	}
	add(html.substr(cursor));
	code += 'return r.join("");';
	console.log(code);
	return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}
