export default function HeroBanner({ navigateTo }) {
  return (
    <section className="relative flex items-center justify-center text-center py-24 md:py-32 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-60 dark:from-primary/40"></div>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          DISCOVER MOVIES
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Explore and discover your favorite movies from around the world.
        </p>
        <button
          type="button"
          className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => navigateTo("movies")}
        >
          Explore Now
        </button>
      </div>
    </section>
  );
}
