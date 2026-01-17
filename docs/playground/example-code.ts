export default `<button id="btn">animate</button>

<div class="cube"></div>

<script type="module">
  import {modifyTo, createAnimation, getLinearInterp, sleep, getStateTree} from "https://esm.run/aninest";
  import {getUpdateLayer} from "https://esm.run/@aninest/extensions";
  let anim = createAnimation({x: 0}, getLinearInterp(1));
  let updateLayer = getUpdateLayer();
  updateLayer.mount(anim);
  function animate() {
    modifyTo(anim, {x: Math.random() * (window.innerWidth - 55)}); 
  }

  window.onresize = () => {
    const {x} = getStateTree(anim);
    if (x > window.innerWidth - 55) {
      modifyTo(anim, {x: window.innerWidth - 55});
    }
  }

  let btn = document.querySelector("#btn");
  btn.onclick = animate;
  updateLayer.subscribe("updateWithDeltaTime", () => {
    const cube = document.querySelector(".cube"); 
    const {x} = getStateTree(anim);
    cube.style.transform = \`translateX(\${x}px)\`;
  })
</script>

<style>
.cube {
  width: 50px;
  height: 50px;
  background-color: rgb(255, 0, 0);
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>`
