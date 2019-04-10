export default {
  pages: {
    login: {
      title: 'Login',
      description: 'Login to website'
    },
    logout: {
      title: 'Logout',
      description: 'Logout'
    }
  },
  header: {
    user: {
      account: 'My account',
      logout: 'Logout'
    }
  },
  sidebar: {
    tabs: {
      website: 'Website',
      admin: 'Administration'
    },
    dashboard: {
      short: 'Dashboard',
      long: 'Show dashboard'
    },
    website: {
      selectWebsite: 'Select an website ({current})',
      searchWebsite: 'Search website',
      blog: {
        title: 'Blog',
        posts: {
          short: 'Post',
          long: 'Manage blog posts'
        },
        categories: {
          short: 'Categories',
          long: 'Manage blog categories'
        },
        comments: {
          short: 'Comments',
          long: 'Manage blog comments'
        }
      },
      services: {
        short: 'Services',
        long: 'Manage services'
      },
      vehicles: {
        short: 'Vehicles',
        long: 'Manage vehicles'
      }
    },
    admin: {
      users: {
        short: 'Users',
        long: 'Manage users'
      },
      websites: {
        title: 'Websites',
        websites: {
          short: 'Websites',
          long: 'Manage websites'
        },
        templates: {
          short: 'Templates',
          long: 'Manage templates for websites'
        }
      }
    },
    bottom: {
      locales: 'Change languages'
    }
  },
  login: {
    title: 'Login',
    submit: {
      idle: 'Login',
      process: 'Login...'
    },
    notifications: {
      success: 'You are now logged',
      error: 'Fail to login'
    }
  },
  logout: {
    notifications: {
      success: 'You are now logged out',
      error: 'Fail to logout'
    }
  },
  fields: {
    username: {
      label: 'Username',
      placeholder: 'Enter an username'
    },
    email: {
      label: 'Email',
      placeholder: 'Enter an email address'
    },
    password: {
      label: 'Password',
      placeholder: 'Enter an password'
    }
  },
  validations: {
    attributes: {
      username: 'username',
      email: 'email',
      password: 'password'
    }
  }
}
