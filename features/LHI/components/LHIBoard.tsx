"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input";
import { calculate勞保 } from "../utils/calculate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const LHIBoard = () => {
    const [salary, setSalary] = useState<number>(0)
    const handleSalaryChange = (input: string) => {
        setSalary(+input.toString().replace(/[^-.0-9]/g, ''));
    }
    const info = useMemo(() => {
        if (!salary) {
            return {
                勞保: null
            }
        }
        return {
            勞保: calculate勞保(salary)
        };
    }, [salary]);
    return (
        <div className="flex flex-col gap-8 lg:flex-row">
            <div className="w-full lg:max-w-lg">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">勞健保計算機</CardTitle>
                        <CardDescription>
                            輸入月薪計算勞健保費用
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="salary">薪資</Label>
                            <Input id="salary" placeholder="薪資" value={salary || ""} onChange={(e) => handleSalaryChange(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="who">扶養</Label>
                            <Select name="who">
                                <SelectTrigger>
                                    <SelectValue placeholder="扶養" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>本人</SelectLabel>
                                        <SelectItem value="+1">本人與一位眷屬</SelectItem>
                                        <SelectItem value="+2">本人與二位眷屬</SelectItem>
                                        <SelectItem value="+3">本人與三位眷屬</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter>
                        {/* <Button className="w-full">Create account</Button> */}
                    </CardFooter>
                </Card>
            </div>
            <div className="flex-1">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">員工與公司負擔表</CardTitle>
                        <CardDescription>
                            員工級距: 0 ~ 0
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className=" space-y-1 flex-1 text-left">
                                    <p className=" text-md font-medium leading-none">費用</p>
                                </div>
                                <div className="ml-auto font-medium flex-1 text-right">員工負擔</div>
                                <div className="ml-auto font-medium flex-1 text-right">公司負擔</div>
                            </div>
                            <Separator />
                            <div className="flex items-center">
                                <div className=" space-y-1 flex-1 text-left">
                                    <p className=" text-md font-medium leading-none">勞保費</p>
                                </div>
                                <div className="ml-auto font-medium flex-1 text-right">{info?.勞保?.勞工 || 0}</div>
                                <div className="ml-auto font-medium flex-1 text-right">{info?.勞保?.單位 || 0}</div>
                            </div>
                            <Separator />
                            <div className="flex items-center">
                                <div className=" space-y-1 text-left flex-1">
                                    <p className=" text-md font-medium leading-none">健保費</p>
                                </div>
                                <div className="ml-auto font-medium text-right flex-1">{0}</div>
                                <div className="ml-auto font-medium text-right flex-1">{0}</div>
                            </div>
                            <Separator />
                            <div className="flex items-center">
                                <div className=" space-y-1 text-left flex-1">
                                    <p className=" text-md font-medium leading-none">員工退休金</p>
                                </div>
                                <div className="ml-auto font-medium text-right flex-1">{0}</div>
                                <div className="ml-auto font-medium text-right flex-1">{0}</div>
                            </div>
                            <Separator />
                            <div className="flex items-center">
                                <div className=" space-y-1 text-left flex-1">
                                    <p className=" text-md font-medium leading-none">總計</p>
                                </div>
                                <div className="ml-auto font-medium text-right flex-1">{0}</div>
                                <div className="ml-auto font-medium text-right flex-1">{0}</div>
                            </div>
                        </div>
                        {/* <Separator className="my-4" /> */}
                        <div>
                            
                        </div>
                    </CardContent>
                    <CardFooter>
                        {/* <Button className="w-full">Create account</Button> */}
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}