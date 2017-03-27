// 1 варіант
function p(nodeName, attrObj, children) {
  let elem = document.createElement(nodeName);

  if (attrObj != null) {
  	  for (attr in attrObj) {
  	
		if (attr === 'textContent') {
	  		elem.textContent = attrObj[attr];
	  		continue;
	  	}

	  	if (typeof attrObj[attr] === 'function') {
	  		let eventName = attr.substring(2);
	  		elem.addEventListener(eventName, attrObj[attr]);
	  		continue;
	  	}

	  	elem.setAttribute(attr, attrObj[attr]);
	  }
  }


  if (children && children.length > 0)
  	children.forEach( (child) => elem.appendChild(child) );

  return elem;
}

// 2 варіант
function p(nodeName, attrObj, last) {
  let elem;

  try {
  	elem = document.createElement(nodeName);
  }
  catch (e) {
  	return document.createTextNode(nadeName);
  }
  

  if (attrObj != null) {
  	  for (attr in attrObj) {
  	
		if (attr === 'textContent') {
	  		elem.textContent = attrObj[attr];
	  		continue;
	  	}

	  	if (typeof attrObj[attr] === 'function') {
	  		let eventName = attr.substring(2);
	  		elem.addEventListener(eventName, attrObj[attr]);
	  		continue;
	  	}

	  	elem.setAttribute(attr, attrObj[attr]);
	  }
  }

  if (last) {
  	if (typeof last === 'string')
  		elem.textContent = last;
  	else if (last.length > 0)
  		last.forEach( (child) => {
  			if (child && child.nodeType === 1)
  				elem.appendChild(child);
  			else {
  				elem.appendChild(document.createTextNode(child));
  			}
  		});
  }
  
  return elem;
}

