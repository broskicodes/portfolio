import { useTerminal } from "@/contexts/TermianlProvider";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown';

interface TerminalProps {
  // onEscape: (event: KeyboardEvent) => void;
}

const terminalCommands = [
  {
    command: 'help',
    description: 'List available commands.',
    action: () => {
      return `This is an interactive terminal for accessing data on this website.

Available Commands:
- **help:** you\’re reading what this one does :)
- **whoami:** list the things I\’m currently interested in
- **proj:** see a list of my featured projects
- **contact:** best ways to contact me
- **view:** visit a url Ex: **view twitter**. use view --help for available options
- **clear:** clear the terminal`;
    }
  },
  {
    command: 'whoami',
    description: 'About me.',
    action: () => {
      return `Hello, I\’m Braeden. I\’m a software dev by trade. Fun fact: I run Linux! (if you couldn\’t tell).

Right now I spend most of my time tinkering with ML/AI tech and building communities. Wanna learn with me? Join the **MLRC!**

I\’m also an avid rock climber (V8 boulder, 5.11 lead) and I sometimes dabble in chess (~1600 rapid).

If you wanna talk to me about anything, the best way to reach me is on **twitter** :)`;
    }
  },
  {
    command: 'proj',
    description: 'List of projects.',
    action: () => {
      return `Building side projects is my favorite thing to do. Here’s a list of some of my favs; in no particular order:
- **Chesski:** An LLM chess coach that helps explain mistakes in your games
- **Sparkski:** An AI assistant that tries to get to know and summarize your personality
- **MLRC:** The Machine Learning Research Club. A weekly book club style community for ML tinkerers
- **Libski:** Semantic search for ML research papers

You may have noticed I have a default naming convention :)`;
    }
  },
  {
    command: 'contact',
    description: 'Contact information.',
    action: () => {
      return `The best and fastest way to reach me is usually **twitter**, but you are also welcome to send me an **email**.`;
    }
  },
  {
    command: 'view',
    description: 'Visit a URL.',
    action: (args: string[]) => {
      if (args.length === 0) {
        return `You must provide a argument for link to visit. 
        
Use **view --help** for available options`
      } else {
        switch (args[0]) {
          case '--help':
            return `You might have noticed you lost your cursor. The view command will allow you to open links without having to click.

Usage: **view <subcommand>**

Subcommands: chesski, email, github, libski, mlrc, sparkski, substack, twitter`;
          case 'twitter':
            window.open('https://twitter.com/_broskitweets');
            return "Opening https://twitter.com/_broskitweets";
          case 'github':
            window.open('https://github.com/broskicodes');
            return "Opening https://github.com/broskicodes";
          case 'substack':
            window.open('https://broskiblogs.substack.com/');
            return "Opening https://broskiblogs.substack.com/";
          case 'mlrc':
            window.open('https://mlresearch.club');
            return "Opening https://mlresearch.club";
          case 'chesski':
            window.open('https://app.chesski.lol');
            return "Opening https://app.chesski.lol";
          case 'sparkski':
            window.open('https://assistant.sparkpods.xyz');
            return "Opening https://assistant.sparkpods.xyz";
          case 'libski':
            window.open('https://lib.broski.lol');
            return "Opening https://lib.broski.lol";
          case 'email':
            window.open('mailto:braeden@brhall.dev');
          default:
            return "Invalid subcommand. Use **view --help** for available options";
        }
      }
    }
  }
]

export const Terminal = ({ }: TerminalProps) => {
  const [userInput, setUserInput] = useState<string>('')
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [outputHistory, setOutputHistory] = useState<string[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { isFocused, toggleFocus } = useTerminal();

  const handleTerminalClick = useCallback(() => {
    document.body.style.cursor = 'none';
    terminalRef.current?.focus();
    focusCursor();
  }, []);

  const handleBlur = useCallback(() => {
    document.body.style.cursor = '';
    toggleFocus(false);
    blurCursor();
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      terminalRef.current?.blur();
    } else if (event.key === 'Backspace') {
      setUserInput(userInput.slice(0, userInput.length - 1));
    } else if (event.key === 'Enter') {
      setCommandHistory([...commandHistory, userInput]);
      const command = userInput.split(' ')[0];

      if (!command) {
        setUserInput('');
        setOutputHistory([...outputHistory, '']);
        return;
      }

      if (command === 'clear') {
        setUserInput('');
        setOutputHistory([]);
        setCommandHistory([]);
        return;
      }

      if (command && terminalCommands.map(c => c.command).includes(command)) {
        const args = userInput.split(' ').slice(1);
        const commandObj = terminalCommands.find(c => c.command === command);
        if (commandObj) {
          console.log(commandObj.action(args));
          setOutputHistory([...outputHistory, commandObj.action(args)]);
        }
      } else {
        setOutputHistory([...outputHistory, `Command not found: ${command}`]);
      }

      setUserInput('');
    } else if (event.key === ' ') {
      setUserInput(userInput + ' ');
    } else if (event.key.length === 1) {
      setUserInput(userInput + event.key);
    }
  }, [userInput, commandHistory, outputHistory]);

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

  const renderInput = useCallback((input: string) => {
    return { __html: input.replace(/ /g, '&nbsp;') };
  }, [userInput]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [commandHistory, outputHistory]);

  return (
    <div>
      <div className="terminal mx-auto sm:mt-16 md:mt-20 lg:mt-4" tabIndex={0} onClick={handleTerminalClick} onBlur={handleBlur} onKeyDown={handleKeyDown} ref={terminalRef}>
        <div className="terminal-overlay" />
        {!isFocused && (
          <div className="terminal-blur flex justify-center items-center" onClick={() => toggleFocus(true)}>
            <p className="terminal-blur-text backlit">Click to Interact</p>
          </div>
        )}
        <div className="terminal-content terminal-text flex flex-col py-2 px-6" ref={contentRef}>
          <div className="flex flex-col">
            {commandHistory.map((command, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex flex-row items-center h-fit">
                  <span className="terminal-prompt mr-2 ">anon@brhall.dev<span id="terminal-prompt-symbol">$</span></span> <span className="terminal-text" dangerouslySetInnerHTML={renderInput(command)} />
                </div>
                <ReactMarkdown className="terminal-text" >{outputHistory[i]}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center h-fit">
            <span className="terminal-prompt mr-2 ">anon@brhall.dev<span id="terminal-prompt-symbol">$</span></span> <span className="terminal-text" dangerouslySetInnerHTML={renderInput(userInput)} /> <div id="terminal-cursor" ref={cursorRef} />
          </div>
        </div>
      </div>
    </div>
  )
}