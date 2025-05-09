import { getProject, getProjectImages, getAllProjects } from "@/config/projects"
import { notFound } from "next/navigation"
import ImageLightbox from "@/components/image-lightbox"

export function generateStaticParams() {
  const projects = getAllProjects()

  return projects.map((project) => ({
    client: project["client-url"],
    project: project["project-url"],
  }))
}

export default function ProjectPage({ params }: { params: { client: string; project: string } }) {
  const projectConfig = getProject(params.client, params.project)

  if (!projectConfig) {
    notFound()
  }

  const images = getProjectImages(projectConfig)
  const titleColor = projectConfig["title-color"]
  const backgroundColor = projectConfig["background-color"]
  const imagePadding = projectConfig["image-below-padding"] as number

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor }}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: titleColor }}>
            {projectConfig["client-name"]} : {projectConfig["project-name"]}
          </h1>
        </div>

        <ImageLightbox images={images} titleColor={titleColor} imagePadding={imagePadding} />
      </div>
    </div>
  )
}
