import React from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Terms = () => {
  const { t } = useLanguage();
  
  const currentDate = new Date();
  const lastUpdated = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('termsAndConditions')}</h1>
              <p className="text-gray-300">
                {t('lastUpdated')}: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
        
        {/* Terms Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                {t('termsIntro')}
              </p>
              
              <h2>{t('acceptanceOfTerms')}</h2>
              <p>
                {t('acceptanceOfTermsText')}
              </p>
              
              <h2>{t('intellectualProperty')}</h2>
              <p>
                {t('intellectualPropertyText')}
              </p>
              
              <h2>{t('userAccounts')}</h2>
              <p>
                {t('userAccountsText')}
              </p>
              
              <h2>{t('courseAndContentPurchases')}</h2>
              <p>
                {t('courseAndContentPurchasesText')}
              </p>
              
              <h2>{t('codeOfConduct')}</h2>
              <p>
                {t('codeOfConductText')}
              </p>
              <ul>
                <li>{t('codeOfConductItem1')}</li>
                <li>{t('codeOfConductItem2')}</li>
                <li>{t('codeOfConductItem3')}</li>
                <li>{t('codeOfConductItem4')}</li>
                <li>{t('codeOfConductItem5')}</li>
              </ul>
              
              <Separator className="my-8" />
              
              <h2>{t('frequentlyAskedQuestions')}</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>{t('faq1')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faqAnswer1')}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger>{t('faq2')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faqAnswer2')}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger>{t('faq3')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faqAnswer3')}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger>{t('faq4')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faqAnswer4')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Separator className="my-8" />
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('contactWithQuestions')}{' '}
                <Link to="/contact" className="text-primary hover:underline">
                  {t('contactUs')}
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
