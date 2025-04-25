import { Facebook, Github, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer footer-center custom-bg-secondary text-base-content p-10">
            <aside>
                <img className="w-32" src="/logo.webp" alt="Antiqo Tracker Logo" />
                <p className="font-bold custom-text-primary">
                    Antiqo Tracker
                    <br />
                    Tracking innovations since 1992
                </p>

                <nav className="grid grid-flow-col gap-4 my-2">
                    <Link to='/' className="link link-hover custom-text-secondary hover:custom-text-accent">Home</Link>
                    <Link to='/addartifacts' className="link link-hover custom-text-secondary hover:custom-text-accent">Add Artifacts</Link>
                    <Link to='/allartifacts' className="link link-hover custom-text-secondary hover:custom-text-accent">All Artifacts</Link>
                    <Link to='/profile' className="link link-hover custom-text-secondary hover:custom-text-accent">My Profile</Link>
                </nav>

                <p className="custom-text-secondary">© {new Date().getFullYear()} Antiqo Tracker. All rights reserved.</p>
                <nav className="mt-5">
                    <div className="grid grid-flow-col gap-4">
                        <a className="custom-text-secondary hover:custom-text-accent" href="https://www.facebook.com/">
                            <Facebook size={20} />
                        </a>
                        <a className="custom-text-secondary hover:custom-text-accent" href="https://www.instagram.com/">
                            <Instagram size={20} />
                        </a>
                        <a className="custom-text-secondary hover:custom-text-accent" href="https://github.com/">
                            <Github size={20} />
                        </a>
                    </div>
                </nav>
            </aside>
        </footer>
    );
};

export default Footer;