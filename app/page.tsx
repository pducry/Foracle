import { getAllFonts } from "@/lib/fonts";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const fonts = getAllFonts();

  return <HomeClient fonts={fonts} />;
}
