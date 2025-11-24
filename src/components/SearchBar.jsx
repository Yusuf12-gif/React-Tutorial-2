import { useRef, useEffect } from "react";

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="search-input"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
