/**
 * Vuetify3 Plugin
 */
import { createVuetify } from "vuetify";

// Misc
import { loadFonts } from "./webfontloader";
loadFonts();
import LuxonAdapter from "@date-io/luxon";

// Styles
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const myCustomLightTheme = {
  dark: false,
  colors: {
    dakrgrey: "#2a2a2a",
    grey: "#545454",
    lightGrey: "#dedede",
    lightBlue: "#5bc0eb",
    red: "#811429",
    darkRed: "#48111c",
  },
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
  },
  tab: 'option-1',
  date: {
    adapter: LuxonAdapter,
  },
});

export default vuetify;
