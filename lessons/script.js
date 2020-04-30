var view = {
  lessonList: document.getElementById('lessonList'),
  nextBtn: document.getElementById('nextBtn'),
  artist: document.getElementById('artist'),
  instruction: document.getElementById('instruction'),
  blocklyDiv: document.getElementById('blocklyDiv'),
  hydraCanvas: document.getElementById('hydraCanvas'),
};

var lessons = [
  {
    instruction: "Hello! I am Archan, a digital artist. Today we will build some camera filters.\nDrag the webcam block from toolbar and connect it to output.",
    success: "Great work! Adjust your camera, and click Next when you are ready.",
    error: "",
    toolbox: [`<block type="out"></block>`, `<block type="webcam"></block>`],
    artist: 'happy', 
  }, {
    instruction: "Adjusting the lighting is important to make sure you are visible in the photo.\nYou can drag and attach brightness and contrast blocks to webcam and adjust them by changing the amount.",
    success: "Looking good! Click Next when you are satisfied with the lighting.",
    error: "",
    toolbox: [`<block type="brightness"><field name="amount">0.5</field></block>`,`<block type="contrast"><field name="amount">1.5</field></block>`],
    artist: 'happy', 
  }, {
    instruction: "Now let adjust the color of the image a bit.\nTry the color filters in the toolbox. Mix and match them to your heart's content.",
    success: "Good job! Proceed by clicking next.",
    error: "",
    toolbox: [
      `<block type="saturate">
        <field name="amount">1.5</field>
      </block>`,
      `<block type="grayscale">
        <field name="amount">0.5</field>
      </block>`,
      `<block type="sepia">
        <field name="amount">0.5</field>
      </block>`],
    artist: 'happy', 
  }, {
    instruction: "How about some recoloring?\nAttach one of the blend blocks from the toolbox right before output.\nYou can also adjust the blend mode and colors to get a desired effect.",
    success: "Now that's art! Tune the values to your liking, and click next when you are ready.",
    error: "",
    toolbox: [`<block type="blendMode">
    <field name="mode">color</field>
    <statement name="texture">
      <block type="conicGradient">
      </block>
    </statement>
  </block>`,
  `<block type="blendMode">
    <field name="mode">overlay</field>
    <statement name="texture">
      <block type="radialGradient">
      </block>
    </statement>
  </block>`,
  `<block type="blendMode">
    <field name="mode">hardLight</field>
    <statement name="texture">
      <block type="linearGradient">
      </block>
    </statement>
  </block>`,
  ],
    artist: 'happy', 
  }, {
    instruction: "Let us finish it up with some fun effects.",
    success: "Well done! Fine tune the values for all the filters you have added, and hit publish when you are done.",
    error: "",
    toolbox: [
      `<block type="kaleid">
        <field name="nSides">12</field>
      </block>`,
      `<block type="posterize">
        <field name="bins">6</field>
      </block>`,
      `<block type="pixelate">
        <field name="pixelX">80</field>
        <field name="pixelY">80</field>
      </block>`
    ],
    artist: 'happy', 
  }
];

var parser = new DOMParser();
var toolbox = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>';
toolbox = parser.parseFromString(toolbox, "application/xml");
toolbox = toolbox.firstElementChild;
var hydraCode = '';
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
 
var workspace = Blockly.inject(view.blocklyDiv, options);


var state = {
  lessonIndex: 0,
  workspace: '<block x="50" y="50" type="out"></block>'
};

function init() {
  view.lessonList.innerHTML = lessons.map((l, i) => `<li>${i+1}</li>`).join('');
  var workspaceBlocks = `<xml xmlns="https://developers.google.com/blockly/xml">${state.workspace}</xml>`;
  workspaceBlocks = parser.parseFromString(workspaceBlocks, "application/xml");
  workspaceBlocks = workspaceBlocks.firstElementChild;
  gotoLesson(state.lessonIndex);
  /* Load blocks to workspace. */
  Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
}

function updateToolbox(toolboxList) {
  toolboxList.forEach(blockXML => {
    blockXML = parser.parseFromString(blockXML, "application/xml");
    toolbox.insertBefore(blockXML.firstElementChild, toolbox.firstElementChild);
  });
  workspace.updateToolbox(toolbox);
}

function gotoLesson(index) {
  if(index === lessons.length) {
    window.open(window.location.origin + '/showcase.html?code=' + LZString.compressToEncodedURIComponent(hydraCode), '_blank');
    return
  }
  if(index === lessons.length - 1) {
    view.nextBtn.textContent = 'Share';
  }
  var lesson = lessons[index];
  var prev = document.querySelector('li.current');
  if(prev) {
    prev.classList.remove('current');
    prev.classList.add('completed');
  }
  document.querySelector(`li:nth-of-type(${index+1})`).classList.add('current');
  view.instruction.textContent = lesson.instruction;
  updateToolbox(lesson.toolbox);
}

function handleClickNext() {
  state.lessonIndex++;
  gotoLesson(state.lessonIndex);
}
function updateCanvas(e) {
	window.LoopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP =
		'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
	hydraCode = Blockly.JavaScript.workspaceToCode(workspace);
	if(window._blocklyHydra.webcamSrc !== null) {
		hydraCode = 's3.initCam(window._blocklyHydra.webcamSrc);\n' + hydraCode;
	}
  try {
    eval(hydraCode);
  } catch (e) {
    console.log(e, hydraCode);
  }
}

workspace.addChangeListener(updateCanvas);
view.nextBtn.addEventListener('click', handleClickNext);
init();