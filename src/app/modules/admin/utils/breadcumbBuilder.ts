export interface Breadcrumb {
  label: string;
  url: string;
}

export class BreadcrumbBuilder {
  /**
   * Builds breadcrumbs from a given URL
   * @param url - the path like "/dashboard/users/123/edit"
   * @returns array of breadcrumb objects
   */
  static fromUrl(url: string): Breadcrumb[] {
    const segments = url.split('/').filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [];
    let accumulatedUrl = '';

    for (const segment of segments) {
      accumulatedUrl += `/${segment}`;
      breadcrumbs.push({
        label: this.formatLabel(segment),
        url: accumulatedUrl
      });
    }

    return breadcrumbs;
  }

  /**
   * Formats a segment to a user-friendly label
   * Example: "user-profile" → "User Profile"
   */
  private static formatLabel(segment: string): string {
    return segment
      .replace(/[-_]/g, ' ') // replace - and _ with space
      .replace(/\b\w/g, char => char.toUpperCase()); // capitalize each word
  }
}
