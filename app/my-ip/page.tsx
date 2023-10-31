import { headers } from "next/headers";
export default function MyIP() {
    const forwardedFor = headers().get("x-forwarded-for");
    return (
        <div>
            My IP {forwardedFor}
        </div>
    )
}