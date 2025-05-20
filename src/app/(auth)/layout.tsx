import { Logo } from '@/components/common/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <Logo href="/login" iconSize={32} textSize="text-3xl" />
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
