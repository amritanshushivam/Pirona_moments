'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function HeaderLanguageSwitcher() {
  const [language, setLanguage] = useState('EN');
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowLangMenu(!showLangMenu)}
        className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-primary px-3 py-2 rounded-lg transition-colors"
      >
        {language}
        <ChevronDown className="h-4 w-4" />
      </button>
      {showLangMenu && (
        <div className="absolute top-full right-0 mt-2 w-28 bg-white border border-border rounded-lg shadow-premium z-10">
          <button
            onClick={() => {
              setLanguage('EN');
              setShowLangMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 font-body rounded-t-lg"
          >
            English
          </button>
          <button
            onClick={() => {
              setLanguage('हिंदी');
              setShowLangMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 font-body rounded-b-lg"
          >
            हिंदी
          </button>
        </div>
      )}
    </div>
  );
}
