import { LHIBoard } from "@/features/LHI/components/LHIBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "勞健保計算",
  description: "勞健保計算、勞退計算，方便計算員工與公司負擔金額",
  keywords: [
    "工作",
    "薪資",
    "勞健保計算",
    "勞退計算",
    "員工公司負擔金額",
    "方便",
  ],
};
export default function LHI() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl mb-4">勞健保計算</h1>

      <LHIBoard />
      <section className="text-right my-6 grid gap-2">
        <b className="text-blue-600">尚未包含勞工保險職業災害費、代扣所得稅</b>
        <b className="text-blue-600">
          ※以上計算以月計算，實際扣費金額以發單金額為主
        </b>
      </section>
      <section className="my-6 grid gap-2 text-right">
        <h3 className="text-lg">參考來源</h3>
        <ul className="grid gap-2">
          <li>
            <a
              target="_blank"
              rel="search"
              href="https://www.nhi.gov.tw/Content_List.aspx?n=5581FA007B6177B7&"
              className="underline underline-offset-4"
            >
              健保保險費負擔金額表
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="search"
              href="https://www.bli.gov.tw/0011588.html"
              className="underline underline-offset-4"
            >
              勞工保險費負擔金額表
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="search"
              href="https://www.ntbca.gov.tw/singlehtml/a15c33c827e4470c9263930ab2087812?cntId=822c27718d4c4cb8beaf536773e81dca#gsc.tab=0"
              className="underline underline-offset-4"
            >
              薪資所得扣繳稅額表
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="search"
              href="https://www.nhi.gov.tw/OnlineQuery/Insurance_UnitQuery.aspx?n=803FA3601B7C832D&sms=36A0BB334ECB4011&topn=5FE8C9FEAE863B46"
              className="underline underline-offset-4"
            >
              健保投保單位代號查
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
