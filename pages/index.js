import axios from "axios";
import { Button } from "@/components/ui/button";
import DefaultLayout from "@/layouts/default.layout";

export const metadata = {
  title: "Neatly",
  description:
    "A Hotel Management System is a software built to handle all online hotel activities easily and safely.",
};

export default function Home() {
  const createBedType = () => {
    axios
      .get("/api/bedtype")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DefaultLayout>
      <div
        className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <Button onClick={createBedType}>Test BTN</Button>
        <span className="text-orange-400">Test</span>
      </div>
    </DefaultLayout>
  );
}
