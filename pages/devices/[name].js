import { useRouter } from "next/router";

export default function Device({}) {
  const router = useRouter();
  console.log({ router });
  return (
    <div>
      <h1>Device: {router.query.name}</h1>
      <div>history data here ...</div>
    </div>
  );
}
