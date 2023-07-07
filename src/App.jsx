import { useState } from "react";
import "./App.css";

export default function App() {
  const [copyText, setCopyText] = useState("Copiar");
  const [password, setPassword] = useState("");
  const [customSize, setCustomSize] = useState(12);
  const [showInput, setShowInput] = useState(false);

  const passwordSize = showInput ? customSize : 8;

  function generatePassword() {
    let newPassword = "";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`}{[]:';?><,./-=" + "\u0022";

    const randomLower = lowercase.charAt(
      Math.floor(Math.random() * lowercase.length)
    );
    const randomUpper = uppercase.charAt(
      Math.floor(Math.random() * uppercase.length)
    );
    const randomNum = numbers.charAt(
      Math.floor(Math.random() * numbers.length)
    );
    const randomSymbol = symbols.charAt(
      Math.floor(Math.random() * symbols.length)
    );

    newPassword += randomLower + randomUpper + randomNum + randomSymbol;

    for (let i = 0; i < passwordSize - 4; i++) {
      var randomIndex = Math.floor(
        Math.random() *
          (lowercase.length +
            uppercase.length +
            numbers.length +
            symbols.length)
      );
      var randomChar;
      if (randomIndex < lowercase.length) {
        randomChar = lowercase.charAt(randomIndex);
      } else if (randomIndex < lowercase.length + uppercase.length) {
        randomChar = uppercase.charAt(randomIndex - lowercase.length);
      } else if (
        randomIndex <
        lowercase.length + uppercase.length + numbers.length
      ) {
        randomChar = numbers.charAt(
          randomIndex - lowercase.length - uppercase.length
        );
      } else {
        randomChar = symbols.charAt(
          randomIndex - lowercase.length - uppercase.length - numbers.length
        );
      }
      newPassword += randomChar;
    }
    setPassword(newPassword);
    setCopyText("Copy");
  }

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    setCopyText("Copied!!");
  }

  return (
    <>
      <h1>Password Generator</h1>
      <div>
        <label htmlFor="showInput">Customize Size:</label>
        <input
          type="checkbox"
          id="showInput"
          value={showInput}
          onChange={() => setShowInput((currentState) => !currentState)}
        />
      </div>
      <div>
        {showInput && (
          <div>
            <label htmlFor="passwordSize">Size:</label>
            <input
              type="number"
              id="passwordSize"
              min={4}
              value={passwordSize}
              onChange={(ev) => setCustomSize(+ev.target.value)}
            />
          </div>
        )}
      </div>
      <div className="card">
        <button onClick={generatePassword}>
          Generate password with {passwordSize} characters
        </button>
        <button onClick={copyToClipboard}>{copyText}</button>
      </div>
      <p>{password}</p>
    </>
  );
}
