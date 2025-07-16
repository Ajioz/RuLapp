import Philosophy from "@/components/Home/Philosophy";
import HomeComponent from "@/components/Home";
import Blog from "@/components/Home/Blog";
import FundRaising from "@/components/Home/Fundraising";
import Report from "@/components/Home/Report";
import RollOver from "@/components/Home/Rollover";
import Layout from "@/components/Layout";


export default function Home() {
  return (
    <>
      <Layout title={"Home"}>
        <HomeComponent />
        <RollOver />
        <Philosophy />
        <FundRaising />
        <Report />
        <Blog />
      </Layout>
    </>
  );
}
