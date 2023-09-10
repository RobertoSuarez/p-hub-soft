"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plots = void 0;
var nodeplotlib_1 = require("nodeplotlib");
var Plots = /** @class */ (function () {
    function Plots() {
    }
    Plots.prototype.showPlot = function (_a,_b) {
        var solution = _b, servers = _a.servidores;
        var plots = [];
        var traceClients = [];
        var colors = [
            "black",
            "purple",
            "green",
            "orange",
            "blue",
            "pink",
            "yellow",
            "brown",
            "gray",
            "red",
        ];
        servers.forEach(function (server, i) {
            var color = colors[i];
            let hubs=server.hub;
            plots.push({
                x: [hubs.point.x],
                y: [hubs.point.y],
                type: "scatter",
                name: "Server ".concat(server.hub.nodeNumber),
                mode: "markers",
                marker: { color: color, size: 10 },
            });
            server.clients.forEach(function (client) {
              const hubc = client.hub;
               hubs = server.hub;
                traceClients.push({
                    x: [hubc.point.x, hubs.point.x],
                    y: [hubc.point.y, hubs.point.y],
                    type: "scatter",
                    name: "Client ".concat(hubc.nodeNumber, " for server ").concat(hubs.nodeNumber),
                    line: { color: color, width: 1 },
                    showlegend: false,
                });
            });
        });
        (0, nodeplotlib_1.plot)(__spreadArray(__spreadArray([], plots, true), traceClients, true), {
            width: 900,
            height: 600,
            title: "P-HUB | LA MEJOR DISTANCIA ES: ".concat(solution.toFixed(2)),
        });
    };
    return Plots;
}());
exports.Plots = Plots;
