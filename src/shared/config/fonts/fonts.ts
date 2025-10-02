import localFont from "next/font/local";

export const nunitoSans = localFont({
  src: [
    {
      path: "../../../assets/fonts/NunitoSans-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--nunito-font",
});

export const openSans = localFont({
  src: [
    {
      path: "../../../assets/fonts/OpenSans-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--openSans-font",
});

export const inter = localFont({
  src: [
    {
      path: "../../../assets/fonts/Inter-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--inter-font",
});

export const appFonts = [
  nunitoSans.variable,
  inter.variable,
  openSans.variable,
];
