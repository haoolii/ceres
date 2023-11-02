import * as math from "mathjs";

export enum UnitsEnum {
  平方公尺 = "平方公尺",
  坪 = "坪",
  公頃 = "公頃",
  甲 = "甲",
  分 = "分",
  公畝 = "公畝",
  英畝 = "英畝",
  市畝 = "市畝",
}

export interface Units {
  平方公尺: number;
  坪: number;
  公頃: number;
  甲: number;
  分: number;
  公畝: number;
  英畝: number;
  市畝: number;
}

const 平方公尺換算表 = {
  [UnitsEnum.平方公尺]: 1,
  [UnitsEnum.坪]: 3.3058,
  [UnitsEnum.公頃]: 10000,
  [UnitsEnum.甲]: 9699.17,
  [UnitsEnum.分]: 969.917,
  [UnitsEnum.公畝]: 100,
  [UnitsEnum.英畝]: 4046.85,
  [UnitsEnum.市畝]: 666.666,
};

const customDivide = (平方公尺: number, unitsEnum: UnitsEnum) => {
  return +math
    .round(
      +math
        .divide(
          math.bignumber(平方公尺),
          math.bignumber(平方公尺換算表[unitsEnum])
        )
        .valueOf(),
      5
    )
    .valueOf();
};

export const use平方公尺 = (平方公尺: number): Units => {
  return {
    平方公尺: customDivide(平方公尺, UnitsEnum.平方公尺),
    坪: customDivide(平方公尺, UnitsEnum.坪),
    公頃: customDivide(平方公尺, UnitsEnum.公頃),
    甲: customDivide(平方公尺, UnitsEnum.甲),
    分: customDivide(平方公尺, UnitsEnum.分),
    公畝: customDivide(平方公尺, UnitsEnum.公畝),
    英畝: customDivide(平方公尺, UnitsEnum.英畝),
    市畝: customDivide(平方公尺, UnitsEnum.市畝),
  };
};

export const calc = (type: UnitsEnum, num: number) => {
  const 平方公尺 = math
    .multiply(math.bignumber(平方公尺換算表[type]), math.bignumber(num))
    .valueOf();
  return use平方公尺(+平方公尺);
};
