// eslint-disable-next-line no-restricted-imports
import React, { type ComponentType, useEffect } from "react";

// Декоратор для добавления атрибута Storybook
export const WithStorybookAttribute = ({ Story }: { Story: ComponentType }) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-storybook", "true");
    return () => {
      document.documentElement.removeAttribute("data-storybook");
    };
  }, []);

  return <Story />;
};
