interface Props {
  keyWordedString: string;
  keySymbol: string;
  classNameForKeyWordedSpan: string;
  isQuouted?: boolean;
  keyWordColor?: string;
}

export function KeyWordedText({
  keySymbol = "#",
  keyWordedString,
  classNameForKeyWordedSpan = "key_word",
  keyWordColor = "red",
  isQuouted,
}: Props) {
  if (keySymbol.length !== 1) {
    return undefined;
  }

  if (!keyWordedString) {
    return undefined;
  }

  const regex: RegExp = isQuouted
    ? new RegExp(`(${keySymbol}.*?${keySymbol})`, "g")
    : new RegExp(`(${keySymbol}\\S+)`, "g");

  const parts = keyWordedString.split(regex);

  return (
    <div>
      {parts.map((part, index) => {
        if (part.startsWith(keySymbol) && part.endsWith(keySymbol)) {
          const content = part.slice(1, -1);
          return (
            <span
              key={index}
              style={{ color: keyWordColor }}
              className={classNameForKeyWordedSpan}
            >
              {content}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
}
