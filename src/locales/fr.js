export default {
  pages: {
    login: {
      title: 'Connexion',
      description: 'Connexion au site web'
    },
    logout: {
      title: 'Déconnexion',
      description: 'Déconnexion du site web'
    }
  },
  header: {
    user: {
      account: 'Mon compte',
      logout: 'Se déconnecter'
    }
  },
  sidebar: {
    tabs: {
      website: 'Site web',
      admin: 'Administration'
    },
    dashboard: {
      short: 'Tableau de bord',
      long: 'Voir le tableau de bord'
    },
    website: {
      selectWebsite: 'Sélectionner un site ({current})',
      searchWebsite: 'Chercher un site',
      blog: {
        title: 'Blog',
        posts: {
          short: 'Article',
          long: 'Gérer les articles du blog'
        },
        categories: {
          short: 'Catégories',
          long: 'Gérer les catégories du blog'
        },
        comments: {
          short: 'Commentaires',
          long: 'Gérer les commentaires du blog'
        }
      },
      services: {
        short: 'Services',
        long: 'Gérer les services'
      },
      vehicles: {
        short: 'Véhicules',
        long: 'Gérer les véhicules'
      }
    },
    admin: {
      users: {
        short: 'Utilisateurs',
        long: 'Gérer les utilisateurs'
      },
      websites: {
        title: 'Sites web',
        websites: {
          short: 'Sites web',
          long: 'Gérer les sites web'
        },
        templates: {
          short: 'Modèles',
          long: 'Gérer les modèles pour les sites web'
        }
      }
    },
    bottom: {
      locales: 'Changer de langue'
    }
  },
  login: {
    title: 'Connexion',
    submit: {
      idle: 'Connexion',
      process: 'Connexion...'
    },
    notifications: {
      success: 'Vous êtes désormais connecté',
      error: "Erreur l'ors de la connexion"
    }
  },
  logout: {
    notifications: {
      success: 'Vous êtes désormais déconnecté',
      error: "Erreur l'ors de la déconnexion"
    }
  },
  fields: {
    username: {
      label: 'Nom de compte',
      placeholder: 'Entrer un nom de compte'
    },
    email: {
      label: 'Email',
      placeholder: 'Entrer une adresse email'
    },
    password: {
      label: 'Mot de passe',
      placeholder: 'Entrer un mot de passe'
    }
  },
  validations: {
    attributes: {
      username: 'nom de compte',
      email: 'email',
      password: 'mot de passe'
    }
  }
}
