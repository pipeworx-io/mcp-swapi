/**
 * SWAPI MCP — wraps the Star Wars API (swapi.dev, free, no auth)
 *
 * Tools:
 * - search_people: search Star Wars characters by name
 * - get_planet: get a planet by numeric ID
 * - get_starship: get a starship by numeric ID
 * - get_film: get a film by numeric ID
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE = 'https://swapi.dev/api';

// -- API Response Types --

type SwapiList<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  url: string;
};

type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  url: string;
};

type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  starship_class: string;
  hyperdrive_rating: string;
  MGLT: string;
  url: string;
};

type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  url: string;
};

// -- Tool Definitions --

const tools: McpToolExport['tools'] = [
  {
    name: 'search_people',
    description:
      'Search Star Wars characters by name. Returns name, physical attributes, birth year, gender, and homeworld URL.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Character name to search for (e.g., "Luke")' },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_planet',
    description:
      'Get a Star Wars planet by its numeric ID. Returns name, climate, terrain, population, and orbital data.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Planet ID (e.g., 1 for Tatooine)' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_starship',
    description:
      'Get a Star Wars starship by its numeric ID. Returns name, model, manufacturer, crew capacity, and hyperdrive rating.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Starship ID (e.g., 9 for the Death Star)' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_film',
    description:
      'Get a Star Wars film by its numeric ID. Returns title, episode number, director, producer, release date, and opening crawl.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Film ID (e.g., 1 for A New Hope)' },
      },
      required: ['id'],
    },
  },
];

// -- Tool Implementations --

async function searchPeople(query: string) {
  const params = new URLSearchParams({ search: query });
  const res = await fetch(`${BASE}/people/?${params}`);
  if (!res.ok) throw new Error(`SWAPI people search error: ${res.status}`);

  const data = (await res.json()) as SwapiList<Person>;

  return {
    count: data.count,
    results: data.results.map((p) => ({
      name: p.name,
      height: p.height,
      mass: p.mass,
      hair_color: p.hair_color,
      skin_color: p.skin_color,
      eye_color: p.eye_color,
      birth_year: p.birth_year,
      gender: p.gender,
      homeworld: p.homeworld,
      url: p.url,
    })),
  };
}

async function getPlanet(id: number) {
  const res = await fetch(`${BASE}/planets/${id}/`);
  if (res.status === 404) throw new Error(`Planet not found: ID ${id}`);
  if (!res.ok) throw new Error(`SWAPI planet error: ${res.status}`);

  const p = (await res.json()) as Planet;

  return {
    name: p.name,
    rotation_period: p.rotation_period,
    orbital_period: p.orbital_period,
    diameter: p.diameter,
    climate: p.climate,
    gravity: p.gravity,
    terrain: p.terrain,
    surface_water: p.surface_water,
    population: p.population,
    url: p.url,
  };
}

async function getStarship(id: number) {
  const res = await fetch(`${BASE}/starships/${id}/`);
  if (res.status === 404) throw new Error(`Starship not found: ID ${id}`);
  if (!res.ok) throw new Error(`SWAPI starship error: ${res.status}`);

  const s = (await res.json()) as Starship;

  return {
    name: s.name,
    model: s.model,
    manufacturer: s.manufacturer,
    cost_in_credits: s.cost_in_credits,
    length: s.length,
    max_atmosphering_speed: s.max_atmosphering_speed,
    crew: s.crew,
    passengers: s.passengers,
    cargo_capacity: s.cargo_capacity,
    starship_class: s.starship_class,
    hyperdrive_rating: s.hyperdrive_rating,
    MGLT: s.MGLT,
    url: s.url,
  };
}

async function getFilm(id: number) {
  const res = await fetch(`${BASE}/films/${id}/`);
  if (res.status === 404) throw new Error(`Film not found: ID ${id}`);
  if (!res.ok) throw new Error(`SWAPI film error: ${res.status}`);

  const f = (await res.json()) as Film;

  return {
    title: f.title,
    episode_id: f.episode_id,
    director: f.director,
    producer: f.producer,
    release_date: f.release_date,
    opening_crawl: f.opening_crawl,
    url: f.url,
  };
}

// -- Dispatcher --

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'search_people':
      return searchPeople(args.query as string);
    case 'get_planet':
      return getPlanet(args.id as number);
    case 'get_starship':
      return getStarship(args.id as number);
    case 'get_film':
      return getFilm(args.id as number);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool } satisfies McpToolExport;
