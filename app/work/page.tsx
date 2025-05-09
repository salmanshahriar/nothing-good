import Link from "next/link"
import Image from "next/image"
import { getAllProjects, getProjectImages } from "@/config/projects"

export default function WorkPage() {
  const allProjects = getAllProjects()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((project, index) => {
          const images = getProjectImages(project)
          const firstImage = images[0] || "/placeholder.svg"

          return (
            <Link href={`/work/${project["client-url"]}/${project["project-url"]}`} key={index} className="group">
              <div className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={firstImage || "/placeholder.svg"}
                    alt={`${project["client-name"]} ${project["project-name"]} preview`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">
                    {project["client-name"]} : {project["project-name"]}
                  </h2>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
