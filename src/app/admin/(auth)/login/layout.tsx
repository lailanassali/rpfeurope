import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login - RPF',
  description: 'Redeemed Pillar of Fire Admin Portal',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            success: {
              style: { background: '#10B981', color: '#fff' },
            },
            error: {
              style: { background: '#EF4444', color: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}
