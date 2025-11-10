import { useState, useEffect } from "react";
import "./typewriter.css";

interface TypewriterProps {
  onWritingCompleted?: () => void;
}

export default function Typewriter({ onWritingCompleted }: TypewriterProps) {
  const name = "Nino Cabernard";
  const wrongSubtitle = "Software Develo";
  const correctSubtitle = "Software Engineer";
  const writeTempoInterval = 60;
  const nextLinePause = 100;
  const [displayedName, setDisplayedName] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");

  const [nameDone, setNameDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [isCorrectingSubtitle, setIsCorrectingSubtitle] = useState(false);
  const [subtitleToWrite, setSubtitleToWrite] = useState(wrongSubtitle);

  useEffect(() => {
    let characterIndex = 0;
    const interval = setInterval(() => {
      setDisplayedName(name.slice(0, characterIndex + 1));
      characterIndex++;
      if (characterIndex === name.length) {
        clearInterval(interval);
        setTimeout(() => setNameDone(true), nextLinePause);
      }
    }, writeTempoInterval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!nameDone) return;

    let charIndex = displayedSubtitle.length;
    let timeout: NodeJS.Timeout;
    const writeSubtitle = () => {
      if (isCorrectingSubtitle) {
        if (
          correctSubtitle.startsWith(displayedSubtitle) &&
          correctSubtitle != displayedSubtitle
        ) {
          setDisplayedSubtitle(subtitleToWrite.slice(0, charIndex + 1));
          charIndex++;
        } else if (!correctSubtitle.startsWith(displayedSubtitle)) {
          setDisplayedSubtitle(displayedSubtitle.slice(0, charIndex - 1));
          charIndex--;
        } else if (correctSubtitle == displayedSubtitle) {
          setTimeout(() => {
            setSubtitleDone(true);
            onWritingCompleted?.();
          }, 500);
        }
      } else {
        if (subtitleToWrite == displayedSubtitle) {
          setTimeout(() => {
            setSubtitleToWrite(correctSubtitle);
            setIsCorrectingSubtitle(true);
          }, 500);
        } else {
          setDisplayedSubtitle(subtitleToWrite.slice(0, charIndex + 1));
          charIndex++;
        }
      }
    };
    timeout = setTimeout(writeSubtitle, writeTempoInterval);
    return () => clearTimeout(timeout);
  }, [nameDone, displayedSubtitle, subtitleToWrite]);

  return (
    <div>
      <div className="content-container">
        <div className="inner-content-container">
          <h1 className="typewriter-title">
            {displayedName}
            {!nameDone && <span className="cursor">|</span>}
          </h1>
          {nameDone && (
            <h2 className="typewriter-subtitle">
              {displayedSubtitle}
              {!subtitleDone && <span className="cursor">|</span>}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
