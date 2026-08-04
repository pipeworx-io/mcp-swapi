# mcp-swapi

SWAPI MCP — wraps the Star Wars API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `search_people` | Search Star Wars characters by name. Returns name, physical attributes, birth year, gender, and homeworld URL. |
| `get_planet` | Get a Star Wars planet by its numeric ID. Returns name, climate, terrain, population, and orbital data. |
| `get_starship` | Get a Star Wars starship by its numeric ID. Returns name, model, manufacturer, crew capacity, and hyperdrive rating. |
| `get_film` | Get a Star Wars film by its numeric ID. Returns title, episode number, director, producer, release date, and opening crawl. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "swapi": {
      "url": "https://gateway.pipeworx.io/swapi/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Swapi data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
