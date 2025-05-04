
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function CallToAction() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gradient rounded-xl overflow-hidden shadow-xl">
        <div className="py-12 px-6 sm:px-12 lg:py-16 lg:px-16 text-center md:text-left md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {t('readyToStart')}
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-blue-100">
              {t('joinCommunity')}
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <Button size="lg" variant="secondary" className="group">
              {t('getStartedNow')}
              <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2 h-4 w-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
