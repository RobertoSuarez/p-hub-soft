var nodeplotlib = require("nodeplotlib");

class Plots {
    showPlot({ servidores }, solution) {
        const plots = [];
        const getClients = [];
        const colors = [
            "black",
            "purple",
            "green", 
            "brown",
            "blue", 
            "red", 
            "orange",
            "gray",
            "pink", 
            "yellow",
        ];

        servidores.forEach((server, i) => {
            const color = colors[i];
            let hubs = server.hub;

            if (hubs && hubs.point) {
                plots.push({
                    x: [hubs.point.x],
                    y: [hubs.point.y],
                    type: "scatter",
                    name: "Server:".concat(server.hub.nodeNumber),
                    mode: "markers",
                    marker: { color: color, size: 15 },
                });
            }

            server.clients.forEach((client) => {
                const hubc = client.hub;
                 hubs = server.hub;

                if (hubc && hubc.point && hubs && hubs.point) {
                    getClients.push({
                        x: [hubc.point.x, hubs.point.x],
                        y: [hubc.point.y, hubs.point.y],
                        type: "scatter",
                        name: "Client ".concat(hubc.nodeNumber, " for server ").concat(hubs.nodeNumber),
                        line: { color: color, width: 1 },
                        showlegend: false,
                    });
                }
            });
        });

        const filteredPlots = plots.filter((plot) => plot.x.length > 0 && plot.y.length > 0);
        const filteredClients = getClients.filter((trace) => trace.x.length > 0 && trace.y.length > 0);

        nodeplotlib.plot([...filteredPlots, ...filteredClients], {
            width: 1600,
            height: 900,
            title: "P-HUB | LA MEJOR DISTANCIA ES: ".concat(solution.toFixed(2)),
        });
    }
}

exports.Plots = Plots;