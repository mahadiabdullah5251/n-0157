
import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useIsMobile } from '@/hooks/use-mobile';

type Node = {
  id: string;
  name: string;
  val: number;
  color: string;
  group?: string;
};

type Link = {
  source: string;
  target: string;
  value: number;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

type NetworkGraphProps = {
  centerNodeId?: string;
  segment?: string;
};

const generateRandomNodes = (count: number, centerNodeId: string, segment?: string): Node[] => {
  const nodes: Node[] = [
    {
      id: centerNodeId,
      name: 'You',
      val: 5,
      color: '#FFA500', // Orange for center node
      group: 'center'
    }
  ];

  const segmentColors: Record<string, string> = {
    'Building Services Engineers': '#4169E1', // Royal blue
    'default': '#A9A9A9' // Grey for other nodes
  };

  // Generate random positions in a circle
  for (let i = 1; i <= count; i++) {
    const isSegmentNode = Math.random() > 0.7; // 30% chance to be a segment node
    const group = isSegmentNode && segment ? segment : 'default';
    const nodeSize = Math.random() > 0.8 ? 3 : Math.random() > 0.5 ? 2 : 1;
    
    nodes.push({
      id: `node-${i}`,
      name: `Connection ${i}`,
      val: nodeSize,
      color: isSegmentNode && segment ? segmentColors[segment] : segmentColors['default'],
      group: group
    });
  }

  return nodes;
};

const generateRandomLinks = (nodes: Node[], centerNodeId: string): Link[] => {
  const links: Link[] = [];
  
  // Connect all nodes to the center node
  nodes.forEach(node => {
    if (node.id !== centerNodeId) {
      links.push({
        source: centerNodeId,
        target: node.id,
        value: 1
      });
    }
  });
  
  // Add some random connections between other nodes (about 10% of possible connections)
  const nonCenterNodes = nodes.filter(node => node.id !== centerNodeId);
  const totalPossibleConnections = nonCenterNodes.length * (nonCenterNodes.length - 1) / 2;
  const numAdditionalConnections = Math.floor(totalPossibleConnections * 0.05); // 5% of possible connections
  
  for (let i = 0; i < numAdditionalConnections; i++) {
    const sourceIndex = Math.floor(Math.random() * nonCenterNodes.length);
    let targetIndex = Math.floor(Math.random() * nonCenterNodes.length);
    
    // Ensure we don't connect a node to itself
    while (targetIndex === sourceIndex) {
      targetIndex = Math.floor(Math.random() * nonCenterNodes.length);
    }
    
    links.push({
      source: nonCenterNodes[sourceIndex].id,
      target: nonCenterNodes[targetIndex].id,
      value: 1
    });
  }
  
  return links;
};

const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  centerNodeId = 'center-node',
  segment
}) => {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  
  useEffect(() => {
    // Generate random data
    const nodes = generateRandomNodes(100, centerNodeId, segment);
    const links = generateRandomLinks(nodes, centerNodeId);
    
    setGraphData({ nodes, links });
  }, [centerNodeId, segment]);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    // Initial size
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  useEffect(() => {
    if (graphRef.current && centerNodeId) {
      // Find center node
      const centerNode = graphData.nodes.find(node => node.id === centerNodeId);
      if (centerNode) {
        // Center the view on the central node
        graphRef.current.centerAt(0, 0, 1000);
        graphRef.current.zoom(2, 2000);
      }
    }
  }, [graphData, centerNodeId]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-linkedin-black"
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeRelSize={5}
          nodeVal={node => (node as Node).val}
          nodeColor={node => (node as Node).color}
          linkWidth={0.3}
          linkColor={() => "rgba(255,255,255,0.1)"}
          cooldownTime={2000}
          enableNodeDrag={false}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const { x, y, color, val, id } = node as Node & { x: number, y: number };
            const size = val * 4;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            
            // Add a subtle glow effect to nodes
            if (id === centerNodeId) {
              // Center node with stronger glow
              ctx.shadowColor = color;
              ctx.shadowBlur = 15;
            } else {
              ctx.shadowColor = color;
              ctx.shadowBlur = 5;
            }
            
            ctx.fill();
            
            // Reset shadow for performance
            ctx.shadowBlur = 0;
          }}
        />
      )}
    </div>
  );
};

export default NetworkGraph;
