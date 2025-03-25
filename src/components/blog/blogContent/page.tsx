import { BlogPost } from '../../../types/blog';

interface BlogContentProps {
  post: BlogPost;
}

const BlogContent = ({ post }: BlogContentProps) => (
  <article >
    <h1>{post.title}</h1>
    <p>{post.introduction}</p>

    {post.sections.map((section, index) => (
      <section key={index}>
        <h2>{section.heading}</h2>
        {section.content &&
          section.content.map((contentBlock, idx) => (
            <div key={idx}>
              {contentBlock.subheading && <h3>{contentBlock.subheading}</h3>}
              {contentBlock.points && (
                <ul>
                  {contentBlock.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
              {contentBlock.paragraph && <p>{contentBlock.paragraph}</p>}
            </div>
          ))}
      </section>
    ))}

    {post.faq.length > 0 && (
      <section>
        <h2>Frequently Asked Questions</h2>
        {post.faq.map((faq, i) => (
          <div key={i}>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>
    )}
  </article>
);

export default BlogContent;
