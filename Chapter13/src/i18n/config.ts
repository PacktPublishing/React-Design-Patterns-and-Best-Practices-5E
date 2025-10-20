import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Translation resources for English and Spanish
const resources = {
  en: {
    translation: {
      welcome: "Welcome to our application",
      greeting: "Hello, {{name}}!",
      navigation: {
        home: "Home",
        about: "About",
        contact: "Contact",
        settings: "Settings",
        menu: "Menu",
        blog: "Blog",
        dashboard: "Dashboard",
      },
      actions: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        confirm: "Confirm",
        close: "Close",
      },
      messages: {
        success: "Operation completed successfully",
        error: "An error occurred",
        loading: "Loading...",
      },
      home: {
        hero: {
          title: "Build Amazing Multilingual Applications",
          subtitle: "Experience seamless internationalization with React and Next.js",
          cta: "Get Started",
        },
        products: {
          title: "Featured Products",
        },
      },
      blog: {
        author: "By {{name}}",
        backToList: "Back to Blog",
        title: "Blog Posts",
      },
      dashboard: {
        welcome: "Welcome back, {{name}}!",
        lastLogin: "Last login: {{date}}",
        title: "Dashboard",
        description: "View your analytics and manage your account",
        stats: {
          views: "Total Views",
          sales: "Total Sales",
          conversion: "Conversion Rate",
        },
      },
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a nuestra aplicación",
      greeting: "¡Hola, {{name}}!",
      navigation: {
        home: "Inicio",
        about: "Acerca de",
        contact: "Contacto",
        settings: "Configuración",
        menu: "Menú",
        blog: "Blog",
        dashboard: "Panel",
      },
      actions: {
        save: "Guardar",
        cancel: "Cancelar",
        delete: "Eliminar",
        confirm: "Confirmar",
        close: "Cerrar",
      },
      messages: {
        success: "Operación completada exitosamente",
        error: "Ocurrió un error",
        loading: "Cargando...",
      },
      home: {
        hero: {
          title: "Construye Aplicaciones Multilingües Increíbles",
          subtitle: "Experimenta la internacionalización perfecta con React y Next.js",
          cta: "Comenzar",
        },
        products: {
          title: "Productos Destacados",
        },
      },
      blog: {
        author: "Por {{name}}",
        backToList: "Volver al Blog",
        title: "Publicaciones del Blog",
      },
      dashboard: {
        welcome: "¡Bienvenido de nuevo, {{name}}!",
        lastLogin: "Último acceso: {{date}}",
        title: "Panel de Control",
        description: "Ve tus análisis y gestiona tu cuenta",
        stats: {
          views: "Vistas Totales",
          sales: "Ventas Totales",
          conversion: "Tasa de Conversión",
        },
      },
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue dans notre application",
      greeting: "Bonjour, {{name}}!",
      navigation: {
        home: "Accueil",
        about: "À propos",
        contact: "Contact",
        settings: "Paramètres",
        menu: "Menu",
        blog: "Blog",
        dashboard: "Tableau de bord",
      },
      actions: {
        save: "Enregistrer",
        cancel: "Annuler",
        delete: "Supprimer",
        confirm: "Confirmer",
        close: "Fermer",
      },
      messages: {
        success: "Opération terminée avec succès",
        error: "Une erreur est survenue",
        loading: "Chargement...",
      },
      home: {
        hero: {
          title: "Créez des Applications Multilingues Incroyables",
          subtitle: "Découvrez l'internationalisation transparente avec React et Next.js",
          cta: "Commencer",
        },
        products: {
          title: "Produits en Vedette",
        },
      },
      blog: {
        author: "Par {{name}}",
        backToList: "Retour au Blog",
        title: "Articles de Blog",
      },
      dashboard: {
        welcome: "Bon retour, {{name}}!",
        lastLogin: "Dernière connexion: {{date}}",
        title: "Tableau de Bord",
        description: "Consultez vos analyses et gérez votre compte",
        stats: {
          views: "Vues Totales",
          sales: "Ventes Totales",
          conversion: "Taux de Conversion",
        },
      },
    },
  },
  de: {
    translation: {
      welcome: "Willkommen in unserer Anwendung",
      greeting: "Hallo, {{name}}!",
      navigation: {
        home: "Startseite",
        about: "Über uns",
        contact: "Kontakt",
        settings: "Einstellungen",
        menu: "Menü",
        blog: "Blog",
        dashboard: "Dashboard",
      },
      actions: {
        save: "Speichern",
        cancel: "Abbrechen",
        delete: "Löschen",
        confirm: "Bestätigen",
        close: "Schließen",
      },
      messages: {
        success: "Vorgang erfolgreich abgeschlossen",
        error: "Ein Fehler ist aufgetreten",
        loading: "Wird geladen...",
      },
      home: {
        hero: {
          title: "Erstellen Sie Erstaunliche Mehrsprachige Anwendungen",
          subtitle: "Erleben Sie nahtlose Internationalisierung mit React und Next.js",
          cta: "Loslegen",
        },
        products: {
          title: "Empfohlene Produkte",
        },
      },
      blog: {
        author: "Von {{name}}",
        backToList: "Zurück zum Blog",
        title: "Blog-Beiträge",
      },
      dashboard: {
        welcome: "Willkommen zurück, {{name}}!",
        lastLogin: "Letzte Anmeldung: {{date}}",
        title: "Dashboard",
        description: "Sehen Sie Ihre Analysen und verwalten Sie Ihr Konto",
        stats: {
          views: "Gesamtansichten",
          sales: "Gesamtumsatz",
          conversion: "Konversionsrate",
        },
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    react: {
      useSuspense: true,
    },
  })

export default i18n

// Type definitions for translation keys
export type TranslationKeys = keyof typeof resources.en.translation
