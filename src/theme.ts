import { MantineColorsTuple, createTheme } from "@mantine/core";

const tosca: MantineColorsTuple = [
  "#e5fcf8",
  "#d8f3ee",
  "#b6e3dc",
  "#90d4c8",
  "#70c6b7",
  "#5cbeac",
  "#4ebaa7",
  "#3da392",
  "#2f9281",
  "#177f6f"
];
const theme = createTheme({
  colors: {
    tosca,
  }
});

export default theme;
