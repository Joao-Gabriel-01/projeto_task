import { AppComponent } from './app/app';
import { serverConfig } from './app/app.config.server';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, serverConfig, context);
export default bootstrap;