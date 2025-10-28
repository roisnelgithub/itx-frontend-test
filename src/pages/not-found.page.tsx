import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col items-center mt-20 h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link to="/">
        <Button variant="outline">
          Go back to Products list
        </Button>
      </Link>
    </section>
  );
};

export default NotFoundPage;
