/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ContentProvider, useContent } from './context/ContentContext';
import { VideoBackground } from './components/VideoBackground';
import { Header } from './components/Header';
import { SlideIndicator } from './components/SlideIndicator';
import { Slide1Home } from './components/slides/Slide1Home';
import { Slide2About } from './components/slides/Slide2About';
import { Slide3Services } from './components/slides/Slide3Services';
import { Slide4Blog } from './components/slides/Slide4Blog';
import { Slide5Contact } from './components/slides/Slide5Contact';
import { BookingModal } from './components/BookingModal';
import { ArticleModal, ArticleData } from './components/ArticleModal';
import { Footer } from './components/Footer';
import { AdminLoginView } from './components/admin/AdminLoginView';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function MainApp() {
  const { isAdminLoggedIn } = useContent();
  const [activeSlideId, setActiveSlideId] = useState<string>('slide-1');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [currentRoute, setCurrentRoute] = useState<'client' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || hash === '#/admin' || path === '/admin') {
        return 'admin';
      }
    }
    return 'client';
  });

  const mainRef = useRef<HTMLElement>(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || hash === '#/admin' || path === '/admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('client');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentRoute !== 'client') return;

    // Set up GSAP animations with smooth fade-rise
    const ctx = gsap.context(() => {
      const slides = ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5'];

      slides.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        // Slide Entrance & Stagger Fade-Rise Reveal
        gsap.fromTo(
          el.querySelectorAll('h1, h2, h3, .liquid-glass, .glass-card, article'),
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Scrollspy trigger for active navigation
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveSlideId(id),
          onEnterBack: () => setActiveSlideId(id),
        });
      });
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, [currentRoute]);

  const handleNavigate = (slideId: string) => {
    if (currentRoute !== 'client') {
      setCurrentRoute('client');
      window.location.hash = '';
      setTimeout(() => {
        const target = document.getElementById(slideId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSlideId(slideId);
    const target = document.getElementById(slideId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    setCurrentRoute('admin');
    window.location.hash = 'admin';
  };

  const handleBackToSite = () => {
    setCurrentRoute('client');
    window.location.hash = '';
  };

  // If on Admin route
  if (currentRoute === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <AdminLoginView
          onBackToSite={handleBackToSite}
          onLoginSuccess={() => setCurrentRoute('admin')}
        />
      );
    }
    return <AdminDashboard onBackToSite={handleBackToSite} />;
  }

  // Public Client View
  return (
    <div className="relative min-h-screen bg-[#0A192F] text-[#E6F1FF] selection:bg-[#00E5FF]/20 selection:text-[#00E5FF] overflow-x-hidden font-jakarta">
      {/* High-tech Looping Video Background */}
      <VideoBackground />

      {/* Top Glassmorphism Navigation Bar */}
      <Header
        activeSlideId={activeSlideId}
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Desktop Vertical Slide Indicator */}
      <SlideIndicator
        activeSlideId={activeSlideId}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main ref={mainRef} className="relative z-10">
        {/* Slide 1: Home (Hero Layout) */}
        <Slide1Home onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Slide 2: About Us (Bento Grid) */}
        <Slide2About />

        {/* Slide 3: Services (Split Dashboard: Left Text / Right Image) */}
        <Slide3Services onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Slide 4: Blog (Adaptive Showcase: Horizontal Carousel) */}
        <Slide4Blog onSelectArticle={(article) => setSelectedArticle(article)} />

        {/* Slide 5: Contact (Split Dashboard: Zig-zag Left Image / Right Form) */}
        <Slide5Contact />
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Interactive Booking Modal (Simulation) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Blog Full Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <MainApp />
    </ContentProvider>
  );
}
