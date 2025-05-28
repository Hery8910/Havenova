"use client";
import { useState } from "react";
import api from "../../../services/api";
import { BlogFAQ, BlogPost, SectionContent } from "../../../types/blog";
import ImageUpload from "../../imageUpload/page";
import styles from "./page.module.css";
import Input from "../input/page";
import {
  validateIntroduction,
  validateMetaDescription,
  validateSlug,
  validateTitle,
} from "../../../utils/validators";
import Image from "next/image";
import Info from "../../info/page";
import { url } from "inspector";

const initialBlog: BlogPost = {
  title: "",
  slug: "",
  featuredImage: "",
  metaDescription: "",
  introduction: "",
  sections: [],
  faq: [],
  author: "Havenova Team",
};

export default function CreateBlogForm({ blogs }: { blogs: BlogPost[] }) {
  const [blog, setBlog] = useState<BlogPost>(initialBlog);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [error, setError] = useState<string | null>(null);

  function validateBlog(
    blog: BlogPost,
    existingBlogs: BlogPost[]
  ): string | null {
    if (!blog.title.trim()) return "Title is required";
    if (!blog.metaDescription.trim()) return "Meta description is required";
    if (!blog.introduction.trim()) return "Introduction is required";
    if (!blog.slug.trim()) return "Slug is required";
    if (!blog.featuredImage.trim()) return "Featured image is required";
    return null;
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove all non-word chars
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/--+/g, "-"); // Replace multiple - with single -
  };

  const handleTitleChange = (title: string) => {
    setBlog((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  // Secciones
  const addSection = () => {
    setBlog({
      ...blog,
      sections: [...blog.sections, { heading: "", content: [] }],
    });
  };

  const removeSection = (idx: number) => {
    const newSections = blog.sections.filter((_, i) => i !== idx);
    setBlog({ ...blog, sections: newSections });
  };

  const updateSectionHeading = (idx: number, value: string) => {
    const newSections = [...blog.sections];
    newSections[idx].heading = value;
    setBlog({ ...blog, sections: newSections });
  };

  // Agrega un nuevo bloque de contenido (párrafo o lista)
  const addSectionContent = (
    sectionIdx: number,
    type: "paragraph" | "points"
  ) => {
    const newSections = [...blog.sections];
    newSections[sectionIdx].content.push(
      type === "paragraph"
        ? { type: "paragraph", subheading: "", paragraph: "" }
        : { type: "points", subheading: "", points: [""] }
    );
    setBlog({ ...blog, sections: newSections });
  };

  // Actualiza campos del bloque de contenido
  const updateSectionContentField = (
    sectionIdx: number,
    contentIdx: number,
    field: keyof SectionContent,
    value: any
  ) => {
    const newSections = [...blog.sections];
    newSections[sectionIdx].content[contentIdx][field] = value;
    setBlog({ ...blog, sections: newSections });
  };

  // Agrega un punto a la lista
  const addPoint = (sectionIdx: number, contentIdx: number) => {
    const newSections = [...blog.sections];
    if (!newSections[sectionIdx].content[contentIdx].points) {
      newSections[sectionIdx].content[contentIdx].points = [""];
    } else {
      newSections[sectionIdx].content[contentIdx].points!.push("");
    }
    setBlog({ ...blog, sections: newSections });
  };

  // Actualiza un punto
  const updatePoint = (
    sectionIdx: number,
    contentIdx: number,
    pointIdx: number,
    value: string
  ) => {
    const newSections = [...blog.sections];
    newSections[sectionIdx].content[contentIdx].points![pointIdx] = value;
    setBlog({ ...blog, sections: newSections });
  };

  // Elimina un punto de la lista
  const removePoint = (
    sectionIdx: number,
    contentIdx: number,
    pointIdx: number
  ) => {
    const newSections = [...blog.sections];
    newSections[sectionIdx].content[contentIdx].points!.splice(pointIdx, 1);
    setBlog({ ...blog, sections: newSections });
  };

  // Eliminar un bloque de contenido completo
  const removeSectionContent = (sectionIdx: number, contentIdx: number) => {
    const newSections = [...blog.sections];
    newSections[sectionIdx].content.splice(contentIdx, 1);
    setBlog({ ...blog, sections: newSections });
  };

  // FAQ
  const addFaq = () => {
    setBlog({ ...blog, faq: [...blog.faq, { question: "", answer: "" }] });
  };

  const updateFaq = (idx: number, field: keyof BlogFAQ, value: string) => {
    const newFaq = [...blog.faq];
    newFaq[idx][field] = value as any;
    setBlog({ ...blog, faq: newFaq });
  };

  const removeFaq = (idx: number) => {
    const newFaq = blog.faq.filter((_, i) => i !== idx);
    setBlog({ ...blog, faq: newFaq });
  };

  // Envío
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess(false);
    setError(null);

    const validationError = validateBlog(blog, blogs);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post("/api/blogs", blog);
      setSuccess(true);
      setBlog(initialBlog);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating blog post");
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.header_div}>
          <h2>New Blog Post</h2>
          <p className={styles.header_p}>
            This form guides you through the process of creating a new blog
            post. All fields and sections are structured to represent the final
            published version as closely as possible. Please read the guidelines
            for each field to ensure the best results.
          </p>
        </div>
        <Image
          className={styles.image}
          image-mockup
          src="/images/header-blog.webp"
          priority={true}
          alt="Blog image"
          width={250}
          height={250}
        />
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.title_section}>
          <Info
            direction="left"
            info={{
              question: "Title",
              answer:
                "The title will appear as the main headline of your blog post.",
            }}
          />
          <div className={styles.div}>
            <h3 className={styles.h3}>Blog Title:</h3>
            <Input
              heading="subheading"
              value={blog.title}
              onChange={handleTitleChange}
              onBlur={(value) =>
                setErrors((errs) => ({
                  ...errs,
                  title: validateTitle(value),
                }))
              }
              placeholder="Enter your blog title"
            />
          </div>
        </section>
        <section className={styles.section}>
          <Info
            direction="left"
            info={{
              question: "Meta Description",
              answer:
                "A short summary, between 100 and 160 characters, for SEO and social sharing.",
            }}
            image={{
              url: "/images/metadataExample.webp",
              alt: "Example of Meta Description",
            }}
          />
          <div className={styles.div}>
            <h3 className={styles.h3}>Meta Description:</h3>
            <Input
              heading="paragraph"
              value={blog.metaDescription}
              onChange={(value) =>
                setBlog((prev) => ({
                  ...prev,
                  metaDescription: value,
                }))
              }
              onBlur={(value) =>
                setErrors((errs) => ({
                  ...errs,
                  metaDescription: validateMetaDescription(value),
                }))
              }
              placeholder="Meta Description"
            />
          </div>
          {errors.metaDescription && (
            <p className={styles.error}>{errors.metaDescription}</p>
          )}
        </section>
        <section className={styles.slug_section}>
          <Info
            direction="left"
            info={{
              question: "URL",
              answer:
                "This url will be created with the blog’s title (e.g., my-blog-title). If you want to use a diferent one, please make sure you use only lowercase letters, numbers, and hyphens (-). No spaces or special characters.",
            }}
          />
          <div className={styles.div}>
            <h3>URL</h3>
            <aside className={styles.slug_aside}>
              <p>https://www.havenova.de/blogs/</p>
              <Input
                heading="paragraph"
                value={blog.slug}
                onChange={(value) =>
                  setBlog((prev) => ({
                    ...prev,
                    slug: value,
                  }))
                }
                onBlur={(value) =>
                  setErrors((errs) => ({
                    ...errs,
                    slug: validateSlug(value, blogs),
                  }))
                }
                placeholder="url-example"
              />
            </aside>
          </div>
          {errors.slug && <p className={styles.error}>{errors.slug}</p>}
        </section>
        <section className={styles.image_section}>
          <Info
            direction="left"
            info={{
              question: "Blog Image",
              answer:
                "The image should have a 1:1 aspect ratio (square). It will be shown as the blog’s header and in the blog card preview.",
            }}
          />
          <div className={styles.image_div}>
            <h3>Blog Image</h3>
            <ImageUpload
              label="Featured Image"
              uploadPreset="havenova_upload" // Tu upload preset creado en Cloudinary
              cloudName="dd1i5d0iq" // Tu cloud name de Cloudinary
              initialImage={blog.featuredImage}
              onUpload={(url) =>
                setBlog((prev) => ({ ...prev, featuredImage: url }))
              }
            />
          </div>
          {errors.featuredImage && (
            <p className={styles.error}>{errors.featuredImage}</p>
          )}
        </section>

        <section className={styles.section}>
          <Info
            direction="left"
            info={{
              question: "Introduction",
              answer:
                "A short summary of your blog post. This description helps readers and search engines quickly understand the main topic of your article. It should be concise and engaging, usually between 60 and 160 characters.",
            }}
          />
          <div className={styles.div}>
            <h3 className={styles.h3}>Introduction:</h3>
            <Input
              heading="paragraph"
              value={blog.introduction}
              onChange={(value) =>
                setBlog((prev) => ({
                  ...prev,
                  introduction: value,
                }))
              }
              onBlur={(value) =>
                setErrors((errs) => ({
                  ...errs,
                  introduction: validateIntroduction(value),
                }))
              }
              placeholder="Introduction"
            />
          </div>
          {errors.introduction && (
            <p className={styles.error}>{errors.introduction}</p>
          )}
        </section>

        {/* Sections */}
        <section className={styles.section}>
          <Info
            direction="left"
            info={{
              question: "Section",
              answer:
                "You can add multiple content blocks to your blog. Each block can be a paragraph (text) or a points list (bulleted). Use points for steps, recommendations, or checklists.”",
            }}
          />
          <div className={styles.div}>
            <h3>Sections</h3>

            {blog.sections.map((section, sectionIdx) => (
              <article
                key={sectionIdx}
                style={{
                  border: "1px solid #ccc",
                  marginBottom: "1rem",
                  padding: "1rem",
                }}
              >
                <section className={styles.sections_heading}>
                  <h3 className={styles.h3}>Heading:</h3>
                  <Input
                    heading="paragraph"
                    value={section.heading}
                    onChange={(value) => {
                      updateSectionHeading(sectionIdx, value);
                    }}
                    onBlur={() =>
                      setErrors((errs) => ({
                        ...errs,
                        sectionHeading: "Please introduce a heading line",
                      }))
                    }
                    placeholder="Section Heading..."
                  />
                  {errors.introduction && (
                    <p className={styles.error}>{errors.sectionHeading}</p>
                  )}
                </section>

                <div>
                  <h3>Content</h3>
                  {section.content.map((content, contentIdx) => (
                    <div
                      key={contentIdx}
                      style={{
                        marginBottom: "1rem",
                        background: "#f8f8f8",
                        padding: 8,
                      }}
                    >
                      <select
                        value={content.type}
                        onChange={(e) =>
                          updateSectionContentField(
                            sectionIdx,
                            contentIdx,
                            "type",
                            e.target.value as "paragraph" | "points"
                          )
                        }
                      >
                        <option value="paragraph">Paragraph</option>
                        <option value="points">Points List</option>
                      </select>
                     
                      {/* Paragraph */}
                      {content.type === "paragraph" && (
                        <textarea
                          placeholder="Paragraph"
                          value={content.paragraph || ""}
                          onChange={(e) =>
                            updateSectionContentField(
                              sectionIdx,
                              contentIdx,
                              "paragraph",
                              e.target.value
                            )
                          }
                          style={{ width: "100%", marginTop: 4 }}
                        />
                      )}
                      {/* Points */}
                      {content.type === "points" && (
                        <div style={{ marginTop: 8 }}>
                          {content.points?.map((point, pointIdx) => (
                            <div
                              key={pointIdx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 4,
                              }}
                            >
                              <input
                                placeholder={`Point ${pointIdx + 1}`}
                                value={point}
                                onChange={(e) =>
                                  updatePoint(
                                    sectionIdx,
                                    contentIdx,
                                    pointIdx,
                                    e.target.value
                                  )
                                }
                                style={{ flex: 1 }}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removePoint(sectionIdx, contentIdx, pointIdx)
                                }
                                style={{ marginLeft: 6, color: "red" }}
                                disabled={content.points!.length <= 1}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addPoint(sectionIdx, contentIdx)}
                            style={{ marginTop: 4 }}
                          >
                            Add Point
                          </button>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          removeSectionContent(sectionIdx, contentIdx)
                        }
                        style={{ marginTop: 6, color: "red" }}
                      >
                        Remove Content Block
                      </button>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => addSectionContent(sectionIdx, "paragraph")}
                    >
                      Add Paragraph
                    </button>
                    <button
                      type="button"
                      onClick={() => addSectionContent(sectionIdx, "points")}
                    >
                      Add Points List
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSection(sectionIdx)}
                  style={{ color: "red", marginTop: 10 }}
                >
                  Remove Section
                </button>
              </article>
            ))}
            <button
              type="button"
              onClick={addSection}
              className={styles.button}
            >
              + Add Section
            </button>
          </div>
        </section>

        {/* FAQ */}
        <div style={{ marginTop: "2rem" }}>
          <h3>Frequently Asked Questions (FAQ)</h3>
          {blog.faq.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "1rem" }}>
              <input
                placeholder="Question"
                value={item.question}
                onChange={(e) => updateFaq(idx, "question", e.target.value)}
              />
              <input
                placeholder="Answer"
                value={item.answer}
                onChange={(e) => updateFaq(idx, "answer", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeFaq(idx)}
                style={{ color: "red", marginLeft: 10 }}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addFaq} style={{ marginTop: 5 }}>
            Add Question
          </button>
        </div>

        <button type="submit" style={{ marginTop: 20 }}>
          Create Blog Post
        </button>
        {success && (
          <p style={{ color: "green" }}>Blog post created successfully ✅</p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
