<script setup lang="ts">
import { useReactiveBreakpoints } from "../src/use.reactive.breakpoints";
const $breakpoints = useReactiveBreakpoints();
// $breakpoints is now a reactive object with the following properties:
// $breakpoints.xs
// $breakpoints.sm
// $breakpoints.md
// $breakpoints.lg
// $breakpoints.xl
// $breakpoints.xxl
// $breakpoints.smAndDown
// $breakpoints.smAndUp
// $breakpoints.mdAndDown
// $breakpoints.mdAndUp
// $breakpoints.lgAndDown
// $breakpoints.lgAndUp

// watch for changes
$breakpoints.watch((state) => {
  console.log(state);
});


</script>

<template>
  <div>
    <h4>Width : {{ $breakpoints.width }}</h4>
    <h4>height : {{ $breakpoints.height }}</h4>
    <h4>is XS : {{ $breakpoints.xs }}</h4>
    <h4>is SM : {{ $breakpoints.sm }}</h4>
    <h4>is MD : {{ $breakpoints.md }}</h4>
    <h4>is LG : {{ $breakpoints.lg }}</h4>
    <h4>is XL : {{ $breakpoints.xl }}</h4>
    <h4>is XXL : {{ $breakpoints.xxl }}</h4>
    <h4>is SmAndDown : {{ $breakpoints.smAndDown }}</h4>
    <h4>is SmAndUp : {{ $breakpoints.smAndUp }}</h4>
    <h4>is MdAndDown : {{ $breakpoints.mdAndDown }}</h4>
    <h4>is MdAndUp : {{ $breakpoints.mdAndUp }}</h4>
    <h4>is LgAndDown : {{ $breakpoints.lgAndDown }}</h4>
    <h4>is LgAndUp : {{ $breakpoints.lgAndUp }}</h4>
  </div>
</template>

<style scoped>

</style>
