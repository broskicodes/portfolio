"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

export default function Home() {
  const footerContentRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerContentRef.current) {
        const contentWidth = footerContentRef.current.scrollWidth + 'px';
        document.documentElement.style.setProperty('--content-width', contentWidth); // Setting the CSS variable
    }
  }, []);

  const stopScroll = useCallback(() => {
    if (scrollContentRef.current) {
      scrollContentRef.current.style.animationPlayState = 'paused';
    }
  }, []);

  const resumeScroll = useCallback(() => {
    if (scrollContentRef.current) {
      scrollContentRef.current.style.animationPlayState = 'running';
    }
  }, []);

  return (
    <div>
      <div className='container mx-auto flex justify-end'>
        <div className='details w-fit mt-16'>
          <div className='about backlit'>
            <p className='about-header'>BRAEDEN_HALL</p>
            <p className='about-subheader'>SOFTWARE_DEVELOPER</p>
            <p className='about-subheader'>DREAMER</p>
          </div>
          <div className='contact pt-4 backlit'>
            <p>email &nbsp; = braeden@brhall.dev</p>
            <p>github &nbsp;= &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; broskicodes</p>
            <p>twitter = &nbsp;&nbsp;&nbsp;&nbsp; _broskitweets</p>
          </div>
        </div>
      </div>
      <div className="terminal mx-auto mt-4">
        <div className="terminal-overlay" />
          <div className="terminal-content terminal-text flex justify-center pt-8 backlit">
            Coming Soon.
          </div>
      </div>
      <div className='footer' onMouseEnter={stopScroll} onMouseLeave={resumeScroll}>
        <div className='footer-content backlit py-4 flex flex-row' ref={scrollContentRef}>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex flex-row space-x-32 pl-32" ref={footerContentRef}>
              <Link className="link" target="_blank" href="https://mlresearch.club"><p className="footer-text">Join The <span className="m1-bold">MLRC</span></p></Link>
              <Link className="link" target="_blank" href="https://app.chesski.lol"><p className="footer-text">Practice with <span className="m1-bold">Chesski</span></p></Link>
              <Link className="link" target="_blank" href="https://broskiblogs.substack.com/"><p className="footer-text">Read My <span className="m1-bold">Substack</span></p></Link>
              <Link className="link" target="_blank" href="https://broskicodes.notion.site/broskicodes/broski-s-research-notes-39d707ae2f1b451da6692387c57f24a8"><p className="footer-text">Check out my <span className="m1-bold">ML Research</span></p></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
