import { headers } from "next/headers";
export default function MyIP() {
    const forwardedFor = headers().get("x-forwarded-for");
    return (
        <div className="container py-6">
            <h1>
                IP {forwardedFor}
            </h1>
        </div>
    )
}