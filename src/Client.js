class Client {
  constructor(hub) {
    this.hub = hub;
    this.distance = 0;
  }

  toJSON() {
    return {
      hub: this.hub.toJSON(),
      distance: this.distance,
    };
  }

  // Calculamos la distancia euclediana
  calculateDistance(server) {
    this.distance = Math.sqrt(
      Math.pow(this.hub.point.y - server.hub.point.y, 2) +
        Math.pow(this.hub.point.x - server.hub.point.x, 2)
    );
  }
}

module.exports = { Client };
