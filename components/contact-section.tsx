export function ContactSection() {
  return (
    <section
      id="contact"
      className="h-full w-full overflow-hidden py-6 md:py-10 bg-black text-white flex flex-col justify-center"
    >
      <div className="container mx-auto px-5 md:px-8 max-w-5xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Get In Touch</h2>

        <div className="grid grid-cols-1 gap-6 md:gap-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Contact Information</h3>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                Feel free to reach out to me for collaboration, job opportunities, or just to say hello!
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-gray-800 p-2 md:p-3 rounded-full mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-gray-200">Email</h4>
                  <a
                    href="mailto:salmanshahriar.official@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                    aria-label="Email Salman Shahriar"
                  >
                    salmanshahriar.official@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-gray-800 p-2 md:p-3 rounded-full mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-gray-200">Location</h4>
                  <p className="text-gray-400 text-sm md:text-base">
                    Chattogram, Bangladesh (Remotely available on Meet/Discord){" "}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-gray-800 p-2 md:p-3 rounded-full mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-gray-200">Working Hours</h4>
                  <p className="text-gray-400 text-sm md:text-base">Does a programmer sleep? :)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 md:pt-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Connect With Me</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                <a
                  href="https://linkedin.com/in/salman-shahriar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                  aria-label="LinkedIn Profile"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-blue-600 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-blue-400 transition-colors">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="https://github.com/salmanshahriar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                  aria-label="GitHub Profile"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-gray-700 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
                    GitHub
                  </span>
                </a>
                <a
                  href="https://instagram.com/thatlazysalman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                  aria-label="Instagram Profile"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-pink-600 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-pink-300 transition-colors">
                    Instagram
                  </span>
                </a>
                <a
                  href="https://facebook.com/salmanshahriar.67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                  aria-label="Facebook Profile"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-blue-700 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-blue-300 transition-colors">
                    Facebook
                  </span>
                </a>
                <a
                  href="https://discord.com/users/758028044861571140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group"
                  aria-label="Discord Profile"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full mr-2 group-hover:bg-indigo-600 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                    </svg>
                  </span>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-indigo-300 transition-colors">
                    Discord
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
