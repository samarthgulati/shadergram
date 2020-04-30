var blocklyDiv = document.getElementById('blocklyDiv');
var hydraCode;
var options = { 
	toolbox : toolbox, 
	collapse : false, 
	comments : false, 
	disable : false, 
	maxBlocks : Infinity, 
	trashcan : false, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	media : 'https://blockly-demo.appspot.com/static/media/', 
	rtl : false, 
	scrollbars : true, 
	sounds : true, 
	oneBasedIndex : true
};
 
var workspace = Blockly.inject(blocklyDiv, options);

/* Load blocks to workspace. */
Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

function updateCanvas(e) {
	// Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	window.LoopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP =
		'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
	hydraCode = Blockly.JavaScript.workspaceToCode(workspace);
	if(window._blocklyHydra.webcamSrc !== null) {
		hydraCode = 's3.initCam(window._blocklyHydra.webcamSrc);\n' + hydraCode;
	}
	if(window._blocklyHydra.videoSrc !== null) {
		hydraCode = `var vid = document.createElement('video');
vid.crossOrigin = 'anonymous';
vid.autoplay = true;
vid.loop = true;
vid.src = window._blocklyHydra.videoSrc;
s2.init({src: vid});\n` + hydraCode;
	}
	if(window._blocklyHydra.imageSrc !== null) {
		hydraCode = `var imgEl = document.createElement('img');
imgEl.crossOrigin = 'anonymous';
imgEl.src = window._blocklyHydra.imageSrc;
s1.init({src: imgEl});\n` + hydraCode;
	}
	try {
		eval(hydraCode);
	} catch (e) {
		console.log(e, hydraCode);
	}
}

workspace.addChangeListener(updateCanvas);

document.getElementById('shareBtn').addEventListener('click', function() {
	window.open(window.location.origin + '/showcase.html?code=' + LZString.compressToEncodedURIComponent(hydraCode), '_blank');
})
