export interface Project {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  imageUrl: string;
  images?: string[];
  problem?: string;
  architecture?: string;
  capabilities?: string[];
  stack?: string[];
  outcome?: string;
}

export const projects: Project[] = [
  {
    id: "p1",
    slug: "commerce-business-platform",
    title: "Commerce & Business Management Platform",
    tags: ["E-commerce", "Business Platform", "Analytics"],
    description: "A customized commerce platform connecting the customer experience with business operations, marketing, analytics, and financial intelligence through a centralized management system.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    ],
    problem: "A growing commerce business needed more than a standard storefront. Day-to-day operations, marketing activity, customer behavior, financial performance, inventory, and order activity needed to be understood through one connected system. The platform also needed to support detailed business analysis rather than relying only on headline revenue figures.",
    architecture: "We built a customized e-commerce experience together with a comprehensive administration platform designed around the business's operational workflow. The system was structured to give the business team a central place to manage commerce operations and understand performance across multiple areas of the business.",
    capabilities: [
      "Custom e-commerce storefront",
      "Product, category, and inventory management",
      "Order and fulfilment operations",
      "Marketing campaigns and promotional workflows",
      "Subscription management",
      "Sales and product analytics",
      "Financial and profitability analytics",
      "Content, blog, review, and SEO management"
    ],
    outcome: "The result is a unified business platform where the storefront and the operational side of the business work together, giving the team a broader view of commerce performance and the information needed to make informed decisions."
  },
  {
    id: "p2",
    slug: "pharmaceutical-digital-platform",
    title: "Pharmaceutical Digital & Content Platform",
    tags: ["Business Website", "Product Management", "Admin Platform"],
    description: "A custom company and product platform with centralized administration for managing a broad product portfolio and website content.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
    ],
    problem: "The business needed a professional digital presence while also requiring a practical way for its team to manage a broad product portfolio and website content without depending on developers for routine updates.",
    architecture: "We built the website from scratch together with an administration platform that centralizes the management of the site's product and content information. The system was designed around the business's specific content and product-management needs rather than a generic website template.",
    capabilities: [
      "Custom company website",
      "Product catalogue and product listings",
      "Product and category content management",
      "Website page/content management",
      "Events and related content management",
      "Centralized administration interface"
    ],
    outcome: "The business receives a custom digital platform with a public website and a centralized administration system for managing its product and website information."
  },
  {
    id: "p3",
    slug: "financial-operations-platform",
    title: "Financial Operations & Profitability Platform",
    tags: ["Business Software", "Financial Operations", "Analytics"],
    description: "A custom web and mobile platform that centralizes client activity, financial tracking, business analytics, history, and reporting for a financial-services operation.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    ],
    problem: "The business owner had limited time to manually review client-level information and monthly financial activity. The goal was to make important business information accessible through a centralized system rather than requiring constant manual review and calculation.",
    architecture: "We built the platform from scratch around the company's specific financial and operational workflow. The system collects operational data entered through the management interface and turns it into consolidated dashboards, client views, historical information, and reports for the business owner.",
    capabilities: [
      "Client management and financial tracking",
      "Monthly settlement visibility",
      "Business performance dashboard",
      "Consolidated analytics and historical records",
      "Custom business-specific calculations",
      "PDF and Excel report generation"
    ],
    outcome: "Instead of relying heavily on manual review, the owner can open the platform and quickly understand how the business is performing, review client activity, and access relevant financial reports."
  },
  {
    id: "p4",
    slug: "real-time-mobile-challenge",
    title: "Real-Time Mobile Challenge Platform",
    tags: ["Mobile Platform", "Real-Time Systems", "Administration"],
    description: "A multi-role mobile platform engineered around real-time activity, location-aware functionality, managed challenges, and demanding mobile reliability requirements.",
    imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
    ],
    problem: "The project involved significant engineering challenges around reliable live GPS handling, mobile background behavior, battery efficiency, and real-time activity reliability while preventing abuse and manipulation.",
    architecture: "The platform features separate administrative, merchant, and user layers. The administration layer manages the platform, merchants create challenge-based experiences, and users participate in active sessions. This required careful coordination between mobile behavior and server-side processing.",
    capabilities: [
      "Multi-role mobile platform (Admin, Merchant, User)",
      "Challenge and reward configuration",
      "Real-time location-aware functionality",
      "Mobile activity handling",
      "Client-side and server-side validation",
      "Subscription-related platform management"
    ],
    outcome: "We delivered a production mobile platform with multiple roles and real-time functionality while addressing demanding mobile reliability, battery, and abuse-prevention requirements."
  },
  {
    id: "p5",
    slug: "ecommerce-content-platform",
    title: "E-commerce & Content Management Platform",
    tags: ["E-commerce", "CMS", "Business Platform"],
    description: "A custom commerce and content platform combining e-commerce, enquiry management, location administration, and reusable content workflows.",
    imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2064&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=2095&auto=format&fit=crop"
    ],
    problem: "The business needed a flexible digital platform that could support product discovery, e-commerce workflows, customer enquiries, and frequently changing business content without requiring developers to manually rebuild pages and information.",
    architecture: "We built the public website and administration platform from scratch, with custom management tools for commerce, enquiries, content, and business locations. A reusable page-template approach was also created for different content requirements.",
    capabilities: [
      "Custom e-commerce website with product catalogue",
      "Content and enquiry management",
      "Interactive branch/location map",
      "Country and branch management",
      "Reusable page templates",
      "Centralized administration"
    ],
    outcome: "The result is a flexible commerce and content platform that gives the business greater control over products, enquiries, locations, and website content while reducing dependence on repeated development work."
  }
];
