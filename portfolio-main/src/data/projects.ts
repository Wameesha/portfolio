export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  features: string[];
  featured: boolean;
  teamSize: number;
  duration: string;
  status: 'completed' | 'in-progress' | 'planning';
  achievements?: string[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "UniQuest",
    description: "A web application designed to help university students discover part-time jobs, internships and industry opportunities.",
    longDescription: "UniQuest is a comprehensive web application that connects university students with companies and enables profile management, job applications, communication and feedback — all in one platform. The system supports role-based access for students, companies, admins and a verification team, streamlining the process of finding and applying for opportunities.",
    image: "/images/projects/project1-hero.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    category: "Full Stack",
    featured: true,
    liveUrl: "https://github.com/sakunasanka/UniQuest.git",
    githubUrl: "https://github.com/sakunasanka/UniQuest.git",
    teamSize: 4,
    duration: "Jul 2024 - Apr 2025",
    status: "completed",
    features: [
      "Student profile management",
      "Job and internship discovery",
      "Application tracking system",
      "Company-student communication",
      "Role-based access control",
      "Feedback and rating system",
      "Industry opportunity listings",
      "Verification team management"
    ],
    achievements: [
      "Connecting students with industry opportunities",
      "Streamlined application process",
      "Multi-role platform architecture"
    ]
  },
  {
    id: "project-2",
    title: "ArtAura",
    description: "A full-featured digital platform connecting artists, buyers, shop owners, moderators and admins in a unified art ecosystem.",
    longDescription: "ArtAura is a comprehensive digital platform designed to connect various stakeholders in the art community. It enables portfolio showcasing, artwork sales, exhibition management and features a dedicated marketplace for art supplies. The platform fosters collaboration and streamlines commerce within the art community through modern web technologies.",
    image: "/images/projects/artaura.png",
    technologies: ["React", "Java", "Spring Boot", "Tailwind CSS", "MySQL"],
    category: "Full Stack",
    featured: true,
    liveUrl: "https://github.com/msnvaz/ArtAura.git",
    githubUrl: "https://github.com/msnvaz/ArtAura.git",
    teamSize: 8,
    duration: "Jun 2025 - Present",
    status: "in-progress",
    features: [
      "Artist portfolio showcasing",
      "Artwork sales platform",
      "Exhibition management",
      "Art supplies marketplace",
      "Shop module with product listings",
      "Order management system",
      "Sales analytics dashboard",
      "Multi-role user management"
    ],
    achievements: [
      "Unified art ecosystem platform",
      "Modern React frontend with Spring Boot backend",
      "Comprehensive shop module development"
    ]
  },
  {
    id: "project-3",
    title: "Calliera",
    description: "A full-stack social app featuring real-time chat, video calling, friend management and theme customization.",
    longDescription: "Calliera is a sophisticated social application built to deliver secure, interactive and personalized user experiences with a scalable backend architecture. The app features real-time communication capabilities, comprehensive user management and modern UI/UX design patterns for seamless social interactions.",
    image: "/images/projects/project2-hero.jpg",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "TanStack Query"],
    category: "Full Stack",
    featured: true,
    liveUrl: "https://github.com/Wameesha/MERN-project.git",
    githubUrl: "https://github.com/Wameesha/MERN-project.git",
    teamSize: 1,
    duration: "Jun 2025 - Jul 2025",
    status: "completed",
    features: [
      "Real-time chat messaging",
      "Video calling functionality",
      "Friend management system",
      "User onboarding flow",
      "Theme customization",
      "Authentication system",
      "Dynamic UI components",
      "Scalable backend architecture"
    ],
    achievements: [
      "Complete full-stack social application",
      "Real-time communication implementation",
      "Modern tech stack with MERN architecture"
    ]
  },
  {
    id: "project-4",
    title: "NYC Taxi Data Engineering Pipeline",
    description: "End-to-end automated pipeline processing 3M+ NYC Yellow Taxi trips with modern data stack tooling.",
    longDescription: "This project builds a full ELT pipeline for NYC taxi data, ingesting raw parquet files into a cloud warehouse, validating data quality, transforming with dbt into analytics-ready marts and orchestrating the flow with Airflow. The final dashboard highlights demand peaks, trip segments and revenue patterns.",
    image: "/images/projects/dashboard_final.png",
    technologies: ["Python", "Pandas", "Supabase", "PostgreSQL", "dbt", "Apache Airflow", "Looker Studio"],
    category: "Data Engineering",
    featured: false,
    liveUrl: "",
    githubUrl: "https://github.com/Wameesha/taxi-data-pipeline.git",
    teamSize: 1,
    duration: "2026",
    status: "completed",
    features: [
      "Automated parquet ingestion into Supabase",
      "Validation checks for data integrity",
      "dbt mart models for analytics",
      "Airflow DAG orchestration",
      "Looker Studio dashboard for insights"
    ],
    achievements: [
      "Processed 3M+ taxi trip records",
      "Identified peak demand at 18:00",
      "Segmented trips by distance and revenue"
    ]
  },
  {
    id: "project-5",
    title: "Real-Time E-Commerce Order Stream Monitor",
    description: "Production-grade streaming pipeline into Snowflake with under 90-second end-to-end latency.",
    longDescription: "A real-time pipeline that streams live e-commerce orders into Snowflake using a Python producer. Snowflake Streams capture new inserts, Tasks transform raw JSON into typed staging tables and Dynamic Tables power live KPI dashboards in Snowsight with minute-level refresh.",
    image: "/images/projects/dashboard.png",
    technologies: ["Python", "Snowflake", "Snowflake Streams", "Snowflake Tasks", "Dynamic Tables"],
    category: "Data Engineering",
    featured: false,
    liveUrl: "",
    githubUrl: "https://github.com/Wameesha/realtime-ecommerce-pipeline.git",
    teamSize: 1,
    duration: "2026",
    status: "completed",
    features: [
      "Python order generator and stream producer",
      "CDC with Snowflake Streams",
      "Scheduled JSON extraction with Tasks",
      "Auto-refreshing Dynamic Tables",
      "Live KPI dashboard in Snowsight"
    ],
    achievements: [
      "Achieved sub-90-second latency",
      "Processed 60 orders per minute",
      "Live KPI tiles with 30-second refresh"
    ]
  },
  {
    id: "project-6",
    title: "Real-Time Crypto Market Intelligence Pipeline",
    description: "Real-time pipeline classifying crypto market signals with rolling analytics and live dashboards.",
    longDescription: "Built a real-time crypto market intelligence pipeline using the CoinGecko API, Redpanda (Kafka-compatible) and Python to ingest and process live market data for 10 cryptocurrencies every 30 seconds. Kafka consumers handle market signal classification (BULLISH/BEARISH/NEUTRAL), spike detection and rolling-window aggregations, storing processed events in Snowflake Bronze tables. Implemented a Medallion Architecture (Bronze to Silver to Gold) with dbt incremental models, MD5-based deduplication and schema validation tests. Delivered a live Looker Studio dashboard to visualize market signals, price trends and high-volume assets in real time.",
    image: "/images/projects/crypto.png",
    technologies: ["Python", "Apache Kafka", "Redpanda", "Snowflake", "dbt", "Looker Studio", "CoinGecko API", "WSL"],
    category: "Data Engineering",
    featured: false,
    liveUrl: "",
    githubUrl: "https://github.com/Wameesha/crypto-pipeline.git",
    teamSize: 1,
    duration: "May 2026",
    status: "completed",
    features: [
      "CoinGecko ingestion for 10 assets every 30 seconds",
      "Kafka consumers for signal classification",
      "Spike detection and rolling-window aggregations",
      "Snowflake Bronze event storage",
      "dbt Medallion models with MD5 deduplication",
      "Schema validation tests and data quality checks",
      "Real-time Looker Studio dashboard"
    ],
    achievements: [
      "Live market signal classification pipeline",
      "Medallion architecture implemented with dbt",
      "Realtime dashboards for price and volume trends"
    ]
  }
];

export const categories = [
  "All",
  "Full Stack",
  "Data Engineering",
  "Web App",
  "Frontend",
  "Backend"
];
