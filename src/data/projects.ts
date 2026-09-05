export interface Project {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  imageUrl: string;
  images?: string[];
  liveUrl?: string;
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
    imageUrl: "/meni.png",
    images: [
      "/meni.png"
    ],
    liveUrl: "https://meniwellness.com",
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
    imageUrl: "/larsunlabs.png",
    images: [
      "/larsunlabs.png"
    ],
    liveUrl: "https://larsunlabs.com",
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
    id: "p5",
    slug: "ecommerce-content-platform",
    title: "E-commerce & Content Management Platform",
    tags: ["E-commerce", "CMS", "Business Platform"],
    description: "A custom commerce and content platform combining e-commerce, enquiry management, location administration, and reusable content workflows.",
    imageUrl: "/jewellary.png",
    images: [
      "/jewellary.png",
      "/freshfoods.png"
    ],
    liveUrl: "https://jewellersparadise.com",
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
