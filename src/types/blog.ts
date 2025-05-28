export interface SectionContent {
  type: "paragraph" | "points";
  subheading?: string;
  paragraph?: string;
  points?: string[];
}

export interface BlogSection {
    heading: string;
    content: SectionContent[];
  }
  
  export interface BlogFAQ {
    question: string;
    answer: string;
  }
  
  export interface BlogPost {
    title: string;
    slug: string;
    featuredImage: string; // Cambia aquí
    metaDescription: string;
    introduction: string;
    sections: BlogSection[];
    faq: BlogFAQ[];
    author: string;
  }
  export interface BlogFromDB extends BlogPost {
    _id: string;
    createdAt: string;

  }
  export interface IframeProps {
    width?: string | number;  // Por si quieres sobreescribir desde el componente
    height?: string | number;
    src: string;              // La URL que Brevo te proporciona
    frameBorder?: number;
    scrolling?: 'auto' | 'yes' | 'no';
    allowFullScreen?: boolean;
    style?: React.CSSProperties;
  }
  export interface BlogPaginationResponse {
    blogs: BlogFromDB[];
    total: number;
    page: number;
    totalPages: number;
  }