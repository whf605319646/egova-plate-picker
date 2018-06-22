const props = `
<template>
    <plate :disabled="false" :defaultProvince="'鄂'" :hidePlateType="false" :place="'bottom'"></plate>
</template>
<script lang="ts">
import { component, View } from "flagwind-web";
import { PlateSelector } from "src/index";
@component
({
template: require("./index.html"),
components:
{
    "plate": PlateSelector
}
})
export default class Plate extends View{
}
</script>`;
export default props;
