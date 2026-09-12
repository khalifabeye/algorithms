function visualizeBST(root) {
    const container = document.getElementById("tree");

    container.innerHTML = "";

    if (!root) {
        container.textContent = "Empty tree";
        return;
    }

    const nodes = [];
    const edges = [];
    const positions = new Map();

    // Find every node and every connection
    function collect(node, depth = 0) {
        if (!node) return;

        collect(node.leftChild, depth + 1);

        positions.set(node, {
            depth
        });

        nodes.push(node);

        if (node.leftChild) {
            edges.push([node, node.leftChild]);
        }

        if (node.rightChild) {
            edges.push([node, node.rightChild]);
        }

        collect(node.rightChild, depth + 1);
    }

    collect(root);

    // Assign horizontal positions using in-order traversal
    let x = 0;

    function setPositions(node, depth = 0) {
        if (!node) return;

        setPositions(node.leftChild, depth + 1);

        positions.set(node, {
            x: x++ * 100 + 50,
            y: depth * 100 + 50
        });

        setPositions(node.rightChild, depth + 1);
    }

    setPositions(root);

    const width = Math.max(nodes.length * 100 + 100, 800);
    const height =
        Math.max(...nodes.map(node => positions.get(node).y)) + 100;

    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    // Draw edges
    for (const [parent, child] of edges) {
        const parentPosition = positions.get(parent);
        const childPosition = positions.get(child);

        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        line.setAttribute("x1", parentPosition.x);
        line.setAttribute("y1", parentPosition.y);

        line.setAttribute("x2", childPosition.x);
        line.setAttribute("y2", childPosition.y);

        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");

        svg.appendChild(line);
    }

    // Draw nodes
    for (const node of nodes) {
        const { x, y } = positions.get(node);

        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 25);

        circle.setAttribute("fill", "white");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "2");

        svg.appendChild(circle);

        const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

        text.setAttribute("x", x);
        text.setAttribute("y", y);

        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");

        text.textContent = node.value;

        svg.appendChild(text);
    }

    container.appendChild(svg);
}