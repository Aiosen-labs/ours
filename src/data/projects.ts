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
    imageUrl: "/menip1.png",
    images: [
      "/menip1.png",
      "/menip2.png",
      "/menip3.png",
      "/menip4.png"
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
      "/larsunlabs.png",
      "/larsunp2.png",
      "/larsenp3.png"
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
    id: "p3",
    slug: "jewellery-ecommerce-platform",
    title: "Jewellery E-commerce Platform",
    tags: ["E-commerce", "Jewellery", "Business Platform"],
    description: "A custom e-commerce platform built for a jewellery retailer, combining product discovery, enquiry management, and a polished storefront experience.",
    imageUrl: "/jewellary.png",
    images: [
      "/jewellary.png",
      "/jewellaryp2.png"
    ],
    liveUrl: "https://jewellersparadise.com",
    problem: "The business needed a premium digital storefront that could showcase their jewellery catalogue, handle customer enquiries, and manage content without requiring constant developer involvement for routine updates.",
    architecture: "We built the public storefront and administration platform from scratch, with custom product catalogue management, enquiry handling, and reusable content tools tailored to the jewellery retail workflow.",
    capabilities: [
      "Custom e-commerce storefront",
      "Product catalogue and jewellery listings",
      "Customer enquiry management",
      "Content and page management",
      "Centralized administration interface"
    ],
    outcome: "The business now operates a premium digital presence with a custom storefront and administration system, giving the team full control over products, content, and customer enquiries."
  },
  {
    id: "p4",
    slug: "nature-fresh-foods-platform",
    title: "Nature Fresh Foods E-commerce Platform",
    tags: ["E-commerce", "Food & Grocery", "CMS"],
    description: "A custom e-commerce and content platform for a fresh food brand, enabling product discovery, location management, and seamless customer experiences across the UAE.",
    imageUrl: "/freshfoods.png",
    images: [
      "/freshfoods.png",
      "/freshp2.png",
      "/freshp3.png"
    ],
    liveUrl: "https://naturefreshfoods.ae",
    problem: "The brand needed a flexible digital platform to support product discovery, e-commerce workflows, and frequently changing content across multiple locations — without depending on developers for routine updates.",
    architecture: "We built the public website and administration platform from scratch, with custom management tools for products, content, business locations, and customer enquiries. A reusable page-template approach was created for different content requirements.",
    capabilities: [
      "Custom e-commerce website with product catalogue",
      "Content and enquiry management",
      "Interactive branch/location map",
      "Country and branch management",
      "Reusable page templates",
      "Centralized administration"
    ],
    outcome: "The result is a flexible commerce and content platform that gives the brand greater control over products, locations, and website content while reducing dependence on repeated development work."
  }
];
