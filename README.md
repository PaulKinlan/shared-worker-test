# SharedWorker Test Suite

A diagnostic playground and debug tool for testing how `SharedWorker` threads coordinate message passing and manage connection lifecycles across different browser contexts.

This project lets you test and verify:
1. **Intra-page communication**: Message passing between side-by-side embedded `<iframe>` sandboxes.
2. **Cross-context communication**: Bi-directional message passing between the parent document and nested iframes.
3. **Cross-tab/Cross-window communication**: Synchronized message passing across entirely separate browser tabs or windows running on the same origin.
4. **Lifecycle and Connection States**: Tracing connection registration, graceful disconnect unloads, and manual network drops to verify connection persistence.

---

## What the Project Does

- **SharedWorker Orchestration**: Spins up a single `SharedWorker` instance (`public/worker.js`) shared by all open pages and iframes on the origin.
- **Connection Registration**: Auto-registers each client port with a unique ID and custom name upon handshake, broadcasting the updated grid topology to all clients.
- **Bi-Directional Broadcasts**: Any text typed and sent from any parent page or sub-iframe is instantly broadcasted to all other active client ports.
- **Trace Logs & Event Auditing**: Provides a live wire trace of all system and message payloads passing through the worker (joins, leaves, message broadcasts).
- **Manual Disconnect Toggles**: Allows you to manually disconnect and reconnect individual iframe clients to test how the SharedWorker handles connection drops and re-handshakes.

---

## Directory Structure

```text
shared-worker-demo/
├── deno.json          # Deno task configurations (start commands)
├── main.ts            # Deno web server to host the static assets
├── LICENSE            # Apache License, Version 2.0
├── README.md          # Project documentation (this file)
└── public/            # Static assets served on port 8000
    ├── index.html     # Parent dashboard page & diagnostics view
    ├── iframe.html    # Iframe client test page
    ├── worker.js      # SharedWorker background script
    └── style.css      # CSS styles for the dashboard layout
```

---

## Getting Started

### Prerequisites

Ensure you have [Deno](https://deno.com) installed.

### How to Run Locally

1. Open your terminal and navigate to the project directory:
   ```bash
   cd shared-worker-demo
   ```

2. Spin up the local Deno static server:
   ```bash
   deno task start
   ```

3. Open the main diagnostic dashboard in your web browser:
   ```text
   http://localhost:8000
   ```

### How to Test and Verify

1. **Test iframe-to-iframe communication**: Type a message in *Iframe A* and click Send. Verify that the message instantly logs in *Iframe B* and the Parent's Trace Log.
2. **Test parent-to-iframe communication**: Type a message in the *Parent Main Client* input at the top left and click Broadcast. Verify all iframes capture it.
3. **Test cross-tab synchronization**: Copy the dashboard URL, open a second tab or separate side-by-side browser window, and observe that the *System Topology Map* dynamically registers the new page. Type in one tab and watch it instantly sync to the other.
4. **Test connection resilience**: Click **Disconnect Node** inside *Iframe A*. Verify that the topology map instantly updates (marking it offline) and *Iframe A* stops receiving messages. Reconnect it and verify it successfully rejoins the active worker grid.

---

## Author

**Paul Kinlan**
- **Website**: [paul.kinlan.me](https://paul.kinlan.me)
- **AI Focus**: [aifoc.us](https://aifoc.us)
- **GitHub**: [@PaulKinlan](https://github.com/PaulKinlan)
- **Twitter (X)**: [@paul_kinlan](https://twitter.com/paul_kinlan)
- **Mastodon**: [@paul@status.kinlan.me](https://status.kinlan.me/@paul)

## License

Licensed under the Apache License, Version 2.0 (the "License"). See the `LICENSE` file for full terms.
