# selenium-mcp setup

Browser testing for WortWunder (see [QA-PLAYBOOK.md](QA-PLAYBOOK.md)) runs
through [selenium-mcp](https://github.com/Volta-Jebaprashanth/selenium-mcp),
an MCP server that drives a real Chrome. This page covers getting it
running. How to test a lesson with it is in the playbook.

## 1. Install the MCP server

Pick one of the two routes. Register it once, at user scope, so every
project can use it. Don't commit an `.mcp.json` for it to this repo.

### Option A: the jar (what this machine uses)

Needs Java 21+. This machine runs it with the JDK at
`C:/Users/volta/.jdks/openjdk-25`.

1. Download the jar from
   <https://github.com/Volta-Jebaprashanth/selenium-mcp/releases/latest/download/selenium-mcp.jar>
   (it lives at `C:/Users/volta/Downloads/selenium-mcp.jar` here), or build
   it from source with `mvn clean package`.
2. Register it in `~/.claude.json` under `mcpServers`:

   ```json
   "selenium-mcp": {
     "type": "stdio",
     "command": "C:/Users/volta/.jdks/openjdk-25/bin/java.exe",
     "args": ["-jar", "C:/Users/volta/Downloads/selenium-mcp.jar"]
   }
   ```

   Or from a terminal:

   ```sh
   claude mcp add --scope user selenium-mcp -- "C:/Users/volta/.jdks/openjdk-25/bin/java.exe" -jar "C:/Users/volta/Downloads/selenium-mcp.jar"
   ```

When run from the jar, the server writes `mcp-server.log` (and rotated
`mcp-server.log.*.gz` files) into the working directory, which is this repo.
They're gitignored. To keep them out of the repo entirely, add
`--logging.file.name=C:/Users/volta/.selenium-mcp/mcp-server.log` to `args`.

### Option B: npm (no Java install)

The package bundles its own Java runtime. The first start downloads about
90 MB; if the client times out, restart once, or warm it up with
`npx -y @xpathy/selenium-mcp --version`. On Windows, Claude Code needs `npx`
wrapped in `cmd /c`:

```json
"selenium-mcp": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@xpathy/selenium-mcp"]
}
```

Logs go to `~/.selenium-mcp/mcp-server.log`.

### Fewer tools (optional)

The server exposes ~130 tools, and each schema costs tokens. Lesson QA
doesn't need the API, network, cookie, alert, select or file groups, so you
can add this to `args`:

```
--selenium.mcp.exclude-tool-groups=api,network,cookies,alerts,select,files
```

Check it's loaded with `/mcp` in Claude Code. The tools show up as
`mcp__selenium-mcp__*` and are deferred, so load the ones you need in a
single `ToolSearch` call first (see the playbook).

## 2. Start Chrome with remote debugging

The tests attach to a Chrome you started yourself, on debug port **1997**
with a separate profile folder. From `cmd`:

```
start chrome --remote-debugging-port=1997 --user-data-dir="%USERPROFILE%\Videos\temp"
```

1997 is Chrome's debug port, not the MCP server's (stdio has no port).

To check which port a running Chrome uses (PowerShell):

```powershell
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ? CommandLine -match remote-debugging | select CommandLine
```

`launchDebugBrowser` can start a debug Chrome instead, but it defaults to
port 9222 and a fresh profile, so prefer the command above.

## 3. Start the app

```sh
bun run dev   # http://localhost:8080
```

If `bun` isn't on the PATH, use `~/.bun/bin/bun.exe run dev`.

## 4. Connect

```
connectToBrowser { debuggerAddress: "127.0.0.1:1997" }
```

Then open `http://localhost:8080` (it's usually already in the active tab)
and follow [QA-PLAYBOOK.md](QA-PLAYBOOK.md) from "Known tool limits".

## Known limits

- **Console capture doesn't work** on Chrome 155: Selenium's CDP bindings
  only cover a few Chrome versions, so `startConsoleCapture` /
  `getConsoleLogs` fail with a `DevToolsException` ("no-op implementation
  of the CDP"). Hook `console.error` in the page instead (playbook helpers). The
  real fix is bumping `selenium.version` in the selenium-mcp `pom.xml`.
- **`executeScript` times out after 30 s.** Start long loops without
  awaiting and poll a `window` global.
- Errors come back as the driver's one-line message, without Selenium's
  diagnostic details.
