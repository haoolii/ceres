"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { DownloadIcon, CopyIcon, ImageIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';
import { useToast } from "@/components/ui/use-toast";

function onMousePos(canvas: HTMLCanvasElement, evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

export const ImageColorPickerBoard = () => {
    const { toast } = useToast()

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [pointHex, setPointHex] = useState('');
    const [selectedHex, setSelectedHex] = useState('');
    const [pointRGB, setPointRGB] = useState('');
    const [selectedRGB, setSelectedRGB] = useState('');

    useEffect(() => {
        if (canvasRef.current) {

        }
    });

    const onCanvasMouseMoveHandle = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const cw = canvas.width;
        const ch = canvas.height;
        const imgData = ctx.getImageData(0, 0, cw, ch);
        if (!imgData) return;

        const m = onMousePos(canvas, evt);
        const pixels = imgData.data;

        const i = (m.x + m.y * cw) * 4;
        const R = pixels[i];
        const G = pixels[i + 1];
        const B = pixels[i + 2];
        const thisRGBRy = [R, G, B];
        const hex = `#${rgbHex(R, G, B)}`;
        const rgb = hexRgb(hex, { format: 'css' });
        setPointHex(hex);
        setPointRGB(rgb);
    }

    const onCanvasClickHandle = () => {
        setSelectedHex(pointHex);
        setSelectedRGB(pointRGB);
    }

    const onFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const imgW = containerRef.current?.getBoundingClientRect().width;
        if (!imgW) return;
        const file = evt.target.files && evt.target.files[0];
        if (!file) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reader = new FileReader();
        const img = new Image();
        reader.onload = () => {
            img.onload = () => {
                const cw = imgW;
                const ch = imgW * img.height / img.width
                canvas.width = cw;
                canvas.height = ch;
                ctx.drawImage(img, 0, 0, cw, ch);
            };
            img.src = reader.result?.toString() || '';
        };
        reader.readAsDataURL(file);
    }

    const copy = async (text: string) => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            toast({
                title: "訊息",
                description: "複製成功",
            })
        } else {
            toast({
                variant: "destructive",
                title: "訊息",
                description: "複製失敗",
            })
        }
    }

    return (
        <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex-1 order-2 xl:order-1">
                <Card>
                    <CardContent>
                        <div ref={containerRef} className="relative min-h-[400px] pt-6" >
                            <canvas className="w-full" ref={canvasRef} onMouseMove={e => onCanvasMouseMoveHandle(e)} onClick={onCanvasClickHandle} />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex-1 order-1 xl:order-2 flex flex-col gap-4">
                <div className="">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">顏色</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <div className="flex gap-4">
                                <div className="w-24 h-24 rounded-md shadow-md" style={{ background: pointHex }}></div>
                                <div className="w-24 h-24 rounded-md shadow-md" style={{ background: selectedHex }}></div>
                            </div>
                            <div className="flex flex-col gap-4 flex-1">
                                <div className="flex items-center gap-4">
                                    <span>HEX</span>
                                    <div className="relative w-full" onClick={() => copy(selectedHex)} >
                                        <Input readOnly value={selectedHex} className="focus-visible:ring-offset-0 focus-visible:ring-0 cursor-pointer" />
                                        <Button variant="ghost" size="icon" className="absolute right-1 top-1 p-0 w-8 h-8" >
                                            <CopyIcon />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span>RGB</span>
                                    <div className="relative w-full" onClick={() => copy(selectedRGB)}>
                                        <Input readOnly value={selectedRGB} className="focus-visible:ring-offset-0 focus-visible:ring-0 cursor-pointer" />
                                        <Button variant="ghost" size="icon" className="absolute right-1 top-1 p-0 w-8 h-8" >
                                            <CopyIcon />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">上傳圖片</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input type="file" className="hidden" ref={fileInputRef} onChange={e => onFileChange(e)} />
                            <Button className="flex items-center space-x-2" onClick={() => fileInputRef.current?.click()}>
                                <span>
                                    <DownloadIcon />
                                </span>
                                <span>上傳圖片</span>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}