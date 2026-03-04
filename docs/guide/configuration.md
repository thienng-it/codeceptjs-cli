# Project Configuration

The configuration for your project is typically found in `codecept.conf.ts` (or `.js`).

## Page Objects

Page objects encapsulate selectors and common actions for a page:

```typescript
// pages/LoginPage.ts
const { I } = inject()

export = {
  fields: {
    email: '#email',
    password: '#password',
  },
  buttons: {
    submit: 'Sign In',
  },

  login(email: string, password: string) {
    I.amOnPage('/login')
    I.fillField(this.fields.email, email)
    I.fillField(this.fields.password, password)
    I.click(this.buttons.submit)
  },
}
```

Register in `codecept.conf.ts`:

```typescript
include: {
  loginPage: './pages/LoginPage.ts',
},
```

Use in tests:

```typescript
Scenario('login via page object', ({ I, loginPage }) => {
  loginPage.login('user@test.com', 'secret123')
  I.see('Dashboard')
})
```

---

## Custom Helpers

Extend the `I` object with custom methods:

```typescript
// helpers/ApiHelper.ts
const Helper = require('@codeceptjs/helper')

class ApiHelper extends Helper {
  async createUser(name: string, email: string) {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    return response.json()
  }

  async cleanupTestData() {
    await fetch('http://localhost:3000/api/test/cleanup', { method: 'DELETE' })
  }
}

export = ApiHelper
```

Register in `codecept.conf.ts`:

```typescript
helpers: {
  Playwright: { /* ... */ },
  ApiHelper: { require: './helpers/ApiHelper.ts' },
},
```
