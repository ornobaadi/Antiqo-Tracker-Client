import { User } from "lucide-react";

const BlogCard = ({ category, title, excerpt, author, readTime, image, sourceUrl }) => (
    <a 
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
    >
        <div className="shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="aspect-[16/9] relative overflow-hidden bg-gray-800">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gray-900/80 rounded-full text-xs text-gray-300">
                        {category}
                    </span>
                </div>
            </div>
            <div className="p-8">
                <h3 className="text-xl font-medium mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <p className="text-sm mb-8 line-clamp-2 text-gray-500">
                    {excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-2"><User />{author}</span>
                    <span>{readTime} min read</span>
                </div>
            </div>
        </div>
    </a>
);

const Blog = () => {
    const blogs = [
        {
            category: "Christianity",
            title: "Plague made Jesus' birth memorable.",
            excerpt: "When a terrifying Ebola-like pandemic struck the Roman empire, Christianity offered solutions that the old ways didn’t",
            author: "Jonathan Kennedy",
            readTime: 12,
            image: "https://i.guim.co.uk/img/media/7b4acb0f0cae251a429e1bc2c2689480ee58c684/0_1419_4724_2834/master/4724.jpg?width=1020&dpr=1&s=none&crop=none",
            sourceUrl: "https://www.theguardian.com/commentisfree/2024/dec/25/birth-jesus-plague-roman-empire-christianity"
        },
        {
            category: "African Art",
            title: "The First Decade",
            excerpt: "Ten years is a long time in the art market and much has happened since the first instalment in London in 2013, not least the launch of the fair’s successful annual satellite events in New York (since 2015), ",
            author: "Dr Thomas Flynn",
            readTime: 15,
            image: "https://images.squarespace-cdn.com/content/v1/5c0291be89c172ab5331ffea/1661808452526-UHYRWBP3CKT7YFGQKRPT/1-54+Contemporary+African+Art+Fair+2021.jpg?format=1500w",
            sourceUrl: "https://www.theprovenanceresearchblog.com/home/2022/8/29/1-54-the-first-decade"
        },
        {
            category: "Archaeology",
            title: "LiDAR study reveals a vast fortified city",
            excerpt: "A LiDAR study of Guiengola, a 15th-century Zapotec site in southern Oaxaca, Mexico, has revealed a vast fortified city.",
            author: "Mark Milligan",
            readTime: 10,
            image: "https://www.heritagedaily.com/ezoimgfmt/i0.wp.com/www.heritagedaily.com/wp-content/uploads/2025/02/mcgill1.jpg?ezimgfmt=ng%3Awebp%2Fngcb2%2Frs%3Adevice%2Frscb2-1&ssl=1&w=1250",
            sourceUrl: "https://www.heritagedaily.com/2025/02/lidar-study-reveals-a-vast-fortified-city/154500"
        },
        {
            category: "Archaeology",
            title: "Dog sacrifices near ancient palace",
            excerpt: "Archaeologists have found evidence of dog sacrifices near the Wolseong Palace, a royal palace of Silla in what is now Gyeongju, South Korea.",
            author: "Mark Milligan",
            readTime: 8,
            image: "https://www.heritagedaily.com/ezoimgfmt/i0.wp.com/www.heritagedaily.com/wp-content/uploads/2025/02/dog2.jpg?ezimgfmt=ng%3Awebp%2Fngcb2%2Frs%3Adevice%2Frscb2-1&ssl=1&w=1200",
            sourceUrl: "https://www.heritagedaily.com/2025/02/dog-sacrifices-found-near-ancient-royal-palace/154477"
        },
        {
            category: "Dendrochronology",
            title: "The Provenance of Artists' Materials",
            excerpt: "Provenance research focuses on an artwork’s history from the moment it leaves the artist’s studio through to the present day. Scientific analysis extends this timeline further. ",
            author: "Denis Moiseev",
            readTime: 14,
            image: "https://images.squarespace-cdn.com/content/v1/5c0291be89c172ab5331ffea/1615388389698-Q0YD8YI4UTIO4AYL43JV/craquelure_painting.jpg?format=1500w",
            sourceUrl: "https://www.theprovenanceresearchblog.com/home/2021/3/10/the-provenance-of-artists-materials"
        },
        {
            category: "Research",
            title: "Challenges of Research in Italy",
            excerpt: "Researching and publishing require a lot of work and encountering all kinds of hurdles at every turn does not help with focus and motivation. ",
            author: "Dr Corinna Ricasoli",
            readTime: 11,
            image: "https://images.squarespace-cdn.com/content/v1/5c0291be89c172ab5331ffea/1643213330153-QH8U6GMNRKPOVP0F93II/Archivio+Banco+di+Napoli.jpg?format=1500w",
            sourceUrl: "https://www.theprovenanceresearchblog.com/home/2022/1/26/the-challenges-of-research-in-italy"
        }
    ];

    return (
        <section className="">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl md:text-4xl font-medium text-center mb-10 lg:mb-20">
                    Latest Discoveries in Roman History
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <BlogCard key={index} {...blog} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;