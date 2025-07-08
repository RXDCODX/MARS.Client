// eslint-disable-next-line no-restricted-imports
import React, { useEffect } from "react";

export const withStorybookAttribute = (Story) => {
  const Wrapper = (props) => {
    useEffect(() => {
      document.documentElement.setAttribute("data-storybook", "true");
      return () => {
        document.documentElement.removeAttribute("data-storybook");
      };
    }, []);
    return <Story {...props} />;
  };
  return <Wrapper />;
};
