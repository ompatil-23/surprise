import React from 'react';
import { SurpriseProvider, useSurprise } from './context/SurpriseContext';
import { ParticleBackground } from './components/common/ParticleBackground';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { MemoriesPage } from './pages/MemoriesPage';
import { StoryTimelinePage } from './pages/StoryTimelinePage';
import { LetterPage } from './pages/LetterPage';
import { WhyYouPage } from './pages/WhyYouPage';
import { BirthdayWishPage } from './pages/BirthdayWishPage';
import { FinalStarlightPage } from './pages/FinalStarlightPage';

const ChapterRouter = () => {
  const { activeChapter } = useSurprise();

  switch (activeChapter) {
    case 'welcome':
      return <WelcomePage />;
    case 'memories':
      return <MemoriesPage />;
    case 'our-story':
      return <StoryTimelinePage />;
    case 'a-letter':
      return <LetterPage />;
    case 'why-you':
      return <WhyYouPage />;
    case 'birthday-wish':
      return <BirthdayWishPage />;
    case 'final-starlight':
      return <FinalStarlightPage />;
    default:
      return <WelcomePage />;
  }
};

function App() {
  return (
    <SurpriseProvider>
      <div className="bg-surface text-on-surface font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container relative overflow-x-hidden min-h-screen flex flex-col justify-between">
        <ParticleBackground />
        <Header />
        <main className="relative z-10 w-full pt-20 bg-surface flex-1">
          <ChapterRouter />
        </main>
        <Footer />
      </div>
    </SurpriseProvider>
  );
}

export default App;
