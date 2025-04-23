import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex h-[calc(100vh-129px)] flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-muted-foreground mb-6 text-2xl font-semibold">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary focus:ring-opacity-50 rounded-md px-6 py-3 font-medium transition-colors duration-300 focus:ring-2 focus:outline-none"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
