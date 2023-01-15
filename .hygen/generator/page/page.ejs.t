---
to: /src/pages/<%= h.changeCase.camel(pageName) %>.tsx
---
import <%= pageName %> from '@features/<%= h.changeCase.camel(pageName)  %>';

export default function IndexPage() {
  return < <%= pageName %> />;
}