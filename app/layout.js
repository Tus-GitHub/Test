import "./globals.css";

export const metadata = {
  title: "Test",
  description: "Test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
