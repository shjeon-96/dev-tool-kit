/**
 * DevToolkit Embeddable Widget Loader
 *
 * Usage:
 *   <script
 *     src="https://web-toolkit.app/widget/loader.js"
 *     data-tool="json-formatter"
 *     data-theme="light"
 *     data-height="400"
 *   ></script>
 *
 * Supported tools:
 *   - json-formatter
 *   - hash-generator
 *   - base64-converter
 *   - uuid-generator
 *   - url-encoder
 *   - qr-generator
 *   - color-picker
 *   - regex-tester
 */

(function() {
  'use strict';

  // ============================================
  // Configuration
  // ============================================

  const BASE_URL = 'https://web-toolkit.app';
  const WIDGET_VERSION = '1.0.0';

  // Supported tools for embedding
  const SUPPORTED_TOOLS = [
    'json-formatter',
    'hash-generator',
    'base64-converter',
    'uuid-generator',
    'url-encoder',
    'qr-generator',
    'color-picker',
    'regex-tester',
    'jwt-decoder',
    'markdown-preview',
  ];

  // Tool-specific configurations
  const TOOL_CONFIG = {
    'json-formatter': {
      title: 'JSON Formatter',
      icon: '{ }',
      color: '#f59e0b',
      minHeight: 400,
    },
    'hash-generator': {
      title: 'Hash Generator',
      icon: '#',
      color: '#8b5cf6',
      minHeight: 300,
    },
    'base64-converter': {
      title: 'Base64 Converter',
      icon: 'B64',
      color: '#06b6d4',
      minHeight: 300,
    },
    'uuid-generator': {
      title: 'UUID Generator',
      icon: 'UUID',
      color: '#10b981',
      minHeight: 250,
    },
    'url-encoder': {
      title: 'URL Encoder',
      icon: '%',
      color: '#14b8a6',
      minHeight: 300,
    },
    'qr-generator': {
      title: 'QR Generator',
      icon: 'QR',
      color: '#3b82f6',
      minHeight: 400,
    },
    'color-picker': {
      title: 'Color Picker',
      icon: '#',
      color: '#f43f5e',
      minHeight: 350,
    },
    'regex-tester': {
      title: 'Regex Tester',
      icon: '/./',
      color: '#8b5cf6',
      minHeight: 400,
    },
    'jwt-decoder': {
      title: 'JWT Decoder',
      icon: 'JWT',
      color: '#ec4899',
      minHeight: 400,
    },
    'markdown-preview': {
      title: 'Markdown Preview',
      icon: 'MD',
      color: '#6366f1',
      minHeight: 400,
    },
  };

  // ============================================
  // Widget Class
  // ============================================

  class DevToolkitWidget {
    constructor(scriptElement) {
      this.script = scriptElement;
      this.tool = scriptElement.dataset.tool || 'json-formatter';
      this.theme = scriptElement.dataset.theme || 'light';
      this.height = parseInt(scriptElement.dataset.height) || TOOL_CONFIG[this.tool]?.minHeight || 400;
      this.locale = scriptElement.dataset.locale || 'en';
      this.container = null;
      this.shadow = null;
      this.iframe = null;

      this.init();
    }

    init() {
      // Validate tool
      if (!SUPPORTED_TOOLS.includes(this.tool)) {
        console.error(`[DevToolkit] Unsupported tool: ${this.tool}`);
        console.error(`[DevToolkit] Supported tools: ${SUPPORTED_TOOLS.join(', ')}`);
        return;
      }

      this.createContainer();
      this.createShadowDOM();
      this.render();
      this.trackEmbed();
    }

    createContainer() {
      this.container = document.createElement('div');
      this.container.className = 'devtoolkit-widget';
      this.container.setAttribute('data-tool', this.tool);
      this.container.setAttribute('data-version', WIDGET_VERSION);

      // Insert after script element
      this.script.parentNode.insertBefore(this.container, this.script.nextSibling);
    }

    createShadowDOM() {
      // Create Shadow DOM for style isolation
      this.shadow = this.container.attachShadow({ mode: 'open' });

      // Add styles
      const styles = document.createElement('style');
      styles.textContent = this.getStyles();
      this.shadow.appendChild(styles);
    }

    getStyles() {
      const config = TOOL_CONFIG[this.tool] || {};
      const primaryColor = config.color || '#6366f1';

      return `
        :host {
          display: block;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .widget-wrapper {
          border: 1px solid ${this.theme === 'dark' ? '#374151' : '#e5e7eb'};
          border-radius: 12px;
          overflow: hidden;
          background: ${this.theme === 'dark' ? '#1f2937' : '#ffffff'};
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: ${this.theme === 'dark' ? '#111827' : '#f9fafb'};
          border-bottom: 1px solid ${this.theme === 'dark' ? '#374151' : '#e5e7eb'};
        }

        .widget-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          color: ${this.theme === 'dark' ? '#f3f4f6' : '#1f2937'};
        }

        .widget-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc);
          color: white;
          font-size: 11px;
          font-weight: bold;
        }

        .widget-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: ${this.theme === 'dark' ? '#9ca3af' : '#6b7280'};
          text-decoration: none;
        }

        .widget-badge:hover {
          color: ${primaryColor};
        }

        .widget-badge svg {
          width: 14px;
          height: 14px;
        }

        .widget-content {
          position: relative;
          height: ${this.height}px;
        }

        .widget-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: ${this.theme === 'dark' ? '#1f2937' : '#ffffff'};
        }

        .widget-loading {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: ${this.theme === 'dark' ? '#1f2937' : '#ffffff'};
        }

        .widget-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid ${this.theme === 'dark' ? '#374151' : '#e5e7eb'};
          border-top-color: ${primaryColor};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .widget-loading-text {
          font-size: 13px;
          color: ${this.theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .widget-error {
          padding: 24px;
          text-align: center;
          color: ${this.theme === 'dark' ? '#f87171' : '#dc2626'};
        }
      `;
    }

    render() {
      const config = TOOL_CONFIG[this.tool] || {};

      const wrapper = document.createElement('div');
      wrapper.className = 'widget-wrapper';

      wrapper.innerHTML = `
        <div class="widget-header">
          <div class="widget-title">
            <span class="widget-icon">${config.icon || '⚡'}</span>
            <span>${config.title || this.tool}</span>
          </div>
          <a href="${BASE_URL}/${this.locale}/tools/${this.tool}"
             target="_blank"
             rel="noopener noreferrer"
             class="widget-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span>Open in DevToolkit</span>
          </a>
        </div>
        <div class="widget-content">
          <div class="widget-loading">
            <div class="widget-spinner"></div>
            <span class="widget-loading-text">Loading ${config.title || this.tool}...</span>
          </div>
        </div>
      `;

      this.shadow.appendChild(wrapper);

      // Create iframe
      this.createIframe(wrapper.querySelector('.widget-content'));
    }

    createIframe(container) {
      const iframe = document.createElement('iframe');
      iframe.className = 'widget-iframe';
      iframe.src = `${BASE_URL}/${this.locale}/tools/${this.tool}?embed=true&theme=${this.theme}`;
      iframe.title = `DevToolkit ${TOOL_CONFIG[this.tool]?.title || this.tool}`;
      iframe.loading = 'lazy';
      iframe.allow = 'clipboard-write';

      // Hide loading state when iframe loads
      iframe.onload = () => {
        const loading = container.querySelector('.widget-loading');
        if (loading) {
          loading.style.display = 'none';
        }
      };

      iframe.onerror = () => {
        const loading = container.querySelector('.widget-loading');
        if (loading) {
          loading.innerHTML = `
            <div class="widget-error">
              <p>Failed to load widget</p>
              <a href="${BASE_URL}/${this.locale}/tools/${this.tool}" target="_blank">
                Open in new tab
              </a>
            </div>
          `;
        }
      };

      container.appendChild(iframe);
      this.iframe = iframe;
    }

    trackEmbed() {
      // Track widget embedding for analytics (non-blocking)
      try {
        const img = new Image();
        img.src = `${BASE_URL}/api/widget/track?tool=${this.tool}&host=${encodeURIComponent(window.location.hostname)}&v=${WIDGET_VERSION}`;
      } catch (e) {
        // Silently fail
      }
    }

    // Public API
    destroy() {
      if (this.container) {
        this.container.remove();
      }
    }

    setTheme(theme) {
      this.theme = theme;
      if (this.iframe) {
        this.iframe.src = `${BASE_URL}/${this.locale}/tools/${this.tool}?embed=true&theme=${theme}`;
      }
    }
  }

  // ============================================
  // Auto-initialization
  // ============================================

  function initWidgets() {
    // Find all widget script tags
    const scripts = document.querySelectorAll('script[src*="widget/loader.js"][data-tool]');

    scripts.forEach(script => {
      // Skip if already initialized
      if (script.dataset.initialized) return;
      script.dataset.initialized = 'true';

      // Create widget instance
      const widget = new DevToolkitWidget(script);

      // Store reference for public API
      script._widget = widget;
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }

  // Expose public API
  window.DevToolkitWidget = DevToolkitWidget;
  window.DevToolkit = {
    version: WIDGET_VERSION,
    supportedTools: SUPPORTED_TOOLS,
    createWidget: function(element, options) {
      const script = document.createElement('script');
      script.dataset.tool = options.tool || 'json-formatter';
      script.dataset.theme = options.theme || 'light';
      script.dataset.height = options.height || '';
      script.dataset.locale = options.locale || 'en';
      element.appendChild(script);
      return new DevToolkitWidget(script);
    }
  };

})();
