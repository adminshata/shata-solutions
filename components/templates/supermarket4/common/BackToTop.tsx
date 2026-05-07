'use client';
import React, { useEffect } from 'react';

function BackToTop() {
  useEffect(() => {
    const progressPath = document.querySelector('.progress-wrap path') as SVGPathElement | null;
    if (!progressPath) return;
    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = `${pathLength}`;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = 'stroke-dashoffset 10ms linear';
    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = `${progress}`;
    };
    const handleScroll = () => {
      updateProgress();
      const btn = document.querySelector('.progress-wrap');
      const sw = document.querySelector('.rts-switcher');
      if (btn && sw) {
        if (window.scrollY > 50) { btn.classList.add('active-progress'); sw.classList.add('btt__visible'); }
        else { btn.classList.remove('active-progress'); sw.classList.remove('btt__visible'); }
      }
    };
    const scrollToTop = (e: Event) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    window.addEventListener('scroll', handleScroll);
    const btn = document.querySelector('.progress-wrap');
    btn?.addEventListener('click', scrollToTop);
    return () => { window.removeEventListener('scroll', handleScroll); btn?.removeEventListener('click', scrollToTop); };
  }, []);
  return (
    <>
      <div className="progress-wrap">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '307.919' }} />
        </svg>
      </div>
      <div className="rts-switcher"></div>
    </>
  );
}
export default BackToTop;
