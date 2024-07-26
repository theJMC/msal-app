export default function ErrorPage() {
    return <>
        <body  style={{backgroundColor: "#00A2ED"}}>
            <div className="mx-8 mt-8 text-white">
                <h1 className="text-8xl mt-8">:(</h1>
                <h1 className="mt-8">This website ran into an error</h1>
                <p className="mt-4">Sorry, something went wrong! Please contact an Administrator</p>
                <a href="/" className="pt-4">Go Home</a>
            </div>
        </body>
    </>
}