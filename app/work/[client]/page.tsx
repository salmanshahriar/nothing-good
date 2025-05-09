import Link from "next/link"
import Image from "next/image"
import { getClient, getAllClients } from "@/config/projects"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const clients = getAllClients()
  return clients.map((client) => ({
    client: client.id,
  }))
}

export default function ClientPage({ params }: { params: { client: string } }) {
  const client = getClient(params.client)

  if (!client) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/work" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to all projects
        </Link>
        <h1 className="text-3xl font-bold mt-2">{client.name} Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {client.projects.map((project) => (
          <Link href={`/work/${client.id}/${project.id}`} key={project.id} className="group">
            <div className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-64 w-full overflow-hidden">
                {project.images.length > 0 && (
                  <Image
                    src={project.images[0].src || "/placeholder.svg"}
                    alt={project.images[0].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-block text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
