import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Shared chrome for every public marketing/church/ministry page. Lives
// outside each page's own content so it renders once and stays mounted
// (header/footer "frozen") across client-side navigation between tabs,
// instead of every page re-importing and remounting it.
//
// Deliberately NOT applied to /school (has its own SchoolNav/SchoolFooter
// brand), /admin (its own console shell), /login and /donors/portal (their
// own focused layouts) — those live outside this route group.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
