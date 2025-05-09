/**
 * PROJECT CONFIGURATION
 *
 * Edit the projects array below to add, modify, or remove projects.
 * Each project should follow this format:
 *
 * {
 *   "client-url": "client-name-in-url", // URL-friendly version of client name (lowercase, no spaces)
 *   "project-url": "project-name-in-url", // URL-friendly version of project name (lowercase, no spaces)
 *   "client-name": "Client Display Name", // How the client name appears on the page
 *   "project-name": "Project Display Name", // How the project name appears on the page
 *   "title-color": "white", // Color of the title text (any CSS color)
 *   "background-color": "black", // Background color of the page (any CSS color)
 *   "image-below-padding": 0, // Space between images in pixels
 *   "img1": "/path/to/image1.jpg", // First image path
 *   "img2": "/path/to/image2.jpg", // Second image path
 *   // Add as many images as needed (img3, img4, etc.)
 * }
 */

// ===== EDIT THIS SECTION =====
export const projects = [
  {
    "client-url": "dsatschool",
    "project-url": "branding",
    "client-name": "DSAT School",
    "project-name": "Branding",
    "title-color": "white",
    "background-color": "black",
    "image-below-padding": 0,
    img1: "/og-image.png",
    img2: "/og-image.png",
    img3: "/og-image.png",
    img4: "/og-image.png",
  },
  {
    "client-url": "dsat",
    "project-url": "logo-design",
    "client-name": "DSAT",
    "project-name": "Logo Design",
    "title-color": "black",
    "background-color": "white",
    "image-below-padding": 20,
    img1: "/og-image.png",
    img2: "/og-image.png",
  },
  {
    "client-url": "dsat-x",
    "project-url": "social-design",
    "client-name": "DSAT-X",
    "project-name": "Social Media Design",
    "title-color": "white",
    "background-color": "#1a1a1a",
    "image-below-padding": 10,
    img1: "/og-image.png",
    img2: "/og-image.png",
  },
]
// ===== END EDIT SECTION =====

// Type definition for project configuration
export interface ProjectConfig {
  "client-url": string
  "project-url": string
  "client-name": string
  "project-name": string
  "title-color": string
  "background-color": string
  "image-below-padding": number
  [key: string]: string | number // For dynamic image keys (img1, img2, etc.)
}

// Helper functions - DO NOT EDIT BELOW THIS LINE
export function getAllProjects() {
  return projects as ProjectConfig[]
}

export function getProject(clientUrl: string, projectUrl: string) {
  return projects.find((project) => project["client-url"] === clientUrl && project["project-url"] === projectUrl) as
    | ProjectConfig
    | undefined
}

export function getProjectImages(project: ProjectConfig) {
  const images: string[] = []

  // Extract all image keys (img1, img2, etc.)
  Object.keys(project).forEach((key) => {
    if (key.startsWith("img") && typeof project[key] === "string") {
      images.push(project[key] as string)
    }
  })

  return images
}

export function getClientProjects(clientUrl: string) {
  return projects.filter((project) => project["client-url"] === clientUrl) as ProjectConfig[]
}

export interface ProjectImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface Client {
  id: string
  name: string
  projects: Project[]
}

export interface Project {
  id: string
  name: string
  description: string
  images: ProjectImage[]
  tags: string[]
}

const clientsData: Client[] = [
  {
    id: "dsatschool",
    name: "DSAT School",
    projects: [
      {
        id: "branding",
        name: "Branding",
        description: "DSAT School Branding Project",
        images: [{ src: "/og-image.png", alt: "DSAT School Branding" }],
        tags: ["branding", "design"],
      },
    ],
  },
  {
    id: "dsat",
    name: "DSAT",
    projects: [
      {
        id: "logo-design",
        name: "Logo Design",
        description: "DSAT Logo Design Project",
        images: [{ src: "/og-image.png", alt: "DSAT Logo Design" }],
        tags: ["logo", "design"],
      },
    ],
  },
  {
    id: "dsat-x",
    name: "DSAT-X",
    projects: [
      {
        id: "social-design",
        name: "Social Media Design",
        description: "DSAT-X Social Media Design Project",
        images: [{ src: "/og-image.png", alt: "DSAT-X Social Media Design" }],
        tags: ["social media", "design"],
      },
    ],
  },
]

export function getAllClients(): Client[] {
  return clientsData
}

export function getClient(clientId: string): Client | undefined {
  return clientsData.find((client) => client.id === clientId)
}
