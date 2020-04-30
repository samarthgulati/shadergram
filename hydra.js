var hydraCanvas = document.getElementById("hydraCanvas");
// var aspectRatio = window.innerHeight / window.innerWidth;
// hydraCanvas.width = 480;
// hydraCanvas.height = 480 * aspectRatio;
hydraCanvas.width = 640;
hydraCanvas.height = 480;
var hydra = new Hydra({
	canvas: hydraCanvas
});
blendmodes_glsl_fns.forEach(function(fn) {
  hydra.synth.setFunction(fn)
});
levels_glsl_fns.forEach(function(fn) {
  hydra.synth.setFunction(fn)
});
css_filter_glsl_fns.forEach(function(fn) {
  hydra.synth.setFunction(fn)
});
css_gradients_glsl_fns.forEach(function(fn) {
  hydra.synth.setFunction(fn)
});
window._blocklyHydra = {
  webcamSrc: null
}