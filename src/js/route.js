// reference to: https://github.com/ReactTraining/react-router/blob/master/examples/auth-with-shared-root/config/routes.js
export default {
  childRoutes: [
    { path: 'todo',
      indexRoute: {
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('container/todoList').default)
          }, 'todo')
        },
      },
      childRoutes: [
        { path: 'radio',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('ui/radio').default)
            }, 'radio')
          }
        },
        { path: 'checkbox',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('ui/checkbox').default)
            }, 'checkbox')
          }
        },
      ]
    },
    { path: '/layout',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('ui/layout/example/grid').default)
        }, 'layout')
      }
    },
    { path: '/modal',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('ui/modal/example').default)
        }, 'modalTest')
      }
    },
    { path: '/popup',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('ui/popup/example').default)
        }, 'popupTest')
      }
    },
    { path: '/',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('container/home').default)
        }, 'home')
      }
    },
    { path: '404',
      getComponent(nextState, cb) {
        console.log('404')
        require.ensure([], (require) => {
          cb(null, require('container/404').default)
        }, 'notFound')
      }
    },
    { path: '*',
      onEnter: (_, replaceState) => replaceState('/404')
    },
  ]
}
