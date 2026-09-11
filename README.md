# Responsive Blazor PDF Viewer

A dependency-light PDF viewer component for **Blazor Server, Blazor WebAssembly, and .NET 8+ Blazor Web Apps**. It renders one page at a time with PDF.js, which keeps memory use reasonable on phones and tablets while still providing a familiar desktop toolbar.

## Features

| Capability | Behavior |
|---|---|
| Responsive layout | Full-width toolbar and touch-friendly controls on phones; centered document stage on tablets and PCs |
| Navigation | Previous, next, and direct page number input |
| Zoom | Zoom out, zoom in, and fit-to-width |
| Actions | Download, print, and fullscreen |
| Accessibility | Toolbar semantics, labels, keyboard focus, live zoom status, and reduced-motion support |
| Integration | No NuGet dependency beyond the Razor Class Library; PDF.js is loaded from cdnjs on first use |

## Installation

Copy the `PdfViewer` folder into a Razor Class Library or into the consuming application. If you use the included project file, reference it from your app:

```xml
<ProjectReference Include="../PdfViewer/PdfViewer.csproj" />
```

Add the component namespace to `_Imports.razor`:

```razor
@using PdfViewer
```

The JavaScript module is loaded automatically from the library static-asset path. No script tag is required.

## Usage

```razor
@page "/document"
@using PdfViewer

<PageTitle>Document</PageTitle>

<PdfViewer Url="/documents/handbook.pdf"
           FileName="handbook.pdf"
           Height="calc(100vh - 2rem)"
           class="document-viewer" />
```

The `Url` should be accessible to the browser. For a protected document, expose a short-lived authenticated URL or an endpoint that accepts the current browser session. The PDF server must allow the browser origin through CORS when the PDF is hosted on another origin.

## Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `Url` | `string` | required | Browser-accessible PDF URL |
| `FileName` | `string` | `document.pdf` | Suggested filename for the download action |
| `Height` | `string` | `min(78vh, 900px)` | CSS height of the viewer |
| `Class` | `string?` | `null` | Optional additional CSS class |
| `AdditionalAttributes` | attribute splat | — | Additional HTML attributes applied to the root element |

## Browser and security notes

PDF.js is imported from `https://cdnjs.cloudflare.com`. For a self-contained deployment, download a compatible PDF.js build and replace the two CDN URLs in `wwwroot/pdf-viewer.js` with local paths. Keep `pdf.min.mjs` and `pdf.worker.min.mjs` on the same version.

The component uses `withCredentials: true`, so same-origin cookie-authenticated PDFs work. Cross-origin authenticated PDFs require suitable CORS headers and credentials configuration. Do not put authorization tokens directly in a public PDF URL unless the URL is intentionally short-lived.

## Files

- `PdfViewer/PdfViewer.razor` contains the Blazor component and JS interop.
- `PdfViewer/PdfViewer.razor.css` contains mobile-first responsive styling.
- `wwwroot/pdf-viewer.js` loads PDF.js and renders the current page.
- `PdfViewer/PdfViewer.csproj` packages the component as a Razor Class Library.
