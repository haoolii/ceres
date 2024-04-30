"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  CopyIcon,
  ImageIcon,
  CookieIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import rgbHex from "rgb-hex";
import hexRgb from "hex-rgb";
import { useToast } from "@/components/ui/use-toast";
import { useDebounce } from "use-debounce";
import { buildRgb, onMousePos, quantization } from "../utils";

export const ImageColorPickerBoard = () => {
  const { toast } = useToast();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pointHex, setPointHex] = useState("");
  const [selectedHex, setSelectedHex] = useState("");
  const [pointRGB, setPointRGB] = useState("");
  const [selectedRGB, setSelectedRGB] = useState("");
  const fileChangeCBRef = useRef<() => void>(() => {});
  const [innerWidthPure, setInnerWidthPure] = useState(0);
  const [innerWidth] = useDebounce(innerWidthPure, 500);
  const [palettes, setPalettes] = useState<
    {
      rgb: string;
      hex: string;
    }[]
  >([]);
  const [haveFile, setHaveFile] = useState(false);
  useEffect(() => {
    if (canvasRef.current) {
    }
  });

  const onCanvasMouseMoveHandle = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
    if (R && G && B) {
      const hex = `#${rgbHex(R, G, B)}`;
      const rgb = hexRgb(hex, { format: "css" });
      setPointHex(hex);
      setPointRGB(rgb);
    }
  };

  useEffect(() => {
    onFileChange();
  }, [innerWidth]);

  useEffect(() => {
    function onResize() {
      setInnerWidthPure(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("resize", onResize);
    };
  });

  const initImagePalette = (imgData: ImageData) => {
    const rgbArray = buildRgb(imgData);
    const quantColors = quantization(rgbArray, 0);
    const colors: {
      [key: string]: {
        rgb: string;
        hex: string;
      };
    } = {};
    quantColors.forEach((color) => {
      if (!color) return;
      const { r, g, b } = color;
      if (!(r && g && b)) return;
      const hex = `#${rgbHex(r, g, b)}`;
      const rgb = hexRgb(hex, { format: "css" });
      colors[rgb] = {
        rgb,
        hex,
      };
    });
    const keys = Object.keys(colors);
    setPalettes(keys.map((key) => colors[key]));
  };

  const onFileChange = () => {
    const imgW = containerRef.current?.getBoundingClientRect().width;
    if (!imgW) return;
    const file = fileInputRef.current?.files && fileInputRef.current?.files[0];
    if (!file) return;
    setHaveFile(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reader = new FileReader();
    const readerOnload = () => {
      const img = new Image();
      const imgOnload = () => {
        const cw = imgW;
        const ch = (imgW * img.height) / img.width;
        canvas.width = cw;
        canvas.height = ch;
        ctx.drawImage(img, 0, 0, cw, ch);
        const imgData = ctx.getImageData(0, 0, cw, ch);
        initImagePalette(imgData);
      };
      img.addEventListener("load", imgOnload);
      img.src = reader.result?.toString() || "";
      img.remove();
      return () => {
        img.removeEventListener("load", imgOnload);
        reader.abort();
      };
    };
    reader.addEventListener("load", readerOnload);
    reader.readAsDataURL(file);
    return () => {
      readerOnload();
      reader.removeEventListener("load", readerOnload);
    };
  };

  const onCanvasClickHandle = () => {
    setSelectedHex(pointHex);
    setSelectedRGB(pointRGB);
  };

  const copy = async (text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      toast({
        title: "訊息",
        description: "複製成功",
      });
    } else {
      toast({
        variant: "destructive",
        title: "訊息",
        description: "複製失敗",
      });
    }
  };

  const uploadedFileName =
    fileInputRef.current && fileInputRef.current.files?.length === 1
      ? fileInputRef.current.files[0].name
      : "";

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <div className="flex-1 order-1">
        <Card>
          <CardContent className="relative min-h-[520px]">
            <div ref={containerRef} className="relative min-h-[400px] pt-6">
              <canvas
                className="w-full"
                ref={canvasRef}
                onMouseMove={(e) => onCanvasMouseMoveHandle(e)}
                onClick={onCanvasClickHandle}
              />
            </div>
            {haveFile ? (
              <></>
            ) : (
              <div className="min-h-[520px] absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col gap-2">
                <ImageIcon width={40} height={40} className="text-gray-400" />
                <span className=" text-gray-400">尚無資料，請上傳圖片</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 order-1 xl:order-2 flex flex-col gap-4">
        <div className="order-2 xl:order-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">顏色</CardTitle>
              <CardDescription>點擊圖片任意處可選取色碼</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 flex-col lg:flex-row">
              <div className="flex gap-4">
                <div
                  className="w-24 h-24 rounded-md shadow-md flex justify-center items-center"
                  style={{ background: pointHex }}
                >
                  {!haveFile ? (
                    <CookieIcon
                      width={24}
                      height={24}
                      className="text-gray-400"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="w-24 h-24 rounded-md shadow-md flex justify-center items-center"
                  style={{ background: selectedHex }}
                >
                  {!haveFile ? (
                    <CookieIcon
                      width={24}
                      height={24}
                      className="text-gray-400"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-4">
                  <span className="font-medium">HEX</span>
                  <div
                    className="relative w-full"
                    onClick={() => (haveFile ? copy(selectedHex) : "")}
                  >
                    <Input
                      readOnly
                      disabled={!haveFile}
                      value={selectedHex}
                      className="focus-visible:ring-offset-0 focus-visible:ring-0 cursor-pointer"
                    />
                    <Button
                      disabled={!haveFile}
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 p-0 w-8 h-8"
                    >
                      <CopyIcon />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">RGB</span>
                  <div
                    className="relative w-full"
                    onClick={() => copy(selectedRGB)}
                  >
                    <Input
                      disabled={!haveFile}
                      readOnly
                      value={selectedRGB}
                      className="focus-visible:ring-offset-0 focus-visible:ring-0 cursor-pointer"
                    />
                    <Button
                      disabled={!haveFile}
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 p-0 w-8 h-8"
                    >
                      <CopyIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="order-3 xl:order-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">圖片色域</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              {palettes.length ? (
                <div className="flex gap-1 flex-wrap">
                  {palettes.map((palette, i) => (
                    <div
                      key={`${palette}_${i}`}
                      style={{ background: palette.hex }}
                      className="w-16 h-16 rounded-md cursor-pointer border-2"
                      onMouseMove={() => {
                        setPointHex(palette.hex);
                        setPointRGB(palette.rgb);
                      }}
                      onClick={() => {
                        setSelectedHex(palette.hex);
                        setSelectedRGB(palette.rgb);
                      }}
                    ></div>
                  ))}
                </div>
              ) : (
                <div>
                  <span className=" text-gray-400">尚無資料，請上傳圖片</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="order-1 xl:order-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">上傳圖片</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={(_) => {
                  fileChangeCBRef.current();
                  onFileChange();
                }}
              />
              <div className="flex space-x-2 items-center">
                <Button
                  className="flex items-center space-x-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span>
                    <DownloadIcon />
                  </span>
                  <span>{uploadedFileName || "上傳圖片"}</span>
                </Button>
                <span></span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
