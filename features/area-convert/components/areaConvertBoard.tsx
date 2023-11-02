"use client";
import { Input } from "@/components/ui/input";
import { Units, UnitsEnum, calc } from "../utils/calculate";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
const format = (num: number) => {
  return Intl.NumberFormat("en-US").format(num);
};
const UnitsInput = ({
  value,
  unitsEnum,
  onChange,
  isLastSelected,
}: {
  value: number;
  unitsEnum: UnitsEnum;
  onChange: (value: number) => void;
  isLastSelected: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center py-2 px-4 rounded-md",
        isLastSelected ? "bg-secondary-foreground" : ""
      )}
    >
      <Label
        className={cn("w-24", isLastSelected ? "text-secondary" : "")}
        htmlFor={`${unitsEnum}_input`}
      >
        {unitsEnum}
      </Label>
      <Input
        className="col-span-2"
        id={`${unitsEnum}_input`}
        value={value ? format(value) : ""}
        inputMode="numeric"
        placeholder={unitsEnum}
        onChange={(e) => {
          const v = +`${e.target.value}`.replaceAll(",", "");
          onChange(v ? v : 0);
        }}
      />
    </div>
  );
};

export const AreaConvertBoard = () => {
  const [lastSelected, setLastSelected] = useState<UnitsEnum>();

  const [data, setData] = useState<Units>({
    平方公尺: 0,
    坪: 0,
    公頃: 0,
    甲: 0,
    分: 0,
    公畝: 0,
    英畝: 0,
    市畝: 0,
  });
  const onChangeHandle = (value: number, unitsEnum: UnitsEnum) => {
    setLastSelected(unitsEnum);
    setData({
      ...data,
      [unitsEnum]: value,
    });
  };
  const calcAll = () => {
    if (lastSelected) {
      setData(calc(lastSelected, data[lastSelected]));
    }
  };
  return (
    <div>
      <UnitsInput
        value={data.平方公尺}
        unitsEnum={UnitsEnum.平方公尺}
        onChange={(v) => onChangeHandle(v, UnitsEnum.平方公尺)}
        isLastSelected={lastSelected === UnitsEnum.平方公尺}
      />
      <UnitsInput
        value={data.坪}
        unitsEnum={UnitsEnum.坪}
        onChange={(v) => onChangeHandle(v, UnitsEnum.坪)}
        isLastSelected={lastSelected === UnitsEnum.坪}
      />
      <UnitsInput
        value={data.公頃}
        unitsEnum={UnitsEnum.公頃}
        onChange={(v) => onChangeHandle(v, UnitsEnum.公頃)}
        isLastSelected={lastSelected === UnitsEnum.公頃}
      />
      <UnitsInput
        value={data.甲}
        unitsEnum={UnitsEnum.甲}
        onChange={(v) => onChangeHandle(v, UnitsEnum.甲)}
        isLastSelected={lastSelected === UnitsEnum.甲}
      />
      <UnitsInput
        value={data.分}
        unitsEnum={UnitsEnum.分}
        onChange={(v) => onChangeHandle(v, UnitsEnum.分)}
        isLastSelected={lastSelected === UnitsEnum.分}
      />
      <UnitsInput
        value={data.公畝}
        unitsEnum={UnitsEnum.公畝}
        onChange={(v) => onChangeHandle(v, UnitsEnum.公畝)}
        isLastSelected={lastSelected === UnitsEnum.公畝}
      />
      <UnitsInput
        value={data.英畝}
        unitsEnum={UnitsEnum.英畝}
        onChange={(v) => onChangeHandle(v, UnitsEnum.英畝)}
        isLastSelected={lastSelected === UnitsEnum.英畝}
      />
      <UnitsInput
        value={data.市畝}
        unitsEnum={UnitsEnum.市畝}
        onChange={(v) => onChangeHandle(v, UnitsEnum.市畝)}
        isLastSelected={lastSelected === UnitsEnum.市畝}
      />
      <div className="grid gap-4 mt-4">
        <Button
          disabled={!(lastSelected && data[lastSelected])}
          onClick={() => calcAll()}
        >
          計算
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setLastSelected(undefined);
            setData({
              平方公尺: 0,
              坪: 0,
              公頃: 0,
              甲: 0,
              分: 0,
              公畝: 0,
              英畝: 0,
              市畝: 0,
            });
          }}
        >
          清除全部
        </Button>
      </div>
    </div>
  );
};
