# mcp-swapi

MCP server for Star Wars data via [SWAPI](https://swapi.dev/). Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `search_people` | Search Star Wars characters by name |
| `get_planet` | Get a planet by numeric ID |
| `get_starship` | Get a starship by numeric ID |
| `get_film` | Get a film by numeric ID |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "swapi_search_people",
      "arguments": { "query": "Luke" }
    },
    "id": 1
  }'
```

## License

MIT
