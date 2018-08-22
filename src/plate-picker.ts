import { component, config, watch, Component } from "flagwind-web";

import "./plate-picker.less";
import { PLATE_PICKER_OPTION } from "./plate-picker-options";

@component({
  template: require("./plate-picker.html")
})
export default class PlatePicker extends Component {
  @config({ default: function() {return new Object();} })
  public btnStyleObj: Object;

  @config({ default: PLATE_PICKER_OPTION.defaultProvince })
  public defaultProvince: String;

  @config({ default: PLATE_PICKER_OPTION.place})
  public place: String;
  // 隐藏号码号牌选择项
  @config({ default: true })
  public hidePlateType: boolean;
  // 是否禁用
  @config({default: false})
  public disabled: boolean;

  public defaultAlias: Array<any> = [
    "津", "京", "沪", "渝", "鄂", "湘",
    "粤", "赣", "苏", "浙", "琼", "宁",
    "桂", "冀", "豫", "云", "辽", "黑",
    "吉", "皖", "新", "甘", "晋", "蒙",
    "陕", "鲁", "闽", "贵", "川", "青",
    "藏", "使", "领"
  ];

  public province: Array<Object> = [
    "津", "京", "沪", "渝", "鄂", "湘",
    "粤", "赣", "苏", "浙", "琼", "宁",
    "桂", "冀", "豫", "云", "辽", "黑",
    "吉", "皖", "新", "甘", "晋", "蒙",
    "陕", "鲁", "闽", "贵", "川", "青",
    "藏", "使", "领", "WJ", "军", "空",
    "警", "学", "挂", "港", "澳", "*"
  ];

  public wordList: Array<Object> = [
    "0", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "A", "B",
    "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"
  ];

  public visible: Boolean = false;

  public activePlateIndex: String = "";

  public plate: Array<Object> = [];
  public get special(): String {
    return "军空警";
  }
  public get yellowplate(): String {
    return "学挂";
  }
  public get getProvinceList(): Array<Object> {
    let list = [];
    list.push(this.defaultProvince);
    for (let item of this.province) {
      if (item !== this.defaultProvince) {
        list.push(item);
      }
    }
    return list;
  }

  public selectedPlate(item: any, type: any): void {
    if (item) {
      if (this.plate.length === 0 && (type === "1" || (type === "0" && this.defaultAlias.indexOf(item) < 0))) {
        this.$notice.warning({ title: "必须先选择合理的车牌代码" });
        return;
      }
      if (type === "0") {
        if (this.defaultAlias.indexOf(item) > -1 && this.plate.length === 0) {
          this.plate.push(item);
        } else if (this.defaultAlias.indexOf(item) < 0) {
          this.plate.push(item);
        } else {
          this.plateNo = item + this.plateNo.substr(1);
        }
      } else if (type === "1") {
        this.plate.push(item);
      }
    }
  }

  public trash(): void {
    this.plate = [];
    this.activePlateIndex = "";
  }

  public del(): void {
    this.plate.pop();
  }

  public submit(): void {
    this.visible = false;
  }

  public get plateNo(): String {
    return this.plate.join("");
  }

  public set plateNo(item) {
    this.plate = item.split("");
  }

  public get dataToEmit(): Array<Object> {
    let arr = [this.plateNo, this.activePlateIndex];
    return arr;
  }
  @watch("dataToEmit", { immediate: true })
  public dataToEmitChange(nv: any, ov: any): void {
    this.$emit("change", nv);
  }

  public setPlateData(plateNo: any, plateTypeId: any) {
    if (plateNo) {
      this.plate = plateNo.split("");
    }
    if (plateTypeId) {
      this.activePlateIndex = plateTypeId;
    } else {
      this.activePlateIndex = "";
    }
  }
  public reset() {
    this.plateNo = "";
    this.activePlateIndex = "";
  }
}
