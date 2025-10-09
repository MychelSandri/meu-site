// components/HeroCarousel.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    heading: 'Qualidade Premium',
    text: 'Acabamento superior e materiais de alta resistência.',
    image: '/images/trofeu-tiro.jpg'
  },
  {
    id: 2,
    heading: 'Design Exclusivo',
    text: 'Modelos criados sob medida para sua necessidade.',
    image: '/images/destaque-design.jpg'
  },
  {
    id: 3,
    heading: 'Orçamento Rápido',
    text: 'Envie seu projeto 3D e receba uma cotação em horas.',
    image: '/images/destaque-orcamento.jpg'
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lógica para carrossel automático (muda a cada 5 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div style={{
      position: 'relative',
      height: '600px',
      width: '100%',
      overflow: 'hidden',
    }}>
      {/* Certifique-se de que estas imagens existem na pasta /public/images */}
      <Image
        src={currentSlide.image}
        alt={currentSlide.heading}
        fill
        sizes="100vw" // Adiciona sizes para otimização em Next.js
        style={{ objectFit: 'cover', opacity: 0.99 }}
        priority
      />

      {/* Sobreposição de Texto */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: '0' }}>
          {currentSlide.heading}
        </h1>
        <p style={{ fontSize: '24px', marginTop: '10px' }}>
          {currentSlide.text}
        </p>
      </div>

      {/* Indicadores de Slide */}
      <div style={{ position: 'absolute', bottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {slides.map((_, index) => (
          <span
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#000' : '#ccc',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
