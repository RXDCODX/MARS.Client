import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

import { useSiteColors } from "../../../../shared/Utils/useSiteColors";
import { Country, getFlagPath, searchCountries } from "./flagUtils";

type FlagSelectorProps = {
  selectedFlag: string;
  onFlagChange: (flagCode: string) => void;
  placeholder?: string;
};

const FlagSelector: React.FC<FlagSelectorProps> = ({
  selectedFlag,
  onFlagChange,
  placeholder = "Выберите флаг",
}) => {
  const colors = useSiteColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredCountries(searchCountries(searchQuery));
  }, [searchQuery]);

  const handleSelect = (countryCode: string) => {
    onFlagChange(countryCode);
    setIsOpen(false);
    // Устанавливаем название страны в поисковый запрос для отображения в инпуте
    const selectedCountry = searchCountries(countryCode).find(
      (c) => c.code === countryCode,
    );
    if (selectedCountry) {
      setSearchQuery(selectedCountry.name);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(true);

    // Если пользователь начал печатать и у нас есть выбранный флаг,
    // сбрасываем его, так как пользователь ищет новую страну
    if (value && selectedFlag) {
      onFlagChange("");
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Не закрываем сразу, чтобы можно было кликнуть на опцию
    setTimeout(() => setIsOpen(false), 200);
  };

  // Получаем информацию о выбранной стране
  const selectedCountry = selectedFlag
    ? searchCountries(selectedFlag).find((c) => c.code === selectedFlag)
    : null;

  return (
    <div className="position-relative w-100">
      <div className="position-relative">
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder={selectedFlag ? "" : placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          size="sm"
          className="border-info border-2 fw-bold rounded-3"
          style={{
            backgroundColor: colors.background.card,
            color: colors.text.primary,
            borderColor: colors.border.primary,
            paddingLeft: selectedFlag && !isOpen ? "40px" : "12px",
          }}
        />

        {/* Флаг в инпуте */}
        {selectedFlag && !isOpen && selectedCountry && (
          <div
            className="position-absolute top-50 start-0 translate-middle-y d-flex ms-2 align-items-center"
            style={{
              pointerEvents: "none",
              left: "12px",
              zIndex: 1,
            }}
          >
            <img
              src={getFlagPath(selectedFlag)}
              alt={selectedCountry.name}
              style={{
                width: "20px",
                height: "15px",
                objectFit: "cover",
                borderRadius: "2px",
                border: `1px solid ${colors.border.primary}`,
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="position-absolute w-100 border border-info rounded-3 mt-1"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
            top: "100%",
            backgroundColor: colors.background.card,
            borderColor: colors.border.primary,
            boxShadow: colors.shadow.medium,
          }}
        >
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              className="d-flex align-items-center gap-2 p-2 cursor-pointer"
              style={{
                cursor: "pointer",
                borderBottom: `1px solid ${colors.border.primary}`,
                color: colors.text.primary,
                transition: "background-color 0.2s ease",
              }}
              onClick={() => handleSelect(country.code)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  colors.hover.background)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <img
                src={getFlagPath(country.code)}
                alt={country.name}
                style={{
                  width: "20px",
                  height: "15px",
                  objectFit: "cover",
                  flexShrink: 0,
                  borderRadius: "2px",
                  border: `1px solid ${colors.border.primary}`,
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="small" style={{ color: colors.text.primary }}>
                {country.name}
              </span>
            </div>
          ))}
          {filteredCountries.length === 0 && (
            <div
              className="p-2 text-muted small"
              style={{ color: colors.text.secondary }}
            >
              Страна не найдена
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlagSelector;
