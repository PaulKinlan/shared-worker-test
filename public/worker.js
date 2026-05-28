// Centralized SharedWorker Messaging Hub
// Handles all multi-iframe and multi-tab communication

const ports = new Set();

self.onconnect = function (e) {
  const port = e.ports[0];
  ports.add(port);

  // Custom metadata properties on the port object
  port.clientId = null;
  port.clientName = "Initializing...";

  port.onmessage = function (event) {
    const data = event.data;

    if (!data || !data.type) return;

    if (data.type === "register") {
      port.clientId = data.id;
      port.clientName = data.name;

      // Broadcast new registration to all connected clients
      broadcast({
        type: "system",
        action: "connected",
        id: port.clientId,
        name: port.clientName,
        activeClients: getActiveClients(),
        timestamp: Date.now(),
      });
    } 
    else if (data.type === "message") {
      // Broadcast the user message to everyone
      broadcast({
        type: "message",
        senderId: port.clientId,
        senderName: port.clientName,
        text: data.text,
        timestamp: Date.now(),
      });
    } 
    else if (data.type === "disconnect") {
      cleanupPort(port);
    }
  };

  // Keep-alive or verification port start
  port.start();
};

function cleanupPort(port) {
  if (ports.has(port)) {
    const wasRegistered = port.clientId !== null;
    const oldId = port.clientId;
    const oldName = port.clientName;

    ports.delete(port);

    // Only broadcast disconnect if it was fully registered
    if (wasRegistered) {
      broadcast({
        type: "system",
        action: "disconnected",
        id: oldId,
        name: oldName,
        activeClients: getActiveClients(),
        timestamp: Date.now(),
      });
    }
  }
}

function getActiveClients() {
  const active = [];
  for (const p of ports) {
    if (p.clientId) {
      active.push({ id: p.clientId, name: p.clientName });
    }
  }
  return active;
}

function broadcast(msg) {
  const deadPorts = [];
  
  for (const port of ports) {
    try {
      port.postMessage(msg);
    } catch (err) {
      console.error("Failed to post message to a port, marking as dead:", err);
      deadPorts.push(port);
    }
  }

  // Clean up any ports that threw errors during broadcast
  deadPorts.forEach(cleanupPort);
}
