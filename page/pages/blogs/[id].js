import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import styles from "../../styles/Blog.module.scss";

const blogs = ({ metaData, content }) => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
            </div>
        </main>
    );
};
export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join("blogs"));
    const paths = files.map((filename) => ({
        params: {
            id: filename.replace(".md", ""),
        },
    }));
    return {
        paths,
        fallback: false,
    };
};
export const getStaticProps = async ({ params: { id } }) => {
    // console.log(process.cwd());
    const blogData = fs.readFileSync(path.join("blogs", id + ".md"), "utf8");
    const { data: metaData, content } = matter(blogData);
    console.log(metaData, content);
    return {
        props: { metaData, content },
    };
};

export default blogs;
