import { LHIBoard } from "@/features/LHI/components/LHIBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "勞健保計算",
  description: '勞健保計算、勞退計算，方便計算員工與公司負擔金額',
  keywords: ["工作", "薪資", "勞健保計算", "勞退計算", "員工公司負擔金額", "方便"]
};
export default function LHI() {
  return (
    <div className="container py-6">
      <LHIBoard />
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
        </ul>
      </section>
    </div>
  );
}
