import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className=" bg-primary-foreground py-20 flex justify-center">
        <div className="flex items-center gap-4">
          <div className="pb-2">
            <Image
              className="relative mr-1"
              src="/logo.png"
              alt="yautils Logo"
              width={50}
              height={50}
              priority
            />
          </div>
          <h1 className="text-2xl font-bold">小工具</h1>
        </div>
      </div>
      <div className="container py-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-96">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">勞健保計算機</CardTitle>
              <CardDescription className="h-12">
                計算勞健保、勞退費用
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/LHI" className="w-full">
                <Button className="w-full">試試看</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full md:w-96">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">面積換算</CardTitle>
              <CardDescription className="h-12">
                用於換算各單位土地面積、農地面積、廠房面積，方便省時的小工具。
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/area-convert" className="w-full">
                <Button className="w-full">試試看</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full md:w-96">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">查詢IP</CardTitle>
              <CardDescription className="h-12">
                查詢IP相關資訊，國家、經度、緯度
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/my-ip" className="w-full">
                <Button className="w-full">試試看</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
