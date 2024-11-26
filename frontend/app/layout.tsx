import "bootstrap/dist/css/bootstrap.min.css"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Demo Mini Blog',
    default: "Demo Mini Blog"
  },
  description: "This is a mini blog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
