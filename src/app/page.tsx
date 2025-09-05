'use client';
import { useUser } from '../contexts/UserContext';
import { Suspense, useEffect, useState } from 'react';

import { useClient } from '../contexts/ClientContext';
import { AlertPopup } from '../components/alertPopup/page';
import { useI18n } from '../contexts/I18nContext';

import HomeHero from '../components/pages/home/homeHero/page';
import WelcomeOfferBanner from '../components/common/welcomeOfferBanner/page';
import HowItWorks from '../components/common/howItWorks/page';
import WhyChoose from '../components/common/whyChoose/page';
import FAQPreview from '../components/common/faqPreview/page';
import TestimonialsPreview from '../components/common/testimonials/testimonialsPreview/page';
import ServicesPreview from '../components/common/servicePreview/page';
import FinalCTA from '../components/common/finalCTA/page';
import Loading from '../components/layout/loading/page';
import HomeHeroSkeleton from '../components/pages/home/homeHero/homeHeroSkeleton';
import SkeletonWelcomeOfferBanner from '../components/common/welcomeOfferBanner/SkeletonWelcomeOfferBanner';

export default function Home() {
  const { client, loading } = useClient();
  const { registerSessionCallback, user } = useUser();

  const { texts } = useI18n();
  const homeHeroTexts = texts.pages.home.hero;
  const howItWorksTexts = texts.components.common.howItWorks;
  const servicesPreviewTexts = texts.components.common.servicesPreview;
  const whyChooseTexts = texts.components.common.whyChoose;
  const testimonialsTexts = texts.components.common.testimonials;
  const faqPreviewTexts = texts.components.common.faq;
  const welcomeOfferTexts = texts.components.common.welcomeOfferBanner;
  const finalCtaTexts = texts.components.common.finalCta;

  const popups = texts.popups;
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    registerSessionCallback(() => {
      setAlert({
        type: 'error',
        title: popups?.SESSION_EXPIRED?.title || 'Session expired',
        description:
          popups?.SESSION_EXPIRED?.description || 'Your session has expired. Please log in again.',
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts]);

  if (!client || loading) return <Loading />;

  return (
    <main>
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HomeHero {...homeHeroTexts} />
      </Suspense>

      <Suspense fallback={<SkeletonWelcomeOfferBanner />}>
        <WelcomeOfferBanner {...welcomeOfferTexts} />
      </Suspense>

      <HowItWorks {...howItWorksTexts} />
      <ServicesPreview {...servicesPreviewTexts} />
      <WhyChoose {...whyChooseTexts} />
      <TestimonialsPreview {...testimonialsTexts} />
      <FAQPreview {...faqPreviewTexts} />
      <FinalCTA {...finalCtaTexts} />

      {alert && (
        <AlertPopup
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onClose={() => setAlert(null)}
        />
      )}
    </main>
  );
}
