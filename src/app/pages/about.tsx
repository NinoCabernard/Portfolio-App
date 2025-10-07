import { useState, useEffect } from "react";
import "./about.css";

export default function Home() {
  const name = "Nino Cabernard";
  const wrongSubtitle = "Software Develo";
  const correctSubtitle = "Software Engineer";
  const writeTempoInterval = 175;
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
        setNameDone(true);
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
          setSubtitleDone(true);
        }
      } else {
        if (subtitleToWrite == displayedSubtitle) {
          setSubtitleToWrite(correctSubtitle);
          setIsCorrectingSubtitle(true);
          // timeout = setTimeout(writeSubtitle, 50);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        background: "#1a1a1a",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "5rem", margin: 0 }}>
        {displayedName}
        {!nameDone && <span className="cursor">|</span>}
      </h1>
      {nameDone && (
        <h2 style={{ fontSize: "2rem", marginTop: "1rem", height: "2.5rem" }}>
          {displayedSubtitle}
          {!subtitleDone && <span className="cursor">|</span>}
        </h2>
      )}
    </div>
  );
}
