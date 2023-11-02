import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AreaConvertBoard } from "@/features/area-convert/components/areaConvertBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "面積換算",
  description: "用於換算各單位土地面積、農地面積、廠房面積，方便省時的小工具。",
  keywords: [
    "面積轉換",
    "面積換算",
    "面積計算",
    "單位轉換",
    "單位換算",
    "單位計算",
    "平方公尺",
    "坪",
    "公頃",
    "甲",
    "分",
    "公畝",
    "英畝",
    "市畝",
    "土地面積",
    "廠房面積",
  ],
};
export default function AreaConvert() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl mb-4">面積換算</h1>
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex-1">
          <Card className="pt-4">
            <CardContent className="flex justify-start px-4">
              <div className="w-full">
                <AreaConvertBoard />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:max-w-lg grid gap-6 ">
          <section className="grid gap-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">備註說明</CardTitle>
              </CardHeader>
              <CardContent>
                <span>
                  請先選擇欲換算的原始單位欄位，輸入數字資料。 點擊<b>計算</b>。
                </span>
                <span>
                  將使輸入值標示為深色底色之欄位值，換算為各種其他的單位值。
                </span>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  地籍測量常用面積單位換算
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  <li>
                    <span>
                      1公頃 = 1.0310甲 = 100公畝 = 10,000平方公尺 = 3,025坪
                    </span>
                  </li>
                  <li>
                    <span>1平方公尺 = 0.3025坪</span>
                  </li>
                  <li>
                    <span>10平方公尺 = 0.1公畝 = 3.025坪</span>
                  </li>
                  <li>
                    <span>100平方公尺 = 1公畝 = 30.25坪</span>
                  </li>
                  <li>
                    <span>1坪 = 3.3058平方公尺</span>
                  </li>
                  <li>
                    <span>1甲 = 0.9699公頃 = 2,934坪</span>
                  </li>
                  <li>
                    <span>1分 = 0.0970公頃 = 293.4坪</span>
                  </li>
                  <li>
                    <span>1厘 = 0.0097公頃 = 29.34坪</span>
                  </li>
                  <li>
                    <span>1毫 = 0.00097公頃 = 2.934坪</span>
                  </li>
                  <li>
                    <span>1絲 = 0.000097公頃 = 0.2934坪</span>
                  </li>
                  <li>
                    <span>
                      1市畝 = 666.67平方公尺 = 0.06667公頃 = 201.667坪
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
