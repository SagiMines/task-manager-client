import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Task manager app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-between bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
