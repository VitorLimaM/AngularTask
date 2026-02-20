# MyAngular12App

This application was created using Angular 12. Here's the command:

```
npx @angular/cli@12 new my-angular12-app --style=scss --routing
```

We use `npx` is to just download and run the necessary packages but not save them to permanent storage. The `--routing` option is to set up a routing module `app-routing.module.ts` and wires up the `<router-outlet>` tag in `app.component.html`.  
  
**Note**: Angular 12 requires an older version of NodeJS (e.g. Node 16 or 14) to avoid crypto errors.  
  
```
# if NodeJS 16 isn't installed run:
# nvm install 16
nvm use 16
```
