import { 勞保資料, 健保資料, 勞退資料 } from "../constants";

export const 勞保級距 = Object.keys(勞保資料)
  .map((v) => +v)
  .sort((a, b) => a - b);

export const 健保級距 = Object.keys(健保資料)
  .map((v) => +v)
  .sort((a, b) => a - b);

export const 勞退級距 = Object.keys(勞退資料)
  .map((v) => +v)
  .sort((a, b) => a - b);

export const calculate勞保 = (salary: number) => {
  let targetLevel = 勞保級距[勞保級距.length - 1];
  for (let level of 勞保級距) {
    if (level >= salary && level < targetLevel) {
      targetLevel = level;
    }
  }
  return 勞保資料[`${targetLevel}` as keyof typeof 勞保資料];
};

export const calculate健保 = (salary: number) => {
  let targetLevel = 健保級距[健保級距.length - 1];
  for (let level of 健保級距) {
    if (level >= salary && level < targetLevel) {
      targetLevel = level;
    }
  }
  return 健保資料[`${targetLevel}` as keyof typeof 健保資料];
};

export const calculate勞退 = (salary: number) => {
  let targetLevel = 勞退級距[勞退級距.length - 1];
  for (let level of 勞退級距) {
    if (level >= salary && level < targetLevel) {
      targetLevel = level;
    }
  }
  return 勞退資料[`${targetLevel}` as keyof typeof 勞退資料];
};

export const calculate級距 = (salary: number) => {
  const levels = [0, ...勞保級距, ...健保級距, ...勞退級距].sort(
    (a, b) => a - b
  );
  let head = levels[0];
  let end = levels[levels.length - 1];
  for (let level of levels) {
    if (level >= salary && level < end) {
      end = level;
    }
    if (level < salary && level > head) {
      head = level;
    }
  }
  if (head !== end) {
    head = head + 1
  }
  return [head, end];
};
