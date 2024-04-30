import { ImageColorPickerBoard } from "@/features/image-color-picker/components/imageColorPickerBoard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "圖片色碼選取",
  description:
    "圖像色彩工具，可以幫助我們選取圖片中的正確的顏色色碼，支援HEX色碼與RGB色碼。挑選圖片上的顏色,線上擷取色彩,色碼查詢(RGB,HEX)",
  keywords: [
    "圖像",
    "色彩",
    "色碼",
    "選取",
    "選取器",
    "圖像色碼選取",
    "色碼選取",
    "顏色選取",
    "RGB",
    "HEX",
  ],
};
export default function ImageColorPicker() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl mb-4">圖片顏色選取</h1>
      <ImageColorPickerBoard />
    </div>
  );
}
