import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    console.log("[DIAG] NotFound rendered.");
    console.log("[DIAG] window.location.href:", window.location.href);
    console.log("[DIAG] window.location.pathname:", window.location.pathname);
    console.log("[DIAG] window.location.search:", window.location.search);
    console.log("[DIAG] window.location.hash:", window.location.hash);
    console.log("[DIAG] React Router location.pathname:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | LAYA</title>
      </Helmet>
      <MainLayout>
        <PageHero
          label="404"
          title="Page Not Found"
          subtitle="The page you're looking for doesn't exist or has been moved."
          centered
        >
          <Link
            to="/"
            className="inline-block mt-8 px-8 py-3 rounded bg-white text-[var(--laya-purple)] font-semibold hover:bg-white/90 transition-colors"
          >
            Return to Home
          </Link>
        </PageHero>
      </MainLayout>
    </>
  );
};

export default NotFound;
