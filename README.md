## E-commerce app with admin dashboard

### Features

- Admin dashboard
- File upload and download
- Server actions
- NextUI for UI components
- In progress...

### Admin settings

To access the admin dashboard through Clerk authentication, set the public metadata of the admin user to:
```
{
"role": "admin"
}
```
and make the session token to include:
```
{
"metadata": "{{user.public_metadata}}"
}
```
in Clerk dashboard.

For more details, see [Clerk Docs](https://clerk.com/docs/guides/basic-rbac).