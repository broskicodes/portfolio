import { KeyboardEvent, useCallback, useRef, useState } from "react"

interface TerminalProps {
  // onEscape: (event: KeyboardEvent) => void;
}

export const Terminal = ({ }: TerminalProps) => {
  const [userInput, setUserInput] = useState<string>('')
  const terminalRef = useRef<HTMLDivElement>(null);
  const invisibleRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleTerminalClick = useCallback(() => {
    document.body.style.cursor = 'none';
    terminalRef.current?.focus();
    focusCursor();
  }, []);

  const handleBlur = useCallback(() => {
    document.body.style.cursor = '';
    blurCursor();
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // document.body.style.cursor = '';
      // terminalRef.current?.blur();
      invisibleRef.current?.focus();
    } else if (event.key === 'Backspace') {
      setUserInput(userInput.slice(0, userInput.length - 1));
    } else if (event.key === 'Enter') {
      setUserInput('');
    } else if (event.key === ' ') {
      // console.log('space');
      setUserInput(userInput + ' ');
    } else if (event.key.length === 1) {
      setUserInput(userInput + event.key);
    }
  }, [userInput]);

  const focusCursor = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.animationPlayState = 'running';
      cursorRef.current.style.backgroundColor = "#FFF";
      cursorRef.current.style.outline = "none";
    }
  }, []);

  const blurCursor = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.animationPlayState = 'paused';
      cursorRef.current.style.backgroundColor = 'transparent';
      cursorRef.current.style.outline = "1px solid #FFF";
    }
  }, []);

  const renderInput = useCallback(() => {
    return { __html: userInput.replace(/ /g, '&nbsp;') };
  }, [userInput]);

  return (
    <div>
      <div ref={invisibleRef} tabIndex={-1}/>
      <div className="terminal mx-auto mt-4" tabIndex={0} onClick={handleTerminalClick} onBlur={handleBlur} onKeyDown={handleKeyDown}>
        <div className="terminal-overlay" />
        <div className="terminal-content terminal-text flex flex-col py-2 px-4">
          {/* Coming Soon. */}
          <div className="flex flex-row items-center h-fit">
            <span className="terminal-prompt mr-4 ">anon@brhall.dev<span id="terminal-prompt-symbol">$</span></span> <span className="" dangerouslySetInnerHTML={renderInput()} /> <div id="terminal-cursor" ref={cursorRef} />
          </div>
        </div>
      </div>
    </div>
  )
}