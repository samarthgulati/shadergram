function addSpecialBlock(fn) {
  var categoryNode = toolbox.querySelector(`category[name="${hydraFnTypesToBlocklyCategories[fn.type].category}"]`);
  if(!categoryNode) {
    categoryNode = toolbox.parentNode.createElement('category');
    categoryNode.setAttribute('name', hydraFnTypesToBlocklyCategories[fn.type].category);
    categoryNode.setAttribute('colour', hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier);
    toolbox.appendChild(categoryNode);
  }
  switch(fn.name) {
    case 'linearGradient': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "linearGradient",
        "message0": "linearGradient( %1 begin: rgb( %2 , %3 , %4 )  x,y ( %5 , %6 ) %7 end:   rgb( %8 , %9 , %10 )  x,y ( %11 , %12 ) %13 )",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "field_number",
            "name": "r1",
            "value": Math.floor(1.0 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "g1",
            "value": Math.floor(0.99 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "b1",
            "value": Math.floor(0.67 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "x1",
            "value": -0.5,
            "min": -1,
            "max": 1
          },
          {
            "type": "field_number",
            "name": "y1",
            "value": -0.5,
            "min": -1,
            "max": 1
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "field_number",
            "name": "r2",
            "value": Math.floor(0.91 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "g2",
            "value": Math.floor(0.06 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "b2",
            "value": Math.floor(0.47 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "x2",
            "value": 0.5,
            "min": -1,
            "max": 1
          },
          {
            "type": "field_number",
            "name": "y2",
            "value": 0.5,
            "min": -1,
            "max": 1
          },
          {
            "type": "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      Blockly.JavaScript['linearGradient'] = function(block) {
        if(block.getNextBlock() === null && block.getPreviousBlock() === null) return '';
        var args = hydra.generator.glslTransforms.linearGradient.inputs.map(ip => block.getFieldValue(ip.name));
        return code('linearGradient', args, true);
      };
      var blockXML = `<block type="linearGradient"></block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'radialGradient': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "radialGradient",
        "message0": "radialGradient( %1 center: rgb( %2 , %3 , %4 )  x,y ( %5 , %6 ) %7 edge:   rgb( %8 , %9 , %10 )  x,y ( %11 , %12 ) %13 )",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "field_number",
            "name": "r1",
            "value": Math.floor(0.63 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "g1",
            "value": Math.floor(0.88 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "b1",
            "value": Math.floor(0.34 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "x1",
            "value": 0,
            "min": -1,
            "max": 1
          },
          {
            "type": "field_number",
            "name": "y1",
            "value": 0,
            "min": -1,
            "max": 1
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "field_number",
            "name": "r2",
            "value": Math.floor(0.64 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "g2",
            "value": Math.floor(0.98 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "b2",
            "value": Math.floor(0.95 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "x2",
            "value": 0.5,
            "min": -1,
            "max": 1
          },
          {
            "type": "field_number",
            "name": "y2",
            "value": 0.5,
            "min": -1,
            "max": 1
          },
          {
            "type": "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      Blockly.JavaScript['radialGradient'] = function(block) {
        if(block.getNextBlock() === null && block.getPreviousBlock() === null) return '';
        var args = hydra.generator.glslTransforms.radialGradient.inputs.map(ip => block.getFieldValue(ip.name));
        return code('radialGradient', args, true);
      };
      var blockXML = `<block type="radialGradient"></block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'conicGradient': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "conicGradient",
        "message0": "conicGradient( %1 begin: rgb( %2 , %3 , %4 ) %5 center: x,y ( %6 , %7 ) %8 end:   rgb( %9 , %10 , %11 )  %12 )",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "field_number",
            "name": "r1",
            "value": Math.floor(0.91 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "g1",
            "value": Math.floor(0.25 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "b1",
            "value": Math.floor(0.28 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "field_number",
            "name": "cx",
            "value": 0,
            "min": -1,
            "max": 1
          },
          {
            "type": "field_number",
            "name": "cy",
            "value": 0,
            "min": -1,
            "max": 1
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "field_number",
            "name": "r2",
            "value": Math.floor(0.14 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "g2",
            "value": Math.floor(0.15 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "b2",
            "value": Math.floor(0.27 * 255),
            "min": 0,
            "max": 255
          },
          {
            "type": "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      Blockly.JavaScript['conicGradient'] = function(block) {
        if(block.getNextBlock() === null && block.getPreviousBlock() === null) return '';
        var args = hydra.generator.glslTransforms.conicGradient.inputs.map(ip => block.getFieldValue(ip.name));
        return code('conicGradient', args, true);
      };
      var blockXML = `<block type="conicGradient"></block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'blendMode': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "blendMode",
        "message0": ".blendMode( %1 name: %2 , %3 texture: %4 %5 )",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "field_dropdown",
            "name": "mode",
            "options": blendModes.map(name => [name, name])
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "texture"
          }
        ],
        "nextStatement": null,
        "previousStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      Blockly.JavaScript['blendMode'] = function(block) {
        if(block.getNextBlock() === null && block.getPreviousBlock() === null) return '';
        var dropdown_mode = block.getFieldValue('mode');
        var statements_texture = Blockly.JavaScript.statementToCode(block, 'texture');
        return `.${dropdown_mode}(${statements_texture})`;
      };
      var blockXML = `<block type="blendMode"></block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'out': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "out",
        "message0": ".out( buffer: %1 )",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "buffer",
            "options": [
              [
                "output0",
                "o0"
              ],
              [
                "output1",
                "o1"
              ],
              [
                "output2",
                "o2"
              ],
              [
                "output3",
                "o3"
              ]
            ]
          }
        ],
        "previousStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      Blockly.JavaScript['out'] = function(block) {
        if(block.getNextBlock() === null && block.getPreviousBlock() === null) return '';
        var args = [
          block.getFieldValue('buffer'),
        ]
        return code(block.type, args) + ';';
      };
      var blockXML = `<block type="out">
        <field name="buffer">o0</field>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
    case 'webcam': {
      Blockly.defineBlocksWithJsonArray([{
        "type": "webcam",
        "message0": "webcam(input: %1 )",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "buffer",
            "options": [
              [
                "webcam0",
                "0"
              ],
              [
                "webcam1",
                "1"
              ]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": hydraFnTypesToBlocklyCategories[fn.type].index * hueMultiplier,
        "tooltip": "",
        "helpUrl": ""
      }]);
      // webcam mapped to s3
      Blockly.JavaScript['webcam'] = function(block) {
        if(block.getNextBlock() === null && block.getPreviousBlock() === null) return '';
        var dropdown_buffer = block.getFieldValue('buffer');
        window._blocklyHydra.webcamSrc = dropdown_buffer
        return `src(s3)`
      };
      var blockXML = `<block type="webcam">
        <field name="input">0</field>
      </block>`;
      blockXML = parser.parseFromString(blockXML, "application/xml");
      categoryNode.appendChild(blockXML.firstElementChild);
      break;
    }
  }
}