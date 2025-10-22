// Custom Decap CMS editor components for image galleries
console.log('Loading custom CMS components...');

CMS.registerEditorComponent({
  id: 'quad-view',
  label: 'Quad View Gallery',
  fields: [
    {
      label: 'Images',
      name: 'images',
      widget: 'list',
      max: 4,
      min: 2,
      fields: [
        {
          label: 'Image',
          name: 'image',
          widget: 'image',
          required: true
        },
        {
          label: 'Caption',
          name: 'caption',
          widget: 'string',
          required: false
        }
      ]
    }
  ],
  toBlock: function(obj) {
    if (!obj.images || obj.images.length === 0) {
      return '{{< quad-view >}}\n{{< /quad-view >}}';
    }
    
    const imageMarkdown = obj.images.map(img => {
      if (img.caption) {
        return `![${img.caption}](${img.image})`;
      } else {
        return `![](${img.image})`;
      }
    }).join('\n');
    
    return `{{< quad-view >}}\n${imageMarkdown}\n{{< /quad-view >}}`;
  },
  fromBlock: function(match) {
    const content = match[1] || '';
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const images = [];
    let imgMatch;
    
    while ((imgMatch = imageRegex.exec(content)) !== null) {
      images.push({
        caption: imgMatch[1] || '',
        image: imgMatch[2]
      });
    }
    
    return { images };
  },
  pattern: /^{{< quad-view >}}\n([\s\S]*?)\n{{< \/quad-view >}}$/
});
  
  CMS.registerEditorComponent({
    id: 'carousel',
    label: 'Image Carousel',
    fields: [
      {
        label: 'Images',
        name: 'images',
        widget: 'list',
        fields: [
          {
            label: 'Image',
            name: 'image',
            widget: 'image',
            required: true
          },
          {
            label: 'Caption',
            name: 'caption',
            widget: 'string',
            required: false
          }
        ]
      }
    ],
    toBlock: function(obj) {
      if (!obj.images || obj.images.length === 0) {
        return '{{< carousel >}}\n{{< /carousel >}}';
      }
      
      const imageMarkdown = obj.images.map(img => {
        if (img.caption) {
          return `![${img.caption}](${img.image})`;
        } else {
          return `![](${img.image})`;
        }
      }).join('\n');
      
      return `{{< carousel >}}\n${imageMarkdown}\n{{< /carousel >}}`;
    },
    fromBlock: function(match) {
      const content = match[1] || '';
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      const images = [];
      let imgMatch;
      
      while ((imgMatch = imageRegex.exec(content)) !== null) {
        images.push({
          caption: imgMatch[1] || '',
          image: imgMatch[2]
        });
      }
      
      return { images };
    },
    pattern: /^{{< carousel >}}\n([\s\S]*?)\n{{< \/carousel >}}$/
  });
  
  CMS.registerEditorComponent({
    id: 'gallery',
    label: 'Image Gallery',
    fields: [
      {
        label: 'Images',
        name: 'images',
        widget: 'list',
        fields: [
          {
            label: 'Image',
            name: 'image',
            widget: 'image',
            required: true
          },
          {
            label: 'Caption',
            name: 'caption',
            widget: 'string',
            required: false
          }
        ]
      }
    ],
    toBlock: function(obj) {
      if (!obj.images || obj.images.length === 0) {
        return '{{< gallery >}}\n{{< /gallery >}}';
      }
      
      const imageMarkdown = obj.images.map(img => {
        if (img.caption) {
          return `![${img.caption}](${img.image})`;
        } else {
          return `![](${img.image})`;
        }
      }).join('\n');
      
      return `{{< gallery >}}\n${imageMarkdown}\n{{< /gallery >}}`;
    },
    fromBlock: function(match) {
      const content = match[1] || '';
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      const images = [];
      let imgMatch;
      
      while ((imgMatch = imageRegex.exec(content)) !== null) {
        images.push({
          caption: imgMatch[1] || '',
          image: imgMatch[2]
        });
      }
      
      return { images };
    },
  pattern: /^{{< gallery >}}\n([\s\S]*?)\n{{< \/gallery >}}$/
});

console.log('All custom CMS components registered successfully!');
  