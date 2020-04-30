var hydraFnTypesToBlocklyCategories = {
	"src": {
		"category": "I/O & Texture",
		"index": 0
	},
	"coord": {
		"category": "Geometry Transforms",
		"index": 1
	},
	"color": {
		"category": "Adjust Color",
		"index": 2
	},
	"combine": {
		"category": "Blend",
		"index": 3
	},
	// "combineCoord": {
	// 	"category": "Modulators",
	// 	"index": 4
	// },
  // "parameter": {
  //   "category": "Parameters",
	// 	"index": 5
  // },
  
};

var hueDivisor = Object.keys(hydraFnTypesToBlocklyCategories).length + 1;
var hueMultiplier = 360 / hueDivisor;

function code(blockType, args, dot) {
  return `${dot ? '' : '.'}${blockType}(${args.join(',')})`
}

var gradients = ["linearGradient", "radialGradient", "conicGradient"];
var blendModes = ["darken","multiply","colorBurn","linearBurn","darkerColor","lighten","screen","colorDodge","linearDodge","lighterColor","overlay","softLight","hardLight","vividLight","linearLight","pinLight","hardMix","difference","exclusion","subtract","divide","hueBlend","colorBlend","saturationBlend","luminosityBlend"];
var unsupportedFns = ['r', 'g', 'b', 'a', 'prev', 'sum', 'src'];
var unsupportedTypes = ["combineCoord"];
var specialFns = [{
  name: 'blendMode',
  type: 'combine'
},{
  name: 'webcam',
  type: 'src'
},
{
  name: 'linearGradient',
  type: 'src'
},
{
  name: 'radialGradient',
  type: 'src'
},
{
  name: 'conicGradient',
  type: 'src'
},{
  name: 'image',
  type: 'src'
},{
  name: 'video',
  type: 'src'
},{
  name: 'out',
  type: 'src'
}, 
// {
//   name: 'number',
//   type: 'parameter'
// }, {
//   name: 'array',
//   type: 'parameter'
// }, {
//   name: 'anon',
//   type: 'parameter'
// }, {
//   name: 'text',
//   type: 'parameter'
// }, {
//   name: 'audioConfig',
//   type: 'parameter'
// }
];

var hydraFns = Object.values(hydra.generator.glslTransforms);

hydraFns.forEach(fn => {
  if(unsupportedFns.indexOf(fn.name) > -1) return;
  if(blendModes.indexOf(fn.name) > -1) return;
  if(gradients.indexOf(fn.name) > -1) return;
  if(unsupportedTypes.indexOf(fn.type) > -1) return;
  fn.inputs.forEach(ip => {
    if(ip.type === 'vec4') {
      ip.name = 'texture';
    }
  });
  
	Blockly.defineBlocksWithJsonArray([{
    type: fn.name,
		message0: `${fn.type === 'src' ? '' : '.'}${fn.name}( ${fn.inputs.map((ip, i) => `${ip.name}: %${i+1}`).join(' , ')})`,
		args0: fn.inputs.map(ip => {
        if(ip.type === 'vec4') {
          return {
            type: 'input_statement',
            name: ip.name
          }
        } else if (ip.type === 'sampler2D') {
          return {
            type: 'input_value',
            name: ip.name
          }
        } else {
          return {
            type: 'field_number',
            name: ip.name,
            value: ip.default
          }
        }
      }
    ),
		previousStatement: '',
		nextStatement: '',
		colour: hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
		tooltip: '',
		helpUrl: ''
  }]);
	Blockly.JavaScript[fn.name] = function (block) {
    if(block.getNextBlock() === null && block.getPreviousBlock() === null) return '';
    var args = fn.inputs.map(ip => {
      if(ip.type === 'vec4') {
        return Blockly.JavaScript.statementToCode(block, ip.name);
      } else if (ip.type === 'sampler2D') {
        var value_tex = Blockly.JavaScript.valueToCode(block, ip.name, Blockly.JavaScript.ORDER_ATOMIC);
        value_tex = value_tex.substring(1, value_tex.length - 1);
        return value_tex;
      } else {
        return block.getFieldValue(ip.name)
        // Blockly.JavaScript.valueToCode(block, ip.name, Blockly.JavaScript.ORDER_ATOMIC);
      }
    });
		return code(block.type, args, fn.type === 'src');
  };
  // var blockXML = `<block type="${fn.name}">
  //   ${fn.inputs.map(ip => {
  //     if(ip.type === 'vec4') return '';
  //     else if (ip.type === 'sampler2D') {
  //       return `<value name="${ip.name}">
  //         <block type="text">
  //           <field name="TEXT">o1</field>
  //         </block>
  //       </value>`
  //     }
  //     else return ``
  //   }).join('\n')}
  // </block>`;
  // blockXML = parser.parseFromString(blockXML, "application/xml");
  // var categoryNode = toolbox.querySelector(`category[name="${hydraFnTypesToBlocklyCategories[fn.type].category}"]`);
  // if(!categoryNode) {
  //   categoryNode = toolbox.parentNode.createElement('category');
  //   categoryNode.setAttribute('name', hydraFnTypesToBlocklyCategories[fn.type].category);
  //   categoryNode.setAttribute('colour', hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier);
  //   toolbox.appendChild(categoryNode);
  // }
  // categoryNode.appendChild(blockXML.firstElementChild);
});

specialFns.forEach(addSpecialBlock);
