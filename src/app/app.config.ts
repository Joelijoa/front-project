import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { definePreset } from '@primeng/themes';

const AppPreset = definePreset(Lara, {
  semantic: {
    colorScheme: {
      dark: {
        primary: {
          hoverColor: '{neutral-500}',
          color: '#010327',
          contrastColor: '{neutral-50}',
          activeColor: '{emerald-950}',
        },
        highlight: {
          background: '#010327',
          focusBackground: '{neutral-50}',
          color: '{neutral-50}',
          focusColor: '{emerald-500}',
        },
        content: {
          hoverBackground: '{neutral-300}',
          background: '{neutral-50}',
          color: '{neutral-900}',
        },
        formField: {
          background: '{surface-50}',
          color: '{neutral-950}',
          borderColor: '{neutral-900}',
          focusBorderColor: '{emerald-500}',
          placeholderColor: '{neutral-500}',
          disabledBackground: '{surface-50}',
          disabledColor: '{neutral-500}',
        },
        text: {
          color: '{neutral-50}',
          hoverColor: '{surface-950}',
          mutedColor: '{surface-950}',
          hoverMutedColor: '{surface-950}',
        },
        overlay: {
          popover: {
            background: '{neutral-50}',
            color: '{neutral-950}',
          },
          select: {
            background: '{neutral-50}',
            color: '{neutral-950}',
          },
          modal: {
            background: '{neutral-50}',
            color: '{neutral-950}',
          }
        },
        list: {
          option: {
            color: '{neutral-950}',
            focusColor: '#010327',
            focusBackground: '{neutral-50}',
            selectedBackground: '#010327',
            selectedFocusBackground: '#010327',
            selectedColor: '{neutral-50}',
            selectedFocusColor: '{neutral-50}',
          },
          optionGroup: {
            background: '{neutral-50}',
            color: '{neutral-50}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{slate-950}',
            focusColor: '{neutral-50}',
            activeBackground: '{slate-900}',
            activeColor: '{neutral-50}',
            color: '{neutral-50}',
          },
          submenuLabel: {
            background: '{neutral-950}',
            color: '{neutral-50}',
          }
        },
      },
    },
  },
  components: {
    radiobutton: {
      colorScheme: {
        dark: {
          root: {
            checkedBackground: '#010327',
            color: '{surface.0}',
            checkedHoverBackground: '#010327',
          },
          icon: {
            checkedColor: '#010327',
          },
        },
      },
    },
    tabs: {
      colorScheme: {
        dark: {
          tab: {
            background: '{surface.0}',
            activeBackground: '{surface.0}',
            hoverBackground: '#010327',
            borderWidth: '3px 0 0 0',
          },
        },
      },
    },
    popover: {
      colorScheme: {
        dark: {
          content: {
            padding: '0',
          },
        },
      },
    }
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withDebugTracing()),
    // Skip hydration for problematic components using ngSkipHydration
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    providePrimeNG({
      ripple: true,
      zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100,
      },
      theme: {
        preset: AppPreset,
      },
    }),
  ],
};