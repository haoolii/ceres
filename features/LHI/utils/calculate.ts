import { useMemo, useState } from "react";
import { 勞保資料 } from "../constants";

const levels = Object.keys(勞保資料)
  .map((v) => +v)
  .sort((a, b) => a - b);
  
export const calculate勞保 = (salary: number) => {
  let targetLevel = levels[levels.length - 1];
  for (let level of levels) {
    if (level >= salary && level < targetLevel) {
      targetLevel = level;
    }
  }
  return 勞保資料[`${targetLevel}` as keyof typeof 勞保資料];
};

export const use健保 = () => {};

export const use勞退 = () => {};
