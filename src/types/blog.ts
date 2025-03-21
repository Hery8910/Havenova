export interface BlogSection {
    heading: string;
    content: Array<{
      subheading?: string;
      points?: string[];
      paragraph?: string;
    }>;
  }
  
  export interface BlogFAQ {
    question: string;
    answer: string;
  }
  
  export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    image: string;
    imageAlt: string;
    metaDescription: string;
    introduction: string;
    sections: BlogSection[];
    faq: BlogFAQ[];
    createdAt: string;
    author: string;
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
  