export type Language = 'de' | 'en' | 'es' | 'fr' | 'it';

export interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    gallery: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    experience: string;
    quality: string;
    reliability: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      lawn: {
        title: string;
        description: string;
      };
      hedges: {
        title: string;
        description: string;
      };
      beds: {
        title: string;
        description: string;
      };
      cleaning: {
        title: string;
        description: string;
      };
      disposal: {
        title: string;
        description: string;
      };
    };
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
    form: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contact: string;
    followUs: string;
    rights: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    backToHome: string;
    contactUs: string;
  };
  editor: {
    generateAll: string;
    generateBg: string;
    close: string;
    confirmImages: string;
    confirmBg: string;
    generatingAI: string;
    batchFailed: string;
    bgFailed: string;
  };
  languages: {
    de: string;
    en: string;
    es: string;
    fr: string;
    it: string;
  };
}

export const translations: Record<Language, Translations> = {
  de: {
    nav: {
      home: 'Startseite',
      services: 'Leistungen',
      about: 'Über uns',
      contact: 'Kontakt',
      gallery: 'Galerie',
    },
    hero: {
      title: 'Gartenservice & Pflege',
      subtitle: 'Zuverlässig, Sauber, Fachgerecht.',
      ctaPrimary: 'Jetzt Anfragen',
      ctaSecondary: 'Leistungen ansehen',
    },
    about: {
      title: 'Tradition trifft auf moderne Gartenkunst',
      description: 'Mit jahrelanger Erfahrung und Leidenschaft für Gartenarbeit bieten wir professionelle Dienstleistungen für Ihren Außenbereich.',
      experience: 'Jahrelange Erfahrung',
      quality: 'Höchste Qualität',
      reliability: 'Zuverlässiger Service',
    },
    services: {
      title: 'Unsere Leistungen',
      subtitle: 'Professionelle Gartenpflege für jeden Bedarf',
      items: {
        lawn: {
          title: 'Rasen-Service',
          description: 'Fachgerechtes Mähen für einen perfekten Rasen, auf Wunsch inklusive Abtransport des Schnittguts.',
        },
        hedges: {
          title: 'Hecken & Sträucher',
          description: 'Präziser Form- und Rückschnitt mit professionellen Geräten für gesunde und formschöne Pflanzen.',
        },
        beds: {
          title: 'Beet-Instandhaltung',
          description: 'Gründliches Jäten, Mulchen und nachhaltige Bodenpflege für blühende und gesunde Beete.',
        },
        cleaning: {
          title: 'Saubere Außenanlagen',
          description: 'Effiziente Laubentfernung und Kehrdienst, damit Ihre Wege und Zufahrten stets makellos sind.',
        },
        disposal: {
          title: 'Fachgerechte Entsorgung',
          description: 'Wir kümmern uns um den vollständigen Abtransport und die fachgerechte Entsorgung von Schnittgut und Gartenabfällen.',
        },
      },
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Nehmen Sie Kontakt mit uns auf',
      cta: 'Kontakt',
      form: {
        name: 'Name',
        email: 'E-Mail',
        phone: 'Telefon',
        message: 'Nachricht',
        submit: 'Nachricht senden',
        sending: 'Wird gesendet...',
        success: 'Nachricht erfolgreich gesendet!',
        error: 'Fehler beim Senden der Nachricht.',
      },
    },
    footer: {
      tagline: 'Premium Gartenservice',
      quickLinks: 'Schnelllinks',
      contact: 'Kontakt',
      followUs: 'Folgen Sie uns',
      rights: 'Alle Rechte vorbehalten.',
    },
    gallery: {
      title: 'Unsere Leistungen',
      subtitle: 'Entdecken Sie unser vollständiges Leistungsangebot',
      backToHome: 'Zurück zur Startseite',
      contactUs: 'Kontaktieren Sie uns',
    },
    editor: {
      generateAll: 'Leistungen KI',
      generateBg: 'Hintergründe KI',
      close: 'Editor Schließen',
      confirmImages: 'Möchten Sie alle Service-Bilder durch neue, KI-generierte Luxus-Aufnahmen ersetzen?',
      confirmBg: 'Möchten Sie drei neue Luxus-Hintergrundbilder für den Hero-Bereich generieren?',
      generatingAI: 'KI erschafft neue Welten...',
      batchFailed: 'Batch-Bildgenerierung fehlgeschlagen.',
      bgFailed: 'Hintergrundgenerierung fehlgeschlagen.',
    },
    languages: {
      de: 'Deutsch',
      en: 'English',
      es: 'Español',
      fr: 'Français',
      it: 'Italiano',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      gallery: 'Gallery',
    },
    hero: {
      title: 'Garden Service & Care',
      subtitle: 'Reliable, Clean, Professional.',
      ctaPrimary: 'Request Now',
      ctaSecondary: 'View Services',
    },
    about: {
      title: 'Tradition meets modern garden artistry',
      description: 'With years of experience and passion for gardening, we offer professional services for your outdoor space.',
      experience: 'Years of Experience',
      quality: 'Highest Quality',
      reliability: 'Reliable Service',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Professional garden care for every need',
      items: {
        lawn: {
          title: 'Lawn Service',
          description: 'Professional mowing for a perfect lawn, including removal of grass clippings upon request.',
        },
        hedges: {
          title: 'Hedges & Shrubs',
          description: 'Precise shaping and pruning with professional equipment for healthy and beautifully shaped plants.',
        },
        beds: {
          title: 'Bed Maintenance',
          description: 'Thorough weeding, mulching, and sustainable soil care for blooming and healthy beds.',
        },
        cleaning: {
          title: 'Clean Outdoor Areas',
          description: 'Efficient leaf removal and sweeping service to keep your paths and driveways spotless.',
        },
        disposal: {
          title: 'Professional Disposal',
          description: 'We handle the complete removal and proper disposal of clippings and garden waste.',
        },
      },
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch with us',
      cta: 'Contact',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message.',
      },
    },
    footer: {
      tagline: 'Premium Garden Service',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      rights: 'All rights reserved.',
    },
    gallery: {
      title: 'Our Services',
      subtitle: 'Discover our complete range of services',
      backToHome: 'Back to Home',
      contactUs: 'Contact Us',
    },
    editor: {
      generateAll: 'AI Services',
      generateBg: 'AI Backgrounds',
      close: 'Close Editor',
      confirmImages: 'Would you like to replace all service images with new AI-generated luxury shots?',
      confirmBg: 'Would you like to generate three new luxury background images for the hero section?',
      generatingAI: 'AI is creating new worlds...',
      batchFailed: 'Batch image generation failed.',
      bgFailed: 'Background generation failed.',
    },
    languages: {
      de: 'Deutsch',
      en: 'English',
      es: 'Español',
      fr: 'Français',
      it: 'Italiano',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      about: 'Acerca de',
      contact: 'Contacto',
      gallery: 'Galería',
    },
    hero: {
      title: 'Servicio y Cuidado de Jardines',
      subtitle: 'Confiable, Limpio, Profesional.',
      ctaPrimary: 'Solicitar Ahora',
      ctaSecondary: 'Ver Servicios',
    },
    about: {
      title: 'La tradición se encuentra con el arte moderno del jardín',
      description: 'Con años de experiencia y pasión por la jardinería, ofrecemos servicios profesionales para su espacio exterior.',
      experience: 'Años de Experiencia',
      quality: 'Máxima Calidad',
      reliability: 'Servicio Confiable',
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Cuidado profesional del jardín para cada necesidad',
      items: {
        lawn: {
          title: 'Servicio de Césped',
          description: 'Corte profesional para un césped perfecto, incluida la eliminación de recortes de césped bajo petición.',
        },
        hedges: {
          title: 'Setos y Arbustos',
          description: 'Modelado y poda precisos con equipos profesionales para plantas saludables y bellamente formadas.',
        },
        beds: {
          title: 'Mantenimiento de Parterres',
          description: 'Deshierbe minucioso, acolchado y cuidado sostenible del suelo para parterres florecientes y saludables.',
        },
        cleaning: {
          title: 'Áreas Exteriores Limpias',
          description: 'Servicio eficiente de eliminación de hojas y barrido para mantener sus caminos y entradas impecables.',
        },
        disposal: {
          title: 'Eliminación Profesional',
          description: 'Nos encargamos de la eliminación completa y adecuada de recortes y residuos de jardín.',
        },
      },
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Póngase en contacto con nosotros',
      cta: 'Contacto',
      form: {
        name: 'Nombre',
        email: 'Correo Electrónico',
        phone: 'Teléfono',
        message: 'Mensaje',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado con éxito!',
        error: 'Error al enviar el mensaje.',
      },
    },
    footer: {
      tagline: 'Servicio Premium de Jardines',
      quickLinks: 'Enlaces Rápidos',
      contact: 'Contacto',
      followUs: 'Síguenos',
      rights: 'Todos los derechos reservados.',
    },
    gallery: {
      title: 'Nuestros Servicios',
      subtitle: 'Descubra nuestra gama completa de servicios',
      backToHome: 'Volver al Inicio',
      contactUs: 'Contáctenos',
    },
    editor: {
      generateAll: 'Servicios IA',
      generateBg: 'Fondos IA',
      close: 'Cerrar Editor',
      confirmImages: '¿Desea reemplazar todas las imágenes de servicio con nuevas tomas de lujo generadas por IA?',
      confirmBg: '¿Desea generar tres nuevas imágenes de fondo de lujo para la sección hero?',
      generatingAI: 'La IA está creando nuevos mundos...',
      batchFailed: 'Error en la generación de imágenes por lotes.',
      bgFailed: 'Error en la generación de fondos.',
    },
    languages: {
      de: 'Deutsch',
      en: 'English',
      es: 'Español',
      fr: 'Français',
      it: 'Italiano',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      about: 'À propos',
      contact: 'Contact',
      gallery: 'Galerie',
    },
    hero: {
      title: 'Service et Entretien de Jardin',
      subtitle: 'Fiable, Propre, Professionnel.',
      ctaPrimary: 'Demander Maintenant',
      ctaSecondary: 'Voir les Services',
    },
    about: {
      title: 'La tradition rencontre l\'art moderne du jardin',
      description: 'Avec des années d\'expérience et une passion pour le jardinage, nous offrons des services professionnels pour votre espace extérieur.',
      experience: 'Années d\'Expérience',
      quality: 'Qualité Supérieure',
      reliability: 'Service Fiable',
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Entretien professionnel du jardin pour tous les besoins',
      items: {
        lawn: {
          title: 'Service de Pelouse',
          description: 'Tonte professionnelle pour une pelouse parfaite, y compris l\'enlèvement des tontes de gazon sur demande.',
        },
        hedges: {
          title: 'Haies et Arbustes',
          description: 'Taille et élagage précis avec des équipements professionnels pour des plantes saines et joliment formées.',
        },
        beds: {
          title: 'Entretien des Plates-bandes',
          description: 'Désherbage minutieux, paillage et soins durables du sol pour des plates-bandes fleuries et saines.',
        },
        cleaning: {
          title: 'Espaces Extérieurs Propres',
          description: 'Service efficace d\'enlèvement des feuilles et de balayage pour garder vos allées et entrées impeccables.',
        },
        disposal: {
          title: 'Élimination Professionnelle',
          description: 'Nous nous occupons de l\'enlèvement complet et de l\'élimination appropriée des tontes et des déchets de jardin.',
        },
      },
    },
    contact: {
      title: 'Contact',
      subtitle: 'Contactez-nous',
      cta: 'Contact',
      form: {
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        message: 'Message',
        submit: 'Envoyer le Message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès!',
        error: 'Erreur lors de l\'envoi du message.',
      },
    },
    footer: {
      tagline: 'Service de Jardin Premium',
      quickLinks: 'Liens Rapides',
      contact: 'Contact',
      followUs: 'Suivez-nous',
      rights: 'Tous droits réservés.',
    },
    gallery: {
      title: 'Nos Services',
      subtitle: 'Découvrez notre gamme complète de services',
      backToHome: 'Retour à l\'Accueil',
      contactUs: 'Contactez-nous',
    },
    editor: {
      generateAll: 'Services IA',
      generateBg: 'Arrière-plans IA',
      close: 'Fermer l\'Éditeur',
      confirmImages: 'Voulez-vous remplacer toutes les images de service par de nouvelles prises de luxe générées par IA?',
      confirmBg: 'Voulez-vous générer trois nouvelles images d\'arrière-plan de luxe pour la section hero?',
      generatingAI: 'L\'IA crée de nouveaux mondes...',
      batchFailed: 'Échec de la génération d\'images par lots.',
      bgFailed: 'Échec de la génération d\'arrière-plan.',
    },
    languages: {
      de: 'Deutsch',
      en: 'English',
      es: 'Español',
      fr: 'Français',
      it: 'Italiano',
    },
  },
  it: {
    nav: {
      home: 'Home',
      services: 'Servizi',
      about: 'Chi Siamo',
      contact: 'Contatto',
      gallery: 'Galleria',
    },
    hero: {
      title: 'Servizio e Cura del Giardino',
      subtitle: 'Affidabile, Pulito, Professionale.',
      ctaPrimary: 'Richiedi Ora',
      ctaSecondary: 'Vedi Servizi',
    },
    about: {
      title: 'La tradizione incontra l\'arte moderna del giardino',
      description: 'Con anni di esperienza e passione per il giardinaggio, offriamo servizi professionali per il vostro spazio esterno.',
      experience: 'Anni di Esperienza',
      quality: 'Massima Qualità',
      reliability: 'Servizio Affidabile',
    },
    services: {
      title: 'I Nostri Servizi',
      subtitle: 'Cura professionale del giardino per ogni esigenza',
      items: {
        lawn: {
          title: 'Servizio Prato',
          description: 'Taglio professionale per un prato perfetto, inclusa la rimozione dell\'erba tagliata su richiesta.',
        },
        hedges: {
          title: 'Siepi e Arbusti',
          description: 'Modellatura e potatura precise con attrezzature professionali per piante sane e ben formate.',
        },
        beds: {
          title: 'Manutenzione Aiuole',
          description: 'Diserbo accurato, pacciamatura e cura sostenibile del suolo per aiuole fiorite e sane.',
        },
        cleaning: {
          title: 'Aree Esterne Pulite',
          description: 'Servizio efficiente di rimozione foglie e spazzamento per mantenere i vostri vialetti e ingressi impeccabili.',
        },
        disposal: {
          title: 'Smaltimento Professionale',
          description: 'Ci occupiamo della rimozione completa e dello smaltimento adeguato di sfalci e rifiuti da giardino.',
        },
      },
    },
    contact: {
      title: 'Contatto',
      subtitle: 'Mettiti in contatto con noi',
      cta: 'Contatto',
      form: {
        name: 'Nome',
        email: 'Email',
        phone: 'Telefono',
        message: 'Messaggio',
        submit: 'Invia Messaggio',
        sending: 'Invio in corso...',
        success: 'Messaggio inviato con successo!',
        error: 'Errore nell\'invio del messaggio.',
      },
    },
    footer: {
      tagline: 'Servizio Giardino Premium',
      quickLinks: 'Link Rapidi',
      contact: 'Contatto',
      followUs: 'Seguici',
      rights: 'Tutti i diritti riservati.',
    },
    gallery: {
      title: 'I Nostri Servizi',
      subtitle: 'Scopri la nostra gamma completa di servizi',
      backToHome: 'Torna alla Home',
      contactUs: 'Contattaci',
    },
    editor: {
      generateAll: 'Servizi IA',
      generateBg: 'Sfondi IA',
      close: 'Chiudi Editor',
      confirmImages: 'Vuoi sostituire tutte le immagini dei servizi con nuove foto di lusso generate dall\'IA?',
      confirmBg: 'Vuoi generare tre nuove immagini di sfondo di lusso per la sezione hero?',
      generatingAI: 'L\'IA sta creando nuovi mondi...',
      batchFailed: 'Generazione batch di immagini fallita.',
      bgFailed: 'Generazione sfondo fallita.',
    },
    languages: {
      de: 'Deutsch',
      en: 'English',
      es: 'Español',
      fr: 'Français',
      it: 'Italiano',
    },
  },
};
