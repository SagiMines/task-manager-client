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
    <html className="w-full h-full" lang="en">
      <body className="w-full h-full bg-gray-200 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
