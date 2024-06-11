<script setup lang="ts">
const paths = {
    right: "M6 6L12 12L6 18",
    left: "M18 18L12 12L18 6",
    up: "M6 18L12 12L18 18",
    down: "M6 6L12 12L18 6",
    middle: "M4 12L12 12L20 12",
};
type Direction = Omit<keyof typeof paths, "middle">;
const {from, to} = defineProps(['from', 'to'])
// make a dictionary matching direction with path
let middle: "middle" | undefined = undefined;
if ((from === "down" && to === "up") || (from === "up" && to === "down"))
    middle = undefined;
let transitionPaths = [from, middle, to]
    .filter((e) => e != undefined)
    .map((d) => paths[d as keyof typeof paths]);
let transition = transitionPaths.join(";");
</script>
<template>
    <svg
        style="
            stroke-linecap: round;
            stroke-linejoin: round;
            cursor: pointer;
            padding: 0;
            margin: 0;
        "
        version="1.1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="Layer-1" stroke="currentColor" fill="none">
            <path stroke-width="2" d="">
                <animate
                    attributeName="d"
                    fill="freeze"
                    dur=".2s"
                    repeatCount="1"
                    values="{transition}"
                />
            </path>
            <!-- <path d="M6 6L12 12L6 18" id="right" fill="none" stroke-width="4" />
		<path d="M6 6L12 12L18 18" id="right-middle" fill="none" stroke-width="4" />
		<path d="M6 18L12 12L18 18" id="up" fill="none" stroke-width="4" />
		<path d="M4 12L12 12L20 12" id="middle" fill="none" stroke-width="4" />
		<path d="M6 6L12 12L18 6" id="down" fill="none" stroke-width="4" />
		<path d="M18 18L12 12L18 6" id="left" fill="none" stroke-width="4" />
		<path d="M18 18L12 12L6 6" id="left-middle" fill="none" stroke-width="4" /> -->
        </g>
    </svg>
</template>
