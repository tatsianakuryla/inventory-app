export const ODOO_INTEGRATION_TEXTS = {
  TITLE: 'Odoo Integration',
  DESCRIPTION:
    'Generate an API token to integrate this inventory with Odoo. The token allows Odoo to access aggregated inventory data.',
  GENERATE_BUTTON: 'Generate API Token',
  GENERATING: 'Generating...',
  INFO_TITLE: 'How to use:',
  STEPS: [
    'Generate an API token using the button above',
    'Copy the token to your clipboard',
    'In Odoo, navigate to the Inventory Import action',
    'Paste the token and click "Import Data"',
  ],
} as const;
