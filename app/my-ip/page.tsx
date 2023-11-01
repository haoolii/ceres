import { Metadata } from "next";
import { headers } from "next/headers";
export const metadata: Metadata = {
  title: "小工具-查詢IP",
};
export interface IPResponse {
  ip: string;
  country_code: string;
  country_name: string;
  region_name: string;
  city_name: string;
  latitude: number;
  longitude: number;
  zip_code: string;
  time_zone: string;
  asn: string;
  as: string;
  is_proxy: boolean;
}

const getIp2c = async (ip: string) => {
  try {
    if (!process.env.IP_KEY) {
      return "";
    }
    const resp = await fetch(
      `https://api.ip2location.io/?key=${process.env.IP_KEY}&ip=${ip}`,
      { next: { revalidate: 600 } }
    );
    const data = (await resp.json()) as IPResponse;
    return data;
  } catch (err) {
    return "";
  }
};
export default async function MyIP() {
  const forwardedFor = headers().get("x-forwarded-for");
  const ipInfo = (await getIp2c(forwardedFor || "")) as IPResponse;
  if (!ipInfo) {
    <div className="container py-6">
      <h1 className="text-2xl">查詢IP</h1>
      <ul className="my-6">
        <li>
          <span className="inline-block w-20">IP</span>
          <b>{forwardedFor}</b>
        </li>
      </ul>
    </div>;
  }
  return (
    <div className="container py-6">
      <h1 className="text-2xl">查詢IP</h1>
      <ul className="my-6 grid gap-4">
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">IP</span>
          <b>{forwardedFor || '-'}</b>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">國家</span>
          <span>{ipInfo.country_name || '-'}</span>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">區域</span>
          <span>{ipInfo.region_name || '-'}</span>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">市</span>
          <span>{ipInfo.city_name || '-'}</span>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">郵政編碼</span>
          <span>{ipInfo.zip_code || '-'}</span>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">緯度</span>
          <span>{ipInfo.latitude  || '-'}</span>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">經度</span>
          <span>{ipInfo.longitude  || '-'}</span>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">時區</span>
          <span>{ipInfo.time_zone || '-'}</span>
        </li>
        {/* <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">當地時間</span>
          <span>{"ipInfo.time_zone"}</span>
        </li> */}
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">自治系統號</span>
          <span>{ipInfo.asn || '-'}</span>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">自治系統名稱</span>
          <span>{ipInfo.as || '-'}</span>
        </li>
        <li className="flex flex-col md:flex-row">
          <span className="inline-block w-40">代理</span>
          <span>{ipInfo.is_proxy ? "Yes" : "No"}</span>
        </li>
      </ul>
    </div>
  );
}
