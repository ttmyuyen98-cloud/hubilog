export interface ThemeSettings {
  primaryColor: string; // Background canvas (#0A192F)
  surfaceColor: string; // Cards & panels (#112240)
  accentColor: string;  // Cyan glow highlight (#00E5FF)
  ctaColor: string;     // CTA button background (#00E5FF or #F59E0B)
  logoUrl: string;      // Header & brand logo path/URL
  bannerUrl: string;    // Slide1 Hero delivery banner path/URL
  bannerAlt: string;    // Image alt text
  brandName: string;    // "HUBI LOGISTICS"
  slogan: string;       // "Nhận Đúng Giờ – Phí Siêu Hời"
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  fullContent: string;
  thumbnail: string;
  altText: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  responsibility: string;
  email: string;
}

export interface ContactSettings {
  email: string;
  hotline: string;
  address: string;
  operatingHours: string;
  headline: string;
  subline: string;
}

export interface AboutCardItem {
  id: 'problem' | 'solution' | 'value';
  tag: string;         // e.g. "Vấn đề hiện hữu"
  title: string;       // e.g. "Giao Đơn Lẻ Lãng Phí & Phân Tán"
  subtitle: string;    // e.g. "Chi phí đắt đỏ và sảnh chung cư ùn ứ"
  description: string; // Detailed description content
  image: string;       // Image path or dataUrl
  imageAlt: string;    // Accessibility text
  badgeText: string;   // e.g. "35K - 45K / đơn" or "Tiết kiệm 60%" or "99.8% Tin cậy"
  extraLabel: string;  // e.g. "Chờ đợi phân tán" or "2 khung giờ vàng" or "Giảm khí thải"
}

export interface AboutSectionSettings {
  problem: AboutCardItem;
  solution: AboutCardItem;
  value: AboutCardItem;
}

export interface HubiAppData {
  theme: ThemeSettings;
  articles: ArticleItem[];
  about: AboutSectionSettings;
  team: TeamMember[];
  contact: ContactSettings;
  version: number;
}
