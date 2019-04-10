interface MetaInfo {
  vmid?: string;
  charset?: string;
  content?: string;
  'http-equiv'?: 'content-security-policy' | 'refresh';
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default {
  title (content: string): MetaInfo[] {
    return [
      {
        hid: 'og:title',
        property: 'og:title',
        content
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content
      },
      { hid: 'gs_name', itemprop: 'name', content }
    ]
  },
  description (content: string): MetaInfo[] {
    return [
      { hid: 'description', content },
      { hid: 'og:description', content },
      { hid: 'twitter:description', content },
      { hid: 'gs_description', content }
    ]
  },
  image (content: string): MetaInfo[] {
    return [
      { hid: 'og:image', content },
      { hid: 'twitter:image', content },
      { hid: 'gs_image', content }
    ]
  }
}
