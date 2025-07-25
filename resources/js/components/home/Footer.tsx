import { LogoIcon } from "./Icons";

export const Footer = () => {
    return (
        <footer id="footer" className="container mx-auto px-4">
            <hr className="mx-auto w-11/12" />

            <section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4 xl:grid-cols-6">
                <div className="col-span-full xl:col-span-2">
                    <a rel="noreferrer noopener" href="/" className="flex text-xl font-bold">
                        <LogoIcon />
                        Lamore Cake
                    </a>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Follow US</h3>
                    <div>
                        <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
                            Twitter
                        </a>
                    </div>

                    <div>
                        <a rel="noreferrer noopener" href="https://instagram.com/lamorecake" className="opacity-60 hover:opacity-100">
                            Instagram
                        </a>
                    </div>

                    <div>
                        <a rel="noreferrer noopener" href="https://facebook.com/lamorecakeid" className="opacity-60 hover:opacity-100">
                            Facebook
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">About</h3>
                    <div>
                        <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
                            Gallery
                        </a>
                    </div>

                    <div>
                        <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
                            Products
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Platform</h3>
                    <div>
                        <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
                            Youtube
                        </a>
                    </div>

                    <div>
                        <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
                            Discord
                        </a>
                    </div>

                    <div>
                        <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
                            Twitch
                        </a>
                    </div>
                </div>
            </section>

            <section className="container pb-14 text-center">
                <h3>
                    &copy; 2025{" "}
                    <a
                        rel="noreferrer noopener"
                        target="_blank"
                        href="https://www.linkedin.com/in/leopoldo-miranda/"
                        className="border-primary text-primary transition-all hover:border-b-2"
                    >
                        Lamore Cake
                    </a>
                </h3>
            </section>
        </footer>
    );
};
