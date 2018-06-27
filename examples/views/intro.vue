<template>
    <l-generic>
        <div class="v-plate">
            <h1>号码号牌输入组件</h1>
            <p>属性配置</p>
            <u-example title="设置最常用车牌前缀">
                <template slot="case">
                    <plate :disabled="false" :defaultProvince="'鄂'" :hidePlateType="false" :place="'bottom'"></plate>
                </template>
                <template slot="desc">
                    <p>通过设置<code>disabled</code>属性改变组件可用状态</p>
                    <p>通过设置<code>defaultProvince</code>属性改变常用前缀</p>
                    <p>通过设置<code>hidePlateType</code>属性控制是否隐藏号牌类型选择</p>
                    <p>通过设置<code>place</code>属性控制控制弹出窗口的方位.可选值为<code>top</code><code>top-start</code><code>top-end</code><code>bottom</code><code>bottom-start</code><code>bottom-end</code><code>left</code><code>left-start</code><code>left-end</code><code>right</code><code>right-start</code><code>right-end</code></p>
                </template>
                <u-code slot="code" lang="html">{{codes.props}}</u-code>
            </u-example>
            <p>组件传值</p>
            <u-example title="组件传值">
                <template slot="case">
                    <plate v-on:change="changePlate" ref="plate"></plate>
                    父组件中获取选择的车牌号：<i-input v-model="plateNo" style="width:80%;margin:10px 0;"></i-input>
                    父组件中获取选择的车牌类型：<i-input v-model="plateType" style="width:75%;margin:10px 0;"></i-input>
                    <i-button type="primary" v-on:click="setData">父组件设置车牌组件的值</i-button>
                    <i-button type="ghost" v-on:click="reset">重置</i-button>
                </template>
                <template slot="desc">
                    <p>通过<code>change</code>事件来监测组件选择值的变化进行一些业务处理</p>
                    <p>通过<code>setPlateData</code>实例方法对组件进行赋值，有时候编辑信息时需要设置初始值可以使用</p>
                    <p>通过<code>reset</code>实例方法对组件进行重置</p>
                </template>
                <u-code slot="code" lang="html">{{codes.method}}</u-code>
            </u-example>
            <div class="api">
                <h2>API</h2>
                <h3>配置属性</h3>
                <table>
                    <thead>
                        <tr>
                            <th>属性名</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>必填</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>Boolean</td>
                            <td>-</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>defaultProvince</td>
                            <td>最常用省份</td>
                            <td>String</td>
                            <td>-</td>
                            <td>京</td>
                        </tr>
                        <tr>
                            <td>hidePlateType</td>
                            <td>是否显示车牌类型选择</td>
                            <td>Boolean</td>
                            <td>-</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>place</td>
                            <td>弹出窗口方位</td>
                            <td>String</td>
                            <td>-</td>
                            <td>left-start</td>
                        </tr>
                    </tbody>
                </table>
                <h3>实例方法</h3>
                <table>
                    <thead>
                        <tr>
                            <th>方法名</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>setPlateData</td>
                            <td>设置 组件车牌和类型参数为(plateNo, plateTypeId)</td>
                        </tr>
                        <tr>
                            <td>reset</td>
                            <td>重置组件数据</td>
                        </tr>
                    </tbody>
                </table>
                <h3>事件</h3>
                <table>
                    <thead>
                        <tr>
                            <th>事件名</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>change</td>
                            <td>输入改变时触发，参数为数组类型，arr[0]为车牌号，arr[1]为车牌类型</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </l-generic>
</template>
<style lang="less" scoped>
.v-plate
{
    padding: 20px 25px;
}
</style>
<script lang="ts">
import { component, View } from "flagwind-web";
import { PlatePicker } from "src/index";
import * as codes from "examples/codes";
@component
({
    components:
    {
        "plate": PlatePicker
    }
})
export default class Plate extends View{
    protected codes: any = codes;
    protected plateNo: string = "";
    protected plateType: string = "";
    protected changePlate(arr: Array<string>) {
        this.plateNo = arr[0];
        this.plateType = arr[1];
    }
    protected setData() {
        (<PlatePicker>this.$refs["plate"]).setPlateData("鄂A123", "LargeCar");
    }
    protected reset() {
        (<PlatePicker>this.$refs["plate"]).reset();
    }
}
</script>
