import "./globals.css";

export default function NotFoundPage() {
    return <>
    <body style={{backgroundColor: "#00A2ED"}}>
      <div className="container mx-auto text-white pt-12">
          <h1 className="text-8xl">:(</h1>
          <h1 className="pt-4">Error 404: Page Not Found</h1>
          <p>This page was not found! Please check your location and try again!</p>
          <a href="/" className="flex justify-center rounded-md bg-indigo-600 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go Home</a>
      </div>
    </body>
    </>;
}