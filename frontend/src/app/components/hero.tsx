'use client';

import React, { memo } from 'react';

const Hero: React.FC = () => {
  return (
    <div
      className="relative py-10 md:py-15 mt-[1px]"
      style={{ background: 'linear-gradient(to right, #8BC34A, #4CAF50)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            BIENVENUE SUR KONBIT AGRO AI
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-white max-w-[700px]">
            Votre solution intelligente pour l'agriculture de demain.
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(Hero);
