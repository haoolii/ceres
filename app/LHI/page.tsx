"use client";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { records } from "./constants";

export default function LHI() {
  const [salary, setSalary] = useState(0);
  const [identity, setIdentity] = useState("本人");

  return (
    <div className="container py-4">
      <div className="flex gap-4 w-80 flex-col">
        <Input value={salary} onChange={(e) => setSalary(+e.target.value)} />
        <Select value={identity} onValueChange={(v) => setIdentity(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="投保" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="本人">本人</SelectItem>
              <SelectItem value="本人+1">本人+1</SelectItem>
              <SelectItem value="本人+2">本人+2</SelectItem>
              <SelectItem value="本人+3">本人+3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
