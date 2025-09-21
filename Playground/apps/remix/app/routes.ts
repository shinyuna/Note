import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Design Pattern Routes
  route("patterns/flyweight", "routes/patterns/flyweight.tsx"),

  // Future pattern routes (will be added as patterns are implemented)
  // route("patterns/singleton", "routes/patterns.singleton.tsx"),
  // route("patterns/factory", "routes/patterns.factory.tsx"),
  // route("patterns/observer", "routes/patterns.observer.tsx"),
  // route("patterns/strategy", "routes/patterns.strategy.tsx"),
] satisfies RouteConfig;
