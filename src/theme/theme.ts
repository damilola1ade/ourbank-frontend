import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./globalStyles";
import { breakpoints } from "./foundations/breakpoints";
import { tabs } from "./components/tabs";
import { buttonStyles } from "./components/button";

export default extendTheme({ breakpoints }, globalStyles, tabs, buttonStyles);
