export interface Project {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  imageUrl: string;
  problem?: string;
  architecture?: string;
  capabilities?: string[];
  stack?: string[];
}

export const projects: Project[] = [
  {
    id: "p1",
    slug: "quantum-ledger-alpha",
    title: "Quantum Ledger Alpha",
    tags: ["Blockchain", "Rust"],
    description: "A high-throughput distributed ledger system exploring sub-second finality in financial settlements. We engineered a consensus protocol designed to evaluate high-volume transaction processing and node synchronization.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC43bF5mNZ5O13H_oXS5JwmzFHJQMp_E03VduB3mlp_M-LuXrtfDVnpBcLZaGgreMQ_n97omJbtzloc-zQDLiCH_B0dT4UXaOqKEAfL1eO1amDS2bXaWTLD6UPS82gs5Rp1oKwqH8Uz5FfTDlCnFjPHDUxT8KdgberU3MqvGqqPWzAflLiUSVz9xU8-Tw-GeG6k9FD5344aKxC02ooc60l8xHX-j7PBOIGnURrfhK_P5IF9Ahg6Myzd",
    problem: "Traditional financial settlement networks suffer from high latency, expensive consensus mechanisms, and scalability ceilings that prevent real-time cross-border settlements.",
    architecture: "We built a bespoke directed acyclic graph (DAG) consensus model entirely in Rust. By separating transaction validation from ordering, the system allows asynchronous block generation. State is maintained across a sharded memory grid to eliminate disk I/O bottlenecks.",
    capabilities: [
      "Sub-second transaction finality",
      "High-throughput transaction processing",
      "Rolling upgrade architecture",
      "Byzantine Fault Tolerant (BFT) consensus"
    ],
    stack: ["Rust", "Tokio", "gRPC", "RocksDB"]
  },
  {
    id: "p2",
    slug: "nexus-cloud-mesh",
    title: "Nexus Cloud Mesh",
    tags: ["Cloud Native", "Kubernetes"],
    description: "Global service mesh architecture exploring seamless connectivity and zero-trust security across multi-cloud environments. The engineering focus was on evaluating latency reduction techniques while maintaining strict compliance frameworks.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz3UZIih-xYWzEJRh1qGr7F7pIB37AXsd3e4k8lyIe-fVaoeHoZc8lYmxURA4g8dDgZjSFHoQExVSMIlkAP9UJqTrSm4spqQ67MUgCZNmaBAg9JeAuvnXB2IMxci4I3UeDVzF29OdFYLs7QjrU4ESPVYXQ9jBC51PlKv-FrOvSM0f4oU1Rk-K41APZ_zdrCcxZd6HXcRqXygw5FAgRqCZ1f-EG4d7fCcJyrJIOrgtLiAFKsrAfE5FbDh5s2MyZrtwg1Q",
    problem: "Enterprise microservices were scattered across AWS, Azure, and on-premise data centers, leading to security blind spots, complex routing, and massive latency overheads between regions.",
    architecture: "Engineered a unified control plane using Envoy proxy sidecars. The architecture dynamically routes traffic via the lowest-latency backbone paths while enforcing mTLS everywhere. Configuration is entirely declarative and managed via GitOps.",
    capabilities: [
      "Zero-trust mTLS security by default",
      "Dynamic latency-aware routing",
      "Multi-cluster, multi-cloud federation",
      "Automated canary deployments"
    ],
    stack: ["Kubernetes", "Envoy", "Istio", "Go", "Prometheus"]
  },
  {
    id: "p3",
    slug: "hyperion-analytics",
    title: "Hyperion Analytics",
    tags: ["Data Science", "Python"],
    description: "Predictive analytics engine exploring the processing of large-scale market data in real-time. This system evaluates machine learning pipelines for predictive signal generation and temporal anomaly detection.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQmX20O8Z9r4X6P531t5LqG3r8R9z8wY9f8t1B4k2N5w7v6x9z8wY9f8t1B4k2N5w7v6x9z8wY9f8t1B4k2N5w7v6x9z8wY9f8t1B4k2N5w7v6x9z8wY9f8t1B4k2",
    problem: "Ingesting, normalizing, and running inference on tick-level market data across global exchanges previously took hours, rendering the signals useless for intraday strategies.",
    architecture: "A distributed streaming architecture built on Apache Kafka and Apache Flink. Complex event processing evaluates millions of events per second against deployed ML models stored in a low-latency feature store.",
    capabilities: [
      "Real-time event processing architecture",
      "Automated model retraining pipelines",
      "Sub-millisecond inference latency",
      "Temporal anomaly detection"
    ],
    stack: ["Python", "Apache Flink", "Kafka", "TensorFlow", "Redis"]
  },
  {
    id: "p4",
    slug: "aegis-firewall",
    title: "Aegis Firewall",
    tags: ["Security", "C++"],
    description: "An experimental application firewall capable of deep packet inspection. The project demonstrates autonomous packet filtering techniques and kernel-level routing for network resilience.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuE9q7R5z3W1u8I4o2P6y5T3e1R8u9I4o2P6y5T3e1R8u9I4o2P6y5T3e1R8u9I4o2P6y5T3e1R8u9I4o2P6y5T3e1R8u9I4o2P6y5T3e1R8u9I4o2P6y5T3e1R8u9I4o2P6",
    problem: "Legacy firewalls rely on static rule sets and introduce unacceptable network latency during deep packet inspection.",
    architecture: "Built from scratch using eBPF/XDP to bypass the standard Linux networking stack. Packets are analyzed directly at the network interface card (NIC) level, allowing autonomous threat mitigation without CPU overhead.",
    capabilities: [
      "Wire-speed deep packet inspection",
      "eBPF/XDP kernel-level routing",
      "Autonomous threat mitigation models",
      "Zero-day signature detection via ML"
    ],
    stack: ["C++", "eBPF", "Linux Kernel", "DPDK"]
  },
  {
    id: "p5",
    slug: "omnichannel-hub",
    title: "OmniChannel Hub",
    tags: ["E-Commerce", "React"],
    description: "Unified commerce platform prototype integrating inventory, logistics, and storefronts. The architecture demonstrates how to handle high-concurrency traffic spikes using event-sourced data patterns.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuF8s6Q4x2V0t7H3m1O5w4S2d0Q8s6Q4x2V0t7H3m1O5w4S2d0Q8s6Q4x2V0t7H3m1O5w4S2d0Q8s6Q4x2V0t7H3m1O5w4S2d0Q8s6Q4x2V0t7H3m1O5w4S2d0Q8",
    problem: "Siloed legacy systems caused inventory mismatches, slow fulfillment, and website crashes during peak retail events.",
    architecture: "A headless commerce approach decoupling the React frontend from the GraphQL orchestration layer. Inventory state is managed via an event-sourced architecture to guarantee consistency across thousands of retail nodes.",
    capabilities: [
      "Event-sourced inventory management",
      "Headless storefront architecture",
      "GraphQL API orchestration",
      "Auto-scaling microservices"
    ],
    stack: ["React", "Node.js", "GraphQL", "PostgreSQL", "Kafka"]
  }
];
