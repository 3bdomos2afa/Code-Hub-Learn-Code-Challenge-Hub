import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center bg-blue-50 dark:bg-gray-800 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-max mx-auto text-center">
          <div className="sm:flex items-center justify-center">
            <div className="text-6xl font-extrabold text-primary sm:text-8xl">404</div>
            <div className="sm:ml-6 rtl:ml-0 rtl:mr-6 sm:border-l sm:border-gray-300 sm:pl-6 rtl:pl-0 rtl:pr-6 sm:text-left rtl:text-right mt-4 sm:mt-0">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                {t('pageNotFound') || "Page not found"}
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                {t('pageNotFoundDescription') || "Sorry, we couldn't find the page you're looking for."}
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link to="/">
              <Button className="bg-gradient">
                {t('backToHome') || "Back to Homepage"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
