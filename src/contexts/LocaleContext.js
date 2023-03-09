import React from "react";

const defaultValue = {
  locale: "id",
  toggleLocale: () => {},
};
const LocaleContext = React.createContext(defaultValue);

export const LocaleProvider = LocaleContext.Provider;
export const LocaleConsumer = LocaleContext.Consumer;

export default LocaleContext;
