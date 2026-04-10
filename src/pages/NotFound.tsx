import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Illustration */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-destructive-foreground font-bold text-sm">?</span>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page introuvable
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
            Vérifiez l'URL ou retournez à l'accueil.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" className="flex items-center gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Page précédente
          </Button>
        </div>

        {/* Suggestion de recherche */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            Vous cherchiez peut-être :
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/shared/calendar">
              <Button variant="ghost" size="sm" className="text-xs">
                Calendrier
              </Button>
            </Link>
            <Link to="/shared/school-wall">
              <Button variant="ghost" size="sm" className="text-xs">
                Mur d'école
              </Button>
            </Link>
            <Link to="/shared/notifications">
              <Button variant="ghost" size="sm" className="text-xs">
                Notifications
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
