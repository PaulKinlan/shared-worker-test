# SharedWorker Multiplex

A textbook-grade, real-time multiplexer for cross-iframe and cross-tab communication. This project features a print-inspired minimalist editorial design, real-time system topology rendering, tracing logs, and cache resilience.

## Features

- **Parent-to-Iframe Broadcasts**: Seamless bi-directional messaging between parent pages and nested sandboxes.
- **Iframe-to-Iframe Broadcasts**: Side-by-side communication entirely orchestrated in a background SharedWorker thread.
- **Cross-Tab Dynamic Synchronization**: Real-time messaging and visual node mapping across multiple tabs and windows.
- **Textbook Topology Map**: Renders active client sessions in an editorial circuit style diagram.
- **Deno Hosting**: Serve all files using Deno's modern, zero-dependency static file server.

## Directory Structure

```text
shared-worker-demo/
├── deno.json          # Deno task script maps
├── main.ts            # Deno web server to serve static files
├── LICENSE            # Apache License, Version 2.0
├── README.md          # Project documentation
└── public/            # Static assets directory
    ├── index.html     # Main dashboard interface
    ├── iframe.html    # Iframe client template
    ├── worker.js      # SharedWorker connection hub
    └── style.css      # Minimalist editorial style sheet
```

## Getting Started

### Prerequisites

You must have [Deno](https://deno.com) installed on your system.

### Running Locally

1. Clone or navigate to the repository directory:
   ```bash
   cd shared-worker-demo
   ```

2. Start the local server:
   ```bash
   deno task start
   ```

3. Open your browser and navigate to the application:
   ```text
   http://localhost:8000
   ```

4. To test cross-tab synchronization, copy the URL and open it in multiple side-by-side browser windows!

## Author

Created by **Paul Kinlan**:
- **Personal Website**: [paul.kinlan.me](https://paul.kinlan.me)
- **AI Focus**: [aifoc.us](https://aifoc.us)
- **GitHub**: [@PaulKinlan](https://github.com/PaulKinlan)
- **Twitter (X)**: [@paul_kinlan](https://twitter.com/paul_kinlan)
- **Mastodon**: [@paul@status.kinlan.me](https://status.kinlan.me/@paul)

## License

Licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License in the `LICENSE` file or at:

http://www.apache.org/licenses/LICENSE-2.0
