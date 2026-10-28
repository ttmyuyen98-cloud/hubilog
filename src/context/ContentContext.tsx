import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import contentData from '../data/contentData.json';
import {
  ThemeSettings,
  ArticleItem,
  TeamMember,
  ContactSettings,
  AboutCardItem,
  AboutSectionSettings,
  HubiAppData,
} from '../types/content';
import { db, databaseId, projectId, handleFirestoreError, OperationType } from '../services/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const STORAGE_KEY = 'hubi_admin_data_v1';
const AUTH_KEY = 'hubi_admin_auth_v1';

export const defaultAboutData: AboutSectionSettings = {
  problem: {
    id: 'problem',
    tag: contentData.slides.s2_about.bentoItems.problem.tag || 'Vấn đề hiện hữu',
    title: contentData.slides.s2_about.bentoItems.problem.title || 'Giao Đơn Lẻ Lãng Phí & Phân Tán',
    subtitle: 'Chi phí đắt đỏ và sảnh chung cư ùn ứ hàng rải rác',
    description:
      contentData.slides.s2_about.bentoItems.problem.description ||
      'Phí giao hàng đơn lẻ cao gấp 2-3 lần bình thường. Shipper giao phân tán rải rác trong ngày khiến cư dân khó chủ động thời gian nhận, gây quá tải khu vực sảnh chung cư.',
    image: contentData.slides.s2_about.bentoItems.problem.image || './assets/s2_problem_isolated_01.jpg',
    imageAlt: contentData.slides.s2_about.bentoItems.problem.imageAlt || 'Minh họa các gói hàng riêng lẻ nằm rải rác lãng phí',
    badgeText: '35K - 45K / đơn lẻ',
    extraLabel: 'Chờ đợi phân tán cả ngày',
  },
  solution: {
    id: 'solution',
    tag: contentData.slides.s2_about.bentoItems.solution.tag || 'Giải pháp đột phá',
    title: contentData.slides.s2_about.bentoItems.solution.title || 'Mô Hình Gom Đơn Giao Cố Định',
    subtitle: 'Tập hợp đơn hàng và phân phối tập trung theo giờ vàng',
    description:
      contentData.slides.s2_about.bentoItems.solution.description ||
      'HUBI thu thập và gom các đơn cùng cụm tòa nhà/khu đô thị, sau đó phân phối tập trung vào các khung giờ vàng định sẵn. Tuyến đường được rút ngắn và tối ưu hóa toàn diện.',
    image: contentData.slides.s2_about.bentoItems.solution.image || './assets/s2_solution_hubi_02.jpg',
    imageAlt: contentData.slides.s2_about.bentoItems.solution.imageAlt || 'Giải pháp gom đơn giao theo giờ HUBI LOGISTICS',
    badgeText: 'Giảm 60% cước phí',
    extraLabel: '02 khung giờ vàng chuẩn',
  },
  value: {
    id: 'value',
    tag: contentData.slides.s2_about.bentoItems.value.tag || 'Giá trị cốt lõi',
    title: contentData.slides.s2_about.bentoItems.value.title || 'Ba Trụ Cột Vận Hành Bền Vững',
    subtitle: 'Tiết kiệm chi phí, chủ động thời gian và văn minh đô thị',
    description:
      contentData.slides.s2_about.bentoItems.value.description ||
      'HUBI kiến tạo trải nghiệm giao nhận văn minh, tiết kiệm và thân thiện với cư dân chung cư thông qua quy trình chuẩn hóa và công nghệ số điều phối thông minh.',
    image: './assets/s2_team_members_03.jpg',
    imageAlt: 'Giá trị cốt lõi và sứ mệnh phát triển HUBI LOGISTICS',
    badgeText: '99.8% Đúng hẹn cam kết',
    extraLabel: 'Cắt giảm khí thải & ùn tắc',
  },
};

export const defaultData: HubiAppData = {
  theme: {
    primaryColor: '#0A192F',
    surfaceColor: '#112240',
    accentColor: '#00E5FF',
    ctaColor: '#00E5FF',
    logoUrl: contentData.brand.logoPath || './assets/s1_logo_brand_01.png',
    bannerUrl: contentData.slides.s1_home.heroImage || './assets/s1_hero_delivery_01.jpg',
    bannerAlt: contentData.slides.s1_home.heroImageAlt || 'Banner trang chủ HUBI LOGISTICS',
    brandName: contentData.brand.name || 'HUBI LOGISTICS',
    slogan: contentData.brand.slogan || 'Nhận Đúng Giờ – Phí Siêu Hời',
  },
  articles: contentData.slides.s4_blog.articles.map((art) => ({
    id: art.id,
    title: art.title,
    category: art.category,
    date: art.date,
    readTime: art.readTime,
    excerpt: art.excerpt,
    fullContent: art.fullContent,
    thumbnail: art.thumbnail,
    altText: art.title,
  })),
  about: defaultAboutData,
  team: contentData.slides.s2_about.bentoItems.team.members.map((m, idx) => ({
    id: `team-${idx + 1}`,
    name: m.name,
    role: m.role,
    responsibility: m.responsibility,
    email: m.email,
  })),
  contact: {
    email: contentData.slides.s5_contact.contactInfo.email || 'ttmyuyen98@gmail.com',
    hotline: '1900 8892 (07:30 - 21:00)',
    address: contentData.slides.s5_contact.contactInfo.address || 'Trung tâm điều phối HUBI Logistics, TP. Hồ Chí Minh',
    operatingHours: contentData.slides.s5_contact.contactInfo.operatingHours || 'Thứ 2 – Chủ Nhật: 07:30 – 21:00',
    headline: contentData.slides.s5_contact.contactInfo.headline || 'Kết Nối Cùng Ban Dự Án HUBI',
    subline: contentData.slides.s5_contact.contactInfo.subline || 'Chúng tôi luôn lắng nghe phản hồi của cư dân.',
  },
  version: 1,
};

interface ContentContextValue {
  theme: ThemeSettings;
  articles: ArticleItem[];
  about: AboutSectionSettings;
  team: TeamMember[];
  contact: ContactSettings;
  isAdminLoggedIn: boolean;
  isSyncing: boolean;
  isCloudConnected: boolean;
  cloudDatabaseId: string;
  cloudProjectId: string;
  lastSaved: string | null;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateTheme: (newTheme: Partial<ThemeSettings>) => Promise<void>;
  addArticle: (article: Omit<ArticleItem, 'id'>) => Promise<void>;
  updateArticle: (id: string, updatedFields: Partial<ArticleItem>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  updateAboutCard: (cardId: 'problem' | 'solution' | 'value', cardData: Partial<AboutCardItem>) => Promise<void>;
  updateAllAboutCards: (aboutData: AboutSectionSettings) => Promise<void>;
  updateTeam: (newTeam: TeamMember[]) => Promise<void>;
  updateContact: (newContact: Partial<ContactSettings>) => Promise<void>;
  resetToDefault: () => Promise<void>;
  refreshFromCloud: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

function loadInitialData(): HubiAppData {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      return {
        theme: { ...defaultData.theme, ...(parsed.theme || {}) },
        articles: Array.isArray(parsed.articles) && parsed.articles.length > 0 ? parsed.articles : defaultData.articles,
        about: {
          problem: { ...defaultAboutData.problem, ...(parsed.about?.problem || {}) },
          solution: { ...defaultAboutData.solution, ...(parsed.about?.solution || {}) },
          value: { ...defaultAboutData.value, ...(parsed.about?.value || {}) },
        },
        team: Array.isArray(parsed.team) && parsed.team.length > 0 ? parsed.team : defaultData.team,
        contact: { ...defaultData.contact, ...(parsed.contact || {}) },
        version: parsed.version || 1,
      };
    }
  } catch (err) {
    console.warn('Failed to load local data, using defaults:', err);
  }
  return defaultData;
}

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<HubiAppData>(loadInitialData);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Apply CSS color variables dynamically to document
  const applyThemeColors = useCallback((theme: ThemeSettings) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--color-background', theme.primaryColor);
    root.style.setProperty('--color-hubi-dark', theme.primaryColor);
    root.style.setProperty('--color-surface', theme.surfaceColor);
    root.style.setProperty('--color-hubi-surface', theme.surfaceColor);
    root.style.setProperty('--color-cyan-accent', theme.accentColor);
    root.style.setProperty('--color-hubi-cyan', theme.accentColor);
    root.style.setProperty('--color-cta-button', theme.ctaColor);
  }, []);

  useEffect(() => {
    applyThemeColors(data.theme);
  }, [data.theme, applyThemeColors]);

  // Firestore remote subscription & fallback
  useEffect(() => {
    if (!db) {
      console.warn('Firestore database is not initialized; running in offline cache mode.');
      return;
    }

    let unsubscribe: (() => void) | undefined;
    const configDocRef = doc(db, 'hubi_config', 'site_settings');

    try {
      unsubscribe = onSnapshot(
        configDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const remote = snapshot.data() as Partial<HubiAppData>;
            const merged: HubiAppData = {
              theme: { ...defaultData.theme, ...(remote.theme || {}) },
              articles: Array.isArray(remote.articles) ? remote.articles : defaultData.articles,
              about: {
                problem: { ...defaultAboutData.problem, ...(remote.about?.problem || {}) },
                solution: { ...defaultAboutData.solution, ...(remote.about?.solution || {}) },
                value: { ...defaultAboutData.value, ...(remote.about?.value || {}) },
              },
              team: Array.isArray(remote.team) ? remote.team : defaultData.team,
              contact: { ...defaultData.contact, ...(remote.contact || {}) },
              version: typeof remote.version === 'number' ? remote.version : 1,
            };

            setData(merged);
            applyThemeColors(merged.theme);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch (e) {
              console.warn('Failed to cache remote to localStorage:', e);
            }
            setLastSaved(new Date().toLocaleTimeString('vi-VN'));
            setIsCloudConnected(true);
          } else {
            // First time setup: document does not exist yet in Firestore
            // Seed defaultData directly to cloud database
            setDoc(configDocRef, {
              ...defaultData,
              updatedAt: new Date().toISOString(),
            }).catch((err) => {
              console.warn('Auto-seed cloud document notice:', err);
            });
            setIsCloudConnected(true);
          }
        },
        (error) => {
          console.warn('Firestore real-time subscription notice (using local cache):', error.message);
          setIsCloudConnected(false);
        }
      );
    } catch (err) {
      console.warn('Firestore onSnapshot init error:', err);
      setIsCloudConnected(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [applyThemeColors]);

  // Save changes to both LocalStorage and Firestore
  const persistData = useCallback(async (updated: HubiAppData) => {
    setIsSyncing(true);

    // 1. Save to LocalStorage immediately
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    // 2. Persist directly to Firestore cloud database
    if (db) {
      try {
        const configDocRef = doc(db, 'hubi_config', 'site_settings');
        await setDoc(
          configDocRef,
          {
            ...updated,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
        setIsCloudConnected(true);
      } catch (err) {
        console.error('Firestore save error:', err);
        handleFirestoreError(err, OperationType.WRITE, 'hubi_config/site_settings');
      }
    }

    setIsSyncing(false);
    setLastSaved(new Date().toLocaleTimeString('vi-VN'));
  }, []);

  const refreshFromCloud = useCallback(async () => {
    if (!db) return;
    setIsSyncing(true);
    try {
      const configDocRef = doc(db, 'hubi_config', 'site_settings');
      const snap = await getDoc(configDocRef);
      if (snap.exists()) {
        const remote = snap.data() as Partial<HubiAppData>;
        const merged: HubiAppData = {
          theme: { ...defaultData.theme, ...(remote.theme || {}) },
          articles: Array.isArray(remote.articles) ? remote.articles : defaultData.articles,
          about: {
            problem: { ...defaultAboutData.problem, ...(remote.about?.problem || {}) },
            solution: { ...defaultAboutData.solution, ...(remote.about?.solution || {}) },
            value: { ...defaultAboutData.value, ...(remote.about?.value || {}) },
          },
          team: Array.isArray(remote.team) ? remote.team : defaultData.team,
          contact: { ...defaultData.contact, ...(remote.contact || {}) },
          version: typeof remote.version === 'number' ? remote.version : 1,
        };
        setData(merged);
        applyThemeColors(merged.theme);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {
          // ignore
        }
        setLastSaved(new Date().toLocaleTimeString('vi-VN'));
        setIsCloudConnected(true);
      }
    } catch (err) {
      console.warn('Cloud refresh failed:', err);
      setIsCloudConnected(false);
    } finally {
      setIsSyncing(false);
    }
  }, [applyThemeColors]);

  const loginAdmin = useCallback((user: string, pass: string): boolean => {
    const isValid = user.trim() === 'admin' && pass.trim() === 'admin123';
    if (isValid) {
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {
        // Fallback for sandboxed storage
      }
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // Ignored
    }
    setIsAdminLoggedIn(false);
  }, []);

  const updateTheme = useCallback(
    async (newTheme: Partial<ThemeSettings>) => {
      setData((prev) => {
        const updated: HubiAppData = {
          ...prev,
          theme: { ...prev.theme, ...newTheme },
          version: prev.version + 1,
        };
        applyThemeColors(updated.theme);
        persistData(updated);
        return updated;
      });
    },
    [applyThemeColors, persistData]
  );

  const addArticle = useCallback(
    async (article: Omit<ArticleItem, 'id'>) => {
      setData((prev) => {
        const newArt: ArticleItem = {
          ...article,
          id: `art-${Date.now()}`,
        };
        const updated: HubiAppData = {
          ...prev,
          articles: [newArt, ...prev.articles],
          version: prev.version + 1,
        };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const updateArticle = useCallback(
    async (id: string, updatedFields: Partial<ArticleItem>) => {
      setData((prev) => {
        const updatedArticles = prev.articles.map((item) =>
          item.id === id ? { ...item, ...updatedFields } : item
        );
        const updated: HubiAppData = {
          ...prev,
          articles: updatedArticles,
          version: prev.version + 1,
        };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const deleteArticle = useCallback(
    async (id: string) => {
      setData((prev) => {
        const updatedArticles = prev.articles.filter((item) => item.id !== id);
        const updated: HubiAppData = {
          ...prev,
          articles: updatedArticles,
          version: prev.version + 1,
        };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const updateAboutCard = useCallback(
    async (cardId: 'problem' | 'solution' | 'value', cardData: Partial<AboutCardItem>) => {
      setData((prev) => {
        const updated: HubiAppData = {
          ...prev,
          about: {
            ...prev.about,
            [cardId]: {
              ...prev.about[cardId],
              ...cardData,
            },
          },
          version: prev.version + 1,
        };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const updateAllAboutCards = useCallback(
    async (aboutData: AboutSectionSettings) => {
      setData((prev) => {
        const updated: HubiAppData = {
          ...prev,
          about: aboutData,
          version: prev.version + 1,
        };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const updateTeam = useCallback(
    async (newTeam: TeamMember[]) => {
      setData((prev) => {
        const updated: HubiAppData = {
          ...prev,
          team: newTeam,
          version: prev.version + 1,
        };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const updateContact = useCallback(
    async (newContact: Partial<ContactSettings>) => {
      setData((prev) => {
        const updated: HubiAppData = {
          ...prev,
          contact: { ...prev.contact, ...newContact },
          version: prev.version + 1,
        };
        persistData(updated);
        return updated;
      });
    },
    [persistData]
  );

  const resetToDefault = useCallback(async () => {
    setData(defaultData);
    applyThemeColors(defaultData.theme);
    await persistData(defaultData);
  }, [applyThemeColors, persistData]);

  const value: ContentContextValue = {
    theme: data.theme,
    articles: data.articles,
    about: data.about,
    team: data.team,
    contact: data.contact,
    isAdminLoggedIn,
    isSyncing,
    isCloudConnected,
    cloudDatabaseId: databaseId,
    cloudProjectId: projectId,
    lastSaved,
    loginAdmin,
    logoutAdmin,
    updateTheme,
    addArticle,
    updateArticle,
    deleteArticle,
    updateAboutCard,
    updateAllAboutCards,
    updateTeam,
    updateContact,
    resetToDefault,
    refreshFromCloud,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = (): ContentContextValue => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return ctx;
};
